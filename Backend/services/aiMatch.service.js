// Tutor matching logic will live here

const normalize = (s = "") => s.toLowerCase().trim(); // A helper function which takes a string(s), converts it to lower case and removes extra spaces in the beginning and end

const topicKeywords = (topic = "") => { // 	Takes the topic the learner typed in (example: "React JavaScript")

  const t = normalize(topic); // 	Normalizes it so case and spacing don’t matter

  return t.split(/\s+/).filter(Boolean) // 	Splits the topic into individual words and removes any empty values
}

//  core of skill based matching, more overlap = higher confidence match
const overlaps = (keywords, skills) => { 

  const skillSet = new Set(skills.map(normalize)) // Converts the tutor's skills into a Set for a faster look up and also normalizes each skill

  let hits = 0; // Initializing a counter to track our matches

  for (let k of keywords) { //Looping through each keyword from the learner's topic

    if (skillSet.has(k)) {

      hits += 1 // Increments the score for each match
    
    }

  }

  return hits; // Returns how many skills match, this is going to be fed directly into the tutor's score later
}


// This function creates a human readable explanation for why a tutor was matched
// for example : “Skill match for ‘React’, available soon, recently active, good for beginner level”
const buildReason = ({ overlapCount, topic, hasAvailability, isActive, level }) => { // Destructuring makes it clear what data affects the explanation

  const parts = []; // We're going to collect the explanation of fragments in this array right here

    // Explain skill overlap
  if (overlapCount > 0) {
    parts.push(`Skill match for "${topic}"`) //	If the tutor shares skills with the learner’s topic
  }
  // Highlight tutor availability
  if (hasAvailability) {
    parts.push(`Available soon`) // This helps learners understand why someone is ranked higher
  }
    // Reward recent activity
  if (isActive) {
    parts.push(`Recently Active`) // Signals responsiveness to learners
  }
    // Match learner level when provided
  if (level) {
    parts.push(`Good for ${level} level`) // 	Tailors the explanation to learner level
  }
    // Fallback explanation if no specific signals matched
  if (parts.length === 0) {
    return `General match based on profile` 
  }
   // Combine all explanation parts into a single sentence
    return parts.join(', ')
}

// Calculates a match score for a tutor based on multiple signals
const scoreTutor = ({ overlapCount, hasAvailability, isActive, level }) => { //	Accepts a bundle of matching factors

  let score = 0; // Score starts at 0

   // Skill overlap is the strongest signal
  score += overlapCount * 40   // Each matching keyword adds significant weight

  if (hasAvailability) { // Tutors who are available soon get a boost
    score += 15
  }

  if (isActive) { // Rewards tutors who are recently active
    score += 10
  }

    // Small bonus based on learner level
  if (level === "beginner") {
    score += 5
  }

  if (level === "intermediate") {
    score += 3
  }

  return Math.min(score, 100) // Caps the score at 100 and keeps scores easy to read and compare, prevents runaway values

}

// Main matching function
// Inputs: topic, level, tutors[]
// Output: top 3 ranked tutors with score + reason
const generateTutorMatches = ({ topic, level, tutors }) => { //	Function takes one object so you can pass inputs cleanly, topic and level come from the learner request, •	tutors is the list of tutor profiles you are scoring.

  const keywords = topicKeywords(topic); // Breaks the topic into normalized keywords so matching is consistent, 	Example: "react javascript" becomes ["react", "javascript"].

  const ranked = tutors.map(t => { // Loops through every tutor and creates a new “scored tutor” object.

    const overlapCount = overlaps(keywords, t.skills || []) // Counts how many of the topic keywords are present in the tutor’s skills

    const hasAvailability = Boolean(t.available); // Converts whatever t.available is into a clean true or false.

    const isActive = Boolean(t.active) // Same idea, true if tutor is active, false otherwise

    const score = scoreTutor({ overlapCount, hasAvailability, isActive, level }); // Uses your scoring weights to calculate a match score for this tutor.

    const reason = buildReason({ overlapCount, topic, hasAvailability, isActive, level }); // Builds a human readable explanation string that matches the score logic.

    return { // Is going to return the structured result the frontend can render easily.
      tutorId: t.tutorId,
      name: t.name,
      score,
      reason
    };
  })
    .sort((a, b) => b.score - a.score) // Sorts tutors from highest score to lowest
    .slice(0, 3); // Since its a Minimum Viable Product only return the top 3 matches

  return ranked; // Returns the final list.
};

module.exports = { generateTutorMatches }

