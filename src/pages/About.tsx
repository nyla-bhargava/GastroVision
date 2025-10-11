
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">About GastroVision AI</h1>
            
            <div className="prose prose-blue max-w-none">
              <p className="lead text-xl text-gray-600 mb-8">
                GastroVision AI is an advanced medical imaging platform that uses artificial intelligence to assist 
                gastroenterologists in detecting and diagnosing gastrointestinal diseases from endoscopic images.
              </p>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
              <p>
                Our mission is to improve patient outcomes by providing healthcare professionals with accurate, 
                real-time analysis of endoscopic images, enabling earlier detection and more precise diagnosis of 
                gastrointestinal disorders.
              </p>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Technology</h2>
              <p>
                GastroVision AI utilizes state-of-the-art deep learning algorithms trained on thousands of clinically 
                validated endoscopic images. Our technology can identify a wide range of conditions including:
              </p>
              
              <ul className="list-disc pl-6 mt-4">
                <li>Polyps and adenomas</li>
                <li>Inflammatory conditions (gastritis, colitis)</li>
                <li>Ulcerative lesions</li>
                <li>Barrett's esophagus</li>
                <li>Early neoplastic changes</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-accent p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">For Clinicians</h3>
                  <ul className="space-y-2">
                    <li>• Real-time diagnostic assistance</li>
                    <li>• Increased detection rates</li>
                    <li>• Standardized reporting</li>
                    <li>• Reduced procedural time</li>
                  </ul>
                </div>
                
                <div className="bg-accent p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">For Patients</h3>
                  <ul className="space-y-2">
                    <li>• More accurate diagnoses</li>
                    <li>• Earlier disease detection</li>
                    <li>• Improved treatment outcomes</li>
                    <li>• Potential reduction in follow-up procedures</li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Our Team</h2>
              <p>
                GastroVision AI was developed by a multidisciplinary team of gastroenterologists, data scientists, 
                and software engineers committed to advancing medical imaging technology for improved patient care.
              </p>
              
              <div className="mt-12 text-center">
                <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8">
                  <Link to="/dashboard">
                    Start Using GastroVision AI
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
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
