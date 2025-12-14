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

// ⚠️ IMPORTANT: Replace this with your actual backend API URL
const API_BASE_URL = "http://localhost:5000/api/auth"; // Example: Your backend port/route

export default function Register() {
    // We will use login from AuthContext AFTER successful registration
    const { login } = useAuth(); 
    const navigate = useNavigate();

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [skills, setSkills] = useState(""); 
    const [role, setRole] = useState("learner"); 
    const [error, setError] = useState(""); // State for displaying API errors
    const [loading, setLoading] = useState(false); // State for button loading

    /**
     * Handles form submission and sends data to the backend API.
     */
    async function handleSubmit(e) {
        e.preventDefault();
        setError(""); // Clear previous errors
        setLoading(true); // Start loading

        // Prepare data for the API
        const userData = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password, // Password is sent here
            role,
            skills,
        };

        try {
            // 1. Send Registration Request to Backend
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                // 2. Successful Registration: Log the user in
                
                // The backend sends back the user object and a token.
                // Call the `login` function from your AuthContext to save the token/user state.
                login(data.user, data.token); // Assuming your login function takes user and token

                // 3. Redirect user
                navigate(`/${data.user.role}`); // Redirect to /learner or /tutor based on role
            } else {
                // 4. Handle API Errors (e.g., "Email already in use")
                setError(data.message || "Registration failed. Please try again.");
            }
        } catch (err) {
            // 5. Handle Network/Server Errors
            console.error("Registration Network Error:", err);
            setError("A network error occurred. Please check your connection.");
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    }

    return (
        <div style={{ background: "#F5F7FA", minHeight: "100vh" }}>
            <Header showLogout={false} />

            <div style={authContainer}>
                <h2 style={authTitle}>Create Account</h2>

                {/* Display Error Message */}
                {error && (
                    <div style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
                        {error}
                    </div>
                )}

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
                        type="email" // Changed type to email for better validation
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
                        <option value="alumni">Tutor</option> {/* Corrected value to 'tutor' */}
                    </select>

                    {/* Note: Added placeholder for Skills input */}
                    {role === 'alumni' && (
                        <input
                            style={inputStyle}
                            placeholder="Skills (e.g., React, Physics)"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            // Only require skills if role is tutor
                            required={role === 'alumni'} 
                        />
                    )}

                    <button style={buttonPrimary} type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
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