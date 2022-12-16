A web developer’s primer on CORS, CSP, HSTS, and all the web security acronyms!

Có nhiều lý do để tìm hiểu về bảo mật web, chẳng hạn:

* Là user, bạn lo rằng thông tin cá nhân của mình có thể bị lộ
* Là web developer, bạn muốn ứng dụng web phải bảo mật hơn
* Là web developer đang tìm việc, và bạn muốn sẵn sàng nếu nhà tuyển dụng hỏi bạn về web security

Bài viết này sẽ giải thích một số khái niệm về bảo mật web cách dễ hiểu và chính xác.

Trước đó, hãy cùng làm rõ một số khái niệm căn bản về bảo mật.

### Hai khái niệm căn bản của bảo mật
#### Không ai hoàn toàn an toàn (No one is ever 100% safe)
Bạn không thể được bảo vệ hoàn toàn khỏi việc bị hack. Nếu ai đó với bạn như vậy thì họ đã sai.

#### Một lớp bảo mật là không đủ
Bạn không thể chỉ nói...

>> Ờ, tôi cài CSP nên tôi an toàn rồi. Tôi có thể loại trừ khả năng bị tấn công XSS khỏi danh sách lỗ hổng vì điều này không thể xảy ra nữa.

Tôi nghĩ một lý do mà nhiều lập trình viên dễ dàng suy nghĩ như vậy là rất nhiều đoạn mã thường theo logic 0 hoặc 1, đúng hoặc sai. Nhưng bảo mật không đơn giản như vậy.

Chúng ta sẽ bắt đầu với một thứ mà mọi web developer đều gặp phải khi bước chân vào ngành nghề này. Và rồi bạn tìm trên StackOverflow và thấy một mớ câu trả lời chỉ cách bạn bypass nó.

### Cross-Origin Resource Sharing (CORS)

Bạn đã từng gặp lỗi này chưa nhỉ?

```
No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.
```

Không chỉ mình bạn đâu, thử google và sẽ có ai đó nói rằng cài cái này cái nọ là mọi vấn đề của bạn sẽ hết!

**CORS là để bảo vệ bạn, chứ không phải làm khó dễ cho bạn!**

Để giải thích cách CORS giúp bạn, đầu tiên là nói về cookie, cụ thể là *authentication cookie*. *Authentication cookie* được dùng để báo cho server là bạn đã đăng nhập, và chúng được tự động gửi với bất kỳ request đến server.

Giả sử bạn đăng nhập vào Facebook, và họ dùng *authentication cookie*. Bạn click vào một link X, và được redirect đến website Y. Một script trong site Y sẽ tạo một request client-side đến Facebook có kèm theo *authentication cookie* của bạn!

Nếu không có CORS, chúng có thể chỉnh sửa tài khoản của bạn. Rồi link X sẽ được post trên timeline của bạn, bạn bè click vào nó, rồi chúng lại được post trên timeline của họ... Vòng lặp tiếp tục và ảnh hưởng toàn bộ người dùng trên Facebook...

Với CORS, Facebook chỉ cho phép request với origin là facebook.com được chỉnh sửa dữ liệu trên server của họ. Nói cách khách, họ hạn chế chia sẻ tài nguyên giữa các địa chỉ web... Bạn có thể thắc mắc...

>> Nếu site Y đổi origin header ở mỗi request để trông nó giống như được gửi từ facebook.com thì sao?
>> 

Tất nhiên là họ có thể thử, nhưng nó sẽ không hoạt động vì trình duyệt sẽ bỏ qua và chỉ dùng nguồn thật.

>> Ok, vậy nếu site Y gửi request kiểu server-side thì sao?

Trong trường hợp này, họ có thể bypass CORS, nhưng cũng chẳng hề gì vì không thể gửi *authentication cookie* của bạn đi được. Đoạn mã cần được thực thi ở phía client để truy cập được cookie của bạn.

### Content Security Policy (CSP)
Để hiểu CSP, đầu tiên cần nói về một trong những lỗ hỗng phổ biến nhất: XSS, viết tắt của cross-site scripting.

XSS là khi một ai đó inject JavaScript vào code client của bạn. Có thể bạn nghĩ...

>>Họ muốn gì? Đổi màu đỏ sang xanh à?

Giả sử ai đó thành công inject JavaScript vào code client của website bạn đang truy cập.

Chúng có thể làm được gì nữa?

* Chúng có thể gửi HTTP request đến site khác dưới định danh là bạn.
* Chúng có thể thêm một đường link dẫn bạn đến một trang web khác mà trông giống với trang web bạn đang truy cập, khác cái là nhiều mã độc hơn
* Chúng có thể thêm thẻ script trong JavaScript
* Chúng có thể thêm đoạn mã để download file JavaScript từ đâu đó
* Chúng có thể thêm một frame cover trang web, trông na ná một phần của website và bảo bạn điền mật khẩu

Và vô số khả năng khác.

CSP cố gắng ngăn chặn điều này bằng cách giới hạn:

* những thứ có thể mở trong một iframe
* dạng stylesheet nào có thể được tải
* nơi request được tạo...

Bằng cách nào?

Khi bạn click vào link hoặc nhập URL vào thanh địa chỉ, trình duyệt tạo một GET request. Server trả về HTML kèm theo một số HTTP header. Nếu bạn tò mò header gì, thì hãy mở tab Network trong console, và truy cập một vài website.

Bạn gặp một response header như sau:

```
content-security-policy: default-src * data: blob:;script-src *.facebook.com *.fbcdn.net *.facebook.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* 'unsafe-inline' 'unsafe-eval' *.atlassolutions.com blob: data: 'self';style-src data: blob: 'unsafe-inline' *;connect-src *.facebook.com facebook.com *.fbcdn.net *.facebook.net *.spotilocal.com:* wss://*.facebook.com:* https://fb.scanandcleanlocal.com:* *.atlassolutions.com attachment.fbsbx.com ws://localhost:* blob: *.cdninstagram.com 'self' chrome-extension://boadgeojelhgndaghljhdicfkmllpafd chrome-extension://dliochdbjfkdbacpmhlcpmleaejidimm;
```

Đó là *content security policy* của facebook.com. Để tôi format lại cho dễ nhìn:

```
content-security-policy:
default-src * data: blob:;
script-src *.facebook.com *.fbcdn.net *.facebook.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* 'unsafe-inline' 'unsafe-eval' *.atlassolutions.com blob: data: 'self';
style-src data: blob: 'unsafe-inline' *;
connect-src *.facebook.com facebook.com *.fbcdn.net *.facebook.net *.spotilocal.com:* wss://*.facebook.com:* https://fb.scanandcleanlocal.com:* *.atlassolutions.com attachment.fbsbx.com ws://localhost:* blob: *.cdninstagram.com 'self' chrome-extension://boadgeojelhgndaghljhdicfkmllpafd chrome-extension://dliochdbjfkdbacpmhlcpmleaejidimm;
```

Bây giờ, hãy duyệt qua từng directive.

* default-src hạn chế những chỉ thị CSP khác mà không được liệt kê rõ ràng
* script-src hạn chế đoạn mã được tải
* style-src hạn chế stylesheet được tải
* connect-src hạn chế URL được tải sử dụng script, chẳng hạn qua fetch, XHR, ajax...

Lưu ý rằng có nhiều chỉ thị CSP khác thay vì chỉ 4 như ví dụ trên. Trình duyệt sẽ đọc CSP header và áp dụng những chỉ thị đó đến mọi thứ trong file HTML. Nếu chỉ thị được thiết lập đúng thì chúng sẽ chỉ cho phép những cái cần thiết.

Nếu không có CSP header nào thì mọi thứ được pass không hạn chế. Những chỗ nào bạn thấy ký hiệu * tức là wildcard, có nghĩa là cho phép mọi thứ.

### HTTPS hoặc HTTP Secure

Hẳn là bạn đã nghe về HTTPS. Có thể bạn cũng đã nghe ai đó nói rằng...

>> Tại sao phải dùng HTTPS nếu tôi chỉ dùng website để chơi game.

Hoặc...

>> Có điên mới không cài HTTPS. Năm nào rồi, đừng tin bố con thằng nào cả.

Chắc bạn có nghe tin Chrome sẽ đánh dấu website *insecure* nếu không có HTTPS.

Về căn bản, HTTPS khá đơn giản. HTTPS được mã hóa còn HTTP thì không.

Vậy tại sao điều này lại cần được quan tâm nếu bạn không gửi những thông tin nhạy cảm?

Hừm, hãy sẵn sàng cho một thuật ngữ khác... MITM, tức là *Man in the Middle*.

Nếu bạn đang dùng Wi-fi công cộng không mật khẩu ở quán cafe, rất dễ dàng để ai đó giả lập router, và mọi request cũng như response sẽ phải đi qua họ. Nếu dữ liệu của bạn không được mã hóa thì họ có thể làm bất cứ thứ gì họ muốn với no. Họ có thể chỉnh sửa HTML, CSS hoặc JavaScript thậm chí trước khi nó được gửi đến trình duyệt của bạn. Với những gì XSS có thể làm được ở trên, chắc bạn cũng tưởng tượng ra hậu quả sẽ tệ hại như thế nào.

>> Ok, nhưng nếu đó là máy tính của tôi, và server biết cách encrypt/decrypt nhưng MITM thì không?

Đó chính là lúc SSL (Secure Sockets Layer) và gần đây là TLS (Transport Layer Security) được đề cập. Tuy nhiên điều này nằm ngoài phạm vi bài viết.

### HTTP Strict-Transport-Security (HSTS)

Phần này thậm chí còn đơn giản hơn. Hãy dùng header Facebook làm ví dụ:

```
strict-transport-security: max-age=15552000; preload
```

* max-age xác định một trình duyệt nên ghi nhớ để buộc người dùng truy cập website bằng HTTPS trong bao lâu
* preload không quan trọng cho bài viết này. Nó là một service được host bởi Google và không phải là một phần của HSTS

Header này chỉ áp dụng nếu bạn truy cập site sử dụng HTTPS. Nếu bạn dùng HTTP thì header này sẽ bị bỏ qua.

Một lần nữa hãy dùng ví dụ về Facebook để mô tả lợi ích của header này trong thực tế. Bạn đang truy cập facebook.com lần đầu, và bạn biết HTTPS an toàn hơn HTTP, nên bạn truy cập qua đường link https://facebook.com. Khi trình duyệt nhận HTML, nó nhận header trên và chỉ thị trình duyệt nên redirect bạn đến HTTPS cho những request trong tương lai. Một tháng sau, ai đó gửi một đường link đến Facebook sử dụng HTTP, http://facebook.com, và bạn click vào link này. Một một tháng bé hơn 15552000 giây (được định nghĩa ở directive *max-age*), nên trình duyệt sẽ gửi request là HTTPS, tránh nguy cơ bị MITM attack.

### Kết luận
Bảo mật web (web security) quan trọng trong bất kỳ thời điểm nào. Bạn càng tiếp xúc nhiều với nó, bạn càng có lợi. Bảo mật quan trọng với tất cả mọi người, không riêng gì những người có chuyên ngành về bảo mật. 👮

Tham khảo: https://medium.com/free-code-camp/a-quick-introduction-to-web-security-f90beaf4dd41