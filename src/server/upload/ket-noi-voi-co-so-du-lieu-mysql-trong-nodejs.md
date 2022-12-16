![](https://images.viblo.asia/00ea1f44-6099-4fb2-a12b-583ab68eb72d.png)
# Mở đầu
Xin chào các bạn mình đã quay trở lại rồi đây, tiếp tục với series về `Nodejs cơ bản` thì trong bài viết này mình sẽ giới thiệu đến mọi người về cách cài đặt và kết nối mysql vào nodejs.
# Tiến hành
## Cài mysql
Để kết nối được được mysql thì chúng ta phải có mysql đã đúng không :D. Bạn có thể cài `workbench`

![](https://images.viblo.asia/9dcf3758-ba7e-4bd3-b3fe-1124b724e425.jpeg)

hoặc cài mysql trực tiếp bằng terminal như mình :v .Vì bài này chủ yếu nói về kết nối mysql trong `Nodejs` nên mình xin phép chỉ trình bày cách cài `mysql` trên `ubuntu` thôi nhé :v 

* Đầu tiên là  bạn cần cập nhật apt package  bằng lệnh 

```php
sudo apt update
```
* tiếp theo là cài đặt `Mysql`
```php
sudo apt install mysql-server mysql-client -y
```
* Tiếp theo là chạy lệnh 
```php
sudo mysql_secure_installation
```
để tăng tính bảo mật cho `mysql` hơn, cái này mình cũng không rõ lắm nếu bạn nào biết thì hãy comment xuống bên dưới để mình bổ sung nhé. Các bạn cứ ấn `y` đến khi nó hiện là  `All done!` là được :)
* tiếp theo đăng nhập bằng root
 bạn chạy lệnh 
 ```php
 sudo mysql
 ```
 rồi chạy tiếp lệnh 
 ```php
 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
 ```
 Trong đó `your_password` là pass mà bạn muốn đặt.
 
 OK bây giờ banj hãy thử chạy lệnh 
```php
mysql -u root -p
```
rồi nhập password vừa đổi ở phía trên  xem, chạy tiếp lệnh
```php
show databases;
```
 ![](https://images.viblo.asia/f1d0311a-57b2-451d-8dfb-bbdacd493a96.png)
 
 hiện ra như này là ok :D
 . Tiếp theo chúng ta sẽ tạo một database để kết nối với `Nodejs`, Đơn giản thôi bạn chỉ cần chạy lệnh này 
 ```php
 create database dbTest;   
 ```
 là đã tạo được một db mới rồi :v. lưu ý `dbTest`ở đây chính là tên của database. Các bạn có thể tham khảo thêm các câu lệnh thao tác với mysql ở  [đây](http://g2pc1.bu.edu/~qzpeng/manual/MySQL%20Commands.htm) nhé.
 ## Kết nối mysql với Nodejs
 Để kết nối được với mysql thì chúng ta cần cài đặt module `MYSQL` vẫn như những bài trước thôi để cài đặt một module chúng ta chỉ cần chạy lệnh 
 ```php
 yarn add mysql --save
 ```
 Tiếp theo ở file index.js chúng ta sẽ `require` module `mysql` vào. Thực hiện khai báo vào kết nối như sau :
 ```php
 var conn = mysql.createConnection({
    host :'localhost',
    user : 'root',
    password : '',
    database: 'dbTest',
    charset : 'utf8_general_ci'
});

conn.connect(function (err){
    if(err)
    {
        throw err.stack;
    }
    else
    console.log("connect success");
})
```
Đầu tiên là sẽ khai báo host, user, password (nếu có), tên database, kiểu unicode. Tiếp theo là hàm connect  ở đây mình thực hiện kết nối nếu có lỗi thì in lỗi ra còn không thì sẽ log ra `connect success`. 

## Tạo bảng 
Như các bạn đã biết thì những bài trước mình có sử dụng mảng để lưu data vì thế khi ấn f5 lại sẽ bị mất các record vừa được thêm vào, nhưng trong bài hôm nay thì chúng ta đã kết nối được với cơ sở dữ liệu rồi thì đó không còn là vấn đề nữa :D. Bây giờ chúng ta sẽ tạo một bảng `posts` để thay thế `Mảng posts` mà những bài trước chúng ta hay sử dụng nhé. 
Đầu tiên mình sẽ khai báo một câu `sql` như sau :
```php
var sql = "create table posts" +
    " (id int not null AUTO_INCREMENT," +
    " title varchar(225)," +
    " PRIMARY KEY (id) )";
```
tạo bảng posts với 2 trường là `id` kiêu int, tự động tăng, là khóa chính, và trường `title` có kiểu dữ liệu là varchar. Tiếp theo chỉ cần vết hàm để chạy câu sql kia là được.
```php
conn.query(sql, function(err) {
    if(err)
    {
        throw err;

    }
    else
    console.log("Create table success");
})
```
 Xem trên terminal hiện `Create table success` là đã taọ bảng thành công nhé :D
# Kết luận
Vậy là ở bài viết này mình đã giới thiệu đến các bạn cách cài đặt mysql trên ubuntu và cách kết nối mysql với `nodejs`. Ở bài tiếp theo mình sẽ thực hiện các chức năng sửa  dữ liệu, sửa xóa bảng, và sửa lại chức năng thêm mới ở bài trước. Bài viết còn phần nào thiếu sót rất mong các bạn comment xuống bên dưới để mình được bổ sung, nếu thấy bài viết hữu ích thì hãy cho mình một upvote nhé :) , Ấn follow để có thể theo dõi được những bài viết mới nhất của mình nhé. Một lần nữa xin cảm ơn các bạn !!!