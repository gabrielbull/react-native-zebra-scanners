/**
 * Copyright (c) 2018-present, Gabriel Bull
 * All rights reserved.
 *
 * This source code is private and unlicensed. Do not use or modify.
 */

#import "RCTZebraScanners.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import "SbtSdkFactory.h"

@implementation RCTZebraScanners

RCT_EXPORT_MODULE();

- (id)init {
    self.apiInstance = [SbtSdkFactory createSbtSdkApiInstance];
    return self;
}

- (NSDictionary *)constantsToExport
{
    NSString *version = [self.apiInstance sbtGetVersion];
    return @{ @"sdkVersion": version };
}

RCT_EXPORT_METHOD(hello:(NSString *)value)
{
    RCTLogInfo(@"Hello %@", value);
}

RCT_REMAP_METHOD(getPairingBarCode,
                 params:(NSDictionary *)params
                 getPairingBarCodeWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    CGRect aRect = CGRectMake(0, 0, [[params objectForKey:@"width"] integerValue], [[params objectForKey:@"height"] integerValue]);
    NSString *btAddress = @"00:00:00:00:00:00";
    
    UIImage *image = [self.apiInstance sbtGetPairingBarcode:BARCODE_TYPE_STC withComProtocol:STC_SSI_BLE withSetDefaultStatus:SETDEFAULT_YES withBTAddress:btAddress withImageFrame:aRect];

    NSData *imageData = UIImagePNGRepresentation(image);
    NSString *encodedString = [imageData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];

    resolve(encodedString);
}

@end

