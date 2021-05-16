import { BleManager } from 'react-native-ble-plx';
import { charUuid, serviceUuid } from './peripheral'
import { decode } from 'js-base64'
import { getData, storeData } from '../../shared/storageFunctions'
import { or } from 'react-native-reanimated';

// export const DisconnectDevice = async () => {
//     console.log('disconnecting...')

//     const bleManager = new BleManager()

//     // const deviceId = await getData('recentDeviceId')
//     // '7315226F-0066-1F05-4ED1-655F36A63619'

//     bleManager.onStateChange((state) => {
//         if (state === 'PoweredOn') {
//             bleManager.cancelDeviceConnection('49FE84ED-3A0E-59B6-3D52-8DE0A11DEF3A')
//         }
//     })
// }

const bleManager = new BleManager()

let subscription

export default async (surveys, setSurveys) => {
    console.log('scan button pressed')
    
    // bleManager.cancelDeviceConnection("26B35C17-7C5E-20F0-98D3-720C39198A4C")
        if (await bleManager.state() === 'PoweredOn') {
        StartScanning(surveys, setSurveys)
    } else {
        if (subscription) {
            subscription.remove()
        }

        subscription = bleManager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                StartScanning()
            }
        })
    }
}

function StartScanning (setSurveys) {

    bleManager.startDeviceScan(null, null, async (error, device) => {
        if (error) {
        console.log(error)
            return
        }
        console.log('scanning ' + device.name + ' ' + device.id)

        if (device.name === 'SurveyBlue' || device.name === 'iPhone') {
            console.log('SurveyBlue device has been found')
            console.log('device', device.id, device.name, device.rssi)

            const tempDeviceId = device.id

            try {
                // bleManager.stopDeviceScan()

                const surveyBlue = await device.connect()

                console.log(surveyBlue.name)

                const tempDevice = await surveyBlue.discoverAllServicesAndCharacteristics()

                // console.log(tempDevice)

                try {
                    const char = await surveyBlue.readCharacteristicForService(
                        serviceUuid,
                        charUuid
                    )   

                    if (char.serviceUUID == serviceUuid) {

                        const newSurvey = JSON.parse(decode(char.value))
    
                        setSurveys((surveys) => {
                            const found = surveys.find(survey => {
                                console.log(survey.surveyUuid, newSurvey.surveyUuid)
                                return survey.surveyUuid == newSurvey.surveyUuid
                            })

                            console.log(found)

                            if (!found) {
                                storeData(JSON.stringify(surveys.concat(newSurvey)), 'openSurveys')
                                return surveys.concat(newSurvey)
                            }
                            return surveys
                        })
    
                        console.log('connected to SurveyBlue')
    
                        console.log(decode(char.value))
                    } else {
                        console.log('This is not a SurveyBlue device')
                    }
                } catch (error) {
                    console.log(error)
                }

                
            } catch (error) {
                // console.log(error)
                console.log(error)
            } finally {
                    await bleManager.cancelDeviceConnection(tempDeviceId)
                    console.log('device disconnected')
                // bleManager.cancelDeviceConnection(tempDeviceId)
                // console.log('device disconnected')

            }

        }
    })
}