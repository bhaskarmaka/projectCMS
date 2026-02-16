import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import ChatBox from "@/components/ChatBox";
import KPICard from "@/components/KPICard";
import AppLayout from "@/components/AppLayout";
import { mockComplaints } from "@/lib/mock-data";

const UserDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const complaints = mockComplaints.filter((c) => c.userId === "u1");

  const stats = {
    total: complaints.length,
    open: complaints.filter((c) => c.status === "Open").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Complaints</h1>
          <p className="text-sm text-muted-foreground mt-1">Track and manage your submitted complaints</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className={showForm ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "bg-primary text-primary-foreground hover:bg-primary/90"}
        >
          {showForm ? <><X className="h-4 w-4 mr-2" /> Cancel</> : <><Plus className="h-4 w-4 mr-2" /> New Complaint</>}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total" value={stats.total} icon={<FileText className="h-5 w-5 text-info" />} gradient="--gradient-kpi-2" iconColor="bg-info/15" />
        <KPICard title="Open" value={stats.open} icon={<AlertCircle className="h-5 w-5 text-warning" />} gradient="--gradient-kpi-3" iconColor="bg-warning/15" />
        <KPICard title="In Progress" value={stats.inProgress} icon={<Clock className="h-5 w-5 text-primary" />} gradient="--gradient-kpi-1" iconColor="bg-primary/15" />
        <KPICard title="Resolved" value={stats.resolved} icon={<CheckCircle2 className="h-5 w-5 text-success" />} gradient="--gradient-kpi-1" iconColor="bg-success/15" />
      </div>

      {/* Create form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 rounded-xl border border-border/50 bg-card p-5"
        >
          <h3 className="font-semibold mb-4">Create New Complaint</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="Brief summary of the issue"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe your issue in detail..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Submit Complaint
            </Button>
          </div>
        </motion.div>
      )}

      {/* Complaints List */}
      <div className="space-y-3">
        {complaints.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No complaints found</p>
          </div>
        )}
        {complaints.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border/50 bg-card p-5 hover:border-border transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm">{c.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <PriorityBadge priority={c.priority} />
                <StatusBadge status={c.status} />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span>Category: {c.category}</span>
              {c.agentName && <span>Agent: {c.agentName}</span>}
              <span>{new Date(c.createdAt).toLocaleDateString()}</span>
            </div>

            <ChatBox complaintId={c.id} senderRole="user" senderName="Rahul Sharma" />
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
};

export default UserDashboard;
