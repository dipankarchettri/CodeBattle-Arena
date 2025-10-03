import FeatureCard from '../FeatureCard';
import { Shield } from 'lucide-react';

export default function FeatureCardExample() {
  return (
    <div className="p-8 bg-background">
      <FeatureCard 
        icon={Shield}
        title="Secure Code Execution"
        description="All code runs in isolated environments with comprehensive security measures to prevent malicious activities."
      />
    </div>
  );
}
