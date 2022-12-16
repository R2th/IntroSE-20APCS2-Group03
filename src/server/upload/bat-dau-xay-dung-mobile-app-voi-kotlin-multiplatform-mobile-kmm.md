Trước khi bước vào xây dựng một Mobile App bằng **Kotlin Multiplatform Mobile**, bạn nên biết về Kotlin Multiplatform Mobile là gì và các công cụ cần thiết (Xcode, JDK, Android Studio,  Kotlin Multiplatform Mobile module,...) để bắt đầu với việc viết code. 

Tổng quan về Kotlin Multiplatform Mobile bạn có thể tìm đọc ở bài viết của mình: https://viblo.asia/p/tong-quan-ve-kotlin-multiplatform-mobile-kmm-5pPLkGRyLRZ

Còn nếu bạn đã biết rõ, okay bắt đầu thôi!

# 1. Check your environment
Đối với các máy sử dụng MacOS, bạn cần cài đặt và run KDoctor tool

Ở **Terminal**, gõ lệnh
```shell
brew install kdoctor
```
Muốn gõ lệnh trên thì bạn cũng phải cài đặt Homebrew cho máy đã nhé. (Cách cài tại https://brew.sh/)

# 2. Bắt đầu tạo cross-platform app
### Tạo Project từ Template
1. Ở Android Studio, chọn **File | New | New Project.**
2. Chọn **Kotlin Multiplatform App**  từ danh sách templates, click **Next**.

![Screenshot 2022-12-03 at 10.26.07.png](https://images.viblo.asia/a935d618-d16a-4d62-a1bb-468aa104b8bb.png) 

3. Đặt tên cho Project rồi tiếp tục click **Next**

![Screenshot 2022-12-03 at 10.27.51.png](https://images.viblo.asia/00d100d7-967d-40df-839c-db7ed5a01749.png)

4. Tại **iOS framework distribution**, chọn **Regular framework**. Các Android, iOS hay Shared Name nên để mặc định như vậy luôn nhé.

![Screenshot 2022-12-03 at 10.35.58.png](https://images.viblo.asia/393bf933-0f84-4616-bb9a-8e9445448340.png)

5. Click **Finish**.

Project sẽ được cài đặt tự động, mất một chút thời gian để download và setup các components được yêu cầu.

### Xem qua cấu trúc project

Với mỗi project Kotlin Multiplatform Mobile sẽ có ba modules chính
* *shared*: module Kotlin này chứa logic chung cho cả ứng dụng Android và iOS – nghĩa là khi bạn code ở phần shared này sẽ chạy chung cho cả hai nền tảng. Nó sử dụng Gradle làm hệ thống xây dựng giúp bạn tự động hóa quy trình xây dựng của mình. Module dùng chung được tích hợp vào thư viện Android và iOS framework.
* *androidApp* là một Module Kotlin tích hợp vào một ứng dụng Android. Nó sử dụng Gradle làm hệ thống xây dựng. Module androidApp phụ thuộc vào và sử dụng *shared module* như một thư viện Android thông thường. Nhìn ảnh dưới đây sẽ thấy nó rất quen thuộc đối với bạn nào thường xuyên lập trình Android.

![Screenshot 2022-12-03 at 16.14.56.png](https://images.viblo.asia/80992965-4886-4305-9c6f-4294750c91f3.png)
* *iOSApp* là một Xcode project được build thành một ứng dụng iOS. Nó phụ thuộc và sử dụng mô-đun được chia sẻ làm khung iOS. 

### Root project
![Screenshot 2022-12-03 at 16.28.37.png](https://images.viblo.asia/4da7b100-62e6-4d53-8c31-2ffcea038acc.png)
*Shared module* bao gồm ba bộ source chính: `androidMain`, `commonMain`, and `iosMain`.  Trong Kotlin Multiplatform, các bộ source khác nhau trong *shared module* có thể hướng đến riêng cho các platform khác nhau.

![Screenshot 2022-12-03 at 16.33.51.png](https://images.viblo.asia/12c6a4bb-f0ff-4941-8296-e8a0065fa3a1.png)

# 3. Run App
Okay bây giờ đến phần run App thôi!

### Run App trên Android
1. Tạo một máy ảo Android (Android virtual device). Cách tạo theo link hướng dẫn: https://developer.android.com/studio/run/managing-avds#createavd
2. Ở vị trí này, bạn chọn **androidApp** sau đó click **Run** (Hoặc ^R cho MacOS, Ctrl + R cho Windows nhé)

![Screenshot 2022-12-03 at 16.51.40.png](https://images.viblo.asia/aee2e0a8-7f4f-4cfe-8ef1-4b4cb64359d9.png)
3. Và đây là kết quả

![Screenshot 2022-12-09 at 20.40.59.png](https://images.viblo.asia/b171c10b-8f18-4600-9c3d-a063598112ed.png)

### Run App trên iOS

1. Mở XCode, lần đầu build KMM thì bạn cần phải đồng ý vài điều khoản điều kiện của nó.
2. Giờ, thay vì chọn Andoird App thì bạn chọn **iosApp** sau đó click **Run**, chờ một lát để nó build những thứ cần thiết nhé.

![](https://images.viblo.asia/0614664a-3e4a-451d-ad32-64f721178b65.png)

3. Và đây là kết quả

![Screenshot 2022-12-09 at 20.48.34.png](https://images.viblo.asia/1a331382-acff-4376-9954-894121e09243.png)

# 4. Code App

Mở ***Greeting.kt*** file ở *shared/src/commonMain/kotlin*. Thư mục này chứa shared code cho cả Android và iOS. Bạn code bất cứ thứ gì ở file này nó sẽ đều chạy ở cả hai nền tảng.

![Screenshot 2022-12-09 at 20.53.53.png](https://images.viblo.asia/713ecd0c-81cf-4a11-96c7-7c7c852a519e.png)

Bây giờ re-run lại androidApp hoặc iOSApp để xem kết quả nhé. Mình đang chạy app iOS, androidApp cũng cho ra kết quả như vậy.

![Screenshot 2022-12-09 at 20.55.03.png](https://images.viblo.asia/3e9021de-a0a7-427c-8b3e-09a8cc0c9f7d.png)

### Thành công!!!

Như vậy mình đã trình bày cho các bạn cách để run thành công một project KMM trên cả hai nền tảng, trong các bài viết tiếp theo mình sẽ đi sâu hơn ví dụ như thêm các **dependencies**, hay upgrade project của mình.

Cảm ơn bạn đã đọc bài viết!

# References
**Create your first cross-platform app**, *Last modified: 21 October 2022*, src: https://kotlinlang.org/docs/multiplatform-mobile-create-first-app.html <br>
**Source Cover Page**: https://devhub.global/event/ios-developer-private-event-london-27th-april-2022/