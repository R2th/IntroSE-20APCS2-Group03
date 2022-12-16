### Kiểm thử tích hợp là gì?
- Kiểm thử tích hợp được định nghĩa là một loại kiểm thử trong đó các module phần mềm được tích hợp một cách hợp lý và được kiểm thử dưới dạng một nhóm. Một dự án phần mềm điển hình bao gồm nhiều module phần mềm, được mã hóa bởi các lập trình viên khác nhau. Mục đích của cấp độ kiểm tra này là để phát hiện các defect trong tương tác giữa các module phần mềm này khi chúng được tích hợp.
- Kiểm thử tích hợp tập trung vào kiểm tra giao tiếp dữ liệu giữa các module này.  Do đó, nó được gọi là 'I&T' (Tích hợp và kiểm tra), 'String Testing' (Kiểm tra chuỗi) và đôi khi là 'Thread Testing' (Kiểm tra luồng).
### Tại sao phải kiểm thử tích hợp?
Các cấp độ kiểm thử:
![](https://images.viblo.asia/65f5d408-61fc-4cf2-a8a2-cc33b2d9f3e3.png)

Mỗi module phần mềm được thực hiện unit test, nhưng vẫn tồn tại lỗi vì các lí do:
- Một module được phát triển bởi 1 lập trình viên riêng lẻ có sự hiểu biết và lập trình logic có thể khác với các lập trình viên khác. Kiểm thử tích hợp trở nên cần thiết để xác minh các module phần mềm hoạt động cùng nhau.
- Tại thời điểm phát triển module, có thể thay đổi yêu cầu của khách hàng. Các yêu cầu mới này có thể không được thực hiện unit test và do đó kiểm thử tích hợp hệ thống trở nên cần thiết.
- Các giao diện của các module phần mềm với cơ sở dữ liệu có thể bị lỗi.
- Xử lý exception không đầy đủ có thể gây ra vấn đề.
### Ví dụ về test case cho integration testing
- Integration Test Case khác với các trường hợp thử nghiệm khác theo nghĩa nó tập trung chủ yếu vào các giao diện & luồng dữ liệu / thông tin giữa các module. Ở đây ưu tiên được đưa ra cho các liên kết tích hợp thay vì các chức năng đơn vị đã được thử nghiệm.
- Test case mẫu cho kiểm thử tích hợp: ứng dụng có 3 module: LoginPage, Mailbox và Delete email 
-> Ở đây ko tập trung nhiều vào kiểm tra 'LoginPage' vì nó đã được thực hiện trong unit test. Hãy kiểm tra xem nó được liên kết với "Mailbox" như thế nào?
Tương tự với 'Mailbox': kiểm tra tích hợp với module 'Delete email'

| Test Case ID| Test Case Objective| Test Case Description  | Expected result
| -------- | -------- | -------- |-------- |
| 1     | Kiểm tra liên kết giao diện giữa module 'Login' và 'Mailbox'    | Nhập thông tin đăng nhập và nhấn vào nút "Login"     |  Chuyển đến 'Mailbox'   |
| 2     | Kiểm tra liên kết giao diện giữa 'Mailbox' và 'Delete email'| Từ 'Mailbox' chọn email và ấn vào button "Delete"     | Email được chọn xuất hiện trong thư mục 'Deleted'    |

### Phương pháp tiếp cận, chiến lược, phương pháp kiểm thử tích hợp

Kĩ thuật phần mềm xác định nhiều chiến lược để kiểm thử tích hợp:
- Tiếp cận Big Bang
- Tiếp cận tăng dần (incremental): được chia thành: TopDown, Bottom Up, Sandwich

**Tiếp cận BigBang**: tất cả các thành phần được tích hợp với nhau cùng 1 lúc và sau đó được kiểm thử
- Ưu điểm: Thuận tiện cho các hệ thống nhỏ
- Nhược điểm:
    - Fault Localization  khó khăn.
    - Với số lượng giao diện cần được kiểm tra theo phương pháp này, một số liên kết giao diện cần kiểm tra có thể dễ dàng bị bỏ qua.
    - Vì thử nghiệm Tích hợp chỉ có thể bắt đầu sau khi "tất cả" các module được thiết kế, nên nhóm thử nghiệm sẽ có ít thời gian thực hiện hơn trong giai đoạn thử nghiệm.
    - Vì tất cả các module được kiểm tra cùng một lúc, các mô-đun quan trọng có rủi ro cao không bị cô lập và được ưu tiên kiểm tra. Các module ngoại vi liên quan đến giao diện người dùng cũng không bị cô lập và được ưu tiên kiểm tra.

**Tiếp cận tăng dần:** 
- Trong phương pháp này, kiểm tra được thực hiện bằng cách nối hai hoặc nhiều module có liên quan đến logic. Sau đó, các module liên quan khác được thêm vào và kiểm tra chức năng thích hợp. Quá trình tiếp tục cho đến khi tất cả các module được tham gia và thử nghiệm thành công.
- Cách tiếp cận tăng dần, lần lượt được thực hiện bởi 2 phương pháp sau:
    - Bottum up (từ dưới lên)
    - Top Down (từ trên xuống)
- Phương pháp tiếp cận tăng dần được thực hiện bằng cách sử dụng các chương trình giả có tên là Stubs và Drivers. Stubs và Drivers không thực hiện toàn bộ logic lập trình của module phần mềm mà chỉ mô phỏng giao tiếp dữ liệu với module gọi.
    - Stub: được gọi bởi module đang thử nghiệm
    - Driver: gọi module để được kiểm tra
- **Tích hợp từ dưới lên (bottom-up)**:
    - Trong chiến lược này, mỗi module ở các cấp thấp hơn được kiểm tra với các module cao hơn cho đến khi tất cả các module được kiểm tra. Nó cần sự giúp đỡ của Drivers để thử nghiệm.
    - Biểu diễn biểu đồ:
    ![](https://images.viblo.asia/8f59526c-ddb6-451b-87fb-0c8c5d6feb2f.PNG)
    - Ưu điểm:
        - Fault localization dễ dàng hơn
        - Không có thời gian bị lãng phí khi chờ đợi tất cả các mô-đun được phát triển không giống như phương pháp Big-bang
    - Nhược điểm:
        - Các module quan trọng (ở cấp cao nhất của kiến trúc phần mềm) kiểm soát luồng ứng dụng được kiểm tra lần cuối và có thể dễ bị lỗi.
        - Một nguyên mẫu ban đầu là không thể

- **Tích hợp từ trên xuống (top-down):**
    - Trong cách tiếp cận từ trên xuống, kiểm tra diễn ra từ trên xuống dưới theo luồng điều khiển của hệ thống phần mềm.
    - Cần sự giúp đỡ của Stub để thử nghiệm.
    - Biểu diễn biểu đồ:
    ![](https://images.viblo.asia/961d9c33-45a2-47bd-9455-5bde273b605a.PNG)
    - Ưu điểm:
        - Fault Localization dễ dàng hơn
        - Khả năng để có được một nguyên mẫu sớm.
        - Các mô-đun quan trọng được thử nghiệm ưu tiên; lỗi thiết kế chính có thể được tìm thấy và sửa chữa đầu tiên.
    - Nhược điểm:
        - Cần nhiều Stub.
        - Các mô-đun ở mức thấp hơn được kiểm tra không đầy đủ.
- **Tích hợp Hybrid/ Sandwich:**
    - Chiến lược sandwich/hybrid là sự kết hợp của phương pháp Top Down và Bottom Up. Ở đây các module hàng đầu được kiểm tra với các module thấp hơn đồng thời các module thấp hơn được tích hợp với các module hàng đầu và được thử nghiệm. Chiến lược này sử dụng Stubs cũng như Drivers.
 
        ![](https://images.viblo.asia/95a67332-dd09-423e-8040-9704fe4ed397.PNG)
        
### Kiểm thử tích hợp như thế nào?
- Bước 1: Chuẩn bị kế hoạch kiểm tra tích hợp (Test Plan)
- Bước 2: Thiết kế Test Scenarios, Test Cases, và Test Scripts.
- Bước 3: Thực hiện kiểm thử và báo cáo lỗi
- Bước 4: Tracking & re-testing các lỗi 
- Bước 5: Bước 3 và 4 được lặp lại cho đến khi hoàn thành Tích hợp thành công.

### Mô tả tóm tắt về kế hoạch kiểm thử tích hợp
Bao gồm các thuộc tính:
- Phương pháp/cách tiếp cận 
- Phạm vi và các phạm vi bên ngoài của kiểm thử tích hợp
- Vai trò và trách nhiệm
- Điều kiện tiên quyết để thử nghiệm tích hợp.
- Môi trường thử nghiệm.
- Kế hoạch rủi ro và giảm thiểu.

### Tiêu chí đầu vào và tiêu chí dừng của kiểm thử tích hợp
- Tiêu chí đầu vào:
    - Đã thực hiện unit test
    - Tất cả các lỗi có high priority đã được fix và closed
    - Tất cả các module được tích hợp thành cônng
    - Kế hoạch kiểm thử, test case, test scenario được tạo
    - Môi trường kiểm thử được thiết lập để phục vụ kiểm thử tích hợp
- Tiêu chí dừng:
    - Kiểm tra thành công ứng dụng tích hợp.
    - Các trường hợp thử nghiệm được thực hiện được ghi lại
    - Tất cả các lỗi có high priority đã được fix và closed
    - Tài liệu kỹ thuật đi cùng là  release Note

Tài liệu tham khảo: https://www.guru99.com/integration-testing.html