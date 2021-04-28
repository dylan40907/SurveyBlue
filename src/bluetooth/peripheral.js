import Peripheral, { Service, Characteristic } from 'react-native-peripheral'

export const ch = new Characteristic({
    uuid: 'd0a0a143-554c-432e-bed8-1e2f75830843',
    value: "13",
    properties: ['read', 'write'],
    permissions: ['readable', 'writeable']
})

export const service = new Service({
    uuid: '68c48c81-d126-4243-835f-b448b5c46804',
    characteristics: [ch],
})

export default () => {
    Peripheral.onStateChanged(state => {
        if (state === 'poweredOn') {
            Peripheral.addService(service).then(() => {
                Peripheral.startAdvertising({
                    name: 'SurveyBlue',
                    serviceUuids: ['68c48c81-d126-4243-835f-b448b5c46804']
                })
            })
        }
    })
}