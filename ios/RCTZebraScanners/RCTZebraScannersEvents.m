#import "RCTZebraScannersEvents.h"
#import "Serializer.h"

NSString *const SCANNER_APPEARED = @"ZebraScanners/ScannerAppeared";
NSString *const SCANNER_DISAPPEARED = @"ZebraScanners/ScannerDisappeard";
NSString *const COMMUNICATION_SESSION_ESTABLISHED = @"ZebraScanners/CommunicationSessionEstablished";
NSString *const COMMUNICATION_SESSION_TERMINATED = @"ZebraScanners/CommunicationSessionTerminated";

@implementation RCTZebraScannersEvents

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
    return @{
         @"SCANNER_APPEARED": SCANNER_APPEARED,
         @"SCANNER_DISAPPEARED": SCANNER_DISAPPEARED,
         @"COMMUNICATION_SESSION_ESTABLISHED": COMMUNICATION_SESSION_ESTABLISHED,
         @"COMMUNICATION_SESSION_TERMINATED": COMMUNICATION_SESSION_TERMINATED
    };
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[SCANNER_APPEARED, SCANNER_DISAPPEARED, COMMUNICATION_SESSION_ESTABLISHED, COMMUNICATION_SESSION_TERMINATED];
}

- (void)startObserving {
    for (NSString *event in [self supportedEvents]) {
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(handleNotification:)
                                                     name:event
                                                   object:nil];
    }
}

- (void)stopObserving {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

# pragma mark Public
+ (BOOL)onScannerAppeared:(SbtScannerInfo*)availableScanner
{
    [self postNotificationName:SCANNER_APPEARED withPayload:@{@"scanner": [Serializer serializeScanner:availableScanner]}];
    return YES;
}

+ (BOOL)onScannerDisappeared:(int)scannerID
{
    [self postNotificationName:SCANNER_DISAPPEARED withPayload:@{@"scannerId": [NSNumber numberWithInt:scannerID]}];
    return YES;
}

+ (BOOL)onCommunicationSessionEstablished:(SbtScannerInfo*)availableScanner
{
    [self postNotificationName:COMMUNICATION_SESSION_ESTABLISHED withPayload:@{@"scanner": [Serializer serializeScanner:availableScanner]}];
    return YES;
}

+ (BOOL)onCommunicationSessionTerminated:(int)scannerID
{
    [self postNotificationName:COMMUNICATION_SESSION_TERMINATED withPayload:@{@"scannerId": [NSNumber numberWithInt:scannerID]}];
    return YES;
}

# pragma mark Private
+ (void)postNotificationName:(NSString *)name withPayload:(NSDictionary<NSString *, id> *)payload {
    [[NSNotificationCenter defaultCenter] postNotificationName:name
                                                        object:self
                                                      userInfo:payload];
}

- (void)handleNotification:(NSNotification *)notification {
    [self sendEventWithName:notification.name body:notification.userInfo];
}

@end
