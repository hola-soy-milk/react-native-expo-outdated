import {useState} from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import {colors} from  '../..//styles/constants';
import { StatusBar } from 'expo-status-bar';
import Header from '../Header';

export default ({ route, navigation }) => {
  const [sender, onChangeSender] = useState("");
  const [body, onChangeBody] = useState("");
  const [handle, onChangeHandle] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.cardBackground}
        translucent={true}
        style="dark"
      />
      <Header label="New Post" />
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
          route.params.onNewPost({
            sender,
            handle,
            body,
            createdAt: new Date(),
          })
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: colors.cardBackground,
    borderColor: colors.cardShadow,
    padding: 10,
  },
  container: {
    height: "100%",
    backgroundColor: colors.background,
  },
});
