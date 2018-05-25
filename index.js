import { NativeModules, NativeEventEmitter } from 'react-native';

const calendarManagerEmitter = new NativeEventEmitter(NativeModules.ZebraScannersEvents);

export default {
    sdkVersion: NativeModules.ZebraScanners.sdkVersion,
    
    connect: (scannerId) => {
        return new Promise((resolve, reject) => {
            NativeModules.ZebraScanners.connect({ scannerId })
                .then(() => resolve())
                .catch((err) => new Error(err))
        })
    },

    setAutoReconnectOption: (scannerId, enableOption) => {
        return new Promise((resolve, reject) => {
            NativeModules.ZebraScanners.setAutoReconnectOption({ scannerId, enableOption })
                .then(() => resolve())
                .catch((err) => new Error(err))
        })
    },

    getScanners: () => {
        return NativeModules.ZebraScanners.getScanners()    
    },
    
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
