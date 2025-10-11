
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ReportOption } from "../components/ui/ReportOption";
import { ReportItem } from "../components/ui/ReportItem";
import { Button } from "@/components/ui/button";
import { FileText, Eye, BarChart2, FileDigit } from "lucide-react";

export default function Reports() {
  const [selectedReportType, setSelectedReportType] = useState<string>("clinical");
  
  const reportOptions = [
    {
      id: "clinical",
      icon: FileText,
      title: "Clinical Report",
      description: "Comprehensive patient-focused report with detailed findings",
    },
    {
      id: "analysis",
      icon: Eye,
      title: "Image Analysis",
      description: "Visual report with annotations and heatmaps",
    },
    {
      id: "summary",
      icon: FileDigit,
      title: "Summary Report",
      description: "Compilation of multiple analyses over a time period",
    },
  ];
  
  const availableReports = [
    {
      title: "Patient Analysis - Image #247",
      description: "Complete analysis of polyp detection",
      date: "April 21, 2023",
      type: "Clinical",
    },
    {
      title: "Weekly Summary Report",
      description: "Summary of all analyses performed this week",
      date: "April 20, 2023",
      type: "Summary",
    },
    {
      title: "Model Performance Report",
      description: "Accuracy and reliability metrics",
      date: "April 18, 2023",
      type: "Technical",
    },
    {
      title: "Patient Analysis - Image #243",
      description: "Normal gastric mucosa assessment",
      date: "April 15, 2023",
      type: "Clinical",
    },
  ];
  
  return (
    <div className="flex h-screen overflow-hidden">

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-500">Generate and view diagnostic reports for your analyses</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Generate New Report Section */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-semibold text-gray-900">Generate New Report</h2>
                  <p className="text-sm text-gray-500">Create a customized report from your analysis data</p>
                </div>
                
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Report Options</h3>
                  
                  <div className="space-y-4">
                    {reportOptions.map((option) => (
                      <ReportOption
                        key={option.id}
                        icon={option.icon}
                        title={option.title}
                        description={option.description}
                        selected={selectedReportType === option.id}
                        onClick={() => setSelectedReportType(option.id)}
                      />
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Generate New Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Available Reports Section */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-border rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-semibold text-gray-900">Available Reports</h2>
                  <p className="text-sm text-gray-500">Previously generated reports ready for download</p>
                </div>
                
                <div className="p-6">
                  {availableReports.map((report, idx) => (
                    <ReportItem
                      key={idx}
                      title={report.title}
                      description={report.description}
                      date={report.date}
                      type={report.type}
                      onView={() => {}}
                      onDownload={() => {}}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
}
