import { and, count, desc, eq, gte, lte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertRegisterClick, InsertUser, registerClicks, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Register Click Tracking ───────────────────────────────────────────────

export async function insertRegisterClick(data: InsertRegisterClick): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(registerClicks).values(data);
}

export async function getRegisterClickStats(startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) return { total: 0, byDay: [], byHour: [], byDevice: [], recent: [] };

  const conditions = [];
  if (startDate) conditions.push(gte(registerClicks.clickedAt, startDate));
  if (endDate) conditions.push(lte(registerClicks.clickedAt, endDate));
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  // Total count
  const totalResult = await db
    .select({ total: count() })
    .from(registerClicks)
    .where(where);
  const total = totalResult[0]?.total ?? 0;

  // By day
  const byDay = await db
    .select({
      day: sql<string>`DATE(${registerClicks.clickedAt})`,
      count: count(),
    })
    .from(registerClicks)
    .where(where)
    .groupBy(sql`DATE(${registerClicks.clickedAt})`)
    .orderBy(sql`DATE(${registerClicks.clickedAt})`);

  // By hour
  const byHour = await db
    .select({
      hour: sql<number>`HOUR(${registerClicks.clickedAt})`,
      count: count(),
    })
    .from(registerClicks)
    .where(where)
    .groupBy(sql`HOUR(${registerClicks.clickedAt})`)
    .orderBy(sql`HOUR(${registerClicks.clickedAt})`);

  // By device
  const byDevice = await db
    .select({
      device: registerClicks.device,
      count: count(),
    })
    .from(registerClicks)
    .where(where)
    .groupBy(registerClicks.device);

  // Recent events (last 100)
  const recent = await db
    .select()
    .from(registerClicks)
    .where(where)
    .orderBy(desc(registerClicks.clickedAt))
    .limit(100);

  return { total, byDay, byHour, byDevice, recent };
}
