Để thuận tiện hơn trong việc thao tác với RDS database trên GUI như MySQL Workbench hôm nay mình cùng thiết lập các cài đặt nhé!

1. Setup một EC2 trong cùng VPC với RDS như là server trung gian để kết nối tới DB.
    
    Một số điểm lưu ý với EC2 trung gian này:
* Ở network VPC, chọn VPC mà RDS đang nằm trong đó.
* Ở Subnet thì chọn public subnet và enable Auto-assign Public IP.
* Nếu cho phép mọi người truy cập vào EC2 này thì set Security Group là 0.0.0.0/0, còn nếu là private thì mở port 22 cho những IP được phép truy cập. 
* Lưu key pair (File .pem) về máy local.
* Kiểm tra Security Group của RDS xem đã cho phép EC2 access vào chưa.

    Kiểm tra kết nối RDS từ EC2 xem đã được chưa bằng cách ssh vào EC2 cài đặt thêm mysql-client phù hợp với hệ điều hành EC2
    ```
    $ mysql -h {RDS_HOST}.rds.amazonaws.com -u {USER} -P 3306 -p
    -> Gõ password
    ```

2. Thiết lập cài đặt trên GUI Mysql Workbench

![](https://images.viblo.asia/a00b56ac-a39e-40c3-a4a2-e77da13210f7.png)

    Ấn vào (+) để thêm kết nối

![](https://images.viblo.asia/d90dc461-10f0-43e8-8e63-a6bf516dfbe2.png)

* Connection Name: Tuỳ ý
* Connection Method: Chọn Standard TCP/IP over SSH
* SSH Hostname: Public IP Address của EC2 tạo ở bước 1 và port SSH (VD: 10.33.33.33:22)
* SSH Username: Tuỳ thuộc vào hệ điều hành chọn cho EC2 thông thường là ec2-user (Nếu là HĐH khác thì tham khảo username ở đây https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/managing-users.html)
* SSH Password: Không cần
* SSH Key file: Đường dẫn tới .pem file ở bước 1
* MySQL Hostname: DNS name của RDS database
* MySQL Server Port: Port của RDS MySQL (thông thường là 3306)
* Username: User của RDS
* Password: Password của RDS

Ấn Test connection nếu thành công thì ấn OK để lưu kết nối.

Cảm ơn mọi người đã đọc tới đây!!