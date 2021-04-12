import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { StyleSheet } from 'react-native'

import Welcome from '../src/Welcome'
import Question1 from '../src/Question1'
import Question2 from '../src/Question2'
import Question3 from '../src/Question3'
import Finished from '../src/Finished'
import WelcomeResults from '../src/welcomeResults'
import Home from '../src/Home'
import CreateSurvey from '../src/createSurvey'
import AnswerOwnSurvey from '../src/answerOwnSurvey'
import SurveyResults from '../src/surveyResults'

function homeButtons () {
    return (
        <View style={styles.buttons}>
            <TouchableOpacity style={styles.editButton}>
                <View style={styles.editButton}>
                    <FontAwesome name="circle" size={58} color="rgb(50, 138, 214)" />
                    <View style={styles.pen}>
                        <FontAwesome5 name="pen" size={25} color="white" />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton}>
                <View>
                    <AntDesign name="pluscircle" size={50} color="rgb(50, 138, 214)" />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const screens = {
    Welcome: {
        screen:  Welcome,
        navigationOptions: {
            title: 'Welcome!',
        }
    },
    Question1: {
        screen: Question1,
        navigationOptions: {
            title: 'User Info',
        }
    },
    Question2: {
        screen: Question2,
        navigationOptions: {
            title: 'User Info',
            headerBackTitle: 'Back'
        }
    },
    Question3: {
        screen: Question3,
        navigationOptions: {
            title: 'User Info',
            headerBackTitle: 'Back'
        }
    },
    Finished: {
        screen: Finished,
        navigationOptions: {
            title: 'Thank You!',
            headerLeft: () => null,
            gestureEnabled: false,
        }
    },
    WelcomeResults: {
        screen: WelcomeResults,
        navigationOptions: {
            title: 'Survey Data',
            headerLeft: () => null,
            gestureEnabled: false,
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerLeft: () => null,
            gestureEnabled: false,
            animationEnabled: false,
        }
    },
    CreateSurvey: {
        screen: CreateSurvey,
        navigationOptions: {
            title: 'Create a Survey'
        }
    },
    AnswerOwnSurvey: {
        screen: AnswerOwnSurvey,
        navigationOptions: {
            title: 'Answer Your Own Survey',
            headerLeft: () => null,
            gestureEnabled: false,
        }
    },
    SurveyResults: {
        screen: SurveyResults,
        navigationOptions: {
            title: 'Survey Results',
            headerLeft: () => null,
            gestureEnabled: false,
        }
    }
}

const styles = StyleSheet.create({
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
    }
  });  

const WelcomeStack = createStackNavigator(screens)

export default createAppContainer(WelcomeStack)