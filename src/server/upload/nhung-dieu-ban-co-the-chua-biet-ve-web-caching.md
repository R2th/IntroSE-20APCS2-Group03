## Lời mở đầu

Nếu bạn là một web developer, chắc hẳn bạn đã từng nghe đến thuật ngữ **caching**. Caching là kỹ thuật giúp tăng tốc độ xử lý trong ứng dụng web của bạn qua việc lưu trữ nội dung truy cập dữ liệu của lần request đầu tiên và sử dụng chúng cho những lần request tiếp theo. Nhờ đó mà trình duyệt load tài nguyên nhanh hơn, đem lại cho người dùng trải nghiệm tốt hơn. 

Không chỉ có web, caching tồn tại ở phần lớn các thành phần máy tính như web browers, web server, ổ cứng và CPU. Vì vậy trong bài viết này chúng ta sẽ cùng tìm hiểu  những thành phần nào có thể sử dụng kỹ thuật cache. 

## CPU cache
Bộ nhớ cache là một loại bộ nhớ tương tác giữa RAM với CPU. Bô nhớ này chứa những dữ liệu, câu lệnh thường xuyên được máy tính truy cập và sử dụng, nên khi cần thì CPU có thể dùng ngay lập tức.

CPU có sẵn một bộ nhớ bên trong nhân được gọi là "Registers", thường chứa một dung lượng lưu trữ nhỏ. Chúng là những bộ nhớ nhỏ, nhẹ và nhanh nhất gắn liền với CPU. Đôi khi, những registers này được gọi là "L0 cache"

CPUs có thể truy cập vào bốn loại caches khác ứng với 4 level (L1 Cache - L4 Cache). Cấu trúc thiết kế của CPU và bo mạch chủ sẽ quyết định dạng cache là L0 hay L1, cũng như những lớp bên dưới CPU với bo mạch chủ 

![](https://images.viblo.asia/baf5cced-6f4b-4bb1-9463-0cbc4269a7a1.png)

## Disks cache 

HDD - công cụ lưu trữ dữ liệu chính của máy tính có tốc độ đọc và ghi dữ liệu chậm hơn nhiều so với thanh RAM đa năng của bạn. Ngày nay thì SSD có tốc độ nhanh hơn HDD rất nhiều

Trong các dạng lưu trữ dữ liệu của máy tính, disk cache (hay còn gọi là **disk buffer**, **cache buffer**) là dạng bộ nhớ đệm trong ổ đĩa, có tác dụng buffer giữa CPU và ổ đĩa 

![](https://images.viblo.asia/ea139d4d-4e2f-4a57-b6c3-b9403dae21b9.png)

Caches ở ổ đĩa có mục đích phục vụ cho những dữ liệu mà bạn đã từng đọc/ghi, thì những lần sau bạn cần truy xuất chúng sẽ nhanh hơn.

## RAM 

Sự khác biệt giữa lưu trữ dữ liệu tạm thời trên RAM so với lưu trữ trên HDD nằm ở chỗ performance, nhu cầu sử dụng và tác động tới CPU. RAM tương tác trong vòng 1/1,000,000 giây trong khi ổ cứng HDD phải mất tới 1/1000 giây. Tức là nếu xét về tốc độ phản hồi thì RAM nhanh gấp 1,000,000 lần HDD.

Bằng việc hiểu rõ cơ chế hoạt động của caching, bạn có thể tạo ra ứng dụng có độ hiệu quả cao, chi phí thấp và có thể maintain được.

## Simple Web-Server

Khi bạn gửi một request tại một trang web nào đó, request sẽ đi từ trình duyệt local trên máy tính tới một máy chủ web, nơi lưu trữ những file HTML, CSS, JS để trả về cho trình duyejt của bạn.

![](https://images.viblo.asia/1137508c-b7e4-4fe1-81ac-1d80c958f6b3.png)

Trong trường hợp bạn gửi request lên web-server để yêu cầu một file tĩnh, web-server sẽ kiếm file tĩnh đó trong ổ đĩa và respond với fiel đó (đã được yêu cầu)

Trong lần request đầu tiên, ổ đĩa sẽ kiểm tra bộ nhớ cache, và trả về kết quả "cache miss" (không có cache được lưu trữ). Sau đó ổ đĩa sẽ truy xuất data từ bộ nhớ lưu trữ và đưa vào trong bộ nhớ cache, để dành cho những lần request tiếp theo.

Và trong những request tiếp theo, việc tìm kiếm trong cache sẽ trả về kết quả "cache hit", tức là có cache này được lưu trữ. Dữ liệu sẽ được phần hỗ trỡ này cung cấp, cho đến khi nó bị thay thế (và kết quả tìm kiếm trong cache trả về là "cache miss".

## Database caching 

Việc query vào database có thể rất tốn thời gian và tài nguyên, vì một câu truy vấn có thể cần xử lý tính toán ngay tại database. Việc cache lại những câu truy vấn nặng và lặp lại như vậy có thể giảm thời gian response từ server tới client. Không những thế nếu như một client nào đó đã thực hiện một câu query thì database sẽ cache lại nó, và khi tất client khác gọi tới cùng câu query đã được cache này thì tời gian xử lý sẽ giảm xuống rất nhiều.

![](https://images.viblo.asia/52920f59-afd8-484a-808c-351a83db3d9a.png)

Phần lớn các database sẽ được thiết lập để có thể cache một cách tối ưu. Tuy nhiên tùy theo nhu cầu của từng ứng dụng mà các thiết lập này sẽ khác nhau để phù hợp với từng loại database riêng

## Response Caching

Trong các ứng dụng web, dữ liệu trong response trả về cho client cũng có khả năng được cache lại để những request tương tự về sau thậm chí còn không cần phải gửi đến server. Và tương tự, phía server cũng có thể cache một phần những response trả về từ phía database để không phải thực hiện nhiều câu truy vấn nặng tới database.

![](https://images.viblo.asia/f0301da1-14da-4d57-ba84-f9c897c24724.png)

Response của ứng dụng web được cache ở bên trong bộ nhớ ứng dụng. Bộ nhớ cache của ứng dụng được lưu trữ trực tiếp bên trong bộ nhớ cục bộ hoặc bên trong một cache server khác như Redis. 

## Function memorization

Đây là cách cache mà thường ít người không để ý đến. Nếu có những hàm, method nào xử lý rất nhiều logic phức tạp thì bạn có thể cache giá trị hàm đó trả về (output) đối với cùng một giá trị đầu vào (input).  Có thể thực hiện cách này bằng việc sử dụng bảng tìm kiếm với hai cặp giá trị key - value. Trong đó key sẽ là giá trị input, còn value sẽ là giá trị output đã được cache với key tương ứng.

![](https://images.viblo.asia/e626b64d-8ccc-4e0c-85a7-41a1cd93f63d.png)

Đây là kỹ thuật phổ biến giúp tăng tốc độ chương trình. Tuy nhiên có thể không phù hợp với những hàm ít được gọi, hoặc hàm có thời gian xử lý thấp

## Cache browser bằng HTTP headers

Tất cả trình duyệt hiện nay đều có tính năng HTTP cache đi kèm (web cache) dành cho những file web tạm thời như trang HTML, file javascript, ảnh,...

Cách này hoạt động trên cơ chế khi server trả về một response với mô tả ở HTTP header (directive) trùng khớp với những thông tin ở trình duyệt thì trình duyệt sẽ hiểu được phải cache dữ liệu trong resposne như thế nào và trong bao lâu.

![](https://images.viblo.asia/a92b4489-82db-49ac-a99c-c304a1cbec72.png)

Đây là tính năng rất hữu ích của trình duyệt  vì:
- Nâng cao trải nghiệm người dùng, khi những file tài nguyên (ảnh, html, css, js,...) cần có được lấy ra một cách nhanh chóng ngay từ cache local của trình duyệt, mà không phải tốn thời gian đi tìm kiếm và tải về những tài nguyên này (no round-trip-time - RTT)
- Giảm tải cho ứng dụng server và những phần khác như database
- Giảm lượng bandwith mà người dùng sử dụng (vì không cần phải gửi yêu cầu network lên server) - từ đó giảm chi phí.  

## Proxy Server

Trong hệ thống mạng máy tính, một proxy server có thể coi như một máy tính, một phần cứng hoặc một ứng dụng. Nó đóng vai trò hỗ trợ trung gian giữa client và server, khi client yêu cầu một file nào đó từ hệ thống web server hoặc ngược lại

Có rất nhiều loại proxy server, như loại nằm trong máy tính của người dùng, router mạng, hoặc những server trung gian kết nối giữa client với host. Tất cả proxy servers đều có khả năng caching

### Gateway

Đây là loại proxy server có khả năng chuyển tiếp những request và response mà không làm thay dổi chúng: gateway, tunneling proxy, web proxy, application level proxy. Tất cả client đều sử dụng chung proxies này thông qua tường lửa,  vì thế mà có thể áp dụng cache vào phần này

### Forward proxy (proxy server)

Forward proxy (proxy server) thường được cài đặt ở kiến trúc bên phía client. Khi một hệ thống client có cài đặt forward proxy, trình duyệt web sẽ gửi request đến proxy này. Và proxy sẽ có nhiệm vụ chuyển tiếp request tới server trên internet. Một trong những ưu điểm của forward proxy là bảo mật thông tin của phía client.

### Web acclerator

Đây là một proxy server được đưa vào hệ thống với mục đích giảm thời gian truy cập vào trang web. Proxy sẽ lấy toàn bộ file cần thiết trước (mà những file này thường xuyên được truy cập trong tương lai). Không những vậy những file lấy về cũng có thể được nén lại để tăng tốc độ truyền tải, cũng như mã hóa nhằm tăng cường bảo mật.

### Reverse Proxy

Đây thường là những proxy được sử dụng để ngăn chặn truy cập trực tiếp vào web server từ một mạng nội bộ (private network). Nó được sử dụng để **load-balancing** những request bên trong một server, cung cấp xác thực SSL, hoặc cache request. Phía server host có thể cache và quản lý một số lượng lớn các request từ client thông qua dạng này.

### Edge caching

Được biết đến nhiều hơn với tên gọi **CDN** (Content Delivery Network), đây là cách sử dụng caching server để lưu trữ những content gần nhất  với người dùng cuối. Chẳng hạn nếu như bạn đang ngồi ở Liên Xô và cần request một file trong một trang web đặt máy chủ ở Mỹ

![](https://images.viblo.asia/e99da705-6cd8-4106-baa6-a0dbca9a36b0.png)

# Kết luận

Cache là kỹ thuật xuất hiện ở hầu hết các tầng của một ứng dụng, từ phần cứng, phần mềm đến các thiết bị network và dịch vụ. Cache đóng vai trò quan trọng trong việc cải thiện hiệu năng nói chung cho toàn bộ server. Tất cả các máy 

Caching giúp giảm latency và network traffic, từ đó giảm thời gian cần thiết để hiển thị toàn bộ một trang web trên trình duyệt cho người dùng cuối. Tất cả ứng dụng đều có một khoảng "response lag" liên quan tới quá trình tính toán của CPU, như tìm kiếm trong ổ đĩa, network latency, xếp hàng chờ request, tăng tốc network,.... Nếu tính tổng thời gian lag này ở rất nhiều thành phần trong một request-response cycle, thời gian từ lúc request đến lúc hoàn thành resposne sẽ tăng lên rất nhiều. Vì thể mà caching tỏ ra vô cùng hữu dụng.

Nguồn: https://medium.freecodecamp.org/the-hidden-components-of-web-caching-970854fe2c49