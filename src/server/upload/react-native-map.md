Xin chào các bạn, hôm nay chủ đề tiếp theo mình muốn giới thiệu với các bạn đó là việc sử dụng map trong reaact native.
Để sử dụng được thì việc đầu tiên bạn cần thực hiện đó là cài đặt thư viện:
```
npm install react-native-maps --save
```

với thư viện này thì trên android, map được sử dụng là [Google Maps](https://developers.google.com/maps/documentation/), trên ios bạn có thể lựa chọn giữa Google Map hay [Apple Map](https://developer.apple.com/documentation/mapkit/).
Khi mà sử dụng Google Map trên IOS thì bạn cần phải đăng kí cho ios SDK gồm cả thư viện Google Map.
- Build configuration on iOS: Sử dụng *React Native Link*, bạn cần chạy lệnh *react-native link react-native-maps* mặc định thì sẽ sử dụng Apple Map, khi đó bạn sẽ không sử dụng được một số tính năng mà Google cung cấp.

    CocoaPods: Cài đặt Podfile,
    
```
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target '_YOUR_PROJECT_TARGET_' do
  rn_path = '../node_modules/react-native'
  rn_maps_path = '../node_modules/react-native-maps'

  # See http://facebook.github.io/react-native/docs/integration-with-existing-apps.html#configuring-cocoapods-dependencies
  pod 'yoga', path: "#{rn_path}/ReactCommon/yoga/yoga.podspec"
  pod 'React', path: rn_path, subspecs: [
    'Core',
    'CxxBridge',
    'DevSupport',
    'RCTActionSheet',
    'RCTAnimation',
    'RCTGeolocation',
    'RCTImage',
    'RCTLinkingIOS',
    'RCTNetwork',
    'RCTSettings',
    'RCTText',
    'RCTVibration',
    'RCTWebSocket',
  ]

  # React Native third party dependencies podspecs
  pod 'DoubleConversion', :podspec => "#{rn_path}/third-party-podspecs/DoubleConversion.podspec"
  pod 'glog', :podspec => "#{rn_path}/third-party-podspecs/glog.podspec"
  # If you are using React Native <0.54, you will get the following error:
  # "The name of the given podspec `GLog` doesn't match the expected one `glog`"
  # Use the following line instead:
  #pod 'GLog', :podspec => "#{rn_path}/third-party-podspecs/GLog.podspec"
  pod 'Folly', :podspec => "#{rn_path}/third-party-podspecs/Folly.podspec"

  # react-native-maps dependencies
  pod 'react-native-maps', path: rn_maps_path
  # pod 'react-native-google-maps', path: rn_maps_path  # Unomment this line if you want to support GoogleMaps on iOS
  # pod 'GoogleMaps'  # Uncomment this line if you want to support GoogleMaps on iOS
  # pod 'Google-Maps-iOS-Utils' # Uncomment this line if you want to support GoogleMaps on iOS
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.name == 'react-native-google-maps'
      target.build_configurations.each do |config|
        config.build_settings['CLANG_ENABLE_MODULES'] = 'No'
      end
    end
    if target.name == "React"
      target.remove_from_project
    end
  end
end
```

Sau đó vào thư mục ios chạy lệnh: pod install

- Bật tính năng sử dụng Google Maps trên iOS: Bạn mở file AppDelegate.m và edit như sau

```
+ #import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate
...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
+  [GMSServices provideAPIKey:@"_YOUR_API_KEY_"]; // add this line using the api key obtained from Google Console
...
```

[GMSServices provideAPIKey] nên được gọi đầu tiên. Nếu bạn sử dụng CocoaPods để quản lý độc lập, có thể bỏ comment ở dòng liên quan đến Google Maps từ Podfile và run pod install.
Nếu bạn đã sử dụng React Native link, hãy thêm đoạn sau vào trong package.json:
```
{
  "name": "your-app",
  "scripts": {
    "postinstall": "./node_modules/react-native-maps/enable-google-maps REPLACE_ME_RELATIVE_PATH_TO_GOOGLE_MAPS_INSTALL"
  }
}
```

Sau đó chạy lại npm install hoặc yarn để đảm bảo chắc chắn postinstall được chạy.

Tiếp theo bạn import {PROVIDER_GOOGLE} 

```
  import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
  ...
  
  <MapView
     provider={PROVIDER_GOOGLE}
     style={styles.map}
     ...
  >
```

- Build configuration trên Android

    1. Trong android/settings.gradle bạn cần thêm react-native-maps 
   
    `...
include ':react-native-maps'
project(':react-native-maps').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-maps/lib/android')`


    2. Thêm eact-native-maps vào trong android/app/build.gradle:
    
    `...
dependencies {
  ...
  implementation project(':react-native-maps')
} `


    Một số vấn đề cần lưu ý nữa là:

    `
    
        buildscript {...}
        allprojects {...}

        ext {
            compileSdkVersion   = 26
            targetSdkVersion    = 26
            buildToolsVersion   = "26.0.2"
            supportLibVersion   = "26.1.0"
            googlePlayServicesVersion = "11.8.0"
            androidMapsUtilsVersion = "0.5+"
        }
        
        
        ...
        dependencies {
           ...
           implementation(project(':react-native-maps')){
               exclude group: 'com.google.android.gms', module: 'play-services-base'
               exclude group: 'com.google.android.gms', module: 'play-services-maps'
           }
           implementation 'com.google.android.gms:play-services-base:10.0.1'
           implementation 'com.google.android.gms:play-services-maps:10.0.1'
        }
    
    `
    
    3.  Google Maps API Key:
    
          Thêm API key vào trong manifest:android/app/src/main/AndroidManifest.xml
          
          `
          
              <application>
          
                   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
                   <meta-data
                     android:name="com.google.android.geo.API_KEY"
                     android:value="Your Google maps API Key Here"/>
               </application>
          
          `
    
    4. import com.airbnb.android.react.maps.MapsPackage; và new MapsPackage() trong your MainApplication.java
    
        `
        
                import com.airbnb.android.react.maps.MapsPackage;
                ...
                @Override
                protected List<ReactPackage> getPackages() {
                    return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new MapsPackage()
                );
            }
        
        `
        
        5. Bạn cần phải chắc chắn rằng 'Google Play Services' đã được cài đặt.


  Bài viết được dịch từ [react-native-maps](https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md). Cảm ơn các bạn đã theo dõi. Thanks!