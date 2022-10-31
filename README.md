# Let's learn React Native/Expo!

## 💻 [bit.ly/ul-rn-expo](https://bit.ly/ul-rn-expo)

<div style="display:flex;">
<img src="https://user-images.githubusercontent.com/656318/155584657-9c36c352-e0bb-41c0-9c8b-ba11c0cdd509.png" alt="Screenshot showing Kind Words app with empty list" width="150"/> 
<img src="https://user-images.githubusercontent.com/656318/155584776-18683ba8-ac28-490d-984e-da040cd5829b.png" alt="Screenshot showing Kind Words app with new Post form" width="150"/> 
<img src="https://user-images.githubusercontent.com/656318/155584871-77d2f3f3-a0fb-486d-91c9-d693140071ed.png" alt="Screenshot showing Kind Words app with populated list" width="150"/> 
</div>

## 💜 Hi, I'm Ramón!

I'm on Twitter [@hola_soy_milk](https://twitter.com/hola_soy_milk), if you wanna get in touch!

Developer Relations, developer educator, inclusivity advocate. Over a decade of Software Engineering experience.

Originally from 🇨🇱.

## 🧰 Requirements

You should already have everything needed installed, but just in case, you can install Expo and Expo Go with these steps:
    
    npm install --global expo-cli

On your mobile, install [Expo Go](https://expo.dev/expo-go).

## ✨ Start up the project

First, create a GitHub repository called `kind-words-react-native` and copy the URL to clone the repo.

Then, once you have this, clone it into a new folder in your projects directory and init a new Expo app:

    cd projects
    git clone <url you copied>
    cd kind-words-react-native
    expo init .
    
We're making a blank app (first option):

<img width="773" alt="Screenshot of the terminal with the option selected: blank (TypeScript)  same as blank but with TypeScript configuration" src="https://user-images.githubusercontent.com/656318/197562395-dd921c70-3162-4974-8924-e1f4b08c71d8.png">

First, let's take a look inside `package.json`:

```json
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject"
  },
```

Let's start up the app with `yarn start`. Our terminal will look like this:

<img width="591" alt="Screenshot of the terminal with the output of the running expo app, showing a QR code and other options for running the app" src="https://user-images.githubusercontent.com/656318/154859709-218225ba-df09-46b8-ab2e-4f7e369e9391.png">

With this running, you can scan the QR code on your device, and it will open in Expo Go.

## ✌️ Our `app.json` file

Notable options:

- `name`: Name of our app
- `slug`: URL-friendly code
- `version`: Version shown in the stores
- `orientation`: Which screen orientation is supported
- `icon`: App icon image
- `splash`: Settings for the screen shown while the app is loading
- `updates`: Configuration for hot-reloading
- `assetBundlePatterns`: Which files and assets to include
- `ios`: iOS-specific configuration
- `android`: Android-specific configuration
- `web`: Web-specific configuration

Let's set the background color of the splash screen and Android adaptive icon to be `"#f0e5cf"`.

## 🚶 First steps: the `styles` CSS object inside `./App.tsx`

> 🤔 Notice the naming style of CSS props in React Native

- Change the background color of the main view to `"#f0e5cf"`
- Change the text color to `"#3f3e41"` by creating a separate `text` object in the styles
- Let's extract `./styles/constants.ts` that exports a `colors` object with:

```typescript
export const colors = {
    background: "#f0e5cf",
    text: "#3f3e41",
    cardShadow: "#bfa2db",
    cardBackground: "#f0d9ff",
}
```

Apply those colors!

## ✍️ The `<Text>` component

Let's change the contents to "Kind Words"! It's just like React.

## 🗣️ Creating a `<Header>` component

Let's have a header at the top of our app!

New file: `./components/Header.tsx`:

```typescript
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';
import { colors } from '../styles/constants';

export default function Header(props) {
    return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={styles.label}>{props.label}</Text>
                </View>
            </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.cardBackground,
        width: '100%'
    },
    container: {
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 20,
    },
    label: {
        color: colors.text,
        fontSize: 32,
        textAlign: 'center'
    },
});
```

From the [docs](https://reactnative.dev/docs/safeareaview):

> The purpose of SafeAreaView is to render content within the safe area boundaries of a device. It is currently only applicable to iOS devices with iOS version 11 or later.

Let's integrate it into our App, replacing our `<Text>` element, and with the label prop `"Kind Words"`.

## ✨ Integrating custom fonts

We'll be integrating the Google [Pacifico Font](https://fonts.google.com/specimen/Pacifico). 

Let's do this using expo's packages:

    expo install @expo-google-fonts/pacifico expo-font
    
Let's now integrate them into our App.tsx:

```typescript
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

type Props = {
    label: string
}

export default function Header(props: Props) {
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.label}>{props.label}</Text>
        </View>
      </SafeAreaView>
    );
  }
}
```

Let's now set the label's text to be `"Pacifico_400Regular"` with the `fontFamily` setting:

```typescript
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';
import { colors } from '../styles/constants';

type Props = {
    label: string
}

export default function Header(props: Props) {
    return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={styles.label}>{props.label}</Text>
                </View>
            </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.cardBackground,
        width: '100%'
    },
    container: {
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 20,
    },
    label: {
        color: colors.text,
        fontSize: 32,
        textAlign: 'center',
        fontFamily: 'Pacifico_400Regular'
    },
});

```

## 🚴 Let's list our posts

We'll be using [FlatList](https://reactnative.dev/docs/flatlist).

In `App.tsx`:

```javascript
type Post = {
    sender: string,
    body: string,
    handle: string,
    createdAt: Date
}

const renderItem = (item: {item: Post}) => <PostItem post={item.item} />

export default function App() {
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
    </View>
  );
}

```

To our styles object in the same file, we'll add:

```javascript
list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%'
  },
```

## 🚵 Our individual `PostItem` component

Then let's define and style our post item component. In `./components/PostItem.tsx`:

```javascript
import { Text, StyleSheet, View } from 'react-native';
import {colors} from  '../styles/constants';

type Post = {
    sender: string,
    body: string,
    handle: string,
    createdAt: Date
}

type Props = {
    post: Post
}


export default function PostItem({post}: Props) {
  const {sender, body, handle, createdAt} = post;
  return (
    <View style={styles.card}>
      <Text>{sender}: {handle}</Text>
      <Text style={styles.center}>{body}</Text>
      <Text style={styles.right}>{createdAt.toLocaleDateString()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  right: {
    textAlign: 'right'
  },
  center: {
    textAlign: 'center'
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
    textAlign: 'left'
  }
});
```

Add the cardShadow color to constants set to `#bfa2db` and cardBackground set to `#f0d9ff`.

## 📮 Create list of static posts

In `App.tsx`:

```javascript
const posts = [
    {sender: "Ramon", handle: "hola_soy_milk", body: "You're awesome!", createdAt: new Date()},
    {sender: "Pearl", handle: "punk_rock_swords", body: "Affluent!", createdAt: new Date()},
    {sender: "Garnet", handle: "stronger_than_u", body: "An experience!", createdAt: new Date()},
]
```

## ⚛️ React Hooks for posts

Let's replace our `posts` const with `useState`:

```javascript
  const [posts, setPosts] = useState([
    {sender: "Ramon", handle: "hola_soy_milk", body: "You're awesome!", createdAt: new Date()},
    {sender: "Pearl", handle: "punk_rock_swords", body: "Affluent!", createdAt: new Date()},
    {sender: "Garnet", handle: "stronger_than_u", body: "An experience!", createdAt: new Date()},
  ]);
```

Next we'll need a screen to add posts. That's where screens come in.

## 📱 Screens

We're gonna use the still-in-preview `expo-router` to create navigable screens.

[Install and set up expo-router](https://expo.github.io/router/docs#getting-started).

Move the contents of `App.tsx` into `./app/index.tsx` (fix the imports!), and make the contents of `App.tsx` the following:

```typescript
import "@bacons/expo-metro-runtime";
import "expo-router/entry";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
```

Change the `main` in `package.json` to:

```typescript
  "main": "App.tsx",
```

## 🏣 Add a `newPost` page

Let's add a link to the new post screen:

```typescript
import { Link } from "expo-router";

// ...
export default function Page({route}: {route: {params?: {post: Post}}}) {
  // ...
  if(route.params?.post) {
    const {post} = route.params
    route.params = undefined;
    setPosts([...posts, post]);
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


```

Create `./app/newPost.tsx`:

```typescript
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Header from '../components/Header'
import { colors } from '../styles/constants';
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

export default function Page({ navigation }: { navigation: {
  navigate: (
    options: {name: string, params: {post: Post}, merge: boolean}) => void
}}) {
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
```

## 💾 Save the posts on device

Let's use our device's async storage

    yarn add @react-native-async-storage/async-storage
    
New file: `./utils/store.ts`:

```typescript
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORE_KEY = "@kind-words-react-native";

type Post = {
  sender: string;
  body: string;
  handle: string;
  createdAt: Date;
};

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

```

Let's tweak `index.ts`:

```javascript
const [posts, setPosts] = useState([]);
  useEffect(() => {
    loadPosts().then((loadedPosts) => {
      setPosts(loadedPosts);
    })
  }, [posts])
    if(route.params?.post) {
    const {post} = route.params
    route.params = undefined;
    await addPost(post);
    const loadedPosts = await loadPosts();
    if (loadedPosts) {
      setPosts(loadedPosts);
    }
  };

```

Small problem! Our dates are now being loaded as strings. Let's fix that in `PostItem`:

```javascript
<Text style={styles.right}>{new Date(createdAt).toLocaleDateString()}</Text>
```

## 🚢 Bonus: Creating release builds

You'll need an Expo account to proceed. The Wizard will guide you

    npm install -g eas-cli
    
    eas build -p ios
    
    eas build -p android
