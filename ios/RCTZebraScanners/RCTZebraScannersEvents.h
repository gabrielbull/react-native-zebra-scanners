#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "SbtSdkFactory.h"
#import "DecodeBarcodeData.h"

@interface RCTZebraScannersEvents : RCTEventEmitter <RCTBridgeModule>

@property (class) BOOL isObserving;
@property (class) NSMutableArray * eventPool;

+ (BOOL)onScannerAppeared:(SbtScannerInfo*)availableScanner;
+ (BOOL)onScannerDisappeared:(int)scannerID;
+ (BOOL)onCommunicationSessionEstablished:(SbtScannerInfo*)availableScanner;
+ (BOOL)onCommunicationSessionTerminated:(int)scannerID;
+ (BOOL)onBarcodeData:(NSData*)barcodeData barcodeType:(int)barcodeType fromScanner:(int)scannerID;
+ (BOOL)onFirmwareUpdate:(FirmwareUpdateEvent *)fwUpdateEventObj;
+ (BOOL)onImageData:(NSData *)imageData fromScanner:(int)scannerID;
+ (BOOL)onVideoFrameData:(NSData *)videoFrame fromScanner:(int)scannerID;
+ (void)flushEvents;

@end
