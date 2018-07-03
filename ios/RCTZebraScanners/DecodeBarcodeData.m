#import "DecodeBarcodeData.h"

@implementation DecodeBarcodeData

# pragma mark Public
+ (NSString *)decodeBarcodeData:(NSData*)barcodeData
{
    NSString *decodeDataString = [[NSString alloc] initWithBytes:((unsigned char*)[barcodeData bytes]) length:([barcodeData length]) encoding:NSUTF8StringEncoding];
    
    if (decodeDataString == nil)
    {
        unsigned char *bytes = (unsigned char*)[barcodeData bytes];
        NSMutableString *decodeDataBytesStr = [[NSMutableString alloc] initWithString:@"Data cannot be displayed as string:"];
        for (int i = 0; i < [barcodeData length]; i++)
        {
            [decodeDataBytesStr appendFormat:@"0x%02X ",bytes[i]];
        }
        decodeDataString = [[NSString alloc] initWithString:decodeDataBytesStr];
    }
    
    return decodeDataString;
}

@end
