
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Upload, BarChart2, FileText, Settings } from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Upload", icon: Upload, path: "/upload" },
    { name: "Results", icon: BarChart2, path: "/results" },
    { name: "Reports", icon: FileText, path: "/reports" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className={cn("h-screen flex flex-col bg-white border-r border-border w-64", className)}>
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/src/assets/heart-logo.svg" alt="GastroVision" className="h-6 w-6" />
          <div>
            <h3 className="font-semibold text-xl text-gray-800">GastroVision</h3>
            <p className="text-xs text-gray-500">AI Insights</p>
          </div>
        </Link>
      </div>
      
      <div className="flex-1 py-6">
        <p className="px-4 text-xs font-medium text-gray-500 mb-4">Navigation</p>
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  isActive
                    ? "bg-accent text-primary"
                    : "text-gray-600 hover:bg-accent hover:text-primary"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5",
                    isActive ? "text-primary" : "text-gray-500 group-hover:text-primary"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
