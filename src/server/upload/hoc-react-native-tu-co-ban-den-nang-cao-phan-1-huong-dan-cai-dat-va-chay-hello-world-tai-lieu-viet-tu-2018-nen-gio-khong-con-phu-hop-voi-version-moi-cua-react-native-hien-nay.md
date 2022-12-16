Trong bài viết này tôi sẽ hướng dẫn cài đặt React Native trên môi trường Windows (khá phổ biến ở Việt Nam)

# Cài đặt môi trường
Bạn cần phải có :
1. Node
2. Python2
3. JDK
4. Android Studio

Trong bài viết này tôi sẽ hướng dẫn cài đặt React Native trên môi trường Windows (khá phổ biến ở Việt Nam)

# A. Cài đặt môi trường
Bạn cần phải có :
1. Node
2. Python2
3. JDK
4. Android Studio

Hả vẫn cần Android Studio ư ? 
Trong khi bạn có thể chọn bất kỳ Editor nào bạn muốn để lập trình ứng dụng nhưng bạn vẫn phải cần cài đặt Android Studio để cấu hình những tool cần thiết để build React Native app trên Android

Trên trang chủ React Native khuyên cài Node, Java SE Development Kit (JDK) và Python2 thông qua [Chocolatey](https://chocolatey.org/), đây là ứng dụng phổ biến cho Windows

Câu lệnh cài đặt trên Chocolatey như sau ( chạy CMD với quyền "Run as Administrator"):
`choco install -y nodejs.install python2 jdk8`

Còn nếu bạn không muốn chạy cmd như trên thì bạn vào trang chủ và tải file cài đặt để chạy
Chú ý: version Node 8 hoặc mới hơn; JDK 8 hoặc mới hơn
1. [Node](https://nodejs.org/en/)
2. [Python2](https://www.python.org/downloads/) tìm Python 2.x để cài nhé
3. [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

# B. The React Native CLI (CLI-command line interface)
Chạy lệnh CMD sau để cài đặt React Native CLI:
`npm install -g react-native-cli`

# C. Cài đặt môi trường Android
## 1. Cài Android Studio
Tải Android Studio [tại đây](https://developer.android.com/studio/index.html). Cài đặt và nhớ chọn các mục sau:
* Android SDK
* Android SDK Paltform
* Performance (Intel ® HAXM) -- cho máy ảo
* Android Virtual Device -- cho máy ảo
2 lựa chọn cuối dành cho máy ảo Android. Nếu bạn đã có thiết bị Android rồi thì không cần cài cũng được
## 2. Cài đặt Android SDK

Mặc định Android Studio sẽ cài Android SDK mới nhất nhưng trên trang chủ React Native ưu tiên sử dụng `Android 6.0 (Marshmallow)` SDK

Đê vào cấu hình cài đặt Android SDK thì ở màn "Welcome to Android Studio" chọn "Configure" và sau đó ấn "SDK Manager"

![](https://i.imgur.com/4ZQtszi.png)

![](https://i.imgur.com/moQPmMK.png)

Nếu bạn đang mở Project nào đó thì ấn "Tools" sau đó "SDK Manager"

![](https://i.imgur.com/V12apUx.png)

Tìm đến Android 6.0 (Marshmallow) chọn các mục dưới đây để tải về:
* Google APIs
* Android SDK Platform 23
* Intel x86 Atom_64 System Image
* Google APIs Intel x86 Atom_64 System Image

![](https://i.imgur.com/3cXltlU.png)

Tiếp, chọn tab "SDK Tools" ấn "Show Package Details", vào "Android SDK Build-Tools" chọn bản `23.0.1`

![](https://i.imgur.com/a0nikcz.png)

Chọn "Apply" để bắt đầu tải và cài đặt Android SDK và Build Tools

## 3. Cấu hình ANDROID_HOME cho Windows
Để React Native build app bạn phải chỉ định chỗ bạn cài Android Sdk ở đâu.
Bạn làm theo hướng dẫn sau

![](https://i.imgur.com/tqGYYEB.png)

![](https://i.imgur.com/HUL6jM6.png)

![](https://i.imgur.com/zjA1l55.png)

![](https://i.imgur.com/r6rqAy9.png)

Thường thì SDK sẽ được cài ở

`c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`

# D. Tạo project
Bạn mở CMD và gõ lệnh sau

`react-native init AwesomeProject`

Trong đó AwesomeProject là tên project được tạo ra

# E. Chuẩn bị thiết bị Android
Trong mục này tôi sẽ hướng dẫn chạy trên máy ảo Android và trên thiết bị Android thật. Nhưng tôi khuyên bạn hãy thử trên thiết bị thật là tốt nhất vì đơn giản là "Ảo không tốt bằng thật". Thế thôi :)

## I. Sử dụng thiết bị thật

Việc đầu tiên phải kiểm tra là thiết bị Android của bạn `Wifi` hoạt động tốt vì sắp tới bạn sẽ dùng chủ yếu bằng Wifi

Thứ 2, chọn dây cáp Android thật tốt rồi cắm Android vào máy tính của bạn thôi

### 1. Bật USB debugging

Đầu tiên, thiết bị Android của bạn phải ở chế độ "Developer option". Bạn Vào **Settings** → **About phone** và click `Build number` 7 lần. 

Sau đó, vào **Settings** → **Developer options** và chọn "USB debugging"

### 2. Kiểm tra connect với Android

Để chắc chắn rằng Android của bạn đã kết nối với PC, thực ra là ADB mới đúng thì bạn gõ lệnh sau trên CMD
`adb devices`

```
>>adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

Hiện dòng tương tự như thế này thì bạn đã thành công `14ed2fcc device`

### 3. Run app
Gõ lệnh sau trên CMD để cài và chạy app
`react-native run-android`

Nếu bạn chạy xong lệnh này mà hiện lỗi sau

![](https://i.imgur.com/BEHa0gV.jpg)

Hiện lỗi đến đây thì bạn đang làm đúng hướng dẫn rồi đấy :)
Ok. Vậy bạn làm các bước tiếp dưới đây

### 4. Kết nối với **development server**
Đến bước này phải chắc chắn là 
* USB debugging đã bật
* Android đã connect với PC
* Android và PC cùng chung 1 mạng nhé

#### a) Cách 1: Dùng adb reverse (khuyên phải dùng :) ko làm theo lỗi tự chịu )
Cách này dùng cho Android 5.0 (Lollipop) trở lên
Chạy lệnh trên CMD như sau:
```
adb reverse tcp:8081 tcp:8081
```

Sau đó bạn lắc Android để hiện `Developer menu` như dưới đây
:v: 

![](https://i.imgur.com/S2oyysx.png)

Đến đây chắc chắc có bạn sẽ hỏi lắc như thế nào ? Tôi trả lời luôn. 
Lắc như thế này nhé :v

![](https://i.imgur.com/RGO586P.jpg)

**Và từ đây bạn đã biết 1 cách chạy lại app mới là lắc máy nhé. Bất kỳ đoạn code thay đổi nào bạn không cần build lại app nữa mà bạn chỉ cần lắc lắc Android thì code mới sẽ được cập nhật trên thiết bị của bạn**

#### b) Cách 2: Kết nối thông qua Wifi
Đầu tiên xem IP của máy PC bạn
1. Đảm bảo Android và PC cùng Wifi network
2. Mở React Native app
3. Nhìn thấy lỗi màn hình đỏ như ở trên. OK tiếp
4. Mở Developer Menu bằng cách lắc lắc Android
5. Đến Dev Settings → Debug server host for device.
6. Điền IP và port của máy PC vào (ví dụ 10.0.1.1:8081)
7. Quay lại **Developer menu** và ấn **Reload**
8. Xong !

## II. Sử dụng máy ảo Android
Cái này tôi sẽ đi nhanh vì tôi không khuyến khích chạy máy ảo
Bạn mở "AVD Manager" trong Android Studio

![](https://i.imgur.com/I76n7so.png)

Chọn "Create Virtual Device..."

![](https://i.imgur.com/mKsVBPv.png)

Chọn Android 6 như hình

![](https://i.imgur.com/2vW2z1c.png)

Ấn Play để chạy máy ảo

Chuyển đến Project `AwesomeProject` bạn tạo ra từ đầu để chạy app bằng lệnh sau:

```
cd AwesomeProject
react-native run-android
```

Nếu đúng thì sẽ ra kết quả dưới đây

![](https://i.imgur.com/LJeUvgm.png)

**Do máy ảo không thể lắc được nên bạn phải ấn phím `R` 2 lần hoặc chọn `Reload` từ Developer Menu (Ctrl + M)**

# Tham khảo
[https://facebook.github.io/react-native/docs/getting-started.html](https://facebook.github.io/react-native/docs/getting-started.html)

### Ai có câu hỏi thì comment dưới đây để cùng nhau học hỏi nhé