/**
 * Authentication container
 * Used for Login and Register pages to center
 * and visually separate auth forms from the app.
 */
export const authContainer = {
    maxWidth: 420,
    margin: "100px auto",
    padding: 30,
    background: "#2E75B6", // Primary brand blue for auth panels
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

/**
 * Authentication page title
 * Styled for visibility on dark backgrounds.
 */
export const authTitle = {
    textAlign: "center",
    marginBottom: 20,
    color: "#FFFFFF",
};

/**
 * Shared input styling for auth forms
 * Applied to text inputs, selects, and password fields.
 */
export const inputStyle = {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #D1D5DB",
    fontSize: 14,
};

/**
 * Primary action button for authentication
 * Used for login and registration submission.
 */
export const buttonPrimary = {
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#F4C430", // Primary call-to-action color
    color: "#1F2933",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
};

/**
 * Auth navigation link
 * Used for switching between Login and Register views.
 */
export const linkStyle = {
    color: "#FFFFFF",
    textDecoration: "underline",
    fontWeight: 500,
};
