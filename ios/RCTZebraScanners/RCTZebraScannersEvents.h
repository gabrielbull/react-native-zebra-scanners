#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "SbtSdkFactory.h"

@interface RCTZebraScannersEvents : RCTEventEmitter <RCTBridgeModule>

+ (BOOL)onScannerAppeared:(SbtScannerInfo*)availableScanner;
+ (BOOL)onScannerDisappeared:(int)scannerID;
+ (BOOL)onCommunicationSessionEstablished:(SbtScannerInfo*)availableScanner;
+ (BOOL)onCommunicationSessionTerminated:(int)scannerID;

@end
