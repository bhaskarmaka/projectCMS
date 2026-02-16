import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "Open" | "In Progress" | "Resolved";
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const variants: Record<string, string> = {
    Open: "bg-warning/15 text-warning border-warning/30",
    "In Progress": "bg-info/15 text-info border-info/30",
    Resolved: "bg-success/15 text-success border-success/30",
  };

  return (
    <Badge variant="outline" className={cn("font-medium text-xs", variants[status], className)}>
      <span className={cn(
        "mr-1.5 h-1.5 w-1.5 rounded-full inline-block",
        status === "Open" && "bg-warning",
        status === "In Progress" && "bg-info",
        status === "Resolved" && "bg-success"
      )} />
      {status}
    </Badge>
  );
};

interface PriorityBadgeProps {
  priority: "Low" | "Medium" | "High" | "Critical";
  className?: string;
}

export const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const variants: Record<string, string> = {
    Low: "bg-muted text-muted-foreground border-border",
    Medium: "bg-info/15 text-info border-info/30",
    High: "bg-warning/15 text-warning border-warning/30",
    Critical: "bg-destructive/15 text-destructive border-destructive/30",
  };

  return (
    <Badge variant="outline" className={cn("font-medium text-xs", variants[priority], className)}>
      {priority}
    </Badge>
  );
};
