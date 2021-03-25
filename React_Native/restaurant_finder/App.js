import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import keys from './keys';

export default function App() {

  const [address, setAddress] = useState('');
  const [markerTitle, setMarkerTitle] = useState('Haaga-Helia');
  const [location, setLatLong] = useState({lat:60.200692, lon:24.934302});
  const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
  })
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);

  const findLocation = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${keys.mapkey}&location=${address}, Finland`)
    .then(x => x.json())
    .then(locationResult => {
      const data = locationResult.results[0].locations[0];
      setLatLong({lat: data.latLng.lat, lon: data.latLng.lng});
      setRegion({
        latitude: data.latLng.lat,
        longitude: data.latLng.lng,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      })
      setMarkerTitle(data.street)
    }).then(() => {
      findNearby();
    }).catch(err => Alert.alert('err', err));
  }

  const findNearby = () => {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lon}&radius=450&type=restaurant&key=${keys.googleApi}`)
    .then(x => x.json())
    .then(restaurants => {
      setNearbyRestaurants(restaurants.results);
    }).catch(err => Alert.alert('err', err));
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{flex: 2, flexDirection: 'row'}}>
        <MapView style={{flex: 1}} 
          initialRegion={region} 
          region={region} 
          onRegionChangeComplete={region => setRegion(region)}>
            {nearbyRestaurants.map((marker, index) => (
              <Marker key={marker.place_id} coordinate={{
                  latitude: marker.geometry.location.lat,
                  longitude: marker.geometry.location.lng
                }} title={marker.name} />
            ))
            }
        </MapView>
      </View>
      <View style={{flex: 1, flexDirection: 'row', marginTop: 15, }}>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          <Text>Find a restaurants near an address:</Text>
          <TextInput style={styles.input} onChangeText={input => setAddress(input)} value={address}/>
          <View style={{marginTop: 15, width: 50}}>
            <Button title='Go!' onPress={() => findLocation()}/>
          </View>
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50, 
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
