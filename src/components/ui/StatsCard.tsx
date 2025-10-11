
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, description, trend, className }: StatsCardProps) {
  return (
    <div className={cn("bg-white rounded-lg border border-border p-4", className)}>
      <h3 className="text-gray-500 font-medium text-sm mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        {trend && (
          <div className="flex items-center">
            <span 
              className={cn("text-sm font-medium", 
                trend.positive ? "text-emerald-600" : "text-rose-600"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
