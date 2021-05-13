import { registerRootComponent } from 'expo';

import App from './src/App';

let peripheral
let bleManager

export const updatePeripheral = (newPeripheral) => {
    peripheral = newPeripheral
}

export const updateBleManager = (newBleManager) => {
    bleManager = newBleManager
}

export const getPeripheral = () => {
    return peripheral
}

export const getBleManager = () => {
    return bleManager
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);