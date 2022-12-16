Các ứng dụng di động phổ biến hiện đại theo thời gian cần đến các công cụ nâng cao để triển khai. Đó là lý do tại sao các nhà phát triển chuyên nghiệp cố gắng đáp ứng nhu cầu thị trường thực tế trong lĩnh vực này. Những cải tiến thú vị và hữu ích nhất trở thành chủ đề thảo luận.

React Native được phát hành dưới dạng mã nguồn mở trên GitHub vào năm 2015, hợp nhất các API native của Android và iOS. Mặc dù lợi ích không thể nghi ngờ của nó, chắc hẳn bạn đã nghe nói về một ngôn ngữ thú vị, bất thường khác - Flutter, câu trả lời của Google đối với các công nghệ chuẩn. Giao diện người dùng mới này đã được khởi chạy vào năm 2017 và dự định tạo các ứng dụng gốc chất lượng cao trên các phiên bản iOS và Android trong thời gian rất ngắn.

Flutter cho phép các nhà phát triển xây dựng ứng dụng cho cả iOS và Android cùng một lúc trong khi sử dụng cùng một mã nguồn. Điều này nghe có vẻ giống như một bước nhảy vọt khổng lồ cho Flutter nhưng nó vẫn còn một chặng đường dài để bắt kịp với React Native. Hiện tại, các nhà phát triển đang bị vướng vào sự phát triển của React Native thậm chí còn không nghiêm túc xem xét Flutter. Mặc dù tác giả bài viết tin rằng Flutter có thể là tương lai của ứng dụng dành cho thiết bị di động.

### 5 điều mô tả ngắn về Flutter:

- Ngôn ngữ Dart. Dart là gì? !!! Đó là phản ứng của hầu hết các nhà phát triển.

- Các IDE được khuyến nghị với Flutter là Android Studio hoặc Intellij Idea.

- Flutter có cầu nối là Dart, kích thước ứng dụng lớn hơn, nhưng nó hoạt động nhanh hơn nhiều. Không giống như React Native với cầu nối là Javascript.

- React Native và Flutter chia sẻ các mô hình tương tự như trình xử lý sự kiện và mở rộng lớp.

- Animation và trải nghiệm cài đặt của Flutter thực sự tốt và mượt mà tương ứng.

Câu hỏi mà hầu hết mọi người đều hỏi khi họ làm quen với Flutter lần đầu tiên là "Nó giống như React Native?"

Để trả lời câu hỏi này, tác giả bài viết, Viktor Gavrilov đã sử dụng Flutter để thử nghiệm một lượt và đây là những phát hiện của anh ấy:

### Về việc thêm Packages:

Trong Flutter, mọi thứ được kết nối tự động. Tuy nhiên, trong React, một số module gốc được kết nối thủ công.

Chúng ta kết nối các package thông qua trình quản lý package "tích hợp" nhờ đó chúng ta không phải kết nối qua Xcode CocoaPods, liên kết React Native như chúng ta thường làm, kết nối các package thông qua npm với RN.

Chúng ta thêm vào pubspec.yaml. gói mà chúng ta đã tìm thấy trước đó trong https://pub.dartlang.org/flutter và thực hiện lệnh:

**“flutter packages get”**

Và thế là xong, đó là một gói map_view hoặc left_pad, mọi thứ vào đúng vị trí mà không có vấn đề!


### Ưu điểm của Flutter:

* Ngôn ngữ Dart: Dart - OOP, nó khá dài, nhưng những người quen viết bằng Java / C # sẽ vui vẻ với Dart.
* Ít phải viết các thiết lập khi tạo dự án mới theo cách thủ công, ngược lại với React Native.
* Chỉ cần tải về Flutter từ git, chạy “flutter doctor”, và nó sẽ cho bạn biết những loại vấn đề bạn có thể có trong hệ thống. Sau đó, tạo một dự án từ Android Studio hoặc bất kỳ IDE nào sau khi cài đặt Flutter Plug-in sơ bộ và bắt đầu dự án. Ngoài ra nó còn có Hot-reload giống như trong React-Native.
* Hỗ trợ tuyệt vời cho IDE (Android Studio, ý tưởng IntelliJ, VSCode)
* Trình điều hướng tích hợp sẵn. Sau khi tạo ra một ứng dụng trên Flutter, bạn có thể ngạc nhiên rằng nó có Navigator được xây dựng sẵn. Bạn có thể tạo một route mới mà không cần kết nối bất kỳ thứ gì (không giống như trong RN, nơi bạn cần kết nối bất kỳ package điều hướng gốc nào vv);
* Giải pháp quản lý dữ liệu được tạo sẵn, ví dụ trong Flutter này là "Mọi thứ đều có một Widget" cho nó. Có một StatefulWidget đặc biệt, với sự giúp đỡ của nó mà chúng ta có thể quản lý trạng thái widget và thay đổi nó một cách năng động.

### On the darkside (nhược điểm):

- Có một rào cản lớn cho những người chỉ học JS, hoặc đến từ RN. Do thực tế là Dart được sử dụng, với sự thừa kế, đa hình của nó và tất cả các thứ về OOP.

- Không có JSX mà tất cả chúng ta đã quen khi làm RN. Nhìn vào tệp Dart trong đó không có phân chia thành template, styling và làm việc với dữ liệu, nó trở nên khó chịu.

- Styling là một nỗi đau. Xem xét thực tế là không có sự tách biệt thành Styles, templates và controller, có một vấn đề khi mô tả một thành phần, chúng ta cũng cần mô tả các styles cùng một lúc.

- Animation còn khó khăn hơn. Mặc dù nó có một animation tốt, nhưng nó sẽ khó hơn khi tạo hiệu ứng động không giống như trong RN.

- Tối ưu hóa. Trong Fluter, chỉ có thừa kế widget với các điều kiện có thể thay đổi (trạng thái) và không thể thay đổi (không trạng thái). Trong khi ở React-Native chúng ta có thể quản lý vòng đời. Ngoài ra, một nhược điểm lớn là thiếu các công cụ để lưu trạng thái của ứng dụng, vấn đề này có thể, tuy nhiên, được giải quyết bằng cách tuần tự hóa trạng thái hiện tại.

Cuối cùng, Flutter sẽ có một tương lai tuyệt vời nếu họ có thể đưa ra một cách để giảm viết mã trên Dart, thay thế bất kỳ khai báo lớp chức năng nào và JSX hoặc XML như là một mô tả về cấu trúc của các widget.

Về công việc của Flutter plug-in cho android-studio, bạn chỉ cần tạo một dự án và viết, giống như trong JAVA.

Nếu so sánh cả hai nền tảng, React Native có nhiều người theo dõi hơn và nhiều ví dụ thành công về ứng dụng, trong khi đối thủ của nó chỉ đang có khả năng thú vị và dần tăng vị thế của nó.

Bạn nên nhận ra không có nền tảng cross-platform hoàn hảo và bạn cần tính đến tất cả các khả năng và hạn chế của chúng để chọn giải pháp lý tưởng của bạn.

Nguồn
https://medium.com/@openGeeksLab/flutter-vs-react-native-what-you-need-to-know-89451da3c90b