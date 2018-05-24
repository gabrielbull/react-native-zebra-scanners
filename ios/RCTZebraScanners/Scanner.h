#import <Foundation/Foundation.h>
#import "ISbtSdkApi.h"
#import "RCTZebraScannersEvents.h"

@interface Scanner : NSObject <ISbtSdkApiDelegate>

@property id <ISbtSdkApi> apiInstance;

- (NSString *)sbtGetVersion;

@end
