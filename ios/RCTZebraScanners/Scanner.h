#import <Foundation/Foundation.h>
#import "ISbtSdkApi.h"

@interface Scanner : NSObject <ISbtSdkApiDelegate>

@property id <ISbtSdkApi> apiInstance;

- (NSString *)sbtGetVersion;

@end
