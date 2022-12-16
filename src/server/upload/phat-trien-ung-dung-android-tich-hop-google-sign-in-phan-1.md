# I. Giới thiệu
* Google Sign-In là công nghệ cho phép user truy cập ứng dụng một cách nhanh chóng và bảo mật. Nó còn tạo ra sự liền lạc giữa các tính năng – user đăng nhập một lần và sẽ được chứng thực trên tất cả các app của thiết bị. Nó cũng cho phép chúng ta tích hợp các dịch vụ của Google vào website và mobile app, và đồng thời cho phép cài đặt ứng dụng Android dưới dạng OTA (over-the-air) khi user chúng thực vào web-site của chúng ta.

* Trong khuôn khổ bài viết này, chúng ta sẽ học cách tích hợp Google Sign-In với ứng dụng Android.
# II. Nội dung chính
### 1. Tạo project
* Để tạo một project, chúng ta truy cập vào trang [Develop's Console](https://console.developers.google.com/project). Nhấn **Create Project** và chúng ta sẽ nhìn thấy popup như sau:

![](https://images.viblo.asia/ccdb1933-ff2a-41a7-9f22-f0caf492e401.png)

* Sau khi điền đầy đủ các thông tin hợp lệ, chúng ra sẽ nhấn **Create** để tạo một project. Chúng ta sẽ có kết quả như sau:

![](https://images.viblo.asia/91d1ad32-7945-4a88-9bfc-c48c19d83503.png)

### 2. Kích hoạt Google+ API
* Chọn **APIs & auth** và trong trang kết quả chọn **APIs** để liệt kê toàn bộ các API khả dụng.

![](https://images.viblo.asia/61da1133-36a0-40f3-9ad7-691ad8cf6972.png)

* Tìm chọn Google+ API để kích hoạt

![](https://images.viblo.asia/3de70d04-6e4d-4542-9f52-aeeeb9403072.png)

* Chọn Enable API để mở API

![](https://images.viblo.asia/4ba43cd1-86aa-4b1b-a9c8-ef3ed5462521.png)

### 3. Cấu hình chứng thực
* Chúng ta sẽ tiến hành chứng thực cho ứng dụng. Google sẽ dùng cách này để chắc chắn ứng dụng của chúng ta là thật. Trong quá trình phát triển, chúng ta sẽ dùng debug certificate và khi đưa ứng dụng lên Play Store chúng ta cần tạo ra một certificate thật sự ([tham khảo thêm tại đây]( https://developer.android.com/tools/publishing/app-signing.html)). Khi chúng ta đã có chứng thực, chúng ta sẽ định nghĩ nó bởi SHA-1 fingerprint.
1. Lấy SHA-1:
+ Với Mac hoặc Linux, truy cập đường dẫn **~/.android**
+ Với Windows, truy cập đường dẫn **C:\Users\<your user name>\.android.C:\Users\<your user name>\.android**
2. Mở cmd và gõ câu lệnh sau:
```
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```
3. Chúng ta sẽ có kết quả như sau:

![](https://images.viblo.asia/77128e8f-6bdb-4539-b385-6664f6fe7b0c.png)

* Lưu lại giá trị SHA1 và tiếp tục bước tiếp theo.
### 4.Cấu hình Consent Screen
* Trên trang **Developer's Console**, chọn **Consent screen**

![](https://images.viblo.asia/d49ddaf2-251e-4a7f-b56b-97c6cd897118.png)

* Điền đầy đủ các thông tin theo yêu cầu và nhấn **Save**

![](https://images.viblo.asia/db933b04-0112-48d2-bc91-bde4bac3d74f.png)

### 5. Cấu hình chứng thực
* Chọn **Credentials**, chúng ta sẽ thấy màn hình yêu cầu **OAuth** hoặc **Public API Access**.

![](https://images.viblo.asia/8c9a82aa-1180-4123-81c8-5221fab3357b.png)

* Chọn **Installed Application**, và chọn **Android**. Điền **Package name** đã sử dụng trong ứng dụng của chúng ta và điền thêm SHA1. **Chúng ta phải lưu ý điền chính xác package name**.

![](https://images.viblo.asia/d612a3fe-3eba-4081-b3bf-d88dbe49d723.png)

* Nhấn **Create Client ID** và đợi trong giây lát, màn hình chứng thực sẽ xuất hiện. Và chúng ta đã hoàn thành các bước cấu hình cần thiết.

![](https://images.viblo.asia/d9348fc1-73cc-4788-aca2-ac64cc11913a.png)

# III. Kết
* Đây là phần đầu tiên để mình hướng dẫn các bạn cấu hình cho Google SignIn. Trong phần 2 mình sẽ tiếp tục hướng dẫn các bạn code một ứng dụng hoàn chỉnh với cấu hình như trên.
* Nội dung của bài viết mình lược dịch bản đầu đủ tại [đây] (https://codelabs.developers.google.com/codelabs/sign-in/index.html#0)