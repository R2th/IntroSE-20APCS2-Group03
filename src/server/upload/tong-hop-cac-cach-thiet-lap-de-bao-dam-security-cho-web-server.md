### Lời mở đầu

Tôi đã tổng hợp qua các cách thiết lập để bảo đảm Security cho Web Server.
Nội dung này là do cá nhân tôi tìm hiểu nên sẽ không tránh được sai sót. Rất mong các bạn đóng góp ý kiến.

Trong bài viết này, tôi giả định: Nội dung thiết lập là dành cho Apache 2.4. Bạn nào đang dùng các HTTPd khác, vui lòng thay đổi cho phù hợp.
Các mục cần thiết lập trong bài viết đều lấy được điểm tương đương với điểm A+ trên trang test Online dưới đây.

Generate file setting
[Mozilla SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
Trang Test Online
[Mozilla Observatory](https://observatory.mozilla.org/)
[Qualys SSL Server Test](https://www.ssllabs.com/ssltest/)

### Điều kiện tiền đề

Các mục cần set dưới đây, là các mục đặc biệt có liên quan tới: Kết nối bằng HTTPS, chống tấn công...v.v
Về việc thiết lập liên quan tới các phần HTTPd, các bạn hãy tham khảo ở các bài viết khác.

### SSLProtocol

Nếu đang enable cho các Protocol cũ - ở trong trạng thái không an toàn:
Thì có khả năng, server của bạn sẽ bị tấn công downgrade - với mục tiêu là các Protocol cũ. Vì vậy, các bạn cần phải Enable Protocol mới.
Trong ví dụ dưới đây, tôi đang giới hạn kết nối là "only TLS1.2" . Vì vậy, có thể trên các trình duyệt cũ đã không còn kết nối được nữa. Các bạn hãy chú ý tới [Các trình duyệt có đối ứng](https://ja.wikipedia.org/wiki/Template:%E3%82%A6%E3%82%A7%E3%83%96%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8BTLS/SSL%E3%81%AE%E5%AF%BE%E5%BF%9C%E7%8A%B6%E6%B3%81%E3%81%AE%E5%A4%89%E5%8C%96).

```
ssl.conf
SSLProtocol -All +TLSv1.2
```

### SSLHonorCipherOrder

Tôi chọn ưu tiên thực hiện Setting server hơn là viết thuật toán mã hóa khi kết nối HTTPS.
Do đó, có thể phòng tránh được tấn công Downgrade.

```
ssl.conf
SSLHonorCipherOrder On
```

### SSLCipherSuite

Kết hợp với phần ghi trên, cần phải thu hẹp lại các thuật toán mã hóa, chỉ còn những phần mã hóa có cường độ cao.
Ví dụ dưới đây là ví dụ đảm bảo được mức độ an toàn cao, với nền tảng là các trình duyệt mới nhất.
Do việc quyết định thuật toán khá là khó, nên tôi suggest các bạn nên dùng các tool, như「[Mozilla SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)」...v.v
```
ssl.conf
SSLCipherSuite ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256
```

### SSLCompression

Nếu đang dùng chức năng nén SSL, các bạn có nguy cơ sẽ bị tấn công qua side chanel, ví dụ như: CRIME, BEAST...v.v Nên nhất định phải OFF phần này đi.
```

ssl.conf
SSLCompression off
```

### SSLUseStapling

Tôi sẽ Enable mục check việc thu hồi SSL Server Certificate 「OCSP (Online Certificate Status Protocol)」.
Việc này vừa nâng cao Security, vừa rút ngắn thời gian SSL Handshake trên trình duyệt.

```
ssl.conf
SSLUseStapling on
SSLStaplingResponderTimeout 5
SSLStaplingReturnResponderErrors off
SSLStaplingCache shmcb:/var/run/ocsp(128000)
```

### SSLSessionTickets

Với thủ thuật làm thỏa mãn「[Bí mật chuyển tiếp](https://ja.wikipedia.org/wiki/Forward_secrecy)」, tôi đã Disable chức năng Session Ticket đi.
Do vậy, nếu 1 key bị rò rỉ, thì các key khác không bị ảnh hưởng, vẫn đảm bảo được tính bí mật.

```
ssl.conf
SSLSessionTickets off
```

### Mutex

Apache tự động cấu hình các phần setting cho mutex, để các process luôn được đồng bộ.
Gía trị thiết lập dưới đây là giá trị mà tôi muốn suggest cho các bạn


```
ssl.conf
Mutex default ssl-cache
```

### Strict-Transport-Security Header

Hypertext Strict Transport Security(HSTS) là Policy dùng để bắt buộc phải kết nối HTTPS vào Web Browser.
Khi Web Browser access tới 1 trang đang được enable HSTS, thì Server sẽ thông báo cho Web browser là: từ lần sau sẽ access vào bằng HTTPS.
Do Web Browser cache thông tin này trên thiết bị, nên từ lần kết nối sau, sẽ luôn kết nối với HTTPS.
Vì khi HSTS ở trạng thái Enable, sẽ không cần phải redirec từ HTTP → HTTPS nên có thể nói rằng: việc này đặc biệt có hiệu quả trong việc ngăn chặn tấn công trung gian (MITM).

* [HTTP Strict Transport Security - MDN](https://developer.mozilla.org/ja/docs/Web/Security/HTTP_Strict_Transport_Security)
* [HSTS - IETF](https://tools.ietf.org/html/rfc6797)
* [HSTS - wikipedia](https://ja.wikipedia.org/wiki/HTTP_Strict_Transport_Security)
* 
### Phương thức thiết lập HSTS

Các bạn có thể thực hiện bằng việc: trả về header **Strict-Transport-Security** cho Client.
Option có thể chỉ định: sẽ theo như dưới đây:


| Item | Required | 
| max-age=[số giây] | ○ | 
| includeSubDomains     |    | 
| preload	     |    |

	
	
	

Nếu muốn set nhiều Option, bạn cần ngăn cách chúng bằng dấu chấm phẩy ;

```
ssl.conf
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

### max-age

Trong khoảng thời gian là số giây đã set tại đây, sẽ thực hiện cache phần HSTS Setting trên trình duyệt Web.
Đối với gía trị này các bạn cần set lớn hơn thời hạn 1 năm (31,536,000 giây).
Vì **Phía server không thể xóa được thông tin setting đã được lưu 1 lần trên trình duyệt** , nên cần phải check kỹ việc: trên domain không cần HTTP response.

### includeSubDomains

Nếu thực hiện thiết lập này, thì **toàn bộ Sub-domain** sẽ bị ảnh hưởng.
Nếu bạn chỉ cần chạy HTTP cho 1 phần Sub-domainn, thì tuyệt đối các bạn không được thiết lập Option này.

### preload

Bằng cách đăng ký HSTS Preload - thông qua [trang này](https://hstspreload.org/) , các phần setting được ghi trên trình duyệt chính, ngay trong lần kết nối đầu tiên, cũng sẽ không sử dụng HTTP.

※ Tôi có xem xét lại thì thấy: đây là phần setting  yêu cầu HTTPS phải chứa Sub-domain. Vì vậy, các bạn cần cân nhắc kỹ trước khi áp dụng.

### Content-Security-Policy Header

Content-Security-Policy(CSP) là phần thiết lập dùng để phát hiện, làm giảm ảnh hưởng của các hành vi tấn công như: Cross site Scripting, Data Injection...v.v 
Các bạn có thể giới hạn domain có thể nhúng các loại resource như: JavaScript/CSS/image/video/frame...v.v
**Nếu dùng domain bên ngoài, chưa bàn giao được**: thì hãy thiết lập tất cả các resource như dưới đây.

```
ssl.conf
Content-Security-Policy: default-src 'self'
```

Với các pattern thiết lập khác: vui lòng xem dưới đây.
[Contents Security Policy (CSP) - MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/CSP)

### Referrer-Policy Header 

Khi trình duyệt web access vào địa chỉ link,sẽ kiểm soát xem có gửi referer không.
Đặc biệt, nếu chưa quyết định site đích chuyển đến, thì giá trị thiết lập sẽ là 「same-origin (trong cùng 1 domain), rất OK

```
ssl.conf
Header always set Referrer-Policy "same-origin"
```

[Referrer-Policy - MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Referrer-Policy)

### X-XSS-Protection Header

Là thiết lập dùng để phòng tránh Cross site Scripting.
Nếu phát hiện ra tấn công trình duyệt Web, sẽ đề xuất các thiết lập khác, ví dụ như block hiển thị như dưới đây.

```
ssl.conf
Header always set X-XSS-Protection "1; mode=block"
```

[X-XSS-Protection - MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/X-XSS-Protection)

### X-Content-Type-Options Header

Đối với trình duyệt Web, thì đây là phần thiết lập dùng để cấm các hành vi như: ignore chọn Content - Type, rồi tự xử lý contents.
Đề xuất: nên thiết lập không tra kiểm tra (sniffing) toàn bộ HTTP Response.

```
ssl.conf
Header always set X-Content-Type-Options "nosniff"
```

### X-Frame-Options Header

X-Frame-Options(XFO) là phần thiết lập dùng để chặn Click Jacking bằng tag iframe
Nếu chưa sử dụng tag tương đương trong site: thì tôi recommend các bạn hãy thiết lập như dưới đây:

```
ssl.conf
Header always set X-Frame-Options DENY
```

### X-Permitted-Cross-Domain-Policies Header

Là header liên quan tới Adobe Acrobat/FlashPlayer.
Trên các site không xử lý các file này, server sẽ đề xuất là: không cho phép toàn bộ các file Policy.

```
ssl.conf
Header always set X-Permitted-Cross-Domain-Policies none
```

[Cross Domain Configuration - Adobe](https://www.adobe.com/devnet-docs/acrobatetk/tools/AppSec/xdomain.html)

### X-Download-Options Header

Trong trường hợp sử dụng header **Content-Disposition: attachment** , rồi download file về: Có thể thiết lập để không cho chạy file trực tiếp (không mở file luôn).

```
ssl.conf
Header always set X-Download-Options noopen
```

### Lời kết
Tôi còn muốn giới thiệu đến các bạn link website giải thích về các phần Secure Setting. Hãy tham khảo nhé.

[OWASP Secure Headers Project](https://www.owasp.org/index.php/OWASP_Secure_Headers_Project)

**Link bài gốc**: 

https://qiita.com/ariaki/items/78ed2d3810ad17f72398?utm_source=Qiita%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9&utm_campaign=6643d934e3-Qiita_newsletter_328_09_12_2018&utm_medium=email&utm_term=0_e44feaa081-6643d934e3-33433141

`Sưu tầm & Dich bài: Thanh Thảo`