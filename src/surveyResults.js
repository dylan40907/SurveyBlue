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
        const timeoutFunction = setInterval(reload, 5000)
        const onStart = async () => {
            setQuestionData(JSON.parse(await getData('newQuestionData')))
            console.log('onStarting...')
        }
        onStart()
        return () => {
            clearInterval(timeoutFunction)
        }
    }, [])

    const reload = async () => {
        setQuestionData(JSON.parse(await getData('newQuestionData')))
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
        return`${item.y}`
    })

    return (
        <View style={globalStyles.container}>
            <View style={styles.container}>
                <Text style={globalStyles.titleText}>{questionData.question}</Text>
                <Text>{questionData.responses}</Text>
                <VictoryPie 
                    animate={{ easing: 'exp', duration: 1000 }}
                    data={responseData} 
                    width={Dimensions.get("window").width}
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
                        }
                    }}
                />
                <StatusBar style="auto" />
            </View>
            {/* <FlatButton text="Continue" icon="arrow-right" onPress={testPressHandler} /> */}
            <FlatButton text="Continue" icon="arrow-right" onPress={()=>{navigation.navigate('Home')}} />
            {/* <FlatButton  text='Reload' icon='' onPress={reload}/> */}
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