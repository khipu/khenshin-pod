//
//  KhenshinBuilder.h
//  khenshin
//
//  Created by Nicolas Loira on 4/23/18.
//  Copyright © 2018 khipu. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "KhenshinEnums.h"
#import "ProcessHeader.h"
#import "ProcessExit.h"

@interface KhenshinBuilder : NSObject

@property UIImage *                              barCenteredLogo;
@property UIImage *                              barLeftSideLogo;
@property NSString *                             APIUrl;
@property NSString *                             automataNamespace;
@property UIView<ProcessHeader> *                processHeader;
@property UIViewController<ProcessExit> *        processFailure;
@property UIViewController<ProcessExit> *        processSuccess;
@property UIViewController<ProcessExit> *        processWarning;
@property BOOL                                   allowCredentialsSaving;
@property BOOL                                   allowExtendedPlayOnBackground;
@property NSInteger                              mainButtonStyle;
@property BOOL                                   hideWebAddressInformationInForm;
@property BOOL                                   useBarCenteredLogoInForm;
@property UIColor *                              principalColor;
@property UIColor *                              barTintColor;
@property UIColor *                              hintLabelColor;
@property UIColor *                              alternativeActionLabelColor;
@property UIColor *                              stepNumberColor;
@property UIColor *                              darkerPrincipalColor;
@property UIColor *                              secondaryColor;
@property UIColor *                              progressColor;
@property UIColor *                              backgroundColor;
@property CGFloat                                navigationFontSize;
@property UIColor *                              navigationBarTextTint;
@property UIColor *                              transitionBackgroundColor;
@property UIColor *                              cellSeparatorColor;
@property UIColor *                              tableRowSeparatorColor;
@property UIColor *                              continueButtonTextTintColor;
@property CGFloat                                cellSeparatorHeight;
@property NSString *                             textColorHex;
@property NSString *                             normalControlColorHex;
@property UIFont *                               font;
@property UIFont *                               fontBold;
@property UIFont *                               fontLight;
@property UIFont *                               fontPlaceholder;
@property UIFont *                               fontCoordinates;
@property BOOL                                   skipExitPage;
@property BOOL                                   keepCookies;
@property UIImage *                              topCellBackgroundImage;
@property UIImage *                              bottomCellBackgroundImage;
@property UIImage *                              middleCellBackgroundImage;
@property UIImage *                              singleCellBackgroundImage;
@property NSInteger                              cellPadding;
@property (strong, nonatomic) NSBundle*          localizationBundle;
@property (strong, nonatomic) NSBundle*          localCacheBundle;
@property (strong, nonatomic) UIImage*           backgroundImage;
@property (strong, nonatomic) UIImage*           spinnerImage;
@property NSString *                             decimalSeparator;
@property NSString *                             groupingSeparator;
@property BOOL                                   displayTermsAndConditions;
- (void) build;
@end
