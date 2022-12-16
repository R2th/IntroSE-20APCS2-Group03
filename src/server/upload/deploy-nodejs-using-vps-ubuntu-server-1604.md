### Mở đầu

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Node.js là một nền tảng JavaScript để lập trình cho mục đích chung cho phép người dùng xây dựng các ứng dụng một cách nhanh chóng. Bằng cách tận dụng JavaScript trên cả frontend và backend, Node.js làm cho sự phát triển trở nên nhất quán và tích hợp hơn.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Node.js là một môi trường chạy JavaScript nguồn mở giúp bạn có thể dễ dàng xây dựng các ứng dụng server-side và networking. Nền tảng này chạy trên Linux, OS X, FreeBSD và Windows. Các ứng dụng Node.js có thể được chạy ở dòng lệnh, nhưng chúng ta sẽ tập trung vào việc chạy chúng như một dịch vụ, do đó chúng sẽ tự động restart lại khi reboot hoặc khi gặp sự cố, và các ứng dụng này có thể được sử dụng một cách an toàn trong môi trường production.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trong hướng dẫn này, chúng ta sẽ thiết lập môi trường production trên một server Ubuntu 16.04. Server này sẽ chạy ứng dựng Node.js được quản lý bởi PM2, và cung cấp cho người dùng truy cập bảo mật tới ứng dụng thông qua một Nginx reverse proxy.

### Truy cập vào server

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sau khi tạo một VPS mới thường thì server sẽ ở trạng thái sẽ mới toanh (như kiểu chúng ta vừa cài xong ubuntu vậy).  Chúng ta sẽ được cấp 1 ip, user và password để truy cập vào server (đoạn này các bạn tự làm nha vì mỗi một loại nhà cung cấp khác nhau sẽ có cách làm khác nhau). <br>

Đầu tiên ta truy cập vào server qua ssh. <br>

Với linux thì chúng ta sẽ dùng terminal còn với windows chsung ta có thể sử dụng git bash hoặc cmd.
```bash
ssh username@IP
// sau đó nhập password
```
![](https://images.viblo.asia/2c90c82e-85c5-48cb-a6b5-7e8fa23f4871.png)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vậy là chúng ra đã vào truy cập vào server. Chúng ta có thể thấy thông báo những package có thể cập nhật và những cập nhật về bảo mật.
Để server có thể hoạt động ổn định chúng ta cần cật nhật các package của server .

```bash
apt update && apt upgrade -y
```
<br>
Note: Đây là mình đang sử dụng tài khoản root nên ko cần chạy sudo. Nếu đc cấp user khác thì chúng ta cần `sudo` nhé.

### Cài đặt Web server
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ngoài Nginx chúng ta có thể sử dụng Apache để thay thế nhưng hiện nay Nginx đã được sử dụng nhiều hơn vì chúng bảo mật hơn, xử lý được nhiều request hơn, nhanh hơn ...
```bash
apt install -y nginx
```
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nginx sẽ đóng vai trò reversed proxy và static file server để tiếp nhận request thông qua port mặc định 80 (http). Với port 80 thì khá dễ rồi. Đã có config sẵn chỉ cần vào edit. Trong bài này mình sẽ dùng port 8080 để chạy Nodejs nhé.
Sau khi cài xong Nginx chúng ta có thể test bằng cách truy cập vào IP để xem nginx đã được cài thành công chưa. <br>

![](https://images.viblo.asia/40815b62-b2a0-4408-8ccb-9b95275c8d96.png)

### Cài đặt Nodejs
Tất nhiên chúng ta sẽ cần cài Nodejs và npm
``` bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt-get install nodejs
```
Để kiểm tra đã cài đặt được hay chưa ta làm như sau:
```bash
node -v
npm -v
```
![](https://images.viblo.asia/026771b2-9e43-422b-9a86-866ea3ba295e.png)

### Up Code

Sau khi đã cài xong webserver chúng ta sẽ up code của chúng ta lên server. <br>
Bạn có thể up code bằng 1 trong các cách sau:
- Sử dụng git
- upload zip code

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nếu sử dụng git thì các bạn sử dụng git clone về bình thường như  trên local. Nếu cần ssh thì chúng ta cũng generate ssh như trên local bình thường :D. <br>

Còn nếu như muốn upload zip code thì chúng ta sử dụng lệnh sau:
```bash
scp path/to/file username@IP:/path/to/remote
Ex: scp test.txt root@172.105.117.144:/var/www/html
```
Sau đó nhập password của user để hoàn tất việc upload.

![](https://images.viblo.asia/a657f324-c707-4847-8ce4-4844e6f3bcde.png)
Nếu upload file zip lên chúng ta sẽ cần unzip:

```bash
unzip code.zip
// nhớ cài thêm package unzip nhé các bạn
apt-get install unzip
```
Vậy là chúng ta đã có code trên server <br>
Ở máy mình ví dụ file server.js có nội dung như sau:
```js
const http = require('http');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to Node.js!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```
Kiểm tra xem code chạy ngon chưa các bạn có thể test bằng cách sau:
```bash
// vào thư mục chứa code
node server.js
curl http://localhost:3000

//Output
Welcome to Node.js!
```

### Chạy webserver sử dụng PM2

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PM2 là một trình quản lý các process (tiến trình) dành cho các ứng dụng Nodejs. Nó được viết bằng chính Nodejs và Shell. PM2 cũng được tích hợp bộ cân bằng tải (load balancer). <br>
Install PM2:
```bash
npm install pm2@latest -g
```
Di chuyển tới thư mục chứa code của bạn và chạy
```bash
pm2 start server.js
```
Chúng ta sẽ thấy hiển thị như sau: Vậy là server.js của chúng ta đã được chạy
![](https://images.viblo.asia/21425190-4a9c-4aee-94a4-2a3191265f5f.png)

### Cấu hình Nginx
Các cấu hình của Nginx sẽ nằm ở thư mục `/etc/nginx/sites-available/` <br>
Tạo 1 file cấu hình như sau:
```bash
vi /etc/nginx/sites-available/node
```
Mình sẽ chạy Nodejs ở cổng 8080 nhé.
```bash
server {
    listen 8080;
    listen [::]:8080;

    index index.html server.js;

    server_name _;

    location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
}
```
Tiếp theo chúng ta cần link file cấu hình từ thư mục site-available sang thư mục site-enabled

```bash
 ln -s /etc/nginx/sites-available/node /etc/nginx/sites-enabled/
```
<br>

Vậy là xong chúng ta vào trình duyệt test thử nào <br>

![](https://images.viblo.asia/9e5ced5f-7e71-4d3e-bd74-d873f0c963ea.png)

Vậy là xong. Rất dễ phải không :D