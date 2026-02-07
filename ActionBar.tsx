import { Wifi, Bluetooth, Watch, Smartphone, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SensorStatus {
  id: string;
  name: string;
  icon: React.ReactNode;
  isConnected: boolean;
}

const ActionBar = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [sensors] = useState<SensorStatus[]>([
    { id: "wifi", name: "WiFi", icon: <Wifi className="w-4 h-4" />, isConnected: true },
    { id: "bluetooth", name: "Bluetooth", icon: <Bluetooth className="w-4 h-4" />, isConnected: true },
    { id: "watch", name: "Watch", icon: <Watch className="w-4 h-4" />, isConnected: false },
    { id: "phone", name: "Phone", icon: <Smartphone className="w-4 h-4" />, isConnected: true },
  ]);

  const handleNexusConnect = async () => {
    setIsConnecting(true);
    
    // Simulate connection to n8n/Baserow
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("Nexus Connesso!", {
      description: "Sincronizzazione con Baserow e n8n completata",
      duration: 4000,
    });
    
    setIsConnecting(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-strong border-t border-nexus-glass-border">
        <div className="max-w-[2560px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Sensors */}
            <div className="flex items-center gap-4">
              {sensors.slice(0, 2).map((sensor) => (
                <div
                  key={sensor.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50"
                  title={sensor.name}
                >
                  <div className={sensor.isConnected ? "text-primary" : "text-muted-foreground"}>
                    {sensor.icon}
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    sensor.isConnected ? "bg-primary animate-pulse-dot" : "bg-muted-foreground"
                  }`} />
                </div>
              ))}
            </div>

            {/* Central Nexus Connect Button */}
            <button
              onClick={handleNexusConnect}
              disabled={isConnecting}
              className={`
                relative px-8 py-3 rounded-2xl font-semibold text-primary-foreground
                transition-all duration-300 ease-out
                ${isConnecting 
                  ? 'gradient-nexus animate-pulse' 
                  : 'gradient-nexus hover:scale-105 glow-primary hover:glow-primary-strong'
                }
                disabled:cursor-not-allowed
              `}
            >
              <div className="flex items-center gap-2">
                <Zap className={`w-5 h-5 ${isConnecting ? 'animate-pulse' : ''}`} />
                <span>{isConnecting ? "Connessione..." : "Nexus Connect"}</span>
              </div>
              
              {/* Glow effect ring */}
              <div className="absolute inset-0 rounded-2xl animate-glow-pulse opacity-50 pointer-events-none" />
            </button>

            {/* Right Sensors */}
            <div className="flex items-center gap-4">
              {sensors.slice(2).map((sensor) => (
                <div
                  key={sensor.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50"
                  title={sensor.name}
                >
                  <div className={sensor.isConnected ? "text-primary" : "text-muted-foreground"}>
                    {sensor.icon}
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    sensor.isConnected ? "bg-primary animate-pulse-dot" : "bg-muted-foreground"
                  }`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
