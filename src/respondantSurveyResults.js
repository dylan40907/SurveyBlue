import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryChart, VictoryLegend, VictoryPie, VictoryBar, VictoryLabel } from 'victory-native';

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
    const [responseData, setResponseData] = useState([])
    const graphicColor = ['#388087', '#6fb3b8', '#badfe7'];


    useEffect(() => {
        const onStart = async () => {
            const openSurveys = JSON.parse(await getData('openSurveys'))
            const index = Number(await getData('selectedSurveyIndex'))

            setQuestionData(openSurveys[index].question)

            // setQuestionData(JSON.parse(await getData('newQuestionData')))
        }
        onStart()
        // if (timeoutFunction) {
        //     clearTimeout(timeoutFunction)
        // }
    }, [])

    const reload = async () => {
        setQuestionData(questionData)
        // if(timeoutFunction) {
        //     clearTimeout(timeoutFunction)
        // }
    }

    // const [timeoutFunction, setTimeoutFunction] = useState(setTimeout(reload, 5000))

    // const testPressHandler = async () => {
    //     questionData.responses && questionData.responses.map((item, index) => {
    //         responseData.push({y: item, label: questionData.choices[index]})
    //         setResponseData(responseData)
    //     })
    //     console.log(responseData)
    // }
    
    const labels = questionData.choices

    const [testData, setTestData] = useState([
        { y: 5, fillColor: graphicColor[0]}, 
        { y: 1, fillColor: graphicColor[1]}
    ])

    const chartTheme = {
        axis: {
          style: {
            tickLabels: {
              // this changed the color of my numbers to white
              fill: 'white',
            },
          },
        },
    };

    return (
        <View style={globalStyles.container}>
            <View style={styles.container}>
                <Text style={globalStyles.titleText}>{questionData.question}</Text>
                <Text>{questionData.responses}</Text>
                {/* <VictoryChart
                    theme={ chartTheme }
                    width={250}
                    height={220}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    // domain={{x: [0, 1], y: [0, 10]}}
                    maxDomain={{ x: 1}}
                    domainPadding={{ x: 40 }}
                > */}
                {/* <VictoryBar
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 1000 },
                        easing: 'exp'
                    }}
                    height={300}
                    width={200}
                    cornerRadius={4}
                    data={testData}
                    labelComponent={<VictoryLabel dy={25}/>}
                    labels={labels}
                    style={{
                        data: {
                            fill: ({datum}) => datum.fillColor,
                            width: 45
                        },
                        labels: {
                            fontFamily: 'Arial',
                            fontWeight: 'bold',
                            fontSize: 15,
                            fill: 'white'
                        }
                    }}
                /> */}
                {/* </VictoryChart> */}
                {/* <VictoryChart
                    // theme={ chartTheme }
                    width={350}
                    height={220}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    domain={{x: [1, 3], y: [0, 10]}}
                    domainPadding={{ x: 40 }}
                >
                    <VictoryBar 
                        animate={{
                            duration: 1000,
                            onLoad: { duration: 1000 }
                        }}      
                        cornerRadius={4}                
                        data={testData}
                        colorScale={graphicColor}
                        labelComponent={<VictoryLabel dy={25}/>}
                        labels={labels} 
                        style={{
                            data: {
                                fill: ({datum}) => datum.fillColor,
                                width: 45
                            },
                            labels: {
                                fontFamily: 'Arial',
                                fontWeight: 'bold',
                                fontSize: 15,
                                fill: 'white'
                            }
                        }}
                    />
                </VictoryChart> */}
                <StatusBar style="auto" />
            </View>
            {/* <FlatButton text="Continue" icon="arrow-right" onPress={testPressHandler} /> */}
            <FlatButton text="Continue" icon="arrow-right" onPress={()=>{
                navigation.navigate('Home')
                console.log(labels)
                setTestData([
                    { y: 2, fillColor: graphicColor[0]}, 
                    { y: 8, fillColor: graphicColor[1]}
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
    }
  });  