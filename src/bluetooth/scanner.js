import { BleManager } from 'react-native-ble-plx';
import { charUuid, serviceUuid } from './peripheral'

// const deviceId = '35AA4E8F-691A-EBC1-C160-AE2E3EEE2F68'

export const DisconnectDevice = () => {
    console.log('disconnecting...')

    const bleManager = new BleManager()

    bleManager.cancelDeviceConnection("26B35C17-7C5E-20F0-98D3-720C39198A4C")
}

export default () => {
    console.log('scan button pressed')
    
    const bleManager = new BleManager()

    // bleManager.cancelDeviceConnection("26B35C17-7C5E-20F0-98D3-720C39198A4C")

    const subscription = bleManager.onStateChange((state) => {
        if (state === 'PoweredOn') {
        bleManager.startDeviceScan(null, null, async (error, device) => {
            if (error) {
            console.log(error)
                return
            }
            console.log('scanning ' + device.name + ' ' + device.id)

            if (device.name === 'SurveyBlue') {
                console.log('SurveyBlue device has been found')
                console.log('device', device.id, device.name, device.rssi)

                const tempDeviceId = device.id

                try {
                    bleManager.stopDeviceScan()

                    const surveyBlue = await device.connect()

                    // console.log(surveyBlue)

                    const tempDevice = await surveyBlue.discoverAllServicesAndCharacteristics()

                    console.log(tempDevice)

                    console.log('connected to SurveyBlue')

                    console.log(tempDeviceId, serviceUuid, charUuid)
                } catch (error) {
                    // console.log(error)
                    throw new Error(error)
                } finally {
                    setTimeout(function(){
                        bleManager.cancelDeviceConnection(tempDeviceId)
                        console.log('device disconnected')
                    }, 5000)
                    // bleManager.cancelDeviceConnection(tempDeviceId)
                    // console.log('device disconnected')

                }

            }
        })
        }
    })
}