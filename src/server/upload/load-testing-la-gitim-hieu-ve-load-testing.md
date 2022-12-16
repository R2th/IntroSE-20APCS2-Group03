## 1.Khái niệm về load test
Load testing là một quá trình thêm nhu cầu vào một hệ thống hoặc thiết bị và đo lường phản ứng của nó. Load testing được thực hiện để xác định ứng xử của hệ thống trong các điều kiện tải bình thường và cao hơn điều kiện tải dự kiến. Nó giúp xác định công suất vận hành tối đa của một ứng dụng như các điểm “thắt cổ chai” (bottleneck) và xác định phần tử nào là nguyên nhân gây ra điều đó. Load test được thực hiện vào cuối vòng đời phát triển phần mềm.

## 2.Quy trình để thực hiện load test
![](https://images.viblo.asia/430f71f7-d49b-4ade-ad58-ca8a65e5e903.png)
### 1. Kiểm tra thiết lập môi trường
Trong bước này, môi trường để thực hiện load test được thiết lập. Môi trường thử nghiệm phải được thiết lập càng gần môi trường sản xuất càng tốt về phần cứng, mạng, thông số kỹ thuật phần mềm, v.v.

### 2. Xác định tiêu chí hiệu suất
Chỉ số hiệu suất cho thử nghiệm load test được xác định trong bước này và tiêu chí đánh giá thành công được đưa ra trong bước này. Điều này có thể bao gồm xác định các giới hạn chấp nhận được về thông lượng, thời gian phản hồi, giao dịch, v.v.

### 3. Lập kế hoạch kiểm tra
Nó liên quan đến việc chọn công cụ phù hợp để thực hiện load testing.

### 4. Tạo người dùng ảo (vuser)
Liên quan đến việc tạo các tập lệnh hoặc data để thực hiện load test. Nhiệm vụ được thực hiện bởi những người tham gia có thể được đo lường như các giao dịch.

### 5. Tạo kịch bản
Khi tạo kịch bản trường hợp load test đảm bảo cả hai kịch bản tích cực và tiêu cực đều được thực hiện. Các trường hợp thử nghiệm phải chính xác và có khả năng tìm ra hạn chế của hệ thống.

### 6. Chạy kịch bản
Load testing được mô phỏng bằng cách chạy nhiều data hay người dùng áo để thực hiện các nhiệm vụ cùng một lúc. Trước khi chạy kịch bản, cấu hình kịch bản và lập lịch cần phải được thiết lập. 

### 7. Theo dõi kịch bản
Kịch bản có thể được giám sát bằng cách sử dụng các màn hình trực tuyến Loadrunner như giao dịch thời gian chạy, tài nguyên hệ thống, tài nguyên web, độ trễ mạng, v.v.

### 8. Phân tích kết quả kiểm tra
Đây là bước quan trọng nhất trong quá trình thử tải. Trong bước này, người kiểm tra phân tích các tắc nghẽn hiệu suất bằng cách sử dụng biểu đồ và báo cáo được tạo trong quá trình thực thi kịch bản. Kiểm tra tải có thể phải được lặp lại sau khi khắc phục các sự cố được xác định trong kiểm tra tải.

## 3.Những lý do cho thấy load test là quan trọng
Kiểm tra tải rất quan trọng vì những lý do sau:
![](https://images.viblo.asia/ce7819ee-b0cb-44b5-94c2-d4e26d695dae.png)
### 1. Kiểm tra tải mô phỏng các kịch bản người dùng thực
Trong khi kiểm tra trang web hoặc ứng dụng, load testing giúp mô phỏng cách ứng dụng hoặc trang web sẽ hoạt động nhưn nào khi hàng trăm, hàng ngàn hoặc thậm chí hàng triệu người dùng truy cập vào thời gian thực.

Ứng dụng có thể hoạt động tốt cho một người dùng trong quá trình kiểm tra chức năng nhưng hiệu suất của nó có thể giảm khi nhiều người dùng cố gắng truy cập đồng thời trong quá trình kiểm tra tải do thiếu tài nguyên hệ thống.

Do đó, tốt hơn là tải thử nghiệm để hiểu, phân tích và sửa lỗi trước khi chúng thực sự xảy ra trong thời gian thực.

### 2. Thay đổi code có thể ảnh hưởng đến hiệu suất của ứng dụng
Ngay cả khi load test đã được thực hiện vài tháng trước nhưng nếu code được thay đổi nhiều lần sau đó thì tốt hơn là thực hiện kiểm tra tải lại. Tất cả các thay đổi đã được thực hiện  có thể đã ảnh hưởng đến khả năng xử lý của hệ thống.

### 3. Load test giúp tiết kiệm tiền và gián tiếp tạo doanh thu
Thuê người kiểm tra để thực hiện kiểm tra tải có thể phải chịu thêm chi phí nhưng chi phí sửa chữa một trang web bị sập trong thời gian thực thậm chí còn đắt hơn.

### Tầm quan trọng của kiểm tra tải - Ví dụ
* Target.com đã mất 780.000 đô la doanh số chỉ trong 3 giờ khi trang web ngừng hoạt động trong một chương trình khuyến mãi năm 2015
* Khi máy chủ Amazon.com gặp sự cố vào năm 2013 trong 30 phút, Amazon đã mất 66.240 đô la mỗi phút
* Vào tháng 9 năm 2010, các hãng hàng không Virgin Blue đã trải qua một loạt sự cố ngừng hoạt động trong 11 ngày dẫn đến việc đăng ký, đặt vé trực tuyến, đặt chỗ và hệ thống lên máy bay bị ngừng hoạt động. Điều này dẫn đến việc mất 20 triệu đô la ngoài ra hàng ngàn khách hàng thất vọng. Công ty Navitaire, công ty quản lý đặt chỗ cho Virgin Blue đã phải bồi thường cho Virgin Blue với giá 20 triệu đô la.
* Theo một khảo sát, 75% người dùng nói rằng nếu một trang web bị sập hoặc nếu nó chậm, họ sẽ rời khỏi trang web
* 50% người dùng nói rằng họ sẽ mua sắm ở nơi khác nếu trang web hoặc ứng dụng không tải trong 3 giây
* Như bạn có thể thấy, nhiều người có xu hướng mua sản phẩm trong một sự kiện quảng cáo như Black Friday, Cyber Monday, Diwali hoặc khi có khuyến mại / giảm giá, v.v.
* Nhiều người có xu hướng đặt vé máy bay trong các ngày lễ hoặc vào những ngày mà một hãng hàng không có lời đề nghị
* Nếu trang web của bạn gặp sự cố trong một sự kiện như vậy, khách truy cập có thể rời khỏi trang web của bạn và truy cập trang web của đối thủ cạnh tranh. Điều này có thể dẫn đến mất doanh thu và thị phần.
* Những tình huống như vậy có thể được ngăn chặn bằng cách tải thử nghiệm hệ thống và khắc phục mọi sự cố được phát hiện

### Ưu điểm của kiểm thử tải load testing
* Các vấn đề liên quan đến hiệu suất và tắc nghẽn có thể được xác định trước khi release
* Khả năng mở rộng của hệ thống được cải thiện về cơ sở dữ liệu, phần mềm, mạng, v.v.
* Giảm thiểu rủi ro liên quan đến thời gian ngừng hoạt động của ứng dụng / hệ thống
* Chi phí thất bại giảm và sự hài lòng của khách hàng tăng lên

### Nhược điểm của kiểm thử tải load testing
* Người kiểm thử cần có kiến thức về các công cụ và trong một số trường hợp phức tạp, các ngôn ngữ lập trình để thực hiện kiểm tra load test
* Sẽ mất chi phí đáng kể liên quan đến kiểm tra load test vì các công cụ có thể tốn kém, có kiến thức đặc biệt về các công cụ kiểm tra có thể được yêu cầu

## Một số công cụ dùng cho load test
7 công cụ hỗ trợ kiểm thử load test:

 1. Webload
 2. LoadUI NG Pro
 3. SmartMeter.io
 4. Triscentis Flood
 5. Loadview
 6. Apache Jmeter
 7. HP Loadrunner

Nguồn tài liệu: http://tryqa.com/what-is-load-testing-in-software/