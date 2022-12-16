### Index là gì?
Các chỉ mục trong MySQL sắp xếp dữ liệu theo cách tuần tự có tổ chức. Chúng được tạo trên (các) cột sẽ được sử dụng để lọc dữ liệu. Hãy coi một chỉ mục như một danh sách được sắp xếp theo thứ tự bảng chữ cái. Việc tra cứu các tên đã được sắp xếp theo thứ tự bảng chữ cái sẽ dễ dàng hơn so với các tên không được sắp xếp.

Sử dụng chỉ mục trên các bảng được cập nhật thường xuyên có thể dẫn đến hiệu suất kém. Điều này là do MySQL tạo một khối chỉ mục mới mỗi khi dữ liệu đó được thêm vào hoặc cập nhật trong bảng. Nói chung, chỉ mục nên được sử dụng trên các bảng có dữ liệu không thay đổi thường xuyên nhưng được sử dụng nhiều trong các truy vấn tìm kiếm được chọn.

### Vì sao cần sử dụng Index?
Không ai thích hệ thống chậm. Hiệu suất hệ thống cao có tầm quan trọng hàng đầu trong hầu hết các hệ thống cơ sở dữ liệu. Hầu hết các doanh nghiệp đều đầu tư mạnh vào phần cứng để việc truy xuất và thao tác dữ liệu được nhanh hơn. Nhưng có giới hạn đối với đầu tư phần cứng mà một doanh nghiệp có thể thực hiện. Tối ưu hóa cơ sở dữ liệu của bạn là một giải pháp rẻ hơn và tốt hơn.
![](https://images.viblo.asia/e1978ca0-56af-41ad-834f-0e14c881d868.PNG)
Thời gian phản hồi chậm thường là do các bản ghi được lưu trữ ngẫu nhiên trong các bảng cơ sở dữ liệu. Các truy vấn tìm kiếm lần lượt phải lặp lại toàn bộ các bản ghi được lưu trữ ngẫu nhiên để định vị dữ liệu mong muốn. Điều này dẫn đến cơ sở dữ liệu hoạt động kém khi truy xuất dữ liệu từ các bảng lớn. Do đó, Chỉ mục được sử dụng để sắp xếp dữ liệu nhằm giúp tìm kiếm dễ dàng hơn.

### Create Index
Index có thể tạo bằng 2 cách:
- Tại thời điểm tạo bảng
- Sau khi bảng được tạo

Ví dụ: Đối với db 'myflixdb', chúng tôi mong đợi nhiều lượt tìm kiếm vào cơ sở dữ liệu với tên đầy đủ.
Chúng tôi sẽ thêm cột "full_names" vào Index trong một bảng mới "Member_indexed".
Kịch bản sau sẽ giúp chúng tôi đạt được điều đó:
```
CREATE TABLE `members_indexed` (
  `membership_number` int(11) NOT NULL AUTO_INCREMENT,
  `full_names` varchar(150) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `physical_address` varchar(255) DEFAULT NULL,
  `postal_address` varchar(255) DEFAULT NULL,
  `contact_number` varchar(75) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`membership_number`),INDEX(full_names)
) ENGINE=InnoDB
```
Thực thi tập lệnh SQL trong MySQL workbench:
![](https://images.viblo.asia/5e99f856-f206-4fe1-a0b8-bcbca8daf09b.PNG)
Làm mới myflixdb hiển thị bảng mới được tạo có tên là Member_indexed.

Bảng "member_indexed" có "full_names" trong nút index.

Khi cơ sở thành viên mở rộng và số lượng bản ghi tăng lên, các truy vấn tìm kiếm trên bảng Member_indexed sử dụng mệnh đề WHERE và ORDER BY sẽ nhanh hơn nhiều so với các truy vấn được thực hiện trong bảng thành viên không có chỉ mục được xác định.

### Add Index
Ví dụ trên đã tạo chỉ mục khi xác định bảng cơ sở dữ liệu. Giả sử chúng ta đã có một bảng được xác định và các truy vấn tìm kiếm trên đó rất chậm. Họ mất quá nhiều thời gian để trả lại kết quả. Sau khi điều tra vấn đề, chúng tôi phát hiện ra rằng chúng tôi có thể cải thiện đáng kể hiệu suất hệ thống bằng cách tạo INDEX trên cột được sử dụng phổ biến nhất trong mệnh đề WHERE.

Chúng tôi có thể sử dụng truy vấn sau để thêm chỉ mục:
```
CREATE INDEX id_index ON table_name(column_name);
```
Giả sử rằng các truy vấn tìm kiếm trên bảng "movies" rất chậm và chúng tôi muốn sử dụng một chỉ mục trên "movie title" để tăng tốc các truy vấn, chúng tôi có thể sử dụng tập lệnh sau để đạt được điều đó.
```
CREATE INDEX `title_index` ON `movies`(`title`);
```
Việc thực thi truy vấn trên sẽ tạo một chỉ mục trên trường tiêu đề trong bảng "movies".

Điều này có nghĩa là tất cả các truy vấn tìm kiếm trên bảng phim sử dụng "title" sẽ nhanh hơn.

Tuy nhiên, các truy vấn tìm kiếm trên các trường khác trong bảng phim sẽ vẫn chậm hơn so với các truy vấn dựa trên trường được lập chỉ mục.

Lưu ý: Bạn có thể tạo chỉ mục trên nhiều cột nếu cần tùy thuộc vào các trường mà bạn định sử dụng cho công cụ tìm kiếm cơ sở dữ liệu của mình.

Nếu bạn muốn xem các chỉ mục được xác định trên một bảng cụ thể, bạn có thể sử dụng tập lệnh sau để làm điều đó.
```
SHOW INDEXES FROM table_name;
```
Bây giờ chúng ta hãy xem xét tất cả các chỉ mục được xác định trên bảng "movies" trong myflixdb.
```
SHOW INDEXES FROM `movies`;
```
Thực thi tập lệnh trên trong MySQL workbench so với myflixdb cho chúng ta kết quả về chỉ mục được tạo.

Lưu ý: Các khóa chính và khóa ngoài trên bảng đã được lập chỉ mục bởi MySQL. Mỗi chỉ mục có tên riêng của nó và cột mà nó được xác định cũng được hiển thị.

### Drop index
Lệnh drop được sử dụng để xóa các chỉ mục đã được xác định trên bảng.

Có thể đôi khi bạn đã xác định một chỉ mục trên một bảng thường xuyên được cập nhật. Bạn có thể muốn xóa các chỉ mục trên bảng như vậy để cải thiện hiệu suất truy vấn UPDATE và INSERT. Cú pháp cơ bản được sử dụng để xóa một chỉ mục trên một bảng như sau.
```
DROP INDEX `index_id` ON `table_name`;
```
Ví dụ:
```
DROP INDEX ` full_names` ON `members_indexed`;
```

Việc thực thi lệnh trên sẽ loại bỏ chỉ mục có id 'full_names' khỏi bảng member_indexed.

### Tóm lược
- Các chỉ mục rất mạnh mẽ khi nói đến việc cải thiện đáng kể hiệu suất của các truy vấn tìm kiếm MySQL.
- Chỉ mục có thể được xác định khi tạo bảng hoặc được thêm vào sau khi bảng đã được tạo.
- Bạn có thể xác định chỉ mục trên nhiều cột trên bảng.
- SHOW INDEX FROM table_name được sử dụng để hiển thị các chỉ mục đã xác định trên bảng.
- Lệnh DROP được sử dụng để loại bỏ một chỉ mục xác định trên một bảng nhất định.

Tài liệu tham khảo: https://www.guru99.com/indexes.html