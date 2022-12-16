Chào mừng mọi người trở lại với chương trình "Mỗi thứ một tí" :no_mouth: Hôm nay chúng ta sẽ cùng tìm hiểu 1 chút về `HTTP2`. Có thể mọi người đã từng nghe về nó, và thực sự thì ở thời điểm hiện tại HTTP2 cũng không còn quá xa lạ. Hầu hết các ông lớn đều đã sử dụng HTTP2 như Google, Youtube, Facebook... Mà chẳng nói đâu xa Viblo cũng đang dùng luôn

![](https://images.viblo.asia/f8913fa0-9e74-48e1-9a08-b260b605f37e.png)

Vậy cái HTTP2 là cái gì :question: Có ăn được không :roll_eyes: Chúng ta sẽ cùng tìm hiểu ngay bây giờ.

## Lịch sử HTTP
![](https://images.viblo.asia/fe5b8a42-068c-4434-959a-40726572aa59.jpg)

>>> HTTP aka HyperText Transfer Protocol (Giao thức truyền siêu văn bản) là cách mà trình duyệt của bạn giao tiếp với máy chủ web của trang web bạn đang truy cập.
>>> 

Có nhiều cách để hai (hoặc nhiều) máy tính giao tiếp với nhau qua Internet, HTTP chỉ là một cách được sử dụng để duyệt web.

Phiên bản HTTP chính thức đầu tiên (HTTP 1.0) được phát hành vào năm 1996 dưới dạng [RFC](https://en.wikipedia.org/wiki/Request_for_Comments) [1945](https://tools.ietf.org/html/rfc1945).

Với sự phát triển nhanh chóng của web, với nhiều thành phần hơn css, js... đồng nghĩa với việc chúng ta sẽ cần nhiều tài nguyên hơn và có trường hợp sẽ phải tải đồng thời nhiều tài nguyên. Điều mà khi thực hiện bằng cơ chế `1 connection / 1 tài nguyên` của HTTP 1.0 sẽ không đạt được sự tối ưu về băng thông.

Năm 1999 phiên bản HTTP/1.1 được phát hành để giải quyết vấn đề trên với khái niệm về pipelining. Sau đó phiên bản HTTP/1.1 tiếp tục được update và sử dụng cho đến thời điểm hiện tại. 

Tuy đã được cải thiện, nhưng pipelining không hoàn toàn giải quyết được vấn đề của HTTP/1.0. Trong khi mọi người cảm thấy "vẫn cứ là ok :ok_hand:" thì ở Google người ta cảm thấy là "không ok lắm :roll_eyes:", và thế là họ đã cho ra đời một giao thức mới mang tên [SPDY](https://en.wikipedia.org/wiki/SPDY) nhằm cải thiện thời gian tải trang. SPDY đạt được mục tiêu giảm thời gian tải trang bằng các công nghệ *nén (compression), ghép kênh (multiplexing) và ưu tiên (prioritization)*. Tháng 7 năm 2012, nhóm phát triển SPDY công khai răng nó đang được phát triển theo hướng tiêu chuẩn hóa. Các trình duyệt Chromium, Mozilla Firefox, Opera, Amazon Silk, Internet Explorer và Safari cũng đã triển khai SPDY. 

Ngay khi được triển khai SPDY đã cho thấy sự cải thiện đáng kể so với HTTP/1.x và sự quan tâm đến từ các nhà phát triển như Firefox và nginx. Không lâu sau đó những nhà phát triển đã bắt đầu thảo luận về HTTP/2. Sau một quá trình kêu gọi và lựa chọn các đề xuất, SPDY/2 đã được chọn làm cơ sở cho HTTP/2. Kể từ đó, đã có một số thay đổi, dựa trên thảo luận trong nhóm làm việc và phản hồi từ những implementers.
Đến tháng 5 năm 2015, HTTP/2 specification đã được công bố dưới dạng [RFC 7540](https://tools.ietf.org/html/rfc7540).
## HTTP/2 :question: 
>>> HTTP/2 là phiên bản chính thức tiếp theo của giao thức HTTP, nhằm cải thiện tốc độ tải trang và hiệu suất khi duyệt web.
>>> 
## Không update HTTP/2 có sao không :question:
Thực tế thì nếu không update HTTP/2 thì cũng chả sao cả, "mọi thứ vẫn cứ là ok :ok_hand:". Các trình duyệt hiện tại mặc định vẫn sử dụng HTTP/1.1, nếu server cài đặt hỗ trợ HTTP/2 thì mới sử dụng HTTP/2.
## Thế sao phải quan tâm :roll_eyes:
Nói chung là nếu bạn đang sử dụng web thì nên quan tâm.

Ở phương diện người dùng, HTTP/2 giúp tận dụng tối đa băng thông và cho một trải nghiệm duyệt web tốt hơn. Nếu vào một site mà không hỗ trợ HTTP/2 tức là họ đang lãng phí bằng thông của bạn, mà lãng phí là không tốt :roll_eyes:

Ở phương diện developer, HTTP/2 hỗ trợ cung cấp trải nghiệm sẳn phẩm tốt hơn, thời gian tải trang nhanh hơn giúp tăng thứ hạng trong các công cụ tìm kiếm => Tăng khả năng thành công của sản phẩm. Mà thành công thì ai chả thích :dollar: 
## Đặc điểm HTTP/2
Mặc dù không cần biết đến những thứ này chũng ta vẫn có thể xài HTTP/2 như thường, nhưng biết một chút vẫn tốt hơn là cứ nhắm mắt dùng.

Như đã đề cập phía trên, mục tiêu của HTTP/2 là cải thiện tốc độ tải trang, chúng ta sẽ cùng tìm hiểu một số  đặc điểm giúp HTTP/2 đạt được mục tiêu này.

### Ghép kênh (Multiplexed)
Đầu tiên chúng ta cần đề cập đến kỹ thuật Multiplexed, thứ mà đã giải quyết vấn đề [“head-of-line blocking”](https://en.m.wikipedia.org/wiki/Head-of-line_blocking) tồn tại thừ HTTP/1. Để dễ hiểu hơn về vấn đề này, hãy tưởng tượng việc chúng ta vào website như vào 1 nhà hàng vậy. Và khi vào nhà hàng, ví dụ chúng ta sẽ gọi 10 món, hãy xem cách mà nhà hàng phục vụ chúng ta ở từng phiên bản:
- HTTP/1: Mỗi 1 người phục vụ sẽ chỉ nhận 1 order và mang lên đúng món đó, không nhận thêm bất cứ ordẻ nào nữa. Như vậy với 10 món, chúng ta sẽ phải gọi đến 10 ông phục vụ. Nhà hàng vừa tốn tiền thuê nhân công, mà mình thì tốn thời gian gọi mỏi mồm mới order đủ món, dỗi vl :roll_eyes: 
- HTTP/1.1: Rút kinh nghiệm lần trước, nhà hàng training mấy ông phục vụ để nhận được nhiều order hơn, nhưng chỉ nhận 1 order 1 lần, mang món lên mới nhận order tiếp, chắc sợ quên :roll_eyes:. Để gọi đồ nhanh hơn bạn có thể gọi thêm 2-3 ông phục vụ nữa, tùy sức. Nhìn chung cách này khá là ổn, training nhân viên dễ, nên được dùng đến tận bây giờ, có mỗi cái là chưa tối ưu tối đa. Mấy ông này gọi là [persistent connection](https://en.wikipedia.org/wiki/HTTP_persistent_connection).
![](https://images.viblo.asia/726ca216-d7a3-4c9e-9853-5bbe4bc25f11.gif)
- HTTP/1.1: Vẫn là thời điểm này, nhà hàng có training 1 ông nhân viên đặc biệt. Ông này làm việc thông minh hơn 1 tí là ghi hết order vào luôn rồi bắt đầu mang đồ lên. Nhưng ông này làm việc hơi máy móc, phải trả đồ theo đúng thứ tự order mới chịu. Chẳng may gọi cơm, canh, cá mà hết mất cơm thì bắt ngồi chờ chứ nhất quyết ko cho ăn cá, dỗi vl :roll_eyes: Thêm vào đấy, training mấy ông này khó hơn mấy ông bình thường nên đến 2018 thì mấy ông này không được dùng nữa. Mấy ông này được gọi là [pipelining connection](https://en.m.wikipedia.org/wiki/HTTP_pipelining).
- HTTP/2: Nhà hàng học được công nghệ training mới, mấy ông nhân viên vẫn ghi hết order vào luôn rồi bắt đầu mang đồ lên. Nhưng mấy ông này sẽ linh hoạt hơn, món nào có trước mang lên trước, thâm chí món nào to quá thì mang từng phần xen kẽ cũng làm đc. Do đó, giảm được rất nhiều thời gian chờ, chỉ cần 1 người cũng phục vụ được 1 bàn, giảm thêm được cả chi phí thuê nhân viên luôn.
![](https://images.viblo.asia/54f0919a-4c83-4cf3-8b11-0ae343942e91.gif)
### Phản hồi ưu tiên (prioritization)
Trong HTTP/1.1, server phải gửi phản hồi theo cùng trật tự nhận truy vấn. HTTP/2 thì giải quyết bất đồng bộ, nên các truy vấn nhỏ hơn hoặc nhanh hơn có thể được xử lý sớm hơn. Đồng thời, cho phép trình duyệt có thể sắp xếp thứ tự ưu tiên tải về cho các tài nguyên nào quan trọng dùng để hiển thị website.

Ví dụ: thẻ <script> trong <head> của trang sẽ được tải trong Chrome ở mức độ ưu tiên High (thấp hơn CSS - Highest), nhưng mức độ ưu tiên đó sẽ thay đổi thành Low nếu nó có thuộc tính async (có nghĩa là nó có thể được tải và chạy không đồng bộ).
![](https://images.viblo.asia/ef6d795d-61a3-427f-8963-f54416194890.png)
    
Thêm vào đó, chúng ta cũng có thể thay đổi độ ưu tiên của một resource bằng các từ khóa:
- `rel=preload/prefetch/preconnect`
- `as=fonts/style/script...`

### Server Push
HTTP/2 cho phép server có thể gửi gói dữ liệu trước khi nó được yêu cầu. Ví dụ, bạn có thể “reference” một script ở cuối page. Trong HTTP/1.1, trình duyệt sẽ tải, phân giải HTML rồi chạy JavaScript khi đến đoạn tag script. Với HTTP/2, server có thể gửi file JavaScript đến trước khi trình duyệt yêu cầu tài nguyên này. Việc này giúp giảm thơi gian chờ khi trình duyệt phân tích HTML và gửi request.
![](https://images.viblo.asia/ad22813c-c0fb-45f7-b0b5-a5a23c596a2a.gif)
### Dữ liệu truyền tải dạng nhị phân
HTTP/2 truyền dữ liệu ở dạng nhị phân thay vì dạng text như HTTP/1.x. Giao thức nhị phân hiệu quả hơn để phân tích cú pháp, gọn nhẹ hơn, và quan trọng nhất, chúng ít bị lỗi hơn nhiều so với các giao thức văn bản như HTTP/1.x. Bởi giao thức nhị phân không phải xử lý các trường hợp như khoảng trắng, viết hoa, kết thúc dòng, dòng trống...

Ví dụ, HTTP/1.1 định nghĩa [4 cách để phân tích một message](https://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.4) còn với HTTP/2 nó chỉ là 1 dòng code.

Có một lưu ý rằng HTTP/2 không thể sử dụng được qua telnet, nhưng đã có một số  công cụ hỗ trợ, chẳng hạn như plugin Wireshark.

### Nén header (header compression)
Khác với HTTP/1.1, các Header gói tin sẽ được nén trước khi gửi đi. Thông tin được gửi đi kèm với truy vấn mô tả dữ liệu, nguồn gốc, kiểu, độ dài… của dữ liệu đó. 
Updating....
## Ví dụ
Với server có độ trễ cao hoặc các response quá lớn chúng ta sẽ rất dễ dàng thấy được sự chênh lệch thời gian tải trang giữa HTTP/2 và HTTP/1. Các bạn có thể xem qua 2 ví dụ sau:
- HTTP/1.1: http://http2.golang.org/gophertiles?latency=1000
 
![](https://images.viblo.asia/e8fe3e76-ac93-40ee-b810-0700b79bb68a.gif)
- HTTP/2: https://http2.golang.org/gophertiles?latency=1000

![](https://images.viblo.asia/cd0166a6-279a-4566-b88e-dc70e0e7fc0b.gif)
## Kết
Bài viết hơi dài dòng, loanh quanh nhưng mục đích cũng chỉ là giới thiệu về HTTP/2. Bài tiếp theo chúng ta sẽ thử cài đặt HTTP/2 cho server của mình. Hẹn gặp lại các bạn.
## Source
https://http2.github.io/faq/
https://en.wikipedia.org/wiki/HTTP/2
https://freecontent.manning.com/animation-http-1-1-vs-http-2-vs-http-2-with-push/
http://http2.golang.org/gophertiles?latency=1000
https://developers.google.com/web/fundamentals/performance/resource-prioritization