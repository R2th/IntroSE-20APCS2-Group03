# Web Tracking
## Web Tracking là gì?
**Web tracking** là một cách thức (cũng như là một khả năng) của một trang web (sử dụng các công cụ phần mềm đặc biệt) để theo dõi khách truy cập trang web. Cụ thể hơn, **Web tracking** là cách thức mà các người quản trị website thu thập và chia sẻ thông tin về một hoạt động cụ thể của người dùng trên World Wide Web. Kết quả của việc phân tích thói quen sử dụng web của một cá nhân có thể được sử dụng để cung cấp những nội dung liên quan đến sở thích cũng như mong muốn của của họ.

Công việc của một **Web Tracker** vô cùng đơn giản - lưu giữ các hoạt động trên web của bạn. Chúng có thể lưu giữ tên (nếu bạn đăng kí một tài khoản nào đó), chúng cũng có thể biết được bạn thích gì, hay xem những trang web nào, thói quen tìm kiếm của bạn. Có thể bạn không biết nhưng một số **Web Tracking Website** sẽ chia sẻ thông tin đó với các trang web khác, để build lên một profile chính xác và đầy đủ hơn về bạn, để có thể gợi ý cũng nhưng cung cấp cho bạn những thông tin hoặc quảng cáo về những thứ bạn thích. Về cơ bản là vậy...

*"Ơ, sao Facebook lại biết mình thích cái abcxyz mà quảng cáo cho mình ???"* - Câu nói thường thấy ở team mình khi thấy một mẩu quảng cáo về một sản phẩm mà mới chỉ nhắc tới.
## Bạn bị theo dõi như thế nào?

Những đoạn code, hay còn gọi là **bugs** (không phải **bugs** lỗi đâu nha) được nhúng trên website thông báo tới tai các Quản trị Website mỗi khi bạn view một page nào đó. Nhiều Web sử dụng `cookies` để thu thập các thông tin trong lịch sử duyệt web của bạn. Đặc biệt là các mạng xã hội luôn luôn theo dõi thói quen người dùng để quảng cáo hiệu quả hơn.

Toàn bộ việc theo dõi này đều xảy ra mà bạn không hề hay biết (hay có sự đồng ý của bạn). Hầu hết các website yêu thích của bạn đều theo dõi các phiên làm việc và giải trí của bạn nhằm cung cấp thông tin cho hàng ngàn đơn vị quảng cáo, các công ty bán hàng để tăng lợi nhuận bằng việc hướng quảng cáo tới đúng người dùng có nhu cầu.

Browser Firefox đã tung ra một Add-on mới được gọi là **Lightbeam** giúp bạn biết được ai đang theo dõi bạn khi bạn đang Online. Tính năng này giúp bạn xem được các Web Tracker track được gì từ bạn, và cũng giúp bạn hiểu hơn về những thông tin và hoạt động cá nhân của bạn trên Web sẽ đi về đâu.

[Lightbeam](https://addons.mozilla.org/vi/firefox/addon/lightbeam/) cho Firefox.

[Disconnect](https://chrome.google.com/webstore/detail/disconnect/jeoacafpbcihiomhlakheieifhpjdfeo) cho Chrome.

Sau đây mình sẽ giới thiệu cho các bạn một vài kĩ thuật Tracking của các **Web Tracker** mà đa số người dùng không hề biết đến
# Web Bug/Beacon
## Web Beacon là gì?
Một **Web Beacon** thường được ẩn đi, "tàng hình", là một object ảnh luồn lách được vào máy tính của bạn. Chúng là những object nhỏ được nhúng vào các trang web cũng như email và được kích hoạt khi bạn truy cập trang web đó cũng như là mở mail có chứa chúng.

 **Web Beacon** được đặt vào website hay trong email và chúng theo dõi một phần nào đó những việc bạn làm trên mạng hoặc khi gửi email.
 
 Chúng thường được gọi với những cái tên khác là  "tags", "tracking bugs", "pixel trackers" hoặc "pixel GIFs". Chúng dường như vô hình bởi vì chúng quá nhỏ và thường không lớn hơn 1px x 1px. Chúng được xuất hiện dưới dạng format GIF (Graphic Interchange Format) - một định dạng khá phổ biến với các website. Do đó đối  với các browser thì chúng chỉ là một bức ảnh bình thường và khiến cho bạn và cả trình duyệt cũng không thế nhận ra được các 
**Web Beacon**.
## Tạo ra một Web Beacon cơ bản.
Để tạo ra một  **Web Beacon** (bằng PHP), chúng ta cần kích hoạt tính năng URL rewriting module (`mod_rewrite`) của Apache. Sau đó tạo một file `.htaccess` và viết đoạn sau vào file:

```php
RewriteEngine On
RewriteRule ^(.*).(png|jpg|gif)$ script.php
```

Sau đó tạo file `script.php`:

```php
<?php
$fullpath  = $_SERVER['REQUEST_URI'];
$filename  = basename($fullpath);
$ip        = $_SERVER["REMOTE_ADDR"];
$useragent = $_SERVER["HTTP_USER_AGENT"];

echo "Path: $fullpath;<br>
File: $filename;<br>
IP address: $ip;<br>
User agent: $useragent";
?>
```
Và khi bạn click vào GIF để hoặc mở GIF trên một tab mới. Ví dụ là GIF mèo này đi: 
![](https://images.viblo.asia/c92a72b0-e29f-4b7e-9837-bc0be2b3a1dc.gif)

Bạn sẽ được điều hướng tới 1 đường link http://abc.com/path/to/cat.gif và mong muốn được nhìn thấy GIF con mèo phải không,. Nah, thay vì thế mà bạn sẽ nhìn thấy một đoạn text:

```
Path: /path/to/cat.gif;
File: cat.gif;
IP address: 127.0.0.1;
User agent: Mozilla/5.0 [...];
```

Tuy URL trỏ đến file `cat.gif` nhưng thực tế `script.php` đã được thực thi. Bạn có thể thực thi code thì có bao nhiêu việc có thể làm với **Web Beacon** nữa?

## Web Beacon xâm nhập vào máy bạn như thế nào.
Một **Web Beacon** truy cập vào máy bạn qua Email hoặc trên một trang web mà bạn đã truy cập. Một số người gọi nó là "spyware" vì nó lưu lại các hoạt động online của bạn, nhưng trong hầu hết các trường hợp, đặc biệt là với các website thì chúng thường vô hại.

## Web Beacon được dùng để làm gì?
Chúng được dùng để track một phần các hoạt động online của bạn khi bạn nhận được một email hay truy cập một số trang web nhất định nào đó. Chúng được thiết kế và lập trình để theo dõi (một phần) các hoạt động của bạn để đưa thông tin này cho các đơn vị cần thiết. Các Website dùng chúng để biết được những ai đã truy cập trang web của họ. Các mạng lưới quảng cáo sử dụng chúng để thu thập thông tin về thói quen người dùng. Họ sử dụng **Web Beacon** để theo dõi xem các quảng cáo của họ được hiển thị như thế nào, và được xem bởi ai hoặc xem một cá nhân phản hồi tới một quảng cáo như thế nào.

Khi được sử dụng với mục đích xấu, các **Web Beacon** được các Spammer sử dụng để xác nhận xem một email có active hay không. Khi bạn click vào một email, **Web Beacon** sẽ được kích hoạt và gửi thông tin về cho người gửi (Spammer), đồng nghĩa với việc bạn đã mở email, và email của bạn là một email thật, có hoạt động. Bùm! chẳng mấy chốc mà hòm thư của bạn nhìn như một cái bãi rác với tràn ngập thư spam thư rác. Do đó bạn nên chú ý và bỏ ra vài giây để xác thực xem Email đó có đáng tin hay không trước khi mở.

Disable Cookies sẽ giúp bạn loại bỏ được vấn đề của các **Web Beacon**
# Flash Cookies
Một  **Flash Cookie** thường được biết đến với cái tên Local Shared Object, là một file text được gửi từ web server tới người dùng khi browser request tới các nội dung cần sử dụng đến Adobe Flash, một plug-in không hề xa lạ. 

**Flash Cookie** thường được dùng ở các tin quảng cáo trên Website và các video. Giống như **HTTP Cookie**, **Flash cookie** lưu trữ thông tin ở máy người dùng. Thông tin này giúp Website nhận ra bạn mỗi khi bạn quay lại Website. **Flash cookie** đôi khi cũng lưu trữ các thông tin mà **HTTP Cookie** lưu, tuy nhiên chúng còn có thể lưu được nhưng thông tin nhất định liên quan đến Flash như người dùng đã Pause/Stop video ở đâu, đã xem các banner quảng cáo Flash chưa ...

Không giống như **HTTP Cookie** được lưu tại trình duyệt, **Flash Cookie** được lưu riêng tại một file Adobe và được quản lý và gỡ bỏ riêng biệt bằng setting trong Adobe Flash Player. File **Flash Cookie** hay Local Shared Object có đuôi file là `.sol`.  Nhiều người không biết đến sự tồn tại của **Flash Cookie** cũng như việc khi họ xóa Cookie trên trình duyệt thì **Flash Cookie** không hề bị ảnh hưởng. Một điều cũng ít người biết tới đó là **Flash Cookie** có thể được dùng để phục hồi lại các  **HTTP Cookie** đã bị xóa. Quá trình phục hồi này gọi là `respawning`, việc này khá gây tranh cãi vì về cơ bản chúng có thể track người dùng trên nhiều Browser (Cross-browser Tracking) và vi phạm đến các vấn đề bảo mật vì việc sử dụng **Flash Cookie** thường không được đề cập tới trong chính sách bảo mật của nhiều trang web.

Để ngăn chặn nguy cơ lạm dụng Local Shared Object, Adobe đã update Flash để hạn chế việc `respawning` và cũng phổ biến thông tin trên website của họ về việc quản lý **Flash Cookie**. Adobe cũng đã liên kết với nhiều trình duyệt thông dụng để cung cấp cho người dùng quyền quản lý các Local Shared Object trên chính trình duyệt bằng API.

Cách xóa **Flash Cookie** tại [đây](https://www.wikihow.com/Delete-Flash-Cookies)

# Canvas fingerprinting
Thẻ `<canvas>` là một API của HTML5 dùng để vẽ đồ họa và hoạt ảnh trên trang web bằng việc sử dụng các script của JavaScript.

Nhưng ngoài việc đó ra thì  `<canvas>` còn là một cách để lấy được **browser fingerprinting** và dùng làm mục đích tracking online.

Kĩ thuật này được dựa trên việc một bản vẽ `<canvas>` có thể được render khác nhau với mỗi máy tính. Việc này xảy ra do một vài lý do. Ở tầng format hình ảnh - các trình duyệt dùng các engine xử lý hình ảnh khác nhau, các options xuất hình ảnh, độ nén ảnh, ... cho nên bức ảnh có thể giống nhau tới từng Pixel nhưng vẫn có thể có checksum khác nhau. Ở tầng hệ thống, hệ điều hành có các font chữ khác nhau, sử dụng nhưng thuật toán và cài đặt riêng cho việc khử răng cưa cũng như là [sub-pixel rendering](https://en.wikipedia.org/wiki/Subpixel_rendering)

![](https://images.viblo.asia/eb6e46de-1614-4f4f-a535-a65a9ba14ca3.jpg)

Các công ty quảng cáo lớn thường theo dõi người dùng nhằm xây dựng lên các hồ sơ về sở thích hay thói quen truy cập của từng cá nhân để cung cấp quảng cáo hiệu quả hơn.Tuy nhiên khi bạn xóa các tập tin cookie trên máy tính của mình hoặc sử dụng các trình duyệt ẩn danh, các công ty quảng cáo có thể sẽ không phát hiện được các thông tin về người dùng đang truy cập vào website của họ, làm cho quảng cáo kém hiệu quả và thu được ít lợi nhuận hơn. Vì vậy , các công ty luôn thử nghiệm và cố gắng tìm ra những cách tốt hơn để có được thông tin của người dùng truy cập website.

HTML5 Canvas không chỉ giới hạn tới việc xử lý hình ảnh mà còn có thể phát hiện hành động của người dùng bằng cách theo dõi bàn phím, chuột, hoặc thao tác cảm ứng trên màn hình điện thoại. Bạn có thể hiểu chi tiết về `<canvas>` tại [trang web của Mozilla](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial) và source code của **canvas fingerprinting** tại [Github](https://github.com/kmowery/canvas-fingerprinting)

HTML5 Canvas được hỗ trợ bởi tất cả các trình duyệt thông dụng tại thời điểm hiện tại, và có thể truy cập được ở hầu hết các thiết bị như PC, máy tính bảng và smart phone.  Bạn có thể truy cập vào trang web https://browserleaks.com/canvas để kiểm tra **canvas fingerprint** của bạn.

![](https://images.viblo.asia/230cf33a-fdeb-4769-b6bb-ecf9b89237f1.png)

Nguồn:
* [What Is Web Tracking?](https://whatismyipaddress.com/web-tracking)
* [What is a Web Bug/Beacon?](https://whatismyipaddress.com/web-beacon)
* [Flash cookie](https://whatis.techtarget.com/definition/Flash-cookies)
* [HTML5 Canvas Fingerprint — Widely Used Unstoppable Web Tracking Technology](https://thehackernews.com/2014/07/html5-canvas-fingerprint-widely-used.html)