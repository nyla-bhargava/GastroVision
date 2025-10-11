
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Image, PieChart } from "lucide-react";

interface GradCAMProps {
  originalImage: string;
  heatmapImage?: string;
  className?: string;
}

const GradCAM = ({ 
  originalImage, 
  heatmapImage = "https://via.placeholder.com/400x300/f8d/fff?text=Grad-CAM+Heatmap", 
  className 
}: GradCAMProps) => {
  const [opacity, setOpacity] = useState(0.7);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Visual Explanation</CardTitle>
        <CardDescription>
          Grad-CAM visualization highlights regions of interest identified by the AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="blended" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="original">
              <Image className="h-4 w-4 mr-2" />
              Original
            </TabsTrigger>
            <TabsTrigger value="heatmap">
              <PieChart className="h-4 w-4 mr-2" />
              Heatmap
            </TabsTrigger>
            <TabsTrigger value="blended">
              <Eye className="h-4 w-4 mr-2" />
              Blended
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="original" className="mt-4">
            <div className="flex justify-center">
              <img 
                src={originalImage} 
                alt="Original" 
                className="max-h-[300px] max-w-full object-contain rounded-md shadow-sm" 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="heatmap" className="mt-4">
            <div className="flex justify-center">
              <img 
                src={heatmapImage} 
                alt="Heatmap" 
                className="max-h-[300px] max-w-full object-contain rounded-md shadow-sm" 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="blended" className="mt-4">
            <div className="flex justify-center relative">
              <img 
                src={originalImage} 
                alt="Original" 
                className="max-h-[300px] max-w-full object-contain rounded-md shadow-sm" 
              />
              <img 
                src={heatmapImage} 
                alt="Heatmap" 
                className="absolute inset-0 max-h-[300px] max-w-full object-contain rounded-md shadow-sm" 
                style={{ opacity: opacity, mixBlendMode: 'multiply' }}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Opacity</span>
                <span>{Math.round(opacity * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <div className="space-y-2 w-full">
          <p>
            <strong>How to interpret:</strong> Red areas indicate regions where the AI focused its attention to make the prediction.
          </p>
          <p>
            Grad-CAM (Gradient-weighted Class Activation Mapping) makes AI decisions more transparent by visualizing which parts of the image influenced the classification result.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GradCAM;
