import { useState } from 'react';
import AntiCheatWarning from '../AntiCheatWarning';

export default function AntiCheatWarningExample() {
  const [show, setShow] = useState(true);

  if (!show) {
    return (
      <div className="p-8 bg-background text-center">
        <p className="text-muted-foreground mb-4">Warning dismissed</p>
        <button 
          onClick={() => setShow(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Show Warning Again
        </button>
      </div>
    );
  }

  return <AntiCheatWarning warningCount={2} maxWarnings={3} onDismiss={() => setShow(false)} />;
}
