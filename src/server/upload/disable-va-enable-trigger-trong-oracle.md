Origin post: **https://www.tranthanhdeveloper.com/2020/12/disable-va-enable-trigger-trong-oracle.html**

Bài viết hôm nay chúng ta sẽ cùng tìm hiểu cách vô hiệu hóa hay còn gọi disable và kích hoạt lại trigger với Oracle database.

Lưu ý: Để có thể tiến hành disable hay enable trigger thì bắt buộc user phải có quyền ADMINISTER .

# Disable/Enable một trigger cụ thể
Để disable một trigger cụ thể trong Oracle database chúng ta có thể chạy câu lệnh dưới đây:

`ALTER TRIGGER trigger_name DISABLE;`

Để enable lại trigger chỉ cần thay thế DISABLE thành ENABLE.

`Ví dụ: ALTER TRIGGER trigger_name ENABLE;`

Qua hai câu lệnh trên các trigger có thể được enable hoặc disable một cách nhanh chóng.

# Disable/Enable toàn bộ trigger trên một table
Trong nhiều trường hợp ta muốn disable hay enable toàn bộ trigger trên 1 bảng cụ thể nhắm mục địch kiểm thử hay xóa, insert data thì việc liệt kê toàn bộ trigger liên quan đến một bảng là khá mất thời gian. Với trường hợp này hãy sử dụng hai câu lệnh dưới đây.

Disable toàn bộ trigger của 1 bảng: `ALTER TABLE table_name DISABLE ALL TRIGGERS;`

Enable toàn bộ trigger cho 1 bảng: `ALTER TABLE table_name ENABLE ALL TRIGGERS;`