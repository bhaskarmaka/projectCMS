import { motion } from "framer-motion";
import {
  FileText, CheckCircle2, AlertCircle, Clock, TrendingUp, Users,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid, Legend,
} from "recharts";
import { StatusBadge } from "@/components/StatusBadge";
import KPICard from "@/components/KPICard";
import AppLayout from "@/components/AppLayout";
import { mockComplaints, mockAgents, mockAnalytics } from "@/lib/mock-data";

const CHART_COLORS = [
  "hsl(160, 84%, 39%)",
  "hsl(217, 91%, 60%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 67%, 60%)",
  "hsl(0, 72%, 51%)",
];

const AdminDashboard = () => {
  const analytics = mockAnalytics;

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of all complaints and system analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="Total Complaints"
          value={analytics.totalComplaints}
          icon={<FileText className="h-5 w-5 text-info" />}
          gradient="--gradient-kpi-2"
          iconColor="bg-info/15"
          trend="+12% from last week"
        />
        <KPICard
          title="Resolved"
          value={analytics.resolved}
          icon={<CheckCircle2 className="h-5 w-5 text-success" />}
          gradient="--gradient-kpi-1"
          iconColor="bg-success/15"
          trend={`${((analytics.resolved / analytics.totalComplaints) * 100).toFixed(0)}% resolution rate`}
        />
        <KPICard
          title="Open"
          value={analytics.open}
          icon={<AlertCircle className="h-5 w-5 text-warning" />}
          gradient="--gradient-kpi-3"
          iconColor="bg-warning/15"
        />
        <KPICard
          title="Avg Resolution"
          value={`${analytics.avgResolutionTime}h`}
          icon={<Clock className="h-5 w-5 text-primary" />}
          gradient="--gradient-kpi-1"
          iconColor="bg-primary/15"
          trend="↓ 0.8h improvement"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border/50 bg-card p-5"
        >
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Weekly Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={analytics.weeklyTrend}>
              <defs>
                <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 28%, 16%)" />
              <XAxis dataKey="day" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 9%)",
                  border: "1px solid hsl(215, 28%, 16%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="complaints" stroke="hsl(217, 91%, 60%)" fillOpacity={1} fill="url(#colorComplaints)" name="Complaints" />
              <Area type="monotone" dataKey="resolved" stroke="hsl(160, 84%, 39%)" fillOpacity={1} fill="url(#colorResolved)" name="Resolved" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* By Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border/50 bg-card p-5"
        >
          <h3 className="text-sm font-semibold mb-4">By Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.byCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 28%, 16%)" />
              <XAxis dataKey="name" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 9%)",
                  border: "1px solid hsl(215, 28%, 16%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Priority Pie + Agent Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* By Priority */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border/50 bg-card p-5"
        >
          <h3 className="text-sm font-semibold mb-4">By Priority</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analytics.byPriority}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {analytics.byPriority.map((_, index) => (
                  <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 9%)",
                  border: "1px solid hsl(215, 28%, 16%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Agent Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border/50 bg-card p-5"
        >
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Agent Performance
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.agentPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 28%, 16%)" />
              <XAxis type="number" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} axisLine={false} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 9%)",
                  border: "1px solid hsl(215, 28%, 16%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="totalAssigned" fill="hsl(217, 91%, 60%)" name="Assigned" radius={[0, 4, 4, 0]} />
              <Bar dataKey="resolved" fill="hsl(160, 84%, 39%)" name="Resolved" radius={[0, 4, 4, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* All Complaints Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-border/50 bg-card overflow-hidden"
      >
        <div className="p-5 border-b border-border/50">
          <h3 className="text-sm font-semibold">All Complaints</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left p-3 font-medium text-muted-foreground">User</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Category</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Agent</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockComplaints.map((c) => (
                <tr key={c.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                  <td className="p-3 font-medium max-w-[200px] truncate">{c.title}</td>
                  <td className="p-3 text-muted-foreground">{c.userName}</td>
                  <td className="p-3 text-muted-foreground">{c.category}</td>
                  <td className="p-3"><StatusBadge status={c.status} /></td>
                  <td className="p-3 text-muted-foreground">{c.agentName || "—"}</td>
                  <td className="p-3 text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default AdminDashboard;
