
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  title: string;
  timestamp: string;
  status?: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  className?: string;
}

export function ActivityItem({ title, timestamp, status = 'neutral', className }: ActivityItemProps) {
  const statusColors = {
    info: "bg-blue-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-rose-500",
    neutral: "bg-gray-500"
  };

  return (
    <div className={cn("flex items-start py-4", className)}>
      <div className={cn("h-2 w-2 mt-1.5 rounded-full mr-4", statusColors[status])} />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
      </div>
    </div>
  );
}
