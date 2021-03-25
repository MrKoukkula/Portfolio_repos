import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { LogBox, StyleSheet, Text, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import * as firebase from 'firebase';
import { Header, Input, Button, ListItem, Image, Card } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen({navigation}) {

  const [posts, setPosts] = useState([]);
  const postWidth = Dimensions.get('window').width;
  const postHeight = Dimensions.get('window').height;

  useEffect(() => {
    
    firebase.database().ref('posts/').on('value', snapshop => {
      console.log('fetching posts...');
      const data = snapshop.val();
      if (data) {
        const items = Object.entries(data);
        items.sort((a,b) => b[1].date - a[1].date);
        setPosts(items);
      } else {
        setPosts([]);
      }
    });
  }, []);

  const deletePost = (id) => {
    firebase.database()
    .ref(`posts/${id}`).remove();
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{marginTop: 15, marginBottom: 15}}>These are the newest posts</Text>
      <View style={{ flex: 1, flexDirection: 'row'}}>
        <ScrollView style={{flex: 1}}>
        { posts.map((post, i) => (
          <View>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Full size picture', {url: post[1].url})} 
              onLongPress={() => {
                Alert.alert('Deleting post', 'Are you sure you want to delete this post?', [
                  {
                    text: 'Yes!',
                    onPress: () => deletePost(post[0])
                  },
                  {
                    text: 'Please no!'
                  }
                ]);
              }}>
              <Card>
                <Card.Title>{post[1].title}</Card.Title>
                <Card.Divider />
                <Card.Image source={{ uri: post[1].url }} />
                <Text>{post[1].description}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          
          
        ))
      }
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
