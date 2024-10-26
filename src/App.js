

import React, { useState, useEffect } from 'react';
import './App.css';
import Confetti from 'react-confetti';

function App() {
  // State variables to manage session tracking, timing, and notifications
  const [pomodoroCount, setPomodoroCount] = useState(0);  // Total completed Pomodoro sessions
  const [currentSession, setCurrentSession] = useState('work');  // Session type: 'work' or 'break'
  const [timeLeft, setTimeLeft] = useState(5);  // Time left in seconds, set to 5 for testing
  const [quote, setQuote] = useState(null);  // Current quote to display at session end
  const [error, setError] = useState(null);  // Error message for API issues
  const [showConfetti, setShowConfetti] = useState(false);  // Toggles confetti display after work session
  const [totalSessions, setTotalSessions] = useState(4);  // Number of target Pomodoro sessions
  const [completedSessions, setCompletedSessions] = useState(0);  // Tracks user’s completed sessions
  const [alarmAudio] = useState(new Audio('/Alarm.wav'));  // Audio for end-of-session alarm

  // Manages the countdown for the timer, triggering `handleSessionEnd` when `timeLeft` reaches 0
  useEffect(() => {
    if (timeLeft <= 0) handleSessionEnd();  // If timer runs out, end the session
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);  // Decrease timer every second
    return () => clearTimeout(timer);  // Clears the timer to avoid memory leaks
  }, [timeLeft]);

  // Executes actions when a session ends, alternating between work and break sessions
  const handleSessionEnd = async () => {
    if (currentSession === 'work') {
      setCompletedSessions(prev => prev + 1);  // Increase completed sessions after each work period
      alarmAudio.play();  // Plays alarm sound to notify session end
      setShowConfetti(true);  // Activates confetti to celebrate work completion
      setTimeout(() => setShowConfetti(false), 3000);  // Confetti clears after 3 seconds
    }

    setPomodoroCount(prev => prev + (currentSession === 'work' ? 1 : 0));  // Updates Pomodoro count
    fetchQuote();  // Fetches a new quote after each session
    setCurrentSession(prev => (prev === 'work' ? 'break' : 'work'));  // Alternates between work and break

    const newTime = 5;  // Sets both work and break time to 5 seconds for testing
    setTimeLeft(newTime);  // Resets timer for the next session
  };

  // Fetches a random inspirational quote from API Ninjas
  const fetchQuote = async () => {
    const category = 'inspirational';
    const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
  
    try {
      const response = await fetch(apiUrl, {
        headers: { 'X-Api-Key': 'API-KEY-HERE' } // ENTER API KEY HERE 
      });
  
      if (response.ok) {
        const data = await response.json();
        setQuote(data[0].quote || 'No quote available');  // Sets the fetched quote
      } else {
        setError(`Error: ${response.status} - ${response.statusText}`);  // Sets error if API fails
      }
    } catch (err) {
      setError('Error fetching quote');  // Catch and log any fetch errors
      console.error("API fetch error:", err);
    }
  };

  // Stops the alarm sound and resets it to the start
  const stopSound = () => {
    alarmAudio.pause();  // Pauses the sound
    alarmAudio.currentTime = 0;  // Resets to the beginning
  };

  return (
    <div className="App">
      {showConfetti && <Confetti />}  
      <h1>Mindfulness Timer</h1>
      <img src="/Clock.png" alt="Alarm clock" className="alarm-icon" />

      <div className="timer">
        <h2>{currentSession === 'work' ? 'Work' : 'Break'} Session</h2>
        <p>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
      </div>

      <div className="quote-display">
        {error ? <p>{error}</p> : <p>{quote || 'Take a deep breath and relax...'}</p>}
      </div>

      <div className="progress-tracker">
        <input
          type="number"
          value={totalSessions}
          onChange={(e) => setTotalSessions(e.target.value)}  // Adjusts total sessions count
          placeholder="Number of work sessions"
        />
        <div className="tick-boxes">
          {Array.from({ length: totalSessions }).map((_, index) => (
            <input
              key={index}
              type="checkbox"
              checked={index < completedSessions}  // Marks boxes for completed sessions
              readOnly
            />
          ))}
        </div>
        <p>Pomodoros Completed: {pomodoroCount}</p>
        <p>Next Break: {pomodoroCount % 4 === 0 ? 'Long Break' : 'Short Break'}</p>
      </div>

      <button onClick={stopSound}>Stop Sound</button>  
    </div>
  );
}

export default App;
