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

const tooltipStyle = {
  backgroundColor: "hsl(222, 47%, 7%)",
  border: "1px solid hsl(215, 28%, 14%)",
  borderRadius: "10px",
  fontSize: "12px",
  boxShadow: "0 10px 30px -5px rgb(0 0 0 / 0.5)",
};

const axisTickStyle = { fill: "hsl(215, 20%, 45%)", fontSize: 11 };

const ChartCard = ({ children, title, icon, delay = 0 }: { children: React.ReactNode; title: string; icon?: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm p-5 card-hover"
  >
    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5 flex items-center gap-2">
      {icon}
      {title}
    </h3>
    {children}
  </motion.div>
);

const AdminDashboard = () => {
  const analytics = mockAnalytics;

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of all complaints and system analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="Total Complaints"
          value={analytics.totalComplaints}
          icon={<FileText className="h-5 w-5 text-info" />}
          gradient="--gradient-kpi-2"
          iconColor="bg-info/12"
          trend="+12% from last week"
        />
        <KPICard
          title="Resolved"
          value={analytics.resolved}
          icon={<CheckCircle2 className="h-5 w-5 text-success" />}
          gradient="--gradient-kpi-1"
          iconColor="bg-success/12"
          trend={`${((analytics.resolved / analytics.totalComplaints) * 100).toFixed(0)}% resolution rate`}
        />
        <KPICard
          title="Open"
          value={analytics.open}
          icon={<AlertCircle className="h-5 w-5 text-warning" />}
          gradient="--gradient-kpi-3"
          iconColor="bg-warning/12"
        />
        <KPICard
          title="Avg Resolution"
          value={`${analytics.avgResolutionTime}h`}
          icon={<Clock className="h-5 w-5 text-primary" />}
          gradient="--gradient-kpi-1"
          iconColor="bg-primary/12"
          trend="↓ 0.8h improvement"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <ChartCard title="Weekly Trend" icon={<TrendingUp className="h-3.5 w-3.5 text-primary" />}>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={analytics.weeklyTrend}>
              <defs>
                <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 28%, 12%)" vertical={false} />
              <XAxis dataKey="day" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="complaints" stroke="hsl(217, 91%, 60%)" strokeWidth={2} fillOpacity={1} fill="url(#colorComplaints)" name="Complaints" />
              <Area type="monotone" dataKey="resolved" stroke="hsl(160, 84%, 39%)" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" name="Resolved" />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px", color: "hsl(215, 20%, 50%)" }} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="By Category" delay={0.1}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.byCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 28%, 12%)" vertical={false} />
              <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(215, 28%, 10%)" }} />
              <Bar dataKey="count" fill="hsl(160, 84%, 39%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Priority Pie + Agent Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <ChartCard title="By Priority" delay={0.2}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analytics.byPriority}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={55}
                strokeWidth={0}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {analytics.byPriority.map((_, index) => (
                  <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Agent Performance" icon={<Users className="h-3.5 w-3.5 text-primary" />} delay={0.3}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.agentPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 28%, 12%)" horizontal={false} />
              <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={axisTickStyle} axisLine={false} tickLine={false} width={100} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(215, 28%, 10%)" }} />
              <Bar dataKey="totalAssigned" fill="hsl(217, 91%, 60%)" name="Assigned" radius={[0, 4, 4, 0]} />
              <Bar dataKey="resolved" fill="hsl(160, 84%, 39%)" name="Resolved" radius={[0, 4, 4, 0]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px", color: "hsl(215, 20%, 50%)" }} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* All Complaints Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm overflow-hidden"
      >
        <div className="p-5 border-b border-border/20">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">All Complaints</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20">
                <th className="text-left p-4 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">Title</th>
                <th className="text-left p-4 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">User</th>
                <th className="text-left p-4 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">Category</th>
                <th className="text-left p-4 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">Agent</th>
                <th className="text-left p-4 font-medium text-[10px] uppercase tracking-wider text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockComplaints.map((c) => (
                <tr key={c.id} className="border-b border-border/10 hover:bg-primary/[0.02] transition-colors">
                  <td className="p-4 font-medium max-w-[200px] truncate text-sm">{c.title}</td>
                  <td className="p-4 text-muted-foreground text-sm">{c.userName}</td>
                  <td className="p-4 text-muted-foreground text-sm">{c.category}</td>
                  <td className="p-4"><StatusBadge status={c.status} /></td>
                  <td className="p-4 text-muted-foreground text-sm">{c.agentName || "—"}</td>
                  <td className="p-4 text-muted-foreground text-sm text-mono">{new Date(c.createdAt).toLocaleDateString()}</td>
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
