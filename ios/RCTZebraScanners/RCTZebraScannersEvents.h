#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCTZebraScannersEvents : RCTEventEmitter <RCTBridgeModule>

+ (BOOL)didSightBeacon;

@end
