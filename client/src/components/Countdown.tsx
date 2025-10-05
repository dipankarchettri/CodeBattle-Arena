import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string; // ISO string date
  onComplete?: () => void;
}

const calculateTimeLeft = (target: Date) => {
  const difference = +target - +new Date();
  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

export default function Countdown({ targetDate, onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(new Date(targetDate)));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(new Date(targetDate));
      setTimeLeft(newTimeLeft);
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        if (onComplete) onComplete();
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  return (
    <div className="flex items-center gap-4 sm:gap-6 text-center">
      <div><div className="text-3xl sm:text-4xl font-bold text-primary-brand">{String(timeLeft.days).padStart(2, '0')}</div><div className="text-xs text-muted-foreground">Days</div></div>
      <div><div className="text-3xl sm:text-4xl font-bold text-primary-brand">{String(timeLeft.hours).padStart(2, '0')}</div><div className="text-xs text-muted-foreground">Hours</div></div>
      <div><div className="text-3xl sm:text-4xl font-bold text-primary-brand">{String(timeLeft.minutes).padStart(2, '0')}</div><div className="text-xs text-muted-foreground">Minutes</div></div>
      <div><div className="text-3xl sm:text-4xl font-bold text-primary-brand">{String(timeLeft.seconds).padStart(2, '0')}</div><div className="text-xs text-muted-foreground">Seconds</div></div>
    </div>
  );
}
