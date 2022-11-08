import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Header from '../components/Header';
import { colors } from '../styles/constants';

type NativeStackParams = {
  index: {post: Post}
};

type Post = {
  sender: string,
  body: string,
  handle: string,
  createdAt: Date
}

export default function Page({
  navigation,
}: NativeStackScreenProps<NativeStackParams, 'index'>) {
  const [sender, setSender] = useState("Ramon");
  const [body, setBody] = useState("Test");
  const [handle, setHandle] = useState("Hello");
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <Header label="New Post" />
      <StatusBar
        backgroundColor={colors.cardBackground}
        translucent={true}
        style="dark"
      />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={setSender}
          placeholder="Sender"
          value={sender}
        />
        <TextInput
          style={styles.input}
          onChangeText={setBody}
          placeholder="Body"
          value={body}
        />
        <TextInput
          style={styles.input}
          onChangeText={setHandle}
          placeholder="Handle"
          value={handle}
        />
      </View>
      <Button
        title="Add"
        onPress={() => {
          navigation.navigate({
            name: "index",
            params: {
              post: {
                sender,
                handle,
                body,
                createdAt: new Date(),
              }
            },
            merge: true,
          });
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%'
  },
  form: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: colors.cardBackground
  }
});
