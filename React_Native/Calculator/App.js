import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, Image } from 'react-native';

export default function App() {

  const [value1, setValue1] = useState('0');
  const [value2, setValue2] = useState('0');
  const [result, setResult] = useState('0');

  return (
    <View style={styles.container}>
      <Image source={require('./assets/favicon.png')} />
      <Text>Result: {result}</Text>
      <TextInput style={styles.input} value={value1} keyboardType={'numeric'} onChangeText={input => setValue1(input)}/>
      <TextInput style={styles.input} value={value2} keyboardType={'numeric'} onChangeText={input => setValue2(input)}/>
      <View style={{width: '100%', alignItems:'center', alignContent:'flex-start', flexDirection:'row', margin: 5, justifyContent: 'space-evenly'}}>
        <View style={{flex:0.2}}>
          <Button onPress={() => setResult((Number(value1) + Number(value2)))} title="+" />
        </View>
        <View style={{flex:0.2}}>
          <Button onPress={() => setResult((Number(value1) - Number(value2)))} title="-" />
        </View>
        
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
