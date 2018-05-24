#import <Foundation/Foundation.h>
#import "SbtSdkFactory.h"

@interface Serializer : NSObject
+ (NSDictionary *)serializeScanner:(SbtScannerInfo*)scanner;
@end
