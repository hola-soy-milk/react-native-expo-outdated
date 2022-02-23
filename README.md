# expo-lesson-feb-2022

## 🧰 Requirements

- Node.js: Version 12 or higher
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- For iOS: [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
- For Android: [Android Studio](https://developer.android.com/studio/)

### Setting up Expo
    
    npm install --global expo-cli

On your mobile, install [Expo Go](https://expo.dev/expo-go).

## ✨ Start up the project

    expo init kind-words-mobile
    
We're making a blank app (first option):

<img width="777" alt="Screenshot of the terminal with the option selected: blank               a minimal app as clean as an empty canvas" src="https://user-images.githubusercontent.com/656318/154859183-367a32fe-ab70-44a2-90b8-810dd2a1c92e.png">

Once it's done, let's run it!

    cd kind-words-mobile

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

## 🚶 First steps: the `styles` CSS object

> 🤔 Notice the naming style of CSS props in React Native

- Change the background color of the main view to `"#f0e5cf"`
- Change the text color to `"#3f3e41"`
- Let's extract `./styles/constants.js` that exports a `colors` object with:

```javascript
export const colors = {
    background: "#f0e5cf",
    text: "#3f3e41"
}
```

## ✍️ The `<Text>` component

Let's change the contents to "Kind Words"! It's just like React.

## 🗣️ Creating a `<Header>` component

Let's have a header at the top of our app!

New file: `./components/Header.js`:

```javascript
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';
import { colors } from '../styles/constants';

export default props => {
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
    },
    container: {
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom: 20,
    },
    label: {
        color: colors.text,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});
```

Let's integrate it into our App, replacing our `<Text>` element, and with the label prop `"Kind Words"`.

## ✨ Integrating custom fonts

We'll be integrating the Google [Pacifico Font](https://fonts.google.com/specimen/Pacifico). 

Let's do this using expo's packages:

    expo install @expo-google-fonts/pacifico expo-font expo-app-loading
    
Let's now integrate them into our header:

```javascript
import AppLoading from "expo-app-loading";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

export default function Header(props) {
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
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

Let's now set the label's text to be `"Pacifico_400Regular"`.

## 🚴 Let's list our posts

We'll be using [FlatList](https://reactnative.dev/docs/flatlist).

In `App.js`:

```javascript
const renderItem = item => <PostList post={item.item} />

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.cardBackground} translucent={true} style="dark" />
      <Header label="Kind Words" />
      <FlatList
        style={styles.list}
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  },
```

## 🚵 Our individual `PostItem` component

Then let's define and style our post item component. In `./components/PostItem.js`:

```javascript
import { Text, StyleSheet, View } from 'react-native';
import {colors} from  '../styles/constants';

export default ({post}) => {
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

Add the cardShadow color to constants set to `#bfa2db`.

## 📮 Create list of static posts

In `App.js`:

```javascript
const posts = [
    {id: 1, sender: "Ramon", handle: "hola_soy_milk", body: "You're awesome!", createdAt: new Date()},
    {id: 2, sender: "Pearl", handle: "punk_rock_swords", body: "Affluent!", createdAt: new Date()},
    {id: 3, sender: "Garnet", handle: "stronger_than_u", body: "An experience!", createdAt: new Date()},
]
```

## ⚛️ React Hooks for posts

Let's replace our `posts` const with `useState`:

```javascript
  const [posts, setPosts] = useState([
    {id: 1, sender: "Ramon", handle: "hola_soy_milk", body: "You're awesome!", createdAt: new Date()},
    {id: 2, sender: "Pearl", handle: "punk_rock_swords", body: "Affluent!", createdAt: new Date()},
    {id: 3, sender: "Garnet", handle: "stronger_than_u", body: "An experience!", createdAt: new Date()},
  ]);
```

Next we'll need a screen to add posts. That's where screens come in.

## 📱 Screens

We're gonna create navigable screens with `react-navigation`:

    yarn add @react-navigation/native
    
    expo install react-native-screens react-native-safe-area-context
    
    yarn add @react-navigation/native-stack
    
Let's extract a screen for the `PostListScreen`:

Integrate the `PostListScreen` into `App.js`:

```javascript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PostList" component={PostListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## 🏣 Add a `NewPostScreen`


Back in `App.js`:


```javascript
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="PostList" component={PostListScreen} />
        <Stack.Screen name="NewPost" component={NewPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## 💾 Save the posts on device

## 🚢 Creating release builds
