## A. Web Application
### 1. Web Application là gì ?
![](https://images.viblo.asia/aa9a399a-9cd8-4c81-adb2-bb8a2b66cd36.png)

- Web application là một phần của phần mềm có thể được truy cập bởi trình duyệt. Nói cách khác web application là website có chức năng và các yếu tố tương tác.
- Với WebApp người dùng không chỉ xem nội dung trên trang mà còn thao tác dữ liệu.
- WebApp cần xác thực vì chúng cung cấp phạm vi tuỳ chọn và chức năng/ tương tác rộng hơn nhiều so với một trang web. Điều này có nghĩa là bạn phải có tên người dùng và mật khẩu để truy cập vào tài khoản của mình.
- Một số các webApp phổ biến như Facebook, Twitter, Gmail, Youtube...
### 2. Web Application Testing
- Web Application Testing là quá trình kiểm thử ứng dụng web để tìm kiếm các lỗi tìm ẩn trước khi đưa sản phẩm ra thị trường.
- Web testing bao gồm kiểm thử chức năng, khả năng sử dụng, bảo mật, khả năng tương thích, hiệu suất.
## B. Một số trường hợp kiểm thử cho webApp
### 1. Usability testing
![](https://images.viblo.asia/0893e503-6cc9-4824-8cf5-b66d2ff7725d.png)

Kiểm thử khả năng sử dụng thuộc non-functional testing, nhằm đánh giá sản phẩm về mặt thiết kế, tính trực quan và tương tác (mức độ dễ sử dụng) của người dùng.

**Checklist**
* Nội dung trang web phải đúng chính tả, ngữ pháp câu, ngôn ngữ sử dụng
* Tất cả các font chữ phải được hiển thị đúng theo design
* Vị trí căn lề ở các đoạn văn, câu văn đều phải đúng design
* Thông báo lỗi đúng chính tả, ngữ pháp và hiển thị ở vị trí tương ứng với từng mục.
* Tooltip hiển thị tương ứng cho từng mục khi hover vào
* Các fields nên được căn chỉnh đều nhau
* Có khoảng cách giữa vị trí hiển thị các mục, cột, hàng và thông báo lỗi.
* Các button nên được dùng chung format và size theo chuẩn chung
* Nên hiển thị Home link ở mỗi page của web
* Các field hiển thị dạng disable nên được gray-out
* Kiểm tra hiển thị của các link quá dài hoặc hình ảnh lớn
* Nên hiển thị thông báo xác nhận cho mỗi hành động update/ delete
* Resolution của web khi hiển thị trên nhiều loại kích cỡ màn hình (640x480, 600x800 etc...)
* Người dùng có thể sử dụng hệ thống mà không gặp tình trạng thất bại
* Các tab trong web có hoạt động bình thường khi chuyển tab
* Hiển thị thanh cuộn đối với các loại danh sách, màn hình nhiều thông tin
* Phải có tiêu đề cho mỗi page
* Có thể sử dụng các phím chức năng của keyboard để tương tác lên các loại field như textbox, dropdown, radio button, etc.
* Các data dài không bị truncated (có thể đặt dấu [...] cuối dòng hoặc break-line) nếu vượt quá field size
* Các link nên được hiển thị theo màu sắc, có thể click theo dạng hyperlink
* Hiển thị loading icon trong các trường hợp chờ phản hồi (load dữ liệu, thực hiện action,...)
* Con trỏ chuột (cursor) được hiển thị kiểu tương ứng với các action khác nhau (text, wait, click, move, not allowed, etc...)
### 2. Functional testing
Kiểm thử chức năng được sử dụng để kiểm tra tính năng và hành vi hoạt động nhằm đảm bảo sản phẩm tương ứng với yêu cầu đặc tả của nó. 

Kiểm thử chức năng tập trung vào đầu ra đối với mỗi đầu vào tương ứng và điều kiện thực thi đã chọn.

**Checklist:**
* Tất cả các field nhập data phải được validate
* Dấu hoa thị phải được hiển thị ở các field bắt buộc
* Hệ thống không hiển thị thông báo lỗi bắt buộc cho các field optional
* Đối với các năm nhuận phải được xác thực chính xác, không bị lỗi tính toán
* Các field nhập số phải bắt lỗi cho các trường hợp nhập chữ cái và phải define thông báo lỗi tương ứng.
* Các giá trị về số tiền phải được hiển thị đúng format của tiền tệ
* Kiểm tra trường hợp nhập các ký tự đặc biệt cho tất cả các field input data
* Kiểm tra Timeout cho các chức năng tương ứng nếu có
* Chức năng sắp xếp đối với danh sách, hiển thị data
* Chức năng/ chuyển trang của các button
* "Chính sách bảo mật" và "Câu hỏi thường gặp", phải được định nghĩa rõ ràng cho người dùng
* Hệ thống chuyển đến trang lỗi khi có bất kỳ sự cố, lỗi trong lúc sử dụng
* Tất cả các loại tài liệu được upload lên phải được mở đúng cách ( xem trực tiếp image, pdf được mở trên tab mới, download đối với các file khác,...)
* Người dùng có thể download được files đã upload (tuỳ theo chức năng, phân quyền)
* Kiểm tra chức năng gửi, nhận mail của hệ thống
* Kiểm tra phản hồi của web khi người dùng xoá cookies khi đang và sau khi sử dụng web.
* Danh sách các data trong các mục combo box/ list box nên được sắp xếp theo thứ tự thời gian chọn (hoặc theo yêu cầu đặc tả)
### 3. Compatibility testing
![](https://images.viblo.asia/60de8138-8b6e-4d30-9655-05f7f34a7af9.jpeg)

Kiểm thử khả năng tương thích thuộc non-functional testing. Được sử dụng để kiểm tra liệu rằng phần mềm có tương thích trên nhiều hệ thống vận hành (browser, OS, hardware) khác nhau hay không.

**Checklist:**
* WebApp hiển thị và vận hành đúng chức năng trên nhiều browser khác nhau (IE, Firefox, Chrome, Safari và Opera)
* HTML version của phần mềm có tương thích với HTML version của browser hay không
* Hình ảnh hiển thị đúng khi mở trên các browser khác nhau
* Fonts hiển thị đúng trên các browser khác nhau
* JS code có thể được sử dụng trên nhiều browser khác nhau
* Hiển thị các hình ảnh động trên nhiều browser khác nhau
### 4. Database testing
Kiểm thử cơ sở dữ liệu được thực hiện để kiểm tra việc lưu trữ và hiển thị data lên web phải chính xác.

**Checklist:**
* Tên của cơ sở dữ liệu phải đúng với yêu cầu đặc tả
* Các table/ column có tên, loại và giá trị default phải đúng với yêu cầu đặc tả
* Giá trị của các cột có cho phép rỗng hay không
* Xác minh khoá chính, khoá phụ của mỗi table
* Xác minh các thông tin của Stored Procedure: 
    * Stored Procedure đã được cài đặt hay chưa
    * Tên của Stored Procedure
    * Tên, loại và số lượng Parameters
    * Parameter có bắt buộc hay không 
    * Xác minh Store Procedure bằng cách xoá một số tham số
    * Xác minh khi ouput là 0 thì các bảng ghi có giá trị bằng 0 sẽ bị ảnh hưởng
    * Xác minh Stored Procedure được viết bằng truy vấn SQL đơn giản
    * Xác minh Stored Procedure có trả về giá trị
    * Xác minh Stored Procedure với các giá trị nhập vào
*   Hành vi của mỗi flag trong các bảng
*   Data được lấy và lưu vào đúng các table sau khi người dùng submit trên web
*   Xác minh dữ liệu sau mỗi DML action (update, delete, insert)
*   Kiểm tra độ dài của mỗi field phải tương thích giữa backend và front end
*   Tên cơ sở dữ liệu của môi trường QA, UAT và Production phải là duy nhất
*   Xác minh việc mã hoá dữ liệu nhạy cảm khi lưu vào database
*   Xác minh database size và thời gian phản hồi đối với mỗi câu lệnh
*   Xác minh dữ liệu hiển thị lên web phải chính xác với dữ liệu được lưu ở database
*   Xác minh validate khi insert dữ liệu không hợp lệ vào database
*   Xác minh các Triggers
### 5. Security testing
Kiểm thử bảo mật liên quan đến việc kiểm tra để xác định bất kỳ sai sót và lỗ hỏng nào theo quan điểm bảo mật.

**Checklist**
* Đối với trang web có chứa các data quan trọng như password, creadit card, câu trả lời bí mật,... phải được submit thông qua HTTPS (SSL)
* Các thông tin quan trọng như password, số creadit card phải hiển thị dạng đã được mã hoá
* Quy tắc mật khẩu phải được thực hiện cho tất cả các trang về authentication như Đăng ký, Quên mật khẩu, Thay đổi mật khẩu.
* Nếu mật khẩu đã được thay đổi, người dùng không thể login với mật khẩu cũ.
* Các thông báo lỗi không nên hiển thị đi kèm với các thông tin quan trọng
* Nếu đã đăng xuất khỏi hệ thống hoặc hết hạn session, người dùng không thể truy cập vào site
* Kiểm tra các phương thức truy cập bảo mật hoặc không bảo mật mà không cần login
* Không nên hiển thị hoặc cho phép truy cập option "View source code" trên giao diện người dùng
* Tài khoản nên được khoá nếu người dùng nhập sai mật khẩu nhiều lần
* Không cho phép cookies lưu trữ mật khẩu
* Trong trường hợp các chức năng không hoạt động, đảm bảo rằng hệ thống không hiển thị các application, server hay thông tin database mà nên đưa về trang lỗi.
* Kiểm tra các trường hợp tấn công bởi SQL injection
* Kiểm tra người dùng truy cập vào hệ thống tương ứng với role (ví dụ: User không được truy cập vào admin page)
* Các hành động quan trọng nên được ghi log và có đầy đủ thông tin để có thể truy xuất
* Các giá trị của session phải được mã hoá ở thanh địa chỉ
* Thông tin cookie phải được lưu trữ ở dạng mã hoá
* Thử nghiệm với các cuộc tấn công Brute Force (đoán account login)
### 6. Perfomance testing
![](https://images.viblo.asia/35bebb1a-18b5-4241-ae69-b808066d25d5.jpeg)

Performance testing được sử dụng để kiểm tra hệ thống hoặc từng chức năng riêng đạt được các yêu cầu đặc tả về hiệu suất.
- **Mục đích**
    - Kiểm tra được "bottleneck" của hệ thống và cấu trúc hạ tầng
    - Kiểm tra nếu sử dụng version mới của phần mềm có làm ảnh hưởng đến thời gian phản hồi của hệ thống hay không
    - Đánh giá sản phẩm hay phần cứng để biết nó có thể đảm bảo được số lượng tải của dự án
- **Một số tool dùng để do hiệu suất**
    - Apache JMeter
    - Load Runner
    - Borland Silk Performer
    - Rational Performance Tester
    - WAPT
    - NEO load
-----
Tài liệu tham khảo
1. https://www.guru99.com/complete-web-application-testing-checklist.html
2. https://www.guru99.com/difference-web-application-website.html