Kotlin Multiplatform Mobile (KMM) là một SDK được thiết kế để làm đơn giản hoá việc tạo ứng dụng trên nhiều môi trường khác nhau. KMM hỗ trợ  những hệ 
điều hành di động như:
* Ứng dụng và các thư viện Android
* Android NDK trên ARM32 và ARM64
* Apple iOS trên ARM64 (iPhone 5 trở lên), ARM32 (các máy cũ hơn) và máy ảo
* Apple watchOS trên ARM64 (Apple Watch Series 4 và mới hơn), ARM32 (các dòng máy cũ hơn) và máy ảo

## Một cách mới để chia sẻ source code giữa các môi trường
KMM có một cách chia sẻ source code khác hoàn toàn so với những công nghệ khác: Nó tập trung vào việc dùng chung business logic hơn là những gì liên quan đến từng nền tảng xác định như UI hay notification.

Chắc hẳn từng có lúc bạn có 1 ứng dụng chạy ngon lành trên Android được viết bằng Kotlin và giờ bạn muốn làm thêm 1 ứng dụng iOS thì tại sao lại không thử dùng lại source code từ app Android? Khi đó, KMM là lựa chọn phù hợp nhất với bạn.

## Yêu cầu
* **Mac**: chắc chắn rồi, ta phải cần Mac để viết và chạy code iOS
* **JDK**
* **Android Studio** version 4.1 trở lên
* **Xcode** 11.3 trở lên

## Cài đặt môi trường
1. Mở **Android Studio**
2. Trong Preference -> Plugins, tìm **Kotlin MultiplePlatform Mobile** ở tab Market và cài đặt
3. Cài đặt phiên bản **Kotlin** plugin hỗ trợ KMM
4. Khởi động lại **Android Studio**

## Tạo project
1. Trong Android Studio, chọn File -> New -> New Project
2. Chọn KMM Application và Next
![](https://images.viblo.asia/08358812-597d-4f90-b4fd-b0f2a3e59f6d.png)

3.  Thay đổi tên và nơi lưu project, Next
![](https://images.viblo.asia/b52120a5-986e-4122-8d07-40ee21e24d55.png)

4. Chọn **Add sample test for Shared Module** nếu muốn viết test và Finish
Ngoài ra có 2 cách để thêm module **shared** vào iOS:
* Sử dụng gradle task **packForXcode**
* Sử dụng CocoaPod

![](https://images.viblo.asia/a24fa40c-984a-4d8f-9ced-9d5b964d8ca9.png)

5. Pha 1 ly cafe và chờ IDE khở tạo xong project

## Chạy ứng dụng
1. Sau khi IDE đã cài đặt và đồng bộ project xong, bạn sẽ thấy sẽ có 2 config để chạy: 1 cho Android, 1 cho iOS

![](https://images.viblo.asia/e8803da4-f011-4b7d-98d6-f2168d5b7e78.png)

2. Chọn **androidApp** và ấn **Run**
3. Tương tự, chọn **iosApp** và ấn **Run**

![](https://images.viblo.asia/8d3c285b-c505-4e3d-82f3-6e196ef20efe.png)

4. Để đổi các thiết bị iOS, chọn **Edit Configurations**, đổi thiết bị và chạy lại

![](https://images.viblo.asia/73456528-e34a-484f-88fc-1cf0057fa722.png)


## Cấu trúc dự án
* Đầu tiên, chọn **Project** thay vì **Android**

![](https://images.viblo.asia/18467aee-9ad6-485d-a2b6-7d537c0eca7f.png)

* Ta có thể thấy project bao gồm 2 Gradle modules: **androidApp** và **shared** cùng với **iosApp** là nơi chứa ios project

![](https://images.viblo.asia/58c537d1-a87f-4d54-b971-faf62e7b9ee8.png)

* Trong module **shared** ta sẽ thấy thư mục **src** để chứa code của android, ios và common

![](https://images.viblo.asia/318bc9a1-cf03-49d2-bbab-a9d135298449.png)

## Tổng kết
![](https://images.viblo.asia/3232d7a6-264c-4231-8c74-40816b16065c.png)

Trong bài viết này, mình đã giới thiệu với các bạn về 1 vài điểm như:
* Cài đặt môi trường cho Kotlin Multiplatform Mobile (KMM)
* Tạo 1 ứng dụng mới
* Chạy cả trên Android lẫn iOS
* Tìm hiểu cấu trúc thư mục tạo sẵn