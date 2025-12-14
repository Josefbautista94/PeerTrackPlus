import React from "react";

/**
 * RoleSwitcher
 * Displays role-based navigation tabs and controls
 * which dashboard view the user can access.
 *
 * Visible tabs are determined by `allowedRoles`,
 * enforcing role-based access at the UI level.
 */
export default function RoleSwitcher({
    role,
    setRole,
    allowedRoles = ["Learner"],
}) {
    /**
     * Filter available tabs based on allowed roles.
     * Prevents unauthorized roles from appearing in the UI.
     */
    const tabs = ["Learner", "Tutor", "Admin"].filter((t) =>
        allowedRoles.includes(t)
    );

    return (
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {tabs.map((r) => (
                <button
                    key={r}
                    onClick={() => setRole(r)}
                    style={{
                        padding: "8px 14px",
                        borderRadius: 8,
                        border: "1px solid #D1D5DB",
                        cursor: "pointer",
                        background: role === r ? "#0B3C5D" : "#FFFFFF",
                        color: role === r ? "#FFFFFF" : "#1F2933",
                        fontWeight: 500,
                    }}
                >
                    {r}
                </button>
            ))}
        </div>
    );
}
