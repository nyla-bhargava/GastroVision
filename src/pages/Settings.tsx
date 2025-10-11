
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { SettingsOption } from "../components/ui/SettingsOption";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  // State for various settings
  const [autoSaveResults, setAutoSaveResults] = useState(true);
  const [analyticsSharing, setAnalyticsSharing] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [highPerformanceMode, setHighPerformanceMode] = useState(true);
  const [cacheImages, setCacheImages] = useState(true);
  const [appearanceMode, setAppearanceMode] = useState("light");
  
  return (
    <div >


        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500">Configure application preferences and access system settings</p>
          </div>
          
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <Tabs defaultValue="general">
              <div className="border-b border-border">
                <TabsList className="bg-transparent border-b-0 p-0">
                  <TabsTrigger
                    value="general"
                    className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                  >
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                  >
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="language"
                    className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                  >
                    Language
                  </TabsTrigger>
                  <TabsTrigger
                    value="privacy"
                    className="py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                  >
                    Privacy
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="general" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
                    <p className="text-sm text-gray-500 mb-6">Manage your basic application preferences</p>
                    
                    {/* Appearance */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">Appearance</h3>
                          <p className="text-sm text-gray-500 mt-1">Choose between light and dark mode</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button 
                            variant={appearanceMode === "light" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setAppearanceMode("light")}
                            className="flex items-center space-x-1"
                          >
                            <span className="i-lucide-sun h-4 w-4 mr-1" />
                            <span>Light</span>
                          </Button>
                          <Button 
                            variant={appearanceMode === "dark" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setAppearanceMode("dark")}
                            className="flex items-center space-x-1"
                          >
                            <span className="i-lucide-moon h-4 w-4 mr-1" />
                            <span>Dark</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* General Settings Options */}
                    <div className="space-y-0 divide-y divide-border">
                      <SettingsOption
                        title="AutoSave Results"
                        description="Automatically save all analysis results"
                        checked={autoSaveResults}
                        onCheckedChange={setAutoSaveResults}
                      />
                      <SettingsOption
                        title="Analytics Sharing"
                        description="Share anonymized usage data to improve the system"
                        checked={analyticsSharing}
                        onCheckedChange={setAnalyticsSharing}
                      />
                      <SettingsOption
                        title="High Contrast Mode"
                        description="Increase visual contrast for better accessibility"
                        checked={highContrastMode}
                        onCheckedChange={setHighContrastMode}
                      />
                    </div>
                  </div>
                  
                  {/* Performance Section */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance</h2>
                    <p className="text-sm text-gray-500 mb-6">Configure processing settings and performance options</p>
                    
                    <div className="space-y-0 divide-y divide-border">
                      <SettingsOption
                        title="High Performance Mode"
                        description="Use more system resources for faster processing"
                        checked={highPerformanceMode}
                        onCheckedChange={setHighPerformanceMode}
                      />
                      <SettingsOption
                        title="Cache Images"
                        description="Store recent images locally for faster access"
                        checked={cacheImages}
                        onCheckedChange={setCacheImages}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
                <p className="text-sm text-gray-500 mb-6">Manage your notification preferences</p>
                {/* Notification settings would go here */}
                <div className="text-center text-gray-500 py-12">
                  Notification settings are coming soon
                </div>
              </TabsContent>
              
              <TabsContent value="language" className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">Language Settings</h2>
                <p className="text-sm text-gray-500 mb-6">Choose your preferred language</p>
                {/* Language settings would go here */}
                <div className="text-center text-gray-500 py-12">
                  Language settings are coming soon
                </div>
              </TabsContent>
              
              <TabsContent value="privacy" className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">Privacy Settings</h2>
                <p className="text-sm text-gray-500 mb-6">Manage your privacy preferences</p>
                {/* Privacy settings would go here */}
                <div className="text-center text-gray-500 py-12">
                  Privacy settings are coming soon
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

    </div>
  );
}
