import React from "react";
import { Home, MapPin, BarChart3, FileText, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: "home" | "address-input" | "dashboard" | "marketing-plan";
  onNavigate: (
    view: "home" | "address-input" | "dashboard" | "marketing-plan"
  ) => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  currentView,
  onNavigate,
}: MobileMenuProps) {
  console.log("🎯 MobileMenu render - isOpen:", isOpen);

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "address-input", label: "Analyze Listing", icon: MapPin },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "marketing-plan", label: "Marketing Plan", icon: FileText },
  ];

  const handleNavigate = (
    view: "home" | "address-input" | "dashboard" | "marketing-plan"
  ) => {
    onNavigate(view);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        style={{
          display: isOpen ? "block" : "none",
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
        onClick={onClose}
      />

      {/* Bottom Sheet Menu */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 md:hidden border-2 border-red-500"
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* Handle bar at top */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Close button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Content */}
        <nav className="px-6 py-6 pb-8 space-y-2">
          <h2 className="text-lg font-semibold mb-6">Menu</h2>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id as any)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-base font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            ListingIQ AI • Powered by NinjaTech
          </p>
        </div>
      </div>
    </>
  );
}
