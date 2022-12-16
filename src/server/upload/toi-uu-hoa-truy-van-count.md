Hàm `COUNT()` và cách tối ưu hóa các truy vấn sử dụng nó, có lẽ là một trong 10 chủ đề bị hiểu lầm nhiều nhất trong MySQL. Bạn có thể thực hiện tìm kiếm trên web và tìm thấy nhiều thông tin sai lệch về chủ đề này hơn những gì chúng ta quan tâm.

Trước khi chúng ta bắt đầu tối ưu hóa, điều quan trọng là bạn phải hiểu `COUNT()` thực sự làm gì.

### COUNT() làm gì

`COUNT()` là một hàm đặc biệt hoạt động theo hai cách rất khác nhau: nó đếm values và rows. Value là một biểu thức không phải NULL (NULL là trường hợp không có giá trị). Nếu bạn chỉ định tên column hoặc biểu thức khác bên trong dấu ngoặc đơn, `COUNT()` sẽ đếm số lần biểu thức đó có giá trị. Điều này gây nhầm lẫn cho nhiều người, một phần vì values và NULL gây nhầm lẫn. Nếu bạn cần tìm hiểu cách thức hoạt động của điều này trong SQL, chúng tôi đề xuất một cuốn sách hay về nguyên tắc cơ bản về SQL, đó là SQL fundamentals. (Internet không nhất thiết là nguồn cung cấp thông tin chính xác về chủ đề này.)

Dạng khác của `COUNT()` chỉ đơn giản là đếm rows trong kết quả. Đây là những gì MySQL làm khi nó biết biểu thức bên trong dấu ngoặc đơn không bao giờ có thể là NULL. Ví dụ rõ ràng nhất là `COUNT(*)`, là một dạng đặc biệt của `COUNT()` không expand ký tự đại diện `*` vào danh sách đầy đủ các cột trong bảng, như bạn có thể mong đợi; thay vào đó, nó bỏ qua hoàn toàn các cột và đếm các hàng.

Một trong những sai lầm phổ biến nhất mà chúng tôi thấy là chỉ định tên column bên trong dấu ngoặc đơn khi bạn muốn rows. Khi bạn muốn biết rows trong kết quả, bạn nên sử dụng `COUNT(*)`. Điều này truyền đạt ý định của bạn một cách rõ ràng và tránh hiệu suất kém.

### Huyền thoại về MyISAM

Một quan niệm sai lầm phổ biến là MyISAM cực kỳ nhanh đối với các truy vấn `COUNT()`. Nó nhanh, nhưng chỉ dành cho một trường hợp rất đặc biệt: `COUNT(*)` không có mệnh đề WHERE, mệnh đề này chỉ đếm số hàng trong toàn bộ bảng. MySQL có thể tối ưu hóa điều này vì storage engine luôn biết có bao nhiêu rows trong bảng. Nếu MySQL biết `col` không bao giờ có thể là NULL, nó cũng có thể tối ưu hóa biểu thức `COUNT(col)` bằng cách chuyển đổi nó thành `COUNT(*)` trong nội bộ.

MyISAM không có bất kỳ tối ưu hóa tốc độ kỳ diệu nào để đếm rows khi truy vấn có mệnh đề WHERE hoặc đối với trường hợp tổng quát hơn là đếm values thay vì rows. Nó có thể nhanh hơn các storage engines khác cho một truy vấn nhất định hoặc có thể không. Điều đó phụ thuộc vào rất nhiều yếu tố.

### Tối ưu hóa đơn giản

Đôi khi, bạn có thể sử dụng tối ưu hóa `COUNT(*)` của MyISAM để làm lợi thế cho mình khi bạn muốn đếm tất cả trừ một số lượng rất nhỏ các hàng được lập chỉ mục tốt. Ví dụ sau chỉ ra cách bạn có thể tìm một cách hiệu quả số lượng thành phố có ID lớn hơn 5. Bạn có thể viết truy vấn này như sau:

```SQL
mysql> SELECT COUNT(*) FROM world.City WHERE ID > 5;
```

Nếu bạn kiểm tra truy vấn này với `SHOW STATUS`, bạn sẽ thấy rằng nó quét 4.079 rows. Nếu bạn phủ định các điều kiện và trừ số thành phố có ID nhỏ hơn hoặc bằng 5 từ tổng số thành phố, bạn có thể giảm số đó xuống còn 5 rows:

```SQL
mysql> SELECT (SELECT COUNT(*) FROM world.City) - COUNT(*)
    -> FROM world.City WHERE ID <= 5;
```

Phiên bản này đọc ít rows hơn vì truy vấn con được chuyển thành một hằng số trong giai đoạn tối ưu hóa truy vấn, như bạn có thể thấy với EXPLAIN:

```SQL
+----+-------------+-------+...+------+------------------------------+
| id | select_type | table |...| rows | Extra                        |
+----+-------------+-------+...+------+------------------------------+
| 1 | PRIMARY      | City  |...|    6 | Using where; Using index     |
| 2 | SUBQUERY     | NULL  |...| NULL | Select tables optimized away |
+----+-------------+-------+...+------+------------------------------+
```

Một câu hỏi thường gặp trên danh sách mail và kênh IRC là làm thế nào để truy xuất số lượng cho một số giá trị khác nhau trong cùng một column chỉ với một truy vấn, để giảm số lượng truy vấn cần thiết. Ví dụ: giả sử bạn muốn tạo một truy vấn duy nhất để đếm số lượng items có một số màu. Bạn không thể sử dụng `OR`(e.g., `SELECT COUNT(color= 'blue' OR color = 'red') FROM items;`), vì điều đó sẽ không phân tách các số lượng khác nhau cho các màu khác nhau. Và bạn không thể đặt các màu vào mệnh đề `WHERE`(e.g., `SELECT COUNT(*) FROM items WHERE color = 'blue' AND color = 'red';`), vì các màu loại trừ lẫn nhau. Đây là một truy vấn giải quyết vấn đề này:

```SQL
mysql> SELECT SUM(IF(color = 'blue', 1, 0)) AS blue,SUM(IF(color = 'red', 1, 0))
    -> AS red FROM items;
```

Và đây là một biểu thức khác tương đương, nhưng thay vì sử dụng `SUM()`, hãy sử dụng `COUNT()` và đảm bảo rằng các biểu thức sẽ không có giá trị khi tiêu chí sai:

```SQL
mysql> SELECT COUNT(color = 'blue' OR NULL) AS blue, COUNT(color = 'red' OR NULL)
    -> AS red FROM items;
```

### Sử dụng một ước tính gần đúng

Đôi khi bạn không cần số lượng chính xác, vì vậy bạn có thể chỉ cần sử dụng ước tính gần đúng. Các hàng ước tính của trình tối ưu hóa trong `EXPLAIN` thường phục vụ tốt cho việc này. Chỉ cần thực hiện truy vấn `EXPLAIN` thay vì truy vấn thực.

Vào những thời điểm khác nhau, số chính xác kém hiệu quả hơn nhiều so với số gần đúng. Một khách hàng đã yêu cầu trợ giúp đếm số lượng người dùng đang hoạt động trên trang web của anh ấy. Số lượng người dùng được lưu vào bộ nhớ cache và hiển thị trong 30 phút, sau đó nó được tạo lại và lưu vào bộ nhớ cache một lần nữa. Bản chất điều này là không chính xác, vì vậy một giá trị gần đúng có thể chấp nhận được. Truy vấn bao gồm một số điều kiện `WHERE` để đảm bảo rằng nó không tính người dùng không hoạt động hoặc người dùng "default", là một ID người dùng đặc biệt trong ứng dụng. Loại bỏ các điều kiện này chỉ thay đổi số lượng một chút, nhưng làm cho truy vấn hiệu quả hơn nhiều. Một tối ưu hóa hơn nữa là loại bỏ `DISTINCT` không cần thiết để loại bỏ một loại tệp. Truy vấn được viết lại nhanh hơn nhiều và trả về kết quả gần như chính xác.

Nguồn: High performance MySQL, 3rd