import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import Welcome from '../src/Welcome'
import Question1 from '../src/Question1'
import Question2 from '../src/Question2'
import Question3 from '../src/Question3'
import Finished from '../src/Finished'
import WelcomeResults from '../src/welcomeResults'
import Home from '../src/Home'

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
    }
}

const WelcomeStack = createStackNavigator(screens)

export default createAppContainer(WelcomeStack)