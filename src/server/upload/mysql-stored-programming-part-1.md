Khi MySQL lần đầu tiên ra mắt giới công nghệ thông tin vào những năm giữa thập niên 90l, nó có rất ít tính năng để trờ thành một cơ sở dữ liệu quan hệ mang tính thương mại và có thể trở nên phổ biến. Các tính năng như hỗ trợ transaction, subqueries, views, and stored procedures đều không có. Tuy nhiên lần lượt các bản phát hành tiếp theo thì MySQL đã dần dần hoàn thiện, và cho đến khi MySQL 5 được release thì stored procedures, functions và triggers được giới thiệu , khoảng cách giữa MySQL và các hệ quản trị cơ sở dữ liệu khác dần được thu hẹp, và cho đến bây giờ. MySQL trở thành 1 trong những hệ quản trị cơ sở dữ liệu phổ biến nhất thế giới.

Việc hỗ trợ stored programs (thuật ngữ chung để chỉ stored procedures, functions và triggers) có ý nghĩa vượt ra khỏi cuộc chiến tính năng giữa các hệ quản trị cơ sở dữ liệu. Nếu không có stored programs, MySQL không thể đáp ứng đầy đủ các tiêu chuẩn để trở thành một hệ quản trị cơ sở dữ liệu mang tính thương mại, bao gồm các tiêu chuẩn ANSI/ ISO. Hơn nữa, việc sử dụng hợp lý stored programs có thể mang lợi lợi ích lớn hơn trong việc bảo mật và toàn vẹn cơ sở dữ liệu, và có thể cải thiện performance của hệ thống, cũng như việc maintain. VÌ vậy, trang bị kiến thức về stored programs là một kĩ năng thiết yếu cho những lập trình viên.

## 1. Stored Program là gì ?
Stored program - hay còn được gọi là stored module hoặc là stored routine thực ra cũng chỉ là một chương trình máy tính mà thôi. Nó được lưu trữ và thực thi ở bên trong database server. Mã nguồn và bất kì phiên bản nào được biên dịch của chương trình đều được lưu trữ trong các system table của máy chủ cơ sở dữ liệu. Khi chương trình được thực thi, nó chỉ thực thi trong các process database server.

Có 3 loại chính trong MySQL:
* **Stored procedures**:  là một tập hợp các câu lệnh SQL dùng để thực thi một nhiệm vụ nhất định. Nó hoạt động giống như một hàm trong các ngôn ngữ lập trình khác. Một stored procedures là một chương trình được thực thi theo yêu cầu, và có thể nhận nhiều tham số input cũng như trả về nhiều tham số ở output. Nó là loại chương trình phổ biến nhất của stored program.
* **Stored functions**: nó tương tự như stored procedures, tuy nhiên kết quả thực thi của nó chỉ trả về một giá trị duy nhất. Quan trọng nhất, một stored function có thể sử dụng trong các câu lệnh truy vấn SQL,  cho phép lập trình viên có thể mở rộng khả năng xử lí của ngôn ngữ SQL.
* **Triggers**: hiểu đơn giản thì nó là một stored procedures không có tham số. Trigger thực thi một cách tự động khi một trong ba câu lệnh Insert, Update, Delete làm thay đổi dữ liệu trên bảng có chứa trigger. Trigger thường được sử dụng để kiểm tra ràng buộc (check constraints) trên nhiều quan hệ (nhiều bảng/table) hoặc trên nhiều dòng (nhiều record) của bảng.

## 2. Tại sao lại sử dụng Stored Programs ?
Các lập trình viên có rất nhiều ngôn ngữ lập trình để lựa chọn. Rất nhiều trong số chúng không phải là ngôn ngữ database, điều đó có nghĩa là những dòng code được viết ra bới ngôn ngữ đó không được lưu trữ, cũng như quản lý bởi một database server. Stored programs cung cấp một số lợi thế rất quan trọng so với các ngôn ngữ lập trình khác, như là:
* Việc sử dụng store programs giúp cho cơ sở dữ liệu trở nên an toàn hơn. Quản trị viên cơ sở dữ liệu có thể gán quyền cho ứng dụng truy xuất vào các stored procedures được chỉ định mà không cho phép truy cập đến các bảng (table) ở phía dưới.
* Stored procedure có thể được tái sử dụng và chuyển sang bất cứ ứng dụng nào muốn sử dụng chúng. Stored procedure có thể “trưng ra” giao diện database cho tất cả các ứng dụng, vì vậy lập trình viên không cần viết lại các chức năng đã hỗ trợ sẵn trong stored procedure trong tất cả các chương trình.
* Stored procedure làm giảm lưu lượng thông tin giao tiếp giữa ứng dụng và database server, thay vì gởi những câu lệnh sql chưa complile dài lằng ngoằn, ứng dụng chỉ việc gởi tên của stored procedure và lấy lại kết quả
* Stored procedure làm tăng khả năng thực thi của ứng dụng. Sau khi được tạo, stored procedure sẽ được biên dịch (compile) và lưu trữ ngay trong database. Lẽ dĩ nhiên, nó sẽ chạy nhanh hơn là một lệnh sql chưa compile được gởi trực tiếp từ ứng dụng.

## 3. A Quick Tour
Để bắt đầu, chúng ta cùng xem qua một số ví dụ minh họa về cấu trúc cũng như các chức năng của stored program. Việc giới thiệu và giải thích đầy đủ mình sẽ đề cập ở phần sau của series này.
### 3.1. Ví dụ về Stored Procedures
```
1 CREATE PROCEDURE example1( )
2 BEGIN
3   DECLARE l_book_count INTEGER;
4
5   SELECT COUNT(*)
6     INTO l_book_count
7     FROM books
8   WHERE author LIKE '%MR.DAT%';
9
10  SELECT CONCAT('Guy has written (or co-written) ',
11    l_book_count ,
12    ' books.');
13
14  -- Oh, and I changed my name, so...
15  UPDATE books
16    SET author = REPLACE (author, 'MR.DAT', 'DAT.09')
17  WHERE author LIKE '%DAT.09';
18
19 END
```

Mình sẽ giải thích chi tiết hơn về đoạn code trên:

| Line(s) | Explanation |
| -------- | -------- |
| 1| Dòng này sẽ định nghĩa tên và kiểu (PROCEDURE) của stored program     |
| 2| Từ khóa BEGIN thể hiện sự bắt đầu của một khối lệnh, cụ thể ở đây là các đoạn code khai báo và thực thi của procedure, các câu lệnh sẽ được đăt bên trong khối BEGIN.. END 
| 3| Khai báo một biến integer, dùng đễ lưu trữ lại kết quả query database sẽ được thực hiện sau đó.
| 5-8|Chạy một câu truy vấn để đếm xêm có bao nhiêu sách mà MR.DAT là tác giả hoặc đồng tác giả. Đặc biệt chú ý ở dòng số 6: việc sử dụng mệnh đề INTO trong SELECT đóng vai trò cầu nối giữa database và biến local trong stored program. Nó sẽ gán kết quả trả về của câu truy vấn vào cho biến l_book_count.
| 10-12| Sử dụng câu lệnh select đơn giản để hiển thị số sách. Khi sử dụng SELECT mà k có mệnh đề INTO, kết quả sẽ được return trực tiếp cho chương trình đã gọi nó.
| 14| Dòng comment giải thích cho mục đích của câu lệnh UPDATE bên dưới.
| 15| Cập nhật tên của tác giả từ MR.DAT thành DAT.09|

### 3.2. Control và Conditional Logic
Đối với các ứng dụng thực tế, thì nó chứa rất nhiều điều kiện phức tạp và các trường hợp đặc biệt. Nó không hoàn toàn là chạy một đống lệnh từ trên xuống dưới, mà đối với mỗi trường hợp đặc biết, với điều kiện cụ thể, thì nó sẽ thực hiện nhiều câu lệnh khác nhau. Do đó, Stored Program cũng cung cấp cho chúng ta đầy đủ các câu lệnh điều khiển và điều kiện, giúp chúng ta có thể kiểm soát dòng chương trình nào sẽ được chạy trong các hoàn cảnh nhất đinh. Bao gồm:
* Các câu lệnh IF và CASE
* Các câu lệnh về vòng lặp: WHILE và REPEAT UNTIL
Cùng mình tham khảo ví dụ dưới đây:
```
1 CREATE PROCEDURE pay_out_balance
2   (account_id_in INT)
3 
4 BEGIN
5
6   DECLARE l_balance_remaining NUMERIC(10,2);
7
8   payout_loop:LOOP
9     SET l_balance_remaining = account_balance(account_id_in);
10
11    IF l_balance_remaining < 1000 THEN
12      LEAVE payout_loop;
13
14    ELSE
15      CALL apply_balance(account_id_in, l_balance_remaining);
16    END IF;
17
18  END LOOP;
19
20 END
```
| Line(s) | Explanation |
| -------- | -------- |
|1-3| Khai báo một stored procedure, dòng số 2 chứa list tham số truyền vào, trong trường hợp trên chúng ta chỉ truyền vào 1 tham số mà thôi.|
|6| Khai báo biến có data type là NUMERIC|
|8-18| Ví dụ về vòng lặp đơn giản. Dòng số 8 chúng ta gán cho vòng lặp một label, khi giá trị l_balance_loop nhỏ hơn 1000, thì sẽ thực hiện câu lệnh LEAVE ở dòng 12, tức là sẽ thoát khỏi vòng lặp và sẽ tiếp tục thực thi câu lệnh ở sau END LOOP|
|9| Gọi store function account_balance, giá trị trả về của function sẽ được gán cho biến l_balance_remaining|
|11-16|Câu lệnh điều kiện IF sẽ khiến cho vòng lặp chấm dứt nếu như account_balance nhỏ hơn 1000, ngược lại thì sẽ gọi đến stored procedure ở dòng 15, chúng ta có thể bổ sung thêm các điều kiện khác bằng các sử dụng ESLE IF|
|15|Gọi lại một stored procedures khác, phần này mình sẽ giải thich ở bài viết tiếp theo|

### 3.3. Stored Functions
Một stored function là một stored program mà nó chỉ trả về duy nhất một giá trị và nó có thể được dùng ở bất cứ các function có sẵn nào, như trong câu SQL hoặc stored procedures chẳng hạn. Cùng tham khảo ví dụ sau:
```
1   CREATE FUNCTION f_age (in_dob datetime) returns int
2     NO SQL
3   BEGIN
4     DECLARE l_age INT;
5     IF DATE_FORMAT(NOW( ),'00-%m-%d') >= DATE_FORMAT(in_dob,'00-%m-%d') THEN
6       -- This person has had a birthday this year
7       SET l_age=DATE_FORMAT(NOW( ),'%Y')-DATE_FORMAT(in_dob,'%Y');
8     ELSE
9       -- Yet to have a birthday this year
10      SET l_age=DATE_FORMAT(NOW( ),'%Y')-DATE_FORMAT(in_dob,'%Y')-1;
11    END IF;
12    RETURN(l_age);
13  END;
```
| Line(s) | Explanation |
| -------- | -------- |
|1|Khai báo function gồm: tên, input parameter và kiểu dữ liệu trả về|
|2|Nó định nghĩa rằng hàm này không chứa câu lệnh SQL bên trong, có 1 số tranh cãi về việc sử dụng mệnh đề này, chúng ta sẽ tiếp tục thảo luận sâu hơn ở phần sau|
|4|Khai báo biến cục bộ chứa kết quả của việc tính tuổi|
|5-11|Sử dụng IF_ELSE_END IF block để tính tuổi dựa vào ngày tháng năm sinh ở input parameter|
|12|Trả về số tuổi tính được khi gọi hàm|