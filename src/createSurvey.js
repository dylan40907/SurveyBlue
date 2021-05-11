import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
// https://icons.expo.fyi/Foundation/x
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {

    const [question, setQuestion] = useState('')
    const [choices, setChoices] = useState([])
    const [newChoice, setNewChoice] = useState('')
    
    const storeData = async (value, key) => {
        try {
          await AsyncStorage.setItem(key, value)
          console.log(value)
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

    const submitHandler = async () => {
        if(choices.length > 1 && choices.length < 5 && question.length > 0){
            let responsesData = []
            let choicesData = []
            for (var i=0; i < choices.length; i++) {
                choicesData.push(choices[i].choice)
                responsesData.push(0)
            }
            
            const questionData = {
                question: question,
                choices: choicesData,
                responses: responsesData
            }

            storeData(JSON.stringify(questionData), 'newQuestionData')
            navigation.navigate('AnswerOwnSurvey')
            setErrorStyle({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'none'})
        } else {
            setErrorStyle({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'flex'})
        }
    }

    const addChoice = () => {
        if(newChoice.length > 0) {
            setChoices((prevChoices) => {
              return [
                { choice: newChoice, key: Math.random().toString() },
                ...prevChoices
              ];
            })
            setNewChoice('')
            setErrorStyle({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'none'})
        } else {
            setErrorStyle({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'flex'})
        }
    }

    const removeChoice = (key) => {
        setChoices((prevChoices) => {
          return prevChoices.filter(choice => choice.key != key)
        })
      }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
          }}>
        <View style={styles.container}>
            <Text style={globalStyles.subtitleText}>Default Surveys</Text>
            {/* https://github.com/hossein-zare/react-native-dropdown-picker */}
            <DropDownPicker
                items={[
                    {label: 'Are You Vaccinated?', value: '1'},
                    {label: "What's Your Favorite Color?", value: '2'},
                    {label: 'What Music Do You Like?', value: '3'},
                    {label:  "What's Your Favorite Type of Food?", value: '4'},
                ]}
                placeholder={'Select a Survey'}
                containerStyle={{height: 40}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fff', borderColor: 'rgb(197, 206, 214)', borderWidth: 2}}
                zIndex={5000}
                style={{
                    borderColor: 'rgb(197, 206, 214)',
                    borderWidth: 2,
                }}
            />
            <Text style={globalStyles.subtitleText}>Custom Survey</Text>
            <TextInput 
                style={styles.input}
                placeholder="Question"
                onChangeText={(question)=>{setQuestion(question)}}
                value={question}
            />
            <Text style={globalStyles.subtitleText}>Custom Choices</Text>
            <View style={styles.addChoice}>
                <TextInput 
                    style={styles.choiceInput}
                    placeholder="Choice"
                    onChangeText={(choice)=>{setNewChoice(choice)}}
                    value={newChoice}
                />
                <TouchableOpacity style={styles.addButton} onPress={addChoice}>
                    <View>
                        <AntDesign name="pluscircle" size={38} color="rgb(50, 138, 214)" />
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={errorStyle}>Please answer all fields and/or have 2-4 choices</Text>

            <FlatList 
                data={choices}
                renderItem={({ item }) => (
                    <ChoiceItem item={item} pressHandler={removeChoice} />
                )}
            />
            <View style={styles.button}>
                <FlatButton text="Next" icon="arrow-right" onPress={submitHandler} />
            </View>
            <StatusBar style="auto" />
        </View>
        </TouchableWithoutFeedback>
    )
}

function ChoiceItem({ item, pressHandler }) {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.item}>
            <TouchableOpacity onPress={() => pressHandler(item.key)}>
                <FontAwesome name='minus-circle' size={32} color='rgb(50, 138, 214)' />
            </TouchableOpacity>
          <Text style={styles.itemText}>{item.choice}</Text>
        </View>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 40,
        paddingTop: 20,
    },
    button: {
      marginTop: 20,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    error: {
        fontWeight: 'bold',
        marginTop: 10,
        color: 'red',
        display: 'none'
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderWidth: 2,
        borderColor: 'rgb(197, 206, 214)',
        fontSize: 14,
        borderRadius: 5,
    },
    choiceInput: {
        marginBottom: 10,
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderWidth: 2,
        borderColor: 'rgb(197, 206, 214)',
        fontSize: 14,
        borderRadius: 5,
        flex: 1
    },
    addButton: {
        marginLeft: 10,
    },
    addChoice: {
        flexDirection: 'row',
    },
    item: {
        padding: 7,
        paddingLeft: 9,
        marginTop: 16,
        borderColor: 'rgb(197, 206, 214)',
        borderWidth: 2,
        borderRadius: 5,
        flexDirection: 'row',
    },
    itemText: {
        marginLeft: 10,
        alignSelf: 'center'
    }
  });