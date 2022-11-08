import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/constants';

export type Post = {
  sender: string;
  body: string;
  handle: string;
  /** Serialized via new Date().toString() to pass via navigation parameters */
  createdAt: string;
};

type Props = {
  post: Post;
};

export default function PostItem({ post }: Props) {
  const { sender, body, handle, createdAt } = post;
  const createdAtDate = new Date(createdAt);
  return (
    <View style={styles.card}>
      <Text>
        {sender}: {handle}
      </Text>
      <Text style={styles.center}>{body}</Text>
      <Text style={styles.right}>
        {
          // Avoid using toLocaleDateString or toLocaleString because
          // Android doesn't support
          // https://stackoverflow.com/questions/51399551/why-isnt-tolocaledatestring-working-in-react-native-android
          [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ][createdAtDate.getMonth()]
        }{' '}
        {createdAtDate.getDate()}, {createdAtDate.getFullYear()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  right: {
    textAlign: 'right',
  },
  center: {
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.cardBackground,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 30,
    marginBottom: 30,
    borderColor: colors.cardShadow,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    textAlign: 'left',
  },
});
