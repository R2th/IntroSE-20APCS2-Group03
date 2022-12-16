Nghe có vẻ đây là một chủ đề đơn giản, nhưng nếu đây lần đầu bạn tìm hiểu vấn đề này thì cũng không dễ lắm đâu nhé.
Hệ thống user và phân quyền của MySQL cũng không mấy phức tạp đâu, chỉ mất một chút thời gian làm quen thôi.
Mình cùng bắt đầu nào.

## Tạo user

Để tạo user với MySQL chúng ta dùng query `CREATE USER`. Bạn có thể thêm `IF NOT EXISTS` để query không lỗi nếu user đã
tồn tại sẵn.

```sql
CREATE USER [IF NOT EXISTS] '<username>' [IDENTIFIED BY '<password>'];
```

Ví dụ mình tạo user `myussername` thì query sẽ như thế này,

```sql
CREATE USER IF NOT EXISTS 'myusername';
```

Nếu bạn muốn set password nữa thì thêm `IDENTIFIED BY` như này.

```sql
CREATE USER IF NOT EXISTS 'myusername' IDENTIFIED BY 'mypassword';
```

Giờ nếu nhỡ bạn quên chưa set password hoặc muốn đổi sang cái khác thì chúng ta sẽ dùng `ALTER USER`.

```sql
ALTER USER 'myusername'@'%' IDENTIFIED BY 'mypassword';
```

Nếu bạn muốn login mà không cần password nữa thì có thể set lại password thành empty như thế này.

```sql
ALTER USER 'myusername'@'%' IDENTIFIED BY '';
```

Bạn có thế thấy lần này mình có thêm đoạn `@'%'` ở phía sau username nữa.
Với MySQL, mỗi user sẽ được xác định bởi 2 thứ: *username* và *host* mà bạn đang truy cập đến.
Nghĩa là password và quyền của `myusername` khi bạn kết nối với MySQL từ localhost hoặc từ một client/server
có thể sẽ khác nhau hoàn toàn.

Ví dụ mình tạo user như thế này.

```sql
CREATE USER IF NOT EXISTS 'myusername'@'localhost';
CREATE USER IF NOT EXISTS 'myusername'@'%' IDENTIFIED BY 'mypassword';
```

Thì mình sẽ login được vào `myusername` mà không cần password nếu dùng `mysql` client trên cùng một máy với nơi chạy
MySQL như thế này.

```sh
mysql -u myusername
```

Nhưng nếu login từ một máy khác thì sẽ bị từ chối ngay.

```sh
$ mysql -h 172.17.0.1 -P 3306 -umyusername

ERROR 1045 (28000): Access denied for user 'myusername'@'172.17.0.1' (using password: NO)
```

Mà phải dùng password như thế này thì mới login được

```sh
mysql -h 172.17.0.1 -P 3306 -umyusername -pmypassword
```

Nếu bạn không set host thì mặc định nó sẽ là `%` như mình set ở trên, có nghĩa là tất cả các host trừ những cái đã được
set riêng (như ở trên là trừ `localhost`). Nếu bạn không cần phân quyền riêng cho từng host thì cứ để mặc định là được
rồi.

Một chút lưu ý là `localhost` và `127.0.0.1` khác nhau nhé 🤪. `localhost` chỉ dùng cho khi kết nối với MySQL qua
Unix socket (`/var/run/mysqld/mysqld.sock`), là mặc định của `mysql` client. Các ứng dụng khác thì thường kết nối qua
TCP connection nên sẽ sử dụng host `127.0.0.1`.

Để xem các user đã được tạo, bạn có thể query từ bảng `mysql.user`

```sql
SELECT user, host, password FROM mysql.user;
```

```text
+----------------+-----------+-------------------------------------------+
| User           | Host      | Password                                  |
+----------------+-----------+-------------------------------------------+
| mariadb.sys    | localhost |                                           |
| root           | localhost | *54904D5A3736765873CCE669C7215D541A001B67 |
| root           | %         | *54904D5A3736765873CCE669C7215D541A001B67 |
| myusername     | localhost |                                           |
| myusername     | %         | *7F6C7C0B40B56A2B136E8C2A23E1EDA4BD3ADFCD |
+----------------+-----------+-------------------------------------------+
```

## Phân quyền cho user

Mình sẽ tạo một chiếc DB tên là `mydatabase` như thế này.

```sql
CREATE DATABASE IF NOT EXISTS 'mydatabase';
```

Để trao quyền cho user thao tác trên DB, chúng ta sẽ dùng `GRANT`. Thông thường user sẽ có các quyền sau:

- `CREATE`: tạo DB và table.
- `DROP`: xóa DB và table.
- `SELECT`: query dữ liệu trong bảng.
- `DELETE`: xóa dữ liệu trong bảng.
- `INSERT`: thêm dữ liệu vào bảng.
- `UPDATE`: update dữ liệu trong bảng.
- `GRANT OPTION`: cấp quyền cho các user khác.
- `EXECUTE`: chạy stored procedure, function.
- `ALL PRIVILEGES`: tất cả mọi quyền.

Query để trao quyền cho user sẽ như thế này;

```sql
GRANT <permission> ON <database_name>.<table_name> TO '<username>'@'<host>';
```

Chúng ta vẫn có user được xác định bởi *username* và *host* như đã nói từ phần trước.
Bạn có thể chọn trao quyền cho từng bảng nhất định trong DB hoặc tất cả các bảng bằng cách dùng `*`.
Ví dụ mình cấp quyền cho `myusername` được phép cấp quyền cho user khác như thế này:

```sql
GRANT GRANT OPTION ON mydatabase.* TO 'myusername'@'%';
```

Để xóa quyền đã tro cho user bạn có thể dùng `REVOKE` với cú pháp tương tự:

```sql
REVOKE <permission> ON <database_name>.<table_name> TO '<username>'@'<host>';
```

Ví dụ:

```sql
REVOKE GRANT OPTION ON mydatabase.* TO 'myusername'@'%';
```

Thường thì khi phân quyền cho user, user sẽ được chia thành 3 loại:

- *owner*: có tất cả mọi quyền với DB.
- *readonly*: chỉ có quyền đọc dữ liệu.
- *readwrite*: có quyền đọc và ghi dữ liệu.

Áp dụng phần trên, chúng ta sẽ có query để set quyền `owner` cho user như thế này.

```sql
GRANT ALL PRIVILEGES ON mydatabase.* TO 'myusername'@'%';
```

Giả sử mình muốn set quyền `readonly` cho user `mydatabase_readonly` thì query sẽ như thế này.

```sql
GRANT SELECT ON mydatabase.* TO 'mydatabase_readonly'@'%';
```

Cuối cùng là set quyền `readwrite` cho `mydatabase_readwrite`:

```sql
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP ON mydatabase.* TO 'mydatabase_readwrite'@'%';
```

Để xem các quyền đã được cấp cho user, bạn có thể dùng `SHOW GRANTS`.

```sql
SHOW GRANTS FOR 'myusername';
```

```text
+----------------------------------------+
| Grants for myusername@%                |
+----------------------------------------+
| GRANT USAGE ON *.* TO `myusername`@`%` |
+----------------------------------------+
```

Mặc định thì user sẽ có một quyền `USAGE` như trên. Trông có thể hơi confusing một tí vì nhìn nó giống như là quyền truy
cập tất cả mọi database ấy, cơ mà thật ra `USAGE` có nghĩa là không có quyền gì cả 🤣. Nghĩa là mặc định user sẽ không
có quyền truy cập bất kì database nào cả.

Hết rồi. Cũng không khó tí nào phải không 😉. Chúc bạn thành công nhé.