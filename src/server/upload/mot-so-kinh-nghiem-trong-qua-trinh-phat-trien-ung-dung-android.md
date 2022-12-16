Xin chào các bạn.
Sau một vài dự án tôi quyết định chia sẻ với các bạn những kinh nghiệm mà tôi đã rất khó khăn để học được.

Dưới đây là một số mà tôi lựa chọn:
* Suy nghĩ thật kỹ 2 lần trước khi quyết định thêm bất kỳ thư viện nào, đó thực sự là việc nghiêm túc.
* Đừng sử dụng database trừ khi bạn thực sự cần đến nó.
* Bạn có thể nghĩ đến Realm database, nó khá thú vị.
* Bạn sẽ chạm mốc 65k methods khá nhanh, ý tôi là rất nhanh đó. Và Multidexing là cứu cánh dành cho bạn.
* RxJava là sự lựa chọn thay thế tốt nhất cho AsyncTasks và nhiều hơn cả thế nữa.
* Retrofit là thư viện networking tốt nhất.
* Đừng dại dột viết lại một HTTP client, sử dụng Volley hoặc thư viện OkHttp.
* Hãy viết code ngắn hơn bằng cách sử dụng RetroLamda
* Kết hợp RxJava với Retrofit và RetroLamda mang lại tối đa sự thú vị
* Tôi sử dụng EvenBus và nó thực sự tuyệt vời. Nhưng tôi không lạm dụng nó quá nhiều bởi vì source code sẽ trở nên hỗn độn
* Tôi đặt tên, nhóm package bởi feature chứ không phải layers
* Hãy chuyển mọi thứ ra khỏi Main Thread. Điều này sẽ cứu bạn khỏi ANR
* Sử dụng lint với layout sẽ giúp bạn tối ưu cấu trúc layout và bạn có thể xác định các views không cần thiết và loại bỏ chúng.
* Sử dụng Gradle và cấu trúc dự án được đề xuất của nó
* Đưa các thông tin nhạy cảm như password vào gradle.properties
* Sử dụng styles để tránh việc lặp các attributes trong XML
* Đừng tạo một cấu trúc view quá nhiều tầng
* Theo dõi nguồn điện và pin. Update dữ liệu khi sạc, dừng update khi pin yếu.
* Bạn có thể nghĩ về JobScheduler
* onLowMemory() sẽ được gọi khi hệ toàn bộ thống thiếu bộ nhớ. không chỉ riêng ứng dụng của bạn vì vậy bạn không thể tránh OutOfMemory với nó
* Lượng pin tiêu thụ là 30% cho các ảnh, animation, ... và 70% cho Analytics, Ads, maps, gps
* Theo dõi kết nối và kiểu kết nối, hãy update data nhiều hơn khi có wifi kết nối.
* Sử dụng AccountManager để gợi ý tên đăng nhập và email
* Hãy đặt tên method một cách rõ ràng về chức năng ý nghĩa của nó
* Màn hình Splash là trải nghiệm đầu tiên khi đến với ứng dụng của bạn
* Đừng hiển thị màn hình Splash nếu bạn không cần nó
* Giữ file color.xml ngắn gọn và sạch sẽ, hãy định nghĩa bảng màu
* Tương tự giữ dimens.xml sạch sẽ, định nghĩa các dimen dùng chung generic
* Sử dụng StringBuffer hoặc StringBuilder
* Để tránh Memory Leaks:
    *  Không giữ reference của view bên trong AsyncTask
    *  Không giữ reference của View ở đối tượng static
    *  Tránh đưa các Views vào trong Collection, bạn có thể sử dụng WeakHashMap
* FlatBuffers là một thư viện hiệu quả cho việc serialization đa nền tảng.
* Serializable rất đơn giản để implement nhưng hiệu suất của nó thực sự khá tệ.

HẾT
 [Nguồn](https://android.jlelse.eu/android-development-some-of-the-best-practices-27722c685b6a)