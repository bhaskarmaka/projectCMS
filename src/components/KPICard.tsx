import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradient?: string;
  iconColor: string;
  trend?: string;
}

const gradientMap: Record<string, string> = {
  "--gradient-kpi-1": "bg-gradient-to-br from-primary/10 to-primary/[0.02]",
  "--gradient-kpi-2": "bg-gradient-to-br from-info/10 to-info/[0.02]",
  "--gradient-kpi-3": "bg-gradient-to-br from-warning/10 to-warning/[0.02]",
  "--gradient-kpi-4": "bg-gradient-to-br from-destructive/10 to-destructive/[0.02]",
};

const KPICard = ({ title, value, icon, gradient, iconColor, trend }: KPICardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "rounded-xl border border-border/50 p-5 relative overflow-hidden",
        gradient && gradientMap[gradient]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-1 text-foreground">{value}</h3>
          {trend && (
            <p className="text-xs text-muted-foreground mt-1">{trend}</p>
          )}
        </div>
        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", iconColor)}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default KPICard;
