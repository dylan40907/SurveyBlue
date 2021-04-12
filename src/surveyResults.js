import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {

    const storeData = async (value, key) => {
        try {
          await AsyncStorage.setItem(key, value)
        } catch (error) {
          console.log(error)
        }
    }
      
    const getData = async (key) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch(error) {
            console.log(error)
        }
    } 

    const [questionData, setQuestionData] = useState({})

    const onStart = async () => {
        // navigation.navigate('Question3')
        setQuestionData(JSON.parse(await getData('newQuestionData')))
    }

    onStart()

    return (
        <View style={globalStyles.container}>
            <View style={styles.container}>
                <Text style={globalStyles.titleText}>Survey Sent!</Text>
                <Text style={globalStyles.titleText}>{questionData.question}</Text>
                <Text style={globalStyles.titleText}>Responses:</Text>
                <Text style={globalStyles.titleText}>{questionData.responses}</Text>
                <StatusBar style="auto" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    buttons: {
      marginTop: 60,
      flexDirection: 'row',
      alignItems: 'center'
    },
    button: {
        margin: 5,
    }
  });  