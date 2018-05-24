//
//  NSObject+ScannerSDK.m
//  RCTZebraScanners
//
//  Created by Gabriel Bull on 18-05-23.
//

#import "ScannerSDK.h"
#import "SbtSdkFactory.h"

@implementation ScannerSDK

- (id)init {
    self.apiInstance = [SbtSdkFactory createSbtSdkApiInstance];
    [self.apiInstance sbtSetOperationalMode:SBT_OPMODE_ALL];
    
    int notifications_mask = 0;
    notifications_mask |= (SBT_EVENT_SCANNER_APPEARANCE | SBT_EVENT_SCANNER_DISAPPEARANCE | SBT_EVENT_SESSION_ESTABLISHMENT | SBT_EVENT_SESSION_TERMINATION | SBT_EVENT_BARCODE | SBT_EVENT_IMAGE | SBT_EVENT_VIDEO);
    
    [self.apiInstance sbtSubsribeForEvents:notifications_mask];
    
    
    BOOL scanner_detection = true;
    
    [self.apiInstance sbtEnableAvailableScannersDetection:scanner_detection];

    return self;
}

- (NSString *)sbtGetVersion
{
    return [self.apiInstance sbtGetVersion];
}

- (void)sbtEventScannerAppeared:(SbtScannerInfo*)availableScanner
{
    
    printf("NEW SCANNNERRRR-------");
}

- (void)sbtEventScannerDisappeared:(int)scannerID
{
}

- (void)sbtEventCommunicationSessionEstablished:(SbtScannerInfo*)activeScanner
{
}

- (void)blinkLEDOff
{
}

- (void)blinkLEDON
{
}

- (void)sbtEventCommunicationSessionTerminated:(int)scannerID
{
}

- (void) sbtEventBarcode:(NSString *)barcodeData barcodeType:(int)barcodeType fromScanner:(int)scannerID
{
    // Deprecated. Use sbtEventBarcodeData
}

- (void)sbtEventBarcodeData:(NSData*)barcodeData barcodeType:(int)barcodeType fromScanner:(int)scannerID
{
}

- (void)sbtEventFirmwareUpdate:(FirmwareUpdateEvent *)fwUpdateEventObj
{
}

- (void)sbtEventImage:(NSData *)imageData fromScanner:(int)scannerID {
}


- (void)sbtEventVideo:(NSData *)videoFrame fromScanner:(int)scannerID {
}

- (BOOL)firmwareDidUpdate
{
    return false;
}

- (int)previousScannerId
{
    return 1;
}

- (void)setFirmwareDidUpdate:(BOOL)updateStatus
{
}

- (void)previousScannerpreviousScanner:(int)scannerIdStatus
{
}

@end
