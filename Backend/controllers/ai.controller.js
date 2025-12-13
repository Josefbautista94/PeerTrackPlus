// AI controllers will live here

export const matchTutors = (req, res) => {
  res.json({
    matches: [
      {
        tutorId: "t1",
        score: 92,
        reason: "Strong topic match and recent tutoring activity"
      },
      {
        tutorId: "t2",
        score: 85,
        reason: "Relevant experience and availability"
      }
    ]
  });
};

export const aiChat = (req, res) => {
  const { topic, message } = req.body;

  res.json({
    reply: `Here’s a quick explanation related to ${topic}.`,
    practice: "Can you explain this concept in your own words?"
  });
};

export const adminInsights = (req, res) => {
  res.json({
    insights: [
      "React and JavaScript are the most requested topics",
      "Most requests are beginner level",
      "Session completion rate is trending up"
    ]
  });
};