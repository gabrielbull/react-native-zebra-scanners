# Zebra Scanners SDK for React Native

https://www.zebra.com/content/dam/zebra_new_ia/en-us/manuals/barcode-scanners/scannerios-dg-en.pdf

Configure the Xcode project to support one or more external accessory communication protocols through the 
UISupportedExternalAccessoryProtocols key in your application Info.plist file or via the Info tab of your project 
settings.

| Communication Protocol           | Zebra Scanner |
|----------------------------------|---------------|
| com.motorolasolutions.CS4070_ssi | CS4070        |
| com.zebra.scanner.SSI            | RFD8500       |
| com.motorolasolutions.scanner    | RFD8500       |

In order to configure your application to communicate with Bluetooth scanners in a background mode, configure your 
Xcode project to specify the background modes that your application supports using the UIBackgroundModes key in your 
application Info.plist file or via the Info tab of your project settings.
