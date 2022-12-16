Mở màn trong loạt bài chia sẻ tham dự event **MayFest** lần này, mình xin chia sẻ một số hiểu biết về **`HTTP Compression`**. Hi vọng kiến thức về nó sẽ giúp bạn tối ưu `website` để chúng chạy nhanh hơn.

Đối với một trang web nào đó thì tốc độ luôn là yếu tố được quan tâm hàng đầu. Thật khó để níu chân user khi một `request` lên `server` của người dùng, họ phải đợi vài chục giây để đợi có `response` trả về, hoặc đơn giản là mãi không thoát khỏi cái `loading indicator` quay tròn tròn trước sự bất lực.

Dù bạn đã cố gắng `optimize` code, `caching`các file tĩnh để mỗi khi có `request` lần thứ hai không phải lên `server`lấy `file` về, hay đã viết `sql` tối ưu để tăng thời gian truy xuất dữ liệu từ `database`. Tuy nhiên khi hiểu biết về `HTTP Compression` cũng sẽ giúp trang `web` của bạn tốc độ tốt hơn.

Trước tiên chúng ta cùng nhìn lại một lần nữa cách mà một trang web đang hoạt động. Cuộc nói chuyện giữa `client` và `server` sẽ diễn ra như sau.

**Client**: *Ê ! lấy cho mình xin cái file có tên `index.html`*

**Server**: *Chờ chút tao tìm, à đây rồi file `index.html` của mày đây, dung lượng file là 100kb nhé, do file hơi nặng nên quá trình di chuyển khó khăn vui lòng đợi 3s.*

**Client dễ tính**: *Ok, tao đợi được !!!*

Vâng đấy là client dễ tính thôi. Còn `client` khó tính thì sao nhỉ.

**Client khó tính**: *3s cơ à, lâu quá, có cách nào giảm dung lượng file để di chuyển nhanh hơn không ?*


![](https://images.viblo.asia/5b09d430-a2db-4ab3-a861-a9ab4357587c.png)

Và thế là **`HTTP Compression`** ra đời.

# 1. HTTP Compression là gì?

`HTTP Compression` là một kĩ thuật có thể tích hợp vào `web servers` và `web clients` để cải thiện tốc độ truyền và sử dụng băng thông bằng cách `nén` các file ở server nhằm giảm dung lượng file, giúp quá trình gửi xuống client trở lên nhanh hơn.


![](https://images.viblo.asia/8f49b80e-4f22-47db-835b-457d7ef04d1a.png)

**Client**: *Ê ! lấy cho mình xin cái file có tên `index.html`*

**Server**: *Chờ chút tao tìm, à đây rồi file `index.html` của mày đây, tao đang cố gắng nén chúng để quá trình gửi file diễn ra nhanh hơn*

**Client**: *Làm việc tốt đó anh bạn, tao chỉ mất có 1s để nhận về file, và giờ sẽ giải nén nó, nhưng mà khoan, mày nén lại bằng thuật toán gì thế ?*

**Server**:  *Quên mất tao nén bằng gzip, vậy lần sau mỗi khi gửi tao sẽ gửi kèm thuật toán nén để mày dễ giải nén nhé*


Đây là cách cơ bản nhất để giải thích quá trình nén, giải nén của 2 bên. Sau đây chúng ta sẽ đi chi tiết xem nó hoạt động ra sao nhé.

# 2. Các loại HTTP Compression
Có hai loại **HTTP Compression** là **compression End-to-end** và **compression Hop-by-hop** . Trong đó nén `end-to-end` phổ biến hơn cả. Chúng ta cùng đi tìm hiểu về 2 loại này nhé

## 2.1. End-to-end compression

**Nén end-to-end** là phương pháp cải thiện hiệu suất đáng kể của trang web. Toàn bộ phần body của `message` sẽ được nén trên `server` sau đó được gửi tới `client`. File nén này sẽ không thay đổi trong quá trình gửi về `client`, dù có thể đi qua những `nodes trung gian`(Mình sẽ giải thích ở phần sau cách nodes này).

![](https://images.viblo.asia/3f5bf341-df17-4efa-8373-bb5f29b2f505.png)


Các `trình duyệt` và `server` hiện đại đều hỗ trợ các phương pháp nén và điều duy nhất cần quan tâm là thuật toán nén để sử dụng.

Trong những năm 1990, công nghệ nén đã phát triển với tốc độ chóng mặt và nhiều thuật toán kế tiếp đã được thêm vào tập hợp các lựa chọn khả thi. Hiện nay có 2 thuật toán được sử dụng nhiều nhất là `gzip` và `br`.

Để lựa chọn phương pháp nén, trình duyệt và `server` sử dụng cơ chế [content negotiation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation) bằng cách `trình duyệt` gửi cho `server` thuật toán nén thông qua`Accept-Encoding` header với các thuật toán hỗ trợ và thứ tự ưu tiên từ trái qua phải. Sau đó server sẽ chọn một trong số đó, sử dụng thuật toán đó để nén `body` sau đó thông báo lại cho trình duyệt thuật toán mình đã sử dụng thông qua `Content-Encoding` header



>  Content negotiation là cơ chế được sử dụng để phục vụ các biểu diễn khác nhau của resource tại cùng một URI, để `user agent` có thể chỉ định cái nào phù hợp với người dùng(Ví dụ như định dạng ảnh, mã hõa nội dung dạng nào)

![](https://images.viblo.asia/312c4548-b87f-438c-bac5-c29df6328b9b.png)

Cuộc nói chuyện giữa client và server sẽ diễn ra như sau.

**Client**: *Tao chỉ có khả năng giải nén thuật toán `br` và `gzip`, vì `br` là thuật toán tao giỏi hơn nên ưu tiên cái đó nhé ? Vui lòng đọc thêm ở Accept-Encoding để biết các thuật toán tao có thể giải nén*.

**Server**: *Tao đọc được thông rồi nhé, tao gửi thông tin thuật toán tao đã sử dụng để nén và note tại Content-Encoding ở response, đọc ở đó để áp dụng thuật toán giải nén phù hợp nhé.*

Nhưng thực tế ngay cả khi `client` và `server` đều hỗ trợ thuật toán nén giống nhau,`server` vẫn có thể không nén phần `body` của response. Hai trường hợp phổ biến dẫn đến điều này là:

*  `Data` gửi đến đã được nén và lần nén tiếp theo không làm kích thước file nhỏ hơn kích thước ban đầu. Điều này xảy ra khi nén một số định dạng ảnh
* `Server` bị quá tải và không đủ tài nguyên để chạy do một tác vụ nén được yêu cầu. Trên thực tế, `Microsoft` khuyến cáo không nên nén nếu server đang sử dụng nhiều hơn 80% công suất của nó.

## 2.2. Hop-by-hop compression
Khác với nén `end-to-end`, `hop-by-hop` là quá trình nén xảy trên các `node`, khác với việc nén `end-to-end` trên `server`.

![](https://images.viblo.asia/11e4f646-664b-4236-b7d7-6e592d445c1f.png)


Trên thực tế trên các kết nối giữa các node này có thể sử dụng các thuật toán nén khác nhau. Để làm được việc này, HTTP cũng sử dụng cơ chế [content negotiation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation) như đã đề cập ở phần nén `end-to-end`. 


![](https://images.viblo.asia/a201b75c-9df1-4b79-97f4-c042ade842f9.png)

Như sơ đồ trên, các bạn có thể thấy vài điểm khá giống nén `end-to-end` về cách hoạt động. 
Giữa các node này cũng nói chuyện với nhau bằng cách `TE` và `Transfer-Encoding` về các thuật toán mã hoá.

Câu chuyện diễn ra như sau:

**Client A**: *Ê ! lấy cho mình xin cái file có tên index.html*

**Node 1**: *Có một yêu cầu file của client, T có thể giải nén bằng gzip trước khi gửi cho client, m nén file này khi nhận từ server nhé*

**Node 2**: *Oke, tao đã lưu lại thuật toán m có thể giải nén, tao sẽ forward tiếp request lên server để lấy file về*

**Server:** *Tao gửi file về node 2 rồi nhé, kích thước 100kB*

**Node 2:** *Tao đã nén lại bằng thuật toán gzip và gửi về cho Node 1*

**Node 1:** *Tao đọc từng Transfer-Encoding được mày nén bằng br rồi, tao sẽ giải nén chúng trước khi gửi về client*.

Do việc cấu hình `Transfer-Encoding` không dễ đối với các `server` **Apache**, **Nginx** nên nén `hop-by-hop` khá ít được sử dụng, cấu hình này thường được sử dụng ở cấp `proxy`.

# 3. Cấu hình HTTP Comperssion với Nginx
Mặc định một số server `nginx` đã cấu hình nén dạng gzip, bạn xem qua tại file `etc/nginx/nginx.conf` sẽ cấu hình mặc định như sau 

```php
	##
	# Gzip Settings
	##

	gzip on;
	gzip_disable "msie6";

	# gzip_vary on;
	# gzip_proxied any;
	# gzip_comp_level 6;
	# gzip_buffers 16 8k;
	# gzip_http_version 1.1;
	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```
Mặc định đã cấu hình sẵn `gzip on` và `gzip_disable "msie6";`. Để custom cấu hình giúp tối ưu hoá việc nén **vui lòng bỏ comment tất cả các lệnh bên trên**, mình sẽ giải thích qua một chút các câu lệnh.

* **gzip on**: Tất nhiên rồi, bật mode nén gzip
* **gzip_disable "msie6"**: Vô hiệu quá việc nén đối với các `User Agent` không support việc giải nén. Cụ thể ở đây là `Internet Explorer before version 6 SV1`, có thể các bạn không biết `msie6` là `special mark` của biểu thức chính quy `MSIE [1-6]\.(?!.*SV1)"`.

* **gzip_vary on:** Đặt response header `Vary: Accept-Encoding`. Một số `proxy` có một lỗi ở chỗ chúng phục vụ nội dung nén cho các trình duyệt không hỗ trợ. Việc cài đặt này giúp proxy lưu cả file có nội dụng đã được nén và chưa được nén.
* **gzip_proxied**: Any cho phép xử lí toàn bộ các request đến từ client.
* **gzip_comp_level 6:** Đây là mức đội nén, 1 là ít nhất, 9 là nhiều nhất. Bạn sẽ phải đánh đổi giữa việc nén và tiết kiệm CPU để đưa ra mức độ nén phù hợp.
* **gzip_buffers 16 8k**: Setting số lượng và kích thước của nén buffers. Mặc định là 4 4k.
* **gzip_http_version 1.1**: Cho phép nén ở HTTP version 1.1. Vì một số config không thể cài đặt ở những version HTTP thấp.
* **gzip_types**: Các định dạng file có thể nén. 


Sau khi bỏ comment các config đi thì kết quả test khá ấn tượng. Mình test việc cấu hình bằng cách sử dụng công cụ kiểm tra [gzip oneline](http://www.gidnetwork.com/tools/gzip-test.php) kết quả thu được như sau.

**Tắt cấu hình nén:**

![](https://images.viblo.asia/9a209b8f-1cf3-432e-be83-2a4f15948411.png)

**Cấu hình nén mặc định:** 

![](https://images.viblo.asia/72e55973-bee1-4056-9d22-767551f749bc.png)


**Cấu hình nén custom:**

![](https://images.viblo.asia/83ed1cda-c57c-4faa-975e-072f9ac1ba5b.png)




Nhìn qua kết quả khi test có thể thấy cấu hình nén mặc định giảm xuống còn `1410 byte` nhưng khi custom thêm thì giảm được `1378 byte`.

Sử dụng công cụ đo tốc độ [Page Speed](https://developers.google.com/speed/pagespeed/insights/) kết quả như sau


**Tắt cấu hình nén:**
![](https://images.viblo.asia/5a783298-b5dc-47d0-9084-e9ea1033e73c.png)



**Cấu hình nén mặc định:** 
![](https://images.viblo.asia/b7121afb-af3e-43f4-a223-bc74049a2145.png)





**Cấu hình nén custom:**

![](https://images.viblo.asia/21a5da13-9cc3-4853-a5cf-921e9289fe29.png)


Vậy là đã cải thiện được kha khá =)))
# 4. Tổng kết
Như vậy là mình đã giới thiệu qua về cách `HTTP Compression` hoạt động cũng như tác dụng của nó trong việc tăng tốc độ website. Tuy nhiên khi cấu hình cầu lưu ý một số điểm giúp mình

* **Trình duyệt cũ:** Mặc dù đã sử dụng `gzip_disable` nhưng cũng không lường trước được việc người dùng sẽ sử dụng trình duyệt cũ. Dẫn đến việc file không được giải nén, dẫn tới lỗi trong `website`.
*  **Nội dung nén:** Hầu hết ảnh, video đã được nén. Đừng cố gắng nén chúng lần hai. Chỉ nên nén html, css, js.
*  **CPU-load:** nén nội dung khi nhận được yêu cầu sẽ tiêu tốn thời gian của CPU và tiết kiệm băng thông. Thường thì đây là sự đánh đổi tốt nếu biết tốc độ nén. Có nhiều cách để nén trước các nội dung tĩnh và gửi các bản nén này. Việc này cần được cấu hình thêm; cho dù không thể thì việc nén nội dung trả về vẫn là điều tốt. Sử dụng CPU cho người dùng có trải nghiệm nhanh hơn cũng khá là đáng, khi sự chú ý không đáng kể.
# 5. Tham khảo
Cảm ơn các bạn đã theo dõi bài viết, nếu thấy hữu ích vui lòng upvote để ủng hộ mình nhé. Hẹn các bạn ở những vài viết lần sau.

Bài viết có tham khảo 

* [Compression in HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Compression)
* [Cách tối ưu trang web của bạn với nén Gzip](https://viblo.asia/p/cach-toi-uu-trang-web-cua-ban-voi-nen-gzip-XL6lAwwRKek)
* [Module ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_vary)
* [Một số mẹo nhỏ vụn vặt giúp cải thiện trang web của bạn](https://viblo.asia/p/mot-so-meo-nho-vun-vat-giup-cai-thien-trang-web-cua-ban-ByEZkvPAKQ0#_nen-tai-nguyen-cua-ban-tu-phia-server-truoc-khi-gui-no-toi-trinh-duyet-3)