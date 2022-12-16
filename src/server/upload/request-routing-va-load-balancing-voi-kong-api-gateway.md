Với các bạn chưa biết API Gateway là gì? Có ăn được không? Tại sao phải dùng nó? có thể tham khảo bài viết đầu của mình tại [đây](https://viblo.asia/p/api-gateway-la-gi-tai-sao-mot-he-thong-microservices-lai-can-api-gateway-Do754pDX5M6).

Sau khi tìm hiểu xong API Gateway là gì rồi, các bạn có thể xem phần giới thiệu và cách cài đặt ăn liền của Kong API Gateway tại [đây](https://viblo.asia/p/gioi-thieu-va-cai-dat-kong-lam-api-gateway-cho-he-thong-microservices-YWOZr88P5Q0).

Ở phần tiếp theo này, mình sẽ hướng dẫn các bạn sử dụng Kong một cách cơ bản và có thể áp dụng được ngay vào trong dự án của cá nhân hoặc sử dụng một cách sương sương trong thực tế :Đ


# Chuẩn bị

Chúng ta có thể sử dụng luôn các dự án microservices cá nhân hoặc clone một vài cái sourcecode trên github về để thử nghiệm luôn. Ở đây để cho tiện thì mình sẽ sử dụng Mockapi để tạo ra 3 cái restful resource tương ứng với 3 cái services trong hệ thống, giả sử như chúng ở 3 cái servers khác nhau nhé, thằng mockapi.io chỉ cho tạo 1 project với 1 tên miền, thêm phải trả phí, mà giờ thì gần cuối tháng rồi cho nên...

![Imgur](https://i.imgur.com/CSujpw6.png)
Oke, vậy là chúng ta tạm thời có 3 services để quản lý user, product và order. Với domain là `5d2c8d178c900700149726bf.mockapi.io`

Sau khi chuẩn bị xong các services để thử nghiệm, chúng ta đăng nhập vào `Konga` để bắt đầu thiết lập và sử dụng Kong.


# Thiết lập Kong API Gateway để cân bằng tải và điều hướng Requests
Mình sẽ hướng dẫn cách thiết lập Kong từ bước đã chạy xong thành công Konga sau khi cài đặt và kết nối tới Kong Admin API như trong hướng dẫn ở bài trước (link mình để ở đầu bài, nhỡ có lười ngước lên thì click vào [đây](https://viblo.asia/p/gioi-thieu-va-cai-dat-kong-lam-api-gateway-cho-he-thong-microservices-YWOZr88P5Q0). 


## Upstream

### Upstream là gì? Tạo mới một upstream

Upstream là một virtual hostname chứa một nùi các config giúp chúng ta khai báo, quản lý, cân bằng tải và monitoring các servers chứa services. Chúng ta sẽ tạo một cái Upstream mới bằng cách chuyển sang mục `UPSTREAM` trên Konga và bấm nút `CREATE UPSTREAM`.  Trên thực tế sử dụng, chúng ta nên tạo 1 Upstream tương ứng với 1 cụm servers chứa cùng 1 (hoặc 1 cụm service).
Ví dụ như là mình deploy service quản lý `user` trên 3 cái servers khác nhau, rồi service `product` để trên 2 cái servers. Thì tương ứng chúng ta sẽ tạo 2 cái upstreams đó là `user-upstream` và `product-upstream` để tiện cho việc cân bẳng tải. Nhưng mà mình chỉ có mỗi cái server tạo bằng mockapi nên là mình sẽ chỉ tạo 1 cái upstream để làm example.

Khi tạo một upstream, chúng ta sẽ thấy có rất nhiều thứ chúng ta có thể config trên popup như `Active health checks`, `Passive health checks`, rồi tùy chỉnh http code được xem là healthy, ròi không healthy, các bạn có thể tìm hiểu sâu hơn bằng cách đọc description của chúng trên Konga. Nhưng tạm thời để đơn giản, chúng ta cứ để mọi thứ như mặc định.
![Imgur](https://i.imgur.com/gi9a9dd.png)
![Imgur](https://i.imgur.com/65raAuI.png)

### Set targets

Sau khi tạo xong một upstream, chúng ta bắt đầu set  `Targets` cho nó. `Targets` chính là đích mà các cái Upstream của ta hướng tới, bản chất nó chính là địa chỉ của các server chứa services. Với mỗi 1 server, chúng ta sẽ tạo 1 cái target tương ứng bằng cách bấm vào mục `Details` của Upstream ,  chọn mục `Targets` và chọn `ADD TARGET`

`Target` chính là cái địa chỉ IP:port hoặc domain:port của server mà chúng ta muốn thêm vào. Trọng số (Weight) ở đây là chính là để cân bằng tải, Kong sử dụng thuật toán lập lịch Round Robin có trọng số để cân bằng tải giữa các servers ở trong một upstream, trọng số tối đa là 1000 như mặc định ở bước tạo Upstream. 
Như trong ví dụ, target của mình sẽ là `5d2c8d178c900700149726bf.mockapi.io:80`, trọng số vì có 1 server nên không quan trọng nên mình cứ để mặc định, nếu bạn add thêm targets vào thì cần cân nhắc nên cho server nào có trọng số cao hay đồng đều nhau...

![Imgur](https://i.imgur.com/imAQSs2.png)

## Service

### Service trong Kong là gì? Tạo mới các services
> Service entities, as the name implies, are abstractions of each of your own upstream services. Examples of Services would be a data transformation microservice, a billing API, etc.

Các bạn có thể hiểu đơn giản Service chính là để biểu thị cho một cái service hoặc version của service của chúng ta để có thể tiện cho việc config và sử dụng. 

Những phiên bản cũ của Kong thì sử dụng `API` để configs việc routing nhưng ở phiên bản mới hơn, Kong không khuyến khích sử dụng (và tương lai sẽ bỏ) cách này mà thay vào đó là sử dụng Service và Route. 

Để tạo mới services, chúng ta vào mục `Services` trên Konga và bấm vào `ADD NEW SERVICE`.
![Imgur](https://i.imgur.com/McIigEg.png)

Chú ý các options:
- `name`: tên của service, ở đây mình tạo service để quản lý service user nên mình đặt tên là `user-service`
- `protocol`: http protocol đc sử dụng, mình đang dùng http
- `host`: tên của upstream, ở trên mình tạo nó là `user-server`
- `port`: port của server sử dụng, default 80
- `path`: đường dẫn tới service trên upstream
- `retries`: số lần thử khi Kong không gọi tới được server upstream.
- ...

### Set routes
`Route` chính là tập hợp các quy tắc để Kong match request tới đúng cái API trên services mà nó cần tới.

Sau khi tạo service, chúng ta sẽ thêm các `Routes` để điều hướng các request tới chính xác các API trong service này, nếu bạn cần quản lý một cách chi tiết từng API một thì mỗi API sẽ để một routes, hoặc không cần thì bạn config làm sao cho cái routes đó nó match hết các đường dẫn của các API trong service là được, trong trường hợp này mình sẽ hướng dẫn cách Add để route nó match từng API một. 

Tương tự như khi thêm `targets` vào `upstream`, ta vào xem detail của `Services` và chọn `Routes`  rồi bấm nút `ADD ROUTES`
![Imgur](https://i.imgur.com/JCJFvfp.png)

---------------

![Imgur](https://i.imgur.com/uJbxWEd.png)
Chú ý các options:
- `name`: Tên của routes, để tiện quản lý thì mình để users-get-user để 
- `protocols`: http protocol sử dụng
- `paths`: list các path match route này,  ở ví dụ này mình sẽ add cái API get user info (`/api/v1/users/<id>`). Có thể sử dụng regex trong paths
- `methods`: danh sách các http methods match cái route này, đang là get nên mình để GET thôi.
- `strip_path`: Xóa phần prefix của paths khi tới upstream server, hiện tại mình đang muốn uri của kong và server api là giống nhau nên mình chọn `No`.

Lưu ý quan trọng: **For hosts, paths, methods and protocols, press enter to apply every value you type**
tức là bạn thêm GET vào method bạn phải gõ GET rồi enter một cái thằng Konga mới nhận =)) 
Với các API khác trong service này, các bạn add các routes tương tự. Tương ứng với việc tạo các services về Products và Orders.

Trong trường hợp nếu bạn muốn tạo 1 route mà match tất cả các API thì chỉ cần để path rỗng rồi http method là GET POST PUT PATCH DELETE thì nó sẽ match toàn bộ các api có đường dẫn như trong services (`/api/v1/users`)

## Thử nghiệm
Vậy là chúng ta đã thiết lập xong Kong để nó có thể điều hướng được tới các API trên từng services cụ thể rồi thì chúng ta thử gửi request tới API get user xem kết quả sẽ ra sao.

Thay vì gọi trực tiếp tới server api là `http://5d2c8d178c900700149726bf.mockapi.io` thì ta sẽ gọi thông qua Kong Proxy server, mặc định nó sẽ chạy công 8000 với http requests `http://localhost:8000`

Gọi trực tiếp 

![Imgur](https://i.imgur.com/7gUR2Gv.png)

Gọi thông qua Kong, response body trả về giống với gọi trực tiếp nhưng response header đã thông báo server là Kong chứ không phải mockapi.io

![Imgur](https://i.imgur.com/1kfZnOg.png)

# Kết luận

Trong bài trên mình đã hướng dẫn các bạn cách sử dụng Kong API Gateway để định tuyến và cân bằng tải - chức năng chính của 1 API gateway. Hi vọng các bạn có thể dần dần sử dụng được API Gateway trong các dự án thực tế của mình.
Ở phần tiếp theo mình sẽ đi vào các phần nâng cao hơn một chút như bảo mật, giới hạn người dùng, logging và monitoring trên Kong.