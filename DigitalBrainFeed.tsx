import { Brain, Clock, Tag, Lock } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  timestamp: string;
  isLocked?: boolean;
}

interface DigitalBrainFeedProps {
  notes: Note[];
  consistencyLevel: number;
  requiredLevel: number;
}

const DigitalBrainFeed = ({ notes, consistencyLevel, requiredLevel }: DigitalBrainFeedProps) => {
  const isUnlocked = consistencyLevel >= requiredLevel;

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in relative" style={{ animationDelay: "0.5s" }}>
      {/* Locked Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-nexus-locked/95 backdrop-blur-sm rounded-2xl z-10 flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Lock className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground text-center px-4">
            Raggiungi Livello {requiredLevel} per sbloccare
          </p>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full gradient-nexus rounded-full"
                style={{ width: `${(consistencyLevel / requiredLevel) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {consistencyLevel}/{requiredLevel}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Cervello Digitale
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Contextual Training Feed
          </p>
        </div>
        <Brain className="w-4 h-4 text-primary" />
      </div>

      <div className="space-y-3">
        {notes.map((note, index) => (
          <div
            key={note.id}
            className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-200 cursor-pointer group"
            style={{ animationDelay: `${0.6 + index * 0.1}s` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {note.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {note.content}
                </p>
              </div>
              {note.isLocked && (
                <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
            
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Tag className="w-3 h-3" />
                <span>{note.category}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{note.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Dati sincronizzati da Baserow
      </p>
    </div>
  );
};

export default DigitalBrainFeed;
