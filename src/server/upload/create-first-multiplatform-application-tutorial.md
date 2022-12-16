KMM : Kotlin Multiplatform.
Tại đây, chúng ta  sẽ học cách tạo và chạy ứng dụng KMM đầu tiên của mình.


# Khởi tạo project
**1.Thiết lập môi trường của bạn để phát triển KMM bằng cách cài đặt các công cụ cần thiết trên một hệ điều hành phù hợp**

Bạn sẽ cần một máy Mac có macOS để hoàn thành các bước nhất định trong hướng dẫn này, bao gồm viết mã dành riêng cho iOS và chạy ứng dụng iOS.
Các bước này không thể được thực hiện trên các hệ điều hành khác, chẳng hạn như Microsoft Windows. Điều này là do yêu cầu của Apple.

**2.Trong Android Studio, chọn File | New | New Project.**

**3.Chọn KMM trong danh sách các mẫu dự án và nhấp vào Next.**

![](https://images.viblo.asia/8521c3dd-c575-4afb-98a9-bf676668c558.png)

**4.Chỉ định tên cho ứng dụng đầu tiên của bạn và nhấp vào Next.**

![](https://images.viblo.asia/a2d61105-36b0-48f1-a1fe-0a473269e35d.png)

**5.Giữ default names cho ứng dụng và các shared folders, chọn checkbox để tạo các thử nghiệm mẫu cho dự án của bạn và nhấp vào Finish.**

![](https://images.viblo.asia/bb0be62c-e0c9-4edd-90c1-d8c6f2826d3c.png)

Bây giờ, hãy đợi trong khi dự án của bạn được thiết lập. Có thể mất một chút thời gian để tải xuống và thiết lập các thành phần cần thiết khi bạn thực hiện việc này lần đầu tiên.
Để xem cấu trúc hoàn chỉnh của dự án đa nền di động của bạn, hãy chuyển chế độ xem từ Android to Project. Bạn có thể hiểu cấu trúc dự án KMM và cách bạn có thể sử dụng cấu trúc này.

![](https://images.viblo.asia/0b38d79b-d329-4207-b244-1918d5e59f8d.png)


# Update your application 

**1.Mở  file Greeting.kt trong  shared/src/commonMain/kotlin/com.example.kmmapplication.shared.
Thư mục này lưu trữ mã được chia sẻ cho cả hai nền tảng - Android và iOS. Nếu bạn thực hiện các thay đổi đối với mã được chia sẻ, bạn sẽ thấy các thay đổi trong cả hai ứng dụng.**

![](https://images.viblo.asia/69d169c2-9b92-4183-8226-e8095a7133a1.png)

**2.Cập nhật mã được chia sẻ - sử dụng chức năng thư viện chuẩn Kotlin hoạt động trên tất cả các nền tảng :reversed()**

```
class Greeting {
    fun greeting(): String {
        return "Guess what it is! > ${Platform().platform.reversed()}!"
    }
}
```
**3.Run the updated application**

![](https://images.viblo.asia/15faa330-368a-4fc6-add6-13cd3b59250f.png)

# Bước tiếp theo

Khi bạn đã start với  ứng dụng KMM đầu tiên của mình, bạn có thể:

Hiểu cấu trúc dự án KMM.
Hoàn thành hướng dẫn thực hành về mạng và lưu trữ dữ liệu.
Hoàn thành hướng dẫn về cách làm cho ứng dụng Android của bạn hoạt động trên iOS.


Bài viết tham khảo :
https://kotlinlang.org/docs/mobile/create-first-app.html