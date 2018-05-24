import { NativeModules, NativeEventEmitter } from 'react-native';

console.log(NativeModules)

const calendarManagerEmitter = new NativeEventEmitter(NativeModules.ZebraScannersEvents);

const subscription = calendarManagerEmitter.addListener(
    'EventReminder',
    (reminder) => console.log(reminder)
  );
  
export default {
    sdkVersion: NativeModules.ZebraScanners.sdkVersion,
    getPairingBarCode: (params) => {
        params = {
            protocol: 'STC_SSI_BLE',
            defaultStatus: true,    
            ...params
        }
        return NativeModules.ZebraScanners.getPairingBarCode(params)    
    },
    getResetFactoryDefaultsBarcode: (params) => NativeModules.ZebraScanners.getResetFactoryDefaultsBarcode(params),
    getBtleSsiBarcode: (params) => NativeModules.ZebraScanners.getBtleSsiBarcode(params)
}
