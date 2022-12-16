### PostgreSQL
![image.png](https://images.viblo.asia/f84a7c56-1245-416b-afd9-1da41bbaa027.png)
PostgreSQL đã tự đưa ra tuyên bố là "Cơ sở dữ liệu mã nguồn mở tiên tiến nhất thế giới. Vậy điều gì khiến cho PostgreSQL tự tin đến vậy? Hay cùng mình tìm hiểu về những lý do khiến PostgreSQL gây chú ý đến toàn thế giới nhé!
### PostgreSQL là gì?
Là một hệ thống quản trị cơ sở dữ liệu quan hệ - đối tượng(object-relational database management system). Nó được thiết kế để xử lý một loạt các khối lượng công việc lớn, từ máy tính cá nhân đến kho dữ liệu hay dịch vụ Web có nhiều người dùng đồng thời. Sơ lược về các thông tin của PostgreSQL, ta có:
* PostgreSQL được phát triển bởi PostgreSQL Global Development Group, Phát hành lần đầu: 08/07/1996.
* PostgreSQL linh động có thể chạy được trên nhiều nền tảng khác nhau như Mac OS X, Solaris và Windows.
* PostgreSQL là một open source miễn phí, bởi vậy PostgreSQL có thể được dùng để sửa đổi và phổ biến bởi bất kỳ ai cho bất kỳ mục đích nào.
* PostgreSQL có tính ổn định cao.
* PostgreSQL là hệ thống quản lý cơ sở dữ liệu đầu tiên triển khai tính năng kiểm soát đồng thời nhiều phiên bản(MVCC).
### Tại sao lại là PostgreSQL?
PostgreSQL tích hợp nhiều tính năng tuyệt vời giúp hỗ trợ nhà phát triển xây dựng app đáp ứng các chứ năng phức tạp, truy vấn nhanh chóng và bảo mật duy trì tính toàn vẹn và độ tin cậy. Để đáng tin cậy hơn, Postgresql cung cấp các tùy chọn bảo mật, xác thực và khôi phục thảm họa khác nhau. PostgreSQL được chứng minh là có khả năng mở rộng cao về số lượng dữ liệu lần số lượng người thao tác cùng một lúc.
**Các tính năng nổi bật**
* Câu truy vấn phức hợp(complex query)
* Thủ tục sự kiện(trigger)
* Các khung nhìn(view)
* Tính toàn vẹn của giao dịch(integrity transactions)
* Việc kiểm tra truy cập đồng thời đa phiên bản(multiversion concurrency control)
* Truy vấn xử lý song song(prallel query)
* Sao chép dữ liệu dạng luồng(Streaming replication)
**Kiểu dữ liệu**
* Nguyên hàm: Số nguyên, số, chuỗi, boolean
* Cấu trúc: Data/Time, Array, Phạm Vi, UUID
* Document: JSON/JSONB, XML, Key-value(Hstore)
* Hình học: Điểm, Đường thẳng, Vòng tròn, Đa giác
* Tùy chỉnh: Composite, Các kiểu tùy chỉnh
**Toàn vẹn dữ liệu**
* UNIQUE, NOT NULL
* Primary Keys
* Foreign Keys
* Ràng buộc loại trừ
* Khóa hàm số, Khóa khuyến nghị
* Đồng quy, hiệu suất
* Lập danh mục: B-tree, Multicolumn, Expressions, Partial
* Lập danh mục nâng cao: GiST, SP-Gist, KNN Gist, GIN, BRIN, Bloom filters
* Trình lập kế hoạch / trình tối ưu hóa truy vấn phức tạp, quét index-only, thống kê số liệu trên nhiều cột,
* Giao tác dạng nest( thông qua lưu điểm ), giao tác
* Truy vấn đọc song song
* Phân vùng bảng
* Tất cả các mức độ giao dịch độc lập được xác định trong tiêu chuẩn SQL, bao gồm cả Serializable

* Độ tin cậy, phục hồi sau thảm hoạ

* Ghi nhật ký ghi trước (Write-ahead Logging - WAL)

* Replication: Không đồng bộ, Đồng bộ, Logical

* Khôi phục điểm-theo-thời gian (Point-in-time-recovery - PITR), active standbys

* Không gian bảng

**Bảo mật**

* Xác thực: GSSAPI, SSPI, LDAP, SCRAM-SHA-256, Certificate và các hình thức khác

* Hệ thống kiểm soát truy cập mạnh mẽ

* Bảo mật cấp độ cột và hàng

**Khả năng mở rộng**

* Phương pháp lưu trữ

* Ngôn ngữ thủ tục: PL / PGSQL, Perl, Python (và nhiều ngôn ngữ khác)

* Trình wrapper dữ liệu ngoài: kết nối với các cơ sở dữ liệu hoặc luồng khác với giao diện SQL chuẩn

* Và nhiều tiện ích mở rộng cung cấp chức năng bổ sung, bao gồm cả PostGIS

* Tìm kiếm văn bản:

* Hỗ trợ các bộ ký tự quốc tế, ví dụ: thông qua ICU collations

* Tìm kiếm văn bản đầy đủ
### Tóm lại
Qua bài viết này chúng ta đã hiểu được cơ bản về PostgreSQL cũng như tính năng và kiểu dữ liệu của cơ sở dữ liệu này. Đây là một trong những cơ sở dự liệu được đánh giá tiên tiến và hiện đại đang được các công ty công nghệ ưu tiên lựa chọn. Ở bài viết sau chúng ta sẽ thực hành vài cú pháp cơ bản trên PostgreSQL thông qua Go.

Bài viết tham khảo:

Tìm hiểu hệ quản trị cơ sở dữ liệu PostgreSQL: https://viblo.asia/p/tim-hieu-he-quan-tri-co-so-du-lieu-postgresql-m68Z0eLdlkG

Postgresql là gì? Tìm hiểu về cơ sở dữ liệu mã nguồn mở tiên tiến nhất thế giới: https://bizflycloud.vn/tin-tuc/postgresql-la-gi-tim-hieu-ve-co-so-du-lieu-ma-nguon-mo-tien-tien-nhat-the-gioi-20180919175924611.htm