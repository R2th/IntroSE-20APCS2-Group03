## 1. Giới thiệu
Đôi khi chúng ta cần thao tác với database(DB) trên server EC2 của aws. 

Và thật vất vã khi gõ từng dòng lệnh sql, kết quả hiển thị lại là cái bảng terminal đen thui thui. Thật khó chịu phải không nào. 

Thế làm thế nào để mình có thể thao tác với DB mysql thuận tiện y như dưới local của mình thông qua MySql Workbench.  Và bài viết này này giúp bạn làm điều ấy :D

Lưu ý: Bài này mình chỉ áp dụng cho Mysql thôi nhé. 
## 2. Hướng dẫn
### Bước 1: Cài đặt MySql Workbench
- Đối với ubuntu: 
    ```
    sudo apt-get install mysql-workbench
    ```
    [Hướng dẫn](https://www.linode.com/docs/databases/mysql/install-and-configure-mysql-workbench-on-ubuntu/)

- Đối với Windows: 

    [Hướng dẫn](https://www.youtube.com/watch?v=Z0ZcCmt7pd0)
    
 Note: Trường hợp install xong mà bị lỗi ko mở lên được thì tham khảo: [Tại đây](https://stackoverflow.com/questions/18673285/mysql-workbench-not-opening-on-windows)
 
 ### Bước 2: Tạo ssh, tạo account cấp quyền truy cập vào EC2
[Gennerate ssh](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) 
 
 Sau khi có ssh  thì có 2 hướng:
 1. Bạn là người deploy thì ném ssh vào `~/.ssh/authorized_keys`
 2. Bạn là người "làm công ăn lương" thì xin sếp cấp quyền truy cập vào server, ném ssh đó cho sếp bảo sếp add bạn vào thư mục trên :D 
 
 Đồng thời cũng được cấp cho 1 account truy cập vào EC2.
 
 Để test thành công hay không thì bạn chỉ cần chạy thử:  Ví dụ ip server là: `10.0.3.89` và user là: `ec2-user` 
 
Thì bạn chạy lệnh `ssh ec2-user@10.0.3.89` nếu vào được server thì có nghĩa là bạn có thể sử dụng user, ip và ssh cho bước tiếp theo.

 ### Bước 3: Tạo connection tới DB mysql trên EC2
 Tạo connection bằng cách: click vào dấu (+) bên cạnh Mysql Connections
 
 Sau đó nhập các thông tin bên dưới, bao gồm:
 
- **Connection Name:** Là tên connection để bạn phân biệt với những connection khác. Ví dụ mình đặt DB EC2 chẳng hạn
-  **Connection Method:** Chọn `Standard TCP/IP over SSH`
 Trong tab `Parameters` thì:
 - **SSH Hostname:** đây là ip ssh của bạn hoặc hostname server AWS
 - **SSH Username:** Là user được cấp ở bước 2.
 - **SSH Password:** Trường hợp có password thì click vào `Store in Keychain...` rồi nhập vào. nếu ko có thì bỏ qua
 
 - **SSH Key file:** 
 
     Cách 1: dùng file ssh
     Di chuyển tới thư mục chưa file ssh bằng tay hoặc làm 2 bước dưới đây:
     + `cd ~/.ssh/authorized_keys`
     + Dùng lệnh `pwd` rồi sau đó copy đường truyền vào. 

    Cách 2: file xxxxxxxxxxxx.pem khi tạo instance EC2 mà bạn download về. (cách này ko thông dụng bằng cách trên) 
 
 Tiếp đến là phần thông tin DB
 
 - **MySQL Hostname:** Thường thì sẽ để ip localhost, vì đã connect vào EC2 phía trên rồi. 
 - **MySQL Server Port:** Port của MySQL, mặc định là 3306
 - **Username:** user đăng nhập vào mysql 
 - **Password:** password đăng nhập vào mysql (nếu có)

Ảnh minh họa.
 ![](https://images.viblo.asia/fd15ea06-0744-4072-9adf-ed98a73debb8.png)
 
 Sau đó click vào `Test Connections` nếu ra hình bên dưới thì chúc mừng bạn đã thành công:
 ![](https://images.viblo.asia/7581dd87-58be-4ec2-a4ca-d5a44d939b48.png)

## 3. Lưu ý: 
1. Server EC2 phải mở cổng cho phép truy cập mysql từ xa
![](https://images.viblo.asia/7b0f11ca-96d3-4fbf-b504-89e3d4a4cd17.png)

2. Nên phân quyền khi tạo account connect mysql hạn chế việc lỡ tay drop DB :D 
[Hướng dẫn phân quyên](http://kungfulaptrinh.com/tao-va-cap-quyen-cho-user-trong-mysql/)

## 4. Kết luận
Cảm ơn các bạn đã theo dõi. hi vọng bài viết giúp ích được cho các bạn. (bow)

### Tài liệu tham khảo
https://vannstudios.com/connecting-mysql-database-engine-on-amazon-ec2-from-mysql-workbench
https://www.linkedin.com/pulse/using-mysql-workbench-connect-your-server-aws-ec2-ubuntu-william-ku