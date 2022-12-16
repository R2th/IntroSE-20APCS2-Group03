Vài năm gần đây, số lượng website được tích hợp `HTTPS` đã gia tăng đáng kể, lý do đơn giản bởi có khá nhiều lợi ích từ việc sử dụng https thay cho http. Một trong các lợi ích đó là khi sử dụng https, chúng ta có được lợi thế vượt trội về performance và giúp gia tăng trải nghiệm người dùng trên website.
Bên cạnh việc có khá nhiều lợi ích khi sử dụng https thì việc các chứng chỉ ssl ngày càng rẻ (thậm chí miễn phí) cũng là một trong những lý do chính giúp https ngày càng phổ biến.
Nếu có nhu cầu, bạn có thể tích hợp miễn phí https lên website của mình bằng cách sử dụng chứng chỉ của https://letsencrypt.org/

HTTPS (viết tắt của `Hypertext Transfer Protocol Secure`) là sự kết hợp giữa `HTTP` và giao thức bảo mật `SSL` hay `TLS` cho phép trao đổi thông tin một cách bảo mật trên Internet. Tuy nhiên như thế không có nghĩa là https chỉ mang lại lợi ích về bảo mật, có khá nhiều lợi ích khác mà chúng ta sẽ cùng nhau tìm hiểu dưới đây.

## 1. HTTP/2
Đây là một trong những tính năng mạnh mẽ giúp https trở nên khác biệt. Nếu bạn quan tâm về `performance` hoặc bạn đang có ý định xây dựng một hệ thống CDN cho ứng dụng của mình thì cũng nên tìm hiểu về  HTTP2. Một trong các ưu điểm quan trọng của http2 đó là khả năng server đồng thời nhiều resources (connection coalescing). Phần lớn các website có hệ thống `CDN` lưu trữ static assets trên một domain khác với domain chính. Điều này khiến cho việc chia sẻ HTTP/TCP connection giữa main page và static assets là không thể được và chúng ta buộc phải xem xét đến `connection coalescing`

![](https://images.viblo.asia/a9a802af-05cf-4051-9c29-61894a3081dc.png)


## 2. cache-control: immutable
Một số hệ thống DN sử dụng `content-aware` URLs trong việc serve static assets, điều này có nghĩa là URL của mỗi asset file sẽ chính là một hash đại diện cho nội dung của file đó. Mỗi khi chúng ta cần cập nhật một file resource (css, js, images,...) sẽ làm cho URL của file bị thay đổi. Đối với trường hợp này thì mỗi khi refresh, browser sẽ phải thực hiện thêm một `conditional validation request` và server sẽ phản hồi về  trạng thái 304, công đoạn này là không cần thiết và làm cho cả browser và server phải bận rộn thêm.
Để tránh điều này, chúng ta có thể add thêm header `cache-control: immutable` vào các response của static assets, lúc đó mỗi khi refresh thì browser sẽ không phải gửi thêm check request đến các static files nữa. Hiện tại thì không phải tất cả các browser đều hỗ trợ cache-control: immutable, tuy nhiên thì số lượng browser hỗ trợ đang ngày càng tăng lên. Ở thời điểm hiện tại thì `cache-control: immutable` chỉ được hỗ trợ đối với các HTTPS requests.

![](https://images.viblo.asia/65037583-eb4e-48a0-bfae-4d8c1f6cf0e5.png)

Nguồn: https://hacks.mozilla.org/2017/01/using-immutable-caching-to-speed-up-the-web/

## 3. Broti compression
`Broti` là một định dạng dữ liệu dùng cho `data streaming`, nó là kết hợp giữa thuật toán LZ77 lossless compression, Hufman coding và 2nd order context modelling. Brotli cho khả năng compress nhanh và mạnh hơn so với gzip. Hiện tại khá nhiều công ty lớn đã sử dụng Broti cho service của mình. Tuy nhiên thì vì một số vấn đề liên quan đến bảo mật nên Broti chỉ hỗ trợ với https.
> The reason to limit brotli to secure contexts is that intermediaries (specifically, buggy proxies and content scanners) tend to behave very poorly when they encounter non-deflate/gzip Content-Encoding. The Google guys discovered this when they rolled out ‘sdch’ and ‘bzip2’ before that; they ended up pulling bzip2 partly for that reason and sdch has a number of hacks that they had to put in. By requiring HTTPS for brotli, they can head off this problem in most cases because comparatively few content-scanners MITM HTTPS streams

![](https://images.viblo.asia/dbd4d3be-fb74-4dc2-9bb6-a595070d14d8.jpg)

Nguồn https://twitter.com/addyosmani/status/924348105553620994

#### Dưới đây là bảng so sánh giữa Broti và các kỹ thuật compression khác:

|Compression Method|Requests/Second|Bytes Transferred (MB/s)|Max RSS (MB)|Avg. Latency (ms)|
| ---------------- | ------------- | ---------------------- |----------- |---------------- |
|br-stream         |203	|0.25 |3485.54|462.57|
|lzma              |233 |0.37 |330.29 |407.71|
|gzip              |2276|3.44 |204.29 |41.86 |
|none              |4061|14.06|125.1  |23.45 |
|br-static         |4087|5.85 |105.58 |23.3  |

## 4. Service workers
`Service workers` là script mà browser của bạn có thể chạy background; nó độc lập với webpage và giúp xây dựng những tính năng mà không cần đến sự hiện diện của webpage hay tương tác của user. Hiện tại Service worker bao gồm những tính năng như `push notification`, `background sync`, trong tương lai thì nó có thểm bao gồm các tính năng mạnh mẽ hơn như `periodic sync` hoặc `geofencing`. Service worker có thể được sử dụng để tối ưu khả năng caching, `prefetching`và `navigational behaviors`. Nhưng cũng giống như với `Broti compression`, phần lớn các tính anwng mà Service workers mạng lại đang dần bị hạn chế chỉ cho sử dụng trên https, gần gũi nhất có thể kể đế `push notification`, hiện tại chúng ta không thể làm push notification với http nữa
![](https://images.viblo.asia/83f1752b-e009-496a-aa06-f53a0962c4fa.png)

Nguồn: https://developers.google.com/web/fundamentals/primers/service-workers/

Trên đây là một số lợi ích khi sử dụng HTTPS, bên cạnh lợi ích về mặt bảo mật thì những lợi ích này sẽ giúp chúng ta xây dựng nên những ứng dụng web mạnh mẽ hơn, mang lại nhiều trải nghiệm tốt hơn cho web user.

Tài liệu tham khảo:

https://viblo.asia/p/toi-uu-tai-trang-voi-http2-server-push-va-nodejs-63vKjaqk52R

https://daniel.haxx.se/blog/2016/08/18/http2-connection-coalescing/

https://hacks.mozilla.org/2015/11/better-than-gzip-compression-with-brotli/

https://www.ebayinc.com/stories/blogs/tech/beyond-https/

https://www.telerik.com/blogs/understanding-http-304-responses