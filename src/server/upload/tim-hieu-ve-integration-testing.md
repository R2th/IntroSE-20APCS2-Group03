# 1. Kiểm thử tích hợp là gì?
INTEGRATION TESTING được định nghĩa là một loại thử nghiệm trong đó các mô-đun phần mềm được tích hợp một cách hợp lý và được thử nghiệm dưới dạng một nhóm. Một dự án phần mềm điển hình bao gồm nhiều mô-đun phần mềm, được mã hóa bởi các lập trình viên khác nhau.
Mục đích của cấp độ kiểm tra này là tìm ra các khiếm khuyết của việc tích hợp các mô-đun phần mềm. Kiểm thử tích hợp tập trung vào kiểm tra giao tiếp dữ liệu giữa các mô-đun. Do đó, nó cũng được gọi là  **'I & T'**  (Integration and Testing),  **'String Testing'** và đôi khi là **'Thread Testing'**.

# 2. Tại sao phải kiểm tra tích hợp?
![](https://images.viblo.asia/9102b358-f27f-4ce7-8592-46205af6b785.png)

Mặc dù mỗi mô-đun phần mềm được unit test nhưng lỗi vẫn tồn tại vì nhiều lý do như:

* Một Module, nói chung, được thiết kế bởi một người lập trình viên nên sự hiểu biết và logic lập trình có thể khác với các lập trình viên khác. Kiểm thử tích hợp trở nên cần thiết để xác minh các mô-đun phần mềm hoạt động đồng nhất vơi nhau
* Tại thời điểm phát triển mô-đun, có thể nhận nhiều yêu cầu thay đổi từ khách hàng. Các yêu cầu mới này có thể không được kiểm tra đơn vị do đó Kiểm thử tích hợp hệ thống trở nên cần thiết.
* Giao diệN các mô-đun phần mềm với cơ sở dữ liệu có thể bị lỗi
* Giao diện phần cứng bên ngoài, nếu có, có thể bị lỗi
* Xử lý ngoại lệ không đầy đủ có thể gây ra vấn đề.

# 3. Ví dụ về trường hợp kiểm thử tích hợp
Integration Test khác với các trường hợp thử nghiệm khác nó tập trung chủ yếu vào các giao diện & luồng dữ liệu / thông tin giữa các mô-đun . Ở đây ưu tiên việc kiểm thử các liên kết tích hợp thay vì các chức năng đơn vị đã được thử nghiệm.

Ví dụ: 
Ứng dụng có 3 mô-đun **'Trang đăng nhập'**, **'Hộp thư'** và **'Xóa email'**  mỗi mô-đun được tích hợp một cách hợp lý.

Ở đây không tập trung nhiều vào kiểm tra Trang đăng nhập vì nó đã được thực hiện trong Kiểm tra đơn vị . Nhưng hãy kiểm tra xem nó được liên kết với Trang Hộp thư như thế nào.
Tương tự Hộp thư: Kiểm tra sự tích hợp của nó với Mô-đun Xóa Thư.


| ID 1 | Mục tiêu kiểm thử | Mô tả trường hợp kiểm thử |Kết quả mong đợi |
| -------- | -------- | -------- |-------- |
| 1     | Kiểm tra liên kết giữa mô-đun Đăng nhập và Hộp thư     | Nhập thông tin đăng nhập và nhấp vào nút Đăng nhập	     |Để được chuyển đến Hộp thư|
| 2     | Kiểm tra liên kết giữa Hộp thư và Xóa Thư     | Từ Hộp thư chọn email và nhấp vào nút xóa	     |Email đã chọn sẽ xuất hiện trong thư mục Đã xóa / Thùng rác|

# 4. Phương pháp tiếp cận, chiến lược, phương pháp kiểm tra tích hợp
Kỹ thuật phần mềm xác định nhiều chiến lược để thực hiện Kiểm thử tích hợp

 Cách tiếp cận Big Bang:
 Cách tiếp cận tăng dần: được chia thành các cách sau
    *  Cách tiếp cận từ trên xuống
    *  Cách tiếp cận từ dưới lên
    *  Cách tiếp cận bánh sandwich - Kết hợp từ trên xuống và từ dưới lên
Dưới đây là các chiến lược khác nhau, cách chúng được thực hiện và những hạn chế cũng như những lợi thế của chúng.

## 4.1 Cách tiếp cận Big Bang:
Ở đây tất cả các thành phần được tích hợp với nhau cùng một lúc và sau đó được kiểm thử.

**Ưu điểm:**
* Thuận tiện cho các hệ thống nhỏ, dễ dàng phát hiện nguyên nhân

**Nhược điểm:**
* Khó xác định được lỗi thuộc mô dun nào
* Với số lượng giao diện cần được kiểm tra theo phương pháp này, một số liên kết giao diện cần kiểm tra có thể bị missed.
* Vì thử nghiệm Tích hợp chỉ có thể bắt đầu sau khi "tất cả" các mô-đun được thiết kế, nên nhóm thử nghiệm sẽ có ít thời gian thực hiện hơn trong giai đoạn thử nghiệm.
* Vì tất cả các mô-đun được kiểm tra cùng một lúc, các mô-đun quan trọng có rủi ro cao bị cô lập và không được ưu tiên kiểm tra.

## 4.2 Cách tiếp cận gia tăng
Trong phương pháp này, kiểm tra được thực hiện bằng cách nối hai hoặc nhiều mô-đun có liên quan đến logic . Sau đó, các mô-đun liên quan khác được thêm vào và kiểm tra chức năng thích hợp. Quá trình tiếp tục cho đến khi tất cả các mô-đun được tham gia và thử nghiệm thành công.

Cách tiếp cận tăng dần, lần lượt, được thực hiện bởi hai Phương pháp khác nhau:
* Từ dưới lên
* Từ trên xuống

## 4.3 Tích hợp từ dưới lên
Trong chiến lược từ dưới lên, mỗi mô-đun ở các cấp thấp hơn được kiểm tra với các mô-đun cao hơn cho đến khi tất cả các mô-đun được kiểm tra. Nó cần sự giúp đỡ của drivers tesing

![](https://images.viblo.asia/ed0d96f9-2809-4b6c-949b-10e5913e4fb9.png)

**Ưu điểm:**
* Phạm vi lỗi đươc thu hẹp.
* Thời gian không bị lãng phí không phải chờ đợi tất cả các mô-đun được phát triển hoàn thành để ghép lại với nhau 

**Nhược điểm:**
* Các mô-đun quan trọng (ở cấp cao nhất của kiến trúc phần mềm) có thể dễ bị lỗi.
* Không thể giữ được bản nguyên mẫu ban đầu

## 4.4 Tích hợp từ trên xuống:
Trong cách tiếp cận từ trên xuống, kiểm tra diễn ra từ trên xuống dưới theo luồng điều khiển của hệ thống phần mềm.

![](https://images.viblo.asia/5f43c1bb-7f5c-4b8e-85da-5281ec6a2691.png)

**Ưu điểm:**
* Phạm vi lỗi được thu hẹp.
* Bản mẫu được tích hợp gần giống với thực tế.
* Các mô-đun quan trọng được thử nghiệm ưu tiên các lỗi thiết kế có thể được tìm thấy sớm.

**Nhược điểm:**
* Cần nhiều Stub.
* Các mô-đun ở mức thấp hơn được kiểm tra không đầy đủ.

## 4.5 Tích hợp lai / Sandwich
Trong chiến lược sandwich / hybrid là sự kết hợp của phương pháp Top Down và bottom up. Ở đây, các mô-đun hàng đầu được kiểm tra với các mô-đun thấp hơn đồng thời các mô-đun thấp hơn được tích hợp với các mô-đun hàng đầu và được thử nghiệm.

![](https://images.viblo.asia/dc492b8b-a9d9-4d0d-8a79-ff3c863e90d5.png)

# 5. Làm thế nào để kiểm tra tích hợp?
Quy trình để kiểm thử tích hợp:

1. Lên plan kiểm thứ
2. Thiết kế các kịch bản thử nghiệm, trường hợp và kịch bản.
3. Thực hiện kiểm thử và báo cáo các lỗi gặp phải.
4. Theo dõi & kiểm tra lại các lỗi.
5. Bước 3 và 4 được lặp lại cho đến khi hệ thống được kiểm thử hoàn chỉnh.

# 6. Mô tả tóm tắt về kế hoạch kiểm tra tích hợp:
Nó bao gồm các thuộc tính sau:

* Phương pháp / Phương pháp kiểm tra (như đã thảo luận ở trên).
* Phạm vi và các phạm vi của phạm vi kiểm tra tích hợp.
* Vai trò và trách nhiệm.
* Điều kiện tiên quyết để thử nghiệm tích hợp.
* Môi trường thử nghiệm.
* Kế hoạch rủi ro và giảm thiểu.

#  7. Tiêu chí đánh giá đầu vào, đầu ra của kiểm thử tích hợp

**Tiêu chí đầu vào:**
* Kiểm thử tất cả các mô-đun
* Tất cả các lỗi ưu tiên cao phải được sửa và close
* Tất cả các Mô-đun được code hoàn chỉnh và tích hợp thành công.
* Plan kiểm thử, các case thử nghiệm, các kịch bản sẽ được thống nhất và ghi lại.
* Thiết lập môi trường test cho kiểm thử tích hợp

**Tiêu chí đầu ra:**
* Hoàn thành việc kiểm thử tích hợp.
* Các trường hợp thử nghiệm được thực hiện được ghi lại
* Tất cả các lỗi ưu tiên cao đã được sửa và đóng
* Đưa ra tài liệu kiểm thử để đánh giá chuẩn bị cho việc release.

# 8. Thực tiễn / Hướng dẫn kiểm tra tích hợp
* Đầu tiên, xác định Chiến lược kiểm thử tích hợp sau đó chuẩn bị các trường hợp kiểm thử và dữ liệu kiểm thử cho phù hợp.
* Nghiên cứu thiết kế Kiến trúc của Ứng dụng và xác định các Mô-đun quan trọng. Những điều này cần phải được kiểm tra ưu tiên.
* Kiểm tra xác minh chi tiết tất cả các giao diện. Giao diện với cơ sở dữ liệu / ứng dụng phần cứng / phần mềm bên ngoài phải được kiểm tra chi tiết.
* Dữ liệu thử nghiệm đóng vai trò quan trọng.
* Luôn chuẩn bị data gần với data thật để thử nghiệm hiệu quả


Nguồn tài liệu: https://www.guru99.com/integration-testing.html