1. Tạo một ứng dụng nhỏ sử dụng server là Nodejs và DB là Mysql (Phần 1)
2. [Tạo một ứng dụng nhỏ sử dụng server là Nodejs và DB là Mysql (Phần 2)](https://viblo.asia/p/tao-mot-ung-dung-nho-su-dung-server-la-nodejs-va-db-la-mysql-phan-2-Eb85oy88Z2G)

# Mở đầu
Nếu như là một developer fullstack thì chắc hẳn bạn cũng biết được rằng việc phát triển một ứng dụng web người ta quan tâm rất nhiều tốc độ xử lý của một hệ thống. Ngày nay, các hệ thống đang cạnh tranh nhau không chỉ là giao diện, logic xử lý mà người ta quan tâm đến tốc độ của hệ thống nào sẽ đáp ứng yêu cầu nhanh nhất.

Một ứng dụng web bao gồm client và server. Client là nơi mà HTML, CSS, JS chạy trên 1 chương trình đó là Brower. Server là nơi xử lý logic, các request mà user gởi về. Từ xưa mô hình này vẫn ổn nhưng với công nghệ 4.0 như hiện nay thì mô hình này sẽ bị chậm đi nếu có hàng ngàn request gởi về trong thời điểm.

Để giải quyết vấn đề trên người ta đã dùng rất nhiều cách đó là tối ưu DB, sử dụng các no-sql, tăng băng thông cho server, ... Nhưng cách giải quyết hiện nay được cho là tốt nhất đó là chuyển dần xử lý về phía client tức là mọi xử lý sẽ được thực hiện trên client trước khi đưa đến server. Hiện nay các framework fontend rất được xử dụng rộng rãi trong các dự án gần đây đó là vuejs, reactjs, nodejs,...

Sau đây mình xin được hướng dẫn cho các bạn mới tìm hiểu về cách giải quyết này bằng cách xử dụng nodejs. Vì sao mình lại chọn nodejs vì nó có thể kết nối DB, và cũng có thể làm việc với view. Ở những bài về sau mình sẽ không cấu trúc lại bằng mô hình MVC nổi tiếng hiện nay. Vì đây là dùng cho các bạn mới học nên mình việc đơn giản cho các bạn dễ hiểu về sau mình sẽ dần mô hình hoá theo MVC.

Chúng ta sẽ cùng tạo một ứng dụng đơn giản quản lý books sử dụng nodejs, view thì mình dùng ejs, DB là Mysql để hiểu được luồn hoạt động trong nodejs như thế nào nhé :D. Nào chúng ta cùng bắt đầu nào. 

DDL của ứng dụng này như sau

```
CREATE DATABASE IF NOT EXISTS `db_book`;

CREATE TABLE IF NOT EXISTS `db_book`.`books` (
    `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `description` text NOT NULL,
    `author` varchar(255) NOT NULL
);

```

Cấu trúc của thư mục của project này:
![](https://images.viblo.asia/b630e128-1ec3-4c20-8376-e96b3b4bf01d.png)

Để có thể làm quen với project này các bạn phải install đầy đủ các thư viện sau:
Trước hết các bạn hãy chạy câu lệnh sau:
```
npm init
```
```
"dependencies": {
    "bootstrap": "^4.3.1",
    "ejs": "^2.6.1",
    "fs": "0.0.1-security",
    "http": "0.0.0",
    "mysql": "^2.17.1",
    "querystring": "^0.2.0",
    "url": "^0.11.0"
  },
  "devDependencies": {
    "nodemon": "^1.18.11"
  }
```
# Kết nối với Mysql bằng Nodejs
Để kết nối với Mysql nói riêng và các hệ quản trị cơ sở dữ liệu khác như SQL, ... cũng tương tự.
Ở file server.js
```
var http = require('http');
var mysql = require('mysql');
var con = mysql.createConnection({
   host: "127.0.0.1",
   user: "root",
   password: "123456",
   database: "db_book"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var server = http.createServer(function (req, res) {
    console.log('Server running at local');
});

server.listen(8000);
```

--> Sau đó các bạn chạy câu lệnh sau để xem kết quả nhé
```
node server.js
```
Bạn xem ở terminal nếu thành công thì nó sẽ output 
```
[nodemon] starting `node server.js`
Connected!
```
# Hướng dẫn lấy danh sách book từ DB sử dụng nodejs và ejs
Bước 1: Các bạn tạo 1 file nằm ở đường dẫn sau: `/view/index.ejs`.  
```
<!DOCTYPE html>
<html>
    <head>
        <title>List Book</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container">
            <h1>List Book</h1>
            <div class="col-md-12">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        <% books.forEach((book, index) => { %>
                            <tr>
                                <td><%= index + 1 %></td>
                                <td><%= book.name %></td>
                                <td><%= book.description %></td>
                                <td><%= book.author %></td>
                            </tr>
                        <% }); %>
                    </tbody>
                </table>
            </div>

        </div>
    </body>
</html>
```
Bước 2: Ở file server.js bạn thêm
```
var http = require('http');
var mysql = require('mysql');
var url = require('url');
var fs = require('fs');
var ejs = require("ejs");
// var axios = require('axios');
var { parse } = require('querystring');

var con = mysql.createConnection({
   host: "127.0.0.1",
   user: "root",
   password: "123456",
   database: "db_book"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function renderHTML(path, response, data) {
    var htmlContent = fs.readFileSync(path, 'utf8');
    data.filename = path;

    var htmlRenderized = ejs.render(htmlContent, data);

    response.writeHeader(200, {"Content-Type": "text/html"});
    response.end(htmlRenderized);
}

var server = http.createServer(function (req, res) {
    res.writeHeader(200, {"Content-Type": "text/html"});
    con.connect(function(err) {
        con.query("SELECT * FROM books", function (err, result, fields) {
          if (err) throw err;
          renderHTML('./view/index.ejs', res, {books: result});
        });
    });
});

server.listen(8000);
```
Mình xin giải thích một chút về file server.js này
Để đưa dữ liệu từ nodejs sang view chúng ta cần dùng đến 1 thư viện là fs dùng để đọc file trong nodejs. Rồi mình dùng ejs để render view ra như bình thường.
```
 var htmlContent = fs.readFileSync(path, 'utf8');
    data.filename = path;

    var htmlRenderized = ejs.render(htmlContent, data);
```
Nhưng muốn in nó lên view browser thì bạn sử dụng đoạn code sau:
```
   response.writeHeader(200, {"Content-Type": "text/html"});
    response.end(htmlRenderized);
```
Để connect làm việc với DB thì bạn chỉ cần truyền câu sql vào như sau:
```
con.connect(function(err) {
        con.query("SELECT * FROM books", function (err, result, fields) {
          if (err) throw err;
          renderHTML('./view/index.ejs', res, {books: result});
        });
    });
```

Kết quả khi bạn truy cập vào đường link http://localhost:8000/books
![](https://images.viblo.asia/2ee36e15-d23f-4c1b-9f95-b197476d64a8.png)
# Kết thúc
Trong bài tới mình sẽ hướng dẫn các bạn insert, update, delete books. Vì thời gian có hạn nên mình xin giới thiệu các bạn đến đây mong các bạn có thể tự làm một ứng dụng cho riêng mình. Các bạn hãy chờ trong bài tháng tới nhé :D