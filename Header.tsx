import { Link } from "react-router-dom";
import { Lock, Unlock, Zap, Home, Cpu, Settings, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  consistencyLevel: number;
  maxLevel: number;
}

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/digital-twin", label: "Digital Twin", icon: Cpu },
  { to: "/settings", label: "Settings", icon: Settings },
];

const Header = ({ consistencyLevel, maxLevel }: HeaderProps) => {
  const isFullyUnlocked = consistencyLevel >= maxLevel;
  const progressPercentage = (consistencyLevel / maxLevel) * 100;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass sticky top-0 z-50 px-6 py-4">
      <div className="max-w-[2560px] mx-auto flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-nexus flex items-center justify-center glow-primary">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold gradient-nexus-text tracking-tight">
              Nexus AI
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* AI Online Status - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 glass px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
            <span className="text-sm font-medium text-foreground">AI Online</span>
          </div>

          {/* Consistency Level - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-3 glass px-4 py-2 rounded-full">
            <div className="relative">
              {isFullyUnlocked ? (
                <Unlock className="w-4 h-4 text-primary" />
              ) : (
                <Lock className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Costanza</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-nexus rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-primary">
                  Lv.{consistencyLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Auth Button */}
          <Link to="/auth">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="w-5 h-5" />
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass border-border/50 w-72">
              <div className="flex flex-col gap-6 pt-8">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-xl gradient-nexus flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold gradient-nexus-text">Menu</span>
                </div>

                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground hover:bg-secondary/50 transition-colors"
                  >
                    <User className="w-5 h-5 text-primary" />
                    Accedi
                  </Link>
                </nav>

                {/* Mobile Status */}
                <div className="mt-auto px-2 space-y-3">
                  <div className="flex items-center gap-2 glass px-4 py-3 rounded-xl">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
                    <span className="text-sm font-medium text-foreground">AI Online</span>
                  </div>
                  <div className="flex items-center gap-3 glass px-4 py-3 rounded-xl">
                    {isFullyUnlocked ? (
                      <Unlock className="w-4 h-4 text-primary" />
                    ) : (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    )}
                    <div className="flex-1">
                      <span className="text-xs text-muted-foreground">Costanza</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full gradient-nexus rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-primary">Lv.{consistencyLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
