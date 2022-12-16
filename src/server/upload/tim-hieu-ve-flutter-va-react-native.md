Nền tảng di động đang ngày càng phát triển mạnh mẽ. Việc phát triển ứng dụng đa nền tảng đã trở thành một trong các mục tiêu chính. Khả năng chỉ cần viết một ứng dụng đã có thể chạy trên cả 2 nền tảng khác nhau là Android và IOS sẽ giúp rút ngắn thời gian phát triền sản phẩm đi rất nhiều. Do đó cũng giúp tiết kiệm rất lớn chi phí thời gian và lao động cho các công ty.

Đã có rất nhiều các công cụ phát triển đa nên tảng như vậy. Ví dụ như PhoneGap của Adobe, Xamarin của Microsoft, React Native của Facebook. Thời gian gần đây, Google cũng tham gia vào đấu trường này bằng cách giới thiệu công cụ Flutter. Mỗi công cụ có những ưu và nhược điểm riêng. Với React Native, nó đã cả chả một chặng đường dài phát triển từ năm 2015 với đội ngũ lập trình viên đông đảo và lượng tài liệu để tham khảo khổng lồ. Vì vậy để bắt kịp được với React Native thì chắc sẽ là chả chặng đường dài hơi của Flutter. Nhưng ở khía cạnh nào đó, tôi tin răng chình Flutter mới là tương lại của đa nền tảng trên di động.

## Mô tả ngắn về Flutter
Sử dụng ngôn ngữ Dart để phát triển. Thế Dart là gì? Hẳn nhiều người cũng sẽ tròn mắt như tôi khi lần đầu nghe thấy tên của nó.
Sử dụng IDE là Android Studio hoặc Intellij Idea. Cái này quá thân thuộc phải không?
Với Dart, kích thước ứng dụng tạo ra có thể lớn hơn so với React Native khi tạo từ Javascript. Nhưng hiện nay phần cứng của các thiết bị di động đã thay đổi chóng mặt thời gian gần đây. Điều tôi quan tâm là với Dart, ứng dụng tạo từ Flutter chạy nhanh hơn rất nhiều.
Cả React Native và Flutter cùng sử dụng mô hình tương tự như trình xử lý sự kiện và mở rộng lớp.
Cài đặt và xử lý các animation của Flutter tốt hơn
Và với người mới làm quen với Flutter, một câu hỏi đặt ra là "Liệu nó có giống như React Native? Họ có thể tiếp cận và sử dụng chúng thành thạo dễ dàng được hay không"

Để trả lời điều này,tác giả Viktor Gavrilov dùng Flutter để tạo những ứng dụng trải nghiệm riêng của anh ấy và đây là những điều rút ra được:

## Thêm pakage mới vào dứng dụng
Với Flutter, tất cả được kết nối tự động mà không phải băn khoăn điều gì. Ví dụ như trong trường hợp muốn thêm vào gói "pubspec.yaml" chúng ta chỉ cần thực hiện câu lệnh:

“flutter packages get”

Như vậy là đã hoàn tất mà không có sai lệch gì. Còn với React Native thì sao? Một số module của RN chúng ta buộc phải kết nối thủ công thông qua npm để có thể sử dụng. Điều này có vẻ sẽ là một điểm trừ mới RN.

## Ưu điểm của Flutter:

* Ngôn ngữ Dart: Với một lập trình viên xuất phát điểm từ Java rồi sang Android, dường như tối không gặp chút vấn đề gì lớn với với Dart cả. Cả 2 ngôn ngữ này dường như có điều gì đó tương đồng với nhau

* Ít phải viết các thiết lập khi bắt đầu dự án mới. Việc này là trái người hoàn toàn với RN.

* Để làm việc, chúng ta chỉ vần cài đặt Android Studio và Flutter Plug-in. Sau đó tải dự án từ git và chạy “flutter doctor” và fix toàn bộ các vấn đề có thể có là có thể làm việc được. Ngoài ra Flutter còn có Hot-reload giống như trong React-Native.

* Vì là con đẻ của Google nên nó hỗ trợ rất tốt cho Android studio.

* Trình điều hướng tích hợp sẵn. Khi tạo ứng dụng Flutter thì Navigator đã được xây dựng sẵn. Bạn có thể tạo một route mới ngay lập tức (còn với RN, bạn phải kết nối với một package điều hướng gốc nào đó...)

* Với Flutter, "mọi thứ đều có một Widget". Có một StatefulWidget đặc biệt trợ giúp chúng ta quản lý widget và thay đổi nó.

## Thế còn nhược điểm

* Vì Dar thừa hưởng mọi thứ ở OOP như kế thừa, đa hình..nên mã code khá là nhiều và sẽ là một trở ngại nếu chuyển từ RN hay js sang.

* Tệp Dart trong đó không có phân chia rõ ràng, không theo chuẩn nào đó và nó sẽ trở nên khá khó chịu.

* Styling đúng là một nhươc điểm khi nó không phân biệt rõ Styles, templates và controllers.

* Dù animation được đánh giá tốt hơn nhưng khá khó để tạo ra chúng với những người chưa quen sử dụng.

* Fluter chỉ có thừa kế widget với các điều kiện có thể thay đổi và không thể thay đổi. CÒn với RN, chúng ta có thể quản lý vòng đời của chúng. Nên rõ ràng là RN làm công việc tối ưu hóa tốt hơn so với Flutter. Còn một vấn đề nữa là chưa có công cụ tốt để lưu trạng thái của ứng dụng. Hiện tại nó mới chỉ được giải quyết bằng việc chuẩn tuần tự các trạng thái từ trạng thái hiện tại.

Vì vậy, nếu cải thiện được số lượng mã code phải viết trên Dart và phần chia các lớp chức năng rõ ràng và có thể mô tả cấu trúc các widget như java/kotlin xây dựn giao diện trên xml thì Flutter đúng là sẽ có một tương lai tuyệt vời.

Nếu đem so sánh thì React Native có đội ngũ lập trình viên theo đuổi đông đảo hơn hẳn và cũng đã có rất nhiều ứng dụng xây dựng thành công trên nó. Tuy nhiên Flutter cũng có lợi thế nhất định và đang dần được mọi người tiếp nhận nhiều hơn.

Cuối cùng, tùy vào yêu cầu của dự án như thế nào mà bạn sẽ cần phải tính hết các khả năng và hạn chế của từng nên tảng mà lựa chọn một trong số chúng phù hợp.

Linh bài viết gốc: https://medium.com/@openGeeksLab/flutter-vs-react-native-what-you-need-to-know-89451da3c90b