import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    pageWrap,
    container,
    card,
    cardTitle,
    label,
    input,
    buttonPrimary,
    buttonGhost,
    colors,
} from "../styles/uiTheme";

// Mock data
const mockRequests = [
    {
        id: "r1",
        learnerName: "Jose",
        topic: "React",
        skillLevel: "Beginner",
        urgency: "Medium",
        description: "Confused about state updates and useEffect",
        status: "open"
    },
    {
        id: "r2",
        learnerName: "Alex",
        topic: "JavaScript",
        skillLevel: "Intermediate",
        urgency: "High",
        description: "Async/await vs promises is not clicking",
        status: "open"
    },
    {
        id: "r3",
        learnerName: "Maya",
        topic: "Node.js",
        skillLevel: "Beginner",
        urgency: "Low",
        description: "How Express middleware works",
        status: "open"
    },
    {
        id: "r4",
        learnerName: "Chris",
        topic: "CSS",
        skillLevel: "Intermediate",
        urgency: "Medium",
        description: "Flexbox vs Grid layout confusion",
        status: "open"
    },
    {
        id: "r5",
        learnerName: "Sam",
        topic: "MongoDB",
        skillLevel: "Beginner",
        urgency: "High",
        description: "Understanding schemas and models",
        status: "open"
    },
    {
        id: "r6",
        learnerName: "Lina",
        topic: "React",
        skillLevel: "Advanced",
        urgency: "Low",
        description: "Optimizing performance and memoization",
        status: "open"
    },
    {
        id: "r7",
        learnerName: "Turtle",
        topic: "JavaScript",
        skillLevel: "Beginner",
        urgency: "Medium",
        description: "Loops and conditionals are confusing",
        status: "open"
    },
    {
        id: "r8",
        learnerName: "Daniel",
        topic: "APIs",
        skillLevel: "Intermediate",
        urgency: "High",
        description: "REST vs GraphQL differences",
        status: "open"
    },
    {
        id: "r9",
        learnerName: "Aisha",
        topic: "TypeScript",
        skillLevel: "Beginner",
        urgency: "Medium",
        description: "Types, interfaces, and why errors happen",
        status: "open"
    },
    {
        id: "r10",
        learnerName: "Marcus",
        topic: "Git",
        skillLevel: "Beginner",
        urgency: "Low",
        description: "Merge conflicts and rebasing basics",
        status: "open"
    },
];

export default function TutorView() {
    const { user } = useAuth();
    
    // State management
    const [requests, setRequests] = useState(mockRequests);
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [points, setPoints] = useState(0);
    const [filter, setFilter] = useState("all"); // all, high, medium, low
    const [searchTerm, setSearchTerm] = useState("");

    // Get urgency color
    const getUrgencyColor = (urgency) => {
        switch (urgency.toLowerCase()) {
            case "high": return "#ff6b6b";
            case "medium": return colors.yellow;
            case "low": return "#51cf66";
            default: return colors.muted;
        }
    };

    // Accept a request
    const handleAccept = (requestId) => {
        const request = requests.find(r => r.id === requestId);
        if (request) {
            // Move to accepted list
            setAcceptedRequests(prev => [...prev, { ...request, status: "accepted" }]);
            // Remove from open requests
            setRequests(prev => prev.filter(r => r.id !== requestId));
        }
    };

    // Complete a request
    const handleComplete = (requestId) => {
        setAcceptedRequests(prev =>
            prev.map(r =>
                r.id === requestId ? { ...r, status: "completed" } : r
            )
        );
        // Award 10 points for completion
        setPoints(prev => prev + 10);
    };

    // Filter requests
    const filteredRequests = requests.filter(request => {
        const matchesSearch = 
            request.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.learnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = 
            filter === "all" || 
            request.urgency.toLowerCase() === filter.toLowerCase();
        
        return matchesSearch && matchesFilter;
    });

    return (
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
                                    fontSize: 18,
                                }}
                            >
                                {points}
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div style={card}>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            {/* Search input */}
                            <input
                                style={{ ...input, flex: 1, minWidth: 200 }}
                                type="text"
                                placeholder="Search by topic, learner, or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Available Requests */}
                    <div style={card}>
                        <h3 style={{ ...cardTitle, fontSize: 16 }}>
                            Available Requests ({filteredRequests.length})
                        </h3>

                        {filteredRequests.length === 0 ? (
                            <p style={{ margin: 0, color: colors.muted }}>
                                {searchTerm || filter !== "all" 
                                    ? "No requests match your filters."
                                    : "No requests available at the moment."}
                            </p>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {filteredRequests.map((request) => (
                                    <div
                                        key={request.id}
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
                                                marginBottom: 8,
                                                flexWrap: "wrap"
                                            }}
                                        >
                                            <strong style={{ fontSize: 16 }}>{request.topic}</strong>
                                                {request.urgency.toUpperCase()}
                                        </div>

                                       
                                        <div style={{ fontSize: 14, marginBottom: 6, color: colors.muted }}>
                                            <strong>Learner:</strong> {request.learnerName}
                                        </div>

                                        
                                        <div style={{ fontSize: 14, marginBottom: 6, color: colors.muted }}>
                                            <strong>Level:</strong> {request.skillLevel}
                                        </div>

                                        <div style={{ fontSize: 14, marginBottom: 12 }}>
                                            <strong>Description:</strong> {request.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* My Accepted Requests */}
                    <div style={card}>
                        <h3 style={{ ...cardTitle, fontSize: 16 }}>
                            My Requests ({acceptedRequests.length})
                        </h3>

                        {acceptedRequests.length === 0 ? (
                            <p style={{ margin: 0, color: colors.muted }}>
                                You haven't accepted any requests yet.
                            </p>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {acceptedRequests.map((request) => (
                                    <div
                                        key={request.id}
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
                                                marginBottom: 8
                                            }}
                                        >
                                            <strong>{request.topic}</strong>
                                            <span style={{ 
                                                color: request.status === "completed" ? "#51cf66" : colors.yellow,
                                                fontWeight: 600
                                            }}>
                                                {request.status === "completed" ? "✅ Completed" : "In Progress"}
                                            </span>
                                        </div>

                                        {/* Learner info */}
                                        <div style={{ fontSize: 14, marginBottom: 6 }}>
                                            <strong>Learner:</strong> {request.learnerName}
                                        </div>

                                        {/* Description */}
                                        <div style={{ fontSize: 14, marginBottom: 12 }}>
                                            <strong>Description:</strong> {request.description}
                                        </div>

                                        {/* Actions */}
                                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                            {request.status === "accepted" && (
                                                <button
                                                    style={buttonPrimary}
                                                    onClick={() => handleComplete(request.id)}
                                                >
                                                    Mark Complete (+10 pts)
                                                </button>
                                            )}

                                            {request.status === "completed" && (
                                                <div
                                                    style={{
                                                        padding: "10px 12px",
                                                        borderRadius: 10,
                                                        border: "1px solid #51cf66",
                                                        background: "rgba(81, 207, 102, 0.1)",
                                                        color: "#51cf66",
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    ✅ Session Completed
                                                </div>
                                            )}

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
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}