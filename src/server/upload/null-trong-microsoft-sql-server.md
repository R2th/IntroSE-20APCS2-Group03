1. NULL là một giá trị đặc biệt có mặt trong tất cả các loại dữ liệu, từ kiểu số, ngày, chuỗi, đến bit… Nó đại diện cho giá trị “không biết”, hoặc “không tồn tại”. NULL không trùng với số 0 của kiểu số và cũng không trùng với chuỗi trống (”) của kiểu chuỗi. Ví dụ bạn có bảng dữ liệu sinh viên có chứa cột số lần thi lại; nếu một bản ghi chứa NULL ở cột này có nghĩa là ta không biết số lần thi lại của sinh viên đó là bao nhiêu; điều này khác với khi nó chứa 0 nghĩa là ta đã biết sinh viên đó chưa phải thi lại môn nào.
Vì NULL nghĩa là “không biết” nên mọi thao tác với NULL đều dẫn đến NULL. Đây là điều bạn cần ghi nhớ để tránh phiền phức khi liên quan đến xử lý NULL.

2. Nếu bạn cộng một số hoặc chuỗi với NULL, kết quả sẽ là NULL:

```sql
DECLARE @i INT, @c VARCHAR(10) --mặc định các biến này đều là NULL
SELECT 1+@i
SELECT 'a'+@c
SELECT DATEADD(d,@i,GETDATE())
```
Một tình huống nhiều khi gây rắc rối là khi bạn tạo một câu SQL động và thực hiện nó, nhưng không hay biết là chuỗi SQL động đó là NULL vì một thành phần khi tạo lập nó là NULL:

```sql
DECLARE @c VARCHAR(10), @SQL VARCHAR(100)
SET @c = NULL
SET @SQL = 'SELECT * FROM dbo.Tbl1 WHERE c='+@c
--SELECT @SQL
EXEC (@SQL)
```
Ở ví dụ trên, vì biến @c là NULL nên @SQL cũng là NULL, cho nên không có kết quả nào trả về, và ta ngẩn người ra vì không nhận được kết quả cũng không nhận được báo lỗi. EXEC(NULL) luôn thành công vì nó không phải làm gì cả.

3. Khi so sánh với NULL, ta cũng nhận được kết quả NULL thay vì giá trị boolean “Đúng” hoặc “Sai”. Vì thế khi truy vấn bảng mà trong mệnh đề WHERE có dùng cột chứa NULL, các bản ghi NULL luôn là ngoại lệ. Để lấy được các bản ghi này bạn cần dùng “IS NULL”. Còn để lấy được các bản ghi không NULL, bạn dùng “IS NOT NULL”. Ví dụ:

```sql
CREATE TABLE dbo.KhoHoaQua(MaSo INT, LoaiQua NVARCHAR(20), SoThung INT) --bảng Kho Hoa Quả, gồm Loại quả và số thùng.
INSERT INTO dbo.KhoHoaQua VALUES(1, N'Táo', 8)
INSERT INTO dbo.KhoHoaQua VALUES(2, N'Nho', NULL)
INSERT INTO dbo.KhoHoaQua VALUES(3, N'Cam', 15)
 
SELECT * FROM dbo.KhoHoaQua WHERE SoThung < 10 --chỉ có táo
SELECT * FROM dbo.KhoHoaQua WHERE SoThung >= 10 --chỉ có cam
SELECT * FROM dbo.KhoHoaQua WHERE SoThung IS NULL --giờ mới thấy nho
SELECT * FROM dbo.KhoHoaQua WHERE SoThung IS NOT NULL --chỉ lấy các bản ghi với SoThung không NULL
```
Để chuyển đổi NULL về một giá trị chỉ định, bạn dùng hàm ISNULL(). Ví dụ dưới qui NULL về 0 cho cột SoThung:
```sql
SELECT * FROM dbo.KhoHoaQua WHERE ISNULL(SoThung,0) < 10 --giờ có cả táo và nho
```

Một tình huống rắc rối khác với NULL là khi bạn dùng “NOT IN”, tình huống này được nêu chi tiết trong bài Lưu Ý Khi Viết Câu Lệnh Dùng “NOT IN”

4. Khi cột được khai báo là khóa chính, nó phải là NOT NULL, vì nếu chứa NULL nó không còn khả năng làm định danh cho bản ghi nữa.
Khi cột chứa NULL được tạo index, tất cả các bản ghi chứa NULL được lưu chung vào một node index, chúng được coi như có cùng giá trị. Vì thế nếu index là unique index, chỉ tối đa một bản ghi được chứa NULL.
Nếu một cột làm khóa ngoại và tham chiếu đến một cột ở bảng khác, cột khóa ngoại đó có thể chứa NULL mà không bị coi là vi phạm ràng buộc. Ví dụ bạn có bảng BanHang lưu các giao dịch bán hàng từ kho hoa quả trên; bảng BanHang chứa cột MaSo là mã số của loại hoa quả được bán và là khóa ngoại tham chiếu đến bảng KhoHoaQua; cột MaSo khi đó chỉ có thể chứa các giá trị 1,2,3 hoặc NULL.

5. Vì NULL có mặt trong mọi kiểu dữ liệu, bạn có thể CAST NULL đến bất kỳ kiểu dữ liệu nào bạn cần (CAST là hàm chuyển đổi kiểu dữ liệu):

```sql
SELECT *, CAST(NULL AS DECIMAL(8,2)) AS Gia
INTO #t
FROM dbo.KhoHoaQua
```
Bảng #t ở trên sẽ có thêm cột Gia có kiểu DECIMAL(8,2).

6. Khi dùng các hàm tính toán aggregate (như COUNT, SUM…), SQL loại bỏ các bản ghi NULL ra trước khi thực hiện do đó tránh được rắc rối khi dính với NULL:

```sql
SELECT COUNT(*), COUNT(SoThung), SUM(SoThung),AVG(SoThung)
FROM dbo.KhoHoaQua
```
Ở ví dụ trên, COUNT(*) vẫn đếm tất cả các bản ghi trong bảng, nhưng COUNT(SoThung) chỉ đếm các bản ghi khi SoThung khác NULL. Hai hàm sau đó là SUM và AVG cũng chỉ tính toán trên các bản ghi khi SoThung khác NULL.

### Tổng kết
Thực ra đây không phải sự nghiên cứu của mình mà mình tình cờ thấy 1 tài liệu nói về giá trị Null rất quen thuộc nhưng không phải ai cũng để ý đến, và mình đã lưu lại và chia sẻ tài liệu cho mọi người. <br>
Tài liệu gốc: http://www.sqlviet.com/blog/tan-man-ve-null