# khenshin Pod

## Installation

Add the following line to your Podfile

    pod 'khenshin', :git => 'https://github.com/khipu/khenshin-pod.git', :tag => '1.712'

Updates your pods

    pod install

## Usage

Add khenshin to your project

    #import <khenshin/khenshin.h>

Configure khenshin before using it

    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
        //  Other code
        [self configureKhenshin];
        // maybe more Code
        return YES;
    }
    
    - (void)configureKhenshin{
        @try {
            [KhenshinInterface initWithBuilderBlock:^(KhenshinBuilder *builder) {
                builder.APIUrl = @"https://khipu.com/app/enc/";
                builder.barCenteredLogo = [UIImage imageNamed:@"StoreLogoSmall"];
                builder.barLeftSideLogo = [UIImage imageNamed:@"StoreLogo"];
                builder.allowCredentialsSaving = YES;
                /**
                 * Main button style can have one of the following values
                 *  - KHMainButtonDefault: use default button
                 *  - KHMainButtonFatOnForm: use fat button
                 *  - KHMainButtonSkinnyOnForm: use skinny
                 */
                builder.mainButtonStyle = KHMainButtonFatOnForm;
                /**
                 * Hides or display the browser url 
                 */
                builder.hideWebAddressInformationInForm = YES;
                builder.useBarCenteredLogoInForm = YES;
                builder.principalColor = [UIColor myCustomColor];
                builder.darkerPrincipalColor = [UIColor myCustomColor];
                builder.secondaryColor = [UIColor mySecondaryColor];
                builder.navigationBarTextTint = [UIColor whiteColor];
                builder.backgroundColor = [UIColor whiteColor];
            }];
        } @catch (NSException *exception) {
            NSLog(@"Khenshin failed to init: %@", [exception reason]);
        }
    }

    - (UIColor *)myCustomColor{
        CGFloat nRed = 55.0/255.0;
        CGFloat nGreen = 35.0/255.0;
        CGFloat nBlue = 109.0/255.0;
        return [[UIColor alloc] initWithRed:nRed green:nGreen blue:nBlue alpha:1];
    }
    
    - (UIColor *)mySecondaryColor{
        CGFloat nRed = 16.0/255.0;
        CGFloat nGreen = 180.0/255.0;
        CGFloat nBlue = 242.0/255.0;
        return [[UIColor alloc] initWithRed:nRed green:nGreen blue:nBlue alpha:1];
    }

Now start a payment using a paymentId

    [KhipuKhenshinInterface startEngineWithPaymentExternalId:@"<a-payment-id>"
                                              userIdentifier:@"<user-identifier>"
                                           isExternalPayment:NO
                                        navigationController:[self navigationController]
                                                    animated:YES
                                                     success:^(NSURL *returnURL){
                                                         [KhipuKhenshinInterface setOtherThanOwnerWillPayOnThisDevice:NO];

                                                         // [self doSomethingWithTheReturnURLIfExternalPaymentIsYES:returnURL];
                                                         // Example: [[UIApplication sharedApplication] openURL:returnURL];

                                                         // [self doSomethingToDisplayIfThePaymentIsBeignConciliated];
                                                     }
                                                     failure:^(NSURL *returnURL){
                                                         [KhipuKhenshinInterface setOtherThanOwnerWillPayOnThisDevice:NO];

                                                         // [self doSomethingWithTheReturnURLIfExternalPaymentIsYES:returnURL];
                                                         // Example: [[UIApplication sharedApplication] openURL:returnURL];

                                                         // [self doSomethingToDisplayIfThePaymentFailed];
                                                     }
    ];

Or using a numeric code

    [KhipuKhenshinInterface startEngineWithPaymentNumericoCode:@"<a-payment-numeric-code>"
                                                userIdentifier:@"<user-identifier>"
                                             isExternalPayment:NO
                                          navigationController:[self navigationController]
                                                      animated:YES
                                                       success:^(NSURL *returnURL){
                                                           [KhipuKhenshinInterface setOtherThanOwnerWillPayOnThisDevice:NO];
   
                                                           // [self doSomethingWithTheReturnURLIfExternalPaymentIsYES:returnURL];
                                                           // Example: [[UIApplication sharedApplication] openURL:returnURL];
   
                                                           // [self doSomethingToDisplayIfThePaymentIsBeignConciliated];
                                                       }
                                                       failure:^(NSURL *returnURL){
                                                           [KhipuKhenshinInterface setOtherThanOwnerWillPayOnThisDevice:NO];
   
                                                           // [self doSomethingWithTheReturnURLIfExternalPaymentIsYES:returnURL];
                                                           // Example: [[UIApplication sharedApplication] openURL:returnURL];
   
                                                           // [self doSomethingToDisplayIfThePaymentFailed];
                                                       }
                                 }];

## Releases & Changelog

Check the latest updates in the [Releases page](https://github.com/khipu/khenshin-pod/releases)
