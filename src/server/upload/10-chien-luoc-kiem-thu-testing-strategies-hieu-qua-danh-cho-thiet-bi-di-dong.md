# 1. Chiến lược kiểm tra (Testing Strategies) là gì?
Testing Strategies được định nghĩa là một tập hợp các nguyên tắc hướng dẫn mà soi sáng thiết kế kiểm tra và điều chỉnh cách kiểm tra cần phải được thực hiện. Nó là một phần nhỏ nằm trong test plan. 

Trong quá trình phát triển một dự án có thể có nhiều chiến lược kiểm thử được thay thế nhau cho phù hợp với hoàn cảnh của dự án để đem lại hiệu quả làm việc cao nhất. 
Với test plan về cơ bản nó liên quan đến phạm vi kiểm thử, các tính năng được kiểm thử, trong khi đó chiến lược test nó là cách để đạt được mục tiêu kiểm thử được đề cập trong test plan, nó liên quan đến môi trường, phương pháp, công cụ, phân tích rủi ro và kế hoạch dự phòng.
# 2. Điều gì và tại sao chúng ta cần một chiến lược kiểm thử ứng dụng dành cho thiết bị di động?
Đối với các ứng dụng di động, thời gian tiếp thị đang giảm dần theo từng ngày.

Để đánh bại đối thủ, bạn cần tung ra ứng dụng dành cho thiết bị di động với chất lượng tuyệt vời càng sớm càng tốt hoặc ít nhất là tung ra trước đối thủ cạnh tranh. Đây là lúc tầm quan trọng của chiến lược kiểm thử.

Chiến lược kiểm thử nhằm đảm bảo chất lượng tốt, hiệu suất cao và phạm vi kiểm thử tối đa trong một thời gian giới hạn. Dưới đây là một số điều cần được đề cập trong chiến lược kiểm thử ứng dụng dành cho thiết bị di động:

 - Thiết bị : 
Có một danh sách đầy đủ các thiết bị di động có sẵn trên thị trường. Số lượng này cũng đang tăng lên theo cấp số nhân. Điều này làm cho việc kiểm tra ứng dụng của bạn trên tất cả các thiết bị gần như không thể. Do đó, lựa chọn tốt nhất sẽ là thiết kế chiến lược chọn thiết bị dựa trên sự chấp nhận ở thị trường cụ thể đó hoặc dựa trên cơ sở người dùng dự kiến.
 - Trình giả lập / Trình mô phỏng : 
Một lựa chọn khác khả thi hơn sẽ là sử dụng trình giả lập và trình mô phỏng. Bằng cách này, bạn sẽ có thể nhận được nhiều vùng phủ sóng hơn của các thiết bị với chi phí hạn chế.
 - Các loại kiểm thử : 
Một trong những mục tiêu chính của việc thiết kế chiến lược kiểm thử là liệt kê các loại kiểm thử khác nhau cần thiết cho ứng dụng di động. Điều này sẽ dựa trên chức năng của ứng dụng dành cho thiết bị di động, thị trường mà ứng dụng được tung ra, cơ sở người dùng dự kiến, v.v.
![](https://images.viblo.asia/f3721cc6-1d41-48b6-84a6-2801b635999b.png)
# 3. Sự khác biệt giữa kế hoạch kiểm thử (test plan) ứng dụng dành cho thiết bị di động và chiến lược kiểm thử là gì?
Chiến lược và kế hoạch kiểm thử thường được sử dụng cùng nhau và cũng có thể thay thế cho nhaunhưng chúng không giống nhau. Có sự khác biệt nhỏ giữa kế hoạch kiểm thử trên thiết bị di động và chiến lược kiểm thử trên thiết bị di động. Hãy cùng xem xét một số điểm khác biệt dưới đây:
![](https://images.viblo.asia/b2d7f802-911a-4d8d-a351-e2a6dac70bc6.png)

![](https://images.viblo.asia/7900bba0-590e-43d4-be5e-fc44df73ff71.png)
# 4. Các chiến lược kiểm thử (Testing Strategies) hiệu quả dành cho thiết bị di động
## 4.1 Kiểm thử đa nền tảng
Có nhiều loại hệ điều hành di động khác nhau có sẵn trên thị trường. Chủ yếu là Android và iOS.

Điều cần thiết là phải lên kế hoạch kiểm thử ứng dụng di động trên tất cả các nền tảng để đảm bảo ứng dụng hoạt động như mong đợi trên tất cả các nền tảng.

Hầu hết các ứng dụng sẽ có một bộ mã riêng cho Android và iOS. Do đó, điều quan trọng là phải kiểm tra ứng dụng đa nền tảng để tìm bất kỳ vấn đề nào.
## 4.2 Kiểm thử chức năng (Functionality Testing)
Kiểm thử các chức năng chính phải liên quan đến chức năng của ứng dụng mà bạn đang phát triển.

USP (Unique Selling Point - đặc điểm bán hàng) của bất kỳ ứng dụng nào là mức độ việc thực hiện nhiệm vụ kiểm thử của ứng dụng đó. Vì vậy, điều rất quan trọng là phải kiểm tra để hoàn thành chức năng trong và ngoài.

Mọi luồng trong ứng dụng cần được kiểm tra để đảm bảo không có chức năng hoặc luồng nào bị hỏng.
## 4.3 Loại ứng dụng
Chủ yếu có 3 loại ứng dụng di động

- Ứng dụng gốc: những ứng dụng được phát triển đặc biệt cho nền tảng Android hoặc iOS
- Ứng dụng Website di động: các ứng dụng dựa trên trình duyệt trên điện thoại di động
- Hybrid: sự kết hợp của hai loại trên
Trong khi lập kế hoạch kiểm tra, cần có phạm vi bao phủ tốt cho cả ba loại ứng dụng để đảm bảo tính ổn định và hiệu suất.
## 4.4 Kiểm thử UI và UX
Giao diện người dùng (UI) và trải nghiệm người dùng (UX) là những thứ tiếp theo cần được lên kế hoạch tốt mà không thất bại.

Giao diện người dùng là những gì người dùng nhìn thấy và cách họ tương tác với ứng dụng di động của bạn.

Giao diện người dùng phải được thiết kế theo cách hiểu và điều hướng thông qua ứng dụng cho tất cả các loại người dùng.

Tương tự, đối với UX, điều hướng giữa các trang và thời gian cần thiết để tạo báo cáo đầu ra theo ứng dụng cũng phải nằm trong SLA (Service-level Agreement - cam kết nhà cung cấp với khách hàng) được xác định trước.

Với vô số ứng dụng dành cho thiết bị di động hiện có trên thị trường, ứng dụng của bạn có thể không có cơ hội thứ hai nếu người tiêu dùng hoặc người dùng cuối không thích nó.
## 4.5 Kiểm thử Backend 
Kiểm thử  Backend là một loại kiểm thử kiểm tra lớp ứng dụng và cơ sở dữ liệu với kiến trúc 3 tầng.
Kiểm thử  Backend được thực hiện để đảm bảo dữ liệu được lưu trữ ở đúng nơi và đúng định dạng.

Trong quá trình kiểm thử, cần đảm bảo rằng dữ liệu do người dùng nhập vào được lưu một cách chính xác, theo đúng cấu hình và cũng phải dễ dàng truy xuất được.

Kiểm tra Backend cũng liên quan đến việc kiểm tra các vị trí khác nhau nơi dữ liệu được lưu và phản ánh trong ứng dụng và nó có được thực hiện chính xác hay không.

Lưu và truy xuất hồ sơ người dùng chính xác sẽ là một trường hợp sử dụng chính khác cho kiểm thử Backend.
## 4.6 Network compatibility Testing (kiểm thử khả năng tương thích mạng)
Các ứng dụng Mobiel hoạt động tùy theo sự khác biệt về cường độ internet

Trong trường hợp này, kiểm tra tính tương thích mạng cũng cần được đưa vào chiến lược kiểm tra của bạn.

Điều này sẽ bao gồm việc kiểm thử ứng dụng trong các cấu hình mạng khác nhau như với dữ liệu và wifi.

Cường độ tín hiệu, băng thông khác nhau và sau đó đo TPS (giao dịch mỗi giây) để xem liệu có nằm trong SLA theo kế hoạch hay không.
## 4.7 Kiểm tra lưu trữ (Storage Testing)
Kiểm tra bộ nhớ gần đây đã trở thành một phần quan trọng của chiến lược kiểm tra ứng dụng dành cho thiết bị di động.

Với số lượng ứng dụng được sử dụng ngày càng nhiều và dung lượng hạn chế để sử dụng.

Mọi người có xu hướng tránh các ứng dụng cần quá nhiều dung lượng để tải xuống hoặc nhiều dữ liệu hơn để sử dụng.

Vì vậy, điều quan trọng là phải kiểm tra và chỉnh sửa các thông số này để người dùng cuối chấp nhận tốt hơn.
## 4.8 Kiểm tra luồng dữ liệu
Hầu hết các ứng dụng di động không độc lập và cần một hoặc nhiềuđầu vào khác từ các hệ thống và máy chủ bên ngoài ứng dụng.

Do đó, nó trở thành một phần quan trọng của chiến lược bao gồm việc kiểm tra luồng dữ liệu từ hệ thống này sang hệ thống khác.
## 4.9 Kiểm thử nội địa hóa (Localization Testing)
Mặc dù điều này có thể không cần thiết cho tất cả các ứng dụng, nhưng nếu cần thì bạn nên có trong chiến lược của mình.

Kiểm tra nội địa hóa bao gồm việc kiểm tra ứng dụng cho các thông số dựa trên vị trí như ngôn ngữ, bản đồ và bất kỳ thứ nào khác liên quan đến vị trí. Đây đôi khi cũng là những yêu cầu pháp lý đối với một số địa điểm.
## 4.10 Kiểm thử thiết bị
Hiện nay có rất nhiều thiết bị đang sử dụng. Để đảm bảo rằng ứng dụng của bạn hoạt động tốt trên tất cả thiết bị (device). Bạn cần kiểm tra hiệu suất, chức năng và giao diện người dùng của ứng dụng trên các thiết bị thực.

Đó là một thách thức cũng như một nhiệm vụ khó khăn do có hàng ngàn thiết bị với kích thước màn hình khác nhau. Vì vậy, trong tình huống này, phụ thuộc vào trình giả lập đã được coi là một thực tế phổ biến.

Nhưng trình giả lập không phải là một giải pháp tuyệt đối. Vì vậy, giải pháp hoàn hảo ở đây sẽ là kiểm tra ứng dụng ở kích thước màn hình thường được sử dụng và sau đó đối với các tùy chọn khác thì hãy sử dụng trình giả lập.

## Tham khảo:
https://www.testbytes.net/blog/mobile-app-testing-strategies/