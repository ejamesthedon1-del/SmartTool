import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { AddressInput } from "./components/AddressInput";

type View = "home" | "address-input" | "dashboard" | "marketing-plan";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  console.log("🚀 App is rendering, currentView:", currentView);

  const handleGetStarted = () => {
    setCurrentView("address-input");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenuClick = () => {
    console.log("🍔 App: Menu clicked");
  };

  const handleAnalyze = () => {
    console.log("📊 Analyze clicked");
    setCurrentView("dashboard");
  };

  // Test HomePage and AddressInput
  return (
    <div>
      <div style={{ padding: "10px", background: "yellow", textAlign: "center" }}>
        DEBUG: Testing HomePage + AddressInput | Current view: {currentView}
      </div>
      
      {currentView === "home" && (
        <HomePage 
          onGetStarted={handleGetStarted} 
          onNavigate={handleNavigate}
          onMenuClick={handleMenuClick}
        />
      )}
      
      {currentView === "address-input" && (
        <div style={{ padding: "20px" }}>
          <AddressInput 
            onAnalyze={handleAnalyze} 
            onNavigate={handleNavigate}
            onMenuClick={handleMenuClick}
          />
          <button onClick={() => setCurrentView("home")} style={{ marginTop: "20px" }}>
            ← Back to Home
          </button>
        </div>
      )}
      
      {currentView === "dashboard" && (
        <div style={{ padding: "20px", background: "lightgreen" }}>
          <h1>📊 Dashboard View (Not implemented yet)</h1>
          <button onClick={() => setCurrentView("home")}>Back to Home</button>
        </div>
      )}
    </div>
  );
}