Tự nhiên dạo này mình nổi lên hứng thú code game, mục tiêu mình đặc ra chỉ là các mini game 2d đơn giản cho vui thôi, Mình có search hàng loạt Engine làm game như: Unity, Unreal... và sau cùng thì mình chọn Cocos2dx - nguyên nhân là nó nhỏ gọn và giống với gameKit của Apple (mình từng dùng qua nó nên có ít kinh nhiệm), hơn nữa do 2 thằng kia tốn ổ cứng nặng quá, với lại mục tiêu của mình cũng đơn giản nên Cocos2d hoàn toàn phù hợp với mình.

Tại thời điểm viết bài này thì mình cũng mới bắt đầu tìm hiểu về nó, nên đây có thể là bài khởi đầu cho 1 loạt các bài hướng dẫn code game bằng cocos2d-x bằng C++.

Trong bài đăng này, mình sẽ hướng dẫn các bước để cài đặt Cocos2dx vào Macbook Pro!

Ở các bài viết sau có thể mình sẽ đi nhanh qua các cú pháp cơ bản của C++, hoặc bỏ qua phần C++ đi thẳng vào các funtion của Cocos2dx luôn - cái này tuỳ thì tuỳ hứng, lol.

## Install Xcode

Đầu tiên cần phải install Xcode - một IDE để lập trình cho macOS và iOS.

. Download và install Xcode từ App Store. Nó là IDE lập trình Mac và iOS miễn phí của Apple. Các bạn chỉ cần vào Apple Store, search Xcode và cài đặc, nó khá nặng - khoảng tầm hơn 10gb.

Tại lúc này bạn có thể build and run 1 project trên iOS và Mac. Tuy nhiên, để có thể build and run trên các thiết bị Android, Bạn cần cài đặt thêm một số thứ liên quan đến Android. Nó bao gồm Apache Ant và Android Studio (và các gói thư viện đi kèm với nó: SDK Android và Android NDK).

## Install Cocos2d-x 4.0

Bây giờ Xcode đã được cài đặt, đã đến lúc chúng ta cài đặt Cocos2d-x:

Cài đặt Cocos2d-x cần cài đặt Python 2.7x, nó vốn đã có trên macOS nên chúng ta không phải lo về nó nữa.

Bạn có thể kiểm tra phiên bản python của bạn trong terminal để xem bạn có phiên bản phù hợp không. Máy của mình là 2.7.16.

```
python --version
```

. Download Cocos2d-x (cocos2d-x-4.0.zip) from www.cocos2d-x.org và unzip nó vào trong folder mà bạn muốn chứa, vd: /Applications/Dev/

. Dùng terminal di chuyển tới folder mà bạn vừa unzip bằng cách:  `cd [tên đường dẫn tới thư mục cocos2d-x-4.0]`: 

vd: `cd /Applications/Dev/cocos2d-x-4.0/`

. Setup Cocos2d-x bằng cách chạy file setup.py trong terminal:

gõ lệnh sau vào terminal và enter:

```
python setup.py
```

Trong quá trình này nó sẽ hỏi 1 vài đường dẫn tới SDK của android, các bạn có thể enter để bỏ qua, chúng ta sẽ thiết lập nó sau, hiện tại mình sẽ hướng dẫn các bạn cài và chạy nó trên Mac và IOS.

Nó thiết lập một vài biến môi trường và yêu cầu một số đường dẫn:

COCOS_CONSOLE_ROOT

COCOS_X_ROOT

COCOS_TEMPLATES_ROOT

Nếu bạn có Android Studio và Apache Ant installed trong system (trong trường hợp của mình là install trong folder Dev)

For NDK_ROOT question, put /Users/TuanDV/Library/Android/sdk/ndk-bundle

For ANDROID_SDK_ROOT question, put /Users/TuanDV/Library/Android/sdk

For ANT_ROOT question, put /Applications/Dev/apache-ant-1.10.7/bin

Sau các bước ở trên thì chúng ta đã thêm các path sdk vào file setting này: ~/.profile

```
# Add environment variable COCOS_CONSOLE_ROOT for cocos2d-x 
export COCOS_CONSOLE_ROOT=/Applications/Dev/cocos2d-x-4.0/tools/cocos2d-console/bin
export PATH=$COCOS_CONSOLE_ROOT:$PATH 
 
# Add environment variable COCOS_X_ROOT for cocos2d-x 
export COCOS_X_ROOT="/Applications/Dev" 
export PATH=$COCOS_X_ROOT:$PATH 
 
# Add environment variable COCOS_TEMPLATES_ROOT for cocos2d-x 
export COCOS_TEMPLATES_ROOT=/Applications/Dev/cocos2d-x-4.0/templates
export PATH=$COCOS_TEMPLATES_ROOT:$PATH
 
# Add environment variable NDK_ROOT for cocos2d-x
export NDK_ROOT="/Users/TuanDV/Library/Android/sdk/ndk-bundle"
export PATH=$NDK_ROOT:$PATH
 
# Add environment variable ANDROID_SDK_ROOT for cocos2d-x
export ANDROID_SDK_ROOT="/Users/TuanDV/Library/Android/sdk"
export PATH=$ANDROID_SDK_ROOT:$PATH
export PATH=$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/platform-tools:$PATH
 
# Add environment variable ANT_ROOT for cocos2d-x
export ANT_ROOT="/Applications/Dev/apache-ant-1.10.7/bin"
export PATH=$ANT_ROOT:$PATH
```

chú ý TuanDV là tên User trên máy Mác của mình, trên máy các bạn sẽ hiển thị theo tên User của máy.

Nếu bạn không có những dòng này thì bạn có thể bổ sung nó sau khi các bạn đã download SDK của android. Hiện tại mục tiêu của chúng ta là chạy nó trên Mac và ios nên các bạn có thể tạm bỏ qua chúng.

Sau khi chạy xong, nó sẽ có dòng bảo các bạn gõ `source [tên đường dẫn tới tên file .profile]` để thực thi các file cấu hình trong đó:

vd của mình là: `source /Users/TuanDV/.profile`

gõ dòng trên và enter.

Nếu các bạn cài đặt thành công Cocos2d-x thì  gõ lệnh `cocos` vào terminal và enter thì sẽ thấy các commands của cocos hiển thị trên terminal

## Create a new Cocos2d-x project

Để tạo một project mới, chúng ta sẽ sử dụng các lệnh của cocos trong termial.

Lưu ý là bạn có thể gõ `cocos` và bấm Enter để xem các lệnh của cocos:

![](https://images.viblo.asia/82bc487a-731d-4baf-a31c-ed1ba1e364ae.png)

Tạo project mới bằng cách gõ dòng lệnh sau vào terminal:

`cocos new install_test -p com.duong.tuan.install_test -l cpp -d ~/Projects/`

Điều này sẽ tạo 1 project “install_test” với các file và thư mục cần thiết của Cocos2d-x trong project của bạn.

![](https://images.viblo.asia/938b85bc-4d62-4453-920a-ecb31b6398ba.png)

Kể từ khi release bản Cocos2d-x v.4.0, CMake được dùng để tạo các project và build chúng trên các platforms khác nhau. Điều này có nghĩa là  Cocos2d-x sẽ không gộp tất cả lại vào 1 project Xcode như phiên bản cũ. Bây giờ chúng ta sẽ tạo 2 project Xcode “install_test”, một cho IOS và 1 cho Mac OS.

Để tạo một project trên macOS, chạy lện sau từ Terminal:

Đầu tiên di chuyển vào thư mục "install_test" của project và lần lược gõ lệnh sau vào terminal.

```
mkdir build_mac && cd build_mac
cmake .. -GXcode
open install_test.xcodeproj
```

**Nếu bạn chưa cài cmake** thì có thể gõ lênh sau để cài đặc: “brew install cmake” or “brew upgrade cmake”.

Tương tự, để tạo project cho IOS, cũng từ thư mục "install_test" chạy các lệnh sau trên Terminal:

```
mkdir build_ios && cd build_ios
cmake .. -GXcode -DCMAKE_SYSTEM_NAME=iOS -DCMAKE_OSX_SYSROOT=iphoneos
open install_test.xcodeproj
```

Lưu ý là đối với Version 3.17.2 đã bao gồm tất cả trong Xcode project rồi, chỉ cần các bạn vào inside proj.ios_mac để mở lên, nó có thể build cho IOS và Mac.

## Compile and run for iOS

. Run Xcode.

. Trong Xcode mở project  từ folder “ios-build” .

. Chọn Device simulator là iPhone 11 Pro Max.

![](https://images.viblo.asia/56c5fd4f-c951-4bb7-9b89-412291dc9f25.png)

.Từ menu chọn Product->Run.

.Xcode sẽ build project và chạy nó trên simulator

![](https://images.viblo.asia/11fac451-fbb7-4374-8a22-c7f84e8e301c.png)

## Compile and run for macOS

Considering that compiling and running for iOS needs the simulator, it might be easier and faster to do your test and development for macOS instead. To compile for macOS:

.Run Xcode.

.Trong Xcode open project  folder “proj.ios_mac”.

.Chọn target “test-desktop.app” và device “My Mac”.

![](https://images.viblo.asia/e6a597e1-89ea-4a09-bdb7-b96018f4374f.png)

. Từ menu chọn Build->Run như lúc các bạn run project IOS.

![](https://images.viblo.asia/533860a3-58a7-4058-a9ec-2c8ef6d27310.gif)

Nguồn tham khảo của bài này: https://rezghob.com/installing-cocos2d-x-macos/