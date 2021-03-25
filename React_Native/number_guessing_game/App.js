import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function App() {

  const texts = {
    intro: 'Guess a number between 1-100',
    yourGuess: 'Your guess ',
    tooLow: ' is too low',
    tooHigh: ' is too high'
  }

  const [guesses, setGuesses] = useState(0);
  const [riddle, setRiddle] = useState(0);
  const [userGuess, setUserGuess] = useState(0);
  const [gameText, setGameText] = useState(texts.intro);

  const checkAnswer = () => {
    if (riddle === 0) {
      setRiddle(Math.floor(Math.random() * 100 ) + 1 );
    }

    if (userGuess == riddle) {
      Alert.alert('You guessed the correct number in '+ guesses + ' tries.')
      setRiddle(0);
      setGuesses(0);
      setGameText(texts.intro);
      return;
    }

    if (userGuess < riddle) {
      setGameText(texts.yourGuess + userGuess + texts.tooLow);
      setGuesses((guesses + 1))
    } else {
      setGameText(texts.yourGuess + userGuess + texts.tooHigh);
      setGuesses((guesses + 1))
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 15, fontSize: 15}}>{gameText}</Text>
      <TextInput style={styles.input} value={userGuess.toString()} keyboardType={'numeric'} onChangeText={input => setUserGuess(input)} />
      <View style={{flex:0.5}}>
          <Button onPress={() => checkAnswer()} title="Make a guess" />
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
