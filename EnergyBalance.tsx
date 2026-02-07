import { Flame } from "lucide-react";

interface EnergyBalanceProps {
  consumed: number;
  burned: number;
  goal: number;
}

const EnergyBalance = ({ consumed, burned, goal }: EnergyBalanceProps) => {
  const net = consumed - burned;
  const percentage = Math.min((consumed / goal) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Bilancio Energetico
        </h3>
        <Flame className="w-4 h-4 text-primary" />
      </div>

      <div className="flex items-center justify-center">
        <div className="relative w-36 h-36">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="72"
              cy="72"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--nexus-gradient-start))" />
                <stop offset="100%" stopColor="hsl(var(--nexus-gradient-end))" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{net}</span>
            <span className="text-xs text-muted-foreground">kcal nette</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">{consumed}</p>
          <p className="text-xs text-muted-foreground">Consumate</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-primary">{burned}</p>
          <p className="text-xs text-muted-foreground">Bruciate</p>
        </div>
      </div>
    </div>
  );
};

export default EnergyBalance;
