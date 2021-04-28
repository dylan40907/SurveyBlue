import { BleManager } from 'react-native-ble-plx';

export const manager = new BleManager();

export default () => {
    manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
            manager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    console.log(error)
                    return
                }
                console.log('scanning...' + device.name)
                if (device.name === 'SurveyBlue') {
                    console.log('device found')
                    device.connect().then((device) => {
                        console.log('connected to surveyblue device')
                    })
                }
            })
        }
    })
}