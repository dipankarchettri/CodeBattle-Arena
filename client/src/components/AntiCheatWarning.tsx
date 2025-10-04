import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// This interface defines the new props required for the component
interface AntiCheatWarningProps {
  isVisible: boolean;
  warningCount: number;
  maxWarnings: number;
  onDismiss: () => void;
}

export default function AntiCheatWarning({ isVisible, warningCount, maxWarnings, onDismiss }: AntiCheatWarningProps) {
  // Don't render anything if the warning is not visible
  if (!isVisible || warningCount === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-300 ease-out">
      <div className="bg-accent-competitive text-white px-4 py-3 shadow-lg">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-semibold">Tab Switch Detected!</p>
              <p className="text-sm opacity-90">
                Warning {warningCount} of {maxWarnings}. {maxWarnings - warningCount} warnings remaining before submission is locked.
              </p>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onDismiss}
            className="text-white hover:bg-white/20"
            aria-label="Dismiss warning"
            data-testid="button-dismiss-warning"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

