import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";
import AppLoading from "expo-app-loading";
import { colors } from "../styles/constants";
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
    fontFamily: "Pacifico_400Regular",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
});
