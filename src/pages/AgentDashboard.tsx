import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import ChatBox from "@/components/ChatBox";
import KPICard from "@/components/KPICard";
import AppLayout from "@/components/AppLayout";
import { mockComplaints, type Complaint } from "@/lib/mock-data";

const AgentDashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(
    mockComplaints.filter((c) => c.agentId === "a1")
  );

  const stats = {
    total: complaints.length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  const updateStatus = (id: string, status: "In Progress" | "Resolved") => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">My Assigned Tasks</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage and resolve complaints assigned to you</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <KPICard title="Assigned" value={stats.total} icon={<AlertCircle className="h-5 w-5 text-info" />} gradient="--gradient-kpi-2" iconColor="bg-info/12" />
        <KPICard title="In Progress" value={stats.inProgress} icon={<Clock className="h-5 w-5 text-warning" />} gradient="--gradient-kpi-3" iconColor="bg-warning/12" />
        <KPICard title="Resolved" value={stats.resolved} icon={<CheckCircle2 className="h-5 w-5 text-success" />} gradient="--gradient-kpi-1" iconColor="bg-success/12" />
      </div>

      {/* Complaints */}
      <div className="space-y-4">
        {complaints.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No assigned complaints</p>
          </div>
        )}

        {complaints.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border/30 bg-card/50 backdrop-blur-sm p-5 card-hover"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{c.title}</h4>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{c.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <PriorityBadge priority={c.priority} />
                <StatusBadge status={c.status} />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 text-[11px] text-muted-foreground">
              <span>User: <span className="text-foreground/70">{c.userName}</span></span>
              <span>Category: <span className="text-foreground/70">{c.category}</span></span>
              <span className="text-mono">{new Date(c.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Actions */}
            {c.status !== "Resolved" && (
              <div className="flex gap-2 mt-4">
                {c.status !== "In Progress" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(c.id, "In Progress")}
                    className="text-xs border-warning/20 text-warning hover:bg-warning/8 rounded-lg"
                  >
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    In Progress
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(c.id, "Resolved")}
                  className="text-xs border-success/20 text-success hover:bg-success/8 rounded-lg"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                  Resolve
                </Button>
              </div>
            )}

            <ChatBox complaintId={c.id} senderRole="agent" senderName="Priya Patel" />
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
};

export default AgentDashboard;
