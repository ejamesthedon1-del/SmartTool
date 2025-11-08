import { useState } from "react";
import { HomePage } from "./components/HomePage";

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

  // Test only HomePage first
  if (currentView === "home") {
    return (
      <div>
        <div style={{ padding: "10px", background: "yellow", textAlign: "center" }}>
          DEBUG: Testing HomePage only
        </div>
        <HomePage 
          onGetStarted={handleGetStarted} 
          onNavigate={handleNavigate}
          onMenuClick={handleMenuClick}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", background: "lightblue" }}>
      <h1>Other views not implemented yet</h1>
      <button onClick={() => setCurrentView("home")}>Back to Home</button>
    </div>
  );
}