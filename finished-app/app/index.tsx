import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { Link } from "expo-router";
import Header from '../components/Header';
import PostItem from '../components/PostItem';

type Post = {
    sender: string,
    body: string,
    handle: string,
    createdAt: Date
}

const renderItem = (item: {item: Post}) => <PostItem post={item.item} />

import { colors } from '../styles/constants'
import { addPost, loadPosts } from '../utils/store';

export default function Page({route}: {route: {params?: {post: Post}}}) {
  let [posts, setPosts] = useState([])
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular
  })

  useEffect(() => {
    loadPosts().then((loadedPosts) => {
      setPosts(loadedPosts);
    })
  }, [posts])

  if (!fontsLoaded) {
    return null;
  }
  if(route.params?.post) {
    const {post} = route.params
    route.params = undefined;
    addPost(post).then(() => {
      loadPosts().then((loadedPosts) => {
        setPosts(loadedPosts);
      })
    })
  }
  return (
    <View style={styles.container}>
      <Header label="Kind Words"></Header>
      <StatusBar style="auto" />
      <FlatList
      style={styles.list}
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item: Post, index: number ) => item.createdAt.toString()}
      />
      <Link href="/newPost">New Post</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text
  },
  list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%'
  },
});
