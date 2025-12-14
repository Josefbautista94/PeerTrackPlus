// React core library
import React from "react";

// ReactDOM is used to render the React app into the HTML page
import ReactDOM from "react-dom/client";

// BrowserRouter enables client-side routing (React Router)
import { BrowserRouter } from "react-router-dom";

// Root application component
import App from "./App";

// AuthProvider gives the entire app access to authentication state (user, login, logout)
import { AuthProvider } from "./context/AuthContext";

// Create the React root and mount the app to the div with id="root" in index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode helps catch potential problems during development
  <React.StrictMode>
    {/* Enables routing throughout the app */}
    <BrowserRouter>
      {/* Provides authentication context to all components */}
      <AuthProvider>
        {/* Main application component */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
