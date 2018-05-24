#import "Scanner.h"
#import "SbtSdkFactory.h"
#import "RCTZebraScannersEvents.h"
#import "Serializer.h"

@implementation Scanner

- (id)init
{
    self.apiInstance = [SbtSdkFactory createSbtSdkApiInstance];
    [self.apiInstance sbtSetDelegate:self];
    
    scannerList = [[NSMutableArray alloc] init];
    
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

- (NSMutableArray *)getAvailableScanners
{
    NSMutableArray *newArray = [NSMutableArray array];
    [scannerList enumerateObjectsUsingBlock:^(SbtScannerInfo *availableScanner, NSUInteger idx, BOOL *stop) {
        // const NSObject *newObject = [Serializer serializeAvailableScanner:availableScanner];
        [newArray addObject:[Serializer serializeAvailableScanner:availableScanner]];
    }];

    return newArray;
}

- (void)sbtEventScannerAppeared:(SbtScannerInfo*)availableScanner
{
    BOOL found = NO;

    for (SbtScannerInfo *ex_info in [scannerList copy])
    {
        if ([ex_info getScannerID] == [availableScanner getScannerID])
        {
            /* find scanner with ID in dev list */
            [ex_info setActive:NO];
            [ex_info setAvailable:YES];
            [ex_info setAutoCommunicationSessionReestablishment:[availableScanner getAutoCommunicationSessionReestablishment]];
            [ex_info setConnectionType:[availableScanner getConnectionType]];
            found = YES;
            break;
        }
    }
    
    if (found == NO)
    {
        SbtScannerInfo *scanner_info = [[SbtScannerInfo alloc] init];
        [scanner_info setActive:NO];
        [scanner_info setAvailable:YES];
        [scanner_info setScannerID:[availableScanner getScannerID]];
        [scanner_info setAutoCommunicationSessionReestablishment:[availableScanner getAutoCommunicationSessionReestablishment]];
        [scanner_info setConnectionType:[availableScanner getConnectionType]];
        [scanner_info setScannerName:[availableScanner getScannerName]];
        [scanner_info setScannerModel:[availableScanner getScannerModel]];
        [scannerList addObject:scanner_info];
    }

    [RCTZebraScannersEvents onScannerAppeared:availableScanner];
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
