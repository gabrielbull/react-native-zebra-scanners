#import "Serializer.h"

@implementation Serializer
# pragma mark Public
+ (NSDictionary *)serializeScanner:(SbtScannerInfo*)scanner
{
    return @{
        @"active": [NSNumber numberWithBool:[scanner isActive]],
        @"available": [NSNumber numberWithBool:[scanner isAvailable]],
        @"scanner_id": [NSNumber numberWithInt:[scanner getScannerID]],
        @"auto_communcation_session_reestablishment": [NSNumber numberWithBool:[scanner getAutoCommunicationSessionReestablishment]],
        @"connection_type": [NSNumber numberWithInt:[scanner getConnectionType]],
        @"scanner_name": [scanner getScannerName],
        @"scanner_model": [NSNumber numberWithInt:[scanner getScannerModel]]
    };
}
@end
