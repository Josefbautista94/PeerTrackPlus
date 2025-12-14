import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import RoleSwitcher from "./components/RoleSwitcher";
import LearnerView from "./views/LearnerView";
import TutorView from "./views/TutorView";
import AdminView from "./views/AdminView";
import Login from "./views/Login";
import Register from "./views/Register";
import { useAuth } from "./context/AuthContext";

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    /**
     * Global application state shared between dashboards.
     * These values simulate backend-driven data for demo purposes.
     */
    const [latestRequest, setLatestRequest] = useState(null);
    const [status, setStatus] = useState("open");
    const [points, setPoints] = useState(0);
    const [totalRequests, setTotalRequests] = useState(0);
    const [completedSessions, setCompletedSessions] = useState(0);

    /**
     * Authentication gate:
     * If no user is logged in, restrict the app to auth routes only.
     */
    if (!user) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        );
    }

    /**
     * User role resolution.
     * Roles drive routing, tab visibility, and access control.
     */
    const userRole = user.role; // "learner" | "tutor" | "admin"

    /**
     * Controls which role tabs are visible in the UI.
     * Admins are intentionally restricted to the Admin view only.
     */
    const allowedRoles =
        userRole === "admin"
            ? ["Admin"]
            : userRole === "tutor"
                ? ["Tutor"]
                : ["Learner"];

    /**
     * Route-level access control flags.
     * Prevents users from manually navigating to unauthorized routes.
     */
    const canSeeLearner = userRole === "learner";
    const canSeeTutor = userRole === "tutor";
    const canSeeAdmin = userRole === "admin";

    /**
     * Default landing route after login or refresh.
     */
    const homeRoute =
        userRole === "admin" ? "/admin" : userRole === "tutor" ? "/tutor" : "/learner";

    /**
     * Handles submission of a new learner request.
     * Updates shared state and redirects user to their allowed dashboard.
     */
    function handleNewRequest(req) {
        setLatestRequest(req);
        setStatus("open");
        setTotalRequests((n) => n + 1);

        if (userRole === "tutor") navigate("/tutor");
        else if (userRole === "admin") navigate("/admin");
        else navigate("/learner");
    }

    /**
     * Tutor action: accept an open request.
     */
    function handleAccept() {
        setStatus("accepted");
    }

    /**
     * Tutor action: complete a session and award points.
     */
    function handleComplete() {
        setStatus("completed");
        setPoints((p) => p + 10);
        setCompletedSessions((n) => n + 1);

        if (userRole === "admin") navigate("/admin");
        else if (userRole === "tutor") navigate("/tutor");
        else navigate("/learner");
    }

    /**
     * Determines which role tab is currently active
     * based on the current URL path.
     */
    const path = location.pathname;
    const activeTab = path.startsWith("/admin")
        ? "Admin"
        : path.startsWith("/tutor")
            ? "Tutor"
            : "Learner";

    /**
     * Handles role tab navigation with safety checks.
     */
    function setRole(nextRole) {
        if (!allowedRoles.includes(nextRole)) return;

        if (nextRole === "Learner") navigate("/learner");
        if (nextRole === "Tutor") navigate("/tutor");
        if (nextRole === "Admin") navigate("/admin");
    }

    return (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: 20, fontFamily: "system-ui" }}>
            {/* Application header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ margin: 0 }}>PeerTrack+</h1>

                <button
                    onClick={logout}
                    style={{
                        padding: "10px 16px",
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.65)",
                        background: "#1F4E79",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 6px 14px rgba(0,0,0,0.10)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#163A5F")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#1F4E79")}
                >
                    Logout
                </button>
            </div>

            {/* Role-based navigation tabs */}
            <div style={{ marginTop: 16 }}>
                <RoleSwitcher role={activeTab} setRole={setRole} allowedRoles={allowedRoles} />
            </div>

            {/* Application routes */}
            <Routes>
                <Route path="/" element={<Navigate to={homeRoute} replace />} />

                <Route
                    path="/learner"
                    element={
                        canSeeLearner ? (
                            <LearnerView onSubmitRequest={handleNewRequest} />
                        ) : (
                            <Navigate to={homeRoute} replace />
                        )
                    }
                />

                <Route
                    path="/tutor"
                    element={
                        canSeeTutor ? (
                            <TutorView
                                request={latestRequest}
                                status={status}
                                onAccept={handleAccept}
                                onComplete={handleComplete}
                                points={points}
                            />
                        ) : (
                            <Navigate to={homeRoute} replace />
                        )
                    }
                />

                <Route
                    path="/admin"
                    element={
                        canSeeAdmin ? (
                            <AdminView
                                latestRequest={latestRequest}
                                totalRequests={totalRequests}
                                completedSessions={completedSessions}
                                points={points}
                            />
                        ) : (
                            <Navigate to={homeRoute} replace />
                        )
                    }
                />

                <Route path="*" element={<Navigate to={homeRoute} replace />} />
            </Routes>
        </div>
    );
}
