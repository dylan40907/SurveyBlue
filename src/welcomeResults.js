import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, random} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import { VictoryChart, VictoryLegend, VictoryPie, VictoryBar, VictoryLabel } from 'victory-native';

export default function App({ navigation }) {

    const graphicColor = ['#388087', '#6fb3b8', '#badfe7'];

    const wantedGraphicData = [
        { y: 4, label: ' Choice 1 ', x: 1, name: 'Choice 1', fillColor: graphicColor[0]}, 
        { y: 5, label: ' Choice 2 ', x: 2, name: 'Choice 2', fillColor: graphicColor[1]}, 
        { y: 8, label: ' Choice 3 ', x: 3, name: 'Choice 3', fillColor: graphicColor[2]}
    ];

    const defaultGraphicData = [
        { y: 0, label: ' ', name: 'Choice 1'}, 
        { y: 0, label: ' ', name: 'Choice 2'}, 
        { y: 10, label: ' ', name: 'Choice 3'}
    ];

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

    const [graphicData, setGraphicData] = useState(defaultGraphicData);

    const [datapoints, setDatapoints] = useState(3)

    const randomDatapoints = [
        
    ]

    const randomDatapointGenerator = () => {
        randomDatapoints.push(Math.floor(Math.random() * 10) + 1)
        randomDatapoints.push(Math.floor(Math.random() * 10) + 1)
        randomDatapoints.push(Math.floor(Math.random() * 10) + 1)
    }

    const pressHandler = () => {
        randomDatapointGenerator()
        setGraphicData([
            { y: randomDatapoints[0], x: 1, label: ' ' + randomDatapoints[0] + ' ', name: 'Choice 1', fillColor: graphicColor[0]}, 
            { y: randomDatapoints[1], x: 2, label: ' ' + randomDatapoints[1] + ' ', fillColor: graphicColor[1]}, 
            { y: randomDatapoints[2], x: 3, label: ' ' + randomDatapoints[2] + ' ', fillColor: graphicColor[2]}
        ])
        // navigation.navigate('Home')
    }
    

    // console.log(graphicData)

    useEffect(() => {setGraphicData(wantedGraphicData)}, [])

    return (
        <View style={styles.container}>
            <VictoryPie 
                animate={{ easing: 'exp', duration: 1000 }}
                data={graphicData} 
                width={Dimensions.get("window").width}
                height={300} 
                colorScale={graphicColor} 
                innerRadius={40}
                cornerRadius={4}
                padAngle={5}
                labelRadius={110}
                style={{
                    labels: {
                        fontFamily: 'Arial',
                        fontWeight: 'bold',
                        fill: 'rgb(50, 138, 214)',
                        fontSize: 15,
                    }
                }}
             />
             <VictoryChart
                // theme={ chartTheme }
                width={350}
                height={220}
                animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                }}
                domain={{x: [1, datapoints], y: [0, 10]}}
                domainPadding={{ x: 40 }}
             >
                <VictoryBar 
                    animate={{
                        duration: 1000,
                        onLoad: { duration: 1000 }
                      }}      
                    cornerRadius={4}                
                    data={graphicData}
                    colorScale={graphicColor}
                    labelComponent={<VictoryLabel dy={25}/>}
                    labels={['3', '23', '23']}
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
             </VictoryChart>
             {/* <VictoryLegend 
                orientation="horizontal"
                gutter={20}
                data={graphicData}
                colorScale={graphicColor}
                symbolSpacer={5}
             /> */}
            <View style={styles.button}>
                <FlatButton text="Change" icon="arrow-right" onPress={pressHandler} />
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      marginTop: -20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
  });  