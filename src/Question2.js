import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles, globalVariables } from '../styles/global.js'
import FlatButton from '../shared/button'


export default function App({ navigation }) {

    const yesPressHandler = () => {
        globalVariables.isVaccinated = true
        navigation.navigate('Question3')
        console.log(globalVariables.isVaccinated)
    }

    const noPressHandler = () => {
        globalVariables.isVaccinated = false
        navigation.navigate('Question3')
        console.log(globalVariables.isVaccinated)
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