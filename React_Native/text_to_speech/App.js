import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

  const [text, setText] = useState('');

  const translate = () => {
    Speech.speak(text);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden={true} />
      <Text>Insert text</Text>
      <TextInput value={text} onChangeText={input => setText(input)} style={styles.input}/>
      <Button title='click to hear speech' onPress={translate} />
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
