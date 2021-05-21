import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  VictoryChart,
  VictoryLegend,
  VictoryPie,
  VictoryBar,
  VictoryLabel,
} from 'victory-native'
import { getData, storeData } from '../shared/storageFunctions.js'
import { bleManager } from './bluetooth/scanner.js'
import { charUuid } from './bluetooth/peripheral.js'
import { decode } from 'js-base64'

export default function SurveyResults({ route, navigation }) {
  const [questionData, setQuestionData] = useState(null)
  const [responseData, setResponseData] = useState([])
  const graphicColor = ['#388087', '#6fb3b8', '#badfe7']

  const getDataFromHost = async () => {
    console.log('Is Host')
    const role = await getData('role')
    if (role === 'host') {
      setQuestionData(JSON.parse(await getData('newQuestionData')))
      console.log('onStarting...')
    } else {
      const questionData = JSON.parse(await getData('selectedSurveyData'))
      let data
      try {
        console.log('Reading responses from host')
        console.log(questionData)
        console.log(questionData.deviceId)

        await bleManager.discoverAllServicesAndCharacteristicsForDevice(
          questionData.deviceId
        )

        console.log('chars read')

        const char = await bleManager.readCharacteristicForDevice(
          questionData.deviceId,
          questionData.serviceId,
          charUuid
        )

        data = JSON.parse(decode(char.value))

        console.log(data)
      } catch (error) {
        console.log(error)
        data = questionData
      }
      setQuestionData(data)
    }
  }

  useEffect(() => {
    const timeoutFunction = setInterval(reload, 5000)
    getDataFromHost()
    return () => {
      clearInterval(timeoutFunction)
    }
  }, [])

  const reload = async () => {
    getDataFromHost()
    console.log('reloading...')
  }

  // const testPressHandler = async () => {
  //     questionData.responses && questionData.responses.map((item, index) => {
  //         responseData.push({y: item, label: questionData.choices[index]})
  //         setResponseData(responseData)
  //     })
  //     console.log(responseData)
  // }

  const labels = responseData.map((item) => {
    return `${item.y}`
  })

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <Text style={globalStyles.titleText}>
          {questionData && questionData.question}
        </Text>
        <Text>{questionData && questionData.responses}</Text>
        <VictoryPie
          animate={{ easing: 'exp', duration: 1000 }}
          data={responseData}
          width={Dimensions.get('window').width}
          height={300}
          colorScale={graphicColor}
          innerRadius={40}
          cornerRadius={4}
          padAngle={5}
          labelRadius={110}
          labels={labels}
          style={{
            labels: {
              fontFamily: 'Arial',
              fontWeight: 'bold',
              fill: 'rgb(50, 138, 214)',
              fontSize: 15,
            },
          }}
        />
        <StatusBar style="auto" />
      </View>
      {/* <FlatButton text="Continue" icon="arrow-right" onPress={testPressHandler} /> */}
      <FlatButton
        text="Continue"
        icon="arrow-right"
        onPress={() => {
          navigation.navigate('Home')
        }}
      />
      {/* <FlatButton  text='Reload' icon='' onPress={reload}/> */}
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
