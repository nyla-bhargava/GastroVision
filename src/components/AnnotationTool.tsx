
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Pencil, Square, Circle, Undo2, Download, Save } from "lucide-react";

interface AnnotationToolProps {
  imageSrc: string;
  className?: string;
}

type DrawingMode = "pencil" | "rectangle" | "circle";
type Annotation = {
  mode: DrawingMode;
  points: { x: number; y: number }[];
  color: string;
};

const AnnotationTool = ({ imageSrc, className }: AnnotationToolProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [mode, setMode] = useState<DrawingMode>("pencil");
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [color, setColor] = useState("#FF3B30"); // Default to red
  
  const colors = ["#FF3B30", "#34C759", "#FFCC00", "#007AFF", "#5856D6"];
  
  // Initialize canvas context
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setContext(ctx);
    }
  }, []);
  
  // Load and draw the image
  useEffect(() => {
    if (context && canvasRef.current) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        // Set canvas dimensions to match image
        canvasRef.current!.width = img.width;
        canvasRef.current!.height = img.height;
        
        // Clear and draw image
        context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        context.drawImage(img, 0, 0, img.width, img.height);
        
        // Redraw all annotations
        drawAnnotations();
      };
    }
  }, [context, imageSrc]);
  
  // Redraw annotations when they change
  useEffect(() => {
    if (context && canvasRef.current) {
      drawAnnotations();
    }
  }, [annotations]);
  
  const drawAnnotations = () => {
    if (!context || !canvasRef.current) return;
    
    // Clear and redraw image
    const img = new Image();
    img.src = imageSrc;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.drawImage(img, 0, 0, img.width, img.height);
    
    // Draw all annotations
    annotations.forEach((annotation) => {
      context.strokeStyle = annotation.color;
      context.lineWidth = 3;
      
      if (annotation.mode === "pencil") {
        if (annotation.points.length < 2) return;
        
        context.beginPath();
        context.moveTo(annotation.points[0].x, annotation.points[0].y);
        
        for (let i = 1; i < annotation.points.length; i++) {
          context.lineTo(annotation.points[i].x, annotation.points[i].y);
        }
        
        context.stroke();
      } else if (annotation.mode === "rectangle" && annotation.points.length === 2) {
        const startPoint = annotation.points[0];
        const endPoint = annotation.points[1];
        
        const width = endPoint.x - startPoint.x;
        const height = endPoint.y - startPoint.y;
        
        context.strokeRect(startPoint.x, startPoint.y, width, height);
      } else if (annotation.mode === "circle" && annotation.points.length === 2) {
        const startPoint = annotation.points[0];
        const endPoint = annotation.points[1];
        
        const radius = Math.sqrt(
          Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)
        );
        
        context.beginPath();
        context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
        context.stroke();
      }
    });
  };
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    
    const newAnnotation: Annotation = {
      mode,
      points: [{ x, y }],
      color,
    };
    
    setCurrentAnnotation(newAnnotation);
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentAnnotation || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (mode === "pencil") {
      // For pencil, add all points
      setCurrentAnnotation({
        ...currentAnnotation,
        points: [...currentAnnotation.points, { x, y }],
      });
    } else {
      // For rectangle and circle, only need start and current point
      setCurrentAnnotation({
        ...currentAnnotation,
        points: [currentAnnotation.points[0], { x, y }],
      });
    }
    
    // Redraw temporarily with current annotation
    if (context) {
      drawAnnotations();
      
      // Draw current annotation
      context.strokeStyle = currentAnnotation.color;
      context.lineWidth = 3;
      
      if (mode === "pencil") {
        if (currentAnnotation.points.length < 2) return;
        
        context.beginPath();
        context.moveTo(currentAnnotation.points[0].x, currentAnnotation.points[0].y);
        
        for (let i = 1; i < currentAnnotation.points.length; i++) {
          context.lineTo(currentAnnotation.points[i].x, currentAnnotation.points[i].y);
        }
        
        context.stroke();
      } else if (mode === "rectangle") {
        const startPoint = currentAnnotation.points[0];
        const width = x - startPoint.x;
        const height = y - startPoint.y;
        
        context.strokeRect(startPoint.x, startPoint.y, width, height);
      } else if (mode === "circle") {
        const startPoint = currentAnnotation.points[0];
        const radius = Math.sqrt(
          Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2)
        );
        
        context.beginPath();
        context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
        context.stroke();
      }
    }
  };
  
  const finishDrawing = () => {
    if (isDrawing && currentAnnotation) {
      setAnnotations([...annotations, currentAnnotation]);
      setCurrentAnnotation(null);
    }
    
    setIsDrawing(false);
  };
  
  const undoLastAnnotation = () => {
    setAnnotations(annotations.slice(0, -1));
  };
  
  const saveAnnotations = () => {
    // In a real app, this would send annotations to the backend
    console.log("Saving annotations:", annotations);
    alert("Annotations saved successfully!");
  };
  
  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "annotated-image.png";
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Image Annotation Tool</CardTitle>
        <CardDescription>
          Mark regions of interest on the gastroscopic image
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <ToggleGroup type="single" value={mode} onValueChange={(value) => value && setMode(value as DrawingMode)}>
              <ToggleGroupItem value="pencil" aria-label="Toggle pencil">
                <Pencil className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="rectangle" aria-label="Toggle rectangle">
                <Square className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="circle" aria-label="Toggle circle">
                <Circle className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            
            <div className="flex space-x-2">
              {colors.map((clr) => (
                <button
                  key={clr}
                  className={`w-6 h-6 rounded-full ${
                    color === clr ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: clr }}
                  onClick={() => setColor(clr)}
                />
              ))}
            </div>
          </div>
          
          <div className="border rounded-md p-1 overflow-hidden max-h-[400px] flex items-center justify-center">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={finishDrawing}
              onMouseLeave={finishDrawing}
              className="max-w-full max-h-[380px] object-contain"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={undoLastAnnotation} disabled={annotations.length === 0}>
          <Undo2 className="h-4 w-4 mr-2" /> Undo
        </Button>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={downloadImage}>
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
          <Button onClick={saveAnnotations}>
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AnnotationTool;
