Trong quá trình thực hiện pentest với iOS app, sẽ có nhiều trường hợp chúng ta phải cài các ứng dụng hoặc tool mà không được phát hành trên App  Store. Việc thiếu các công cụ này sẽ hạn chế chúng ta rất nhiều trong quá trình làm việc, vì thế trong bài này mình sẽ giúp mọi người tìm hiểu đơn giản cách cài đặt một custom app lên thiết bị iOS thông qua sideloading.

## I. Sideloading
### 1. Định nghĩa
Sideloading, theo định nghĩa của wikipedia, là một quá trình tương tự như "upload" và "download" nhưng thực hiện chuyển từ thiết bị này sang thiết bị khác một cách cục bộ. Ví dụ như từ một máy tính sang một thiết bị di động kết nối với nó. Đối với iOS, việc sử dụng sideloading nhằm cài đặt các ứng dụng mà không được xác thực bởi apple để ứng dụng đó có thể chạy trên thiết bị iOS. Chính vì thế, có thể gọi một cách hoa mỹ rằng iOS là một nhà tù pha lê của Apple. Đó cũng là lý do mà chúng ta sẽ sử dụng sideloading để vượt qua nhà tù này.

### 2. Code-signing và Apple Developer Program
Trước tiên, để nói qua tại sao lại phải sử dụng sideloading thay vì cách cài đặt thông thường, mình sẽ nói tới 2 điểm chính: Apple code-signing và  Apple Developer Program.

Thứ nhất, về code-signing. Apple đã phát triển một hệ thống DRM (Digital rights management) - một hệ thống quản lý quyền kĩ thuật số - rất phức tạp với chỉ một mục đích duy nhất: chỉ có sản phẩm sign-by-apple được chạy trên iOS. Do đó, một cách chính thống (vì có những cách khác), người dùng sẽ chỉ có thể cài đặt  ứng dụng  thông qua App Store - nơi mà các ứng dụng đã được kiểm duyệt khá kĩ và được kí xác nhận bởi Apple. 

Thứ hai, về Apple Developer Program, đây là một chương trình của apple dành cho các developer iOS. Khi tham gia vào chương trình này, các developer có thể phát triển, compile và deploy ứng dụng cũng như đăng sản phẩm của mình lên App Store (Tất nhiên vẫn phải được Apple kiểm duyệt). Các developer sẽ phải trả phí hàng năm cho việc này. Ngoài ra, Apple cũng cho phép các tài khoản developer miễn phí để compile và deploy ứng dụng. 
### 3. Các phương thức để cài ứng dụng thông qua sideloading.
Có rất nhiều các để cài ứng dụng thông qua sideloading, tuy nhiên trong phạm vi bài viết, mình sẽ giới thiệu  3 cách phổ biến và dễ làm nhất đó là :
- Sử dụng XCode
- Thông qua Cydia Impactor
- Sử dụng self-signed và repackaging sử dụng Objection.

## II. Sideloading thông qua XCode.
### 1. Tạo tài khoản developer
- Đi tới [trang chủ](https://developer.apple.com/programs/) của project
- Bấm vào `account`
- Chọn vào `Tạo tài khoản của bạn ngay bây giờ`
- Tại trang đăng kí, nhập các thông tin cần thiết và bấm vào `Tiếp tục`
- Nhập mã xác nhận và chúng ta sẽ redirect sang trang `Apple Developer Agreement`
- Tích xác nhận đã đọc và submit 

Vậy là chúng ta đã có một tài khoản developer miễn phí của Apple.
### 2. Cài đặt app vào thiết bị thông qua XCode
Đầu tiên, mở XCode lên

![](https://images.viblo.asia/b5acee27-4b50-4a4c-bbcb-3bac1f62ee77.png)

Bước tiếp theo, bạn có thể mở một app có sẵn hoặc tạo một project mới. Ở đây, mình sẽ tạo một project mới nhé.

![](https://images.viblo.asia/64352907-a7ea-4aea-85cf-2014e47755c0.png)

Để đơn giản thì chọn `Single View App`  luôn 

![](https://images.viblo.asia/8acdf6f4-e63a-4dfe-ba01-0865e5b1256f.png)

Điền các thông tin vào và chọn next. (phần team có thể để trống)

Sang tab `Signing and Capacibilities` phần `Team` chọn `Add an Account` và thêm Apple ID vừa tạo ở trên.

![](https://images.viblo.asia/f087abfb-a289-4c34-b58b-4748af094547.png)

Tiếp theo, trên thanh công cụ chọn nơi build tới là thiết bị iOS:

![](https://images.viblo.asia/adcb506a-4309-435b-8edf-1fb56e876f44.png)

Bấm vào build.

Chuyển qua thiết bị iOS, vào Setting > General > Profile & Device Management > Trust "Apple Development...."

Done, chúng ta đã cài xong app lên thiết bị. Đối với app dựng sẵn cách cài đặt cũng tương tự như trên.

## III. Sideloading thông qua Cydia Impactor.
Phần này, mình mặc định như thiết bị được sử dụng đã jailbreak, tại đó chúng ta sẽ có sẵn 1 ứng dụng là Cydia

![](https://images.viblo.asia/0b870993-9908-4a37-9d7c-736ce616fc5d.jpg)

Source là các nguồn chứa các package để bạn có thể cài đặt. Bạn có thể thêm các source của mình vào tại phần Source > edit > add

![](https://images.viblo.asia/f21a81c4-7642-46be-8b13-42c77d3a968a.jpg)

Dùng Search để tìm kiếm package cần cài đặt

![](https://images.viblo.asia/fae0f169-9a6e-4dd6-9f28-fa0f3989ecbe.jpg)

Giờ chỉ cần đơn giản bấm install package muốn cài là xong

![](https://images.viblo.asia/c3ea184f-6db1-4761-ab92-6d51aa1add88.jpg)

## IV. Sideloading thông qua resign and repackage sử dụng Objection
Đầu tiên, giới thiệu đơn giản qua thì objection được giới thiệu là một "runtime mobile exploration toolkit, powered by Frida". Việc cài đặt objection rất đơn giản thông qua pip3:
```
pip3 install objection
```
hoặc là 
```
pip3 install -U objection
```
Tiếp theo là các bước để sử dụng công cụ này:

### 1. Chuẩn bị với XCode
Vào XCode > Preference > Account

![](https://images.viblo.asia/4bec6888-667d-41f1-adc2-8fb440c3863b.png)

Chọn vào Management Certificate, bấm `+` và chọn `Apple Development` hoặc `iOS Development`

![](https://images.viblo.asia/06efe27a-5acf-4e1e-b82f-2073080b5e56.png)

Có thể kiểm tra lại với câu lệnh sau:
```
security find-identity -p codesigning -v
```
### 2. Chuẩn bị mobileprovision
Để tạo file mobileprovision, các bạn có thể làm tương tự như phần cài app bằng XCode ở trên, ở đây mình sẽ không lặp lại nữa.
### 3. Patching Dependencies
Chúng ta sẽ nói qua về các dependency sẽ cần để patching:
- applesign: từ  https://github.com/nowsecure/node-applesign
- insert_dylib: từ  https://github.com/Tyilo/insert_dylib
- security, codesign, xcodebuild - macOS/XCode commands
- zip & unzip - builtin, or just installed using homebrew
- 7z - brew install p7zip
#### a. applesign
applesign có thể đơn giản cài đặt qua câu lệnh:
```
npm install -g applesign
```
#### b. insert_dylib
insert_dylib phức tập hơn chút nè:
```
git clone https://github.com/Tyilo/insert_dylib
cd insert_dylib
xcodebuild
cp build/Release/insert_dylib /usr/local/bin/insert_dylib
```
### 4. Patching một IPA
Tiếp theo, chúng ta sẽ patch 1 ipa file với câu lệnh:
```
objection patchipa --source my-app.ipa --codesign-signature 0C2E8200Dxxxx
```
với `0C2E8200Dxxxx` là output mà ta có từ bước 1.

Câu lệnh này sẽ unpack 1 ipa, tìm kiếm trong mã nhị phân và vá thêm với FridaGadget.dylib, codesign the dylib và mã nhị phân, cuối cùng là đóng gói lại cho chúng ta.

Sau đó dùng file này để cài đặt app trên thiết bị iOS với ios-deploy
```
ios-deploy --bundle Payload/my-app.app -W -d
```

## IV. Conclusion
Trên đây là những gì mình biết về sideloading cũng như một vài cách để cài đặt phần mềm iOS thông qua sideloading. Ngoài các cách kể trên còn rất nhiều các cách khác, mọi người có thể tham khảo thêm. Hi vọng nếu bài viết có thiếu sót hoặc sai sót sẽ được mọi người bổ sung, chỉ ra giúp mình. Cảm ơn mọi người đã đọc bài.