import React from "react";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Debug App</h1>
      <p>If you can see this, the basic setup is working.</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
}