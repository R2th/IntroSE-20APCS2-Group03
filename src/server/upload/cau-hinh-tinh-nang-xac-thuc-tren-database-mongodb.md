MongoDB là một dạng phần mềm cơ sở dữ liệu sử dụng mã nguồn mở NoSQL, MongoDB hoạt động dựa vào các khái niệm Collection và Document.  Nó có hiệu suất cao cùng với tính khả dụng tốt và dễ dàng mở rộng.
Bản cài mặc định cấu hình **authorization** của **MongoDB** được set mặc định **disabled**, điều này có nghĩa rằng bất kỳ người dùng nào có được kết nối port 27017 của MongoDB đều có quyền truy cập đầy đủ vào cơ sở dữc liệu.

Để bảo vệ lỗ hổng này, chúng ta sẽ cần tạo một người dùng quản trị, sau đó chúng ta sẽ bật xác thực và kết nối đến với tư cách là người dùng quản trị để truy cập cơ sở dữ liệu.

Bước 1: Adding an Administrative User
```
# mongo
> show dbs
READ__ME_TO_RECOVER_YOUR_DATA  0.000GB
admin                          0.007GB
config                         0.000GB
> use admin
switched to db admin
> db.createUser({user: "AdminSammy",pwd: passwordPrompt(),roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]})
Enter password: 
> quit()
```

Bước 2: Enabling Authentication
```
vim /etc/mongod.conf
security:
  #authorization: disabled
  authorization: enabled
  
systemctl restart mongodb
```

Bước 3: Testing Authentication Setting

Truy cập mongo
```
# mongo
MongoDB shell version v4.4.6
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("f446eda6-1a52-4cb0-94a2-0a5014e446df") }
MongoDB server version: 4.4.6
> show dbs
```
output: Không hiển thị thông tin database

Truy cập mongo với user vừa tạo bước 1
```
# mongo -u AdminSammy -p --authenticationDatabase admin
MongoDB shell version v4.4.6
Enter password: 
connecting to: mongodb://127.0.0.1:27017/?authSource=admin&compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("7c1e7712-da03-4573-8edf-468592fd16e3") }
MongoDB server version: 4.4.6
> show dbs;
READ__ME_TO_RECOVER_YOUR_DATA  0.000GB
admin                          0.007GB
config                         0.000GB
local                          0.000GB
```
output: Có hiển thị thông tin database

Vậy là chúng ta đã xong việc cấu hình tính năng xác thực trên Database MongoDB, các bạn có thể sử dụng các tools quản trị để kết nối. Mình đang dùng tool NoSQLBooster để kết nối.
Bạn có thể tạo thêm các database, user, phân quyền qua tool NoSQLBooster

![image.png](https://images.viblo.asia/04910ae0-09cb-4d7d-b373-e4a233326cef.png)

![image.png](https://images.viblo.asia/ee651f1c-3fff-44fd-a2b1-224ce2f762fa.png)