import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  return (
    <View style={styles.container}>
      <Text>Shopping list:</Text>
      <TextInput style={styles.input} value={input} onChangeText={(text) => setInput(text)}/>
      <View style={{flex: 0.2 ,width: '100%', alignItems:'center', alignContent:'center', flexDirection:'row', margin: 5, justifyContent: 'center'}}>
        <View style={{flex:0.2}}>
          <Button onPress={() => setList([...list, {id: list.length, name: input}])} title="Add" />
        </View>
        <View style={{flex:0.2}}>
          <Button onPress={() => setList([])} title="Clear" />
        </View>
      </View>

    <View style={{flex: 0.5, borderColor:'gray', borderWidth:1, width: '50%'}}>
      <Text>Shopping list:</Text>
      <FlatList data={list} renderItem={({item}) => <Text>{item.name}</Text>} />
    </View>
    
    </View>
    
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 200
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
