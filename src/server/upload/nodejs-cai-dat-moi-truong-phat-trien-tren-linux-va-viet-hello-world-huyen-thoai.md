![](https://images.viblo.asia/e0e4851f-6321-4cda-b32c-e2e59dc01282.jpg)

### Xin chào tất cả các bạn, tiếp tục series lập trình Nodejs, bài hôm nay của chúng ta nhẹ nhàng và đơn giản thôi: Thiết lập môi trường code và viết chương trình hiển thị  ra dòng chữ “Hello world!” huyền thoại.

Những nội dung có trong bài này:

*1. Cài đặt Nodejs.*

*2. Cài đặt Visual Studio Code.*

*3. Viết ứng dụng huyền thoại: Hello World.*

– Bài viết cũng đồng thời được Post trên trang blog cá nhân: [https://trungquandev.com/series-lap-trinh-nodejs/](https://trungquandev.com/series-lap-trinh-nodejs/)

### 1. Cài đặt Nodejs.
Chúng ta sẽ dùng cách đơn giản nhất, mình sử dụng Linux Mint 18.2 tương đương với Ubuntu 16.04, hai hệ điều hành này đều có chứa một phiên bản Nodejs trên kho repo của mình. Phiên bản Nodejs này không phải là bản mới nhất mà là bản ổn định.

* Update apt source: `sudo apt-get update`
* Cài nodejs + npm: `sudo apt install nodejs npm`
* Fix lỗi “node no such file or directory” : `sudo ln -s "$(which nodejs)" /usr/bin/node`

Để **Update Nodejs** lên phiên bản mới nhất, chúng ta sử dụng một package có tên là `n`:

* Xóa cache: `sudo npm cache clean -f`
* Cài package n ở global: `sudo npm install -g n`
* Update phiên bản Nodejs: `sudo n Nodejs_version`

**Nodejs_version** ở đây là phiên bản mà bạn muốn update, vì dụ mình muốn update lên phiên bản **10.1.0** thì câu lệnh sẽ là:

`sudo n 10.1.0`

Ngoài ra chúng ta cũng có thể update lên phiên bản ổn định mà Nodejs đề xuất, bằng lệnh:

`sudo n stable`

Package n này cũng hỗ trợ cho chúng ta chuyển từ phiên bản Nodejs cao về phiên bản Nodejs thấp hơn, ví dụ đang từ **10.1.0** mình muốn chuyển xuống **6.10.0** thì câu lệnh cũng tương tự:

`sudo n 6.10.0`

### 2. Cài đặt Visual Studio Code.
Cài đặt Visual Studio Code còn đơn giản hơn cả cài Nodejs =)), chỉ cần truy cập vào trang chủ của nó, sau đó chọn tải về gói cài đặt tùy với hệ điều hành và cài bình thường. Mình cũng có một bài viết hướng dẫn chi tiết cách cài đặt ở đây, các bạn có thể tham khảo:

[*"Cài đặt Visual Studio Code trên Linux (Ubuntu), một Editor khá tiện dụng cho lập trình viên."*](https://trungquandev.com/cai-dat-visual-studio-code-tren-linux-ubuntu-mot-editor-kha-tien-dung-cho-lap-trinh-vien/)

Dưới đây là tóm tắt:

* Truy cập vào trang web [https://code.visualstudio.com/](https://code.visualstudio.com/) và tải về gói cài đặt **.deb**.

* Mở terminal đến thư mục chứa file cài đặt vừa tải về, chạy lệnh: `sudo dpkg -i tên_file.deb`

* Có thể hệ điều hành sẽ hỏi mật khẩu, nhập mật khẩu của bạn khi đăng nhập máy vào, đợi 1 lát sẽ cài đặt xong.

### 3. Viết ứng dụng huyền thoại: Hello World.
Việc đầu tiên là khởi tạo ứng dụng, mình **tạo 1 thư mục** để lưu trữ code, và 1 file tên là **server.js**, cấu trúc như sau:
![](https://images.viblo.asia/84bf8020-7abe-4429-9bd3-aa8a238283f1.png)

Tiếp theo **mở Terminal** đến thư mục **nodejs-tutorial-01-hello-world** và chạy lệnh khởi tạo nhanh một project node:

`npm init -y`

Sau khi lệnh trên chạy xong, một file tên là **package.json** sẽ tự động được tạo, các bạn cứ hiểu file này là file cấu hình của npm, giúp cho npm hiểu nó cần phải cài đặt cái gì, thông tin về ứng dụng, phiên bản, ...

---

Bây giờ chúng ta sẽ **viết code cho file server.js**, mình sẽ viết ứng dụng này theo 2 cách để các bạn mới tìm hiểu Nodejs dễ phân biệt:

* **Cách thứ nhất** là dùng **module http** của Nodejs, đây là module được tích hợp sẵn khi cài Nodejs, cũng có thể hiểu đơn giản đây là cách viết Nodejs thuần không sử dụng Framework.

```javascript
/**
 * Trung Quân
 * https://cv.trungquandev.com
 * May 23, 2018
 */

const http = require('http');

const hostname = 'localhost';
const port = 8017;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World!</h1><hr>');
});

server.listen(port, hostname, () => console.log(`Hello Trung Quan, I am running at http://${ hostname }:${ port }/`));

/**
 * end
 */
```

Để chạy chương trình trên, các bạn cũng đứng từ Terminal như lúc init project và chạy lệnh `node server.js` hoặc `npm start`, sau đó mở trình duyệt và gõ **localhost:8017/**

**Kết quả:**

![](https://images.viblo.asia/c410eacb-e79f-49dd-bc52-0109e61702d4.png)

* **Cách thứ hai** là sử dụng **Framework Express**, một Framework khá phổ biến để xây dựng ứng dụng Nodejs.

    Cài đặt Express: `npm install express --save`

    **Code:**
```javascript
/**
 * Trung Quân
 * https://cv.trungquandev.com
 * May 23, 2018
 */

const express = require('express');
const app = express();

const hostname = 'localhost';
const port = 8017;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1><hr>');
});

app.listen(port, hostname, () => console.log(`Hello Trung Quan, I am running at http://${ hostname }:${ port }/`));

/**
 * end
 */
```

**Chạy chương trình tương tự như cách thứ nhất** và cho kết quả cũng vậy.

![](https://images.viblo.asia/c410eacb-e79f-49dd-bc52-0109e61702d4.png)

-----
Trên đây là chút kiến thức mình tìm hiểu được, khi xem bài viết thấy có chỗ nào sai sót hy vọng được các bạn comment góp ý. Hẹn gặp lại các bạn ở những bài viết tiếp theo !

Cảm ơn các bạn đã dành chút thời gian xem bài viết của mình!

[Best Regards – Trung Quân – Green Cat](https://trungquandev.com)