
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  className?: string;
}

export function FileUpload({ onFileSelect, className }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (onFileSelect) {
        onFileSelect(e.dataTransfer.files[0]);
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (onFileSelect) {
        onFileSelect(e.target.files[0]);
      }
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
        isDragging ? "border-primary bg-primary/5" : "border-border",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <div className="p-3 mb-4 bg-accent rounded-full">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          Drag and drop gastroscopic image here
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Supports JPG, PNG (max 10MB)
        </p>
        <label htmlFor="file-upload">
          <input
            id="file-upload"
            type="file"
            className="sr-only"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
          />
          <Button variant="outline" asChild>
            <span>Browse Files</span>
          </Button>
        </label>
      </div>
    </div>
  );
}
