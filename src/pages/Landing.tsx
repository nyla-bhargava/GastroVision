import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Heart, ArrowRight, Microscope, Mail, HelpCircle, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-med-blue-light to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-med-blue" />
              <span className="ml-2 text-xl font-semibold text-med-blue">GastroVision AI</span>
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-med-blue">Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-teal-50 to-white p-6 no-underline outline-none focus:shadow-md">
                            <Microscope className="h-6 w-6 text-med-teal mb-2" />
                            <div className="mb-2 text-lg font-medium text-med-blue">
                              AI-Powered Analysis
                            </div>
                            <p className="text-sm leading-tight text-med-teal">
                              Advanced machine learning for accurate gastric disease detection
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-teal-100 focus:bg-teal-100">
                            <div className="text-sm font-medium leading-none text-med-blue">Real-time Processing</div>
                            <p className="line-clamp-2 text-sm leading-snug text-med-teal">
                              Instant analysis during live procedures
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-teal-100 focus:bg-teal-100">
                            <div className="text-sm font-medium leading-none text-med-blue">Explainable AI</div>
                            <p className="line-clamp-2 text-sm leading-snug text-med-teal">
                              Grad-CAM heatmaps for transparent decisions
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/about"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-med-blue transition-colors hover:text-teal-600 focus:text-teal-600"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    About
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/support"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-med-blue transition-colors hover:text-teal-600 focus:text-teal-600"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Support
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to="/login"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-med-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Heart className="mx-auto h-16 w-16 text-med-blue mb-4" />
            <h1 className="text-4xl font-bold text-med-blue mb-4">
              GastroVision AI Assistant
            </h1>
            <p className="text-xl text-med-teal max-w-2xl mx-auto mb-8">
              Advanced AI-powered endoscopic analysis for precise and real-time gastric disease detection
            </p>
            <Link to="/login">
              <Button className="bg-med-teal hover:bg-teal-600 text-white px-8 py-6 text-lg rounded-full transition-all hover:scale-105">
                Start Analysis
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="pb-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <Microscope className="mx-auto h-12 w-12 text-med-teal mb-4" />
                <h3 className="font-semibold text-xl text-med-blue mb-2">Real-time Analysis</h3>
                <p className="text-med-teal">
                  Instant disease detection during live endoscopic procedures
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <Heart className="mx-auto h-12 w-12 text-med-teal mb-4" />
                <h3 className="font-semibold text-xl text-med-blue mb-2">Diagnostic Support</h3>
                <p className="text-med-teal">
                  AI-assisted identification of potential lesions and abnormalities
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur">
              <CardContent className="p-6 text-center">
                <ArrowRight className="mx-auto h-12 w-12 text-med-teal mb-4" />
                <h3 className="font-semibold text-xl text-med-blue mb-2">Explainable AI</h3>
                <p className="text-med-teal">
                  Grad-CAM heatmaps for transparent decision-making
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur border-t">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-med-blue tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-med-teal hover:text-teal-600">About</Link></li>
                <li><Link to="/careers" className="text-med-teal hover:text-teal-600">Careers</Link></li>
                <li><Link to="/contact" className="text-med-teal hover:text-teal-600">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-med-blue tracking-wider uppercase mb-4">Support</h3>
              <ul className="space-y-4">
                <li><Link to="/help" className="text-med-teal hover:text-teal-600">Help Center</Link></li>
                <li><Link to="/documentation" className="text-med-teal hover:text-teal-600">Documentation</Link></li>
                <li><Link to="/guides" className="text-med-teal hover:text-teal-600">Guides</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-med-blue tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-4">
                <li><Link to="/privacy" className="text-med-teal hover:text-teal-600">Privacy</Link></li>
                <li><Link to="/terms" className="text-med-teal hover:text-teal-600">Terms</Link></li>
                <li><Link to="/security" className="text-med-teal hover:text-teal-600">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-med-blue tracking-wider uppercase mb-4">Connect</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-med-teal hover:text-teal-600">Twitter</a></li>
                <li><a href="#" className="text-med-teal hover:text-teal-600">LinkedIn</a></li>
                <li><a href="#" className="text-med-teal hover:text-teal-600">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-teal-100 pt-8">
            <p className="text-med-teal text-center">© 2025 GastroVision AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}