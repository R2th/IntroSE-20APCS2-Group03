Xin chào các bạn! Ở phần trước chúng ta cùng tìm hiểu về volumes và cách sử dụng volumes trong docker. Trong part III này chúng ta sẽ tìm hiểu làm việc với databases trong docker. Trong phần này sẽ có nội dung như sau:
**Một số điều cơ bản khi làm việc với Databases nói chung và Mysql nói riêng**- Database mà chúng ta sẽ làm việc trong phần này.

**Vì sao chúng ta cần sử dụng MySql Docker image**- Đề cập đến cách tạo một container từ image đã nói ở phần trước và những biến môi trường cần thiêt để nó làm việc.

**Làm thế nào để connect tới MySql container** - Chúng ta sẽ sử dụng linking để application container liên kêt với Mysql container.
## Làm việc với Databases nói chung và Mysql nói riêng.
Với Databases nói chung bạn có thể thực hiện các việc bên dưới:

**+ read** , chúng ta có thể đọc data bằng cách sử dụng các queries được cung cấp.

**+ alter/create/delete** ,  Chúng ta có thể thay đổi data.

**+ add structure** , cho phép chúng ta tạo một cấu trúc giống như tables hoặc collections để lưu data của chúng tao theo một định dạng nhất định.

**add seed/initial data** , cho phép chúng ta chuẩn bị trước datas cho một số table cần thiết.

Ngoài ra còn rất nhiều thứ bạn có thể làm như thêm index, thêm người dùng với các quyền truy cập khác nhau.
### Cài đặt và kết nối với Mysql.
Có rất nhiều cách cài đặt Msql, cách dễ nhất để cài đặt Mysql trên linux system bằng cách chạy lệnh dười:
```
sudo apt-get install mysql-server
```
Trên Mac bạn có thể sử dụng brew để cài đặt bằng lệnh bên dưới:
```
brew install mysql
```
Khi cài đặt xong, Chúng ta sẽ nhìn thấy một số thông tin để connect vào Mysql.
![](https://images.viblo.asia/299ef839-510b-4697-9fb4-7a97620fbea3.png)
Như trong hình nói cho chúng ta biết là user root không có password, để tạo password cho user root ta sử dụng lệnh *mysql-secure-installation*. Bây giờ chúng ta connect vào Mysql theo gọi ý trong hình bằng lệnh:
```
brew services start mysql
mysql -uroot
```
![](https://images.viblo.asia/948eabac-6254-41f6-ab10-d7eda0fd4e31.png)
![](https://images.viblo.asia/6ee52593-b07e-460a-a0d9-a498b5ce9599.png)

Để xem tất cả database đã có chúng ta chạy lệnh:
![](https://images.viblo.asia/760b1e41-5e17-451b-95fc-2eab4c31b4e3.png)

Tiếp theo chúng ta sẽ tạo một database và chọn database mới tạo:
![](https://images.viblo.asia/62dbd5a0-19b6-4445-8e4c-8199d2bfc34d.png)
Chúng ta cần tạo một table tên là **tasks** cách tạo một file có tên là **database.sql** có nội dung sau:
```
// database.sql

// creates a table `tasks`
CREATE TABLE IF NOT EXISTS tasks (

task_id INT AUTO_INCREMENT,

title VARCHAR(255) NOT NULL,

start_date DATE,

due_date DATE,

status TINYINT NOT NULL,

priority TINYINT NOT NULL,

description TEXT,

PRIMARY KEY (task_id)

);
// add more tables below and indeces etc as our solution grows
```

Bây giờ chúng ta sẽ chạy code trong file database.sql đã tạo table taks bằng lệnh:
![](https://images.viblo.asia/fba57e82-99ba-49b5-b3e8-2aaf0f9e0a34.png)
Trên đây là những thao tác cơ bản khi làm việc với Msql.
## Tạo sao chúng ta cần sử dụng Mysql docker image và làm thế nào để up và chạy một Msql contaner từ Mysql docker image.
Khi sử dụng Mysql container chúng ta sẽ không cần quan tâm về systems mà container sẽ chạy. Chúng ta có thể install Mysql trong app container của chúng ta hoặc chạy Mysql trong một container riêng biệt. Việt chạy Mysql trong một container riêng biệt sẽ có một số ưu việt sau:
**+ rolling updates**, Chúng ta có thể restart container đang chạy app của chúng ta trong khi mysql vẫn chạy bình thường.
**+ scalability**, Chúng ta có thể thêm các node để scale một cách dễ dàng hơn.
### MySql image
Chúng ta sẽ chạy một Mysql container từ Mysql image bằng lệnh dưới đây:
```
docker run --name mysql-db -e MYSQL_ROOT_PASSWORD=complexpassword -d -p 8000:3306 mysql
```
Sau khi chạy xong lệnh trên ta sẽ có container có tên là **mysql-db**
![](https://images.viblo.asia/18b41503-befe-4068-9eb3-4a496dc91bca.png)
Để connect tới mysql trong container mysql-db ta chạy lệnh dưới đây:
![](https://images.viblo.asia/9bc17fe8-430b-4358-881b-c37048542506.png)
OK! Chúng ta đã connect vào mysql trong container thành công.
Nhưng không, làm thể nào ta có thể truy cập data bên trong container mysql-db từ một container  khác. Lúc này chúng ta cần link hai container.
### Kết nối tới database từ Node.js
Trước tiên ta cần install package mysql để có thể connect tới mysql từ nodejs
```
npm install --save mysql
```
Edit lại file app.js với nội dung như sau:
```
// app.js

const mysql = require('mysql');

const con = mysql.createConnection({

host: "localhost",

port: 8001,

user: "root",

password: "complexpassword",

database: 'Customers'

});

con.connect(function (err) {

if (err) throw err;
 console.log("Connected!");
});
```
Chạy file app.js bằng lệnh *node app.js*
![](https://images.viblo.asia/1c36b8c6-4933-4b0b-babd-8f625ed98847.png)
Các bạn thấy bị lỗi trong qua trình tạo connect với mysql. Điều này xảy ra vì caching_sha2_password được giới thiệu trong Mysql 8.0 nhưng phiên bản Node.js đang dùng chưa được implement. Chúng ta có thể fix bằng cách connect vào mysql trong container mysql-db và chạy lệnh sau:
```
mysql -uroot -pcomplexpassword -h 0.0.0.0 -P 8001
mysql> ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'complexpassword';
mysql> FLUSH PRIVILEGES;
```
Bây giờ chạy lại lệnh *node app.js*
![](https://images.viblo.asia/bb34c346-4dfb-43ba-b716-64313c8b1741.png)
Vậy là app của chúng ta đã connect thành công tới Mysql trong container mysql-db.
### Linking.
Ý tưởng của linking là một container không cần biết về ip hoặc port của database. Cú pháp điển hình để link hai container với nhau  sẽ trong như thế này:
```
docker run -d -p 5000:5000 --name product-service --link mypostgres:postgres chrisnoring/node
```
Phân tích câu lệnh trên:

**app container**, Tạo một app container gọi là product-service.
**--link** Sử dụng option này để link product-service container của chúng ta với container mypostgres đã tồn tại.
**link alias**, câu lệnh --link mypostgres: postgres có nghĩa là chúng tôi chỉ định vùng chứa nào sẽ liên kết với mypostgres và cung cấp cho nó một postgres bí danh. Chúng ta sẽ sử dụng bí danh này ở trong product-service container khi muốn connect tới database.
Vì my-container của chúng ta được tạo mà không có linking nên ta phải xóa đi và tạo lại với linking.
```
docker kill my-container && docker rm my-container
```
Edit lại file app.js như sau:
```
// file app.js
const mysql = require('mysql');

const con = mysql.createConnection({

**host: "mysql",**

user: "root",

password: "complexpassword",

database: 'Customers'

});

con.connect(function (err) {

if (err) throw err;
 console.log("Connected!");
});
```
Bây giờ chúng ta tạo lại my-container container từ image chrisnoring/node và linking mysql-db container bằng lệnh sau:
```
docker run -d -p 8000:3000 --name my-container --link mysql-db:mysql chrisnoring/node
```
Xem log my-container bằng lệnh:
![](https://images.viblo.asia/51d577dd-f5ac-4a43-a158-04bef00859a7.png)

Như vậy mình đã giới thiệu tới các bạn cách linking giữa hai container. Hi vọng các bạn hiểu và áp dụng được.
Nguồn: https://dev.to/azure/docker-from-the-beginningpart-iii-2h51