import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import {
    authContainer,
    authTitle,
    inputStyle,
    buttonPrimary,
    linkStyle,
} from "../styles/authStyles";

// ⚠️ IMPORTANT: Replace this with your actual backend API URL
const API_BASE_URL = "http://localhost:3000/api/auth" // Using the /api/auth prefix
;
// Note: We will keep ADMIN_EMAIL for the redirect logic, but actual authentication
// will now be handled by the backend's email/password validation.
const ADMIN_EMAIL = "admin@peerscholas.org"; 

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    // Login form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for displaying API errors
    const [loading, setLoading] = useState(false); // State for button loading

    const normalizedEmail = email.trim().toLowerCase();
    const isAdminEmail = normalizedEmail === ADMIN_EMAIL;


    /**
     * Handles login submission.
     * Replaced simulated login with actual API call.
     */
    
   async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        
        const loginData = {
            email: normalizedEmail,
            password,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user, data.token); 
                const userRole = data.user.role;
                if (userRole === "admin") navigate("/admin");
                else if (userRole === "tutor") navigate("/tutor"); 
                else navigate("/learner");

            } else {
                
                setError(data.message || "Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Login Network Error:", err);
            setError("Could not connect to the server. Please check your network.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ background: "#F5F7FA", minHeight: "100vh" }}>
            <Header showLogout={false} />

            <div style={authContainer}>
                <h2 style={authTitle}>Login</h2>

                {/* Display Error Message */}
                {error && (
                    <div style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
                    <input
                        style={inputStyle}
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        style={inputStyle}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                  

                    {isAdminEmail && (
                        <small
                            style={{
                                color: "rgba(255,255,255,0.9)",
                                marginTop: -6,
                                fontWeight: 500,
                            }}
                        >
                            Admin access detected. Role assigned automatically.
                        </small>
                    )}

                    <button style={buttonPrimary} type="submit" disabled={loading}>
                        {loading ? "Logging In..." : "Login"}
                    </button>
                </form>

                {/* Navigation to registration */}
                <p style={{ marginTop: 16, textAlign: "center" }}>
                    No account?{" "}
                    <Link style={linkStyle} to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}