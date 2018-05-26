import { NativeModules, NativeEventEmitter } from 'react-native'
import parseXml from './lib/parseXml'

const calendarManagerEmitter = new NativeEventEmitter(NativeModules.ZebraScannersEvents)

export const RMD_ATTR_MODEL_NUMBER = 533
export const RMD_ATTR_SERIAL_NUMBER = 534
export const RMD_ATTR_BEEPER_VOLUME = 140
export const RMD_ATTR_BEEPER_FREQUENCY = 145
export const RMD_ATTR_ACTION_BEEPER_LED = 6000
export const RMD_ATTR_SYM_UPC_A = 1
export const RMD_ATTR_SYM_UPC_E = 2
export const RMD_ATTR_SYM_UPC_E_1 = 12
export const RMD_ATTR_SYM_EAN_8_JAN_8 = 4
export const RMD_ATTR_SYM_EAN_13_JAN_13 = 3
export const RMD_ATTR_SYM_BOOKLAND_EAN = 83
export const RMD_ATTR_SYM_CODE_128 = 8
export const RMD_ATTR_SYM_UCC_EAN_128 = 14
export const RMD_ATTR_SYM_CODE_39 = 0
export const RMD_ATTR_SYM_CODE_93 = 9
export const RMD_ATTR_SYM_CODE_11 = 10
export const RMD_ATTR_SYM_INTERLEAVED_2_OF_5 = 6
export const RMD_ATTR_SYM_DISCRETE_2_OF_5 = 5
export const RMD_ATTR_SYM_CHINESE_2_OF_5 = 408
export const RMD_ATTR_SYM_CODABAR = 7
export const RMD_ATTR_SYM_MSI = 11
export const RMD_ATTR_SYM_DATAMATRIXQR = 292
export const RMD_ATTR_SYM_PDF = 15
export const RMD_ATTR_SYM_ISBT_128 = 84
export const RMD_ATTR_UCC_COUPEN_EXTENDED_CODE = 85
export const RMD_ATTR_FRMWR_VERSION = 20012
export const RMD_ATTR_MFD = 535
export const RMD_ATTR_SYM_US_Postnet = 89
export const RMD_ATTR_SYM_US_Planet = 90
export const RMD_ATTR_SYM_UK_POST = 91
export const RMD_ATTR_SYM_US_POSTAL_CHECK_DIGIT = 95
export const RMD_ATTR_SYM_UK_POSTAL_CHECK_DIGIT = 96
export const RMD_ATTR_SYM_JAPAN_POST = 290
export const RMD_ATTR_SYM_AUS_POST = 291
export const RMD_ATTR_SYM_Netherlands_KIX = 326
export const RMD_ATTR_SYM_UPU_FICS = 611
export const RMD_ATTR_SYM_USPS_4CB_ONECODE_INTELLIGENT_MAIL = 592
export const RMD_ATTR_SYM_GS1_DATABAR_14 = 338
export const RMD_ATTR_SYM_GS1_DATABAR_LIMITED = 339
export const RMD_ATTR_SYM_GS1_DATABAR_EXPANDED = 340
export const RMD_ATTR_SYM_MICRO_PDF = 227
export const RMD_ATTR_SYM_MAXI_CODE = 294
export const RMD_ATTR_ISSN_EAN = 617
export const RMD_ATTR_MATRIX_2_OF_5 = 618
export const RMD_ATTR_KOREAN_3_OF_5 = 581
export const RMD_ATTR_QR_CODE = 293
export const RMD_ATTR_MICRO_QR = 573
export const RMD_ATTR_AZTEC = 574
export const RMD_ATTR_HANXIN = 1167
export const RMD_ATTR_COMPOSITE_CC_C = 341
export const RMD_ATTR_COMPOSITE_CC_A_B = 342
export const RMD_ATTR_COMPOSITE_TLC_39 = 371

export default {
    sdkVersion: NativeModules.ZebraScanners.sdkVersion,
    
    getScannerInfo: (scannerId, attributes) => {
        return new Promise((resolve, reject) => {
            NativeModules.ZebraScanners.getScannerInfo({ scannerId, attributes })
                .then((data) => resolve(parseXml(data)))
                .catch((err) => new Error(err))
        })
    },

    connect: (scannerId) => {
        return new Promise((resolve, reject) => {
            NativeModules.ZebraScanners.connect({ scannerId })
                .then(() => resolve())
                .catch((err) => new Error(err))
        })
    },
    
    disconnect: (scannerId) => {
        return new Promise((resolve, reject) => {
            NativeModules.ZebraScanners.disconnect({ scannerId })
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
