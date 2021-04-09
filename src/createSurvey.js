import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles/global.js'
import FlatButton from '../shared/button'
import { Ionicons, FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
// https://icons.expo.fyi/Foundation/x
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {

    const [question, setQuestion] = useState('')
    const [choices, setChoices] = useState([])
    const [newChoice, setNewChoice] = useState('')
    const [responses, setResponses] = useState([])
    
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

    const [questionData, setQuestionData] = useState()
    const [choicesData, setChoicesData] = useState([])
    const [responsesData, setResponsesData] = useState([])

    const [errorStyle, setErrorStyle] = useState({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'none'})

    function ChoiceItem({ item, pressHandler }) {
        return (
          <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <View style={styles.item}>
              <MaterialIcons name='delete' size={18} color='#333' />
              <Text style={styles.itemText}>{item.choice}</Text>
            </View>
          </TouchableOpacity>
        )
      }

    const submitHandler = async () => {
        if(choices.length > 1 && choices.length < 5 && question.length > 0){
            for (var i=0; i < choices.length; i++) {
                choicesData.push(choices[i].choice)
                responsesData.push(0)
            }
            setQuestionData({
                question: question,
                choices: choicesData,
                responses: responsesData
            })
            storeData(JSON.stringify(JSON.stringify(questionData)), 'newQuestionData')
            storeData(JSON.stringify(JSON.stringify(questionData)), 'newQuestionData')
            // navigation.navigate('AnswerOwnSurvey')
            setErrorStyle({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'none'})
        } else {
            setErrorStyle({fontWeight: 'bold', marginTop: 10, color: 'red', display: 'flex'})
        }
    }

    const checkerHandler = async () => {
        // console.log(questionData)
        // console.log(JSON.stringify(JSON.stringify(questionData)))
        // console.log(JSON.parse(JSON.stringify(JSON.stringify(questionData))))
        console.log(await getData('newQuestionData'))
    }

    const addChoice = () => {
        if(newChoice.length > 0) {
            setChoices((prevChoices) => {
              return [
                { choice: newChoice, key: Math.random().toString() },
                ...prevChoices
              ];
            })
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
                onChangeItem={item => storeData(item.label, 'month')}
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
            />
            <Text style={globalStyles.subtitleText}>Custom Choices</Text>
            <View style={styles.addChoice}>
                <TextInput 
                    style={styles.choiceInput}
                    placeholder="Choice"
                    onChangeText={(choice)=>{setNewChoice(choice)}}
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
                <FlatButton text="Submit" icon="arrow-right" onPress={submitHandler} />
            </View>
            <View style={styles.button}>
                <FlatButton text="Checker" icon="arrow-right" onPress={checkerHandler} />
            </View>
            <StatusBar style="auto" />
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
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flexDirection: 'row',
    },
    itemText: {
        marginLeft: 10,
    }
  });