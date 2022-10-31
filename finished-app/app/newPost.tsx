import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header'
import { colors } from '../styles/constants';
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

export default function Page({ navigation }: any) {
  const [sender, onChangeSender] = useState("Ramon");
  const [body, onChangeBody] = useState("Test");
  const [handle, onChangeHandle] = useState("Hello");
  let [fontsLoaded] = useFonts({
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
        onChangeText={onChangeSender}
        placeholder="Sender"
        value={sender}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeBody}
        placeholder="Body"
        value={body}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeHandle}
        placeholder="Handle"
        value={handle}
      />
      </View>
      <Button
        title="Add"
        onPress={() => {
      navigation.navigate({
            name: "index",
            params: { post: {
            sender,
            handle,
            body,
            createdAt: new Date(),
          } },
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