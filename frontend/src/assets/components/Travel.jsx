import React, { useState, useEffect } from "react";
import "./Travel.css";

const Travel = ({ bookings = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // month, week, day

  // Get current month's first day and last day
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  // Get bookings for a specific date
  const getBookingsForDate = (date) => {
    return bookings.filter(booking => {
      let bookingDate;
      if (booking.type === 'flight') {
        bookingDate = new Date(booking.date);
      } else if (booking.type === 'hotel') {
        bookingDate = new Date(booking.date);
      } else if (booking.type === 'guide') {
        bookingDate = new Date(booking.date);
      } else if (booking.type === 'activity') {
        bookingDate = new Date(booking.date);
      } else {
        // Fallback for old booking structure
        if (booking.flight) {
          bookingDate = new Date(booking.flight.date);
        } else if (booking.hotel) {
          bookingDate = new Date(booking.bookingDetails.checkIn);
        } else if (booking.guide) {
          bookingDate = new Date(booking.bookingDate);
        } else if (booking.activity) {
          bookingDate = new Date(booking.bookingDetails.date);
        }
      }
      return bookingDate && bookingDate.toDateString() === date.toDateString();
    });
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get month name
  const getMonthName = () => {
    return currentDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is in current month
  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  // Get booking type (flight, guide, hotel, or activity)
  const getBookingType = (booking) => {
    if (booking.type) return booking.type;
    // Fallback for old booking structure
    if (booking.flight) return 'flight';
    if (booking.guide) return 'guide';
    if (booking.hotel) return 'hotel';
    if (booking.activity) return 'activity';
    return 'other';
  };

  // Get booking display text
  const getBookingDisplayText = (booking) => {
    if (booking.type === 'flight') {
      return `${booking.title}`;
    }
    if (booking.type === 'guide') {
      return `${booking.title}`;
    }
    if (booking.type === 'hotel') {
      return `${booking.title}`;
    }
    if (booking.type === 'activity') {
      return `${booking.title}`;
    }
    // Fallback for old booking structure
    if (booking.flight) {
      return `${booking.flight.airline} ${booking.flight.flightNumber}`;
    }
    if (booking.guide) {
      return `Guide: ${booking.guide.name}`;
    }
    if (booking.hotel) {
      return `Hotel: ${booking.hotel.name}`;
    }
    if (booking.activity) {
      return `Activity: ${booking.activity.name}`;
    }
    return 'Booking';
  };

  return (
    <div className="travel-calendar-container">
      <h2 className="travel-calendar-title">Travel Calendar</h2>
      <div className="calendar-header">
        <div className="calendar-controls">
          <button onClick={goToPreviousMonth} className="nav-btn">
            ← Previous
          </button>
          <button onClick={goToToday} className="today-btn">
            Today
          </button>
          <button onClick={goToNextMonth} className="nav-btn">
            Next →
          </button>
        </div>
        <div className="view-mode-selector">
          <button 
            className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            Month
          </button>
          <button 
            className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            Week
          </button>
          <button 
            className={`view-btn ${viewMode === 'day' ? 'active' : ''}`}
            onClick={() => setViewMode('day')}
          >
            Day
          </button>
        </div>
      </div>

      <div className="calendar-month-header">
        <h3>{getMonthName()}</h3>
      </div>

      <div className="calendar-grid">
        {/* Day headers */}
        <div className="calendar-day-header">Sun</div>
        <div className="calendar-day-header">Mon</div>
        <div className="calendar-day-header">Tue</div>
        <div className="calendar-day-header">Wed</div>
        <div className="calendar-day-header">Thu</div>
        <div className="calendar-day-header">Fri</div>
        <div className="calendar-day-header">Sat</div>

        {/* Calendar days */}
        {calendarDays.map((day, index) => {
          const dayBookings = getBookingsForDate(day);
          const isSelected = selectedDate && selectedDate.toDateString() === day.toDateString();
          
          return (
            <div
              key={index}
              className={`calendar-day ${!isCurrentMonth(day) ? 'other-month' : ''} ${
                isToday(day) ? 'today' : ''
              } ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="day-number">{day.getDate()}</div>
              <div className="day-bookings">
                {dayBookings.slice(0, 2).map((booking, bookingIndex) => (
                  <div
                    key={bookingIndex}
                    className={`booking-indicator ${getBookingType(booking)}`}
                    title={getBookingDisplayText(booking)}
                  >
                    {getBookingDisplayText(booking)}
                  </div>
                ))}
                {dayBookings.length > 2 && (
                  <div className="more-bookings">
                    +{dayBookings.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected date details */}
      {selectedDate && (
        <div className="selected-date-details">
          <h4>{selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</h4>
          
          {getBookingsForDate(selectedDate).length > 0 ? (
            <div className="day-bookings-list">
              {getBookingsForDate(selectedDate).map((booking, index) => (
                <div key={index} className={`booking-card ${getBookingType(booking)}`}>
                  <div className="booking-header">
                    <span className="booking-type">
                      {getBookingType(booking).toUpperCase()}
                    </span>
                    <span className="booking-status">{booking.status}</span>
                  </div>
                  
                  {booking.flight && (
                    <div className="booking-details">
                      <p><strong>Flight:</strong> {booking.flight.airline} {booking.flight.flightNumber}</p>
                      <p><strong>Route:</strong> {booking.flight.source} → {booking.flight.destination}</p>
                      <p><strong>Time:</strong> {booking.flight.departureTime} - {booking.flight.arrivalTime}</p>
                      <p><strong>Class:</strong> {booking.flight.class}</p>
                      <p><strong>Passengers:</strong> {booking.passengerDetails?.length || 1}</p>
                      <p><strong>Total:</strong> ₹{(booking.flight.price * (booking.passengerDetails?.length || 1)).toLocaleString()}</p>
                    </div>
                  )}
                  
                  {booking.type === 'guide' && (
                    <div className="booking-details">
                      <p><strong>Guide:</strong> {booking.details.guideName}</p>
                      <p><strong>Language:</strong> {booking.details.language}</p>
                      <p><strong>Route:</strong> {booking.details.source} → {booking.details.destination}</p>
                      <p><strong>Cost:</strong> ₹{booking.details.cost.toLocaleString()}</p>
                      <p><strong>Phone:</strong> {booking.details.guidePhone}</p>
                      <p><strong>Duration:</strong> {booking.duration}</p>
                      <p><strong>Time:</strong> {booking.startTime} - {booking.endTime}</p>
                    </div>
                  )}
                  
                  {booking.guide && (
                    <div className="booking-details">
                      <p><strong>Guide:</strong> {booking.guide.name}</p>
                      <p><strong>Language:</strong> {booking.guide.language}</p>
                      <p><strong>Route:</strong> {booking.guide.source} → {booking.guide.destination}</p>
                      <p><strong>Cost:</strong> ₹{booking.guide.cost.toLocaleString()}</p>
                      <p><strong>Phone:</strong> {booking.guide.phone}</p>
                    </div>
                  )}
                  
                  {booking.hotel && (
                    <div className="booking-details">
                      <p><strong>Hotel:</strong> {booking.hotel.name}</p>
                      <p><strong>Location:</strong> {booking.hotel.location}</p>
                      <p><strong>Check-in:</strong> {booking.bookingDetails.checkIn}</p>
                      <p><strong>Check-out:</strong> {booking.bookingDetails.checkOut}</p>
                      <p><strong>Guests:</strong> {booking.bookingDetails.guests}</p>
                      <p><strong>Rooms:</strong> {booking.bookingDetails.rooms}</p>
                      <p><strong>Room Type:</strong> {booking.bookingDetails.roomType}</p>
                      <p><strong>Total:</strong> ₹{booking.bookingDetails.totalPrice.toLocaleString()}</p>
                    </div>
                  )}
                  
                  {booking.activity && (
                    <div className="booking-details">
                      <p><strong>Activity:</strong> {booking.activity.name}</p>
                      <p><strong>Location:</strong> {booking.activity.location}</p>
                      <p><strong>Category:</strong> {booking.activity.category}</p>
                      <p><strong>Date:</strong> {booking.bookingDetails.date}</p>
                      <p><strong>Duration:</strong> {booking.activity.duration}</p>
                      <p><strong>Start Time:</strong> {booking.activity.startTime}</p>
                      <p><strong>Participants:</strong> {booking.bookingDetails.participants}</p>
                      <p><strong>Total:</strong> ₹{booking.bookingDetails.totalPrice.toLocaleString()}</p>
                    </div>
                  )}
                  
                  <div className="booking-footer">
                    <span className="booking-id">ID: {booking.id}</span>
                    <span className="booking-date">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-bookings">No travel plans for this date</p>
          )}
        </div>
      )}

      {/* Travel summary */}
      <div className="travel-summary">
        <h4>Travel Summary</h4>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-number">{bookings.length}</span>
            <span className="stat-label">Total Bookings</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {bookings.filter(b => b.flight).length}
            </span>
            <span className="stat-label">Flights</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {bookings.filter(b => b.type === 'guide' || b.guide).length}
            </span>
            <span className="stat-label">Guides</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {bookings.filter(b => b.hotel).length}
            </span>
            <span className="stat-label">Hotels</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {bookings.filter(b => b.activity).length}
            </span>
            <span className="stat-label">Activities</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {new Set(bookings.map(b => {
                if (b.type === 'flight') return b.date;
                if (b.type === 'hotel') return b.date;
                if (b.type === 'guide') return b.date;
                if (b.type === 'activity') return b.date;
                // Fallback for old structure
                if (b.flight) return b.flight.date;
                if (b.hotel) return b.bookingDetails.checkIn;
                if (b.guide) return b.bookingDate;
                if (b.activity) return b.bookingDetails.date;
                return null;
              }).filter(Boolean)).size}
            </span>
            <span className="stat-label">Travel Days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travel; 