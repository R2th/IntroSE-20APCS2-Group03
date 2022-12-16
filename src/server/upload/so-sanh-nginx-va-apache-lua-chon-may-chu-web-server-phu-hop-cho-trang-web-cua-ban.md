![](https://images.viblo.asia/5a4b2a6c-9334-49ff-a51b-3e9ade23d55f.jpg)
# Mở đầu
Hiện nay, Nginx và Apache đang là hai web server phổ biến nhất. Thị trường máy chủ web  đang hay đổi từng ngày, Apache đang dần bị thu hẹp, còn Nginx không chỉ bắt kịp với Apache, mà hiện còn là lựa chọn của nhiều trang web lưu lượng truy cập cao.

**Apache lỗi thời rồi hay sao ???  Nginx tốt hơn Apache  ??? Luôn chọn Nginx là máy chủ web ???**

Sự thật là cả Apache và Nginx đều là phần cốt lõi của các web stack hoàn chỉnh (LAMP cũng như LEMP), đều có những ưu, nhược điêm riêng và sự lựa chọn cuối cùng tùy thuộc vào nhu cầu của từng cá nhân.

Do vậy, mục tiêu của bài viết này là giúp bạn hiểu rõ hơn các yêu cầu của chính mình, thay vì cung cấp đề xuất mang tính dập khuôn cho tất cả mọi người. Và sự so sánh sau đây giữa Nginx và Apache sẽ cho bạn một cái nhìn toàn cảnh chính xác, giúp bạn có thể lựa chọn web server phù hợp cho riêng mình.

Trước tiên, mình sẽ tìm hiểu về Web Server, Nginx, Apache cung cấp các kiến thức cơ bản cho các bạn mới, chưa biết. Còn đối với các bạn biết rồi, phần này coi như là củng cố lại kiến thức của mình. Sau đó, chúng ta sẽ so sánh Nginx và Apache. Và từ đó sẽ đưa cách chọn đúng loại máy chủ cho trang web của bạn. Bắt đầu thôi nào !!!
# 1. Tìm hiểu về Web Server
![](https://images.viblo.asia/29b055f7-096e-4338-8710-f0ca60261cce.jpg)

## 1.1 Web Server là gì ?
Web server dịch ra tiếng Việt nghĩa là máy chủ. Web server là máy tính lớn được kết nối với tập hợp mạng máy tính mở rộng. Đây là một dạng máy chủ trên internet mỗi máy chủ là một IP khác nhau và có thể đọc các ngôn ngữ như file *.htm và *.html… Tóm lại máy chủ là kho để chứa toàn bộ dữ liệu hoạt động trên internet mà nó được giao quyền quản lý.

Web server phải là một máy tính có dung lượng lớn, tốc độ rất cao để có thể lưu trữ vận hành tốt một kho dữ liệu trên internet. Nó sẽ điều hành trơn chu cho một hệ thống máy tính hoạt động trên internet, thông qua các cổng giao tiếp riêng biệt của mỗi máy chủ. Các web server này phải đảm bảo hoạt động liên tục không ngừng nghỉ để duy trì cung cấp dữ liệu cho mạng lưới máy tính của mình.

![](https://images.viblo.asia/e70114dd-de1d-4432-a737-9e7e3dcdc699.png)

Web server có thể là phần cứng hoặc phần mềm cũng có thể bao gồm cả hai. 
* Phần cứng: Máy chủ web là một máy tính lưu trữ các file ảnh, tài liệu HTML, CSS, file JavaScript của một website và chuyển chúng tới thiết bị của End-user. Máy chủ được kết nối internet và truy cập thông qua một tên miền như Mozilla.org.
* Phần mềm: Web server gồm một số phần điều khiển người dùng truy cập đến file lưu trữ trên một máy chủ HTTP. Máy chủ HTTP là một phần mềm, nó có khả năng hiểu được các địa chỉ website (URL) và giao thức trình duyệt sử dụng để xem các website (HTTP).

Bất cứ khi nào một trình duyệt cần đến file được lưu trữ trên máy chủ, trình duyệt gửi yêu cầu file đó thông qua HTTP. Khi yêu cầu tới đúng máy chủ (phần cứng), HTTP (phần mềm) sẽ gửi tài liệu được yêu cầu trở lại thông qua HTTP.

Để xuất bản một website, bạn cần một static hoặc dynamic web server.
* Một static web server, hoặc stack, bao gồm một máy tính (hardware) với một HTTP server (phần mềm). Chúng ta gọi nó là "static" bởi vì server (máy chủ) gửi các file nó lưu trữ "nguyên vẹn" (as-is) tới trình duyệt của bạn.
* Một dynamic web server bao gồm một static web server cộng với các phần mềm mở rộng, phổ biến nhất là một application server (máy chủ ứng dụng) và một database. Chúng ta gọi nó là "dynamic" bởi vì application server cập nhật các file được lưu trữ trước khi gửi chúng tới tình duyệt của bạn thông qua HTTP server.

## 1.2 Các đặc tính của Web Server
Web server (máy chủ web) có thể xử lý dữ liệu, cung cấp thông tin đến máy khách qua môi trường internet thông qua giao thức HTTP, giao thức được thiết kế gửi file đến trình duyệt web hay giao thức khác. Chẳng hạn: Người dùng truy cập vào website bkns.vn. Khi đó, server sẽ cung cấp tất cả dữ liệu về website đó thông qua lệnh giao tiếp.

Nếu được cài đặt một chương trình Server Software và kết nối internet thì bất cứ máy tính này cũng có thể trở thành web server. Phần mềm Server Software là phần mềm chuyên dụng để cài đặt và chạy trên bất cứ máy tính nào có thể đáp ứng đủ yêu cầu về bộ nhớ. Nhờ có nó mà người dùng có thể truy cập đến các thông tin của website từ một máy tính khác qua internet.

Người ta thường thuê các máy chủ nhỏ, máy chủ ảo VPS hay Hosting để lưu trữ dữ liệu cho website của mình.

Một server có thể cung cấp cả nội dung Static và Dynamic. Static có nghĩa là nội dung nguyên vẹn và dễ dàng để thiết lập. Dynamic là nội dung đã được sever xử lý hoặc tạo mới với dữ liệu từ Database, định dạng, đẩy vào trong HTTP Template rồi gửi kết quả đến người dùng.  

## 1.3 Các bước lấy dữ liệu của một website
**Bước 1: Web server lưu trữ các file của website – Hosting file**

Web server lưu trữ các file của website (bao gồm các tài liệu HTML, ảnh file CSS, fonts, video, file JavaScript). Người dùng hoàn toàn có thể lưu trữ chúng trên máy tính của mình nhưng khi lưu trên máy chủ web sẽ có những lợi ích sau:
* Luôn sẵn sàng – up and running
* Luôn kết nối tới mạng internet
* Địa chỉ IP cố định
* Được bảo dưỡng và bảo vệ bởi nhà cung cấp

**Bước 2:  Giao tiếp qua HTTP**

Web server sẽ hỗ trợ giao thức truyền phát siêu văn bản – HTTP. HTTP là tập hợp các quy tắc kết nối giữa hai máy tính bao gồm Textual và Stateless.
* Textual: Mọi lệnh đều là văn bản thuần túy và người dùng có thể đọc được nó.
* Stateless: Khi cả người dùng và máy chủ không nhớ kết nối trước đó.

HTTP có quy tắc rõ ràng về giao tiếp giữa client và server như sau:
* Duy nhất client có thể tạo ra yêu cầu HTTP đến server. Các server chỉ có thể đáp trả yêu cầu HTTP của client.
* Client phải cung cấp URL của file khi yêu cầu file đó thông qua HTTP.
* Tất cả yêu cầu HTTP sẽ được web server trả lời

HTTP có trách nhiệm xử lý và trả lời các yêu cầu đến qua các bước:
* Khi nhận được một yêu cầu, HTTP sẽ kiểm tra URL được yêu cầu có khớp với file hiện có không?
* Nếu trùng khớp, máy chủ web sẽ gửi nội dung file trả lại trình duyệt. Trường hợp không trùng khớp, một Application server sẽ tạo ra file được yêu cầu.
* Web server sẽ gửi trả lại một thông điệp lỗi cho trình duyệt (phổ biến nhất là 404 Not Found) nếu nó không thể xử lý được.
# 2. Tìm hiểu về Nginx
## 2.1 Nginx là gì ?
![](https://images.viblo.asia/b2fc7c0a-5a3a-4f25-b840-7a4adbf4c3a6.png)

Nginx là một máy chủ mã nguồn mở nổi tiếng. Khi mới ra đời, Nginx được dùng để phục vụ web HTTP. Tuy nhiên, hiện nay nó được dùng để làm Reverse Proxy, Email Proxy (IMAP, POP3, SMTP) và và một trình cân bằng tải (load balancer) và proxy ngược (reverse proxy) cho các máy chủ HTTP, TCP và UDP. 

Nginx được Sysoev cho ra đời chính thức vào tháng 10/2004. Nginx sử dụng kiến trúc sự kiện không đồng bộ. Tính năng này giúp Nginx tăng tốc độ, mở rộng tính năng và đáng tin cậy hơn. Rất nhiều website có traffic lớn đã sử dụng Nginx cũng vì khả năng mạnh mẽ và xử lý hàng nghìn kết nối cùng lúc của nó. 

Một vài trong số những ông lớn công nghệ dùng nó là Google, Netflix, Adobe, Cloudflare, WordPress, và còn nhiều hơn nữa. Theo W3techs, Nginx được nhiều người sử dụng làm Web server chiếm tỉ lệ 42,1% tổng số lượng Web server trên thế giới.

## 2.2 Nginx hoạt động như thế nào ?
![](https://images.viblo.asia/c94a1242-e0b6-4f83-b6cb-41e411db0295.jpg)

Trước tiên chúng ta cùng nhau tìm hiểu về quy trình hoạt động của web server. Khi có yêu cầu mở một website, trình duyệt sẽ liên lạc với server chứa website đó. Server thực hiện việc tìm kiếm file yêu cầu của website đó và gửi ngược về cho trình duyệt. Nginx hoạt động theo kiến trúc Asynchronous và Event Driven. Kiến trúc này là những Threads được quản lý trong một tiến trình, mỗi tiến trình hoạt động dựa vào các thực thể nhỏ hơn – Worker Connections.

Worker Process sẽ nhận các truy vấn từ Worker Connections và gửi các truy vấn đó đến Process cha – Master Process. Master Process sẽ trả lại kết quả cho những yêu cầu đó. Một Worker Connections có khả năng xử lý được 1024 yêu cầu tương tự nhau. Do đó, Nginx xử  lý được hàng nghìn yêu cầu mà không gặp bất cứ khó khăn gì. Nginx luôn hiệu quả hơn khi hoạt động trên môi trường tìm kiếm, thương mại điện tử và Cloud Storage.

## 2.3 Nginx có những tính năng gì ?
![](https://images.viblo.asia/327d3874-bd1b-473b-ba27-6285fa4a796c.jpg)

Nginx bao gồm hàng loạt tính năng vượt trội sau đây:
* Có khả năng xử lý cùng một lúc hơn 10.000 kết nối với bộ nhớ thấp
* Phục vụ Static Files và lập chỉ mục cho tập tin
* Dùng bộ nhớ đệm Cache để tăng tốc Proxy ngược, cân bằng tải đơn giản và khả năng chịu lỗi
* Hỗ trợ tăng tốc với bộ nhớ đệm của WSGI, SCGI, FastCGI và các máy chủ Memcached
* Có cấu hình linh hoạt và khả năng lưu lại nhật ký truy vấn.
* Chuyển hướng lỗi 3XX – 5XX
* Sử dụng Regular Expressions để Rewrite URL
* Hạn chế tỷ lệ đáp ứng truy vấn
* Giới hạn truy vấn từ một địa chỉ hoặc số kết nối đồng thời
* Có khả năng nhúng mã PERL
* Tương thích và hỗ trợ IPv6
* Hỗ trợ WebSockets
* Hỗ trợ truyền tải file MP4 và FLV
* Rewrite URL,…          
# 3. Tìm hiểu về Apache
## 3.1 Apache là gì ?
![](https://images.viblo.asia/35d9ca42-9ba2-438e-8756-01edfd3eb5c7.png)

Apache (chương trình máy chủ HTTP) có tên đầy đủ là Apache HTTP Server. Đây là một server mã nguồn mở miễn phí và được sử dụng phổ biến hiện nay. Apache server được hệ thống Apache Software Foundation phát triển và điều hành. Mọi yêu cầu sẽ được gửi đến server qua phương thức HTTP. Nếu sử dụng Apache, bạn chỉ cần thao tác đơn giản là nhập URL hoặc địa chỉ IP và ấn Enter. Server sẽ tiếp nhận URL hay địa chỉ IP mà bạn đã nhập.

Cũng giống như Nginx, Apache là chương trình máy chủ HTTP là một chương trình dành cho máy chủ đối thoại qua giao thức HTTP. Apache chạy trên các hệ điều hành tương tự như Unix, Microsoft Windows, Novell Netware và các hệ điều hành khác.

Khi được phát hành lần đầu, Apache là chương trình máy chủ mã nguồn mở duy nhất có khả năng cạnh tranh với chương trình máy chủ tương tự của Sun Java System Web Server. Từ đó trở đi, Apache đã không ngừng tiến triển và trở thành một phần mềm có sức cạnh tranh mạnh so với các chương trình máy chủ khác về mặt hiệu suất và tính năng phong phú.

Từ tháng 4 năm 1996, Apache trở thành một chương trình máy chủ HTTP thông dụng nhất. Hơn nữa, Apache thường được dùng để so sánh với các phần mềm khác có chức năng tương tự. Tính đến tháng 1 năm 2007 thì Apache chiếm đến 60% thị trường các chương trình phân phối trang web.
## 3.2 Apache hoạt động như thế nào?
Tuy được gọi là Apache web server nhưng nó không phải là server vật lý mà Apache chính là một phần mềm chạy trên server đó. Nhiệm vụ chính của Apache là thiết lập kết nối giữa server và browser (Firefox, Chrome, Safari,...), sau đó chịu trách nhiệm chuyển file qua lại giữa giữa server và browser (cấu trúc hai chiều client-server). Apache hoạt động tốt với cả server Unix và Windows và là phần mềm đa nền tảng.

Khi visitor tải một site trên trang web, ví dụ trang "About Us", browser của user sẽ gửi request tải trang đó lên server và Apache sẽ trả lại kết quả với đầy đủ toàn bộ các file, các thành phần để hiển thị hoàn chỉnh trang About Us (bao gồm image, text,...). Server và client giao tiếp với nhau qua HTTP protocol và Apache chịu trách nhiệm đảm bảo quá trình này diễn ra trơn tru và bảo mật giữa hai máy.

Apache là một nền tảng module có độ tùy biến khá cao. Modules cho phép quản trị viên server có thể tắt hoặc thêm vào các chức năng. Apache sở hữu các modules cho bảo mật caching, URL rewriting, chứng thực mật khẩu,...
## 3.3 Apache có những tính năng gì ?
**Apache cũng có các tính năng mà Nginx có như là :**
* Static file serving.
* SSL/TLS support.
* Virtual hosts.
* Reverse proxying.
* Load balancing.
* Compression.
* Access controls.
* URL rewriting.
* Custom logging.
* Server-side includes.
* Limited WebDAV.
* FLV streaming.
* FastCGI.

**Không những thế, Apache lại có những chức năng mở rộng hơn so với Nginx như sau:** 
* digest access authentication
* CGI
* administrative console
* .htaccess
## 3.4 Ưu nhược điểm của Apache
**Ưu điểm**
* Apache là phần mềm miễn phí mã nguồn mở
* Cấu hình đơn giản và thân thiện với cả những người mới bắt đầu làm quen với ứng dụng này
* Apache có độ ổn định và đáng tin cậy
* Phần mềm này được cập nhật thường xuyên
* Phát hiện và báo lỗi bảo mật liên tục giúp người dùng ngăn chặn kịp thời, không để thông tin bị đánh cắp
* Các thể thức cấu trúc Module linh hoạt
* Apache hoạt động hiệu quả và nhanh nhạy với WordPress sites
* Cộng đồng sử dụng Apache lớn nên có thể tương trợ và giải đáp mọi thắc mắc

**Nhược điểm**
* Thỉnh thoảng chậm hay gặp trục trặc trong quá trình truy vấn bởi có nhiều người truy cập Apache cùng một lúc
* Khả năng bảo mật đôi khi còn chưa hiệu quả bởi là App miễn phí nên người dùng có thể chọn nhiều cách thiết lập khác nhau
# 4. So sánh Nginx và Apache
## 4.1 Hiệu suất
### 4.1.1 Web tĩnh
![](https://images.viblo.asia/3566ad0a-bf0a-4a60-923b-0e0a579a49a6.jpg)

Nginx nhanh hơn 2,5 lần Apache dựa trên một thử nghiệm kiểm chuẩn chạy tới 1000 kết nối đồng thời.

Trong một thử nghiệm khác với 512 kết nối đồng thời, Nginx nhanh hơn khoảng 2 lần và và tiêu thụ ít bộ nhớ hơn (4%).

Như vậy trong vòng đối đầu đầu tiên, Nginx đã áp đảo Apache khi xử lý web tĩnh nhanh vượt trội. Vì vậy, nếu cần xử lý nhiều nội dung tĩnh thì Nginx là sự lựa chọn hoàn hảo dành cho bạn.
### 4.1.2 Web động
![](https://images.viblo.asia/305f8bb4-7f5b-4f8b-9d43-26f1850e98ea.jpg)

 Nếu bạn đã có một trang web động bằng WordPress, Joomla, Drupal, ... bạn có thể cân nhắc sử dụng NGINX hoặc Apache. Nội dung tĩnh trong các tình huống này ít hơn rất nhiều so với nội dung động.

Một lần nữa xem xét các bài kiểm tra điểm chuẩn của Speedemy và kết quả hoàn toàn giống nhau. Trong trường hợp này không có sự vượt trội so với NGINX. Tại sao lại như vậy? Hầu hết các request đang xử lý trong PHP runtime environment khá giống nhau cho cả hai web server.
## 4.2 Hệ điều hành hỗ trợ
![](https://images.viblo.asia/38c279e9-b2bd-4e94-aa8b-9c015da3829f.jpg)

Apache hoạt động trên tất cả các loại hệ thống Unix-like (Linux hoặc BSD) và hỗ trợ đầy đủ cho Microsoft Windows.

Nginx cũng chạy trên một vài hệ thống trong số chúng và cũng hỗ trợ Window tuy nhiên hiệu suất không được mạnh bằng.

## 4.3 Bảo mật
Cả Nginx và Apache đều rất coi trọng tính bảo mật trên trang web của mình. Không có hệ thống mạnh mẽ nào mà lại không có những biện pháp đối phó với các cuộc tấn công DDoS, phần mềm độc hại và phishing. Cả hai máy chủ này định kỳ phát hành báo cáo bảo mật và những tư vấn, đảm bảo rằng khía cạnh bảo mật được tăng cường ở mọi cấp độ.
## 4.4 Hỗ trợ & Tài liệu
![](https://images.viblo.asia/878c1cbd-7d16-4526-acc4-5ec2a5c39c2e.jpg)

Apache sở hữu mạng lưới hỗ trợ cộng đồng lớn thông qua mailing lists, IRC và Stack Overflow. Ngoài ra, còn có tùy chọn hỗ trợ bên thứ ba từ OpenLogic.

Tương tự, Nginx cũng có hỗ trợ thông qua mailing lists, IRC và Stack Overflow. Nginx còn có một sản phẩm có tên Nginx + có hỗ trợ riêng của Google bao gồm nhiều tính năng hơn.

Cả Nginx và Apache đều cung cấp tài liệu, bao gồm hầu hết mọi chủ đề và tính năng cần thiết. Tài liệu này bao gồm release notes, user guides, tutorials... Nginx thậm chí có wiki riêng!
## 4.5 Tính linh hoạt
Một máy chủ web phải đủ linh hoạt để cho phép các tùy chỉnh. Apache làm điều đó khá tốt, thông qua việc sử dụng các công cụ .htaccess mà Nginx không hỗ trợ. Nó cho phép phân cấp nhiệm vụ admin. Admin bên thứ ba và admin cấp hai có thể bị ngăn truy cập vào máy chủ chính. Hơn nữa, Apache hỗ trợ hơn 60 mô-đun, giúp nó có khả năng mở rộng cao. Đó là lý do tại sao Apache phổ biến hơn với các nhà cung cấp dịch vụ hosting chia sẻ.

## 4.6 Kết luận
Cả Nginx web server và Apache web server đều là những ứng cử viên sáng giá trong các lĩnh vực khác nhau. Nginx là người chiến thắng rõ ràng đối với các nội dung tĩnh, trong khi nội dung động không tạo ra sự khác biệt thực sự giữa các máy chủ web.

Apache xuất sắc hơn xét về tính linh hoạt, đặc biệt đối với shared hosting user. Tệp .htaccess của Apache và các mô-đun động chắc chắn sẽ phù hợp hơn, trong khi Nginx sẽ tốt hơn cho VPS và dedicated hosting.
# 5. Cách chọn đúng loại máy chủ cho trang web của bạn
Trong hầu hết các lĩnh vực, cả hai máy chủ này cạnh tranh tốt với nhau. Tuy nhiên, họ có những điểm mạnh riêng biệt. Apache đi kèm với tài liệu lớn hơn và hỗ trợ tốt hơn để tải các mô-đun động khác nhau, trong khi Nginx có thể phục vụ nhiều luồng nội dung và phương tiện tĩnh cho các trang web có lưu lượng truy cập cao.

Ngoài ra, cả hai máy chủ hiện cung cấp hỗ trợ và đào tạo thương mại. Tuy nhiên, nhiều nhà phát triển web sử dụng lưu trữ chia sẻ thích sự tiện lợi của Apache. Mặt khác, Nginx chủ yếu được sử dụng cho lưu trữ VPS và lưu trữ dành riêng .

Một tùy chọn khác để xem xét là sử dụng kết hợp Apache và Nginx. Nginx có thể được đặt trước Apache dưới dạng proxy ngược. Điều này tận dụng tốc độ xử lý nhanh của Nginx để xử lý tất cả các yêu cầu từ khách hàng. Đối với nội dung động, chẳng hạn như các tệp PHP, Nginx cung cấp yêu cầu cho Apache, xử lý kết quả và trả về trang được hiển thị.

Điểm mấu chốt là nếu bạn đang chạy một trang web có lưu lượng truy cập cao với nhiều nội dung tĩnh, Nginx có thể là một lựa chọn thông minh để xem xét. Ngoài ra, nếu bạn coi trọng cộng đồng hỗ trợ và sự giàu có của tài nguyên mà nó cung cấp, Apache là một lựa chọn thuận tiện.
# Tổng kết
Bài viết của mình đến đây là kết thúc. Hi vọng bài viết của mình có thể giúp bạn hiểu rõ hơn về Web Server, Nginx, Apache, biết được những điểm khác biệt giữa Nginx và Apache và từ đó biết cách chọn được web server phù hợp cho trang web của mình.

Bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm, và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn.

Cảm ơn các bạn đã dành thời gian cho bài viết của mình !!!
# Tài liệu tham khảo
https://dieuhau.com/nginx-va-apache-danh-gia-uu-nhuoc-diem/

https://serverguy.com/comparison/apache-vs-nginx/

https://duongtiendat.com/nginx-vs-apache-dau-la-web-server-tot-nhat/