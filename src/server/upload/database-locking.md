## Database locking trong ngữ cảnh của SQL là gì? 

Database locking được sử dụng để khóa Khóa một số dữ liệu trong database để chỉ một database user / session có thể cập nhật dữ liệu cụ thể đó. Vì vậy, database locking tồn tại để ngăn hai hoặc nhiều databse user cập nhật cùng một dữ liệu chính xác tại cùng thời gian chính xác. Khi dữ liệu bị khóa, điều đó có nghĩa là một database session khác KHÔNG thể cập nhật dữ liệu đó cho đến khi khóa được giải phóng (mở khoá dữ liệu và cho phép database user khác cập nhật dữ liệu đó. Khóa thường được mở bởi câu lệnh ROLLBACK hoặc COMMIT trong SQL.

## Điều gì xảy ra khi một session khác cố gắng cập nhật dữ liệu bị khóa?

Giả sử database session A cố gắng cập nhật một số dữ liệu đã bị khóa bởi database session B. Điều gì xảy ra với session A? Session A thực sự sẽ được đặt trong trạng thái gọi là **lock wait** và session A sẽ bị dừng tiến trình với bất kỳ SQL transaction nào đang thực hiện. Nói cách khác, session A sẽ bị đình trệ cho đến khi session B giải phóng khóa trên dữ liệu đó.

Nếu một session chờ đợi quá lâu đối với một số dữ liệu bị khóa, thì một số cơ sở dữ liệu sẽ bị timeout sau một khoảng thời gian nhất định và trả về lỗi thay vì chờ đợi và sau đó cập nhật dữ liệu theo yêu cầu. Nhưng một số cơ sở dữ liệu , giống như Oracle, có thể xử lý tình huống khác nhau - Oracle có thể để session ở trạng thái chờ khóa trong một khoảng thời gian không xác định. Vì vậy, có rất nhiều sự khác biệt giữa các nhà cung cấp cơ sở dữ liệu khác nhau về cách họ chọn xử lý khóa. và các session khác đang chờ khóa được giải phóng.

## Các kỹ năng khoá dữ liệu

Database lock thực tế có thể được thực hiện ở nhiều cấp độ khác nhau - còn được biết đến như là **lock granularity** - bên trong cơ sở dữ liệu.

Đây là danh sách của các cấp độ lock và kiểu dữ liệu hỗ trợ.

### Khóa cấp cơ sở dữ liệu (database level locking)

Với khóa cấp độ cơ sở dữ liệu, toàn bộ cơ sở dữ liệu bị khóa - điều đó có nghĩa là chỉ một database session có thể áp dụng bất kỳ cập nhật nào cho cơ sở dữ liệu. Loại khóa này không thường được sử dụng, vì rõ ràng nó ngăn tất cả người dùng ngoại trừ một người cập nhật bất cứ điều gì trong cơ sở dữ liệu. Tuy nhiên, khóa này có thể hữu ích khi cần một số cập nhật hỗ trợ chính - như nâng cấp cơ sở dữ liệu lên phiên bản mới của phần mềm. Cơ sở dữ liệu Oracle thực sự có một chế độ độc quyền, được sử dụng để cho phép chỉ một session database user - về cơ bản, đây là một khóa cơ sở dữ liệu.

### Khoá cấp tệp tin (file level locking)

Với khoá cấp tệp tin, toàn bộ một database file bị lock. Vậy chính xác thì một file trong database là gì? Nó có thể một khoảng rộng dữ liệu - bên trong một file có thể là cả một bảng, một phần của bảng, hoặc nhiều phần của các bảng khác nhau. Vì có sự đa dạng trong dữ liệu được lưu trong một file, cấp độ khoá này không được nhiều người sử dụng.

### Khóa cấp bảng (table level locking)

Khóa cấp bảng khá đơn giản - có nghĩa là toàn bộ bảng bị khóa toàn bộ. Cấp khóa này có ích khi thực hiện thay đổi ảnh hưởng đến toàn bộ bảng, như cập nhật tất cả các hàng trong bảng hoặc điều chỉnh bảng Trong Oracle, đây được gọi là khóa DDL, bởi vì nó được sử dụng với các câu lệnh DDL (Ngôn ngữ định nghĩa dữ liệu) như CREATE, ALTER và DROP - về cơ bản là các câu lệnh sửa đổi toàn bộ bảng bằng cách này hay cách khác.

### Khóa cấp độ trang hoặc khối (page or block level locking)

Khoá cấp độ trang hoặc khối xảy ra khi một khối hoặc trang là một phần của tệp cơ sở dữ liệu bị khóa. Để đọc thêm về các trang và khối nếu bạn chưa quen với chúng, hãy truy cập vào đây: [Pages versus blocks.](https://www.programmerinterview.com/database-sql/page-versus-block/)

Bởi vì dữ liệu có thể được lưu trữ trong các khối / trang có thể rộng và đa dạng, khóa trang / khối ít được ưa chuộng trong cơ sở dữ liệu ngày nay.

### Khóa cấp độ cột (column level locking)

Khóa cấp độ cột có nghĩa là một số cột trong một hàng nhất định trong một bảng đã cho bị khóa. Hình thức khóa này không được sử dụng phổ biến vì nó đòi hỏi nhiều tài nguyên để kích hoạt và giải phóng các khóa ở cấp độ này. Ngoài ra, có rất ít hỗ trợ khóa cấp cột trong hầu hết các nhà cung cấp cơ sở dữ liệu.

### Khóa cấp độ hàng (row level locking)

Khóa cấp hàng áp dụng cho một hàng trong bảng. Đây cũng là cấp khóa phổ biến nhất và thực tế tất cả các nhà cung cấp cơ sở dữ liệu chính đều hỗ trợ khóa cấp hàng.

## Locking có được tự động được sử dụng bởi cơ sở dữ liệu?

Khi dữ liệu bị xóa hoặc cập nhật locking luôn được sử dụng - ngay cả khi người dùng cơ sở dữ liệu không viết SQL của mình để nói rõ ràng rằng khóa phải được sử dụng. Nhiều RDBMS hiện nay cũng có hỗ trợ để sử dụng lệnh “FOR UPDATE OF” kết hợp với một câu lệnh SELECT bình thường. Về cơ bản, mệnh đề "FOR UPDATE OF" nói rằng người dùng cơ sở dữ liệu dự định cập nhật một số dữ liệu - mặc dù người dùng cơ sở dữ liệu không bắt buộc phải thay đổi dữ liệu cụ thể đó. cập nhật dữ liệu được khai báo, điều đó có nghĩa là khóa cũng sẽ được thực hiện trên dữ liệu đó.

## Ví dụ về database locking

Như một ví dụ đơn giản về việc khóa sẽ được sử dụng bởi cơ sở dữ liệu, giả sử chúng ta có SQL sau:

```
UPDATE some_table SET some_field = "some_value" 
WHERE some_column = "XYZ";
```

Câu lệnh SQL ở trên sẽ khóa một hoặc nhiều hàng có giá trị của "XYZ" cho cột có tên là "some_column" dùng.
Việc khóa (các) hàng xảy ra ngầm như là một phần của phần mềm RDBMS và nó cũng ngăn các database user session khác cập nhật cùng một hàng vào cùng một thời điểm chính xác.

## Dữ liệu có thể được đọc khi bị khóa không?

Nó phụ thuộc vào khóa, vì một số khóa là read-exclusive, điều đó có nghĩa là các phiên khác trong cơ sở dữ liệu thậm chí không thể đọc được dữ liệu bị khóa.

## Vậy mục đích của database locking là gì?

Nếu bạn chưa rõ, lý do chúng ta có khóa cơ sở dữ liệu là để ngăn chặn việc mất dữ liệu có thể xảy ra nếu cập nhật được áp dụng đồng thời. Nếu hai người dùng cơ sở dữ liệu khác nhau được phép cập nhật cùng một dữ liệu. vào cùng một thời điểm chính xác, khi đó kết quả có thể gây nhầm lẫn và tai hại. Nhưng nếu cùng một dữ liệu bị khóa, thì vấn đề đó sẽ không phát sinh, vì mỗi lần chỉ có một người dùng có thể cập nhật dữ liệu bị khóa.

##  Tranh chấp khoá là gì?

Một vấn đề xảy ra khi có khóa là khóa có thể gây ra sự tranh chấp, điều đó có nghĩa là vì có khóa trên dữ liệu, các sessions tồn tại cùng lúc (sessions đồng thời) về cơ bản cạnh tranh để có quyền áp dụng các cập nhật trên cùng một dữ liệu, bởi vì dữ liệu đó có thể bị khóa bởi bất kỳ session nào. Trong trường hợp tốt nhất, sự tranh chấp khóa có nghĩa là một số user process chạy chậm hơn vì session đang chờ khóa. Trong trường hợp xấu nhất, việc các sessions cạnh tranh để khóa có thể tạo ra việc đình trệ cho nhiều sessions trong một khoảng thời gian không xác định.

Khi các phiên bị đình trệ trong một khoảng thời gian không xác định, được gọi là deadlock, bạn có thể đọc thêm về đây: [database deadlock](https://www.programmerinterview.com/index.php/database-sql/database-deadlock/)

## Tham khảo

https://www.programmerinterview.com/database-sql/database-locking/