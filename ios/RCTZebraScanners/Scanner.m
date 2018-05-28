#import "Scanner.h"
#import "SbtSdkFactory.h"
#import "RCTZebraScannersEvents.h"
#import "Serializer.h"
#import "RMDAttributes.h"

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

- (SbtResult *)getScannerInfo:(int)scannerId withAttributes:(NSArray *)attributes {
    NSString *in_xml = [NSString stringWithFormat:@"<inArgs><scannerID>%d</scannerID><cmdArgs><arg-xml><attrib_list>%@</attrib_list></arg-xml></cmdArgs></inArgs>", scannerId, [attributes componentsJoinedByString:@","]];

    NSMutableString *response = [[NSMutableString alloc] init];
    [response setString:@""];
    SBT_RESULT result = [self executeCommand:SBT_RSM_ATTR_GET aInXML:in_xml aOutXML:&response forScanner:scannerId];
    return [[SbtResult alloc] initWithResponse:result withResponse:response];
}

- (SBT_RESULT)connect:(int)scannerId
{
    return [self.sbtSdk sbtEstablishCommunicationSession:scannerId];
}

- (SBT_RESULT)disconnect:(int)scannerId
{
    return [self.sbtSdk sbtTerminateCommunicationSession:scannerId];
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

- (SBT_RESULT)executeCommand:(int)opCode aInXML:(NSString*)inXML aOutXML:(NSMutableString**)outXML forScanner:(int)scannerId
{
    return [self.sbtSdk sbtExecuteCommand:opCode aInXML:inXML aOutXML:outXML forScanner:scannerId];
}

- (void)sbtEventScannerAppeared:(SbtScannerInfo*)availableScanner
{
    SbtScannerInfo *scanner;
    
    scanner = [[SbtScannerInfo alloc] init];
    [scanner setActive:NO];
    [scanner setAvailable:YES];
    [scanner setScannerID:[availableScanner getScannerID]];
    [scanner setAutoCommunicationSessionReestablishment:[availableScanner getAutoCommunicationSessionReestablishment]];
    [scanner setConnectionType:[availableScanner getConnectionType]];
    [scanner setScannerName:[availableScanner getScannerName]];
    [scanner setScannerModel:[availableScanner getScannerModel]];
    [scannerList addObject:scanner];

    [RCTZebraScannersEvents onScannerAppeared:scanner];
}

- (void)sbtEventScannerDisappeared:(int)scannerID
{
    [RCTZebraScannersEvents onScannerDisappeared:scannerID];
}

- (void)sbtEventCommunicationSessionEstablished:(SbtScannerInfo*)activeScanner
{
    [RCTZebraScannersEvents onCommunicationSessionEstablished:activeScanner];
}

- (void)sbtEventCommunicationSessionTerminated:(int)scannerID
{
    [RCTZebraScannersEvents onCommunicationSessionTerminated:scannerID];
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
