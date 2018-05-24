#import "RCTZebraScannersEvents.h"
#import "Serializer.h"

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
    NSDictionary<NSString *, id> *payload = @{@"scanner": [Serializer serializeAvailableScanner:availableScanner]};

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
