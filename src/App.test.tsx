import { useState } from "react";
import { HomePage } from "./components/HomePage";

export default function App() {
  const [currentView, setCurrentView] = useState("home");

  const handleGetStarted = () => {
    setCurrentView("address-input");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMenuClick = () => {
    console.log("🍔 App: Menu clicked");
  };

  return (
    <div>
      {currentView === "home" && (
        <HomePage 
          onGetStarted={handleGetStarted} 
          onNavigate={handleNavigate}
          onMenuClick={handleMenuClick}
        />
      )}
      {currentView !== "home" && (
        <div style={{ padding: "20px" }}>
          <h1>View: {currentView}</h1>
          <button onClick={() => handleNavigate("home")}>Back to Home</button>
        </div>
      )}
    </div>
  );
}