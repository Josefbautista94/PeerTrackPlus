// aiMatch.service.js
// Tutor matching logic lives here

// Normalize a single string safely
const normalize = (value = "") =>
  String(value).trim().toLowerCase();

// Optional skill aliases so "reactjs" and "react.js" match "react"
const aliasSkill = (skill) => {
  const s = normalize(skill);

  if (s === "reactjs" || s === "react.js") return "react";
  if (s === "nodejs" || s === "node.js") return "node";

  return s;
};

// Convert "React JavaScript" into ["react", "javascript"]
const topicKeywords = (topic = "") => {
  const t = normalize(topic);
  if (!t) return [];
  return t.split(/\s+/).filter(Boolean);
};

// Ensure skills always become an array of normalized skills
// Accepts: ["React", "JavaScript"] OR "React" OR undefined
const normalizeSkills = (skills) => {
  if (Array.isArray(skills)) return skills.map(aliasSkill).filter(Boolean);
  if (skills) return [aliasSkill(skills)].filter(Boolean);
  return [];
};

// Count overlap between topic keywords and tutor skills
const overlapCount = (keywords, skills) => {
  const skillSet = new Set(normalizeSkills(skills));

  let hits = 0;
  for (const k of keywords) {
    const key = aliasSkill(k);
    if (skillSet.has(key)) hits += 1;
  }

  return hits;
};

// Human readable explanation of why a tutor matched
const buildReason = ({ overlap, topic, hasAvailability, isActive, level }) => {
  const parts = [];

  if (overlap > 0) parts.push(`Skill match for "${topic}"`);
  if (hasAvailability) parts.push("Available soon");
  if (isActive) parts.push("Recently active");
  if (level) parts.push(`Good for ${level} level`);

  if (parts.length === 0) return "General match based on profile";
  return parts.join(", ");
};

// Score tutor based on signals
const scoreTutor = ({ overlap, hasAvailability, isActive, level }) => {
  let score = 0;

  // Strongest signal
  score += overlap * 40;

  if (hasAvailability) score += 15;
  if (isActive) score += 10;

  if (level === "beginner") score += 5;
  if (level === "intermediate") score += 3;

  return Math.min(score, 100);
};

// Main matching function
// Inputs: { topic, level, tutors[] }
// Output: top 3 tutors with score + reason
const generateTutorMatches = ({ topic, level, tutors = [] }) => {
  const keywords = topicKeywords(topic);

  const ranked = tutors
    .map((t) => {
      const overlap = overlapCount(keywords, t.skills);

      const hasAvailability = Boolean(t.available);
      const isActive = Boolean(t.active);

      const score = scoreTutor({ overlap, hasAvailability, isActive, level });
      const reason = buildReason({ overlap, topic, hasAvailability, isActive, level });

      return {
        tutorId: t.tutorId || t._id || t.id,
        name: t.name,
        score,
        reason,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return ranked;
};

export { generateTutorMatches };