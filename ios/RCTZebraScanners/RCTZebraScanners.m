#import "RCTZebraScanners.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import "BarcodeImage.h"

@implementation RCTZebraScanners

RCT_EXPORT_MODULE();

- (id)init {
    self = [super init];
    self.scannerSdk = [[Scanner alloc] init];
    return self;
}

- (NSDictionary *)constantsToExport
{
    return @{ @"sdkVersion": [self.scannerSdk sbtGetVersion] };
}

RCT_REMAP_METHOD(getPairingBarcode,
                 params:(NSDictionary *)params
                 getPairingBarcodeWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    CGRect aRect = CGRectMake(0, 0, [[params objectForKey:@"width"] integerValue], [[params objectForKey:@"height"] integerValue]);
    NSString *btAddress = @"";
    
    UIImage *image = [self.scannerSdk.apiInstance sbtGetPairingBarcode:BARCODE_TYPE_STC withComProtocol:STC_SSI_BLE withSetDefaultStatus:SETDEFAULT_YES withBTAddress:btAddress withImageFrame:aRect];

    NSData *imageData = UIImagePNGRepresentation(image);
    NSString *encodedString = [imageData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];

    resolve(encodedString);
}

RCT_REMAP_METHOD(getResetFactoryDefaultsBarcode,
                 params:(NSDictionary *)params
                 getResetFactoryDefaultsBarcodeWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    UIImage *image = [BarcodeImage generateBarcodeImageUsingConfigCode:@"92" withHeight:[[params objectForKey:@"height"] integerValue] andWidth:[[params objectForKey:@"width"] integerValue]];
    
    NSData *imageData = UIImagePNGRepresentation(image);
    NSString *encodedString = [imageData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    
    resolve(encodedString);
}

RCT_REMAP_METHOD(getBtleSsiBarcode,
                 params:(NSDictionary *)params
                 getBtleSsiBarcodeWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    UIImage *image = [BarcodeImage generateBarcodeImageUsingConfigCode:@"N017F17" withHeight:[[params objectForKey:@"height"] integerValue] andWidth:[[params objectForKey:@"width"] integerValue]];
    
    NSData *imageData = UIImagePNGRepresentation(image);
    NSString *encodedString = [imageData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    
    resolve(encodedString);
}

@end

