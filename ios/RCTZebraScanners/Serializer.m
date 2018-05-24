#import "Serializer.h"

@implementation Serializer
# pragma mark Public
+ (NSDictionary *)serializeAvailableScanner:(SbtScannerInfo*)availableScanner
{
    return @{
        @"active": @NO,
        @"available": @YES,
        @"scanner_id": [NSNumber numberWithInt:[availableScanner getScannerID]],
        @"auto_communcation_session_reestablishment": [NSNumber numberWithBool:[availableScanner getAutoCommunicationSessionReestablishment]],
        @"connection_type": [NSNumber numberWithInt:[availableScanner getConnectionType]],
        @"scanner_name": [availableScanner getScannerName],
        @"scanner_model": [NSNumber numberWithInt:[availableScanner getScannerModel]]
    };
}
@end
