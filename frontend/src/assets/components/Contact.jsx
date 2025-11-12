import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Contact.css';
// Using a placeholder image since contact.jpg doesn't exist
const contactImage = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=500&fit=crop';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

function RecenterMap({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location && map) {
      map.setView(location, 13);
    }
  }, [location, map]);
  return null;
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [userLocation, setUserLocation] = useState([20.5937, 78.9629]); 
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation([latitude, longitude]);
          setMapLoaded(true);
        },
        (error) => {
          console.log('Geolocation error:', error);

          setMapLoaded(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      console.log('Geolocation not supported');
      setMapLoaded(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setStatus('Message sent!');
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div className="contact-page" style={{ background: '#ffecd2', minHeight: '100vh' }}>
      <h2 className="contact-title">Contact Us</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
        <button type="submit">Send</button>
        {status && <p className="status-message">{status}</p>}
      </form>

      {/* Main container with two divs */}
      <div className="content-container">
        {/* Image div */}
        <div className="image-section">
          <img src={contactImage} alt="Contact illustration" />
        </div>
        
        {/* Content div */}
        <div className="content-section">
          <h2>Discover the World with Xplore Peak</h2>
          <p>
            <strong>Xplore Peak</strong> is your ultimate companion in discovering breathtaking destinations, unique cultures, and hidden gems around the world. Whether you're an adventurer, a backpacker, or a casual traveler, our platform is designed to inspire and guide your every journey.
          </p>
          <p>
            We bring you curated travel experiences, stunning visuals, interactive maps, and up-to-date guides — all in one beautifully crafted website. With intuitive navigation and mobile-first design, <strong>Xplore Peak</strong> makes it effortless to plan, explore, and share your travel dreams.
          </p>
          <p>
            Join our growing community of explorers and let <strong>Xplore Peak</strong> take you to new heights — where every trip becomes a story worth telling.
          </p>
          <h3>For more information visit our website <a href="/about">Xplore Peak</a></h3>
          <h3>Phone Number: +91 9490113158</h3>
          <h3>Email: xplorepeak@gmail.com</h3>
        </div>
      </div>
    </div>
  );
}

export default Contact; 