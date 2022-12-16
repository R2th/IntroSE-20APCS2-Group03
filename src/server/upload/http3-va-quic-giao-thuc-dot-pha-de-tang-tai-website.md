![image.png](https://images.viblo.asia/261c7aed-6246-46e0-962f-3bfbdeb5a537.png)

Nhắc lại một chút về HTTP/2 ở bài trước, từ khi giao thức này ra đời đã giải quyết hàng loạt vấn đề xoay quanh HTTP/1; đặc biệt một số trong đó có thể quá sức với các nhà phát triển web, đại khái không phải bật lên là chạy, đơn giản như “plug and play” được.

Một trong những tính năng mạnh nhất của HTTP/2 đó là ghép kênh (multiplexing). Từ đó nhiều luồng dữ liệu (streams và data frame) đi qua chỉ với một kết nối TCP. Điều này giúp chúng ta tối ưu được rất nhiều thứ về băng thông, thông lượng, tốc độ và an toàn hơn.

Cho đến thời điểm bài viết này, theo Wikipedia, có khoảng 50% trong số 10 triệu website hàng đầu đã hỗ trợ giao thức HTTP/2. Thế thì tại sao lại cần phải có HTTP/3 làm gì nữa nhỉ??

Đó là vì “Head of line blocking (HOL)“. Dẫu cho HTTP/2 đã ghép kênh rất tốt và giảm thiểu HOL nhưng vì nó vẫn phải dựa trên một kết nối TCP. Mà đã là TCP thì vẫn phải tuân thủ rằng nếu một package thất lạc thì nó block toàn bộ cái connection cho đến khi package đấy được tìm lại (re-transmitted). Vấn đề này nằm ở layer TCP (Transport) nên chịu thua.

## Giới thiệu QUIC – Quick UDP Internet Connections

![image.png](https://images.viblo.asia/b55908b3-5a8b-4038-a8e0-a9e3590a1d05.png)

Nếu chúng ta không thể giải quyết HOL ở tầng TCP, liệu đã đến lúc chúng ta phát triển một giao thức (hay đúng hơn là một transport layer mới)?!

Việc này có thể nhưng đòi hỏi nỗ lực và sự thay đổi rất lớn. Ngần ấy năm qua, TCP đã được phát triển ăn sâu bám rễ vào tận lõi hệ điều hành (OS Kernel), rồi tới cả những firewalls, NATs, router mạng,… Việc này cho thấy đây vốn là nhiệm vụ bất khả thi, mà dẫu có làm được thì để thay đổi và deploy lại tất cả những thiết bị vật lý sẽ mất một khoảng thời gian rất rất đáng kể.

Đây chính là lý do QUIC (đọc như chữ “quick”) sử dụng giao thức UDP như cái tên của nó. QUIC là một giao thức truyền mạng được phát triển bởi Google vào năm 2012. Chính vì nó không dùng TCP nên sẽ không bị vấn đề về HOL như HTTP/2.

Như vậy nếu đối với QUIC, nếu có gói tin bị thất lạc thì nó chỉ ảnh hưởng tới luồng dữ liệu chứa gói tin đó mà thôi, những luồng khác vẫn hoạt động bình thường. Đây là sự khác biệt lớn nhất giữa HTTP/2 và QUIC, cũng như là HTTP/3 sau này.

## HTTP/3 (HTTP-over-QUIC)

![image.png](https://images.viblo.asia/f16964c9-4fe9-48dc-a66f-f82504c02b3e.png)

Hiện tại, ở thời điểm bài viết này, HTTP/3 cũng chỉ mới là một Internet Draft. Ban đầu thì nó có tên là “HTTP/2 Semantics Using The QUIC Transport Protocol”, sau đó đổi tên thành “Hypertext Transfer Protocol (HTTP) over QUIC”.

Vào ngày 28 tháng 10 năm 2018, Mark Nottingham, chủ tịch IETF HTTP và các nhà phát triển QUIC đưa ra đề xuất đổi tên HTTP-over-QUIC thành HTTP/3. Vài ngày sau đó, đề xuất đã được thông qua bởi các thành viên cốt cán của IETF. Từ đó HTTP/3 có thể tạm cho là chính thức được chào đời, mặc dù nó chính là QUIC.

## HTTP/3 nhanh và an toàn hơn

![image.png](https://images.viblo.asia/9f4dd271-c201-4e97-8578-1cf02894e91e.png)

HTTP/3 sử dụng kết nối QUIC, các request sẽ chia sẻ dùng chung kết nối này. Kết nối QUIC phối hợp quy trình kết nối 3 bước (three-way handshake) như của TCP và handshake TSL 1.3, có nghĩa là nó sẽ cung cấp mã hoá và xác thực ngay từ đầu. Sự phối hợp này cũng khiến cho việc khởi tạo kết nối diễn ra nhanh hơn đáng kể. Thay vì làm đến 2 lần “bắt tay” thì nay chỉ còn 1 lần thôi.

Nhưng tại sao các nhà phát triển không làm cho HTTP/2 có thể dùng được với QUIC mà phải phát triển hẳn một version mới cho HTTP? QUIC và HTTP/2 có nhiều đặc tính giống nhau: sử dụng stream và multiplexing.

Không đơn giản như vậy!! HTTP/2 sử dụng kỹ thuật nén header (head compression HPACK), mà nó vốn phụ thuộc rất nhiều vào thứ tự của các HTTP Request/Response khác nhau đến các endpoint. QUIC vẫn tuân thủ thứ tự dữ liệu trong đơn luồng (single stream), nhưng nếu có nhiều luồng hơn, nó sẽ không thể đảm bảo.

Cụ thể, HPACK chứa các header đã được gửi hoặc nhận trong các HTTP request/response trước đó. Các end-point tham chiếu các header này với các header của request/response mới và không cần truyền lại nữa. Nhưng giả sử trong QUIC, request A ở luồng 1, request B ở luồng 2, request 1 sẽ được tạo và gởi trước. Sẽ có trường hợp, request 2 sẽ đến trước request 1, NHƯNG header lại đang cần tham chiếu đến request 1 chưa hoàn chỉnh. Vậy là header của request 2 không thể tái tạo được.

Việc này thúc đẩy một kỹ thuật nén header khác mang tên QPACK ra đời.

## QPACK là gì?

![image.png](https://images.viblo.asia/cbeb2a25-d784-433c-855b-02432b4c99c4.png)

Với QUIC, vấn đề này được giải quyết đơn giản bằng xếp thứ tự tất cả các header của HTTP request/response trên cùng một luồng QUIC. Khi đó tất các header sẽ được truyền đúng thứ tự trong mọi trường hợp. Nhưng cách này sẽ gia tăng khả năng Head of line blocking, thứ mà QUIC sinh ra để giải quyết. Vì vậy nhóm phát triển QUIC đã thiết kế một cách mapping mới giữa HTTP và QUIC (“HTTP/QUIC“) và một cơ chế nén header mới gọi là QPACK.

Trong QPACK, mỗi trao đổi HTTP request/response sử dụng thêm 2 luồng kết nối QUIC hai chiều giữa hai đầu endpoint, do vậy sẽ không xuất hiện tình trạng Head of line blocking nữa. Chúng sẽ chịu trách nhiệm trao đổi thông tin mapping cho đầu còn lại.

## Các thư viện cho QUIC

Python – http3 and aioquic

Rust – quiche, neqo, and quinn

C – nghttp3 and lsquic

Go – quicgo

## Kết

HTTP/3 hứa hẹn mở ra cuộc cách mạng mang lại tốc độ cao, an toàn và đáng tin cậy dựa trên UDP cho các website. Có lẽ vào một ngày không xa, chúng ta sẽ có những website chạy hoàn toàn bằng UDP/QUIC. Google cũng cho rằng rất nhiều dịch vụ của họ đang vận hành với HTTP/3, vì lẽ này mà Chrome hiện đang support khá sớm HTTP/3 chăng?!!

HTTP/3 do còn quá mới nên vẫn chưa được các trình duyệt chính thức support. Một số thì đã implement đưa vào vận hành (Chrome, Firefox) nhưng một số thì bị tắt bởi mặc định. Các bạn có thể check các trình duyệt hỗ trợ HTTP/3 tại đây.

Ngoài ra HTTP/3 vẫn còn rất nhiều tính năng và nhiều điều thú vị khác. Các bạn có thể tham khảo thêm tại:

https://http3-explained.haxx.se

https://kinsta.com/blog/http3

https://blog.cloudflare.com/http3-the-past-present-and-future

https://edu.200lab.io/blog/http-3-va-quic