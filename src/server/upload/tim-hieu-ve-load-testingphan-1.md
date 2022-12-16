Nguồn dịch : https://www.guru99.com/load-testing-tutorial.html

### What is Load Testing?
Load testing là một dạng của Performance Testing, dùng để xác định hiệu suất của hệ thống trong điều kiện tải thực tế. Kiểu kiểm thử này giúp kiểm tra cách ứng dụng sẽ hoạt động khi có nhiều người dùng  đồng thời truy cập vào hệ thống.

![](https://images.viblo.asia/a302c1fc-4cc8-4304-b078-9fe575e93eee.png)

Testing này thường xác định những vấn đề :
- Khả năng hoạt động tối đa của một ứng dụng
- Xác định xem cơ sở hạ tầng hiện tại có đủ đáp ứng cho ứng dụng không
- Tính bền vững của ứng dụng trong điều kiệu tải cao
- Số lượng người dùng đồng thời mà hệ thống có thể đáp ứng, và khả năng mở rộng cho nhiều người dùng hơn
- Đây là một loại thử nghiệm phi chức năng. Load testing thường được sử dụng cho các ứng dụng Client/Server, Web base - cả Intranet và Internet
### Need of Load Testing
Một số trang nổi tiếng đã phải đối mặt với việc bị down trang thực sự nghiêm trọng khi lượng truy cập trở nên rất lớn. Các trang web thương mại điện tử đầu tư mạnh vào các chiến dịch quảng cáo, nhưng lại không chú ý nhiều đến Load Testing để đảm bảo performance của hệ thống, khi các chiến dịch quảng cáo đó mang lại lượng người dùng lớn hơn

Xem xét các ví dụ dưới đây

- Cửa hàng đồ chơi nổi tiếng Toysrus.com, không thể xử lý lưu lượng truy cập tăng lên do chiến dịch quảng cáo của họ dẫn đến mất cả tiền marketing và doanh số bán đồ chơi.
- Trang web của một hãng hàng không không thể xử lý hơn 10000 người dùng trong suốt một lễ hội khuyến mại
- Encyclopedia Britannica cho phép miễn phí truy cập vào cơ sở dữ liệu trực tuyến của họ như là một dịp khuyến mại. Tuy nhiên hệ thống của họ không thể theo kịp với sự tăng lên dữ dội của lưu lượng hàng tuần.

Nhiều trang web bị chậm khi họ gặp phải lưu lượng truy cập lớn. Ví dụ
- Hầu hết người dùng click ra chỗ khác sau 8 giây mà chưa tải được trang
- 4,4 tỷ đô la bị mất hàng năm do hiệu suất kém

### Why Load Testing?
- Load testing đưa ra sự tín nhiệm trong hệ thống và độ tin cậy cũng như hiệu suất của nó
- Giúp xác định các nút thắt trong hệ thống trong trường hợp có lượng lớn người dùng, trước khi nó xuất hiện trên môi trường production.
- Gíup đưa ra một giải pháp bảo vệ tuyệt vời để khắc phục hiệu suất kém và giúp hỗ trợ các chiến lược quản lý hiệu suất và giám sát.
### Goals of Load Testing
Loading testing xác định các vấn đề dưới đây trước khi đưa ứng dụng ra market hoặc Production:
- Thời gian phản hồi cho mỗi giao dịch
- Hiệu suất của các thành phần hệ thống dưới các tải khác nhau
- Hiệu suất của các thành phần cơ sở dữ liệu dưới các tải khác nhau
- Độ trễ mạng giữa client và server
-  Các vấn đề về thiết kế phần mềm
-  Các vấn đề cấu hình máy chủ như Web server, application server, database server ...
-  Các vấn đề giới hạn của phần cứng như CPU maximization, memory limitations, network bottleneck ...

Load testing sẽ xác định xem hệ thống cần được tinh chỉnh hoặc sửa đổi những chỗ nào củaphần cứng, phần mềm để có thể cải thiện được hiệu suất
### Environment needs to be setup before starting the load testing
### 
![](https://images.viblo.asia/742675d8-760b-4323-bffa-78c5189af936.PNG)
### Prerequisites of load testing
Chỉ số chính trong load testing là response time. Trước khi bạn bắt đầu test, bạn cần phải xác định:
-  Response time đã được đo lường và so sánh chưa - Quantitative
-  Response time có được áp dụng cho bussiness process không - Relevant
-  Response time có hợp lý không - Realistic
-  Response time có thể đạt được mức nào đó không - Achievable
-  Response time có thể đo lường được bằng các công cụ hay đồng hồ bấm giờ  - Measurable
### Strategies of load Testing
Có rất nhiều cách để thực hiện load testing. Sau đây là một vài cách : 
- Manual Load Testing: Đây là một trong những chiến lược để thực hiện load testing, nhưng nó không tạo ra kết quả có thể lặp lại được, không thể cung cấp mức độ đo lường hiệu năng trên 1 ứng dụng và là một quá trình không thể điều phối được.
- In house developed load testing tools: Một tổ chức, khi nhận ra tầm quan trọng của load testing, có thể xây dựng các công cụ riêng của họ để thực hiện load testing.
- Open source load testing tools: Có một số công cụ nguồn mở miễn phí có thể dùng để test load. Nếu bạn chỉ có một khoản ngân sách, thì có thể nó sẽ là sự lựa chọn tốt nhất.
- Enterprise class load testing tools: Chúng thường đi kèm với khả năng capture/playback, có khả năng hỗ trợ một số lượng lớn các giao thức,  có thể mô phỏng một số lượng lớn người dùng.
### Load Testing Process
Quá trình Load Testing có thể được mô tả ngắn gọn như dưới đây -
1. Tạo một môi trường chuyên dụng để test
2. Xác định rõ những điều sau
3. Các trường hợp test
4. Xác định các load testing transaction của ứng dụng
- Chuẩn bị dữ liệu cho từng transaction
- Số lượng người dùng truy cập vào hệ thống cần được dự đoán
- Xác định tốc độ kết nối. Một số người dùng có thể được kết nối thông qua các kênh thuê riêng trong khi những người khác có thể sử dụng  dial-up
- Xác định các trình duyệt và hệ điều hành khác nhau được người dùng sử dụng
- Cấu hình của tất cả các server như web, application and DB Servers
5. Thực hiện test và theo dõi. Thu thập các số liệu khác nhau
6. Phân tích kết quả. Đưa ra các đề xuất
7. Tinh chỉnh hệ thống
8. Kiểm tra lại
### Guidelines for load testing
1. Load testing phải được lên kế hoạch mỗi khi ứng dụng ổn định về chức năng.
2. Số lượng lớn dữ liệu unique cần được sẵn sàng trong data pool
3. Số lượng người dùng cần được quyết định cho từng kịch bản hoặc tập lệnh
4. Tránh tạo các bản ghi log để tránh tốn thêm không gian đĩa
5. Cố gắng tránh tải xuống hình ảnh trong trang web
6. Response time nên được được ghi lại và so sánh với các lần chạy thử khác nhau
### Load Testing Tools
Một số tools dùng cho Load Testing bạn có thể tham khảo:
- NeoLoad : https://www.neotys.com/insights/load-testing
- LoadView : https://www.loadview-testing.com/
- Load Runner : https://www.guru99.com/loadrunner-v12-tutorials.html
- WebLOAD : https://www.radview.com/experience-webload/?utm_campaign=experience-webload&utm_medium=load-testing-tutorial&utm_source=guru99

### Advantages and disadvantages of Load testing

Sau đây là những ưu điểm của Load Testing:
- Nhận dạng những nút thắt trước khi cho ra bản production
- Cải thiện khả năng mở rộng của hệ thống
- Giảm thiểu rủi ro liên quan đến system down time
- Giảm chi phí khi bị lỗi
- Tăng sự hài lòng của khách hàng

Nhược điểm của Load Testing:
- Cần có kiến thức về lập trình để sử dụng các công cụ Load Testing.
- Các tools có thể gây tốn kém vì giá cả phụ thuộc vào số lượng người dùng ảo có thể hỗ trợ được

### Conclusion
Load Testing thường cải thiện được hiệu suất khi xảy ra tắc nghẽn, tăng khả năng mở rộng và tính ổn định của ứng dụng trước khi sẵn sàng release. Những bài test này giúp xác định các vấn đề về tắc nghẽn trong hệ thống và xác định khả năng hoạt động tối đa của các ứng dụng.