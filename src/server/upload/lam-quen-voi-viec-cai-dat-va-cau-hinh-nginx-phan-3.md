Tiếp nối [phần trước ](https://viblo.asia/p/E375z2E65GW), chúng ta đã điểm qua một số context trong cấu hình Nginx như là `main`, `events`, `http`, `server`, `location`. Và để tiếp nối ti tỉ thứ cần biết về Nginx thì ở bài viết này, mình sẽ tiếp tục đề cập đến một số context khác của Nginx :cry: . Chúng ta bắt đầu tiếp nhé.

# Upstream context
Upstream context được sử dụng để định nghĩa và cấu hình upstream server. Context này xác định một nhóm các máy chủ được đặt tên mà Nginx sau đó có thể yêu cầu proxy. Context này có thể được dùng khi bạn định lại cấu hình các loại proxy.

Upstream context có thể được tham chiếu tên trong các server hoặc location block để chuyển các yêu cầu của một loại nhất định đến nhóm máy chủ được xác định. Sau đó, upstream sẽ sử dụng một thuật toán để xác định máy chủ cụ thể nào sẽ gửi yêu cầu. 

Upstream context nên được đặt trong http context, bên ngoài server context. Cấu trúc như sau:
```
# main context

http {

    # http context

    upstream upstream_name {

        # upstream context

        server proxy_server1;
        server proxy_server2;

        . . .

    }

    server {

        # server context

    }

}
```
# Mail context
Nginx thường được sử dụng như một máy chủ reverse proxy hoặc máy chủ web, tuy nhiên nó cũng có thể hoạt động như một máy chủ mail proxy. Mail context được định nghĩa ở trong `main` context, bên ngoài `http` context.

Chức năng chính của mail context chính là cung cấp một khu vực để định nghĩa cấi hình giải quyết mai proxy trên máy chủ. Nginx có khả năng chuyển hưởng yêu cầu đến máy chủ xác thực bên ngoài. Sau đó, nó có thể cung cấp quyền truy cập vào máy chủ POP3 và IMAP để phục vụ dữ liệu như thực tế. Mail context cũng có thể được cấu hình để kết nối với SMTP Relayhost nếu muốn.

Cấu trúc của mail context sẽ như sau:
```
# main context

events {

    # events context

}

mail {

    # mail context

}
```

# If context
If context có thể được thiết lập để cung cấp xử lý với điều kiện cho trước để thực hiện các directive. Nó giống như câu lệnh if trong lập trình bình thường. Lệnh if trong Nginx sẽ thực thi các directive nếu thỏa mãn điều kiện `true`. If context trong Nginx được sử dụng trong trường hợp muốn ghi đè dựa vào điều kiện. Tuy vậy, nó không nên được lạm dụng sử dụng.

Cấu trúc của nó như sau:
```
# main context

http {

    # http context

    server {

        # server context

        location location_match {

            # location context

            if (test_condition) {

                # if context

            }

        }

    }

}
```
# Limit_except context
`limit_except` context được sử dụng để hạn chế sử dụng các phương thức HTTP trong location context. Ví dụ chỉ một số người dùng nhất định mới có quyền truy cập nội dung sử dụng phương thức POST, và tất cả mọi người đều có khả năng đọc nội dung (phương thức GET). Chúng ta có thể sử dụng `limit_except` block để thực hiện yêu cầu này.
```
. . .

# server or location context

location /restricted-write {

    # location context

    limit_except GET HEAD {

        # limit_except context

        allow 192.168.1.1/24;
        deny all;
    }
}
```
Nó sẽ áp dụng các directive bên trong context khi gặp bất kỳ phương thức HTTP nào ngoại trừ các phương thức được liệt kê trong context header. Kết quả của ví dụ trên chính là bất kỳ máy khách nào cũng có thể sử dụng GET và HEAD, những chỉ những máy đến từ mạng `192.168.1.1/24` mới được phép sử dụng các phương thức khác.
# Một số context khác
Ngoài các context được mô tả ở trên thì có một số context khác sẵn có trong Nginx và được mô tả ngắn gọn dưới đây. Những context này phụ thuộc vào các mô-đun tùy chọn và hiếm khi được sử dụng.
* `split_clients`: Chia yêu cầu của khách hàng thành hai hoặc nhiều loại. Context này được xác định trong http context và chủ yếu được sử dụng để thử nghiệm A/B.
* `map`: Để tạo các biến có giá trị phụ thuộc vào giá trị của các biến khác và được xác định trong http context.
* `geo`: Phân loại địa chỉ IP của khách hàng. Nó được sử dụng để ánh xạ giá trị của một biến tùy thuộc vào các địa chỉ IP được kết nối.
* `charset_map`: Để thêm bộ ký tự cụ thể vào response header "Content-Type". Ngoài ra, bằng cách sử dụng nó ta có thể chuyển đổi dữ liệu từ bộ ký tự này sang bộ ký tự khác với một số hạn chế xảy ra.
* `perl/perl_set`: Triển khai các trình xử lý vị trí và biến trong Perl và chèn các lệnh gọi Perl vào SSL. Với việc sử dụng `perl_set` ta có thể cài đặt trình xử lý Perl cho một biến cụ thể.
* `types`: Ánh xạ các lại MIME với phần mở rộng của tệp một cách chính xác. Nó có thể xuất hiện trong http context, server context hoặc location context.
# Kết luận
Cùng với bài [trước](https://viblo.asia/p/E375z2E65GW) thì chúng ta đã lượt qua cơ bản về context trong cấu hình Nginx. Còn về phần directive thì có rất là nhiều thứ khác. Vì vậy cách tốt nhất là đọc [tài liệu trên trang chủ của Nginx](http://nginx.org/en/docs/dirindex.html). Bài viết chắc chắn còn nhiều thiếu sót, do người viết cũng chỉ là mới bắt đầu tìm hiểu về Nginx. Mong bạn đọc thông cảm :bowing_woman: .