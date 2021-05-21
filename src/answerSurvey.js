import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getData, storeData } from '../shared/storageFunctions'
import { bleManager } from './bluetooth/scanner.js'
import { encode } from 'js-base64'

export default function AnswerSurvey({ navigation }) {
  const getQuestion = async () => {}

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
      sent: false,
    }

    responseData.choiceIndex = index

    await storeData(JSON.stringify(responseData), 'responseData')

    try {
      await bleManager.discoverAllServicesAndCharacteristicsForDevice(
        questionData.deviceId
      )

      await bleManager.writeCharacteristicWithResponseForDevice(
        questionData.deviceId,
        questionData.serviceId,
        questionData.charId,
        encode(JSON.stringify(responseData))
      )
    } catch (error) {
      console.log(error)
    }

    console.log('responseData:')
    console.log(responseData)
    await storeData('client', 'role')
    navigation.navigate('SurveyResults')
  }

  // onStart()

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <Text style={globalStyles.titleText}>{questionData.question}</Text>
        <View style={styles.buttons}>
          {questionData.choices &&
            questionData.choices.map((item, index) => (
              <FlatButton
                key={item + index}
                text={item}
                icon=""
                onPress={() => {
                  pressHandler(index)
                }}
              />
            ))}
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttons: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    margin: 5,
  },
})
