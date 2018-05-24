//
//  NSObject+ScannerSDK.h
//  RCTZebraScanners
//
//  Created by Gabriel Bull on 18-05-23.
//

#import <Foundation/Foundation.h>
#import "ISbtSdkApi.h"

@interface ScannerSDK : NSObject <ISbtSdkApiDelegate>

@property id <ISbtSdkApi> apiInstance;

- (NSString *)sbtGetVersion;

@end
