
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export function ActionCard({ icon: Icon, title, description, onClick, className }: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-start space-x-4 p-4 bg-white rounded-lg border border-border transition-all hover:border-primary/50 hover:shadow-sm",
        className
      )}
    >
      <div className="p-2 rounded-lg bg-accent">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="text-left">
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </button>
  );
}
