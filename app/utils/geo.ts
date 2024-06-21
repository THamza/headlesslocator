const cities = [
  { name: "CityName", lat: 51.5074, lng: -0.1278 }, // Add more cities with their coordinates
];

export const findClosestCity = (latitude: number, longitude: number) => {
  let closestCity = cities[0];
  let minDistance = Number.MAX_VALUE;

  for (const city of cities) {
    const distance = Math.sqrt(
      Math.pow(city.lat - latitude, 2) + Math.pow(city.lng - longitude, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  }

  return closestCity.name;
};
