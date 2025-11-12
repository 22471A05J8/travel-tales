import React, { useState, useEffect } from "react";
import "./InnerHome.css";

const travelQuotes = [
  "The world is a book and those who do not travel read only one page.",
  "Travel is the only thing you buy that makes you richer.",
  "Life is short and the world is wide.",
  "Adventure awaits, go find it!",
  "Travel far enough, you meet yourself."
];

const InnerHome = ({ currentUser, onTabChange }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 17) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuoteIdx((idx) => (idx + 1) % travelQuotes.length);
    }, 5000);
    return () => clearInterval(quoteTimer);
  }, []);

  return (
    <div
      className="inner-home homepage-fx"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1681488427879-9b7c067bf474?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsJTIwYXBwfGVufDB8fDB8fHww')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="welcome-banner animate-fadein">
        <div className="banner-bg-glass">
          <h1 className="welcome-title">
            <span role="img" aria-label="plane" className="plane-emoji">✈️</span>
            Welcome back, <span className="user-name">{currentUser.name}</span>!
          </h1>
          <p className="welcome-greeting">
            {greeting} &middot; {currentTime.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="quick-actions-card animate-slideup">
        <h2 className="quick-actions-title">Quick Actions</h2>
        <div className="quick-actions-row">
          <button className="quick-action-btn animate-pop" onClick={() => onTabChange('flights')}><span role="img" aria-label="flight">✈️</span> Book a Flight</button>
          <button className="quick-action-btn animate-pop" onClick={() => onTabChange('hotels')}><span role="img" aria-label="hotel">🏨</span> Find a Hotel</button>
          <button className="quick-action-btn animate-pop" onClick={() => onTabChange('activities')}><span role="img" aria-label="activities">🎯</span> Explore Activities</button>
          <button className="quick-action-btn animate-pop" onClick={() => onTabChange('guides')}><span role="img" aria-label="guide">👥</span> Book a Guide</button>
          <button className="quick-action-btn animate-pop" onClick={() => onTabChange('travel')}><span role="img" aria-label="calendar">📅</span> View Calendar</button>
        </div>
      </div>

      {/* Motivational Quote */}
      
    </div>
  );
};

export default InnerHome;
