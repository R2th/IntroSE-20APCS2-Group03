### 1. Spike testing là gì?

![](https://images.viblo.asia/312e07a0-cedd-4448-ba8d-5dd5045f5dec.jpg)

Spike testing được định nghĩa là một loại kiểm tra hiệu suất, trong đó ứng dụng sẽ được kiểm tra khi thực hiện tăng và giảm đột ngột số lượng lớn người dùng.
Việc làm này giúp đánh giá hành vi của phần mềm và tìm ra điểm yếu của ứng dụng.

### 2. Mục tiêu của Spike testing
Mục tiêu của Spike testing là kiểm tra hệ thống sẽ phản ứng như thế nào trước sự tăng giảm bất ngờ của người dùng. Trong kỹ thuật phần mềm, Spike testing giúp xác định hiệu năng hệ thống sẽ suy giảm khi có sự tải đột ngột.

Một mục tiêu khác của Spike testing  là xác định thời gian phục hồi. Giữa 2 lần tăng tải liên tiếp của người dùng, hệ thống cần một thời gian để ổn định. Thời gian phục hồi này nên càng thấp càng tốt

### 3. Thực hiện Spike testing như thế nào?
Dưới đây là sáu bước đơn giản để thực hiện kiểm tra Spike testing

* Bước 1: Xác định khả năng tải tối đa của người dùng trong ứng dụng phần mềm 
* Bước 2: Chuẩn bị môi trường kiểm tra và cấu hình nó để ghi lại các tham số hiệu suất
* Bước 3: Dùng một công cụ hiệu suất rồi thực hiện tải tối đa theo khả năng đã xác định ở bước 1 cho ứng dụng phần mềm
* Bước 4: Tăng nhanh tải vào hệ thống trong một khoảng thời gian đã đặt
* Bước 5: Dần dần giảm tải trở lại mức ban đầu
* Bước 6: Phân tích các biểu đồ hiệu suất. 

![](https://images.viblo.asia/9927f768-13cb-494e-80d1-fbe6a8f238af.jpg)


Ví dụ một số kịch bản cần kiểm tra Spike:
* Khi một cửa hàng thương mại điện tử đang tung ra các ưu đãi đặc biệt với mức giảm giá lớn vào ngày Black Friday
* Khi một ứng dụng web phát trực tiếp một chương trình TV yêu thích
* Khi một đợt giảm giá đang diễn ra trên một trang web giao dịch hàng ngày
* Khi nội dung của một trang web lan truyền trên Internet
* Một hệ thống mới được phát hành để sản xuất và nhiều người dùng muốn truy cập hệ thống
* Mất điện có thể khiến tất cả người dùng mất quyền truy cập vào hệ thống. Sau khi có điện trở lại, tất cả người dùng đăng nhập lại vào hệ thống

### 4. Kịch bản phục hồi sau khi thực hiện Spike testing

Có 3 kịch bản phục hồi có thể được cấu hình để bảo vệ chống lại sự thay đổi đột ngột

- Sử dụng các nền tảng đám mây như AWS, Azure để tăng công suất máy chủ song song với tải người dùng
- Giới hạn số lượng cho phép người dùng truy cập vào ứng dụng để hệ thống không phải đối mặt với số lượng người dùng tăng giảm đột ngột.
- Cho phép tối đa người dùng tham gia hệ thống. Tuy nhiên, cần cảnh báo rằng họ có thể phải đối mặt với việc ứng dụng phản ứng chậm vì tải nặng. Điều này có thể dẫn đến ảnh hưởng xấu đến hiệu suất hệ thống. Tuy nhiên, người dùng sẽ có thể làm việc với hệ thống.
 
### 5. Ưu điểm và nhược điểm của Spike testing

Ưu điểm
* Hiệu suất của phần mềm phải được duy trì bằng mọi giá. Tuy nhiên, khi có sự gia tăng cực lớn về tải của bất kỳ hệ thống nào, có nhiều khả năng xảy ra sự cố. Kiểm tra Spike giúp kiểm tra kịch bản như vậy.       
* Trong phương pháp thử nghiệm tiêu chuẩn, các tình huống xấu đến trường hợp xấu nhất có thể không được giải quyết. Tuy nhiên, bỏ qua chúng không có nghĩa là chúng sẽ không bao giờ xảy ra. Do đó, mọi phần mềm nên sẵn sàng cho những khả năng như vậy. Một trường hợp xấu nhất như vậy sẽ được đánh giá và giảm thiểu với sự trợ giúp của kiểm tra tăng đột biến.  

Nhược điểm
* Nhược điểm duy nhất của Spike tests là nó là một quá trình thử nghiệm đắt tiền. Vì vậy, nó cần thiết lập các điều kiện thử nghiệm đặc biệt. Tuy nhiên, trong thời gian dài hơn, nó chắc chắn sẽ mang lại tích cực   

### 6 Công cụ hỗ trợ Spike testing
*  Jmeter

Apache JMeter là một công cụ kiểm tra đột biến mã nguồn mở java. Nó được thiết kế đặc biệt để kiểm tra chức năng và đo lường hiệu suất. Công cụ kiểm tra hiệu suất này có thể được sử dụng để phân tích và đo lường hiệu suất của ứng dụng web hoặc một loạt các dịch vụ. Ngày nay, nó được sử dụng rộng rãi để kiểm tra chức năng, kiểm tra máy chủ cơ sở dữ liệu.

* Loadrunner

Loadrunner là một công cụ kiểm tra tải cho Windows và Linux, cho phép kiểm tra đột biến web và các ứng dụng khác. Nó giúp xác định hiệu suất và kết quả của ứng dụng ngay cả dưới tải nặng.

Phần kết luận:
* Kiểm tra Spike là một phương pháp kiểm tra phần mềm. Trong phương pháp này, các ứng dụng được kiểm tra với mức tăng và giảm bất thường trong tải.
* Cách tiếp cận đúng để thực hiện kiểm tra tăng đột biến là tăng số lượng người dùng một cách bất ngờ, sau đó giảm tải ngay lập tức.
* Jmeter là một trong những công cụ hữu ích để thực hiện kiểm tra tăng đột biến

Tham khảo: https://www.guru99.com/spike-testing.html