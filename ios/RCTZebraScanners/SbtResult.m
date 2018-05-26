#import "SbtResult.h"

@implementation SbtResult
-(id)initWithResponse:(SBT_RESULT)result withResponse:(NSString *)response
{
    self.result = result;
    self.response = response;
    return self;
}
@end
