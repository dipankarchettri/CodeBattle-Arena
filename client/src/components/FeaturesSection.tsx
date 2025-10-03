import FeatureCard from "./FeatureCard";
import { Shield, Zap, Trophy, Lock, Code2, Users } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Secure Code Execution",
      description: "All code runs in isolated environments with comprehensive security measures to prevent malicious activities.",
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Get real-time results for your submissions with immediate status updates: Correct, Incorrect, or Error.",
    },
    {
      icon: Trophy,
      title: "Live Leaderboard",
      description: "Track your ranking in real-time with automatic updates based on problems solved and submission times.",
    },
    {
      icon: Lock,
      title: "Anti-Cheating System",
      description: "Tab-switching detection and paste prevention ensure fair competition for all participants.",
    },
    {
      icon: Code2,
      title: "Multi-Language Support",
      description: "Write solutions in Python or JavaScript with full syntax highlighting and code completion.",
    },
    {
      icon: Users,
      title: "Submission History",
      description: "Access your complete coding journey with detailed history of all submissions and their results.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to <span className="text-primary">Excel</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for competitive programmers with enterprise-grade features and a developer-first approach.
          </p>
        </div>

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
