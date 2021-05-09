import Peripheral, { Service, Characteristic } from 'react-native-peripheral'
import { encode } from 'js-base64'

export const charUuid = 'd0a0a143-554c-432e-bed8-1e2f75830843'
export const serviceUuid = '68c48c81-d126-4243-835f-b448b5c46804'

const testSurveyData = {
    surveyUuid: 'db140c7e-1d1e-4732-b5a7-551b1c575b88',
    question: 'How are you today I am good but how are you my friend?',
    choices: ['Good', 'Bad', 'Ok'],
    responses: [0, 1, 0]
}

export const ch = new Characteristic({
    uuid: charUuid,
    value: encode(JSON.stringify(testSurveyData)),
    properties: ['read', 'write'],
    permissions: ['readable', 'writeable']
})

export const service = new Service({
    uuid: serviceUuid,
    characteristics: [ch],
})

export default () => {
    Peripheral.onStateChanged(state => {
        if (state === 'poweredOn') {
            Peripheral.addService(service).then(() => {
                Peripheral.startAdvertising({
                    name: 'SurveyBlue',
                    serviceUuids: [serviceUuid]
                })
            })
        }
    })
}