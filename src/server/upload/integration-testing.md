# What is Integration Testing?
Integration Testing được định nghĩa là một kiểu kiểm thử trong đó các mô-đun phần mềm được tích hợp một cách logic và được kiểm tra như một nhóm. Một dự án phần mềm điển hình bao gồm nhiều mô-đun phần mềm, được mã hóa bởi các lập trình viên khác nhau. Mục đích của mức độ kiểm tra này là để lộ ra các khiếm khuyết trong sự tương tác giữa các mô-đun phần mềm này khi chúng được tích hợp
Kiểm thử tích hợp tập trung vào việc kiểm tra giao tiếp dữ liệu giữa các mô-đun này. Do đó, nó còn được gọi là 'I & T' (Tích hợp và thử nghiệm), 'Kiểm tra chuỗi' và đôi khi là 'Kiểm tra luồng'.
# Why do Integration Testing?
![](https://images.viblo.asia/70674909-4b43-4313-84d4-d2adcabf758e.png)
Mặc dù mỗi mô-đun phần mềm đều được kiểm tra đơn vị, nhưng các lỗi vẫn tồn tại vì nhiều lý do như:

* Một Mô-đun được thiết kế bởi một nhà phát triển phần mềm cá nhân mà sự hiểu biết và logic lập trình có thể khác với các lập trình viên khác. Kiểm thử tích hợp trở nên cần thiết để xác minh các mô-đun phần mềm hoạt động thống nhất
* Tại thời điểm phát triển mô-đun, có rất nhiều cơ hội thay đổi các yêu cầu của khách hàng. Các yêu cầu mới này có thể không được kiểm thử đơn vị và do đó việc kiểm tra tích hợp hệ thống trở nên cần thiết.
* Giao diện của các mô-đun phần mềm với cơ sở dữ liệu có thể bị lỗi
* Các giao diện phần cứng bên ngoài, nếu có, có thể bị lỗi
* Xử lý ngoại lệ không thích hợp có thể gây ra sự cố.
## Example of Integration Test Case
Integration Test Case khác với các trường hợp kiểm thử khác ở chỗ nó tập trung chủ yếu vào các giao diện và luồng dữ liệu / thông tin giữa các mô-đun. Ở đây ưu tiên dành cho các liên kết tích hợp hơn là các chức năng đơn vị đã được thử nghiệm.

Các trường hợp kiểm tra tích hợp mẫu cho trường hợp sau: Ứng dụng có 3 mô-đun nói rằng 'Trang đăng nhập', 'Hộp thư' và 'Xóa email' và mỗi mô-đun được tích hợp một cách hợp lý.

Ở đây không tập trung nhiều vào kiểm tra Trang đăng nhập vì nó đã được thực hiện trong Kiểm thử đơn vị. Nhưng hãy kiểm tra cách nó được liên kết với Trang Hộp thư.

Tương tự Hộp thư: Kiểm tra sự tích hợp của nó với Mô-đun Xóa Thư.

| Test Case ID | Test Case Objective | Test Case Description | Expected Result |
| -------- | -------- | -------- | -------- |
| 1     | Check the interface link between the Login and Mailbox module    | Enter login credentials and click on the Login button     | To be directed to the Mail Box     |
| 2    | Check the interface link between the Mailbox and Delete Mails Module      | From Mailbox select the email and click a delete button    | Selected email should appear in the Deleted/Trash folder      |


## Approaches, Strategies, Methodologies of Integration Testing
Kỹ thuật phần mềm xác định nhiều chiến lược khác nhau để thực hiện kiểm thử Tích hợp, viz.

*   Cách tiếp cận Big Bang:
*   Phương pháp tiếp cận gia tăng: được chia thành nhiều cách sau
      Phương pháp tiếp cận từ trên xuống
      Phương pháp tiếp cận từ dưới lên
      Phương pháp tiếp cận Sandwich - Kết hợp Từ trên xuống và Từ dưới lên
Dưới đây là các chiến lược khác nhau, cách chúng được thực hiện và những hạn chế cũng như ưu điểm của chúng.
### Big Bang Testing
Thử nghiệm Big Bang là một phương pháp thử nghiệm Tích hợp trong đó tất cả các thành phần hoặc mô-đun được tích hợp với nhau cùng một lúc và sau đó được thử nghiệm như một đơn vị. Tập hợp các thành phần kết hợp này được coi là một thực thể trong khi thử nghiệm. Nếu tất cả các thành phần trong đơn vị không được hoàn thành, quá trình tích hợp sẽ không thực thi.

**Ưu điểm:**

* Thuận tiện cho các hệ thống nhỏ.

**Nhược điểm:**

* Bản địa hóa lỗi rất khó.
* Với số lượng lớn các giao diện cần được kiểm tra trong cách tiếp cận này, một số liên kết giao diện cần được kiểm tra có thể bị bỏ sót một cách dễ dàng.
* Vì thử nghiệm Tích hợp chỉ có thể bắt đầu sau khi "tất cả" các mô-đun được thiết kế, nhóm thử nghiệm sẽ có ít thời gian hơn để thực hiện trong giai đoạn thử nghiệm.
* Vì tất cả các mô-đun đều được kiểm tra cùng một lúc nên các mô-đun quan trọng có rủi ro cao không bị cô lập và được kiểm tra theo thứ tự ưu tiên. Các mô-đun ngoại vi xử lý giao diện người dùng cũng không bị cô lập và được kiểm tra ưu tiên.
### Incremental Testing
Trong phương pháp Thử nghiệm gia tăng, thử nghiệm được thực hiện bằng cách tích hợp hai hoặc nhiều mô-đun có liên quan đến nhau về mặt logic và sau đó được kiểm tra để ứng dụng hoạt động bình thường. Sau đó, các mô-đun liên quan khác được tích hợp từng bước và quá trình tiếp tục cho đến khi tất cả các mô-đun liên quan về mặt logic được tích hợp và thử nghiệm thành công.

Phương pháp Tiếp cận Gia tăng được thực hiện bằng hai Phương pháp khác nhau:

* Từ dưới lên
* Từ trên xuống
### Stubs and Drivers
Stubs và Drivers là các chương trình giả trong kiểm thử Tích hợp được sử dụng để hỗ trợ hoạt động kiểm thử phần mềm. Các chương trình này hoạt động như một sự thay thế cho các mô hình bị thiếu trong thử nghiệm. Chúng không thực hiện toàn bộ logic lập trình của mô-đun phần mềm nhưng chúng mô phỏng giao tiếp dữ liệu với mô-đun gọi trong khi thử nghiệm.

Stub: Được gọi bởi Mô-đun đang Kiểm tra.

Trình điều khiển: Gọi Mô-đun được kiểm tra.
### Bottom-up Integration Testing
**Kiểm tra tích hợp từ dưới lên** là một chiến lược trong đó các mô-đun cấp thấp hơn được kiểm tra trước. Các mô-đun đã thử nghiệm này sau đó được sử dụng thêm để tạo điều kiện thuận lợi cho việc thử nghiệm các mô-đun cấp cao hơn. Quá trình tiếp tục cho đến khi tất cả các mô-đun ở cấp cao nhất được kiểm tra. Khi các mô-đun cấp thấp hơn được kiểm tra và tích hợp, thì các mô-đun cấp tiếp theo sẽ được hình thành.

**Biểu diễn theo sơ đồ:**
![](https://images.viblo.asia/b5b2b09e-932d-48f0-bcb5-c42c7e3acd50.png)
**Ưu điểm:**

* Bản địa hóa lỗi dễ dàng hơn.
* Không lãng phí thời gian khi chờ đợi tất cả các mô-đun được phát triển không giống như cách tiếp cận Big-bang
**Nhược điểm:**

* Các mô-đun quan trọng (ở cấp cao nhất của kiến trúc phần mềm) kiểm soát luồng ứng dụng được kiểm tra lần cuối và có thể dễ bị lỗi.
* Một nguyên mẫu ban đầu là không thể
### Top-down Integration Testing
**Kiểm thử tích hợp từ trên xuống** là một phương pháp trong đó kiểm thử tích hợp diễn ra từ trên xuống dưới theo luồng điều khiển của hệ thống phần mềm. Các mô-đun cấp cao hơn được kiểm tra trước và sau đó các mô-đun cấp thấp hơn được kiểm tra và tích hợp để kiểm tra chức năng phần mềm. Stubs được sử dụng để kiểm tra nếu một số mô-đun chưa sẵn sàng.

**Biểu diễn theo sơ đồ:**
![](https://images.viblo.asia/84ec8a30-e392-4a26-9f7b-46071bd2d41d.png)
**Ưu điểm:**

* Bản địa hóa lỗi dễ dàng hơn.
* Khả năng có được một nguyên mẫu sớm.
* Các Mô-đun quan trọng được kiểm tra theo mức độ ưu tiên; Các lỗi thiết kế lớn có thể được tìm thấy và sửa chữa trước.
**Nhược điểm:**

* Cần nhiều Stub.
* Các mô-đun ở cấp độ thấp hơn được kiểm tra không đầy đủ.
### Sandwich Testing
**Kiểm thử Sandwich** là một chiến lược trong đó các mô-đun cấp cao nhất được kiểm tra với các mô-đun cấp thấp hơn đồng thời các mô-đun thấp hơn được tích hợp với các mô-đun hàng đầu và được kiểm tra như một hệ thống. Nó là sự kết hợp của các cách tiếp cận Từ trên xuống và Từ dưới lên, do đó nó được gọi là Thử nghiệm tích hợp kết hợp. Nó sử dụng cả phần sơ khai cũng như trình điều khiển.
![](https://images.viblo.asia/0c2b63bb-bf7d-43a0-92d6-b545a4c21748.png)

### How to do Integration Testing?
Quy trình kiểm tra tích hợp bất kể chiến lược kiểm thử Phần mềm (đã thảo luận ở trên):

1. Chuẩn bị Kế hoạch Kiểm tra Tích hợp
2. Thiết kế các tình huống, trường hợp và tập lệnh thử nghiệm.
3. Thực hiện các trường hợp kiểm tra sau đó là báo cáo các khiếm khuyết.
4. Theo dõi và kiểm tra lại các khiếm khuyết.
5. Các bước 3 và 4 được lặp lại cho đến khi hoàn thành Tích hợp thành công.
### Brief Description of Integration Test Plans:
Nó bao gồm các thuộc tính sau:

* Phương pháp / Cách tiếp cận để kiểm tra (như đã thảo luận ở trên).
* Phạm vi và Ngoài phạm vi Các mục của Kiểm tra Tích hợp.
* Vai trò và trách nhiệm.
* Điều kiện tiên quyết để kiểm tra Tích hợp.
* Môi trường thử nghiệm.
* Kế hoạch giảm thiểu và rủi ro.
### Entry and Exit Criteria of Integration Testing
Tiêu chí đầu vào và thoát cho giai đoạn thử nghiệm tích hợp trong bất kỳ mô hình phát triển phần mềm nào

**Tiêu chuẩn nhập cảnh:**

* Đơn vị đã kiểm tra các thành phần / mô-đun
* Tất cả các lỗi được ưu tiên cao đã được sửa và đóng
* Tất cả các Mô-đun được hoàn thành mã và tích hợp thành công.
* Kiểm thử tích hợp Lập kế hoạch, trường hợp thử nghiệm, các tình huống được ký kết và lập thành văn bản.
* Môi trường kiểm tra bắt buộc phải được thiết lập để kiểm tra tích hợp
**Tiêu chí thoát:**

* Thử nghiệm thành công ứng dụng tích hợp.
* Các trường hợp thử nghiệm đã thực thi được lập thành tài liệu
* Tất cả các lỗi được ưu tiên cao đã được sửa và đóng
* Các tài liệu kỹ thuật sẽ được nộp sau đó là Ghi chú phát hành.
### Best Practices/ Guidelines for Integration Testing

* Đầu tiên, xác định Chiến lược kiểm tra tích hợp có thể được thông qua và sau đó chuẩn bị các trường hợp kiểm thử và dữ liệu kiểm tra cho phù hợp.
* Nghiên cứu thiết kế Kiến trúc của Ứng dụng và xác định các Mô-đun quan trọng. Những thứ này cần được kiểm tra theo thứ tự ưu tiên.
* Nhận thiết kế giao diện từ nhóm Kiến trúc và tạo các trường hợp thử nghiệm để xác minh chi tiết tất cả các giao diện. Giao diện với cơ sở dữ liệu / ứng dụng phần cứng / phần mềm bên ngoài phải được kiểm tra chi tiết.
* Sau các trường hợp thử nghiệm, dữ liệu thử nghiệm đóng vai trò quan trọng.
* Luôn chuẩn bị sẵn dữ liệu giả trước khi thực thi. Không chọn dữ liệu thử nghiệm trong khi thực hiện các trường hợp thử nghiệm.

Nguồn tham khảo: https://www.guru99.com/integration-testing.html