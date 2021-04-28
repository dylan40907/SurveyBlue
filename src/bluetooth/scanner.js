import { BleManager } from 'react-native-ble-plx';

export default () => {
    console.log('scan button pressed')
    
    const bleManager = new BleManager()
    const subscription = bleManager.onStateChange((state) => {
        if (state === 'PoweredOn') {
        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
            console.log(error)
            return
            }
            console.log('scanning ' + device.name + ' ' + device.id)
        })
        }
    })
}