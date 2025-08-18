import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const FitBoundsOnMarkers = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = locations.map((loc) => [loc.lat, loc.lon]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
};

const MapComponent = ({ selectedProperties = [], onMarkerClick }) => {
  const [locations, setLocations] = useState([]);
  const geocodeCache = useRef({});

  useEffect(() => {
    if (selectedProperties.length > 0) {
      fetchCoordinates(selectedProperties);
    } else {
      setLocations([]);
    }
  }, [selectedProperties]);

  const fetchCoordinates = async (data) => {
    const updatedLocations = await Promise.all(
      data.map(async (property) => {
        if (!property.location) return null; // guard

        // Check cache first
        if (geocodeCache.current[property.location]) {
          return { ...property, ...geocodeCache.current[property.location] };
        }

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${property.location}`
          );
          const results = await response.json();
          if (results.length > 0) {
            const coords = {
              lat: parseFloat(results[0].lat),
              lon: parseFloat(results[0].lon),
            };
            geocodeCache.current[property.location] = coords;
            return { ...property, ...coords };
          }
          return null;
        } catch (error) {
          console.error("Geocoding error:", error);
          return null;
        }
      })
    );

    setLocations(updatedLocations.filter(Boolean));
  };

  return (
    <MapContainer
      center={[17.385, 78.4867]}
      zoom={10}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Auto-fit map to markers */}
      <FitBoundsOnMarkers locations={locations} />

      {locations.map((loc, idx) => (
        <Marker
          key={idx}
          position={[loc.lat, loc.lon]}
          eventHandlers={{
            click: () => onMarkerClick(loc, idx),
          }}
        >
          <Popup>
            <div>
              <strong>{loc.name}</strong>
              <br />
              Type: {loc.propertyType}
              <br />
              Purpose: {loc.purpose}
              <br />
              Area: {loc.area}
              <br />
              Price: ₹{loc.price}
              <br />
              <a
                href={`https://www.google.com/maps?q=${loc.lat},${loc.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                View on Maps
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
