import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import { getData, storeData } from '../shared/storageFunctions'
import { uuidv4 } from './bluetooth/uuidGenerator'
import StartPeripheral from './bluetooth/peripheral'

export default function App({ navigation }) {

    const pressHandler = async () => {
        const surveyData = JSON.parse(await getData('newQuestionData'))
        surveyData.surveyUuid = uuidv4()
        await storeData(JSON.stringify(surveyData), 'newQuestionData')
        await storeData(JSON.stringify([]), 'newSurveyRespondants')

        console.log('Survey Created...')
        console.log(surveyData)

        StartPeripheral()

        navigation.navigate('SurveyResults')
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Are you sure you want to send this survey?</Text>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <FlatButton text="Cancel" icon="times" onPress={pressHandler} />
                </View>
                <View style={styles.button}>
                    <FlatButton text="Send" icon="check" onPress={pressHandler} />
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      marginTop: 5,
    },
    buttons: {
        marginTop: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
  });  