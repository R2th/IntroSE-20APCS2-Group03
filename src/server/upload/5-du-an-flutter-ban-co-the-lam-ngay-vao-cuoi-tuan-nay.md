![image.png](https://images.viblo.asia/dae0d1ae-93f9-4da1-b121-88b284aef5c1.png)

Cuối tuần, khoảng thời gian để gia đình và bạn bè cùng nhau tham gia một số hoạt động xã hội, chia sẻ những món ăn và cùng vui chơi với nhau. Nếu đó là những gì bạn đã từng làm vào những buổi cuối tuần, thì cuối tuần này, bạn có thể thực hiện một dự án Flutter đơn giản để bắt đầu với framework hoặc làm điều gì mới mẻ với nó.

Vậy chúng ta nên làm gì? Hãy cùng nhau tìm hiểu nào.

> Bạn có thể xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/5-du-an-flutter-co-the-lam-vao-cuoi-tuan/)

## 1. Counter App project

Đầu tư thời gian: 30 giây (hoặc mất bao lâu để chạy `flutter create timer`)

![image.png](https://images.viblo.asia/7b710643-9ba2-45f9-bdfc-ce8efecb50a6.png)

Nếu bạn đã từng sử dụng Flutter, điều này sẽ quen thuộc với bạn. Đó là màn hình bạn nhận được khi tạo bất kỳ dự án Flutter nào từ CLI. Tuy nhiên, đó là một bước khởi đầu có giá trị và ấn tượng, bản demo của Flutter thực sự làm được điều gì đó (không giống như các framework khác chỉ hiện “Hello World!” ). Ứng dụng khởi động này giới thiệu cho bạn các khái niệm Flutter cơ bản, như Scaffold, StatefulWidget và khái niệm State trong ứng dụng Flutter. Nếu bạn đã thiết lập Flutter SDK, bạn sẽ có thể chạy ứng dụng demo này trên điện thoại của mình.

Khi bạn chạy ứng dụng này, hãy đảm bảo thay đổi một số văn bản, nhấn “Save” và xem Flutter hot-reload ứng dụng của bạn. Tính năng này sẽ giúp bạn tiết kiệm hàng chục tiếng nếu bạn quyết định sử dụng Flutter cho các dự án trong tương lai của mình.

Nếu bạn muốn làm cho nó khó hơn một chút, có lẽ bạn có thể tìm cách lưu lại giá trị cuối cùng mà bạn đã thực hiện để lần sau khi start lại app, nó sẽ hiện lại chính số đó thay vì phải bắt đầu lại từ 0, bằng cách sử dụng thư viện  [shared_preferences](https://pub.dev/packages/shared_preferences).

## 2. Simple Stopwatch/Lap Timer project

Đầu tư thời gian: một ngày.

Một phần khiến Flutter có trải nghiệm tuyệt vời như vậy là do các widget phong phú giúp bạn tạo ra ứng dụng theo mong muốn của mình một cách dễ dàng hơn. Và nhóm Flutter đã làm rất tốt việc giải thích chúng. Họ thậm chí còn tạo video [giải thích ngắn](https://www.youtube.com/watch?v=b_sQ9bMltGU&list=RDCMUCwXdFgeE9KYzlDdR7TG9cMw&start_radio=1&t=1s) về cách hoạt động của các widget này.

Điều tuyệt vời là bạn có thể tạo ra ứng dụng ấn tượng về mặt hình ảnh mà không cần phải tốn nhiều công sức. Ví dụ: nếu bạn bắt đầu với một framework như Flutter, bạn có thể bị cám dỗ để tạo ra một chiếc đồng hồ bấm giờ như một dự án đơn giản. Ý tưởng rất đơn giản - chỉ là cách người dùng bắt đầu và dừng timer. Bạn sẽ thấy phút và giây hiển thị trên màn hình rất đẹp và tôi tin là bạn sẽ hài lòng với điều đó.

Bởi vì Flutter có rất nhiều widget hấp dẫn về mặt hình ảnh, chúng ta có thể đạt được nhiều kết quả mà ta mong muốn. Ví dụ, Flutter cung cấp một [CircularProgressIndicator](https://api.flutter.dev/flutter/material/CircularProgressIndicator-class.html). Widget này cho phép chúng ta hiển thị tiến trình hoạt động trong một vòng tròn. Một widget khác, được gọi là [Stack](https://api.flutter.dev/flutter/widgets/Stack-class.html), cho phép chúng ta xếp chồng các widget lên nhau. Vì vậy, bằng cách sử dụng hai widget này, chúng ta có thể hiển thị tiến trình của đồng hồ bấm giờ và cũng thêm một số nét tinh tế bằng cách hiển thị chúng ta đi được bao xa qua từng phút với `CircularProgressIndicator` ở bên ngoài. Như thế này:

![](https://images.viblo.asia/ad7f9e24-87af-4f46-b374-457393995164.gif)

API của Flutter khiến cho công việc này trở nên đơn giản. Chúng ta đếm số giây đã trôi qua kể từ lúc người dùng nhấn nút “Go” và sau đó sử dụng hàm `.remainder` trên tổng số giây để tính ra còn lại bao nhiêu giây. Ví dụ: nếu 80 giây trôi qua, sẽ viết là `80.remainder (60)`, cho chúng ta 20 giây. Sau đó, nếu chúng ta chia 20 cho 60, chúng ta có thể tính ra rằng 20 giây bằng khoảng 33% cho đến một phút và sử dụng nó làm giá trị của `CircularProgressIndicator`. Điều đó đơn giản đúng không nào?

Tôi cũng đã chuẩn bị một ví dụ về [ứng dụng đồng hồ bấm giờ ](https://dartpad.dev/?null_safety=true&id=9c7d3da3ab831c7b90e43e7a04eed33f)để bạn hiểu ý của tôi.

Trong ví dụ, toàn bộ ứng dụng vừa với 130 dòng. Vì vậy, bạn có thể copy-paste vào Android Studio hoặc VS Code. Dưới đây là một số điều cần chú ý:

1. Không có gì xảy ra nếu không có `setState`. Bất cứ khi nào chúng ta làm điều gì  để thay đổi giao diện người dùng, chúng ta phải sử dụng hàm `setState`. Vì vậy, khi chúng ta nhấn bắt đầu hoặc dừng timer và muốn UI thay đổi gì thì gọi `setState`.

2. Mặc dù chúng ta đang viết một ứng dụng đơn giản nhưng những thứ như `Scaffold` cung cấp cho chúng ta một App Bar bắt mắt với shadow. Nó cũng cho phép chúng ta thêm một Floating Action Button rất đẹp mắt ở phía dưới góc phải màn hình.

Nếu bạn muốn kiếm thêm thử thách. Vậy bạn có thể thêm lap timer không? Để làm như vậy, bạn sẽ phải sử dụng danh sách các khoảng thời gian (còn gọi là `<Duration>[]`) để lưu trữ thời gian vòng chạy trước đó và sau đó hiển thị chúng trong một `Column` bên dưới timer chính. Khi chúng ta cập nhật danh sách khoảng thời gian đó, chúng ta chỉ cần gọi hàm setState để giao diện người dùng được cập nhật.

## 3. Simple To-Do List project

Đầu tư thời gian: một ngày

![](https://images.viblo.asia/d48997b6-f133-4f49-a267-6440f3d1a69b.png)

Cách tốt nhất để sắp xếp các việc cần làm một cách có tổ chức là sử dụng to-do list. Vậy bạn có thể xây dựng to-do list trong Flutter như thế nào?

Chúng ta vẫn sử dụng `Scaffold` để xử lý giao diện gốc của ứng dụng và sau đó, chúng ta sẽ sử dụng `ListView` để hiển thị danh sách các công việc. `ListView` nhận một tham số là "children" chấp nhận một danh sách các widget. Đây là nơi chúng ta ánh xạ các class dữ liệu của mình với các widget thực tế, [giống như vậy](https://gist.github.com/lewcianci/f87bd3aa86d5ba14fe4321d5f1fa5425#file-main-dart-L57-L69). Hơn thế nữa, `ListView` sẽ tự động cung cấp chức năng scrolling nếu số lượng children tuyệt đối cao hơn theo chiều dọc so với khung nhìn của thiết bị.

Chúng ta cũng sử dụng hàm `showDialog` để hiển thị dialog “new task” và xử lý giá trị trả về của hộp thoại đó để thêm task mới vào danh sách. Để làm điều này, chúng ta sử dụng `AlertDialog` đi kèm với Flutter cùng với một background shadow  rất đẹp được thêm sẵn trong Flutter. [Có 126 dòng](https://dartpad.dev/?null_safety=true&id=f87bd3aa86d5ba14fe4321d5f1fa5425), bạn dễ dàng sao chép code vào editor và chạy thử.

## 4. Making Better Choices

Nếu bạn đã đi đến đây, đã sao chép các mẫu code vào editor và đã làm một số thao tác, hy vọng bạn sẽ đi đến các kết luận sau:

* Không thực sự khó để tạo ra thứ gì đó đẹp và dễ sử dụng với Flutter. Đổ bóng (shadow) đơn giản, hiệu ứng gợn sóng (ripple effects) và công cụ Material làm cho ứng dụng của bạn trông chất lượng hơn.
* Hot-reload khiến bạn cảm thấy vui vẻ hơn khi code với Flutter.
* The business logic (ứng dụng của bạn hoạt động như thế nào) được đan xen với giao diện người dùng. Điều này khiến cho việc kiểm tra không thể hoặc rất khó khăn.

Chúng ta nên sắp xếp điểm thứ ba đó. Đúng là như vậy: Chúng ta có thể thiết kế và xây dựng toàn bộ ứng dụng (thậm chí là một ứng dụng phức tạp) bằng `setState` và tự quản lý state ứng dụng của mình, nhưng sớm muộn nó cũng sẽ trở thành một mớ hỗn độn. Là những lập trình viên giỏi, chúng ta nên cố gắng viết code mà có thể kiểm tra được, điều đó có nghĩa là chúng ta muốn tách logic UI khỏi logic kinh doanh. Ngoài ra, chúng ta muốn đảm bảo rằng dependencies của ứng dụng có thể mock data được trong quá trình testing.

Đó là lý do tại sao chúng ta nên xem xét việc sử dụng state management như bloc pattern.

![image.png](https://images.viblo.asia/8987875c-b426-4778-9d49-3b03ee337603.png)

Thành thật mà nói, bạn có thể sẽ không học nỗi cách các hoạt động của bloc pattern vào cuối tuần. Và điều đó cũng không sao - thành Rome không được xây dựng trong một ngày. Học cách quản lý state bằng cách sử dụng một cái gì đó như bloc rất phức tạp, nhưng điều đó cần thiết để tạo ra các ứng dụng Flutter đáng tin cậy.

Nếu bạn giống tôi, bạn có thể chùn bước trước đề xuất này. Tại sao bạn lại học thêm thứ gì đó như bloc khi bạn có thể vẽ bất cứ thứ gì bạn muốn lên màn hình với Flutter? Tại sao bạn phải đầu tư vào nó? Giống như tôi, một lập trình viên full-stack đang làm việc trên web cùng với các API backend, xác thực (authentication) và một đống thứ khác cần ghi nhớ, việc đẩy nhiều thông tin hơn vào đầu có vẻ không hấp dẫn. Và bạn xem bài viết này với lời hứa hẹn về những điều có thể làm vào cuối tuần… Vì thế tôi sẽ chuyển task này đến cuối tuần tới?

Đó là một cách hợp lý nhưng hãy để tôi cung cấp cho bạn ba lý do chính xác tại sao bạn nên sử dụng bloc trong các ứng dụng Flutter của mình.

### 4.1 Hạn chế việc gọi setState

Thông thường, bạn kiểm soát các  cập nhật giao diện người dùng của mình thông qua `setState`. Điều này không có gì sai nhưng mỗi khi bạn gọi hàm, bạn đang yêu cầu Flutter vẽ lại Widget đó trên màn hình.

Bloc giới thiệu cho chúng ta khái niệm equality trong các trang (hoặc views). Lớp trực quan của một widget nhất định được biểu thị bằng state và khi state của widget thay đổi, thư viện bloc sẽ yêu cầu Flutter vẽ lại widget đó. Nếu state không thay đổi, nó sẽ không vẽ lại Widget đó. Điều này chuyển đổi suy nghĩ từ “vẽ lại khi nhấn nút này” thành “vẽ lại khi thông tin trên màn hình đã thay đổi”.

Khi người dùng nhấn vào một nút (button) bất kỳ trên màn hình, một sự kiện mới sẽ được gửi vào bloc. Bạn có thể thực hiện bất kỳ business logic của mình trong bloc và sau đó bạn cập nhật lại cho Widget một state mới. Về cơ bản, bloc sẽ so sánh state mới với state cũ và nếu có thay đổi, bloc sẽ cập nhật giao diện người dùng.

### 4.2 Testing trở thành một niềm vui

Nếu bạn muốn tạo ứng dụng triệu đô tiếp theo cho điện thoại, thì cuối cùng, bạn cần viết thử nghiệm cho ứng dụng của mình. Và khi ngày đó đến, nếu bạn sử dụng `setState` trong ứng dụng của mình, bạn có thể bị hạn chế sử dụng các bài kiểm tra tích hợp đầy đủ để kiểm tra ứng dụng có hoạt động chính xác hay không. Điều đó có nghĩa là cài đặt ứng dụng vào trình giả lập hoặc thiết bị, cho test driver biết những nút nào cần nhấn và sau đó kiểm tra xem ảnh chụp màn hình được chụp trên thiết bị có khớp với những gì bạn có trong tệp không.

Với bloc, bạn có thể kiểm tra hoạt động hợp lý của các bloc mà không cần thiết lập và chạy giao diện người dùng. Bởi vì bạn đang gửi các sự kiện vào một bloc và bạn biết state mong đợi, nó trở nên đơn giản như các trường hợp thử nghiệm gửi các sự kiện vào các bloc của bạn và mong đợi một kết quả nhất định.

### 4.3 Cộng đồng Flutter rất tuyệt vời

Có một kênh Discord dành cho tất cả những thứ liên quan đến bloc và thậm chí Felix (người ban đầu tạo ra pattern`flutter_bloc`) cũng có ở đó. Trải nghiệm có thể khác nhau trong các cài đặt này. Rốt cuộc, mọi người cũng ủng hộ những thư viện miễn phí này trong thời gian rảnh rỗi của họ. Nhưng tôi đã vô cùng ấn tượng bởi sự hỗ trợ. Vì trước kia, tôi đã gặp sự cố với bài test trong ứng dụng của mình. Tôi đã hỏi điều đó trong kênh và Felix đã khắc phục vấn đề trong code của tôi và gửi [pull request](https://github.com/flutterfromscratch/sonder/pull/1).

Sự hấp dẫn của điều đó là vô cùng lớn. Anh chàng này không chỉ dành vô số thời gian để phát triển `flutter_bloc` mà còn giúp một số lập trình viên ngẫu nhiên (như tôi) khắc phục sự cố miễn phí. Thật không thể tin được.

## 5. Sample Projects Using flutter_bloc

Thời gian đầu tư: 3-4 ngày cuối tuần

Một vài sample projects có sẵn trên trang web của bloc có thể giúp bạn hiểu về bloc pattern trong vài ngày cuối tuần tới.

[ubiquitous counter app](https://bloclibrary.dev/#/fluttercountertutorial) mà bạn có được với `flutter create` đã được tạo ra với bloc pattern, với sự bổ sung thú vị là có nút “subtract”. Các hướng dẫn này chuyên sâu hơn một chút (nghĩa là bạn không thể chỉ sao chép và dán code vào editor của mình), nhưng có một lý do chính đáng cho việc này. Họ giải thích cho bạn những gì đang xảy ra và dạy bạn làm việc với bloc pattern, điều này thật tuyệt.

Ngoài ra còn có một [ứng dụng về thời tiết](https://bloclibrary.dev/#/flutterweathertutorial) được viết theo bloc pattern cũng cho biết cách tạo giao diện người dùng hấp dẫn cho ứng dụng Flutter của bạn, cũng như chức năng như kéo để làm mới và sử dụng form đơn giản. Nên làm theo hướng dẫn này, vì nó giải thích cho bạn cách sử dụng một số chức năng nâng cao hơn của bloc package.

## 6. Enjoy Your Weekends

Flutter đang có mức độ phổ biến gia tăng nhanh chóng kể từ ra mắt phiên bản stable vào cuối năm 2018.

Hy vọng rằng tôi đã thúc đẩy việc bạn bắt đầu làm việc với Flutter và chỉ ra cách dễ dàng để bắt đầu với framework này. Công cụ state management có thể phức tạp một chút, nhưng nếu bạn chọn sử dụng Flutter về lâu dài thì đó là một khoản đầu tư xứng đáng.

Bài viết được dịch từ [đây](https://betterprogramming.pub/5-flutter-projects-you-can-do-in-a-weekend-7add10250eae).