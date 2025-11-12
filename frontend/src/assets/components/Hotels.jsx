import React, { useState } from "react";
import HotelSearchForm from "./HotelSearchForm";
import HotelList from "./HotelList";

const allHotels = [
  // Mumbai Hotels
  {
    id: 1,
    name: "Taj Mahal Palace",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    location: "Mumbai",
    address: "Apollo Bunder, Colaba",
    rating: 5,
    price: 25000,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Bar"],
    roomTypes: ["Deluxe", "Suite", "Presidential"],
    availableRooms: 15,
    checkIn: "15:00",
    checkOut: "11:00",
    description: "Luxury 5-star hotel with stunning sea views"
  },
  {
    id: 2,
    name: "The Oberoi Mumbai",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
    location: "Mumbai",
    address: "Nariman Point",
    rating: 5,
    price: 22000,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Bar", "Beach Access"],
    roomTypes: ["Deluxe", "Suite", "Ocean View"],
    availableRooms: 12,
    checkIn: "14:00",
    checkOut: "12:00",
    description: "Elegant hotel with panoramic city views"
  },
  {
    id: 3,
    name: "ITC Maratha",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
    location: "Mumbai",
    address: "Sahar, Andheri East",
    rating: 5,
    price: 18000,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Bar", "Airport Shuttle"],
    roomTypes: ["Deluxe", "Suite", "Club"],
    availableRooms: 25,
    checkIn: "15:00",
    checkOut: "11:00",
    description: "Business hotel near airport with luxury amenities"
  },
  {
    id: 4,
    name: "Lemon Tree Premier",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    location: "Mumbai",
    address: "Andheri West",
    rating: 4,
    price: 8000,
    amenities: ["WiFi", "Pool", "Restaurant", "Gym"],
    roomTypes: ["Standard", "Deluxe", "Suite"],
    availableRooms: 30,
    checkIn: "14:00",
    checkOut: "12:00",
    description: "Modern hotel with great value for money"
  },

  // Delhi Hotels
  {
    id: 5,
    name: "The Leela Palace",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    location: "Delhi",
    address: "Chanakyapuri, Diplomatic Enclave",
    rating: 5,
    price: 28000,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Bar", "Butler Service"],
    roomTypes: ["Deluxe", "Suite", "Royal Suite"],
    availableRooms: 10,
    checkIn: "15:00",
    checkOut: "11:00",
    description: "Palatial luxury hotel with royal treatment"
  },
  {
    id: 6,
    name: "The Imperial",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
    location: "Delhi",
    address: "Janpath, Connaught Place",
    rating: 5,
    price: 20000,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Bar", "Heritage Tours"],
    roomTypes: ["Deluxe", "Suite", "Heritage"],
    availableRooms: 18,
    checkIn: "14:00",
    checkOut: "12:00",
    description: "Historic luxury hotel in the heart of Delhi"
  },
  {
    id: 7,
    name: "Holiday Inn Express",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
    location: "Delhi",
    address: "Aerocity, near Airport",
    rating: 4,
    price: 12000,
    amenities: ["WiFi", "Restaurant", "Gym", "Airport Shuttle"],
    roomTypes: ["Standard", "Deluxe"],
    availableRooms: 35,
    checkIn: "15:00",
    checkOut: "11:00",
    description: "Comfortable hotel perfect for business travelers"
  },
  {
    id: 8,
    name: "Hotel Bloomrooms",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    location: "Delhi",
    address: "Dwarka, Sector 12",
    rating: 3,
    price: 6000,
    amenities: ["WiFi", "Restaurant"],
    roomTypes: ["Standard", "Deluxe"],
    availableRooms: 20,
    checkIn: "14:00",
    checkOut: "12:00",
    description: "Budget-friendly hotel with essential amenities"
  },

  // Bangalore Hotels
  {
    id: 9,
    name: "The Oberoi Bengaluru",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
    location: "Bangalore",
    address: "MG Road, Central Business District",
    rating: 5,
    price: 24000,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Bar", "Garden"],
    roomTypes: ["Deluxe", "Suite", "Garden View"],
    availableRooms: 15,
    checkIn: "15:00",
    checkOut: "11:00",
    description: "Luxury hotel with beautiful gardens and city views"
  },
  {
    id: 10,
    name: "Taj West End",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    location: "Bangalore",
    address: "Race Course Road",
    rating: 5,
    price: 22000,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Bar", "Golf Course"],
    roomTypes: ["Deluxe", "Suite", "Heritage"],
    availableRooms: 12,
    checkIn: "14:00",
    checkOut: "12:00",
    description: "Heritage hotel with colonial charm and modern luxury"
  },
  {
    id: 11,
    name: "The Park Bangalore",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
    location: "Bangalore",
    address: "MG Road",
    rating: 4,
    price: 15000,
    amenities: ["WiFi", "Pool", "Restaurant", "Gym", "Bar"],
    roomTypes: ["Standard", "Deluxe", "Suite"],
    availableRooms: 25,
    checkIn: "15:00",
    checkOut: "11:00",
    description: "Contemporary hotel with vibrant atmosphere"
  },
  {
    id: 12,
    name: "Ibis Bangalore City Centre",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    location: "Bangalore",
    address: "MG Road",
    rating: 3,
    price: 7000,
    amenities: ["WiFi", "Restaurant", "Bar"],
    roomTypes: ["Standard", "Deluxe"],
    availableRooms: 40,
    checkIn: "14:00",
    checkOut: "12:00",
    description: "Comfortable budget hotel in city center"
  },

  // Chennai Hotels
  {
    id: 13,
    name: "The Leela Palace Chennai",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    location: "Chennai",
    address: "Adyar, Marina Beach",
    rating: 5,
    price: 26000,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Bar", "Beach Access"],
    roomTypes: ["Deluxe", "Suite", "Ocean View"],
    availableRooms: 10,
    checkIn: "15:00",
    checkOut: "11:00",
    description: "Luxury hotel with stunning beachfront location"
  },
  {
    id: 14,
    name: "Taj Coromandel",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
    location: "Chennai",
    address: "Nungambakkam",
    rating: 5,
    price: 20000,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Bar"],
    roomTypes: ["Deluxe", "Suite", "Club"],
    availableRooms: 18,
    checkIn: "14:00",
    checkOut: "12:00",
    description: "Elegant hotel with traditional South Indian hospitality"
  },
  {
    id: 15,
    name: "Hilton Chennai",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
    location: "Chennai",
    address: "Guindy, near Airport",
    rating: 4,
    price: 14000,
    amenities: ["WiFi", "Pool", "Restaurant", "Gym", "Bar", "Airport Shuttle"],
    roomTypes: ["Standard", "Deluxe", "Suite"],
    availableRooms: 30,
    checkIn: "15:00",
    checkOut: "11:00",
    description: "International hotel chain with reliable service"
  },
  {
    id: 16,
    name: "Hotel Deccan Plaza",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    location: "Chennai",
    address: "Mount Road",
    rating: 3,
    price: 8000,
    amenities: ["WiFi", "Restaurant", "Bar"],
    roomTypes: ["Standard", "Deluxe"],
    availableRooms: 25,
    checkIn: "14:00",
    checkOut: "12:00",
    description: "Comfortable hotel in the heart of Chennai"
  },

  // International Hotels
  {
    id: 17,
    name: "Burj Al Arab",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
    location: "Dubai",
    address: "Jumeirah Beach",
    rating: 5,
    price: 150000,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Bar", "Helipad", "Butler Service"],
    roomTypes: ["Deluxe", "Suite", "Royal Suite"],
    availableRooms: 5,
    checkIn: "15:00",
    checkOut: "12:00",
    description: "Iconic 7-star luxury hotel with unparalleled service"
  },
  {
    id: 18,
    name: "The Ritz London",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    location: "London",
    address: "Piccadilly, Mayfair",
    rating: 5,
    price: 120000,
    amenities: ["WiFi", "Spa", "Restaurant", "Gym", "Bar", "Afternoon Tea", "Butler Service"],
    roomTypes: ["Deluxe", "Suite", "Royal"],
    availableRooms: 8,
    checkIn: "15:00",
    checkOut: "11:00",
    description: "Historic luxury hotel with British elegance"
  },
  {
    id: 19,
    name: "Marina Bay Sands",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    location: "Singapore",
    address: "Marina Bay",
    rating: 5,
    price: 80000,
    amenities: ["WiFi", "Infinity Pool", "Spa", "Restaurant", "Gym", "Bar", "Casino", "Shopping Mall"],
    roomTypes: ["Deluxe", "Suite", "Club"],
    availableRooms: 12,
    checkIn: "15:00",
    checkOut: "11:00",
    description: "Iconic hotel with world's largest rooftop infinity pool"
  },
  {
    id: 20,
    name: "The Peninsula Bangkok",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
    location: "Bangkok",
    address: "Chao Phraya River",
    rating: 5,
    price: 60000,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Bar", "River Views", "Boat Service"],
    roomTypes: ["Deluxe", "Suite", "River View"],
    availableRooms: 15,
    checkIn: "14:00",
    checkOut: "12:00",
    description: "Luxury hotel with stunning river views and traditional Thai hospitality"
  }
];

const Hotels = ({ onBooking }) => {
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [bookings, setBookings] = useState([]);

  const handleSearch = ({ location, checkIn, checkOut, guests, roomType, maxPrice }) => {
    const results = allHotels.filter(
      (hotel) =>
        hotel.location.toLowerCase() === location.toLowerCase() &&
        hotel.availableRooms > 0 &&
        hotel.price <= maxPrice &&
        (roomType === "Any" || hotel.roomTypes.includes(roomType))
    );
    setFilteredHotels(results);
  };

  const handleBooking = (hotel, bookingDetails) => {
    const booking = {
      id: Date.now(),
      hotel: hotel,
      bookingDetails: bookingDetails,
      bookingDate: new Date().toISOString(),
      status: "Confirmed"
    };
    setBookings([...bookings, booking]);
    
    // Also add to main app bookings
    if (onBooking) {
      onBooking(booking);
    }
    
    // Update available rooms
    setFilteredHotels(prev => 
      prev.map(h => 
        h.id === hotel.id 
          ? { ...h, availableRooms: h.availableRooms - bookingDetails.rooms }
          : h
      )
    );
  };

  return (
    <div style={{ padding: "20px", background: "#ffecd2", minHeight: "100vh" }}>
      <h2 className="hotels-title">Hotel Booking</h2>
      <HotelSearchForm onSearch={handleSearch} />
      <HotelList 
        hotels={filteredHotels} 
        onBooking={handleBooking}
        bookings={bookings}
      />
    </div>
  );
};

export default Hotels; 