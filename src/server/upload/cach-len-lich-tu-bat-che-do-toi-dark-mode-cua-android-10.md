Android 10 bây giờ đã có cho tất cả các thế hệ điện thoại thông minh Android như Google Pixel , và nó mang tới một loạt các tính năng cao như điều hướng dẫn dàng và chế độ tối trên hệ thống của điện thoại. 
Tính năng thứ hai có lẽ là ảnh hưởng lớn nhất kể từ khi nó hỗ trợ trên nhiều ứng dụng, chẳng hạn như Gmail , Google Play Store , và nhiều hơn nữa. Trong phiên bản Android Q betas đầu tiên, bạn có thể lên lịch chuyển đổi chế độ tối theo thời gian trong ngày. 

Tuy nhiên, Google đã loại bỏ tùy chọn đó bởi vì nó có thể ảnh hưởng tiêu cực đến trải nghiệm người dùng bằng cách khởi động lại ứng dụng đột ngột trong khi bạn đang sử dụng chúng. Rất may, với ứng dụng của bên thứ ba, bạn có thể tạo lịch trình để bật chế độ tối cho Android 10 đấy.

Tất cả những gì bạn cần phải làm là cài đặt nó và chạy một lệnh ADB để cấp cho nó quyền thay đổi cài đặt điều khiển cho chế độ tối trên toàn hệ thống. ADB, hay Android Debug Bridge, là một công cụ dành cho nhà phát triển có thể được sử dụng để kiểm soát các tùy chọn khác nhau trên điện thoại của bạn; Nó chủ yếu được sử dụng để phát triển, nhưng cũng có thể hữu ích khi cấp các quyền mà HĐH Android nếu không sẽ không cho phép bạn cấp. Miễn là bạn cẩn thận về những ứng dụng bạn cấp quyền, thì bạn sẽ an toàn. Và chạy lệnh này sẽ không làm mất hiệu lực bảo hành điện thoại đâu nhé.!

![android 10 gameehoy.com](https://images.viblo.asia/692c997b-9086-4155-9d42-cf383a32058f.jpg)


Sau khi bạn cấp cho ứng dụng quyền phù hợp, thì ứng dụng sẽ xử lý thay đổi chế độ tối dựa trên lịch trình bạn đã chọn trước đó. Ngoài ra thì nó có một điểm tốt nhất là nó cũng có một tùy chọn chỉ thay đổi Theme khi điện thoại bị khóa. Bằng cách đó, một ứng dụng sẽ không đột ngột khởi động lại khi bạn đang sử dụng nó. Bây giờ, đây là cách thiết lập nó.

**  Yêu cầu:**

Android 10 (stable, beta hoặc ROM tùy chỉnh): Hiện có sẵn  trên tất cả các điện thoại thông minh Pixel và Essential Phone, nhưng cũng có sẵn trong bản beta cho Huawei P30 Pro , Xiaomi Mi 9 , Redmi K20 Pro (beta stable), và nhiều dòng khác. Và những ai dùng bản ROM tùy chỉnh cũng có thể tận dụng ứng dụng này.

Sau đó cài cài ADB trên PC của bạn. Hướng dẫn cách thiết lập nó trên Windows, macOS hoặc Linux PC của bạn có thể [xem ở đây](https://www.xda-developers.com/install-adb-windows-macos-linux/) .

Cài đặt Dark Automatic Dark cho Android 10 ứng dụng từ Cửa hàng Google Play. Bạn có thể [Bấm vào đây](https://play.google.com/store/apps/details?id=com.cannic.apps.automaticdarktheme) .
Cắm điện thoại của bạn vào PC và mở command prompt hoặc terminal window trong cùng thư mục nơi bạn đã tải DB binary.

Sau đó mở Mở ứng dụng trên điện thoại của bạn.

Chạy lệnh sau:

Windows 10 Command Prompt:

     adb shell pm grant com.cannic.apps.automaticdarktheme android.permission.WRITE_SECURE_SETTINGS

Windows 10 PowerShell:

    .\adb shell pm grant com.cannic.apps.automaticdarktheme android.permission.WRITE_SECURE_SETTINGS

macOS/Linux Terminal:

    ./adb shell pm grant com.cannic.apps.automaticdarktheme android.permission.WRITE_SECURE_SETTINGS

Bạn có thể tùy chỉnh trong ứng dụng một chút bằng cách thay đổi cách bạn có muốn ứng dụng chỉ chuyển đổi chế độ tối khi điện thoại bị khóa hay không. Bạn cũng có thể ẩn thông báo mà ứng dụng hiện lên; ;ưu lý là thông báo này cần thiết để ứng dụng chạy trong nền để ứng dụng có thể thay đổi chủ đề tối theo lịch trình mà không bị hệ điều hành Android dừng nó.


Nhà phát triển ứng dụng này nói rằng họ có kế hoạch thêm lịch trình chế độ tối dựa trên lịch trình từ khiw mặt trời mọc và mặt trời lặn, cũng như một tùy chọn để ẩn biểu tượng ứng dụng khỏi khu vực ứng dụng của điện thoại. 

Đây là một ứng dụng khá đơn giản, hoạt động rất tốt, nhưng các tính năng được thêm này sẽ khiến cho việc lên lịch cho chế độ tối của Android 10 giống như một tính năng chính thức, giúp bạn sử dụng tốt hơn.

Dịch bởi **[GAMEHOY.COM](https://twitter.com/Gamehoy2)**