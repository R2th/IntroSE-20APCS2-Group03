## Giới thiệu HAProxy
HAProxy, viết tắt của High Availability Proxy, là một phần mềm cân bằng tải open source cho TCP/HTTP. Nó có thể chạy trên Linux, Solaris và FreeBSD. Mục đích chính của nó là dùng để cải thiện hiệu năng và tính tin cậy của hệ thống bằng cách dẫn tải đến các server khác. HAProxy cũng được sử dụng tại nhiều các công ty nổi tiếng như GitHub, Imgur, Instagram,...

## Các thuật ngữ trong HAProxy
#### Access Control List (ACL)
Trong cân bằng tải, ACL được dùng để kiểm tra điều kiện và thực hiện một hành động (ví dụ như lựa chọn một server hay chặn một request) dựa trên kết quả của việc kiểm tra đó. Việc sử dụng ACL cho phép tạo một môi trường có khả năng chuyển tiếp các request một cách linh hoạt dựa trên các yếu tố khác nhau mà người dùng có thể tùy chỉnh một cách dễ dàng.

<br>
Ví dụ của một ACL: 

```
acl url_blog        src         /something
```
ACL này sử dụng cho các request có chứa `/something` (vd như: `localhost/something/1/`) và các request này được redirect đến `src`

#### Backend
Backend là một tập các server mà HAProxy có thể forward các request tới. Backend được cấu hình trong mục `backend` trong file configuration của HAProxy. Ở dạng đơn giản nhất, một backend có thể được cài đặt bằng cách 
- Đặt ra thuật toán để căn bằng tải (round-robin, least-connection,...)
- Một danh sách các máy chủ và port của chúng có thể dùng để nhận request từ HAProxy

<br>
Một backend có thể chứa một hoặc nhiều server, về cơ bản thì càng nhiều server trong một backend thì khả năng chịu tải và performance của hệ thống càng tăng lên. Tính tin cậy của hệ thống cũng tăng lên theo phương pháp này vì khi một server bị ngắt khỏi proxy, các server có thể chịu tải thay được cho nó. 

HAProxy còn cho phép một server backup chuyên dụng, được sử dụng khi các server đều offline. Server backup này thường sẽ chứa các thông báo hệ thống offline hoặc một thông điệp nào đó để người dùng có thể biết được rằng hệ thống đang tạm thời không có sẵn.

<br>
Một ví dụ cấu hình của backend trong file cconfiguration của HAProxy:

```
backend web-backend
    balance leastconn
    mode http
    server backend-1 web-backend-1.example.com check
    server backend-2 web-backend-2.example.com check
    server backend-3 backup-backend.example.com check backup
    
backend forum
    balance leastconn
    server forum-1 forum-1.example.com check
    server forum-2 forum-2.example.com check
    server forum-3 backup-forum.example.com check backup
```

Dòng `balance leaseconn` chỉ ra rằng thuật toán để cân bằng tải là chọn những server có ít kết nối tới nhất.

Dòng `mode http` chỉ ra rằng proxy sẽ chỉ cân bằng cho các kết nối tại tầng 7 của Internet Layer (Tầng ứng dụng)

#### Frontend
Frontend được dùng để định nghĩa cách mà các request được điều hướng cho backend. Frontend được định nghĩa trong mục `frontend` của HAProxy configuration. Các cấu hình cho frontend gồm:
- Một bộ địa chỉ IP và port (ví dụ: 10.0.0.1:8080, \*:443,...)
- Các ACL do người dùng định nghĩa
- Backend được dùng để nhận request

Một ví dụ cấu hình của frontend trong file configuration của HAProxy: 
```
frontend web
  bind 0.0.0.0
  default_backend web-backend

frontend forum
  bind 0.0.0.0:8080
  default_backend forum
```

## Các loại cân bằng tải
#### Không có cân bằng tải 
Đây là một dạng đơn giản nhất cho một ứng dụng web, thường được sử dụng cho môi trường dev, test khi số lượng người dùng ít và không có hoặc không cần đảm bảo tính tin cậy của ứng dụng.

![no-load-balancing](https://images.viblo.asia/20989602-9901-4f1f-9266-8fffbad29f81.png)

Với mô hình này, người dùng sẽ kết nối trực tiếp với web server tại `yourdomain.com` và không có cân bằng tải nào được sử dụng. Nếu webserver gặp trục trặc, người dùng sẽ không thể kết nối đến ứng dụng web được nữa.

#### Cân bằng tải tại tầng 4 (tầng truyền vận)
Cách đơn giản nhất để có thể cân bằng tải tới nhiều server là sử dụng cân bằng tải trên tầng 4. Theo hướng này thì các request sẽ được điều hướng dựa trên khoảng địa chỉ IP và cổng (ví dụ một request tới địa chỉ `http:://www.example.com/something` sẽ được điều hướng tới backend được dùng để điều hướng cho domain `example.com` với cổng 80)

![layer-4-load-balancing](https://images.viblo.asia/95511f07-278f-4843-82d3-086a31d5e189.png)

#### Cân bằng tải tại tầng 7 (tầng ứng dụng)
Cân bằng tải tại tầng 7 là cách cân bằng tải phức tạp nhất và cũng là cách cân bằng tải có nhiều tùy biến nhất. Sử dụng cân bằng tải tại tầng 7, ta có thể điều hướng request dựa trên nội dụng của request đó. Với kiểu câng bằng tải này, nhiều backend có thể được sử dụng cho dùng một domain và port. 

![layer-7-load-balancing](https://images.viblo.asia/921ce0fa-e01d-4588-ba5c-88baf8d1948a.png)

Ví dụ, một người dùng request tới `example.com/something`, request đó sẽ được điều hướng đến một backend chuyên dụng cho `something`.
```
frontend web
    bind *:80
    mode http
    
    acl something_url   path    /something
    use_backend something-server if something_url
    
    default_backend web-backend
```

## Các thuật toán cân bằng tải
Các thuật toán cân bằng tải được sử dụng gồm
- roundrobin: các request sẽ được chuyển đến server theo lượt. Đây là thuật toán mặc định được sử dụng cho HAProxy
- leastconn: các request sẽ được chuyển đến server nào có ít kết nối đến nó nhất
- source: các request được chuyển đến server bằng các hash của IP người dùng. Phương pháp này giúp người dùng đảm bảo luôn kết nối tới một server

## Tính sẵn sàng cao 
Cân bằng tải trên tầng 4 và tầng 7 được miêu tả ở trên đều được sử dụng để cân bằng tải để chuyển các request tới các backend server. Tuy nhiên, chính câng bằng tải của bạn là một điểm lỗi (single point of failure), vì nếu cân bằng tải gặp sự cố nhưng các server đều chạy bình thường thì người dùng cũng không thể kết nối đến được ứng dụng web trong khi server vẫn đang chạy bình thường.

Một cài đặt cấu hình cao sẽ không có một điểm lỗi nào. Nó ngăn chặn việc nếu một máy chủ không hoạt động làm ảnh hưởng tới toàn bộ hệ thống.
![haproxy](https://images.viblo.asia/473ba240-06d4-4327-8f6e-febcf3d833d5.gif)

Với mô hình có 2 cân bằng tải như trên, nếu một trong 2 cân bằng tải không hoạt động, ứng dụng vẫn có thể hoạt động bình thường. Hay nếu một trong hai server không hoạt động, server còn lại sẽ có thể chịu tải thay cho nó.

<br>

Tham khảo: [DigitalOcean](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts)