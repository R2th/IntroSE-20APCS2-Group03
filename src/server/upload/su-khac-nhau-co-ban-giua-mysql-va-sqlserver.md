### Mở đầu
Một ngày nào đó khi đang làm việc ngon lành với MySql và tưởng trừng cả cuộc đời là để dành chọn cho nó. Cũng trong ngày hôm đó khi project A của bạn đã và đang được release, công việc của bạn chỉ là ngồi xem phim và chờ mấy chị tét tờ lên danh sách bug, thì một tin nhắn được send thẳng đến bạn.
> A: T đang có project XXX này, nó làm bằng ABC..XYZ mày muốn đá thêm không :sweat_smile: ?
> 
> Me: :ok: Cho xin cái lịch caffe.
> 
Không chần chừ đúng chuyên môn cộng thêm đây đang là thời gian rảnh của dự án vậy tội gì không đá thêm kiếm chút :money_with_wings: gia tăng thu nhập :D. Sau khi caffe và bàn về dự án vs thằng bạn có một điều mãi mà bạn vẫn bẵn khoăn là: Tại sao khách hàng lại dùng MSSQL (SqlServer) nhỉ và đây là lý do bạn nhận được.
> Tại khách hàng họ có server là **windowns server 2012**
> 
Vì đã có kiến thức nền tảng của Sql nên bạn không ngại khó lao vào tìm hiểu SqlServer với một niềm tin vững chắc chỉ cần 1 ngày là đủ :s.

-----
- Bỏ qua những vấn đề về việc install hay config bạn băng băng vào mớ lý thuyết hỗn độn để tìm điểm giống và khác nhau chủ yếu của 2 HQT này cuối cùng đúc kết ra được vài thứ nhỏ nhoi như sau.

### HQTCSDL đối lập nhau

- Trong khi MySql có sẵn và miễn phí vì nó là là mã nguồn mở, nhưng SQLServer thì không. Bạn phải bỏ tiền ra và mua nó :D.
- Ở MySql bạn có **workbench** giao diễn dễ nhìn trực quan, nhưng nó chả đáng là bao nếu so với **Microsoft SQL Server Management Studio**.
- Về các **function** hay **stored procedure** ở SqlServer bạn được hỗ trợ nhiều hơn và họ cũng khuyến khích bạn dùng những thứ này hơn.
### Cú pháp khác nhau
- Mình sẽ lấy vài ví dụ để cho bạn biết sự khác biệt của 2 HQT này ra sao.

#### 1. Những câu lệnh cơ bản
* comment trong MySql và SqlServer bạn sẽ dùng **--** nhưng trong Mysql bạn phải thêm 1 khoảng trắng vào sau **--**

    VD: `-- select`
- Nối chuỗi 

    MySql bạn dùng **CONCAT(string, string2, …)** còn SqlServer chỉ đơn giản là **string + string2 + …**
- Số hàng bị ảnh hưởng của câu lệnh truy vấn

``` sql
--MySql
SELECT .... ;
SELECT FOUND_ROWS();

-- SqlServer
SELECT .... 
GO
SELECT @@ROWCOUNT
```


#### 2. Các kiểu dữ liệu tương đương
| Sql Server | MySql |
| -------- | -------- |
| BIT     | TINYINT     |
| FLOAT(p)	     | DOUBLE     |
|SMALLMONEY|DECIMAL(6,4)|
| MONEY     | DECIMAL(15,4)     |
| NTEXT     | LONGTEXT     |
| NVARCHAR(max)	     | LONGTEXT     |
| XML     | LONGTEXT     |
| TEXT     | LONGTEXT     |
| IMAGE     | LONGBLOB     |
| ROWVERSION     | BINARY(8)     |
| TIMESTAMP     | BINARY(8)     |
| SMALLDATETIME     | DATETIME     |
#### 3. Các hàm cơ bản thường dùng tương ứng
| Sql Server | MySql |
| -------- | -------- |
| CONVERT(DATETIME, string, style)     | STR_TO_DATE(string, format)     |
| CONVERT(VARCHAR, datetime, style)	     | DATE_FORMAT(datetime, format)     |
| DATEADD(unit, value, exp)|TIMESTAMPADD(unit, value, exp)|
| DATEDIFF(units, start, end) | TIMESTAMPDIFF(units, start, end)|
| GETDATE()     | NOW()     |
| GETUTCDATE()     | UTC_TIMESTAMP()     |
| HOST_NAME()     | 	@@HOSTNAME     |
| LEN(string)    | CHAR_LENGTH(RTRIM(string))     |
| STR(float, len, decimal)     | CONVERT(float, CHAR)     |
#### 4. Những câu query thần thánh
- **Limit**

    ``` sql
    --Trong MySql lấy 3 vị trí đầu tiên.
    Select * from tbl Limit 0,3
    --Trong SqlServer lấy 3 vị trí đầu tiên.
    Select TOP 3 * from tbl
    ```

- **Trigger**

    Trigger trong SqlServer và MySql có sự khác biệt cơ bản về cú pháp, nhưng ta chỉ cần nhớ 2 điều sau.
    
    **INSERTED = NEW**
    
    **DELETED = OLD**
    
    Từ đây ta có thể khởi tạo 1 trigger cơ bản ở 2 bên như sau:
    ``` sql
    -- SqlServer
    CREATE TRIGGER trg_DatHang ON tbl_DatHang AFTER INSERT AS 
    BEGIN
	UPDATE tbl_KhoHang
	SET SoLuongTon = SoLuongTon - (
		SELECT SoLuongDat
		FROM inserted
		WHERE MaHang = tbl_KhoHang.MaHang
	)
	FROM tbl_KhoHang
	JOIN inserted ON tbl_KhoHang.MaHang = inserted.MaHang
    END
    
    -- MySql
    CREATE TRIGGER trg_DatHang 
    AFTER insert
    ON tbl_DatHang FOR EACH ROW 
    BEGIN
        UPDATE tbl_KhoHang
        SET SoLuongTon = SoLuongTon - NEW.SoLuongDat
        where MaHang = New.MaHang;
    END;
    ```
    
#### 5. Các câu lệnh logic
| SqlServer | MySql |
| -------- | -------- |
| IF … ELSE IF …     | IF condition THEN … END IF;     |
| FLOAT(p)	     | IF … ELSEIF … |
|WHILE condition BEGIN stmts END|WHILE condition DO stmts END WHILE;|

### Kết luận
- Đến đây nhiều người sẽ nghĩ rằng SqlServer tốt hơn MySql nhưng thực sự là không phải vậy. Tùy mục đích sử dụng hay những ngôn ngữ thường dùng mà bạn sẽ lựa chọn việc sử dụng HQT nào cho hợp lý.
- Câu truyện trên là có thật nhưng vì một vài ví dụ so sánh ở dưới phần nhiều có lợi cho Sqlserver hơn nên mình quyết định đổi vế của nó để làm giảm bớt phần nào sự thiên vị. :D
- Bài viết trên chỉ là so sánh nho nhỏ giữa MySql và SqlServer, trên thực tế có rất nhiều HQT khác như Oracle, Informix, Postgres,... đó toàn là những **RDMS (Relational Database Management System)** nổi tiếng. Nên việc các developer phải sử dụng chúng là điều tất yếu. Nhưng nếu bạn nắm vững Sql căn bản hoặc ORM của các ngôn ngữ sử dụng thì vấn đề này không còn là khó khăn.

Cảm ơn các bạn đã đọc bài viết của mình 😄. Mọi ý kiến đóng góp xin vui lòng bình luận bên dưới, mình sẽ tiếp thu và chỉnh sửa nếu có gì sai sót. thank you!