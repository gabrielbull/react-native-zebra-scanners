#import "RCTZebraScannersEvents.h"
#import "Serializer.h"

NSString *const SCANNER_APPEARED = @"ZebraScanners/ScannerAppeared";
NSString *const SCANNER_DISAPPEARED = @"ZebraScanners/ScannerDisappeard";
NSString *const COMMUNICATION_SESSION_ESTABLISHED = @"ZebraScanners/CommunicationSessionEstablished";
NSString *const COMMUNICATION_SESSION_TERMINATED = @"ZebraScanners/CommunicationSessionTerminated";

@implementation RCTZebraScannersEvents

static BOOL _isObserving = NO;
static NSMutableArray * _eventPool;

+ (BOOL)isObserving { return _isObserving; }
+ (void)setIsObserving:(BOOL)isObserving { _isObserving = isObserving; }

+ (NSMutableArray *)eventPool {
    if (!_eventPool) {
        _eventPool = [[NSMutableArray alloc] init];
    }
    return _eventPool;
    
}
+ (void)setEventPool:(NSMutableArray *)eventPool { _eventPool = eventPool; }

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
    RCTZebraScannersEvents.isObserving = YES;
    for (NSString *event in [self supportedEvents]) {
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(handleNotification:)
                                                     name:event
                                                   object:nil];
    }
    [RCTZebraScannersEvents flushEvents];
}

- (void)stopObserving {
    RCTZebraScannersEvents.isObserving = NO;
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

+ (void)flushEvents {
    for (NSDictionary* event in RCTZebraScannersEvents.eventPool)
    {
        [[NSNotificationCenter defaultCenter] postNotificationName:[event valueForKey: @"name"]
                                                            object:self
                                                          userInfo:[event valueForKey: @"payload"]];
    }
    [RCTZebraScannersEvents.eventPool removeAllObjects];
}

# pragma mark Private
+ (void)postNotificationName:(NSString *)name withPayload:(NSDictionary<NSString *, id> *)payload {
    if (RCTZebraScannersEvents.isObserving) {
        [[NSNotificationCenter defaultCenter] postNotificationName:name
                                                            object:self
                                                          userInfo:payload];
    } else {
        [RCTZebraScannersEvents.eventPool addObject:@{@"name": name, @"payload": payload}];
    }
}

- (void)handleNotification:(NSNotification *)notification {
    [self sendEventWithName:notification.name body:notification.userInfo];
}

@end
