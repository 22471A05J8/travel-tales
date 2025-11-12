import React, { useState } from "react";
import FlightSearchForm from "./FlightSearchForm";
import FlightList from "./FlightList";

const allFlights = [
  // Domestic Flights - Mumbai to Delhi
  {
    id: 1,
    airline: "Air India",
    flightNumber: "AI-101",
    source: "Mumbai",
    destination: "Delhi",
    departureTime: "06:00",
    arrivalTime: "08:30",
    duration: "2h 30m",
    price: 4500,
    seats: 120,
    class: "Economy",
    stops: 0,
    date: "2025-07-25"
  },
  {
    id: 2,
    airline: "IndiGo",
    flightNumber: "6E-202",
    source: "Mumbai",
    destination: "Delhi",
    departureTime: "09:15",
    arrivalTime: "11:45",
    duration: "2h 30m",
    price: 3800,
    seats: 180,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 3,
    airline: "SpiceJet",
    flightNumber: "SG-303",
    source: "Mumbai",
    destination: "Delhi",
    departureTime: "14:30",
    arrivalTime: "17:00",
    duration: "2h 30m",
    price: 4200,
    seats: 150,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 4,
    airline: "Vistara",
    flightNumber: "UK-404",
    source: "Mumbai",
    destination: "Delhi",
    departureTime: "18:45",
    arrivalTime: "21:15",
    duration: "2h 30m",
    price: 5200,
    seats: 100,
    class: "Business",
    stops: 0,
    date: "2024-01-15"
  },
  // Delhi to Mumbai
  {
    id: 5,
    airline: "Air India",
    flightNumber: "AI-505",
    source: "Delhi",
    destination: "Mumbai",
    departureTime: "07:30",
    arrivalTime: "10:00",
    duration: "2h 30m",
    price: 4800,
    seats: 120,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 6,
    airline: "IndiGo",
    flightNumber: "6E-606",
    source: "Delhi",
    destination: "Mumbai",
    departureTime: "11:00",
    arrivalTime: "13:30",
    duration: "2h 30m",
    price: 4100,
    seats: 180,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  // Delhi to Bangalore
  {
    id: 7,
    airline: "SpiceJet",
    flightNumber: "SG-707",
    source: "Delhi",
    destination: "Bangalore",
    departureTime: "16:20",
    arrivalTime: "19:05",
    duration: "2h 45m",
    price: 4600,
    seats: 150,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 8,
    airline: "Vistara",
    flightNumber: "UK-808",
    source: "Delhi",
    destination: "Bangalore",
    departureTime: "20:15",
    arrivalTime: "23:00",
    duration: "2h 45m",
    price: 5800,
    seats: 100,
    class: "Business",
    stops: 0,
    date: "2024-01-15"
  },
  // Bangalore to Delhi
  {
    id: 9,
    airline: "Air India",
    flightNumber: "AI-909",
    source: "Bangalore",
    destination: "Delhi",
    departureTime: "08:00",
    arrivalTime: "10:45",
    duration: "2h 45m",
    price: 4800,
    seats: 120,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 10,
    airline: "IndiGo",
    flightNumber: "6E-1010",
    source: "Bangalore",
    destination: "Delhi",
    departureTime: "12:30",
    arrivalTime: "15:15",
    duration: "2h 45m",
    price: 4100,
    seats: 180,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  // Bangalore to Chennai
  {
    id: 11,
    airline: "SpiceJet",
    flightNumber: "SG-1111",
    source: "Bangalore",
    destination: "Chennai",
    departureTime: "17:45",
    arrivalTime: "19:00",
    duration: "1h 15m",
    price: 2600,
    seats: 150,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 12,
    airline: "Vistara",
    flightNumber: "UK-1212",
    source: "Bangalore",
    destination: "Chennai",
    departureTime: "21:30",
    arrivalTime: "22:45",
    duration: "1h 15m",
    price: 3200,
    seats: 100,
    class: "Business",
    stops: 0,
    date: "2024-01-15"
  },
  // Chennai to Bangalore
  {
    id: 13,
    airline: "Air India",
    flightNumber: "AI-1313",
    source: "Chennai",
    destination: "Bangalore",
    departureTime: "07:00",
    arrivalTime: "08:15",
    duration: "1h 15m",
    price: 2800,
    seats: 120,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 14,
    airline: "IndiGo",
    flightNumber: "6E-1414",
    source: "Chennai",
    destination: "Bangalore",
    departureTime: "10:30",
    arrivalTime: "11:45",
    duration: "1h 15m",
    price: 2400,
    seats: 180,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  // Mumbai to Bangalore
  {
    id: 15,
    airline: "SpiceJet",
    flightNumber: "SG-1515",
    source: "Mumbai",
    destination: "Bangalore",
    departureTime: "08:30",
    arrivalTime: "10:45",
    duration: "2h 15m",
    price: 3800,
    seats: 150,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 16,
    airline: "Vistara",
    flightNumber: "UK-1616",
    source: "Mumbai",
    destination: "Bangalore",
    departureTime: "14:15",
    arrivalTime: "16:30",
    duration: "2h 15m",
    price: 4500,
    seats: 100,
    class: "Business",
    stops: 0,
    date: "2024-01-15"
  },
  // Bangalore to Mumbai
  {
    id: 17,
    airline: "Air India",
    flightNumber: "AI-1717",
    source: "Bangalore",
    destination: "Mumbai",
    departureTime: "09:00",
    arrivalTime: "11:15",
    duration: "2h 15m",
    price: 4200,
    seats: 120,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 18,
    airline: "IndiGo",
    flightNumber: "6E-1818",
    source: "Bangalore",
    destination: "Mumbai",
    departureTime: "16:45",
    arrivalTime: "19:00",
    duration: "2h 15m",
    price: 3600,
    seats: 180,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  // Mumbai to Chennai
  {
    id: 19,
    airline: "SpiceJet",
    flightNumber: "SG-1919",
    source: "Mumbai",
    destination: "Chennai",
    departureTime: "07:15",
    arrivalTime: "09:30",
    duration: "2h 15m",
    price: 3200,
    seats: 150,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 20,
    airline: "Vistara",
    flightNumber: "UK-2020",
    source: "Mumbai",
    destination: "Chennai",
    departureTime: "13:30",
    arrivalTime: "15:45",
    duration: "2h 15m",
    price: 3800,
    seats: 100,
    class: "Business",
    stops: 0,
    date: "2024-01-15"
  },
  // Chennai to Mumbai
  {
    id: 21,
    airline: "Air India",
    flightNumber: "AI-2121",
    source: "Chennai",
    destination: "Mumbai",
    departureTime: "10:00",
    arrivalTime: "12:15",
    duration: "2h 15m",
    price: 3500,
    seats: 120,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 22,
    airline: "IndiGo",
    flightNumber: "6E-2222",
    source: "Chennai",
    destination: "Mumbai",
    departureTime: "18:00",
    arrivalTime: "20:15",
    duration: "2h 15m",
    price: 3000,
    seats: 180,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  // Delhi to Chennai
  {
    id: 23,
    airline: "SpiceJet",
    flightNumber: "SG-2323",
    source: "Delhi",
    destination: "Chennai",
    departureTime: "06:30",
    arrivalTime: "09:15",
    duration: "2h 45m",
    price: 4200,
    seats: 150,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 24,
    airline: "Vistara",
    flightNumber: "UK-2424",
    source: "Delhi",
    destination: "Chennai",
    departureTime: "15:45",
    arrivalTime: "18:30",
    duration: "2h 45m",
    price: 5200,
    seats: 100,
    class: "Business",
    stops: 0,
    date: "2024-01-15"
  },
  // Chennai to Delhi
  {
    id: 25,
    airline: "Air India",
    flightNumber: "AI-2525",
    source: "Chennai",
    destination: "Delhi",
    departureTime: "08:30",
    arrivalTime: "11:15",
    duration: "2h 45m",
    price: 4500,
    seats: 120,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 26,
    airline: "IndiGo",
    flightNumber: "6E-2626",
    source: "Chennai",
    destination: "Delhi",
    departureTime: "17:00",
    arrivalTime: "19:45",
    duration: "2h 45m",
    price: 3800,
    seats: 180,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  // International Flights
  {
    id: 27,
    airline: "Emirates",
    flightNumber: "EK-2727",
    source: "Mumbai",
    destination: "Dubai",
    departureTime: "02:15",
    arrivalTime: "04:45",
    duration: "2h 30m",
    price: 25000,
    seats: 300,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 28,
    airline: "Qatar Airways",
    flightNumber: "QR-2828",
    source: "Mumbai",
    destination: "Doha",
    departureTime: "03:30",
    arrivalTime: "06:00",
    duration: "2h 30m",
    price: 22000,
    seats: 280,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 29,
    airline: "British Airways",
    flightNumber: "BA-2929",
    source: "Delhi",
    destination: "London",
    departureTime: "01:45",
    arrivalTime: "07:30",
    duration: "9h 45m",
    price: 45000,
    seats: 250,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 30,
    airline: "Lufthansa",
    flightNumber: "LH-3030",
    source: "Delhi",
    destination: "Frankfurt",
    departureTime: "02:30",
    arrivalTime: "08:15",
    duration: "9h 45m",
    price: 42000,
    seats: 240,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 31,
    airline: "Singapore Airlines",
    flightNumber: "SQ-3131",
    source: "Bangalore",
    destination: "Singapore",
    departureTime: "04:00",
    arrivalTime: "10:30",
    duration: "6h 30m",
    price: 28000,
    seats: 260,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 32,
    airline: "Thai Airways",
    flightNumber: "TG-3232",
    source: "Chennai",
    destination: "Bangkok",
    departureTime: "05:15",
    arrivalTime: "11:45",
    duration: "6h 30m",
    price: 26000,
    seats: 220,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 33,
    airline: "Air Canada",
    flightNumber: "AC-3333",
    source: "Mumbai",
    destination: "Toronto",
    departureTime: "00:30",
    arrivalTime: "08:45",
    duration: "16h 15m",
    price: 65000,
    seats: 200,
    class: "Economy",
    stops: 1,
    date: "2024-01-15"
  },
  {
    id: 34,
    airline: "United Airlines",
    flightNumber: "UA-3434",
    source: "Delhi",
    destination: "New York",
    departureTime: "01:00",
    arrivalTime: "09:30",
    duration: "16h 30m",
    price: 68000,
    seats: 180,
    class: "Economy",
    stops: 1,
    date: "2024-01-15"
  },
  // Return International Flights
  {
    id: 35,
    airline: "Emirates",
    flightNumber: "EK-3535",
    source: "Dubai",
    destination: "Mumbai",
    departureTime: "06:00",
    arrivalTime: "08:30",
    duration: "2h 30m",
    price: 25000,
    seats: 300,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 36,
    airline: "Qatar Airways",
    flightNumber: "QR-3636",
    source: "Doha",
    destination: "Mumbai",
    departureTime: "07:30",
    arrivalTime: "10:00",
    duration: "2h 30m",
    price: 22000,
    seats: 280,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 37,
    airline: "British Airways",
    flightNumber: "BA-3737",
    source: "London",
    destination: "Delhi",
    departureTime: "10:00",
    arrivalTime: "15:45",
    duration: "9h 45m",
    price: 45000,
    seats: 250,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 38,
    airline: "Lufthansa",
    flightNumber: "LH-3838",
    source: "Frankfurt",
    destination: "Delhi",
    departureTime: "11:30",
    arrivalTime: "17:15",
    duration: "9h 45m",
    price: 42000,
    seats: 240,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 39,
    airline: "Singapore Airlines",
    flightNumber: "SQ-3939",
    source: "Singapore",
    destination: "Bangalore",
    departureTime: "12:00",
    arrivalTime: "18:30",
    duration: "6h 30m",
    price: 28000,
    seats: 260,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 40,
    airline: "Thai Airways",
    flightNumber: "TG-4040",
    source: "Bangkok",
    destination: "Chennai",
    departureTime: "13:15",
    arrivalTime: "19:45",
    duration: "6h 30m",
    price: 26000,
    seats: 220,
    class: "Economy",
    stops: 0,
    date: "2024-01-15"
  },
  // Business Class Flights
  {
    id: 41,
    airline: "Emirates",
    flightNumber: "EK-4141",
    source: "Mumbai",
    destination: "Dubai",
    departureTime: "04:30",
    arrivalTime: "07:00",
    duration: "2h 30m",
    price: 85000,
    seats: 50,
    class: "Business",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 42,
    airline: "British Airways",
    flightNumber: "BA-4242",
    source: "Delhi",
    destination: "London",
    departureTime: "03:00",
    arrivalTime: "08:45",
    duration: "9h 45m",
    price: 150000,
    seats: 40,
    class: "Business",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 43,
    airline: "Vistara",
    flightNumber: "UK-4343",
    source: "Mumbai",
    destination: "Delhi",
    departureTime: "20:00",
    arrivalTime: "22:30",
    duration: "2h 30m",
    price: 15000,
    seats: 30,
    class: "Business",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 44,
    airline: "Air India",
    flightNumber: "AI-4444",
    source: "Delhi",
    destination: "Bangalore",
    departureTime: "09:30",
    arrivalTime: "12:15",
    duration: "2h 45m",
    price: 18000,
    seats: 25,
    class: "Business",
    stops: 0,
    date: "2024-01-15"
  },
  // First Class Flights
  {
    id: 45,
    airline: "Emirates",
    flightNumber: "EK-4545",
    source: "Mumbai",
    destination: "Dubai",
    departureTime: "06:45",
    arrivalTime: "09:15",
    duration: "2h 30m",
    price: 200000,
    seats: 20,
    class: "First",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 46,
    airline: "British Airways",
    flightNumber: "BA-4646",
    source: "Delhi",
    destination: "London",
    departureTime: "05:15",
    arrivalTime: "11:00",
    duration: "9h 45m",
    price: 350000,
    seats: 15,
    class: "First",
    stops: 0,
    date: "2024-01-15"
  },
  {
    id: 47,
    airline: "Vistara",
    flightNumber: "UK-4747",
    source: "Mumbai",
    destination: "Delhi",
    departureTime: "22:30",
    arrivalTime: "01:00",
    duration: "2h 30m",
    price: 25000,
    seats: 10,
    class: "First",
    stops: 0,
    date: "2024-01-15"
  }
];

const Flights = ({ onBooking }) => {
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [bookings, setBookings] = useState([]);

  const handleSearch = ({ source, destination, date, passengers, class: flightClass }) => {
    const results = allFlights.filter(
      (flight) =>
        flight.source.toLowerCase() === source.toLowerCase() &&
        flight.destination.toLowerCase() === destination.toLowerCase() &&
        flight.class.toLowerCase() === flightClass.toLowerCase() &&
        flight.seats >= parseInt(passengers)
    );
    setFilteredFlights(results);
  };

  const handleBooking = (flight, passengerDetails) => {
    const booking = {
      id: Date.now(),
      flight: flight,
      passengerDetails: passengerDetails,
      bookingDate: new Date().toISOString(),
      status: "Confirmed"
    };
    setBookings([...bookings, booking]);
    
    // Also add to main app bookings
    if (onBooking) {
      onBooking(booking);
    }
    
    // Update available seats
    const updatedFlights = allFlights.map(f => 
      f.id === flight.id 
        ? { ...f, seats: f.seats - passengerDetails.length }
        : f
    );
    
    // Update filtered flights
    setFilteredFlights(prev => 
      prev.map(f => 
        f.id === flight.id 
          ? { ...f, seats: f.seats - passengerDetails.length }
          : f
      )
    );
  };

  return (
    <div style={{ padding: "20px", background: "#ffecd2", minHeight: "100vh" }}>
      <h2 className="flights-title">Flight Booking</h2>
      <FlightSearchForm onSearch={handleSearch} />
      <FlightList 
        flights={filteredFlights} 
        onBooking={handleBooking}
        bookings={bookings}
      />
    </div>
  );
};

export default Flights; 