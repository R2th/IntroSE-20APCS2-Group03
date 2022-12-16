# Lời nói đầu.
[Nginx - Loadbalancing  - Part 1](#)

[Nginx - Loadbalancing  - Part 2](https://viblo.asia/p/nginx-loadbalancing-part-2-07LKXm1JZV4)

[Loadbalancing - Các vấn đề ảnh hưởng đến performance.](https://viblo.asia/p/loadbalancing-cac-van-de-anh-huong-den-performance-6J3Zg4jWlmB)

Hello ae , lâu rồi mình mới có thời gian ngồi đọc lại `nginx` và trong lúc rảnh rang mình đọc được về kĩ thuật `Loadbalancing` và thấy nó khá hay ho. Vậy nên trong bài viết lần này mình sẽ trình bày về những gì mình đã tìm hiểu được . Bài viết này mình viết dựa trên kiến thức hạn hẹp của bản thân nên sẽ có những sai sót. Mong mọi người chỉ cho mình nhé . Nào Let Start !



# Nội dung 
## I : Tổng quan
### 1 . Loadbanlacing là gì ?
`Loadbacing` hay còn được biết đến với tên `Cân bằng tải`  là một kĩ thuật được sử dụng cực kì phổ biến của các web developer nhăm mục đích tối ưu hóa việc sử dụng tài nguyên , băng thông, giảm độ trễ cũng như khả năng xử lý lỗi của của 1 website. 

Nói 1 cách cụ thể hơn, thì thay vì sử dụng 1 server cho 1 web site, chúng ta sẽ sử dụng nhiều server để làm việc đó. Cùng với đó là sự gia tăng về web server chũng ta sẽ cần có 1 máy chủ để phân phối các lưu lượng truy cập cho các server một cách hợp lý . Máy chủ này gọi là `Loadbalancer` .


![](https://images.viblo.asia/3644a161-ce4d-4c38-932f-8eb5a076a48b.png)

Chúng ta có thể sử dụng `nginx` như một `Loadbalancer` rất hiệu quả để phân phối lưu lượng truy cập đến các máy chủ  và để cải thiện hiệu suất, khả năng mở rộng và độ tin cậy của các ứng dụng web với nginx.

### 2 . Vì sao cần sử dụng Loadbanlacing ?
  
Hãy tưởng tượng bạn có 1 websites pho diễn profile thần thánh cũng là nơi show off các bức ảnh selfie đẹp trai của mình . Khi bạn còn là người bình thường, mọi việc hoàn toàn ok . Nhưng đến một ngày , bạn thức dậy và phát hiện mình đã nổi tiếng . Website của bạn có hàng ngàn hàng vạn người truy cập và thật đen đủi website của bạn chết bất đắc kì tử vì ko có khả năng đáp ứng 1 lượng request lớn đến thế. 

Bạn biết bạn cần phải scale server của bạn lên . Có 2 cách :
 
 - Mua 1 server thật lớn, có thể đáp ứng được hàng nghìn request cùng 1 lúc  ==> Các server này thường sẽ là `dedicated server` ==> nhưng với cách này bạn sẽ tốn 1 khoản kha khá tiền đấy , nhà thì nghèo nên đành thôi vậy
 - Lên mạng check có vài nơi bán server rất là hạt rẻ, lại còn có khuyến mại nữa ==> ok , mua luôn và bây giờ là làm sao để sử dụng tất cả các server cùng với website cua bản thân 

Và đến bây giờ là lúc cần sử dụng đến `Loadbalancer`. Loadbalancer nhận tất cả các request đến vờ phân bổ lượng request đến tưng server riêng lẻ. Có rất nhiều lạo `Loadbalancer` cả phần cứng và phần mêm . Tuy nhiên trong bài hôm nay, mình sẽ sử dụng `nginx` như  `Loadbalancer` bằng cách sử dụng `http_proxy` module. Nó là một trong những cach hữu dụng và phổ biến nhất để làm `Loadbalancing`

![](https://images.viblo.asia/121d79cf-ab02-4db2-a053-c8fccd973a48.png)


## II : Cách cấu hình Loadbanlacing 
### 1 . Cấu hinh cơ bản .
Trong bài viết này chúng ta sẻ sử dụng đến 3 server :

- `main` : Server đóng vai tro như 1 `Loadbalancer`
-  `server_1` : DNS của AWS (Có thể là domain)
-  `server_2` : DNS của DO 

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
 
 Với cấu hình như trên nginx sẽ nhân tất cả các lưu lượng chạy vào cổng 80 và phân phối lưu lưu đó qua 2 server là `server_1` và `server_2`.  Và tiếp theo thì chũng ta sẽ tìm hiểu xem, `nginx` phân phối các lưu lượng này theo cách nào và cách nào là hiệu quả nhất .

### 2 . Chiến lược cân bằng tải

![](https://images.viblo.asia/9b71937e-78fd-4dcd-9713-98f2043a87aa.gif)

 `Nginx` support khá nhiều thuật toán để cân bằng lưu lượng traffic . Cụ thể như sau :
 
***2.1. : Round robin.***

Mặc đinh thì `nginx` sẽ sử dụng thuật toán này để tính lưu lượng cho các server con. Với thuật toán này các server sẽ được lần lượt nhận các request theo thứ tự . Cụ thể là :

- Request 1 ==> `server_1`
- Request 2 ==> `server_2`
- ..............................................
- Request n ==> `server_1`
- Request n + 1 ==> `server_2`

Thuật toán này nhìn có vẻ rất ok khi sử dụng, đảm bảo việc cân bằng tải đúng không. Thức tế thì không, đây là thuật toán cực kì dốt vì các thông số thực tế của các server sẽ không được tính đến . Thuật toán này là tốt nhất khi tất cả các request giống y hệt nhau, không có sự sai khác về thời gian xử lý, dữ liệu vào và ra.  Cụ thể :

1s đầu tiên : 
- Request 1 ==> `server_1` : 3s xử lý
- Request 2 ==> `server_2` : 1s xử lý

s thứ 2 : 
- Request 3 ==> `server_1` : 3s xử lý
- Request 4 ==> `server_2` : 1s xử lý

s thứ 3 : 
- Request 3 ==> `server_1` : 3s xử lý
- Request 4 ==> `server_2` : 1s xử lý

Như vậy trong trường hợp trên `server_1`  ==> đang phải xử lý 3 request trong cùng 1 lúc . Như vậy không hợp lý . Để giải quyết vấn đề này, `nginx` đã tạo ra 1 thuật toán khác.  Đó chính là `Least connected`

***2.2 : Least connected.***

**Cú pháp sử dụng :**
```
 upstream backend {
        least_conn;
        server server_1;
        server server_2;
    }
```
**Ý nghĩa thuật toán :**

Với việc sử dụng thuật toán này, nginx sẽ tính lưu lượng traffic  và  connection thực tế mà server đó đang phải xử lý và sẽ phân bổ request mới đến server đang phải xử lý ít request hơn và mình thấy đây là một thuật toán khá thực tế khi sử dụng loadbalancing .

Tuy nhiên , với 2 thuật toán bên trên việc quyết định xem server nào  gần như hoàn toàn phụ thuộc vào các thông số của server hay lượng traffict thực tế . Vậy có cách nào để support việc quyết định phân tải bằng các `param` , `hearder` hay là `cookies` hay ko ? Đáp án hiển nhiên là có ? Đó chính là thuật toán `Hash`

***2.3 : Hash.***

Cách thức hoạt động :

- Ta cần  cung cấp 1 `key` cho `nginx`, `key` này có thể là text  cũng có thể là argument , header hay cookie v....v.... của request truyền lên
- `Nginx` sử dụng `key` này để mã hóa và check xem `key` này đã được gắn với server nà (trong cache).
- Nếu chưa gắn với server nào thì `nginx` sẽ random server (Theo thuật toán `Round robin` ) và cache lại 
- Nếu đã gắn với server  thì auto chọn server đó

Cú pháp :
```
hash `key` [consistent]
```

- `key` :  
    - Header :  `$http_session_id` ==> Lấy Header có name là : session_id
    - Argument : `$arg_mobile` ==> Lấy Argument có name là : mobile
    - Ip address : `$remote_addr` 

> Trong trường hơp  nếu `key` của bạn có giá trị rỗng khi truyền lên, nginx sẽ quay trở lại thuật toán `Round robin` để phân bố request .

- `[consistent]` đây là một tham số bạn  thể truyền vào hoặc không . Nếu bạn truyền tham số này vào thì phương thức [ketama](https://www.metabrew.com/article/libketama-consistent-hashing-algo-memcached-clients) sẽ được xử dụng cho việc mã hóa key. Hiểu một cách ngắn gọn rằng . Với việc sử dụng `Hash` này, khi bạn thêm mới hoặc xóa 1 server nào đó bất kì trong loadbalancer , nginx sẽ xóa toàn bộ cache đã lưu. Quay trở lại với phương thức [ketama](https://www.metabrew.com/article/libketama-consistent-hashing-algo-memcached-clients). Nó sẽ đảm bảo chỉ các cache của các server bị ảnh hưởng bị clear và đảm bảo các request không bị ảnh hưởng hoặt động như cũ 
 
```
upstream backend {
        hash $http_session_id consistent; #use method ketama
        server server_1;
        server server_2;
    }
```

***2.4: ip_hash.***

Cái tên nói nên tất cả , thuật toán này cũng sử dụng hash và nó hash ip address của client. Bản chất thì nó sẽ sử dụng bộ 3 octet của ipv4 hoặc toàn bộ địa chỉ ipv6 để làm key mã hóa rồi hoạt động như thuật toán `hash` thông thường . Thuật toán này đảm bảo  rằng, khi hoạt động bình thường , request từ 1 client luôn luôn chỉ đến 1 server (Trong 1 số trường hợp, điều này rất quan trọng)

```
upstream backend {
        ip_hash;
        server server_1;
        server server_2;
    }
```

***2.5: Least Time.***
> Thuật toán này chỉ dành cho phiên bản trả phí của NGINX (Nginx Plus)

 
```
upstream backend {
        least_time first_byte;
        server server_1;
        server server_2;
    }
```

Thuật toán này thực sự rất smart (trả phí có khác :D ), việc quyết định sử dụng server nào phụ thuộc vào lượng request active của server và độ trễ khi xử lý của server. Nó sẽ chọn server ít connection và độ trễ thấp nhất. Tuy nhiên việc tính độ trễ này phụ thuộc vào tham số đầu vào `least_time`. Cụ thể như sau :

- `connect` ==> Thời gian connect đến upstream server 
- `first_byte` ==> Thời gian nhận về những byte dữ liệu đầu tiên
- `last_byte` ==> Thời gian nhận hết toàn bộ dữ liệu

***2.6: Ramdom.***

Và cuối cùng hiển nhiên là đến method `Random`. Cái tên như ý nghĩa của nó, nó sẽ random các server để lựa chọn server mà request sẽ đi tới. Đặc biệt nên bạn enable param `two`:

```
upstream backend {
        random two least_conn;
        server server_1;
        server server_2;
        server server_3;
    }
```

Thì điều này sẽ khiên nginx chọn ra 2 server thỏa mạn thuật toán đi  kèm (Trong ví dụ bên trên là `least_conn`) sau đó random 1 trong 2 server . Các thuật toán support cho param `two` :

- least_conn
- least_time=connect (NGINX Plus) 
- least_time=first_byte (NGINX Plus)
- least_time=last_byte (NGINX Plus)

> Chú ý rằng thuật toán random này nên sử dụng với các môi trường có nhiều loadbalacer để phân tai nhiều hơn đến các `loadbalacer` khác . Mình không khuyến khích sử dụng thuật toán này để cân bằng tải nếu chỉ có 1 balancer .


# Lời kết .
Vậy là mình đã trình bày tông quan về `nginx - loadbalancing` và các chiến lược cân bằng tải trong nginx. Phần sau mình sẽ trình bày cụ thể hơn về cơ chế bắt lỗi cũng như các directive cần biết khi cấu hình loadbalancing. Bài viết đều dựa trên hiểu biết hạn hẹp của mình, nên nếu có gì sai hay cần góp ý, mọi người comment vào để cho mình biết nhé. Cám ơn vì đã đọc bài viết của mình !

# Tài liệu liên quan 
 - http://nginx.org/en/docs/http/load_balancing.html#nginx_load_balancing_additional_information
 - https://www.nginx.com/products/nginx/load-balancing