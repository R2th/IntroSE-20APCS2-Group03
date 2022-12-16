# Đặt vấn đề
Đôi khi cơ sở dữ liệu của chúng ta theo thời gian dần trở nên quá phức tạp, rối rắm (hoặc cũng có thể kiến trúc ngay từ đầu nó đã quá magic) khiến không thể kiểm soát hết mọi thứ. Sẽ rất mất thời gian, công sức để làm việc với nó.

Vì thế, MySql đã tạo ra 1 giải pháp hỗ trợ phần nào đó cho vấn đề này. Nó gọi là View.

Với nó, bạn có thể có một cái nhìn đơn giản mà hiệu quả hơn, lưu trữ các tính toán và che giấu sự phức tạp bên dưới.  Giống như các framwork tân tiến tạo ra nhiều hàm hữu dụng, thân thiện với lập trình viên vậy.

# Giới thiệu
View cho phép chúng ta có thể tổng hợp kết quả từ nhiều bảng, tùy theo tiêu chí mong muốn. Do đó, từ 1 truy vấn dài dòng, loằng ngoằng thì chúng ta có thể tách những khúc có ý nghĩa, có thể dùng lại, rồi tạo mỗi cái thành 1 view.

Bản chất của view chỉ là 1 đoạn mã sql được lưu vào server cơ sở dữ liệu. Nếu không xét về cách sử dụng của người thiết kế, hay ý nghĩa thực tế của nó trong từng trường hợp thì chỉ giống như store procedure, hay lưu mã sql vào file ở đâu đó rồi đọc ra thực thi mà thôi.  

Nó được coi như 1 bảng ảo có những khả năng tương tự như table thông thường, tuy nhiên là nó không hề lưu trữ dữ liệu về mặt vật lí. Khi trích xuất dữ liệu bên trong nó sẽ thu được dữ liệu tổng hợp luôn đồng bộ với các bảng thành phần.

![](https://images.viblo.asia/2098965d-01d2-4b65-9fb9-e06ed2569731.png)

Cú pháp tạo thì như sau:
```
CREATE [OR REPLACE] VIEW [db_name.]view_name [(column_list)]
AS
  select-statement;

```

Trong đó :

* OR REPLACE - thêm vào để ghi đè lên view cũ trùng tên nếu có.
* db_name. - tên cơ sở dữ liệu
* (column_list) - mặc định các column của view sẽ được lấy luôn bằng result set của select-statement, dùng khi muốn rename chúng.

Lưu ý là tên view cũng được nhìn nhận như tên table nên không thể tạo giống nhau.

Vì nó được sử dụng giống như 1 bảng bình thường nên lấy dữ liệu ra cũng rất bình thường như ```SELECT * FROM view_name;```

Thay đổi view :
```
ALTER VIEW view_name [(column_list)]
    AS select_statement;
```

Đổi tên view :
```
RENAME TABLE view_name 
TO new_view_name;
```

Xóa view :
```
DROP VIEW [IF EXISTS] view_name;
```

# Lợi ích
Từ những gì đã trình bày ở trên, những lợi ích có thể được gói gọn như sau:

### Đơn giản hóa truy vấn phức tạp

Số lượng bảng phải sử dụng trong 1 truy vấn sẽ giảm xuống, truy vấn sẽ dễ hiểu hơn (tất nhiên đối với mysql thì không)

### Module hóa được các nhóm tiêu chí truy vấn.

Những đoạn truy vấn có ý nghĩa được gom góp thành view và được sử dụng lại, đặc biệt thuận lợi cho những ai chưa thấu hiểu được kiến trúc database.

### Tăng thêm lớp bảo mật

Sẽ có những dữ liệu quan trọng mà cần triệt để chỉ cho những đối tượng nhất định có thể xem.

View sẽ chặn tận gốc được điều này, các bảng với dữ liệu bảo mật sẽ không được truy vấn trực tiếp mà chỉ có những dữ liệu xác định được tuồn qua view mà thôi.

### Sử dụng thay cho việc tách bảng (kĩ thuật tương thích ngược)
Tạo các view có tập kết quả là con của bảng muốn tách, như vậy dữ liệu tổng hợp vẫn còn mà dữ liệu cần sử dụng cho tùy trường hợp cũng đã được phân tách ra .
# Kết
Hi vọng bài viết sẽ có ích cho mọi người !


*Link tham khảo:[ https://www.mysqltutorial.org/mysql-views-tutorial.aspx](https://www.mysqltutorial.org/mysql-views-tutorial.aspx)*