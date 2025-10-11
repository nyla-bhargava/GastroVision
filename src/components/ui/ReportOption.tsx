
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ReportOptionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ReportOption({
  icon: Icon,
  title,
  description,
  selected = false,
  onClick,
  className,
}: ReportOptionProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-start p-4 border rounded-lg cursor-pointer transition-all",
        selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30",
        className
      )}
    >
      <div className="p-2 bg-accent rounded-md">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="ml-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}
