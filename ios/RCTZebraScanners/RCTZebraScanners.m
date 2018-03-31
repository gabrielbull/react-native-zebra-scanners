/**
 * Copyright (c) 2018-present, Gabriel Bull
 * All rights reserved.
 *
 * This source code is private and unlicensed. Do not use or modify.
 */

#import "RCTZebraScanners.h"
#import <React/RCTLog.h>

@implementation RCTZebraScanners

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(hello:(NSString *)value)
{
    RCTLogInfo(@"Hello %@", value);
}

@end
