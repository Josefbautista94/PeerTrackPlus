/**
 * Global color palette
 * Centralized here to ensure visual consistency
 * across all Learner, Tutor, and Admin views.
 */
export const colors = {
    navy: "#1F4E79",    // Primary brand color (headers, navigation)
    blue: "#2E75B6",    // Primary card background
    yellow: "#F4C430",  // Call-to-action (primary buttons)
    bg: "#F5F7FA",      // Application background
    text: "#1F2933",    // Default dark text (used on light surfaces)
    muted: "rgba(255,255,255,0.88)", // Secondary text on dark/blue backgrounds
    border: "#D1D5DB",  // Subtle borders and separators
    white: "#FFFFFF",
};

/**
 * Page-level wrapper
 * Ensures consistent background, vertical spacing,
 * and full-height layout across all pages.
 */
export const pageWrap = {
    background: colors.bg,
    minHeight: "calc(100vh - 90px)", // Accounts for header height
    padding: "18px 0 40px",
};

/**
 * Content container
 * Controls maximum width and horizontal padding
 * to keep layouts readable on large screens.
 */
export const container = {
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 20px",
};

/**
 * Primary card component
 * Used for all major panels and sections
 * across Learner, Tutor, and Admin dashboards.
 */
export const card = {
    background: colors.blue,
    borderRadius: 14,
    padding: 16,
    color: colors.white, // Default text color for dark cards
};

/**
 * Standard card title styling
 * Used for section headers to maintain hierarchy.
 */
export const cardTitle = {
    margin: "0 0 10px",
    fontSize: 18,
    fontWeight: 700,
    color: colors.white,
};

/**
 * Form label styling
 * Optimized for readability on dark card backgrounds.
 */
export const label = {
    display: "grid",
    gap: 6,
    fontSize: 13,
    color: colors.white,
    fontWeight: 600,
};

/**
 * Shared input styling
 * Used for text inputs, selects, and textareas.
 */
export const input = {
    padding: "10px 12px",
    borderRadius: 10,
    border: `1px solid ${colors.border}`,
    outline: "none",
    fontSize: 14,
};

/**
 * Primary action button
 * Used for high-priority user actions (submit, accept, complete).
 */
export const buttonPrimary = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    background: colors.yellow,
    color: colors.text,
    fontWeight: 600,
    cursor: "pointer",
};

/**
 * Secondary / ghost button
 * Used for low-priority or utility actions.
 */
export const buttonGhost = {
    padding: "10px 14px",
    borderRadius: 10,
    border: `1px solid ${colors.white}`,
    background: "transparent",
    color: colors.white,
    fontWeight: 600,
    cursor: "pointer",
};
