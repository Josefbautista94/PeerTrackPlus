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


    const [allUsers, setAllUsers] = useState([]);
    const [allRequests, setAllRequests] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataError, setDataError] = useState(null);
 
    useEffect(() => {
        const loadAdminData = async () => {
      
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
                    ...getAuthHeader(), 
                };
                
              
                const usersResponse = await fetch(`${API_BASE_URL}/users`, { headers });
                const usersData = await usersResponse.json();
                
                if (usersResponse.ok) {
                    setAllUsers(usersData);
                } else {
                    throw new Error(usersData.message || 'Failed to fetch users list.');
                }

           
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
       
    }, [user, getAuthHeader]); 
    //delete user
     const handleDeleteUser = async (userId, userName) => {
        if (!window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            };

            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'DELETE',
                headers
            });

            if (response.ok) {
                setAllUsers(prevUsers => prevUsers.filter(u => u._id !== userId));
                alert(`User "${userName}" has been deleted successfully.`);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error("Delete User Error:", error);
            alert(`Failed to delete user: ${error.message}`);
        }
    };

    //delete request
    const handleDeleteRequest = async (requestId, requestTitle) => {
        if (!window.confirm(`Are you sure you want to delete request "${requestTitle}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            };

            const response = await fetch(`${API_BASE_URL}/requests/${requestId}`, {
                method: 'DELETE',
                headers
            });

            if (response.ok) {
                setAllRequests(prevRequests => prevRequests.filter(r => r._id !== requestId));
                alert(`Request "${requestTitle}" has been deleted successfully.`);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete request');
            }
        } catch (error) {
            console.error("Delete Request Error:", error);
            alert(`Failed to delete request: ${error.message}`);
        }
    };
 
    const totalUsers = allUsers.length;
    const totalRequests = allRequests.length;
    const completedSessions = 7; 
    const totalPoints = 150; 
    const latestRequest = allRequests.length > 0 ? allRequests[allRequests.length - 1] : null;


    const insights = [
        `Total Registered Users: ${totalUsers}`,
        `Total requests submitted: ${totalRequests}`,
        `Sessions completed: ${completedSessions}`,
        `Latest Request Topic: ${latestRequest?.title || "N/A"}`,
    ];

    return (
     
        <div style={pageWrap}>
            <div style={container}>
                <div style={{ ...card }}>
                    <h2 style={cardTitle}>Admin Dashboard</h2>
                    
                    {user && (
                        <p style={{ margin: "0 0 16px", color: colors.muted }}>
                            Logged in as: <strong>{user.name} ({user.email})</strong>
                        </p>
                    )}

                    <div
                        style={{
                            display: "grid",
                            gap: 16, // Use 16 for better spacing
                            marginTop: 10,
                            maxWidth: 800, // Make a bit wider for lists
                        }}
                    >
                        
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
                        
                        {/*All users*/}
                         <div style={{ border: "1px solid rgba(255,255,255,0.35)", borderRadius: 10, padding: 12 }}>
                            <strong>All Users ({allUsers.length})</strong>
                            <div style={{ maxHeight: 400, overflowY: 'auto', marginTop: 8 }}>
                                {allUsers.map((u) => (
                                    <div 
                                        key={u._id} 
                                        style={{ 
                                            padding: '8px 0', 
                                            borderBottom: '1px dotted rgba(255,255,255,0.1)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: 12
                                        }}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <strong style={{ color: colors.white }}>{u.name}</strong> 
                                            <span style={{ color: colors.muted }}> ({u.email})</span>
                                            <div style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>
                                                Role: {u.role} | Score: {u.score || 0}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteUser(u._id, u.name)}
                                            
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/*Requests */}
                                 <div style={{ border: "1px solid rgba(255,255,255,0.35)", borderRadius: 10, padding: 12 }}>
                            <strong>All Requests ({allRequests.length})</strong>
                            <div style={{ maxHeight: 400, overflowY: 'auto', marginTop: 8 }}>
                                {allRequests.length === 0 ? (
                                    <p style={{ color: colors.muted, margin: '8px 0' }}>No requests found.</p>
                                ) : (
                                    allRequests.map((r) => (
                                        <div 
                                            key={r._id} 
                                            style={{ 
                                                padding: '12px', 
                                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                                marginBottom: 8,
                                                background: 'rgba(255,255,255,0.05)',
                                                borderRadius: 8
                                            }}
                                        >
                                            <div style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                gap: 12,
                                                marginBottom: 8
                                            }}>
                                                <div style={{ flex: 1 }}>
                                                    <strong style={{ color: colors.white, fontSize: 15 }}>
                                                        {r.title}
                                                    </strong>
                                                    <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>
                                                        Level: {r.level} | Urgency: {r.urgency} | Status: {r.status || 'open'}
                                                    </div>
                                                    <div style={{ fontSize: 13, color: colors.muted, marginTop: 6 }}>
                                                        {r.content}
                                                    </div>
                                                    {r.createdBy && (
                                                        <div style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>
                                                            Created by: {r.createdBy.name || r.createdBy.email || 'Unknown'}
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteRequest(r._id, r.title)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Latest Request Snapshot */}
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
                        )}
                    </div>
                    </div>
                </div>
            </div>
        
    );
}
