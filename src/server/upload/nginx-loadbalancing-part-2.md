# Lời nói đầu.
[Nginx - Loadbalancing  - Part 1](https://viblo.asia/p/nginx-loadbalancing-part-1-yMnKMmLmK7P)

[Nginx - Loadbalancing  - Part 2](#)

[Loadbalancing - Các vấn đề ảnh hưởng đến performance.](https://viblo.asia/p/loadbalancing-cac-van-de-anh-huong-den-performance-6J3Zg4jWlmB)

Xin chào mọi người, tiếp tuc chủ đề về `Nginx - Loadbalancing`. Trong bài trước  mình đã trình bày tông quan về `nginx - loadbalancing` và các chiến lược cân bằng tải trong nginx . Ngày hôm nay mình sẽ  trình bày cụ thể hơn về cơ chế bắt lỗi cũng như các directive cần biết khi cấu hình loadbalancing. Nào bắt đầu thôi ! Let Start :D

# Nội dung 
Trong bài viết này chúng ta sẻ sử dụng đến 3 server :

- `main` : Server đóng vai tro như 1 `Loadbalancer`
-  `server_1` : Server của AWS (Có thể là domain tro)
-  `server_2` : Server của DO 

**Chú ý :**

>  `server_1` và `server_2` đều có chung source code (clone từ git)  và đều được config để trỏ vào database chung. Để đảm bảo tính toàn vẹn của dữ liệu.
>  

>  `server_1` và `server_2` có thể là tên domain trỏ vào ip của server đó hoặc là địa chỉ ip của từng server . Chúng ta cần config cụ thể ở từng server 1 và server 2 sao cho domail or ip trỏ vào forder code của chúng ta.


 
 File config `nginx` của server `main`  đại khái sẽ trông như sau :
 
 ```
 http {
    upstream backend {
        server server_1;
        server server_2;
    }
    server {
         listen 80;
         
        location / {
            proxy_pass http://backend;
        }
    }
}
 ```
 
 Với cấu hình như trên nginx sẽ nhân tất cả các lưu lượng chạy vào cổng 80 và phân phối lưu lưu đó qua 2 server là `server_1` và `server_2`
 
## I : Những điều cần biết về Health checks và cơ chế bắt lỗi của nginx

### 1 : Health checks.

Thực tế thì với version OpenSource của nginx thì `Health checks` thực sự thì mình nghĩ nó không tồn tại =)) Nó chỉ thực sự tồn tại trong các version trả phí của Nginx thôi :D :D :D . Nến bạn muốn tìm hiểu về health check phiên bản trả phí có thể vào [đây để biết thêm chi tiết](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-health-check/) .

Cái mà chúng ta nhận được (Dùng bản FREE ) đó là kiểm tra 1 cách thụ động của nginx (Mình sẽ trình bày kĩ hơn phần này ở nội dung bên dưới). Nếu 1 server báo ra 1 số  lỗi nhất định  nó sẽ bị nginx xóa khỏi danh sách các server được phân phối các request . 

Mặc định thì nếu 1 request tới 1 upstream server lỗi hoặc timeout thì server đó sẽ bị remove 10s .

```
location / {
    proxy_pass http://backend;
}
```
Bản chất thì với version FREE, nginx không tự động check health của 1 server mà chỉ kiểm tra trong lifecycle của 1 incoming reqeust . Và 1 điểm nữa, respose trả về của server cho dù có là lỗi 500 hay 404 thì nginx vẫn tự động hiểu server đó vẫn khỏe mạnh (miên là nó là giao thức http là khỏe mạnh).

Đó chính là lý do mình nói với version Free thì `Health checks`   không tồn tại. Chính vì thế ta cần định nghĩa cho `nginx` biết upstream server như thế nào là không khỏe mạnh :

```
location / {
    proxy_next_upstream http_404;
    proxy_pass http://backend;
}
```

trong ví dụ trên mình đã đặt 1 cái BẪY bằng directive `proxy_next_upstream` , nếu response là 404 thì sẽ bị đánh dấu là ko khỏe mạnh và chuyển qua server khác . Ngoài ra ta cũng có thể đặt rất nhiều BẪY khác  . Xem ở [đây](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream) để biết thêm chi tiết nhé .

Noài ra chính ta có thể sử dụng 1 số directive để tinh chỉnh lại cách mà server được đánh dấu là unavaiable

**1.1: Max Fails.**

```
upstream backend {
        server server_1 max_fails=2;
        server server_2;
    }
```

- Directive này sẽ định nghĩa max số lần unhealthy của 1 server trong 1 thời gian cố định sẽ được config bẳng `fail_timeout` directive . Nếu con số này bị vượt quá thì server sẽ bị đánh dấu là unavaiable .
- Directive này sẽ không hoạt động nên directive `fail_timeout` có giá trị là 0
- Giá trị mặc định là 1 
- Điều kiện để count số lần fail được định nghĩa bằng các directive sau : [proxy_next_upstream](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_next_upstream),  [fastcgi_next_upstream](http://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_next_upstream), [memcached_next_upstream](http://nginx.org/en/docs/http/ngx_http_memcached_module.html#memcached_next_upstream), [grpc_next_upstream](http://nginx.org/en/docs/http/ngx_http_grpc_module.html#grpc_next_upstream).


**1.2 : Fail timeout.**
```
upstream backend {
        server server_1 max_fails=2 fail_timeout=3;
        server server_2;
    }
```

Với config bên trên, server hiểu rẳng , nếu trong 3s mà server upstream có 2 lần bị đánh dấu là unhealthy thì server đó sẽ bị remove khỏi danh sách server active để phân phối traffic. Chốt lại, directive này có ý nghĩa như sau :

- Khoảng thời gian đặt BẪY để balancer tính toán `max_fails` 
- Khoảng thời gian 1 server (đã bị xem xét là unavailable) bị loại bỏ ra list các server active 
- Mặc định thì có giá trị là 10 (tương đương 10s )


### 2: Down server.

Ngoài ra để đánh dấu server là không khỏe mạnh, ta cũng có thể cấu hình lại file config bằng cách thêm hậu tố `down` vào sau server address trong upstream directive . Cụ thể như sau :

```
upstream backend {
        server server_1 down;
        server server_2;
        server server_3;
    }
```

Trong ví dụ bên trên server_1 sẽ bị down vĩnh viễn (cho đến khi bạn cấu hình lại server) . Ngoài ra nêu bạn nào to mò vì sao nếu xóa server khỏi list danh sách sao ko comment hay xóa luôn đi cho nhanh mà phải dùng đến cái `down` này thì lý do rất đơn giản bởi vì khi xóa hay comment vào thì các `hashes` của server đó sẽ bị xóa đi, dùng `down` thì sẽ còn nguyên đảm bảo tính toàn vẹn. Điều này cực kì có ý nghĩa khi bạn đang dùng một thuật toán `hash` hay `ip_hash`

### 3: Backup server

```
upstream backend {
        server server_1;
        server server_2;
        server server_3 backup;
    }
```

Khi bạn đánh dấu 1 server là `backup` (trong ví dụ nêu trên là `server_3` ) thì trong các server này sẽ ko được phân phối traffic cho đến khi các server active bị đánh dấu là unavailable , mỗi 1 server unavailable thì 1 server backup sẽ được mở ra và thế vào chỗ của server không khỏe mạnh đó.  

>  Backup server không được khả dụng khi chúng ta sử dung các thuật toán cân bằng tải là `hash`, `ip_hash` hay là `random`.

### 4:   Weight Server
```
upstream backend {
        server server_1 weight=2;
        server server_2;
    }
```

Đây là chỉ số làm thay đổi lưu lượng traffic tới server cụ thể trong một upstream . Nó cực kì hữu ích nếu bạn có 1 server có hardware vượt trội hơn hởn so với server khác . Khi đó bạn cần đẩy nhiều request hơn đến server đó để hiệu năng được xử lý một cách trơn tru mượt mà nhất . Hoặc nếu bạn có 1 server yêu hơn và muốn request ít hơn thì cũng có thể sử dụng param này.

Trong ví dụ trên , lượng traffic vào `server_1` sẽ gắp đôi lượng traffic của `server_2` . Mặc định thì trọng số này sẽ là 1 . Rất hữu ích phải không 


### 5:  Loadbalacing và bài toán thường gặp.

Loadbalacing là bản chất là cũng 1 source code chạy trên nhiều server khác nhau để giảm tải và tối ưu hóa việc sử dụng tài nguyên. Chính việc sử dụng nhiều server dẫn đến việc bảo toàn user rất có vấn đề (`Session persistence`).

![](https://images.viblo.asia/c82ef85f-4f02-4cad-a9ad-876e81346aef.png)

Như các bạn đã biết, `Laravel` sử dụng session để check việc login và thông tin user . Việc chuyển từ server này sang server khác dẫn đến việc bảo toàn user rất khó khăn . Chúng ta cũng không thể để user login xong thì user, F5 cái lại bị logout ra .

Để xử lý vấn đề này ,  ta có 2 cách  : 

 - Vì sử dụng nhiều server nên việc quản lý driver nên sử dụng các driver có thể share đk giữa các server với nhau : `memcached` or `database`  ===> Tuy nhiên đôi khi việc đồng bộ giữa các server không đủ nhanh (có thể là do vấn đề hạ tầng mạng hay logic) nên phương pháp này vẫn có thể có rủi ro
 -  Cố gắng đảm bảo rằng request từ 1 browser sẽ chỉ đến duy nhất 1 server ==> `nginx` support chúng ta `ip_hash` để điều này (nếu dùng version trả phí của nginx chúng ta có phần [sticky directive](https://www.nginx.com/products/nginx/load-balancing/#session-persistence)) ===> Sẽ gặp vấn đề khi server được chỉ định unavailable 

Như vậy cách tốt nhất là chúng ta kết hợp 2 phương pháp với nhau để giảm thiểu rủi ro cũng như tăng cường performance cho hệ thống .

### 6: Further reading

Ngoài ra, trong version trả phí của `nginx` là `NGINX+` còn support rất nhiều directive , nó thật sự là quá nhiều luôn và với sự hiểu biết hạn hẹp của mình thì chưa thể trình bày hết được. Các bạn có thể vào [đây](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/) để tìm hiểu thêm . Hoặc đợi mình vào 1 ngày đẹp trời nào đó tìm hiểu tiếp :D 

# Lời kết .
Vậy là mình đã trình bày hết các hiểu biết của mình về `Nginx - Loadbalancing` . Thực sự thì bài viết đều dựa trên hiểu biết hạn hẹp của mình, nên nếu có gì cần góp ý, mọi người comment vào để cho mình biết nhé . Cám ơn vì đã đọc bài viết của mình !

# Tài liệu liên quan 
 - http://nginx.org/en/docs/http/load_balancing.html#nginx_load_balancing_additional_information
 - https://www.nginx.com/products/nginx/load-balancing