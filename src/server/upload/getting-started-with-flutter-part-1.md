![](https://images.viblo.asia/50ea96b6-fe4e-453b-bbd4-3eae75a7406d.png)

Kể từ thời điểm mà các nền tảng iOS và Android đã bùng nổ vào một thập kỷ trước, phát triển đa nền tảng (cross-platform) đã trở thành một mục tiêu trong toàn giới phát triển di động. Khả năng viết một ứng dụng cho cả iOS và Android có thể tiết kiệm đáng kể thời gian và công sức cho công ty và đội của bạn.

Đã có nhiều công cụ phát hành cho sự phát triển của cross-platform trong nhiều năm qua, bao gồm các công cụ dựa trên web như **PhoneGap** của **Adobe**, các công cụ mạnh mẽ như **Xamarin** của **Microsoft** và các công cụ mới hơn như **React Native** của **Facebook**. Mỗi bộ công cụ đều có những ưu và nhược điểm và chúng đã đạt được những thành công khác nhau trong ngành di động.

Một framework gần đây đã gia nhập vào đấu trường đa nền tảng (cross-platform)  là [**Flutter**](https://flutter.io/) từ **Google**, đã được công bố vào tháng Hai tại **Mobile World Congress 2018** để bước vào giai đoạn beta. **Flutter** có  tính năng chu kỳ phát triển nhanh, hiển thị giao diện người dùng nhanh và thiết kế giao diện người dùng độc đáo và hiệu suất ứng dụng gốc trên cả hai nền tảng.

# Giới thiệu về Flutter
Các ứng dụng [**Flutter**](https://flutter.io/) được viết bằng ngôn ngữ lập trình [**Dart**](https://www.dartlang.org/), cũng bắt nguồn từ Google và bây giờ là một tiêu chuẩn **ECMA**. **Dart** chia sẻ nhiều tính năng tương tự như các ngôn ngữ hiện đại khác như Kotlin và Swift, và có thể được chuyển đổi thành mã JavaScript.

Là một cross-platform, **Flutter** gần giống nhất với **React Native**, vì **Flutter** cho phép `reactive` và `declarative`. Tuy nhiên, không giống React Native, Flutter không cần sử dụng cây cầu Javascript, điều có thể cải thiện thời gian khởi động ứng dụng và hiệu suất tổng thể. Dart làm được điều này bằng cách sử dụng **Ahead-Of-Time** hoặc gọi tắt là **AOT**.

Như bạn sẽ thấy trong hướng dẫn này,  `Flutter framework` được xây dựng rất nhiều xung quanh ý tưởng về **widgets**. Trong Flutter, **widgets**  không chỉ được sử dụng cho chế độ xem ứng dụng của bạn mà còn cho toàn bộ màn hình và thậm chí đối với bản thân ứng dụng.

Ngoài sự phát triển của nền tảng iOS và Android, việc học  `Flutter` cũng sẽ giúp bạn bắt đầu phát triển nền tảng [Fuchsia](https://en.wikipedia.org/wiki/Google_Fuchsia), hiện đang là một hệ điều hành thử nghiệm đang phát triển tại Google. Fuchsia được nhiều người nghĩ là một sự thay thế tiềm năng trong tương lai cho Android.

Bạn có thể phát triển ứng dụng với việc sử dụng iOS Simulator,  Android emulator hoặc cả hai!

Trong bài viết hôm nay, bạn sẽ học những điều sau đây về `Flutter`:
* Thiết lập môi trường phát triển của bạn
* Tạo một dự án mới
* Hot reload 
# Bắt đầu
Phát triển `Flutter` có thể được thực hiện trên macOS, Linux, hoặc Windows. Trong khi bạn có thể sử dụng bất kỳ trình soạn thảo nào với thanh công cụ Flutter, thì có các plugin IDE cho **Intelli JIDEA** , **Android Studio** và **Visual Studio Code** để dễ dàng phát triển. Mình sẽ sử dụng **VS Code** cho hướng dẫn này.

### Thiết lập môi trường phát triển
Hướng dẫn cài đặt máy phát triển của bạn với Flutter có thể được tìm thấy ở [đây](https://flutter.io/get-started/install/). Các bước cơ bản khác nhau theo nền tảng, nhưng phần lớn là:
* Clone the Flutter git repository
* Thêm thư mục Flutter bin vào đường dẫn của bạn
* Chạy `flutter doctor`  : cài đặt  Flutter framework bao gồm Dart và cảnh báo bạn với bất kì cài đặt phụ thuộc nào còn thiếu 
* Cài đặt phụ thuộc bị thiếu
*  Thiết lập IDE của bạn với một plugin Flutter / extension
* Kiểm tra ứng dụng

Các hướng dẫn được cung cấp trên trang web của Flutter được thực hiện rất tốt và cho phép bạn dễ dàng thiết lập môi trường phát triển trên nền tảng được lựa chọn. Phần còn lại của hướng dẫn này giả định bạn đã thiết lập VSCode cho sự phát triển Flutter.

Bạn cũng cần phải chạy  iOS Simulator , Android emulator hoặc có thiết bị iOS được cấp phép hoặc thiết bị Android để phát triển.

**Lưu ý**: Để xây dựng và thử nghiệm trên  iOS Simulator hoặc thiết bị iOS, bạn cần phải sử dụng macOS với cài đặt Xcode.

### Create new project
Trong VS Code với việc bạn đã cài đặt **Flutter extension**, mở  command pallatte bằng việc lựa chọn **View > Command Palette**… hoặc bấm Cmd-Shift-P trên macOS hoặc Ctrl-Shift-P trên Linux or Windows. Nhập vào  **Flutter: New Project** .

![](https://images.viblo.asia/41341bb3-c7b0-40bf-87a3-4b6de0cb720d.png)

Nhập tên **helloflutter** cho dự án và nhấn return. Chọn một thư mục để lưu trữ dự án vào, và sau đó chờ Flutter thiết lập dự án trong VS Code. Khi dự án đã sẵn sàng, tập tin **main.dart** sẽ được mở ra trong trình soạn thảo của bạn.


![](https://images.viblo.asia/2c92fecb-4c0d-4059-aed0-5dd2136067d4.png)

Trong VS Code, bạn sẽ thấy bảng điều khiển ở phía bên tay trái cho thấy cấu trúc dự án của bạn. Có các thư mục cho iOS và Android, cũng như thư mục lib có chứa **main.dart** và sẽ có mã áp dụng cho cả hai nền tảng. Bạn sẽ làm việc trong thư mục lib chỉ trong hướng dẫn này.

Thay thế mã trong **main.dart** với những điều sau:

```dart
import 'package:flutter/material.dart';

void main() => runApp(new GHFlutterApp());


class GHFlutterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'GHFlutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('GHFlutter'),
        ),
        body: new Center(
          child: new Text('GHFlutter'),
        ),
      ),
    );
  }
}
```

Void main () gần phía trên sử dụng toán tử `=>` cho một chức năng dòng đơn để chạy ứng dụng. Bạn có một lớp cho ứng dụng có tên **GHFlutterApp**.

Bạn thấy ở đây rằng ứng dụng của bạn chính nó là một **StatelessWidget**. Hầu hết các thực thể trong ứng dụng Flutter là các widgets, không trạng thái hoặc trạng thái. Bạn ghi đè lên phương thức widget bud () để tạo widget của ứng dụng. Bạn đang sử dụng tiện ích **MaterialApp** cung cấp một số thành phần cần thiết cho các ứng dụng sau Material Design.

Đối với hướng dẫn bắt đầu này, bạn hãy gỡ bỏ tệp tin kiểm tra `widget_test.dart` trong thư mục thử nghiệm từ dự án bằng cách chọn tệp đó và nhấn phím Xóa.

Nếu bạn đang sử dụng macOS, hãy khởi động  iOS Simulator. Bạn cũng có thể sử dụng trình giả lập Android trên macOS, Linux hoặc Windows. Nếu cả  iOS Simulator và  Android emulator đang chạy, bạn có thể chuyển đổi giữa chúng bằng cách sử dụng trình đơn ở dưới cùng bên phải của cửa sổ VS Code: 

![](https://images.viblo.asia/f6451391-9b57-4e3a-8315-7c03c3e65144.png)

Bạn có thể thấy dòng chữ màu cam "iPhone X (ios Emulator". Bấm vào đây bạn sẽ chuyển đổi trình giả lập. 

![](https://images.viblo.asia/0d067e50-7096-4087-b9e3-66a5353744f4.png)

Build và chạy dự án bằng cách nhấn F5 hoặc chọn **Debug> Start Debugging**. Bạn sẽ thấy mở khung Debug và nếu chạy trên iOS, bạn sẽ thấy Xcode đang được sử dụng để xây dựng dự án. 
Nếu chạy trên Android, bạn sẽ thấy Gradle đang được khởi chạy để thực hiện công việc xây dựng.

Đây là ứng dụng chạy trong trình mô phỏng iOS:

![](https://images.viblo.asia/591f464a-851c-47ce-b02b-b34363358fa2.png)

Biểu ngữ chế độ chậm mà bạn thấy chỉ ra rằng ứng dụng đang chạy ở chế độ Debug.

Bạn có thể dừng ứng dụng đang chạy bằng cách nhấp vào nút dừng ở bên phải thanh công cụ ở đầu cửa sổ VS Code:

![](https://images.viblo.asia/a3c6c203-2d89-492d-86cb-411ac0149f19.png)

Bạn có thể trở lại chế độ xem dự án bằng cách nhấp vào biểu tượng ở phía trên bên trái của VS Code hoặc chọn **View> Explorer**.


# Hot Reload

Một trong những khía cạnh tốt nhất của Flutter là có thể **hot reload** ứng dụng của bạn khi bạn thực hiện thay đổi. Điều này tương tự như Android Studio’s Instant Run.

Như ví dụ trên, Title của app đang chạy là "GHFlutter". Bây giờ không tắt ứng dụng, chúng ta thay đổi title bar bằng dòng code sau :
```flutter
appBar: new AppBar(
  title: new Text('GHFlutter 2018'),
),
```

Bây giờ click vào nút "hot reload" trên thanh toolbar 
![](https://images.viblo.asia/a3c6c203-2d89-492d-86cb-411ac0149f19.png)

Trong vòng một hoặc hai giây bạn sẽ thấy sự thay đổi được phản ánh trong ứng dụng đang chạy:

![](https://images.viblo.asia/321785ab-4c84-44e3-bdb1-b06d610bb729.png)

Vì Flutter mới chỉ đang là phiên bản beta, tính năng "hot reload" có thể không phải lúc nào cũng hoạt động, nhưng nói chung nó tiết kiệm thời gian tuyệt vời khi bạn xây dựng giao diện người dùng .

Với việc tìm hiểu về một ngôn ngữ mới, mình nghĩ hôm nay tới đây là đủ. Các bạn có thể cài đặt Flutter, setup môi trường và chạy một "Hello world" app rồi. 
Mình sẽ quay lại với bài viết tiếp theo với việc xây dựng  một ứng dụng  `Flutter`  truy vấn [API GitHub](https://developer.github.com/v3/teams/members/) cho các thành viên trong tổ chức GitHub và hiển thị thông tin của thành viên nhóm trong một danh sách có thể cuộn được. 

Happy Coding!