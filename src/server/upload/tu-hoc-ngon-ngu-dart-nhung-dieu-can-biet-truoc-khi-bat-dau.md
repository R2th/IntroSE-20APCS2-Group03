![image.png](https://images.viblo.asia/44d01939-7931-4614-b5db-aa90b7272fd4.png)

Nếu bạn đang có ý định học Flutter nhưng lại gặp rào cản với ngôn ngữ Dart. Thì trong series này, từng bước một chúng ta sẽ cùng nhau chinh phục nó. Từ cấp độ cơ bản nhất của người mới bắt đầu, chúng ta sẽ từ từ đi qua tất cả những kiến thức mà bạn cần phải biết để viết được một chương trình cơ bản.

Trong series sẽ có thể đề cập đến một vài khái niệm trong các ngôn ngữ khác. Dù bạn đã biết hay chưa biết về các khái niệm đó thì cũng đừng lo nhé. Các bài viết sẽ cố gắng đơn giản nhất để cho các bạn chưa biết gì cũng có thể nắm bắt được.

Bạn có thể xem thêm bài viết tại đây: [series tự học ngôn ngữ Dart](https://200lab.io/blog/tu-hoc-ngon-dart-nhung-dieu-can-biet-truoc-khi-bat-dau/)

## 1. Ngôn ngữ Dart: Lịch sử hình thành

![image.png](https://images.viblo.asia/fda57765-52c4-4d72-a1ba-4eaa44e95df4.png)

Dart 1.0 được phát hành bởi google vào ngày 14 tháng 11 năm 2013 và được viết bởi Lars Bak và Kasper Lund. Ngôn ngữ này hướng đến việc giúp cho các developer xây dựng được các ứng dụng điện thoại và các web hiện đại. Nó có thể viết được cho phía client, server và hiện tại là mobile với Flutter.

Ngôn ngữ Dart đi kèm với một loạt các công cụ như là máy ảo, các thư viện cốt lõi và repository quản lý package,... dư sức để bạn có thể bắt đầu cho dự án tiếp theo của mình.

## 2. Ngôn ngữ Dart là ngôn ngữ hướng đối tượng (OOP)

![image.png](https://images.viblo.asia/27ba684b-8850-4ad3-9895-7edff229042b.png)

Smalltalk được phát hành vào năm 1970 và là một trong những ngôn ngữ lập trình hướng đối tượng nguyên bản đầu tiên. Ngày nay ngôn ngữ hướng đối tượng đã trở nên phổ biến và dường như thống trị trong thế giới ngôn ngữ lập trình.

Ý tưởng đằng sau khái niệm lập trình hướng đối tượng rất đơn giản: các chương trình yêu cầu một dạng cấu trúc cụ thể.

Cách rõ ràng nhất để đạt được cấu trúc cụ thể này là sử dụng khái niệm containers. Một ngôn ngữ lập trình có thể được chia thành dữ liệu và những phương thức thực hiện các dữ liệu đó. Dữ liệu cụ thể và những phương thức sẽ được gói trong một số loại container.

Hơn nữa, những container này được tạo ra để trở nên dễ sử dụng. Vì thế chúng không chỉ chứa dữ liệu và phương thức mà chúng cũng chính là những giá trị được chứa vào những container khác và được chuyển dưới dạng tham số cho các hoạt động khác. Trong lập trình hướng đối tượng, những container này được biết như là những đối tượng.

Alan Kay, người phát minh ra Smalltalk, nhận xét rằng theo cách này, đối tượng đơn giản nhất có nguyên tắc cấu tạo giống như một máy tính hoàn chỉnh: nó kết hợp dữ liệu với các phương thức dưới một giao diện được chính thức hóa.

Và bây giờ, mặc dù lập trình hướng đối tượng có thể được tìm thấy trong vô số ngôn ngữ, nhưng có rất ít ngôn ngữ thực sự tuân theo các nguyên tắc do Smalltalk đặt ra.

Dart là một ngôn ngữ lập trình hướng đối tượng thuần túy với mọi giá trị là một đối tượng.

## 3. Ngôn ngữ Dart: dưới góc nhìn của JavaScript

![image.png](https://images.viblo.asia/8ca7f6ba-7d5d-453f-95b6-3cdd9d1b9515.png)

Dart là một ngôn ngữ hướng đối tượng đơn giản, clean và dựa trên class. Nó còn có nhiều cấu trúc hơn cả JavaScript - một ngôn ngữ mà nó chịu ảnh hưởng thiết kế khá là nhiều.

Đó là một điều tốt cho các developer những ai yêu thích việc có cấu trúc trong ngôn ngữ lập trình của mình. Các dev có thể dễ dàng tái cấu trúc và xây dựng những ứng dụng web lớn hơn.

Theo như những nhà sáng lập, một trong những thứ họ tập trung vào khi tạo ra ngôn ngữ này đó chính là tính tương thích của nó với web. Vì vậy, một trong những component quan trọng nhất của Dart đó chính là trình biên dịch Dart sang JavaScript. Nó sẽ dịch source code của Dart sang Javascript và đảm bảo rằng bạn sẽ nhận đúng ngữ nghĩa giống như khi bạn chạy nó trên máy ảo của javascript.

## 4. Từ ngôn ngữ Dart đến Framework Flutter

![image.png](https://images.viblo.asia/b11d7591-4a92-47db-9106-99e4d6a874db.png)

Flutter đã thu hút được sự chú ý của cộng đồng các nhà phát triển bằng cách giới thiệu các style cho phép việc xây dựng UI đẹp hơn và biểu cảm hơn vì thế mà việc code cũng trở nên thú vị hơn nhiều. Nó kết hợp một số khái niệm quen thuộc với những kinh nghiệm phát triển hiện đại như lập trình reactive và widget composition trong khi sử dụng nền tảng Dart làm cơ sở chính cho các hoạt động đó.

Nhóm Flutter đã đánh giá nhiều ngôn ngữ khác nhau và cuối cùng họ chọn Dart vì nó phù hợp với cách mà họ xây dựng giao diện người dùng. Dưới đây là những lý do tại sao mà ngôn ngữ Dart lại được Flutter lựa chọn để sử dụng:

### 4.1 Tối ưu cho giao diện người dùng:

Hoạt động bất đồng bộ cho phép chương trình của bạn có thể hoàn thành hoàn toàn công việc trong khi chờ hoạt động khác kết thúc. Đây là một số hoạt động bất đồng bộ phổ biến:

* Tìm nạp dữ liệu thông qua mạng
* Viết cơ sở dữa liệu
* Đọc dữ liệu từ file

Hầu hết các máy tính, thậm chí các nền tảng mobile, đều có CPU đa nhân. Để tận dụng hết tất cả các nhân đó, các dev thông thường phải sử dụng các luồng bộ nhớ chia sẻ đồng thời. Các concurrency ở trạng thái chia sẻ có thể dễ bị lỗi và có thể dễ dẫn đến những code khá phức tạp. Thay vì sử dụng luồng, tất cả các code của ngôn ngữ Dart chạy bên trong các isolate. Mỗi isolate có vùng bộ nhớ riêng, đảm bảo rằng không có bất kỳ trạng thái của isolate này có thể truy cập được vào isolate kia.

Ngôn ngữ lập trình này cũng tối ưu cho việc xây dựng giao diện người dùng với những tính năng cho phép mở rộng các collection và tùy chỉnh UI cho từng nền tảng khác nhau.

### 4.2 Việc phát triển năng suất hơn

Flutter có tính năng hot reload giúp bạn thử nghiệm, xây dựng UI, thêm tính năng và fix bug một cách nhanh chóng và dễ dàng hơn. Tính năng hot reload hoạt động bằng cách đưa những file source code đã được update vào máy ảo Virtual Machine (VM) của Dart. Sau khi VM cập nhập các class với phiên bản mới nhất của field và function, framework Flutter sẽ tự động tái xây dựng cây widget, cho phép bạn xem các hiệu ứng mà bạn đã thay đổi một cách nhanh chóng hơn.

Flutter cung cấp phân tích static cho phép bạn phát hiện ra những vấn đề ngay trước khi dòng code đó được thực thi. Nó thực sự là một công cụ mạnh mẽ có thể giúp các dev tránh việc phát sinh bug và đảm bảo được code tuân theo các quy tắc của style.

### 4.3 Hiệu năng nhanh trên tất cả nền tảng

Ngôn ngữ Dart có trình biên dịch AOT (Ahead of Time) giúp nó biên dịch nhanh, đúng và native code. Điều này không chỉ đảm bảo giúp Flutter nhanh hơn mà còn đảm bảo rằng hầu như mọi thứ (bao gồm tất cả các widget) đều có thể được tùy chỉnh. Với lý do đó cho nên hầu hết các phần của Flutter đều được viết bằng ngôn ngữ này.

Trên đây là một số giới thiệu về ngôn ngữ Dart, hãy cùng bắt đầu tìm hiểu sâu hơn về ngôn ngữ này trong các bài tiếp theo nhé!