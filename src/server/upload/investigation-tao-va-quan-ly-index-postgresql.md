Vào một ngày đẹp trời mình nhận được một task điều tra slow query. Sau một hồi điều tra abcxyz thì giải pháp khả thi nhất là đánh index cho các column ở trong where để tăng tốc độ truy vấn. Câu query từ chạy như rùa bò giờ đã thành the flash. 
Những tưởng thế là xong cơ mà mọi chuyện không đơn giản như thế. Đây chính là lúc mình tìm hiểu kĩ hơn về các tùy chọn khi tạo index. Let's go!!!
# INDEX LÀ GÌ?
Nhắc lại một chút về index. Thì index (hay chỉ mục) là một cấu trúc dữ liệu giúp tăng tốc các truy vấn SELECT và các mệnh đề điều kiện WHERE, ORDER, GROUP. Tuy nhiên, nó sẽ làm chậm quá trình nhập dữ liệu, khi sử dụng các câu lệnh UPDATE và INSERT. Vì chúng phải bổ sung thêm các bản ghi vào các bảng chứa index. Hợp lý mà phải không? Bạn không thể có tất cả được, được cái này mất cái khác. Cuộc sống mà :nerd_face:. 

Có thể hiểu một cách đơn giản index trong database rất giống với phụ lục của một cuốn sách. Các chỉ mục có thể được tạo hoặc loại bỏ đi mà không ảnh hưởng đến dữ liệu.

![image.png](https://images.viblo.asia/49bfe771-e7d2-492e-992f-163f7f769bc0.png)

Có thể liệt kê vắn tắt ưu nhược điểm của index như sau:
- Ưu điểm: 

* Tăng tốc độ truy vấn nhất là khi condititon rơi vào các cột được đánh chỉ mục.
* Sử dụng được cho việc nhóm, sắp xếp dữ liệu.
* Thích hợp với các bảng có số bản ghi lớn.
- Nhược điểm: 

* Như đã nêu làm chậm quá trình nhập dữ liệu (UPDATE, INSERT) => không thích hợp sử dụng khi hoạt động UPDATE, INSERT xảy ra thường xuyên với số lượng lớn.
* Không nên sử dụng trên cột chứa nhiều giá trị NULL.
* Chiếm dụng bộ nhớ tài nguyên của hệ thống. 
PostgreSQL cung cấp một số loại Index như: B-tree, Hash, GiST, SP-GiST và GIN. Mỗi loại index sử dụng một thuật toán khác nhau phù hợp nhất với các loại truy vấn khác nhau. Theo mặc định, lệnh CREATE INDEX tạo các index B-tree. Phạm vi bài viết này mình sẽ không tập phân tích các loại index này. Các bạn có thể tìm hiểu thêm: https://www.postgresqltutorial.com/postgresql-indexes/postgresql-index-types/
# TẠO INDEX 
Cú pháp để tạo index cho một cột trong PostgreSQL sử dụng cú pháp như sau:
```
CREATE INDEX index_name ON table_name (column_name);
```
Hoặc ta có thể tạo index cho tập các cột thường xuất hiện trong conditon.
```
CREATE INDEX index_name ON table_name (column_name_1, column_name_2, ...);
```
Đây cũng là cách đơn giản nhất để tạo index. Nhưng có một vấn đề phát sinh là khi đánh index theo cú pháp trên thì PostgreSQL sẽ lock table để tạo index. Tới đây chắc sẽ có bạn nghĩ là tạo index có một lần xài mãi mãi, với tạo có vài giây thì ăn nhằm vào đâu phải ko :thinking: . 
Nhưng khách hàng lại không nghĩ thế. Hãy thử tưởng tượng hệ thống của bạn đã chạy được vài năm. Số lượng bản ghi lên đến hàng triệu đôi khi hàng chục triệu. Khi tạo index như trên thì thời gian tạo có thể lên tới đơn vị phút và nếu các bảng có dữ liệu lớn thì điều này có thể khiến hệ thống bị sập trong nhiều giờ . Không thể cứ tạo index là phải khóa hệ thống rồi thông báo bảo trì hoài phải không nào? 
=> Tùy chọn CONCURRENTLY sinh ra để giải quyết vấn đề này.
## CONCURRENTLY INDEXES
Cú pháp:
```
CREATE INDEX CONCURRENTLY index_name ON table_name (column_name);
```
Khi sử dụng tùy chọn này được sử dụng thì PostgreSQL phải thực hiện hai lần quét bảng, và nó sẽ đợi tất cả các giao dịch hiện có làm thay đổi đến database chấm dứt để thực hiện. Và hẳn nhiên khi khối lượng công việc nhiều lên như vậy thì phương pháp tạo index này sẽ tiêu tốn tài nguyên hơn thông thường đáng kể. Tuy nhiên, vì nó cho phép các hoạt động bình thường tiếp tục trong khi tạo index, nên phương pháp này rất hữu ích để thêm các index mới trong môi trường product.

Khoan hãy mừng vội :joy: nếu tùy chọn CONCURRENTLY xịn sò con bò thế thì sao PostgreSQL không set mặc định luôn đi lại còn tùy chọn các thứ nữa cho mất công. Quay lại cơ chế tạo index với tùy chọn CONCURRENTLY. Trình tự thực hiện sẽ như sau:
1. Quét bảng lần đầu tiên để tạo index.
2. Quét bảng lần thứ hai cho những thứ được thêm vào hoặc cập nhật kể từ lần quét bảng đầu tiên.
Trong hầu hết các trường hợp thông thường thì cơ chế trên sẽ hoạt động tốt nhưng điều gì sẽ xảy ra nếu chúng ta chạy chỉ mục sau và chúng ta chèn bản sao giữa hai bước. Lúc này Postgres sẽ dừng việc tạo index và nó sẽ được đánh dấu là 'INVALID'. Nghĩa là nó sẽ không được sử dụng cho các truy vấn, nhưng nó sẽ vẫn được cập nhật giống như bất kỳ chỉ mục nào khác. :scream:
Ta có thể kiểm tra các chỉ mục invalid bằng cú pháp: 
```
SELECT * FROM pg_class, pg_index WHERE pg_index.indisvalid = false AND pg_index.indexrelid = pg_class.oid;
```
Khi xảy ra trường hợp này thì ta có hai lựa chọn: 
1. Là sử dụng lệnh REINDEX
2. Xóa index bị lỗi đó đi và tạo lại.
=> Suggest nên sử dụng phương pháp thứ 2 nhé. 
## CHỈ MỤC MỘT PHẦN - PARTIAL INDEXES
Chỉ mục một phần là một chỉ mục được xây dựng trên một tập hợp con (subset) của bảng dữ liệu, tập hợp con được xác định bởi một biểu thức điều kiện (condition).
Cú pháp: 
```
CREATE INDEX index_name on table_name (conditional_expression);
```
Nhìn thì có vẻ đơn giản nhưng khi sử dụng ta phải cẩn thận với biểu thức điều kiện khi tạo index. Ví dụ với câu query như sau:
```
SELECT * FROM persons WHERE 25 BETWEEN age_min and age_max;
```
Nếu tạo index như sau thì index sẽ không sử dụng được ở câu query trên. Bởi BETWEEN đươc phân thành 25>=age_min và 25<=age_max không đúng với condition khi tạo index.
```
CREATE INDEX age_index ON persons (age_min, age_max) WHERE age_min >= 25;
```
## CHỈ MỤC BIỂU THỨC - EXPRESSION INDEXES
Chỉ mục biểu thức sẽ thích hợp với các câu truy vấn phù hợp với một số hàm SQL hoặc sự thay đổi dữ liệu của bạn. Một ví dụ phổ biến là tìm kiếm bản ghi theo một ngày nhất định, trong khi chúng ta lưu trữ dữ liệu của trường ngày tháng theo kiểu dữ liệu là timestamps, nhưng mong muốn chỉ cần tìm những bản ghi có dữ liệu ngày tháng phù hợp.
Cú pháp: 
```
CREATE INDEX articles_day ON articles ( date(published_at) );
```
index trên sẽ sử dụng được cho các điều kiện tìm kiếm có chứa:
```
WHERE date(articles.published_at) = date('2017-06-26')
```
## CHỈ MỤC DUY NHẤT - UNIQUE INDEXES
Một chỉ mục Unique sẽ đảm bảo một bảng sẽ không thể có nhiều hơn một bản ghi có dữ liệu giống nhau. Có hai lý do để sử dụng chỉ mục Unique đó là: tính toàn vẹn dữ liệu và hiệu năng. Việc tra cứu dữ liệu có sử dụng chỉ mục Unique sẽ rất nhanh.
Cú pháp:
```
CREATE UNIQUE INDEX index_name on table_name (column_name);
```
## CÂU LỆNH LIÊN QUAN
Các bạn có thể xóa một hoặc nhiều index với cú pháp : 
```
DROP INDEX index_name, index_name2,... ;
```
Note: Có thể thêm tùy chọn CONCURRENTLY khi xóa index.
Cú pháp xem các index trên một bảng:
```
SELECT indexname, indexdef from pg_indexes where tablename = 'table_name';
```
# KẾT LUẬN
Vậy là mình đã giới thiệu cho các bạn các cách phổ biến khi tạo index với PostgreSQL. Vẫn còn một số các tùy chọn khác các bạn nếu muốn nghiên cứu kĩ hơn thì xem ở link này nhé : https://www.postgresql.org/docs/11/sql-createindex.html. Hi vọng qua bài viết mọi người đã có cái nhìn rõ ràng hơn về tạo index trong PostgreSQL. Hẹn gặp lại ở các bài viết sau :hugs:

![image.png](https://images.viblo.asia/d059b9cd-52d8-4dee-99bd-8385d9d09e31.png)
# TÀI LIỆU THAM KHẢO
https://www.postgresql.org/docs/11/sql-createindex.html
https://dodangquan.blogspot.com/2017/06/danh-chi-muc-hieu-qua-khi-su-dung-postgresql.html