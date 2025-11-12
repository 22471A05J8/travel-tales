import React, { useState } from "react";
import "./FlightList.css";

const FlightList = ({ flights, onBooking, bookings }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState([]);

  const handleBookFlight = (flight) => {
    setSelectedFlight(flight);
    setShowBookingForm(true);
    // Initialize passenger details array
    const details = Array(parseInt(flight.passengers || 1)).fill().map(() => ({
      name: "",
      age: "",
      passport: "",
      email: ""
    }));
    setPassengerDetails(details);
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index][field] = value;
    setPassengerDetails(updatedDetails);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Validate passenger details
    const isValid = passengerDetails.every(passenger => 
      passenger.name && passenger.age && passenger.passport && passenger.email
    );

    if (!isValid) {
      alert("Please fill in all passenger details");
      return;
    }

    onBooking(selectedFlight, passengerDetails);
    setShowBookingForm(false);
    setSelectedFlight(null);
    setPassengerDetails([]);
    alert("Flight booked successfully!");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  if (flights.length === 0) {
    return (
      <div className="no-flights">
        <h3>No flights found</h3>
        <p>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="flight-list-container">
      <h3>Available Flights ({flights.length})</h3>
      
      <div className="flights-grid">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-card">
            <div className="flight-header">
              <div className="airline-info">
                <h4>{flight.airline}</h4>
                <span className="flight-number">{flight.flightNumber}</span>
              </div>
              <div className="price-info">
                <span className="price">{formatPrice(flight.price)}</span>
                <span className="per-person">per person</span>
              </div>
            </div>

            <div className="flight-route">
              <div className="route-details">
                <div className="departure">
                  <span className="time">{flight.departureTime}</span>
                  <span className="city">{flight.source}</span>
                </div>
                <div className="flight-duration">
                  <div className="duration-line">
                    <span className="duration">{flight.duration}</span>
                  </div>
                  <span className="stops">
                    {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                  </span>
                </div>
                <div className="arrival">
                  <span className="time">{flight.arrivalTime}</span>
                  <span className="city">{flight.destination}</span>
                </div>
              </div>
            </div>

            <div className="flight-details">
              <div className="detail-item">
                <span className="label">Class:</span>
                <span className="value">{flight.class}</span>
              </div>
              <div className="detail-item">
                <span className="label">Available Seats:</span>
                <span className="value">{flight.seats}</span>
              </div>
              <div className="detail-item">
                <span className="label">Date:</span>
                <span className="value">{new Date(flight.date).toLocaleDateString()}</span>
              </div>
            </div>

            <button 
              className="book-btn"
              onClick={() => handleBookFlight(flight)}
              disabled={flight.seats === 0}
            >
              {flight.seats === 0 ? "No Seats Available" : "Book Now"}
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingForm && selectedFlight && (
        <div className="booking-modal">
          <div className="booking-content">
            <div className="booking-header">
              <h3>Book Flight - {selectedFlight.airline} {selectedFlight.flightNumber}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowBookingForm(false)}
              >
                ×
              </button>
            </div>

            <div className="flight-summary">
              <p><strong>Route:</strong> {selectedFlight.source} → {selectedFlight.destination}</p>
              <p><strong>Date:</strong> {new Date(selectedFlight.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selectedFlight.departureTime} - {selectedFlight.arrivalTime}</p>
              <p><strong>Total Price:</strong> {formatPrice(selectedFlight.price * passengerDetails.length)}</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="passenger-form">
              <h4>Passenger Details</h4>
              {passengerDetails.map((passenger, index) => (
                <div key={index} className="passenger-details">
                  <h5>Passenger {index + 1}</h5>
                  <div className="passenger-inputs">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={passenger.name}
                      onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      value={passenger.age}
                      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      min="1"
                      max="120"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Passport Number"
                      value={passenger.passport}
                      onChange={(e) => handlePassengerChange(index, 'passport', e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={passenger.email}
                      onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                      required
                    />
                  </div>
                </div>
              ))}
              
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
          <h3>Your Bookings</h3>
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <h4>{booking.flight.airline} {booking.flight.flightNumber}</h4>
                  <span className="booking-status">{booking.status}</span>
                </div>
                <div className="booking-details">
                  <p><strong>Route:</strong> {booking.flight.source} → {booking.flight.destination}</p>
                  <p><strong>Date:</strong> {new Date(booking.flight.date).toLocaleDateString()}</p>
                  <p><strong>Passengers:</strong> {booking.passengerDetails.length}</p>
                  <p><strong>Total:</strong> {formatPrice(booking.flight.price * booking.passengerDetails.length)}</p>
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

export default FlightList; 