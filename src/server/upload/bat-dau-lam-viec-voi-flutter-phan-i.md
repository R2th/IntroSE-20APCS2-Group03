Ở các bài trước, chúng ta đã cùng tìm hiểu khái niệm về Flutter và sự khác biệt giữa Flutter với React Native. Ở bài này, ta hãy cùng bắt đầu với Flutter bằng việc viết 1 ví dụ nho nhỏ

### Cài đặt môi trường
Để bắt đầu làm việc với Flutter, việc đầu tiên bạn cần làm hẳn nhiên là cài đặt môi trường phát triển.
Do thời lượng của bài viết có hạn, và cũng vì việc cài đặt khác nhau tùy theo hệ điều hành mà bạn sử dụng nên mình sẽ không đi sâu vào phần này, bạn có thể xem hướng dẫn cài đặt Flutter ở [đây](https://flutter.io/get-started/install/). 

### Cấu hình IDE
Việc tiếp theo cần làm là cấu hình IDE. Bạn có thể xây dựng các ứng dụng với Flutter bằng cách sử dụng bất kỳ trình soạn thảo văn bản nào kết hợp với các công cụ dòng lệnh của Google. Tuy nhiên, lời khuyên là bạn nên sử dụng một trong các IDE của Google để có trải nghiệm tốt hơn. Với IDE của Google, sẽ có code completion, syntax highlighting, hỗ trợ widget editing, run & debug, và hơn thế nữa.
Chúng ta sẽ thống nhất từ giờ về sau, IDE được sử dụng trong series là Android Studio.
> Thiết lập Android Studio
> 
> Cài đặt Android Studio
>  - Android Studio , phiên bản 3.0 trở lên.
> 
> Cài đặt plugin Flutter và Dart
> Flutter được hỗ trợ bởi hai plugin:
> 
>  - Flutter plugin hỗ trợ các luồng công việc của nhà phát triển (chạy, gỡ lỗi, hot reload, v.v.).
>  - Plugin Dart cung cấp phân tích mã (xác thực mã khi bạn nhập, hoàn thành mã, v.v.).
>   
> Để cài đặt chúng:
> 
>  1. Khởi động Android Studio.
>  2. Mở tùy chọn plugin (**Preferences**>**Plugins** trên macOS, **File**>**Settings**>**Plugins** trên Windows & Linux).
>  3. Chọn **Browse repositories…**, chọn trình cắm Flutter và nhấp vào install .
>  4. Nhấp vào Yes khi được nhắc cài đặt plugin Dart.
>  5. Nhấp vào Restart khi được nhắc.

Bước tiếp theo sẽ là Test Drive
### Test Drive
Trong bước này, ta sẽ tạo ứng dụng Flutter mới từ các mẫu của Google, chạy nó và tìm hiểu cách thực hiện thay đổi với Hot reload.
> **Tạo ứng dụng mới**
> Chọn **File** > **New Flutter Project**
> Chọn **Flutter application** làm loại dự án và nhấn Next
> Nhập tên dự án (ví dụ myapp) và nhấn Next
> Nhấp vào **Finish**
> Đợi Android Studio cài đặt SDK và tạo dự án.
> Lệnh trên tạo một thư mục dự án Flutter có tên myapp chứa một ứng dụng demo đơn giản sử dụng các thành phần Material.
> 
> Trong thư mục dự án, mã cho ứng dụng của bạn nằm trong lib/main.dart.
> 
> **Chạy ứng dụng**
> 1. Tìm thanh công cụ Android Studio chính: 
> ![](https://images.viblo.asia/8bcef909-2b29-4f49-bfa6-76b80a779391.png)
> 
> 2. Trong **target selector**, hãy chọn thiết bị Android để chạy ứng dụng. Nếu không có danh sách nào được liệt kê sẵn, hãy chọn **Tools**> **Android** > **AVD Manager** và tạo một emulator. Để biết chi tiết, hãy xem [Quản lý AVD](https://developer.android.com/studio/run/managing-avds.html).
> 3. Nhấp vào biểu tượng **Run** trên thanh công cụ hoặc gọi mục trình đơn **Run**> **Run**.
> 4. Nếu mọi thứ hoạt động, bạn sẽ thấy ứng dụng khởi động trên thiết bị hoặc trình mô phỏng: 
> 
> **Thử Hot reload**
> Flutter cung cấp chu kỳ phát triển nhanh với Hot reload, khả năng tải lại mã của ứng dụng đang chạy mà không cần khởi động lại hoặc mất trạng thái ứng dụng. Chỉ cần thực hiện thay đổi đối với mã nguồn của bạn, cho công cụ IDE hoặc dòng lệnh của bạn biết rằng bạn muốn hot reload và xem thay đổi trong trình giả lập, trình mô phỏng hoặc thiết bị của bạn.
> 
> 1. Sửa mã nguồn
> 2. Đừng nhấn nút '**Stop**'; cho phép ứng dụng của bạn tiếp tục chạy.
> 3. Để xem các thay đổi của bạn, hãy gọi **Save All** hoặc nhấp vào **Hot Reload** (nút có biểu tượng tia sét).
> Bạn sẽ thấy sự thay đổi trong ứng dụng đang chạy gần như ngay lập tức.

Vậy là chúng ta đã sẵn sàng để bắt đầu code với Flutter. Ở phần sau ta sẽ đi vào code thử một sample đơn giản.