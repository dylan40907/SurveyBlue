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

    const onStart = async () => {
        // navigation.navigate('Question3')
        const data = await getData('newQuestionData')
        // console.log(JSON.parse(data).choices)
        setQuestionData(JSON.parse(data))
    }

    const pressHandler = (index) => {
        questionData.responses[index] += 1
        storeData(JSON.stringify(questionData), 'newQuestionData')
        console.log(questionData.responses)
        navigation.navigate('SendConfirmation')
    }

    onStart()

    return (
        <View style={globalStyles.container}>
            <View style={styles.container}>
                <Text style={globalStyles.titleText}>{questionData.question}</Text>
                {/* <View style={styles.buttons}>
                    <View style={styles.button}>
                        <FlatList 
                            data={questionData.choices}
                            renderItem={({ item, index }) => (
                                <FlatButton text={item} icon="" onPress={() => {pressHandler(index)}} />
                            )}
                        />
                    </View>
                </View> */}
                {/* {questionData.choices && questionData.choices.map((item, index) => <Text key={item + index}>{item}</Text>)} */}
                {questionData.choices && questionData.choices.map((item, index) => <FlatButton key={item + index} text={item} icon="" onPress={() => {pressHandler(index)}} />)}
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