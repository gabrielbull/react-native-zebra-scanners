import { NativeModules, NativeEventEmitter } from 'react-native'
import parseXml from './lib/parseXml'

const calendarManagerEmitter = new NativeEventEmitter(NativeModules.ZebraScannersEvents)

export {
    RMD_ATTR_MODEL_NUMBER, RMD_ATTR_SERIAL_NUMBER, RMD_ATTR_BEEPER_VOLUME, RMD_ATTR_BEEPER_FREQUENCY, 
    RMD_ATTR_ACTION_BEEPER_LED, RMD_ATTR_SYM_UPC_A, RMD_ATTR_SYM_UPC_E, RMD_ATTR_SYM_UPC_E_1, RMD_ATTR_SYM_EAN_8_JAN_8, 
    RMD_ATTR_SYM_EAN_13_JAN_13, RMD_ATTR_SYM_BOOKLAND_EAN, RMD_ATTR_SYM_CODE_128, RMD_ATTR_SYM_UCC_EAN_128, 
    RMD_ATTR_SYM_CODE_39, RMD_ATTR_SYM_CODE_93, RMD_ATTR_SYM_CODE_11, RMD_ATTR_SYM_INTERLEAVED_2_OF_5, 
    RMD_ATTR_SYM_DISCRETE_2_OF_5, RMD_ATTR_SYM_CHINESE_2_OF_5, RMD_ATTR_SYM_CODABAR, RMD_ATTR_SYM_MSI, 
    RMD_ATTR_SYM_DATAMATRIXQR, RMD_ATTR_SYM_PDF, RMD_ATTR_SYM_ISBT_128, RMD_ATTR_UCC_COUPEN_EXTENDED_CODE, 
    RMD_ATTR_FRMWR_VERSION, RMD_ATTR_MFD, RMD_ATTR_SYM_US_Postnet, RMD_ATTR_SYM_US_Planet, RMD_ATTR_SYM_UK_POST, 
    RMD_ATTR_SYM_US_POSTAL_CHECK_DIGIT, RMD_ATTR_SYM_UK_POSTAL_CHECK_DIGIT, RMD_ATTR_SYM_JAPAN_POST, 
    RMD_ATTR_SYM_AUS_POST, RMD_ATTR_SYM_Netherlands_KIX, RMD_ATTR_SYM_UPU_FICS, 
    RMD_ATTR_SYM_USPS_4CB_ONECODE_INTELLIGENT_MAIL, RMD_ATTR_SYM_GS1_DATABAR_14, RMD_ATTR_SYM_GS1_DATABAR_LIMITED, 
    RMD_ATTR_SYM_GS1_DATABAR_EXPANDED, RMD_ATTR_SYM_MICRO_PDF, RMD_ATTR_SYM_MAXI_CODE, RMD_ATTR_ISSN_EAN, 
    RMD_ATTR_MATRIX_2_OF_5, RMD_ATTR_KOREAN_3_OF_5, RMD_ATTR_QR_CODE, RMD_ATTR_MICRO_QR, RMD_ATTR_AZTEC, 
    RMD_ATTR_HANXIN, RMD_ATTR_COMPOSITE_CC_C, RMD_ATTR_COMPOSITE_CC_A_B, RMD_ATTR_COMPOSITE_TLC_39, 
    RMD_ATTR_VALUE_BEEPER_VOLUME_LOW, RMD_ATTR_VALUE_BEEPER_VOLUME_MEDIUM, RMD_ATTR_VALUE_BEEPER_VOLUME_HIGH, 
    RMD_ATTR_VALUE_BEEPER_FREQ_LOW, RMD_ATTR_VALUE_BEEPER_FREQ_MEDIUM, RMD_ATTR_VALUE_BEEPER_FREQ_HIGH, 
    RMD_ATTR_VALUE_ACTION_HIGH_SHORT_BEEP_1, RMD_ATTR_VALUE_ACTION_HIGH_SHORT_BEEP_2, 
    RMD_ATTR_VALUE_ACTION_HIGH_SHORT_BEEP_3, RMD_ATTR_VALUE_ACTION_HIGH_SHORT_BEEP_4, 
    RMD_ATTR_VALUE_ACTION_HIGH_SHORT_BEEP_5, RMD_ATTR_VALUE_ACTION_LOW_SHORT_BEEP_1, 
    RMD_ATTR_VALUE_ACTION_LOW_SHORT_BEEP_2, RMD_ATTR_VALUE_ACTION_LOW_SHORT_BEEP_3, 
    RMD_ATTR_VALUE_ACTION_LOW_SHORT_BEEP_4, RMD_ATTR_VALUE_ACTION_LOW_SHORT_BEEP_5, 
    RMD_ATTR_VALUE_ACTION_HIGH_LONG_BEEP_1, RMD_ATTR_VALUE_ACTION_HIGH_LONG_BEEP_2, 
    RMD_ATTR_VALUE_ACTION_HIGH_LONG_BEEP_3, RMD_ATTR_VALUE_ACTION_HIGH_LONG_BEEP_4, 
    RMD_ATTR_VALUE_ACTION_HIGH_LONG_BEEP_5, RMD_ATTR_VALUE_ACTION_LOW_LONG_BEEP_1, 
    RMD_ATTR_VALUE_ACTION_LOW_LONG_BEEP_2, RMD_ATTR_VALUE_ACTION_LOW_LONG_BEEP_3, 
    RMD_ATTR_VALUE_ACTION_LOW_LONG_BEEP_4, RMD_ATTR_VALUE_ACTION_LOW_LONG_BEEP_5, 
    RMD_ATTR_VALUE_ACTION_FAST_WARBLE_BEEP, RMD_ATTR_VALUE_ACTION_SLOW_WARBLE_BEEP, 
    RMD_ATTR_VALUE_ACTION_HIGH_LOW_BEEP, RMD_ATTR_VALUE_ACTION_LOW_HIGH_BEEP, RMD_ATTR_VALUE_ACTION_HIGH_LOW_HIGH_BEEP, 
    RMD_ATTR_VALUE_ACTION_LOW_HIGH_LOW_BEEP, RMD_ATTR_VALUE_ACTION_HIGH_HIGH_LOW_LOW_BEEP, 
    RMD_ATTR_VALUE_ACTION_LED_GREEN_OFF, RMD_ATTR_VALUE_ACTION_LED_GREEN_ON, RMD_ATTR_VALUE_ACTION_LED_YELLOW_ON, 
    RMD_ATTR_VALUE_ACTION_LED_YELLOW_OFF, RMD_ATTR_VALUE_ACTION_LED_RED_ON, RMD_ATTR_VALUE_ACTION_LED_RED_OFF, 
    RMD_ATTR_VALUE_ACTION_FAST_BLINK, RMD_ATTR_VALUE_ACTION_FAST_BLINK_OFF
} from './lib/attributesConstants'

export {
    SBT_BEEPCODE_SHORT_HIGH_1, SBT_BEEPCODE_SHORT_HIGH_2, SBT_BEEPCODE_SHORT_HIGH_3, SBT_BEEPCODE_SHORT_HIGH_4, 
    SBT_BEEPCODE_SHORT_HIGH_5, SBT_BEEPCODE_SHORT_LOW_1, SBT_BEEPCODE_SHORT_LOW_2, SBT_BEEPCODE_SHORT_LOW_3, 
    SBT_BEEPCODE_SHORT_LOW_4, SBT_BEEPCODE_SHORT_LOW_5, SBT_BEEPCODE_LONG_HIGH_1, SBT_BEEPCODE_LONG_HIGH_2, 
    SBT_BEEPCODE_LONG_HIGH_3, SBT_BEEPCODE_LONG_HIGH_4, SBT_BEEPCODE_LONG_HIGH_5, SBT_BEEPCODE_LONG_LOW_1, 
    SBT_BEEPCODE_LONG_LOW_2, SBT_BEEPCODE_LONG_LOW_3, SBT_BEEPCODE_LONG_LOW_4, SBT_BEEPCODE_LONG_LOW_5, 
    SBT_BEEPCODE_FAST_WARBLE, SBT_BEEPCODE_SLOW_WARBLE, SBT_BEEPCODE_MIX1_HIGH_LOW, SBT_BEEPCODE_MIX2_LOW_HIGH, 
    SBT_BEEPCODE_MIX3_HIGH_LOW_HIGH, SBT_BEEPCODE_MIX4_LOW_HIGH_LOW, 
} from './lib/beepCodesConstants'

export default {
    sdkVersion: NativeModules.ZebraScanners.sdkVersion,
    
    getScannerInfo: (scannerId, attributes) => {
        return new Promise((resolve, reject) => {
            NativeModules.ZebraScanners.getScannerInfo({ scannerId, attributes })
                .then((data) => resolve(parseXml(data)))
                .catch((err) => reject(err))
        })
    },

    connect: (scannerId) => {
        return new Promise((resolve, reject) => {
            NativeModules.ZebraScanners.connect({ scannerId })
                .then(() => resolve())
                .catch((err) => reject(err))
        })
    },
    
    disconnect: (scannerId) => {
        return new Promise((resolve, reject) => {
            NativeModules.ZebraScanners.disconnect({ scannerId })
                .then(() => resolve())
                .catch((err) => reject(err))
        })
    },

    setAutoReconnectOption: (scannerId, enableOption) => {
        return new Promise((resolve, reject) => {
            NativeModules.ZebraScanners.setAutoReconnectOption({ scannerId, enableOption })
                .then(() => resolve())
                .catch((err) => reject(err))
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
