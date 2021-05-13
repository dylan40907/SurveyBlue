import Peripheral, { Service, Characteristic } from 'react-native-peripheral'
import { encode } from 'js-base64'
import { getData, storeData } from '../../shared/storageFunctions'

export const charUuid = 'd0a0a143-554c-432e-bed8-1e2f75830843'
export const serviceUuid = '68c48c81-d126-4243-835f-b448b5c46804'

export default () => {
    Peripheral.onStateChanged(state => {
        if (state === 'poweredOn') {

            const defaultSurvey = new Characteristic({
                uuid: charUuid,
                properties: ['read'],
                permissions: ['readable'],
                onReadRequest: async () => {
                    const value = encode(await getData('newQuestionData'))
                    return value
                }
            })

            const service = new Service({
                uuid: serviceUuid,
                characteristics: [defaultSurvey]
            })

            Peripheral.addService(service).then(() => {

                Peripheral.startAdvertising({
                    name: 'SurveyBlue',
                    serviceUuids: [serviceUuid]
                })
                console.log('default survey advertising started...')
            })
        }
    })
}