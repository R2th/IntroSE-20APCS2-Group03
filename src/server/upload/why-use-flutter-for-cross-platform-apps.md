![](https://images.viblo.asia/21058739-a8b0-4024-a6df-0ade22efce07.png)

Hình trên là biểu đồ thể hiện số lượng câu hỏi trên **Stackoverflow** của các cross-platform frameworks mobile phổ biến hiện nay (tính đến cuối 2019). Không khó để nhận ra sự nổi bật của React Native và Flutter. Bài viết hôm nay sẽ nói về Flutter một framework ra đời sau, nhưng đang dần bắt kịp và vượt qua người anh em cùng cha khác ông nội React Native.

Trước khi nói đến sự tuyệt vời của **Flutter**, chúng ta phải hiểu về 2 công nghệ cốt lõi của nó: 
- **Skia**  - thư viện đồ họa 2D của Google.
- **Dart** - ngôn ngữ lập trình cũng do Google phát triển.

### Skia

 Vài nét về skia:

-  Skia là một thư viện đồ họa 2D mã nguồn mở được viết bằng C++.
-  Tập trung vào độ chính xác, chất lượng và hiệu suất cao trong việc renderings.
-  Đa nền tảng: Windows, Mac, iOS 8 trở lên, Android 4.1 trở lên, Ubuntu 14.04
-  Đã triển khai thành công trên Chrome OS, Firefox, Android và nhiều sản phẩm khác.

Như các bạn thấy, Flutter là một cái tên mới nhưng 1 trong các công nghệ nền tảng của nó **Skia** đã rất quen thuộc, hiệu năng của nó đã được thừa nhận và được chạy trên nhiều sản phẩm doanh nghiệp như Google Chrome, Chrome OS và Firefox...

#### Why Skia is So Important in Flutter?

Cách tiếp cận của Flutter khác với hầu hết các cross-platform frameworks mobile phổ biến hiện nay. Trong khi React Native, Xamarin và Titanium cố gắng hiển thị ra các thành phần UI native (Android / iOS), thì Flutter quyết định tự hiển thị các thành phần UI. Điều đó có nghĩa là khi bạn nhìn thấy một thành phần giao diện người dùng —  như một Button chẳng hạn, thì đó không phải là Android Button hoặc iOS Button, mà đó chính là Button của Flutter được **Skia** render ra.

![](https://images.viblo.asia/6d001f3b-c6a2-4b6d-987e-e2e4205eb8a8.png)
> UI components are rendered directly in Flutter; there is no bridge with native components

Khi lần đầu biết được Flutter tự vẽ nên các UI components thì đã có rất nhiều câu hỏi phát sinh?  Là một nhà phát triển Mobile có kinh nghiệm, tôi biết có rất nhiều thành phần giao diện người dùng trên cả Android và iOS với tập hợp các hành vi, thuộc tính và API phong phú của riêng chúng, và chúng có thể tùy chỉnh. Flutter có thể cung cấp các tùy chọn tương tự không? Ngoài ra, nếu tự vẽ các thành phần Flutter UI của riêng nó, thì nó có giống nhau trên tất cả các nền tảng không? Mặc dù chọn cách tiếp cận đa nền tảng, nhưng ứng dụng iOS của tôi phải có giao diện iOS và ứng dụng Android của tôi cũng phải có giao diện Android. Điều này có khả thi không?

Trên thực tế, Flutter xử lý tất cả những điều trên rất tốt. Không có khoảng cách giữa các UI components native so với các Flutter widget. Bạn sẽ tìm thấy hầu hết mọi thứ: text, buttons, sliders, date/time picker, toggle, ImageView, v.v. Flutter thậm chí còn tốt hơn về thiết kế hiện đại, dễ sử dụng và có thể tùy chỉnh. Flutter cũng cung cấp các widget có sẵn trông giống cả iOS (Cupertino) và Android (Material). Điều này tạo ra một ứng dụng ổn định trông nhất quán trên các phiên bản iOS khác nhau. Ví dụ: ứng dụng của bạn sẽ trông giống nhau cho dù bạn cài đặt nó trên thiết bị Android L, M hoặc Q.


### Why the Dart Programming Language?

Một trong những lí do lớn Flutter được nhiều người yêu thích là do nó sử dụng ngôn ngữ lập trình Dart.

Trước khi chọn Dart, nhóm phát triển của Flutter đã kiểm tra hàng chục ngôn ngữ, bao gồm các ngôn ngữ lập trình phổ biến như JavaScript và Java. Họ đã đánh giá chúng trên các khía cạnh chính khác nhau, bao gồm năng suất của nhà phát triển, object-oriented programming, hiệu suất cao và phân bổ nhanh. Một số ngôn ngữ đáp ứng một số tiêu chí. Tuy nhiên, Dart đạt điểm cao trên tất cả các tiêu chí đánh giá và đáp ứng tất cả các yêu cầu và tiêu chuẩn của nhóm Flutter.

* Dart là một trong số ít các ngôn ngữ hỗ trợ 2 kiểu compliers Ahead-of-Time (AOT) và Just-in-Time (JIT) compilers. Trong khi Ahead-of-Time (AOT) build ra code ARM để tối ưu hiệu năng (production release), thì Just-in-Time (JIT) cho phép inject các thay đổi mà không cần phải rebuild lại app giúp cho quá trình debug và phát triển nhanh chóng hơn.

![](https://images.viblo.asia/2befbf43-a3fd-42ec-aaaf-1b5188345f7c.png)
> JIT compiler with Dart VM for faster development, and AOT compiler in production for best performance and startup time

* Dart là một ngôn ngữ được tối ưu hóa. Nó cho phép Flutter dễ dàng tạo các animations mượt mà và các transactions chạy ở tốc độ 60 khung hình / giây (60 fps). Dart sử dụng declarative UI style hoàn toàn khác so với các frameworks khác.  Điều này cho phép Flutter tạo giao diện người dùng mà không có bất kỳ layout phân tách nào như tệp XML hoặc JSX. Các thành phần giao diện người dùng sẽ được xác định trong file .dart với khả năng dễ đọc và trực quan.
* Dart quản lý bộ nhớ bằng cách sử dụng fast object allocation và garbage collector.  Flutter thường xuyên rebuild lại các thành phần giao diện người dùng (widgets) của mình (trong mỗi lần thay đổi trạng thái). Các widget được xây dựng, sau đó bị phá hủy hết lần này đến lần khác, tạo ra nhiều đối tượng tồn tại trong thời gian ngắn của vòng đời ứng dụng. Đó là nơi mà garbage collector trong Dart đóng một vai trò thiết yếu trong việc quản lý bộ nhớ.

![](https://images.viblo.asia/83a62da9-6371-476c-899a-938d0d1934c4.png)

> The generational garbage collector in Dart for effectively managing short-lived object

* Dart tương đối dễ tiếp cận đặc biệt đối với những bạn có main Java hoặc Javascript. Chúng có syntax khá quen thuộc với hầu hết các ngôn ngữ phổ biến hiện tại.

Chúng ta đã xem qua hai công nghệ chính của Flutter. Cả thư viện đồ họa Skia và ngôn ngữ lập trình Dart đều rất trưởng thành với nhiều ưu điểm đã được thị trường khẳng định. Với nền tảng vững chắc đó, Flutter cung cấp rất nhiều tính năng thú vị:

#### #Hot Reload:
Tương tự như hot reload trên React Native chúng ta không cần phải rebuild lại toàn bộ ứng dụng mỗi khi có sự thay đổi. Điều này sẽ giúp tiết kiệm rất nhiều thời gian trong vòng đời phát triển ứng dung.

#### #Rich set of widgets that work consistently with all OS versions
Như đã đề cập trước đây, Flutter cung cấp một loạt các Widget được tích hợp sẵn, bao gồm cả phong cách thiết kế Material (Android) và Cupertino (iOS), tạo điều kiện thuận lợi cho quá trình phát triển và giúp bạn viết một ứng dụng đẹp trên các nền tảng khác nhau.

#### #Native performance
Với nhiều điểm mạnh từ Dart và Skia như đã đề cập ở trên sẽ không có bất kỳ mối lo ngại nào về hiệu suất với Flutter, ít nhất là ở production. Trong debug mode, ứng dụng Flutter chạy với Dart VM và trình biên dịch JIT, do đó nó chậm hơn bình thường.

#### #Productive
Dart là một ngôn ngữ lập trình mạnh mẽ và hiệu quả. Các Widget đươc Flutter thể hiện rất biểu cảm và có khả năng mở rộng cao, Android Studio là một IDE tuyệt vời và sử dụng declarative UI với hot reload tiết kiệm rất nhiều công sức. Những điều này làm cho Flutter có năng suất cao.

#### #Top documentation
Không có gì để phàn nàn về documentation của Flutter. Mọi thứ được team phát triển thể hiện rất rõ ràng, ngắn ngọn nhưng đầy đủ.

Gần đây, cộng đồng của Flutter đã phát triển nhanh chóng, nhưng vẫn chưa lớn bằng các cộng đồng khác như React Native. Các open-source plugins của Flutter vẫn đang trong giai đoạn xây dựng, vì vậy đôi khi bạn không có nhiều lựa chọn. Tuy nhiên, chúng có rất nhiều tiềm năng, nhiều ý tưởng và nguyên tắc thông minh cùng với các công nghệ nền tảng vững chắc khiến Flutter thực sự hứa hẹn trong thế giới cross-platform.

Link tham khảo: https://www.pentalog.com/blog/flutter-game-changer-in-cross-platform-development