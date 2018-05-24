
declare module "react-native-zebra-scanners" {
    import { URISource } from "react-native";

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
}
