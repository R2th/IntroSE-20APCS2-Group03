# 1. Giới thiệu
Trong bài viết này mình sẽ chỉ cho bạn cách cho phép `lưu lại log của tất cả các truy vấn SQL` của MySQL  trên hệ điều hành Ubuntu. 

Mình thấy điều này rất hữu ích, trợ giúp cực lớn cho các bạn khi degug liên quan đến truy vấn, thao tác với Database. 

Cách này cũng dễ hiểu hơn về cách ứng dụng hoạt động bằng cách theo dõi các truy vấn SQL mà nó sử dụng. Vậy hãy bắt đầu...

# 2. Hướng dẫn
**Bước 1:** 
Để bật chế độ lưu log của MySQL, chúng ta phải chỉnh sửa tệp cấu hình MySQL nằm trong `/etc/mysql/my.cnf` trên Ubuntu.

*Lưu ý:* Chúng ta phải làm điều đó với quyền quản trị.

Vì vậy, chúng ta chạy lệnh sau đây trên Terminal:
```
sudo nano /etc/mysql/my.cnf
```

**Bước 2:** Xác định vị trí các dòng sau:
```
[mysqld]

#general_log_file        = /var/log/mysql/mysql.log
#general_log             = 1
```
Để bật chúng, mình chỉ cần đơn giản là xóa đi dấu ghi chú `#` trước mỗi dòng là xong. Và kết quả là:
```
[mysqld]

general_log_file        = /var/log/mysql/mysql.log
general_log             = 1
```

*Lưu ý:* Trường hợp không tìm thấy 2 dòng này thì bạn có thể thoải mái copy paste vào là xong :D

**Bước 3:**  Khới động lại mysql
```
sudo service mysql restart
```

**Bước 4:** Vào xem kết quả

Bây giờ bạn có thể theo dõi log các truy vấn của MySQL của mình trong thời gian thực bằng cách sử dụng lệnh `tail` hoặc xem qua tệp `/var/log/mysql/mysql.log`. Ví dụ như:
```
sudo tail -f /var/log/mysql/mysql.log
```

Đó là những gì chúng ta cần làm.

# 3. Trải nghiệm
## 3.1 Khi thao tác với Mysql Workbench
Thao tác: Khi select all Admin trong mysql Work Bench
![](https://images.viblo.asia/7efaba1c-a948-48a8-b0fd-c6e0896e6582.png)
Log Mysql  nhận được
![](https://images.viblo.asia/abbbc548-576b-4ce7-8bab-e4c180ed1ce0.png)
## 3.2 Khi thao tác với Rails console
Thao tác: `Admin.first` trong rails c
![](https://images.viblo.asia/6011a889-6b84-4543-a79f-61716ac8e12f.png)

Log Mysql nhận được
![](https://images.viblo.asia/81472bde-7b9e-4eac-a4f6-d30ba661aec3.png)

## 3.3 Khi thao tác với Application
Thao tác: Click vào menu show ra list contact của ứng dụng
![](https://images.viblo.asia/5e00b5cf-c78b-4b0d-a716-f70335d19b17.png)

Log Mysql nhận được
![](https://images.viblo.asia/33f9b787-0687-40a2-9e72-8fed9776fc3f.png)

**Note:** Đối với ứng dụng Rails thì mình đã có log sql rồi, nên sẽ ko thấy có ích nhiều. nhưng đối với các framework không show log như Wordpress... thì nó có ích ko hề ít :D
# 4. Kết luận
**LƯU Ý:** Xin lưu ý rằng log của MySQL khi bật lên nó sẽ ảnh hưởng tới Performance của hệ thống, vì vậy đừng bật nó lên trên môi trường Production, Chúng ta chỉ dùng nó chỉ để Debug. 

Chúc các bạn tìm ra lỗi đó khiến bạn phải kích hoạt lưu lại nội dung log của MySQL.
Chúc may mắn. :D

Tài liệu tham khảo: http://www.techytalk.info/configure-mysql-to-keep-log-of-all-queries-on-ubuntu/