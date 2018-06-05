declare module "react-native-zebra-scanners" {
    import { URISource } from "react-native";

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
    
    export const RMD_ATTR_VALUE_BEEPER_VOLUME_LOW = 2
    export const RMD_ATTR_VALUE_BEEPER_VOLUME_MEDIUM = 1
    export const RMD_ATTR_VALUE_BEEPER_VOLUME_HIGH = 0
    
    export const RMD_ATTR_VALUE_BEEPER_FREQ_LOW = 2
    export const RMD_ATTR_VALUE_BEEPER_FREQ_MEDIUM = 1
    export const RMD_ATTR_VALUE_BEEPER_FREQ_HIGH = 0
    
    export const RMD_ATTR_VALUE_ACTION_HIGH_SHORT_BEEP_1 = 0
    export const RMD_ATTR_VALUE_ACTION_HIGH_SHORT_BEEP_2 = 1
    export const RMD_ATTR_VALUE_ACTION_HIGH_SHORT_BEEP_3 = 2
    export const RMD_ATTR_VALUE_ACTION_HIGH_SHORT_BEEP_4 = 3
    export const RMD_ATTR_VALUE_ACTION_HIGH_SHORT_BEEP_5 = 4
    export const RMD_ATTR_VALUE_ACTION_LOW_SHORT_BEEP_1 = 5
    export const RMD_ATTR_VALUE_ACTION_LOW_SHORT_BEEP_2 = 6
    export const RMD_ATTR_VALUE_ACTION_LOW_SHORT_BEEP_3 = 7
    export const RMD_ATTR_VALUE_ACTION_LOW_SHORT_BEEP_4 = 8
    export const RMD_ATTR_VALUE_ACTION_LOW_SHORT_BEEP_5 = 9
    export const RMD_ATTR_VALUE_ACTION_HIGH_LONG_BEEP_1 = 10
    export const RMD_ATTR_VALUE_ACTION_HIGH_LONG_BEEP_2 = 11
    export const RMD_ATTR_VALUE_ACTION_HIGH_LONG_BEEP_3 = 12
    export const RMD_ATTR_VALUE_ACTION_HIGH_LONG_BEEP_4 = 13
    export const RMD_ATTR_VALUE_ACTION_HIGH_LONG_BEEP_5 = 14
    export const RMD_ATTR_VALUE_ACTION_LOW_LONG_BEEP_1 = 15
    export const RMD_ATTR_VALUE_ACTION_LOW_LONG_BEEP_2 = 16
    export const RMD_ATTR_VALUE_ACTION_LOW_LONG_BEEP_3 = 17
    export const RMD_ATTR_VALUE_ACTION_LOW_LONG_BEEP_4 = 18
    export const RMD_ATTR_VALUE_ACTION_LOW_LONG_BEEP_5 = 19
    export const RMD_ATTR_VALUE_ACTION_FAST_WARBLE_BEEP = 20
    export const RMD_ATTR_VALUE_ACTION_SLOW_WARBLE_BEEP = 21
    export const RMD_ATTR_VALUE_ACTION_HIGH_LOW_BEEP = 22
    export const RMD_ATTR_VALUE_ACTION_LOW_HIGH_BEEP = 23
    export const RMD_ATTR_VALUE_ACTION_HIGH_LOW_HIGH_BEEP = 24
    export const RMD_ATTR_VALUE_ACTION_LOW_HIGH_LOW_BEEP = 25
    export const RMD_ATTR_VALUE_ACTION_HIGH_HIGH_LOW_LOW_BEEP = 26
    export const RMD_ATTR_VALUE_ACTION_LED_GREEN_OFF = 42
    export const RMD_ATTR_VALUE_ACTION_LED_GREEN_ON = 43
    export const RMD_ATTR_VALUE_ACTION_LED_YELLOW_ON = 45
    export const RMD_ATTR_VALUE_ACTION_LED_YELLOW_OFF = 46
    export const RMD_ATTR_VALUE_ACTION_LED_RED_ON = 47
    export const RMD_ATTR_VALUE_ACTION_LED_RED_OFF = 48
    export const RMD_ATTR_VALUE_ACTION_FAST_BLINK = 85
    export const RMD_ATTR_VALUE_ACTION_FAST_BLINK_OFF = 90

    export const SBT_BEEPCODE_SHORT_HIGH_1 = 0
    export const SBT_BEEPCODE_SHORT_HIGH_2 = 1
    export const SBT_BEEPCODE_SHORT_HIGH_3 = 2
    export const SBT_BEEPCODE_SHORT_HIGH_4 = 3
    export const SBT_BEEPCODE_SHORT_HIGH_5 = 4
    export const SBT_BEEPCODE_SHORT_LOW_1 = 5
    export const SBT_BEEPCODE_SHORT_LOW_2 = 6
    export const SBT_BEEPCODE_SHORT_LOW_3 = 7
    export const SBT_BEEPCODE_SHORT_LOW_4 = 8
    export const SBT_BEEPCODE_SHORT_LOW_5 = 9
    export const SBT_BEEPCODE_LONG_HIGH_1 = 10
    export const SBT_BEEPCODE_LONG_HIGH_2 = 11
    export const SBT_BEEPCODE_LONG_HIGH_3 = 12
    export const SBT_BEEPCODE_LONG_HIGH_4 = 13
    export const SBT_BEEPCODE_LONG_HIGH_5 = 14
    export const SBT_BEEPCODE_LONG_LOW_1 = 15
    export const SBT_BEEPCODE_LONG_LOW_2 = 16
    export const SBT_BEEPCODE_LONG_LOW_3 = 17
    export const SBT_BEEPCODE_LONG_LOW_4 = 18
    export const SBT_BEEPCODE_LONG_LOW_5 = 19
    export const SBT_BEEPCODE_FAST_WARBLE = 20
    export const SBT_BEEPCODE_SLOW_WARBLE = 21
    export const SBT_BEEPCODE_MIX1_HIGH_LOW = 22
    export const SBT_BEEPCODE_MIX2_LOW_HIGH = 23
    export const SBT_BEEPCODE_MIX3_HIGH_LOW_HIGH = 24
    export const SBT_BEEPCODE_MIX4_LOW_HIGH_LOW = 25

    export type RmdAttr = 533 | 534 | 140 | 145 | 6000 | 1 | 2 | 12 | 4 | 3 | 83 | 8 | 14 | 0 | 9 | 10 | 6 | 5 | 408 
        | 7 | 11 | 292 | 15 | 84 | 85 | 20012 | 535 | 89 | 90 | 91 | 95 | 96 | 290 | 291 | 326 | 611 | 592 | 338 | 339 
        | 340 | 227 | 294 | 617 | 618 | 581 | 293 | 573 | 574 | 1167 | 341 | 342 | 371;
    
    export type SbtBeepCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
        | 20 | 21 | 22 | 23 | 24 | 25 

    export type SbtLedCode = 42 | 43 | 45 | 46 | 47 | 48

    export type Scanner = {
        active: boolean
        auto_communication_session_reestablishment: boolean,
        available: boolean,
        connection_type: number,
        scanner_id: number,
        scanner_model: number,
        scanner_name: string
    };

    export function getScannerInfo(scannerId: number, attributes: Array<RmdAttr>): Promise<{[key: string]: string | number}>;

    export function performBeeperAction(scannerId: number, actionValue: SbtBeepCode): Promise<void>;

    export function performLedAction(scannerId: number, actionValue: SbtLedCode): Promise<void>;

    export function connect(scannerId: number): Promise<void>;

    export function connect(scannerId: number): Promise<void>;
    export function disconnect(scannerId: number): Promise<void>;

    export function setAutoReconnectOption(scannerId: number, enableOption: boolean): Promise<void>;

    export type PairingBarcodeParams = {
        width: number,
        height: number,
        protocol?: 'STC_SSI_MFI' | 'STC_SSI_BLE' | 'SBT_SSI_HID' | 'NO_COM_PROTOCOL',
        defaultStatus?: boolean
    }

    export function getPairingBarcode(params: PairingBarCodeParams): Promise<URISource>;

    export type ResetFactoryDefaultsBarcodeParams = {
        width: number,
        height: number
    }

    export function getResetFactoryDefaultsBarcode(params: ResetFactoryDefaultsBarcodeParams): Promise<URISource>;

    export type BtleSsiBarcodeParams = {
        width: number,
        height: number
    }

    export function getBtleSsiBarcode(params: BtleSsiBarcodeParams): Promise<URISource>;

    export type EVENT = 'SCANNER_APPEARED' | 'SCANNER_DISAPPEARED' | 'COMMUNICATION_SESSION_ESTABLISHED' | 'COMMUNICATION_SESSION_TERMINATED';

    export type ScannerAppearedEvent = {
        scanner: Scanner
    }

    export type ScannerDisappearedEvent = {
        scannerId: number
    }

    export function addEventListener(event: EVENT, callback: Function): void;
    export function removeEventListener(event: EVENT, callback: Function): void;
}
