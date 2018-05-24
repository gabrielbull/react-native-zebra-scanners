/**
 * Copyright (c) 2018-present, Gabriel Bull
 * All rights reserved.
 *
 * This source code is private and unlicensed. Do not use or modify.
 */

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "ScannerSDK.h"

@interface RCTZebraScanners : NSObject <RCTBridgeModule>

@property (strong) ScannerSDK *scannerSdk;

@end
