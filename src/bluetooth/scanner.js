import { BleManager } from 'react-native-ble-plx';
import { charUuid, serviceUuid, responseUuid } from './peripheral'
import { decode, encode } from 'js-base64'
import { getData, storeData } from '../../shared/storageFunctions'
import { or } from 'react-native-reanimated';
import { stringify } from 'uuid';

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
            console.log('scanner cannot start')
            console.log(error)
            return
        }

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
                        
                        const recentResponseData = JSON.parse(await getData('responseData'))

                        console.log('recentResponseData: ')
                        console.log(recentResponseData)
                        setSurveys((surveys) => {
                            
                            let foundIndex = -1

                            let responsesMatch

                            const found = surveys.find((survey, index) => {

                                if (survey.surveyUuid == newSurvey.surveyUuid) {
                                    console.log('survey responses:')
                                    console.log(JSON.stringify(survey.responses), JSON.stringify(newSurvey.responses))
                                    if (JSON.stringify(survey.responses) != JSON.stringify(newSurvey.responses)) {
                                        responsesMatch = false
                                    }

                                    responsesMatch = true

                                    foundIndex = index
                                    return true
                                }

                                return false
                            })

                            console.log(found)

                            if (!found) {
                                storeData(JSON.stringify(surveys.concat(newSurvey)), 'openSurveys')
                                return surveys.concat(newSurvey)
                            }

                            if (!responsesMatch) {
                                console.log('responses do not match, updating survey...')
                                const updatedSurveys = surveys.map((survey, index) => {
                                    if (index == foundIndex) {
                                        const updatedSurvey = survey
                                        updatedSurvey.responses = newSurvey.responses
                                        storeData(String(index), 'selectedSurveyIndex')
                                        return updatedSurvey
                                    }
                                    return survey
                                })
                                storeData(JSON.stringify(updatedSurveys), 'openSurveys')
                                return updatedSurveys
                            }
                            
                            return surveys
                        })
                        if (recentResponseData && recentResponseData.surveyUuid == newSurvey.surveyUuid) {
                            console.log('sent or not:')
                            console.log(recentResponseData)

                            console.log('sending response...')

                            console.log(recentResponseData)
                            
                            await surveyBlue.writeCharacteristicWithResponseForService(serviceUuid, responseUuid, encode(JSON.stringify(recentResponseData)))

                            storeData('', 'responseData')
                            console.log('response SENT')
                        }
    
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
                try {
                    await bleManager.cancelDeviceConnection(tempDeviceId)
                } catch (error) {
                    console.log(error)
                }
                    
                console.log('device disconnected')
            }

        }
    })
}