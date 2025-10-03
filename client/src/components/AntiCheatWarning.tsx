import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AntiCheatWarningProps {
  warningCount: number;
  maxWarnings: number;
  onDismiss: () => void;
}

export default function AntiCheatWarning({ warningCount, maxWarnings, onDismiss }: AntiCheatWarningProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-200">
      <div className="bg-chart-2 text-white px-4 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Tab Switch Detected!</p>
              <p className="text-sm opacity-90">
                Warning {warningCount} of {maxWarnings}. {maxWarnings - warningCount} warnings remaining before submission lock.
              </p>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onDismiss}
            className="text-white hover:bg-white/20"
            data-testid="button-dismiss-warning"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
