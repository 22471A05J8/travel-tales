import React, { useState } from 'react'
import './Gallery.css'

const images = [
  { id: 1, src: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg', alt: 'Taj Mahal, Agra', name: 'Taj Mahal, Agra' },
  { id: 2, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAXWPfsWUB9HobHqyV-4c7gNACOdS7Uw7kqw&s', alt: 'Charminar, Hyderabad', name: 'Charminar, Hyderabad' },
  { id: 3, src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', alt: 'Munnar, Kerala', name: 'Munnar, Kerala' },
  { id: 4, src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800', alt: 'Kedarnath', name: 'Kedarnath' },
  { id: 5, src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800', alt: 'Mysore Palace, Karnataka', name: 'Mysore Palace, Karnataka' },
  { id: 6, src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800', alt: 'Victoria Memorial, Kolkata', name: 'Victoria Memorial, Kolkata' },
  { id: 7, src: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800', alt: 'Paris', name: 'Paris' },
  { id: 8, src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', alt: 'Maldives', name: 'Maldives' },
  { id: 9, src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', alt: 'Santorini, Greece', name: 'Santorini, Greece' },
  { id: 10, src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800', alt: 'Kyoto, Japan', name: 'Kyoto, Japan' },
  { id: 11, src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800', alt: 'Paris, France', name: 'Paris, France' },
  { id: 12, src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', alt: 'Bali, Indonesia', name: 'Bali, Indonesia' },
  { id: 13, src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800', alt: 'New York, USA', name: 'New York, USA' },
  { id: 14, src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800', alt: 'Cape Town, South Africa', name: 'Cape Town, South Africa' },
  { id: 15, src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800', alt: 'Sydney, Australia', name: 'Sydney, Australia' },
  { id: 16, src: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800', alt: 'Venice, Italy', name: 'Venice, Italy' },
  { id: 17, src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800', alt: 'Rio de Janeiro, Brazil', name: 'Rio de Janeiro, Brazil' },
  { id: 18, src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', alt: 'Banff, Canada', name: 'Banff, Canada' },
  { id: 19, src: 'https://images.unsplash.com/photo-1462129487128-512a0e9150c7?w=800', alt: 'Machu Picchu, Peru', name: 'Machu Picchu, Peru' },
];

const Gallery = () => {
  const [modalImg, setModalImg] = useState(null);

  const handleImageClick = (img) => {
    setModalImg(img);
  };
  const closeModal = () => setModalImg(null);

  return (
    <div className="gallery-container" style={{ background: '#ffecd2', minHeight: '100vh' }}>
      <h1 className="gallery-title">Incredible Destinations Gallery</h1>
      <div className="gallery-grid">
        {images.map(image => (
          <div key={image.id} className="gallery-card" onClick={() => handleImageClick(image)} tabIndex={0}>
            <img src={image.src} className="gallery-image" alt={image.alt} />
            <div className="gallery-content">
              <h5 className="gallery-title-text">{image.name}</h5>
            </div>
          </div>
        ))}
      </div>
      {modalImg && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
            <img src={modalImg.src} alt={modalImg.alt} className="gallery-modal-img" />
            <div className="gallery-modal-caption">{modalImg.name}</div>
            <button className="gallery-modal-close" onClick={closeModal}>&times;</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery 