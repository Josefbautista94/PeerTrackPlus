import React from "react";
import {
    pageWrap,
    container,
    card,
    cardTitle,
    buttonPrimary,
    buttonGhost,
    colors,
} from "../styles/uiTheme";

/**
 * TutorView
 * Displays the tutor dashboard, including points earned and
 * the current learner request lifecycle (open → accepted → completed).
 */
export default function TutorView({ request, status, onAccept, onComplete, points }) {
    return (
        // Page-level wrapper for background and spacing consistency
        <div style={pageWrap}>
            <div style={container}>
                {/* Dashboard header */}
                <div style={{ ...card, marginBottom: 16 }}>
                    <h2 style={cardTitle}>Tutor Dashboard</h2>
                    <p style={{ margin: 0, color: colors.muted }}>
                        Review requests, accept, and mark sessions complete to earn points.
                    </p>
                </div>

                {/* Main dashboard content */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                    {/* Points summary */}
                    <div style={card}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 12,
                                alignItems: "center",
                            }}
                        >
                            <h3 style={{ ...cardTitle, fontSize: 16, margin: 0 }}>
                                Points Earned
                            </h3>
                            <div
                                style={{
                                    fontWeight: 800,
                                    color: colors.yellow,
                                    fontSize: 18,
                                }}
                            >
                                {points}
                            </div>
                        </div>
                    </div>

                    {/* Current request section */}
                    <div style={card}>
                        <h3 style={{ ...cardTitle, fontSize: 16 }}>Current Request</h3>

                        {/* Empty state when no learner requests exist */}
                        {!request ? (
                            <p style={{ margin: 0, color: colors.muted }}>
                                No requests yet. Switch to Learner and submit one.
                            </p>
                        ) : (
                            // Active request container
                            <div
                                style={{
                                    border: "1px solid rgba(255,255,255,0.6)",
                                    borderRadius: 12,
                                    padding: 12,
                                    background: "rgba(255,255,255,0.08)",
                                    color: colors.white,
                                }}
                            >
                                {/* Request header */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 12,
                                    }}
                                >
                                    <strong>{request.topic}</strong>
                                    <span style={{ color: colors.muted }}>
                                        Status: {status}
                                    </span>
                                </div>

                                {/* Learner notes */}
                                <div style={{ marginTop: 8 }}>
                                    <strong style={{ marginRight: 6 }}>
                                        Learner notes:
                                    </strong>
                                    {request.description || "—"}
                                </div>

                                {/* Action buttons based on request status */}
                                <div
                                    style={{
                                        marginTop: 12,
                                        display: "flex",
                                        gap: 10,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {/* Accept action (open → accepted) */}
                                    {status === "open" && (
                                        <button style={buttonPrimary} onClick={onAccept}>
                                            Accept Request
                                        </button>
                                    )}

                                    {/* Complete action (accepted → completed) */}
                                    {status === "accepted" && (
                                        <button style={buttonPrimary} onClick={onComplete}>
                                            Mark Complete
                                        </button>
                                    )}

                                    {/* Completed state indicator */}
                                    {status === "completed" && (
                                        <div
                                            style={{
                                                padding: "10px 12px",
                                                borderRadius: 10,
                                                border: `1px solid ${colors.border}`,
                                                background: "#FFFFFF",
                                                color: colors.text,
                                                fontWeight: 700,
                                            }}
                                        >
                                            ✅ Completed
                                        </div>
                                    )}

                                    {/* Utility action */}
                                    <button
                                        style={buttonGhost}
                                        onClick={() =>
                                            window.scrollTo({ top: 0, behavior: "smooth" })
                                        }
                                    >
                                        Back to top
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}