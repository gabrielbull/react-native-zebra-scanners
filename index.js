import { NativeModules, NativeEventEmitter } from 'react-native';

const calendarManagerEmitter = new NativeEventEmitter(NativeModules.ZebraScannersEvents);

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
    
    getBtleSsiBarcode: (params) => NativeModules.ZebraScanners.getBtleSsiBarcode(params),

    addEventListener: (event, callback) => {
        calendarManagerEmitter.addListener(NativeModules.ZebraScannersEvents[event], callback)
    },

    removeEventListener: (event, callback) => {
        calendarManagerEmitter.removeListener(NativeModules.ZebraScannersEvents[event], callback)
    }
}
