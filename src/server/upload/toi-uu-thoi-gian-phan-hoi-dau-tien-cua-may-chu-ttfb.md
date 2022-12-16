## Mở đầu
Wordpress là một **cms** mã nguồn mở cực kỳ phổ biến cho phép người dùng có thể tạo một blog dễ dàng. Nhưng giờ đây wordpress đã có thể làm hơn cả thế, nó có thể là 1 shop bán hàng, 1 landing page quảng bá sản phẩm, hình ảnh cho công ty nào đó. Nói đến bán hàng và landing page thì hẳn dân **Sale** hoặc những người **SEO top google** sẽ rất quan tâm đến tốc độ, điểm số pagespeed của website phải không ? Vâng tạo thì hẳn là quá dễ rồi vì giờ có cực kỳ nhiều plugin chỉ việc download và ấn kích hoạt là ta đã có thêm một chức năng như mong muốn, nhưng đôi khi nó cũng sẽ khiến website của ta chạy chậm đi, từ đó điểm pagespeed giảm xuống, SEO top google bị tụt. khách hàng search không ra website, ... Có khá nhiều hệ lụy và quan trọng nhất đó là theo thông kê thì nếu website của bạn load quá 3s thì 80% khách hàng sẽ bỏ đi. Vậy trong series này mình sẽ mang đến cho các bạn các cách để tối ưu website tốt hơn nhé.

Đầu tiên, khi thấy một website bị chậm. Ta cần đặt vấn đề tại sao nó lại chậm như rùa vậy ? Oke, có một số công cụ giúp các bạn điều này một cách chi tiết :
1. [GTMetrix](https://gtmetrix.com/)
2. WebPagetest.org
3. [Google Pagespeed](https://developers.google.com/speed/pagespeed/insights) (mình hay sử dụng cái này, và khách cũng đa số dùng cái này để đánh giá. Hàng của google mà :smile:
4. Cuối cùng là Google chrome Dev tools (quá đầy đủ luôn nếu bạn là dev).

Đó là các công cụ mình hay dùng. Nếu bạn thấy công cụ nào hay hơn hãy comment bên dưới nhé.

Thử phát luôn nhé:
![](https://images.viblo.asia/86ac4ba8-cfff-44d5-b8fe-ac4b388b5716.png)
Như các bạn thấy, google đánh giá website của mình trên mobile là 48 điểm. 
còn trên desktop là 74 điểm. 
Số điểm ở mức trung bình theo thang đánh giá của google. Tạm tạm, cơ mà mình muốn tối ưu hơn thì làm thế nào nhỉ?
Các bạn để ý phần **Lab Data** cho chúng ta thấy các lỗi, điểm cần tối ưu của website, từ đó ta có thể tìm cách khắc phục chúng.
Theo kinh nghiệm của mình thì các website sẽ thường cần tối ưu như sau 
1. Tối ưu Thời gian phản hồi đầu tiên của máy chủ (TTFB)
2. Tối ưu hóa + trì hoãn tải hình ảnh
3. Nén và nối các tệp tin css js lại với nhau
4. Trì hoãn tải css, js + Tạo css quan trọng
5. Hỗ trợ ảnh với định dạng Webp
6. Sử dụng bộ nhớ đệm trình duyệt
7. Xử lý font chữ
8. Gỡ WP Emoji
9. DNS Prefetch (Tìm nạp trước DNS)
10. Gỡ bỏ query string ở các file tài nguyên tĩnh (css, js, img, …)
11. Cân nhắc loại bỏ các mã bên thứ ba (google, facebook, ... )
12. Bỏ WooCommerce Ajax Cart Fragments

# Tối ưu Thời gian phản hồi đầu tiên của máy chủ (TTFB)
Một vấn đề muôn thủa mà hầu như mọi web dùng WordPress đều gặp phải. Đó chính là hiệu suất.

### Chọn đơn vị thuê Hosting
Đây là một vấn đề cực kì quan trọng nha! Trước khi chọn thì bạn cần quan tâm những điều sau

Hỗ trợ các phiên bản PHP mới nhất.
Hiện tại phiên bản php mới nhất là php74.

Lưu ý rằng WordPress bản mới nhất chỉ hỗ trợ php56 trở lên. Php7 có hiệu suất cao hơn php5 rất nhiều lần (quên mất chính xác là bao nhiêu lần rồi). Vậy nên việc chọn nhà cung cấp hosting có phiên bản php mới là cực kỳ quan trọng.

### Sử dụng LiteSpeed Server
LiteSpeed đi kèm với LiteSpeed Cache là cache có tốc độ xử lý + chịu tải ngon nhất hiện giờ rồi. Nhất là plugin LiteSpeed Cache đi kèm tuyệt vời ông mặt trời. Sẽ thật tiếc nếu hosting bạn chọn sử dụng Apache thay vì LiteSpeed

### Server đặt trong nước
Hãy ưu tiên các đơn vị cung cấp hosting uy tín trong nước. Nhiều bạn có vẻ chê hosting trong nước tệ hơn các đơn vị nước ngoài. Đúng vậy, có thể đơn vị trong nước không bằng thật, nhưng chất lượng của chúng ta cũng chả kém họ đâu. Khoảng cách về vị trí địa lý sẽ quan trọng hơn rất nhiều so với hơn thiệt một chút giữa đơn vị trong và ngoài nước.

### Có hỗ trợ Object Cache
Object ở đây là gì? Cái này bạn tự tìm hiểu thôi. Cơ bản cứ thấy Memcache hay Redis là được.

Mình cũng muốn nhắc các bạn chút xíu. Có rất nhiều bạn nhầm lẫn giữa extension redis-memcache của php và redis socket. Hai cái này có sự khác biệt rất lớn nha.

Redis extension nó là 1 extension của PHP để kết nối với Redis. Redis Socket ngon hơn so với Redis kết nối qua TCP/IP

Và theo mình biết thì số đơn vị triển khai được Redis-Memcache qua socket rất ít. Tại Việt Nam thì mình có biết được TinoHost và Inet, số còn lại thì không rõ nữa.

### Chọn Theme hỗ trợ cho bán hàng
Cứ lên ThemeForest vào tìm các theme bán chạy nhất mà phang thôi. Xin ít đánh giá từ cộng đồng nữa là ổn.
### Sử dụng Cache
Tùy theo hosting của bạn mà chọn loại cache phù hợp thôi.

Nếu hỗ trợ LiteSpeed: Thì cứ plugin Litespeed Cache mà chơi thôi

Còn lại
- Trang web cỡ nhỏ : **Plugin Rocket Cache**
- Trang cỡ Trung bình: **W3 Total Cache**
- Trang cỡ lớn: **Đừng có dùng WordPress** (markdown mà cho set font thì mình set font cho cái này là 1000px nhé)
Sử dụng Object Cache
Hãy sử dụng Redis hoặc Memcache. Mà cái này nói sau đi, cache củng cũng nên là một bài viết riêng chứ không qua loa được.

Áp dụng vào trang web http://bonies.arrow-silver.xyz/
Nói qua đôi chút về hosting mình đang sử dụng. À, có thể trước đây bạn đã nhầm lẫn. Hosting là khái niệm chung chỉ nơi lưu trữ cho trang web. Vậy nên VPS là một hosting, chỉ có điều con hosting (vps) này là bạn tự cấu hình vận hành thôi. Có lúc mình gọi con vps mình đang chạy cho website này là hosting cũng đừng bất ngờ nhá!

Đối với http://bonies.arrow-silver.xyz/ mình sử dụng Rocket Cache cho pagecache và Redis cho Object Cache.

Tại sao lại sử dụng Rocket Cache?

Rocket cache có một cái khá ngon là dễ sử dụng cho người dùng và cung cấp đầy đủ tài liệu, lớp hỗ trợ cho dev. Thêm vào thì nó cũng khá đầy đủ tính năng của plugin cache. VPS mình cũng cài đặt Nginx-rocket để việc cache không cần php xử lý, giúp quá trình cache nhanh hơn và giảm tài nguyên sử dụng.

Chỉ với các trang web cỡ vừa và nhỏ chúng ta mới nên sử dụng plugin này thôi còn không thì chúng ta nên sử dụng W3 Total Cache có hỗ trợ Cache trên ram (Redis, Memcache). Hoặc LiteSpeed có hệ thống cache độc lập riêng.

Tại sao lại sử dụng Redis?

Để sử dụng được redis, trước tiên hosting của chúng ta phải hỗ trợ redis đã. Còn tại sao lại không sử dụng Memcache mà lại dùng redis?

Cái này chả biết nữa. Redis hay Memcache có nguyên lý sử dụng như nhau à, đều cache trên ram. Vấn đề là Redis mới hớn, mình thì vẫn thích những cái gì mới. Redis cũng được đánh giá tốt hơn đối với csdl lớn.

Lưu ý một điều là Redis cần nhiều tài nguyên sử dụng hơn Memcache nhé.

### Cài đặt plugin Redis
Để cài đặt thì bạn vào phần thêm plugin trên admin -> tìm Redis Object Cache và thêm vào thôi. Không thì sử dụng link này

Sau khi cài đặt và kích hoạt Redis Object Cache. Đây là những thứ thay đổi:

- Giảm số lượng query
- Tỉ lệ trúng cache có thể lên tới 99,9%
### Kết
Về thời gian phản hồi  từ máy chủ <300ms là ngon rồi. 
Nếu ai có cách khác comment ae cùng biết với nhé.

**Cre**: [Tham khảo](https://twitch.vn/woo/toi-uu-thoi-gian-phan-hoi-dau-tien-cua-may-chu-ttfb/)