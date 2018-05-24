#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import "Scanner.h"

@interface RCTZebraScanners : NSObject <RCTBridgeModule>

@property (strong) Scanner *scannerSdk;
@property (strong) RCTZebraScannersEvents *events;

@end
