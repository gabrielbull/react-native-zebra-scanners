import { NativeModules } from 'react-native';

export const sdkVersion = NativeModules.ZebraScanners.sdkVersion

export function getPairingBarCode(params) {
    params = {
        protocol: 'STC_SSI_BLE',
        defaultStatus: true,    
        ...params
    }
    return NativeModules.ZebraScanners.getPairingBarCode(params)
}

export function getResetFactoryDefaultsBarcode(params) {
    return NativeModules.ZebraScanners.getResetFactoryDefaultsBarcode(params)
}

export function getBtleSsiBarcode(params) {
    return NativeModules.ZebraScanners.getBtleSsiBarcode(params)
}
