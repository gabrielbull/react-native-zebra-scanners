#import <Foundation/Foundation.h>
#import "ISbtSdkApi.h"
#import "SbtResult.h"

@interface Scanner : NSObject <ISbtSdkApiDelegate> {
    NSMutableArray *scannerList;
}

@property id <ISbtSdkApi> sbtSdk;

- (NSString *)sbtGetVersion;
- (SbtResult *)getScannerInfo:(int)scannerId withAttributes:(NSArray *)attributes;
- (SBT_RESULT)performBeeperAction:(int)scannerId withActionValue:(int)actionValue;
- (SBT_RESULT)connect:(int)scannerId;
- (SBT_RESULT)disconnect:(int)scannerId;
- (SBT_RESULT)setAutoReconnectOption:(int)scannerId enableOption:(BOOL)enable;
- (SBT_RESULT)executeCommand:(int)opCode aInXML:(NSString*)inXML aOutXML:(NSMutableString**)outXML forScanner:(int)scannerId;

@end
