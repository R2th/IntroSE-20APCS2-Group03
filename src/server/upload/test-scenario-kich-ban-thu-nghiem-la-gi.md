# Kịch bản thử nghiệm là gì?
Một kịch bản thử nghiệm được định nghĩa là bất kỳ chức năng nào cũng có thể được kiểm tra. Nó cũng được gọi là Điều kiện thử nghiệm hoặc Khả năng thử nghiệm. Là người thử nghiệm, bạn có thể đặt mình là người dùng cuối và tìm ra các tình huống trong thế giới thực và các trường hợp sử dụng của Ứng dụng đang được Thử nghiệm.

# Kiểm tra kịch bản là gì?
Kiểm tra kịch bản là một biến thể của Kiểm thử phần mềm trong đó Kịch bản được sử dụng để kiểm tra. Các kịch bản giúp chúng ta kiểm tra các hệ thống phức tạp hơn theo cách dễ dàng hơn.

# Tại sao phải tạo Kịch bản thử nghiệm?
Kịch bản thử nghiệm được tạo ra vì những lý do sau đây,

* Tạo các kịch bản thử nghiệm đảm bảo phạm vi kiểm tra hoàn thành
* Kịch bản thử nghiệm có thể được phê duyệt bởi các bên liên quan khác nhau như Nhà phân tích kinh doanh, Nhà phát triển, Khách hàng để đảm bảo Ứng dụng được thử nghiệm được kiểm tra kỹ lưỡng. Nó đảm bảo rằng phần mềm đang hoạt động cho các trường hợp sử dụng phổ biến nhất.
* Chúng phục vụ như một công cụ nhanh chóng để xác định nỗ lực làm việc thử nghiệm và theo đó tạo ra một đề xuất cho khách hàng hoặc tổ chức lực lượng lao động.
* Chúng giúp xác định các giao dịch đầu cuối quan trọng nhất hoặc việc sử dụng thực sự của các ứng dụng phần mềm.
* Để nghiên cứu chức năng từ đầu đến cuối của chương trình, Kịch bản thử nghiệm là rất quan trọng.
 
# Khi nào thì không tạo Kịch bản thử nghiệm?
Kịch bản thử nghiệm có thể không được tạo khi

* Ứng dụng đang thử nghiệm rất phức tạp, không ổn định và có một thời gian khủng hoảng trong dự án.
* Các dự án tuân theo Phương pháp Agile như Scrum, Kanban có thể không tạo Kịch bản thử nghiệm.
* Kịch bản thử nghiệm có thể không được tạo để sửa lỗi mới hoặc Kiểm tra hồi quy. Trong các trường hợp như vậy, Kịch bản thử nghiệm phải được ghi lại nhiều trong các chu kỳ thử nghiệm trước đó. Điều này đặc biệt đúng với các dự án bảo trì.

# Cách viết kịch bản kiểm tra
Là người thử nghiệm, bạn có thể làm theo năm bước sau để tạo Kịch bản thử nghiệm:

* Bước 1: Đọc các Tài liệu yêu cầu như BRS, SRS, FRS, của Hệ thống đang thử nghiệm (SUT). Bạn cũng có thể tham khảo các trường hợp sử dụng, sách, hướng dẫn sử dụng, vv của ứng dụng sẽ được kiểm tra.
* Bước 2: Đối với mỗi yêu cầu, hãy tìm ra các hành động và mục tiêu của người dùng có thể. Xác định các khía cạnh kỹ thuật của yêu cầu. Xác định các tình huống có thể xảy ra về lạm dụng hệ thống và đánh giá người dùng với suy nghĩ của hacker.
* Bước 3: Sau khi đọc Tài liệu yêu cầu và thực hiện Phân tích, hãy liệt kê các kịch bản kiểm tra khác nhau để xác minh từng tính năng của phần mềm.
* Bước 4: Khi bạn đã liệt kê tất cả các Kịch bản thử nghiệm có thể, Ma trận truy xuất nguồn gốc được tạo để xác minh rằng mỗi & mọi yêu cầu đều có Kịch bản thử nghiệm tương ứng
* Bước 5: Các kịch bản được tạo ra được xem xét bởi người giám sát của bạn. Sau đó, họ cũng được xem xét bởi các bên liên quan trong dự án.

# Mẹo để tạo kịch bản thử nghiệm
* Mỗi Kịch bản thử nghiệm phải được gắn với tối thiểu một Yêu cầu hoặc Câu chuyện người dùng theo Phương pháp dự án.
* Trước khi tạo Kịch bản thử nghiệm xác minh nhiều Yêu cầu cùng một lúc, hãy đảm bảo bạn có Kịch bản thử nghiệm kiểm tra riêng yêu cầu đó.
* Tránh tạo các Kịch bản kiểm tra quá phức tạp kéo dài nhiều Yêu cầu.
* Số lượng kịch bản có thể lớn và tốn kém để chạy tất cả. Dựa trên các ưu tiên của khách hàng, chỉ chạy các Kịch bản thử nghiệm được chọn

### Ví dụ 1: Kịch bản thử nghiệm cho ứng dụng thương mại điện tử
Đối với Ứng dụng Thương mại Điện tử, một vài kịch bản thử nghiệm sẽ là

**Kiểm tra kịch bản 1**: Kiểm tra chức năng đăng nhập
![](https://images.viblo.asia/1fccc19c-4807-4c52-888f-cb63943194ee.PNG)

Để giúp bạn hiểu về Kịch bản thử nghiệm và Trường hợp thử nghiệm khác nhau, các trường hợp thử nghiệm cụ thể cho Kịch bản thử nghiệm này sẽ là

* Kiểm tra hành vi hệ thống khi nhập email id và mật khẩu hợp lệ.
* Kiểm tra hành vi hệ thống khi nhập email id không hợp lệ và mật khẩu hợp lệ.
* Kiểm tra hành vi hệ thống khi id email hợp lệ và mật khẩu không hợp lệ được nhập.
* Kiểm tra hành vi hệ thống khi nhập email id không hợp lệ và mật khẩu không hợp lệ.
* Kiểm tra hành vi hệ thống khi id email và mật khẩu được để trống và Đăng nhập.
* Kiểm tra Quên mật khẩu của bạn đang hoạt động như mong đợi
* Kiểm tra hành vi hệ thống khi nhập số điện thoại và mật khẩu hợp lệ / không hợp lệ.
* Kiểm tra hành vi hệ thống khi kiểm tra "Keep me signed"

Hiển nhiên, các trường hợp thử nghiệm sẽ cụ thể hơn.

**Kịch bản thử nghiệm 2**: Kiểm tra chức năng tìm kiếm

![](https://images.viblo.asia/da930538-8763-4c61-9fa5-74ed72ce7671.PNG)


**Kịch bản thử nghiệm 3**: Kiểm tra trang Mô tả sản phẩm

![](https://images.viblo.asia/335d62a4-aaa8-48bb-b974-cb6a73abeb8d.PNG)


**Kịch bản thử nghiệm 4**: Kiểm tra chức năng thanh toán

![](https://images.viblo.asia/36ef6bb8-1e37-4a2c-b8cf-2f251693da89.PNG)


**Kịch bản thử nghiệm 5**: Kiểm tra lịch sử đặt hàng

![](https://images.viblo.asia/bbefa9bf-b1af-4241-be49-d0e0cf6630d1.PNG)


Ngoài 5 kịch bản này, đây là danh sách của tất cả các kịch bản khác

* Kiểm tra hành vi Trang chủ để trả lại khách hàng
* Kiểm tra danh mục / trang sản phẩm
* Kiểm tra dịch vụ khách hàng / Trang liên hệ
* Kiểm tra trang Ưu đãi hàng ngày

### Ví dụ 2: Kịch bản thử nghiệm cho một trang web ngân hàng
**Kịch bản thử nghiệm 1**: Kiểm tra chức năng đăng nhập và xác thực

**Kịch bản thử nghiệm 2**: Kiểm tra chuyển tiền có thể được thực hiện

**Kịch bản thử nghiệm 3**: Kiểm tra sao kê tài khoản có thể được xem

**Kịch bản thử nghiệm 4**: Kiểm tra tiền gửi cố định / Tiền gửi định kỳ có thể được tạo

Nguồn: https://www.guru99.com/test-scenario.html