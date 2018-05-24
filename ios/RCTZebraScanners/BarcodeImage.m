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
 *  Description:  BarcodeImage.m
 *
 *  Notes: Contains utilities for barcodes such as creating image from
 *         a configuration code.
 *
 ******************************************************************************/

#import "BarcodeImage.h"
#import "BarcodeGen128.h"

@implementation BarcodeImage

+ (UIImage *) generateBarcodeImageUsingConfigCode : (NSString *)configurationCode withHeight:(CGFloat)imgHeight andWidth:(CGFloat)imgWidth
{
    /* 1) get representation and width */
    unsigned int barcode_width = 0;
    unsigned short* barcode_data;
    barcode_data = (unsigned short*)malloc(1024*sizeof(unsigned short));
    memset((void*)barcode_data, 0x00, 1024*sizeof(unsigned short));
    NSString *input_str = configurationCode;
    char *input = malloc(sizeof(char)*([input_str length] + 3 + 1));
    memset((void*)input, 0x00, sizeof(char)*([input_str length] + 3 + 1));
    sprintf(input, "\003%s", [input_str cStringUsingEncoding:NSASCIIStringEncoding]);
    
    int barcode_len = generateBarcode128B1(input, (unsigned short*)barcode_data, &barcode_width);
    
    free(input);
    
    /* 2) draw on UIImage with height of UIImageView and required width */
    
    /* TBD */
    unsigned short _barcode_line_width = 10;
    
    CGFloat image_height = imgHeight;
    CGFloat image_width = barcode_width * _barcode_line_width;
    
    CGRect image_rect = CGRectMake(0.0, 0.0, image_width, image_height);
    
    UIGraphicsBeginImageContextWithOptions(image_rect.size, NO, 1);
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    
    /* will the background in white */
    CGContextSetRGBFillColor(ctx, 1.0,1.0,1.0,1.0);
    CGContextFillRect(ctx, image_rect);
    CGContextSaveGState(ctx);
    
    unsigned short barcode;
    unsigned short w;
    CGFloat x = 0.0;
    CGFloat y = 0.0;
    CGFloat l = image_height;
    
    CGContextSetRGBFillColor(ctx, 0.0, 0.0, 0.0, 1.0);
    for(unsigned i = 0; i < barcode_len; i++)
    {
        barcode = barcode_data[i];
        
        w = (barcode & 0x3) + 1;
        w *= _barcode_line_width;
        barcode >>= 2;
        CGContextFillRect(ctx, CGRectMake(x, y, w, l));
        x += w;
        w = (barcode & 0x3) + 1;
        w *= _barcode_line_width;
        barcode >>= 2;
        x += w;
        
        w = (barcode & 0x3) + 1;
        w *= _barcode_line_width;
        barcode >>= 2;
        CGContextFillRect(ctx, CGRectMake(x, y, w, l));
        x += w;
        w = (barcode & 0x3) + 1;
        w *= _barcode_line_width;
        barcode >>= 2;
        x += w;
        
        w = (barcode & 0x3) + 1;
        w *= _barcode_line_width;
        barcode >>= 2;
        CGContextFillRect(ctx, CGRectMake(x, y, w, l));
        x += w;
        w = (barcode & 0x3) + 1;
        w *= _barcode_line_width;
        barcode >>= 2;
        x += w;
        
    }
    w = (barcode & 0x3) + 1;
    w *= _barcode_line_width;
    barcode >>= 2;
    CGContextFillRect(ctx, CGRectMake(x, y, w, l));
    
    CGContextRestoreGState(ctx);
    
    UIImage *barcode_image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    /* 3) resize UIImage and display it in UIImageView */
    
    CGFloat image_view_height = imgHeight;
    CGFloat image_view_width = imgWidth;
    
    CGRect image_view_rect = CGRectMake(0.0, 0.0, image_view_width, image_view_height);
    
    UIGraphicsBeginImageContext(image_view_rect.size);
    [barcode_image drawInRect:image_view_rect];
    
    UIImage *final_barcode_image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    /* UIImage returned by UIGraphicsGetImageFromCurrentImageContext() is autoreleased object */

    free(barcode_data);
    
    return final_barcode_image;
}

@end

