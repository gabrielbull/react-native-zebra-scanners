#import "RCTZebraScanners.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import "BarcodeImage.h"
#import "Serializer.h"
#import "SbtResult.h"

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

RCT_REMAP_METHOD(getScannerInfo,
                 params:(NSDictionary *)params
                 getScannerInfoWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    NSArray *attributes = [params objectForKey:@"attributes"];
    SbtResult *res = [self.scannerSdk getScannerInfo:scannerId withAttributes:attributes];
    if (res.result == SBT_RESULT_SUCCESS) {
        resolve(res.response);
    } else {
        reject(
               [Serializer serializeResultErrorCode:res.result],
               [Serializer serializeResultErrorMessage:res.result],
               [NSError errorWithDomain:[Serializer serializeResultErrorMessage:res.result] code:res.result userInfo:nil]
               );
    }
}

RCT_REMAP_METHOD(connect,
                 params:(NSDictionary *)params
                 connectWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    SBT_RESULT result = [self.scannerSdk connect:scannerId];
    if (result == SBT_RESULT_SUCCESS) {
        resolve(@"");
    } else {
        reject(
               [Serializer serializeResultErrorCode:result],
               [Serializer serializeResultErrorMessage:result],
               [NSError errorWithDomain:[Serializer serializeResultErrorMessage:result] code:result userInfo:nil]
               );
    }
}

RCT_REMAP_METHOD(disconnect,
                 params:(NSDictionary *)params
                 disconnectWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    SBT_RESULT result = [self.scannerSdk disconnect:scannerId];
    if (result == SBT_RESULT_SUCCESS) {
        resolve(@"");
    } else {
        reject(
               [Serializer serializeResultErrorCode:result],
               [Serializer serializeResultErrorMessage:result],
               [NSError errorWithDomain:[Serializer serializeResultErrorMessage:result] code:result userInfo:nil]
               );
    }
}

RCT_REMAP_METHOD(setAutoReconnectOption,
                 params:(NSDictionary *)params
                 setAutoReconnectOptionResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    int enable = (BOOL) [[params objectForKey:@"enableOption"] boolValue];
    SBT_RESULT result = [self.scannerSdk setAutoReconnectOption:scannerId enableOption:enable];
    if (result == SBT_RESULT_SUCCESS) {
        resolve(@"");
    } else {
        reject(
               [Serializer serializeResultErrorCode:result],
               [Serializer serializeResultErrorMessage:result],
               [NSError errorWithDomain:[Serializer serializeResultErrorMessage:result] code:result userInfo:nil]
               );
    }
}

RCT_REMAP_METHOD(getPairingBarcode,
                 params:(NSDictionary *)params
                 getPairingBarcodeWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    CGRect aRect = CGRectMake(0, 0, [[params objectForKey:@"width"] integerValue], [[params objectForKey:@"height"] integerValue]);
    NSString *btAddress = @"";
    
    UIImage *image = [self.scannerSdk.sbtSdk sbtGetPairingBarcode:BARCODE_TYPE_STC withComProtocol:STC_SSI_BLE withSetDefaultStatus:SETDEFAULT_YES withBTAddress:btAddress withImageFrame:aRect];

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

