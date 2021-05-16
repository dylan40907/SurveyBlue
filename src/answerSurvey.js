import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from '../shared/storageFunctions'

export default function App({ navigation }) {

    const getQuestion = async () => {
        
    }

    const [questionData, setQuestionData] = useState({})

    let userUuid

    const onStart = async () => {
        // navigation.navigate('Question3')
        const data = await getData('selectedSurveyData')
        // userUuid = await getData('userUuid')
        // console.log(JSON.parse(data).choices)
        setQuestionData(JSON.parse(data))
    }

    const pressHandler = async (index) => {
        responseData.choiceIndex = index
        console.log(responseData)
        console.log(JSON.parse(await getData('userUuid')))
        // navigation.navigate('SendConfirmation')
    }

    onStart()

    const responseData = {
        choiceIndex: 0,
        surveyUuid: questionData.surveyUuid,
        userUuid: userUuid
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.container}>
                <Text style={globalStyles.titleText}>{questionData.question}</Text>
                <View style={styles.buttons}>
                    {questionData.choices && questionData.choices.map((item, index) => <FlatButton key={item + index} text={item} icon="" onPress={() => {pressHandler(index)}} />)}
                </View>
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
      alignItems: 'center',
    },
    button: {
        margin: 5,
    }
  });  