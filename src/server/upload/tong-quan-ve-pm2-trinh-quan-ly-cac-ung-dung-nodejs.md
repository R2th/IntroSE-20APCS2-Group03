Xin chào mọi ngườiii!

Hôm trước mình có vọc vạch dockerize ứng dụng NodeJS và thấy thằng PM2 hỗ trợ rất đắc lực cho việc deploy và quản lý các process của ứng dụng NodeJS. Vậy nên ở bài viết này, các bạn hãy cùng mình tìm hiểu về nó nhé. Gét gô :D

# 1. PM2
## 1.1 Định nghĩa
![image.png](https://images.viblo.asia/7553f13f-523f-4dbe-a335-563039e447cd.png)

PM2 là một công cụ quản lý tiến trình (Process Manager) free open source, hiện đại, hiệu quả, cross-platform và quan trọng là nó free cho ứng dụng sử dụng Node.js với tích hợp bộ cân bằng tải (load balencer). PM2 hoàn hảo cho bạn trong hầu hết trường hợp chạy ứng dụng NodeJS trên môi trường production. 

PM2 đã hoạt động ổn định trên Linux, MacOS cũng như Windows. Nó hỗ trợ giám sát ứng dụng, quản lý, tracking hiệu quả các service/process, chạy các ứng dụng ở chế độ cluster (bạn có thể biết được PM2 ngốn hết bao nhiêu RAM, CPU cho mỗi cluster), start/stop ứng dụng Node.js rất dễ dàng, nhanh chóng. Nó giúp cho ứng dụng của bạn luôn ở trạng thái "sống" (**alive forever**). Nếu thứ mà server ứng dụng NodeJS của bạn đang cần là zero downtime thì PM2 chính là sự lựa chọn đúng đắn dành cho bạn vì PM2 có tính năng auto reload/restart với zero downtime.

PM2 được viết bằng NodeJS và Shell. Chúng ta có thể sử dụng PM2 thông qua giao diện command line hoặc cũng có thể sử dụng bằng giao diện web trên [Key Metrics](https://id.keymetrics.io/). Với giao diện trực quan như vậy thì việc quản lý của bạn sẽ trở nên dễ dàng hơn, hay bạn cũng có thể reload/restart mà không cần phải connect SSH tới server rồi dùng command line nữa.

## 1.2 Ví dụ

![image.png](https://images.viblo.asia/1c27e6c9-38ed-4e10-b248-d34294aaefc1.png)

Chúng ta có một micro service trong NodeJS với file app.js chạy port 3000 như sau:

 ``` app.js
 const http = require('http');
 
 const hostname = '127.0.0.1';
 const port = 3000;
 
 const server = http.createServer((req, res) => {
     res.statusCode = 200;
     res.setHeader('Content-Type', 'text/plain');
     res.end('Viblo May Fest');
 });
 
 server.listen(port, hostname, () => {
     console.log(`Server running at http://${hostname}:${port}/`);
 });
 ```
 
Rất đơn giản, để chạy đoạn code trên, ta sử dụng command:

```
$ node app.js
```

Vậy khi mà app bị crash, ta phải làm gì? Chúng ta sẽ phải restart thủ công bằng command line. Lúc này, PM2 sẽ thay bạn làm điều đó, PM2 sẽ tự động restart giúp bạn luôn, tuyệt vời ông mặt giời.

# 2. Các tính năng chính
![image.png](https://images.viblo.asia/36d1f14e-74dd-4eac-8129-50191e501adb.png)

Trên đây là danh sách những tính năng chính mà PM2 đã liệt kê ngay trên trang chủ của họ:
* Giám sát ứng dụng
* Quản lý các process, logs của ứng dụng
* Tự động restart/reload app
* Khai báo cấu hình qua JSON file
* Tích hợp với Docker
* Cluster mode
* Chạy các kịch bản lệnh (Startup Scripts) cho hệ thống
* Cho phép tích hợp các module cho hệ thống
* Theo dõi việc sử dụng tài nguyên của ứng dụng (Keymetric Monitering)
*  Điều khiển, giám sát các tiến trình trong một ứng dụng nodejs trực tiếp bằng code thông qua PM2 API
* ...

# 3. Cài đặt và sử dụng PM2
## 3.1 Cài đặt

PM2 có thể cài đặt bằng NPM hoặc Yarn, nhưng bạn nên nhớ là phải cài đặt NodeJS và NPM trước đã nhé :D:

```
# with NPM
$ npm install pm2@latest -g

# with Yarn
$ yarn global add pm2
```

## 3.2. Khởi động app
Sau khi cài đặt PM2 thành công, thay vì sử dụng `node app.js` để start ứng dụng thì chúng ta có thể sử dụng PM2 với câu lệnh bên dưới:

```
$ pm start app.js
```

Đó là cách đơn giản để chạy ứng dụng  của bạn. Không chỉ dừng lại ở đó, PM2 có thể làm nhiều thứ hơn như:

```
$ pm2 start app.js --watch
```

Câu lệnh ở trên sẽ giúp ứng dụng của bạn tự động reload khi code của bạn có thay đổi.

Ngoài ra còn rất nhiều option khác để bạn dễ dàng tuỳ chỉnh việc quản lý ứng dụng như:
```
# Đặt tên cho ứng dụng
--name <app_name>

# Theo dõi và khởi động lại ứng dụng khi có file thay đổi
--watch

# Đặt ngưỡng bộ nhớ để tải lại ứng dụng
--max-memory-restart <200MB>

# Chỉ định file log cụ thể
--log <log_path>

# Độ trễ giữa các lần tự động khởi động lại
--restart-delay <delay in ms>

# Không tự động khởi động lại ứng dụng
--no-autorestart

# Chỉ định cron để bắt buộc khởi động lại
--cron <cron_pattern>

# Đính kèm vào log của ứng dụng
--no-daemon
```

## 3.3 Quản lý processes
Bạn có thể dùng các command sau đây để quản lý ứng dụng:

```
# Restart ứng dụng
$ pm2 restart app_name

# Reload ứng dụng
$ pm2 reload app_name

# Stop ứng dụng – nhưng vẫn giữ ứng dụng đó ở trong list process
$ pm2 stop app_name

# Stop ứng dụng, đồng thời xoá ứng dụng ra khỏi list process
$ pm2 delete app_name

# Liệt kê trạng thái của tất cả các ứng dụng được quản lý bởi PM2
$ pm2 [list|ls|status]

# Hiện thị log với realtime
$ pm2 logs // Mặc định PM2 sẽ lưu logs tại ./pm2/logs
```

Bạn có thể thay thế `app_name` bằng:
* `all`: thực thi trên tất cả các processes
* `id`: thực thi trên một id process cụ thể

## 3.4 Monitoring
PM2 cung cấp cho chúng ta 2 cách để có thể monitoring:

### Terminal Based Dashboard
Bạn hãy sử dụng command sau trên Terminal:

```
$ pm2 monit
```

![image.png](https://images.viblo.asia/66e0ad70-ff05-45b3-94a4-b8d17f6f323c.png)

Kết quả thu được chính là phần monitoring project của bạn được hiển thị realtime. Tại phần `Custom Metrics`, bạn có thể thấy rõ các thông tin mà các process đang sử dụng, cùng với đó là thông tin của ứng dụng tại phần `Metadata`.

### Web based dashboard
Bằng cách truy cập vào https://app.pm2.io/ và setup theo hướng dẫn hoặc chạy lệnh sau từ ứng dụng của bạn:

```
$ pm2 plus
```

![image.png](https://images.viblo.asia/a0c99367-c307-4b89-abab-f3384089dd1d.png)

Chúng ta sẽ có một giao diện Monitering trực quan như trên. Với giao diện web, gói miễn phí mặc định cho ta biết đầy đủ các thông tin monitoring cơ bản, còn rất nhiều thông tin chi tiết và phong phú hơn với gói **PM2 Plus** và **PM2 Enterprise** nếu có điều kiện thì bạn có thể trải nghiệm =)) 
## 3.5 Deployment
PM2 hỗ trợ chúng ta một file ecosystem.config.js để quan lý nhiều ứng dụng. file này chứa các thông tin như name, environments, scripts file, logs, node instances,... Để tạo file, dùng lệnh sau:

```
$ pm2 ecosystem
```

Sau khi chạy lệnh, PM2 sẽ tạo cho chúng ta file `ecosystem.config.js`:

``` ecosystem.config.js
module.exports = {
apps : [{
    name: 'app', // application name 
    script: 'app.js', // script path to pm2 start

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two', // string containing all arguments passed via CLI to script
    instances: 1, // number process of application
    autorestart: true, //auto restart if app crashes
    watch: false,
    max_memory_restart: '1G', // restart if it exceeds the amount of memory specified
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }, {
     name: 'worker',
     script: 'worker.js'
  }],
   
  // Deployment Configuration
  deploy : {
    production : {
       "user" : "ubuntu",
       "host" : ["192.168.0.13", "192.168.0.14", "192.168.0.15"],
       "ref"  : "origin/master",
       "repo" : "git@github.com:Username/repository.git",
       "path" : "/var/www/my-repository",
      "post-deploy" : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
```

Ở file trên, các bạn có thể thấy là chúng ta sẽ config deploy cho môi trường production, tương tự bạn cũng có thể config thêm môi trường staging hoặc khác. Mình có thêm một số attributes như  `args`, `instances`, `autorestart`, `watch`, `max_memory_restart`,... Các bạn có thể tham khảo thêm các attributes khác tại [đây](https://pm2.keymetrics.io/docs/usage/application-declaration/#attributes-available). 

Thay vì chạy `pm2 start app.js` như trước, giờ bạn sẽ chạy ứng dụng bằng command sau: 

```
$ pm2 start ecosystem.config.js
```

Để deploy application thì tiên bạn cần chạy command:

```
$ pm2 deploy production setup // run remote setup commands
// or staging
$ pm2 deploy staging setup
```

Ở lần đầu thì nó sẽ pull source code của bạn về và setup. Ở các lần deploy tiếp theo, bạn chỉ cần chạy command:

```
$ pm2 deploy production update // update deploy to the latest release
// or
$ pm2 deploy staging update
```

Tham khảo thêm về PM2 Deployment tại [đây](https://pm2.keymetrics.io/docs/usage/deployment/).

## 3.6 Cluster Mode
Đối với các ứng dụng Node.js, PM2 bao gồm một bộ cân bằng tải tự động (automatic load balancer) sẽ chia sẻ tất cả các kết nối HTTP[s]/Websocket/TCP/UDP  giữa mỗi processes được tạo ra. Cluster mode cho phép Node.js application sử dụng tất cả các CPUs của server. Điều này làm tăng đáng kể hiệu năng và độ tin cậy của các ứng dụng, tùy thuộc vào số lượng CPU có sẵn của server.

Để khởi động ứng dụng Cluster Mode thì bạn chỉ cần thêm options `-i` như sau:

```
pm2 start index.js -i max
```

Trong đó `max` có nghĩa là PM2 sẽ tự động phát hiện số lượng CPU có sẵn và chạy càng nhiều process càng tốt.

# 4. Lời kết
Trên đây là những gì cơ bản mà mình tìm hiểu được về PM2, nắm bắt được những điều cơ bản này thì bạn đã có thể sử dụng PM2 với ứng dụng NodeJS của bạn được rồi đó :D

Ở bài viết tới, có thể mình sẽ setup một ứng dụng NodeJS và dùng PM2 để demo trực quan hơn, hãy theo dõi nhé :D


## Tham khảo
Github: https://github.com/Unitech/pm2

Trang chủ: https://pm2.keymetrics.io/

Documentation: https://pm2.keymetrics.io/docs/usage/quick-start/

Moniter PM2: https://id.keymetrics.io/

*Cảm ơn các bạn đã dành thời gian theo dõi bài viết của mình! 😉*