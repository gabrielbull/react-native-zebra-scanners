#import "RCTZebraScannersEvents.h"

@implementation RCTZebraScannersEvents

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"EventReminder"];
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

- (void)calendarEventReminderReceived:(NSNotification *)notification
{
    NSString *eventName = notification.userInfo[@"name"];
    [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
}

# pragma mark Public
+ (BOOL)didSightBeacon
{
    NSString *beaconID = @"men wow";
    NSLog(@"✳️✳️✳️ ARXXC: Event Scanner Appeared");
    [self postNotificationName:@"EventReminder" withPayload:beaconID];
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
    NSLog(@"✳️✳️✳️ ARXXC: Event Scanner Appeared");
    [self sendEventWithName:notification.name body:notification.userInfo];
}

@end
