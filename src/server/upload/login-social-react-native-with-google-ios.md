Cuối cùng thì mình cũng đã có thời gian để viết tiếp về series Login Social React Native with FireBase, nay chúng ta hãy cùng tìm hiểu trên iOS nhá. Link bài trước (Android) (https://viblo.asia/p/login-social-react-native-with-firebase-android-Qbq5QvrwKD8)

# Login Google Api với Google +.
Tiếp tục bài trước, nay mình sẽ đi config bên iOS. Trước tiên chúng ta cần chạy được trên thiết bị iOS.

### 1.Config
**1. Add cocoapods**

Trước tiên các bạn cần phải cài ruby bởi vì cocoapods được built và support bởi Ruby.

Cocoapods là gì? Nói tóm gọn nó là một trình quản lý gói cho bên thứ 3 của iOS, nó chứa rất nhiều thư viện các bạn bên web có thể hiểu nó như là composer vậy!

Các bạn có thể vào trang chủ của họ và tìm kiếm các thư viện mình cần bên trong ứng dụng của các bạn (https://www.cocoacontrols.com/)

> gem install cocoapods

**2. Create Podfile**

Lại câu hỏi Podfile là gì? chúng ta dùng nó để làm gì? 

Podfile nó chỉ đơn thuần là một file chứa  danh sách các thư viện mà bạn sử dụng cocoapods để link lại.

> cd ios 
> 
> pod init
> 
Các bạn có thể mở file Podfile theo đường dẫn /ios/Podfile và có thể add những thư viện mình cần:

![](https://images.viblo.asia/6f589962-984b-48f1-b903-157fe3612f45.png)

Sau đó các bạn hãy sửa Podfile thành như sau giúp mình:

*Ở đây mình cài các thư viện cần thiết để chạy React, Firebase,...*

```swift
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target 'LoginSocial' do
  # Uncomment the next line if you're using Swift or would like to use dynamic frameworks
  # use_frameworks!

  pod 'React', :path => '../node_modules/react-native', :subspecs => [
        'Core',
        'CxxBridge', # Include this for RN >= 0.47
        'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
        'RCTText',
        'RCTNetwork',
        'RCTWebSocket', # needed for debugging
        # Add any other subspecs you want to use in your project
    ]
    pod "yoga", :path => "../node_modules/react-native/ReactCommon/yoga"

    # Third party deps podspec link
    pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
    pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
    pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

    pod 'Firebase'
    pod 'Firebase/Core', '~> 5.9.0'
    pod 'Firebase/Messaging'
    pod 'RNGoogleSignin', :path => '../node_modules/react-native-google-signin'


end
```

Sau đó các bạn hãy chạy `pod install` để tải các thư viện mà mình đã import vào nhá. Nếu bạn chạy được như này là thành công rồi đấy.
Sau khi đã install xong các bạn hãy mở file LoginSocial.xcworkspace  trong thư mục ios lên.

![](https://images.viblo.asia/23f7c941-4c7f-46b6-b28b-e8b79c075f3c.png)

Các bạn start lên và sẽ thấy màn hình bị lỗi như sau: 
![](https://images.viblo.asia/a2f576ca-5822-47d3-a1e7-6de19e8b7594.png)

Vâng, nếu làm được tới đây rồi thì bạn đã gần thành công rồi đấy, bây giờ chúng ta hay vào console.firebase.google.com và vào ứng dụng khi trước mà chúng tạo app Android, hãy tạo thêm 1 app iOS và tải file GoogleSecive-Info.plist về.

Chúng ta copy Bundle ID ở mục General trong xCode vào trong firebase


![](https://images.viblo.asia/d781608c-3806-44ae-b82c-99a36f97b2b9.png)

Sau đó down file GoogleService-Info.plist vào đúng đường dẫn như họ hướng dẫn và làm theo các bước còn lại họ hướng dẫn nhá ( **bước 3 nhớ chọn Object-C nhá** ). Sau khi bạn hoàn thành tới bước cuối cùng rồi thì hãy vào console api của google để lấy URL_CLIENT ios nhá. (https://console.developers.google.com)

![](https://images.viblo.asia/b9341f52-c71f-49bc-b732-2ed3b9fa12a6.png)


Các bạn còn nhớ hàm này chứ? Chúng ta hãy cùng vào code và paste client id ios vào nữa nhá:

```js
async setupSocial() {
        GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
        GoogleSignin.configure({
            webClientId: '922650223041-5ngaleu67dg66prv8njel5e7atmdmtae.apps.googleusercontent.com',
            iosClientId: '922650223041-udevvvusnmk19ugobtv8vfvnmo3h35ab.apps.googleusercontent.com',
            offlineAccess: true,
        })
    }
```

Tiếp theo các bạn mở file GoogleService-Info.plist lên và copy đoạn string REVERSED_CLIENT_ID sau đó hãy mở Xcode lên, chọn project và di chuyển tới Info -> URL type và paste id mà chúng ta vừa copy.
![](https://images.viblo.asia/a03f1ee8-59b0-4221-a6f0-81d03cea4f47.png)

trong xCode:
![](https://images.viblo.asia/ad9c766c-435a-448b-9627-7170c839254e.png)

Các bạn thử chạy Simulator lên và xem kết quả nhá!! Good luck!!!