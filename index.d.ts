declare module "react-native-zebra-scanners" {
    import { URISource } from "react-native";

    export type RmdAttr = 533 | 534 | 140 | 145 | 6000 | 1 | 2 | 12 | 4 | 3 | 83 | 8 | 14 | 0 | 9 | 10 | 6 | 5 | 408 
        | 7 | 11 | 292 | 15 | 84 | 85 | 20012 | 535 | 89 | 90 | 91 | 95 | 96 | 290 | 291 | 326 | 611 | 592 | 338 | 339 
        | 340 | 227 | 294 | 617 | 618 | 581 | 293 | 573 | 574 | 1167 | 341 | 342 | 371;

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
