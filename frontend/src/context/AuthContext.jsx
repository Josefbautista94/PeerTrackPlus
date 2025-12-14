import React, { createContext, useContext, useState } from "react";

/**
 * AuthContext
 * Provides authentication state and actions
 * to the entire application via React Context.
 */
const AuthContext = createContext();

/**
 * AuthProvider
 * Wraps the application and manages global
 * authentication state (current user).
 *
 * In this demo implementation, authentication
 * is simulated locally without a backend.
 */
export function AuthProvider({ children }) {
    /**
     * Stores the currently authenticated user.
     * A value of `null` represents a logged-out state.
     */
    const [user, setUser] = useState(null);

    /**
     * Authenticates a user and stores their session.
     * In production, this would be replaced with
     * an API call and token handling.
     */
    function login(mockUser) {
        setUser(mockUser);
    }

    /**
     * Clears authentication state and logs the user out.
     * Can later be extended to clear tokens or sessions.
     */
    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * useAuth
 * Custom hook for consuming authentication context.
 * Simplifies access to user state and auth actions.
 */
export function useAuth() {
    return useContext(AuthContext);
}
