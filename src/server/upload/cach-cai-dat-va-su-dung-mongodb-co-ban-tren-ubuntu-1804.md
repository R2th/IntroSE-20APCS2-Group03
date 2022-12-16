Trong thế giới các ứng dụng công nghệ thông tin có hơn chục hệ quản trị cơ sở dữ liệu được sử dụng phổ biến. Trước hết phổ biến và thường gặp nhất là MySQL - là hệ quản trị cơ sở dữ liệu mã nguồn mở có tốc độ cao, ổn định và dễ sử dụng, hoạt động tương thích trên nhiều hệ điều hành. Vì có tính bảo mật cao nên thích hợp cho các ứng dụng sử dụng truy cập internet. Song song đó còn những hệ quản trị cơ sở dữ liệu khác với những khả năng, độ ứng dụng khác nhau. Hôm nay trong bài viết này sẽ giới thiệu đến bạn đọc một hệ quản trị CSDL NoSQL là MongoDB.
## MongoDB là gì?
MongoDB là một cơ sở dữ liệu nguồn mở, sử dụng mô hình dữ liệu hướng tài liệu và là một ngôn ngữ truy vấn không có cấu trúc.
MongoDB lưu trữ dữ liệu theo hướng tài liệu (document), các dữ liệu được lưu trữ trong document kiểu JSON nên truy vấn sẽ rất nhanh. Mô hình dữ liệu của MongoDB là một mô hình có độ đàn hồi cao cho phép bạn kết hợp và lưu trữ dữ liệu của các kiểu đa biến mà không phải thỏa hiệp với các tùy chọn lập chỉ mục mạnh mẽ, truy cập dữ liệu và quy tắc xác thực.
## Cài đặt Mongodb Ubuntu 18.04
### Bước 1: Import “MongoDB public GPG Key” 
```wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -```
1. Cài đặt gnupg<br><br>
```sudo apt-get install gnupg```<br><br>
2. Sau khi cài đặt gnupg, import lại key<br><br>
```wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -```<br>
### Bước 2: Tạo list file MongoDB
```echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list```
<br><br>*chú ý: Để biết phiên bản Ubuntu bạn đang sử dụng là gì thì hay chạy lệnh:* <br><br>
```lsb_release -dc```
### Bước 3: Cập nhật lại packages
```sudo apt-get update```
### Bước 4: Cài đặt MongoDB packages
```sudo apt-get install -y mongodb-org```
<br><br>Để tránh cơ chế tự động nâng cấp các gói mới hơn của apt-get, chúng ta có thể pin packages ở biên bản hiện tại đang cài đặt.<br>
```echo "mongodb-org hold" | sudo dpkg --set-selections```<br>
```echo "mongodb-org-server hold" | sudo dpkg --set-selections```<br>
```echo "mongodb-org-shell hold" | sudo dpkg --set-selections```<br>
```echo "mongodb-org-mongos hold" | sudo dpkg --set-selections```<br>
```echo "mongodb-org-tools hold" | sudo dpkg --set-selections```<br>
<br>
**Kiểm tra MongoDB đã cài đặt thành công chưa** <br><br>
```sudo systemctl status mongod```<br><br>
Có output sau:<br><br>
```● mongod.service - MongoDB Database Server```<br>
   ```Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: ```<br>
   ```Active: inactive (dead)```<br>
     ```Docs: https://docs.mongodb.org/manual```<br>
```lines 1-4/4 (END)```<br><br>
**Khởi động MongoDB**<br><br>
```sudo systemctl start mongod```<br><br>
Có output sau:<br><br>
```● mongod.service - MongoDB Database Server```<br>
   ```Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: ```<br>
   ```Active: active (running) since Wed 2020-05-20 08:50:25 +07; 5s ago```<br>
     ```Docs: https://docs.mongodb.org/manual```<br>
 ```Main PID: 12270 (mongod)```<br>
  ``` CGroup: /system.slice/mongod.service```<br>
           ```└─12270 /usr/bin/mongod --config /etc/mongod.conf```<br>
           ``` ```<br>
```Thg 5 20 08:50:25 Admin-pc systemd[1]: Started MongoDB Database Server.```<br>
```lines 1-9/9 (END)```<br>

**Tắt MongoDB**<br><br>
```sudo systemctl stop mongod```<br><br>
Có output sau:<br><br>
```● mongod.service - MongoDB Database Server```<br>
   ```Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: ```<br>
   ```Active: inactive (dead)```<br>
     ```Docs: https://docs.mongodb.org/manual```<br>
     ``` ```<br>
     ```Thg 5 20 08:50:25 admin-pc systemd[1]: Started MongoDB Database Server.```<br>
```Thg 5 20 08:55:56 admin-pc systemd[1]: Stopping MongoDB Database Server...```<br>
```Thg 5 20 08:55:56 admin-pc systemd[1]: Stopped MongoDB Database Server.```<br><br>
**Restart MongoDB**<br><br>
Bạn cũng có thể restart nó như những service khác. <br><br>
```sudo systemctl restart mongod```
## Sử dụng MongoDB cơ bản
### Tạo một Database mới
**Di chuyển vào vùng console MongoDB.**<br><br>
Khi mongoDB ở trạng thái active. <br>
Chúng ta sử dụng lệnh:<br><br>
```mongo```<br><br>
Có output sau:<br><br>
```MongoDB shell version v4.2.6```<br>
```connectingto:mongodb://127.0.0.1:27017/compressors=disabled&gssapiServiceName=mongodb```<br>
```Implicit session: session { "id" : UUID("c412302c-ec34-4420-9ac2-238b5d9efb89") }```<br>
```MongoDB server version: 4.2.6```<br>
```Welcome to the MongoDB shell.```<br>
```For interactive help, type "help".```<br>
```For more comprehensive documentation, see```<br>
	```http://docs.mongodb.org/```<br>
```Questions? Try the support group```<br>
	```http://groups.google.com/group/mongodb-user```<br>
```---```<br>
``` ```<br>
```> ```<br>

**Tạo Database**<br><br>
```> use [database_name]```<br><br>
Ví dụ : ```> use testlocal```<br><br>
Check db đang chạy hiện tại :<br><br>
``` > db ```<br>
``` testlocal```<br><br>
Insert record vào db mới tạo.<br><br>
```> db.testlocal.insert({ nameBlog: "cài đặt mongodb trên ubuntu" })```<br><br>
Output insert thành công :<br><br>
```WriteResult({ "nInserted" : 1 })```<br><br>
Hiển thị tất cả database, tuy nhiên lệnh này chỉ hiển thị mặc định của mongo và những database mình tạo đã có dữ liệu.
Ta sử dụng lệnh.<br><br>
```> show dbs```<br><br>
Output như sau:<br><br>
```admin      0.000GB```<br>
```config     0.000GB```<br>
```local      0.000GB```<br>
```testlocal  0.000GB```<br>
<br>
**Tạo một user mới**<br><br>
Mặc định, MongoDB không có tài khoản administrator mặc định. Thay vào đó nó tạo từng user khác cho mỗi database. Tuy nhiên, bạn cũng cần tạo user với phân quyền nhất định cho từng database.<br>
Hàm db.createUser, như mọi hàm khác trong MongoDB nhận tham số trong JSON. Hàm này cần định tên, mật khẩu, database và quyền của nó. <br>
Để set quyền cho user truy cập vào database đã tạo. Ta có thể tạo một new_user vào database testlocal có roles là readWrite trên db này thì câu lệnh như sau:<br>
<br>
```> db.createUser(```<br>
    ```{```<br>
    ```user: "new_user",```<br>
    ```pwd: "123456",```<br>
    ```roles: [ { role: "readWrite", db: "testlocal" } ]```<br>
    ```}```<br>
```)```<br>
<br>
Tạo user mới thành công, ta có output sau:<br><br>
```Successfully added user: {```<br>
	```"user" : "new_user",```<br>
	```"roles" : [```<br>
		```{```<br>
			```"role" : "readWrite",```<br>
			```"db" : "testlocal"```<br>
		```}```<br>
	```]```<br>
```}```<br>

<br>Sau khi đã vào trong MongoDB console, bạn có thể xem hướng dẫn bằng lệnh help của nó.<br><br>
```> help```<br>
### Hiển thị tất cả user
Lệnh này giúp hiển thị tất cả các user có các quyền truy cập vào 1 database.<br><br>
```> show users```<br><br>
Output của nó :<br><br>
```{```<br>
	```"_id" : "testlocal.new_user",```<br>
	```"userId" : UUID("854932c1-ec91-4ba4-9d25-fa82858b3b90"),```<br>
	```"user" : "new_user",```<br>
	```"db" : "testlocal",```<br>
	```"roles" : [```<br>
		```{```<br>
			```"role" : "readWrite",```<br>
			```"db" : "testlocal"```<br>
		```}```<br>
	```],```<br>
	```"mechanisms" : [```<br>
		```"SCRAM-SHA-1",```<br>
		```"SCRAM-SHA-256"```<br>
	```]```<br>
```}```<br>
### Xóa một database
```>  db.dropDatabase()```<br><br>
Output khi xóa thành công. <br><br>
```{ "dropped" : "testlocal", "ok" : 1 }```
### Thoát khỏi console mongoDB
```> exit```
### Kết nối Database bằng username và password.
```mongo -u username -p password host:port/database_name```<br>
<br>Ví dụ: ```mongo -u new_user -p 123456 localhost:27017/admin```
<br><br>
## Tổng kết
Trên đây là cách cài đặt mongodb trên hệ điều hành ubuntu 18.04 và cách thức sử dụng cơ bản khi mới bắt đầu.<br>
Nếu có gì sai sót mong sự đóng góp của mọi người.<br>
Xin cám ơn.<br><br>
Sau đây là các link tham khảo:<br>
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/<br>
https://vinasupport.com/mongodb-la-gi-huong-dan-cai-dat-mongodb-tren-ubuntu/<br>
Link tham khảo rõ về roles trong mongoDB: <br>
https://stackjava.com/mongodb/cac-loai-roles-vai-tro-quyen-trong-mongodb.html