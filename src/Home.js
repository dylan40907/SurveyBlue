import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'


export default function App({ navigation }) {

    const pressHandler = () => {
        console.log(graphicData)
    }

    const defaultGraphicData = [
        { y: 25, label: '25%', name: 'Choice 1'}, 
        { y: 45, label: '45%', name: 'Choice 2'}, 
        { y: 30, label: '30%', name: 'Choice 3'}
    ];

    const [graphicData, setGraphicData] = useState(defaultGraphicData);

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Home</Text>
            <FlatButton text="Change" icon="arrow-right" onPress={pressHandler} />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      marginTop: 60,
    }
  });  