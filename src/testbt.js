import React, { useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import StartPeripheral from './bluetooth/peripheral.js'
import StartScanning, {DisconnectDevice} from './bluetooth/scanner.js'
import { BleManager, State } from 'react-native-ble-plx'
import { getData, storeData } from '../shared/storageFunctions'
import { decode } from 'js-base64'

export default () => {

    const [surveyData, setSurveyData] = useState('')

    const startAdvertising = () => {
        console.log('advertising...')
        StartPeripheral()
    }

    const startScanning = async () => {
        StartScanning()
    }

    const disconnect = () => {
        DisconnectDevice()
    }

    const update = async () => {
        setSurveyData(decode(await getData('surveyData')))
    }

    return (
        <View style={styles.container}>
            <Text>{surveyData}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={startAdvertising}><Text>Start Advertising</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={startScanning}><Text>Start Scanning</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={disconnect}><Text>Disconnect</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={update}><Text>Update</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      alignItems: 'center',
      padding: 10,
    },
    button: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#ddd',
      color: '#000',
      margin: 5
    },
})