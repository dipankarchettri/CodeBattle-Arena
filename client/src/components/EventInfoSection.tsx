import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";

export default function EventInfoSection() {
  const stats = [
    { icon: Calendar, label: "Event Date", value: "March 15, 2025" },
    { icon: MapPin, label: "Mode", value: "Online Platform" },
    { icon: Users, label: "Participants", value: "150+ Registered" },
    { icon: Trophy, label: "Prize Pool", value: "₹50,000" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Upcoming Event <span className="text-primary">Details</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for an exciting coding competition with cash prizes and recognition.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover-elevate transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</h3>
              <p className="text-xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Registration Open!</h3>
              <p className="text-muted-foreground">
                Limited seats available. Register now to secure your spot.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-1">23</div>
              <div className="text-sm text-muted-foreground">Days Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
