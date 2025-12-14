import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

/**
 * AuthProvider
 * Wraps the application and manages global authentication state
 * including user data and JWT token persistence.
 */
export function AuthProvider({ children }) {
    
    // State for the authenticated user object
    const [user, setUser] = useState(null);
    // State for the JWT token
    const [token, setToken] = useState(null);
    // State to indicate if the initial loading from localStorage is complete
    const [loading, setLoading] = useState(true); 

    // --- 1. Load Session from localStorage on Component Mount ---
    useEffect(() => {
        try {
            // Retrieve token and user data from storage
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (storedToken && storedUser) {
                // If found, update state
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        } catch (error) {
            console.error("Error loading session from localStorage:", error);
            // Optionally clear corrupted storage if an error occurs
            localStorage.clear();
        } finally {
            setLoading(false); // Session loading is complete
        }
    }, []);

    /**
     * Authenticates a user and stores their session in state and localStorage.
     * Takes the user object and the JWT token returned by the backend.
     */
    function login(userData, jwtToken) { // Accepts two arguments now
        // Save to React state
        setUser(userData);
        setToken(jwtToken);
        
        // Save to browser's localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', jwtToken);
    }

    /**
     * Clears authentication state and logs the user out.
     * Clears user and token from state and localStorage.
     */
    function logout() {
        // Clear React state
        setUser(null);
        setToken(null);

        // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    /**
     * Helper function to easily get the required HTTP Authorization header.
     * This is used for all protected API calls.
     */
    const getAuthHeader = () => {
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        getAuthHeader,
        // Helper boolean for route protection
        isAuthenticated: !!token, 
    };
    
    // Prevent rendering the app content until the session check is done
    if (loading) {
        return <div>Checking user session...</div>; 
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * useAuth
 * Custom hook for consuming authentication context.
 */
export function useAuth() {
    return useContext(AuthContext);
}