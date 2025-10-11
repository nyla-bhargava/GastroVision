
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ResultsCard } from "../components/ui/ResultsCard";
import { Eye } from "lucide-react";

export default function Results() {
  // Sample data for current analysis
  const currentAnalysis = {
    id: "#247",
    date: "April 21, 2023 at 14:32",
    image: "/src/assets/placeholder-image.svg",
    prediction: "Polyp",
    confidence: "94.5%",
    probabilities: [
      { label: "Polyp", value: 94.5 },
      { label: "Normal", value: 3.2 },
      { label: "Ulcerative Colitis", value: 1.8 },
      { label: "Esophagitis", value: 0.5 },
    ],
    details: {
      location: "Sigmoid Colon",
      size: "8mm",
      description: "Sessile polyp with smooth surface",
    },
  };
  
  // Sample data for recent results
  const recentResults = [
    { id: "#247", prediction: "Polyp", confidence: "94.5%" },
    { id: "#246", prediction: "Normal", confidence: "96.2%" },
    { id: "#245", prediction: "Ulcerative Colitis", confidence: "88.7%" },
    { id: "#244", prediction: "Esophagitis", confidence: "92.3%" },
    { id: "#243", prediction: "Normal", confidence: "98.1%" },
  ];
  
  return (
    <div className="flex h-screen overflow-hidden">
      
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Analysis Results</h1>
            <p className="text-gray-500">View and explore AI predictions for your gastroscopic images</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Current Analysis - 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-semibold text-gray-900">Current Analysis: Image {currentAnalysis.id}</h2>
                  <p className="text-sm text-gray-500">Processed on {currentAnalysis.date}</p>
                </div>
                
                <ResultsCard
                  image={currentAnalysis.image}
                  prediction={currentAnalysis.prediction}
                  confidence={currentAnalysis.confidence}
                  probabilities={currentAnalysis.probabilities}
                  details={currentAnalysis.details}
                  onViewHeatmap={() => {}}
                  onViewMetrics={() => {}}
                  onAnnotate={() => {}}
                  onGenerateReport={() => {}}
                />
              </div>
            </div>
            
            {/* Recent Results - 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Results</h2>
                  <p className="text-sm text-gray-500">History of previously analyzed images</p>
                </div>
                
                <div>
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prediction</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conf.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {recentResults.map((result) => (
                        <tr key={result.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {result.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={
                              result.prediction === "Polyp" ? "text-rose-600 font-medium" : ""
                            }>
                              {result.prediction}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.confidence}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary hover:text-primary/80">
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
}
