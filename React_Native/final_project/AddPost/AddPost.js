import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { LogBox, StyleSheet, Text, View, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { Header, Input, Button, ListItem, Image } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Dimensions } from 'react-native';

export default function AppPost({navigation}) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [hasCameraPermission, setPermission] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');

  const camera = useRef(null);
  const storage = firebase.storage();
  const storageRef = storage.ref();

  const saveItem = () => {
    uploadImage(photoName, '_' + title)
      .then(result => {
        console.log('successful upload');
        console.log(result.ref);
        return result.ref.getDownloadURL()
      }).then(x => {
        firebase
          .database()
          .ref('posts/')
          .push(
            {
              title: title, 
              url: x,
              date: Date.now(),
              description: description
            }
          )
      }).catch(err => console.log(err))
  }

  const uploadImage = async (uri, name) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = storageRef.child('images/'+name);
    return ref.put(blob)
  }

  useEffect(() => {
    askCameraPermission();
  }, [])

  const askCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setPermission(status === 'granted');
  }

  const snap = async () => {
    if (camera && photoBase64 === '', photoName === '') {
      const photo = await camera.current.takePictureAsync({base64: true});
      setPhotoName(photo.uri);
      setPhotoBase64(photo.base64);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header centerComponent={{text: 'My Photo Album', style:{color: '#fff'}}} />
      { hasCameraPermission ? (
        <View style={{flex: 2, flexDirection: 'row'}}>
            { (photoName === '') ? (
              <View style={{flex: 1}}>
                <Camera style={{ flex: 1}} ref={camera} />
                <Button title='Take a photo' onPress={snap} />
              </View>
            ) : (
              <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Image 
                    style={{flex: 1, width: Dimensions.get('window').width}} 
                    source={{uri: photoName}} />
                </View>
                
                <Button title='Take another' onPress={() => {
                  setPhotoBase64('');
                  setPhotoName('');
                  snap();
                }} />
              </View>
            )
            }
        </View>
      ) : (
        <Text>No camera permission</Text>
      )}
      
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>Add a new post:</Text>
            <Input
              value={title}
              placeholder='Add a title'
              onChangeText={(input) => setTitle(input)}
              label='Post title'
            />
            <Input
              value={description}
              placeholder='Add a description'
              onChangeText={(input) => setDescription(input)}
              label='Post title'
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button title='Post' onPress={() => {
              saveItem();
              setPhotoName('');
              setPhotoBase64('');
              setTitle('');
              setDescription('');
              navigation.navigate('Home');
            }} />
          </View>
        </ScrollView>
      </View>
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
