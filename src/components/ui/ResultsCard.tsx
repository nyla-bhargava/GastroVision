
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, BarChart2, BookmarkPlus, FileText } from "lucide-react";

interface ResultsCardProps {
  image: string;
  prediction: string;
  confidence: string;
  className?: string;
  details?: {
    location?: string;
    size?: string;
    description?: string;
  };
  probabilities?: Array<{
    label: string;
    value: number;
  }>;
  onViewHeatmap?: () => void;
  onViewMetrics?: () => void;
  onAnnotate?: () => void;
  onGenerateReport?: () => void;
}

export function ResultsCard({
  image,
  prediction,
  confidence,
  className,
  details,
  probabilities,
  onViewHeatmap,
  onViewMetrics,
  onAnnotate,
  onGenerateReport,
}: ResultsCardProps) {
  const isPrimary = prediction.toLowerCase() === "polyp";
  
  return (
    <div className={cn("bg-white border border-border rounded-lg overflow-hidden", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div>
          <img
            src={image}
            alt="Gastroscopic"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        
        <div>
          <div className="mb-6">
            <h2 className="text-gray-500 font-medium mb-1">Prediction</h2>
            <div className="flex items-end gap-2">
              <h3 className={cn(
                "text-2xl font-bold", 
                isPrimary ? "text-rose-600" : "text-gray-900"
              )}>
                {prediction}
              </h3>
              <span className="text-sm text-gray-500">({confidence} confidence)</span>
            </div>
          </div>
          
          {probabilities && (
            <div className="mb-6">
              <h3 className="text-gray-500 font-medium mb-3">Class Probabilities</h3>
              <div className="space-y-2">
                {probabilities.map((prob) => (
                  <div key={prob.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{prob.label}</span>
                      <span>{prob.value.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full",
                          prob.label.toLowerCase() === "polyp" ? "bg-rose-500" : 
                          prob.label.toLowerCase() === "normal" ? "bg-teal-500" :
                          prob.label.toLowerCase() === "ulcerative colitis" ? "bg-amber-500" :
                          "bg-blue-500"
                        )}
                        style={{ width: `${prob.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {details && (
            <div className="mb-6">
              <h3 className="text-gray-500 font-medium mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {details.location && (
                  <>
                    <div className="text-sm text-gray-500">Location:</div>
                    <div className="text-sm font-medium">{details.location}</div>
                  </>
                )}
                {details.size && (
                  <>
                    <div className="text-sm text-gray-500">Size:</div>
                    <div className="text-sm font-medium">{details.size}</div>
                  </>
                )}
                {details.description && (
                  <>
                    <div className="text-sm text-gray-500">Details:</div>
                    <div className="text-sm font-medium">{details.description}</div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 border-t border-border p-4">
        <Button variant="ghost" size="sm" className="text-gray-600" onClick={onViewHeatmap}>
          <Eye className="h-4 w-4 mr-1" />
          View Heatmap
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-600" onClick={onViewMetrics}>
          <BarChart2 className="h-4 w-4 mr-1" />
          View Metrics
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-600" onClick={onAnnotate}>
          <BookmarkPlus className="h-4 w-4 mr-1" />
          Annotate
        </Button>
        <Button variant="secondary" size="sm" onClick={onGenerateReport}>
          <FileText className="h-4 w-4 mr-1" />
          Generate Report
        </Button>
      </div>
    </div>
  );
}
