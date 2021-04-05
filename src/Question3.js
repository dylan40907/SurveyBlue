import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
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

    const [errorStyle, setErrorStyle] = useState({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'none'})

    const pressHandler = async () => {
        if (await getData('color') != null  && await getData('food') != null && await getData('music') != null) {
            navigation.replace('Finished')
            storeData('true', 'welcomeFinished')
            setErrorStyle({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'none'})
        } else {
            setErrorStyle({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'flex'})
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Favorites</Text>
            <Text style={styles.label}>Color</Text>
            <DropDownPicker
                items={[
                    {label: 'Red', value: '1'},
                    {label: 'Orange', value: '2'},
                    {label: 'Yellow', value: '3'},
                    {label: 'Green', value: '4'},
                    {label: 'Blue', value: '5'},
                    {label: 'Purple', value: '6'},
                    {label: 'Black', value: '7'},
                    {label: 'White', value: '8'},
                ]}
                placeholder={'Select a Color'}
                containerStyle={{height: 40}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                onChangeItem={item => storeData(item.label, 'color')}
                dropDownStyle={{backgroundColor: '#fff', borderColor: 'rgb(197, 206, 214)', borderWidth: 2}}
                zIndex={5000}
                style={{
                    borderColor: 'rgb(197, 206, 214)',
                    borderWidth: 2,
                }}
            />
            <Text style={styles.label}>Food</Text>
            <DropDownPicker
                items={[
                    {label: 'American', value: '1'},
                    {label: 'Chinese', value: '2'},
                    {label: 'Mexican', value: '3'},
                    {label: 'Japanese', value: '4'},
                    {label: 'Korean', value: '4'},
                    {label: 'Indian', value: '5'},
                    {label: 'German', value: '6'},
                    {label: 'Italian', value: '7'},
                    {label: 'French', value: '8'},
                    {label: 'Thai', value: '9'},
                    {label: 'African', value: '9'},
                ]}
                placeholder={'Select a Cuisine'}
                containerStyle={{height: 40}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                onChangeItem={item => storeData(item.label, 'food')}
                dropDownStyle={{backgroundColor: '#fff', borderColor: 'rgb(197, 206, 214)', borderWidth: 2}}
                zIndex={4000}
                style={{
                    borderColor: 'rgb(197, 206, 214)',
                    borderWidth: 2,
                }}
            />
            <Text style={styles.label}>Music</Text>
            <DropDownPicker
                items={[
                    {label: 'Rock', value: '2021'},
                    {label: 'Hip Hop', value: '2020'},
                    {label: 'Jazz', value: '2019'},
                    {label: 'Pop', value: '5'},
                    {label: 'Blues', value: '6'},
                    {label: 'Country', value: '7'},
                    {label: 'Classical', value: '8'},
                    {label: 'Reggae', value: '9'},
                    {label: 'Soul', value: '10'},
                    {label: 'Electronic', value: '11'},
                    {label: 'Funk', value: '11'},
                ]}
                placeholder={'Select a Genre'}
                containerStyle={{height: 40}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                onChangeItem={item => storeData(item.label, 'music')}
                dropDownStyle={{backgroundColor: '#fff', borderColor: 'rgb(197, 206, 214)', borderWidth: 2}}
                zIndex={3000}
                style={{
                    borderColor: 'rgb(197, 206, 214)',
                    borderWidth: 2,
                }}
            />
            <Text style={errorStyle}>Please answer all fields</Text>
            <View style={styles.button}>
                <FlatButton text="Finish" icon="arrow-right" onPress={pressHandler} />
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      marginTop: 60,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    }
  });