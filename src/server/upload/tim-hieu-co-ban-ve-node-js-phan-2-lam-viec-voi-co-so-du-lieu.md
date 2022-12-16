# Làm việc với cơ sở dữ liệu

Node.js có có thể làm việc với cơ sở dữ liệu như các ngôn ngữ lập trình và framework khác. Và Node.js hỗ trở các cơ sở dữ liệu nổi tiếng khác nhau: MySql, Sql Server, MongoDB ...

## Node.js và MySql.

Để thao tác với MySql ta cần:

 * Một server cài đặt sẵn MySql .
 * Để Node.js có thể làm việc với MySql ta cần cài đặt module *mysql* thông qua npm

 ```
    npm install mysql
 ```

 Một khi cài đặt xong ta chỉ việc require module này vào file Node.js là có thể thao tác được với MySql

```
    var mysql = require('mysql');
```

### Tạo kết nối với MySql

Để thao tác với MySql trước hết ta cần tạo kết nối bằng việc sử dụng các thông tin:
 * host: địa chỉ server nơi đặt mysql.
 * user: username của mysql.
 * password: password của mysql.

Các thông tin trên sẽ được truyền vào hàm createConnection() của module *mysql* dưới dạng object. Sau đó gọi phương thức connect() để tiến hành kết nối với mysql.

```
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "yourusername",
      password: "yourpassword"
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
```

Sau khi kết nối thành công với mysql ta có thể thực hiện các thao tác truy vấn thông qua câu lệnh sql và phương thức query() của module mysql.

```
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
      });
    });
```

### Tạo cơ sở dữ liệu.

```
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "yourusername",
      password: "yourpassword"
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query("CREATE DATABASE mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });
    });
```

### Tạo bảng với cơ sở dữ liệu có sẵn.

Với cơ sở dữ liệu có sẵn khi kết nối với nó ngoài thông tin về host, user, password, ta cần cung cấp *database* là tên cơ sở dữ liệu mà ta sẽ thao tác cùng.

```
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "yourusername",
      password: "yourpassword",
      database: "mydb"
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    });
```

### Thêm mới bản ghi

```
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "yourusername",
      password: "yourpassword",
      database: "mydb"
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });
```

### Select bản ghi

```
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "yourusername",
      password: "yourpassword",
      database: "mydb"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    });
```
Kết quả trả về sẽ được lưu dưới dạng một mảng các object và ta có thể loop qua các object để đọc.

Do Node.js sử dụng thuần câu truy vấn sql nên khi thực hiện select ta có thể sử dụng thêm cùng với các mệnh đề where, group by, order, limit, ofset ...

### Xóa bản ghi

```
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "yourusername",
      password: "yourpassword",
      database: "mydb"
    });

    con.connect(function(err) {
      if (err) throw err;
      var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
      });
    });
```

### Xóa bảng.

```
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "yourusername",
      password: "yourpassword",
      database: "mydb"
    });

    con.connect(function(err) {
      if (err) throw err;
      var sql = "DROP TABLE customers";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table deleted");
      });
    });
```

### Update thông tin cho bản ghi

```
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "yourusername",
      password: "yourpassword",
      database: "mydb"
    });

    con.connect(function(err) {
      if (err) throw err;
      var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
    });
```

### Join bảng

```
    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "localhost",
      user: "yourusername",
      password: "yourpassword",
      database: "mydb"
    });

    con.connect(function(err) {
      if (err) throw err;
      var sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
      });
    });
```

Ở đây ta có thể thay JOIN bằng LEFT JOIN, RIGHT JOIN hoặc INNER JOIN.

## Node.js và MongoDB

Ngoài làm việc được với các cơ sở dữ liệu quan hệ Node.js còn có thể làm việc được với các cơ sở dữ liệu phi quan hệ NoSql như: MongoDB. Tương tự như làm việc với MySql khi làm việc với MongoDB ta cần:
 * Một server để đặt MongoDB.
 * Module mongodb được cài đặt thông qua npm.

```
	npm install mongodb
```
Sau khi cài đặt ta có thể require module này vào là có thể sử dụng.

### Tạo cơ sở dữ liệu.

Để tạo được cơ sở dữ liệu trong MongoDB ta bắt đầu từ việc tạo một đối tượng MongoClient. Sau đó cung cấp địa chỉ ip của server MongoDB cùng với tên của cơ sở dữ liệu muốn tạo dưới dạng một url và truyền vào cho phương thức connect của đối tượng MongoClient trên. MongoDB sẽ tạo csdl nếu nó chưa tồn tại và tạo luôn kết nối đến nó.

```
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/mydb";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  console.log("Database created!");
	  db.close();
	});
```

### Tạo collection.

Một collection ở MongoDB tương đương với một bảng trong MySql. Để tạo một collection trong MongoDB ta sử dụng phương thức createCollection():

```
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.createCollection("customers", function(err, res) {
	    if (err) throw err;
	    console.log("Collection created!");
	    db.close();
	  });
	});
```

### Thêm bản ghi vào MongoDB

Trong MongoDB một bản ghi còn được gọi là một document. Để thêm document vào một collection ta sử dụng phương thức insertOne(). Tham số đầu tiên của phương thức này là một đối tượng chứa các dữ liệu của document cần thêm vào collection và được lưu dưới dạng key - value. Tham số thứ hai là một callback để xử lý kết quả của phương thức insertOne().

```
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  var myobj = { name: "Company Inc", address: "Highway 37" };
	  dbo.collection("customers").insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	    db.close();
	  });
	});
```
Để thêm nhiều document cùng một lúc vào collection MongoDB ta sử dụng phương thức inserMany(). Lúc này các document sẽ được sắp xếp vào một mảng như là tham số đầu tiên cần truyền vào phương thức.

```
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  var myobj = [
	    { name: 'John', address: 'Highway 71'},
	    { name: 'Peter', address: 'Lowstreet 4'},
	    { name: 'Amy', address: 'Apple st 652'},
	    { name: 'Hannah', address: 'Mountain 21'},
	    { name: 'Michael', address: 'Valley 345'},
	    { name: 'Sandy', address: 'Ocean blvd 2'},
	    { name: 'Betty', address: 'Green Grass 1'},
	    { name: 'Richard', address: 'Sky st 331'},
	    { name: 'Susan', address: 'One way 98'},
	    { name: 'Vicky', address: 'Yellow Garden 2'},
	    { name: 'Ben', address: 'Park Lane 38'},
	    { name: 'William', address: 'Central st 954'},
	    { name: 'Chuck', address: 'Main Road 989'},
	    { name: 'Viola', address: 'Sideway 1633'}
	  ];
	  dbo.collection("customers").insertMany(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("Number of documents inserted: " + res.insertedCount);
	    db.close();
	  });
	});
```
### Tìm kiếm dữ liệu trong MongoDB.

Để tìm kiếm dữ liệu trong collection của MongoDB ta có thể sử dụng phương thức findOne(). Phương thức này sẽ trả về kết quả đầu tiên nó gặp được. Tham số đầu tiên chính là một đối tượng query.

```
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("customers").findOne({}, function(err, result) {
	    if (err) throw err;
	    console.log(result.name);
	    db.close();
	  });
	});
```

Ngoài findOne() ta cũng có thể sử dụng find() để tìm tất cả các bản ghi theo điều kiện query nào đó.

```
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("customers").find({}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    db.close();
	  });
	});
```

Với phương thức find() ta có thể truyền vào tham số thứ hai là các trường mà ta muốn đưa vào kết quả, nó tương tự như select các column cụ thể trong MySql.

```
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("mydb");
	  dbo.collection("customers").find({}, { _id: 0, name: 1, address: 1 }).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    db.close();
	  });
	});
```
### Thêm điều kiện khi tìm kếm

Khi sử dụng phương thức find() để tìm kiếm trong Mongodb, tham số thứ nhất ta có thể truyền vào là một object như là điều kiện để giới hạn kết quả tìm kiếm.
```
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { address: "Park Lane 38" };
  dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
```

Như ở ví dụ trên ta đang tìm kiếm các document có trường address là Park Lane 38.

# Tài Liệu Tham Khảo
1.) https://www.w3schools.com/nodejs/default.asp