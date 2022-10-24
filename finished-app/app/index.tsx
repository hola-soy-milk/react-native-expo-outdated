import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import Header from '../components/Header'
import PostItem from '../components/PostItem'
import { colors } from '../styles/constants';
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import {Link } from 'expo-router'
import {loadPosts, addPost} from '../utils/store'

const renderItem = item => <PostItem key={item.createdAt} post={item.item} />

export default function Page({navigation, route}) {
const [posts, setPosts] = useState([]);
  useEffect(() => {
    loadPosts().then((loadedPosts) => {
      if (loadedPosts) {
        setPosts(loadedPosts);
      }
    });
  });
  if(route.params?.post) {
    const {post} = route.params
    route.params = undefined;
    addPost(post).then(() => {
      loadPosts().then(loadedPosts => {
        setPosts(loadedPosts);
      })
    })
  };
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Header label="Kind Words" />
      <StatusBar style="auto" />
      <FlatList
        style={styles.list}
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.body}
      />
      <Link href={{
        pathname: "/newPost",
        }}>New Post</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%'
  },
});
