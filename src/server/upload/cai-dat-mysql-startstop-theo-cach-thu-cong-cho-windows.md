## 1. Download
 - Hôm nay xin giới thiệu cho các bạn cách Cài đặt MySQL theo cách thủ công cho Windows. Đầu tiên các bạn download MySQL tại https://downloads.mysql.com/archives/community/ 
 - Bạn có thể chọn version 5.x hoặc 8.x
 - Download MySQL file .zip về và giải nén vào thư mục vd: mysql-v8
##  2. Khởi tạo database MySQL lần đầu
  `cd mysql-v8/bin`
 - Run command khởi tạo database lần đầu
 `mysqld.exe --initialize`
 ![](https://images.viblo.asia/910bfd54-f0e2-4498-95aa-e7086a0b96e3.png)
 - Chờ cho MySQL khởi tạo database xong
 ![](https://images.viblo.asia/77ad1efc-376d-4d2c-9ea3-6ef35a44edd8.png)
 - Quay lại mysql-v8 sẽ thấy thư mục data, mở thư muc này và tìm đến file <name_pc>.err để lấy password cho user root. Bạn có thể mở bằng notepad và tìm đến dòng root@localhost
 - Tuy nhiên đây là password mặc định khi bạn đăng nhập vào MySQL lần đầu sẽ phải đổi pass lại
 - Bạn cũng có thể để rỗng nếu cần.
##  3. Start MySQL và change password cho user root
 - Để start MySQL bạn dùng lệnh như sao
 `cd mysql-v8/bin`
`mysqld.exe`

- Giữ cmd window đó và mở thêm cmd window mới và dùng lệnh
`mysql -u root -p` nhấn enter và nhập password mặc ở step 2

![](https://images.viblo.asia/a979328f-83ac-46ce-bfd5-7dc1f338a4ae.png)

- Màn hình khi đăng nhập thành công

![](https://images.viblo.asia/2e0ac59f-9bd6-42f0-8223-0f929ceae83b.png)
- Sau đó bạn tiến hành đổi password cho user root bạn dùng lệnh ALTER

`> ALTER USER 'root'@'localhost' IDENTIFIED BY '<new_pass>';`

## 4. Kết
Mysql Không có lệnh stop, nếu bạn muốn stop thì kill process nó nhé trong task manager hay bạn có thể tạo batch script start/stop cho MySQL

Done, Chúc các ban thành công.