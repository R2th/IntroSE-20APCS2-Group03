## 1.Bắt đầu<br>
Đối với  bài viết này, bạn sẽ tạo một trình duyệt web di động cơ bản, chẳng hạn như trình duyệt web bạn có thể thêm vào ứng dụng tiếp theo của mình. Nó sẽ có một giao diện người dùng cơ bản cho phép người dùng nhập và vào một URL. Trình duyệt của bạn sẽ lưu vào bộ nhớ cache thành công được truy xuất kết quả. Bằng cách này, người dùng có thể tải các trang đã được truy cập trong nháy mắt vì trang sẽ không tải từ yêu cầu mạng mà từ bộ nhớ cache cục bộ của ứng dụng.<br>
Bạn đã biết rằng trang tải nhanh thì người dùng sẽ rất hài lòng, vì vậy đây là ví dụ tốt về cách NSURLProtocol có thể cải thiện hiệu suất của ứng dụng của bạn.<br>
Sau đây là các bước bạn cần làm: <br>
 Sử dung UIWebView để hiện thị trang web<br>
 Sử dụng CoreData để lưu bộ nhớ cache<br>
### Tổng quan dự án <br>
Bạn có thể tải Project <a href="https://koenig-media.raywenderlich.com/uploads/2015/02/NSURLProtocolExample-Swift-8.zip" sl-processed="1">tại đây</a>, sau đó giải nén nó và bắt đầu :)))<br>
## 2.Chặn các yêu cầu mạng<br>
Một tập hợp các lớp được gọi là URL Loading System  xử lý các yêu cầu URL trên iOS. Đối với yêu cầu mạng, lớp này cho biết máy chủ của bạn đang cố gắng tiếp cận ứng dụng nào và đường dẫn đến tài nguyên tại máy chủ lưu trữ đó. Ngoài ra, đối tượng NSURLRequest còn thêm thông tin như tiêu đề HTTP, body, v.v.<br>
Bây giờ là lúc để bắt đầu chặn tất cả các ứng dụng của NSURLRequest được kích hoạt.Để làm được điều đó, bạn sẽ  triển khai NSURLProtocol của riêng mình.<br>
![](https://images.viblo.asia/48e91c53-bcb2-4362-89a6-0b803d93739b.png)
Mỗi khi URL Loading System nhận được yêu cầu load 1 URL, nó sẽ tìm kiếm trình xử lý giao thức đã đăng ký để xử lý yêu cầu. Mỗi trình xử lý cho hệ thống biết liệu nó có thể xử lý một yêu cầu đã cho thông qua phương thức canInitWithRequest ( :) của nó hay không? <br>
Tham số cho phương thức này là yêu cầu giao thức được hỏi nếu nó có thể xử lý. Nếu phương thức trả về true, thì hệ thống tải sẽ dựa vào lớp con NSURLProtocol này để xử lý yêu cầu và bỏ qua tất cả các trình xử lý khác.<br>
Mở AppDelegate.swift và thay thế phương thức (: didFinishLaunchingWithOptions :) bằng phương thức này:<br>
![](https://images.viblo.asia/5e2dc95a-cbf6-4684-84c5-ef44cf2cd00b.png)
Bây giờ khi chạy ứng dụng, nó sẽ đăng kí protocol với URL Loading system. Điều đó có nghĩa là nó sẽ có cơ hội xử lý mọi yêu cầu được gửi đến hệ thống tải URL. <br>
Trong console, bạn sẽ thấy một cái gì đó như thế này:<br>
![](https://images.viblo.asia/3fd9eaeb-3235-4350-be6e-5f881a3bf338.png)
## 3.Tùy chỉnh URL Loading<br>
Nếu bạn đang triển khai giao thức mạng ứng dụng mới từ đầu (ví dụ: thêm giao thức foo: //), thì đây là nơi bạn nắm lấy những niềm vui khắc nghiệt của việc triển khai giao thức mạng ứng dụng. Nhưng vì mục tiêu của bạn chỉ là chèn một lớp bộ nhớ đệm tùy chỉnh, bạn có thể lấy dữ liệu bằng cách sử dụng NSURLConnection.<br>
Hiệu quả là bạn chỉ cần đánh chặn yêu cầu và sau đó chuyển nó trở lại URL Loading System tiêu chuẩn thông qua việc sử dụng NSURLConnection.<br>
Custom class NSURLProtocol của bạn trả về dữ liệu thông qua một đối tượng thực hiện giao thức NSURLProtocolClient. Có một chút nhầm lẫn đặt tên để giữ thẳng trong đầu của bạn: NSURLProtocol là một lớp, và NSURLProtocolClient là một protocol<br>
Mở MyURLProtocol.swift và thêm thuộc tính sau vào đầu định nghĩa lớp MyURLProtocol<br>
![](https://images.viblo.asia/58180b19-7884-47d6-b282-62a9654e192f.png)
Tiếp theo, tìm canInitWithRequest ( :). Thay đổi dòng trả về thành true:<br>
![](https://images.viblo.asia/5b45dcf9-d243-4630-bc34-049963c5158e.png)
và thêm một số phương thức:<br>
![](https://images.viblo.asia/f0158a07-b6e9-4325-885f-d1cecb434347.png)
## 4.Triển khai Local Cache<br>
Hãy nhớ yêu cầu cơ bản cho ứng dụng này: đối với một yêu cầu nhất định, nó sẽ tải dữ liệu từ web chỉ một lần và sau đó lưu trữ dữ liệu đó. Nếu yêu cầu tương tự được kích hoạt lại trong tương lai, giao thức của bạn sẽ phân phối phản hồi được lưu trong bộ nhớ cache mà không cần tải lại từ web.<br>
Đã đến lúc lưu các câu trả lời mà ứng dụng của bạn nhận được từ web và truy xuất chúng bất cứ khi nào nó có dữ liệu được lưu trong bộ nhớ cache phù hợp. Mở MyURLProtocol.swift và thêm mục nhập sau vào đầu tệp:<br>
![](https://images.viblo.asia/a3719295-9f8b-4c7b-a2c7-40da634a5043.png)
và thêm 2 thuộc tính sau:<br>
![](https://images.viblo.asia/4a8e7de5-5267-49b8-b977-3670969882d6.png)
Thuôc tính response sẽ giữ tham chiếu tới data mà bạn cần khi lưu response từ server.Thuộc tính mutableData sẽ được sử dụng để giữ dữ liệu mà kết nối nhận được trong phương thức kết nối (: didReceiveData :) delegate. Bất cứ khi nào kết nối kết thúc, bạn có thể cache phản hồi (dữ liệu và siêu dữ liệu).
![](https://images.viblo.asia/6f5fc4c3-02e4-4b9b-a1ab-121d04962cde.png)
Hàm trên đã thực hiện được các bước để lưu trữ dữ liệu vào trong Core Data<br>
Bây giờ bạn có một cách để lưu trữ dữ liệu, bạn cần phải gọi phương thức này từ đâu đó. Vẫn còn trong MyURLProtocol.swift, thay đổi phương thức ủy nhiệm NSURLConnection thành các triển khai sau:<br>
![](https://images.viblo.asia/fcd7497f-b9ac-48ca-9c2f-623f63cde27a.png)
Thay vì trực tiếp bàn giao cho client, phản hồi và dữ liệu được lưu trữ bởi lớp giao thức tùy chỉnh của bạn ngay bây giờ.<br>
## 5.Truy xuất phản hồi được lưu trong bộ nhớ cache<br>
Cuối cùng, bây giờ là lúc để truy xuất các phản hồi được lưu trong bộ nhớ cache và gửi chúng đến máy khách của NSURLProtocol. Mở MyURLProtocol.swift. Sau đó, thêm phương thức sau:<br>
![](https://images.viblo.asia/357629f4-8d9d-476f-94c2-a8f93bf4ca28.png)
Bây giờ là lúc nhìn lại triển khai startLoading (). Thay vì chỉ tải mọi thứ từ web, nó cần phải kiểm tra phản hồi được lưu trong bộ nhớ cache cho URL đầu tiên. Tìm triển khai hiện tại và thay thế bằng các thao tác sau:<br>
![](https://images.viblo.asia/0a514667-e48d-4082-8488-c806d2d5b409.png)
## 6.Tổng kết <br>
Ví dụ này đề cập đến việc sử dụng NSURLProtocol đơn giản, nhưng đừng nhầm lẫn nó như một giải pháp hoàn chỉnh cho bộ nhớ đệm. Có rất nhiều thứ khác để triển khai trình duyệt bộ nhớ đệm. Trong thực tế, Loading systems có cấu hình bộ nhớ đệm tích hợp, đáng để  tìm hiểu. Mục tiêu của hướng dẫn này chỉ đơn giản là để cho bạn thấy các khả năng. Bởi vì NSURLProtocol có quyền truy cập vào dữ liệu vào và ra khỏi rất nhiều thành phần, nó rất mạnh mẽ! Hầu như không có giới hạn cho những gì bạn có thể thực hiện phương thức -startLoading.
Tài liệu tham khảo: https://www.raywenderlich.com/76735/using-nsurlprotocol-swift