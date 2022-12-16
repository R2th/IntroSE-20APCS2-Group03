Bài viết này mình sẽ chia sẽ một số kiến thức về cách định nghĩa ràng buộc trong MS SQL Server.
## Constraint là gì?
Constraint là những quy tắc được áp dụng trên các cột dữ liệu, trên bảng. Được sử dụng để kiểm tra tính hợp lệ của dữ liệu vào, đảm bảo tính chính xác, tính toàn vẹn của dữ liệu.
## Các loại constraint phổ biến


| Loại ràng buộc| Ý nghĩa |
| -------- | -------- |
| NOT NULL     | Sử dụng để đảm bảo dữ liệu của cột không được nhận giá trị NULL     |
| DEFAULT     | Gán giá trị mặc định trong trường hợp dữ liệu của cột không được nhập vào hay không được xác định.    |
| UNIQUE    | Sử dụng để đảm bảo dữ liệu của cột là duy nhất, không trùng lặp giá trị trên cùng 1 cột.     |
| PRIMARY KEY (Khóa chính)     | Dùng để thiết lập khóa chính trên bảng, xác định giá trị trên tập các cột làm khóa chính phải là duy nhất, không được trùng lặp. Việc khai báo ràng buộc khóa chính yêu cầu các cột phải NOT NULL.    |
| FOREIGN KEY (Khóa ngoại)     | Dùng để thiết lập khóa ngoại trên bảng, tham chiếu đến bảng khác thông qua giá trị của cột được liên kết. Giá trị của cột được liên kết phải là duy nhất trong bảng kia.     |
| CHECK    | Bảo đảm tất cả giá trị trong cột thỏa mãn điều kiện nào đó. Đây là hình thức sử dụng phổ biến để kiểm tra tính hợp lệ của dữ liệu (validate data)    |

### Một số lưu ý đối với ràng buộc CHECK:
* Không thể định nghĩa trong VIEW
* Các điều kiện thiết lập phải tham chiếu đến cột trong cùng 1 bảng dùng để khai báo ràng buộc, không thể tham chiếu tới các cột ở bảng khác. Trường hợp muốn tham chiếu đến bảng khác thì có thể dùng Function để trích xuất dữ liệu.
* Không thể sử dụng subquery (truy vấn con) trong định nghĩa điều kiện
* Chúng ta có thể khai báo ràng buộc trong câu lệnh CREATE TABLE (tạo mới bảng) hoặc ALTER TABLE (Sửa đổi bảng)
## Ví dụ cụ thể
Cho bài toán quản lý Vay có thế chấp tài sản đơn giản thể hiện qua sơ đồ mức vật lý như sau:

![](https://images.viblo.asia/dd3e6dec-18fb-4ca2-a4ad-97ee3c91a7f2.png)

####  **1. Thiết lập ràng buộc NOT NULL trên cột MaKH của bảng KhachHang**
* Trường hợp tạo mới table:
```sql
CREATE TABLE KhachHang (
	MaKH char(10) NOT NULL,
	HoTen nvarchar(50),
	DiaChi nvarchar(50),
	DienThoai varchar(50),
	NgaySinh date
);
```
* Trường hợp sửa đổi table:
```sql
ALTER TABLE KhachHang MODIFY MaKH char(10) NOT NULL;
```
####  **2. Thiết lập ràng buộc DEFAULT cột NgayVay lấy giá trị mặc định là ngày hiện tại trong trường hợp ngày vay không được xác định.** (Sử dụng function GETDATE() để lấy giá trị ngày hiện tại)
* Trường hợp tạo mới table:
```sql
CREATE TABLE Vay (
	MaVay char(10) NOT NULL,
	MaKH char(10) NOT NULL,
	MaTaiSan char(10) NOT NULL,
	MaNV char(10) NOT NULL,
	NgayVay date DEFAULT GETDATE(),
	ThoiHan int,
	LaiSuat float,
	SoTienVay money,
	NgayHetHan date 
);
```
* Trường hợp sửa đổi table:
```sql
ALTER TABLE Vay
ADD CONSTRAINT df_ngay_vay DEFAULT GETDATE() FOR NgayVay;
```
####  **3. Thiết lập ràng buộc PRIMARY KEY (khóa chính) cho cột MaTaiSan trên table TaiSan**
* Trường hợp tạo mới table:

**Cách 1**: định nghĩa trực tiếp khi khai báo cột, không khai báo constraint
```sql
CREATE TABLE TaiSan (
	MaTaiSan char(10) PRIMARY KEY,
	TenTaiSan nvarchar(70) NOT NULL,
	LoaiTaiSan nvarchar(30),
	GiaTri money 
);
```
**Cách 2**: Định nghĩa constraint
```sql
CREATE TABLE TaiSan (
	MaTaiSan char(10) NOT NULL,
	CONSTRAINT pk_ma_ts PRIMARY KEY (MaTaiSan),
	TenTaiSan nvarchar(70) NOT NULL,
	LoaiTaiSan nvarchar(30),
	GiaTri money 
);
```
* Trường hợp sửa đổi table:
```sql
ALTER TABLE TaiSan
ADD CONSTRAINT pk_mats PRIMARY KEY (MaTaiSan);
```
####  **4. Thiết lập ràng buộc FOREIGN KEY (khóa ngoại) cho cột MaKH trên table Vay**
* Trường hợp tạo mới table:

**Cách 1**: định nghĩa trực tiếp khi khai báo cột, không khai báo constraint
```sql
CREATE TABLE Vay (
	MaVay char(10) NOT NULL,
	MaKH char(10) FOREIGN KEY REFERENCES KhachHang(MaKH),
	MaTaiSan char(10),
	MaNV char(10),
	NgayVay date,
	ThoiHan int,
	LaiSuat float,
	SoTienVay money,
	NgayHetHan date 
);
```
**Cách 2**: Định nghĩa constraint
```sql
CREATE TABLE Vay (
	MaVay char(10) NOT NULL,
	MaKH char(10),
CONSTRAINT FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
	MaTaiSan char(10),
	MaNV char(10),
	NgayVay date,
	ThoiHan int,
	LaiSuat float,
	SoTienVay money,
	NgayHetHan date 
);
```
* Trường hợp sửa đổi table:
```sql
ALTER TABLE Vay
ADD CONSTRAINT fk_makh FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH);
```
####  **5. Tạo ràng buộc UNIQUE (duy nhất) trên trường DienThoai của Bảng KhachHang**
* Trường hợp tạo mới table:

**Cách 1:**
```sql
CREATE TABLE KhachHang (
	MaKH char(10) NOT NULL,
	HoTen nvarchar(50) NOT NULL,
	DiaChi nvarchar(50) NOT NULL,
	DienThoai varchar(50) UNIQUE,
	NgaySinh date
);
```
**Cách 2:**
```sql
CREATE TABLE KhachHang (
	MaKH char(10) NOT NULL,
	HoTen nvarchar(50) NOT NULL,
	DiaChi nvarchar(50) NOT NULL,
	DienThoai varchar(50),
    CONSTRAINT unique_dien_thoai UNIQUE (DienThoai)
	NgaySinh date
);
```
* Trường hợp sửa đổi table:
```sql
ALTER TABLE KhachHang
ADD CONSTRAINT unique_dien_thoai UNIQUE (DienThoai);
```

### Lưu ý: 
Nên sử dụng **Cách 2** trong ở trên mình đưa ra, hay chính là việc chúng ta nên sử dụng kiểu khai báo có đặt tên ràng buộc thông qua khai báo bằng lệnh CONSTRAINT.
Vì với cách này bạn sẽ dễ dàng xóa bỏ, sửa đổi, bỏ kích hoạt, kích hoạt vì nó xác định qua tên của ràng buộc :wink:

####  **6. Ví dụ một số ràng buộc CHECK**
* Tạo ràng buộc check trên trường NgayVaoLam > ‘1/1/1995’ của bảng NhanVien.
```sql
ALTER TABLE NhanVien 
ADD CONSTRAINT check_ngay_vao_lam CHECK (NgayVaoLam > '1995-1-1');
```

* Tạo ràng buộc check trên trường NgayHetHan phải lớn hơn NgayVay của bảng Vay
```sql
ALTER TABLE Vay
ADD CONSTRAINT check_ngayhethan CHECK (NgayHetHan > NgayVay);
```

* Tạo ràng buộc kiểm tra trên trường GiaTri>=0 của bảng TaiSan
```sql
ALTER TABLE TaiSan
ADD CONSTRAINT check_gia_tri CHECK (GiaTri > 0);
```

* Tạo ràng buộc kiểm tra trên trường ThoiHan nằm trong khoảng 1 đến 36 tháng của bảng Vay
```sql
ALTER TABLE Vay
ADD CONSTRAINT check_thoi_han CHECK (ThoiHan BETWEEN 1 AND 36);
```
## Xóa bỏ constraint
**Cú pháp xóa bỏ:**
```sql
ALTER TABLE <tên table chứa ràng buộc>
DROP CONSTRAINT <tên ràng buộc muốn xóa bỏ>
```
**Ví dụ:** Xóa bỏ ràng buộc check_ngay_vao_lam trong table NhanVien đã khai báo ở mục 6.
```sql
ALTER TABLE NhanVien
DROP CONSTRAINT check_ngay_vao_lam
```

## Bỏ kích hoạt và kích hoạt constraint
Đôi khi bạn muốn bỏ việc check ràng buộc trong một số trường hợp nhưng lại không muốn xóa bỏ đi ràng buộc đã khai báo. Trường hợp này chúng ta có thể chọn tính năng bỏ kích hoạt.
**Cú pháp bỏ kích hoạt:**
```sql
ALTER TABLE <tên table chứa ràng buộc>
NOCHECK CONSTRAINT <tên ràng buộc>
```
**Ví dụ:** Vô hiệu hóa ràng buộc kiểm tra trên trường ThoiHan nằm trong khoảng 1 đến 36 tháng của bảng Vay
```sql
ALTER TABLE Vay
NOCHECK CONSTRAINT check_ngayhethan
```

Trường hợp muốn kích hoạt lại ràng buộc, chúng ta sử dụng cú pháp sau:
```sql
ALTER TABLE <tên table chứa ràng buộc>
WITH CHECK CHECK CONSTRAINT <tên ràng buộc>
```
**Ví dụ:** Vô hiệu hóa ràng buộc kiểm tra trên trường ThoiHan nằm trong khoảng 1 đến 36 tháng của bảng Vay
```sql
ALTER TABLE Vay
WITH CHECK CHECK CONSTRAINT check_ngayhethan
```

## Kết luận
Trên đây là những gì mình tổng hợp và tự đưa ra ví dụ minh họa cho từng phần. Hi vọng sẽ giúp ích cho các bạn trong quá trình sử dụng constraint trong câu lệnh sql.