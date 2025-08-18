import React from "react";

const ListingCard = ({ data, isSelected, onClick }) => {
  if (!data) return null;

  let imageUrl = "";

  // 1. If image is a base64 string from localStorage
  if (data.photos?.[0]?.startsWith("data:image")) {
    imageUrl = data.photos[0];
  }
  // 2. If image is a relative path from JSON (e.g., "images/image1.jpg")
  else if (data.photos?.[0]) {
    imageUrl = `/images/${data.photos[0]}`;
  }
  // 3. Fallback
  else {
    imageUrl = "/placeholder.jpg";
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-4 cursor-pointer border ${
        isSelected ? "border-blue-500" : "border-transparent"
      }`}
    >
      <img
        src={imageUrl}
        alt={data.name || "Property Image"}
        className="w-full h-48 object-cover rounded-md mb-2"
      />
      <h2 className="text-xl font-semibold">{data.name}</h2>
      <p className="text-gray-600">📍 {data.location}</p>
      <p className="text-gray-700">
        💰 <strong>Price:</strong> € {data.price}
      </p>
      <p className="text-gray-700">
      🚩 <strong>Purpose:</strong>{data.purpose}
      </p>
      <p className="text-gray-700">
        📏 <strong>Area:</strong> {data.area}
      </p>
    </div>
  );
};

export default ListingCard;
