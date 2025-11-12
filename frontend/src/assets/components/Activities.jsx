import React, { useState } from "react";
import ActivitySearchForm from "./ActivitySearchForm";
import ActivityList from "./ActivityList";

const allActivities = [
  // Mumbai Activities
  {
    id: 1,
    name: "Gateway of India Heritage Walk",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    location: "Mumbai",
    category: "Heritage",
    duration: "3 hours",
    price: 2500,
    maxParticipants: 15,
    minAge: 8,
    difficulty: "Easy",
    description: "Explore the historic Gateway of India and surrounding colonial architecture with expert guides",
    highlights: ["Historical monuments", "Photo opportunities", "Local stories", "Refreshments included"],
    included: ["Professional guide", "Refreshments", "Photography tips", "Historical booklet"],
    meetingPoint: "Gateway of India, Apollo Bunder",
    startTime: "09:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    id: 2,
    name: "Dharavi Slum Tour",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    location: "Mumbai",
    category: "Cultural",
    duration: "4 hours",
    price: 3000,
    maxParticipants: 10,
    minAge: 12,
    difficulty: "Moderate",
    description: "Educational tour of Asia's largest slum, showcasing local businesses and community spirit",
    highlights: ["Local businesses", "Community interaction", "Educational experience", "Social impact"],
    included: ["Local guide", "Community donation", "Refreshments", "Safety briefing"],
    meetingPoint: "Dharavi Metro Station",
    startTime: "10:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  {
    id: 3,
    name: "Bollywood Studio Tour",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
    location: "Mumbai",
    category: "Entertainment",
    duration: "5 hours",
    price: 4500,
    maxParticipants: 20,
    minAge: 10,
    difficulty: "Easy",
    description: "Behind-the-scenes tour of famous Bollywood studios and film sets",
    highlights: ["Studio visit", "Costume display", "Makeup demo", "Film history"],
    included: ["Studio access", "Professional guide", "Lunch", "Souvenir"],
    meetingPoint: "Film City, Goregaon",
    startTime: "11:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  {
    id: 4,
    name: "Marine Drive Sunset Cruise",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
    location: "Mumbai",
    category: "Adventure",
    duration: "2 hours",
    price: 3500,
    maxParticipants: 25,
    minAge: 5,
    difficulty: "Easy",
    description: "Scenic boat ride along Mumbai's iconic Marine Drive during sunset",
    highlights: ["Sunset views", "City skyline", "Photography", "Refreshments"],
    included: ["Boat ride", "Refreshments", "Life jackets", "Photography guide"],
    meetingPoint: "Gateway of India Jetty",
    startTime: "17:30",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },

  // Delhi Activities
  {
    id: 5,
    name: "Old Delhi Food Walk",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
    location: "Delhi",
    category: "Food",
    duration: "4 hours",
    price: 2800,
    maxParticipants: 12,
    minAge: 8,
    difficulty: "Easy",
    description: "Culinary journey through Old Delhi's famous food streets and markets",
    highlights: ["Street food", "Historical markets", "Local cuisine", "Food stories"],
    included: ["Food samples", "Local guide", "Water", "Food safety tips"],
    meetingPoint: "Chandni Chowk Metro Station",
    startTime: "10:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  {
    id: 6,
    name: "Qutub Minar Heritage Tour",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    location: "Delhi",
    category: "Heritage",
    duration: "3 hours",
    price: 2200,
    maxParticipants: 18,
    minAge: 6,
    difficulty: "Easy",
    description: "Explore the UNESCO World Heritage site and surrounding historical monuments",
    highlights: ["UNESCO site", "Historical architecture", "Photo opportunities", "Expert guide"],
    included: ["Entry tickets", "Professional guide", "Photography tips", "Historical booklet"],
    meetingPoint: "Qutub Minar Metro Station",
    startTime: "09:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    id: 7,
    name: "Delhi Cycling Tour",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    location: "Delhi",
    category: "Adventure",
    duration: "5 hours",
    price: 3200,
    maxParticipants: 15,
    minAge: 14,
    difficulty: "Moderate",
    description: "Eco-friendly cycling tour through Delhi's green spaces and historical sites",
    highlights: ["Cycling routes", "Green spaces", "Historical sites", "Eco-friendly"],
    included: ["Bicycle rental", "Safety gear", "Guide", "Refreshments"],
    meetingPoint: "Lodhi Garden",
    startTime: "07:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    id: 8,
    name: "Hauz Khas Village Art Walk",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    location: "Delhi",
    category: "Cultural",
    duration: "3 hours",
    price: 1800,
    maxParticipants: 20,
    minAge: 10,
    difficulty: "Easy",
    description: "Explore Delhi's artistic hub with galleries, cafes, and street art",
    highlights: ["Art galleries", "Street art", "Cafes", "Creative spaces"],
    included: ["Gallery access", "Local guide", "Coffee break", "Art booklet"],
    meetingPoint: "Hauz Khas Metro Station",
    startTime: "15:00",
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },

  // Bangalore Activities
  {
    id: 9,
    name: "Lalbagh Botanical Garden Tour",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
    location: "Bangalore",
    category: "Nature",
    duration: "3 hours",
    price: 1500,
    maxParticipants: 25,
    minAge: 5,
    difficulty: "Easy",
    description: "Explore Bangalore's famous botanical garden with rare plant species",
    highlights: ["Rare plants", "Glass house", "Bird watching", "Nature photography"],
    included: ["Entry tickets", "Botanical guide", "Bird guide", "Refreshments"],
    meetingPoint: "Lalbagh Main Gate",
    startTime: "08:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    id: 10,
    name: "Bangalore Pub Crawl",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
    location: "Bangalore",
    category: "Entertainment",
    duration: "4 hours",
    price: 4000,
    maxParticipants: 15,
    minAge: 21,
    difficulty: "Easy",
    description: "Experience Bangalore's vibrant nightlife and craft beer scene",
    highlights: ["Craft beers", "Live music", "Pub hopping", "Local culture"],
    included: ["Drink samples", "Local guide", "Transport", "Safety briefing"],
    meetingPoint: "MG Road Metro Station",
    startTime: "19:00",
    availableDays: ["Friday", "Saturday"]
  },
  {
    id: 11,
    name: "Nandi Hills Sunrise Trek",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
    location: "Bangalore",
    category: "Adventure",
    duration: "6 hours",
    price: 2800,
    maxParticipants: 20,
    minAge: 12,
    difficulty: "Moderate",
    description: "Early morning trek to Nandi Hills for spectacular sunrise views",
    highlights: ["Sunrise views", "Trekking", "Photography", "Breakfast"],
    included: ["Transport", "Trek guide", "Breakfast", "Safety equipment"],
    meetingPoint: "Kempegowda Bus Station",
    startTime: "04:00",
    availableDays: ["Saturday", "Sunday"]
  },
  {
    id: 12,
    name: "Bangalore Tech Park Tour",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    location: "Bangalore",
    category: "Educational",
    duration: "4 hours",
    price: 3500,
    maxParticipants: 12,
    minAge: 16,
    difficulty: "Easy",
    description: "Visit major tech parks and learn about India's Silicon Valley",
    highlights: ["Tech companies", "Innovation centers", "Startup culture", "Tech history"],
    included: ["Company visits", "Tech guide", "Lunch", "Innovation booklet"],
    meetingPoint: "Electronic City Metro Station",
    startTime: "10:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },

  // Chennai Activities
  {
    id: 13,
    name: "Marina Beach Sunrise Walk",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    location: "Chennai",
    category: "Nature",
    duration: "2 hours",
    price: 1200,
    maxParticipants: 30,
    minAge: 5,
    difficulty: "Easy",
    description: "Peaceful morning walk along Asia's second-longest beach",
    highlights: ["Sunrise", "Beach walk", "Fresh air", "Photography"],
    included: ["Local guide", "Coffee", "Photography tips", "Safety briefing"],
    meetingPoint: "Marina Beach Lighthouse",
    startTime: "06:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    id: 14,
    name: "Tamil Nadu Cooking Class",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    location: "Chennai",
    category: "Food",
    duration: "4 hours",
    price: 3200,
    maxParticipants: 8,
    minAge: 12,
    difficulty: "Easy",
    description: "Learn to cook authentic Tamil Nadu dishes from local chefs",
    highlights: ["Cooking lessons", "Local recipes", "Cultural experience", "Meal included"],
    included: ["Cooking ingredients", "Chef instructor", "Recipe book", "Lunch"],
    meetingPoint: "Mylapore Cultural Center",
    startTime: "10:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  {
    id: 15,
    name: "Fort St. George Historical Tour",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
    location: "Chennai",
    category: "Heritage",
    duration: "3 hours",
    price: 2000,
    maxParticipants: 20,
    minAge: 8,
    difficulty: "Easy",
    description: "Explore the first British fortress in India and its museum",
    highlights: ["Historical fort", "Museum visit", "Colonial history", "Photo opportunities"],
    included: ["Entry tickets", "Historical guide", "Museum tour", "Historical booklet"],
    meetingPoint: "Fort St. George Main Gate",
    startTime: "09:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  {
    id: 16,
    name: "Chennai Classical Music Experience",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
    location: "Chennai",
    category: "Cultural",
    duration: "3 hours",
    price: 2500,
    maxParticipants: 15,
    minAge: 10,
    difficulty: "Easy",
    description: "Experience traditional Carnatic music and cultural performances",
    highlights: ["Carnatic music", "Cultural performance", "Music history", "Interactive session"],
    included: ["Performance tickets", "Music guide", "Refreshments", "Music booklet"],
    meetingPoint: "Music Academy",
    startTime: "18:00",
    availableDays: ["Friday", "Saturday", "Sunday"]
  },

  // International Activities
  {
    id: 17,
    name: "Dubai Desert Safari",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
    location: "Dubai",
    category: "Adventure",
    duration: "6 hours",
    price: 25000,
    maxParticipants: 20,
    minAge: 8,
    difficulty: "Moderate",
    description: "Thrilling desert adventure with dune bashing, camel rides, and traditional entertainment",
    highlights: ["Dune bashing", "Camel rides", "Sunset views", "Traditional dinner"],
    included: ["4x4 transport", "Professional driver", "Dinner", "Entertainment"],
    meetingPoint: "Dubai Mall",
    startTime: "15:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    id: 18,
    name: "London Walking Tour",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    location: "London",
    category: "Heritage",
    duration: "3 hours",
    price: 35000,
    maxParticipants: 15,
    minAge: 8,
    difficulty: "Easy",
    description: "Explore London's iconic landmarks and hidden gems with expert guides",
    highlights: ["Big Ben", "Buckingham Palace", "Tower Bridge", "Historical stories"],
    included: ["Professional guide", "Historical insights", "Photo stops", "Refreshments"],
    meetingPoint: "Westminster Station",
    startTime: "10:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    id: 19,
    name: "Singapore Gardens by the Bay",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    location: "Singapore",
    category: "Nature",
    duration: "4 hours",
    price: 28000,
    maxParticipants: 25,
    minAge: 5,
    difficulty: "Easy",
    description: "Explore the stunning Gardens by the Bay with its iconic Supertrees and conservatories",
    highlights: ["Supertree Grove", "Cloud Forest", "Flower Dome", "Light show"],
    included: ["Entry tickets", "Garden guide", "Light show", "Refreshments"],
    meetingPoint: "Bayfront MRT Station",
    startTime: "14:00",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    id: 20,
    name: "Bangkok Street Food Tour",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    location: "Bangkok",
    category: "Food",
    duration: "4 hours",
    price: 22000,
    maxParticipants: 12,
    minAge: 10,
    difficulty: "Easy",
    description: "Culinary adventure through Bangkok's famous street food markets",
    highlights: ["Street food", "Local markets", "Thai cuisine", "Food culture"],
    included: ["Food samples", "Local guide", "Water", "Food safety tips"],
    meetingPoint: "Chatuchak Weekend Market",
    startTime: "16:00",
    availableDays: ["Friday", "Saturday", "Sunday"]
  }
];

const Activities = ({ onBooking }) => {
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [bookings, setBookings] = useState([]);

  const handleSearch = ({ location, category, date, participants, maxPrice }) => {
    const results = allActivities.filter(
      (activity) =>
        (location === "" || activity.location.toLowerCase() === location.toLowerCase()) &&
        (category === "Any" || activity.category === category) &&
        activity.price <= maxPrice &&
        activity.maxParticipants >= participants &&
        activity.availableDays.includes(new Date(date).toLocaleDateString('en-US', { weekday: 'long' }))
    );
    setFilteredActivities(results);
  };

  const handleBooking = (activity, bookingDetails) => {
    const booking = {
      id: Date.now(),
      activity: activity,
      bookingDetails: bookingDetails,
      bookingDate: new Date().toISOString(),
      status: "Confirmed"
    };
    setBookings([...bookings, booking]);
    
    // Also add to main app bookings
    if (onBooking) {
      onBooking(booking);
    }
  };

  return (
    <div style={{ padding: "20px", background: "#ffecd2", minHeight: "100vh" }}>
      <h2 className="activities-title">Activity Bookings</h2>
      <ActivitySearchForm onSearch={handleSearch} />
      <ActivityList 
        activities={filteredActivities} 
        onBooking={handleBooking}
        bookings={bookings}
      />
    </div>
  );
};

export default Activities; 