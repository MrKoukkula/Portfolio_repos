import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, TextInput, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {

  const [euros, setEuros] = useState('0');
  const [amount, setAmount] = useState('');
  const [state, setState] = useState('');
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = () => {
      fetch(`https://api.exchangeratesapi.io/latest`)
        .then(x => x.json())
        .then(data => {
          let arr = Object.keys(data.rates);
          let newValues = [];
          arr.forEach(el => {
            let x = {key: el, value: data.rates[el]}
            newValues.push(x);
          });
          setCurrencies(newValues);
          setState(newValues[0].key);
        })
        .catch(err => Alert.alert('Error', err))
    }

    fetchCurrencies();
  }, [setCurrencies]) 

  const calculateEuros = () => {
    let y = currencies.find(c => c.key == state);
    let x = (amount / y.value).toFixed(2);
    setEuros(x.toString());
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{flex: 3, flexDirection: 'row',}}>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Image style={{width: 200, height: 250}} source={{uri: "https://e7.pngegg.com/pngimages/676/52/png-clipart-cartoon-money-bag-money-bag-united-states-dollar-recreation.png"}} />
          <Text>Euro Converter</Text>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{fontSize: 25}}>{euros} €</Text>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <TextInput 
            style={styles.input} 
            value={amount.toString()} 
            onChangeText={(value) => setAmount(Number(value))} 
            keyboardType={'numeric'}
            />
          <Picker 
            selectedValue={state.currency}
            style={{ height: 50, width: 100, borderColor: 'gray', borderWidth: 1 }}
            onValueChange={(value, index) => setState(value)}>
            {currencies.map(item => {
              return <Picker.Item label={item.key} value={item.key} key={item.key}/>
            })}
          </Picker>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          <Button title="Convert" onPress={() => calculateEuros()}></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50, 
    width: 100,
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
