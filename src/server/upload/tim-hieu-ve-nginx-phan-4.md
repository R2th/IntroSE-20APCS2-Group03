Như vậy là trong [bài  trước](https://viblo.asia/p/tim-hieu-ve-nginx-phan-3-3P0lPGrGZox#_chi-tiet-ve-nginxconf-0) chúng ta đã biết được cách config cho 1 số context quan trọng như **Events**, **Http**, và **Server**. Ở phần này mình sẽ tiếp tục giới thiệu 1 vài context khác cũng khá thường gặp như **Mail**, **Upstream**, **If**, ... ok cùng tiếp tục nhé

# Mail context
HIện tại thì Nginx đã hoàn toàn có thể được sử dụng như một máy chủ mail proxy. Trước đó thì nó chủ yếu sử dụng như một máy chủ web như đã giới thiệu ở [phần 1](https://viblo.asia/p/tim-hieu-ve-nginx-phan-1-maGK7GJMKj2). NGINX có thể ủy quyền các giao thức IMAP, POP3 và SMTP tới một trong những **reverse mail server** để lưu trữ tài khoản thư và do đó có thể được sử dụng như một endpoint duy nhất cho các ứng dụng email. Điều này có thể mang lại một số lợi ích, chẳng hạn như:  
- dễ dàng mở rộng số lượng máy chủ thư
- chọn máy chủ thư dựa trên các quy tắc khác nhau, ví dụ: chọn máy chủ gần nhất dựa trên địa chỉ IP của khách hàng
- cân bằng tải giữa các máy chủ thư

Mail context được định nghĩa ở trong main context, cùng cấp với các context khác như **Events context**.
```
# main context

events {

    # events context

}

mail {

    # mail context

}
```
Mail context được sinh ra với mục đích cấu hình mail proxy trên máy chủ giúp chuyển hướng các request đến các máy chủ mail khác (reverse mail server), đương nhiên là các giao thức IMAP, POP3 và SMTP cũng sẽ được cấp quyền trên các reverse mail server này.

Dưới đây là ví dụ hoàn chỉnh về cấu hình mail context 

```
worker_processes auto; //nên đặt số lượng quy trình worker tối đa bằng số lượng luồng (nhân) bộ xử lý hỗ trợ

mail {
    server_name mail.example.com;  //tên của reverse mail server mà bạn muốn trỏ tới
    auth_http   localhost:9000/cgi-bin/nginxauth.cgi;  //Chỉ định máy chủ xác thực HTTP với auth_http. Máy chủ xác thực sẽ xác thực máy khách email, chọn reverse mail server để xử lý email và báo cáo lỗi
    
    proxy_pass_error_message on; //chỉ định xem có thông báo cho người dùng về lỗi từ máy chủ xác thực hay không

    //Sử dụng POP3, SMTP,IMAP thông qua SSL hoăc TLS bảo rằng dữ liệu được truyền giữa máy khách và máy chủ thư được bảo mật hơn như dưới đây
    ssl   on;  //bật SSL hoặc TLS cho proxy mail
    
    //chỉ định đường dẫn đến chứng chỉ SSL (phải ở định dạng PEM) với ssl_certificate và chỉ định đường dẫn đến khóa cá nhân với ssl_certificate_key:
    ssl_certificate     /etc/ssl/certs/server.crt; 
    ssl_certificate_key /etc/ssl/certs/server.key;
    
    
    //chỉ có thể sử dụng các phiên bản mạnh và mật mã của SSL / TLS với ssl_protocols và ssl_ciphers hoặc bạn có thể đặt các giao thức và mật mã thích hợp của riêng mình:
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    
    //bật bộ đệm phiên được chia sẻ và tắt bộ đệm phiên tích hợp bằng ssl_session_cache:
    ssl_session_cache   shared:SSL:10m;
    
    //bạn cũng có thể tăng thời lượng phiên là 5 phút theo mặc định với ssl_session_timeout:
    ssl_session_timeout 10m;
    
    // Dưới đây ta sẽ cấu hình từng máy chủ SMTP, IMAP hoặc POP3 trong các server context: 
    server {
        listen     25; //listen port
        protocol   smtp;  //giao thức tương ứng với listen port
        smtp_auth  login plain cram-md5;  //các phương thức xác thực được phép với các lệnh imap_auth, pop3_auth và smtp_auth
    }

    server {
        listen    110;
        protocol  pop3;
        pop3_auth plain apop cram-md5;
    }

     server {
        listen   143;
        protocol imap;
    }
}

```

Các bạn có thể tham khảo chi tiết hơn tại [đây](https://docs.nginx.com/nginx/admin-guide/mail-proxy/mail-proxy/#:~:text=NGINX%20can%20proxy%20IMAP%2C%20POP3,the%20number%20of%20mail%20servers)

# Upstream context
Upstream context được sử dụng để xác định một nhóm máy chủ mà Nginx sau đó có thể yêu cầu proxy tới các máy chủ đó. Upstream context có thể được tham chiếu tên trong các server hoặc location block để chuyển các request của một loại nhất định đến nhóm máy chủ được xác định. Sau đó, upstream sẽ sử dụng một thuật toán để xác định máy chủ cụ thể nào sẽ gửi yêu cầu.
```
# main context

http {

    # http context

    upstream upstream_name {

        # upstream context

        server proxy_server1_address;
        server proxy_server2_address;

        . . .

    }

    server {

        # server context

    }

}
```
Máy chủ có thể nghe trên các cổng khác nhau. Ngoài ra, các máy chủ lắng nghe qua TCP và UNIX socket domain có thể được kết hợp với nhau như ví dụ dưới đây

```
upstream backend {
    server backend1.example.com weight=5;
    server 127.0.0.1:8080       max_fails=3 fail_timeout=30s;
    server unix:/tmp/backend3;

    server backup1.example.com  backup;
}
```

Theo mặc định, các yêu cầu được phân phối giữa các máy chủ bằng phương pháp cân bằng vòng tròn có trọng số. Trong ví dụ trên, mỗi 7 yêu cầu sẽ được phân phối như sau: 5 yêu cầu đến backend1.example.com và một yêu cầu đến mỗi máy chủ thứ hai và thứ ba. Nếu lỗi xảy ra trong quá trình giao tiếp với máy chủ, yêu cầu sẽ được chuyển đến máy chủ tiếp theo và cứ tiếp tục như vậy cho đến khi tất cả các máy chủ đang hoạt động sẽ được thử. Nếu không thể nhận được phản hồi thành công từ bất kỳ máy chủ nào, máy khách sẽ nhận được kết quả của giao tiếp với máy chủ cuối cùng.

```
server proxy_server_address [parameters];
```
Xác định địa chỉ và các thông số khác của máy chủ. Địa chỉ có thể được chỉ định dưới dạng tên miền hoặc địa chỉ IP, với cổng tùy chọn hoặc dưới dạng đường dẫn ổ cắm miền UNIX được chỉ định sau tiền tố "unix:". Nếu một cổng không được chỉ định, thì cổng 80 sẽ được sử dụng. Tên miền phân giải thành một số địa chỉ IP xác định nhiều máy chủ cùng một lúc.

Các tham số sau có thể được xác định: 

- weight = number   //đặt trọng lượng của máy chủ (mặc định = 1)
- max_conns = number  // số lượng kết nối hoạt động đồng thời tối đa tới máy chủ được ủy quyền ( mặc định bằng 0), và không có giới hạn. Nếu nhóm máy chủ không nằm trong bộ nhớ dùng chung, giới hạn hoạt động sẽ bằng worker_processes.
- max_fails=number  //số lần không thành công để giao tiếp với máy chủ sẽ xảy ra trong khoảng thời gian được đặt bởi tham số fail_timeout (mặc định = 1)
- fail_timeout=time //thời gian mà số lần cố gắng giao tiếp không thành công được chỉ định với máy chủ  (mặc định = 10s)
- backup  //đánh dấu máy chủ là máy chủ dự phòng. Nó sẽ được chuyển yêu cầu khi các máy chủ chính không khả dụng.
- down  //đánh dấu máy chủ là vĩnh viễn không khả dụng

Tham khảo thêm các tham số tại [đây](http://nginx.org/en/docs/http/ngx_http_upstream_module.html#upstream)

# If context
Chúng ta hay sử dụng lệnh if để rẽ nhánh với điều kiện xác định trong lúc viết code. Thì ở đây if context cũng có chức năng giống như vậy. Nó có thể được thiết lập xử lý với điều kiện cho trước để thực hiện các directive.
```
location / {
    error_page 418 = @other;
    recursive_error_pages on;

    if ($something) {
        return 418;
    }

    # some configuration
    ...
}

location @other {
    # some other configuration
    ...
}
```

Tuy nhiên **if context** có nhiều vấn đề khi được sử dụng trong **location context**, trong một số trường hợp, nó không thực hiện theo những gì bạn mong đợi mà thay vào đó là một cái gì đó hoàn toàn khác. Nói chung, chúng ta nên tránh nếu có thể.

# Limit_except context

Context này được sử dụng để giới hạn việc sử dụng các phương thức HTTP nhất định trong location context. Lấy ví dụ khi ta muốn chỉ vài client nhất định được truy cập vào nội dung POST. Tuy nhiên vẫn muốn mọi người được phép đọc các nội dung. Khi đó ta có thể sử dụng block limit_except.

Ví dụ 
```
# orther contexts

location /restricted-write {
    limit_except GET HEAD {
        allow 192.168.1.1/24;
        deny all;
    }
}
```
Kết quả của ví dụ này là bất kỳ client nào cũng có thể sử dụng GET, HEAD. Nhưng các phương thức khác chỉ có thể được thực hiện bởi client từ subnet 192.168.1.1/24.
# Các context khác trong NGINX config

Các context trong phần này phụ thuộc vào các module tùy chọn và có thể được sử dụng cho các chức năng ít cần đến. Mình sẽ chỉ nói sơ qua về chức năng:
- split_clients: dùng để phân loại các client mà server nhận bằng cách dán nhãn chúng với các biến (dựa trên %). Context này có thể dùng để thử nghiệm A / B bằng cách cung cấp các content khác nhau cho từng host khác nhau.
- geo:  thường dùng để chỉ định các ánh xạ. Dù vậy, ánh xạ này được sử dụng để phân loại địa chỉ IP client. Geo đặt giá trị của một biến tùy thuộc vào địa chỉ IP đang kết nối.
- types: dùng để ánh xạ các loại MIME đến phần mở rộng của file cần được liên kết. Nó thường được dùng với NGINX thông qua một file bắt nguồn từ file config chính nginx.conf.
- pert / perl_set: cấu hình location mà Perl sẽ xuất hiện. Context này chỉ được sử dụng với Perl.
- map: thường dùng để đặt giá trị của các biến không độc lập. Context này cho một ánh xạ của giá trị một biến, nhằm xác định giá trị của biến thứ hai.
- charset_map: dùng để ánh xạ bảng chuyển đổi từ một tập hợp ký tự thành một tập hợp khác. Trong header của context, cả hai tập hợp đều được liệt kê. Trong body, ánh xạ sẽ được thực hiện.

Mặc dù không được phổ biến như những context ở trên, chúng vẫn rất hữu dụng trong quá trình sử dụng.

# Tạm kết
Đến đây, chắc hẳn bạn đã nắm được nhiều kiến thức cơ bản về NGINX. Hãy thật cần thận trong việc khởi tạo các cấu hình.  Độ bền bỉ và  hiệu suất sẽ được cải thiện tùy thuộc vào mức độ cấu hình của bạn. Chúc các bạn thành công !