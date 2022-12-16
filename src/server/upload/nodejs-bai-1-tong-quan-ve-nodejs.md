> [Series NodeJS căn bản cho người mới bắt đầu](https://viblo.asia/s/nodejs-can-ban-cho-nguoi-moi-bat-dau-7LKXNqXrlV4) 
## 1. NodeJS và Express là gì?
Khi nhắc đến JavaScript - NodeJS - Express thì ta sẽ nhắc đến Ngôn ngữ - Nền tảng - Framework, tức là: Express một framework để xây dựng web server sử dụng ngôn ngữ là JavaScript, được chạy trên nền tảng NodeJS

Express thực ra là một Dynamic Web Server (web động)

Bạn có thể tìm hiểu thêm về NodeJS và Express ở đây: [NodeJS](https://nodejs.org/en/), [Express](https://expressjs.com/)

## 2. Trước khi học NodeJS, cần có những kiến thức gì?

Như đã nói, NodeJS hỗ trợ chúng ta xây dựng web server, do đó, những kiến thức về web là không thể thiếu. Trước khi học NodeJS, mình khuyến khích các bạn học những kiến thức sau:
	
| Ngôn ngữ | Bắt buộc? |
| - | - |
| HTML | Có |
| CSS | Khuyến khích học |
| JavaScript | Có |

## 3. Cài đặt NodeJS và Express trên Window
### 3.1. Cài đặt NodeJS
Việc cài đặt NodeJS cực kỳ đơn giản, bạn chỉ cần vào trang chủ của [NodeJS](https://nodejs.org/en/) là có thể tải về và cài đặt

NodeJS muốn chạy được sẽ cần một công cụ quản lý thư viện lập trình cho nó, gọi là NPM (Node Package Manager). Khi cài đặt NodeJS, NPM cũng sẽ được cài đặt theo

Để kiểm tra xem việc cài đặt đã thành công hay chưa, bạn mở Command Prompt (cmd) và gõ các lệnh sau

>  Lệnh ***node -v*** để kiếm tra phiên bản của NodeJS
```
C:\User\DucPhuc> node -v
v10.15.3
```

> Lệnh ***npm -v*** để kiểm tra phiên bản của npm

```
C:\User\DucPhuc> npm -v
6.4.1
```

Nếu kết quả hiển thị phiên bản của NodeJS và npm thì bạn đã cài đặt thành công

### 3.2 Cài đặt Express

Trong npm, thì Express là một module, do đó ta sẽ tiền hành cài module này

> Tạo một thư mục mới lưu project của bạn

```
C:\User\DucPhuc> mkdir nodeapp
C:\User\DucPhuc> cd nodeapp
```

> Trong Command Prompt, các bạn gõ lệnh ***npm init*** để tạo ra file *package.json*, file này sẽ là file lưu các thông tin về project của bạn

```
C:\User\DucPhuc> npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
```

> Lúc này, bạn sẽ nhập các thông tin liên quan đến project của bạn, hoặc bạn có thể nhấn "enter" liên tục để tự động lấy các giá trị mặc định. Cuối cùng nhấn "enter" để lưu

> Lưu ý: đối với mục ***entry point***, sẽ quy định file root của Node, file này sẽ tạo các lệnh về server, giá trị mặc định là *index.js* . Tức là khi bạn chạy server, Node sẽ đọc file này để khởi tạo. Bạn có thể đặt các tên khác tùy thích, nhưng dù là tên gì thì bạn cũng phải có file tương ứng với tên đó ở root của project. Ở đây mình đặt tên là *app.js*
```
package name: (nodeapp)
version: (1.0.0)
description: NodeJS first app
entry point: (index.js) app.js
test command:
git repository:
keywords:
author: Duc Phuc
license: (ISC)
About to write to C:\Users\Server\nodeapp\package.json:

{
  "name": "nodeapp",
  "version": "1.0.0",
  "description": "NodeJS first app",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Duc Phuc",
  "license": "ISC"
}


Is this OK? (yes)
```

Sau khi lưu, bạn sẽ có file *package.json* như sau
```json:nodeapp/package.json
{
  "name": "nodeapp",
  "version": "1.0.0",
  "description": "NodeJS first app",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Duc Phuc",
  "license": "ISC",
}
```




> Tiếp theo, ta sẽ cài module express bằng cách chạy dòng lệnh ***npm install express --save***
```
C:\User\DucPhuc> npm install express --save
npm notice created a lockfile as package-lock.json. You should commit this file.

npm WARN nodeapp@1.0.0 No repository field.

+ express@4.17.1
added 50 packages from 37 contributors and audited 126 packages in 12.191s
found 0 vulnerabilities
```

Lệnh trên sẽ ngoài cài đặt module express, nó sẽ lưu thông tin của module này vào file *package.json* (--save) trong key: ***dependencies***

```json:nodeapp/package.json
{
  "name": "nodeapp",
  "version": "1.0.0",
  "description": "NodeJS first app",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Duc Phuc",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

Như vậy, bạn đã cài đặt NodeJS và Express thành công. Ở bài tiếp theo, ta sẽ tạo một server và có ứng dụng đầu tiên. Hẹn gặp lại các bạn