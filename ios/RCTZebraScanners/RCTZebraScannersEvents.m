#import "RCTZebraScannersEvents.h"

NSString *const SCANNER_APPEARED = @"ZebraScanners/ScannerAppeared";

@implementation RCTZebraScannersEvents

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
    return @{ @"SCANNER_APPEARED": SCANNER_APPEARED };
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"EventReminder", SCANNER_APPEARED];
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
+ (BOOL)didSightBeacon
{
    NSString *beaconID = @"men wow";
    NSLog(@"⚛️⚛️⚛️ ARXXC: didSightBeacon");
    [self postNotificationName:@"EventReminder" withPayload:beaconID];
    return YES;
}

+ (BOOL)onScannerAppeared:(SbtScannerInfo*)availableScanner
{
    [self postNotificationName:SCANNER_APPEARED withPayload:@{
                                                              @"active": @NO,
                                                              @"available": @YES,
                                                              @"scanner_id": [NSNumber numberWithInt:[availableScanner getScannerID]],
                                                              @"auto_communcation_session_reestablishment": [NSNumber numberWithBool:[availableScanner getAutoCommunicationSessionReestablishment]],
                                                              @"connection_type": [NSNumber numberWithInt:[availableScanner getConnectionType]],
                                                              @"scanner_name": [availableScanner getScannerName],
                                                              @"scanner_model": [NSNumber numberWithInt:[availableScanner getScannerModel]]
                                                              }];
    return YES;
}

# pragma mark Private
+ (void)postNotificationName:(NSString *)name withPayload:(NSObject *)object {
    NSDictionary<NSString *, id> *payload = @{@"payload": object};
    
    [[NSNotificationCenter defaultCenter] postNotificationName:name
                                                        object:self
                                                      userInfo:payload];
}

- (void)handleNotification:(NSNotification *)notification {
    NSLog(@"⚛️⚛️⚛️ ARXXC: handleNotification");
    [self sendEventWithName:notification.name body:notification.userInfo];
}

@end
