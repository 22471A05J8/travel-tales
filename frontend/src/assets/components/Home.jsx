import React from "react";
import "./Home.css";

const Home = ({ onSignIn, onSignUp }) => {
  const features = [
    {
      icon: "✈️",
      title: "Flight Bookings",
      description: "Find and book the best flights to your dream destinations with competitive prices and flexible options."
    },
    {
      icon: "🏨",
      title: "Hotel Reservations",
      description: "Discover luxury hotels, cozy resorts, and budget-friendly accommodations worldwide."
    },
    {
      icon: "👥",
      title: "Tour Guides",
      description: "Connect with experienced local guides who speak your language and know the best spots."
    },
    {
      icon: "🎯",
      title: "Activities & Tours",
      description: "Book exciting activities, cultural tours, and adventure experiences for unforgettable memories."
    },
    {
      icon: "🗺️",
      title: "Destination Guides",
      description: "Get comprehensive travel information, tips, and recommendations for any destination."
    },
    {
      icon: "📅",
      title: "Travel Calendar",
      description: "Organize all your bookings in one place with our intuitive travel planning calendar."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York",
      text: "Amazing platform! I planned my entire Europe trip here. The guides were fantastic and the hotels exceeded expectations.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Rajesh Kumar",
      location: "Mumbai",
      text: "Best travel booking experience ever! The flight prices were unbeatable and the customer service is top-notch.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      name: "Emily Chen",
      location: "Singapore",
      text: "I love how easy it is to plan trips here. The destination guides helped me discover amazing places I never knew existed.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Travelers" },
    { number: "100+", label: "Destinations" },
    { number: "500+", label: "Tour Guides" },
    { number: "1000+", label: "Hotels" }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Your Journey Begins
              <span className="gradient-text"> Here</span>
            </h1>
            <p className="hero-subtitle">
              Discover the world with our comprehensive travel booking platform. 
              From flights to hotels, guides to activities - we've got everything 
              you need for the perfect trip.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={onSignUp}>
                Get Started
              </button>
              <button className="btn-secondary" onClick={onSignIn}>
                Sign In
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <span className="card-icon">✈️</span>
              <span className="card-text">Flight Booked</span>
            </div>
            <div className="floating-card card-2">
              <span className="card-icon">🏨</span>
              <span className="card-text">Hotel Reserved</span>
            </div>
            <div className="floating-card card-3">
              <span className="card-icon">👥</span>
              <span className="card-text">Guide Found</span>
            </div>
            <div className="main-hero-image">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600" 
                alt="Travel destinations"
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Everything You Need for Perfect Travel</h2>
          <p>Comprehensive travel solutions designed to make your journey seamless and memorable</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Plan your perfect trip in just a few simple steps</p>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your account and set your travel preferences</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Search & Book</h3>
            <p>Find flights, hotels, guides, and activities</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Plan & Organize</h3>
            <p>Use our calendar to organize your entire trip</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Enjoy Your Trip</h3>
            <p>Travel with confidence and create amazing memories</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Travelers Say</h2>
          <p>Real experiences from real travelers around the world</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-location">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Adventure?</h2>
          <p>Join thousands of travelers who trust us for their perfect trips</p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={onSignUp}>
              Create Account
            </button>
            <button className="btn-secondary" onClick={onSignIn}>
              Sign In
            </button>
          </div>
      </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Travel Booking System</h3>
            <p>Your trusted partner for unforgettable travel experiences</p>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Flight Bookings</li>
              <li>Hotel Reservations</li>
              <li>Tour Guides</li>
              <li>Activities & Tours</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <span className="social-icon">📘</span>
              <span className="social-icon">📷</span>
              <span className="social-icon">🐦</span>
              <span className="social-icon">💼</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Travel Booking System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;