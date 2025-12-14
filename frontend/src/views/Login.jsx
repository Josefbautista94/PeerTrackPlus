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

/**
 * Static admin identifier used for demo access control.
 * In production, this logic would be replaced by backend-based role validation.
 */
const ADMIN_EMAIL = "admin@peerscholas.org";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    /**
     * Login form state.
     * Role selection is available for demo users only.
     */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // placeholder for future authentication
    const [role, setRole] = useState("learner");

    /**
     * Normalize email for consistent role checks and comparisons.
     */
    const normalizedEmail = email.trim().toLowerCase();
    const isAdminEmail = normalizedEmail === ADMIN_EMAIL;

    /**
     * Automatically lock role selection when an admin email is detected.
     * Admin privileges override any manually selected role.
     */
    useEffect(() => {
        if (isAdminEmail) {
            setRole("learner"); // role value is ignored when admin is detected
        }
    }, [isAdminEmail]);

    /**
     * Handles login submission.
     * Determines the final role, authenticates the user,
     * and redirects them to the appropriate dashboard.
     */
    function handleSubmit(e) {
        e.preventDefault();

        const userRole = isAdminEmail ? "admin" : role;

        // Simulated authentication (replaced by backend login in production)
        login({
            name: isAdminEmail ? "Admin User" : "Demo User",
            email: normalizedEmail,
            role: userRole,
        });

        // Redirect user based on resolved role
        if (userRole === "admin") navigate("/admin");
        else if (userRole === "tutor") navigate("/tutor");
        else navigate("/learner");
    }

    return (
        <div style={{ background: "#F5F7FA", minHeight: "100vh" }}>
            {/* Shared application header (logout hidden on auth screens) */}
            <Header showLogout={false} />

            <div style={authContainer}>
                <h2 style={authTitle}>Login</h2>

                {/* Login form */}
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
                    <input
                        style={inputStyle}
                        placeholder="Email"
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

                    {/* Role selection is disabled when admin access is detected */}
                    <select
                        style={{
                            ...inputStyle,
                            opacity: isAdminEmail ? 0.6 : 1,
                            cursor: isAdminEmail ? "not-allowed" : "pointer",
                        }}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled={isAdminEmail}
                    >
                        <option value="learner">Learner</option>
                        <option value="tutor">Tutor</option>
                    </select>

                    {/* Informational message for admin access */}
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

                    <button style={buttonPrimary} type="submit">
                        Login
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
