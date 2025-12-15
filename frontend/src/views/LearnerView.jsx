import React, { useState } from "react";
import { sendAiMessage } from "../api/aiApi";
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

/**
 * LearnerView
 * Provides the learner-facing dashboard for submitting help requests,
 * viewing matched tutors, and interacting with a lightweight AI assistant.
 */
export default function LearnerView({ onSubmitRequest }) {
    /**
     * Request form state.
     * These values represent the learner's help request parameters.
     */
    const [topic, setTopic] = useState("React");
    const [skillLevel, setSkillLevel] = useState("Beginner");
    const [urgency, setUrgency] = useState("Medium");
    const [description, setDescription] = useState("");

    /**
     * Submission and matching state.
     * Used to display submitted request details and tutor matches.
     */
    const [submitted, setSubmitted] = useState(null);
    const [matches, setMatches] = useState([]);

    /**
     * AI assistant interaction state.
     */
    const [question, setQuestion] = useState("");
    const [assistantRes, setAssistantRes] = useState(null);

    /**
     * Handles learner request submission.
     * Resets dependent state, notifies the parent component,
     * and generates mock tutor matches for demo purposes.
     */
    function handleSubmit() {
        setMatches([]);
        setAssistantRes(null);
        setQuestion("");

        const req = { topic, skillLevel, urgency, description };
        setSubmitted(req);

        // Notify parent (App) of the new request
        onSubmitRequest?.(req);

        // Simulated tutor matching results (demo-safe)
        setMatches([
            {
                tutorId: "t1",
                name: "Alex",
                score: 92,
                reason: `Strong ${topic} experience • Active tutor • Good availability`,
            },
            {
                tutorId: "t2",
                name: "Mina",
                score: 86,
                reason: `Good match for ${skillLevel} • Solid skill overlap`,
            },
            {
                tutorId: "t3",
                name: "Sam",
                score: 78,
                reason: `Can help with fundamentals • Good feedback ratings`,
            },
        ]);
    }

    /**
     * Simulates an AI assistant response.
     * In a production environment, this would call an API.
     */
async function handleAskAssistant() {
  try {
    const data = await sendAiMessage({
      topic,
      message: question, // send what the learner typed
    });

    setAssistantRes(data);
  } catch (err) {
    console.error("AI request failed:", err);

    setAssistantRes({
      reply: `Quick hint (${topic}): break the problem into small steps and verify what changes at each step.`,
      practice: `Practice: What’s one common beginner mistake in ${topic}?`,
    });
  }
}

    return (
        // Page-level wrapper for consistent background and spacing
        <div style={pageWrap}>
            <div style={container}>
                {/* Dashboard header */}
                <div style={{ ...card, marginBottom: 16 }}>
                    <h2 style={cardTitle}>Learner Dashboard</h2>
                    <p style={{ margin: 0, color: colors.muted }}>
                        Submit a help request, see smart tutor matches, and use the AI study assistant while you wait.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                    {/* Request submission card */}
                    <div style={card}>
                        <h3 style={{ ...cardTitle, fontSize: 16 }}>Request Help</h3>

                        <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
                            {/* Topic selection */}
                            <label style={label}>
                                Topic
                                <select
                                    style={input}
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                >
                                    <option>React</option>
                                    <option>JavaScript</option>
                                    <option>Node</option>
                                    <option>CSS</option>
                                </select>
                            </label>

                            {/* Skill level and urgency */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                <label style={label}>
                                    Skill Level
                                    <select
                                        style={input}
                                        value={skillLevel}
                                        onChange={(e) => setSkillLevel(e.target.value)}
                                    >
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </label>

                                <label style={label}>
                                    Urgency
                                    <select
                                        style={input}
                                        value={urgency}
                                        onChange={(e) => setUrgency(e.target.value)}
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </label>
                            </div>

                            {/* Optional request description */}
                            <label style={label}>
                                Short description
                                <textarea
                                    style={{ ...input, resize: "vertical", minHeight: 90 }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Ex: I'm confused about state updates in React..."
                                />
                            </label>

                            {/* Request actions */}
                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                <button style={buttonPrimary} onClick={handleSubmit}>
                                    Submit Request
                                </button>
                                <button
                                    style={buttonGhost}
                                    onClick={() => {
                                        // Reset all learner-side state
                                        setTopic("React");
                                        setSkillLevel("Beginner");
                                        setUrgency("Medium");
                                        setDescription("");
                                        setSubmitted(null);
                                        setMatches([]);
                                        setQuestion("");
                                        setAssistantRes(null);
                                    }}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        {/* Submitted request preview */}
                        {submitted && (
                            <div
                                style={{
                                    marginTop: 14,
                                    padding: 12,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: 12,
                                    background: "#FFFFFF",
                                    color: colors.text,
                                }}
                            >
                                <strong>Submitted</strong>
                                <pre
                                    style={{
                                        margin: "10px 0 0",
                                        whiteSpace: "pre-wrap",
                                        color: colors.text,
                                    }}
                                >
                                    {JSON.stringify(submitted, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>

                    {/* Tutor matches and AI assistant */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                        {/* Tutor matching results */}
                        <div style={card}>
                            <h3 style={{ ...cardTitle, fontSize: 16 }}>Tutor Matches</h3>
                            <p style={{ marginTop: -6, color: colors.muted }}>
                                Explainable, rule-based matching.
                            </p>

                            {matches.length === 0 ? (
                                <p style={{ margin: 0, color: colors.muted }}>
                                    Submit a request to see matches.
                                </p>
                            ) : (
                                <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                                    {matches.map((m) => (
                                        <div
                                            key={m.tutorId}
                                            style={{
                                                border: `1px solid ${colors.border}`,
                                                borderRadius: 12,
                                                padding: 12,
                                                background: "#FFFFFF",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    gap: 12,
                                                }}
                                            >
                                                <strong style={{ color: colors.text }}>{m.name}</strong>
                                                <span style={{ color: colors.muted }}>
                                                    Score: {m.score}
                                                </span>
                                            </div>
                                            <div style={{ marginTop: 6, color: colors.text }}>
                                                {m.reason}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* AI study assistant */}
                        <div style={card}>
                            <h3 style={{ ...cardTitle, fontSize: 16 }}>AI Study Assistant</h3>
                            <p style={{ marginTop: -6, color: colors.muted }}>
                                Quick hints and practice while you wait. Not a replacement for a tutor.
                            </p>

                            {!submitted ? (
                                <p style={{ margin: 0, color: colors.muted }}>
                                    Submit a request first to unlock the assistant.
                                </p>
                            ) : (
                                <>
                                    <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                                        <input
                                            style={{ ...input, flex: 1 }}
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            placeholder={`Ask something about ${topic}...`}
                                        />
                                        <button style={buttonPrimary} onClick={handleAskAssistant}>
                                            Ask
                                        </button>
                                    </div>

                                    {assistantRes && (
                                        <div
                                            style={{
                                                marginTop: 12,
                                                padding: 12,
                                                border: `1px solid ${colors.border}`,
                                                borderRadius: 12,
                                                background: "#FFFFFF",
                                                color: colors.text,
                                            }}
                                        >
                                            <div>
                                                <strong>Reply:</strong> {assistantRes.reply}
                                            </div>

                                            {assistantRes.practice && (
                                                <div style={{ marginTop: 6 }}>
                                                    <strong>Practice:</strong> {assistantRes.practice}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}