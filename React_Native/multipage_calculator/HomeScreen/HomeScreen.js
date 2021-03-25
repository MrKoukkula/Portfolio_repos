import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';

export default function HomeScreen({ navigation }) {

    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    const calculatePlus = () => {
        const resultString = (Number(value1) + Number(value2)).toString();
        setResult(resultString);
        const text = value1 + ' - ' + value2 + ' = ' + resultString;
        if (value1 === '' || value2 === '') {
            setValue1('');
            setValue2('');
            setResult('Missing a number');
            return;
        }
        setHistory([...history, { key: text }]);
        setValue1('');
        setValue2('');
    }

    const calculateMinus = () => {
        const resultString = (Number(value1) - Number(value2)).toString();
        setResult(resultString);
        const text = value1 + ' - ' + value2 + ' = ' + resultString;
        if (value1 === '' || value2 === '') {
            setValue1('');
            setValue2('');
            setResult('Missing a number');
            return;
        }
        setHistory([...history, { key: text}]);
        setValue1('');
        setValue2('');
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/favicon.png')} />
            <Text>Result: {result}</Text>
            <TextInput style={styles.input} value={value1} keyboardType={'numeric'} onChangeText={input => setValue1(input)} />
            <TextInput style={styles.input} value={value2} keyboardType={'numeric'} onChangeText={input => setValue2(input)} />
            <View style={{ flex: 0.2, width: '100%', alignItems: 'center', alignContent: 'flex-start', flexDirection: 'row', margin: 5, justifyContent: 'space-evenly' }}>
                <View style={{ flex: 0.2 }}>
                    <Button onPress={() => calculatePlus()} title="+" />
                </View>
                <View style={{ flex: 0.2 }}>
                    <Button onPress={() => calculateMinus()} title="-" />
                </View>
                <View style={{ flex: 0.2 }}>
                    <Button onPress={() => {
                        navigation.navigate('History', {history: history});
                    }} title="History" />
                </View>
            </View>
            
        </View>
    );
};

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