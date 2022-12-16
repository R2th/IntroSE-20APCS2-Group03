Hiện tại Android Studio đã ra mắt phiên bản stable mới là Android Studio 4.1, cùng với nó là bổ sung những tính năng mới giúp những nhà phát triển thuận lợi hơn.

![](https://images.viblo.asia/88cb7552-c133-402e-919f-748cb202e0ae.png)

### Database Inspector
`Database Inspector` sẽ  giúp bạn kiểm tra, truy vấn và sửa đổi cơ sở dữ liệu trong ứng dụng đang chạy của bạn.

![](https://images.viblo.asia/da3e8aa2-3ce6-4193-aa27-98330d6ca843.gif)

Để bắt đầu, bạn phải tạo ứng dụng với SDK từ 26 trở lên và chọn **View > Tool Windows > Database Inspector** từ thanh menu. Bất kì bạn sử dụng `Jetpack Room library` hoặc `Android SQLite` đều có thể sử dụng được tính năng này.

Vì Android studio duy trì một kết nối trực tiếp khi bạn kiểm tra ứng dụng, nên bạn cũng có thể thay đổi giá trị các thuộc tính trong database và thấy sự thay đổi khi bạn chạy lại ứng dụng.

Khi bạn sử dụng `Room persistence library` Android Studio có cung cấp một nút `Run` kế mỗi dòng code để nhanh chóng chạy lệnh được định nghĩa trong `@Query annotations`

### Run Android Emulator directly in Android Studio
![](https://images.viblo.asia/035528f5-ca58-424e-99c9-a7e474dd1475.gif)

Bạn bây giờ có thể chạy trực tiếp máy ảo Adroid ngay trong Android Studio.
Bạn có thể quản lý màn hình, dùng các hành động phổ biến của máy ảo như xoay màn hình, chụp màn hình từ trong Studio nhưng để có thể sử dụng hết chức năng bạn cần sử dụng máy ảo bên ngoài.

Để sử dụng tính năng này bạn vào `File → Settings → Tools → Emulator → Launch in Tool Window.`

### Dagger Navigation Support
![](https://images.viblo.asia/a29af791-19b4-4b4b-8927-328470fb846f.gif)

`Dagger` được biết đến là một thư viện `dependency injection` phổ biến. Android Studio giờ sẽ giúp dễ dàng điều hướng giữa các code `Dagger` bằng cách cung cấp các hành động mới và hỗ trợ mở rộng trong cửa sổ `Find Usages`.

Tất nhiên `Jetpack Hilt library` cũng được hỗ trợ tính năng này.

### Use TensorFlow Lite models
![](https://images.viblo.asia/2b31cdbe-7ef0-4ce5-9060-13a344a142f3.png)
Với lập trình viên Android sử dụng `machine learning` [TensorFlow Lite ](https://www.tensorflow.org/lite) là một thư viện nổi tiếng để tạo models máy học,và Android đã làm chúng đơn giản hơn khi nhập models vào ứng dụng Android.

Tương tự như `view binding`, Android Studio khởi tạo tự động những class để chạy models ít code hơn và an toàn kiểu hơn. Việc triển khai `ML Model Binding` hiện tại hỗ trợ các mô hình phân loại hình ảnh và `style transfer models`

Để xem chi tiết về mô hình đã nhập và nhận hướng dẫn về cách sử dụng mô hình đó trong ứng dụng của bạn, hãy nhấp đúp vào tệp model  .tflite trong project của bạn để mở trang trình xem model [Xem Thêm](https://developer.android.com/studio/releases#4.1-tensor-flow-lite-models)

## Tổng kết
Trên đây là một số tính năng mới và một số tính năng được cải thiện trong các bản Android Studio 4.1 rất đáng chú ý. Mọi người có thể dowload bản cải đặt trên trang chủ về để trải nghiệm nhé!

Nguồn bài viết: https://android-developers.googleblog.com/2020/10/android-studio-41.html