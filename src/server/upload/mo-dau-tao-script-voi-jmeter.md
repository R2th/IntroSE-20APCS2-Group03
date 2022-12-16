Khi nhắc đến JMeter, chắc hẳn mọi người cũng đã từng được nghe đâu đó về cái tên này. Apache JMeter là một công cụ tuyệt vời để thực hiện kiểm tra hiệu suất của các ứng dụng web, nhưng nó có vẻ hơi phức tạp khi xem qua lần đầu tiên. Nhưng cái gì cũng sẽ có lần đầu bỡ ngỡ. Sau đây là một vài tip nhỏ đễ tạo script đầu tiên của bạn một cách thuận lợi nhất.

   Trước tiên, bạn cần tải xuống Jmeter từ trang [Apache JMeter](http://jmeter.apache.org/download_jmeter.cgi) chính thức. Giải nén bản phân phối và sao chép nó vào bất kỳ thư mục nào bạn thích. Lưu ý rằng bạn cần có JRE 1.8 ("Java 8") trở lên để chạy Jmeter, vì nó được viết bằng JAVA thuần túy.
   
   Truy cập $ JMETER_HOME / bin và chạy jmeter.bat, nếu bạn là người dùng WINDOWS hoặc JMeter, nếu bạn là người dùng * nix
Cửa sổ JMeter được xem trước như sau:

![](https://images.viblo.asia/2f6e7073-0ec1-4b3e-beef-b2b249c213e3.png)

Kế hoạch kiểm thử, là yếu tố cốt lõi của kịch bản kiểm thử.
 
Nhìn vào hình minh họa. Ở đây chúng ta có hai bảng và ba check boxes. Bảng đầu tiên,  User Defined Variables, cho phép đặt các biến, có thể được sử dụng trong bất kỳ phần nào khác của tập lệnh và đây là một cách tiết kiệm thời gian tuyệt vời khi bạn thay đổi các môi trường kiểm thử và cần sửa IP Máy chủ (điều này xảy ra khá phổ biến).

Trong trường hợp này, bạn có thể chỉ cần thiết lập giá trị này dưới dạng một biến và thế là xong: không có vấn đề gì với việc cập nhật tập lệnh.

Ví dụ: bảng thứ hai được sử dụng khi bạn định tạo kế hoạch kiểm tra cho cơ sở dữ liệu và bạn cần hiển thị trình điều khiển JDBC cho JMeter để thực thi các truy vấn SQL. Trong trường hợp này, bạn cần thêm JDBC * .jar vào bảng này và JMeter sẽ chọn nó.

Có một vài lưu ý về check boxes:

- Run Thread Groups liên tục

Nếu tùy chọn này được chọn, hơn tất cả các Thread Groups sẽ được thực thi từng nhóm một. Điều này có thể hữu ích trong các trường hợp chẳng hạn như nếu Thread Groups đầu tiên chuẩn bị dữ liệu kiểm thử cho quá trình testing và nhóm tiếp theo sử dụng lại.

- Run tearDown Thread Groups. 

 Một số hành động, chẳng hạn như khôi phục hệ thống sau khi thử nghiệm về trạng thái mặc định có thể được gán cho dropsDownThreadGroups. 
Bất kỳ kế hoạch kiểm thử nào của JMeter phải chứa ít nhất một Thread Groups, sau đó sẽ là phần tử mẹ cho bất kỳ phần tử thử nghiệm nào (ngoại trừ Test Plan and Listeners). Vì vậy, nó sẽ là yếu tố đầu tiên mà sẽ thêm vào kế hoạch thử nghiệm của mình. 

![](https://images.viblo.asia/e0f537fe-dc4d-4f4f-ba61-5edd977bca65.png)

Phần tử đầu tiên sẽ thêm vào Thread Groups là HTTP Request Defaults.

Để trích dẫn, “phần tử này cho phép bạn đặt các giá trị mặc định mà HTTP Request controllers của bạn sử dụng. Ví dụ: nếu bạn đang tạo Test Plan với 25 HTTP Request controllers và tất cả các yêu cầu đang được gửi đến cùng một máy chủ, bạn có thể thêm một phần tử HTTP Request controllers duy nhất với trường "Tên máy chủ hoặc IP" được điền vào. Sau đó , khi bạn thêm 25 HTTP Request controllers, hãy để trống trường "Tên máy chủ hoặc IP". Bộ điều khiển sẽ kế thừa giá trị trường này từ phần tử HTTP Request Defaults. "

Trong ví dụ, sẽ sử dụng cùng một URL cho tất cả các yêu cầu. Đó là lý do tại sao yếu tố này, rõ ràng, sẽ hữu ích cho chúng ta. Hãy thêm phần tử  cần thực hiện stress test.

![](https://images.viblo.asia/1620f04c-3e42-4032-acc4-06f3b16cc6eb.png)

Nói chung, JMeter hoạt động như trình mô phỏng trình duyệt. Và để làm cho mô phỏng này thực tế hơn, nó có các phần tử có thể hoạt động với cookie và bộ nhớ cache. Các phần tử này là HTTP Cookie Manager và HTTP Cache Manager.

![](https://images.viblo.asia/d550a4d5-719c-4445-9e15-eff6f436bcaa.png)

**HTTP Cookie Manager.**

Phần tử này được sử dụng để mô phỏng hoạt động của trình duyệt với cookie.

**HTTP Cache Manager.**

Phần tử này được sử dụng để lưu các trang đã tải xuống vào bộ nhớ cache trong lần yêu cầu đầu tiên, vì vậy chúng có thể được trả lại cho Listener mà không cần tải xuống. Cách tiếp cận này, rõ ràng, có ảnh hưởng đến kết quả thử nghiệm.

Một chi tiết quan trọng nữa. Người dùng không bao giờ nhấp từng liên kết một, không có bất kỳ sự chậm trễ nào. Thông thường, có độ trễ vài giây giữa các lần suy nghĩ, quyết định có truy cập hay không đến một số URL nhất định. Đó là lý do tại sao chúng ta cần mô phỏng thời gian suy nghĩ của người dùng.

JMeter có một bộ Bộ hẹn giờ, cho phép người dùng thiết lập thời gian tạm dừng giữa các yêu cầu khác nhau. Trong ví dụ này, sẽ thêm Constant Timer để tạo độ trễ trong khoảng thời gian cố định.

![](https://images.viblo.asia/5bd61d44-6cf1-4bd8-bc03-be6611b35e1b.png)

Phần tử cuối cùng cần là View Results Tree. 

![](https://images.viblo.asia/e864b3de-7952-4198-bccc-82ef92fef600.png)

Lưu ý rằng yếu tố này chỉ cần thiết trong quá trình debugging. Nói chung, View Results Tree liên quan đến việc tiêu thụ bộ nhớ vì nó lưu trữ trong bộ nhớ tất cả các kết quả của các yêu cầu. Rõ ràng, nếu chúng ta sử dụng phần tử này trong khi chúng ta có nhiều người dùng ảo, chúng ta sẽ hết bộ nhớ và nhận được OutofMemoryException.

Vì vậy, hãy xóa hoặc vô hiệu hóa View Results Tree (và cho phép tất cả các graphic listeners khác) trước khi chạy thử nghiệm của bạn.

Trên đây là sơ lược cách tạo script với JMeter. Hẹn gặp lại ở chủ đề hấp dẫn hơn.