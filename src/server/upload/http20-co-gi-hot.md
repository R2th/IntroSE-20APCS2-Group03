> Original article: https://manhhomienbienthuy.github.io/2018/04/19/http20-co-gi-moi.html (đã xin phép tác giả :D) 

Hôm nay vào web [Instagram](https://www.instagram.com/) tự nhiên lại rảnh rỗi inspect xem có gì hot.  Xem đến phần network thì phát hiện trang web này đã dùng giao thức thế hệ mới là HTTP/2.0.  Họ cập nhật từ bao giờ mà mình chả biết, lâu nay cũng không thấy báo đài đưa tin về vụ này.  Có lẽ mình bị outdate mất rồi.

![](https://images.viblo.asia/58360d1b-e909-4831-a104-08601a34b6b3.png)

Nhân tiện viết luôn bài này để tìm hiểu giao thức này có gì hot mà sao lâu nay ít người nhắc tới nó.

# Lịch sử

HTTP (Hypertext Transfer Protocol - giao thức truyền tin siêu văn bản) lần đầu tiên được tài liệu hoá là [HTTP/0.9](https://www.w3.org/Protocols/HTTP/AsImplemented.html) (tài liệu hoàn thành năm 1991).  Sau đó nó tiếp tục được cải tiến và hoàn thiện.

[Dave Raggett](https://datatracker.ietf.org/person/Dave%20Raggett) là người lãnh đạo nhóm làm việc HTTP của [IETF](https://www.ietf.org/) (Internet Engineering Task Force ) vào năm 1995 và nhóm này đã phát triển giao thức này với những mở rộng đáng kể về hoạt động, các thông tin đính kèm, các phương thức và header mới.  Phiên bản hoàn thiện [HTTP/1.0] (https://tools.ietf.org/html/rfc1945) được chính thức giới thiệu vào năm 1996.

Cuộc sống cứ ngày một phát triển, công nghệ ngày càng tiến bộ, và các website nhiều dần lên và web động ra đời, phiên bản nâng cấp của giao thức HTTP là [HTTP/1.1](https://tools.ietf.org/html/rfc2616) ra đời năm 1999 nhằm cải thiện hiệu suất của giao thức cũ.

Kể từ đó đến nay (cũng gần 20 năm), công nghệ vẫn đang phát triển hằng ngày và các trang web cũng không nằm ngoài vòng xoáy đó.  Hiện nay chúng ta nói tới website thực ra chúng đều là các web application với vô số sự phức tạp trong cấu trúc.  Sự phát triển của web application dẫn tới một hệ quả là dữ liệu mà chúng ta tương tác với các website ngày càng lớn.  (Ơn giời cáp quang ngày càng rẻ nên đây không phải là chuyện gì lớn lắm.)

Hiện nay, trung bình các [website cần 3MB](https://speedcurve.com/blog/web-performance-page-bloat/) để tải được nội dung, điều đó yêu cầu một sự nâng cấp không hề nhẹ cho giao thức HTTP để có thể đáp ứng được nhu cầu hiện nay.  Rõ ràng là vào cuối thế kỷ XX, không ai có thể lường trước được công nghệ ngày hôm nay sẽ thế nào.  Những năm đầu thiên niên kỷ, rất ít trang web cần hơn 100kB để tải trang, vậy mà giờ đây, lượng dữ liệu đã tăng quá nhiều.

Năm 2009, [Google](https://www.google.com/intl/en_vn/about/our-company/) tuyên bố họ đang làm việc với một giao thức mới có sự bảo mật cũng như hiệu suất cao hơn (mục tiêu là giảm thời gian tải trang ít nhất là 50%). Giao thức này được đặt tên là [SPDY](http://dev.chromium.org/spdy/spdy-whitepaper) (đọc là speedy), với một số giải pháp nhắm giải quyết vấn đề tồn tại lâu năm của HTTP như sau:

- Cho phép gửi nhiều truy vấn thông qua một kết nối TCP duy nhất (multiplexing).
- Cho phép client sắp xếp thứ tự ưu tiên tài nguyên cần tải về để hiển thị trang.
- Nén và giảm thiểu kích thước các gói tin
- Cho phép máy chủ push các tài nguyên quan trong về client ngay cả khi client chưa truy vấn đến chúng.

Nhóm làm việc [HTTPbis](https://trac.ietf.org/trac/httpbis/wiki) của IETF đã nhận ra tương lai xán lạn của giao thức này và họ đã quyết định dùng nó làm cơ sở cho giao thức thế hệ mới mà họ đang phát triển. Giao thức HTTP/2.0 đã ra đời dựa trên những cải tiến trên, bạn có thể thấy tất cả chúng đều được thực hiện ở HTTP/2.0.

[Đặc tả kỹ thuật của HTTP/2.0](https://tools.ietf.org/html/rfc7540) hoàn thành vào tháng 2 năm 2015 và rất nhanh sau đó, các trình duyệt phổ biến đã chấp nhận giao thức này.  Hiện nay, [gần như mọi trình duyệt đều đã hỗ trợ HTTP/2.0](https://caniuse.com/#feat=http2).  (Ngay cả với Microsoft, IE 11 và Edge đã hỗ trợ rồi.)

# Những lợi ích của HTTP/2.0

HTTP/1.1 đã ra đời gần 20 năm và với các web application như hiện nay, giao thức này đang trở nên lỗi thời.  HTTP/2.0 ra đời với rất nhiều những cải tiến.  Trình bày những sự thay đổi của giao thức thế hệ mới này trong một bài viết không phải là việc dễ dàng, bạn nào quan tâm có thể theo dõi toàn bộ đặc tả [ở đây](https://tools.ietf.org/html/rfc7540).

HTTP/2.0 có nhiều cải tiến để nâng cao hiệu suất tải trang, một số thay đổi chính chúng ta có thể nhắc đến như

## HTTP/2.0 sử dụng dữ liệu nhị phân

Dữ liệu nhị phân rõ ràng là thứ dễ xử lý nhất đối với máy tính. HTTP/1.1 sử dụng dữ liệu dạng text (tất nhiên là nó sẽ được mã hoá bởi máy tính, và tiếp tục được mã hoá ở những tầng dưới).  Dữ liệu nhị phân cho phép chúng ta phân tính nó dễ dàng hơn, nó dễ được nén hơn và quan trong nhất là nó không dư thừa.  Dữ liệu dang text của HTTP/1.1 thường xuyên có những thứ không cần thiết như dấu cách, các dấu xuống dòng, v.v...

Cũng vì vậy với HTTP/2.0, chúng ta có một phương thức duy nhất để phân tích dữ liệu, trong khi HTTP/1.1 có tới 4 cách khác nhau.  HTTP/1.1 sử dụng text nên một gói tin của nó chứa rất nhiều thông tin, và bắt buộc phải sử dụng dấu xuống dòng để ngăn cách.  HTTP/2.0 thì hoàn toàn khác, mọi giao tiếp của client và máy chủ đều được chia thành các message và frame, tất cả chúng đều là dữ liệu binary.  Có nhiều loại [frame](https://tools.ietf.org/html/rfc7540#section-6) khác nhau như `HEADER`, `DATA`, `SETTINGS`, v.v...

Bằng việc sử dụng dữ liệu nhị phân, chúng ta có một số khái niệm sau trong giao tiếp HTTP/2.0

- Stream: Một dòng dữ liệu hai chiều trong một kết nối, trong 1 stream có thể có nhiều message.
- Message: Một chuỗi các frame có liên quan đến nhau để hoàn thành một truy vấn hoặc phản hồi.
- Frame: Đây là đơn vị nhỏ nhất trong giao tiếp HTTP/2.0, như đã nói ở trên, có nhiều loại frame khác nhau để hoàn thiện một message.

Mọi kết nối HTTP/2.0 đều thực hiện qua [TCP](https://tools.ietf.org/html/rfc793), trên đó giao tiếp được thực hiện hai chiều nhờ vào stream.  Mỗi stream có định danh và độ ưu tiên nhờ đó nó có thể truyền tải các message giữa client và server một cách chính xác.  Mỗi message là một gói tin HTTP hoàn chỉnh (ví dụ là truy vấn hoặc phản hồi từ máy chủ), message sẽ có nhiều frame, ví dụ frame header chứa các HTTP header, frame data chứa dữ liệu chính cần truyền tải.  Frame từ các message khác nhau và các stream khau nhau có thể được truyền tải xen kẽ nhau và sẽ được ghép nối khi chúng đến đích nhờ vào định danh của chúng được gắn với các message và stream.

Chính nhờ cơ chế truyền tải dữ liệu nhị phân này mà HTTP/2.0 cho phép chúng ta gửi và nhận nhiều thông tin hơn trong cùng một kết nối. Chúng ta sẽ tìm hiểu thêm về tính năng này trong phần multiplexing.

##  HTTP/2.0 nén các header

Mọi một kết nốt HTTP đều phải có [header](https://tools.ietf.org/html/rfc2616#section-4.2).  HTTP là một giao thức không có state vì vậy, mọi kết nối đều là một cặp gửi-nhận truy vấn.  Do đó, mỗi kết nối đều phải gửi kèm các thông tin liên quan đến kết nối đó (kể cả nó giống hệt các kết nối khác) trong header.

Khi được tiêu chuẩn hoá vào năm 2005, có [116 header](https://www.iana.org/assignments/message-headers/message-headers.xml#perm-headers%7CMessage) khác nhau.  Phần lớn chúng là những yêu cầu bắt buộc phải gửi trong truy vấn cho các trang web (mà rất nhiều thứ là thông tin bị lặp), vì vậy, HTTP/2.0 sử dụng [HPACK](http://http2.github.io/http2-spec/compression.html) để [nén các header](https://tools.ietf.org/html/rfc7540#section-4.3).

HTTP/1.1 gửi các dưới dạng text cho mỗi truy vấn hay phản hồi.  Và nhiều trong số chúng là giống hệt nhau khi chúng ta truy cập một trang web.  Cơ chế nén header của HTTP/2.0 cho phép chúng ta giảm bớt khá nhiều thông tin dư thừa nhờ phương thức sau:

- Sử dụng Huffman code để mã hoá các header, nhờ đó mà giảm được kích thước gói tin.
- Yêu cầu client và server chia sẽ một bảng chỉ mục các header đã được gửi và nhận từ trước, nhờ đó mà những header lặp lại sẽ được bỏ qua.

Huffman code cho phép từng giá trị được nén trước khi gửi đi, và bảng chỉ mục các header đã được gửi từ trước cho phép chúng ta tránh những dữ liệu dư thừa bằng cách chỉ cần gửi định danh của các header này và cả client và server có thể lấy ra giá trị của chúng đã được lưu từ trước đó.

Bạn nghĩ rằng chỉ nén header không giảm được kích thước bao nhiêu ư? [Patrick McManus](https://hacks.mozilla.org/author/pmcmanus/), một kỹ sư của Mozilla tính toán được rằng, mỗi truy vấn cần trung bình 1400 byte cho header và một trang web có trung bình 80 assets, mỗi assets cần một truy vấn riêng biệt.  Tổng cộng chúng ta mất 1MB cho riêng header để tải trang.  Vì vậy rõ ràng nén được lượng dữ liệu này sẽ có ích rất lớn.

Lúc đầu, HTTP/2.0 sử dụng [gzip](http://www.gzip.org/) để nén, tuy nhiên, phương thức này có một lỗ hổng [Compression Ratio Info-leak Made Easy](http://cve.mitre.org/cgi-bin/cvename.cgi?name=cve-2012-4929) (CRIME) nên HTTP/2.0 chuyển sang dùng phương thức nén khác an toàn hơn.

## HTTP/2.0 có multiplex

HTTP có một vấn đề gọi là [head-of-line blocking](https://ieeexplore.ieee.org/document/1096719/), chỉ có phép một truy vấn được thực hiện với mỗi kết nối.  HTTP/1.1 đã cố gắng giải quyết vấn đề này bằng [pipelining](https://tools.ietf.org/html/rfc2616#section-8.1.2.2), nhưng không thể giải quyết triệt để (ví dụ một truy vấn mà bị lỗi không nhận được phản hồi sẽ làm gián đoạn toàn bộ các truy vấn tiếp theo).

Hơn nữa, cơ chế pipelining cũng rất phức tạp trong vận hành vì cần phải xử lý các truy vấn thật cẩn thận mới đảm bảo được phản hồi tương ứng với truy vấn.  Client sẽ buộc phải sử dụng một cách chuẩn đoán để xác định cần gửi truy vấn nào vào kết nối nào.  Vì thông thường, một trang web cần tới 10 (có thể hơn) các kết nối, nên hiệu suất có thể bị ảnh hưởng nghiêm trọng khi có những truy vấn lỗi.

[Multiplexing](https://tools.ietf.org/html/rfc7540#section-5) giải quyết vấn đề này bằng cách cho phép nhiều truy vấn và phản hồi cùng một lúc.  Về phía client, chỉ cần 1 kết nối đến máy chủ là có thể tải toàn bộ dữ liệu cần thiết.

Chính cơ chế gửi và nhận dữ liệu nhị phân của HTTP/2.0 giúp nó dễ dàng triển khai multiplexing.  Theo đó, HTTP/2.0 cho phép client và server chia nhỏ dữ liệu thành các frame hoàn toàn độc lập với nhau.  Chúng có thể được gửi và nhận song song, xen kẽ nhau và ghép nối lại thành message hoàn chỉnh tại đích đến.  Điều này giúp việc gửi và nhận dữ liệu cực kỳ hiệu quả mà không hề gặp phải head-of-line blocking như HTTP/1.1 vì các frame hoàn toàn độc lập với nhau.

## HTTP/2.0 có cơ chế server push

Khi trình duyệt truy vấn một trang web, máy chủ sẽ trả về HTML và sau đó trình duyệt phải phân tích HTML nay và nếu cần thì tiếp tục truy vấn để tải về JS, CSS, v.v...

[Server push](https://tools.ietf.org/html/rfc7540#section-8.2) cho phép máy chủ không cần chờ truy vấn từ trình duyệt và tự quyết định những gì là quan trọng (thường dựa vào cache) và push luôn cho trình duyệt trước.

Vậy tại sao lại cần server push?  Như đã nói ở trên, một trang web có trung bình 80 assets, vậy việc giảm thiểu độ trễ khi phải phân tích rồi gửi yêu cầu truy vấn những thứ này sẽ giảm rất nhiều thời gian tải trang.  Server hiểu rất rõ về những thứ client cần và nó push luôn cho client, vậy là khỏi mất công phải chờ.

Nếu bạn đã từng viết một trang HTML mà code luông CSS, JS trên đó thì có thể nói, bạn đã thử nghiệm tính năng server push rồi đó.  Hiểu đơn giản, việc bạn vừa làm chính là gửi luôn những assets cần thiết cho client mà không cần nó phải truy vấn thêm nữa.

Tuy nhiên, đó là bạn hoàn toàn làm thủ công, HTTP/2.0 thực hiện việc này một cách tự động nên nó mang lại nhiều lợi ích hơn, ví dụ có thể dùng cache ở phía client, chuyển trang không cần tải lại dữ liệu này, các assets khác nhau có thể multiplexing làm chúng được tải nhanh hơn.

Tuy nhiên, tính năng này nếu bị lạm dụng, nó sẽ phản tác dụng khiến hiệu suất giảm đi.  Làm thế nào để nó có thể hoạt động đúng cũng là một vấn đề khá đau đầu.

## Bảo mật

Mặc dù bản thân giao thức HTTP/2.0 không yêu cầu bắt buộc sử dụng [TLS](https://tools.ietf.org/html/rfc5246), nhưng việc nâng cao hiệu suất giúp chúng ta dễ dàng thực hiện các phương thức bảo mật hơn, ít nhất là thực hiện mã hoá.

Google và [Mozilla](https://www.mozilla.org/en-US/) đều quyết định rằng, trình duyệt của họ (Chrome và [Firefox](https://wiki.mozilla.org/Networking/http2)) sẽ chỉ hỗ trợ HTTP/2.0 over TLS (tức là phải dùng HTTPS) để mã hoá các kết nối. Microsoft có vẻ cũng [không đứng ngoài](https://docs.microsoft.com/en-us/microsoft-edge/dev-guide/networking-and-connectivity/http2) cuộc chơi này.  Điều này khiến cho việc dùng HTTPS với HTTP/2.0 đã trở thành bắt buộc "de facto"

Lý giải tại sao đặc tả lại không yêu cầu mã hoá, [Mark Nottingham](https://datatracker.ietf.org/person/Mark%20Nottingham), người đứng đầu nhóm phát triển HTTP/2.0 của IETF, nói rằng, vì HTTP/2.0 là một giao thức được triển khai với rất nhiều bên (nhà cung cấp proxy, các nhà mạng, tường lửa, v.v...)  và bắt buộc phải mã hoá thật bất công với những đối tượng này.

Với những cải tiến trên, HTTP/2.0 sẽ giảm băng thông và giảm thời gian tải trang.  Để thấy rõ những lợi ích của HTTP/2.0, bạn có thể xem [demo này](https://http2.akamai.com/demo).

# Đã có thể dùng HTTP/2.0 chưa?

Để có thể dùng HTTP/2.0 thì yêu cầu cả client và server đều phải hỗ trợ giao thức này.  Nếu một trong hai bên không hỗ trợ thì kết nối sẽ quay lại giao thức HTTP/1.1.  Như đã nói ở trên, các trình duyệt hầu hết đều đã hỗ trợ giao thức này.  Các web server phổ biến như [Apache](http://httpd.apache.org/docs/2.4/howto/http2.html), [IIS](https://docs.microsoft.com/en-us/iis/get-started/whats-new-in-iis-10/http2-on-iis) (Internet Information Services), [nginx](https://www.nginx.com/blog/nginx-1-9-5/) đều đã hỗ trợ HTTP/2.0.

Có nghĩa là mọi thứ đều đã sẵn sàng cho HTTP/2.0.  Nhưng có vẻ việc chuyển đổi công nghệ sang HTTP/2.0 không diễn ra nhanh như việc cài đặt hỗ trợ nó.  Vào thời điểm này, mới chỉ [có 25.2%](https://w3techs.com/technologies/details/ce-http2/all/all) số website đã chuyển sang sử dụng HTTP/2.0.  Nhưng thật buồn là website phổ biến nhất với anh em lập trình chúng ta là [github](https://github.com/) vẫn đang sử dụng HTTP/1.1.

Nếu bạn muốn chuyển đổi trang web của mình sang HTTP/2.0 thì nên chuyển đổi sớm đi cho bắt kịp công nghệ.  Về mặt code, HTTP/2.0 tương thích ngược với HTTP/1.1 nên code không cần thay đổi gì trang web vẫn sẽ hoạt động tốt.  Nhưng cần lưu ý rằng, một số pattern bạn đang sử dụng để tối ưu trang web của mình có thể trở thành anti-pattern khi sử dụng HTTP/2.0.

Ví dụ, chúng ta vẫn thường sử dụng các công cụ để compile và build CSS, JS thành một file duy nhất.  Với HTTP/1.1, giảm số assets cần truy vấn là một cách để tối ưu hiệu suất tải trang.  Nhưng với HTTP/2.0 thì điều này thật sự không mang lại giá trị gì.  Có lẽ việc để các file riêng lẻ lại tốt hơn do trang web chỉ cần tải những file đã cập nhật mà thôi, những file còn lại được cache sẽ cho hiệu suất tốt hơn.

# Kết luận

HTTP/2.0 là một giao thức thế hệ mới, mang lại nhiều lợi ích cho hệ thống WWW hiện tại.  Bài viết đã cung cấp một số thông tin cần thiết về giao thức mới này.  Hy vọng chúng ta sẽ sớm được phổ cập HTTP/2.0 trong tương lai gần.