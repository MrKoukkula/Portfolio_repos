import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      });

      if (data.length > 0) {
        const filteredList = data.filter(c => c.phoneNumbers);
        setContacts(filteredList);
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden={true} />
      <Text>Contacts:</Text>
      <FlatList data={contacts} renderItem={({item}) => <Text>{item.name}, {item.phoneNumbers[0].number}</Text>} />
      <Button title='Get Contacts' onPress={getContacts} />
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
