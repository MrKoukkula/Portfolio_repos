import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Input, Button, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

export default function HomeScreen({ navigation }) {

  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyANFa4m7ceItUMIgtJf2594RDLCmgCL-AE",
    authDomain: "my-places-app-9e16e.firebaseapp.com",
    databaseURL: "https://my-places-app-9e16e.firebaseio.com",
    projectId: "my-places-app-9e16e",
    storageBucket: "my-places-app-9e16e.appspot.com",
    messagingSenderId: "40159250961",
    appId: "1:40159250961:web:72563efe296989ee9dffb0"
  };
  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    firebase.database().ref('addresses/').on('value', snapshop => {
      const data = snapshop.val();
      if (data) {
        const addr = Object.entries(data);
        setAddresses(addr);
      } else {
        setList([]);
      }
    });
  }, []);

  const saveItem = () => {
    firebase.database()
      .ref('addresses/')
      .push(address);
  }

  const deleteAddress = (id) => {
    firebase.database()
    .ref(`addresses/${id}`).remove();
  }

	return (
		<View style={styles.container}>
			<View style={{ flex: 1, flexDirection: "row", marginTop: 15 }}>
				<View style={{ flex: 1 }}>
					<Input
						value={address}
						placeholder='Type in address'
            onChangeText={(input) => setAddress(input)}
            label='PLACEFINDER'
					/>
          <Button 
            title='Save' 
            raised 
            icon={{name: 'save', color: '#fff'}} 
            buttonStyle={{backgroundColor: 'grey'}}
            containerStyle={{marginLeft: 10, marginRight: 10, marginBottom: 10}} 
            onPress={() => {
              saveItem();
              setAddress('');
            }}
          />
          <FlatList 
            data={addresses}
            keyExtractor={a => a[0]}
            renderItem={
              ({item}) => 
                <ListItem 
                  key={item[0]}
                  topDivider 
                  bottomDivider 
                  onPress={() => navigation.navigate('Map', {address: item[1]})}
                  onLongPress={() => deleteAddress(item[0])}
                  >
                    <ListItem.Content style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <ListItem.Title>{item[1]}</ListItem.Title>
                      <ListItem.Subtitle>Show on map</ListItem.Subtitle>
                    </ListItem.Content>
                  <ListItem.Chevron color='gray' />
                </ListItem>
            }
          />
				</View>
			</View>

			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
