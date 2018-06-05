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

RCT_REMAP_METHOD(getAttributes,
                 params:(NSDictionary *)params
                 getAttributesWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    NSArray *attributes = [params objectForKey:@"attributes"];
    SbtResult *res = [self.scannerSdk getAttributes:scannerId withAttributes:attributes];
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

RCT_REMAP_METHOD(setAttribute,
                 params:(NSDictionary *)params
                 setAttributeWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    int attribute = (int) [[params objectForKey:@"attribute"] integerValue];
    char value = (char) [[params objectForKey:@"value"] charValue];
    SBT_RESULT result = [self.scannerSdk setAttribute:scannerId withAttribute:attribute withValue:value];
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

RCT_REMAP_METHOD(performAction,
                 params:(NSDictionary *)params
                 performActionWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    int actionValue = (int) [[params objectForKey:@"actionValue"] integerValue];
    SBT_RESULT result = [self.scannerSdk performAction:scannerId withActionValue:actionValue];
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

RCT_REMAP_METHOD(performActionScanEnable,
                 params:(NSDictionary *)params
                 performActionScanEnableWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    SBT_RESULT result = [self.scannerSdk performActionScanEnable:scannerId];
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

RCT_REMAP_METHOD(performActionScanDisable,
                 params:(NSDictionary *)params
                 performActionScanDisableWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    SBT_RESULT result = [self.scannerSdk performActionScanDisable:scannerId];
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

RCT_REMAP_METHOD(performActionAimOn,
                 params:(NSDictionary *)params
                 performActionAimOnWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    SBT_RESULT result = [self.scannerSdk performActionAimOn:scannerId];
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

RCT_REMAP_METHOD(performActionAimOff,
                 params:(NSDictionary *)params
                 performActionAimOffWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    SBT_RESULT result = [self.scannerSdk performActionAimOff:scannerId];
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

RCT_REMAP_METHOD(performActionVibrationFeedback,
                 params:(NSDictionary *)params
                 performActionVibrationFeedbackWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    SBT_RESULT result = [self.scannerSdk performActionVibrationFeedback:scannerId];
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

RCT_REMAP_METHOD(performActionTriggerPull,
                 params:(NSDictionary *)params
                 performActionTriggerPullWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    SBT_RESULT result = [self.scannerSdk performActionTriggerPull:scannerId];
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

RCT_REMAP_METHOD(performActionTriggerRelease,
                 params:(NSDictionary *)params
                 performActionTriggerReleaseWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    SBT_RESULT result = [self.scannerSdk performActionTriggerRelease:scannerId];
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

RCT_REMAP_METHOD(performActionBarcodeMode,
                 params:(NSDictionary *)params
                 performActionBarcodeModeWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    int scannerId = (int) [[params objectForKey:@"scannerId"] integerValue];
    SBT_RESULT result = [self.scannerSdk performActionBarcodeMode:scannerId];
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

