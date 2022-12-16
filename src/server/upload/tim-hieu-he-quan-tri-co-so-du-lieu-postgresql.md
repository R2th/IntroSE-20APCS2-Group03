# PostgreSQL là gì?
![](https://images.viblo.asia/1a9eb0f9-3eeb-4dd0-848a-a5de66fcbba0.jpeg)

PostgreSQL là một hệ thống quản trị cơ sở dữ liệu quan hệ và đối tượng (object-relational database management system) miễn phí và nguồn mở (RDBMS) tiên tiến nhất hiện nay. khả năng mở rộng cao và tuân thủ các tiêu chuẩn kỹ thuật. Nó được thiết kế để xử lý một loạt các khối lượng công việc lớn, từ các máy tính cá nhân đến kho dữ liệu hoặc dịch vụ Web có nhiều người dùng đồng thời.

* PostgreSQL được phát triển bởi PostgreSQL Global Development Group, Phát hành lần đầu: 08/07/1996
* PostgreSQL linh động có thể chạy được trên nhiều nền tảng khác nhau như Mac OS X, Solaris và Windows.
* PostgreSQL là một phần mềm mã nguồn mở miễn phí bởi vậy PostgreSQL có thể được dùng, sửa đổi và phổ biến bởi bất kỳ ai cho bất kỳ mục đích nào.
* PostgreSQL có tính ổn định cao.
* PostgreSQL là hệ thống quản lý cơ sở dữ liệu đầu tiên triển khai tính năng kiểm soát đồng thời nhiều phiên bản (MVCC).

# Tính năng PostgreSQL

PostgreSQL tích hợp nhiều tính năng tuyệt vời giúp hỗ trợ nhà phát triển xây dựng app đáp ứng các chức năng phức tạp, truy vấn nhanh chóng và bảo mật duy trì tính toàn vẹn và độ tin cậy. Để đáng tin cậy hơn, Postgresql cung cấp các tùy chọn bảo mật, xác thực và khôi phục thảm họa khác nhau. PostgreSQL được chứng minh là có khả năng mở rộng cao cả về số lượng dữ liệu và số lượng người dùng có thể thao tác cùng lúc.

Dưới đây là một số các tính năng nổi bật mình tổng hợp lại.

- Câu truy vấn phức hợp (complex query)

- Thủ tục sự kiện (trigger)

- Các khung nhìn (view)

- Tính toàn vẹn của các giao dịch (integrity transactions)

- Việc kiểm tra truy cập đồng thời đa phiên bản (multiversion concurrency control)

- Truy vấn xử lý song song (parallel query)

- Sao chép dữ liệu dạng luồng (Streaming replication)

**Kiểu dữ liệu**

- Nguyên hàm: Số nguyên, số, chuỗi, Boolean

- Cấu trúc: Date/Time, Array, Phạm vi, UUID

- Document: JSON/JSONB, XML, Key-value (Hstore)

- Hình học: Điểm, Đường thẳng, Vòng tròn, Đa giác

- Tùy chỉnh: Composite, Các kiểu tùy chỉnh

**Toàn vẹn dữ liệu**

- UNIQUE, NOT NULL

- Primary Keys

- Foreign Keys

- Ràng buộc loại trừ

- Khóa hàm số, Khóa khuyến nghị

* Đồng quy, hiệu suất

- Lập danh mục: B-tree, Multicolumn, Expressions, Partial

- Lập danh mục nâng cao: GiST, SP-Gist, KNN Gist, GIN, BRIN, Bloom filters

- Trình lập kế hoạch / trình tối ưu hóa truy vấn phức tạp, quét index-only, thống kê số liệu trên nhiều cột.

- Giao tác, Giao tác dạng nest (thông qua lưu điểm)

- Điều khiển đồng thời nhiều phiên bản (MVCC)

- Truy vấn đọc song song

- Phân vùng bảng

- Tất cả các mức độ giao dịch độc lập được xác định trong tiêu chuẩn SQL, bao gồm cả Serializable

- Độ tin cậy, phục hồi sau thảm hoạ

- Ghi nhật ký ghi trước (Write-ahead Logging - WAL)

- Replication: Không đồng bộ, Đồng bộ, Logical

- Khôi phục điểm-theo-thời gian (Point-in-time-recovery - PITR), active standbys

- Không gian bảng

**Bảo mật**

- Xác thực: GSSAPI, SSPI, LDAP, SCRAM-SHA-256, Certificate và các hình thức khác

- Hệ thống kiểm soát truy cập mạnh mẽ

- Bảo mật cấp độ cột và hàng

**khả năng mở rộng**

- Phương pháp lưu trữ

- Ngôn ngữ thủ tục: PL / PGSQL, Perl, Python (và nhiều ngôn ngữ khác)

- Trình wrapper dữ liệu ngoài: kết nối với các cơ sở dữ liệu hoặc luồng khác với giao diện SQL chuẩn

- Và nhiều tiện ích mở rộng cung cấp chức năng bổ sung, bao gồm cả PostGIS

- Tìm kiếm văn bản:

- Hỗ trợ các bộ ký tự quốc tế, ví dụ: thông qua ICU collations

- Tìm kiếm văn bản đầy đủ

**Kết bài**

Qua bài viết này chúng ta đã tìm hiểu cơ bản về PostgreSQL và những tính năng nổi bật của cơ sở dữ liệu này. Đây là một trong những cơ sở dữ liệu được đánh giá là tiên tiến và hiện đại được các công ty các lập trình viên ưu tiên lựa chọn. Nếu bạn chưa dùng thì hãy tìm hiểu và dùng  thử PostgreSQL nhé! Cảm ơn mọi người