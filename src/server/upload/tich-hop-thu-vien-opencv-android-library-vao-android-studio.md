# 1. Giới thiệu
Gần đây khi mình bắt đầu làm việc với OpenCV trên Android. Trong quá trình tìm kiếm việc tích hợp OpenCV vào Android Studio mình gặp rất nhiều khó khăn do các bài hướng dẫn đã lỗi thời không còn phù hợp với hiện tại. Vì vậy mình quyết định viết một hướng dẫn đơn giản về việc này.

![](https://images.viblo.asia/74f36d6d-90b0-4156-ac84-0f3da8906fd0.jpeg)

# 2. Tích hợp OpenCV
### 2.1 Download OpenCV Library Android
 - Các bạn truy cập vào link: [OpenCV Library Android](https://sourceforge.net/projects/opencvlibrary/files/opencv-android/) vào trang để tải cho mình phiên bản mới nhất. Tại thời điểm này phiên bản mới nhất đang là 4.0.0.
 - Sau quá trình tải xuống và giải nén file .zip. Mình sẽ được một folder như dưới đây:
 
![](https://images.viblo.asia/a321f311-393b-425a-8929-8dc9c542a263.png)

### 2.2 Thiếp lập dự án trong Android Studio
- Tạo một dự án trong Android Studio:
![](https://images.viblo.asia/dba1c148-862a-4593-8f34-d87353208223.png)
### 2.3 Import OpenCV Module
- Sau khi tạo thành công dự án các bạn sẽ tiến hành import OpenCV:
- Tiến click: **File -> New  -> Import Module**

 ![](https://images.viblo.asia/6697bbac-1b53-47c4-9fc8-f9f7eab95b4e.png)
 
- Cửa số xuất hiện như hình bên trên bạn có thể chọn đường dẫn tới module mà bạn import:
- Bạn trỏ tới thư mục mà bạn đã giải nén file .zip khi download OpenCV về. Bạn chọn folder **SDK** tiếp đến là folder **Java** 

 ![](https://images.viblo.asia/115d05e5-0a3d-4bce-9e17-1a0187c1d7a2.png)
 
- Sau khi chọn đúng đường dẫn và nhấp vào OK , bạn sẽ nhận được một màn hình như hình ảnh bên dưới.

![](https://images.viblo.asia/115d05e5-0a3d-4bce-9e17-1a0187c1d7a2.png)

- Nhấn vào Next để đến màn hình tiếp theo. Trên màn hình tiếp theo (hình ảnh bên dưới), bạn nên để các tùy chọn mặc định được chọn và nhấp vào **Finish** để hoàn tất quá trình nhập mô-đun.

![](https://images.viblo.asia/664a710f-d119-4478-aaa8-e77cdd27734a.png)

### 2.4  Fixing Gradle Sync Errors
- Bạn sẽ gặp lỗi build Gradle sau khi nhập xong thư viện OpenCV. Điều này xảy ra vì thư viện đang sử dụng SDK Android cũ mà bạn có thể chưa cài đặt.

![](https://images.viblo.asia/347559f7-4d3e-4df6-9059-ad0c6d9c1d7e.png)

- Để nhanh chóng khắc phục lỗi này, hãy chuyển từ ngăn Android sang khung Project ở phía bên trái của Android Studio.

![](https://images.viblo.asia/1ee97bf2-895b-45ac-bcba-6416cbcef7cc.png)

- Đến mô-đun thư viện OpenCV và mở build.gradletệp của nó .
- 
![](https://images.viblo.asia/d46909d6-286f-47e9-a9cb-0739fdac28de.png)

- Để khắc phục lỗi, bạn chỉ cần thay đổi compileSdkVersionvà targetSdkVersionsang phiên bản SDK Android mới nhất hoặc phiên bản bạn đã cài đặt trên PC. Sau khi thay đổi phiên bản, bạn nên nhấp vào nút Syns để Gradle có thể đồng bộ hóa dự án.

### 2.5 Add the OpenCV Dependency
- Để làm việc với thư viện Android OpenCV, bạn phải thêm nó vào appmô-đun của mình dưới dạng **dependency**.

![](https://images.viblo.asia/527dbea8-044e-4695-ae8a-160024ee7919.png)

### 2.6 Add Native Libraries

- Bạn tiếp tục mở folder **sdk** và sau đó là folder **native** (Sử dụng hình ảnh bên dưới làm hướng dẫn).

![](https://images.viblo.asia/19049c9d-a5c3-43d6-9a86-d9170f9cb626.png)

- ao chép folder **libs** trong thư mục gốc sang folder **app** chính của mô-đun dự án của bạn (Thông thường ProjectName/app/src/main).
- Đổi tên folder **libs** bạn vừa sao chép vào dự án của bạn **jniLibs**.

![](https://images.viblo.asia/9e6a962c-46f4-41fd-bad4-bd96c107b6cc.png)

### 2.7 Add Permission
- Để sử dụng thành công OpenCV, ứng dụng của bạn phải có quyền của máy ảnh được thêm vào tệp AndroidManifest.xml.
- Note: Đừng quên yêu cầu cấp phép camera trong thời gian chạy trên Android 6 trở lên.
```
< used-  allow android : name = " ERIC.CAMERA " />

    < used-  Feature android : name = " android.hardware.camera "  android : required = " false " />
    < used-  Feature android : name = " android.hardware.camera.autof Focus "  android : required = " false " />
    < used-  Feature android : name = " android.hardware.camera.front "  android : required = " false " />
    < used-  Feature android : name = " android.hardware.camera.front.autof Focus "  android : required = " false " />
```

# 3. Demo
- Để xác nhận rằng bạn đã tích hợp thành công thư viện OpenCV Android, bạn có thể thử một trong các mẫu có trong tệp zip thư viện.
- Hãy thử **color-blob-detection** sample. Bạn có thể xem sample trong hành động dưới đây:
[Samples](https://youtu.be/d62LO19pejE)
# 4. Một số lưu ý
- Vì bạn đang gói các thư viện gốc trong APK ứng dụng của mình, nên bạn sẽ có kích thước APK ứng dụng rất lớn.
- Một cách để giải quyết vấn đề này là sử dụng các phần tách **ABI** , do đó bạn chỉ có các thư viện cần thiết cho mỗi thiết bị trong APK.
- Một cách khác xung quanh vấn đề kích thước là sử dụng **Library OpenCV** . Trong thư mục nơi bạn trích xuất nội dung thư viện vào, có một thư mục được gọi **apk** có chứa trình quản lý OpenCV cho các kiến ​​trúc khác nhau.

![](https://images.viblo.asia/cd1a86c5-9fb3-4785-9afe-03e7da8ec2a0.png)

Chọn APK có kiến ​​trúc phù hợp với thiết bị thử nghiệm của bạn và sử dụng ADB thông qua dấu nhắc / dòng lệnh để cài đặt nó trên thiết bị của bạn.

![](https://images.viblo.asia/ffbab780-db12-4b5a-9901-837e4fab659e.png)
# 5. Nguồn 
https://android.jlelse.eu/a-beginners-guide-to-setting-up-opencv-android-library-on-android-studio-19794e220f3c

Bài viết tới đây là hết. Cảm ơn các bạn đã quan tâm.