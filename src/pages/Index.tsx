
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Microscope, Heart, BarChart2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
export default function Index() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 flex justify-center">
              <img src="/src/assets/heart-logo.svg" alt="GastroVision Logo" className="h-16 w-16" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">GastroVision AI Assistant</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Advanced AI-powered endoscopic analysis for precise and real-time gastric 
              disease detection
            </p>
            
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8"
              onClick={() => navigate("/dashboard")}
            >
              Start Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-lg border border-border">
                <div className="p-3 bg-accent rounded-full inline-flex mb-4">
                  <Microscope className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-4">Real-time Analysis</h2>
                <p className="text-gray-600">
                  Instant disease detection during live endoscopic procedures
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-lg border border-border">
                <div className="p-3 bg-accent rounded-full inline-flex mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-4">Diagnostic Support</h2>
                <p className="text-gray-600">
                  AI-assisted identification of potential lesions and abnormalities
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-lg border border-border">
                <div className="p-3 bg-accent rounded-full inline-flex mb-4">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-4">Historical Tracking</h2>
                <p className="text-gray-600">
                  Comprehensive timeline of predictions and findings
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-50 py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2025 GastroVision AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
