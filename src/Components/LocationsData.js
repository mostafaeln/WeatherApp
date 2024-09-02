export const cities = [
    { name: 'Cairo,EG', lat: 30.0444, lon: 31.2357, added: false },
    //{ name: 'Obour City,EG', lat: 30.2321, lon: 31.4697, added: false },
    { name: 'Qaluybia,EG', lat: 30.2947, lon: 31.2156, added: false },
    { name: 'Alexandria,EG', lat: 31.2156, lon: 29.9553, added: false },
    { name: 'Giza,EG', lat: 30.0131, lon: 31.2089, added: false },
    { name: 'Sharm El Sheikh,EG', lat: 27.9158, lon: 34.3299, added: false },
    { name: 'Luxor,EG', lat: 25.6872, lon: 32.6396, added: false },
    { name: 'New York,US', lat: 40.7128, lon: -74.0060, added: false },
    { name: 'Los Angeles,US', lat: 34.0522, lon: -118.2437, added: false },
    { name: 'Toronto,CA', lat: 43.6510, lon: -79.3470, added: false },
    { name: 'London,GB', lat: 51.5074, lon: -0.1278, added: false },
    { name: 'Paris,FR', lat: 48.8566, lon: 2.3522, added: false },
    { name: 'Berlin,DE', lat: 52.5200, lon: 13.4050, added: false },
    { name: 'Madrid,ES', lat: 40.4168, lon: -3.7038, added: false },
    { name: 'Rome,IT', lat: 41.9028, lon: 12.4964, added: false },
    { name: 'Sydney,AU', lat: -33.8688, lon: 151.2093, added: false },
    { name: 'Tokyo,JP', lat: 35.6762, lon: 139.6503, added: false },
    { name: 'Seoul,KR', lat: 37.5665, lon: 126.9780, added: false },
    { name: 'Shanghai,CN', lat: 31.2304, lon: 121.4737, added: false },
    { name: 'Mumbai,IN', lat: 19.0760, lon: 72.8777, added: false },
    { name: 'São Paulo,BR', lat: -23.5505, lon: -46.6333, added: false },
    { name: 'Buenos Aires,AR', lat: -34.6037, lon: -58.3816, added: false },
    { name: 'Lima,PE', lat: -12.0464, lon: -77.0428, added: false },
    { name: 'Mexico City,MX', lat: 19.4326, lon: -99.1332, added: false },
    { name: 'Istanbul,TR', lat: 41.0082, lon: 28.9784, added: false },
    { name: 'Dubai,AE', lat: 25.2769, lon: 55.2962, added: false },
    { name: 'Johannesburg,ZA', lat: -26.2041, lon: 28.0473, added: false },
    { name: 'Cape Town,ZA', lat: -33.9249, lon: 18.4241, added: false },
    { name: 'Nairobi,KE', lat: -1.2864, lon: 36.8172, added: false },
    { name: 'Lagos,NG', lat: 6.5244, lon: 3.3792, added: false },
    { name: 'Kuala Lumpur,MY', lat: 3.139, lon: 101.6869, added: false },
    { name: 'Singapore,SG', lat: 1.3521, lon: 103.8198, added: false }
];

  

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
  
    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance;
  };
 export const findNearestCity = (userLat, userLon) => {
    let nearestCity = cities[0];
    let minDistance = getDistance(userLat, userLon, cities[0].lat, cities[0].lon);
  
    cities.forEach((city) => {
      const distance = getDistance(userLat, userLon, city.lat, city.lon);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
      }
    });
  
    return nearestCity.name;
  };
 
    