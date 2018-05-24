/******************************************************************************
 *
 *       Copyright Zebra Technologies, Inc. 2014 - 2015
 *
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 *       The code contains Zebra Technologies
 *       Confidential Proprietary Information.
 *
 *
 *  Description:  BarcodeImage.h
 *
 *  Notes: Contains utilities for barcodes such as creating image from
 *         a configuration code.
 *
 ******************************************************************************/

#import <Foundation/Foundation.h>
@import UIKit;

@interface BarcodeImage : NSObject

+ (UIImage *) generateBarcodeImageUsingConfigCode : (NSString *)configurationCode withHeight:(CGFloat)imgHeight andWidth:(CGFloat)imgWidth;

@end
