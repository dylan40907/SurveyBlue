import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import { FontAwesome5, AntDesign, FontAwesome } from '@expo/vector-icons';
import Scanner from './bluetooth/scanner'


export default function App({ navigation }) {

    const createPressHandler = () => {
        navigation.navigate('CreateSurvey')
    }

    const defaultGraphicData = [
        { y: 25, label: '25%', name: 'Choice 1'}, 
        { y: 45, label: '45%', name: 'Choice 2'}, 
        { y: 30, label: '30%', name: 'Choice 3'}
    ];

    const [graphicData, setGraphicData] = useState(defaultGraphicData);

    const [surveys, setSurveys] = useState([])

    Scanner(surveys, setSurveys)

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.editButton}>
                    <View style={styles.editButton}>
                        <FontAwesome name="circle" size={58} color="rgb(50, 138, 214)" />
                        <View style={styles.pen}>
                            <FontAwesome5 name="pen" size={25} color="white" />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={createPressHandler}>
                    <View>
                        <AntDesign name="pluscircle" size={50} color="rgb(50, 138, 214)" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.surveys}>
                <FlatList 
                    data={surveys}
                    renderItem={({item}) => (
                        <View><Text>{item.question}</Text></View>
                    )}
                    keyExtractor={item => item.surveyUuid}
                />
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        flex: 1
    },
    buttons: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    addButton: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    editButton: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    pen: {
        position: 'absolute'
    },
    surveys: {
        borderWidth: 1.5,
        borderRadius: 4
    }
  });  