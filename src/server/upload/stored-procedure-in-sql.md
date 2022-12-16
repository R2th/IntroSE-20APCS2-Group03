## I. Khái Niệm
Các câu lệnh SQL có thể được nhúng vào trong các ngôn ngữ lập trình, thông
qua đó chuỗi các thao tác trên cơ sở dữ liệu được xác định và thực thi nhờ vào các câu
lệnh, các cấu trúc điều khiển của bản thân ngôn ngữ lập trình được sử dụng.
Với thủ tục lưu trữ, một phần nào đó khả năng của ngôn ngữ lập trình được đưa
vào trong ngôn ngữ SQL. Một thủ tục là một đối tượng trong cơ sở dữ liệu bao gồm
một tập nhiều câu lệnh SQL được nhóm lại với nhau thành một nhóm với những khả
năng sau:
* Các cấu trúc điều khiển (IF, WHILE, FOR) có thể được sử dụng trong thủ
tục.
* Bên trong thủ tục lưu trữ có thể sử dụng các biến như trong ngôn ngữ lập
trình nhằm lưu giữ các giá trị tính toán được, các giá trị được truy xuất được
từ cơ sở dữ liệu.
* Một tập các câu lệnh SQL được kết hợp lại với nhau thành một khối lệnh
bên trong một thủ tục. Một thủ tục có thể nhận các tham số truyền vào cũng
như có thể trả về các giá trị thông qua các tham số (như trong các ngôn ngữ
lập trình). Khi một thủ tục lưu trữ đã được định nghĩa, nó có thể được gọi
thông qua tên thủ tục, nhận các tham số truyền vào, thực thi các câu lệnh
SQL bên trong thủ tục và có thể trả về các giá trị sau khi thực hiện xong.
# II. Thủ Tục (Procedure)
## 1. Tạo Thủ Tục
Thủ tục lưu trữ được tạo bởi câu lệnh `CREATE PROCEDURE` với cú pháp như
sau:
```
CREATE PROCEDURE tên_thủ_tục [(danh_sách_tham_số)]
[WITH RECOMPILE|ENCRYPTION|RECOMPILE,ENCRYPTION]
AS
Các_câu_lệnh_của_thủ_tục
```
Trong đó:
* `tên_thủ_tục` : Tên của thủ tục cần tạo. Tên phải tuân theo qui tắc
định danh và không được vượt quá 128 ký tự.
* `danh_sách_tham_số`: Các tham số của thủ tục được khai báo ngay sau tên
thủ tục và nếu thủ tục có nhiều tham số thì các khai
báo phân cách nhau bởi dấu phẩy. Khai báo của
mỗi một tham số tối thiểu phải bao gồm hai phần:
    * `tên tham số` được bắt đầu bởi dấu @.
    * `kiểu dữ liệu` của tham số
* `RECOMPILE`: Thông thường, thủ tục sẽ được phân tích, tối ưu và
dịch sẵn ở lần gọi đầu tiên. Nếu tuỳ chọn `WITH RECOMPILE` được chỉ định, thủ tục sẽ được dịch
lại mỗi khi được gọi
* `ENCRYPTION`: Thủ tục sẽ được mã hoá nếu tuỳ chọn `WITH ENCRYPTION` được chỉ định. Nếu thủ tục đã được
mã hoá, ta không thể xem được nội dung của thủ tục.
* `các_câu_lệnh_của_thủ_tục`: Tập hợp các câu lệnh sử dụng trong nội dung thủ tục. Các câu lệnh này có thể đặt trong cặp từ khoá
`BEGIN...END` hoặc có thể không.
## 2. Lời Gọi Thủ Tục
cú pháp gọi thủ tục như sau:
```
tên_thủ_tục [danh_sách_các_đối_số]
```
Số lượng các đối số cũng như thứ tự của chúng phải phù hợp với số lượng và thứ tự
của các tham số khi định nghĩa thủ tục.
Thứ tự của các đối số được truyền cho thủ tục có thể không cần phải tuân theo
thứ tự của các tham số như khi định nghĩa thủ tục nếu tất cả các đối số được viết dưới
dạng:
```
@tên_tham_số = giá_trị
```

## 3. Sử Dụng Biến Trong Thủ Tục
Ngoài những tham số được truyền cho thủ tục, bên trong thủ tục còn có thể sử
dụng các biến nhằm lưu giữ các giá trị tính toán được hoặc truy xuất được từ cơ sở dữ
liệu. Các biến trong thủ tục được khai báo bằng từ khoá `DECLARE` theo cú pháp như
sau:
```
DECLARE @tên_biến kiểu_dữ_liệu
```
## 4. Giá Trị Mặc Định Của Tham Số
Các tham số được khai báo trong thủ tục có thể nhận các giá trị mặc định. Giá
trị mặc định sẽ được gán cho tham số trong trường hợp không truyền đối số cho tham
số khi có lời gọi đến thủ tục.
Tham số với giá trị mặc định được khai báo theo cú pháp như sau:
```
@tên_tham_số kiểu_dữ_liệu = giá_trị_mặc_định
```
## 5. Sửa Đổi Thủ Tục
Khi một thủ tục đã được tạo ra, ta có thể tiến hành định nghĩa lại thủ tục đó bằng
câu lệnh `ALTER PROCEDURE` có cú pháp như sau:
```
ALTER PROCEDURE tên_thủ_tục [(danh_sách_tham_số)]
[WITH RECOMPILE|ENCRYPTION|RECOMPILE,ENCRYPTION]
AS
Các_câu_lệnh_Của_thủ_tục
```

## 6. Xóa Thủ Tục
Để xoá một thủ tục đã có, ta sử dụng câu lệnh `DROP PROCEDURE` với cú
pháp như sau:
```
DROP PROCEDURE tên_thủ_tục
```
# III. Ví Dụ
Giả sử ta cần thực hiện một chuỗi các thao tác như sau trên cơ sở dữ liệu:
* Bổ sung thêm môn học cơ sở dữ liệu có mã TI-005 và số đơn vị học
trình là 5 vào bảng `MONHOC`
* Lên danh sách nhập điểm thi môn cơ sở dữ liệu cho các sinh viên học
lớp có mã C24102 (tức là bổ sung thêm vào bảng `DIEMTHI` các bản ghi
với cột `MAMONHOC` nhận giá trị TI-005, cột `MASV` nhận giá trị lần
lượt là mã các sinh viên học lớp có mã C24105 và các cột điểm là
NULL).
Nếu thực hiện yêu cầu trên thông qua các câu lệnh SQL như thông thường, ta phải thực
thi hai câu lệnh như sau:
```
INSERT INTO MONHOC VALUES('TI-005','Cơ sở dữ liệu',5)
```
```
INSERT INTO DIEMTHI(MAMONHOC,MASV)
SELECT ‘TI-005’,MASV
FROM SINHVIEN
WHERE MALOP='C24102'
```
Thay vì phải sử dụng hai câu lệnh như trên, ta có thể định nghĩa môt thủ tục lưu trữ với
các tham số vào là `@mamonhoc`, `@tenmonhoc`, `@sodvht` và `@malop` như sau:
```
CREATE PROC sp_LenDanhSachDiem(@mamonhoc NVARCHAR(10), @tenmonhoc NVARCHAR(50), @sodvht SMALLINT, @malop NVARCHAR(10))
AS
    BEGIN
        INSERT INTO monhoc VALUES(@mamonhoc,@tenmonhoc,@sodvht)
        INSERT INTO diemthi(mamonhoc,masv)
            SELECT @mamonhoc,masv FROM sinhvien WHERE malop = @malop
    END
```

Khi thủ tục trên đã được tạo ra, ta có thể thực hiện được hai yêu cầu đặt ra ở trên một
cách đơn giản thông qua lòi gọi thủ tục:
```
sp_LenDanhSachDiem 'TI-005','Cơ sở dữ liệu',5,'C24102'
```