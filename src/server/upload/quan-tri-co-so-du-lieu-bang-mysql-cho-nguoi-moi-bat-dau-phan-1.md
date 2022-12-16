# Giới thiệu
SQL (Structured Query Language) hay còn gọi là ngôn ngữ truy vấn cấu trúc. Dùng để tương tác với Database (Cơ sở dữ liệu).
Database là một cốt lõi không thể thiếu của mỗi ứng dụng web hay mobile, nó dùng để lưu trữ thông tin của ứng dụng. Vậy làm thế nào để quản lý được dữ liệu ấy? Bài viết này sẽ giải quyết vấn đề ấy cho anh em.
    
# Tạo cơ sở dữ liệu
Ở bài viết này mình sử dụng MySql làm hệ quản trị cơ sở dữ liệu. Hiện nay có rất nhiều hệ quản trị cơ sở dữ liệu như SQL Server, Oracle, MongoDB... anh em có thể tham khảo trên mạng. Để sử dụng MySql, anh em tải phần mềm Xampp [Tại đây](https://www.apachefriends.org/download.html) và cài đặt như bình thường, nếu bị lỗi trong quá trình cài đặt thì comment để mình fix nhé. :D

1.    Mở ứng dụng Xampp sau khi đã cài đặt.

        ![](https://images.viblo.asia/7c3f2d79-1cdf-415a-b42a-a201370307af.PNG)
        Click Start dòng Apache và MySql để mở server (lúc này máy tính của mình như là một hệ quản trị cơ sở dữ liệu rồi đó! :D)
        
  2.  Vào trang phpMyAdmin để tạo cơ sở dữ liệu. 
        Ví dụ tạo 1 cơ sở dữ liệu để quản lí sinh viên sẽ như trong hình
        ![](https://images.viblo.asia/0346bd0d-5f39-4fdb-9e4c-9b9675b9e815.PNG)
        Đấy là việc tạo bằng giao diện có sẵn, Cách khác ta có thể tạo database bằng câu truy vấn SQL như sau: `CREATE DATABASE sinhvien`
        
 3.    Sau khi tạo database thành công thì ta sẽ tạo các bảng. Quản trị sinh viên thì ắn hẳn phải có bảng sinh viên để lưu thông tin sinh viên chứ nhỉ? Vậy ta sẽ tạo 1 bảng sinh viên  để lưu trữ thông tin của sinh viên
        Câu lệnh tạo bảng có tên SinhVien sẽ là:
        `CREATE TABLE SinhVien (MSSV int NOT NULL PRIMARY KEY, HoVaTen varchar(30), GioiTinh int, Lop varchar(10), Khoa varchar(10))`
        Như vậy ta đã tạo một bảng SinhVien có `MSSV` kiểu int và là khóa chính, không được để trống, `HoVaTen` kiểu string có độ dài tối đa là 30, `GioiTinh` kiểu int,  `Lop` và `Khoa` kiểu string có độ dài tối đa là 10.
        **Các kiểu dữ liệu cơ bản trong SQL**
        * String: `varchar, text, blob, ...`
        * Number: `tinyint, int, bigint,...`
        * Date & time: `Date, Time, Datetime, Timestamp`
        
  4 .   Sau khi tạo bảng thành công, thì có các câu lệnh để tương tác dữ liệu là: INSERT, SELECT, UPDATE, DELETE tương ứng với các thao tác thêm, xem, sửa, xóa.
  
 **INSERT**
    Để thêm 1 sinh viên vào bảng ta sẽ dùng câu lệnh sau:
    
    `INSERT INTO SinhVien (MSSV, HoVaTen, GioiTinh, Lop, Khoa) VALUES (1, 'Nguyen Van A', 1, '15T1', 'CNTT')`
Để thêm nhiều sinh viên thì ta sẽ dùng câu lệnh: 
    
    `INSERT INTO SinhVien (MSSV, HoVaTen, GioiTinh, Lop, Khoa) VALUES (1, 'Nguyen Van A', 1, '15T1', 'CNTT'), (2, 'Phan Thi B', 0, '15T1', 'Hoa')`
        
 **SELECT**
    Sau khi thêm dữ liệu vào, ta sẽ select ra để xem bằng câu lệnh đơn giản sau:
        `SELECT * FROM SinhVien`
        
Còn nếu muốn chỉ xem MSSV và Họ tên của sinh viên thì dùng câu lệnh sau:
        `SELECT MSSV, HoVaTen FROM SinhVien`
        
Nếu chỉ xem danh sách sinh viên của khoa `CNTT` thì thêm điều kiện `WHERE` bằng cách dùng câu lệnh như sau:
        `SELECT MSSV, HoVaTen FROM SinhVien WHERE Khoa = 'CNTT'`
        
Ở câu lệnh trên mình sử dụng toán tử `=`, với các trường có dữ liệu kiểu `string` thường sử dụng toán tử `LIKE`, khi thay toán tử `=` bằng toán tử `LIKE` ở câu lệnh SQL trên thì ta vẫn nhận được cùng một kết quả trả về.
            
**UPDATE**
Để sửa lớp của sinh viên có MSSV = 1 sang lớp 15T2 thì ta dùng câu lệnh sau: 
   `UPDATE SinhVien SET Lop = '15T2' WHERE MSSV = 1 `

**DELETE**
    Để xóa sinh viên của lớp 15T1 ta dùng câu lệnh sau: `DELETE FROM SinhVien WHERE Lop = '15T1'`
    
**Lưu ý**: với câu lệnh DELETE, khi anh em quên điều kiện `WHERE` thì bảng `SinhVien` sẽ bị xóa hết dữ liệu. Ví dụ: `DELETE FROM SinhVien`.
# Tổng kết
   Ở phần này mình giới thiệu cho anh em về các câu lệnh cơ bản hi vọng giúp anh em có thể xử lí các chức năng cơ bản của Database. Các bài viết tiếp theo mình sẽ đi sâu chi tiết từng câu lệnh, từng toán tử được sử dụng trong SQL hơn.
   Hi vọng bài viết này giúp ích được những anh em lần đầu tiếp cận tới Database.