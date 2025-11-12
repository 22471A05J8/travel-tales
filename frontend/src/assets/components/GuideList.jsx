import React from "react";

const GuideList = ({ guides, onBooking }) => {
  if (guides.length === 0) {
    return (
      <div style={{ 
        textAlign: "center", 
        marginTop: "40px",
        padding: "40px",
        background: "#f8f9fa",
        borderRadius: "15px",
        border: "2px dashed #dee2e6"
      }}>
        <h3 style={{ color: "#6c757d", marginBottom: "10px" }}>No guides found</h3>
        <p style={{ color: "#6c757d" }}>Try adjusting your search criteria to find available guides</p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
      gap: "25px", 
      marginTop: "30px" 
    }}>
      {guides.map((guide, index) => (
        <div key={index} style={{
          border: "1px solid #e9ecef",
          padding: "20px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          cursor: "pointer",
          transition: "all 0.3s ease",
          background: "white",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
        }}
        >
          {/* Language Badge */}
          <div style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "#27ae60",
            color: "white",
            padding: "4px 12px",
            borderRadius: "15px",
            fontSize: "12px",
            fontWeight: "600",
            textTransform: "uppercase"
          }}>
            {guide.language}
          </div>

          <img
            src={guide.image}
            alt={guide.name}
            style={{ 
              width: "120px", 
              height: "120px", 
              borderRadius: "50%",
              border: "4px solid #f8f9fa",
              marginBottom: "15px"
            }}
          />
          
          <h3 style={{ 
            margin: "0 0 10px 0", 
            color: "#2c3e50",
            fontSize: "20px",
            fontWeight: "600"
          }}>
            {guide.name}
          </h3>
          
          <div style={{ marginBottom: "15px" }}>
            <p style={{ 
              margin: "5px 0", 
              color: "#6c757d",
              fontSize: "14px"
            }}>
              <strong>Phone:</strong> {guide.phone}
            </p>
            <p style={{ 
              margin: "5px 0", 
              color: "#6c757d",
              fontSize: "14px"
            }}>
              <strong>Route:</strong> {guide.source} → {guide.destination}
            </p>
          </div>

          <div style={{
            background: "#f8f9fa",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "20px"
          }}>
            <p style={{ 
              margin: "0", 
              fontSize: "24px", 
              fontWeight: "700", 
              color: "#27ae60"
            }}>
              ₹{guide.cost}
            </p>
            <p style={{ 
              margin: "5px 0 0 0", 
              fontSize: "12px", 
              color: "#6c757d"
            }}>
              per day
            </p>
          </div>

          <button 
            style={{
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              width: "100%",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 5px 15px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
            onClick={(e) => {
              e.stopPropagation();
              onBooking && onBooking(guide);
            }}
          >
            📞 Book This Guide
          </button>
        </div>
      ))}
    </div>
  );
};

export default GuideList;
