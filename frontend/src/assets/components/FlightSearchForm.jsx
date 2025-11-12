import React, { useState } from "react";
import "./FlightSearchForm.css";

const FlightSearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
    passengers: 1,
    class: "Economy"
  });

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
    "Dubai", "Doha", "London", "Frankfurt", "Singapore", "Bangkok",
    "Toronto", "New York", "Sydney", "Tokyo", "Paris", "Amsterdam"
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

  return (
    <div className="flight-search-container">
      <form onSubmit={handleSubmit} className="flight-search-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="source">From:</label>
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
            >
              <option value="">Select departure city</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="destination">To:</label>
            <select
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            >
              <option value="">Select arrival city</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date of Travel:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="passengers">Passengers:</label>
            <select
              id="passengers"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="class">Class:</label>
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First Class</option>
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="search-btn">
              Search Flights
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightSearchForm; 