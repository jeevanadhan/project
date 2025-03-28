import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import React Router
import { AuthProvider } from "./components/context/AuthContext"; // Import AuthProvider
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Wrap the entire app with AuthProvider */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
