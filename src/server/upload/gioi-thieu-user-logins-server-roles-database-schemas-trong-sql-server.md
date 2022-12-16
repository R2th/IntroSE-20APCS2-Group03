# I. User Logins
SQL Server cho phép người dùng có thể tạo tài khoản và đăng nhập vào. Mỗi người dùng đều truy cập vào trong SQL Server qua 1 tài khoản riêng.

Khi tạo 1 tài khoản người dùng mới, quản trị viên sẽ cấp cho tài khoản này các quyền(Server Roles) và phạm vi có thể truy cập(Database Schemas). 

## Tạo tài khoản

1. Sử dụng SQL Server Management Studio, chọn dấu **+** để mở rộng tùy chọn **Security** và chuột phải vào **Logins**.
2. Chọn **New Login...**

![](https://images.viblo.asia/c9719a1a-9df6-4eca-bc7b-48c43116223f.png)

3. Tiếp đó cần điền đầy đủ các thông tin trong tab **General**.

![](https://images.viblo.asia/73faad42-7c98-4ac8-a5a0-5daf1ecf3e80.png)

4. Sau đó vào tab **Server Roles** để chọn các đặc quyền cho tài khoản trong SQL Server.

![](https://images.viblo.asia/dc02d614-07b5-4808-85e2-4714fdf14326.png)

5. Tiếp đến là tab **User Mapping** để chọn các DataBase mà tài khoản có thể kết nối tới, Schema bên trong Database. Sau đó chọn các đặc quyền(Role) đối với Database.
*Note: Role ở phần này phạm vi ảnh hưởng là trên Database đã chọn. Role ở phần 4 có ảnh hưởng trên SQL Server.

![](https://images.viblo.asia/57724735-45da-4e6f-82a6-7f491f90f776.png)

6. Chọn **OK** để hoàn thành việc tạo tài khoản.


## Đăng nhập thử tài khoản mới

1. Kết nối lại với SQL Server với tài khoản mới chúng ta vừa tạo bằng cách chọn **Change Connection...** bên trong menu **Query** của toolbar.

![](https://images.viblo.asia/cf71427d-8f2a-4e0a-9399-ffaedd115767.png)

2. Sau đó sẽ có form hiện ra để nhập các thông tin chúng ta vừa đăng ký phía trên.

# II. Server Roles
Để giới hạn mức độ truy cập trên từng tài khoản người dùng đối với SQL Server nên chúng ta có khái niệm Server Roles.

Khi chúng ta thực hiện tạo tài khoản, chúng ta sẽ có 1 tab **Server Roles** để chọn các đặc quyền trên SQL Server.

## Liệt kê các Server Role

Để nhìn các Server Role chúng ta vào SQL Server Management Studio, từ **Object Explorer** mở rộng **Security** folder.

![](https://images.viblo.asia/07e7d5fd-454e-4fe9-b0f2-fc6c90a5a188.png)

SQL Server cung cấp 9 Server Roles. Chúng ta không thể thêm hoặc xoá bỏ bất kì Server Role nào, chúng là cố định.

## Giải thích về các Server Role

|  Server Role | Giải thích | 
| -------- | -------- |
| sysadmin | Có thể làm bất kỳ điều gì trong SQL Server |
| serveradmin | Có thể tuỳ chỉnh cấu hình máy chủ và tắt máy chủ |
| setupadmin | Có thể thêm và xóa các máy chủ được liên kết bằng cách sử dụng các câu lệnh Transact-SQL |
| securityadmin | Có thể **GRANT**, **DENY**, **REVOKE** với cơ sở dữ liệu được cấp quyền truy cập. Có thể tự thay đổi mật khẩu |
| processadmin | Có thể tắt hoặc tạm dừng bất kỳ tiến trình nào hoạt động trên SQL Server |
| dbcreator | Có thể tạo, thay đổi, xoá và khôi phục bất kỳ cơ sở dữ liệu nào |
| diskadmin | Có thể quản lý các file của SQL Server|
| bulkadmin | Có thể thực thi các câu lệnh BULK INSERT |
| public | Không thể làm bất kì điều gì tác động tới cơ sở dữ liệu. Chỉ có thể truy cập tới các Object được public bên trong cơ sở dữ liệu |

# III. Database Schemas
Trong SQL Server, **Database Schemas** hỗ trợ quản lý bảo mật, giới hạn truy cập với các tài khoản khác nhau.

## Database Schemas là gì?
Database Schemas giống như **namespace** trong lập trình. Nó là 1 thùng chứa các Object(Table, SP, View, ...).

Bạn có thể giới hạn quyền đăng nhập người dùng bằng cách chỉ cho phép truy cập tới 1 Schema nhất định của Database. 

## Tạo Database Schema
1. Từ **Object Explorer**, mở rộng folder **Security**, chọn **Schemas**.
2. Chuột phải **Schemas**, chọn **New Schema...**.

![](https://images.viblo.asia/9f39f4cb-3aaa-4edb-8e7d-506d3c8c9ad7.png)

3. Sau đó điền các thông tin cần thiết tại tab **General**. Ở đây mình lấy ví dụ đặt tên Schema là "Maintenance"

![](https://images.viblo.asia/020923ff-98b5-49c8-acc8-e70aa041c4f9.png)

4. Sang tab **Permissions** để thêm người dùng có thể truy cập vào schema này.
5. Để thêm người dùng, chọn **Search...** rồi chọn **Browse...**

![](https://images.viblo.asia/d7cbf811-daef-432c-91d2-2a26e50efd41.png)

6. Chọn người dùng và nhấn **OK**.

![](https://images.viblo.asia/8dcbeda9-7cc9-4de2-9eb8-f72b47b99d38.png)

7. Sau khi đã thêm người dùng thành công, chúng ta sẽ cấp quyền cho họ với Schema này.

![](https://images.viblo.asia/cd569757-5527-401f-ae2c-ad745e69a1df.png)

8. Chọn **OK**.

## Thêm 1 bảng vào Database Schema
Chúng ta sẽ thêm 1 bảng đã tồn tại trong Database vào Schema mới chúng ta vừa tạo bằng cách thay đổi từ Schema mặc định "dbo" sang Schema mới "Maintenance".

1. Tới Table mà chúng ta muốn thêm, nhấn chuột phải chọn Design.

![](https://images.viblo.asia/ba353688-2aa2-41f7-8510-b777b3bd2c7b.png)

2. Từ **Properties** chúng ta chọn **Schema** để thay đổi.

![](https://images.viblo.asia/5780eda4-e1fb-4ade-95d8-28f0047925cc.png)

3. Sau khi thay đổi sẽ có 1 cảnh báo "Changing the schema of this object will result in all current permissions being dropped. Are you sure you want to proceed?.". Bạn chọn **OK**.
4. Tắt form và nhấn **Yes** để lưu phần thay đổi.


## Xác nhận kết quả
Bạn thực hiện **Refresh** lại folder **Tables** bằng cách chuột phải và chọn **Refresh**
![](https://images.viblo.asia/28ddd1fc-682c-446e-8566-1e9183de7da1.png)

Mình xin kết thúc bài viết tại đây. Cảm ơn các bạn đã dành thời gian đọc bài viết này.