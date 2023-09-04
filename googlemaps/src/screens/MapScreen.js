import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapComponent from '../components/Map.js';
import MarkerListComponent from '../components/MarkerList.js';
import { getLocationAndMarkers } from '../services/GeolocationService.js';

export default function MapScreen() {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    getLocationAndMarkers(setRegion, setMarkers);
  }, []);

  return (
    <View style={styles.container}>
      <MapComponent region={region} markers={markers} />
      <MarkerListComponent markers={markers} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
