import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import * as firebase from 'firebase';
import { Header, Input, Button, ListItem } from 'react-native-elements';

export default function App() {

  const [text, setText] = useState("");
  const [amount, setAmount] = useState('');
  const [list, setList] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyAbw_DsVlzP_9f8eJlOSt1FZqWdA7-NxbY",
    authDomain: "shopping-list-1b810.firebaseapp.com",
    databaseURL: "https://shopping-list-1b810.firebaseio.com",
    projectId: "shopping-list-1b810",
    storageBucket: "shopping-list-1b810.appspot.com",
    messagingSenderId: "760868310659",
    appId: "1:760868310659:web:7210932fbfa2b8f7e355b6"
  };
  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  
  useEffect(() => {
    firebase.database().ref('items/').on('value', snapshop => {
      const data = snapshop.val();
      if (data) {
        const prods = Object.entries(data);
        setList(prods);
      } else {
        setList('');
      }
      
    });
  }, []);

  const saveItem = () => {
    firebase.database()
      .ref('items/')
      .push(
        {'name': text, 'amount': amount}
    );
  }

  const deleteItem = (id) => {
    firebase.database()
    .ref(`items/${id}`).remove();
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden={true} />
      <Header centerComponent={{text: 'Shopping List', style:{color: '#fff'}}}/>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
          <Text>Add an item to shopping list</Text>
          <Input
            value={text}
            placeholder='Add an item'
            style={styles.input}
            onChangeText={input => { setText(input) }} 
            label='Item' />
          <Input
            value={amount}
            placeholder='Add an amount'
            keyboardType='numeric'
            style={styles.input}
            onChangeText={input => { setAmount(input) }} 
            label='Amount' />
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.3 }}>
              <Button title='Save' 
                raised
                icon={{name: 'save', color: '#fff'}}
                onPress={() => {
                  saveItem();
                  setText('');
                  setAmount('');
                }} />
            </View>
          </View>

        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, alignItems: 'center'}}>
        <Text>Shopping list:</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <FlatList data={list} keyExtractor={item => item[0]} renderItem={
              ({ item }) =>
                <ListItem bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{item[1].name}</ListItem.Title>
                    <ListItem.Subtitle>{item[1].amount}</ListItem.Subtitle>
                  </ListItem.Content>
                  <Button type='clear' icon={{name: 'delete', color: 'red'}} style={{color: 'f###'}} onPress={() => deleteItem(item[0])} />
                </ListItem>
            } />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // input: {
  //   height: 50, 
  //   width: 200,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  // },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
