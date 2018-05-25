#import <Foundation/Foundation.h>
#import "SbtSdkFactory.h"

@interface Serializer : NSObject
+ (NSDictionary *)serializeScanner:(SbtScannerInfo*)scanner;
+ (NSString *)serializeResultErrorMessage:(SBT_RESULT)result;
+ (NSString *)serializeResultErrorCode:(SBT_RESULT)result;
@end
