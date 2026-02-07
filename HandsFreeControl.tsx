import { Camera, Mic, PenLine, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  emoji: string;
  description: string;
}

const actions: QuickAction[] = [
  {
    id: "photo",
    icon: <Camera className="w-6 h-6" />,
    label: "Foto Pasto",
    emoji: "📷",
    description: "Scatta una foto del tuo pasto",
  },
  {
    id: "voice",
    icon: <Mic className="w-6 h-6" />,
    label: "Nota Vocale",
    emoji: "🎙️",
    description: "Registra una nota vocale",
  },
  {
    id: "text",
    icon: <PenLine className="w-6 h-6" />,
    label: "Testo Rapido",
    emoji: "✍️",
    description: "Invia un messaggio rapido",
  },
];

const HandsFreeControl = () => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleAction = async (action: QuickAction) => {
    setActiveAction(action.id);
    
    // Simulate sending to Telegram via n8n
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    toast.success(`${action.emoji} ${action.label}`, {
      description: "Inviato a Telegram tramite n8n",
      duration: 3000,
    });
    
    setActiveAction(null);
  };

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Controllo Rapido
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Hands-Free Control
          </p>
        </div>
        <Send className="w-4 h-4 text-primary" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleAction(action)}
            disabled={activeAction !== null}
            className={`
              group relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl
              transition-all duration-300 ease-out
              ${activeAction === action.id 
                ? 'gradient-nexus glow-primary-strong scale-95' 
                : 'bg-secondary hover:bg-secondary/80 hover:glow-primary'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <div className={`
              transition-colors duration-300
              ${activeAction === action.id ? 'text-primary-foreground' : 'text-foreground group-hover:text-primary'}
            `}>
              {action.icon}
            </div>
            <span className={`
              text-xs font-medium transition-colors duration-300
              ${activeAction === action.id ? 'text-primary-foreground' : 'text-muted-foreground'}
            `}>
              {action.label}
            </span>
            
            {/* Active indicator */}
            {activeAction === action.id && (
              <div className="absolute inset-0 rounded-xl animate-pulse bg-primary/20" />
            )}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        I dati vengono inviati a Telegram tramite n8n webhook
      </p>
    </div>
  );
};

export default HandsFreeControl;
