Bài đầu tiên trong series này, tôi sẽ điểm lại một vài nội dung cơ bản nhất để các bạn chưa biết đến kỹ thuật Page Cache cũng có thể nắm được. Các bạn nào đã biết thì cũng có thể đọc cho vui rồi cho tôi xin góp ý bằng cách comment xuống phía dưới nha.

## Page cache là gì?

Page Cache hay Page-level caching là kỹ thuật lưu lại toàn bộ mã HTML trong response, và dùng nó làm response cho các request tiếp theo chứ không cần phải render lại HTML cho cùng một trang nữa. Hành động lưu lại nội dung như vậy được gọi là `cache`.

![](https://images.viblo.asia/bdcd8452-160e-4949-82b7-c8dd8b781b0e.png)

Như vậy:
- Tại lần phục vụ Request đầu tiên, toàn bộ website sẽ xử lý và render HTML như bình thường.
- Từ Request thứ hai, response time được rút ngắn rất nhiều khi web server không phải thực hiện backend logic mà chỉ lấy HTML được cache ra để bỏ vào Response.

## Thuật ngữ sử dụng

### TTFB

Ngắt mạch văn một xíu nhưng code web lâu rồi có thể đã biết điều này?

Khi người dùng truy cập website, server của bạn sẽ thực thi và trả trả về 1 HTML Response. Các mã HTML này sẽ được browser phân tích và vẽ lại thành giao diện để hiển thị trên trình duyệt.

Khoảng thời gian từ khi người dùng (hay gọi là client) gửi request đi cho tới thời điểm byte dữ liệu đầu tiên của trang được nhận bởi browser của client được gọi là **TTFB (Time To First Byte)**. 

Bạn có thể mở Devtool của browser (F12) > chọn tab Timing > bạn sẽ thấy chỉ số TTFB của một request giống như trong ảnh.

![image.png](https://images.viblo.asia/18f44f21-3351-4b6b-9319-0d2761063711.png)

- Request sent: thời lượng để request được gửi đi
- Waiting: TTFB
- Content Download: thời lượng để browser tải hết response về.

> *TTFB: số liệu nhỏ hơn thì tốt hơn.*

### Cache

Cache là kỹ thuật lưu lại dữ liệu của lần xử lý trước đó dùng nó làm kết quả cho lần xử lý tiếp theo.

### TTL

TTL là viết tắt của Time To Live - là thời gian còn hiệu lực của dữ liệu được cache. VD: TTL 5 phút, nghĩa là dữ liệu sẽ được cache và có hiệu lực trong vòng 5 phút. Sau 5 phút, dữ liệu đã cache sẽ bị hết hạn và bị xóa đi.

## Làm sao để đo lường?

Một câu hỏi đặt ra là: *Nếu tôi áp dụng page cache thì làm sao để tôi biết website đã thực sự nhanh hơn, hay chỉ là cảm quan đánh giá?*

Đúng là chúng ta sẽ dùng cảm quan để đánh giá thật. Khi truy cập, nếu bạn thấy nhanh thì nó thực sự đã nhanh hơn :D

Đùa xíu thôi, bạn có thể căn cứ vào TTFB và Response time để theo dõi và kiểm tra sự cải thiện khi có page cache. Xịn sò hơn tí, bạn có thể phân tích access logs rồi visualize lên Grafana để monitor và đánh giá.

![image.png](https://images.viblo.asia/9bf9a8cd-8aad-4a2c-998d-ea34b70ecd05.png)

Nếu bạn có đang dùng các dịch vụ ngoài để monitor uptime thì cũng thường sẽ có cả monitor về response time để bạn theo dõi. Chẳng hạn như Viblo có trang https://status.viblo.asia

![image.png](https://images.viblo.asia/07e86ba6-bd1a-410d-b5d7-3a4ac707b87a.png)

Nhìn vào status page của Viblo, response time trung bình được tính toán ra là 245ms, bạn thấy con số này có đúng không, hãy comment xuống phía dưới bài viết này quan điểm của bạn nhé? :D

## Tại sao lại cần page cache?

Như đã đề cập, page cache sẽ giúp server không phải xử lý lại phần backend logic. Tôi liệt kê tạm một số điểm lợi ích khi có page cache như:
- Giảm chỉ số performance Time To First Byte (TTFB)
- Truy cập có cache sẽ load trang nhanh hơn.
- Tạo ấn tượng và trải nghiệm tốt hơn tới end-user khi trang web tải nhanh hơn. 
- Handle được nhiều request hơn vì web server bỏ qua việc phần backend logic mà lấy luôn response đã cache ra dùng
- Giảm nguy cơ downtime - tôi lấy ví dụ vì vấn đề nào đó database gặp sự cố khiến web app bị lỗi. Tuy nhiên, do có page cache nên khi truy cập, người dùng vẫn truy cập được website.

Theo số liệu từng thống kê của Google, 50% khách truy cập sẽ rời bỏ trang nếu tải trang quá 3s. Khách rời đi thì đồng nghĩa doanh thu giảm và điển hình là ví dụ từ Bing. Vậy bạn nghĩ sao nếu response time trên website của bạn giảm xuống còn ~100ms? Quả là thú vị phải không nào :D

## Phân loại

Có nhiều cách để thực hiện page cache, và trong series này tôi sẽ đề cập tới 3 kiểu làm page cache gồm:
- Application cache
- Web server cache
- CDN cache

Mỗi một cách thực hiện sẽ lại có ưu nhược điểm riêng. Cũng có thể có nhiều cách khác và xịn sò hơn nhưng trong phạm vi series này tôi sẽ chỉ xoay quanh 3 cách trên.

## Tổng kết

Trên đây là bài mở đầu nhầm giới thiệu về kỹ thuật page cache. Với mục tiêu dễ dàng thực hiện nhất và mang lại hiệu quả cao so với công sức bỏ ra. Hãy upvote cho bài viết, series và follow tôi đề đón chờ bài viết tiếp theo của tôi nhé.

Comment ý kiến của bạn vào bài viết nếu bạn có thắc mắc/góp ý để cùng nhau trao đổi trên tình thần giúp nhau cùng phát triển. Hẹn gặp lại các bạn trong bài viết sắp tới.

Phần tiếp theo: https://viblo.asia/p/tang-toc-website-su-dung-page-cache-application-cache-6J3ZgaBB5mB

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***