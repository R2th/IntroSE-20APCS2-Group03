References:https://stackjava.com/mongodb/uu-nhuoc-diem-cua-elasticsearch-so-sanh-elasticsearch-voi-mongodb.html

(Xem thêm: [Hướng dẫn toàn bộ Elasticsearch](https://stackjava.com/elasticsearch))
## Ưu nhược điểm của Elasticsearch
**Ưu điểm**

* Là phần mềm mã nguồn mở, hoàn toàn miễn phí, cộng đồng phát triển lớn.
* Tốc độ nhanh: Elasticsearch có khả năng thực hiện những câu truy vấn phức tập một cách nhanh chóng và cũng có thể lưu lại hầu hết cấu trúc truy vấn vào bộ nhớ đệm để sử dụng cho việc filter kết quả…
* Hỗ trợ Full-text search: với các tính năng như tách từ, tách câu, tạo chỉ mục cho dữ liệu
* Hỗ trợ tìm kiếm mờ, tự động hoàn thành (autocomplete): giúp bạn có thể tìm ra kết quả kể cả khi bạn viết sai chính tả.
* Cung cấp Restful API cho phép xử lý các yêu cầu với các API Restful request.
* Dữ liệu lưu dưới dạng document oriented, free schema nên rất linh hoạt cho những trường hợp dữ liệu thường xuyên thay đổi cấu trúc.
* Khả năng mở rộng và tính sẵn dùng cao: với việc sử dụng mô hình cluster với nhiều node cùng tham gia phục vụ việc sử lý dữ liệu, khi một node chết thì vẫn không ảnh hưởng tới luồng xử lý, ngược lại khi muốn mở rộng ta chỉ cần thêm node mới vào hệ thống.


**Nhược điểm:**
* Không phù hợp cho những trường hợp mà dữ liệu được ghi nhiều (create, update, delete)
* Không hỗ trợ transaction, không có ràng buộc quan hệ giữa các dữ liệu dẫn tới việc dữ liệu có thể bị sai.


## So sánh Elasticsearch với MongoDB
Sau khi xem xong ưu nhược điểm của Elasticsearch nhiều bạn sẽ thấy rằng sao nó giống MongoDB thế, bởi vì cả Elasticsearch và MongoDB đều lưu dữ liệu NoSQL, document oriented, free schema, được xây dựng để đáp ứng cho các phản hồi realtime, dễ mở rộng…

(Xem lại: [Ưu nhược điểm của mongodb](https://stackjava.com/elasticsearch))

Vậy điểm khác biệt giữa Elasticsearch so với MongoDB là gì?

Khi nói tới Elasticsearch người ta sẽ nói tới đó là một search engine chứ không phải là một database như MongoDB.

Mặc dù Elasticsearch và MongoDB đều hỗ trợ cơ chế đánh index cho dữ liệu. Và khi các field của MongoDB được đánh index đầy đủ thì khả năng tìm kiếm của MongoDB cũng không kém cạnh so với Elasticsearch. Nhưng Elasticsearch vẫn có những điểm riêng biệt như:

* Cung cấp Restful API cho phép xử lý các yêu cầu dưới dạng các request API Restful.
* Tự động đánh index khi insert dữ liệu
* Việc đánh index ở mức độ chuyên sâu hơn so với MongoDB, trong khi MongoDB chỉ đánh index ở mức độ từ /words thì Elasticsearch chia nhỏ hơn nên MongoDB sẽ không phù hợp cho trường hợp tìm kiếm mờ
* (ví dụ bạn có 1 đoạn text ‘tran van b’ khi đánh index trong MongoDB nó sẽ tách ra làm 3 từ là [‘tran’, ‘van’, ‘b’] nếu bạn search từ ‘a’ thì nó sẽ không tìm thấy)
* …

## Giải pháp
Giải pháp đó là sử dụng kết hợp cả MongoDB và Elasticsearch. MongoDB sẽ được dùng để làm database lưu dữ liệu còn Elasticsearch sẽ được đồng bộ dữ liệu với MongoDB. Khi thực hiện tìm kiếm ta sẽ tìm kiếm trên Elasticsearch:
![](https://stackjava.com/wp-content/uploads/2018/07/elasticsearch-1.png)

(Xem thêm: [Đồng bộ dữ liệu giữa MongoDB với Elasticsearch bằng Transporter](https://stackjava.com/elasticsearch/dong-bo-du-lieu-giua-mongodb-voi-elasticsearch-bang-transporter.html))

(Xem thêm: [Đồng bộ realtime dữ liệu MongoDB và Elasticsearch sử dụng Monstache](https://stackjava.com/uncategorized/monstache-la-gi-dong-bo-mongodb-sang-elasticsearch-voi-monstache.html))


**Okay, Done!**


##  **References**: 
https://stackjava.com/mongodb/uu-nhuoc-diem-cua-elasticsearch-so-sanh-elasticsearch-voi-mongodb.html

https://github.com/elastic/elasticsearch