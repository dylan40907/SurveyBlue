import Peripheral, { Service, Characteristic } from 'react-native-peripheral'
import { encode } from 'js-base64'

export const charUuid = 'd0a0a143-554c-432e-bed8-1e2f75830843'
export const serviceUuid = '68c48c81-d126-4243-835f-b448b5c46804'

export const ch = new Characteristic({
    uuid: charUuid,
    value: encode("Testing..."),
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