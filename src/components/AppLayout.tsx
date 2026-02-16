import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  LayoutDashboard,
  FileText,
  BarChart3,
  Users,
  LogOut,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

const navByRole: Record<string, NavItem[]> = {
  user: [
    { label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, path: "/dashboard" },
    { label: "New Complaint", icon: <FileText className="h-5 w-5" />, path: "/complaint" },
  ],
  admin: [
    { label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, path: "/admin" },
    { label: "Analytics", icon: <BarChart3 className="h-5 w-5" />, path: "/admin/analytics" },
    { label: "Agents", icon: <Users className="h-5 w-5" />, path: "/admin/agents" },
  ],
  agent: [
    { label: "My Tasks", icon: <LayoutDashboard className="h-5 w-5" />, path: "/agent" },
    { label: "Messages", icon: <MessageSquare className="h-5 w-5" />, path: "/agent/messages" },
  ],
};

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { role, name, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const items = navByRole[role || "user"] || [];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border/50 bg-sidebar">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <span className="text-sm font-bold text-sidebar-accent-foreground">CMS</span>
            <p className="text-[10px] text-sidebar-foreground uppercase tracking-wider">Complaint Management</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon}
                {item.label}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="px-3 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
              {name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-accent-foreground truncate">{name}</p>
              <p className="text-[10px] text-sidebar-foreground capitalize">{role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-bold text-sm">CMS</span>
          </div>
          <button onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="h-5 w-5" />
          </button>
        </header>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-1 px-4 py-2 border-b border-border/50 overflow-x-auto">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
