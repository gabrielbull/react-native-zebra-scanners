#import "Scanner.h"
#import "SbtSdkFactory.h"

@implementation Scanner

- (id)init
{
    self.apiInstance = [SbtSdkFactory createSbtSdkApiInstance];
    [self.apiInstance sbtSetDelegate:self];
    
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
    NSLog(@"✳️✳️✳️ ARXXC: Event Scanner Appeared");
}

- (void)sbtEventScannerDisappeared:(int)scannerID
{
    NSLog(@"✳️✳️✳️ ARXXC: Event Scanner Disappeared");
}

- (void)sbtEventCommunicationSessionEstablished:(SbtScannerInfo*)activeScanner
{
    NSLog(@"✳️✳️✳️ ARXXC: Communication session established");
}

- (void)sbtEventCommunicationSessionTerminated:(int)scannerID
{
    NSLog(@"✳️✳️✳️ ARXXC: Communication session terminated");
}

- (void)blinkLEDOff
{
    NSLog(@"✳️✳️✳️ ARXXC: BLink LED off");
}

- (void)blinkLEDON
{
    NSLog(@"✳️✳️✳️ ARXXC: BLink LED on");
}

- (void) sbtEventBarcode:(NSString *)barcodeData barcodeType:(int)barcodeType fromScanner:(int)scannerID
{
    // Deprecated. Use sbtEventBarcodeData
}

- (void)sbtEventBarcodeData:(NSData*)barcodeData barcodeType:(int)barcodeType fromScanner:(int)scannerID
{
    NSLog(@"✳️✳️✳️ ARXXC: Event barcode data");
}

- (void)sbtEventFirmwareUpdate:(FirmwareUpdateEvent *)fwUpdateEventObj
{
    NSLog(@"✳️✳️✳️ ARXXC: Event firmware update");
}

- (void)sbtEventImage:(NSData *)imageData fromScanner:(int)scannerID {
    NSLog(@"✳️✳️✳️ ARXXC: Event image data");
}


- (void)sbtEventVideo:(NSData *)videoFrame fromScanner:(int)scannerID {
    NSLog(@"✳️✳️✳️ ARXXC: Event video data");
}

- (BOOL)firmwareDidUpdate
{
    NSLog(@"✳️✳️✳️ ARXXC: Firmware did update");
    return false;
}

- (int)previousScannerId
{
    NSLog(@"✳️✳️✳️ ARXXC: Previous scanner id");
    return 1;
}

- (void)setFirmwareDidUpdate:(BOOL)updateStatus
{
    NSLog(@"✳️✳️✳️ ARXXC: Se firmware did update");
}

- (void)previousScannerpreviousScanner:(int)scannerIdStatus
{
    NSLog(@"✳️✳️✳️ ARXXC: Se firmware did update");
}

@end
