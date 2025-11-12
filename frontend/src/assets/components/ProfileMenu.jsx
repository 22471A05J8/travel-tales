import React, { useState, useRef, useEffect } from "react";
import "./ProfileMenu.css";

const ProfileMenu = ({ currentUser, onLogout, onProfileClick, isOpen, onToggle, setIsOpen }) => {
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const handleProfileClick = () => {
    onProfileClick();
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <div className="profile-menu" ref={menuRef}>
      <button className="profile-toggle" onClick={onToggle}>
        <div className="profile-avatar">
          <img src={currentUser.avatar} alt={currentUser.name} />
          <div className="online-indicator"></div>
        </div>
        <div className="profile-info">
          <span className="profile-name">{currentUser.name}</span>
          <span className="profile-status">Online</span>
        </div>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <div className="user-details">
              <img src={currentUser.avatar} alt={currentUser.name} className="dropdown-avatar" />
              <div>
                <h4>{currentUser.name}</h4>
                <p>{currentUser.email}</p>
              </div>
            </div>
          </div>

          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleProfileClick}>
              <span className="item-icon">👤</span>
              <span>Profile Settings</span>
            </button>
            
            <button className="dropdown-item">
              <span className="item-icon">🗺️</span>
              <span>My Trips</span>
            </button>
            
            <button className="dropdown-item">
              <span className="item-icon">💳</span>
              <span>Payment Methods</span>
            </button>
            
            <button className="dropdown-item">
              <span className="item-icon">🔔</span>
              <span>Notifications</span>
            </button>
            
            <button className="dropdown-item">
              <span className="item-icon">⚙️</span>
              <span>Settings</span>
            </button>
            
            <div className="dropdown-divider"></div>
            
            <button className="dropdown-item logout" onClick={handleLogout}>
              <span className="item-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu; 