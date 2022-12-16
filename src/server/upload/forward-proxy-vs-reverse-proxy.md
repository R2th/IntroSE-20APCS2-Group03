Nếu bạn đã hoặc đang làm công việc backend development chắc hẳn bạn đã từng nghe qua về hai thuật ngữ **Forward Proxy** & **Reverse Proxy** ở đâu đó.

Trong bài viết lần này (nối tiếp bài viết [Tìm hiểu nhanh về nginx - Phần 1](https://viblo.asia/p/tim-hieu-nhanh-ve-nginx-phan-1-oK9VyKPxJQR)) tôi xin được trình bày cụ thể hơn về **Forward Proxy** & **Reverse Proxy** (khái niệm cũng như ứng dụng của chúng).

## Forward Proxy

Forward Proxy hoặc có thể gọi tắt là **Proxy** là một "thực thể trung gian" nằm giữa *client* và *internet*. Bạn có thể tưởng tượng như dưới đây:

![Without Proxy.png](https://images.viblo.asia/b43a331b-1d16-4723-a5b5-43d649825292.png)

Nếu có server:

![With Server & Proxy.png](https://images.viblo.asia/81741766-509d-4502-91de-2e060be6fc8b.png)

Lúc này thay vì **kết nối trực tiếp** tới server thì client sẽ "kết nối" tới server **thông qua proxy** và proxy sẽ "thay mặt" cho client để kết nối tới server.

Và ở chiều ngược lại thì server sẽ chỉ kết nối với proxy chứ **không kết nối với client**.

OK, vậy thì mục đích chính của proxy là gì ??? Nói một cách đơn giản đó là:

1. Hạn chế truy cập đến các trang như facebook.com hoặc các trang có nội dung 18+, ...
2. Chỉ có phép client truy cập đến một phần tài nguyên của site thay vì toàn bộ (restrict resource access)
3. Log lại các hoạt động trên internet (If you know what I mean =)))))
4. ...

Ở đây tôi có tóm tắt lại bằng một sơ đồ đơn giản để các bạn có thể tiện hình dung:

![191923439-49055760-6d9a-444f-8750-0f5666da348e.png](https://images.viblo.asia/36eb85c8-11a8-469f-b5af-373658231846.png)

## Reverse Proxy

Reverse Proxy là một "thực thể trung gian" nằm giữa *internet* và *server*, có thể minh hoạ như sau:

![Reverse Proxy.png](https://images.viblo.asia/433284c6-fa22-4f88-8f8d-46bb7d3b8686.png)

Reverse Proxy sẽ "đại diện" cho server, nhận mọi requests từ phía client, "gửi" chúng tới server và "nhận" response từ server sau đó "trả về" cho client.

![Req.png](https://images.viblo.asia/d3840ae5-fa0b-47fd-aec5-e27c0075ab1b.png)

Vì Reverse Proxy "đại diện" cho server nên **CLIENT SẼ KHÔNG TƯƠNG TÁC TRỰC TIẾP VỚI SERVER** thay vào đó **CLIENT SẼ CHỈ BIẾT RẰNG NÓ ĐANG TƯƠNG TÁC VỚI REVERSE PROXY** mà thôi.

OK, vậy thì mục đích của reverse proxy là gì ??? Ta có thể liệt kê ra như sau:
1. Dùng để **ẨN** server khỏi client khi ta **KHÔNG MUỐN PUBLIC SERVER**
2. Trong trường hợp hệ thống của bạn có nhiều hơn một server thì Reverse Proxy có thể hoặt động như một load balancer với một đích "phân tải" đến các servers trong hệ thống do Reverse Proxy nằm ngay phía trước server.
3. ...

Tôi cũng tiến hành tóm tắt cho "Reverse Proxy" tương tự như với "Forward Proxy" để các bạn tiện hình dung như sau:

![191923447-9f335b89-b3cd-454c-8f7b-25f8463f189b.png](https://images.viblo.asia/8caa30ea-b22a-4d45-b12a-5e57bffcea8f.png)

## Demo

Nói lí thuyết vậy là đủ, giờ ta sẽ đi vào phần demo. Đầu tiên ta sẽ tiến hành một thử nghiệm "nho nhỏ" với **Forward Proxy**. Ở đây tôi tạo một client kết nối tới `http://google.com` thông qua "Forward Proxy" giống như hình minh hoạ sau:

![CLIENT UMM_PROXY wwwwwygoogle.com.png](https://images.viblo.asia/67a81c32-02f0-48e2-b36f-fb53133f4f80.png)

Tôi sẽ sử dụng thư viện `request` của javascript đế gửi request tới địa chỉ `http://google.com` thông qua proxy như sau:

```JS
const request =  require('request');

request({
  url: 'http://www.google.com/',
  method: 'GET',
  proxy: 'http://127.0.0.1:8888',
}, (err, response, body) => {
  if (!err && response.statusCode === 200) {
    console.log(body);
  }
});
```

Tôi sẽ thiết lập cấu hình cho nginx như sau:

```nginx
events {}

http {
  server {
    listen 8888 default_server;

    access_log  log/access.log;
    error_log log/error.log debug; 

    location / {
      resolver 8.8.8.8;
      proxy_pass https://$host$request_uri;
    }
  }
}
```

Nginx sẽ lắng nghe ở cổng **8888** của localhost. Request được gửi tới địa chỉ `http://localhost:8888/`
 sẽ được chuyển tiếp (forward) tới `https://$host$request_uri`, ở đây:
 - `$host` là tên của host nằm trong request header (trong ví dụ lần này `host = google.com`
 - `$request_uri`  là URI nằm sau hostname (VD: với  `google.com/status` thì `$request_uri` sẽ bằng `/status`)

Bây giờ hãy kiểm tra log của nginx:

![68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3133353636392f36336166313931332d333039662d646436652d363738662d6439356430623636353438622e706e67.png](https://images.viblo.asia/0d47c4f7-ce58-46d5-83ca-866ef9500961.png)

Bạn có thể thấy rằng, client thay vì gửi trực tiếp request đến `http://google.com`, nó sẽ gửi request "thông qua" proxy, proxy sẽ "thay mặt" cho client gửi request đến `http://google.com`. Sau đó khi proxy nhận được response từ `http://google.com` nó cũng sẽ trả về cho client như log dưới đây:

![68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3133353636392f32323837663961392d633736302d393238352d373534302d3538363062356465633932302e706e67.png](https://images.viblo.asia/1dbda75c-d721-49c8-8888-15378206f534.png)

OK, vậy là ta xong phần demo cho "Forward Proxy".

Với **Reverse Proxy** tôi sẽ tạo ra 3 servers lần lượt lắng nghe ở các cổng **1111**, **2222**, **3333** bằng **expressJS** như sau:

**Server1** - lắng nghe ở cổng **1111**

```JS
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Server 1\n');
});

app.listen(1111, () => {
  console.log('Listening on port 1111');
});
```

**Server2** - lắng nghe ở cổng **2222**

```JS
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Server 2\n');
});

app.listen(2222, () => {
  console.log('Listening on port 2222');
});
```


**Server3** - lắng nghe ở cổng **3333**

```JS
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Server 3\n');
});

app.listen(3333, () => {
  console.log('Listening on port 3333');
});
```

Và cấu hình cho nginx như sau:

```nginx
events {}

http {
  upstream express_servers {
    server localhost:1111;
    server localhost:2222;
    server localhost:3333;
  }

  server {
    listen 8888;

    location / {
      proxy_pass http://express_servers;
    }
  }
}
```

Giải thích một chút về cấu hình nginx ở trên, nginx sẽ lắng nghe ở cổng **8888** của localhost, mọi request tới `http://localhost:8888/` sẽ được chuyển tiếp (forward) tới **một trong ba servers trong danh sách express_servers (Server1, Server2, Server3)**.

Giải thuật chuyển tiếp sử dụng ở đây là **Roung Robin**.

Nói qua thì đây là một giải thuật dùng để chuyển tiếp quay vòng các requests tới các servers dựa theo trong số tương ứng của từng server. Server với trọng số càng cao thì khả năng nhận được request càng cao và ngược lại. Mặc định thì trọng số của các servers là như nhau.

Để kiểm tra xem "Reverse Proxy" có hoạt động như mong muốn hay không, tôi sử dụng lệnh:

```bash
while sleep1; do curl http://localhost:8888; done
```

Lệnh trên sẽ thực thi **curl http://localhost:8888** từng giây một. Và đây là kết quả thu được:

![68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3133353636392f35336135306530332d306139322d313732362d336138632d6463316432613865356431362e706e67.png](https://images.viblo.asia/8805f1e6-0598-4626-8864-30daab12a589.png)

Các requests được phân bổ đều lên các Server1, Server2 và Server3.

OK, vậy là ta đã xong phần demo cho Reverse Proxy.

Hi vọng những chia sẻ trên đây của tôi sẽ giúp ích cho bạn đọc trong quá trình học hỏi cũng như hành nghề sau này. Hẹn gặp lại các bạn ở các bài viết tiếp theo.