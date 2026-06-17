import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Zap,
  MemoryStick,
  FileWarning,
} from "lucide-react";

type VerdictCode = "AC" | "WA" | "TLE" | "MLE" | "RE" | "CE" | "pending" | string | null | undefined;

interface VerdictBadgeProps {
  verdict?: VerdictCode;
  /** Fallback: old status string from pre-verdict submissions */
  status?: string;
  size?: "sm" | "md";
}

interface VerdictConfig {
  label: string;
  icon: React.ElementType;
  className: string;
}

const verdictMap: Record<string, VerdictConfig> = {
  AC: {
    label: "Accepted",
    icon: CheckCircle2,
    className: "bg-emerald-500 hover:bg-emerald-600 text-white border-0",
  },
  WA: {
    label: "Wrong Answer",
    icon: XCircle,
    className: "bg-red-500 hover:bg-red-600 text-white border-0",
  },
  TLE: {
    label: "Time Limit",
    icon: Zap,
    className: "bg-amber-500 hover:bg-amber-600 text-white border-0",
  },
  MLE: {
    label: "Memory Limit",
    icon: MemoryStick,
    className: "bg-purple-500 hover:bg-purple-600 text-white border-0",
  },
  RE: {
    label: "Runtime Error",
    icon: AlertCircle,
    className: "bg-orange-500 hover:bg-orange-600 text-white border-0",
  },
  CE: {
    label: "Compile Error",
    icon: FileWarning,
    className: "bg-slate-500 hover:bg-slate-600 text-white border-0",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-secondary text-secondary-foreground border-0",
  },
};

/** Maps legacy status strings to verdict codes */
function resolveVerdict(verdict: VerdictCode, status?: string): string {
  if (verdict && verdictMap[verdict]) return verdict;
  // Fallback for old submissions that have no verdict field yet
  if (status === "correct") return "AC";
  if (status === "incorrect") return "WA";
  if (status === "error") return "RE";
  return "pending";
}

export function VerdictBadge({ verdict, status, size = "md" }: VerdictBadgeProps) {
  const code = resolveVerdict(verdict, status);
  const config = verdictMap[code] || verdictMap["pending"];
  const Icon = config.icon;
  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  const textSize = size === "sm" ? "text-xs" : "text-xs font-semibold";

  return (
    <Badge className={`${config.className} ${textSize} gap-1 px-2 py-0.5`}>
      <Icon className={iconSize} />
      <span>{config.label}</span>
    </Badge>
  );
}
