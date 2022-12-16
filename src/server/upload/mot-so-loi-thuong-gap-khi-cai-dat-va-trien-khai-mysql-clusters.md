# Mở đầu
Chuyện kể về một Intern System Admin khi được Leader yêu cầu tìm hiểu về mô hình MySQL bao gồm việc triển khai và cách hoạt động của mô hình này. Tuy nhiên việc học một thứ gì mới thì chưa bao giờ là dễ dàng, vì vậy bạn Intern này cũng mắc phải những lỗi khá ngớ ngẩn có khi mất đến cả một ngày để fix. Nay mình xin phép được thay bạn Intern ngớ ngẩn này chia sẻ lại các lỗi đã gặp phải mong các bạn sẽ tiết kiệm được chút thời gian.

# Lỗi Node Mysqld API not connected, accept connect from
![](https://images.viblo.asia/473fe33e-69c6-44c7-847b-cc255890a454.jpg)

Lỗi trên có thể do rất nhiều các nguyên nhân: chưa thông mạng, NodeID chưa hợp lý, xung đột cổng,... Tuy nhiên nếu bạn cài đặt theo đúng các bước như trong [bài viết hướng dẫn cài đặt này ](https://www.howtoforge.com/tutorial/how-to-install-and-configure-mysql-cluster-on-centos-7/) mà vẫn bị lỗi này thì phần lớn là do **SELinux** ( Security-Enhanced Linux ) đã block kết nối. Cách fix vô cùng đơn giản: TẮT SELinux.

**Bước 1:**  Truy cập vào file cấu hình SELinux theo đường dẫn `/etc/selinux/config` chuyển trạng thái từ **enforcing** sang **disabled**
![](https://images.viblo.asia/c3025059-a9fa-402a-a88d-5a041f806e80.png)

**Bước 2:** Khởi động lại Service trên cả Management Node và SQL API Node. Tỉ lệ thành công đến 99%.

Trên Management Node:

`sudo ndb_mgmd --initial --config-file=/your_config_directory/config.ini`

Trên MySQL API Node:

`sudo service mysql restart`


# Sử dụng Engine InnoDB
Nếu không để ý khi ra xuất database từ các phần mềm rất dễ bản dump ra sẽ có các yếu tố thêm thắt như 

**ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;**

![](https://images.viblo.asia/4e2a09c8-da09-4c17-8182-abdd1c885221.PNG)

Việc này vô tình sẽ khiến cho bảng này sẽ không sử dụng được trong MySQL Cluster mặc định do dùng **Engine NDB**.
# Lỗi khởi động Mysqld API Node trước Data Node
Với cái lỗi ngớ ngẩn này khiến mình mất gần 1 tiếng đi tìm lỗi trên khắp google. Đơn giản chỉ là phải khởi động service ndbd trên Data Node trước khi khởi động service mysql trên SQL API Node. 

![](https://images.viblo.asia/14ae8502-e019-4aad-8930-4a2c1f5b50ab.png)


Thứ tự khởi động chuẩn sẽ là: **Management Node** => **Data Node** => **API Node.**

# Kết
Hy vọng các bạn sẽ tiết kiệm được chút thời gian khi gặp phải vấn đề tương tự. Bài tiếp theo mình sẽ giải thích cách thức hoạt động giữa các node trong mô hình MySQL Clusters. Have a nice day!

# Tham khảo
https://codefaq.org/server/how-to-fix-mysql-cluster-not-connected-accepting-connect-from-error/
https://dev.mysql.com/doc/refman/8.0/en/mysql-cluster-replication-conflict-resolution.html