import Geolocation from '@react-native-community/geolocation';

export async function getLocationAndMarkers(setRegion, setMarkers) {
  const watchId = Geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      getNearbyPlaces(latitude, longitude, setMarkers);
    },
    (error) => {
      console.error('Erro ao obter a localização atual:', error);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 20,
    }
  );

  return () => {
    Geolocation.clearWatch(watchId);
  };
}

async function getNearbyPlaces(latitude, longitude, setMarkers) {
  try {
    const radius = 200;
    const apiKey = 'AIzaSyAPHesJOr83ohWKT1K3NvIjoPQFBJjDGE8';
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const newMarkers = data.results.map((place, index) => ({
      key: index,
      coords: {
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      },
      pinColor: '#FF0000',
      title: place.name,
      description: place.vicinity,
    }));

    setMarkers(newMarkers);
  } catch (error) {
    console.error('Erro ao buscar lugares próximos:', error);
  }
}
