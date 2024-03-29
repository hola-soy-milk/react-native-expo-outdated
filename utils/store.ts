import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '../components/PostItem';

const STORE_KEY = '@kind-words-react-native';

export const savePosts = async (posts: Post[]) => {
  await AsyncStorage.setItem(STORE_KEY, JSON.stringify(posts));
};

export const loadPosts = async () => {
  const json = await AsyncStorage.getItem(STORE_KEY);
  if (!json) {
    return [];
  }
  return JSON.parse(json);
};

export const addPost = async (post: Post) => {
  const posts = await loadPosts();
  posts.push(post);
  await savePosts(posts);
};
