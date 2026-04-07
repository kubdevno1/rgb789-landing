import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { th } from "date-fns/locale";

const DEVICE_COLORS: Record<string, string> = {
  mobile: "#a855f7",
  desktop: "#f59e0b",
  tablet: "#06b6d4",
  unknown: "#6b7280",
};

// ─── Login Form ────────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.auth.adminLogin.useMutation({
    onSuccess: (data) => {
      onLogin(data.token);
    },
    onError: () => {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ username, password });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0f0225 0%, #1a0533 100%)" }}
    >
      <div className="w-full max-w-md mx-4">
        <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">R</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Dashboard</h1>
          <p className="text-purple-300 text-center text-sm mb-8">RGB789 - ระบบสถิติการสมัครสมาชิก</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-1.5">ชื่อผู้ใช้</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 border border-purple-500/40 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="กรอกชื่อผู้ใช้"
                required
              />
            </div>
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-1.5">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-purple-500/40 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="กรอกรหัสผ่าน"
                required
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/30 rounded-lg py-2">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
            >
              {loginMutation.isPending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d" | "all">("30d");

  const { startDate, endDate } = useMemo(() => {
    const now = new Date();
    const end = endOfDay(now);
    if (dateRange === "7d") return { startDate: startOfDay(subDays(now, 6)), endDate: end };
    if (dateRange === "30d") return { startDate: startOfDay(subDays(now, 29)), endDate: end };
    if (dateRange === "90d") return { startDate: startOfDay(subDays(now, 89)), endDate: end };
    return { startDate: undefined, endDate: undefined };
  }, [dateRange]);

  const { data, isLoading, error } = trpc.tracking.getStats.useQuery(
    { token, startDate, endDate },
    { refetchInterval: 30000 }
  );

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #0f0225 0%, #1a0533 100%)" }}
      >
        <div className="text-purple-300 text-lg animate-pulse">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #0f0225 0%, #1a0533 100%)" }}
      >
        <div className="text-red-400 text-lg">เกิดข้อผิดพลาด: {error.message}</div>
      </div>
    );
  }

  const stats = data ?? { total: 0, byDay: [], byHour: [], byDevice: [], recent: [] };

  // Fill hours 0-23 for chart
  const hourlyData = Array.from({ length: 24 }, (_, h) => {
    const found = stats.byHour.find((x) => x.hour === h);
    return { hour: `${h.toString().padStart(2, "0")}:00`, count: found?.count ?? 0 };
  });

  // Device pie data
  const deviceData = stats.byDevice.map((d) => ({
    name: d.device === "mobile" ? "มือถือ" : d.device === "desktop" ? "คอมพิวเตอร์" : d.device === "tablet" ? "แท็บเล็ต" : "ไม่ทราบ",
    value: d.count,
    color: DEVICE_COLORS[d.device] ?? "#6b7280",
  }));

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #0f0225 0%, #1a0533 100%)" }}
    >
      {/* Header */}
      <header className="border-b border-purple-500/30 bg-black/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">RGB789 Admin</h1>
              <p className="text-purple-400 text-xs">สถิติการกดปุ่มสมัครสมาชิก</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-purple-300 hover:text-white text-sm border border-purple-500/40 rounded-lg px-3 py-1.5 hover:bg-white/5 transition-colors"
          >
            ออกจากระบบ
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Date Range Filter */}
        <div className="flex flex-wrap gap-2">
          {(["7d", "30d", "90d", "all"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setDateRange(r)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                dateRange === r
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white/5 text-purple-300 hover:bg-white/10 border border-purple-500/30"
              }`}
            >
              {r === "7d" ? "7 วัน" : r === "30d" ? "30 วัน" : r === "90d" ? "90 วัน" : "ทั้งหมด"}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="ยอดกดสมัครทั้งหมด" value={stats.total.toLocaleString()} color="purple" />
          <StatCard
            label="วันนี้"
            value={
              stats.byDay
                .find((d) => d.day === format(new Date(), "yyyy-MM-dd"))
                ?.count.toLocaleString() ?? "0"
            }
            color="yellow"
          />
          <StatCard
            label="อุปกรณ์มือถือ"
            value={
              stats.byDevice
                .find((d) => d.device === "mobile")
                ?.count.toLocaleString() ?? "0"
            }
            color="blue"
          />
          <StatCard
            label="จำนวนวันที่มีข้อมูล"
            value={stats.byDay.length.toLocaleString()}
            color="green"
          />
        </div>

        {/* Empty state */}
        {stats.total === 0 && (
          <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-white text-xl font-bold mb-2">ยังไม่มีสถิติ</h3>
            <p className="text-purple-300 text-sm">เมื่อมีผู้กดปุ่มสมัครสมาชิก ข้อมูลจะแสดงที่นี่</p>
          </div>
        )}

        {stats.total > 0 && (
          <>
            {/* Daily Chart */}
            <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-5">
              <h2 className="text-white font-bold text-base mb-4">สถิติรายวัน</h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={stats.byDay.map((d) => ({ day: d.day, count: d.count }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="day" tick={{ fill: "#a78bfa", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#a78bfa", fontSize: 11 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ background: "#1a0533", border: "1px solid #7c3aed", borderRadius: 8 }}
                    labelStyle={{ color: "#e9d5ff" }}
                    itemStyle={{ color: "#f59e0b" }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 3 }} name="จำนวนครั้ง" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Hourly + Device */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Hourly */}
              <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-5">
                <h2 className="text-white font-bold text-base mb-4">สถิติรายชั่วโมง</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="hour" tick={{ fill: "#a78bfa", fontSize: 10 }} interval={3} />
                    <YAxis tick={{ fill: "#a78bfa", fontSize: 11 }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ background: "#1a0533", border: "1px solid #7c3aed", borderRadius: 8 }}
                      labelStyle={{ color: "#e9d5ff" }}
                      itemStyle={{ color: "#a855f7" }}
                    />
                    <Bar dataKey="count" fill="#7c3aed" radius={[4, 4, 0, 0]} name="จำนวนครั้ง" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Device Pie */}
              <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-5">
                <h2 className="text-white font-bold text-base mb-4">อุปกรณ์ที่ใช้</h2>
                {deviceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={deviceData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                        {deviceData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend formatter={(value) => <span style={{ color: "#e9d5ff", fontSize: 12 }}>{value}</span>} />
                      <Tooltip
                        contentStyle={{ background: "#1a0533", border: "1px solid #7c3aed", borderRadius: 8 }}
                        itemStyle={{ color: "#f59e0b" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-48 flex items-center justify-center text-purple-400 text-sm">ไม่มีข้อมูล</div>
                )}
              </div>
            </div>

            {/* Recent Events Table */}
            <div className="bg-white/5 border border-purple-500/30 rounded-2xl p-5">
              <h2 className="text-white font-bold text-base mb-4">รายการล่าสุด ({stats.recent.length} รายการ)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-purple-500/30">
                      <th className="text-left text-purple-300 font-medium py-2 pr-4">#</th>
                      <th className="text-left text-purple-300 font-medium py-2 pr-4">วันที่/เวลา</th>
                      <th className="text-left text-purple-300 font-medium py-2 pr-4">อุปกรณ์</th>
                      <th className="text-left text-purple-300 font-medium py-2 pr-4">แหล่งที่มา</th>
                      <th className="text-left text-purple-300 font-medium py-2">Platform</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent.map((event, i) => (
                      <tr key={event.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="text-purple-400 py-2.5 pr-4">{i + 1}</td>
                        <td className="text-white py-2.5 pr-4 whitespace-nowrap">
                          {format(new Date(event.clickedAt), "dd MMM yy HH:mm", { locale: th })}
                        </td>
                        <td className="py-2.5 pr-4">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              background: `${DEVICE_COLORS[event.device] ?? "#6b7280"}20`,
                              color: DEVICE_COLORS[event.device] ?? "#9ca3af",
                              border: `1px solid ${DEVICE_COLORS[event.device] ?? "#6b7280"}40`,
                            }}
                          >
                            {event.device === "mobile" ? "มือถือ" : event.device === "desktop" ? "คอมพิวเตอร์" : event.device === "tablet" ? "แท็บเล็ต" : "ไม่ทราบ"}
                          </span>
                        </td>
                        <td className="text-purple-300 py-2.5 pr-4 max-w-[150px] truncate">{event.source ?? "-"}</td>
                        <td className="text-purple-400 py-2.5 text-xs max-w-[120px] truncate">{event.platform ?? "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    purple: { bg: "from-purple-900/50 to-purple-800/30", border: "border-purple-500/40", text: "text-purple-300" },
    yellow: { bg: "from-yellow-900/50 to-yellow-800/30", border: "border-yellow-500/40", text: "text-yellow-300" },
    blue: { bg: "from-blue-900/50 to-blue-800/30", border: "border-blue-500/40", text: "text-blue-300" },
    green: { bg: "from-green-900/50 to-green-800/30", border: "border-green-500/40", text: "text-green-300" },
  };
  const c = colors[color] ?? colors.purple;
  return (
    <div className={`bg-gradient-to-br ${c.bg} border ${c.border} rounded-xl p-4`}>
      <p className={`text-xs font-medium ${c.text} mb-1`}>{label}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("admin_token");
  });

  const handleLogin = (t: string) => {
    localStorage.setItem("admin_token", t);
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  if (!token) return <AdminLogin onLogin={handleLogin} />;
  return <Dashboard token={token} onLogout={handleLogout} />;
}
