#import <Foundation/Foundation.h>
#import "ISbtSdkApi.h"

@interface Scanner : NSObject <ISbtSdkApiDelegate> {
    NSMutableArray *scannerList;
}

@property id <ISbtSdkApi> sbtSdk;

- (NSString *)sbtGetVersion;
- (NSMutableArray *)getScanners;
- (SBT_RESULT)connect:(int)scannerId;
- (BOOL)disconnect:(int)scannerId;
- (SBT_RESULT)setAutoReconnectOption:(int)scannerId enableOption:(BOOL)enable;

@end
