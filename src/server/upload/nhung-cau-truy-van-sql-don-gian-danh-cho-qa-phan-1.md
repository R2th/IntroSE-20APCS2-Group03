Trong quá trình test sản phẩm web, tester thường gặp những trường hợp phải test cả những dữ liệu mà chỉ có thể lấy được dữ liệu cần thiết khi thực hiện truy vấn database qua những câu truy vấn SQL.

## SQL là gì?
SQL (Structured Query Language) hay tên đầy đủ là ngôn ngữ truy vấn, là ngôn ngữ thông dụng sử dụng để thao tác cách hành động trên các hệ quản trị cơ sở dữ liệu. Nhờ có SQL mà tester có thể lấy ra được những dữ liệu phục vụ cho việc test của mình, vì vậy biết cách sử dụng sQL là một điểm cộng rất lớn đối với tester

## Kiến thức cơ bản về cơ sở dữ liệu:
Cơ sở dữ liệu là tập hợp các dữ liệu có tổ chức, tạo nên bởi các bảng và bản ghi trong bảng. Các bản ghi bao gồm các giá trị của một sự vật, sự kiện nào đó ví dụ như đối với một con người, chúng ta có tên, có tuổi, giới tính, ngày sinh, etc, đối với mỗi dữ liệu chúng ta sẽ có các cột tương ứng như cột tên, cột tuổi, cột giới tính, etc. Để viết được các câu truy vấn SQL, người dùng phải nắm được tên bảng, tên cột và kiểu giá trị của các cột. Để thực hiện các câu lệnh SQL chúng ta dùng tới một công cụ có tên hệ quản lý cơ sở dữ liệu. Hệ quản lý cơ sở dữ liệu là một công cụ tương tác với người dùng cuối, sử dụng các câu lệnh truy vấn SQL để thao tác với cơ sơ dữ liệu như thêm, sửa, xóa các dữ liệu có trong các bảng.

## Các câu lệnh đơn giản
### 1. Câu lệnh SELECT
Câu lệnh SELECT là câu lệnh phổ biến nhất trong SQL. Để có thể lấy ra một hoặc nhiều các bản ghi cần thiết, ta sẽ sử dụng câu lệnh SELECT này. Công thức của câu lệnh này như sau:
```
SELECT columnName FROM tableName;
```
Câu lệnh SELECT giúp chúng ta có thể lấy ra những cột dữ liệu cần thiết hoặc nếu muốn lấy hết tất cả các cột có trong bảng, hãy dùng dấu * để đại diện cho tất cả các cột (Ví dụ:  SELECT * FROM tableName;). Sau đó từ khóa FROM để chỉ cho hệ thống biết chúng ta đang lấy dữ liệu ra từ bảng nào. Ví dụ ta có một bảng lưu trữ về thông tin của các sinh viên có tên là **[SinhVien]** bao gồm các cột dự liệu như: ID, Tên sinh viên, Giới tinh, Ngày sinh, Nơi sinh và chúng ta muốn lấy ra ID của sinh viên, tên sinh viên và ngày sinh ta sẽ dùng câu lệnh sau:
```
SELECT sinhvienID, TenSinhVien, GioiTinh, NgaySinh FROM SinhVien;
```

### 2. Câu lệnh WHERE
Để tìm các bản ghi có điều kiện rõ ràng hoặc chúng ta đang cần tìm những dữ liệu chính xác, lúc này câu lệnh WHERE sẽ làm tròn vai trò của nó. Mục đích của câu lệnh này là để lấy ra những dữ liệu có những điều kiện nhất định. Sử dụng câu lệnh có công thức như dưới đây:
```
SELECT columnName FROM tableName WHERE condition;
```
Có thể thấy chúng ta vẫn phải dùng cả câu lệnh SELECT nữa, đúng vậy câu lệnh WHERE chỉ là phần bổ sung những thông tin chính xác cho bản ghi mà mình muốn tìm mà thôi. Với ví dụ đã nên ở trên, nếu ta muốn tìm những sinh viên có tên là "Mai", chúng ta có thể dùng câu truy vấn như sau:
```
SELECT * FROM SinhVien Where TenSinhVien = 'Mai';
```
Lưu ý nhỏ, khi các bạn sử dụng dấu ngoặc đơn để đánh dấu cho hệ thống biết rằng dòng trong ngoặc đơn là một chuỗi ký tự

### 3. Các toán tử AND, OR, NOT, BETWEEN
Đôi khi, để tìm ra được các bản ghi thích hợp cho việc test, chúng ta phải kết hợp các điều kiện lại với nhau và để làm được điều đó, chúng ta hãy sử dụng các toán tử AND, OR, NOT và BETWEEN

**AND: Sử dụng để lấy ra các bản ghi phải phù hợp với 2 hay nhiều điều kiện**
```
SELECT columnName FROM tableName WHERE condition1 AND condition2;
```
**OR: Sử dụng để lấy ra các bản ghi chỉ cần phù hợp 1 trong nhiều các điều kiện**
```
SELECT columnName FROM tableName WHERE condition1 OR condition2;
```
**NOT: Sử dụng để lấy ra cho chúng ta các bản ghi mà không hợp với điều kiện mà chúng ta đặt ra**
```
SELECT columnName FROM tableName WHERE NOT condition;
```
**BETWEEN: Sử dụng để lấy ra các ghi có giá trị nằm ở giữa 2 điều kiện nêu ra**
```
SELECT columnName FROM tableName WHERE condition1 BETWEEN condition2;
```
### 3. Câu lệnh sắp xếp
Để có thể sắp xếp được các bản ghi của chúng ta theo chiều tăng dần hay giảm dần, chúng ta sử dụng lệnh ORDER BY. Câu lệnh này có công thức như sau:

**Sắp xếp theo chiều tăng dần:**
```
SELECT columnName FROM tableName WHERE condition ORDER BY columnName ASC;
```
**Sắp xếp theo chiều giảm dần:**
```
SELECT columnName FROM tableName WHERE condition ORDER BY columnName DESC;
```

### 4. Các hàm tính toán
Trong quá trình làm test, chúng ta cần phải tính toán các các giá trị lại với nhau, để thực hiện điều này các hàm tính toán sẽ giúp chúng ta. Các hàm tính toán bao gồm:

**COUNT(): Sử dụng để đếm số lượng bản ghi không NULL theo cột phù hợp với điều kiện**
```
SELECT COUNT(columnName) FROM tableName WHERE condition;
SELECT COUNT(*) FROM tableName WHERE condition;
```

**AVG(): Sử dụng để tính tổng trung bình của các cột có kiểu dữ liệu là số**
```
SELECT AVG(columnName) FROM tableName WHERE condition;
```

**SUM(): Sử dụng để tỉnh tổng các giá trị có trong các cột có kiểu dữ liệu là số**
```
SELECT SUM(columnName) FROM tableName WHERE condition;
```

**MIN(): Sử dụng để trả về bản ghi có giá trị nhỏ nhất**
```
SELECT MIN(columnName) FROM tableName WHERE condition;
```

**MAX(): Sử dụng để trả về bản ghi có giá trị lớn nhất**
```
SELECT MAX(columnName) FROM tableName WHERE condition;
```

### 5. Kiểu dữ liệu Wildcard
Trên các trang web, chúng ta thường có thanh search kết quả và để test được xem thanh search của chúng ta có hoạt động đúng hay không, chúng ta sẽ viết câu truy vấn có chứa các ký hiệu wildcard. 2 ký hiệu wildcard đang được sự dụng phổ biến đó là % và . Sử dụng % để đại hiện cho 0 hoặc rất nhiều ký tự, chúng ta sử dụng _ để đại hiện cho 1 ký tự. Vẫn tiếp tục lấy ví dụ ở mục 1, chúng ta muốn tìm ra các sinh viên có tên bắt đầu với chữ "N", chúng ta sử dụng câu lệnh như sau:
```
SELECT * FROM SinhVien WHERE tenSinhVien = 'N%';
```
Để hiểu được cách sử dụng wilcard, mời các bạn theo dõi bảng dưới đây:

| vị trí wildcard | Ý nghĩa |
| ---------- | -------- |
| 'a%'     | Tìm tất cả các kết quả có bắt đầu với chữ cái "a"     |
| '%a'     | Tìm tất cả các kết quả có kết thúc với chữ cái "a"      |
| '%a%'     | Tìm tất cả các kết quả có chữ cái "a" nằm ở mọi vị trí      |
| '_a%'     | Tìm tất cả các kết quả có chữ cái "a" nằm ở vị trí thứ hai     |
| 'a_%_%'     | Tìm tất cả các kết quả bắt đầu bằng chữ cái "a" và có ít nhất 3 ký tự phía sau      |
| 'a%o'     | Tìm tất cả các kết quả bắt đầu bằng chữ cái "a" và kết thúc bằng chữ cái "o"    |

Mong rằng bảng trên đã giúp bạn hiểu được cách sử dụng wildcard.

Mình đã nêu ra các câu lệnh truy vấn SQL đơn giản mà các tester nên biết để áp dụng vào dự án đang làm nếu như có yêu cầu về test cơ sở dữ liệu. Tuy nhiên, đây chỉ là những câu lệnh đơn giản ở mức thấp nhất. Tới phần thứ 2, mình sẽ chỉ ra các thao tác phức tạp hơn 1 chút nhưng vẫn rất cần thiết khi xử lý các thao tác phức tạp hơn.

Tài liệu tham khảo : https://www.w3schools.com/