import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen/HomeScreen';
import AddPost from './AddPost/AddPost';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import FullPic from './FullPic/FullPic';
LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();

export default function App() {

  // Your web app's Firebase configuration. NOTE: DOES NOT EXIST ANYMORE AND IS ONLY HERE AS AN EXAMPLE
  var firebaseConfig = {
    apiKey: "AIzaSyAaehDvNawuXz1deXBDKzmMYcZyowCffXg",
    authDomain: "hh-final-project.firebaseapp.com",
    databaseURL: "https://hh-final-project.firebaseio.com",
    projectId: "hh-final-project",
    storageBucket: "hh-final-project.appspot.com",
    messagingSenderId: "777138862443",
    appId: "1:777138862443:web:fb43ea1bc3bd32581d742e"
  };
  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const HomeStack = createStackNavigator();

  const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="My tiny social media" component={HomeScreen} />
        <HomeStack.Screen name="Full size picture" component={FullPic} />
      </HomeStack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'md-home'
          } else if (route.name === 'Add post') {
            iconName = 'md-add-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />
        }
      })} >
        <Tab.Screen name='Home' component={HomeStackScreen} />
        <Tab.Screen name='Add post' component={AddPost} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

