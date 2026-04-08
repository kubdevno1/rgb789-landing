import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getRegisterClickStats, insertRegisterClick } from "./db";
import { sendTelegramNotification, buildRegisterClickMessage } from "./telegram";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// Admin credentials (simple hardcoded auth for admin panel)
const ADMIN_USERNAME = "rgbmaster";
const ADMIN_PASSWORD = "Boss789rgb";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    // Admin login with simple username/password
    adminLogin: publicProcedure
      .input(z.object({ username: z.string(), password: z.string() }))
      .mutation(({ input }) => {
        if (input.username === ADMIN_USERNAME && input.password === ADMIN_PASSWORD) {
          return { success: true, token: Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString("base64") };
        }
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" });
      }),
  }),

  // Register click tracking
  tracking: router({
    // Public: record a register button click
    recordClick: publicProcedure
      .input(
        z.object({
          device: z.enum(["mobile", "desktop", "tablet"]).default("desktop"),
          platform: z.string().optional(),
          source: z.string().optional(),
          userAgent: z.string().optional(),
          referrer: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await insertRegisterClick({
          device: input.device,
          platform: input.platform ?? null,
          source: input.source ?? null,
          userAgent: input.userAgent ?? null,
          referrer: input.referrer ?? null,
        });

        // Get total count for notification
        let totalCount: number | undefined;
        try {
          const stats = await getRegisterClickStats();
          totalCount = stats.total;
        } catch {
          // ignore stats error
        }

        // Send Telegram notification (non-blocking)
        const message = buildRegisterClickMessage({
          device: input.device,
          platform: input.platform,
          source: input.source,
          userAgent: input.userAgent,
          timestamp: new Date(),
          totalCount,
        });
        sendTelegramNotification(message).catch(err =>
          console.error("[Telegram] Notification failed:", err)
        );

        return { success: true };
      }),

    // Admin: get stats (protected by token)
    getStats: publicProcedure
      .input(
        z.object({
          token: z.string(),
          startDate: z.date().optional(),
          endDate: z.date().optional(),
        })
      )
      .query(async ({ input }) => {
        // Validate admin token
        const expectedToken = Buffer.from(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}`).toString("base64");
        if (input.token !== expectedToken) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid admin token" });
        }
        return await getRegisterClickStats(input.startDate, input.endDate);
      }),
  }),
});

export type AppRouter = typeof appRouter;
