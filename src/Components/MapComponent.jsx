import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon for user location
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -30],
});

// Component to auto-fit map bounds to markers + user location
const FitBoundsOnMarkers = ({ locations, userLocation }) => {
  const map = useMap();

  useEffect(() => {
    const bounds = [];

    if (locations.length > 0) {
      bounds.push(...locations.map((loc) => [loc.lat, loc.lon]));
    }
    if (userLocation) {
      bounds.push([userLocation.lat, userLocation.lon]);
    }

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, userLocation, map]);

  return null;
};

const MapComponent = ({ selectedProperties = [], onMarkerClick }) => {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const geocodeCache = useRef({});

  useEffect(() => {
    if (selectedProperties.length > 0) {
      fetchCoordinates(selectedProperties);
    } else {
      setLocations([]);
    }
  }, [selectedProperties]);

  // Fetch user location from browser
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("User location access denied:", err.message);
        }
      );
    }
  }, []);

  const fetchCoordinates = async (data) => {
    const updatedLocations = await Promise.all(
      data.map(async (property) => {
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
      center={[17.385, 78.4867]} // Default center (Hyderabad coords here)
      zoom={10}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Auto-fit map to markers + user location */}
      <FitBoundsOnMarkers locations={locations} userLocation={userLocation} />

      {/* Property markers */}
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

      {/* User location marker */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
          <Popup>
            <strong>You are here</strong>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
