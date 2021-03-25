import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import keys from '../keys';

export default function MapScreen({route, navigation}) {
  const params = route.params.address;

  const [address, setAddress] = useState('');
  const [markerTitle, setMarkerTitle] = useState('');
  const [location, setLatLng] = useState({lat:60.200692, lng:24.934302});
  const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
  })

  const findLocation = (params) => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${keys.mapkey}&location=${params}`)
    .then(x => x.json())
    .then(locationResult => {
      const data = locationResult.results[0].locations[0];
      if (data) {
        setLatLng({lat: data.latLng.lat, lng: data.latLng.lng});
        setRegion({
          latitude: data.latLng.lat,
          longitude: data.latLng.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        })
        setMarkerTitle(data.street)
      }
      
    })
  }

  useEffect(() => {
    setAddress(params)
    findLocation(params);
  }, []) 

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <MapView style={{ flex: 1 }}
          initialRegion={region}
          region={region}
          onRegionChangeComplete={region => setRegion(region)}>
          <Marker coordinate={{
            latitude: location.lat,
            longitude: location.lng
          }} title={markerTitle} />
        </MapView>
      </View>
      <Button title='Show' onPress={() => findLocation(address)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
