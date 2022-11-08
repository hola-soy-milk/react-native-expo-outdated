import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import PostItem, { Post } from '../components/PostItem';
import { colors } from '../styles/constants';
import { addPost, loadPosts } from '../utils/store';

export type NativeStackParams = {
  index: { post?: Post } | undefined;
  'new-post': undefined;
};

const renderItem = (item: { item: Post }) => <PostItem post={item.item} />;

export default function Index({
  navigation,
  route,
}: NativeStackScreenProps<NativeStackParams, 'index'>) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  useEffect(() => {
    async function loadInitialData() {
      const loadedPosts = await loadPosts();
      setPosts(loadedPosts);
    }
    loadInitialData().catch(() => {
      console.error('Failed to load initial data');
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      if (route.params?.post) {
        await addPost(route.params.post);
        const loadedPosts = await loadPosts();
        setPosts(loadedPosts);
      }
    });

    return unsubscribe;
  }, [posts, navigation, route.params?.post]);

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
        keyExtractor={(item: Post) => item.createdAt.toString()}
      />
      <Link href="/new-post">New Post</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
  },
  list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
});
