import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import StartPeripheral from './bluetooth/peripheral.js'
import StartScanning from './bluetooth/scanner.js'
import { BleManager, State } from 'react-native-ble-plx'

export default () => {

    const startAdvertising = () => {
        console.log('advertising...')
        StartPeripheral()
    }

    const startScanning = () => {
        StartScanning()
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={startAdvertising}><Text>Start Advertising</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={startScanning}><Text>Start Scanning</Text></TouchableOpacity>
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
    },
})