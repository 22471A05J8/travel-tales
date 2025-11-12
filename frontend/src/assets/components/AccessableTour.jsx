import React, { useState, useEffect, useRef } from 'react';
import './AccessableTour.css';

import { useVoiceControl } from './hooks/useVoiceControl';
import { useLocationTracking } from "./hooks/useLocationTracking";

import { 
  getMockNearbyPlaces, 
  getSearchResults, 
  generateRouteSteps, 
  generateRoutePolyline 
} from './utils/mapUtils';
import { 
  drawPanoramicImage, 
  drawPlaceholderView, 
  drawSatelliteView, 
  drawStreetView, 
  drawHybridView, 
  drawUserMarker, 
  drawLocationHistory, 
  drawMapControls 
} from './utils/canvasUtils';

const AccessibleTour = () => {
  // Basic states
  const [currentView, setCurrentView] = useState('front');
  const [isLoading, setIsLoading] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 17.3616, lng: 78.4747 });
  const [mapZoom, setMapZoom] = useState(14);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  
  // Map and navigation states
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [showTraffic, setShowTraffic] = useState(false);
  const [showStreetView, setShowStreetView] = useState(false);
  const [mapType, setMapType] = useState('roadmap');
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedMapType, setSelectedMapType] = useState('roadmap');

  // Real-time map view states
  const [showLiveMap, setShowLiveMap] = useState(false);
  const [mapView, setMapView] = useState('satellite');
  const [streetView, setStreetView] = useState(false);
  const [trafficLayer, setTrafficLayer] = useState(false);
  const [transitLayer, setTransitLayer] = useState(false);
  const [bicycleLayer, setBicycleLayer] = useState(false);
  const [mapRotation, setMapRotation] = useState(0);
  const [mapTilt, setMapTilt] = useState(0);
  const [mapBounds, setMapBounds] = useState(null);
  const [showCompass, setShowCompass] = useState(false);
  const [showScale, setShowScale] = useState(true);

  // Custom hooks
  const locationTracking = useLocationTracking();
  const voiceControl = useVoiceControl();

  const canvasRef = useRef(null);
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);

  const views = {
    front: { rotation: 0, name: 'Front View' },
    left: { rotation: 90, name: 'Left View' },
    right: { rotation: -90, name: 'Right View' },
    back: { rotation: 180, name: 'Back View' }
  };

  // Voice command handler
  const handleVoiceCommand = (command) => {
    voiceControl.setVoiceFeedback(`Heard: ${command}`);
    
    if (command.includes('rotate left') || command.includes('turn left')) {
      rotateView('left');
    } else if (command.includes('rotate right') || command.includes('turn right')) {
      rotateView('right');
    } else if (command.includes('front view')) {
      setCurrentView('front');
    } else if (command.includes('back view')) {
      setCurrentView('back');
    } else if (command.includes('search')) {
      const searchTerm = command.replace('search', '').trim();
      setSearchQuery(searchTerm);
      searchPlaces(searchTerm);
    } else if (command.includes('nearby')) {
      loadNearbyPlaces();
    } else if (command.includes('map')) {
      setShowMap(!showMap);
    } else if (command.includes('select place')) {
      const placeIndex = parseInt(command.match(/\d+/)?.[0]) - 1;
      if (placeIndex >= 0 && nearbyPlaces[placeIndex]) {
        selectPlace(nearbyPlaces[placeIndex]);
      }
    } else if (command.includes('traffic')) {
      toggleTraffic();
    } else if (command.includes('street view')) {
      toggleStreetView();
    } else if (command.includes('directions')) {
      const parts = command.split('to');
      if (parts.length === 2) {
        setOrigin(parts[0].replace('directions from', '').trim());
        setDestination(parts[1].trim());
        getDirections();
      }
    } else if (command.includes('start tracking') || command.includes('live location')) {
      locationTracking.startLiveTracking();
    } else if (command.includes('stop tracking')) {
      locationTracking.stopLiveTracking();
    } else if (command.includes('my location') || command.includes('where am i')) {
      locationTracking.getCurrentLocation();
    }
  };

  // Override voice control handler
  useEffect(() => {
    voiceControl.handleVoiceCommand = handleVoiceCommand;
  }, [locationTracking.userPosition, nearbyPlaces]);

  // Real-time map functions
  const toggleLiveMap = () => {
    setShowLiveMap(!showLiveMap);
    if (!showLiveMap && locationTracking.userPosition) {
      setMapCenter(locationTracking.userPosition);
    }
  };

  const changeMapView = (view) => {
    setMapView(view);
    switch (view) {
      case 'satellite':
        setMapType('satellite');
        break;
      case 'street':
        setMapType('roadmap');
        break;
      case 'hybrid':
        setMapType('hybrid');
        break;
      default:
        setMapType('roadmap');
    }
  };

  const toggleMapLayer = (layer) => {
    switch (layer) {
      case 'traffic':
        setTrafficLayer(!trafficLayer);
        break;
      case 'transit':
        setTransitLayer(!transitLayer);
        break;
      case 'bicycle':
        setBicycleLayer(!bicycleLayer);
        break;
      case 'streetview':
        setStreetView(!streetView);
        break;
    }
  };

  const centerOnUser = () => {
    if (locationTracking.userPosition) {
      setMapCenter(locationTracking.userPosition);
      setMapZoom(16);
      setMapRotation(locationTracking.locationHeading || 0);
    }
  };

  const followUser = () => {
    if (locationTracking.userPosition) {
      setMapCenter(locationTracking.userPosition);
      if (locationTracking.locationHeading) {
        setMapRotation(locationTracking.locationHeading);
      }
    }
  };

  const drawRealTimeMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw map background based on view type
    if (mapView === 'satellite') {
      drawSatelliteView(ctx, canvas);
    } else if (mapView === 'street') {
      drawStreetView(ctx, canvas);
    } else {
      drawHybridView(ctx, canvas);
    }

    // Draw user position
    if (locationTracking.userPosition) {
      drawUserMarker(
        ctx, 
        locationTracking.userPosition, 
        locationTracking.locationAccuracy, 
        locationTracking.locationSpeed, 
        locationTracking.locationHeading, 
        canvas
      );
    }

    // Draw location history
    if (locationTracking.locationHistory.length > 0) {
      drawLocationHistory(ctx, locationTracking.locationHistory, locationTracking.userPosition, canvas);
    }

    // Draw map controls
    drawMapControls(ctx, mapView, canvas);
  };

  const toggleVoiceControl = () => {
    voiceControl.toggleVoiceControl();
  };

  const rotateView = (direction) => {
    const viewOrder = ['front', 'right', 'back', 'left'];
    const currentIndex = viewOrder.indexOf(currentView);
    const newIndex = direction === 'left' 
      ? (currentIndex - 1 + 4) % 4 
      : (currentIndex + 1) % 4;
    setCurrentView(viewOrder[newIndex]);
  };

  const loadPanoramicView = async () => {
    setIsLoading(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      drawPanoramicImage(ctx, views[currentView].name, canvas);
    } catch (error) {
      console.error('Error loading panoramic view:', error);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        drawPlaceholderView(ctx, views[currentView].name, canvas);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadNearbyPlaces = async () => {
    setIsLoading(true);
    try {
      const mockPlaces = getMockNearbyPlaces();
      setNearbyPlaces(mockPlaces);
      
      // Add markers to map
      if (map) {
        clearMarkers();
        mockPlaces.forEach((place, index) => {
          addMarker(place.geometry.location, place.name, index + 1);
        });
      }
    } catch (error) {
      console.error('Error loading nearby places:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchPlaces = async (query) => {
    if (!query) return;
    
    setIsLoading(true);
    try {
      const currentLoc = locationTracking.currentLocation || await locationTracking.getCurrentLocation();
      const searchResults = getSearchResults(query.toLowerCase(), currentLoc);
      setSearchResults(searchResults);
      
      // Add markers to map
      if (map) {
        clearMarkers();
        searchResults.forEach((place, index) => {
          addMarker(place.geometry.location, place.name, index + 1, 'red');
        });
        
        // Center map on first result
        if (searchResults[0]?.geometry?.location) {
          map.setCenter(searchResults[0].geometry.location);
          map.setZoom(14);
        }
      }
    } catch (error) {
      console.error('Error searching places:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addMarker = (position, title, label, color = 'blue') => {
    if (!map) return;

    const marker = {
      position,
      title,
      label: label?.toString(),
      color,
      id: Date.now() + Math.random()
    };

    setMarkers(prev => [...prev, marker]);
  };

  const clearMarkers = () => {
    setMarkers([]);
  };

  const selectPlace = async (place) => {
    setSelectedPlace(place);
    
    // Calculate distance from current location
    if (locationTracking.currentLocation && place.geometry?.location) {
      const distance = locationTracking.calculateDistance(
        locationTracking.currentLocation.lat, locationTracking.currentLocation.lng,
        place.geometry.location.lat, place.geometry.location.lng
      );
      
      // Update place with distance information
      const updatedPlace = {
        ...place,
        distance: distance,
        distance_text: distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)}km`
      };
      setSelectedPlace(updatedPlace);
    }
    
    // Center map on selected place
    if (map && place.geometry?.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(16);
    }
  };

  const toggleTraffic = () => {
    setShowTraffic(!showTraffic);
  };

  const toggleStreetView = () => {
    setShowStreetView(!showStreetView);
  };

  const getDirections = () => {
    if (!origin || !destination) return;
    
    const currentLoc = locationTracking.currentLocation || { lat: 17.3616, lng: 78.4747 };
    
    // Calculate realistic route
    const routeSteps = generateRouteSteps(origin, destination, currentLoc);
    const totalDistance = routeSteps.reduce((sum, step) => sum + step.distance, 0);
    const totalDuration = Math.round(totalDistance * 2); // Rough estimate: 2 min per km
    
    const mockDirections = {
      origin: origin,
      destination: destination,
      steps: routeSteps,
      totalDistance: totalDistance.toFixed(1),
      totalDuration: `${totalDuration} minutes`,
      currentLocation: currentLoc
    };
    
    setDirections(mockDirections);
    
    // Generate route polyline for map display
    const polyline = generateRoutePolyline(origin, destination, currentLoc);
    // setRoutePolyline(polyline); // Uncomment if you have this state
  };

  const changeMapType = (type) => {
    setSelectedMapType(type);
    setMapType(type);
  };

  const handleKeyPress = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        rotateView('left');
        break;
      case 'ArrowRight':
        e.preventDefault();
        rotateView('right');
        break;
      case 'Enter':
        if (e.target.id === 'search-input') {
          searchPlaces(searchQuery);
        }
        break;
      case 'Escape':
        setSelectedPlace(null);
        setSearchResults([]);
        break;
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const newRotation = rotation + deltaX * 0.5;
    setRotation(newRotation);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const newRotation = rotation + deltaX * 0.5;
    setRotation(newRotation);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (showLiveMap) {
      drawRealTimeMap();
    } else {
      loadPanoramicView();
    }
  }, [currentView, rotation, showLiveMap, locationTracking.userPosition, mapView, mapZoom, locationTracking.locationHistory]);

  useEffect(() => {
    if (showMap) {
      loadNearbyPlaces();
    }
  }, [showMap]);

  return (
    <div className={`accessible-tour ${highContrast ? 'high-contrast' : ''}`} style={{ fontSize: `${fontSize}px` }}>
      <div className="tour-header">
        <h1>Accessible Virtual Tour</h1>
        <div className="controls">
          <button 
            onClick={toggleVoiceControl}
            className={`voice-control ${voiceControl.isListening ? 'listening' : ''}`}
            aria-label={voiceControl.isListening ? 'Stop voice control' : 'Start voice control'}
          >
            {voiceControl.isListening ? '🎤 Listening...' : '🎤 Voice Control'}
          </button>
          <button 
            onClick={() => setHighContrast(!highContrast)}
            className="contrast-toggle"
            aria-label="Toggle high contrast mode"
          >
            {highContrast ? '🌙' : '☀️'}
          </button>
          <div className="font-controls">
            <button onClick={() => setFontSize(Math.max(12, fontSize - 2))}>A-</button>
            <button onClick={() => setFontSize(Math.min(24, fontSize + 2))}>A+</button>
          </div>
        </div>
      </div>

      {voiceControl.voiceFeedback && (
        <div className="voice-feedback">
          {voiceControl.voiceFeedback}
        </div>
      )}

      <div className="api-key-section">
        <div className="status-indicator">
          <span className="status-dot online"></span>
          <span>No API Key Required - Using Local Data</span>
        </div>
        <button onClick={() => setShowMap(!showMap)} className="map-toggle">
          {showMap ? 'Hide Map' : 'Show Map'}
        </button>
      </div>

      <div className="tour-container">
        {!showMap && !showLiveMap && (
          <>
            <div className="panoramic-view">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="panoramic-canvas"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="img"
                aria-label={`360-degree panoramic view - ${views[currentView].name}`}
                tabIndex={0}
                onKeyDown={handleKeyPress}
              />
              
              {isLoading && (
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
                  <p>Loading panoramic view...</p>
                </div>
              )}
            </div>

            <div className="view-controls">
              <button onClick={() => setCurrentView('front')} className={currentView === 'front' ? 'active' : ''}>
                Front
              </button>
              <button onClick={() => setCurrentView('left')} className={currentView === 'left' ? 'active' : ''}>
                Left
              </button>
              <button onClick={() => setCurrentView('right')} className={currentView === 'right' ? 'active' : ''}>
                Right
              </button>
              <button onClick={() => setCurrentView('back')} className={currentView === 'back' ? 'active' : ''}>
                Back
              </button>
            </div>
          </>
        )}

        {showLiveMap && (
          <div className="live-map-view">
            <div className="map-header">
              <h3>Real-Time Location Map</h3>
              <div className="map-controls">
                <button onClick={toggleLiveMap} className="close-map-btn">
                  ✕ Close Map
                </button>
                <button onClick={centerOnUser} className="center-btn">
                  📍 Center on Me
                </button>
                <button onClick={followUser} className="follow-btn">
                  🎯 Follow Me
                </button>
              </div>
            </div>

            <div className="map-container">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="live-map-canvas"
                role="img"
                aria-label="Real-time location map with user position"
                tabIndex={0}
                onKeyDown={handleKeyPress}
              />
              
              {isLoading && (
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
                  <p>Loading map...</p>
                </div>
              )}
            </div>

            <div className="map-view-controls">
              <div className="view-type-controls">
                <button 
                  onClick={() => changeMapView('satellite')} 
                  className={mapView === 'satellite' ? 'active' : ''}
                >
                  🛰️ Satellite
                </button>
                <button 
                  onClick={() => changeMapView('street')} 
                  className={mapView === 'street' ? 'active' : ''}
                >
                  🛣️ Street
                </button>
                <button 
                  onClick={() => changeMapView('hybrid')} 
                  className={mapView === 'hybrid' ? 'active' : ''}
                >
                  🔄 Hybrid
                </button>
              </div>

              <div className="layer-controls">
                <button 
                  onClick={() => toggleMapLayer('traffic')} 
                  className={trafficLayer ? 'active' : ''}
                >
                  🚦 Traffic
                </button>
                <button 
                  onClick={() => toggleMapLayer('transit')} 
                  className={transitLayer ? 'active' : ''}
                >
                  🚌 Transit
                </button>
                <button 
                  onClick={() => toggleMapLayer('bicycle')} 
                  className={bicycleLayer ? 'active' : ''}
                >
                  🚲 Bicycle
                </button>
                <button 
                  onClick={() => toggleMapLayer('streetview')} 
                  className={streetView ? 'active' : ''}
                >
                  🏠 Street View
                </button>
              </div>

              <div className="zoom-controls">
                <button onClick={() => setMapZoom(Math.min(20, mapZoom + 1))}>
                  🔍+
                </button>
                <span className="zoom-level">Zoom: {mapZoom}</span>
                <button onClick={() => setMapZoom(Math.max(10, mapZoom - 1))}>
                  🔍-
                </button>
              </div>
            </div>

            {locationTracking.userPosition && (
              <div className="user-position-info">
                <h4>Your Real-Time Position</h4>
                <div className="position-details">
                  <p><strong>Coordinates:</strong> {locationTracking.userPosition.lat.toFixed(6)}, {locationTracking.userPosition.lng.toFixed(6)}</p>
                  {locationTracking.locationAccuracy && (
                    <p><strong>Accuracy:</strong> {locationTracking.locationAccuracy.toFixed(1)}m</p>
                  )}
                  {locationTracking.locationSpeed && (
                    <p><strong>Speed:</strong> {(locationTracking.locationSpeed * 3.6).toFixed(1)} km/h</p>
                  )}
                  {locationTracking.locationHeading && (
                    <p><strong>Heading:</strong> {locationTracking.locationHeading.toFixed(0)}°</p>
                  )}
                  {locationTracking.locationTimestamp && (
                    <p><strong>Last Updated:</strong> {new Date(locationTracking.locationTimestamp).toLocaleTimeString()}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="search-section">
          <div className="search-container">
            <input
              ref={searchInputRef}
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for places (restaurants, hotels, parks, museums, shopping)..."
              onKeyDown={handleKeyPress}
              aria-label="Search for places"
            />
            <button onClick={() => searchPlaces(searchQuery)} disabled={!searchQuery}>
              Search
            </button>
          </div>
          
          <div className="search-help">
            <p>💡 <strong>Search Tips:</strong></p>
            <ul>
              <li>Search for categories: "restaurants", "hotels", "parks", "museums", "shopping"</li>
              <li>Search for specific places: "Charminar", "Golconda Fort", "HITEC City"</li>
              <li>Search for activities: "coffee shops", "gas stations", "hospitals", "schools"</li>
              <li>All searches work offline with local data</li>
            </ul>
          </div>
          
          {searchResults.length > 0 && (
            <div className="search-results">
              <h3>Search Results</h3>
              <div className="places-list">
                {searchResults.map((place, index) => (
                  <div 
                    key={place.place_id} 
                    className="place-item"
                    onClick={() => selectPlace(place)}
                    onKeyDown={(e) => e.key === 'Enter' && selectPlace(place)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select ${place.name}`}
                  >
                    <h4>{place.name}</h4>
                    <p>{place.formatted_address || place.vicinity}</p>
                    <div className="place-details-row">
                      {place.rating && <span className="rating">⭐ {place.rating}</span>}
                      {place.distance_text && (
                        <span className="distance-badge">
                          📍 {place.distance_text}
                        </span>
                      )}
                    </div>
                    <span className="place-number">{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {showMap && (
          <div className="map-section">
            <div className="map-container" ref={mapRef}>
              <div className="interactive-map">
                <div className="map-overlay">
                  <h3>Interactive Map View</h3>
                  <p>Map centered at: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}</p>
                  <div className="map-controls">
                    <button onClick={() => setMapZoom(Math.min(20, mapZoom + 1))}>Zoom In</button>
                    <button onClick={() => setMapZoom(Math.max(10, mapZoom - 1))}>Zoom Out</button>
                  </div>
                  
                  {locationTracking.userMarker && (
                    <div className="user-marker-info">
                      <h4>Your Location on Map</h4>
                      <div className="user-marker-details">
                        <div className="marker-item user-marker">
                          <span className="marker-color" style={{ backgroundColor: locationTracking.userMarker.color }}></span>
                          <span>{locationTracking.userMarker.title}</span>
                          {locationTracking.userMarker.accuracy && (
                            <span className="accuracy">±{locationTracking.userMarker.accuracy.toFixed(1)}m</span>
                          )}
                        </div>
                        {locationTracking.userMarker.speed && (
                          <div className="speed-info">
                            <span>Speed: {(locationTracking.userMarker.speed * 3.6).toFixed(1)} km/h</span>
                          </div>
                        )}
                        {locationTracking.userMarker.heading && (
                          <div className="heading-info">
                            <span>Heading: {locationTracking.userMarker.heading.toFixed(0)}°</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {markers.length > 0 && (
                    <div className="markers-info">
                      <h4>Markers on Map:</h4>
                      <div className="markers-list">
                        {markers.map((marker, index) => (
                          <div key={marker.id} className="marker-item">
                            <span className="marker-color" style={{ backgroundColor: marker.color }}></span>
                            <span>{marker.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {locationTracking.locationHistory.length > 0 && (
                    <div className="location-history-map">
                      <h4>Location History</h4>
                      <div className="history-info">
                        <p>Tracked {locationTracking.locationHistory.length} points</p>
                        <p>Total distance: {locationTracking.getLocationStats()?.totalDistance || '0'} km</p>
                        <div className="history-points">
                          {locationTracking.locationHistory.slice(-5).map((point, index) => (
                            <div key={index} className="history-point">
                              <span className="point-number">{locationTracking.locationHistory.length - 4 + index}</span>
                              <span className="point-coords">
                                {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                              </span>
                              <span className="point-time">
                                {new Date(point.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="map-controls-panel">
              <div className="map-type-controls">
                <h3>Map Type</h3>
                <div className="map-type-buttons">
                  <button 
                    onClick={() => changeMapType('roadmap')}
                    className={selectedMapType === 'roadmap' ? 'active' : ''}
                  >
                    Street
                  </button>
                  <button 
                    onClick={() => changeMapType('satellite')}
                    className={selectedMapType === 'satellite' ? 'active' : ''}
                  >
                    Satellite
                  </button>
                  <button 
                    onClick={() => changeMapType('terrain')}
                    className={selectedMapType === 'terrain' ? 'active' : ''}
                  >
                    Terrain
                  </button>
                  <button 
                    onClick={() => changeMapType('hybrid')}
                    className={selectedMapType === 'hybrid' ? 'active' : ''}
                  >
                    Hybrid
                  </button>
                </div>
              </div>

              <div className="map-features">
                <h3>Features</h3>
                <button 
                  onClick={toggleTraffic}
                  className={showTraffic ? 'active' : ''}
                >
                  {showTraffic ? '🚦 Hide Traffic' : '🚦 Show Traffic'}
                </button>
                <button 
                  onClick={toggleStreetView}
                  className={showStreetView ? 'active' : ''}
                >
                  {showStreetView ? '🏠 Hide Street View' : '🏠 Show Street View'}
                </button>
              </div>

              <div className="live-location-panel">
                <h3>Live Location Tracking</h3>
                <div className="location-controls">
                  <button 
                    onClick={locationTracking.isLiveTracking ? locationTracking.stopLiveTracking : locationTracking.startLiveTracking}
                    className={`tracking-button ${locationTracking.isLiveTracking ? 'active' : ''}`}
                  >
                    {locationTracking.isLiveTracking ? '🛑 Stop Tracking' : '📍 Start Live Tracking'}
                  </button>
                  <button 
                    onClick={locationTracking.getCurrentLocation}
                    className="location-button"
                  >
                    📍 Get My Location
                  </button>
                  <button 
                    onClick={toggleLiveMap}
                    className={`live-map-button ${showLiveMap ? 'active' : ''}`}
                  >
                    {showLiveMap ? '🗺️ Hide Map' : '🗺️ Show Live Map'}
                  </button>
                </div>

                {locationTracking.locationError && (
                  <div className="location-error">
                    <span className="error-icon">⚠️</span>
                    <span>{locationTracking.locationError}</span>
                  </div>
                )}

                {locationTracking.userLocation && (
                  <div className="user-location-info">
                    <h4>Your Current Location</h4>
                    <div className="location-details">
                      <p><strong>Coordinates:</strong> {locationTracking.userLocation.lat.toFixed(6)}, {locationTracking.userLocation.lng.toFixed(6)}</p>
                      {locationTracking.locationAccuracy && (
                        <p><strong>Accuracy:</strong> {locationTracking.locationAccuracy.toFixed(1)}m</p>
                      )}
                      {locationTracking.locationSpeed && (
                        <p><strong>Speed:</strong> {(locationTracking.locationSpeed * 3.6).toFixed(1)} km/h</p>
                      )}
                      {locationTracking.locationHeading && (
                        <p><strong>Heading:</strong> {locationTracking.locationHeading.toFixed(0)}°</p>
                      )}
                      {locationTracking.locationTimestamp && (
                        <p><strong>Last Updated:</strong> {new Date(locationTracking.locationTimestamp).toLocaleTimeString()}</p>
                      )}
                    </div>
                  </div>
                )}

                {locationTracking.locationHistory.length > 0 && (
                  <div className="location-history">
                    <h4>Location History</h4>
                    <div className="history-stats">
                      {locationTracking.getLocationStats() && (
                        <div className="stats-grid">
                          <div className="stat-item">
                            <span className="stat-label">Total Distance:</span>
                            <span className="stat-value">{locationTracking.getLocationStats().totalDistance} km</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Avg Speed:</span>
                            <span className="stat-value">{locationTracking.getLocationStats().avgSpeed} km/h</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Track Points:</span>
                            <span className="stat-value">{locationTracking.getLocationStats().points}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Accuracy:</span>
                            <span className="stat-value">{locationTracking.getLocationStats().accuracy}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={locationTracking.clearLocationHistory}
                      className="clear-history-button"
                    >
                      🗑️ Clear History
                    </button>
                  </div>
                )}

                <div className="location-help">
                  <p><strong>Voice Commands:</strong></p>
                  <ul>
                    <li>"Start tracking" or "Live location" - Start live tracking</li>
                    <li>"Stop tracking" - Stop live tracking</li>
                    <li>"My location" or "Where am I" - Get current location</li>
                  </ul>
                </div>
              </div>

              <div className="directions-panel">
                <h3>Directions</h3>
                <div className="location-info">
                  {locationTracking.currentLocation && (
                    <div className="current-location">
                      <span className="location-icon">📍</span>
                      <span>Current Location: {locationTracking.currentLocation.lat.toFixed(4)}, {locationTracking.currentLocation.lng.toFixed(4)}</span>
                    </div>
                  )}
                  <button 
                    onClick={locationTracking.getCurrentLocation}
                    className="location-button"
                  >
                    📍 Get My Location
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="From"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="direction-input"
                />
                <input
                  type="text"
                  placeholder="To"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="direction-input"
                />
                <button onClick={getDirections} disabled={!origin || !destination}>
                  🧭 Get Directions
                </button>
                
                {directions && (
                  <div className="directions-result">
                    <h4>Route from {directions.origin} to {directions.destination}</h4>
                    <p><strong>Distance:</strong> {directions.totalDistance}</p>
                    <p><strong>Duration:</strong> {directions.totalDuration}</p>
                    <div className="directions-steps">
                      {directions.steps.map((step, index) => (
                        <div key={index} className="direction-step">
                          <span className="step-number">{index + 1}</span>
                          <div className="step-content">
                            <p>{step.instruction}</p>
                            <small>{step.distance}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="nearby-places">
                <h3>Nearby Places</h3>
                <button onClick={loadNearbyPlaces} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Refresh Nearby Places'}
                </button>
                
                <div className="places-list">
                  {nearbyPlaces.map((place, index) => (
                    <div 
                      key={place.place_id} 
                      className="place-item"
                      onClick={() => selectPlace(place)}
                      onKeyDown={(e) => e.key === 'Enter' && selectPlace(place)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Select ${place.name}`}
                    >
                      <h4>{place.name}</h4>
                      <p>{place.vicinity}</p>
                      {place.rating && <span className="rating">⭐ {place.rating}</span>}
                      <span className="place-number">{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedPlace && (
          <div className="place-details">
            <div className="details-header">
              <h2>{selectedPlace.name}</h2>
              <button 
                onClick={() => setSelectedPlace(null)}
                className="close-button"
                aria-label="Close place details"
              >
                ×
              </button>
            </div>
            
            <div className="details-content">
              <div className="basic-info">
                <p><strong>Address:</strong> {selectedPlace.vicinity || selectedPlace.formatted_address}</p>
                {selectedPlace.rating && (
                  <p><strong>Rating:</strong> ⭐ {selectedPlace.rating}/5</p>
                )}
                {selectedPlace.price_level && (
                  <p><strong>Price Level:</strong> {'💰'.repeat(selectedPlace.price_level)}</p>
                )}
                {selectedPlace.distance_text && (
                  <p><strong>Distance:</strong> 📍 {selectedPlace.distance_text} from your location</p>
                )}
              </div>

              <div className="place-actions">
                <button 
                  onClick={() => {
                    if (selectedPlace.geometry?.location) {
                      setMapCenter({
                        lat: selectedPlace.geometry.location.lat,
                        lng: selectedPlace.geometry.location.lng
                      });
                    }
                    setSelectedPlace(null);
                  }}
                  className="navigate-button"
                >
                  🧭 Navigate to this place
                </button>
                <button 
                  onClick={() => {
                    alert(`${selectedPlace.name} added to favorites!`);
                  }}
                  className="favorite-button"
                >
                  ❤️ Add to Favorites
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="accessibility-info">
        <h3>Accessibility Features</h3>
        <ul>
          <li><strong>Voice Control:</strong> Click the microphone button and say commands like "rotate left", "search restaurants", "nearby places", "show traffic", "street view", "start tracking", "stop tracking", "my location"</li>
          <li><strong>Live Location Tracking:</strong> Real-time GPS tracking with accuracy, speed, and heading information</li>
          <li><strong>Real-Time Map View:</strong> Interactive map similar to Google Maps showing your live location with satellite, street, and hybrid views</li>
          <li><strong>Location History:</strong> Track your movement with distance calculations and route visualization</li>
          <li><strong>Map Controls:</strong> Zoom, pan, and switch between different map types and layers</li>
          <li><strong>Keyboard Navigation:</strong> Use arrow keys to rotate view, Enter to search, Escape to close</li>
          <li><strong>Touch Support:</strong> Drag on the panoramic view to rotate</li>
          <li><strong>High Contrast:</strong> Toggle high contrast mode for better visibility</li>
          <li><strong>Font Size:</strong> Adjust text size with A+ and A- buttons</li>
          <li><strong>Offline Functionality:</strong> Works without API keys using local data</li>
        </ul>
      </div>
    </div>
  );
};

export default AccessibleTour; 
