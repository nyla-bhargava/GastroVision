
import { cn } from "@/lib/utils";

interface ExampleImageProps {
  src: string;
  alt: string;
  title: string;
  onClick?: () => void;
  className?: string;
}

export function ExampleImage({ src, alt, title, onClick, className }: ExampleImageProps) {
  return (
    <div 
      className={cn(
        "cursor-pointer group transition-all duration-200 hover:ring-2 hover:ring-primary hover:ring-offset-2",
        className
      )}
      onClick={onClick}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-32 object-cover rounded-lg mb-2" 
      />
      <h3 className="text-sm font-medium text-gray-900 text-center group-hover:text-primary">
        {title}
      </h3>
    </div>
  );
}
