### 1: Yêu cầu

Muốn dùng các lệnh adb, thì yêu cầu:

* Cài đầy đủ driver cho máy tính.

* Có 3 tập tin là adb.exe, AdbWinApi.dll, AdbWinUsbApi.dll ở trong cùng 1 thư mục trên máy tính PC.

* Thường thì mình để ở thư mục "adb" của ổ đĩa C:\, tức là 3 file này ở trong thư mục C:\adb, còn các bạn thích để đâu thì tùy, nhưng các dòng lệnh có thể thay đổi.

### 2: ADB là gì?

ABD viết tắt của cụm từ Android Debug Bridge, là một chương trình dạng dòng lệnh (cmd) cho phép tương tác với thiết bị android kết nối với máy tính. Các lệnh adb cho phép thi hành một số tác vụ, như cài đặt ứng dụng, gỡ rối (debug) ứng dụng, đồng thời nó cho phép bạn truy cập vào Unix shell để thi hành các lệnh nhân Unix trên thiết bị.

ADB được bao gồm trong gói Android SDK Platform-Tools, bạn có thể tài và cài đặt thông qua SDK Manager của Adndroid Studio bằng cách đánh dầu kiểm vào mục Android SDK Platform-Tools như hình.

![](https://images.viblo.asia/2dd388e6-098e-48d8-bf86-1bfb73de583e.png)

Để chạy được adb bạn cần xác định thư mục cài đặt nó của Android Studio, ở hình trên bạn sẽ biết được thư mục cài đặt Sdk ở dòng: Android Sdk Location, trong thư mục đó thì adb cài ở thư mục con platform-tools, như vậy thư mục cài đặt adb có dạng:

```
C:\Users\UserName\AppData\Local\Android\Sdk\platform-tools
```

Nếu muốn chạy adb ở bất kỳ thư mục nào, bạn thêm biến môi trường vào hệ thống, như sau

![](https://images.viblo.asia/74c71a56-3e5d-4b82-80c6-1bb6588221ec.png)

Truy cập vào System sau đó làm theo các bước 1,2,3. Ở bước 3 hộp thoại hiện ra bạn thêm đường dẫn chứa adb vào, sau đó khởi động lại máy, lúc này bạn có thể gõ lệnh adb ở bất kỳ thư mục nào.

### 3: Các lệnh adb cơ bản

* **ADB pull**

Lệnh này để tải file, copy file từ thiết bị vào máy tính. Với cú pháp

```
adb pull remote local
```

**remote** là tên file trên thiết bị Android.

**local** là thư mục file được copy vào của máy tính

Ví dụ:

```
adb pull /sdcard/demo.mp4 d:\
```

* **ADB push**

Lệnh adb push để copy(upload) file từ máy tính vào thiết bị với cú pháp như sau:

```
adb push local remote
```

**local** là tên file trên máy

**remote** là thư mục file được copy vào của thiết bị

Ví dụ:

```
adb push c:\test.apk /sdcard
//Copy file test.apk vào thư mục /sdcard
```

* **ADB devices**

Lệnh này liệt kê danh sách các thiết bị Android được kết nối, thường bạn gọi lệnh này để kiểm tra và đảm bảo có thiết bị kết nối để làm việc với các lệnh khác. Ví dụ ở cmd bạn gõ theo cú pháp:

```
adb devices
```

Kết quả hiện thị có dạng như:

```
List of devices attached
RQ3004DC4H      device
```

* **ADB install**

Copy vào cài một ứng dụng Android vào thiết bị. Cú pháp:

```
adb install [option] <path>
```

Ví dụ:

```
adb install test.apk
Cài vào thiết bị
```

```
adb install -r test.apk
Cài đè trên ứng dụng tồn tại
```

```
adb install -s test.apk
Cài ứng dụng trên thẻ
```

* **ADB reboot**

```
adb reboot
```

Lệnh adb reboot sẽ khởi động lại thiết bị. Ngoài ra lệnh reboot-bootloader khởi động lại thiết bị vào truy cập ngay vào bootloader của thiết bị, lệnh reboot recovery khởi động lại thiết bị và truy cập vào recovery

```
reboot-bootloader

reboot recovery
```

* **ADB shell pm list packages**

```
adb shell pm list packages
```

Hiện thị danh sách các package cài đặt trên thiết bị

* **ADB shell**

```
adb shell
```

Lệnh adb shell dùng để truy cập vào shell linux, từ đây có thể gõ một số lệnh mà nhân linux cung cấp trên thiết bị, như :

**ps** liệt kê các tiến trình đang chạy trên thiết bị

**li** liệt kê file

**cd** chuyển thư mục

**rm** xóa file

**mkdir** tạo thư mục. Ví dụ mkdir /sdcard/tmp

**cp** copy file

**mv** di chuyển, đổi tên file

**netstat** trạng thái mạng

**ping** kiểm tra kết nối: *ping google.com*

* **ADB shell screencap**

Chụp ảnh màn hình thiết bị. Ví dụ chụp ảnh màn hình và lưu vào */sdcard/screen.png*

```
adb shell screencap /sdcard/screen.png
```

Sau khi chụp bạn có thể copy vào máy tính bằng lệnh pull ở trên

```
adb pull /sdcard/screen.png c:/data
```

* **ADB shell screenrecord**

Lệnh này để ghi video màn hình, ví dụ:

```
adb shell screenrecord /sdcard/demo.mp4
```

Trong quá trình lệnh chạy, có thể nhấn CTRL+C để kết thúc.

Trên đây là một số lệch cơ bản mình tham khảo được qua một số bài báo mà mình thấy rất hay, bài viết sau mình sẽ đi chi tiết hơn .

Link tham khảo: 

https://xuanthulab.net/su-dung-cac-lenh-adb-android-debug-bridge.html

https://developer.android.com/studio/command-line/adb