# **1.Introduction**
Bạn có 1 Database A chưa rất nhiều dữ liệu đã được tạo từ lúc mới start dự án đến giờ. Trong lúc code task, khách hàng có update thêm column, thay đổi vị trí các cột nhưng nó không được cập nhật đúng với DDL hiện tại của dự án.

Vào một ngày đẹp trời, khách hàng deploy trên môi trường mới và họ muốn tạo Database B được `migrate` từ file DDL trên. Việc đó ok, chúng ta có thể làm 1 cách bình thường, nhưng vấn đề ở đây là phải lấy tất cả data đã có từ Database A trên để insert vào cấu trức Database B được tạo mới từ `migrate`. 

Chúng ta sẽ  export structure và data của Db A, sau đó thay đổi vị trí columns , data trong file export để insert vào Db B. Nếu bạn có 50 table thì làm thế nào ? 

Chúng ta sẽ sử dụng **DbSync** một công cụ dùng để so sánh và đồng bộ hai hoặc nhiều bảng cơ sở dữ liệu MySQL từ xa rất hiệu quả.

### Lưu ý: 
Trước khi tiến hành đồng bộ dữ liệu thì bạn nên backup 1 bản đề phòng sau này nhé! 
# **2.Prerequisites**
Cài đặt package ở bất kỳ thư mục nào trong máy tính của bạn:

```
composer require mrjgreen/db-sync

```

![](https://images.viblo.asia/7848901e-b2a8-45e8-986b-c6381f05720d.png)

# **3.Getting Started**

### Config File
Theo mặc định, **DbSync** sẽ tìm một file có tên **dbsync.ini** trong thư mục hiện tại để get các tham số cần thiết cho việc kết nối Database.

```
user=root (username Db A)
password= (password Db A)
target.user=(username Db B)
target.password=(password Db B)
```

Nếu bạn không có file này thì khi chạy lệnh bạn phải nhập các tham số như: `--user --password` để kết nối đến Database.
# **4.Testing**
Giả sử mình có một table là `blogs.tags` ở server với 5 record:

![](https://images.viblo.asia/464f5716-4256-4ca2-8a3a-964389b71e2f.png)

Ở localhost mình cũng có bảng `blogs.tags` với cấu trúc database thế này:

![](https://images.viblo.asia/166261ed-cf0e-4f8d-8b2e-f60628b7840d.png)

Bạn có thể thấy vị trí các cột của table `tags` ở localhost và server không đồng nhất với nhau. 

Nếu bạn import bằng file `.sql` thì bạn phải sữa lại thứ tự các cột và dữ liệu của Db A để phù hợp với Db B dưới localhost. Nhưng với **DbSync** thì bạn không cần phải làm vậy!

Bạn chỉ cần chạy lệnh:

```
db-sync {host}:{port} 127.0.0.1 blogs.tags --execute
```

* {host}: Địa chỉ host của Db A, nơi đang lưu trữ dữ liệu.
* {post}: cổng kết nối của Mysql thường sẽ là 3306.
* Tên database và table ở server và localhost đều là: `blogs.tags`


![](https://images.viblo.asia/932fcd27-c8da-4f9d-94fa-bdb1c0110025.png)

Database B ở phía localhost đã được cập nhật, rất tiện lợi và nhanh chóng!
![](https://images.viblo.asia/c10f583d-62d8-41c2-971d-3edee837dda2.png)

Nếu bạn muốn chỉ đồng bộ cột name của table `blogs.tags` thì chạy lệnh:

```
db-sync {host}:{port} 127.0.0.1 blogs.tags -c name --execute
```

Ngoài ra còn rất nhiều tùy chọn thú vị khác, hy vọng bài viết hữu ích cho những ai đang gặp trường hợp tương tự như mình!

Link github tham khảo của bài viết ở đây: [DbSync
](https://github.com/mrjgreen/db-sync?fbclid=IwAR2kMHjcgI7Jn-D6RZ8Wr8FbFVQVlknTaepVEUM0qxpQh1k1gr_Y4FbGL3I)