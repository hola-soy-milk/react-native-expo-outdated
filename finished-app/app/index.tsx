import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { Link } from "expo-router";
import Header from '../components/Header';
import PostItem from '../components/PostItem';
import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type NativeStackParams = {
  index: {post: Post};
};

type Post = {
    sender: string,
    body: string,
    handle: string,
    createdAt: Date
}

const renderItem = (item: {item: Post}) => <PostItem post={item.item} />

import { colors } from '../styles/constants'
import { addPost, loadPosts } from '../utils/store';

export default function Page({
  navigation,
  route,
}: NativeStackScreenProps<NativeStackParams, 'index'>) {
  let [posts, setPosts] = useState<Post[]>([])
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular
  })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(route.params?.post) {
      const post: Post = route.params?.post;
        addPost(post).then(() => {
          loadPosts().then((loadedPosts) => {
            setPosts(loadedPosts);
          })
        })
    }
      });
    loadPosts().then((loadedPosts) => {
      setPosts(loadedPosts);
    })

    return unsubscribe;
  }, [posts])


  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Header label="Kind Words"></Header>
      <StatusBar style="auto" />
      <FlatList
      style={styles.list}
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item: Post) => item?.createdAt?.toString()}
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
