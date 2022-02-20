# expo-lesson-feb-2022

# 🧰 Requirements

- Node.js: Version 12 or higher
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- For iOS: [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
- For Android: [Android Studio](https://developer.android.com/studio/)

## Setting up Expo
    
    npm install --global expo-cli

On your mobile, install [Expo Go](https://expo.dev/expo-go).

# ✨ Start up the project

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

<img width="591" alt="image" src="https://user-images.githubusercontent.com/656318/154859709-218225ba-df09-46b8-ab2e-4f7e369e9391.png">

