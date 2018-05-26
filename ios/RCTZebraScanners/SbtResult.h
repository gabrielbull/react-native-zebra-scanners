#import <Foundation/Foundation.h>
#import "SbtSdkDefs.h"

@interface SbtResult : NSObject

@property SBT_RESULT result;
@property NSString * response;

-(id)initWithResponse:(SBT_RESULT)result withResponse:(NSString *)response;

@end
