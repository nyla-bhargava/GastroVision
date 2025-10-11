

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogIn, Info, LifeBuoy } from "lucide-react";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header className={cn("bg-white border-b border-border sticky top-0 z-30", className)}>
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/src/assets/heart-logo.svg" alt="GastroVision" className="h-6 w-6" />
            <span className="text-xl font-semibold text-gray-900">GastroVision AI</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1">
                <span>Features</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Real-time Analysis</DropdownMenuItem>
              <DropdownMenuItem>Diagnostic Support</DropdownMenuItem>
              <DropdownMenuItem>Historical Tracking</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" asChild>
            <Link to="/about" className="flex items-center space-x-1">
              <Info className="h-4 w-4 mr-1" />
              <span>About</span>
            </Link>
          </Button>
          
          <Button variant="ghost" asChild>
            <Link to="/support" className="flex items-center space-x-1">
              <LifeBuoy className="h-4 w-4 mr-1" />
              <span>Support</span>
            </Link>
          </Button>
          
          <Button asChild className="bg-primary text-white hover:bg-primary/90">
            <Link to="/sign-in" className="flex items-center space-x-1">
              <LogIn className="h-4 w-4 mr-1" />
              <span>Sign In</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
