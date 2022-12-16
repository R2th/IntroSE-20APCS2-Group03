![](https://images.viblo.asia/54244e4b-d7dc-4459-8c75-c6fec3610da2.png)

Trong bài này, mình sẽ trình bày cách sử dụng Node.js kết hợp với SQLite 3 để thêm sửa xóa các bản ghi Database dạng CSDL quan hệ (có Table, Row, Column đàng hoàng). Trước giờ NodeJS thường được dùng với No-SQL ví dụ MongoDB, JSON. Bài này sẽ sử dụng SQLite 3.

Nói thêm một chút, SQLite là một cơ sở dữ liệu quan hệ nhưng không cần server mà nó lưu trữ thành dạng file bê đi đâu cũng được ví dụ như một file word, exel vậy, rất là tiện lợi nếu cần đem phần mềm và cơ sở dữ liệu copy vào đâu cũng chạy.

# Cài đặt môi trường

Mình sẽ bắt đầu bằng cách gõ lệnh `npm init` bên trong một thư mục mới tạo có tên là `node-sqlite-tutorial`. Đây là lệnh để tạo mới một project bằng NodeJS. Khi chạy lệnh này thì Node sẽ hỏi chúng ta các câu hỏi cần thiết để tạo project. Ví dụ tên project, phiên bản, tác giả... Điền xong các bạn sẽ được như hình:

```
$ npm init
This utility will walk you through creating a package.json file.  
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields  
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and  
save it as a dependency in the package.json file.

Press ^C at any time to quit.  
name: (app) node-sqlite  
version: (0.0.0) 0.1.0  
description: Code for tutorial blog on node and sqlite  
entry point: (index.js) main.js  
test command:  
git repository:  
keywords:  
author: Adam McQuistan  
license: (BSD) MIT  
About to write to /node-sqlite/app/package.json:

{
  "name": "node-sqlite",
  "version": "0.1.0",
  "description": "Code for tutorial blog on node and sqlite",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": "",
  "author": "Adam McQuistan",
  "license": "MIT"
}


Is this ok? (yes) 
```

Tiếp theo, mình sẽ cần cài đặt gói `sqlite3` qua `npm` như sau (trỏ **cmd** đến thư mục hiện tại và gõ như bên dưới):

```
$ npm install --save sqlite3
```

Ngoài sqlite3 mình sẽ cài đặt **`Bluebird`** để mình có thể sử dụng chức năng **`Promises`** quen thuộc trong lập trình Javascript (giúp thao tác với dữ liệu).

```
$ npm install --save bluebird
```

Bây giờ mình sẽ tạo một file trống ngay bên cạnh tệp `package.json` gọi là `database.sqlite3` nơi SQLite sẽ lưu trữ dữ liệu trong đó.

# Thiết kế CSDL

Để lưu trữ dữ liệu cho bài toán mình sẽ thiết kế một mẫu dữ liệu quan hệ gồm 2 bảng nối nhau, kiểu master-detail. 

Giả sử mình cần tạo một ứng dụng dùng để quản lý dự án. Mỗi dự án có thể có một hoặc nhiều task cần hoàn thành, cần biết rõ task hoàn thành hay chưa. Mình có thể demo dữ liệu trong bảng như sau:


Bảng projects

|id	|name|
| -------- | -------- | 
|1	|Write Node.js - SQLite Tutorial|
|2	|Testing Functionalities|

Bảng tasks 

id|name|description|	isCompleted	|projectId|
| -------- | -------- | -------- | -------- | -------- | 
|1	|Outline|High level overview of sections|1|1|
|2	|Write | Write article contents and code examples| 0|1|

Ok, bây giờ mình biết dữ liệu gồm những gì, giờ hãy đi tạo bảng SQL để chứa được dữ liệu của 2 bảng trên


# Tạo ra file Cơ sở dữ liệu

Để bắt đầu, mình sẽ cần tạo một file `main.js` cùng với file  `dao.js` (Toàn bộ hàm thêm sửa xóa sẽ viết chung trong đây cho gọn) trong cùng thư mục với file `package.json` (thư mục gốc của project).

Bên trong `dao.js` mình sẽ thêm một hàm khởi tạo để kết nối đến một file sqlite3 có sẵn sử dụng Bluebird . Hàm khởi tạo này sẽ được gán vào một biến dùng chung cố định là `this.db`. Hàm khởi tạo này cũng sẽ được đưa vào class `AppDAO` để export nó ra bên ngoài (cho phép các class khác ở file khác có thể nhìn thấy và gọi hàm khởi tạo class, từ khóa export trong js tương đương từ khóa public trong lập trình hướng đối tượng).


```
// dao.js

const sqlite3 = require('sqlite3')  
const Promise = require('bluebird')

class AppDAO {  
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {  //cần truyền vào một đường dẫn đến file csdl sqlite để khởi tạo một kết nối đến file để bắt đầu đọc ghi
      if (err) {
        console.log('Could not connect to database', err)   //Kết nối chưa thành công, có lỗi
      } else {
        console.log('Connected to database')   //Đã kết nối thành công và sẵn sàng để đọc ghi DB
      }
    })
  }
}

module.exports = AppDAO    //Cần phải exports (mở) cái class  này để một class bất kỳ có thể khởi tạo AppDAO và bắt đầu dùng kết nối đã được mở bên trên (biến this.db)
```

Việc kết nối đến cơ sở dữ liệu đã được mô tả bằng các comment bên trên. Cơ bản thì bạn khởi tạo một class AppDAO và đưa đường dẫn đến tệp cơ sở dữ liệu SQLite mà bạn muốn kết nối, bạn sẽ được một biến this.db để bắt đầu thao tác với CSDL.
 Biến this.db này đã kế thừa đầy đủ các hàm viết sẵn của Node.js sqlite3 giúp thực thi các truy vấn (query) đến file dbFilePath. Trong ví dụ này chúng ta sẽ dùng đến 3 hàm sau đây:

> **`run`**: Được sử dụng để tạo hoặc thay đổi bảng và chèn hoặc cập nhật dữ liệu bảng.
> 
> **`get`**: Chọn một hàng dữ liệu từ một hoặc nhiều bảng.
> 
> **`all`** : Chọn nhiều hàng dữ liệu từ một hoặc nhiều bảng.

Để bắt đầu, hãy khám phá hàm `run`. Cú pháp của nó như sau:

```
db.run('SOME SQL QUERY', [param1, param2], (err) => {  
  if (err) {
    console.log('ERROR!', err)
  }
})
```
Tham số đầu tiên được truyền cho run (...) là một chuỗi SQL được thực thi và là tham số bắt buộc. Tham số thứ hai là một mảng tham số tùy chọn mà thư viện sqlite3 sẽ hoán đổi cho bất kỳ ký tự `'?'` trong tham số truyền vào. Tham số thứ 3 là một hàm callback để bắn ra lỗi nếu có lỗi sau khi thực thi.

Để áp dụng vào class AppDAO của chúng ta mình sẻ dùng đến Promise của Javascript để đặt một lệnh `run` query và đợi kết quả trả về. Hàm được viết thêm vào file AppDAO như sau:

```
// dao.js

const sqlite3 = require('sqlite3')  
const Promise = require('bluebird')

class AppDAO {  
  // Đoạn code constructor trước đó

  runquery(sql, params = []) {  //Hàm do ta tự đặt tên gồm 2 tham số truyền vào.
    return new Promise((resolve, reject) => {   //Tạo mới một Promise thực thi câu lệnh sql
      this.db.run(sql, params, function (err) {   //this.db sẽ là biến đã kết nối csdl, ta gọi hàm run của this.db chính là gọi hàm run của sqlite3 trong NodeJS hỗ trợ (1 trong 3 hàm như đã nói ở trên)
        if (err) {   //Trường hợp lỗi
          console.log('Error running sql ' + sql)
          console.log(err)
          reject(err)
        } else {   //Trường hợp chạy query thành công
          resolve({ id: this.lastID })   //Trả về kết quả là một object có id lấy từ DB.
        }
      })
    })
  }
}
```

Như vậy là từ bây giờ chúng ta có thể gọi hàm AppDAO.runquery(...) và truyền vào 2 tham số cho nó để nó chạy kết nối đến db và lấy ra dữ liệu cần thiết cho mình, tùy thuộc vào câu sql truyền vào.

Chúng ta có 2 bảng là `projects` và `tasks`. Để làm tinh gọn code và phân tách rõ ràng, mình sẽ viết riêng ra 2 class để thao tác dữ liệu với 2 bảng độc lập.

Giờ, mình thêm hai file nữa vào dự án của mình là `project_repository.js` và `task_repository.js`. Bên trong `project_repository.js` mình định nghĩa một class được gọi là `ProjectRepository`. Nó có một hàm khởi tạo đầu vào là một đối tượng `AppDAO` và một hàm `createTable` thực thi một query SQL. Chúng ta hãy xem qua code như sau
```
// project_repository.js

class ProjectRepository { 
  constructor(dao) {      //Đểkhởi tạo một đối tượng từ class ProjectRepository chúng ta cần truyền một đối tượng AppDAO cho nó
    this.dao = dao
  }

  createTable() {   //Hàm tạo bảng này sẽ dùng để tạo ra cấu trúc bảng projects nếu trong file csdl sqlite3 chưa có bảng này.
    const sql = `
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT)`
    return this.dao.runquery(sql)
  }
}
```
Tương tự như vậy chúng ta tạo file `task_repository.js` với cấu trúc như bên dưới. Trong hàm `createTable` sẽ chứa câu lệnh tạo bảng `tasks`
```
// task_repository.js

class TaskRepository {  
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        isComplete INTEGER DEFAULT 0,
        projectId INTEGER,
        CONSTRAINT tasks_fk_projectId FOREIGN KEY (projectId)
          REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE)`
    return this.dao.runquery(sql)
  }
}
```
Như vậy là query SQL để tạo bảng đã hoàn tất, tiếp đến mình sẽ chuyển sang các hàm chèn dữ liệu vào các bảng.

## Chèn dữ liệu
Trong class `ProjectRepository`, mình cần thêm một hàm create nhận tên của dự án để tạo và thực thi câu lệnh INSERT thích hợp bằng AppDAO.runquery(...). Lưu ý cách mình đã sử dụng '?' để đại diện cho giá trị cho tên của dự án và sau đó đặt tham số name trong tham số mảng params tùy chọn vào hàm runquery(...). Đây là viết theo kiểu câu lệnh truy vấn được tham số hóa, nó sẽ nhận sql đầu vào để giảm thiểu rủi ro bị tấn công bằng SQL injection.
```
// project_repository.js

class ProjectRepository {  
  // các hàm đã viết trước đó

  create(name) {
    return this.dao.runquery(
      'INSERT INTO projects (name) VALUES (?)',
      [name])
  }
}
```
Một hàm khởi tạo tương tự cho class `TaskRepository`.
```
// task_repository.js

class TaskRepository {  
  // các hàm đã viết trước đó

  create(name, description, isComplete, projectId) {
    return this.dao.runquery(
      `INSERT INTO tasks (name, description, isComplete, projectId)
        VALUES (?, ?, ?, ?)`,
      [name, description, isComplete, projectId])
  }
}
```
Bây giờ chúng ta đã có thể INSERT dữ liệu vào cơ sở dữ liệu. Giờ hãy chuyển qua chức năng để cập nhật CSDL.

# Cập nhật dữ liệu
Trong class ProjectRepository, mình sẽ thêm một hàm update tất cả các trường cho bản ghi cơ sở dữ liệu của project. Đầu vào cần phải biết là project nào cần được update. Sử dụng hàm AppDAO.runquery(...), như sau:
```
// project_repository.js

class ProjectRepository {  
  // các hàm đã viết trước đó

  update(project) {
    const { id, name } = project
    return this.dao.runquery(
      `UPDATE projects SET name = ? WHERE id = ?`,
      [name, id]
    )
  }
}
```
Tiếp theo là thêm hàm cập nhật tương ứng vào class TaskRepository.
```
// task_repository.js

class TaskRepository {  
  // các hàm đã viết trước đó

  update(task) {
    const { id, name, description, isComplete, projectId } = task
    return this.dao.runquery(
      `UPDATE tasks
      SET name = ?,
        description = ?,
        isComplete = ?,
        projectId = ?
      WHERE id = ?`,
      [name, description, isComplete, projectId, id]
    )
  }
}
```
## Xóa dữ liệu
Chức năng cuối cùng cần thực hiện là xóa các bản ghi trong cơ sở dữ liệu. Đối với chức năng này mình sẽ một lần nữa sử dụng `AppDAO.runquery(...)` kết hợp với các hàm delete cho cả hai class `ProjectRepository` và `TaskRepository`.

Đối với `ProjectRepository` viết thêm vào như sau:
```
// project_repository.js

class ProjectRepository {  
  // các hàm đã viết trước đó

  delete(id) {
    return this.dao.runquery(
      `DELETE FROM projects WHERE id = ?`,
      [id]
    )
  }
}
```

Và cho `TaskRepository` viết như thế này:
```
// task_repository.js

class TaskRepository {  
  // các hàm đã viết trước đó

  delete(id) {
    return this.dao.runquery(
      `DELETE FROM tasks WHERE id = ?`,
      [id]
    )
  }
}
```
Đã xong, chúng ta đã viết xong toàn bộ các hàm THÊM, SỬA, XÓA cho cở sở dữ liệu của 2 bảng `projects` và `tasks`. Tiếp theo, mình sẽ giới thiệu hai hàm Node.js sqlite3 có liên quan đến get và all.

## Đọc dữ liệu

Để đọc dữ liệu ra từ CSDL sau khi đã được thêm vào, hàm get được sử dụng để truy xuất một dòng dữ liệu, còn hàm all được sử dụng để truy vấn nhiều dòng dữ liệu đồng thời.

Cú pháp để  get như sau:
```
db.get('SELECT ...', [param1, param2], (err, result) => {  
  if (err) {
    console.log(err)
  } else {
    // do something with result
  }
})
```

Ở đây db là một đối tượng kết nối đến file sqlite3. Bạn sẽ thấy rằng cú pháp về cơ bản giống với hàm run, nhưng ở hàm callback sau khi thực thi xong query SELECT sẽ có thêm một tham số result. Tham số này là bắt buộc vì nó sẽ chứa object (dòng dữ liệu trong bảng) đã được lấy ra và vứt vào đây.

Cú pháp của hàm `all` về cơ bản là giống `get` tham số thứ hai cho hàm callback là một mảng các kết quả được truy vấn trả về, như sau:
```
db.all('SELECT ...', [param1, param2], (err, results) => {  
  if (err) {
    console.log(err)
  } else {
    // do something with results
  }
})
```
Cũng giống như mình đã làm với hàm `run` sqlite3 bên trên, mình sẽ thực hiện các hàm `get` và `all` sử dụng `bluebird Promise` trong class `AppDAO` như hình dưới đây:

```
// dao.js

const sqlite3 = require('sqlite3').verbose()  
const Promise = require('bluebird')

class AppDAO {  
  // các hàm đã viết trước đó

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}
```
Bây giờ mình có thể sử dụng các hàm này trong các lớp `ProjectRepository` và `TaskRepository` để lấy dữ liệu từ cơ sở dữ liệu SQLite.

Để bắt đầu, mình sẽ thêm hàm `getById` cho mỗi lớp để chọn bản ghi theo id.

Trong `ProjectRepository` mình viết thêm:
```
// project_repository.js

class ProjectRepository {  
  // các hàm đã viết trước đó

  getById(id) {
    return this.dao.get(
      `SELECT * FROM projects WHERE id = ?`,
      [id])
  }
}
Và TaskRepositorytương tự:

// task_repository.js

class TaskRepository {  
  // omitting other methods

  getById(id) {
    return this.dao.get(
      `SELECT * FROM tasks WHERE id = ?`,
      [id])
  }
}
```
Để chứng minh AppDAO.all(...), mình sẽ thêm khả năng chọn tất cả các dự án cũng như tất cả các nhiệm vụ cho một dự án cụ thể.

Mã để SELECT tất cả các dự án trông như thế này:
```
// project_repository.js

class ProjectRepository {  
  // các hàm đã viết trước đó

  getAll() {
    return this.dao.all(`SELECT * FROM projects`)
  }
}
```
Sau đó, để chọn tất cả các nhiệm vụ cho một dự án, mình sẽ sử dụng một hàm được gọi là getTasks(projectId)dự kiến ​​id của dự án bạn muốn các nhiệm vụ.
```
// project_repository.js
class ProjectRepository {  
  // các hàm đã viết trước đó

  getTasks(projectId) {
    return this.dao.all(
      `SELECT * FROM tasks WHERE projectId = ?`,
      [projectId])
  }
}
```
Đặt Mã truy cập dữ liệu để sử dụng
Cho đến nay mình đã cơ bản tạo ra một thư viện truy cập dữ liệu cho dự án hư cấu này và ứng dụng theo dõi nhiệm vụ. Những gì mình muốn làm bây giờ là sử dụng nó để tải lên dữ liệu thử nghiệm của mình được hiển thị trong các bảng trong phần Thiết kế cơ sở dữ liệu .

Trong tập tin main.js mình sẽ muốn kéo trong AppDAO, `ProjectRepository` và class TaskRepository qua require. Sau đó, mình sẽ sử dụng chúng để tạo ra các bảng, điền chúng với dữ liệu sau đó, lấy dữ liệu từ cơ sở dữ liệu và hiển thị tới bàn điều khiển.
```
// main.js

const Promise = require('bluebird')  
const AppDAO = require('./dao')  
const `ProjectRepository` = require('./project_repository')  
const `TaskRepository` = require('./task_repository')

function main() {  
  const dao = new AppDAO('./database.sqlite3')
  const blogProjectData = { name: 'Write Node.js - SQLite Tutorial' }
  const projectRepo = new `ProjectRepository`(dao)
  const taskRepo = new `TaskRepository`(dao)
  let projectId

  projectRepo.createTable()
    .then(() => taskRepo.createTable())
    .then(() => projectRepo.create(blogProjectData))
    .then((data) => {
      projectId = data.id
      const tasks = [
        {
          name: 'Outline',
          description: 'High level overview of sections',
          isComplete: 1,
          projectId
        },
        {
          name: 'Write',
          description: 'Write article contents and code examples',
          isComplete: 0,
          projectId
        }
      ]
      return Promise.all(tasks.map((task) => {
        const { name, description, isComplete, projectId } = task
        return taskRepo.create(name, description, isComplete, projectId)
      }))
    })
    .then(() => projectRepo.getById(projectId))
    .then((project) => {
      console.log(`\nRetreived project from database`)
      console.log(`project id = ${project.id}`)
      console.log(`project name = ${project.name}`)
      return projectRepo.getTasks(project.id)
    })
    .then((tasks) => {
      console.log('\nRetrieved project tasks from database')
      return new Promise((resolve, reject) => {
        tasks.forEach((task) => {
          console.log(`task id = ${task.id}`)
          console.log(`task name = ${task.name}`)
          console.log(`task description = ${task.description}`)
          console.log(`task isComplete = ${task.isComplete}`)
          console.log(`task projectId = ${task.projectId}`)
        })
      })
      resolve('success')
    })
    .catch((err) => {
      console.log('Error: ')
      console.log(JSON.stringify(err))
    })
}

main()  
```
Biên dịch và chạy hàm main bằng lệnh Node như sau:
```
$ node main.js
```
Và bạn sẽ thấy kết quả như hình dưới đây. Tất cả các hàm đều đã chạy ngon.
```
Connected to database  
Retreived project from database  
project id = 1  
project name = 1  
Retrieved project tasks from database  
task id = 1  
task name = Outline  
task description = High level overview of sections  
task isComplete = 1  
task projectId = 1  
task id = 2  
task name = Write  
task description = Write article contents and code examples  
task isComplete = 0  
task projectId = 1  
```
# Kết luận
Trong hướng dẫn này, mình đã xem lại các khái niệm cơ bản về các hàm `API sqlite3` của `Node.js` và đã trình bày cách bạn có thể dùng nó trong lập trình hướng đối tượng JavaScript . Và viết code theo kiểu không đồng bộ (async) dựa trên Promise để chương trình chạy nhanh hơn gọn hơn.

Như mọi khi, mình cảm ơn bạn đã đọc!


Bài này là một bài dịch, link bài gốc ở đây: http://stackabuse.com/a-sqlite-tutorial-with-node-js/