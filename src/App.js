import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import Navigator from '../routes/stack'

const getFonts = () => Font.loadAsync({
  'din-regular': require('../assets/fonts/din-regular.ttf'),
  'din-bold': require('../assets/fonts/din-bold.ttf'),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
    return (
      <Navigator />
    );
    navigation.navigate('Question3')
  } else {
    return (
      <AppLoading 
        startAsync={getFonts} 
        onFinish={() => setFontsLoaded(true)} 
        onError={() => console.log('error')}
      />
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 60,
  }
});
