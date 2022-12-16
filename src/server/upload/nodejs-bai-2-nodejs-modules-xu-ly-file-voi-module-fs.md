# Mở đầu
Với bài trước (https://viblo.asia/p/nodejs-bai-1-hello-world-ORNZqn4Ll0n) mình đã giới thiệu qua và cài đặt Node.js trên các OS khác nhau cũng như đã chạy thử một server Node.js. Trong bài này chúng ta cùng đến với một số thành phần, công cụ cơ bản cụ thể là Modules trong Node.js và xử lý File với **fs** module nhé. Chúng ta cùng bắt đầu bài viết.

![](https://images.viblo.asia/f29d9650-f947-418e-bd8b-b25b986c319e.png)

# 1. Node.js modules
### Node.js modules là gì
Module trong Node.js tuơng tự với các thư viện JavaScript. Nó là một hoặc nhiều chứng năng khác nhau được đóng gói và thêm vào ứng dụng chạy Node.js của chúng ta. Việc chia nhỏ module ra như vậy không cần phải nói thêm nhiều nữa, nó giúp chúng ta dễ dàng quản lý, bảo trì và tái sử dụng code hơn. Chúng ta cũng có thể đóng gói và đẩy lên kho thư viện NPM để mọi người có thể sử dụng nó. Ví dụ nếu chúng ta cần kết nốt tới sql hoặc MongoDB chúng ta sẽ cần tạo các module cho nó và sử dụng lại trong ứng dụng của mình.


Để tự tạo một  module. Chúng ta viết chúng như những đoạn mã Javascript thông thường. Và sau đó sử dụng module.exports để khai báo với Node.js rằng chúng ta có thể sử dụng nó. Ví dụ dưới đây chúng ta có thể tạo ra một module để thực hiện việc custom  console.log để dùng chung một pattern trong ứng dụng: 
```log.js
var log = {
            info: function (info) { 
                console.log('Info: ' + info);
            },
            warning:function (warning) { 
                console.log('Warning: ' + warning);
            },
            error:function (error) { 
                console.log('Error: ' + error);
            }
    };

module.exports = log
```

Để sử dụng lại module trên, chúng ta dùng cú pháp ```require``` như bên dưới:
```app.js
const Log = require('./log.js')

Log.info('The first log')
```
### Module http
Như bài trước mọi người cũng có thể thấy mình có sử dụng module ```http``` để tạo một web server. Mục đích của Web server là xử lý các http requests cho ứng dụng web, ví dụ như Apache là web server cho các ứng dụng web PHP hoặc Java. Chúng ta có thể sử dụng Apache để chạy một ứng dụng web Node.js tuy nhiên vẫn nên dùng Node.js web server.

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

```
Module ```http``` là core module của Node.js vì vậy chúng ta không cần cài đặt thêm từ NPM.


# 2. Node.js FIle System

Cũng như các ngôn ngữ khác, việc xử lý file là điều không thể thiếu cho các ứng dụng. Node.js có một module giúp ta thực hiện truy cập  đọc ghi các file trên hệ thống một cách dễ dàng với module ```fs```

### Đọc File 
Để đọc một file có sẵn trên hệ thống chúng ta sử dụng ```fs.readFile``` của module fs.
```test.txt
Viblo
```
```js
const fs = require('fs');

fs.readFile('./test.txt', function (err, data) {
    if (err) throw err;
    console.log(data.toString());
});

console.log(1);
```
Kết quả: 
```bash
1
Viblo
```

Tại sao 1 lại được log ra trước nhỉ =)) Thực ra readFile là để xử lý việc đọc file 1 cách bất đồng bộ (asynchronously) vì vậy nó sẽ được xem như là chạy ngầm tiến trình đọc file này và thực hiện console.log(1) song song.

Vậy nếu chúng ta muốn sau khi đọc xong file mới thực hiện console.log(1) thì chúng ta cần đổi ```readFile``` thành ```readFileSync``` vậy là chúng ta có thể thực hiền một cách đống bộ việc đọc file với các tiến trình khác : 
kết quả: 
```bash
Viblo 
1
```

### Ghi File
Với thao tác ghi vào File chúng ta có thể ghi đè nội dung file bằng ```writeFile``` của ``fs`` module.
```js
const fs = require('fs');

fs.writeFile('./test.txt', 'Viblo top 1',  function (err, data) {
    if (err) throw err;
    console.log('write file successfully');
});
```
Kết quả: 
```test.txt
Viblo top 1
```

Tuơng tự với readFile chúng ta cũng sẽ có ```writeFileSync``` phục vụ mục đích xử lý đồng bộ.

**Lưu ý**: ```writeFile``` sẽ ghi đè nội dung lên file cũ nên mọi người cẩn thận khi dùng nhé.

Nếu chúng ta muốn ghi thêm vào FIle  chúng ta sẽ sử dụng method: appendFile 

```js
const fs = require('fs');

fs.appendFile('./test.txt', 'Viblo top 1',  function (err, data) {
    if (err) throw err;
    console.log('write file successfully');
});
```
Kết quả: 
```test.txt
Viblo top 1
```

**Quan trọng**: Cả 2 phuơng thức trên cũng là phuơng thức để tạo 1 file mới khi trong hệ thống chúng ta chưa có file với tên đó.
### Xóa File:

Để xóa một file với File System modules. Chúng ta sẽ sử dụng ```unlink```
```js
const fs = require('fs');

fs.unlink('./test.txt',  function (err, data) {
    if (err) throw err;
    console.log('Delete file successfully');
});
```
### Mở File và thực hiện tác vụ :

Để mở một file và thực hiện các tác vụ khác như ghi hay đọc file chúng ta sử dụng ```open```

```js
const fs = require('fs');

fs.open('./test.txt', 'r', function (err, data) {
    if (err) throw err;
    console.log('Delete file successfully');
});
```

r ở đây là flag options để quy định việc mở file này có thể thực hiện những việc gì .
| Flag      | Mô tả |
| ----------- | ----------- |
| r      | Mở file chỉ đọc. Nếu file không tồn tại sẽ báo lỗi       |
| r+   | Mở file để đọc và ghi. Tuơng tự nếu file không tồn tại sẽ báo lỗi        |
| rs      | Mở file để đọc file một cách đồng bộ       |
| rs+   | Mở file để đọc và ghi một cách đồng bộ.        |
| w   | Mở file để ghi. File mới sẽ được tạo nếu không có sẵn và bị ghi đè nếu có sẵn        |
| wx     | Tuơng tự như w nhưng sẽ lỗi nếu file không tồn tại       |
| w+  | Mở file để đọc và ghi.    File mới sẽ được tạo nếu không có sẵn và bị ghi đè nếu có sẵn    |
| wx+  | Tuơng tự như w+ nhưng sẽ lỗi nếu file không tồn tại       |
| a | Mở file để chèn thêm dữ liệu. Nếu file không tồn tại sẽ tạo mới file        |
| ax     | Tuơng tự a  nhưng sẽ lỗi nếu file không tồn tại     |
| a+   | Mở file để đọc và chèn thêm dữ liệu. Nếu file không tồn tại sẽ tạo mới file         |
| ax+   | Tuơng tự a+  nhưng sẽ lỗi nếu file không tồn tại       |


### Một số phuơng thức quan trọng xử lý file với fs module:

| Flag      | Mô tả |
| ----------- | ----------- |
| fs.readFile(fileName \[,options\], callback)        | Đọc một file có sẵn.                                                                      |
| fs.writeFile(filename, data\[, options\], callback) | Ghi đè lên file, tạo file mới nếu file không có sẵn   |
| fs.open(path, flags\[, mode\], callback)            |  Mở file để thực hiện đọc hoặc ghi                                                        |
| fs.rename(oldPath, newPath, callback)               | Thay đổi tên file                                                                 |
| fs.chown(path, uid, gid, callback)                  |Thay đổi quyền xử lý tệp , bất đồng bộ.                                                                       |
| fs.stat(path, callback)                             | Trả về đối tượng fs.Stats với những thông tin cơ bản của file                         |
| fs.link(srcpath, dstpath, callback)                 | Tạo một liên kết mới từ đường dẫn hiện tại của file tới đường dẫn mới.                                                                |
| fs.rmdir(path, callback)                            | Đổi tên một thư mục có sẵn                                                        |
| fs.mkdir(path\[, mode\], callback)                  |Tạo mới một thư mục                                                             |
| fs.readdir(path, callback)                          | Đọc nội dung của một thư mục chỉ định                                      |
| fs.utimes(path, atime, mtime, callback)             | Thay đổi timestamps của file                                                        |
| fs.exists(path, callback)                           | Kiểm tra xem file có tồn tại không                              |
| fs.access(path\[, mode\], callback)                 | Kiểm tra quyền  truy cập file .                                       |
| fs.appendFile(file, data\[, options\], callback)    |Thêm nội dung vào file                                               |
| fs.copyFile(src, dest[, mode], callback)    | Copy file tới một đường dẫn cho trước một cách bất đồng bộ                                            |

**Một số phuơng thức khác với  File System mọi người vào đọc thêm ở dưới link này nhé:**
https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

# 3. Kết bài
Với 2 phần cơ bản này chúng ta đang tiến sâu vào kiến thức của Node.js. Mình đã giới thiệu qua về modules trong Node.js, xử lý file với module ```fs``` File System. Hy vọng bài viết đem lại cách dễ dàng để tiếp cận và làm việc với Node.js cho mọi người. Cùng đón đọc những bài viết tiếp theo của mình về Node.js nhé.  Cảm ơn mọi người đã theo dõi bài viết nếu thấy hay thì hãy upvote giúp mình nhé :D 

Tham khảo: 
https://www.tutorialsteacher.com/nodejs/nodejs-file-system

https://nodejs.org/docs/latest-v15.x/api/