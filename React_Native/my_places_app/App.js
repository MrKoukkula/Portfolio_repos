import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './HomeScreen/HomeScreen';
import MapScreen from './MapScreen/MapScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native' 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='My Places' component={HomeScreen} />
        <Stack.Screen name='Map' component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

