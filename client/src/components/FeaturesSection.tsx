import FeatureCard from "./FeatureCard";
// We only need the three most impactful icons now.
import { Trophy, Zap, Shield } from "lucide-react";

export default function FeaturesSection() {
  // A curated list of the three most important features.
  const features = [
    {
      icon: Trophy,
      title: "Compete for the Top Spot",
      description: "Climb the real-time leaderboard and prove your skills against your peers in timed coding battles.",
    },
    {
      icon: Zap,
      title: "Instant, Pro-Level Feedback",
      description: "Get immediate results on your code from our secure judge, just like in major competitive programming contests.",
    },
    {
      icon: Shield,
      title: "A Fair & Level Playing Field",
      description: "Our built-in anti-cheating system ensures every competition is a true and honest test of skill.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* A more direct and engaging headline */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            An Arena Built for <span className="text-primary-brand">Champions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide the tools and the battlefield. You bring the skill.
          </p>
        </div>

        {/* The grid layout now perfectly holds three feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
