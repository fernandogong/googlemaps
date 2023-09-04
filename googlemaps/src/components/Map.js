import React from 'react';
import { Platform, PermissionsAndroid, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('screen');

export default function MapComponent({ region, markers, onPress }) {
  return (
    <MapView
      onMapReady={() => {
        Platform.OS === 'android' &&
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          )
          
      }}
      style={{ width, height }}
      region={region}
      zoomEnabled={true}
      showsUserLocation={true}
      loadingEnabled={true}
      onPress={onPress}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.key}
          coordinate={marker.coords}
          pinColor={marker.pinColor}
          title={marker.title}
          description={marker.description}
        />
      ))}
    </MapView>
  );
}