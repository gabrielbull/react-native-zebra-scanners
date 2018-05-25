declare module "react-native-zebra-scanners" {
    import { URISource } from "react-native";

    export type Scanner = {
        active: boolean
        auto_communication_session_reestablishment: boolean,
        available: boolean,
        connection_type: number,
        scanner_id: number,
        scanner_model: number,
        scanner_name: string
    }

    export function connect(scannerId: number): Promise<void>;

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

    export type EVENT = 'SCANNER_APPEARED' | 'SCANNER_DISAPPEARED';

    export type ScannerAppearedEvent = {
        scanner: Scanner
    }

    export type ScannerDisappearedEvent = {
        scannerId: number
    }

    export function addEventListener(event: EVENT, callback: Function): void;
    export function removeEventListener(event: EVENT, callback: Function): void;
}
