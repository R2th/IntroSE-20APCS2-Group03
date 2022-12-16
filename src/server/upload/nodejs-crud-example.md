- Ở bài trước mình đã giới thiệu đến các bạn cách cài đặt một server nodejs cơ bản, tạo form gửi data từ server đến view. Để tiếp tục bài hôm nay ta sẽ cùng nhau tìm hiểu cách kết nối MySql, thêm sửa xóa dữ liệu thông qua ví dụ CRUD cụ thể.

### 1.Cài đặt
- Nếu các bạn mới bắt đầu và chưa có kiến thức về NodeJS thì cũng đừng quá lo lắng, các bạn có thể tham khảo bài viết trước của mình tại đây: [Tự học nodejs từ đầu](https://viblo.asia/p/tu-hoc-nodejs-tu-dau-6J3ZgnGPKmB)
- Kết quả thu được từ bài viết trước như sau:
    ```
    ├── app.js
    ├── node_modules
    ├── package.json
    ├── package-lock.json
    ├── public
    │   ├── css
    │   │   └── bootstrap.css
    │   └── js
    │       └── bootstrap.js
    └── views
        ├── form.hbs
        └── index.hbs
    ```
- Cài đặt mysql:
    ```SHELL
    npm install --save mysql
    ```
- Mysql đã được thêm vào cụ thể trong file `package-lock.json`:
    ```
    +    "mysql": {
    +      "version": "2.16.0",
    +      "resolved": "https://registry.npmjs.org/mysql/-/mysql-2.16.0.tgz",
    +      "integrity": "sha512-dPbN2LHonQp7D5ja5DJXNbCLe/HRdu+f3v61aguzNRQIrmZLOeRoymBYyeThrR6ug+FqzDL95Gc9maqZUJS+Gw==",
    +      "requires": {
    +        "bignumber.js": "4.1.0",
    +        "readable-stream": "2.3.6",
    +        "safe-buffer": "5.1.2",
    +        "sqlstring": "2.3.1"
    +      }
    +    },
    ```

### 2. Kết nối mysql
- Thêm package mysql và kiểm tra kết nối ta cần update file **app.js**:
    ```shell
    ...
    ...
    const hbs = require('hbs');
    //use bodyParser middleware
    const bodyParser = require('body-parser');
    //use mysql database
    const mysql = require('mysql');

    const app = express();

    const hostname = '127.0.0.1';
    const port = 3000;

    //Create Connection
    const db = mysql.createConnection({
      host: hostname,
      user: 'root',
      password: 'root',
      database: 'nodejs'
    });

    //connect to database
    db.connect((err) => {
      if(err) throw err;
      console.log('Mysql Connected...');
    });

    //set dynamic views file
    app.set('views',path.join(__dirname,'views'));
    ...
    ...
    ```
- Và chạy câu lệnh sau để khởi tạo server và thu được kết quả như sau thì có nghĩa là ta đã kết nối mysql thành công:
    ```Shell
    giang@ubuntu:~/projects/learn_nodejs$ node app.js
    Server running at http://127.0.0.1:3000/
    Mysql Connected...
    ```
- Trường hợp kết nối mysql lỗi có thể sẽ xuất hiện thông báo như sau:
    ```
    giang@ubuntu:~/projects/learn_nodejs$ node app.js
    Server running at http://127.0.0.1:3000/
    /home/giang/projects/learn_nodejs/node_modules/mysql/lib/protocol/Parser.js:80
            throw err; // Rethrow non-MySQL errors
            ^

    Error: ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost' (using password: YES)
        at Handshake.Sequence._packetToError (/home/giang/projects/learn_nodejs/node_modules/mysql/lib/protocol/sequences/Sequence.js:47:14)
        at Handshake.ErrorPacket (/home/giang/projects/learn_nodejs/node_modules/mysql/lib/protocol/sequences/Handshake.js:124:18)
        at Protocol._parsePacket (/home/giang/projects/learn_nodejs/node_modules/mysql/lib/protocol/Protocol.js:278:23)
    ```
 - Lúc này các bạn cần kiểm tra lại kết nối database với username, password đã chính xác hay chưa nhé.

### 3. CRUD Example
- Sau khi thực hiện kết nối mysql thành công, ta sẽ thực hiện tạo bảng users và thử làm module thêm, sửa, xóa, view users.
- Tạo database **nodejs** và bảng **users**:
    ```mysql
    CREATE DATABASE nodejs;
    CREATE TABLE users (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(50) NOT NULL,
        created_at DATETIME DEFAULT   CURRENT_TIMESTAMP
    );
    ```
- Bảng **users** sẽ như sau:
    ```
    +------------+-----------------+------+-----+-------------------+----------------+
    | Field      | Type            | Null | Key | Default           | Extra          |
    +------------+-----------------+------+-----+-------------------+----------------+
    | id         | int(6) unsigned | NO   | PRI | NULL              | auto_increment |
    | name       | varchar(30)     | NO   |     | NULL              |                |
    | email      | varchar(50)     | NO   |     | NULL              |                |
    | created_at | datetime        | YES  |     | CURRENT_TIMESTAMP |                |
    +------------+-----------------+------+-----+-------------------+----------------+
    ```
- ### Create user: 
- Ta sẽ tiến hành tạo file **create.hbs** trong folder **views/users/** chứa form cho phép nhập *name* và *email* với nội dung như sau:
    ```HTML
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Add New</title>
        <!--Load bootstrap.css file-->
        <link rel="stylesheet" href="../css/bootstrap.css"/>
      </head>
      <body>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2>Add New User</h2>
              <form action="/users" method="post">
                <div class="form-group row">
                  <label for="name" class="col-sm-2 col-form-label">Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" name="name" placeholder="Name">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="email" class="col-sm-2 col-form-label">Email</label>
                  <div class="col-sm-10">
                    <input type="email" class="form-control" id="email" name="email" placeholder="Email">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Create</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!--Load bootstrap.js file-->
        <script src="js/bootstrap.js"></script>
      </body>
    </html>
    ```
- Và update thêm 2 phương thức create và store vào file **app.js**:
    ```JS
    app.get('/users/create',(req, res) => {
      res.render('users/create');
    });

    app.post('/users',(req, res) => {
      let name = req.body.name;
      let data = {name: name, email: req.body.email};
      let sql = "INSERT INTO nodejs.users SET ?";
      let query = db.query(sql, data, (err, results) => {
        if(err) throw err;
        // res.redirect(`/users`);
        console.log('Create success.');
      });
    });
    ```
- Khởi động lại server và test với link http://localhost:3000/users/create:
    ![](https://images.viblo.asia/23c5a15e-afb8-4aac-b4f9-c5d20291ca19.png)https://images.viblo.asia/23c5a15e-afb8-4aac-b4f9-c5d20291ca19.png
- Kết quả ta thu được:
    ```
    mysql> select * from users;
    +----+-------+-----------------+---------------------+
    | id | name  | email           | created_at          |
    +----+-------+-----------------+---------------------+
    |  1 | Giang | giang@gmail.com | 2019-02-24 00:35:40 |
    +----+-------+-----------------+---------------------+
    1 row in set (0.01 sec)
    ```
- ### List user:
- Tạo file view **views/users/index.hbs**:
    ```HTML
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>User list</title>
        <!--Load bootstrap.css file-->
        <link rel="stylesheet" href="../css/bootstrap.css"/>
      </head>
      <body>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2>User list</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {{#each users}}
                    <tr>
                      <th scope="row">1</th>
                      <td>{{ name }}</td>
                      <td>{{ email }}</td>
                      <td>
                        <a href="javascript:void(0);" class="btn btn-sm btn-info edit">Edit</a>
                        <a href="javascript:void(0);" class="btn btn-sm btn-danger delete">Delete</a>
                      </td>
                    </tr>
                  {{/each}}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!--Load bootstrap.js file-->
        <script src="js/bootstrap.js"></script>
      </body>
    </html>
    ```
- Và cập nhật file **app.js**:
    ```JS
    //route for home with params name
    // app.get('/:name',(req, res) => {
    //   //render index.hbs file
    //   res.render('index',{
    //     name : req.params.name
    //   });
    // });

    app.get('/users/create',(req, res) => {
      res.render('users/create');
    });

    app.post('/users',(req, res) => {
      let name = req.body.name;
      let data = {name: name, email: req.body.email};
      let sql = "INSERT INTO nodejs.users SET ?";
      let query = db.query(sql, data, (err, results) => {
        if(err) throw err;
        res.redirect('/users');
      });
    });

    app.get('/users',(req, res) => {
      let sql = "SELECT * FROM users";
      let query = db.query(sql, (err, users) => {
        if(err) throw err;
        res.render('users/index',{
          users: users
        });
      });
    });
    ```
- Và kết quả ta thu được như sau:
    ![](https://images.viblo.asia/6c70fd47-ab26-43a0-9497-daf3b8fa5d6c.png)https://images.viblo.asia/6c70fd47-ab26-43a0-9497-daf3b8fa5d6c.png
- Tương tự phần Edit và Delete cũng rất đơn giản, các bạn có thể tự làm được, nếu như trong quá trình thực hiện có gặp bất cứ khó khăn gì thì hãy để lại comment hoặc tham khảo tài liệu ở dưới và source code của mình tại đã up lên [tại đây](https://github.com/Giangnv2014/nodejs/tree/crud)
    
> **Tài liệu tham khảo**
    >
    > [nodejs.org](https://nodejs.org/en/docs/guides/getting-started-guide/) 
    >
    >[http://mfikri.com/en/blog/nodejs-mysql-crud](http://mfikri.com/en/blog/nodejs-mysql-crud)
    >
    > [Express](http://expressjs.com/en/guide/routing.html)
    >