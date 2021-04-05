import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import Welcome from '../src/Welcome'
import Question1 from '../src/Question1'
import Question2 from '../src/Question2'
import Question3 from '../src/Question3'
import Finished from '../src/Finished'

const screens = {
    Welcome: {
        screen:  Welcome,
    },
    Question1: {
        screen: Question1
    },
    Question2: {
        screen: Question2
    },
    Question3: {
        screen: Question3
    },
    Finished: {
        screen: Finished
    }
}

const WelcomeStack = createStackNavigator(screens)

export default createAppContainer(WelcomeStack)