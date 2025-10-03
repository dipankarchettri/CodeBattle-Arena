import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-8 hover-elevate transition-all duration-300 hover:scale-105">
      <div className="space-y-4">
        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}
