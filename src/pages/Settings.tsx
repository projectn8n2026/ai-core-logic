import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Bell, Shield, Palette, Smartphone, Database, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const navigate = useNavigate();

  const settingsSections = [
    {
      title: "Profilo",
      icon: <User className="w-5 h-5" />,
      items: [
        { label: "Nome", value: "Utente Nexus" },
        { label: "Email", value: "utente@nexus.ai" },
      ],
    },
    {
      title: "Notifiche",
      icon: <Bell className="w-5 h-5" />,
      toggles: [
        { label: "Notifiche push", enabled: true },
        { label: "Email digest giornaliero", enabled: false },
        { label: "Avvisi biometrici", enabled: true },
      ],
    },
    {
      title: "Privacy & Sicurezza",
      icon: <Shield className="w-5 h-5" />,
      toggles: [
        { label: "Autenticazione a due fattori", enabled: false },
        { label: "Condivisione dati anonimizzati", enabled: true },
      ],
    },
    {
      title: "Aspetto",
      icon: <Palette className="w-5 h-5" />,
      toggles: [
        { label: "Tema scuro", enabled: true },
        { label: "Animazioni ridotte", enabled: false },
      ],
    },
    {
      title: "Dispositivi Connessi",
      icon: <Smartphone className="w-5 h-5" />,
      items: [
        { label: "Apple Watch", value: "Connesso" },
        { label: "Google Fit", value: "Non connesso" },
      ],
    },
    {
      title: "Integrazioni",
      icon: <Database className="w-5 h-5" />,
      items: [
        { label: "Baserow", value: "Attivo" },
        { label: "n8n Webhook", value: "Configurato" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background bg-grid pb-24">
      {/* Ambient gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="glass sticky top-0 z-50 px-6 py-4">
          <div className="max-w-[2560px] mx-auto flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-nexus flex items-center justify-center glow-primary">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Impostazioni</h1>
            </div>
          </div>
        </header>

        {/* Settings Content */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6">
          {settingsSections.map((section) => (
            <section key={section.title} className="glass rounded-2xl p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-5">
                <div className="text-primary">{section.icon}</div>
                <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.items?.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                  >
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </div>
                ))}

                {section.toggles?.map((toggle) => (
                  <div
                    key={toggle.label}
                    className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                  >
                    <Label htmlFor={toggle.label} className="text-sm text-muted-foreground cursor-pointer">
                      {toggle.label}
                    </Label>
                    <Switch id={toggle.label} defaultChecked={toggle.enabled} />
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Danger Zone */}
          <section className="glass rounded-2xl p-6 border border-destructive/30">
            <h2 className="text-lg font-semibold text-destructive mb-4">Zona Pericolosa</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Elimina account</p>
                <p className="text-xs text-muted-foreground">
                  Questa azione è irreversibile
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Elimina
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Settings;
