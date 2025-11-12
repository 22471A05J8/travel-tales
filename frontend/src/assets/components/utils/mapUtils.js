// Map utility functions
export const getMockNearbyPlaces = () => {
  return [
    {
      place_id: '1',
      name: 'Charminar',
      rating: 4.5,
      vicinity: 'Hyderabad, Telangana',
      geometry: { location: { lat: 17.3616, lng: 78.4747 } },
      formatted_address: 'Charminar, Hyderabad, Telangana 500002',
      price_level: 1,
      types: ['tourist_attraction', 'point_of_interest']
    },
    {
      place_id: '2',
      name: 'Golconda Fort',
      rating: 4.4,
      vicinity: 'Hyderabad, Telangana',
      geometry: { location: { lat: 17.3833, lng: 78.4011 } },
      formatted_address: 'Golconda Fort, Hyderabad, Telangana',
      price_level: 2,
      types: ['tourist_attraction', 'point_of_interest']
    },
    {
      place_id: '3',
      name: 'HITEC City',
      rating: 4.2,
      vicinity: 'Hyderabad, Telangana',
      geometry: { location: { lat: 17.4474, lng: 78.3762 } },
      formatted_address: 'HITEC City, Madhapur, Hyderabad, Telangana',
      price_level: 3,
      types: ['establishment', 'point_of_interest']
    },
    {
      place_id: '4',
      name: 'Tank Bund',
      rating: 4.3,
      vicinity: 'Hyderabad, Telangana',
      geometry: { location: { lat: 17.3850, lng: 78.4867 } },
      formatted_address: 'Tank Bund, Hyderabad, Telangana',
      price_level: 1,
      types: ['tourist_attraction', 'point_of_interest']
    }
  ];
};

export const getSearchResults = (query, currentLoc) => {
  const allPlaces = {
    'restaurants': [
      { name: 'Spice Garden Restaurant', rating: 4.3, location: { lat: 17.3616, lng: 78.4747 } },
      { name: 'Hyderabad House', rating: 4.5, location: { lat: 17.3833, lng: 78.4011 } },
      { name: 'Biryani Paradise', rating: 4.7, location: { lat: 17.4474, lng: 78.3762 } },
      { name: 'Taj Restaurant', rating: 4.2, location: { lat: 17.3715, lng: 78.4808 } },
      { name: 'Royal Diner', rating: 4.4, location: { lat: 17.4065, lng: 78.4692 } }
    ],
    'hotels': [
      { name: 'Taj Krishna Hotel', rating: 4.8, location: { lat: 17.3616, lng: 78.4747 } },
      { name: 'ITC Kakatiya', rating: 4.6, location: { lat: 17.3833, lng: 78.4011 } },
      { name: 'Novotel Hyderabad', rating: 4.4, location: { lat: 17.4474, lng: 78.3762 } },
      { name: 'Marriott Hotel', rating: 4.7, location: { lat: 17.3715, lng: 78.4808 } },
      { name: 'Hilton Hyderabad', rating: 4.5, location: { lat: 17.4065, lng: 78.4692 } }
    ],
    'parks': [
      { name: 'Lumbini Park', rating: 4.2, location: { lat: 17.3616, lng: 78.4747 } },
      { name: 'Nehru Zoological Park', rating: 4.4, location: { lat: 17.3833, lng: 78.4011 } },
      { name: 'Botanical Gardens', rating: 4.1, location: { lat: 17.4474, lng: 78.3762 } },
      { name: 'Public Garden', rating: 4.3, location: { lat: 17.3715, lng: 78.4808 } },
      { name: 'Children Park', rating: 4.0, location: { lat: 17.4065, lng: 78.4692 } }
    ],
    'museums': [
      { name: 'Salar Jung Museum', rating: 4.6, location: { lat: 17.3715, lng: 78.4808 } },
      { name: 'State Museum', rating: 4.3, location: { lat: 17.3833, lng: 78.4011 } },
      { name: 'Archaeological Museum', rating: 4.2, location: { lat: 17.4474, lng: 78.3762 } },
      { name: 'Science Museum', rating: 4.4, location: { lat: 17.3616, lng: 78.4747 } },
      { name: 'Art Gallery', rating: 4.1, location: { lat: 17.4065, lng: 78.4692 } }
    ],
    'shopping': [
      { name: 'Inorbit Mall', rating: 4.4, location: { lat: 17.4474, lng: 78.3762 } },
      { name: 'Forum Sujana Mall', rating: 4.2, location: { lat: 17.3616, lng: 78.4747 } },
      { name: 'GVK One Mall', rating: 4.5, location: { lat: 17.3833, lng: 78.4011 } },
      { name: 'Central Mall', rating: 4.3, location: { lat: 17.3715, lng: 78.4808 } },
      { name: 'Metro Mall', rating: 4.1, location: { lat: 17.4065, lng: 78.4692 } }
    ],
    'hospitals': [
      { name: 'Apollo Hospital', rating: 4.7, location: { lat: 17.3616, lng: 78.4747 } },
      { name: 'Care Hospital', rating: 4.5, location: { lat: 17.3833, lng: 78.4011 } },
      { name: 'KIMS Hospital', rating: 4.6, location: { lat: 17.4474, lng: 78.3762 } },
      { name: 'Yashoda Hospital', rating: 4.4, location: { lat: 17.3715, lng: 78.4808 } },
      { name: 'Medicover Hospital', rating: 4.3, location: { lat: 17.4065, lng: 78.4692 } }
    ],
    'schools': [
      { name: 'Delhi Public School', rating: 4.5, location: { lat: 17.3616, lng: 78.4747 } },
      { name: 'Oakridge International', rating: 4.7, location: { lat: 17.3833, lng: 78.4011 } },
      { name: 'Chirec International', rating: 4.6, location: { lat: 17.4474, lng: 78.3762 } },
      { name: 'Meridian School', rating: 4.4, location: { lat: 17.3715, lng: 78.4808 } },
      { name: 'Gitanjali School', rating: 4.3, location: { lat: 17.4065, lng: 78.4692 } }
    ]
  };

  // Return places based on query
  for (const [category, places] of Object.entries(allPlaces)) {
    if (query.includes(category) || category.includes(query)) {
      return places.map((place, index) => {
        const distance = calculateDistance(
          currentLoc.lat, currentLoc.lng,
          place.location.lat, place.location.lng
        );
        return {
          place_id: `${category}_${index}`,
          name: place.name,
          rating: place.rating,
          vicinity: 'Hyderabad, Telangana',
          geometry: { location: place.location },
          formatted_address: `${place.name}, Hyderabad, Telangana`,
          price_level: Math.floor(Math.random() * 3) + 1,
          types: ['establishment', 'point_of_interest'],
          distance: distance,
          distance_text: distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)}km`
        };
      }).sort((a, b) => a.distance - b.distance); // Sort by distance
    }
  }

  // Default search results with realistic distances
  const defaultPlaces = [
    { name: 'Search Result 1', location: { lat: 17.3616, lng: 78.4747 } },
    { name: 'Search Result 2', location: { lat: 17.3833, lng: 78.4011 } },
    { name: 'Search Result 3', location: { lat: 17.4474, lng: 78.3762 } }
  ];

  return defaultPlaces.map((place, index) => {
    const distance = calculateDistance(
      currentLoc.lat, currentLoc.lng,
      place.location.lat, place.location.lng
    );
    return {
      place_id: `default_${index}`,
      name: place.name,
      rating: 4.0 + Math.random() * 0.5,
      vicinity: 'Hyderabad, Telangana',
      geometry: { location: place.location },
      formatted_address: `${place.name}, Hyderabad, Telangana`,
      price_level: Math.floor(Math.random() * 3) + 1,
      types: ['establishment', 'point_of_interest'],
      distance: distance,
      distance_text: distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)}km`
    };
  });
};

// Calculate distance between two points using Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
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

export const getCoordinatesFromName = (placeName, currentLoc) => {
  // Convert place name to coordinates (simplified)
  const places = {
    'charminar': { lat: 17.3616, lng: 78.4747 },
    'golconda': { lat: 17.3833, lng: 78.4011 },
    'hitec city': { lat: 17.4474, lng: 78.3762 },
    'tank bund': { lat: 17.3850, lng: 78.4867 },
    'salar jung': { lat: 17.3715, lng: 78.4808 },
    'birla mandir': { lat: 17.4065, lng: 78.4692 }
  };
  
  const lowerName = placeName.toLowerCase();
  for (const [key, coords] of Object.entries(places)) {
    if (lowerName.includes(key)) {
      return coords;
    }
  }
  
  // Return random coordinates near current location if not found
  return {
    lat: currentLoc.lat + (Math.random() - 0.5) * 0.01,
    lng: currentLoc.lng + (Math.random() - 0.5) * 0.01
  };
};

export const generateRouteSteps = (origin, destination, currentLoc) => {
  // Generate realistic route steps based on distance
  const originCoords = getCoordinatesFromName(origin, currentLoc);
  const destCoords = getCoordinatesFromName(destination, currentLoc);
  
  const distance = calculateDistance(
    originCoords.lat, originCoords.lng,
    destCoords.lat, destCoords.lng
  );
  
  const steps = [];
  let remainingDistance = distance;
  let currentStep = 1;
  
  while (remainingDistance > 0) {
    const stepDistance = Math.min(remainingDistance, 0.5); // 500m steps
    steps.push({
      instruction: getStepInstruction(currentStep, stepDistance),
      distance: stepDistance,
      distance_text: stepDistance < 1 ? `${(stepDistance * 1000).toFixed(0)}m` : `${stepDistance.toFixed(1)}km`
    });
    remainingDistance -= stepDistance;
    currentStep++;
  }
  
  return steps;
};

export const getStepInstruction = (stepNumber, distance) => {
  const instructions = [
    'Start from your current location',
    'Turn right onto Main Street',
    'Continue straight ahead',
    'Turn left onto Central Avenue',
    'Take the second right',
    'Continue on the highway',
    'Exit at the next junction',
    'Turn right at the traffic signal',
    'Continue straight for 500 meters',
    'Turn left onto Destination Road'
  ];
  
  return instructions[stepNumber - 1] || `Continue for ${distance.toFixed(1)}km`;
};

export const generateRoutePolyline = (origin, destination, currentLoc) => {
  // Generate a simple polyline for route visualization
  const originCoords = getCoordinatesFromName(origin, currentLoc);
  const destCoords = getCoordinatesFromName(destination, currentLoc);
  
  // Create intermediate points for smooth route
  const points = [];
  const steps = 10;
  
  for (let i = 0; i <= steps; i++) {
    const lat = originCoords.lat + (destCoords.lat - originCoords.lat) * (i / steps);
    const lng = originCoords.lng + (destCoords.lng - originCoords.lng) * (i / steps);
    points.push({ lat, lng });
  }
  
  return points;
}; 