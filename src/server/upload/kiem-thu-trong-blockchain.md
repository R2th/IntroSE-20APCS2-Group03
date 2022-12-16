## Trước khi đi vào phần TEST, chúng ta cùng ôn lại một chút về Blockchain nha!

Blockchain là công nghệ chuối - khối, cho phép truyền tải dữ liệu một cách an toàn dựa trên hệ thống mã hóa vô cùng phức tạp. Mỗi khối sẽ chứa: thông tin giao dịch, hash của nó, hash của khối trước...

### Tính năng ưu việt của Blockchain:
- **Hệ thống phi tập trung**: Có lợi trong các ngành hành khác nhau như tài chính, bất động sản...
- **Bảo mật tốt hơn**: Sử dụng nhiều node để hoàn thành và xác thực các giao dịch.
- **Tính xác thực**: Cho phép thuật toán duy nhất xử lý dữ liệu.
- **Tăng dung lượng**: Tăng dung lượng cho toàn bộ network.

### 3 loại Blockchain:
- Public Blockchain
- Private Blockchain
- Permissioned Blockchain

|  | Public | Private | Pemissioned |
| -------- | -------- | -------- |-------- |
| **Truy cập** | Bất kỳ ai  | Một tổ chức     | Nhiều tổ chức|
| **Những người tham gia** | - Không được phép <br> - Vô danh | - Được phép <br> - Nhận dạng đã biết |  - Được phép <br> - Nhận dạng đã biết |
| **Bảo vệ** | - Cơ chế đồng thuận <br> - Proof of Work / Proof of Stack | - Người tham gia được phê duyệt trước <br> - Bỏ phiếu / đồng thuận đa bên |- Người tham gia được phê duyệt trước <br> - Bỏ phiếu / đồng thuận đa bên|
|**Tốc độ giao dịch**|Chậm|Nhẹ hơn và nhanh hơn|Nhẹ hơn và nhanh hơn|

### Chúng ta sẽ cùng nhau tìm hiều qua về các thành phần chính của Blockchain
- **NODE APPLICATION**: Mỗi node phải cài đặt và chạy một ứng dụng máy tính hoàn toàn phù hợp với hệ sinh thái mà chúng muốn tham gia.
- **SHARED LEDGER**: Một cấu trúc dữ liệu được quản lý bên trong node application. Nội dung của hệ sinh thái có thể được xem khi node application ở trạng thái đang hoạt động.
- **CONSENSUS ALGORITHM**: Thuật toán đồng thuận được triển khai như một phần của node application, cung cấp "rules" về cách mà hệ sinh thái sẽ tiến đến một chế độ xem duy nhất của ledger.
- **VIRTUAL MACHINE**: Có khả năng trừu tượng hóa toàn bộ network và làm cho nó hoạt động như một siêu máy tính duy nhất có thể giải quyết nhiều tác vụ tính toán.

## Bây giờ chúng ta sẽ đi vào phần chính là Testing nha!
### Có những cái thách thức mà chúng ta cần tìm hiểu đó là:
- Đầu tiên là chúng ta cần phải hiểu về công nghệ Blockchain là gì và đặc điểm và cách thức hoạt động của nó ra sao.
- Thứ hai là chúng ra phải có những tool phù hợp cho việc test những ứng dụng áp dụng công nghệ Blockchain này.
- Thứ ba là chúng ta phải xác định, thiết kết được chiến lược test. Đây có thể coi là một thách thức lớn vì chiến lược đòi hỏi cần có một kiến thức sâu rộng về công nghệ này.
- Thứ tư là test về size của block và chain cũng là một trong các yếu tố quan trọng, nếu không cũng có thể dẫn đến lỗi.
Song song đó, chúng ta cũng phải tiến hành những: Intergration test, Peformance test (load test/ stress test), Security test.

### Để thực hiện test trong Blockchain thì bao gồm những giai đoạn nào?
**INITIATION PHASE:**
- Tìm hiểu kiến trúc Blockchain: Trong giai đoạn này, cần hiểu và phân tích các yêu cầu về bussiness và feature. Điều này mô tả hành vi của ứng dụng và cách người dùng sẽ tương tác với ứng dụng.
- Thiết kế chiến lược thử nghiệm đầy đủ: Trong giai đoạn này, chúng ta sẽ thiết lập ra Test Strategy. Điều này nên được thực hiện chi tiết để mọi mục tiêu được bao phủ đầy đủ.

**DESIGN PHASE:**
- Viết Testcase
- Tạo Test Data
- Thiết lập Test Enviroment
- Xác định Performance Metrics

**TESTING PHASE:**
- API Testing: Trong thử nghiệm API, chúng tôi đảm bảo rằng sự tương tác giữa các ứng dụng trong hệ sinh thái Blockchain như mong đợi.
- BLOCK Testing: Tất cả các khối trên network phải được kiểm tra riêng lẻ để đảm bảo sự hợp tác phù hợp.
- FUNCTIONAL Testing: Test các tính năng chính, cơ bản, quan trọng của ứng dụng.
- PERFORMANCE Testing: Chi tiết như độ trễ của mạng dự trên kích thước khối, kích thước mạng, kích thước giao dịch dự kiến và thời gian truy vấn để trả về kết quả đầu ra bằng giao thức xác thực chuyên biệt.
- Security Testing: Bảo đảm rằng hệ thống có thể bảo vệ dữ liệu và có khả năng xử lý các cuộc tấn công độc hại...
- Intergration Testing: Trong kiểm tra tích hợp, chúng ta đảm bảo rằng tất cả các thành phần của ứng dụng được tích hợp đúng cách và thực hiện các hành động một cách thích hợp.
- Smart Contract Testing: Kiểm tra hợp đồng thông minh là thực hiện kiểm tra chức năng chi tiết của quy trình và logic nghiệp vụ.

**REPORT PHASE:**
- Project Sumary Report: Mô tả tổng quan về chi tiết dự án, ngày dự án, chi phí và chi tiết nhiệm vụ.
- Smart Contrac Testing Report: Báo cáo này mô tả chi tiết về xử lý hợp đồng thông minh, dữ liệu và quy tắc.
- Security Testing Report: Hiển thị lỗ hổng thông tin trong một tài liệu chính thức cho khách hàng và cấp quản lý cao hơn. Báo cáo chứa ngày thử nghiệm, dữ liệu thử nghiệm và tóm tắt các lỗi hổng được tìm thấy.
- Performace Testing Report: Báo cáo này hiển thị các chi tiết liên quan đến hiệu suất của các ứng dụng như tốc độ, khả năng mở rộng, độ tin cậy...

### Một vài tool test mà mọi người có thể sử dụng:
**1. Ethereum Tester:**
Nó là một thư viện thử nghiệm mã nguồn mở có sẵn trên repo Github. Nó dễ dàng thiết lập với hỗ trợ API có thể quản lý cho các yêu cầu thử nghiệm khác nhau.

**2. Ganache:**
Là thư viện được sử dụng rộng rãi để thử nghiệm các hợp đồng Ethereum tại địa phương. Nó hoạt động bằng cách tạo ra một loại Blockchain giả cho phép bạn truy cập vào các tài khoản mà bạn có thể sử dụng để thử nghiệm.

**3. Hyperledger Composer:**
Là một công cụ mã nguồn mở giúp các nhà phát triển xây dựng các ứng dụng Blockchain. Sử dụng công cụ này, chúng tôi có thể thực hiện chủ yếu 3 loại kiểm tra: Interactive Test, Unit Test và System Test.

***Reference Link:*** https://www.guru99.com/blockchain-testing.html