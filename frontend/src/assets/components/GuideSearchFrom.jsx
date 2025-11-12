import React, { useState } from "react";
import './GuideSearchForm.css'; // Make sure to include CSS

const GuideSearchForm = ({ onSearch }) => {
  const [form, setForm] = useState({
    language: "",
    ageFrom: "",
    cost: 2000,
    source: "",
    destination: "",
  });

  const wonders = [
    "Taj Mahal",
    "Great Wall of China",
    "Petra",
    "Chichen Itza",
    "Christ the Redeemer",
    "Machu Picchu",
    "Colosseum",
  ];

  const costs = [1000, 2000, 3000, 4000, 5000];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "cost" || name === "ageFrom" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchData = {
      ...form,
      minAge: form.ageFrom,
      maxAge: form.ageFrom + 10,
    };

    delete searchData.ageFrom;

    onSearch(searchData);
  };

  return (
    <form onSubmit={handleSubmit} className="guide-form">
      <label>Language:</label>
      <select name="language" onChange={handleChange} required>
        <option value="">Select</option>
        <option value="Telugu">Telugu</option>
        <option value="Hindi">Hindi</option>
        <option value="English">English</option>
      </select>

      

      <label>Max Cost:</label>
      <select name="cost" onChange={handleChange} value={form.cost} required>
        <option value="">Select Max Cost</option>
        {costs.map((cost) => (
          <option key={cost} value={cost}>{cost}</option>
        ))}
      </select>

      <label>Source:</label>
      <select name="source" onChange={handleChange} required>
        <option value="">Select Source</option>
        {wonders.map((place) => (
          <option key={place} value={place}>{place}</option>
        ))}
      </select>

      <label>Destination:</label>
      <select name="destination" onChange={handleChange} required>
        <option value="">Select Destination</option>
        {wonders.map((place) => (
          <option key={place} value={place}>{place}</option>
        ))}
      </select>

      <button type="submit">Search Guide</button>
    </form>
  );
};

export default GuideSearchForm;
