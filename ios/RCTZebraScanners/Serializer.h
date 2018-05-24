#import <Foundation/Foundation.h>
#import "SbtSdkFactory.h"

@interface Serializer : NSObject
+ (NSDictionary *)serializeAvailableScanner:(SbtScannerInfo*)availableScanner;
@end
