
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

interface ReportItemProps {
  title: string;
  description: string;
  date: string;
  type: string;
  onView?: () => void;
  onDownload?: () => void;
  className?: string;
}

export function ReportItem({
  title,
  description,
  date,
  type,
  onView,
  onDownload,
  className,
}: ReportItemProps) {
  const typeStyles = {
    clinical: "bg-rose-100 text-rose-800",
    summary: "bg-amber-100 text-amber-800",
    technical: "bg-blue-100 text-blue-800",
  };

  const typeKey = type.toLowerCase() as keyof typeof typeStyles;
  const badgeStyle = typeStyles[typeKey] || "bg-gray-100 text-gray-800";

  return (
    <div className={cn("border-b border-border py-4", className)}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900">{title}</h3>
            <span className={cn("text-xs px-2 py-1 rounded-full", badgeStyle)}>
              {type}
            </span>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onView}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
