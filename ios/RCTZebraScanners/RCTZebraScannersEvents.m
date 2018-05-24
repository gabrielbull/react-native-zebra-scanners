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
+ (BOOL)onScannerAppeared:(SbtScannerInfo*)availableScanner
{
    NSDictionary<NSString *, id> *payload = @{@"scanner": @{
                                              @"active": @NO,
                                              @"available": @YES,
                                              @"scanner_id": [NSNumber numberWithInt:[availableScanner getScannerID]],
                                              @"auto_communcation_session_reestablishment": [NSNumber numberWithBool:[availableScanner getAutoCommunicationSessionReestablishment]],
                                              @"connection_type": [NSNumber numberWithInt:[availableScanner getConnectionType]],
                                              @"scanner_name": [availableScanner getScannerName],
                                              @"scanner_model": [NSNumber numberWithInt:[availableScanner getScannerModel]]
                                              }};

    [self postNotificationName:SCANNER_APPEARED withPayload:payload];
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
