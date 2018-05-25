#import "Serializer.h"

@implementation Serializer
# pragma mark Public
+ (NSDictionary *)serializeScanner:(SbtScannerInfo*)scanner
{
    return @{
             @"active": [NSNumber numberWithBool:[scanner isActive]],
             @"available": [NSNumber numberWithBool:[scanner isAvailable]],
             @"scanner_id": [NSNumber numberWithInt:[scanner getScannerID]],
             @"auto_communication_session_reestablishment": [NSNumber numberWithBool:[scanner getAutoCommunicationSessionReestablishment]],
             @"connection_type": [NSNumber numberWithInt:[scanner getConnectionType]],
             @"scanner_name": [scanner getScannerName],
             @"scanner_model": [NSNumber numberWithInt:[scanner getScannerModel]]
             };
}

+ (NSString *)serializeResultErrorMessage:(SBT_RESULT)result
{
    if (result == SBT_RESULT_FAILURE) {
        return @"SBT_RESULT_FAILURE";
    } else if (result == SBT_RESULT_SCANNER_NOT_AVAILABLE) {
        return @"SBT_RESULT_SCANNER_NOT_AVAILABLE";
    } else if (result == SBT_RESULT_SCANNER_NOT_ACTIVE) {
        return @"SBT_RESULT_SCANNER_NOT_ACTIVE";
    } else if (result == SBT_RESULT_INVALID_PARAMS) {
        return @"SBT_RESULT_INVALID_PARAMS";
    } else if (result == SBT_RESULT_RESPONSE_TIMEOUT) {
        return @"SBT_RESULT_RESPONSE_TIMEOUT";
    } else if (result == SBT_RESULT_OPCODE_NOT_SUPPORTED) {
        return @"SBT_RESULT_OPCODE_NOT_SUPPORTED";
    } else if (result == SBT_RESULT_SCANNER_NO_SUPPORT) {
        return @"SBT_RESULT_SCANNER_NO_SUPPORT";
    }
    return @"UNKNOWN";
}

+ (NSString *)serializeResultErrorCode:(SBT_RESULT)result
{
    if (result == SBT_RESULT_FAILURE) {
        return @"1";
    } else if (result == SBT_RESULT_SCANNER_NOT_AVAILABLE) {
        return @"2";
    } else if (result == SBT_RESULT_SCANNER_NOT_ACTIVE) {
        return @"3";
    } else if (result == SBT_RESULT_INVALID_PARAMS) {
        return @"4";
    } else if (result == SBT_RESULT_RESPONSE_TIMEOUT) {
        return @"5";
    } else if (result == SBT_RESULT_OPCODE_NOT_SUPPORTED) {
        return @"6";
    } else if (result == SBT_RESULT_SCANNER_NO_SUPPORT) {
        return @"7";
    }
    return @"0";
}
@end
