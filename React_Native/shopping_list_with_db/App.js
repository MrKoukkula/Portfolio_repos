import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {

  const [text, setText] = useState("");
  const [amount, setAmount] = useState('');
  const [list, setList] = useState([]);
  const db = SQLite.openDatabase('coursedb.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists items(id integer primary key not null, amount int, name text);');
    }, null, updateList);
  }, [])

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from items;', [],(_, {rows}) => setList(rows._array));
    });
  }

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into items (amount, name) values (?, ?);', [parseInt(amount), text])
    }, null, updateList)
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql(`delete from items where id = ?;`, [id]);
    }, null, updateList)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden={true} />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
          <Text>Add an item to shopping list</Text>
          <TextInput
            value={text}
            placeholder='Add an item'
            style={styles.input}
            onChangeText={input => { setText(input) }} />
          <TextInput
            value={amount}
            placeholder='Add an amount'
            keyboardType='numeric'
            style={styles.input}
            onChangeText={input => { setAmount(input) }} />
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.3 }}>
              <Button title='Save' onPress={() => {
                saveItem();
                setText('');
                setAmount('');
              }} />
            </View>
          </View>

        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'lightblue'}}>
        <View style={{flex:1, alignItems: 'center', borderColor: 'grey', borderWidth: 1}}>
          <Text>Shopping list:</Text>
            <FlatList data={list} keyExtractor={item => item.id.toString()} renderItem={
              ({item}) => <View><Text>{item.name}, {item.amount.toString()} kpl/l</Text><Button title='delete' onPress={() => deleteItem(item.id)} /></View>} />
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
