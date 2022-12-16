# Lời nói đầu!
Gần đây dự án mình cần deploy lên heroku để test cũng như sử dụng nhiều tiện lợi của heroku. Thực sự thì đây là một thử thách khá lớn với mình vì trước đây mình chỉ sự dụng heroku cho các project nho nhỏ và đơn giản thì giờ đây việc deploy 1 dự án chạy với nhiều service đặc trưng của laravel như : Queue , Laravel Echo, Schedule ....v...v.... Và ngày hôm nay mình xin phép nói về kinh nghiệm của chính bản thân mình.

<hr>

# Nội Dung
Ok, trước khi bắt đầu nội dung bài này nếu các bạn chưa đọc bài viết trước của mình thì vui lòng vào   [đây](https://viblo.asia/p/deploy-laravel-laravel-echo-queue-on-heroku-yMnKMdYg57P)  để đọc nhé. Còn nếu các bạn đã đọc rồi thì chúng ta cùng tiếp tục giải quyết bài toán nhé .
<hr>

## Bài toán :
Các bài toán đã giải quyết trong bài viết trước : 

**1. Setup server web thông thường để chạy web (Sử dụng nginx)**

**2. Setup để chạy queue (Cho gửi mail, run notification)**

**3. Setup schedule để chạy các job hàng ngày**

Các bài toán đã giải quyết trong bài viết này : 

**4. Setup server laravel echo để chạy socket (Cho realtime notification  ...v...v...v....)**

**5. Setup custom domain cho site**

**6. Setup https cho site**

**7. Extend limit upload file**

Ok, nào chũng ta hãy cùng tiếp tục từng phần của bài toán nhé !

<hr>

## Giải quyết  :

**4. Setup server laravel echo để chạy socket (Cho realtime notification  ...v...v...v....)**

Giống như các môi trường khác , user cần connect với `socket` thông qua 1 đường dẫn . Và việc của chúng ta là dùng đường dẫn đó để liên kết với server `laravel-echo`.  Ở đây chúng ta sẽ sử dụng `nginx` để proxy từ url sang sang `laravel-echo`.Ta cần vào file `nginx_app.conf` và sửa file đó thành như sau :

```
location / {
    # try to serve file directly, fallback to rewrite
    try_files $uri @rewriteapp;
}

location /socket.io/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_redirect off;

    proxy_buffers 8 32k;
    proxy_buffer_size 64k;

    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
}

location @rewriteapp {
    # rewrite all to index.php
    rewrite ^(.*)$ /index.php/$1 last;
}

location ~ ^/(app|app_dev|config)\.php(/|$) {
    try_files @heroku-fcgi @heroku-fcgi;
    internal;
}
```

Với cách setup như trên thì url `domain.com/socket.io/` sẽ được proxy vào cổng 3000 của server. Việc tiếp theo là cần run server `echo` qua cổng 3000. Việc start server thì cũng đơn giản thôi , chắc các bạn cũng ko lạ gì với việc run server `echo` bằng cách tạo 1 file `laravel-echo-server.json` rồi chạy nó bằng lệnh :

```
laravel-echo start 
```

***Note: Bạn nhớ setup port 3000 để chạy nhé . vì bên trên mình đã config nginx là cổng 3000 rồi***


Dùng file `laravel-echo-server.json`  như vậy rất ok tuy nhiên với các server như `heroku` lại khá bất tiện. Vì sao, vì mỗi khi server deploy thì heroku sẽ deploy sang 1 node hoàn toàn mới và không còn liên quan gì đến code cũ cả và nếu như vậy bạn cần sửa tay file `laravel-echo-server.json` hoặc push sẵn code vào file đó rồi chỉ deploy lên và chạy. Với cách 1 , bạn sẽ cực kì mệt mỏi mỏi mỗi lân deploy và cách 2 thì sẽ dẫn đến vấn đề về bảo mật server laravel-echo cần các thông tin mẫn cảm như `redis`. 

Với mình thì mình suggest bạn làm như sau. Tạo 1 file `echo-server.js`. Với nội dung như sau :
```
require("dotenv").config();
var Echo = require("laravel-echo-server");

/**
 * The Laravel Echo Server options.
 */

var options = {
    "appKey": process.env.ECHO_KEY,
    "authHost": process.env.ECHO_AUTH_HOST,
    "authEndpoint": process.env.ECHO_AUTH_ENDPOINT,
    "database": process.env.ECHO_DATABASE,
    "databaseConfig": {
        "redis": process.env.REDIS_URL,
    },
    "devMode": process.env.ECHO_DEV_MODE,
    "host": process.env.ECHO_HOST,
    "protocol": process.env.ECHO_PROTOCOL,
    "port": process.env.ECHO_PORT,
    "referrers": [],
    "socketio": {},
    "sslCertPath": process.env.ECHO_SSL_CERT_PATH,
    "sslKeyPath": process.env.ECHO_SSL_KEY_PATH,
    "verifyAuthPath": true,
    "verifyAuthServer": true
};

/**
 * Run the Laravel Echo Server.
 */
Echo.run(options);
```

Với cách trên, tất cả các thông tin của bạn sẽ được file trên đọc trong file `.env` . Bạn chỉ cần setup sẵn trên `env` và mỗi khi deploy chạy lện :
```
node echo-server.js
```

 Server đã sẵn sàng làm việc. Công việc deploy cũng trở nên dễ dàng hơn nhiều .  :D :D :D 

Việc tiếp theo sau đây là việc đã khiến bản thân mình cực kì tốn thời gian suy nghĩ. Đó là mình không thể làm cách nào để laravel và laravel -echo connect đến nhau. Ngay từ đầu với việc chạy socket (`laravel-echo`) server mình có thể sử dụng `supervisor` để chạy server tuy nhiên, `supervisor` và `nginx` lại nằm trên 2 dynos khác nhau. Và mình gần như đã tìm mọi cách đề giải quyết việc kết nối này và kết quả là mình đã không tìm ra mà tìm 1 cách khác.

Mình chọn cách chạy  `laravel-echo` và `nginx` trên cùng 1 dynos. Nginx sẽ chạy public và `laravel-echo` sẽ chạy ngầm . Để làm được điều này, ta cần vào file `Procfile` và sửa lại như sau :

```
web: vendor/bin/heroku-php-nginx -C nginx_app.conf public/ & (cd /app/ && node echo-server.js) & wait -n
worker: supervisord -c /app/supervisor.conf -n
```
 
Ok, xong . Mission complete.

**5. Setup custom domain cho site**

Thực ra với việc setup custom domain này có lẽ mình không cần nói gì dài dòng . Bạn có thể làm theo các bươc sau :
 - Bạn có thể mua và quản domain qua add-on `point-DNS` của heroku
 -  Dùng add-on đó để tạo ra các subdomain thích hợp với site của bạn
 -  Bạn cần vào app setting của bạn.
 -  Điền các thông tin về subdomain trong phần `Domains`
 -  Và cũng đừng quên răng nhớ setup route cho subdomain ở máy của bạn.

1 điểm đáng chú ý trong việc sử dụng subdomain từ 1 trang này bạn call api của 1 trang khác. Điều này sẽ dẫn đến lỗi `cors`. Đây là 1 cơ chế mà các webrowser cần làm theo để tránh các thông tin bị rò rỉ. Bạn cần fix nó = nginx hoặc chình project của nhà mình.

Với mình thì mình chọn cách sử dụng lirary `barryvdh/laravel-cors` qua composer . Để config hoặc hiểu hơn về thư viện. Bạn có thể vào [đây](https://github.com/asm89/stack-cors) để xem nhé.

Chúc may mắn !


**6. Setup https cho site**

HTTPS đương nhiên rồi.  Về cơ bản thì `heroku` có support việc cung cấp các SSL certificates cho custom domain của bạn (Support với các app trả phí .) Hoặc tự add SSL certificates của bạn khi bạn ko muốn dùng SSL certificates của heroku. 

Trong bài viết này mình sẽ hướng dẫn bạn cách dùng SSL certificates của heroku nhé. Bạn cần làm theo các bước như sau :

- Vào setting app vào scroll chuột đến `SSL certificates`  
- Click button `Configure SSL` 
- Khi đó 1 hộp thoại mở ra và bạn chọn `Automatically .... `  và ấn `Continue`
- Lúc này thì `heroku` auto generate SSL certificates cho từng domain mà bạn sử dụng. Có thể mất vài phút đề update.Nên bạn chờ chút nhé 
-  Sau 1 vài phút hoặc ngắn hơn bạn vào xem lại phần setting app và kéo xuống tab `Domains`. Lúc này đã sinh ra các DNS tương ứng cho từng custom domain.
-  Bạn vào lại add-on `point-DNS` vào từng custom domail của bạn và fill cái `DNS` bên setting app vào trường `Hostname` vậy là ok nhé 
- Đến lúc này thì bạn đã có thể dùng `https` cho server của bạn (nhớ setup https trong laravel nhé)
- Tuy nhiên vẫn còn 1 vấn đề đó là bạn vẫn có thể access trang thông qua `http` được. Để fix được cái này mình lại quay lại sử dụng nginx tự động chuyển qua https khi request là `http`. Bạn chỉ cần add thêm đoạn code này vào đầu file `nginx_app.conf` là ok .

```
if ($http_x_forwarded_proto != "https") {
    return 301 https://$host$request_uri;
}

```

**7. Extend limit upload file**

Đây là 1 yêu cầu khá phổ biến của các khách hàng. (Mặc định thì php và nginx chỉ cho phép max upload là 5MB lên server , mình sẽ fix để upload đk file 25MB nhé ). Để fix được vấn đề này. Bạn cần làm như sau :

- Gia tăng limit của nginx bạn cần add thêm đoạn code này vào đầu file `nginx_app.conf` là ok .

```
client_max_body_size 30M;
```

- Gia tăng giới hạn xử lý file cho php thì bạn cần tạo file `.user.ini` trong thư mục `public` của laravel nhé . Nội dung file cụ thể là :

```
post_max_size = 30M
upload_max_filesize = 25M
memory_limit = 100M
```



Ok, Mình xin kết thúc bài viết ngày hôm nay tại đây ! Đây cũng sẽ là bài viết cuối cùng của mình về `heroku` rồi ! Thank you for reading !

<hr>

# Tài liệu tham khảo

[https://devcenter.heroku.com/articles/custom-php-settings#default-behavior](https://devcenter.heroku.com/articles/custom-php-settings#default-behavior)

[https://devcenter.heroku.com/articles/custom-php-settings](https://devcenter.heroku.com/articles/custom-php-settings)

https://dannyism.com/running-supervisor-with-laravel-workers-on-heroku/

https://devcenter.heroku.com/articles/custom-domains

https://elements.heroku.com/buttons/gregburek/heroku-tls-auth-nginx-sample