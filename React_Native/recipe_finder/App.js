import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View, Image } from 'react-native';

export default function App() {

  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState("");

  const getrecipes = () => {
    fetch(`http://www.recipepuppy.com/api/?i=${ingredients}`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.results);
        console.log(data.results);
      })
      .catch(err => Alert.alert('Error', err))
  }

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <View style={styles.resultsChildren}>
        <FlatList style={{marginLeft: "5%"}} 
                  keyExtractor={item => item.id} 
  renderItem={({item}) => <View><Image style={styles.resultImage} source={{uri: item.thumbnail}}/><Text>{item.title}</Text></View>} 
                  data={recipes}/>
        </View>
      </View>
      <View style={styles.search}>
        <View style={styles.searchChildren}>
        <Text>Find by ingredients</Text>
          <TextInput placeholder="Ingredients" onChangeText={i => setIngredients(i)} style={styles.input} value={ingredients}/>
          <Button title="Find" onPress={getrecipes} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'powderblue'
  },

  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white'
  },

  results: {
    flex: 5,
    flexDirection: 'row',
    backgroundColor: 'lightblue'
  },

  resultsChildren: {
    flex: 1,
    flexDirection: 'column'
  },

  resultImage: {
    width: 50,
    height: 50
  },

  search: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'lightgray'
  },

  searchChildren: {
    flex: 1,
    flexDirection: 'column'
  },
});
