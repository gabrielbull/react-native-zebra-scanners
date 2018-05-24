#import <Foundation/Foundation.h>
#import "ISbtSdkApi.h"

@interface Scanner : NSObject <ISbtSdkApiDelegate> {
    NSMutableArray *scannerList;
}


@property id <ISbtSdkApi> apiInstance;

- (NSString *)sbtGetVersion;
- (NSMutableArray *)getAvailableScanners;

@end
