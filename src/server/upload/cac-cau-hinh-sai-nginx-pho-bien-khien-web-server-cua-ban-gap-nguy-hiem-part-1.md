# Intro
Nginx được sử dụng làm web server, reverse proxy mạnh mẽ, nginx được cài đặt cho khoảng 1/3 số web site trên thế giới này. Trong bài viết này sẽ là một số cấu hình sai Nginx phổ biến mà với các cấu hình như vậy, web server của bạn sẽ dễ dàng bị tấn công
> Bài viết này được tham khảo blog của Detectify Crowdsource tại https://blog.detectify.com/2020/11/10/common-nginx-misconfigurations/


Nginx là một trong những web server được sử dụng phổ biến nhất trên Internet do dễ dàng cài đặt, dung lượng nhẹ, tích hợp nhiều module và sử dụng file cấu hình đơn giản, thân thiện với người dùng.
Detectify đã phân tích giúp chúng ta với gần 50.000 file config Nginx được public trên Github, và chỉ ra được 4 lỗi cơ bản người dùng mắc phải khi cấu hình với Nginx như sau:
- Missing root location
- Unsafe variable use
- Raw backend response reading
- merge_slashes set to off

# Nginx Misconfigure
## Missing root location
```nginx.conf
server {
        root /etc/nginx; #root location

        location /hello.txt {
                try_files $uri $uri/ =404;
                proxy_pass http://127.0.0.1:8080/;
        }
}
```
Root location chỉ định thư mục gốc cho Nginx. Trong ví dụ trên, thư mục gốc `/etc/nginx` có nghĩa là chúng ta có thể truy cập các tệp trong thư mục đó. Cấu hình trên không cấu hình cho root location `/` `location / {...})` mà chỉ có cấu hình cho `/hello.txt`.  Do đó, root directory sẽ được đặt ở toàn cục tại `/etc/nginx`. Vì vậy, các request tới `/` sẽ đưa bạn đến với đường dẫn cục bộ `/etc/nginx`, lúc này chúng ta có thể tải xuống được file `nginx.conf` và tiết lộ nội dung file `nginx.conf`. 

![](https://images.viblo.asia/0dee73fa-609d-42cb-91b8-6b6f738a1238.png)

Như vậy, nếu nắm được cấu trúc thư mục `/etc/nginx` thì ta có thể xem và tiết lộ được toàn bộ các file trong thư mục này. Vậy thì nguy hiểm đến như thế nào nếu root location là
```
root /;
```
Hacker có thể tìm ra được các file quan trọng và tải xuống với mục đích xấu. Ví dụ như các file config khác, file logs, hay chỉ để lấy basic authen =))

Trong số gần 50.000 file Nginx config mà Detectify đã thu thập, các root path phổ biến nhất là:
![](https://images.viblo.asia/65c10e98-ab51-4787-9e29-b29d512bc9b5.png)

## Off-By-Slash
```nginx.conf
server {
        listen 80 default_server;

        server_name _;

        location /static {
                alias /usr/share/nginx/static/;
        }
        
        location /api {
                proxy_pass http://apiserver/v1/;
        }
}
```
Với cấu hình sai **Off-By-Slash**, chúng ta có thể đi qua một bước trên đường dẫn do thiếu dấu gạch chéo. **Orange Tsai** đã làm cho kỹ thuật này trở nên nổi tiếng với bài talk trên Blackhat của anh ấy [Breaking Parser Logic](https://i.blackhat.com/us-18/Wed-August-8/us-18-Orange-Tsai-Breaking-Parser-Logic-Take-Your-Path-Normalization-Off-And-Pop-0days-Out-2.pdf). Anh ấy đã chỉ ra cách đọc được source code trong server web nếu cấu hình Nginx bị thiếu một dấu gạch chéo `/` trong `location` kết hợp với directives `alias`.  Điều này cũng hoạt động với các directives khác như `proxy_pass`. Cùng tìm hiểu những gì dang xảy ra và tại sao nó lại hoạt động được.

```nginx.conf
location /api {
    proxy_pass http://apiserver/v1/;
}
 ```
 Với Nginx server đang chạy với cấu hình trên có thể truy cập được `server`, có thể giả sử rằng chỉ có `http://apiserver/v1/` mới có quyền truy cập.
 ```
 http://server/api/user -> http://apiserver/v1//user
```
Khi `http://server/api/user` được yêu cầu, Nginx sẽ chuẩn hóa URL. Sau đó, nó sẽ xem liệu `/api` có khớp với URL hay không. Tiếp tục, tiền tố sẽ bị xóa khỏi URL để còn lại đường dẫn `/user`. Sau đó, đường dẫn được thêm vào URL `proxy_pass` dẫn đến URL cuối cùng là `http://apiserver/v1//user`.  
Lưu ý rằng có dấu gạch chéo kép bên trong URL vì vị trí directive không kết thúc bằng dấu gạch chéo, và `proxy_pass` URL sẽ được kết thúc bằng một dấu gạch chéo. Hầu hết các web server sẽ chuẩn hóa `http://apiserver/v1//user` thành `http://apiserver/v1/user`, có nghĩa là ngay cả với việc cấu hình sai như thế này, mọi thứ vẫn sẽ hoạt động mượt mà và có thể sẽ không được chú ý tới. 

Tuy nhiên với cấu hình Nginx như trên, attacker có thể khai thác web server bằng cách gửi request `http://server/api../` điều này sẽ dẫn đến việc Nginx sẽ gửi yêu cầu tới URL `http://apiserver/v1/../` và nó sẽ chuyển thành `http://apiserver/`. Cách khai thác này có thể gây ra impact khác nhau, tùy theo mức độ nguy hiểm của nó, ví dụ bạn có thể truy cập vào một file `test.php` được đặt tại `http://apiserver/test.php` mà đáng lẽ ra bạn không thể truy cập đến đó được (nhớ rằng server `http://apiserver/` chỉ được truy cập thông qua `http://server` thông qua `proxy_pass`).

![](https://images.viblo.asia/903e121f-7e56-48e8-829a-41a657820fa9.png)

## Unsafe variable use
Một số frameworks, scripts và cấu hình Nginx không an toàn sử dụng các biến do Nginx lưu trữ. Điều này có thể khai thác dẫn đến XSS, bypass HttpOnly, hay thậm chí cả RCE.

### SCRIPT_NAME
Với cấu hình như sau:
```nginx.conf
location ~ \.php$ {
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_pass 127.0.0.1:9000;
}
```
Vấn đề ở đây là Nginx sẽ gửi bất kỳ URL nào đến PHP interpreter khi kết thúc bằng `.php` ngay cả khi tệp không tồn tại trên ổ cứng. Đây là một lỗi phổ biến trong nhiều file cấu hình Nginx. 

Vậy impact khi cấu hình sai Nginx này như thế nào:
- XSS: XSS sẽ xảy ra nếu đoạn code PHP xác định một base URL dựa trên `SCRIPT_NAME`
    ```php
    <?php

    if(basename($_SERVER['SCRIPT_NAME']) ==
    basename($_SERVER['SCRIPT_FILENAME']))
       echo dirname($_SERVER['SCRIPT_NAME']);

    ?>

    GET /index.php/<script>alert(1)</script>/index.php
    SCRIPT_NAME  =  /index.php/<script>alert(1)</script>/index.php
    ```
### Usage of $uri can lead to CRLF Injection
Một cấu hình sai khác liên quan đến các biến Nginx là sử dụng `$uri` hoặc `$document_uri` thay vì `$request_uri`. `$uri` và `$document_uri` chứa URI chuẩn hóa trong khi quá trình chuẩn hóa trong Nginx bao gồm giải mã URL cho URI. `$uri` thường được sử dụng khi tạo chuyển hướng location trong cấu hình Nginx dẫn đến bị CRLF Injection.

Ví dụ về một trường hợp config Nginx dẫn đến lỗ hổng này:
```nginx.conf
location / {
  return 302 https://example.com$uri;
}
```
Ký tự tạo dòng mới trong HTTP là `\r` (Carriage Return) và `\n` (Line Feed)

![](https://images.viblo.asia/02967175-67f1-4029-9351-bf2ad7893fba.png)

2 ký tự này có thể được URL-encoding thành ký tự `%0d%0a`. Khi những ký tự này được truyền vào một request như `http://localhost/%0d%0aDetectify:%20clrf` và chúng ta kiểm tra response trả về với config Nginx trên như thế nào:

![](https://images.viblo.asia/1b41f886-e308-46ec-b646-434a9a2d5d02.png)

Như hình trên chúng ta có thể thấy được rằng Response trả về có thêm một Header nữa là `Detectify: clrf`, có rất nhiều cách tấn công đối với lỗi CRLF Injection này, do trình duyệt tin tưởng hoàn toàn vào response trả về từ server, bạn đọc có thể đọc thêm tấn công tại https://blog.detectify.com/2019/06/14/http-response-splitting-exploitations-and-mitigations/

# End to part 1
Viết đến đây mà mình hết mất 2 tuần rồi, cứ có thời gian mới vào dịch và tạo poc, hi vọng là mọi người sẽ chờ đến phần 2 khi mình có hứng tiếp nha, cảm ơn tất cả mọi người đã đọc :D