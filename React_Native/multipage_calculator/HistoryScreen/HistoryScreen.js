import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function HistoryScreen({route, navigation}) {
    const params = route.params.history;

    return(
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }}>
                <Text>History:</Text>
                <FlatList data={params} renderItem={({ item }) => <Text>{(item.key)}</Text>} />
            </View>
        </View >
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