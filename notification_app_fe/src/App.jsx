import { useEffect } from "react";
import { Log } from "./middleware/logger";

function App() {
  useEffect(() => {
    Log(
      "frontend",
      "info",
      "component",
      "Frontend application loaded successfully"
    );
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>AffordMed Frontend Setup Complete</h1>
    </div>
  );
}

export default App;