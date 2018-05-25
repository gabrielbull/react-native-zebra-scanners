#import "Scanner.h"
#import "SbtSdkFactory.h"
#import "RCTZebraScannersEvents.h"
#import "Serializer.h"

@implementation Scanner

- (id)init
{
    self.sbtSdk = [SbtSdkFactory createSbtSdkApiInstance];
    [self.sbtSdk sbtSetDelegate:self];
    
    scannerList = [[NSMutableArray alloc] init];
    
    [self.sbtSdk sbtSetOperationalMode:SBT_OPMODE_ALL];
    
    int notifications_mask = 0;
    notifications_mask |= (SBT_EVENT_SCANNER_APPEARANCE | SBT_EVENT_SCANNER_DISAPPEARANCE | SBT_EVENT_SESSION_ESTABLISHMENT | SBT_EVENT_SESSION_TERMINATION | SBT_EVENT_BARCODE | SBT_EVENT_IMAGE | SBT_EVENT_VIDEO);
    
    [self.sbtSdk sbtSubsribeForEvents:notifications_mask];
    
    BOOL scanner_detection = true;
    
    [self.sbtSdk sbtEnableAvailableScannersDetection:scanner_detection];

    return self;
}

- (NSString *)sbtGetVersion
{
    return [self.sbtSdk sbtGetVersion];
}

- (NSMutableArray *)getScanners
{
    NSMutableArray *scanners = [NSMutableArray array];
    [scannerList enumerateObjectsUsingBlock:^(SbtScannerInfo *scanner, NSUInteger idx, BOOL *stop) {
        [scanners addObject:[Serializer serializeScanner:scanner]];
    }];
    return scanners;
}

- (SBT_RESULT)connect:(int)scannerId
{
    return [self.sbtSdk sbtEstablishCommunicationSession:scannerId];
}

- (BOOL)disconnect:(int)scannerId
{
    SBT_RESULT res = [self.sbtSdk sbtTerminateCommunicationSession:scannerId];
    
    if (res == SBT_RESULT_FAILURE) {
        return NO;
    }
    else
    {
        // Graceful disconnection - Only reconnect to scanners that
        // disconnected unexpectedly. Disable auto reconnect for
        // this device since it disconnected expectedly.
        // [self setAutoReconnectOption:scanner_id enableOption:NO];
        return YES;
    }
}

- (SBT_RESULT)setAutoReconnectOption:(int)scannerId enableOption:(BOOL)enable
{
    SBT_RESULT result = NO;
    result = [self.sbtSdk sbtEnableAutomaticSessionReestablishment:enable forScanner:scannerId];
    if (result == SBT_RESULT_SUCCESS) {
        for (SbtScannerInfo *scanner in [scannerList copy])
        {
            if ([scanner getScannerID] == scannerId)
            {
                [scanner setAutoCommunicationSessionReestablishment:enable];
                break;
            }
        }
    }
    return result;
}

- (void)sbtEventScannerAppeared:(SbtScannerInfo*)availableScanner
{
    BOOL found = NO;
    SbtScannerInfo *scanner;
    
    for (SbtScannerInfo *item in [scannerList copy])
    {
        if ([item getScannerID] == [availableScanner getScannerID])
        {
            [item setActive:NO];
            [item setAvailable:YES];
            [item setAutoCommunicationSessionReestablishment:[availableScanner getAutoCommunicationSessionReestablishment]];
            [item setConnectionType:[availableScanner getConnectionType]];
            found = YES;
            scanner = item;
            break;
        }
    }
    
    if (found == NO)
    {
        scanner = [[SbtScannerInfo alloc] init];
        [scanner setActive:NO];
        [scanner setAvailable:YES];
        [scanner setScannerID:[availableScanner getScannerID]];
        [scanner setAutoCommunicationSessionReestablishment:[availableScanner getAutoCommunicationSessionReestablishment]];
        [scanner setConnectionType:[availableScanner getConnectionType]];
        [scanner setScannerName:[availableScanner getScannerName]];
        [scanner setScannerModel:[availableScanner getScannerModel]];
        [scannerList addObject:scanner];
    }

    [RCTZebraScannersEvents onScannerAppeared:scanner];
}

- (void)sbtEventScannerDisappeared:(int)scannerID
{
    for (SbtScannerInfo *scanner in [scannerList copy])
    {
        if ([scanner getScannerID] == scannerID)
        {
            [scanner setAvailable:NO];
            break;
        }
    }
    
    [RCTZebraScannersEvents onScannerDisappeared:scannerID];
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
