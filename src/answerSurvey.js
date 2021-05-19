import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Touchable } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from '../shared/storageFunctions'

export default function App({ navigation }) {

    const getQuestion = async () => {
        
    }

    const [questionData, setQuestionData] = useState({})

    useEffect(() => {
        const onStart = async () => {
            const data = await getData('selectedSurveyData')
            console.log('debugging')
            console.log(JSON.parse(data))
            setQuestionData(JSON.parse(data))
        }
        onStart()
    }, [])

    const pressHandler = async (index) => {
        const userUuid = await getData('userUuid')

        console.log('preparing response...')

        const responseData = {
            choiceIndex: 0,
            surveyUuid: questionData.surveyUuid,
            userUuid: userUuid,
            sent: false
        }

        responseData.choiceIndex = index

        await storeData(JSON.stringify(responseData), 'responseData')
        console.log('responseData:')
        console.log(responseData)
        // navigation.navigate('SurveyResults')
    }

    // onStart()

    return (
        <View style={globalStyles.container}>
            <View style={styles.container}>
                <Text style={globalStyles.titleText}>{questionData.question}</Text>
                <View style={styles.buttons}>
                    {questionData.choices && questionData.choices.map((item, index) => <FlatButton key={item + index} text={item} icon="" onPress={() => {pressHandler(index)}} />)}
                </View>
                <TouchableOpacity style={{margin: 5}} onPress={() => {navigation.navigate('Home')}}><Text>GO HOME</Text></TouchableOpacity>
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