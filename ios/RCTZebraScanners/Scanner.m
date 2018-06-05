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

- (SbtResult *)getAttributes:(int)scannerId withAttributes:(NSArray *)attributes {
    NSString *in_xml = [NSString stringWithFormat:@"<inArgs><scannerID>%d</scannerID><cmdArgs><arg-xml><attrib_list>%@</attrib_list></arg-xml></cmdArgs></inArgs>", scannerId, [attributes componentsJoinedByString:@","]];
    
    NSMutableString *response = [[NSMutableString alloc] init];
    [response setString:@""];
    SBT_RESULT result = [self executeCommand:SBT_RSM_ATTR_GET aInXML:in_xml aOutXML:&response forScanner:scannerId];
    return [[SbtResult alloc] initWithResponse:result withResponse:response];
}

- (SBT_RESULT)setAttribute:(int)scannerId withAttribute:(int)attribute withValue:(char)value {
    NSString *in_xml = [NSString stringWithFormat:@"<inArgs><scannerID>%d</scannerID><cmdArgs><arg-xml><attrib_list><attribute><id>%d</id><datatype>B</datatype><value>%d</value></attribute></attrib_list></arg-xml></cmdArgs></inArgs>", scannerId, attribute, value];
    return [self executeCommand:SBT_RSM_ATTR_SET aInXML:in_xml aOutXML:nil forScanner:scannerId];
}

- (SBT_RESULT)performAction:(int)scannerId withActionValue:(int)actionValue {
    NSString *in_xml = [NSString stringWithFormat:@"<inArgs><scannerID>%d</scannerID><cmdArgs><arg-int>%d</arg-int></cmdArgs></inArgs>", scannerId, actionValue];
    return [self executeCommand:SBT_SET_ACTION aInXML:in_xml aOutXML:nil forScanner:scannerId];
}

- (SBT_RESULT)performActionScanEnable:(int)scannerId
{
    NSString *in_xml = [NSString stringWithFormat:@"<inArgs><scannerID>%d</scannerID></inArgs>", scannerId];
    return [self executeCommand:SBT_DEVICE_SCAN_ENABLE aInXML:in_xml aOutXML:nil forScanner:scannerId];
}

- (SBT_RESULT)performActionScanDisable:(int)scannerId
{
    NSString *in_xml = [NSString stringWithFormat:@"<inArgs><scannerID>%d</scannerID></inArgs>", scannerId];
    return [self executeCommand:SBT_DEVICE_SCAN_DISABLE aInXML:in_xml aOutXML:nil forScanner:scannerId];
}

- (SBT_RESULT)performActionAimOn:(int)scannerId
{
    NSString *in_xml = [NSString stringWithFormat:@"<inArgs><scannerID>%d</scannerID></inArgs>", scannerId];
    return [self executeCommand:SBT_DEVICE_AIM_ON aInXML:in_xml aOutXML:nil forScanner:scannerId];
}

- (SBT_RESULT)performActionAimOff:(int)scannerId
{
    NSString *in_xml = [NSString stringWithFormat:@"<inArgs><scannerID>%d</scannerID></inArgs>", scannerId];
    return [self executeCommand:SBT_DEVICE_AIM_OFF aInXML:in_xml aOutXML:nil forScanner:scannerId];
}

- (SBT_RESULT)performActionVibrationFeedback:(int)scannerId
{
    NSString *in_xml = [NSString stringWithFormat:@"<inArgs><scannerID>%d</scannerID></inArgs>", scannerId];
    return [self executeCommand:SBT_DEVICE_VIBRATION_FEEDBACK aInXML:in_xml aOutXML:nil forScanner:scannerId];
}

- (SBT_RESULT)performActionTriggerPull:(int)scannerId
{
    NSString *in_xml = [NSString stringWithFormat:@"<inArgs><scannerID>%d</scannerID></inArgs>", scannerId];
    return [self executeCommand:SBT_DEVICE_PULL_TRIGGER aInXML:in_xml aOutXML:nil forScanner:scannerId];
}

- (SBT_RESULT)performActionTriggerRelease:(int)scannerId
{
    NSString *in_xml = [NSString stringWithFormat:@"<inArgs><scannerID>%d</scannerID></inArgs>", scannerId];
    return [self executeCommand:SBT_DEVICE_RELEASE_TRIGGER aInXML:in_xml aOutXML:nil forScanner:scannerId];
}

- (SBT_RESULT)performActionBarcodeMode:(int)scannerId
{
    NSString *in_xml = [NSString stringWithFormat:@"<inArgs><scannerID>%d</scannerID></inArgs>", scannerId];
    return [self executeCommand:SBT_DEVICE_CAPTURE_BARCODE aInXML:in_xml aOutXML:nil forScanner:scannerId];
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

@end
