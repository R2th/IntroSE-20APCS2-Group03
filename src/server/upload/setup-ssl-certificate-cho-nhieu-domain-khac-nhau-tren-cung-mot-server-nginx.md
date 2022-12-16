# Mở đầu

Mình thi thoảng vẫn làm những pet project nho nhỏ và đăng lên trên VPS của mình. Và tất nhiên, với mỗi project sẽ là một domain (thường là subdomain) khác nhau và cái nào cũng sẽ cần setup HTTPS. Và đây chính là lúc vấn đề nảy sinh, làm sao để có thể thiết lập được nhiều SSL khác nhau cho cùng một server (vì nhà có mỗi 1 cái VPS dùng để host đủ thứ, chứ lấy đâu ra nhiều :crying_cat_face:). Bài viết này sẽ đi vào chi tiết vấn đề mình đã gặp phải và cách giải quyết của mình, tuy chưa tối ưu lắm nhưng chấp nhận được.

## Câu chuyện wild-card SSL

Bài toán của mình: thiết lập SSL cho hai subdomain: `matrix.heasygame.com` và `blokus.heasygame.com`. Do mình làm  2 project này vào hai khoảng thời gian khác nhau, matrix có trước, rồi đến blokus, nên trước đó, mình đã gen sẵn cert SSL cho domain `matrix.heasygame.com` bằng Let's Encrypt.

Khi xuất hiện thêm một subdomain mới, thì cách giải quyết thích hợp nhất đấy chính là sử dụng wild-card SSL cert. **Wildcard SSL** là một chứng chỉ SSL có thể dùng cho tên miền chính và tất cả các tên miền phụ của website. Loại hình này lý tưởng dành cho các khách hàng sử dụng nhiều tên miền phụ (sub domain) như các gian hàng online, các tên miền phụ cần SSL cho mục đích facebook apps .. v.v. Như vậy, chỉ cần một cert `*.heasygame.com` là có thể dùng cho bao nhiêu subdomain tuỳ thích, quá tuyệt vời phải không.

Và thật may lắm là Let's Encrypt cũng đã hỗ trợ tạo wild-card SSL cert kể từ tháng 3 năm 2018. Cách thức để đăng ký cũng rất đơn giản. Ta chạy lệnh như sau: (ở đây mình coi như là bạn đã biết cách cài đặt SSL của Lets Encrypt bằng certbot với server nginx nhé)

```
deploy@ubuntu-512mb-sgp1-01:~$ sudo certbot certonly --manual  --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory --agree-tos -d *.heasygame.com
[sudo] password for deploy:
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator manual, Installer None
Obtaining a new certificate
Performing the following challenges:
dns-01 challenge for heasygame.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NOTE: The IP of this machine will be publicly logged as having requested this
certificate. If you're running certbot in manual mode on a machine that is not
your server, please ensure you're okay with that.

Are you OK with your IP being logged?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: Y

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name
_acme-challenge.heasygame.com with the following value:

PJUYoIhyD7c9gk0PCD0Bc8BNi0JQdd056uttawm3GaA

Before continuing, verify the record is deployed.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```
Chúng ta sẽ chọn mode `--manual` và xác thực thông qua `dns` và đồng ý `--agree-tos`, khi đó certbot sẽ yêu cầu chúng ta thêm 1 bản ghi `DNS TXT` vào trong domain của chúng ta với giá trị định trước (chú ý là mỗi lần chạy sẽ gen ra một giá trị khác nhau). Việc này cũng không quá khó khăn, thao tác một chút tại màn hình quản lý domain (của mình là NameCheap), xong xuôi chúng ta có thể tiếp tục. VD như sau:

![](https://images.viblo.asia/f1f1d353-7a4e-4897-9836-6414d02ecc24.png)

Đến đây thì bài toán mới lại nảy sinh:

```
    IMPORTANT NOTES:
     - The following errors were reported by the server:

       Domain: *.heasygame.com
       Type:   None
       Detail: CAA record for *.heasygame.com prevents issuance
```

**CAA** là cái quần què gì vậy :joy: ?. Bỏ thêm chút thời gian ra Google. Chúng ta có thêm thông tin sau:
- Gần đây, do nhà nhà người người đều có thể đăng ký SSL cert dễ dàng thông qua Lets Encrypt và các dịch vụ khác nên đã dẫn đến rất nhiều hành vi cố gắng lừa đảo diễn ra, khiến cho việc cấp SSL sai có thể xảy ra . Để phòng chống việc này, CAB Forum cùng với sự hỗ trợ của  IETF đã tìm ra giải pháp: **CAA Record**

> **Certification Authority Authorization (CAA)** là một bản ghi DNS cho phép người chủ của domain có thể chỉ định Certification Authorities (CAs) có thể phát hành chứng chỉ SSL cho domain của mình, do đó sẽ ngăn chặn các CAs không thể cấp chứng chỉ SSL cho domain của họ.

Do đó, kể từ 22/02/2017, trước khi phát hành SSL cert cho một domain, các CAs sẽ phải kiểm tra xem domain đó đang có CAA record nào không, vào nếu CAA đang được setup với một CA khác thì sẽ phải từ chối việc phát hành chứng chỉ cho domain này. Trong trường hợp chưa có CAA nào, CA có thể cấp chứng chỉ. Lý do cho việc này là:

- Chủ domain chỉ muốn giới hạn chứng chỉ cho một số CA mà họ tin tưởng.
- Việc thêm CAA này cũng bắt các domain phải thêm một bước check nữa, tránh việc phát hành sai chứng chỉ không mong muốn.

Và tất nhiên, CAA cũng có nhiều loại CAA khác nhau, còn chúng ta sẽ quan tâm 2 loại chính:

```
example.com. IN CAA 0 issue "comodoca.com"
example.com. IN CAA 0 issuewild "comodoca.com"
```

cái đầu tiên cho phép Comodo CA (giờ là Sectigo CA) phát hành chứng chỉ cho domain `example.com` và cái thứ 2, cái mà chúng ta cần, cho phép phát hành wild-card cert.
Chúng ta có thể kiểm tra thử CAA hiện tại thông qua https://caatest.co.uk/

![](https://images.viblo.asia/a70b1819-640e-44b9-a4cb-de4052f9e01d.png)

Vậy tất cả chúng ta làm là thêm CAA record phát hành wild-card cert cho Lets Encrypt, vậy là xong :D
Tham khảo trên mạng thì cũng thấy khá nhiều hướng dẫn:

- https://www.namecheap.com/support/knowledgebase/article.aspx/9991/38/caa-record-and-why-it-is-needed-ssl-related
- Trang web hỗ trợ để gen CAA với nhiều CAs khác nhau: https://sslmate.com/caa/

Nhưng đời không như là mơ, sau một hồi đánh vật với đủ các thể loại CAA, kết quả vẫn là không, không, và không :cry: 

![](https://images.viblo.asia/3d0f3257-d960-4e7a-9985-0ff0bd32935c.png)

Kiểm tra lại và kết quả vẫn như vậy:

```
deploy@ubuntu-512mb-sgp1-01:~$ dig caa heasygame.com

; <<>> DiG 9.10.3-P4-Ubuntu <<>> caa heasygame.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 53035
;; flags: qr rd ra; QUERY: 1, ANSWER: 4, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;heasygame.com.			IN	CAA

;; ANSWER SECTION:
heasygame.com.		1799	IN	CNAME	bs90.github.io.
bs90.github.io.		3600	IN	CAA	0 issue "letsencrypt.org"
bs90.github.io.		3600	IN	CAA	0 issue "digicert.com"
bs90.github.io.		3600	IN	CAA	0 issuewild "digicert.com"

;; Query time: 41 msec
;; SERVER: 67.207.67.3#53(67.207.67.3)
;; WHEN: Mon May 18 23:16:08 +07 2020
;; MSG SIZE  rcvd: 170
```

##  Cấu hình SSL cert cho một domain

Trước hết chúng ta cùng xem qua cấu hình nginx đi kèm SSL cho một domain

```
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

upstream matrix_app {
  server 0.0.0.0:4001;
}

server {
  if ($request_uri ~ "^[^?]*//") {
    rewrite "(.*)" $scheme://$host$1 permanent;
  }

  location / {
    allow all;

    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Cluster-Client-Ip $remote_addr;

    # WebSockets
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_pass http://matrix_app;
  }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/matrix.heasygame.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/matrix.heasygame.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = matrix.heasygame.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    server_name matrix.heasygame.com;
    listen 80;
    return 404; # managed by Certbot
}
```

Về cơ bản cũng không có gì quá khó hiểu, ta cần chú ý một số điểm sau:
- **ssl_certificate** và **ssl_certificate_key** là đường dẫn đến file chứng chỉ và file private key cho domain của ta
- Server sẽ listen ở port 443 và nếu request đển port 80 thông qua domain sẽ bị redirect về https
- tất cả request sẽ được proxy về server thật ở sau nginx chạy ở port `4001`

Vậy nếu ta thêm 1 block server và upstream tương tự như thế nữa cho `blokus` liệu có được không? Mình cũng có đọc 1 số tuts khác làm như vậy nhưng đều ko work :cry:, không hiểu tại sao, chắc do ăn ở chưa tốt. Anw. đọc ở 1 chỗ khác thì thấy viết là do chung IP nên khi request đến, nên nginx sẽ không biết phải forward về IP nào, và sẽ chọn lấy 1 block server làm mặc định. Dẫn đến là khi truy cập vào `blokus.heasygame.com`, nginx lại đưa ra cert của `matrix.heasygame.com`, gây ra cảnh báo về chứng chỉ ko phù hợp và người dùng không thể truy cập được. 

Vậy bài toán không thể giải quyết ở mức độ của http server vì SSL handshake được thực hiện trước đó rồi, ta cần giải pháp khác.

## Giải pháp ???

Sau khi tham khảo và test thử nhiều cấu hình trên mạng mình đi đến được cấu hình sau:

```nginx.conf
stream {
  map $ssl_server_name $stream_upstream {
    matrix.heasygame.com  matrix_app;
    blokus.heasygame.com  blokus_app;
  }

  map $ssl_server_name $targetCert {
    matrix.heasygame.com /etc/letsencrypt/live/matrix.heasygame.com/fullchain.pem;
    blokus.heasygame.com /etc/letsencrypt/live/blokus.heasygame.com/fullchain.pem;
  }

  map $ssl_server_name $targetCertKey {
    matrix.heasygame.com  /etc/letsencrypt/live/matrix.heasygame.com/privkey.pem;
    blokus.heasygame.com  /etc/letsencrypt/live/blokus.heasygame.com/privkey.pem;
  }

    log_format log_stream '$remote_addr [$time_local] $protocol [$ssl_preread_server_name] [$stream_upstream] '
        '$status $bytes_sent $bytes_received $session_time';

    access_log /var/log/nginx/access.log log_stream;
    error_log  /var/log/nginx/error.log;

  upstream matrix_app {
    server 127.0.0.1:4444;
  }

  upstream blokus_app {
    server 127.0.0.1:4445;
  }


  server {
    listen 443 ssl;
    ssl_certificate     $targetCert;
    ssl_certificate_key $targetCertKey;

    resolver 1.1.1.1;
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    proxy_pass $stream_upstream;
    ssl_preread on;
  }
}
```

Nginx có module **ssl_preread** (http://nginx.org/en/docs/stream/ngx_stream_ssl_preread_module.html). Module này cho phép chúng ta đọc được thông tin từ `ClientHello message` (là một trong các handshake message mà client gửi lên trong quá trình bắt tay SSL, bạn có thể đọc thêm ở http://www.moserware.com/2009/06/first-few-milliseconds-of-https.html để hiểu rõ hơn). Trong message này có một mục là **SNI**:

> **Server Name Indication (SNI)** is an extension to the Transport Layer Security (TLS) computer networking protocol by which a client indicates which hostname it is attempting to connect to at the start of the handshaking process.[1] This allows a server to present multiple certificates on the same IP address and TCP port number and hence allows multiple secure (HTTPS) websites (or any other service over TLS) to be served by the same IP address without requiring all those sites to use the same certificate.  -- Wikipedia

Nghe đúng là cái chúng ta cần đúng không :). Nôm na là client sẽ chỉ định domain mình muốn connect đến ở phần SNI, server có thể đọc thông tin này ra (mà không dẫn đến đứt kết nối SSL/TLS) và đưa ra cert phù hợp. Kiểm tra bản build nginx hiện tại có hỗ trợ SNI như sau:

```
deploy@ubuntu-512mb-sgp1-01:/etc/nginx$ nginx -V
nginx version: nginx/1.17.10
built by gcc 5.4.0 20160609 (Ubuntu 5.4.0-6ubuntu1~16.04.12)
built with OpenSSL 1.0.2g  1 Mar 2016
TLS SNI support enabled
```
có hiện ra **TLS SNI support enabled** là OK!

Quay lại với cấu hình của `nginx.conf` ta thấy có 3 block map khác nhau:
- `map $ssl_server_name $stream_upstream` sẽ lấy ra `$ssl_server_name` (biến được sinh ra từ module `ssl_preread`) map tương ứng server name với `upstream` (matrix_app hay blokus_app).
- Hai block map còn lại tương ứng map name với từng chứng chỉ và private key của mỗi subdomain khác nhau.
Và ta thấy, 2 upstream đang listen ở 2 port khác nhau.

Đến đây hoàn toàn chúng ta có thể đưa thẳng upstream của 2 app vào 2 block này. Tuy nhiên vì 2 game của mình đều sửa dụng websocket, mà những cấu hình http này không thể định nghĩa trong block stream được, nên bắt buộc phải forward sang block http mới.

Cùng check thử cấu hình mới của 2 server này:

```sites-enabled/matrix.conf
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

upstream matrix_app {
  server 0.0.0.0:4001;
}

server {
  if ($request_uri ~ "^[^?]*//") {
    rewrite "(.*)" $scheme://$host$1 permanent;
  }

  location / {
    allow all;

    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Cluster-Client-Ip $remote_addr;

    # WebSockets
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_pass http://matrix_app;
  }

  listen 4444;
}
```
Lúc này, block http mới sẽ lắng nghe ở cổng `4444` thay vì 80 như trước, còn các cấu hình khác cũng hoàn toàn tương tự như cũ. Server `blockus` còn lại cũng hoàn toàn tương tự nhưng lẳng nghe ở cổng `4445`.

![](https://images.viblo.asia/f5eb8086-30ac-41ec-887e-aa0eb0633127.png)
![](https://images.viblo.asia/251cef32-7bac-4166-bc5c-538cef94e4f2.png)

> Chú ý: không chỉ là subdomain mà bạn hoàn toàn có thể thêm map của một domain, ví dụ: `hardgame.com`  khác vẫn ok nha (tất nhiên với điều kiện bạn có chứng chỉ của domain đó :joy:)

## Kết
Nghe setup có vẻ khá loằng ngoằng nhỉ, nhưng anw, It's works :joy: Hi vọng sẽ có cao nhân có cách giải quyết báo đạo hơn. Cách setup thế này cũng có thể hữu dụng trong trường hợp bạn muốn 1 server nginx làm gateway chung cho nhiều dịch vụ khác nhau ở đằng sau.

## Tham khảo
- https://medium.com/@lakin.mohapatra/generate-lets-encrypt-free-wildcard-certificate-on-ubuntu-18-dcf26f458e13
- https://en.wikipedia.org/wiki/Server_Name_Indication
- https://tools.ietf.org/html/rfc6066#section-3
- https://www.scaleway.com/en/docs/how-to-configure-nginx-with-lets-encrypt/
- https://www.digicert.com/kb/ssl-support/apache-multiple-ssl-certificates-using-sni.htm
- https://serverfault.com/questions/766831/nginx-one-ip-and-multiple-ssl-certificates
- https://www.liquidweb.com/kb/how-to-set-up-multiple-ssls-on-one-ip-with-nginx/
- https://www.cnblogs.com/hugetong/p/11727275.html
- https://gist.github.com/kekru/c09dbab5e78bf76402966b13fa72b9d2