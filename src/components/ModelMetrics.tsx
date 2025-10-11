
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for metrics visualization
const confusionMatrix = [
  [142, 5, 2, 1],
  [3, 35, 1, 0],
  [1, 2, 28, 1],
  [0, 0, 1, 27]
];

const classNames = ["Normal", "Polyp", "Ulcerative Colitis", "Esophagitis"];

const metrics = {
  accuracy: 94.3,
  precision: 91.7,
  recall: 89.5,
  f1Score: 90.6
};

interface ModelMetricsProps {
  className?: string;
}

const ModelMetrics = ({ className }: ModelMetricsProps) => {
  const [selectedMetricsTab, setSelectedMetricsTab] = useState("confusion");

  // Calculate confusion matrix color intensity
  const getMaxValue = () => {
    let max = 0;
    for (let i = 0; i < confusionMatrix.length; i++) {
      for (let j = 0; j < confusionMatrix[i].length; j++) {
        if (confusionMatrix[i][j] > max) {
          max = confusionMatrix[i][j];
        }
      }
    }
    return max;
  };

  const getBackgroundColor = (value: number) => {
    const maxValue = getMaxValue();
    const intensity = Math.min(0.9, (value / maxValue) * 0.9);
    return `rgba(var(--primary), ${intensity})`;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Model Performance</CardTitle>
        <CardDescription>
          Detailed metrics showing AI model reliability and performance
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <Tabs 
          value={selectedMetricsTab} 
          onValueChange={setSelectedMetricsTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="confusion">Confusion Matrix</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="confusion" className="space-y-4 p-4">
            <div className="text-sm text-muted-foreground mb-2">
              Shows the distribution of predictions versus actual classes
            </div>
            
            <div className="flex">
              {/* Y-axis labels */}
              <div className="flex flex-col items-end pr-2 mr-1 mt-8">
                <div className="text-xs text-muted-foreground mb-2">Actual</div>
                {classNames.map((className, i) => (
                  <div 
                    key={`y-label-${i}`} 
                    className="h-8 flex items-center font-medium text-xs"
                  >
                    {className}
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col">
                {/* X-axis labels */}
                <div className="flex ml-8 mb-1">
                  <div className="text-xs text-muted-foreground">Predicted</div>
                </div>
                <div className="flex">
                  <div className="flex">
                    {classNames.map((className, i) => (
                      <div 
                        key={`x-label-${i}`}
                        className="w-8 h-8 flex items-center justify-center transform -rotate-45 origin-left font-medium text-xs"
                      >
                        {className}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Matrix values */}
                <div className="flex flex-col">
                  {confusionMatrix.map((row, i) => (
                    <div key={`row-${i}`} className="flex">
                      {row.map((value, j) => (
                        <div 
                          key={`cell-${i}-${j}`}
                          className="w-8 h-8 flex items-center justify-center text-xs font-medium border m-0.5 rounded-sm"
                          style={{ 
                            backgroundColor: getBackgroundColor(value),
                            color: i === j ? 'white' : 'inherit'
                          }}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6 p-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </div>
                  <div className="text-2xl font-bold">{value}%</div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-sm text-muted-foreground mt-4">
              <p className="mb-2"><strong>Metrics Definitions:</strong></p>
              <ul className="space-y-1 list-disc pl-5">
                <li><strong>Accuracy:</strong> Overall correctness of all predictions</li>
                <li><strong>Precision:</strong> How many of the positive predictions are actually correct</li>
                <li><strong>Recall:</strong> How many actual positives were correctly identified</li>
                <li><strong>F1 Score:</strong> Harmonic mean of precision and recall</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ModelMetrics;
