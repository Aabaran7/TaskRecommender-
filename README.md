
# Pomodoro Task Manager

## Project Description

The **Pomodoro Task Manager** is a React application designed to combat procrastination and improve focus by combining a structured Pomodoro timer with mindfulness breaks. Users can set a goal number of work sessions, track their progress, and view inspirational quotes during breaks to enhance productivity and relaxation.

## Problem Solved

This app addresses the challenge of staying productive and re-energized during work and break intervals. Breaks are often difficult to enjoy meaningfully, leading to reduced focus. With motivational quotes and a structured timer, users can experience focused work sessions with thoughtful pauses.

## Setup and Run Instructions

**Clone the Repository:**
```bash
git clone https://github.com/Aabaran7/pomodoro-task-manager.git
cd pomodoro-task-manager

```

**Install Dependencies:**
```bash
npm install
npm install react-confetti
```

**Run the Application:**
```bash
npm start
```

**Usage:**
- If it does not happen automatically, Open the app in a browser at `http://localhost:3000`.
- Set the desired number of Pomodoro sessions; the app will track and display each completed session.
- During breaks, the app displays inspirational quotes, encouraging a moment of reflection.

## API Integration

- **API Used**: [API Ninjas](https://api-ninjas.com)
- **Integration**: API Ninjas was selected for its genre-filtering feature, allowing inspirational quotes to appear during breaks. The API fetch is implemented asynchronously, and the app manages any errors, showing a message if a quote fails to load.

## AI Credits

I designed and implemented the app independently, including ideas like confetti, session management, and API integration. I used AI assistance for:

- **Sound Integration**: Guidance on managing audio playback at session end.
- **Error Handling and Edge Cases**: Helped refine the error handling for API calls and edge cases to improve reliability.
- **Code Integration**: Assisted with merging various functional components, like the timer, API calls, and UI updates.
