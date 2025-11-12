// Canvas drawing utility functions
export const drawPanoramicImage = (ctx, currentView, canvas) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Create a realistic city skyline
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#87CEEB');
  gradient.addColorStop(0.7, '#98FB98');
  gradient.addColorStop(1, '#8FBC8F');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw buildings
  const buildings = [
    { x: 50, y: 300, width: 60, height: 200, color: '#696969' },
    { x: 150, y: 250, width: 80, height: 250, color: '#4A4A4A' },
    { x: 280, y: 280, width: 70, height: 220, color: '#696969' },
    { x: 400, y: 320, width: 90, height: 180, color: '#4A4A4A' },
    { x: 550, y: 270, width: 75, height: 230, color: '#696969' },
    { x: 650, y: 290, width: 65, height: 210, color: '#4A4A4A' }
  ];
  
  buildings.forEach(building => {
    ctx.fillStyle = building.color;
    ctx.fillRect(building.x, building.y, building.width, building.height);
    
    // Add windows
    ctx.fillStyle = '#FFD700';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        ctx.fillRect(building.x + 10 + i * 15, building.y + 20 + j * 25, 8, 12);
      }
    }
  });
  
  // Add roads
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 500, canvas.width, 100);
  
  // Add road markings
  ctx.strokeStyle = '#FFF';
  ctx.setLineDash([20, 20]);
  ctx.beginPath();
  ctx.moveTo(0, 550);
  ctx.lineTo(canvas.width, 550);
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Add text
  ctx.fillStyle = '#000';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`${currentView} View`, canvas.width / 2, 50);
  ctx.fillText('Interactive Panoramic View', canvas.width / 2, canvas.height - 30);
};

export const drawPlaceholderView = (ctx, currentView, canvas) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#87CEEB');
  gradient.addColorStop(1, '#98FB98');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#696969';
  ctx.fillRect(100, 300, 80, 200);
  ctx.fillRect(250, 250, 100, 250);
  ctx.fillRect(400, 320, 70, 180);
  
  ctx.fillStyle = '#000';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`${currentView} View`, canvas.width / 2, 50);
  ctx.fillText('Panoramic View', canvas.width / 2, canvas.height - 30);
};

export const drawSatelliteView = (ctx, canvas) => {
  // Create satellite-like background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#2d3436');
  gradient.addColorStop(0.3, '#636e72');
  gradient.addColorStop(0.7, '#74b9ff');
  gradient.addColorStop(1, '#0984e3');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw grid lines for satellite view
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += 50) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < canvas.height; i += 50) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
};

export const drawStreetView = (ctx, canvas) => {
  // Create street map background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#74b9ff');
  gradient.addColorStop(0.7, '#a29bfe');
  gradient.addColorStop(1, '#6c5ce7');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw roads
  ctx.strokeStyle = '#2d3436';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  // Draw road markings
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.setLineDash([20, 20]);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
  ctx.setLineDash([]);
};

export const drawHybridView = (ctx, canvas) => {
  // Combine satellite and street view
  drawSatelliteView(ctx, canvas);
  
  // Overlay street information
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
};

export const drawUserMarker = (ctx, position, locationAccuracy, locationSpeed, locationHeading, canvas) => {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // Draw accuracy circle
  if (locationAccuracy) {
    const accuracyRadius = Math.min(locationAccuracy * 2, 100);
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, accuracyRadius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Draw user marker
  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
  ctx.fill();

  // Draw heading arrow
  if (locationHeading) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    const arrowLength = 20;
    const arrowX = centerX + arrowLength * Math.cos((locationHeading - 90) * Math.PI / 180);
    const arrowY = centerY + arrowLength * Math.sin((locationHeading - 90) * Math.PI / 180);
    ctx.lineTo(arrowX, arrowY);
    ctx.stroke();
  }

  // Draw speed indicator
  if (locationSpeed) {
    const speed = (locationSpeed * 3.6).toFixed(1);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(centerX + 15, centerY - 10, 60, 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.fillText(`${speed} km/h`, centerX + 20, centerY + 5);
  }
};

export const drawLocationHistory = (ctx, locationHistory, userPosition, canvas) => {
  if (locationHistory.length < 2) return;

  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 3;
  ctx.beginPath();

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  locationHistory.slice(-10).forEach((point, index) => {
    const x = centerX + (point.lat - userPosition.lat) * 10000;
    const y = centerY + (point.lng - userPosition.lng) * 10000;
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
};

export const drawMapControls = (ctx, mapView, canvas) => {
  // Draw zoom controls
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillRect(10, 10, 40, 80);
  
  ctx.fillStyle = '#000000';
  ctx.font = '16px Arial';
  ctx.fillText('+', 25, 30);
  ctx.fillText('-', 25, 60);
  ctx.fillText('📍', 20, 85);

  // Draw map type indicator
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillRect(canvas.width - 120, 10, 110, 30);
  
  ctx.fillStyle = '#000000';
  ctx.font = '12px Arial';
  ctx.fillText(`Map: ${mapView}`, canvas.width - 110, 30);
}; 