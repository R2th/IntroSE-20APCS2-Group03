Hiện nay thì các thiết bị di động thông minh rất phổ biến. Với vô vàn ứng dụng miễn phí và những trải nghiệm tuyệt vời. Về OS phổ biến nhất hiện nay cho thiết bị thông minh là iOS và Android. Khi xây dựng một ứng dụng thì sẽ rất nhiều nhà phát triển phân vân chọn IOS hay là Android. Với nhu cầu phát triển đa nền tảng thì React Native ra đời. Trong bài viết này mình sẽ cùng các bạn tìm hiểu một số điều cơ bản về React Native và setup môi trường với Expo. Bắt đầu nào :D

# React Native là gì?
- React Native là một framework JavaScript để viết các ứng dụng di động
- React Native giúp bạn dễ dàng phát triển đồng thời cho cả Android và iOS
- React Native được xây dựng dựa trên `React`, `React` là một thư viện JavaScript xây dựng giao diện người dùng được phát triển bởi `Facebook`
Đối với các bạn đã từng làm với `React` sẽ có lợi thế dễ tiếp cận và làm việc với `React Native`
- Nguyên tắc hoạt động của React Native gần như giống với `React` ngoại trừ việc `React Native` không thao tác với `DOM` thông qua DOM ảo. Nó chạy một quá trình xử lý nền trực tiếp trên thiết bị đầu cuối và giao tiếp với nền tảng gốc qua `bridge`
# Setup môi trường với Expo
Ở phần trên mình đã giới thiệu qua React Native là gì? Để tìm hiểu thêm về các thông tin về `React Native` thì các bạn có thể xem thêm ở [Docs](https://reactnative.dev/) của `React Native`.

Trong phần này thì mình sẽ giới thiệu cách đơn giản để setup môi trường để chúng ta có thể dev với Expo.
## Expo là gì?
- Expo là một framework và là một nền tảng cho các ứng dụng `React`. Đây là một tập hợp các công cụ và dịch vụ được xây dựng dựa trên nền tảng React Native và nền tảng Native, giúp cho chúng ta dễ dàng phát triển, xây dựng, deploy nhanh chóng trên ứng dụng iOS, Android và web app
## Setup môi trường
### Cài đặt Expo
Expo CLI là một ứng dụng dòng lệnh là giao diện chính giữa nhà phát triển và các công cụ Expo. Expo CLI cũng có GUI dựa trên web bật lên trong trình duyệt web của bạn khi bạn bắt đầu dự án của mình

Trước khi cài đặt thì đảm bảo rằng bạn đã cài đặt `nodejs` và `npm`, câu lệnh cài đặt expo CLI:
```
npm install --global expo-cli
```
Sau đó chỉ cần một câu lệnh đơn giản là chúng ta đã tạo xong base cho một project React Native cơ bản:
```
expo init demoReactNativeApp
cd demoReactNativeApp
```
Sau đó start development server:
```
expo start
```
Sau khi start thì trên trình duyệt của chúng ta sẽ có giao diện như sau:

![](https://images.viblo.asia/454aab3e-264c-4427-ba3c-a0660cbb22a1.jpg)

trên terminal:

![](https://images.viblo.asia/eedbd2ee-45ae-42d8-8e57-61453a007047.jpg)

Như chúng ta thấy sẽ có các option cho chúng ta chạy build ở các nền tảng khác nhau và expo còn support chúng ta publish ứng dụng của chúng ta
### Chạy ứng dụng trên giả lập Android
Để chạy ứng dụng mobile để test chúng ta có thể sử dụng ứng dụng giả hoặc máy thật để chạy ứng dụng. Trong phần này mình sẽ giới thiệu cách cài đặt và chạy ứng dụng trên Android emulator

Đầu tiên, các bạn cài đặt ứng dụng [Android Studio](https://developer.android.com/studio/install). Android Studio sẽ hỗ trợ chúng ta các SDk cũng như Emulator cho chúng ta.

Sau khi cài đặt xong, chúng ta vào SDK manager:

![](https://images.viblo.asia/df150698-fe2f-4c0b-8880-50e49bc17688.jpg)

Giao diện quản lý SDK sẽ như sau:

![](https://images.viblo.asia/75845fa6-28e6-4bdd-892f-f1ef27bf1060.jpg)

Ở tab SDK Platforms sẽ có phiên bản ổn định của Android mà chúng ta đã cài đặt. Bên cạnh là tab SDK Tools, sẽ có các công cụ để chúng ta có thể run ứng dụng

![](https://images.viblo.asia/544ba6e6-22f6-4bdb-acd1-95a66bd165eb.jpg)

Sau đó các bạn copy path Android Location:

![](https://images.viblo.asia/8bff3da0-66c9-42dd-b282-b7c29d75ef2a.jpg)

Hiện tại mình đang sử dụng linux mình sẽ mở file `/.bashrc` hoặc `~/.bash_profile` và thêm path Android SDK Location vào với nội dung như sau:
```
export ANDROID_SDK=/home/ly-huynh/Android/Sdk
```
Tiếp theo, chúng ta sẽ cài đặt máy ảo để chạy ứng dụng:

![](https://images.viblo.asia/75486766-23f5-477f-a86c-6950194ac742.jpg)

Chúng ta chọn `AVD Manager`:

![](https://images.viblo.asia/6a54b173-3e14-4d1a-85df-aacd300b78ee.jpg)

Ở đây sẽ có các máy ảo mà chúng ta đã cài đặt, bạn có thể cài đặt máy ảo mới bằng cách bấm vào `Create Virtual Device` và cài đặt máy ảo mà muốn.

Sau đó bạn check `adb` xem đã cài đặt hay chưa và kiểm tra xem có thể có nhiều version trên máy của bạn:
```
adb version
```
Từ thư mục android SDK platform-tool:
```
cd ~/Android/sdk/platform-tools
./adb version
```
Sau copy `android/Sdk/platform-tools/adb` vào thư mục `/usr/bin`:
```
sudo cp ~/Android/Sdk/platform-tools/adb /usr/bin
```

 Sau khi các bước chuẩn bị đã hoàn tất thì chúng ta sẽ chạy máy ảo mà chúng ta đã cài đặt lên. Ở giao diện web chúng ta chọn `Run on Android device/emulator` hoặc ở `Terminal` chúng ta gõ phím a. Sau đó kiểm tra lại máy ảo, ứng dụng sẽ được cài đặt mà chạy trên đó
 
 Tương tự với Android Emulator với iOS Emulator chúng ta sẽ cài đặt `XCode`
 
### Chạy ứng dụng trên máy thật
Các bạn để ý thì khi chạy server `expo start` sẽ có một mã QR  code. Ở đây chúng ta sẽ có các option:
- Tunel: Cho phép các thiết bị di dộng khác mạng LAN chạy ứng dụng của chúng ta trên Expo ở máy đó
- LAN: Chỉ cho phép các thiết bị di dộng cùng mạng LAN chạy ứng dụng của chúng ta trên Expo ở máy đó
- Local

Để chạy test ứng dụng Expo trên máy thật chúng ta sẽ phải cài ứng dụng Expo. Sau đó chỉ cần mở ứng dụng Expo lên mà quét mã QR Code là chúng ta có thể test

# Kết luận
Trong bài viết này mình đã giới thiệu với các bạn cách để dễ dàng setup môi trường development React Native đơn giản với Expo. Cảm ơn các bạn đã theo dõi bài viết <3

Tài liệu tham khảo:
- https://reactnative.dev/
- https://docs.expo.io/