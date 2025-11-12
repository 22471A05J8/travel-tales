import { useState, useEffect } from 'react';

export const useLocationTracking = () => {
  const [isLiveTracking, setIsLiveTracking] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [userMarker, setUserMarker] = useState(null);
  const [locationAccuracy, setLocationAccuracy] = useState(null);
  const [locationSpeed, setLocationSpeed] = useState(null);
  const [locationHeading, setLocationHeading] = useState(null);
  const [locationTimestamp, setLocationTimestamp] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setCurrentLocation(location);
          setUserPosition(location);
          return location;
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Hyderabad if location access denied
          const defaultLocation = { lat: 17.3616, lng: 78.4747 };
          setUserLocation(defaultLocation);
          setCurrentLocation(defaultLocation);
          setUserPosition(defaultLocation);
          return defaultLocation;
        }
      );
    } else {
      console.log('Geolocation not supported');
      const defaultLocation = { lat: 17.3616, lng: 78.4747 };
      setUserLocation(defaultLocation);
      setCurrentLocation(defaultLocation);
      setUserPosition(defaultLocation);
      return defaultLocation;
    }
  };

  // Live location tracking functions
  const startLiveTracking = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setIsLiveTracking(true);
    setLocationError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          speed: position.coords.speed,
          heading: position.coords.heading,
          timestamp: position.timestamp
        };

        setUserLocation(location);
        setCurrentLocation(location);
        setUserPosition(location);
        setLocationAccuracy(position.coords.accuracy);
        setLocationSpeed(position.coords.speed);
        setLocationHeading(position.coords.heading);
        setLocationTimestamp(position.timestamp);

        // Add to location history (keep last 50 points)
        setLocationHistory(prev => {
          const newHistory = [...prev, location];
          return newHistory.slice(-50);
        });

        // Update user marker on map
        updateUserMarker(location);
      },
      (error) => {
        console.error('Live tracking error:', error);
        setLocationError(`Location error: ${error.message}`);
        setIsLiveTracking(false);
      },
      options
    );

    setWatchId(watchId);
  };

  const stopLiveTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsLiveTracking(false);
  };

  const updateUserMarker = (location) => {
    const newUserMarker = {
      id: 'user-location',
      position: location,
      title: 'Your Location',
      color: '#FF0000',
      accuracy: location.accuracy,
      speed: location.speed,
      heading: location.heading,
      timestamp: location.timestamp
    };
    setUserMarker(newUserMarker);
  };

  const getLocationHistory = () => {
    return locationHistory.map((location, index) => ({
      ...location,
      id: `history-${index}`,
      title: `Location ${index + 1}`,
      color: '#00FF00'
    }));
  };

  const clearLocationHistory = () => {
    setLocationHistory([]);
  };

  const getLocationStats = () => {
    if (locationHistory.length < 2) return null;

    const distances = [];
    for (let i = 1; i < locationHistory.length; i++) {
      const prev = locationHistory[i - 1];
      const curr = locationHistory[i];
      const distance = calculateDistance(prev.lat, prev.lng, curr.lat, curr.lng);
      distances.push(distance);
    }

    const totalDistance = distances.reduce((sum, dist) => sum + dist, 0);
    const avgSpeed = locationSpeed ? (locationSpeed * 3.6) : 0; // Convert m/s to km/h

    return {
      totalDistance: totalDistance.toFixed(2),
      avgSpeed: avgSpeed.toFixed(1),
      points: locationHistory.length,
      accuracy: locationAccuracy ? `${locationAccuracy.toFixed(1)}m` : 'Unknown'
    };
  };

  // Initialize current location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    // States
    isLiveTracking,
    locationHistory,
    userMarker,
    locationAccuracy,
    locationSpeed,
    locationHeading,
    locationTimestamp,
    locationError,
    userLocation,
    currentLocation,
    userPosition,
    
    // Functions
    startLiveTracking,
    stopLiveTracking,
    updateUserMarker,
    getLocationHistory,
    clearLocationHistory,
    getLocationStats,
    getCurrentLocation,
    calculateDistance
  };
}; 