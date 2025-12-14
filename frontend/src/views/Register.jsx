import React, { useState } from "react";
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
 * Register
 * Handles user account creation for Learners and Tutors.
 * In demo mode, registration automatically authenticates the user.
 */
export default function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

    /**
     * Form state
     * These values will eventually map to backend user fields.
     */
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); // placeholder for future backend integration
    const [role, setRole] = useState("learner"); // supported roles for self-registration

    /**
     * Handles form submission.
     * Normalizes input and simulates account creation,
     * then authenticates the user for immediate access.
     */
    function handleSubmit(e) {
        e.preventDefault();

        const normalizedEmail = email.trim().toLowerCase();

        // Simulated registration → immediate login (demo behavior)
        login({
            name: name.trim(),
            email: normalizedEmail,
            role,
        });

        // Redirect user to their default dashboard
        navigate("/learner");
    }

    return (
        <div style={{ background: "#F5F7FA", minHeight: "100vh" }}>
            {/* Shared application header (logout disabled on auth screens) */}
            <Header showLogout={false} />

            <div style={authContainer}>
                <h2 style={authTitle}>Create Account</h2>

                {/* Registration form */}
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
                    <input
                        style={inputStyle}
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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

                    {/* Role selection limited to learner and tutor */}
                    <select
                        style={inputStyle}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="learner">Learner</option>
                        <option value="tutor">Tutor</option>
                    </select>

                    <button style={buttonPrimary} type="submit">
                        Register
                    </button>
                </form>

                {/* Navigation to login for existing users */}
                <p style={{ marginTop: 16, textAlign: "center" }}>
                    Already have an account?{" "}
                    <Link style={linkStyle} to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
