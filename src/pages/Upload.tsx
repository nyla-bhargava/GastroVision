import { useState } from "react";
import { FileUpload } from "../components/ui/FileUpload";
import { ExampleImage } from "../components/ui/ExampleImage";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Import images
import normalGastricMucosa from "@/assets/example_images/normal-gastric-mucosa.jpg";
import gastricPolyp from "@/assets/example_images/gastric-polyp.jpg";
import ulcerativeColitis from "@/assets/example_images/ulcerative-colitis.jpg";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };
  
  const examples = [
    {
      src: normalGastricMucosa,
      alt: "Normal Gastric Mucosa",
      title: "Normal Gastric Mucosa",
    },
    {
      src: gastricPolyp,
      alt: "Gastric Polyp",
      title: "Gastric Polyp",
    },
    {
      src: ulcerativeColitis,
      alt: "Ulcerative Colitis",
      title: "Ulcerative Colitis",
    },
  ];
  
  const handleExampleSelect = (src: string, title: string) => {
    setSelectedFile(null);
    setPreviewUrl(src);
  };
  
  const handleAnalyze = () => {
    navigate("/results");
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Upload Image</h1>
        <p className="text-gray-500">Upload gastroscopic images for AI analysis</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <FileUpload onFileSelect={handleFileSelect} />
        </div>
        
        <div className="lg:col-span-2">
          <div className="border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Image Preview</h2>
            <p className="text-sm text-gray-500 mb-6">Preview of the selected image</p>
            
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-64 object-contain bg-gray-50 rounded-lg" 
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <img 
                    src="/path/to/fallback-image.jpg" 
                    alt="No image" 
                    className="w-20 h-20 mx-auto mb-4 text-gray-400" 
                  />
                  <p className="text-gray-500">No image selected</p>
                </div>
              </div>
            )}
            
            <div className="mt-6 text-right">
              <p className="text-sm text-gray-500 mb-2">
                {selectedFile ? `Selected: ${selectedFile.name}` : previewUrl ? "Example image selected" : "Upload or select an example image"}
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white"
                disabled={!previewUrl}
                onClick={handleAnalyze}
              >
                Analyze Image
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 mb-8">
        <div className="bg-white border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Example Images</h2>
          <p className="text-sm text-gray-500 mb-6">Try the analysis with these example images</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {examples.map((example, idx) => (
              <ExampleImage
                key={idx}
                src={example.src}
                alt={example.alt}
                title={example.title}
                onClick={() => handleExampleSelect(example.src, example.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}