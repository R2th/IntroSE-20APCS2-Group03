# **Sequelize in Nodejs Part II**
Chung ta có thể nói một cách nôna rằng ORM library cho node, Mình xin giới thiệu cho các bạn với một library ORM của node đó là sequelize cli. với library các bạn sẽ dễ rằng để config Mysql, Postgresql, Sqlite, Mariadb, Postgres. Trước mặt bạn cần phải tìm hiểu thêm và trước đây về [sequelize](https://viblo.asia/p/sequelize-in-nodejs-part-i-m68Z0VgX5kG)
![](https://images.viblo.asia/40cc2c2c-b527-41da-a8eb-73c368534130.png). Ở phần này các bạn sẽ hiểu thêm về cách config tự động, không phải bạn cần phải tự viết file ```db.js``` như lần trước nữa.
## 1. Sequelize Cli là gì?
Sequelize cli là một library của node js và hộ trỡ các bạn liên kết node với database hoặc được gọi là ORM.
## 2. Cách cấu hình sequelize cli
- cái đặt ```sequelize``` :
```
npm install --save sequelize 
```
- Cái đặt  thư viên cho database của bạn trước. Thư viên database đã hộ trỡ cho ```sequelize```:
    -  [Sqlite3](https://www.npmjs.com/package/sqlite3)
    -  [Postgres, Postgresql](https://www.npmjs.com/package/pg)
    -  [MariaDB](https://www.npmjs.com/package/mariadb)
    -  [Mysql](https://www.npmjs.com/package/mysql2)
 ```
 npm install --save mysql    // dành cho Mysql
 ```
 - Cái đặt  ```sequelize-cli``` 
 ```
 npm install --save sequelize-cli
 ```
 sau khi  add ```sequelize-cli``` vào project của bạn xong rồi.  chúng ta sẽ phải chạy khởi tạo như sau:
 ```
 npx sequelize init
 ```
 - Trước mặt bạn phải cấu hình kết nội db của bạn trước thì  bạn phải vào file ```config/config.json```
```
{
  "development": {
    "username": "root", // user mysql
    "password": null, // password mysql
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
```
xong rồi bạn phải chạy code
```
npx sequlize db:create
```
-  chúng ta thấy rằng bên sequlize tạo cho mình những folders sau này:
 
     - config: những biến cần thiết dành cho việc kết nội db
     - migrations: migration những table cho db
     - models: cấu hình kết nội db
     - seeders: dành cho việc khởi tạo master data
## 3. Cách dùng model và migration
- Để thêm vào một model mới cho db:
```
npx sequelize model:create --name [ten_model] --attributes [ten_attr]:[datatype_attr],[ten_attr]:[data_type_attr],[ten_attr]:[data_type_attr]

npx sequelize model:create --name user --attributes first_name:string,last_name:string,bio:text  // example
```
sau khi chạy code ```model:create``` , chúng ta thấy rằng trong model và migrations có file tên là ```user.js``` và ```xxx_create_user.js```. Trong file ```xxx_create_user.js``` chúng ta có thể thêm hoặc xóa column của table theo ý của mình hoặc thêm index cho những column nào đó, example:
```
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
      },
      bio: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'  
      }
    }).then(() => queryInterface.addIndex('users', ['first_name'])).then(() => {
      // perform further operations if needed
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
```
theo code trên chúng ta đã có một chút thay đổi như sau:
- chúng ta muốn đặt tên column của mình là updated_at, created_at, không phải là updatedAt, CreatedAt nhưng chúng ta vãn dùng updatedAt, CreatedAt trong Node (theo convention tên name camelCase), có nghĩa là tên column vẫn là ```created_at``` và ```updated_at``` nhưng object dùng cho model user đó là ```user.updatedAt  user.createdAt```.
- Thêm Index cho table user, chúng ta thêm index với column ```first_name``` 
sau khi đã chính sửa xong hết rồi, chúng ta sẽ chạy migration sẽ tạo table như chúng ta cấu hình xong ở bên migration file
```
npx sequelize db:migrate
```
## 4. Validate
sau khi tạo table ```User`` xong, chúng ta có viết ```scope, query, validate, callback``` trong ```model/user.js```
```
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    bio: DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
  }, {
    
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
```
- ở đây, chúng ta đã validate cho ```firstName```, nếu các bạn muốn dùng validate cho column của bạn thì có thể tìm hiểu:
```
    type: Sequelize.STRING,
    validate: {
      is: ["^[a-z]+$",'i'],     // will only allow letters
      is: /^[a-z]+$/i,          // same as the previous example using real RegExp
      not: ["[a-z]",'i'],       // will not allow letters
      isEmail: true,            // checks for email format (foo@bar.com)
      isUrl: true,              // checks for url format (http://foo.com)
      isIP: true,               // checks for IPv4 (129.89.23.1) or IPv6 format
      isIPv4: true,             // checks for IPv4 (129.89.23.1)
      isIPv6: true,             // checks for IPv6 format
      isAlpha: true,            // will only allow letters
      isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
      isNumeric: true,          // will only allow numbers
      isInt: true,              // checks for valid integers
      isFloat: true,            // checks for valid floating point numbers
      isDecimal: true,          // checks for any numbers
      isLowercase: true,        // checks for lowercase
      isUppercase: true,        // checks for uppercase
      notNull: true,            // won't allow null
      isNull: true,             // only allows null
      notEmpty: true,           // don't allow empty strings
      equals: 'specific value', // only allow a specific value
      contains: 'foo',          // force specific substrings
      notIn: [['foo', 'bar']],  // check the value is not one of these
      isIn: [['foo', 'bar']],   // check the value is one of these
      notContains: 'bar',       // don't allow specific substrings
      len: [2,10],              // only allow values with length between 2 and 10
      isUUID: 4,                // only allow uuids
      isDate: true,             // only allow date strings
      isAfter: "2011-11-05",    // only allow date strings after a specific date
      isBefore: "2011-11-05",   // only allow date strings before a specific date
      max: 23,                  // only allow values <= 23
      min: 23,                  // only allow values >= 23
      isCreditCard: true,       // check for valid credit card numbers

      // Examples of custom validators:
      isEven(value) {
        if (parseInt(value) % 2 !== 0) {
          throw new Error('Only even values are allowed!');
        }
      }
      isGreaterThanOtherField(value) {
        if (parseInt(value) <= parseInt(this.otherField)) {
          throw new Error('Bar must be greater than otherField.');
        }
      }
```
## 5. Scope và Query
chúng ta có viết scope hoặc câu lệnh query trong model của chúng ta trong file ```models/user.js``` như sau:
```
 ...
  }, {
    scopes: {
      orderByCreatedAt () {
        return {
          findAll: {
            order: 'created_at ASC'
          }
        }
      },
    }
  });
  User.associate = function(models) {
  ...
```
## 6. Cách dùng model
chúng ta có thể test lại model của mình bằng đơn giản, bằng câu lệnh ```node```
```
db =  require('./models/index.js');
User = db.user;
User.create({firstName: 'Dam', lastName: 'Samnang', bio: 'Web Developer'});
User.create({firstName: 'Dam', lastName: 'Andy', bio: 'Dj'});
User.findAll({where: {lastName: 'Samnang'}}).then(u => console.log(u))
User.scope('orderByCreatedAt').findAll().then(u => console.log(u))
```
## kết luận
Phần hai đây, chúng ta sẽ bước được cách dùng sequelize thật là dễ dàng, nếu các bạn đã đọc bài viết này , không hiểu chỗ nào có thể giúp mình một comment để bài viết sau này càng tốt hơn
## Tài liệu
- [sequelize scope](https://sequelize.org/master/manual/scopes.html)
- [sequelize cli](https://github.com/sequelize/cli)