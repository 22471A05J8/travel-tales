import React, { useState } from "react";
import "./Guides.css";

const destinationGuides = [
  // Indian Destinations
  {
    id: 1,
    name: "Mumbai",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    country: "India",
    region: "Maharashtra",
    description: "The City of Dreams, Mumbai is India's financial capital and entertainment hub, offering a perfect blend of colonial heritage and modern urban life.",
    bestTimeToVisit: "October to March",
    weather: "Tropical monsoon climate with hot summers and heavy monsoon rains",
    language: "Marathi, Hindi, English",
    currency: "Indian Rupee (₹)",
    timezone: "IST (UTC+5:30)",
    highlights: [
      "Gateway of India",
      "Marine Drive",
      "Juhu Beach",
      "Elephanta Caves",
      "Bollywood Studios",
      "Colaba Causeway",
      "Worli Sea Face",
      "Bandra-Worli Sea Link"
    ],
    attractions: [
      {
        name: "Gateway of India",
        type: "Monument",
        description: "Historic monument and popular tourist attraction",
        bestTime: "Sunset",
        tips: "Visit during sunset for best photos, avoid weekends for fewer crowds"
      },
      {
        name: "Marine Drive",
        type: "Scenic Drive",
        description: "3.6 km curved boulevard along the coast",
        bestTime: "Evening",
        tips: "Best experienced during sunset or after dark when it's lit up"
      },
      {
        name: "Juhu Beach",
        type: "Beach",
        description: "One of the most famous beaches in Mumbai",
        bestTime: "Early morning or evening",
        tips: "Try local street food, avoid swimming due to pollution"
      }
    ],
    localCuisine: [
      "Vada Pav",
      "Pav Bhaji",
      "Bombay Duck",
      "Seafood",
      "Street Food"
    ],
    transportation: [
      "Local Trains",
      "Metro",
      "Buses",
      "Taxis",
      "Auto-rickshaws"
    ],
    accommodation: [
      "Luxury Hotels in South Mumbai",
      "Budget Hotels in Andheri",
      "Hostels in Colaba",
      "Airbnb options"
    ],
    tips: [
      "Use local trains during off-peak hours",
      "Carry water and stay hydrated",
      "Bargain while shopping at street markets",
      "Be cautious of pickpockets in crowded areas",
      "Try local street food but from clean vendors"
    ],
    emergencyContacts: {
      police: "100",
      ambulance: "102",
      fire: "101",
      touristHelpline: "1363"
    }
  },
  {
    id: 2,
    name: "Delhi",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
    country: "India",
    region: "Delhi",
    description: "India's capital city, Delhi is a fascinating blend of ancient history and modern development, home to numerous UNESCO World Heritage sites.",
    bestTimeToVisit: "October to March",
    weather: "Semi-arid climate with extreme summers and cold winters",
    language: "Hindi, English, Punjabi",
    currency: "Indian Rupee (₹)",
    timezone: "IST (UTC+5:30)",
    highlights: [
      "Red Fort",
      "Qutub Minar",
      "India Gate",
      "Humayun's Tomb",
      "Lotus Temple",
      "Chandni Chowk",
      "Akshardham Temple",
      "Connaught Place"
    ],
    attractions: [
      {
        name: "Red Fort",
        type: "UNESCO World Heritage Site",
        description: "Historic fort complex and former residence of Mughal emperors",
        bestTime: "Morning",
        tips: "Visit early morning to avoid crowds, attend light and sound show in evening"
      },
      {
        name: "Qutub Minar",
        type: "UNESCO World Heritage Site",
        description: "Tallest brick minaret in the world",
        bestTime: "Early morning or late afternoon",
        tips: "Best photos during golden hour, explore the surrounding ruins"
      },
      {
        name: "Chandni Chowk",
        type: "Historic Market",
        description: "One of the oldest and busiest markets in Old Delhi",
        bestTime: "Morning",
        tips: "Try street food, bargain while shopping, be prepared for crowds"
      }
    ],
    localCuisine: [
      "Butter Chicken",
      "Kebabs",
      "Chaat",
      "Parathas",
      "Street Food"
    ],
    transportation: [
      "Metro",
      "Buses",
      "Auto-rickshaws",
      "Taxis",
      "Cycle-rickshaws"
    ],
    accommodation: [
      "Luxury Hotels in New Delhi",
      "Heritage Hotels in Old Delhi",
      "Budget Hotels in Paharganj",
      "Hostels in Hauz Khas"
    ],
    tips: [
      "Use Delhi Metro for efficient travel",
      "Carry identification documents",
      "Be cautious of air pollution",
      "Try local street food from popular vendors",
      "Visit monuments early morning for better experience"
    ],
    emergencyContacts: {
      police: "100",
      ambulance: "102",
      fire: "101",
      touristHelpline: "1363"
    }
  },
  {
    id: 3,
    name: "Bangalore",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
    country: "India",
    region: "Karnataka",
    description: "The Garden City and Silicon Valley of India, Bangalore offers a perfect mix of technology, culture, and pleasant weather throughout the year.",
    bestTimeToVisit: "Year-round (pleasant weather)",
    weather: "Tropical savanna climate with moderate temperatures",
    language: "Kannada, English, Hindi",
    currency: "Indian Rupee (₹)",
    timezone: "IST (UTC+5:30)",
    highlights: [
      "Lalbagh Botanical Garden",
      "Cubbon Park",
      "Vidhana Soudha",
      "Bangalore Palace",
      "ISKCON Temple",
      "Commercial Street",
      "MG Road",
      "Nandi Hills"
    ],
    attractions: [
      {
        name: "Lalbagh Botanical Garden",
        type: "Botanical Garden",
        description: "Famous botanical garden with rare plant species",
        bestTime: "Early morning",
        tips: "Visit during flower shows, carry water, explore the glass house"
      },
      {
        name: "Cubbon Park",
        type: "Public Park",
        description: "Historic park in the heart of the city",
        bestTime: "Morning or evening",
        tips: "Great for walking, cycling, and photography"
      },
      {
        name: "Nandi Hills",
        type: "Hill Station",
        description: "Popular weekend getaway with sunrise views",
        bestTime: "Early morning for sunrise",
        tips: "Start early for sunrise, carry warm clothes, book accommodation in advance"
      }
    ],
    localCuisine: [
      "Masala Dosa",
      "Filter Coffee",
      "Bisi Bele Bath",
      "Mangalorean Seafood",
      "Street Food"
    ],
    transportation: [
      "Metro",
      "Buses",
      "Auto-rickshaws",
      "Taxis",
      "Ride-sharing apps"
    ],
    accommodation: [
      "Luxury Hotels in MG Road",
      "Tech Park Hotels",
      "Budget Hotels in Indiranagar",
      "Hostels in Koramangala"
    ],
    tips: [
      "Enjoy the pleasant weather year-round",
      "Try local filter coffee",
      "Visit tech parks for modern Bangalore experience",
      "Explore local markets for shopping",
      "Use metro for efficient travel"
    ],
    emergencyContacts: {
      police: "100",
      ambulance: "102",
      fire: "101",
      touristHelpline: "1363"
    }
  },
  {
    id: 4,
    name: "Chennai",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
    country: "India",
    region: "Tamil Nadu",
    description: "The Gateway to South India, Chennai is known for its rich cultural heritage, classical music, and beautiful beaches along the Bay of Bengal.",
    bestTimeToVisit: "November to February",
    weather: "Tropical wet and dry climate with hot summers",
    language: "Tamil, English",
    currency: "Indian Rupee (₹)",
    timezone: "IST (UTC+5:30)",
    highlights: [
      "Marina Beach",
      "Fort St. George",
      "Kapaleeshwarar Temple",
      "Vivekananda College",
      "Government Museum",
      "Mylapore",
      "Besant Nagar Beach",
      "Covelong Beach"
    ],
    attractions: [
      {
        name: "Marina Beach",
        type: "Beach",
        description: "Second longest urban beach in the world",
        bestTime: "Early morning or evening",
        tips: "Visit during sunrise, try local snacks, avoid swimming"
      },
      {
        name: "Fort St. George",
        type: "Historic Fort",
        description: "First British fortress in India",
        bestTime: "Morning",
        tips: "Visit the museum, explore the church, learn about colonial history"
      },
      {
        name: "Kapaleeshwarar Temple",
        type: "Temple",
        description: "Ancient Shiva temple in Mylapore",
        bestTime: "Morning or evening",
        tips: "Dress modestly, remove footwear, experience temple rituals"
      }
    ],
    localCuisine: [
      "Idli Sambar",
      "Dosa",
      "Filter Coffee",
      "Seafood",
      "Chettinad Cuisine"
    ],
    transportation: [
      "Metro",
      "Buses",
      "Auto-rickshaws",
      "Taxis",
      "Local Trains"
    ],
    accommodation: [
      "Luxury Hotels in T Nagar",
      "Beach Hotels in Besant Nagar",
      "Budget Hotels in Egmore",
      "Heritage Hotels in Mylapore"
    ],
    tips: [
      "Experience classical music and dance",
      "Try authentic South Indian cuisine",
      "Visit temples early morning",
      "Explore local markets",
      "Enjoy beach activities"
    ],
    emergencyContacts: {
      police: "100",
      ambulance: "102",
      fire: "101",
      touristHelpline: "1363"
    }
  },

  // International Destinations
  {
    id: 5,
    name: "Dubai",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
    country: "UAE",
    region: "Dubai",
    description: "A futuristic city in the desert, Dubai is known for its stunning architecture, luxury shopping, and unique blend of traditional and modern culture.",
    bestTimeToVisit: "November to March",
    weather: "Desert climate with extremely hot summers",
    language: "Arabic, English",
    currency: "UAE Dirham (AED)",
    timezone: "GST (UTC+4)",
    highlights: [
      "Burj Khalifa",
      "Palm Jumeirah",
      "Dubai Mall",
      "Burj Al Arab",
      "Dubai Frame",
      "Dubai Creek",
      "Desert Safari",
      "Dubai Marina"
    ],
    attractions: [
      {
        name: "Burj Khalifa",
        type: "Skyscraper",
        description: "World's tallest building with observation deck",
        bestTime: "Sunset",
        tips: "Book tickets in advance, visit during sunset for best views"
      },
      {
        name: "Palm Jumeirah",
        type: "Artificial Island",
        description: "Iconic palm-shaped island with luxury resorts",
        bestTime: "Evening",
        tips: "Visit Atlantis Hotel, enjoy beach activities, take helicopter tour"
      },
      {
        name: "Dubai Mall",
        type: "Shopping Mall",
        description: "World's largest shopping mall by total area",
        bestTime: "Afternoon",
        tips: "Visit Dubai Aquarium, watch fountain show, shop for luxury items"
      }
    ],
    localCuisine: [
      "Shawarma",
      "Falafel",
      "Hummus",
      "Arabic Coffee",
      "Dates"
    ],
    transportation: [
      "Metro",
      "Taxis",
      "Buses",
      "Tram",
      "Water Taxis"
    ],
    accommodation: [
      "Luxury Hotels in Downtown",
      "Beach Resorts in Palm Jumeirah",
      "Budget Hotels in Deira",
      "Desert Resorts"
    ],
    tips: [
      "Respect local customs and dress modestly",
      "Use Dubai Metro for efficient travel",
      "Visit during cooler months",
      "Try local Arabic cuisine",
      "Experience desert activities"
    ],
    emergencyContacts: {
      police: "999",
      ambulance: "998",
      fire: "997",
      touristHelpline: "800-TOURISM"
    }
  },
  {
    id: 6,
    name: "London",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    country: "United Kingdom",
    region: "England",
    description: "The historic capital of England, London is a world-class city offering rich history, diverse culture, and iconic landmarks that span centuries.",
    bestTimeToVisit: "March to May, September to November",
    weather: "Temperate maritime climate with mild temperatures",
    language: "English",
    currency: "British Pound (£)",
    timezone: "GMT/BST (UTC+0/+1)",
    highlights: [
      "Big Ben",
      "Buckingham Palace",
      "Tower of London",
      "London Eye",
      "Tower Bridge",
      "Westminster Abbey",
      "British Museum",
      "Hyde Park"
    ],
    attractions: [
      {
        name: "Big Ben",
        type: "Clock Tower",
        description: "Iconic clock tower at Westminster Palace",
        bestTime: "Day and night",
        tips: "Best photos from Westminster Bridge, visit during sunset"
      },
      {
        name: "Buckingham Palace",
        type: "Royal Palace",
        description: "Official residence of the British monarch",
        bestTime: "Morning for changing of the guard",
        tips: "Watch changing of the guard at 11 AM, book palace tours in advance"
      },
      {
        name: "Tower of London",
        type: "Historic Castle",
        description: "Historic castle and fortress",
        bestTime: "Morning",
        tips: "See the Crown Jewels early, take guided tour, visit the ravens"
      }
    ],
    localCuisine: [
      "Fish and Chips",
      "Sunday Roast",
      "Afternoon Tea",
      "Full English Breakfast",
      "Pie and Mash"
    ],
    transportation: [
      "Underground (Tube)",
      "Buses",
      "Taxis",
      "Trains",
      "River Boats"
    ],
    accommodation: [
      "Luxury Hotels in Mayfair",
      "Boutique Hotels in Soho",
      "Budget Hotels in Earl's Court",
      "Hostels in Camden"
    ],
    tips: [
      "Get an Oyster card for public transport",
      "Book attractions in advance",
      "Visit museums (many are free)",
      "Try traditional British food",
      "Use the Tube for efficient travel"
    ],
    emergencyContacts: {
      police: "999",
      ambulance: "999",
      fire: "999",
      touristHelpline: "020-7930-3484"
    }
  },
  {
    id: 7,
    name: "Singapore",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    country: "Singapore",
    region: "Singapore",
    description: "A modern city-state known for its cleanliness, efficiency, and unique blend of cultures, Singapore offers world-class attractions and experiences.",
    bestTimeToVisit: "February to April, July to September",
    weather: "Tropical rainforest climate with high humidity",
    language: "English, Malay, Mandarin, Tamil",
    currency: "Singapore Dollar (SGD)",
    timezone: "SGT (UTC+8)",
    highlights: [
      "Marina Bay Sands",
      "Gardens by the Bay",
      "Sentosa Island",
      "Singapore Zoo",
      "Chinatown",
      "Little India",
      "Orchard Road",
      "Clarke Quay"
    ],
    attractions: [
      {
        name: "Marina Bay Sands",
        type: "Hotel and Casino",
        description: "Iconic hotel with infinity pool and sky park",
        bestTime: "Evening",
        tips: "Visit SkyPark for city views, watch light and water show"
      },
      {
        name: "Gardens by the Bay",
        type: "Botanical Garden",
        description: "Nature park with giant supertrees",
        bestTime: "Evening",
        tips: "Visit Cloud Forest, see light show, explore Flower Dome"
      },
      {
        name: "Sentosa Island",
        type: "Resort Island",
        description: "Entertainment and resort island",
        bestTime: "Full day",
        tips: "Visit Universal Studios, beaches, and attractions"
      }
    ],
    localCuisine: [
      "Chicken Rice",
      "Laksa",
      "Chili Crab",
      "Satay",
      "Kaya Toast"
    ],
    transportation: [
      "MRT (Metro)",
      "Buses",
      "Taxis",
      "Grab (Ride-sharing)",
      "Ferries"
    ],
    accommodation: [
      "Luxury Hotels in Marina Bay",
      "Boutique Hotels in Chinatown",
      "Budget Hotels in Little India",
      "Resorts in Sentosa"
    ],
    tips: [
      "Use EZ-Link card for public transport",
      "Respect local laws and customs",
      "Try local hawker center food",
      "Visit during festivals",
      "Use MRT for efficient travel"
    ],
    emergencyContacts: {
      police: "999",
      ambulance: "995",
      fire: "995",
      touristHelpline: "1800-736-2000"
    }
  },
  {
    id: 8,
    name: "Bangkok",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    country: "Thailand",
    region: "Bangkok",
    description: "The vibrant capital of Thailand, Bangkok is a city of contrasts with ancient temples, modern skyscrapers, and bustling street markets.",
    bestTimeToVisit: "November to February",
    weather: "Tropical savanna climate with hot and humid weather",
    language: "Thai, English",
    currency: "Thai Baht (฿)",
    timezone: "ICT (UTC+7)",
    highlights: [
      "Grand Palace",
      "Wat Phra Kaew",
      "Wat Arun",
      "Chatuchak Market",
      "Khao San Road",
      "Siam Paragon",
      "Chinatown",
      "Floating Markets"
    ],
    attractions: [
      {
        name: "Grand Palace",
        type: "Royal Palace",
        description: "Historic palace complex and former royal residence",
        bestTime: "Morning",
        tips: "Dress modestly, visit early to avoid crowds, see Emerald Buddha"
      },
      {
        name: "Wat Phra Kaew",
        type: "Temple",
        description: "Temple of the Emerald Buddha",
        bestTime: "Morning",
        tips: "Dress appropriately, remove shoes, be respectful"
      },
      {
        name: "Chatuchak Market",
        type: "Market",
        description: "World's largest weekend market",
        bestTime: "Weekend morning",
        tips: "Bargain while shopping, try street food, wear comfortable shoes"
      }
    ],
    localCuisine: [
      "Pad Thai",
      "Tom Yum Goong",
      "Green Curry",
      "Mango Sticky Rice",
      "Street Food"
    ],
    transportation: [
      "BTS Skytrain",
      "MRT Subway",
      "Taxis",
      "Tuk-tuks",
      "River Boats"
    ],
    accommodation: [
      "Luxury Hotels in Sukhumvit",
      "Boutique Hotels in Silom",
      "Budget Hotels in Khao San",
      "Hostels in Siam"
    ],
    tips: [
      "Use BTS and MRT for efficient travel",
      "Bargain at markets",
      "Try street food from busy vendors",
      "Respect temple customs",
      "Be cautious of scams"
    ],
    emergencyContacts: {
      police: "191",
      ambulance: "1669",
      fire: "199",
      touristHelpline: "1155"
    }
  }
];

const Guides = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("All");

  const regions = ["All", "India", "UAE", "United Kingdom", "Singapore", "Thailand"];

  const filteredDestinations = destinationGuides.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === "All" || destination.country === filterRegion;
    return matchesSearch && matchesRegion;
  });

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
  };

  const closeDestination = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="guides-container">
      <div className="guides-header">
        <h2>Destination Guides</h2>
        <p>Explore comprehensive travel guides for amazing destinations around the world</p>
      </div>

      <div className="search-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="region-filter">
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
          >
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="destinations-grid">
        {filteredDestinations.map((destination) => (
          <div
            key={destination.id}
            className="destination-card"
            onClick={() => handleDestinationClick(destination)}
          >
            <div className="destination-image">
              <img src={destination.image} alt={destination.name} />
              <div className="destination-overlay">
                <h3>{destination.name}</h3>
                <p>{destination.country}</p>
              </div>
            </div>
            <div className="destination-content">
              <h4>{destination.name}</h4>
              <p className="destination-description">{destination.description}</p>
              <div className="destination-meta">
                <span className="best-time">Best Time: {destination.bestTimeToVisit}</span>
                <span className="currency">Currency: {destination.currency}</span>
              </div>
              <div className="destination-highlights">
                <h5>Highlights:</h5>
                <div className="highlights-list">
                  {destination.highlights.slice(0, 4).map((highlight, index) => (
                    <span key={index} className="highlight-tag">{highlight}</span>
                  ))}
                  {destination.highlights.length > 4 && (
                    <span className="highlight-tag">+{destination.highlights.length - 4} more</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <div className="destination-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedDestination.name}, {selectedDestination.country}</h2>
              <button className="close-btn" onClick={closeDestination}>×</button>
            </div>

            <div className="modal-body">
              <div className="destination-hero">
                <img src={selectedDestination.image} alt={selectedDestination.name} />
                <div className="hero-overlay">
                  <h3>{selectedDestination.name}</h3>
                  <p>{selectedDestination.description}</p>
                </div>
              </div>

              <div className="destination-info-grid">
                <div className="info-section">
                  <h4>Essential Information</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Region:</span>
                      <span className="value">{selectedDestination.region}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Best Time to Visit:</span>
                      <span className="value">{selectedDestination.bestTimeToVisit}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Weather:</span>
                      <span className="value">{selectedDestination.weather}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Language:</span>
                      <span className="value">{selectedDestination.language}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Currency:</span>
                      <span className="value">{selectedDestination.currency}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Timezone:</span>
                      <span className="value">{selectedDestination.timezone}</span>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h4>Top Attractions</h4>
                  <div className="attractions-list">
                    {selectedDestination.attractions.map((attraction, index) => (
                      <div key={index} className="attraction-item">
                        <div className="attraction-header">
                          <h5>{attraction.name}</h5>
                          <span className="attraction-type">{attraction.type}</span>
                        </div>
                        <p>{attraction.description}</p>
                        <div className="attraction-tips">
                          <span className="best-time">Best Time: {attraction.bestTime}</span>
                          <span className="tips">Tips: {attraction.tips}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="info-section">
                  <h4>Local Cuisine</h4>
                  <div className="cuisine-list">
                    {selectedDestination.localCuisine.map((dish, index) => (
                      <span key={index} className="cuisine-tag">{dish}</span>
                    ))}
                  </div>
                </div>

                <div className="info-section">
                  <h4>Transportation</h4>
                  <div className="transport-list">
                    {selectedDestination.transportation.map((transport, index) => (
                      <span key={index} className="transport-tag">{transport}</span>
                    ))}
                  </div>
                </div>

                <div className="info-section">
                  <h4>Accommodation</h4>
                  <div className="accommodation-list">
                    {selectedDestination.accommodation.map((option, index) => (
                      <span key={index} className="accommodation-tag">{option}</span>
                    ))}
                  </div>
                </div>

                <div className="info-section">
                  <h4>Travel Tips</h4>
                  <ul className="tips-list">
                    {selectedDestination.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-section">
                  <h4>Emergency Contacts</h4>
                  <div className="emergency-contacts">
                    <div className="contact-item">
                      <span className="label">Police:</span>
                      <span className="value">{selectedDestination.emergencyContacts.police}</span>
                    </div>
                    <div className="contact-item">
                      <span className="label">Ambulance:</span>
                      <span className="value">{selectedDestination.emergencyContacts.ambulance}</span>
                    </div>
                    <div className="contact-item">
                      <span className="label">Fire:</span>
                      <span className="value">{selectedDestination.emergencyContacts.fire}</span>
                    </div>
                    <div className="contact-item">
                      <span className="label">Tourist Helpline:</span>
                      <span className="value">{selectedDestination.emergencyContacts.touristHelpline}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guides; 