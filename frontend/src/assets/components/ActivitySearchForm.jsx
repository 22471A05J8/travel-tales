import React, { useState } from "react";
import "./ActivitySearchForm.css";

const ActivitySearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    location: "",
    category: "Any",
    date: "",
    participants: 1,
    maxPrice: 50000
  });

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
    "Dubai", "London", "Singapore", "Bangkok", "New York", "Paris",
    "Tokyo", "Sydney", "Toronto", "Amsterdam", "Rome", "Barcelona"
  ];

  const categories = [
    "Any", "Adventure", "Cultural", "Entertainment", "Food", "Heritage", "Nature", "Educational"
  ];

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

  const handlePriceChange = (e) => {
    setFormData(prev => ({
      ...prev,
      maxPrice: parseInt(e.target.value)
    }));
  };

  // Calculate minimum date (today)
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="activity-search-container">
      <form onSubmit={handleSubmit} className="activity-search-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="">Any location</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Activity Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={getMinDate()}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="participants">Participants:</label>
            <select
              id="participants"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="maxPrice">Max Price (₹):</label>
            <div className="price-slider-container">
              <input
                type="range"
                id="maxPrice"
                name="maxPrice"
                min="500"
                max="100000"
                step="500"
                value={formData.maxPrice}
                onChange={handlePriceChange}
                className="price-slider"
              />
              <span className="price-value">₹{formData.maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <button type="submit" className="search-btn">
              Search Activities
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ActivitySearchForm; 