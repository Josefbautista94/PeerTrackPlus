# PeerTrack+

PeerTrack+ is a full-stack web application designed to connect learners with tutors in a peer-driven learning environment. The platform emphasizes motivation, accessibility, and intelligent support through AI-assisted learning tools and light gamification.

This project was built collaboratively with a focus on clean separation of concerns, realistic MVP features, and extensibility for future growth.

---

##  Features

### Authentication & Roles
- JWT-based authentication
- Role-based dashboards:
  - Learners
  - Tutors
  - Admin
- Secure protected routes using middleware

### Learner Experience
- Submit learning questions by topic
- AI-powered study assistant that:
  - Generates explanations
  - Suggests practice ideas
- View personalized insights and guidance
- Simple, focused UI to reduce friction

### Tutor Experience
- View incoming learner requests
- Filter and search requests by topic or urgency
- Accept and complete tutoring sessions
- Earn points for completed sessions (gamification)

### AI Integration
- AI-powered features using Google Gemini:
  - Study assistant chat
  - Learning insights
  - Tutor–learner matching logic
- Modular AI services for easy expansion

### Gamification & Motivation
- Tutors earn points for completed sessions
- Encourages participation without aggressive competition
- Designed to motivate consistency and contribution

---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Context API
- Axios

### Backend
- Node.js
- Express
- MongoDB & Mongoose
- JWT Authentication
- Google Gemini API

---

## 📂 Project Structure

```
PeerTrackPlus/
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── seeds/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── context/
│   │   ├── views/
│   │   ├── components/
│   │   ├── styles/
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
```

---

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

## Running the Project Locally

### Backend
```bash
cd Backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## AI Endpoint Example

```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"topic":"JavaScript Promises","message":"then vs async await"}'
```

---

## Mock Data
Seed files are included for users and requests to support local testing and demos.

---

## 👥 Team Contributions

**Jose Bautista**
- Frontend AI integration
- Learner dashboard
- API helpers and error/loading states
- Project coordination and documentation

**Adrian**
- Backend authentication
- API routes and controllers
- Database models and seeding
- JWT middleware

 **Milan** 
- Provided support during early planning and assisted with initial backend setup.

**Sintja**
- Project walkthrough video
- Feature explanation and demo presentation

---

##  Future Enhancements
- Real-time learner–tutor chat
- Session scheduling
- Expanded AI insights
- Persistent rankings and badges
- Notifications system

---

## Project Status
PeerTrack+ is a functional MVP demonstrating full-stack architecture, AI-assisted learning, and thoughtful gamification.
