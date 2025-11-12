import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaFacebookF, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaUser, FaSyncAlt } from 'react-icons/fa';
import "./login.css";

// Mock user database (in a real app, this would be a backend API)
const mockUsers = [
  {
    id: 1,
    username: "demo@example.com",
    password: "demo123",
    name: "Demo User",
    email: "demo@example.com",
    phone: "+91 9876543210",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    joinDate: "2024-01-15",
    preferences: {
      language: "English",
      currency: "INR",
      notifications: true,
      newsletter: true
    },
    savedTrips: [
      {
        id: 1,
        name: "Mumbai Adventure",
        description: "Weekend trip to explore Mumbai's best attractions",
        startDate: "2024-03-15",
        endDate: "2024-03-17",
        destination: "Mumbai",
        bookings: [
          {
            type: "flight",
            title: "Flight: Delhi to Mumbai",
            date: "2024-03-15",
            cost: 8500
          },
          {
            type: "hotel",
            title: "Hotel: Taj Mahal Palace",
            date: "2024-03-15",
            cost: 12000
          },
          {
            type: "guide",
            title: "Tour Guide: Rajesh",
            date: "2024-03-16",
            cost: 2000
          }
        ],
        totalCost: 22500,
        status: "planned"
      },
      {
        id: 2,
        name: "Goa Beach Holiday",
        description: "Relaxing beach vacation in Goa",
        startDate: "2024-04-20",
        endDate: "2024-04-25",
        destination: "Goa",
        bookings: [
          {
            type: "flight",
            title: "Flight: Mumbai to Goa",
            date: "2024-04-20",
            cost: 6500
          },
          {
            type: "hotel",
            title: "Hotel: Taj Exotica Resort",
            date: "2024-04-20",
            cost: 18000
          },
          {
            type: "activity",
            title: "Water Sports Package",
            date: "2024-04-22",
            cost: 3500
          }
        ],
        totalCost: 28000,
        status: "planned"
      }
    ]
  }
];

// Add localStorage user logic
const LOCAL_USER_KEY = 'registeredUser';

const Login = ({ onLogin, onLogout, isLoggedIn, currentUser }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isProfileMode, setIsProfileMode] = useState(false);
  const [isSavedTripsMode, setIsSavedTripsMode] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: ""
  });
  
  // Profile states
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    preferences: {
      language: "English",
      currency: "INR",
      notifications: true,
      newsletter: true
    }
  });
  
  // Saved trips states
  const [savedTrips, setSavedTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [newTripData, setNewTripData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    destination: ""
  });
  
  // Error and success states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initialize with demo user data
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        preferences: currentUser.preferences
      });
      setSavedTrips(currentUser.savedTrips || []);
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setProfileData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTripInputChange = (e) => {
    const { name, value } = e.target;
    setNewTripData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check localStorage for registered user
    const localUserRaw = localStorage.getItem(LOCAL_USER_KEY);
    let localUser = null;
    if (localUserRaw) {
      try { localUser = JSON.parse(localUserRaw); } catch {}
    }
    if (localUser &&
      (formData.username === localUser.username || formData.username === localUser.email) &&
      formData.password === localUser.password
    ) {
      setSuccess("Login successful! Welcome back!");
      setTimeout(() => {
        onLogin(localUser);
        setIsLoginMode(false);
        setFormData({ username: "", password: "", confirmPassword: "", name: "", email: "", phone: "" });
      }, 1000);
      return;
    }

    // Fallback to mockUsers
    const isEmail = formData.username.includes('@');
    const user = mockUsers.find(u => {
      if (isEmail) {
        return u.email === formData.username && u.password === formData.password;
      } else {
        return u.username === formData.username && u.password === formData.password;
      }
    });

    if (user) {
      setSuccess("Login successful! Welcome back!");
      setTimeout(() => {
        onLogin(user);
        setIsLoginMode(false);
        setFormData({ username: "", password: "", confirmPassword: "", name: "", email: "", phone: "" });
      }, 1000);
    } else {
      setError("Invalid email/username or password. Please check your credentials.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.name || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    // Terms checkbox (if present)
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox && !termsCheckbox.checked) {
      setError("You must agree to the Terms of Use");
      return;
    }

    // Save to localStorage (overwrite previous user)
    const newUser = {
      id: Date.now(),
      username: formData.username,
      password: formData.password,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`,
      joinDate: new Date().toISOString().split('T')[0],
      preferences: {
        language: "English",
        currency: "INR",
        notifications: true,
        newsletter: true
      },
      savedTrips: []
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
    setSuccess("Registration successful! You can now login with your email or username.");
    setTimeout(() => {
      setIsRegisterMode(false);
      setIsLoginMode(true);
      setFormData({ username: "", password: "", confirmPassword: "", name: "", email: "", phone: "" });
    }, 1500);
  };

  const handleLogout = () => {
    onLogout();
    setIsLoginMode(true);
    setIsProfileMode(false);
    setIsSavedTripsMode(false);
  };

  const handleProfileSave = () => {
    setSuccess("Profile updated successfully!");
    setTimeout(() => setSuccess(""), 2000);
  };

  const handleSaveTrip = () => {
    if (!newTripData.name || !newTripData.destination || !newTripData.startDate || !newTripData.endDate) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate dates
    const startDate = new Date(newTripData.startDate);
    const endDate = new Date(newTripData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      setError("Start date cannot be in the past");
      return;
    }

    if (endDate <= startDate) {
      setError("End date must be after start date");
      return;
    }

    const newTrip = {
      id: Date.now(),
      ...newTripData,
      bookings: [],
      totalCost: 0,
      status: "planned",
      createdAt: new Date().toISOString()
    };

    setSavedTrips(prev => [...prev, newTrip]);
    setNewTripData({ name: "", description: "", startDate: "", endDate: "", destination: "" });
    setSelectedTrip(null);
    setSuccess("Trip saved successfully! You can add bookings to this trip later.");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDeleteTrip = (tripId) => {
    setSavedTrips(prev => prev.filter(trip => trip.id !== tripId));
    setSelectedTrip(null);
    setSuccess("Trip deleted successfully!");
    setTimeout(() => setSuccess(""), 2000);
  };

  const calculateTripStats = (trip) => {
    const totalBookings = trip.bookings.length;
    const totalCost = trip.bookings.reduce((sum, booking) => sum + booking.cost, 0);
    const days = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24));
    const daysUntilTrip = Math.ceil((new Date(trip.startDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    return { totalBookings, totalCost, days, daysUntilTrip };
  };

  const getTripStatus = (trip) => {
    const today = new Date();
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);
    
    if (today < startDate) {
      return "upcoming";
    } else if (today >= startDate && today <= endDate) {
      return "ongoing";
    } else {
      return "completed";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming": return "#28a745";
      case "ongoing": return "#007bff";
      case "completed": return "#6c757d";
      default: return "#6c757d";
    }
  };

  // If user is logged in, show profile or saved trips
  if (isLoggedIn && currentUser) {
    return (
      <div className="user-dashboard">
        <div className="dashboard-header">
          <div className="user-info">
            <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
            <div>
              <h3>Welcome, {currentUser.name}!</h3>
              <p>Member since {new Date(currentUser.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <div className="dashboard-nav">
          <button 
            className={`nav-btn ${isProfileMode ? 'active' : ''}`}
            onClick={() => {
              setIsProfileMode(true);
              setIsSavedTripsMode(false);
            }}
          >
            👤 Profile
          </button>
          <button 
            className={`nav-btn ${isSavedTripsMode ? 'active' : ''}`}
            onClick={() => {
              setIsSavedTripsMode(true);
              setIsProfileMode(false);
            }}
          >
            🗺️ Saved Trips
          </button>
        </div>

        {/* Profile Section */}
        {isProfileMode && (
          <div className="profile-section">
            <h2>Profile Settings</h2>
            {success && <div className="success-message">{success}</div>}
            
            <div className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileInputChange}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileInputChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="preferences-section">
                <h3>Preferences</h3>
                <div className="preferences-grid">
                  <div className="form-group">
                    <label>Language</label>
                    <select 
                      value={profileData.preferences.language}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, language: e.target.value }
                      }))}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Currency</label>
                    <select 
                      value={profileData.preferences.currency}
                      onChange={(e) => setProfileData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, currency: e.target.value }
                      }))}
                    >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>
                </div>
                
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={profileData.preferences.notifications}
                      onChange={handleInputChange}
                    />
                    Email Notifications
                  </label>
                  
                  <label>
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={profileData.preferences.newsletter}
                      onChange={handleInputChange}
                    />
                    Newsletter Subscription
                  </label>
                </div>
              </div>
              
              <button onClick={handleProfileSave} className="save-btn">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Saved Trips Section */}
        {isSavedTripsMode && (
          <div className="saved-trips-section">
            <div className="trips-header">
              <h2>Saved Trips</h2>
              <button 
                className="add-trip-btn"
                onClick={() => setSelectedTrip({})}
              >
                + Add New Trip
              </button>
            </div>
            
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}

            {/* Add/Edit Trip Form */}
            {selectedTrip && (
              <div className="trip-form">
                <h3>{selectedTrip.id ? 'Edit Trip' : 'Add New Trip'}</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Trip Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={newTripData.name}
                      onChange={handleTripInputChange}
                      placeholder="e.g., Mumbai Adventure"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Destination *</label>
                    <input
                      type="text"
                      name="destination"
                      value={newTripData.destination}
                      onChange={handleTripInputChange}
                      placeholder="e.g., Mumbai"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newTripData.startDate}
                      onChange={handleTripInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>End Date *</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newTripData.endDate}
                      onChange={handleTripInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={newTripData.description}
                    onChange={handleTripInputChange}
                    placeholder="Describe your trip plans..."
                    rows="3"
                  />
                </div>
                
                <div className="form-actions">
                  <button onClick={handleSaveTrip} className="save-btn">
                    Save Trip
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedTrip(null);
                      setNewTripData({ name: "", description: "", startDate: "", endDate: "", destination: "" });
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Trips List */}
            <div className="trips-grid">
              {savedTrips.length === 0 ? (
                <div className="empty-state">
                  <h3>No saved trips yet</h3>
                  <p>Start planning your next adventure by adding a new trip!</p>
                </div>
              ) : (
                savedTrips.map(trip => {
                  const stats = calculateTripStats(trip);
                  const status = getTripStatus(trip);
                  return (
                    <div key={trip.id} className="trip-card">
                      <div className="trip-header">
                        <h3>{trip.name}</h3>
                        <span 
                          className="trip-status"
                          style={{ backgroundColor: getStatusColor(status) }}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="trip-destination">
                        <span className="destination-icon">📍</span>
                        {trip.destination}
                      </div>
                      
                      <div className="trip-dates">
                        <span className="date-icon">📅</span>
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        <span className="trip-duration">({stats.days} days)</span>
                        {status === "upcoming" && (
                          <span className="days-away">• {stats.daysUntilTrip} days away</span>
                        )}
                      </div>
                      
                      {trip.description && (
                        <p className="trip-description">{trip.description}</p>
                      )}
                      
                      <div className="trip-stats">
                        <div className="stat">
                          <span className="stat-number">{stats.totalBookings}</span>
                          <span className="stat-label">Bookings</span>
                        </div>
                        <div className="stat">
                          <span className="stat-number">₹{stats.totalCost.toLocaleString()}</span>
                          <span className="stat-label">Total Cost</span>
                        </div>
                      </div>
                      
                      {trip.bookings.length > 0 && (
                        <div className="trip-bookings">
                          <h5>Recent Bookings:</h5>
                          <ul>
                            {trip.bookings.slice(0, 3).map((booking, index) => (
                              <li key={index}>
                                {booking.title} - ₹{booking.cost.toLocaleString()}
                              </li>
                            ))}
                            {trip.bookings.length > 3 && (
                              <li>+{trip.bookings.length - 3} more bookings</li>
                            )}
                          </ul>
                        </div>
                      )}
                      
                      <div className="trip-actions">
                        <button 
                          onClick={() => setSelectedTrip(trip)}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteTrip(trip.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Login/Register Forms
  return (
    <div className="login-bg">
      <div className="login-card">
        {/* Left Side Image */}
        <div className="login-image-side"></div>

        {/* Right Side Form */}
        <div className="login-form-side">
          <div className="glass-card">
            <h2>{isRegisterMode ? "Create Account" : "Welcome"}</h2>

            <form onSubmit={isRegisterMode ? handleRegister : handleLogin}>
              {isRegisterMode && (
                <>
                  <div className="input-group">
                    <FaUser className="icon" />
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="input-group">
                    <FaEnvelope className="icon" />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="input-group">
                    <FaLock className="icon" />
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </>
              )}

              <div className="input-group">
                <FaEnvelope className="icon" />
                <input type="text" name="username" placeholder={isRegisterMode ? "Username" : "Email"} value={formData.username} onChange={handleInputChange} required />
              </div>

              <div className="input-group">
                <FaLock className="icon" />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
              </div>

              {isRegisterMode && (
                <div className="input-group">
                  <FaSyncAlt className="icon" />
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} required />
                </div>
              )}

              {!isRegisterMode && (
                <div className="forgot-pass">
                  <a href="#">Forgot your password?</a>
                </div>
              )}

              <button type="submit" className="login-btn">
                {isRegisterMode ? "REGISTER" : "LOGIN"}
              </button>

              <div className="divider">OR</div>

              <div className="social-icons">
                <button type="button" className="icon-btn google-btn"><FcGoogle size={24} /></button>
                <button type="button" className="icon-btn facebook-btn"><FaFacebookF size={20} /></button>
                <button type="button" className="icon-btn apple-btn"><FaApple size={22} /></button>
              </div>

              <p className="register-link">
                {isRegisterMode ? (
                  <>
                    Already have an account?{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsRegisterMode(false); }}>Sign In</a>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsRegisterMode(true); }}>Register Now</a>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;