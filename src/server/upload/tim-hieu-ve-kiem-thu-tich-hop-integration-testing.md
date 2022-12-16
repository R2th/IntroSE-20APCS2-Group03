# A. Kiểm thử tích hợp là gì?
## 1. Định nghĩa
KIỂM THỬ TÍCH HỢP được định nghĩa là một loại kiểm thử trong đó các mô-đun (modules) phần mềm được tích hợp một cách hợp lý và được thử nghiệm dưới dạng một nhóm. Một dự án phần mềm điển hình bao gồm nhiều mô-đun phần mềm, được mã hóa bởi các lập trình viên khác nhau. Mục đích của cấp độ kiểm tra này là để lộ ra các khiếm khuyết (lỗi) trong tương tác giữa các mô-đun phần mềm khi chúng được tích hợp với nhau.

Kiểm thử tích hợp tập trung vào kiểm tra giao tiếp dữ liệu giữa các mô-đun. Do đó, nó cũng được gọi là 'I & T' (Tích hợp và Kiểm tra), 'Kiểm tra chuỗi' và đôi khi là 'Kiểm tra luồng'.

## 2. Tại sao phải kiểm tra tích hợp?
![](https://images.viblo.asia/db7589cc-5c77-4526-ab29-a721545373c8.png)
Mặc dù từng mô-đun phần mềm sẽ được Unit Test (kiểm thử đơn vị), nhưng lỗi vẫn sẽ tồn tại vì nhiều lý do như:
- Một mô-đun, nhìn chung, được thiết kế bởi một nhà phát triển phần mềm độc lập mà có sự hiểu biết và lập trình logic có thể khác với các lập trình viên khác. Kiểm thử tích hợp là cần thiết để xác minh các mô-đun phần mềm hoạt động cùng nhau một cách nhất quán.
- Tại thời điểm phát triển mô-đun, sẽ có nhiều lúc khách hàng đưa ra những thay đổi về yêu cầu. Các yêu cầu mới này có thể sẽ không được Unit Test (kiểm thử đơn vị) và do đó Kiểm thử tích hợp hệ thống trở nên cần thiết.
- Các giao diện của các mô-đun phần mềm cùng với cơ sở dữ liệu có thể sẽ bị lỗi
- Giao diện phần cứng bên ngoài, nếu có, có thể bị lỗi
- Xử lý những trường hợp ngoại lệ một cách không phù hợp có thể gây ra các vấn đề khác

## 3. Ví dụ về trường hợp kiểm thử tích hợp
Test cases của Kiểm thử tích hợp cũng khác so với các loại kiểm thử khác trên phương diện là nó tập trung chủ yếu vào các giao diện & luồng dữ liệu / thông tin giữa các mô-đun. Các liên kết tích hợp được ưu tiên để đưa ra thay vì các chức năng đơn vị mà đã được kiểm thử.

Test cases mẫu cho việc Kiểm thử tích hợp sẽ đi theo các kịch bản sau: Ứng dụng mà có 3 mô-đun 'Trang đăng nhập', 'Hộp thư' và 'Xóa email' và mỗi mô-đun được tích hợp một cách hợp lý.

Ở đây không tập trung nhiều vào kiểm tra Trang đăng nhập vì nó đã được thực hiện trong Unit Test (kiểm thử đơn vị). Nhưng hãy kiểm tra xem nó được liên kết với Trang Hộp thư như thế nào.

Tương tự với Hộp thư: Kiểm tra sự tích hợp của nó với Mô-đun Xóa Thư.
![](https://images.viblo.asia/0165b65e-f5de-4b10-a5b5-409700a086bb.PNG)


# B. Các phương pháp kiểm tra tích hợp

Các kỹ sư phần mềm có thể xác định các chiến lược để thực hiện Kiểm thử tích hợp như:

## 1. Phương pháp Big Bang:
Theo cách này, tất cả các thành phần được tích hợp với nhau cùng một lúc và sau đó được kiểm thử.

*Ưu điểm: Thuận tiện cho các hệ thống nhỏ.

*Nhược điểm:
- Kiểm tra lỗi nội địa hóa (Localization) là một thử thách.
- Có nhiều lỗi về giao diện cần được kiểm thử theo phương pháp này, một số liên kết giao diện cần kiểm thử có thể dễ dàng bị bỏ qua.
- Vì Kiểm thử Tích hợp chỉ có thể bắt đầu sau khi "tất cả" các mô-đun được thiết kế, nên nhóm thử nghiệm sẽ có ít thời gian thực hiện hơn trong giai đoạn thử nghiệm.
- Vì tất cả các mô-đun được kiểm tra cùng một lúc, các mô-đun quan trọng có rủi ro cao không được ưu tiên hay kiểm tra riêng. Các mô-đun ngoại vi liên quan đến giao diện người dùng cũng không được ưu tiên hay kiểm tra riêng.

## 2. Phương pháp gia tăng:
Trong phương pháp này, thực hiện kiểm thử bằng cách nối hai hoặc nhiều mô-đun có liên quan đến logic. Sau đó, các mô-đun liên quan khác được thêm vào và được kiểm tra chức năng thích hợp. Quá trình tiếp tục cho đến khi tất cả các mô-đun được tham gia và kiểm thử thành công.
Cách tiếp cận gia tăng được thực hiện bởi hai Phương pháp khác nhau:
- Phương pháp Bottom up
- Phương pháp Top Down
- Phương pháp Sandwich - Kết hợp từ trên xuống và từ dưới lên

### 2.1. Stub và Driver là gì?
Phương pháp tiếp cận gia tăng được thực hiện bằng cách sử dụng các chương trình giả có tên là Stub và Driver. Stub và Driver không thực hiện toàn bộ logic lập trình của mô-đun phần mềm mà chỉ mô phỏng giao tiếp dữ liệu bằng cách gọi module.

Stub: Được gọi bởi Mô-đun đang được kiểm thử.
Driver: Gọi Mô-đun để được kiểm tra.

### 2.2. Phương pháp Bottom up:
Trong Phương pháp Bottom up, mỗi mô-đun ở các cấp thấp hơn được kiểm tra với các mô-đun cao hơn cho đến khi tất cả các mô-đun được kiểm tra. Lúc này, sẽ cần tới sự hỗ trợ của Driver trong việc kiểm thử.

Biểu đồ biểu diễn:
![](https://images.viblo.asia/2df3af49-9134-4947-8358-548ba291709c.png)
*Ưu điểm:
- Việc tìm kiếm bug trong từng module riêng biệt là một thử thách.
- Không có thời gian bị lãng phí khi chờ đợi tất cả các mô-đun được phát triển (không giống như phương pháp Big-bang)

*Nhược điểm:
- Các mô-đun quan trọng (ở cấp cao nhất của kiến trúc phần mềm) mà kiểm soát luồng ứng dụng được kiểm tra cuối cùng và có thể dễ bị lỗi.
- Xây dựng một bản mẫu (prototype) ngay từ ban đầu - là một điều không thể 

### 2.3. Phương pháp Top Down:
Trong Phương pháp Top Down, việc kiểm thử diễn ra từ trên xuống dưới theo luồng điều khiển của hệ thống phần mềm. Lúc này, sẽ cần tới sự hỗ trợ của Stubs trong việc kiểm thử.

Biểu đồ biểu diễn:
![](https://images.viblo.asia/28d23082-e6c8-42cd-b3cb-bfd23a54b302.png)
*Ưu điểm:

- Việc tìm kiếm bug trong từng module riêng biệt trở nên dễ dàng hơn
- Xây dựng một bản mẫu (prototype) ngay từ ban đầu là có thể
- Các mô-đun quan trọng được kiểm thử ưu tiên; lỗi thiết kế chính có thể được tìm thấy và sửa chữa trước

*Nhược điểm:
- Cần nhiều Stubs.
- Các mô-đun ở mức thấp hơn được kiểm thử không đầy đủ.

### 2.4. Phương pháp Sandwich
Phương pháp sandwich / hybrid là sự kết hợp của phương pháp Top Down và bottom up. Ở đây, các mô-đun hàng đầu được kiểm tra với các mô-đun thấp hơn đồng thời các mô-đun thấp hơn được tích hợp với các mô-đun hàng đầu và được kiểm thử. Chiến lược này sử dụng cả Stubs cũng như Drivers.
![](https://images.viblo.asia/e0103cf2-eeed-4055-bcfb-86d61cc854d7.png)

# C. Làm thế nào để kiểm thử tích hợp?
Quy trình kiểm thử tích hợp bất kể chiến lược kiểm thử phần mềm (đã thảo luận ở trên):
- Chuẩn bị kế hoạch kiểm tra tích hợp
- Thiết kế các kịch bản thử nghiệm, các trường hợp test và scripts
- Thực hiện các trường hợp kiểm thử tiếp theo bằng cách báo cáo các lỗi
- Theo dõi & kiểm tra lại các lỗi
- Bước 3 và 4 được lặp lại cho đến khi hoàn thành Tích hợp thành công.

## 1. Mô tả tóm tắt về kế hoạch kiểm thử tích hợp:
Nó bao gồm các thuộc tính sau:
- Phương pháp / Phương pháp kiểm tra (như đã thảo luận ở trên).
- Phạm vi và các vùng ngoài phạm vi của kiểm thử tích hợp.
- Vai trò và trách nhiệm.
- Điều kiện tiên quyết để thử nghiệm tích hợp.
- Môi trường thử nghiệm.
- Rủi ro và kế hoạch giảm thiểu rủi ro

## 2. Hướng dẫn kiểm thử tích hợp
- Đầu tiên, xác định Chiến lược kiểm thử tích hợp mà có thể được thông qua và sau đó chuẩn bị các Test cases và dữ liệu kiểm thử cho phù hợp.
- Nghiên cứu thiết kế Kiến trúc của Ứng dụng và xác định các Mô-đun quan trọng. Những điều này cần phải được kiểm thử trước tiên.
- Có được các thiết kế giao diện từ nhóm Kiến trúc và tạo các trường hợp thử nghiệm để xác minh chi tiết tất cả các giao diện. Giao diện với cơ sở dữ liệu / ứng dụng phần cứng / phần mềm bên ngoài phải được kiểm tra chi tiết.
- Luôn chuẩn bị mock data trước khi thực hiện test. Không nên chọn dữ liệu kiểm tra trong khi thực hiện các trường hợp kiểm tra.

Nguồn tham khảo: https://www.guru99.com/integration-testing.html