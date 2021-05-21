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
  VictoryAxis
} from 'victory-native'
import { getData, storeData } from '../shared/storageFunctions.js'
import { bleManager } from './bluetooth/scanner.js'
import { charUuid } from './bluetooth/peripheral.js'
import { decode } from 'js-base64'

export default function SurveyResults({ route, navigation }) {
  const [questionData, setQuestionData] = useState(null)
  const [responseData, setResponseData] = useState([])
  const graphicColor = ['#388087', '#6fb3b8', '#badfe7']

  const [graphicData, setGraphicData] = useState([])

  const getDataFromHost = async () => {
    console.log('Is Host')
    const role = await getData('role')
    if (role === 'host') {
      const data = JSON.parse(await getData('newQuestionData'))
      setQuestionData(data)
      console.log('onStarting...')
      updateGraphicData(data)
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
      updateGraphicData(data)
    }
  }

  const updateGraphicData = (data) => {
    const array = []
    for (let i = 0; i < data.responses.length; i++) {
          const xIndex = i+1
          array.push({x: xIndex, y: data.responses[i]})
    }
    setGraphicData(array)
    console.log('graphicData: ')
    console.log(array)
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

  return (
    <View style={globalStyles.container}>
        <View style={styles.container}>
            <Text style={globalStyles.titleText}>{questionData && questionData.question}</Text>
            {/* <Text style={globalStyles.titleText}>Are you vaccinated?</Text> */}
            <Text>{questionData && questionData.responses}</Text>
            <Text style={styles.subtitleText}>Responses</Text>
            <View style={styles.chart}>
                {questionData && <VictoryChart
                    width={250}
                    height={300}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    domain={{x: [1, 2], y: [0, 2]}}
                    domainPadding={{ x: 40 }}
                >
                    <VictoryAxis 
                        tickFormat={() => ''} 
                        style={{
                            axis: {stroke: "grey"},
                        }}
                    />
                    <VictoryAxis 
                        dependentAxis crossAxis
                        tickValues={[1, 2]}
                        domain={[0, 2]}
                        style={{
                            tickLabels: {fontSize: 20, padding: 5, fontFamily: 'din-regular'}
                        }}
                    />
                    <VictoryBar 
                        animate={{
                            duration: 1000,
                            onLoad: { duration: 1000 }
                        }}
                        width={200}
                        // cornerRadius={4}
                        cornerRadius={{ top: 6, bottom: 6 }}
                        data={graphicData}
                        labelComponent={<VictoryLabel dy={30}/>}
                        labels={questionData.choices} 
                        style={{
                            data: {
                                fill: ({datum}) => graphicColor[datum.x],
                                width: 45
                            },
                            labels: {
                                fontFamily: 'din-bold',
                                fontWeight: 'bold',
                                fontSize: 20,
                                fill: 'white'
                            }
                        }}
                    />
                </VictoryChart>}
            </View>
            <StatusBar style="auto" />
        </View>
        <FlatButton text="Continue" icon="arrow-right" onPress={()=>{
            // navigation.navigate('Home')
            setGraphicData([
                { x: 1, y: 2 }, 
                { x: 2, y: 0 }
            ])
        }} />
        <FlatButton  text='Reload' icon='' onPress={reload}/>
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
},
chart: {
    marginTop: -30,
},
subtitleText: {
    fontFamily: 'din-regular',
    fontSize: 20,
    marginTop: 20
}
});  