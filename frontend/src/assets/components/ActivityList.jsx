import React, { useState } from "react";
import "./ActivityList.css";

const ActivityList = ({ activities, onBooking, bookings }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    participants: 1,
    participantNames: [""],
    contactName: "",
    email: "",
    phone: ""
  });

  const handleBookActivity = (activity) => {
    setSelectedActivity(activity);
    setShowBookingForm(true);
    setBookingDetails(prev => ({
      ...prev,
      participants: 1,
      participantNames: [""]
    }));
  };

  const handleBookingChange = (field, value) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleParticipantChange = (index, value) => {
    setBookingDetails(prev => {
      const newNames = [...prev.participantNames];
      newNames[index] = value;
      return {
        ...prev,
        participantNames: newNames
      };
    });
  };

  const handleParticipantsChange = (count) => {
    const newCount = parseInt(count);
    setBookingDetails(prev => ({
      ...prev,
      participants: newCount,
      participantNames: Array(newCount).fill("").map((_, i) => prev.participantNames[i] || "")
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Validate booking details
    const isValid = bookingDetails.contactName && 
                   bookingDetails.email && 
                   bookingDetails.phone &&
                   bookingDetails.date &&
                   bookingDetails.participantNames.every(name => name.trim() !== "");

    if (!isValid) {
      alert("Please fill in all required fields");
      return;
    }

    // Calculate total price
    const totalPrice = selectedActivity.price * bookingDetails.participants;

    const finalBookingDetails = {
      ...bookingDetails,
      totalPrice
    };

    onBooking(selectedActivity, finalBookingDetails);
    setShowBookingForm(false);
    setSelectedActivity(null);
    setBookingDetails({
      date: "",
      participants: 1,
      participantNames: [""],
      contactName: "",
      email: "",
      phone: ""
    });
    alert("Activity booked successfully!");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '#27ae60';
      case 'moderate': return '#f39c12';
      case 'hard': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'adventure': return '#e74c3c';
      case 'cultural': return '#9b59b6';
      case 'entertainment': return '#f39c12';
      case 'food': return '#e67e22';
      case 'heritage': return '#8e44ad';
      case 'nature': return '#27ae60';
      case 'educational': return '#3498db';
      default: return '#95a5a6';
    }
  };

  if (activities.length === 0) {
    return (
      <div className="no-activities">
        <h3>No activities found</h3>
        <p>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="activity-list-container">
      <h3>Available Activities ({activities.length})</h3>
      
      <div className="activities-grid">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-card">
            <div className="activity-image">
              <img src={activity.image} alt={activity.name} />
              <div className="activity-category" style={{ backgroundColor: getCategoryColor(activity.category) }}>
                {activity.category}
              </div>
              <div className="activity-difficulty" style={{ backgroundColor: getDifficultyColor(activity.difficulty) }}>
                {activity.difficulty}
              </div>
            </div>

            <div className="activity-content">
              <div className="activity-header">
                <h4>{activity.name}</h4>
                <div className="activity-price">
                  <span className="price">{formatPrice(activity.price)}</span>
                  <span className="per-person">per person</span>
                </div>
              </div>

              <div className="activity-location">
                <p><strong>📍 {activity.location}</strong></p>
                <p className="meeting-point">Meeting: {activity.meetingPoint}</p>
              </div>

              <div className="activity-description">
                <p>{activity.description}</p>
              </div>

              <div className="activity-details">
                <div className="detail-item">
                  <span className="label">Duration:</span>
                  <span className="value">{activity.duration}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Start Time:</span>
                  <span className="value">{activity.startTime}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Max Participants:</span>
                  <span className="value">{activity.maxParticipants}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Min Age:</span>
                  <span className="value">{activity.minAge} years</span>
                </div>
              </div>

              <div className="activity-highlights">
                <h5>Highlights:</h5>
                <div className="highlights-list">
                  {activity.highlights.map((highlight, index) => (
                    <span key={index} className="highlight-tag">{highlight}</span>
                  ))}
                </div>
              </div>

              <div className="activity-included">
                <h5>Included:</h5>
                <div className="included-list">
                  {activity.included.map((item, index) => (
                    <span key={index} className="included-tag">✓ {item}</span>
                  ))}
                </div>
              </div>

              <button 
                className="book-btn"
                onClick={() => handleBookActivity(activity)}
              >
                Book Activity
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingForm && selectedActivity && (
        <div className="booking-modal">
          <div className="booking-content">
            <div className="booking-header">
              <h3>Book Activity - {selectedActivity.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowBookingForm(false)}
              >
                ×
              </button>
            </div>

            <div className="activity-summary">
              <p><strong>Location:</strong> {selectedActivity.location}</p>
              <p><strong>Category:</strong> {selectedActivity.category}</p>
              <p><strong>Duration:</strong> {selectedActivity.duration}</p>
              <p><strong>Start Time:</strong> {selectedActivity.startTime}</p>
              <p><strong>Price:</strong> {formatPrice(selectedActivity.price)} per person</p>
              <p><strong>Meeting Point:</strong> {selectedActivity.meetingPoint}</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="booking-form">
              <h4>Booking Details</h4>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Activity Date:</label>
                  <input
                    type="date"
                    id="date"
                    value={bookingDetails.date}
                    onChange={(e) => handleBookingChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="participants">Number of Participants:</label>
                  <select
                    id="participants"
                    value={bookingDetails.participants}
                    onChange={(e) => handleParticipantsChange(e.target.value)}
                    required
                  >
                    {Array.from({ length: Math.min(10, selectedActivity.maxParticipants) }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="participants-section">
                <h5>Participant Names:</h5>
                {bookingDetails.participantNames.map((name, index) => (
                  <div key={index} className="form-group">
                    <label htmlFor={`participant-${index}`}>Participant {index + 1}:</label>
                    <input
                      type="text"
                      id={`participant-${index}`}
                      value={name}
                      onChange={(e) => handleParticipantChange(index, e.target.value)}
                      placeholder={`Participant ${index + 1} name`}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactName">Contact Person:</label>
                  <input
                    type="text"
                    id="contactName"
                    value={bookingDetails.contactName}
                    onChange={(e) => handleBookingChange('contactName', e.target.value)}
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={bookingDetails.email}
                    onChange={(e) => handleBookingChange('email', e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  value={bookingDetails.phone}
                  onChange={(e) => handleBookingChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                  required
                />
              </div>

              <div className="price-calculation">
                <h5>Price Calculation:</h5>
                <div className="calculation-details">
                  <p>Participants: {bookingDetails.participants}</p>
                  <p>Price per person: {formatPrice(selectedActivity.price)}</p>
                  <p className="total-price">
                    <strong>Total: {formatPrice(selectedActivity.price * bookingDetails.participants)}</strong>
                  </p>
                </div>
              </div>
              
              <div className="booking-actions">
                <button type="button" onClick={() => setShowBookingForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="confirm-booking">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bookings History */}
      {bookings.length > 0 && (
        <div className="bookings-history">
          <h3>Your Activity Bookings</h3>
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <h4>{booking.activity.name}</h4>
                  <span className="booking-status">{booking.status}</span>
                </div>
                <div className="booking-details">
                  <p><strong>Location:</strong> {booking.activity.location}</p>
                  <p><strong>Category:</strong> {booking.activity.category}</p>
                  <p><strong>Date:</strong> {booking.bookingDetails.date}</p>
                  <p><strong>Participants:</strong> {booking.bookingDetails.participants}</p>
                  <p><strong>Duration:</strong> {booking.activity.duration}</p>
                  <p><strong>Total:</strong> {formatPrice(booking.bookingDetails.totalPrice)}</p>
                  <p><strong>Booking ID:</strong> {booking.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityList; 