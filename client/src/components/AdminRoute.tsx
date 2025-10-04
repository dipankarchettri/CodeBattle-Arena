import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

// This component checks if the user is an admin.
// If not, it redirects to the homepage.
export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      setLocation("/"); // redirect
    }
  }, [isLoading, user, setLocation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return null; // Prevent rendering during redirect
  }

  return <>{children}</>;
}
