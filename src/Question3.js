import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles, globalVariables } from '../styles/global.js'
import FlatButton from '../shared/button'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App({ navigation }) {

    const [errorStyle, setErrorStyle] = useState({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'none'})

    const pressHandler = () => {
        if (globalVariables.color != 'Select a Color' && globalVariables.Food != 'Select a Cuisine' && globalVariables.music != 'Select a Genre') {
            navigation.navigate('Finished')
            console.log(globalVariables.color, globalVariables.food, globalVariables.music)
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
                placeholder={globalVariables.color}
                containerStyle={{height: 40}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                onChangeItem={item => globalVariables.color=item.label}
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
                placeholder={globalVariables.food}
                containerStyle={{height: 40}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                onChangeItem={item => globalVariables.food=item.label}
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
                placeholder={globalVariables.music}
                containerStyle={{height: 40}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                onChangeItem={item => globalVariables.music=item.label}
                dropDownStyle={{backgroundColor: '#fff', borderColor: 'rgb(197, 206, 214)', borderWidth: 2}}
                zIndex={3000}
                style={{
                    borderColor: 'rgb(197, 206, 214)',
                    borderWidth: 2,
                }}
            />
            <Text style={errorStyle}>Please answer all fields</Text>
            <View style={styles.button}>
                <FlatButton text="Continue" icon="arrow-right" onPress={pressHandler} />
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