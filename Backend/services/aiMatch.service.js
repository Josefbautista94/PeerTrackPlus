// Tutor matching logic will live here

export const calculateTutorMatches = (topic, tutors) => {
  return tutors
    .map(tutor => ({
      ...tutor,
      score: Math.floor(Math.random() * 100),
      reason: `Matched based on ${topic} experience`
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};