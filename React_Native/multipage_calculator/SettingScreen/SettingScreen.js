import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View ,Text} from'react-native';

export default function SettingScreen() {
    return(
        <View>
            <StatusBar hidden={true} />
            <Text>This is SettingScreen</Text>
        </View >
    );
};