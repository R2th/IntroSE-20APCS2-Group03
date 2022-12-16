# Giới thiệu
Khi làm các ứng dụng có nhiều lượt truy cập chúng ta cần tới một hệ thống có khả năng chịu tải tốt, **Nginx** là công cụ tuyệt vời giúp chúng ta làm điều đó và cân bằng tải trên nhiều trường hợp ứng dụng là một kỹ thuật thường được sử dụng để tối ưu hóa việc sử dụng tài nguyên, tối đa hóa thông lượng, giảm độ trễ và đảm bảo các cấu hình chịu lỗi.

Có thể sử dụng nginx như một bộ cân bằng tải HTTP rất hiệu quả để phân phối lưu lượng truy cập đến một số máy chủ ứng dụng và để cải thiện hiệu suất, khả năng mở rộng và độ tin cậy của các ứng dụng web với **nginx**.

# Các phương pháp cân bằng tải trong nginx
1. round-robin - các request tới máy chủ được phân tán theo kiểu vòng tròn.
2. Least-connected - các yêu cầu tiếu theo được gán cho máy chủ có số lượng kết nối hoạt động ít nhất.
3. Ip-hash - một hàm băm được xử dụng để xác định máy chủ nào được chọn request tiếp theo ( dựa trên địa chỉ IP của máy khách)

# Cấu hình mặc định của cân bằng tải
1 config đơn giản cho việc cân bằng tải với nginx như sau

```nginx
http {
    upstream myapp1 {
        server srv1.example.com;
        server srv2.example.com;
        server srv3.example.com;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://myapp1;
        }
    }
}
```

Trong ví dụ trên, có 3 phiên bản của cùng một ứng dụng đang chạy trên srv1, srv2-srv3. Khi phương pháp cân bằng tải không được cấu hình cụ thể, nó sẽ mặc định là quay vòng. Tất cả các yêu cầu đều được ủy quyền cho nhóm máy chủ myapp1 và nginx áp dụng cân bằng tải HTTP để phân phối các yêu cầu.

**Reverse proxy** trong nginx bao gồm cân bằng tải cho HTTP, HTTPS, FastCGI, uwsgi, SCGI, memcached và gRPC.

Để định cấu hình cân bằng tải cho HTTPS thay vì HTTP, chỉ cần sử dụng Giao thức https https làm giao thức.

Khi thiết lập cân bằng tải cho các lệnh FastCGI, uwsgi, SCGI, memcached hoặc gRPC, hãy sử dụng lệnh fastcgi_pass, uwsgi_pass, scgi_pass, memcached_pass và grpc_pass. (phần này chi tiết chúng ta tìm hiểu sau)

# Cân bằng tải ít kết nối nhất (Least connected load balancing)
**Least-connected** là 1 trong những cách để giúp cân bằng tải. Least-connected cho phép cho phép kiểm soát tải trên các trường hợp ứng dụng công bằng hơn trong tình huống khi một số yêu cầu mất nhiều thời gian hơn để hoàn thành.

Với việc cân bằng tải được kết nối ít nhất, nginx sẽ cố gắng không làm quá tải máy chủ của ứng dụng khi có quá nhiều request, thay vào đó phân phối các request mới đến một máy chủ ít bận rộn hơn.

Cân bằng tải kết nối ít nhất trong nginx được kích hoạt khi chỉ thị **less_conn** được sử dụng như một phần của cấu hình nhóm máy chủ:

```nginx
 upstream myapp1 {
        least_conn;
        server srv1.example.com;
        server srv2.example.com;
        server srv3.example.com;
    }
```

# Session persistence
Lưu ý khi cân bằng tải với **roud-robin** hoặc **least-connected** , mỗi yêu cầu của khách sẽ đến 1 server khác nhau, không có gì đảm bảo rằng cùng 1 máy khách sẽ luôn được chuyển đến cùng 1 máy chủ.

Nếu có nhu cầu ràng buộc khách hàng với một máy chủ ứng dụng cụ thể - nói cách khác, hãy tạo phiên của khách hàng, "stickly (có dính líu)"  hoặc "persistent (liên tục)" theo cách luôn cố gắng chọn một máy chủ cụ thể - cơ chế cân bằng tải **ip-hash** đã sử dụng.

Với **ip-hash**, địa chỉ IP của máy khách được sử dụng làm khóa băm để xác định máy chủ nào trong nhóm máy chủ sẽ được chọn cho các yêu cầu của máy khách. Phương pháp này đảm bảo rằng các yêu cầu từ cùng một máy khách sẽ luôn được chuyển đến cùng một máy chủ trừ khi máy chủ này không khả dụng.

Để định cấu hình cân bằng tải **ip-hash**, chỉ cần thêm chỉ thị ip_hash vào cấu hình nhóm máy chủ (ngược dòng):

```nginx
upstream myapp1 {
    ip_hash;
    server srv1.example.com;
    server srv2.example.com;
    server srv3.example.com;
}
```

# Cân bằng tải trọng (Weighted load balancing)
Cũng có thể ảnh hưởng đến các thuật toán cân bằng tải **nginx** hơn nữa bằng cách sử dụng **server weights**.

Trong các ví dụ trên, trọng lượng máy chủ không được định cấu hình, điều đó có nghĩa là tất cả các máy chủ được chỉ định đều được coi là đủ điều kiện cho một phương pháp cân bằng tải cụ thể.

Đặc biệt, với vòng tròn, điều đó cũng có nghĩa là phân phối các yêu cầu ít nhiều bằng nhau trên các máy chủ - miễn là có đủ yêu cầu và khi các yêu cầu được xử lý một cách thống nhất và hoàn thành đủ nhanh.

Khi tham số trọng lượng được chỉ định cho máy chủ, trọng số được tính như một phần của quyết định cân bằng tải.

```nginx
  upstream myapp1 {
        server srv1.example.com weight=3;
        server srv2.example.com;
        server srv3.example.com;
    }
```

Với cấu hình này, cứ 5 yêu cầu mới sẽ được phân phối trên các phiên bản ứng dụng như sau: 3 yêu cầu sẽ được chuyển đến srv1, một yêu cầu sẽ chuyển đến srv2 và một yêu cầu khác - đến srv3.

Tương tự như vậy có thể sử dụng các trọng số với cân bằng tải ip-hash được kết nối ít nhất trong các phiên bản gần đây của nginx.

# Health checks
Triển khai **Reverse proxy** trong **nginx** bao gồm kiểm tra tình trạng máy chủ trong băng tần (hoặc thụ động). Nếu phản hồi từ một máy chủ cụ thể không thành công do lỗi, nginx sẽ đánh dấu máy chủ này là không thành công và sẽ cố gắng tránh chọn máy chủ này cho các yêu cầu gửi tiếp theo trong một thời gian.

Lệnh **max_fails** đặt số lần thử liên tiếp không thành công để liên lạc với máy chủ sẽ xảy ra trong **fail_timeout**. Theo mặc định, **max_fails** được đặt thành **1**. Khi được đặt thành **0**, kiểm tra sức khỏe bị vô hiệu hóa cho máy chủ này. Tham số **fail_timeout** cũng xác định thời gian máy chủ sẽ được đánh dấu là không thành công. Sau khoảng thời gian fail_timeout sau lỗi máy chủ, **nginx** sẽ bắt đầu thăm dò máy chủ một cách duyên dáng với các yêu cầu khách hàng trực tiếp. Nếu các thăm dò đã thành công, máy chủ được đánh dấu là một trực tiếp.

nguồn
[http://nginx.org/en/docs/http/load_balancing.html#nginx_load_balancing_methods](http://nginx.org/en/docs/http/load_balancing.html#nginx_load_balancing_methods)