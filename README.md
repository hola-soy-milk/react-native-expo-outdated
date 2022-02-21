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

