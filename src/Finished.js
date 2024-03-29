import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {

    const pressHandler = async () => {
        navigation.navigate('WelcomeResults')
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>All finished! Thank you for your responses! Take a peek at what SurveyBlue can do!</Text>
            <View style={styles.button}>
                <FlatButton text="Continue" icon="arrow-right" onPress={pressHandler} />
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      marginTop: 60,
    }
  }); 