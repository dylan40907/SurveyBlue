import Peripheral, { Service, Characteristic } from 'react-native-peripheral'
import { encode, decode } from 'js-base64'
import { getData, storeData } from '../../shared/storageFunctions'

export const charUuid = 'd0a0a143-554c-432e-bed8-1e2f75830843'
export const serviceUuid = '68c48c81-d126-4243-835f-b448b5c46804'
export const responseUuid = '1ec04410-b3a4-42f7-954c-8dd08c05da9a'

export default () => {
  Peripheral.onStateChanged((state) => {
    if (state === 'poweredOn') {
      const defaultSurvey = new Characteristic({
        uuid: charUuid,
        properties: ['read'],
        permissions: ['readable'],
        onReadRequest: async () => {
          const value = encode(await getData('newQuestionData'))
          return value
        },
      })

      const response = new Characteristic({
        uuid: responseUuid,
        properties: ['write'],
        permissions: ['writeable'],
        onWriteRequest: async (encodedResponseData) => {
          console.log('write requested')

          const responseData = JSON.parse(decode(encodedResponseData))

          console.log('ResponseData:')

          console.log(responseData)

          const surveyData = JSON.parse(await getData('newQuestionData'))

          console.log('SurveyData:')

          console.log(surveyData)

          const surveyRespondants = JSON.parse(
            await getData('newSurveyRespondants')
          )

          if (surveyData.surveyUuid == responseData.surveyUuid) {
            if (!surveyRespondants.includes(responseData.userUuid)) {
              surveyData.responses[responseData.choiceIndex] += 1

              surveyRespondants.push(responseData.userUuid)

              console.log('response received')

              console.log(surveyData)

              storeData(
                JSON.stringify(surveyRespondants),
                'newSurveyRespondants'
              )
              storeData(JSON.stringify(surveyData), 'newQuestionData')
              return ''
            }
          }
          console.log('response is invalid')
        },
      })

      const service = new Service({
        uuid: serviceUuid,
        characteristics: [defaultSurvey, response],
      })

      Peripheral.addService(service).then(() => {
        Peripheral.startAdvertising({
          name: 'SurveyBlue',
          serviceUuids: [serviceUuid],
        })
        console.log('default survey advertising started...')
      })
    }
  })
}
