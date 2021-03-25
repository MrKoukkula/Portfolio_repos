import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { LogBox, StyleSheet, Text, View, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { Header, Input, Button, ListItem, Image } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Dimensions } from 'react-native';

export default function FullPic({ route, navigation}) {

  const [url, setUrl] = useState(route.params.url);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image 
        style={{flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height}} 
        source={{uri: url}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
