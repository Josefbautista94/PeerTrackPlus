import React, { useState, useEffect } from "react";
import { pageWrap, container, card, cardTitle, colors } from "../styles/uiTheme";
import { useAuth } from "../context/AuthContext";

/**
 * AdminView
 * Provides a high-level administrative overview of platform activity,
 * including aggregate metrics and recent learner request insights.
 */

const API_BASE_URL = "http://localhost:5000/api";

export default function AdminView() {
    const { user, getAuthHeader } = useAuth(); // Get user details and token helper

    // --- State for fetched data ---
    const [allUsers, setAllUsers] = useState([]);
    const [allRequests, setAllRequests] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataError, setDataError] = useState(null);
    
    // --- Data Fetching Logic ---
    useEffect(() => {
        const loadAdminData = async () => {
            // Check for client-side role and authentication before making requests
            if (!user || user.role !== 'admin') {
                setDataError("Access Denied: You must be logged in as an administrator.");
                setDataLoading(false);
                return;
            }

            setDataError(null);
            setDataLoading(true);

            try {
                const headers = {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(), // Includes 'Authorization: Bearer <token>'
                };
                
                // 1. Fetch All Users (Endpoint: /api/users)
                const usersResponse = await fetch(`${API_BASE_URL}/users`, { headers });
                const usersData = await usersResponse.json();
                
                if (usersResponse.ok) {
                    setAllUsers(usersData);
                } else {
                    throw new Error(usersData.message || 'Failed to fetch users list.');
                }

                // 2. Fetch All Requests (Endpoint: /api/requests)
                const requestsResponse = await fetch(`${API_BASE_URL}/requests`, { headers });
                const requestsData = await requestsResponse.json();

                if (requestsResponse.ok) {
                    setAllRequests(requestsData);
                } else {
                    throw new Error(requestsData.message || 'Failed to fetch request list.');
                }

            } catch (error) {
                console.error("Admin Data Fetch Error:", error);
                setDataError(`Failed to load data: ${error.message}`);
            } finally {
                setDataLoading(false);
            }
        };

        loadAdminData();
        // Depend on user and getAuthHeader to re-run on login/logout
    }, [user, getAuthHeader]); 

    // --- Derived Metrics (Calculated from fetched data) ---
    const totalUsers = allUsers.length;
    const totalRequests = allRequests.length;
    
    // Simple demo data for metrics not available in the fetched lists
    const completedSessions = 7; 
    const totalPoints = 150; 
    
    const latestRequest = allRequests.length > 0 ? allRequests[allRequests.length - 1] : null;

    const insights = [
        `Total Registered Users: ${totalUsers}`,
        `Total requests submitted: ${totalRequests}`,
        `Sessions completed: ${completedSessions}`,
        `Latest Request Topic: ${latestRequest?.title || "N/A"}`,
    ];

    // --- Loading and Error Views ---
    if (dataLoading) {
        return <div style={pageWrap}><div style={container}><p>Loading administrator dashboard data...</p></div></div>;
    }

    if (dataError) {
        return <div style={pageWrap}><div style={container}><p style={{ color: 'crimson', fontWeight: 'bold' }}>Error: {dataError}</p></div></div>;
    }


    return (
        // Page-level wrapper for consistent background and spacing
        <div style={pageWrap}>
            <div style={container}>
                {/* Admin dashboard card */}
                <div style={{ ...card }}>
                    <h2 style={cardTitle}>Admin Dashboard</h2>
                    
                    {user && (
                        <p style={{ margin: "0 0 16px", color: colors.muted }}>
                            Logged in as: <strong>{user.name} ({user.email})</strong>
                        </p>
                    )}

                    {/* Admin content sections */}
                    <div
                        style={{
                            display: "grid",
                            gap: 16, // Use 16 for better spacing
                            marginTop: 10,
                            maxWidth: 800, // Make a bit wider for lists
                        }}
                    >
                        {/* 📊 Platform-wide statistics */}
                        <div
                            style={{
                                border: "1px solid rgba(255,255,255,0.35)",
                                borderRadius: 10,
                                padding: 12,
                            }}
                        >
                            <strong>Platform Stats</strong>

                            <div style={{ marginTop: 8, color: colors.muted }}>
                                Total Registered Users:{" "}
                                <strong style={{ color: colors.white }}>{totalUsers}</strong>
                            </div>
                            <div style={{ marginTop: 4, color: colors.muted }}>
                                Total Requests:{" "}
                                <strong style={{ color: colors.white }}>{totalRequests}</strong>
                            </div>
                            <div style={{ marginTop: 4, color: colors.muted }}>
                                Completed Sessions:{" "}
                                <strong style={{ color: colors.white }}>{completedSessions}</strong>
                            </div>
                            <div style={{ marginTop: 4, color: colors.muted }}>
                                Total Tutor Points Awarded:{" "}
                                <strong style={{ color: colors.white }}>{totalPoints}</strong>
                            </div>
                        </div>

                        {/* 💡 Aggregated insights */}
                        <div
                            style={{
                                border: "1px solid rgba(255,255,255,0.35)",
                                borderRadius: 10,
                                padding: 12,
                            }}
                        >
                            <strong>Key Insights</strong>

                            <ul style={{ marginTop: 8, color: colors.muted }}>
                                {insights.map((i, idx) => (
                                    <li key={idx} style={{ marginBottom: 6 }}>
                                        {i}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* 👥 List of All Registered Users */}
                        <div style={{ border: "1px solid rgba(255,255,255,0.35)", borderRadius: 10, padding: 12 }}>
                            <strong>All Users ({allUsers.length})</strong>
                            <div style={{ maxHeight: 250, overflowY: 'auto', marginTop: 8 }}>
                                {allUsers.map((u) => (
                                    <div key={u._id} style={{ padding: '5px 0', borderBottom: '1px dotted rgba(255,255,255,0.1)' }}>
                                        <strong style={{ color: colors.white }}>{u.name}</strong> 
                                        <span style={{ color: colors.muted }}> ({u.email}) - {u.role}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/*Requests */}
                        {latestRequest ? (
                            <div
                                style={{
                                    border: "1px solid rgba(255,255,255,0.35)",
                                    borderRadius: 10,
                                    padding: 12,
                                }}
                            >
                                <strong>Latest Request Snapshot</strong>

                                <div style={{ marginTop: 8, color: colors.muted }}>
                                    <strong style={{ color: colors.white }}>Title:</strong>{" "}
                                    {latestRequest.title}
                                </div>
                                <div style={{ marginTop: 4, color: colors.muted }}>
                                    <strong style={{ color: colors.white }}>Level:</strong>{" "}
                                    {latestRequest.level}
                                </div>
                                <div style={{ marginTop: 4, color: colors.muted }}>
                                    <strong style={{ color: colors.white }}>Content:</strong>{" "}
                                    {latestRequest.content || "—"}
                                </div>
                            </div>
                        ) : (
                            <p style={{ color: colors.muted }}>No requests have been submitted yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
