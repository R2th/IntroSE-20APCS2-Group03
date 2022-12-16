## 1. Giới thiệu SQL động
Khi bạn cần viết một thủ tục, trong đó tùy thuộc vào giá trị của các tham số đầu vào mà câu lệnh SQL cần thực hiện sẽ thay đổi, bạn cần tạo lập chuỗi lệnh SQL trong chương trình và thực thi chuỗi này. Chuỗi lệnh SQL đó được gọi là sql động. Ví dụ khi có một tham số vào qui định tên bảng cần được truy vấn; hoặc khi bạn có một đoạn sql code lưu trữ trong database (như một biểu thức tính toán hoặc mệnh đề WHERE…) và bạn cần ghép vào thành một lệnh SQL hoàn chỉnh để thực thi.

## 2. Cách thực thi 
Các cách thực thi chuỗi sql động
Có hai cách là EXEC() và sp_ExecuteSql.
### 2.1 EXEC()
EXEC() có cú pháp rất đơn giản: EXEC(@SqlString) trong đó @SqlString là chuỗi sql động

```sql
EXEC('SELECT * FROM dbo.Tblxxx WHERE col1 = '   @val)
--hoặc
DECLARE @SqlStr VARCHAR(1000)
SET @SqlStr = 'SELECT * FROM dbo.Tblxxx WHERE col1 = '   @val
EXEC(@SqlStr)
```

Đơn giản như vậy nhưng EXEC() luôn đi kèm với hai nhược điểm chính, đó là lỗi sql injection và biên dịch lại code
### 2.2 Sp_ExecuteSql()
Sp_ExecuteSql khắc phục được hai nhược điểm trên (với điều kiện bạn viết đúng cách). Cú pháp của sp_executesql như sau:

```sql
EXEC SP_EXECUTESQL 
@STATEMENT = @SqlStr, 
@params = @ParamDefinition, 
@Param1 = Val1,
@Param2 = Val2
```
Trong đó hai tham số đầu là bắt buộc, các tham số còn lại là tùy chọn

@statement: là câu lệnh bạn yêu cầu thực hiện, có kiểu dữ liệu NVARCHAR(MAX) (với SQL Server 2000 là NTEXT). Chú ý là nó chỉ chấp nhận kiểu NVARCHAR là unicode chứ không chấp nhận kiểu VARCHAR.

@params: là định nghĩa các tham số dùng trong câu lệnh, cũng yêu cầu kiểu dữ liệu NVARCHAR(MAX) (hoặc NTEXT với SQL Server 2000)

Các tham số còn lại dùng để gán giá trị cho các tham số đã được khai báo trong @ParamDefinition

Ví dụ:
```sql
DECLARE @STATEMENT NVARCHAR(MAX),@ParamDefinition NVARCHAR(MAX)
SET @SqlStr = N'SELECT * FROM Sales.SalesOrderDetail WHERE ProductID = @ProductID2 AND OrderQty > @MinQty2'
SET @ParamDefinition = N'@ProductID INT, @MinQty INT'
EXEC SP_EXECUTESQL
@STATEMENT = @SqlStr,
@params = @ParamDefinition,
@ProductID2 = @ProductID,
@MinQty2 = @MinQty
```
Trong ví dụ trên, câu lệnh sql dùng hai tham số là @ProductID2 và @MinQty2, chúng được khai báo trong @ParamDefinition và được gán giá trị thông qua hai tham số tùy chọn ở cuối lệnh EXEC sp_executesql. Nếu câu lệnh sql dùng ba tham số thì cả ba đều phải được khai báo trong @ParamDefinition và kèm theo ba tham số tùy chọn để gán giá trị cho chúng. Lưu ý là @ProductID và @MinQty được truyền vào qua thủ tục, còn @ProductID2 và @MinQty2 được dùng trong nội bộ lệnh sp_executesql. Ta có thể dùng lại tên @ProductID và @MinQty vì chúng có phạm vi (scope) khác với thủ tục, nhưng như vậy là tự làm rắc rối thêm cho chính mình.

Cách viết trong ví dụ trên gọi là cách viết tham số hóa cho câu lệnh. Nó hóa giải được vấn đề sql injection vì nguyên giá trị được truyền vào qua tham số sẽ được sử dụng, không có lệnh phụ nào được tạo ra để thực hiện ngoài ý muốn. Nó cũng cho phép SQL Server dùng lại kế hoạch thực thi của câu lệnh (tránh phải biên dịch lại code) vì bản thân câu lệnh vẫn như cũ chỉ có tham số thay đổi. Đây là phương pháp thực hiện sql động được khuyến cáo của Microsoft, thực tế Linq to Sql cũng dùng thủ tục này.

Ở trên tôi có nhắc sp_executesql chỉ phát huy tác dụng nếu bạn viết đúng cách. Cách đúng là phải tách các tham số như ví dụ trên đây. Còn nếu bạn vẫn tạo chuỗi lệnh sql từ các tham số đầu vào rồi thực hiện nó, thì kết quả sẽ không khác gì so với EXEC().
## 3. Ví dụ tìm kiếm và phân trang với Sp_ExecuteSql
Tôi đã thực hiện ví dụ nhỏ đó là tạo 1 store procedure để tìm kiếm Nhân viên theo vài điều kiện tùy chọn và thực hiện phân trang 
```sql
CREATE PROCEDURE dbo.sp_SearchEmployee
  @EMP_NAME	nvarchar (50) = NULL,
  @EMP_POSITION	nvarchar (50) = NULL,
  @EMP_DEPARTMENT	nvarchar (50) = NULL,
  @START_ROW int = NULL,
  @MAX_ROWS	int = NULL,
  @ERR_CODE varchar (5) OUTPUT
AS
BEGIN

	DECLARE @WHERE_SQL nvarchar(MAX)
	DECLARE @ParmDefinition nvarchar(MAX)
	DECLARE @SEARCH_SQL	nvarchar(MAX)	

	SET @WHERE_SQL = ' WHERE 1 = 1 '

	IF ISNULL(@EMP_NAME, '') <> ''
	BEGIN
		SET @EMP_NAME = '%' + @EMP_NAME + '%'
		SET @WHERE_SQL = @WHERE_SQL + ' AND Name LIKE @EMP_NAME_IN '
	END

	IF ISNULL(@EMP_POSITION, '') <> ''
	BEGIN
		SET @WHERE_SQL = @WHERE_SQL + ' AND Position = @EMP_POSITION_IN '
	END

	IF ISNULL(@EMP_DEPARTMENT, '') <> ''
	BEGIN
		SET @WHERE_SQL = @WHERE_SQL + ' AND Department = @EMP_DEPARTMENT_IN '
	END

	SET @SEARCH_SQL = N'
		SELECT
		  SortData.*
		FROM (
		    SELECT
				ROW_NUMBER () OVER (ORDER BY NotSortData.Name ASC) AS ROW_NUMBER, NotSortData.*
			FROM (
				SELECT *
				FROM Employee'
			    +@WHERE_SQL+' 
			) NotSortData
		) SortData
		WHERE
			ROW_NUMBER BETWEEN @START_ROW_IN AND (@START_ROW_IN + @MAX_ROWS_IN - 1)'
	
	SET @ParmDefinition = N'@EMP_NAME_IN nvarchar (50),
							@EMP_POSITION_IN nvarchar (50),
							@EMP_DEPARTMENT_IN nvarchar (50),
							@START_ROW_IN int,
							@MAX_ROWS_IN int';

	EXECUTE sp_executesql @SEARCH_SQL, @ParmDefinition,
	@START_ROW_IN= @START_ROW,
	@MAX_ROWS_IN=@MAX_ROWS,
	@EMP_NAME_IN=@EMP_NAME,
	@EMP_POSITION_IN=@EMP_POSITION,
	@EMP_DEPARTMENT_IN =@EMP_DEPARTMENT

	IF @@RowCount = 0
	BEGIN
		SET @ERR_CODE = 'E001'
		RETURN
	END
END
```
Tôi đã chạy vài case và output như bên dưới

![](https://images.viblo.asia/16f0db99-5414-4084-9c73-2c0b891b0a4f.png)
![](https://images.viblo.asia/1b490796-a459-40ef-9f4f-9fd1ad0d4d36.png)
![](https://images.viblo.asia/a32ee991-36b4-42b3-8149-bf9993aa8bd4.png)

Hy vọng bài viết này một phần nào đó có thể giúp các bạn đang tìm hiểu về sql động, chúc các bạn thành công.

Tài liệu thàm khảo:
http://www.sqlviet.com/blog/sql-dong
...