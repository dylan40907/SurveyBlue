import { BleManager } from 'react-native-ble-plx';
import { charUuid, serviceUuid } from './peripheral'
import { decode } from 'js-base64'
import { getData, storeData } from '../../shared/storageFunctions'

export const DisconnectDevice = async () => {
    console.log('disconnecting...')

    const bleManager = new BleManager()

    // const deviceId = await getData('recentDeviceId')
    // '7315226F-0066-1F05-4ED1-655F36A63619'

    bleManager.onStateChange((state) => {
        if (state === 'PoweredOn') {
            bleManager.cancelDeviceConnection('848EE1BC-900D-BF98-D4F5-6734BEDC3E00')
        }
    })
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

                await storeData(device.id, 'recentDeviceId')
                const tempDeviceId = device.id

                try {
                    bleManager.stopDeviceScan()

                    const surveyBlue = await device.connect()

                    // console.log(surveyBlue)

                    const tempDevice = await surveyBlue.discoverAllServicesAndCharacteristics()

                    // console.log(tempDevice)

                    const char = await surveyBlue.readCharacteristicForService(
                        serviceUuid,
                        charUuid
                    )

                    await storeData(char.value, 'surveyData')

                    console.log('connected to SurveyBlue')

                    console.log(decode(char.value))
                } catch (error) {
                    // console.log(error)
                    throw new Error(error)
                } finally {
                        await bleManager.cancelDeviceConnection(tempDeviceId)
                        console.log('device disconnected')
                    // bleManager.cancelDeviceConnection(tempDeviceId)
                    // console.log('device disconnected')

                }

            }
        })
        }
    })
}