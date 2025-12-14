import React from "react";
import { pageWrap, container, card, cardTitle, colors } from "../styles/uiTheme";

/**
 * AdminView
 * Provides a high-level administrative overview of platform activity,
 * including aggregate metrics and recent learner request insights.
 */
export default function AdminView({
    latestRequest,
    totalRequests,
    completedSessions,
    points,
}) {
    /**
     * Derive top requested topic for insights.
     * Falls back gracefully when no requests exist.
     */
    const topTopic = latestRequest?.topic || "—";

    /**
     * Derived insight messages displayed in the dashboard.
     * These values are calculated from shared application state.
     */
    const insights = [
        `Most requested topic (demo): ${topTopic}`,
        `Total requests submitted: ${totalRequests}`,
        `Sessions completed: ${completedSessions}`,
    ];

    return (
        // Page-level wrapper for consistent background and spacing
        <div style={pageWrap}>
            <div style={container}>
                {/* Admin dashboard card */}
                <div style={{ ...card }}>
                    <h2 style={cardTitle}>Admin View</h2>

                    {/* Admin content sections */}
                    <div
                        style={{
                            display: "grid",
                            gap: 10,
                            marginTop: 10,
                            maxWidth: 520,
                        }}
                    >
                        {/* Platform-wide statistics */}
                        <div
                            style={{
                                border: "1px solid rgba(255,255,255,0.35)",
                                borderRadius: 10,
                                padding: 12,
                            }}
                        >
                            <strong>Platform Stats</strong>

                            <div style={{ marginTop: 8, color: colors.muted }}>
                                Total Requests:{" "}
                                <strong style={{ color: colors.white }}>
                                    {totalRequests}
                                </strong>
                            </div>

                            <div style={{ marginTop: 4, color: colors.muted }}>
                                Completed Sessions:{" "}
                                <strong style={{ color: colors.white }}>
                                    {completedSessions}
                                </strong>
                            </div>

                            <div style={{ marginTop: 4, color: colors.muted }}>
                                Total Tutor Points Awarded:{" "}
                                <strong style={{ color: colors.white }}>
                                    {points}
                                </strong>
                            </div>
                        </div>

                        {/* Aggregated insights */}
                        <div
                            style={{
                                border: "1px solid rgba(255,255,255,0.35)",
                                borderRadius: 10,
                                padding: 12,
                            }}
                        >
                            <strong>Insights</strong>

                            <ul style={{ marginTop: 8, color: colors.muted }}>
                                {insights.map((i, idx) => (
                                    <li key={idx} style={{ marginBottom: 6 }}>
                                        {i}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Snapshot of the most recent learner request */}
                        {latestRequest && (
                            <div
                                style={{
                                    border: "1px solid rgba(255,255,255,0.35)",
                                    borderRadius: 10,
                                    padding: 12,
                                }}
                            >
                                <strong>Latest Request Snapshot</strong>

                                <div style={{ marginTop: 8, color: colors.muted }}>
                                    <strong style={{ color: colors.white }}>Topic:</strong>{" "}
                                    {latestRequest.topic}
                                </div>

                                <div style={{ marginTop: 4, color: colors.muted }}>
                                    <strong style={{ color: colors.white }}>Level:</strong>{" "}
                                    {latestRequest.skillLevel}
                                </div>

                                <div style={{ marginTop: 4, color: colors.muted }}>
                                    <strong style={{ color: colors.white }}>Urgency:</strong>{" "}
                                    {latestRequest.urgency}
                                </div>

                                <div style={{ marginTop: 4, color: colors.muted }}>
                                    <strong style={{ color: colors.white }}>Description:</strong>{" "}
                                    {latestRequest.description || "—"}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
