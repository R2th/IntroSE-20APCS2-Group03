# Lời nói đầu.
Hello mọi người, lại là mình đây . Gần đây thì mình có được hỏi một vài vấn đề về nginx và cho đến giờ mình vẫn đang tìm hiểu và chưa có câu trả lời :D (Khá buồn) ! Tuy nhiên trong quá trình tìm hiểu mình lại đọc được 1 số tips và tricks để cải thiện performance của `nginx` nên hôm nay mình muốn trình bày coi như là 1 lần nhớ . Bài tìm hiểu này dựa trên kiến thức hạn hẹp của mình nên nếu có gì sai hay có vấn đề gì mong các bạn comment để mình biết thêm nhé. Nào cùng bắt đầu nhé ! 

# Nội dung.
## I, Gzip
Với 1 website thông thường bạn cần request rất nhiều thứ về để website có thể hoạt động mượt mà ví dụ như : js, css, image , html , ..v...v.... 
Việc bạn enable `Gzip` trong nginx sẽ giúp giảm thiều một cách đáng kể độ lớn của các file response này về browser. Hiển nhiên là việc giảm này sẽ giúp website của bạn hoạt động nhanh hơn .

### 1: Compression level.
`Gzip` có rất nhiều cấp bậc nén từ 1 đến 9 . Đi cùng với level càng tăng thì lượng giảm của các file response càng nhiều nhưng các tài nguyên để thực hiện việc nén này lau càng lớn . Theo như tiêu chuẩn thì chúng ta chỉ nên sử dụng từ level 3 đến 5 bởi vì việc tăng mức nén hơn nữa sẽ không đem lại quá nhiều kết quả nhưng lại tốn đáng kể lượng cpu sử dụng để nén nó .

### 2: `gzip_http_version 1.1`

Directive này có ý nghĩa răng `Gzip` chỉ hoạt đôn với `HTTP1.1` hoặc các bản cao hơn .
VÌ sao lại loại bỏ `HTTP 1.0` ở đây bời vì  bản `1.0` không thể cúng sử dụng được `keepalive` hoặc `gzip`. Với version 1.0 này bạn cần phải lựa chọn thứ hữu ích hơn với bạn . Hoặc không sự dụng `gzip` hoặc không dùng `keepalive` (Mình chọn không dung `Gzip`)

### 3: Cấu hình
```
gzip on;               # enable gzip
gzip_http_version 1.1; # turn on gzip for http 1.1 and higher
gzip_disable "msie6";  # IE 6 had issues with gzip
gzip_comp_level 5;     # inc compresion level, and CPU usage
gzip_min_length 100;   # minimal weight to gzip file
gzip_proxied any;      # enable gzip for proxied requests (e.g. CDN)
gzip_buffers 16 8k;    # compression buffers (if we exceed this value, disk will be used instead of RAM)
gzip_vary on;          # add header Vary Accept-Encoding (more on that in Caching section)

# define files which should be compressed
gzip_types text/plain;
gzip_types text/css;
gzip_types application/javascript;
gzip_types application/json;
gzip_types application/vnd.ms-fontobject;
gzip_types application/x-font-ttf;
gzip_types font/opentype;
gzip_types image/svg+xml;
gzip_types image/x-icon;
```

## II, Caching

`Caching` cũng là 1 trong những điều giúp tăng tốc độ các request của user. Để quản lý `cache`chúng ta cần quan tâm đế 2 header :

- `Cache-Control` 
- `Pragma`

`Cache` được chia thành 2 loại :
- `public`  : Cache này cho phép lưu trữ lại 1 file nào đó và có tể tái sử dụng cho nhiều user (Thực tế thì các public cách mình thương dùng cho các file asset của ví dụ như : image, js, css, font ..v...v...)
- `private` : Cache này được chỉ định cho 1 user cô định nào đó (Mình chưa dùng loại này bao giờ nên có ai biết nó dùng như thế nào thì bảo mình nhé)

Để có 1 ví dụ cụ thể hơn, mình sẽ trình bày cách cấu hình cache các file asset và giữ chúng để sử dụng trong vòng 1 tháng. Cụ thể như sau :

```
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
  expires 1M;
  add_header Cache-Control public;
  add_header Pragma public;
}
```

Cấu hình trên nhìn có vẻ đã đầy đủ . Tuy nhiên, thực tế thì nó vẫn còn tiềm ẩn vấn đề khi đưa vào việc khi kết hợp với 1 số thứ khác nữa  . Ý mình ở đây là gzip.

Thực tế bên trên mình cũng đã có nói rằng , `gzip` sẽ có 1 số trình duyệt support còn 1 số trình duyệt thì không. Ta giả sử răng có 2 trinh duyệt :

- Trinh duyệt A : Không Support `gzip`
- Trinh duyệt B : Support `gzip`

Khi A request 1 file asset , với url là `abc.com/style.css` lên server . Lúc này server chưa có cache cho asset này vì vậy server sẽ yêu cầu application của chúng ta trả về file `style.css` , sau đó cache lại và trả dữ liệu về cho browser A.

Tiếp tục, B cũng request asset `abc.com/style.css`  và muốn file trả về là file đã được nén . Tuy nhiên râts tiếc file trả về lại là 1 file thường không cache. Điều đáng buôn là trình duyệt không biết điều này và sẽ cố giải nén và kết quá là nhận lại 1 đống rác. 

Để giải quyết được vấn đề này thực chất thì sau vài đường google mình đã tìm ra phương án, tuy nhiên mình sẽ nói kĩ hơn xíu để mọi người hiểu kĩ hơn . Thực tế với cấu hình như bên trên mình làm , `nginx` nó sẽ tìm trong cache xem có file với key chính là url `abc.com/style.css` . (Nếu có thì gọi từ cache không thì query lên app xong mang vê cache lại với chính key đó)

Và với chỉ cái url này thì nginx nó sẽ không phân biệt đk xem là browser có support gzip hay không. Như vậy để xử lý nó, ta cần chỉ ra cho nginx thấy thêm nữa là browser nó support `gzip`. Và thật tuyệt là đó chính là điều mà `Vary Accept-Encoding;` làm .

Vậy nên config đê tránh lỗi mình đề cập bên trên sẽ là :

```
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
  expires 1M;
  add_header Cache-Control public;
  add_header Pragma public;
  add_header Vary Accept-Encoding;
}
```


## III, Timeouts
`client_body_timeout` vs `client_header_timeout` là các tham số dùng để định nghĩa thời gian mà nginx có thể chờ để trình duyệt gửi nội dung hoăc các header lên . Nếu quá thời gian này, nginx sẽ auto trả về 408 (Request Time-out) error. (Default : 60s)

Ngược lại thì `send_timeout` định nghĩa khoảng thời gian vận chuyển 1 response cho trình duyệt. Chú ý răng tham số này set cho 1 request - response liên tục. Nếu trong khoảng thời gian này mà client không nhận được bất kì thứ gì . Kết nối sẽ bị ngắt

Tuy nhiên nếu bạn setting thời gian này quá dài thì hệ thống của bạn sẽ rất dễ bị tấn công, trong khi khoảng thời gian ngắn thì sẽ cắt đứt với các trình duyệt chấm.

> Thực tế thì client_body_timeout vs client_header_timeout mình rất ít khi thay đổi vì mình nghĩ như vậy là ok rồi
> Khi bạn cần xử lý 1 request mà respose của nó khá năng và tốn nhiều time để xử lý và truyền tải thì sẽ cần quan tâm đến nhiều vấn đề.  `send_timeout` chỉ giải quyết cho bạn vấn đề về `nginx`. Bạn cũng cần xem xét đến time out của ngôn ngữ xử dụng để build app nữa nhé.

## IV,  Buffers
### 1 : client_body_buffer_size

```
client_body_buffer_size       16K;
```

Thông số này cho phép chúng ta chỉ ra kích thước bộ nhớ đệm để đọc body của request gửi lên. Trong trường hợp request body lớn hơn phần kichs thươc này thì một phần của nó sẽ được ghi vào 1 file tạm thời.

Mặc định thì nó có giá trị là 16k (Đủ cho hầu hết các trường hợp)

> Thông số này là điều bạn cần phải sư dụng thực sự cần thận. Nếu đặt quá nhỏ, `nginx` sẽ phải liên tục ghi các phần thưa ra các file tạm thời ảnh hưởng đến performance của hệ thống. Nếu đặt quá lớn thì sẽ đứng trước nguy cơ bị DOS khi mà kẻ tấn công có thể mở tất cả các kết nối nhưng bạn không thể phân bổ bộ đệm trên hệ thống của mình để xử lý các kết nối đó.

### 2 : client_header_buffer_size và large_client_header_buffers

Giống như `client_body_buffer_size` thì `client_header_buffer_size`  cho phép chúng ta chỉ ra kích thước bộ nhớ đệm để đọc header của request gửi lên. Tuy nhiên trong trường hợp header vượt quá mức cho phép thì ta sẽ cần quan tâm đến chỉ số `large_client_header_buffers`.

```
client_header_buffer_size     1k;
large_client_header_buffers   2 8k;
```

`large_client_header_buffers` chỉ ra số lượng các request được phép có header vượt quá `client_header_buffer_size` và  max dung lượng của 1 header .

- Nếu số lượng request (có header dung lượng vượt quá  `client_header_buffer_size`) vượt quá 2 (config theo ví dụ bên trên) thì sẽ trả lại client lỗi 414 (Request-URI Too Large) 
- Nếu request có header vượt quá 8k  thì sẽ trả lại client lỗi 400 (Bad Request)

### 3: client_max_body_size

Thông số này cho phép đặt kích thước tối đa được phép của request body. Tùy thuộc vào việc bạn có muốn cho phép người dùng tải lên tệp hay không, hãy điều chỉnh cấu hình này theo nhu cầu của bạn.

```
client_max_body_size          8m;
```

# Lời kết .
Nội dung bài viết hoàn toàn dựa trên kiến thức và kinh nghiệm thực tế của mình trong việc tăng cường performance của `nginx`. Thực tế thì đây mới chỉ là phần 1 của bài viết của mình, vẫn còn 1 vài tricks nữa mà mình chưa trình bày ở bài viết này (Vì chưa đi vào thực tế và hiểu cách hoạt động của các tricks đó). Vậy nên hẹn gặp lại các bạn trong bài viết sau . Thank you !

# Tài liệu tham khảo 
[https://www.netguru.com/codestories/nginx-tutorial-basics-concepts](https://www.netguru.com/codestories/nginx-tutorial-basics-concepts)

[http://nginx.org/en/docs/http/ngx_http_core_module.html#large_client_header_buffers](http://nginx.org/en/docs/http/ngx_http_core_module.html#large_client_header_buffers)

[https://www.digitalocean.com/community/tutorials/how-to-optimize-nginx-configuration#worker-processes-and-worker-connections](https://www.digitalocean.com/community/tutorials/how-to-optimize-nginx-configuration#worker-processes-and-worker-connections)

[https://nixcp.com/specify-vary-accept-encoding-header-nginx/](https://nixcp.com/specify-vary-accept-encoding-header-nginx/)