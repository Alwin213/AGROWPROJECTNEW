export async function geocodeLocation(locationName) {
  const encodedLocation = encodeURIComponent(locationName);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedLocation}&format=json&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ThoramamidiPrudhviRajApp/1.0 (tprudhviraj22@gmail.com)',
        'Accept-Language': 'en',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch geolocation: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.length === 0) {
      throw new Error('No coordinates found for this location');
    }

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}
