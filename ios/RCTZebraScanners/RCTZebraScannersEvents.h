#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "SbtSdkFactory.h"

@interface RCTZebraScannersEvents : RCTEventEmitter <RCTBridgeModule>

+ (BOOL)didSightBeacon;
+ (BOOL)onScannerAppeared:(SbtScannerInfo*)availableScanner;

@end
