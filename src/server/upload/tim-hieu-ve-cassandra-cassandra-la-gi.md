### **NoSQL là gì?**

Mọi người thường được nghe tới thuật ngữ "NoSQL" một tên gọi dùng cho các middleware như database hướng document và  KVS (Key Value Store). Ở nước ngoài đã bắt đầu việc tìm kiếm NoSQL middleware với sự khởi đầu là các công ty dịch vụ web như Twitter và Facebook trở thành khởi nguồn cho việc bùng nổ của NoSQL.

**Vậy NoSQL là gì?**

Khi nghe đến thuật ngữ “No SQL”  mọi người thường có khuynh hướng nghĩ rằng, nó là sự loại bỏ RDBMS (Relational Database Management System-Hệ thống quản lý cơ sở dữ liệu quan hệ) và thay thế bằng KVS, nhưng thực ra không phải vậy. Hàm ý của nó là RDBMS vẫn sử dụng trong các lĩnh vực mà RDBMS hoạt động tốt, còn với những lĩnh vực không phù hợp với RDBMS thì sử dụng các middleware thích hợp hơn. NoSQL chính xác mang ý nghĩa là Not Only SQL (Không chỉ SQL).

Nếu so sánh NoSQL middleware với RDBMS thì có sự khác biệt sau:
        
![](https://images.viblo.asia/8ddef777-86c0-4fed-b392-475425218db7.PNG)


**Một số đặc trưng chi tiết của NoSQL middleware**

- Hoạt động nhanh
- Là data model (Mô hình dữ liệu) chứ không phải là relation model (Mô hình quan hệ)
- Kiến trúc tỷ lệ
- Được xây dựng bởi commodity server
- Giản đồ miễn phí
- Nó không có SPOF (điểm duy nhất của sự thất bại)
- Tự động sao chép sang nhiều đơn vị
- Cho phép lựa chọn tính nhất quán hoặc nhất quán cuối cùng
- Không có ngôn ngữ truy vấn mạnh như SQL và chỉ có thể thực hiện các truy vấn đơn giản

### **Cassandra là gì**

Nói về phần mềm trung gian NoSQL dẫn đầu là Google BigTable và Amazon Dynamo, nhưng nhiều thứ khác cũng xuất hiện trong thế giới open source. Trong số đó, Apache Cassandra (Cassandra) đang thu hút sự chú ý đặc biệt gần đây.

Cassandra ban đầu được tạo ra bởi Facebook. Sau đó nó đã được tặng cho Quỹ Apache và tháng 2 năm 2010 và được nâng cấp lên thành dự án hàng đầu của Apache.

http://cassandra.apache.org/

Cassandra là một cơ sở dữ liệu phân tán kết hợp mô hình dữ liệu của Google Bigtable với thiết kế hệ thống phân tán như bản sao của Amazon Dynamo. Tất cả được thực hiện bởi Java và được cung cấp trong ASL 2 (Giấy phép Phần mềm Apache Phiên bản 2).

Các tính năng ưu việt của Cassandra bao gồm 9 điểm sau:

① Thích hợp để sử dụng thực tế

② Khả năng chịu lỗi cao

③ Kiến trúc không có SPOF (một điểm gây tổn hại)

④ Mức độ tự do kiểm soát nhất quán

⑤ Mô hình dữ liệu phong phú

⑥ Có thể tăng cường cải thiện thông lượng cho tuyến tính

⑦ Tính khả dụng cao

⑧ Hỗ trợ các ngôn ngữ khác nhau dưới dạng client code

⑨ Dễ dàng nắm bắt trạng thái bên trong của máy chủ bằng JMX/Dễ giám sát


Điểm đặc biệt hấp dẫn trong các mục này là 3 đặc trưng sau: ③ "Kiến trúc không có SPOF" , ⑤ "Mô hình dữ liệu phong phú" và ⑧ "Hỗ trợ các ngôn ngữ khác nhau dưới dạng client code" 

Trước hết, không có SPOF vì kiến trúc của Cassandra không có nút chính. Kết quả là, toàn bộ hệ thống sẽ không dừng lại do một phần nào đó bị thất bại, service vẫn tiếp tục được vận hành, vì vậy có thể nói rằng khả năng chịu lỗi là rất cao.

Trong Cassandra, dữ liệu được sao chép và phân phối cho mỗi nút, và các biện pháp chống mất dữ liệu cũng được áp dụng mạnh mẽ. Ngoài ra, như đã đề cập trong ⑨, bạn có thể nắm bắt và giám sát trạng thái bên trong của máy chủ một cách chi tiết, chẳng hạn như bao nhiêu dữ liệu được ghi/đọc bởi JMX. Ngoài ra, việc thêm một máy (nút) có thể kỳ vọng cải thiện được hiệu suất tuyến tính tương đối.

Dựa vào đặc trưng này, các công ty như Twitter và Digg sử dụng Cassandra để giảm thiểu chi phí hoạt động hơn là sử dụng theo cách vận hành chia dọc + Memcached trong RDBMS.

Về mô hình dữ liệu, Cassandra có mô hình dữ liệu phong phú như mô hình dữ liệu của Bigtable. Khác biệt so với mô hình quan hệ của RDBMS, nó giúp dễ hình dung ra được hình ảnh mình đang tính toán trong đầu. 

Về hỗ trợ các ngôn ngữ khác nhau được liệt kê ở điểm thứ ba là vì Cassandra thu thập dữ liệu bằng framework có tên là Thrift. Thrift có một cơ chế để giao tiếp với nhiều các ngôn ngữ khác nhau, vì vậy khách hàng Cassandra có thể đối ứng với nhiều ngôn ngữ khác nhau.

Nếu Thrift mô tả IDL (Ngôn ngữ định nghĩa giao diện), nó sẽ tự động tạo ra mã của phần giao tiếp. Vì Cassandra đã định nghĩa IDL của Thfift (.thrift), có thể chạy ứng dụng Cassandra bằng các ngôn ngữ sau, ví dụ:

- C ++
- Java
- Python
- PHP
- Ruby
- Erlang
- Perl
- Haskell
- C #
- Objective-C
- Smalltalk
- OCaml