![](https://images.viblo.asia/f4849e5e-4f85-484b-9016-99ec3d5b9439.png)

# I. Demo
Trong bài viết này tôi sẽ làm 1 demo để hướng dẫn cách sử dụng Boilerplate được đề cập trong [Phần 8: Xây dựng Base Project (Boilerplate) cho React Native](https://viblo.asia/p/hoc-react-native-tu-co-ban-den-nang-cao-phan-8-xay-dung-base-project-boilerplate-cho-react-native-YWOZr6GRZQ0). Cho nên bài này tôi sẽ viết ngắn gọn để các bạn có thể bắt đầu đọc code ngay trong link dưới đây.

> Github: https://github.com/oTranThanhNghia/SimpleAppReactNative1 

```
$ git clone https://github.com/oTranThanhNghia/SimpleAppReactNative1.git
```

Apk giảm bớt chức năng thừa 
https://www.dropbox.com/s/ry1j3y3o1imijbl/NewsReactNative_2019_11_10.apk?dl=0

Đối với iOS các bạn phải tự build nhé vì không có tài khoản apple developer ($99/year)

> ***Chú ý***: Tôi đang dùng dịch vụ cung cấp api tin tức bản free nên các bạn bạn hãy vào https://newsapi.org  để đăng ký tài khoản riêng cho mình để chạy ứng dụng nhé. 
> Thay API_KEY tại dòng code:
> + Develop: https://github.com/oTranThanhNghia/SimpleAppReactNative1/blob/24b41f5e1c4f9d805009b05b8f68147b260a74f2/app/config/environment/Develop.js#L5
> + Production: https://github.com/oTranThanhNghia/SimpleAppReactNative1/blob/24b41f5e1c4f9d805009b05b8f68147b260a74f2/app/config/environment/Production.js#L5
> + Staging: https://github.com/oTranThanhNghia/SimpleAppReactNative1/blob/24b41f5e1c4f9d805009b05b8f68147b260a74f2/app/config/environment/Staging.js#L4
> 
> Bảng giá như sau https://newsapi.org/pricing

## 1. Android
{@embed: https://www.youtube.com/watch?v=_EO0IQ6gzgk}


## 2. iOS
{@embed: https://www.youtube.com/watch?v=0Yub0zvJTqU}

Trong phần demo ios có 1 lỗi tự động autoplay video. Về bug này tôi sẽ đẩy commit sau do hiện tại chưa có nhiều thời gian

## 3. Hướng dẫn xem full template
Nếu các bạn muốn xem đầy đủ những gì tôi đã viết trong project thì các bạn checkout về commit tôi bôi đỏ nhé 

```
$ git checkout f286cbc
```
![](https://images.viblo.asia/306e31b5-6508-4927-a911-25ac5bc2b2ef.png)

# II. Giới thiệu
**Thống nhất môi trường build:**
+ Node: v10.15.0
+ React Native: 0.61.2
+ Xcode: 11.1
+ Android Studio: 3.4.1
+ CocoaPods: 1.8.4
+ OS: macOS Catalina 


**Giới thiệu các chức năng có trong demo:**
+ Load phân trang (load more dạng list)
+ Pull to refresh cho Android và iOS 
+ Requets api bằng axios và nhận response trả về 
+ Sử dụng Flow (type checker https://flow.org/) 
+ Xử ngoại lệ: mất mạng, dữ liệu trống, ...
+ Cache state trong redux bằng redux-presist (https://github.com/rt2zz/redux-persist)
+ Chuyền dữ liệu giữa 2 màn hình (https://reactnavigation.org/docs/en/params.html)
+ Xử lý tai thỏ (https://github.com/react-native-community/react-native-safe-area-view)
+ Xử lý màn hình splash hợp lý hơn (https://github.com/crazycodeboy/react-native-splash-screen)
+ Nhúng webview vào app (https://github.com/react-native-community/react-native-webview)

# III. Chia sẻ cá nhân
## 1. Vấn đề load image trong App
Nếu bạn nào đi từ native Android lên sẽ có thắc mắc tại sao tôi không dùng thư viện ngoài nào.

Lý do là core của `<Image>` đã sử dụng thư viện Fresco (https://frescolib.org/) rồi nên bạn không phải lo vấn đề load ảnh trên Android nữa; iOS thì lại càng không cần vì Facebook đã xử lý xong từ trước rồi.

![](https://images.viblo.asia/20248e5d-710a-4dcc-b1fe-0ed5f13421ac.png)

## 2. Bàn về Crashlytics trong React Native

Tính đến thời điểm hiện tại thì service crashlytics của Bugsnag (https://www.bugsnag.com/) là tốt nhất. Vậy nên tôi muốn giới thiệu với các bạn Bugsnag để giúp quá trình fix bug được đơn giản nhất có thể.

***Lý do chọn Bugsnag như sau***: Bugsnag báo lỗi cụ thể dòng crash app trên cả Native code (java/kotlin hay objective-c/swift) và Javascript code (nhờ công cụ `sourcemap`)

***Thế còn các services khác thì sao:***

+ **rn-firebase-crashlytics**: mới chỉ tốt cho native code, còn báo dòng crash trên javascript code thì mới có trên version 6 beta -> túm lại chưa ngon (https://invertase.io/blog/react-native-firebase-v6)
+ **appcenter-crashes**: có báo crash trên native code và javascript code nhưng báo crash trên javascript code thì mới chỉ có trên iOS. Chi tiết bạn xem trong https://github.com/microsoft/appcenter/issues/75

Ngoài ra bạn có thể xem thảo luận trong link dưới đây để biết thêm chi tiết nhé:
https://www.reddit.com/r/reactnative/comments/a7kczu/status_of_react_native_crash_reporters_in_2019/

## 3. Các loại type-checking cho React Native 

Mình chỉ có thể liệt kê 2 cái phổ biến nhất hiện nay là TypeScript và Flow
+ **Flow** do Facebook phát triển nên Flow support cho React Native khá tốt
+ **TypeScript** do Microsoft phát triển. Nếu ai đi từ OOP lên thì sử dụng TypeScript rất nhanh và phù hợp với những project lớn 

## 4. Redux vs Mobx
Hiện tại đang có xu hướng mới sử dụng Mobx giúp cho developer mới dễ dàng sử dụng và tiếp cận hơn so với Redux. Dưới đây tôi có link so sánh cho các bạn
https://www.educba.com/mobx-vs-redux/


# III. Tài liệu tham khảo
1. iOS main.jsbundle does not exists  https://github.com/facebook/react-native/issues/25522

2. jest-haste-map: Haste module naming collision: react-native https://github.com/react-native-community/async-storage/issues/169#issuecomment-538731342

3. Splash:
https://medium.com/handlebar-labs/how-to-add-a-splash-screen-to-a-react-native-app-ios-and-android-30a3cec835ae

https://github.com/crazycodeboy/react-native-splash-screen

4. crashlytics:
https://invertase.io/oss/react-native-firebase/v6/app/quick-start

https://invertase.io/oss/react-native-firebase/v6/crashlytics/quick-start

https://github.com/microsoft/appcenter/issues/75

https://www.bugsnag.com/platforms/react-native-error-reporting