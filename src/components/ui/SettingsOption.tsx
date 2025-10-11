
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

interface SettingsOptionProps {
  title: string;
  description: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function SettingsOption({
  title,
  description,
  checked = false,
  onCheckedChange,
  className,
}: SettingsOptionProps) {
  return (
    <div className={cn("flex items-center justify-between py-4", className)}>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
