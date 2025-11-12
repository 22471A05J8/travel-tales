import React, { useState } from "react";
import "./HotelList.css";

const HotelList = ({ hotels, onBooking, bookings }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    rooms: 1,
    roomType: "",
    guestName: "",
    email: "",
    phone: ""
  });

  const handleBookHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowBookingForm(true);
    setBookingDetails(prev => ({
      ...prev,
      roomType: hotel.roomTypes[0] || "Standard"
    }));
  };

  const handleBookingChange = (field, value) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Validate booking details
    const isValid = bookingDetails.guestName && 
                   bookingDetails.email && 
                   bookingDetails.phone &&
                   bookingDetails.checkIn &&
                   bookingDetails.checkOut;

    if (!isValid) {
      alert("Please fill in all required fields");
      return;
    }

    // Calculate number of nights
    const checkIn = new Date(bookingDetails.checkIn);
    const checkOut = new Date(bookingDetails.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    // Calculate total price
    const totalPrice = selectedHotel.price * bookingDetails.rooms * nights;

    const finalBookingDetails = {
      ...bookingDetails,
      nights,
      totalPrice
    };

    onBooking(selectedHotel, finalBookingDetails);
    setShowBookingForm(false);
    setSelectedHotel(null);
    setBookingDetails({
      checkIn: "",
      checkOut: "",
      guests: 1,
      rooms: 1,
      roomType: "",
      guestName: "",
      email: "",
      phone: ""
    });
    alert("Hotel booked successfully!");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (hotels.length === 0) {
    return (
      <div className="no-hotels">
        <h3>No hotels found</h3>
        <p>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="hotel-list-container">
      <h3>Available Hotels ({hotels.length})</h3>
      
      <div className="hotels-grid">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <div className="hotel-image">
              <img src={hotel.image} alt={hotel.name} />
              <div className="hotel-rating">
                <span className="stars">{renderStars(hotel.rating)}</span>
                <span className="rating-text">{hotel.rating}/5</span>
              </div>
            </div>

            <div className="hotel-content">
              <div className="hotel-header">
                <h4>{hotel.name}</h4>
                <div className="hotel-price">
                  <span className="price">{formatPrice(hotel.price)}</span>
                  <span className="per-night">per night</span>
                </div>
              </div>

              <div className="hotel-location">
                <p><strong>📍 {hotel.location}</strong></p>
                <p className="address">{hotel.address}</p>
              </div>

              <div className="hotel-description">
                <p>{hotel.description}</p>
              </div>

              <div className="hotel-amenities">
                <h5>Amenities:</h5>
                <div className="amenities-list">
                  {hotel.amenities.slice(0, 4).map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                  {hotel.amenities.length > 4 && (
                    <span className="amenity-tag">+{hotel.amenities.length - 4} more</span>
                  )}
                </div>
              </div>

              <div className="hotel-details">
                <div className="detail-item">
                  <span className="label">Check-in:</span>
                  <span className="value">{hotel.checkIn}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Check-out:</span>
                  <span className="value">{hotel.checkOut}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Available Rooms:</span>
                  <span className="value">{hotel.availableRooms}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Room Types:</span>
                  <span className="value">{hotel.roomTypes.join(", ")}</span>
                </div>
              </div>

              <button 
                className="book-btn"
                onClick={() => handleBookHotel(hotel)}
                disabled={hotel.availableRooms === 0}
              >
                {hotel.availableRooms === 0 ? "No Rooms Available" : "Book Now"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingForm && selectedHotel && (
        <div className="booking-modal">
          <div className="booking-content">
            <div className="booking-header">
              <h3>Book Hotel - {selectedHotel.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowBookingForm(false)}
              >
                ×
              </button>
            </div>

            <div className="hotel-summary">
              <p><strong>Location:</strong> {selectedHotel.location}</p>
              <p><strong>Address:</strong> {selectedHotel.address}</p>
              <p><strong>Price:</strong> {formatPrice(selectedHotel.price)} per night</p>
              <p><strong>Rating:</strong> {renderStars(selectedHotel.rating)} ({selectedHotel.rating}/5)</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="booking-form">
              <h4>Booking Details</h4>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkIn">Check-in Date:</label>
                  <input
                    type="date"
                    id="checkIn"
                    value={bookingDetails.checkIn}
                    onChange={(e) => handleBookingChange('checkIn', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkOut">Check-out Date:</label>
                  <input
                    type="date"
                    id="checkOut"
                    value={bookingDetails.checkOut}
                    onChange={(e) => handleBookingChange('checkOut', e.target.value)}
                    min={bookingDetails.checkIn || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="guests">Number of Guests:</label>
                  <select
                    id="guests"
                    value={bookingDetails.guests}
                    onChange={(e) => handleBookingChange('guests', parseInt(e.target.value))}
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rooms">Number of Rooms:</label>
                  <select
                    id="rooms"
                    value={bookingDetails.rooms}
                    onChange={(e) => handleBookingChange('rooms', parseInt(e.target.value))}
                    required
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="roomType">Room Type:</label>
                <select
                  id="roomType"
                  value={bookingDetails.roomType}
                  onChange={(e) => handleBookingChange('roomType', e.target.value)}
                  required
                >
                  {selectedHotel.roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="guestName">Guest Name:</label>
                  <input
                    type="text"
                    id="guestName"
                    value={bookingDetails.guestName}
                    onChange={(e) => handleBookingChange('guestName', e.target.value)}
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

              {bookingDetails.checkIn && bookingDetails.checkOut && (
                <div className="price-calculation">
                  <h5>Price Calculation:</h5>
                  <div className="calculation-details">
                    <p>Nights: {Math.ceil((new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) / (1000 * 60 * 60 * 24))}</p>
                    <p>Rooms: {bookingDetails.rooms}</p>
                    <p>Price per night: {formatPrice(selectedHotel.price)}</p>
                    <p className="total-price">
                      <strong>Total: {formatPrice(selectedHotel.price * bookingDetails.rooms * Math.ceil((new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) / (1000 * 60 * 60 * 24)))}</strong>
                    </p>
                  </div>
                </div>
              )}
              
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
          <h3>Your Hotel Bookings</h3>
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <h4>{booking.hotel.name}</h4>
                  <span className="booking-status">{booking.status}</span>
                </div>
                <div className="booking-details">
                  <p><strong>Location:</strong> {booking.hotel.location}</p>
                  <p><strong>Check-in:</strong> {booking.bookingDetails.checkIn}</p>
                  <p><strong>Check-out:</strong> {booking.bookingDetails.checkOut}</p>
                  <p><strong>Guests:</strong> {booking.bookingDetails.guests}</p>
                  <p><strong>Rooms:</strong> {booking.bookingDetails.rooms}</p>
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

export default HotelList; 