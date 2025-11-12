import React, { useState } from "react";
import "./HotelSearchForm.css";

const HotelSearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "Any",
    maxPrice: 50000
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="hotel-search-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Destination</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="">Select Destination</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Dubai">Dubai</option>
              <option value="London">London</option>
              <option value="Singapore">Singapore</option>
              <option value="Bangkok">Bangkok</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="checkIn">Check-in Date</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkOut">Check-out Date</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="guests">Guests</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="roomType">Room Type</label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
            >
              <option value="Any">Any Type</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="maxPrice">Max Price (₹)</label>
            <input
              type="range"
              id="maxPrice"
              name="maxPrice"
              min="5000"
              max="200000"
              step="5000"
              value={formData.maxPrice}
              onChange={handleChange}
            />
            <span className="price-display">₹{formData.maxPrice.toLocaleString()}</span>
          </div>
        </div>

        <button type="submit" className="search-btn">
          Search Hotels
        </button>
      </form>
    </div>
  );
};

export default HotelSearchForm; 