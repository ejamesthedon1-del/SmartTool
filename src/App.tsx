import { useState } from "react";

// Simple debug component
export default function App() {
  const [currentView, setCurrentView] = useState("home");

  // Debug: Log that App is rendering
  console.log("🚀 App is rendering, currentView:", currentView);

  return (
    <div style={{ padding: "20px", background: "lightblue", minHeight: "100vh" }}>
      <h1>🚀 DEBUG TEST PAGE</h1>
      <p>If you see this, React is working! Current view: {currentView}</p>
      <button 
        onClick={() => setCurrentView("dashboard")}
        style={{ padding: "10px 20px", background: "blue", color: "white", marginRight: "10px" }}
      >
        Test Dashboard
      </button>
      <button 
        onClick={() => setCurrentView("home")}
        style={{ padding: "10px 20px", background: "green", color: "white" }}
      >
        Test Home
      </button>
    </div>
  );
}