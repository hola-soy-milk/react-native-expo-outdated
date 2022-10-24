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
    textAlign: 'center',
    fontFamily: 'Pacifico_400Regular'
  },
});
