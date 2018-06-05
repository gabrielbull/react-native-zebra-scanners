#import <Foundation/Foundation.h>
#import "ISbtSdkApi.h"
#import "SbtResult.h"

@interface Scanner : NSObject <ISbtSdkApiDelegate> {
    NSMutableArray *scannerList;
}

@property id <ISbtSdkApi> sbtSdk;

- (NSString *)sbtGetVersion;
- (SbtResult *)getAttributes:(int)scannerId withAttributes:(NSArray *)attributes;
- (SBT_RESULT)setAttribute:(int)scannerId withAttribute:(int)attribute withValue:(char)value;
- (SBT_RESULT)performAction:(int)scannerId withActionValue:(int)actionValue;
- (SBT_RESULT)performActionScanEnable:(int)scannerId;
- (SBT_RESULT)performActionScanDisable:(int)scannerId;
- (SBT_RESULT)performActionAimOn:(int)scannerId;
- (SBT_RESULT)performActionAimOff:(int)scannerId;
- (SBT_RESULT)performActionVibrationFeedback:(int)scannerId;
- (SBT_RESULT)performActionTriggerPull:(int)scannerId;
- (SBT_RESULT)performActionTriggerRelease:(int)scannerId;
- (SBT_RESULT)performActionBarcodeMode:(int)scannerId;
- (SBT_RESULT)connect:(int)scannerId;
- (SBT_RESULT)disconnect:(int)scannerId;
- (SBT_RESULT)setAutoReconnectOption:(int)scannerId enableOption:(BOOL)enable;
- (SBT_RESULT)executeCommand:(int)opCode aInXML:(NSString*)inXML aOutXML:(NSMutableString**)outXML forScanner:(int)scannerId;

@end
