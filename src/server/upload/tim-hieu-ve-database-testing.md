# Database testing là gì?

Database testing - Kiểm thử cơ sở dữ liệu là kiểm tra schema, tables, triggers, vv của cơ sở dữ liệu hoặc tạo ra các load/stress test với các truy vấn phức tạp để kiểm tra responsive-phản hồi của nó. Kiểm thử cơ sở dữ liệu là nhằm kiểm tra integrity-tính toàn vẹn và  consistency-tính nhất quán của csdl.

Trong bài viết này sẽ đề cập đến những vấn đề sau:

* Sự khác biệt giữa GUI Testing và Database testing
* Các loại Database Testing
* Schema Testing
* Database table, column testing
* Stored procedures testing
* Trigger testing
* Database server validations
* Functional database testing
* Load testing
* Stress testing

# Sự khác biệt giữa GUI Testing và Database testing

![](https://images.viblo.asia/3cd52d65-fcfd-4098-9387-4ece23c39522.jpg)



| GUI Testing | Database testing |
| -------- | -------- |
| Loại thử nghiệm này còn được gọi là thử nghiệm Giao diện người dùng đồ họa hoặc Kiểm tra đầu cuối.    | Loại thử nghiệm này còn được gọi là kiểm tra Back-end hoặc kiểm tra dữ liệu.     |
| Loại thử nghiệm này chủ yếu đề cập đến tất cả các mục có thể thử nghiệm được mở cho người dùng về lượng người xem và tương tác như Biểu mẫu, Bản trình bày, Biểu đồ, Menu và Báo cáo, v.v. (được tạo thông qua VB, VB.net, VC ++, Delphi - Công cụ Frontend )    | Loại thử nghiệm này chủ yếu đề cập đến tất cả các mục có thể kiểm tra thường bị ẩn khỏi người dùng đối với lượng người xem. Chúng bao gồm quá trình và lưu trữ nội bộ như Assembly, DBMS như Oracle, SQL Server, MYSQL, v.v.     |
|Loại thử nghiệm này bao gồm xác thực các hộp văn bản, chọn danh sách thả xuống, lịch và nút, điều hướng từ trang này sang trang khác, hiển thị hình ảnh cũng như Giao diện của ứng dụng tổng thể.     | Loại thử nghiệm này bao gồm việc xác thực lược đồ, bảng cơ sở dữ liệu, cột, khóa và chỉ mục, thủ tục được lưu trữ, trình kích hoạt, xác thực máy chủ cơ sở dữ liệu, xác thực sao chép dữ liệu,   |
| Người kiểm thử phải hiểu biết đầy đủ về các yêu cầu nghiệp vụ cũng như việc sử dụng các công cụ phát triển và việc sử dụng các khung công cụ và công cụ tự động hóa. | Trình kiểm tra để có thể thực hiện kiểm tra back-end phải có một nền tảng mạnh mẽ trong máy chủ cơ sở dữ liệu và các khái niệm Ngôn ngữ truy vấn có cấu trúc.     |

# Các loại kiểm tra cơ sở dữ liệu

![](https://images.viblo.asia/9d434a8d-eb40-45e4-90f2-e2dfada1d443.jpg)

3 loại kiểm tra cơ sở dữ liệu là

1. Structural Testing
2. Functional Testing
3. Non-functional Testing

# Structural database testing

Structural database testing liên quan đến việc xác nhận tất cả các phần tử bên trong kho dữ liệu được sử dụng chủ yếu để lưu trữ dữ liệu và không được người dùng cuối trực tiếp điều khiển. Việc xác thực các máy chủ cơ sở dữ liệu cũng là một điều rất quan trọng trong các loại thử nghiệm này. Việc hoàn thành giai đoạn này thành công bởi những người kiểm thử bao gồm sự thành thạo trong các truy vấn SQL.

# Schema testing
Khía cạnh chính của Schema testing là mapping để đảm bảo rằng Schema  giữa front end và back end là tương tự nhau

Các khía cạnh quan trọng khi thực hiện Schema testing:

1. Xác nhận các định dạng lược đồ khác nhau được liên kết với cơ sở dữ liệu. Nhiều lần định dạng ánh xạ của bảng có thể không tương thích với định dạng ánh xạ hiện diện ở cấp độ giao diện người dùng của ứng dụng.
2. Có nhu cầu xác minh trong trường hợp các bảng / khung nhìn / cột chưa được ánh xạ.
3. Ngoài ra còn có một nhu cầu để xác minh xem cơ sở dữ liệu không đồng nhất trong một môi trường là phù hợp với bản đồ ứng dụng tổng thể.

 Một số tool có thể sử dụng:

* DBUnit được tích hợp với Ant là rất phù hợp để kiểm tra bản đồ.
* SQL Server cho phép người thử nghiệm có thể kiểm tra và truy vấn giản đồ của cơ sở dữ liệu bằng cách viết các truy vấn đơn giản và không thông qua mã.

# Database table, column testing
Quan điểm test:

* Việc ánh xạ các trường và cột cơ sở dữ liệu trong phần cuối có tương thích với các ánh xạ đó trong giao diện người dùng hay không.
* Xác nhận độ dài và quy ước đặt tên của các trường và cột cơ sở dữ liệu theo yêu cầu.
* Xác nhận sự hiện diện của bất kỳ bảng / cột cơ sở dữ liệu chưa được sử dụng / chưa được ánh xạ nào.
* Xác nhận tính tương thích của loại dữ liệu, độ dài trường, của các cột cơ sở dữ liệu phụ trợ với các cột có sẵn trong giao diện người dùng của ứng dụng.
* Liệu các trường cơ sở dữ liệu có cho phép người dùng cung cấp các đầu vào người dùng mong muốn theo yêu cầu của các tài liệu đặc tả yêu cầu nghiệp vụ hay không.

# Stored procedures testing
Danh sách những thứ quan trọng nhất cần được xác nhận cho các thủ tục được lưu trữ.

* Liệu nhóm phát triển có chấp nhận yêu cầu không
- coding standard conventions
- exception and error handling

* Đội ngũ phát triển có bao gồm tất cả các điều kiện / vòng lặp hay không bằng cách áp dụng dữ liệu đầu vào cần thiết cho ứng dụng đang thử nghiệm.
* Cho dù nhóm phát triển đã áp dụng đúng các hoạt động TRIM bất cứ khi nào dữ liệu được lấy từ các bảng được yêu cầu trong Cơ sở dữ liệu.
* Việc thực hiện thủ công của Thủ tục lưu trữ có cung cấp cho người dùng cuối kết quả được yêu cầu hay không
* Việc thực hiện thủ công của Thủ tục lưu trữ có đảm bảo các trường bảng đang được cập nhật theo yêu cầu của ứng dụng đang thử nghiệm hay không.
* Cho dù việc thực hiện các thủ tục lưu trữ cho phép tiềm ẩn gọi của các kích hoạt cần thiết.
* Xác nhận sự hiện diện của bất kỳ thủ tục được lưu trữ chưa sử dụng nào.
* Xác nhận thực tế là tất cả các thủ tục và hàm được lưu trữ đã được thực hiện thành công khi Cơ sở dữ liệu đang thử nghiệm trống.
* Xác nhận sự tích hợp tổng thể của các mô-đun thủ tục được lưu trữ theo yêu cầu của ứng dụng đang thử nghiệm.
* Một số công cụ thú vị để thử nghiệm các thủ tục lưu trữ là LINQ, công cụ kiểm tra SP, v.v.

# Trigger testing
* Required coding conventions có được tuân thủ hay không.
* Kiểm tra xem các Trigger được thực hiện cho các giao dịch DML tương ứng có đáp ứng các điều kiện bắt buộc hay không.
* Liệu Trigger có cập nhật dữ liệu chính xác khi chúng đã được thực hiện hay không.
* Xác nhận chức năng khởi động Update / Insert / Delete bắt buộc trong lĩnh vực ứng dụng đang được kiểm tra.

# Database server validations

![](https://images.viblo.asia/5b3f2a3a-4405-4d83-9cdf-80f0edb3eeea.png)

* Kiểm tra cấu hình máy chủ cơ sở dữ liệu theo yêu cầu của doanh nghiệp.
* Kiểm tra sự cho phép của người dùng được yêu cầu để chỉ thực hiện các mức hành động đó mà ứng dụng yêu cầu.
* Kiểm tra xem máy chủ cơ sở dữ liệu có thể đáp ứng nhu cầu số lượng giao dịch người dùng tối đa được cho phép như được chỉ định bởi các đặc tả yêu cầu nghiệp vụ hay không.

# Functional database testing

Functional database testing cần đảm bảo hầu hết các giao dịch và hoạt động đó được thực hiện bởi người dùng cuối đều nhất quán với các đặc tả yêu cầu.
Quan điểm test:
* Cho dù trường là bắt buộc trong khi cho phép giá trị NULL trên trường đó.
* Liệu chiều dài của mỗi trường có đủ kích thước không?
* Liệu tất cả các trường tương tự có cùng tên trên các bảng không?
* Liệu có bất kỳ trường được tính toán nào có trong Cơ sở dữ liệu không?
* Quy trình cụ thể này là việc xác thực ánh xạ trường từ quan điểm người dùng cuối. Trong trường hợp cụ thể này, trình kiểm tra sẽ thực hiện một phép toán ở cấp cơ sở dữ liệu và sau đó sẽ điều hướng đến mục giao diện người dùng có liên quan để quan sát và xác nhận xem các xác thực hợp lệ đã được thực hiện hay chưa.

# Checking data integrity và consistency
Quan điểm test:

* Liệu dữ liệu có được sắp xếp hợp lý hay không
* Dữ liệu được lưu trữ trong bảng có chính xác hay không và theo yêu cầu của doanh nghiệp.
* Liệu có bất kỳ dữ liệu không cần thiết nào có trong ứng dụng đang được thử nghiệm hay không.
* Dữ liệu có được lưu trữ theo yêu cầu đối với dữ liệu đã được cập nhật từ giao diện người dùng hay không.
* Liệu các hoạt động TRIM có thực hiện trên dữ liệu trước khi chèn dữ liệu vào cơ sở dữ liệu được thử nghiệm hay không.
* Liệu các giao dịch đã được thực hiện theo thông số yêu cầu nghiệp vụ hay chưa và liệu các kết quả có chính xác hay không.
* Liệu dữ liệu đã được cam kết đúng chưa nếu giao dịch đã được thực hiện thành công theo các yêu cầu nghiệp vụ.
* Liệu dữ liệu đã được khôi phục thành công chưa nếu giao dịch chưa được thực hiện thành công bởi người dùng cuối.
* Cho dù dữ liệu đã được khôi phục ở tất cả trong điều kiện giao dịch chưa được thực hiện thành công và nhiều cơ sở dữ liệu không đồng nhất đã được tham gia vào giao dịch được đề cập.
* Cho dù tất cả các giao dịch đã được thực hiện bằng cách sử dụng các thủ tục thiết kế yêu cầu theo quy định của yêu cầu kinh doanh hệ thống.

# Load testing

* Các giao dịch người dùng thường xuyên sử dụng nhất có khả năng tác động đến hiệu suất của tất cả các giao dịch khác nếu chúng không hiệu quả.
* Ít nhất một giao dịch người dùng không chỉnh sửa phải được bao gồm trong bộ thử nghiệm cuối cùng, do đó hiệu suất của các giao dịch đó có thể được phân biệt với các giao dịch phức tạp khác.
* Các giao dịch quan trọng hơn để tạo thuận lợi cho các mục tiêu cốt lõi của hệ thống nên được đưa vào, vì sự thất bại dưới tải trọng của các giao dịch này, theo định nghĩa, tác động lớn nhất.
* Phải bao gồm ít nhất một giao dịch có thể chỉnh sửa để hiệu suất của các giao dịch đó có thể được phân biệt với các giao dịch khác.
* Quan sát thời gian đáp ứng tối ưu dưới số lượng lớn người dùng ảo cho tất cả các yêu cầu tiềm năng.
* Quan sát thời gian hiệu quả để tìm nạp các bản ghi khác nhau.
* Công cụ Load test là  load runner, win runner và  JMeter.

# Stress testing

Stress testing kiểm thử ứng dụng với rất nhiều công việc đến khi nào hệ thống không chạy thành công nữa. Điều này giúp xác định breakdown points của hệ thống.

Công cụ kiểm tra: load runner, win runner và JMeter.

Các vấn đề thường xảy ra nhất trong khi kiểm thử:

* Một lượng đáng kể chi phí có thể được tham gia để xác định trạng thái của các giao dịch cơ sở dữ liệu.
=> Giải pháp: Việc lập kế hoạch tổng thể và thời gian nên được tổ chức để không có vấn đề thời gian và chi phí nào xuất hiện.
* Dữ liệu thử nghiệm mới phải được thiết kế sau khi làm sạch dữ liệu thử nghiệm cũ.
=> Giải pháp: Một kế hoạch và phương pháp trước cho việc tạo dữ liệu thử nghiệm phải ở trong tầm tay.
* Cần có trình tạo SQL để chuyển đổi trình xác nhận hợp lệ SQL để đảm bảo các truy vấn SQL thích hợp để xử lý các trường hợp kiểm tra cơ sở dữ liệu cần thiết.
=> Giải pháp: Bảo trì các truy vấn SQL và cập nhật liên tục của chúng là một phần quan trọng của quá trình thử nghiệm tổng thể, nên là một phần của chiến lược thử nghiệm tổng thể.
* Điều kiện tiên quyết được đề cập ở trên đảm bảo rằng việc thiết lập quy trình thử nghiệm cơ sở dữ liệu có thể tốn kém cũng như tốn thời gian.
=> Giải pháp: Cần có sự cân bằng giữa chất lượng và thời gian biểu của dự án tổng thể.

Nguồn: https://www.guru99.com/data-testing.html