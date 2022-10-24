import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Header from '../components/Header'
import { colors } from '../styles/constants';
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

export default function Page({ navigation }) {
  const [sender, onChangeSender] = useState("");
  const [body, onChangeBody] = useState("");
  const [handle, onChangeHandle] = useState("");
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Header label="New Post" />
      <StatusBar
        backgroundColor={colors.cardBackground}
        translucent={true}
        style="dark"
      />
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
