Xin chào tất cả mọi người. Ở chuổi series lần này, mình xin giới thiệu với tất cả các bạn cách để tạo ra một ứng dụng  web với  NodeJS kết hợp với AngularJs nhé.
Vì mình đang ở trong giai đoạn tìm hiểu và tiếp cận nên nếu bài viết có gì sai sót mình rất mong nhận được sự thông cảm và góp ý của tất cả mọi người để hoàn thiện hơn cho các bài viết sau nhé.

## 1. Khái niệm
- NodeJS là một nền tảng dựa vào Chrome Javascript runtime để xây dựng các ứng dụng nhanh, có độ lớn. Node.js sử dụng các phần phát sinh các sự kiện (event-driven), mô hình non-blocking I/O để tạo ra các ứng dụng nhẹ và hiệu quả cho các ứng dụng về dữ liệu thời gian thực chạy trên các thiết bị phân tán.

- NodeJs là một mã nguồn mở, đa nền tảng cho phát triển các ứng dụng phía Server và các ứng dụng liên quan đến mạng. Ứng dụng Node.js được viết bằng Javascript và có thể chạy trong môi trường Node.js trên hệ điều hành Window, Linux...

- Node.js cũng cung cấp cho chúng ta các module Javascript đa dạng, có thể đơn giản hóa sự phát triển của các ứng dụng web sử dụng Node.js với các phần mở rộng.

## 2. Đặc điểm
- Không đồng bộ và Phát sinh sự kiện (Event Driven): Tất các các APIs của thư viện Node.js đều không đồng bộ, nghĩa là không blocking (khóa). Nó rất cần thiết vì Node.js không bao giờ đợi một API trả về dự liệu. Server chuyển sang một API sau khi gọi nó và có cơ chế thông báo về Sự kiện của Node.js giúp Server nhận đựa phản hồi từ các API gọi trước đó.

- Chạy rất nhanh: Dựa trên V8 Javascript Engine của Google Chrome, thư viện Node.js rất nhanh trong các quá trình thực hiện code.

- Các tiến trình đơn giản nhưng hiệu năng cao: Node.js sử dụng một mô hình luồng đơn (single thread) với các sự kiện lặp. Các cơ chế sự kiện giúp Server trả lại các phản hồi với một cách không khóa và tạo cho Server hiệu quả cao ngược lại với các cách truyền thống tạo ra một số lượng luồng hữu hạn để quản lý request. Nodejs sử dụng các chương trình đơn luồng và các chương trình này cung cấp các dịch vụ cho số lượng request nhiều hơn so với các Server truyền thống như Apache HTTP Server.

- Không đệm: Ứng dụng Node.js không lưu trữ các dữ liệu buffer.

- Có giấy phép: Node.js được phát hành dựa vào MIT License.

## 3. Cài đặt
Mở terminal và cài đặc theo các bước sau:
1. Cài đặt brew
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
2. Cài đặt Node
Có rất nhiều cách để cài đặt Node lên máy tính cá nhân. Nó tùy thuộc vào OS bạn đang đùng và phương thức cài đặt(theo package hoặc bằng lệnh). Các bạn có thể tham khảo [tại đây.](https://nodejs.org/en/download/package-manager/) Ở bài viết này mình xin hướng dẫn  cách cài bằng command line cho MacOS.
```
brew install node
```
Vậy là xong. Tiếp theo mình xin hướng dẫn tiếp cách để tạo ra một project.

## 4. Tạo project
1. Tạo một folder và cd vào thư mục đó. Ví dụ mình tạo một folder có tên ProjectNodejs
2. Chạy lệnh
```
npm init
```
Bạn sẻ phải nhập một số thông tin cơ bản của dự án như tên, phiên bản... và có thể để default như dưới đây
```
package name: (projectnodejs) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Users/mac/Desktop/ProjectNodejs/package.json:

{
  "name": "projectnodejs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this ok? (yes) 
```
Sau khi init xong chúng ta sẻ thấy trong thư mục trên có một file được tạo ra là package.json, file này chưa các thông tin về dự án và ta đả nhập vào hồi nãy.
Tại đây chúng ta tạo file index.js(đây chính là file main mặc định mà mình khởi tạo khi nãy) và thêm đoạn code sau
```
#index.js
console.log("Hello word!!!");
```
Mở console và cd vào thư mục chứa dự án và gỏ lệnh
```
node index.js

#kết qua trả về trên console
Hello word!!!
```
Như vậy là coi như NodeJs đã được cài đặt thành công.
## 5. Cài đặt Express FrameWork 
- Express là một framework giành cho nodejs. Nó cung cấp cho chúng ta rất nhiều tính năng mạnh mẽ trên nền tảng web cũng như trên các ứng dụng di động. Express hỗ rợ các phương thức HTTP và midleware tạo ra môt API vô cùng mạnh mẽ và dễ sử dụng. Có thể tổng hợp một số chức năng chính của express như sau:

    - Thiết lập các lớp trung gian để trả về các HTTP request
    - Định nghĩa router cho phép sử dụng với các hành động khác nhau dựa trên phương thức HTTP và URL
    - Cho phép trả về các trang HTML dựa vào các tham số.
  
Tại thư mục gốc chứa dự án chúng ta chạy lệnh sau:
 ```
 npm install express
 ```
 Sau khi cài xong chúng ta sẽ thấy trong thư mục chứa project xuất hiện thêm file package-lock.json và folder node_modules với cấu trúc file và thư mục con như sau:
 ```
 .
├── node_modules
│   ├── accepts
│   │   ├── HISTORY.md
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── index.js
│   │   └── package.json
│   ├── array-flatten
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── array-flatten.js
│   │   └── package.json
│   ├── body-parser
│   │   ├── HISTORY.md
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── index.js
│   │   ├── lib
│   │   │   ├── read.js
│   │   │   └── types
│   │   │       ├── json.js
│   │   │       ├── raw.js
│   │   │       ├── text.js
│   │   │       └── urlencoded.js
│   │   └── package.json
│   ├── bytes
│   │   ├── History.md
│   │   ├── LICENSE
│   │   ├── Readme.md
│   │   ├── index.js
│   │   └── package.json
│   ├── content-disposition
│   │   ├── HISTORY.md
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── index.js
│   │   └── package.json
│   ├── content-type
│   │   ├── HISTORY.md
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── index.js
│   │   └── package.json
Còn rất nhiều nữa. Mình chỉ show tượng trưng thôi nhé.
 ```
 
  ## 6. Requre Express FrameWork và tạo Server để lắng nghe.
 Tại file index.js ở bước trên chúng ta require Express FrameWork và tạo một listen lắng nghe trên cổng 3000 bằng dòng code như sau:
 ```
 #index.js
 var express = require("express");
 var app = express;
 
 app.listen(3000);
 ```
 Mở console, cd đến thư mục gốc của dự án và chạy lại lệnh:
 ```
 node index.js
 ```
 Mở browser bất kỳ và gỏ url: localhost:3000. Kết quả trên browser sẽ như hình dưới
 ![](https://images.viblo.asia/c11c1ec7-cb01-4a5e-9fa4-257aa8b5c083.png)
Vậy là mình đã tạo xong các thứ cơ bản nhất để có thể xây dựng ứng dụng.

 Ở bài viết tiếp theo. Mình sẻ hướng đẫn tiếp cách để config routes. Xây dựng client bằng angular để kết nối lên server nodejs. Có bất kỳ góp ý nào vui lòng để lại comment bên dưới. Cảm ơn mọi người đã xem.