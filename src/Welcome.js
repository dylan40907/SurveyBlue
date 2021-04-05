import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'


export default function App({ navigation }) {

    const pressHandler = () => {
        navigation.navigate('Question1')
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Hi there! To maximize your experience with SurveyBlue, we ask that you answer a few basic questions before engaging with the app.</Text>
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