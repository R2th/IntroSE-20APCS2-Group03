![](https://images.viblo.asia/15626603-2a51-4d19-a848-a835323273c9.jpg)
Các bạn có biết, lập trình cross platform đang ngày càng trở nên phổ biến. Đặc biệt, với sự xuất hiện của React Native (RN) vào năm 2015 đã mở ra xu hướng xây dựng ứng dụng đa nền tảng chỉ bằng một lần code. Các công ty lớn như UberEats, Discord và Facebook đã chuyển sang React Native – như một phần tất yếu của sự dịch chuyển công nghệ.

Google cũng không chịu thua. Họ đã nhận thấy độ phủ sóng của React Native. Sau 2 năm nghe ngóng, Google cho ra mắt phiên bản alpha của Flutter. Giao diện người dùng mới này đã được khởi chạy vào năm 2017 và dự định tạo các ứng dụng gốc chất lượng cao trên các phiên bản iOS và Android trong thời gian rất ngắn. Vậy Flutter là gì mà hot vậy, mình cùng tìm hiểu nhé! :) 

# 1. Fluter là gì?
![](https://images.viblo.asia/89570599-b586-4d0a-a65b-83b754e9f61e.png)

Flutter được Google giới thiệu là một người mới trong thế giới ứng dụng di động. Là một SDK mới của Google dành cho các thiết bị di động giúp developers và designers xây dựng nhanh chóng ứng dụng dành cho các thiết bị di động (Android, iOS). Flutter là dự án mã nguồn mở đang trong giai đoạn thử nghiệm.
Flutter bao gồm Reactive framework và công nghệ hiển thị 2D (2D rendering engine)và các công cụ phát trển(development tool). Các thành phần này làm việc cùng nhau giúp ta thiết kế, xây dựng, test, debug ứng dụng. Không có gì ngạc nhiên khi Flutter giúp các nhà phát triển tạo ra các ứng dụng native đẹp mắt và giúp họ phát triển các ứng dụng đa nền tảng một cách dễ dàng.

5 điều mô tả ngắn về Flutter:

 * Ngôn ngữ Dart. Dart là gì? Đó là phản ứng của hầu hết các nhà phát triển. Dart là ngôn ngữ thuần OOP, nó được sử dụng để xây dựng các ứng dụng web, server, máy tính để bàn và thiết bị di động.

 * Các IDE được khuyến nghị với Flutter là Android Studio hoặc Intellij Idea.

 * Flutter có cầu nối là Dart, kích thước ứng dụng lớn hơn, nhưng nó hoạt động nhanh hơn nhiều. Không giống như React Native với cầu nối là Javascript. 

 * React Native và Flutter chia sẻ các mô hình tương tự như trình xử lý sự kiện và mở rộng lớp.

 * Animation và trải nghiệm cài đặt của Flutter thực sự tốt và mượt mà tương ứng.

# 2. Ưu - nhược điểm của Fluter
 Ưu điểm: 
  - Ngôn ngữ Dart: Dart - OOP, nó khá dài, nhưng những người quen viết bằng Java / C # sẽ hài lòng với Dart.
 - Ít phải viết các config khi tạo project mới theo cách thủ công, ngược lại với React Native.
 - Chỉ cần tải về Flutter từ git, chạy “flutter doctor”, và nó sẽ cho bạn biết những loại vấn đề bạn có thể có trong hệ thống. Sau đó, tạo một project từ Android Studio hoặc bất kỳ IDE nào sau khi cài đặt Flutter Plug-in sơ bộ và start project. Ngoài ra nó còn có Hot-reload giống như trong React-Native.
 - Hỗ trợ tuyệt vời cho IDE (Android Studio, IDE IntelliJ, VSCode)
 - Trình điều hướng tích hợp sẵn. Sau khi tạo ra một ứng dụng trên Flutter, bạn có thể thấy nó có Navigator được xây dựng sẵn. Bạn có thể tạo một route mới mà không cần kết nối bất kỳ thứ gì (không giống như trong RN, nơi bạn cần kết nối bất kỳ package điều hướng gốc nào vv);
 - Giải pháp quản lý dữ liệu được tạo sẵn, ví dụ trong Flutter này là "Mọi thứ đều có một Widget" cho nó. Có một StatefulWidget đặc biệt, với sự giúp đỡ của nó mà chúng ta có thể quản lý trạng thái widget và thay đổi nó một cách năng động.
 
 Nhược điểm: 
  - Có một rào cản lớn cho những người chỉ học JS, hoặc đến từ RN. Do thực tế là Dart được sử dụng với sự thừa kế, đa hình của nó và tất cả các thứ về OOP.

 - Không có JSX mà tất cả chúng ta đã quen khi làm RN. Nhìn vào tệp Dart trong đó không có phân chia thành template, styling và data, nó trở nên khó chịu.

 - Styling là một nhược điểm. Thực tế là không có sự tách biệt thành Styles, templates và controller, có một vấn đề khi mô tả một thành phần thì chúng ta cũng cần mô tả các styles cùng một lúc.

 - Animation còn khó khăn hơn. Mặc dù nó có một animation tốt, nhưng nó sẽ khó hơn khi tạo hiệu ứng động, không giống như trong RN.

 - Tối ưu hóa. Trong Fluter, chỉ có thừa kế widget với các điều kiện có thể thay đổi (trạng thái) và không thể thay đổi (không trạng thái). Trong khi ở React-Native chúng ta có thể quản lý vòng đời. Ngoài ra, một nhược điểm lớn là thiếu các công cụ để lưu trạng thái của ứng dụng, vấn đề này có thể, tuy nhiên, được giải quyết bằng cách tuần tự hóa trạng thái hiện tại.
 
 Làm một bảng so sánh nhỏ giữa Flutter và React Native nhé: 
 
 ![](https://images.viblo.asia/a5db03c5-4c55-4f43-86da-6be4117a9e3d.png)
 
|  | Flutter | React Native |
| -------- | -------- | -------- |
| Khả năng dùng lại code     | Flutter cho phép overwriting code. Nếu bạn có kế hoạch cho việc sử dụng lại code thì Flutter là tùy chọn tốt nhất để có thể tối ưu được việc lựa sử dụng lại code.     | React Native cho phép bạn sử dụng lại code, nhưng điều này lại bị giới hạn trong một vài components cơ bản. Để có thể định nghĩa các style cho nền tảng React Native sẽ mất khá nhiều thời gian.     |
| Các thư viện Third Party     | Có nhiều các third-party packages đang được sử dụng và đang ngày càng được phát triển, và chúng thực sự rất hữu dụng.     | Từ khi React Native trở lên phổ biến, đã có rất nhiều các third-party packages được phát triển và được sử dụng rất nhiều trong ứng dụng, chúng có thể được thêm bớt một cách linh động trong ứng dụng của bạn.     |
| Độ phổ biến     | Với khoảng 30k Github stars, Flutter đã trở thành trends trong việc phát triển. Như Google đã giới thiệu về framework này. Nó chắc chắn muốn trở thành một nền tảng phổ biến trong sự lựa chọn của các developer.     | Với 65k Github stars, React Native có lượng developer sử dụng đang nhiều hơn bởi vì lượng developer sử dụng JavaScript rất dễ dàng để sử dụng với các thư viện của React.     |
| Cộng đồng phát triển     | Từ khi Flutter mới được giới thiệu, đã có một lượng lớn các bài viết hướng dẫn được đưa lên online, trong đó có rất nhiều các tài nguyên hữu ích để có thể bắt đầu viết ứng dụng đầu tiên trên mobile app.     | React Native đã được phổ biến từ lâu, vì thế cho nên nó cũng có rất nhiều các cộng đồng để hỗ trợ online. Những kỹ năng của các lập trình viên có kinh nghiệm trong JavaScript chắc chắn sẽ đưa ra giải pháp cho bất kỳ vấn đề nào trong quá trình phát triển của bạn.     |

# 3. Build app demo
Ở đây mình dùng Android Studio, chọn project Flutter: 

![](https://images.viblo.asia/292913f2-cfe7-4185-96b9-7e139a4aaf08.png)

Chọn Flutter Application: 

![](https://images.viblo.asia/93e7e9bc-c99f-4d98-aae1-c706f43b032d.png)

Đặt tên cho Project: 

![](https://images.viblo.asia/40a6210c-3dd4-4424-8add-aaf6b3e0e739.png)

Sau bước này, Flutter SDK sẽ khởi tạo cấu trúc thư mục cho ứng dụng. Tất cả các hành động đi vào thư mục lib và main.dart là điểm bắt đầu trong quá trình thực thi ứng dụng: 

![](https://images.viblo.asia/6d9ba747-62ba-4f41-98fc-7ff60b939c52.png)

Trong Flutter, tất cả mọi thứ đều là một widget. Images, icons, texts trong một ứng dụng Flutter đều là những widget.

Điểm hay là, Flutter SDK tạo ra một widget tương tác ở root của ứng dụng. Để đơn giản thì mình sẽ bắt đầu với một ứng dụng "Hello World!" cổ điển: :D

Code trong file main.dart như sau: 

```java
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}
```

Giờ thì mở máy ảo lên, run và xem kết quả thôi nào:

![](https://images.viblo.asia/f666bd2c-38be-457d-a77c-aff51be054e6.png)

Để tìm hiểu sâu hơn về Flutter và Dart thì mời các bạn cùng đón xem phần sau nhé! :) Xin chào và hẹn gặp lại. 
# 4. Tài liệu tham khảo
https://hackernoon.com/react-native-vs-flutter-which-is-preferred-for-you-bba108f808

https://medium.com/@openGeeksLab/flutter-vs-react-native-what-you-need-to-know-89451da3c90b

https://medium.com/aviabird/flutter-tutorial-how-to-build-an-app-from-scratch-b88d4e0e10d7