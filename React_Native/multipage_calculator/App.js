import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import HomeScreen from './HomeScreen/HomeScreen';
import HistoryScreen from './HistoryScreen/HistoryScreen'
import SettingScreen from './SettingScreen/SettingScreen';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={HomeScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

