![image.png](https://images.viblo.asia/bde1eb52-4027-4223-ad93-70bd155d2381.png)

Sequilize là một [ORM](https://viblo.asia/p/object-relational-mapping-djeZ1PQ3KWz#_1-orm-la-gi--0)  dành cho **MySQL, Postgres, MariaDB, SQLite .. ,** Giúp chúng ta thao tác với các loại cơ sử dữ liệu một cách dễ dàng.
# Cài đặt  
 **Ở đây mình sử dụng sequelize-cli để thao tác với CSDL, nếu không sử dụng thì chúng ta bỏ qua câu lệnh liên quan tới sequelize-cli nhé.**
 1.  Cài đặt `ExpressJs` và tạo project
 
        Tạo một folder và chạy câu lệnh bên trong folder đó :3
     ```
     npm install express --save
     npx express-generator
     npm install
     ```
 
 2. Cài đặt Sequelize và các package cần dụng của nó.
 
    ```
    npm install --save sequelize
    npm install --save mysql2
    npm install --save-dev sequelize-cli
    npx sequelize-cli init
     ```
 
     Nếu không dùng `MySQL` chúng ta có thể cài đặt các package tương ứng:

     ```
     npm install --save pg pg-hstore # Postgres
    npm install --save mysql2
    npm install --save mariadb
    npm install --save sqlite3
    npm install --save tedious # Microsoft SQL Server
     ```
    **sequielize-cli** là một công cụ giúp tạo model, migrate, seed một cách dễ dàng

### Kết nối tới CSDL
Sau khi thực hiện xong các câu lệnh, thì chúng đã sinh ra cho chúng ta một số thư mục
- config:  chứa file `config.json` chứa cấu hình để chúng ta kết nối đến cơ sở dữ liệu và chúng chứa ba loại môi trường để chúng ta cấu hình. Ở đây sẽ lấy ở `development` vì trong file models/index.js sử dụng mặc định.
```
{
  "development": {
    "username": "root",
    "password": "123456",
    "database": "nodejs",
    "host": "mysql",
    "dialect": "mysql",
    "port": "3306"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": "3307"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
     "port": "3307"
  }
}
```
Và trong file `models/index.js` Chúng đã tự liên kết tới CSDL cho mình và cũng có thể tự chọn môi trường mà chúng ta sử dụng. File này sẽ tự động gọi khi bạn tạo ra model
```
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // sử dụng môi trường nào 
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) { // kết nối tới csdl
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

```

**Nếu không sử dụng `sequielize-cli` thì chúng ta có thể tự kết nối CSDL bằng cách**
```
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql'
});
```
- Đối với SQLite thì hơi khác một chút
```
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});
```

- Chúng ta có thể kết nối thông qua URI
```
const sequelize = new Sequelize('sqlite::memory:')
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')
```
# Sử dụng
## Model
### Tạo model

Để tạo model ánh xa 1-1 với bảng trong CSDL thì có 2 cách để tạo
- Gọi phương thức `define`
```
const { Sequelize, DataTypes } = require('sequelize');
const User = sequelize.define('User', {
  // các attribte sẽ được định nghĩa ở đây
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
// viết một số option tại đây
timestamps: false // ở đây mình không muốn tạo createdAt và updatedAt
});
```
- Kế thừa `Model` và gọi phương thức `init`
```
const { Sequelize, DataTypes, Model } = require('sequelize');
class User extends Model {}

User.init({
  // các attribte sẽ được định nghĩa ở đây
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  // Một số option tại đây
  sequelize, // là cái instance kết nối mà chúng ta tạo ra
  modelName: 'User' // tương ứng với bảng trong CSDL
});
```
Bên trong phương thức `define` cũng đã gọi đến `init` nên là cả 2 cách đều có hướng như nhau :v.
### DatatTypes cho từng attribute
Một số kiểu dữ liệu phổ biến trong sequelize
```
// String
DataTypes.STRING             // VARCHAR(255)
DataTypes.STRING(1234)       // VARCHAR(1234)
DataTypes.STRING.BINARY      // VARCHAR BINARY
DataTypes.TEXT               // TEXT
DataTypes.TEXT('tiny')       // TINYTEXT
DataTypes.CITEXT             // CITEXT          PostgreSQL and SQLite only.
DataTypes.TSVECTOR    

// booalean
DataTypes.BOOLEAN            // TINYINT(1)

//number
DataTypes.INTEGER            // INTEGER
DataTypes.BIGINT             // BIGINT
DataTypes.BIGINT(11)         // BIGINT(11)

DataTypes.FLOAT              // FLOAT
DataTypes.FLOAT(11)          // FLOAT(11)
DataTypes.FLOAT(11, 10)      // FLOAT(11,10)

DataTypes.REAL               // REAL            PostgreSQL only.
DataTypes.REAL(11)           // REAL(11)        PostgreSQL only.
DataTypes.REAL(11, 12)       // REAL(11,12)     PostgreSQL only.

DataTypes.DOUBLE             // DOUBLE
DataTypes.DOUBLE(11)         // DOUBLE(11)
DataTypes.DOUBLE(11, 10)     // DOUBLE(11,10)

DataTypes.DECIMAL            // DECIMAL
DataTypes.DECIMAL(10, 2)     // DECIMAL(10,2)

//Date
DataTypes.DATE       // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
DataTypes.DATE(6)    // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
DataTypes.DATEONLY   // DATE without time
```
Bạn có thể xem qua các kiểu dữ liệu tại [đây](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)
### Tạo bảng trong CSDL
Khi định nghĩa xong `model` và chúng ta chỉ cần làm là tạo bảng tương ứng với model đó bằng cách chạy phương thức `sync`. Sau khi gọi `sync` Sequelize sẽ tự tạo truy vấn tạo bảng và không làm thay đổi model và Vì sync sẽ trả về một `promise` nên chúng ta sẽ cần gọi đến await 
- sync một model `await User.sync()`
- sync toàn bộ model `await sequelize.sync({ force: true })`

Điều gì xảy ra khi trong CSDL đã có table `User` nhỉ ? và bảng cũ và bảng chúng ta tạo ra lại có column khác nhau ?
Thì ở đây có một số option để chúng ta lực chọn
- User.sync() - Sẽ tạo bảng nếu bảng không tồn tại và không làm gì nếu ngược lại
- User.sync({ force: true }) - Xóa bảng đã tồn tại và tạo ra bảng mới
 - User.sync({ alter: true }) - Kiểm tra bảng trong cơ sở dữ liệu (có những trường nào, kiểu dữ liệu là gì ...) sau đó sẽ thay đổi phù hợp với model
 ### Xóa bảng trong CSDL
 Cũng giống như `sync` để xóa bảng chúng ta gọi phương thức `drop` và trả về một promise;
 - Xóa một bảng `await User.drop()`
 - Xóa toàn bộ `await sequelize.drop();`
 
 ## Tạo model và migrate thông qua sequelize-cli
 - Migrate giúp chúng ta tạo và xóa bảng trong csdl
 - Model để chúng ta truy vấn hoặc lấy dữ liệu

Để tạo hai cái trên thì chỉ cần chạy câu lệnh
```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
npx sequelize-cli db:migrate
```
- --name: tên của model;
- --attributes danh sách attribute model
- Tạo model với name là User trong folder `models`
- Tạo migrate XXXXXXXXXXXXXX-create-user.js ở folder migrate 

`chúng ta có thể tự thêm các atttribute nếu chúng ta thấy nhập ở command chưa đủ và cập nhật lại model trước khi chạy db:migrate nhé.`

Các command của sequelize-cl
```
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo // Rollback lần cuối chạy migration.
npx sequelize-cli init // tạo 3 thư mục models migrations seeds
npx sequelize-ci help hiển thị help
npx sequelize-cli migration:create tạo một migrate mới
```
Cơ bản về model migrate giống với laravel nó sẽ tạo ra một bảng `SequelizeMeta` lưu lại lịch sử thay đổi CSDL và dựa vào nó để thực thi.
## Các Relationship trong model
`Sequelize` hỗ trợ cho các liên kết cơ bản là: `one to one`, `one-to-many` và `many to many`. Để làm được điều này `sequelize` tạo ra bốn loại liên kết để hết hợp ra chúng :
- HasOne
- BelongsTo
- HasMany
- BelongsToMany

ví dụ :
```
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);

A.hasOne(B, {{ /* options */ }});
A.belongsTo(B, {{ /* options */ }});
A.hasMany(B, {{ /* options */ }});
A.belongsToMany(B, { through: 'C', /* options */ });
```
- A.hasOne(B) : chỉ ra sự liên kết 1 1 giữa A và B và khóa ngoại sẽ được đặt ở B
- A.beLongsTo(B) chỉ ra sự liên kết 1 1 giữa A và B và khóa ngoại được đặt ở A
- A.hasMany(B) chỉ ra sự liên kết 1 N giữa a và B và khóa ngoại được đặt ở B
- a.belongsToMany(B, { through: 'C' }):  Chỉ ra liên kết N-N giữa A và B thông qua bảng C, bảng C phải có khóa ngoại của 2 bảng A và B, Sequelize sẽ tự động tạo bảng C nếu bảng C không tồn tại.

**Chúng ta có thể tự định nghĩa khóa ngoại thông qua option ở trên và để xem chi tiết các bạn có thểm tham khảo qua [docs](https://sequelize.org/docs/v6/core-concepts/assocs/)**
## Truy vấn tới CSDL
### Tạo dữ liệu
Để tạo dữ liệu chúng ta thường sử dụng cú pháp ngắn ngọn `create()`:
```
await User.create({
        firstName: 'hi',
        lastName: 'hi',
    });
```
Ngoài ra chúng ta có thể dùng 2 cú pháp `build()` và `save()` 
```
const user = User.build({
        firstName: 'hi',
        lastName: 'hi',
    }); // tạo instance nhưng chưa lưu vào csdl
    
    await user.save() // lưu vào csdl
```
### Lấy dữ liệu
- Lấy toàn bộ dữ liệu `User.findAll({// option})` : ở phần option sẽ cho phép bạn lấy những dữ liệu riêng hoặc dữ liệu tính toán
- Lấy dữ liệu thông qua khóa chính `User.findByPk(id)`
- Lấy dữ liệu theo điều kiện 
```
User.findAll({
    where: {
        fistName: 'hi',
        lastName: 'hi'
        
    }
 })
 ```
 còn rất nhiều câu truy vấn sử dụng `where` chúng ta có thể tham khảo qua [docs](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#applying-where-clauses)
 ### Cập nhật dữ liệu
 Cập nhật dữ liệu chúng ta sẽ sử dụng phương thức `update` và chúng ta có thể sử dụng where
 ```
 User.update({
     lastName: "Doe"
 }, {
     where: {
        lastName: null
      }
 })
 ```
 ### Xóa dữ liệu
 Xóa dự liệu theo điều kiện sử dụng `destroy` và option là `where`
 ```
 await User.destroy({
  where: {
    firstName: "hi"
  }
});
 ```
 Xóa toàn bộ dữ liệu sử dụng `destroy` và option `truncate`
 ```
await User.destroy({
  truncate: true
});
 ```
# Kết bài
Trong bài viết này là một số ví dụ cơ bản về sequelize và sequelize. để hiểu rõ hơn mời các bạn đến trang chủ để tìm hiểu chỉ tiết.

Tài liệu tham khảo
https://sequelize.org/