
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Support() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Support request submitted!");
  };
  
  const faqs = [
    {
      question: "How accurate is GastroVision AI?",
      answer: "GastroVision AI has been validated with an accuracy of over 94% in detecting common gastric abnormalities, including polyps, ulcers, and inflammatory conditions. The system continues to improve as more data is analyzed."
    },
    {
      question: "What file formats are supported for image upload?",
      answer: "GastroVision AI supports JPEG (.jpg) and PNG (.png) image formats. We recommend uploading high-resolution images for the best analysis results. The maximum file size supported is 10MB."
    },
    {
      question: "How is my data protected?",
      answer: "We take data security and privacy seriously. All uploaded images and patient data are encrypted in transit and at rest. Our platform is HIPAA compliant, and we do not share your data with third parties without consent."
    },
    {
      question: "Can I export analysis results?",
      answer: "Yes, you can export analysis results and reports in several formats, including PDF and CSV. These can be easily integrated into electronic medical record systems."
    },
    {
      question: "Does GastroVision AI require internet connectivity?",
      answer: "Yes, GastroVision AI is a cloud-based platform that requires internet connectivity to process images and generate results. This ensures that you always have access to the latest AI models and updates."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">

      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">

            <h1 className="text-3xl font-bold text-gray-900 mb-6">Support Center</h1>
            
            {/* FAQ Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
            
            {/* Contact Form */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h2>
              
              <div className="bg-white border border-border rounded-lg p-8">
                <p className="text-gray-600 mb-6">
                  Can't find what you're looking for? Send us a message and our support team will get back to you as soon as possible.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number (optional)</label>
                      <Input 
                         id="phone" 
                         type="tel" 
                         placeholder="+91 9876543210" 
                      />
                      </div>
                      
                  <div className="space-y-2">
                    <label htmlFor="org" className="text-sm font-medium text-gray-700">Organization / Hospital</label>
                    <Input 
                      id="org" 
                      type="text" 
                      placeholder="e.g., AIIMS Delhi" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                    <select id="subject" className="w-full border border-gray-300 rounded-md p-2">
                      <option value="">Select an issue type</option>
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account / Access</option>
                      <option value="billing">Billing / Payments</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="urgency" className="text-sm font-medium text-gray-700">Urgency</label>
                    <select id="urgency" className="w-full border border-gray-300 rounded-md p-2">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      </select>
                      </div>
                      </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your issue or question"
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div className="text-right">
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8">
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </section>

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
