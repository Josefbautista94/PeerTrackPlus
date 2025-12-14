import React from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/per-scholas-logo.webp";

/**
 * Header
 * Global application header displayed across pages.
 * Shows branding, application title, and optional logout action.
 */
export default function Header({ showLogout = true }) {
    const { logout, user } = useAuth();

    return (
        <header
            style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 28px",
                background: "#1F4E79", // Primary brand navy
                marginBottom: 24,
            }}
        >
            {/* Brand logo (left-aligned) */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src={logo}
                    alt="Per Scholas Logo"
                    style={{
                        height: 90,
                        objectFit: "contain",
                    }}
                />
            </div>

            {/* Application title (centered, non-interactive) */}
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    pointerEvents: "none", // Prevents overlap with clickable elements
                }}
            >
                PeerTrack+
            </div>

            {/* Logout action (conditionally rendered) */}
            <div>
                {showLogout && user && (
                    <button
                        onClick={logout}
                        style={{
                            padding: "8px 14px",
                            borderRadius: 8,
                            border: "1px solid rgba(255,255,255,0.6)",
                            background: "transparent",
                            color: "#FFFFFF",
                            fontWeight: 500,
                            cursor: "pointer",
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
}
