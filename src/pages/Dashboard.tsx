import { StatsCard } from "../components/ui/StatsCard";
import { ActivityItem } from "../components/ui/ActivityItem";
import { ActionCard } from "../components/ui/ActionCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, BarChart2, FileText, Settings } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  
  const stats = [
    {
      title: "Total Images",
      value: "247",
      description: "Processed images",
      trend: { value: "12%", positive: true },
    },
    {
      title: "Detected Anomalies",
      value: "68",
      description: "Across all images",
      trend: { value: "8%", positive: true },
    },
    {
      title: "Processing Time",
      value: "1.4s",
      description: "Average per image",
      trend: { value: "0.3s", positive: false },
    },
    {
      title: "Model Accuracy",
      value: "94.3%",
      description: "On test dataset",
      trend: { value: "0.8%", positive: true },
    },
  ];
  
  const activities = [
    {
      title: "Image #247 uploaded",
      timestamp: "1 hour ago",
      status: "info" as const,
    },
    {
      title: "Report generated for patient",
      timestamp: "3 hours ago",
      status: "success" as const,
    },
    {
      title: "Polyp detected with 95% confidence",
      timestamp: "5 hours ago",
      status: "error" as const,
    },
    {
      title: "System updated to v1.2.3",
      timestamp: "1 day ago",
      status: "neutral" as const,
    },
  ];
  
  const actions = [
    {
      icon: Upload,
      title: "Upload Image",
      description: "Analyze a new image",
      onClick: () => navigate("/upload"),
    },
    {
      icon: BarChart2,
      title: "View Results",
      description: "Check recent results",
      onClick: () => navigate("/results"),
    },
    {
      icon: FileText,
      title: "Generate Report",
      description: "Create PDF summary",
      onClick: () => navigate("/reports"),
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Configure preferences",
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">
          Welcome to GastroVision AI - Medical imaging analysis platform
        </p>
      </div>
      
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            trend={stat.trend}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activities Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <p className="text-sm text-gray-500">Overview of your recent activities</p>
              </div>
            </div>
            
            <div className="divide-y divide-border">
              {activities.map((activity, idx) => (
                <ActivityItem
                  key={idx}
                  title={activity.title}
                  timestamp={activity.timestamp}
                  status={activity.status}
                />
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="ghost" className="text-primary">
                View All Activities
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Quick Actions Section */}
        <div>
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              <p className="text-sm text-gray-500">Frequently used tools</p>
            </div>
            
            <div className="space-y-4">
              {actions.map((action) => (
                <ActionCard
                  key={action.title}
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  onClick={action.onClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border pt-10 pb-6 text-sm text-gray-500">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Company</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-primary">About</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Documentation</a></li>
              <li><a href="#" className="hover:text-primary">Guides</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Legal</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-primary">Privacy</a></li>
              <li><a href="#" className="hover:text-primary">Terms</a></li>
              <li><a href="#" className="hover:text-primary">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Connect</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-primary">Twitter</a></li>
              <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
              <li><a href="#" className="hover:text-primary">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-400">
          © 2024 GastroVision AI. All rights reserved.
        </div>
      </footer>
      
    </>
  );
}