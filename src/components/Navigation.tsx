import { Button } from "./ui/button";
import { Brain, Menu } from "lucide-react";

interface NavigationProps {
  currentView: "home" | "address-input" | "dashboard" | "marketing-plan";
  onNavigate: (
    view: "home" | "address-input" | "dashboard" | "marketing-plan"
  ) => void;
  showAnalyze?: boolean;
  onMenuClick?: () => void;
}

export function Navigation({
  currentView,
  onNavigate,
  showAnalyze = true,
  onMenuClick,
}: NavigationProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - clickable to go home */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">ListingIQ</span>
        </button>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          <Button
            variant={currentView === "home" ? "default" : "ghost"}
            onClick={() => onNavigate("home")}
          >
            Home
          </Button>

          {showAnalyze && (
            <Button
              variant={currentView === "address-input" ? "default" : "ghost"}
              onClick={() => onNavigate("address-input")}
            >
              Analyze Listing
            </Button>
          )}

          {currentView === "dashboard" && (
            <Button variant="default">Dashboard</Button>
          )}

          {currentView === "marketing-plan" && (
            <Button variant="default">Marketing Plan</Button>
          )}
        </nav>

        {/* Mobile Hamburger Menu Button - 2 bars */}
        <button
          onClick={onMenuClick}
          className="md:hidden flex flex-col gap-1.5 p-2 hover:opacity-70 transition-opacity"
          aria-label="Menu"
        >
          <span className="w-6 h-0.5 bg-foreground rounded-full" />
          <span className="w-6 h-0.5 bg-foreground rounded-full" />
        </button>
      </div>
    </header>
  );
}
