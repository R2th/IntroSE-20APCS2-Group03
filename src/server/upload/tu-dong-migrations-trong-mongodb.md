# Giới thiệu
Là một nhà phát triển phần mềm tại một số  thời điểm, bạn có thể phải đối phó với việc migrations cơ sở dữ liệu theo cách này hay cách khác.

Khi phần mềm hoặc ứng dụng phát triển và cải thiện theo thời gian, cơ sở dữ liệu của bạn cũng phải như vậy. Và chúng ta phải đảm bảo dữ liệu vẫn nhất quán trong toàn bộ ứng dụng.

Có một số cách khác nhau mà schema có thể thay đổi từ một phiên bản ứng dụng của bạn sang phiên bản tiếp theo.

* **Một thành viên mới được thêm vào**
* **Một thành viên bị xóa**
* **Một thành viên được đổi tên**
* **Loại thành viên được thay đổi**
* **Đại diện của một thành viên được thay đổi**

Vậy làm thế nào để bạn xử lý tất cả các thay đổi trên?
![](https://images.viblo.asia/f140f086-8e0c-473b-bfbe-f1a04b5f32b2.gif)

Có hai chiến lược :
* Viết một kịch bản sẽ chăm sóc nâng cấp lược đồ cũng như hạ cấp nó xuống các phiên bản trước
* Cập nhật tài liệu của bạn khi chúng được sử dụng

Chiến lược thứ 2 phụ thuộc nhiều vào code hơn và phải nằm trong codebase của bạn. Nếu code bị xóa bằng cách nào đó, thì nhiều tài liệu không thể nâng cấp được.

Chẳng hạn, nếu đã có 3 phiên bản của một tài liệu, [1, 2 và 3] và chúng ta xóa code nâng cấp từ phiên bản 1 sang phiên bản 2, mọi tài liệu vẫn tồn tại như phiên bản 1 đều không thể nâng cấp được. Điều này là chi phí để duy trì code và nó trở nên không linh hoạt.

Vì bài viết này là về tự động hóa migration, chúng ta sẽ học cách có thể viết một tập lệnh đơn giản sẽ xử lý các thay đổi schemaunit tests. cũng như các unit tests.

# Một thành viên đã được thêm vào

Khi một thành viên đã được thêm vào schema,document hiện tại sẽ không có thông tin. Vì vậy, bạn cần truy vấn tất cả các document mà thành viên này không tồn tại và cập nhật chúng.
Có khá nhiều modules npm có sẵn, chúng ta có thể sử dụng [node-migrate](https://github.com/tj/node-migrate) .

**Điều kiện tiên quyết** : 
* node-migrate — Abstract migration framework cho Node
* mongodb 
* Mocha — Thư viện dể viết test
*  Bluebird:  Thư viện promise để xử lý gọi Api async
* mkdirp: giống `mkdir -p` nhưng trong Node.js
* rimraf: `rm -rf` cho  Node
#  Trạng thái Migration
Trạng thái migration là chìa khóa quan trọng nhất để theo dõi quá trình migration hiện tại của bạn. Không có nó, chúng ta sẽ không thể theo dõi:
* Có bao nhiêu migrations đã được thực hiện
* Migrationcuối cùng là gì
* Phiên bản hiện tại của schema chúng ta đang sử dụng là gì

Và không có trạng thái, không có cách nào để khôi phục, nâng cấp và ngược lại sang trạng thái khác.
# Creating Migrations
Để tạo một migrations, thực hiện `migrate create <title> `với một tiêu đề.

Theo mặc định, một tệp trong ./migrations/sẽ được tạo với nội dung sau:

```js
'use strict'

module.exports.up = function (next) {
  next()
}

module.exports.down = function (next) {
  next()
}
```
Hãy lấy một ví dụ về *UserSchema* lược đồ nơi chúng ta có một thuộc tính `name` bao gồm cả tên `first` và `lastname`

Bây giờ chúng ta muốn thay đổi schema  để có một thuộc `last` tính tên riêng .

Vì vậy, để tự động hóa việc này, chúng ta sẽ đọc `name` trong thời gian chạy và trích xuất tên cuối cùng và lưu nó dưới dạng property mới.
Tạo 1 migrations với lệnh sau :
```js
$ migrate create add-last-name.js
```

Câu lệnh này sẽ tạo ra`  ./migrations/{timestamp in milliseconds}-add-last-name.js` dưới `migrations` thư mục trong thư mục gốc
 
#  Up Migration
Chúng ta sẽ tìm thấy tất cả người dùng nơi property  `lastName` không tồn tại và tạo một property mới `lastName` trong các tài liệu đó.
```js
'use strict'
const Bluebird = require('bluebird')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost/Sample'
Bluebird.promisifyAll(MongoClient)

module.exports.up = next => {
  let mClient = null
  return MongoClient.connect(url)
  .then(client => {
    mClient = client
    return client.db();
  })
  .then(db => {
    const User = db.collection('users')
    return User
      .find({ lastName: { $exists: false }})
      .forEach(result => {
        if (!result) return next('All docs have lastName')
        if (result.name) {
           const { name } = result
           result.lastName = name.split(' ')[1]
           result.firstName = name.split(' ')[0]
        }
        return db.collection('users').save(result)
     })
  })
  .then(() => {
    
    mClient.close()
    return next()
  })
   .catch(err => next(err))
}
```
# Down Migration
Tương tự, hãy viết một hàm trong đó chúng ta sẽ xóa `lastName`:

```js
module.exports.down = next => {
let mClient = null
return MongoClient
   .connect(url)  
   .then(client => {
    mClient = client
    return client.db()
  })
  .then(db =>
    db.collection('users').update(
    {
       lastName: { $exists: true }
    },
    {
      $unset: { lastName: "" },
    },
     { multi: true }
  ))
  .then(() => {
    mClient.close()
    return next()
  })
  .catch(err => next(err))

}

```
# Run Migrations
Kiểm tra cách migrations được thực hiện ở đây [: running migrations.](https://github.com/tj/node-migrate#running-migrations)

# Viết  lưu trữ trạng thái tùy chỉnh

Theo mặc định, migrate lưu trữ trạng thái migrations đã được chạy trong một tệp ( .migrate).

.migrate tập tin sẽ chứa đoạn mã sau:
```js
{
  "lastRun": "{timestamp in milliseconds}-add-last-name.js",
  "migrations": [
    {
      "title": "{timestamp in milliseconds}-add-last-name.js",
      "timestamp": {timestamp in milliseconds}
    }
  ]
}
```
Nhưng bạn có thể cung cấp một công cụ lưu trữ tùy chỉnh nếu bạn muốn làm một cái gì đó khác biệt, như lưu trữ chúng trong cơ sở dữ liệu của bạn.

Một công cụ lưu trữ có giao diện đơn giản `load(fn)` và `save(set, fn).`

Miễn là những gì diễn `set` ra giống như vậy load, thì bạn tốt để đi!

Hãy tạo tập tin `db-migrate-store.js` trong thư mục gốc của dự án.
```js
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const Bluebird = require('bluebird')

Bluebird.promisifyAll(MongoClient)
class dbStore {
   constructor () {
     this.url = 'mongodb://localhost/Sample' . // Manage this accordingly to your environment
    this.db = null
    this.mClient = null
   }
   connect() {
     return MongoClient.connect(this.url)
      .then(client => {
        this.mClient = client
        return client.db()
      })
   }
    load(fn) {
      return this.connect()
      .then(db => db.collection('migrations').find().toArray())
      .then(data => {
        if (!data.length) return fn(null, {})
        const store = data[0]
        // Check if does not have required properties
          if (!Object
               .prototype
               .hasOwnProperty
               .call(store, 'lastRun') 
                ||
              !Object
              .prototype
              .hasOwnProperty
             .call(store, 'migrations'))
            {
            return fn(new Error('Invalid store file'))
            }
        return fn(null, store)
      }).catch(fn)
    }
   save(set, fn) {
     return this.connect()
      .then(db => db.collection('migrations')
      .update({},
       {
         $set: {
           lastRun: set.lastRun,
         },
         $push: {
            migrations: { $each: set.migrations },
         },
      },
      {
         upsert: true,
         multi: true,
       }
      ))
       .then(result => fn(null, result))
       .catch(fn)
   }
}

module.exports = dbStore
```
**load(fn)** Trong hàm này, chúng ta chỉ xác minh xem tài liệu migrations hiện có đã được tải có chứa thuộc `lastRun` property  và `migrations` mảng hay không.

**save(set,fn)** Ở đây setđược cung cấp bởi thư viện và chúng ta đang cập nhật `lastRun` giá trị và nối thêm `migrations` vào mảng hiện có.
Dưới đây là các ví dụ thử nghiệm mà bạn có thể thấy cách sử dụng của nó. 

# Automate migration testing
Install Mocha:
```js
$ npm install -g mocha
```

>  Chúng ta đã cài đặt cái này trên global để chúng ta có thể chạy mocha từ termial.
> 
# Cấu trúc
Để thiết lập các thử nghiệm cơ bản, hãy tạo một thư mục mới có tên là `test` kiểm tra trong thư mục gốc, sau đó trong thư mục đó thêm một thư mục có tên là *migrations*.
```
├── package.json
├── app
│   ├── server.js
│   ├── models
│   │   └── user.js
│   └── routes
│       └── user.js
└── test
       migrations
        └── create-test.js
        └── up-test.js 
        └── down-test.js
```
# Test - Create Migration
**Mục tiêu** : Nó sẽ tạo thư mục migrations và tập tin.

```
$ migrate create add-last-name

```
Điều này sẽ ngầm tạo tập tin `./migrations/{timestamp in milliseconds}-add-last-name.js` dưới migrationsthư mục trong thư mục gốc.
Bây giờ thêm đoạn mã sau vào `create-test.js` :
```js
const Bluebird = require('bluebird')
const { spawn } = require('child_process')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const path = require('path')
const fs = Bluebird.promisifyAll(require('fs'))

describe('[Migrations]', () => {
    const run = (cmd, args = []) => {
    const process = spawn(cmd, args)
    let out = ""
    return new Bluebird((resolve, reject) => {
       process.stdout.on('data', data => {
         out += data.toString('utf8')
       })
      process.stderr.on('data', data => {
        out += data.toString('utf8')
      })
      process.on('error', err => {
         reject(err)
      })
     process.on('close', code => {
      resolve(out, code)
     })
   })
 }
    
const TMP_DIR = path.join(__dirname, '..', '..', 'tmp')
const INIT = path.join(__dirname, '..', '..', 'node_modules/migrate/bin', 'migrate-init')
const init = run.bind(null, INIT)
const reset = () => {
   rimraf.sync(TMP_DIR)
   rimraf.sync(path.join(__dirname, '..', '..', '.migrate'))
}

beforeEach(reset)
afterEach(reset)
describe('init', () => {
   beforeEach(mkdirp.bind(mkdirp, TMP_DIR))

   it('should create a migrations directory', done => {
      init()
      .then(() => fs.accessSync(path.join(TMP_DIR, '..', 'migrations')))
      .then(() => done())
      .catch(done)
   })
 })
})
```
Trong test trên, chúng ta đang sử dụng các lệnh `migrate-init`  để tạo ra các thư mục `migrations`  và xóa nó sau mỗi lần kiểm tra trường hợp sử dụng `rimraf` mà là `rm -rf` trong Unix.

Sau này chúng ta có sử dụng chức năng `fs.accessSync `để xác minh thư mục `migrations` tồn tại hay không.
# Test — Up Migration
**Mục tiêu** :  Nó nên thêm `lastName` vào schema và lưu trữ trạng thái migration.
thêm đoạn code sau vào   file `up-test.js`

```js
const chance = require('chance')()
const generateUser = () => ({
   email: chance.email(),
   name: `${chance.first()} ${chance.last()}`
 })
const migratePath = path.join(__dirname, '..', '..', 'node_modules/migrate/bin', 'migrate')
const migrate = run.bind(null, migratePath)

describe('[Migration: up]', () => {
   before(done => {
     MongoClient
     .connect(url)
     .then(client => {
       db = client.db()
      return db.collection('users').insert(generateUser())
      })
      .then(result => {
       if (!result) throw new Error('Failed to insert')
       return done()
      }).catch(done)
   })
   it('should run up on specified migration', done => {
     migrate(['up', 'mention here the file name we created above', '--store=./db-migrate-store.js'])
    .then(() => {
       const promises = []
       promises.push(
        db.collection('users').find().toArray()
       )
     Bluebird.all(promises)
    .then(([users]) => {
       users.forEach(elem => {
         expect(elem).to.have.property('lastName')
      })
      done()
    })
   }).catch(done)
 })
after(done => {
    rimraf.sync(path.join(__dirname, '..', '..', '.migrate'))
    db.collection('users').deleteMany()
    .then(() => {
      rimraf.sync(path.join(__dirname, '..', '..', '.migrate'))
      return done()
   }).catch(done)
 })
})
```
Tương tự, bạn có thể viết migration before() và các after() chức năng cơ bản vẫn giống nhau.

# Kết luận
Hy vọng rằng bây giờ bạn có thể tự động hóa các thay đổi schema của bạn với thử nghiệm thích hợp. :)
Bạn có thể tham khảo code từ [đây](https://github.com/thatshailesh/mongodb-migration) 

Nguồn tham khảo:  https://www.freecodecamp.org/news/how-to-automate-database-migrations-in-mongodb-d6b68efe084e/