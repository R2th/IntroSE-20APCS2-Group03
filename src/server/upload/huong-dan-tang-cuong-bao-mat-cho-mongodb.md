Nếu bạn từng làm việc với Mean stack hoặc có nhu cầu xử lý dữ liệu lớn, có thể bạn đã từng nghe qua về Mongodb. MongoDB là cơ sở dữ liệu dạng document với khả năng mở rộng cao cũng như rất link hoạt cho việc thao tác với dữ liệu.

Tuy nhiên, Mongodb lại tồn tại một vấn đề khá đơn giản nhưng lại gây hậu quả nghiêm trọng khiến cho nhiều lỗ hổng đã bị khai thác. Nguyên nhân ở đây là vì theo mặc định, sau khi cài đặt, Mongodb không hề bật một cơ chế xác thực nào để tương tác với DB cả. Điều này làm cho bất kỳ ai cũng có thể tạo, xóa hay đọc bất kỳ thông tin nào trong db của bạn.
Vấn đề càng phức tạp ở chỗ, theo mặc định thì Mongodb daemon sẽ lắng nghe ở tất cả các interface, điều này tạo cơ hội cho việc viết ra những script tự động có khả năng xác định sự tồn tại một Mongodb instance. Và nếu như Mongodb instance đó không được kích hoạt xác thực, và cũng không được bảo vệ bởi firewall thì hiển nhiên hacker cũng có thể tự động access vào db rồi.

Vấn đề của Mongodb có vẻ đã được giảm nhẹ ở những phiên bản 3.x hoặc các phiên bản Mongodb được cung cấp bởi các Package manager, khi mà mongodb không còn bị ràng buộc sử dụng ip 127.0.0.1 nữa mà chỉ chấp nhận kết nối thông qua Unix socker; theo đó thì Mongodb cũng sẽ không được tự động "open" với mạng internet nữa.

Cho đến thời điểm hiện tại thì các cơ chế Authentication vẫn mặc định bị tắt trên Mongodb, vì vậy dù Mongodb không bị access bởi các hacker từ bên ngoài nhưng bất kỳ user nảo tại local sysem cũng có khả năng access hoàn toàn vào db. Để ngăn chặn điều này chúng ta cần tạo tài khoản quản trị và bật Mongodb Authentication

## Bật Authentication cho Mongodb

### 1. Tạo user quản trị
Để tạo user quản trị, trước tiên ta cần kết nối đến Mongo shell
```
mongo
```
sau khi kích hoạt Mongo shell, bạn sẽ thấy màn hình như sau

![](https://images.viblo.asia/47612c00-9554-44de-9773-103320545f43.png)

Như bạn có thể thấy, Mongo shell sẽ cảnh báo chúng ta rằng `Access control is not enabled`, bất kỳ hành động nào liên quan đến đọc, ghi dữ liệu hoặc config sẽ đều không bị cấm
```
** WARNING: Access control is not enabled for the database.
**          Read and write access to data and configuration is unrestricted
```

Tiếp theo ta sẽ tạo tài khoản quản trị thông qua Mongo shell, bạn có thể tùy ý chọn bất kỳ tên nào cho user của mình. Quyền hạn của user được gán thông qua role `userAdminAnyDatabase`. DB `admin` được chỉ định là nơi sẽ lưu trữ thông tin xác thực. Bạn có thể xem thêm về authentication trong Mongodb tại https://docs.mongodb.com/manual/core/authentication/

```
use admin
db.createUser(
    {
        user: "myusername",
        pwd: "MyPassWord",
        roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
    }
)
```
khi chúng ta thực thi lệnh `db.createUser`. Mongo shell sẽ thực hiện thêm user, kết quả sẽ được in ra khi lệnh này kết thúc
```
Successfully added user: {
    "user" : "myusername",
    "roles" : [
            {
                    "role" : "userAdminAnyDatabase",
                    "db" : "admin"
            }
    ]
}
```
Đến đây chúng ta đã kết thúc quá trình tạo tài khoản quản trị cho Mongodb, bạn có thể thoát khỏi Mongodb shell bằng cách dùng lệnh `exit` hoặc `CTRL+C`

Tại thời điểm này, user quản trị của chúng ta đã được phép sử dụng thông tin xác thực, tuy nhiên bạn vẫn có thể bỏ qua thông tin xác thực, đó là lý do chúng ta cần thực hiện tiếp bước tiếp theo

### 2. Bật Authentication

Để có thể bật Authentication chúng ta cần sửa file `mongod.conf`
```
sudo vim /etc/mongod.conf
```
chuyển đến dòng `#security`, bỏ comment `#`
```
security:
  authorization: "enabled"
```
lưu ý: dòng `security` không có khoảng trống phía trước, `authorization` được indent bởi 2 spaces

Khởi động lại mongod
```
sudo systemctl restart mongod
```

### 3. Kiểm tra xem authentication đã hoạt động chưa
Chúng ta sẽ dùng luôn Mongo shell để kiểm tra trạng thái authentication
```
mongo
```
lần này thì Mongo shell sẽ không còn cảnh báo như trước nữa
```
MongoDB shell version v3.4.2
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.2
```

Bất kỳ câu truy vấn đề dữ liệu nào cũng sẽ bị cấm
```
show dbs
```
kết quả
```
2017-02-21T19:20:42.919+0000 E QUERY    [thread1] Error: listDatabases failed:{
        "ok" : 0,
        "errmsg" : "not authorized on admin to execute command { listDatabases: 1.0 }",
        "code" : 13,
        "codeName" : "Unauthorized"
```

#### Kiểm tra với tài khoản quản trị đã tạo trước đó
```
mongo -u myusername -p --authenticationDatabase admin
```
bạn sẽ được yêu cầu nhập vào password, sau khi nhập đúng password sẽ có output như sau
```
MongoDB shell version v3.4.2
Enter password:
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.2
```
từ đây bạn có thể thoải mái thực thi các câu lệnh truy vấn dữ liệu mà không lo gì về xác thực nữa.
```
show dbs
```
kết quả
```
admin  0.000GB
local  0.000GB
```

## Thiết lập Remote Access cho Mongodb

Nếu bạn cài đặt Mongodb trên một instance riêng biệt, hoặc vì một yêu cầu nghiệp vụ đặc biệt nào đó cần thiết phải kết nối đến Mongodb từ môi trường bên ngoài, bạn buộc phải thiết lập Remote Access cho Mongodb

### 1. Thiết lập UFW
Trước tiên ta cần bật UFW và cài đặt để cho phép một IP cụ thể nào đó được kết nối đến instance chứa Mongodb thông qua cổng 27017

Kiếm tra trạng thái UFW
```
sudo ufw status
```
nếu kết quả trả về là `inactive`, ta cần phải kích hoạt lại đó
```
sudo ufw enable
```
### 2. Cấu hình lại Public bindIp
Cho phép 1 ip cụ thể kết nối đến Mongodb
```
sudo ufw allow from client_ip to any port 27017
```
Bởi vì client của chúng ta cần phải kết nối đến Mongodb thông qua public ip, do đó ngoài việc ràng buộc Mongodb listen tại 127.0.0.1, ta cần thông báo cho Mongodb để lắng nghe thêm tại public ip
```
sudo vim /etc/mongod.conf
```
tìm đến đoạn `bindIp: 127.0.0.1` và sửa thành `bindIp: 127.0.0.1,mongo_instance_ip`
khởi động lại Mongodb
```
sudo systemctl restart mongod
```
### 3. Kiểm tra Remote Access


bạn có thể dùng lệnh sau để kiểm tra kết nối đến Mongodb instance

```
mongo -u myusername -p --authenticationDatabase admin --host mongo_instance_ip
```

Sau khi nhập mật khẩu bạn sẽ nhận được thông tin giống như khi mở Mongo shell tại local
```
MongoDB shell version v3.4.2
Enter password:
connecting to: mongodb://107.170.233.82:27017/
MongoDB server version: 3.4.2
```
Nếu có lỗi không thể kết nối, bạn cần kiểm tra lại các bước bên trên xem server chứa Mongodb đã mở cổng 27017 chưa, hoặc ip của bạn có được phép kết nối đến không?

Những việc sửa đổi, cập nhật trên đây không quá phức tạp nhưng lại mang ý nghĩa rất quan trọng trong việc giúp tăng cường bảo mật cho Mongodb server. Ngoài cách này ra bạn có thể sử dụng thêm external firewall hoặc VPN để bảo vệ Mongodb server, tuy nhiên theo mình thấy thì cách làm trên đây vẫn là hiệu quả và nhanh nhất.

Nếu bạn quan tâm về Security với Mongodb, bạn có thể tham khảo về Mongodb security check list (https://docs.mongodb.com/manual/administration/security-checklist/)

Tham khảo:

https://www.mongodb.com/what-is-mongodb
https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04
https://docs.mongodb.com/manual/administration/security-checklist/