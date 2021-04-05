import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const yesPressHandler = async () => {
        storeData('true', 'isVaccinated')
        navigation.navigate('Question3')
        console.log(await getData('isVaccinated'))
    }

    const noPressHandler = async () => {
        storeData('false', 'isVaccinated')
        navigation.navigate('Question3')
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.container}>
                <Text style={globalStyles.titleText}>Are you fully vaccinated?</Text>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <FlatButton text="Yes" icon="check" onPress={yesPressHandler} />
                    </View>
                    <View style={styles.button}>
                        <FlatButton text="No" icon="times" onPress={noPressHandler} />
                    </View>
                </View>
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