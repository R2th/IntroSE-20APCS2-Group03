Khi nhắc đến XSS thì hầu hết các Tester đều biết đến vì đây là 1 trong những lổ hổng bảo mật được khai thác phổ biến nhất hiện nay (được nằm trong danh sách Top 10 OSWAP) đối với các ứng dụng web và gây ra nhiều hệ quả nghiêm trọng.

Mục tiêu đa phần mà XSS nhắm tới là thực thi mã độc ở phía trình duyệt, nhằm đánh cắp dữ liệu ở phía người dùng (ví dụ: cookies, session) để có thông tin chứng thực user khi truy cập trái phép vào hệ thống.

Nếu sau bài viết này mà có đứa bạn nào bảo với bạn rằng "Ơ cái lỗi hiện lên có cái thông báo mà làm ăn gì?", thì bạn hãy bình tĩnh và nhẹ nhàng đặt bàn tay lên đôi môi của nó nha :)

Ok đùa thế thôi, bài viết hôm nay sẽ hơi lý thuyết 1 chút nhưng mình sẽ tóm lược ngắn nhất có thể, chúng ta bắt đầu thôi!!!
# 1. XSS (Cross-site Scripting)  là gì?
- XSS là kỹ thuật tấn công injection từ phía Client (hay còn gọi là Client-Side Attack) và là cuộc tấn công phổ biến nhất, kẻ tấn công có thể khai thác tất cả các thông tin người dùng bằng cách thêm vào những lệnh độc hại. 
- Khi người dùng tương tác với chức năng có nhiễm XSS đã được inject từ trước, thông tin của người dùng (có thể là cookie hoặc gì đó khác tùy vào đoạn code mà hacker sử dụng) sẽ bị hacker lấy mất.

Các lỗ hổng trên nhiều trang web thường cho phép kẻ tấn công giả dạng thành người dùng nạn nhân, thực hiện bất kỳ hành động nào mà người dùng có thể thực hiện và truy cập bất kỳ dữ liệu nào của người dùng như thêm, xóa , sửa.

Nếu người dùng nạn nhân có quyền truy cập đặc quyền trong ứng dụng, thì kẻ tấn công có thể có toàn quyền kiểm soát tất cả các chức năng và dữ liệu của ứng dụng.

*Ví dụ dễ hiểu: Kẻ tấn công giả thành mình => sẽ trở thành Sơn pha-ke*
# 2. XSS hoạt động như thế nào?
Cross-site scripting hoạt động bằng cách điều khiển một trang web bị tấn công để nó trả về JavaScript độc hại cho người dùng. Khi mã độc thực thi bên trong trình duyệt của nạn nhân, kẻ tấn công hoàn toàn có thể control được tương tác của người dùng với ứng dụng.
# 3. Nguyên nhân gây ra XSS
Nguyên nhân chính gây ra những cuộc tấn công này là chưa được xác thực đầu vào của dữ liệu người dùng không phù hợp. Từ đó  dữ liệu độc hại đều có thể xâm nhập vào và kết quả là các dữ liệu đầu ra bị nhiễm mã độc. 

Kẻ tấn công sẽ nhập vào một script tùy vào mục đích. Chính lúc đó, trình duyệt lại không thể biết được loại mã thực thi này có độc hại hay là không.
# 4. Ví dụ về XSS chân thực nhất mà mình từng xem
*(Link video ở phần cuối bài nha mọi người)*

Đầu tiên là có 1 website mua bán xe và Bob có thể đăng bài để mua hoặc bán xe tùy ý.
Khi truy cập vào website, server sẽ authen user này và lấy trong database ra danh sách các đơn hàng đang bán.

![](https://images.viblo.asia/d71dd025-b3b5-4f1a-8df7-c1757f45eac6.PNG)

Khi bấm vào Nhập thông tin bán sẽ có form hiện ra yêu cầu user nhập thông tin để bán, và các bạn để các có 1 cặp thẻ b ở phần cuối description nhá

Sau khi submit, server sẽ xác thực đây là **Bob** và lưu trữ lên database

![](https://images.viblo.asia/1ce125e1-758c-4aaa-9452-3fa13668d1b5.PNG)


Ok, bây giờ có 1 hacker tên là **Mel** cũng có tài khoản người dùng và truy cập vào website, sau khi bấm vào đơn của **Bob** đã yêu cầu phía trên thì Mel sẽ thấy đoạn text trong thẻ b được in đậm.

Từ đây **Mel** sẽ suy luận ra là có thể chèn được html tag vào input của form bán

![](https://images.viblo.asia/14286f39-5c3c-474c-a479-e6abef634c71.PNG)

**Mel** sẽ thực hiện tấn công bằng cách chèn 1 đoạn script vào phần descrition
Server vẫn sẽ xác thực **Mel** như người dùng thông thường và lưu trữ đơn hàng độc hại vào database

![](https://images.viblo.asia/5095c026-e052-4119-82af-0754176210bf.PNG)

Xong bây giờ lại có thêm người dùng khác tên là **Alice** lên đây và mua xe, sau khi xác thực thì server sẽ trả về danh sách các đơn hàng

![](https://images.viblo.asia/3f47bdbf-125a-48f9-b865-460aed7c7fc1.PNG)

Sau khi **Alice** bấm vào đơn **Extremely cheap** của **Mel** thì trình duyệt sẽ thực thi đoạn mã độc được Mel chèn vào trước đó
**Cookie** của **Alice** sẽ được gửi đến web server của **Mel**

![](https://images.viblo.asia/ea9acbfa-a715-42ff-ad06-03ab13ff49c8.PNG)

Vậy là đoạn script trên đã thực hiện và gửi về mail của **Mel** đoạn **cookie** vừa đánh cắp từ **Alice**, trong khi **Alice** vẫn đang kiểu như “tôi là ai, đây là đâu?” :v: 

![](https://images.viblo.asia/dd601a62-d99e-49c2-9eb4-99d886bcc00a.PNG)

Bây giờ **Mel** đã trở thành **Alice giả mạo** gọi là **Malice**

**Alice giả mạo** tiếp trục truy cập vào website với **cookie** vừa trộm được từ **Alice** sau đó truy cập thẳng vào thông tin của **Alice**. 

Lúc này, trình sẽ vẫn xác thực **Alice giả mạo** như là **Alice** và trả thông tin về cho **Mel**
Từ các tấn công này, **Mel** sẽ có thể tấn công nhiều user khác tương tự như **Alice**

![](https://images.viblo.asia/ca8c2838-c134-43da-bb1f-70da333515d5.PNG)

# 5. Các loại tấn công XSS
## 5.1. Reflected cross-site scripting
Là loại tấn công đơn giản nhất. Nó phát sinh khi một ứng dụng web nhận được một request với các đoạn script độc hại từ yêu cầu mà vẫn thực thi và trả về.

**Ví dụ:** Ta có 1 website có request kèm param đằng sau là message được gửi đi rồi trả về thẻ p
```
https://insecure-website.com/status?message=All+is+well. 
<p>Status: All is well.</p>
```
Do không thực hiện các biện pháp xử lý dữ liệu cho nên hacker có thể sử dụng đoạn mã script ở param message để tấn công
```
https://insecure-website.com/status?message=<script>/*+Bad+stuff+here...+*/</script>
<p>Status: <script>/* Bad stuff here... */</script></p>
```
Vì vậy nếu user đi vào đường link mà hacker đã inject script vào thì đoạn script sẽ được thực thi ngay lập tức. Tùy theo mục đích của hacker mà có thể chôm mọi thông tin và đặc quyền của user.

Nhưng cách tấn công này có 1 nhược điểm là nếu muốn ăn cắp dữ liệu từ 1 nạn nhân nào đó thì phải cố gắng thuyết phục bấm vào link 

> Kiểu như "Nhấp vào nhận khuyến mãi 2 triệu từ coca cola" hay là "Ngọc Sơn ơi, bạn đã trúng thưởng xe máy Exciter với giá trị lên đến 50 triệu đồng, mau mau làm thủ tục ngay nào :v" 😊 (ước gì)
## 5.2 Stored Cross-Site Scripting
Như phần ví dụ của website mua bán ở trên là 1 ví dụ điển hình của Stored XSS, dữ liệu sẽ được lưu trữ lại và sẽ được kích hoạt khi có ai đó mở nó ra. Mức độ bị tấn công cao hơn so với kiểu tấn công thứ nhất, hacker chỉ việc đợi cho có người kích hoạt mà thôi.

Hacker có thể inject mã độc vào các nơi mà chúng ta không ngờ tới như comment trên blog, tên của người dùng hiển thị hoặc chi tiết các đơn hàng, blabla, ….

***Ví dụ: Các bạn có thể kéo lên xem lại ví dụ ở phần 3 Ví dụ nhé*** 😊
## 5.3. DOM-based Cross-Site Scripting
Đúng như tên gọi thì DOM khái quát kiểu như sẽ có nhiệm vụ xử lý các vấn đề như chuyển đổi thuộc tính của thẻ, đổi cấu trúc HTML của thẻ. (các bạn google DOM HTML tìm hiểu nhé)

Vậy DOM-based XSS là kiểu tấn công dựa trên DOM, cái này thì trái ngược với 2 cái ở trên, nếu như 2 cái trên thì các request được xử lý bởi server thì cái này lại xử lý ở Client không cần thông qua server.

**Ví dụ:** Các đoạn script dùng để xử lý giá trị input đầu vào và sau đó gán vào innerText của html
```
var search = document.getElementById('search').value;
var results = document.getElementById('results');
results.innerHTML = 'You searched for: ' + search;
```
Hacker sẽ thay input đầu vào bằng mã lệnh độc hại như 
`<img src=1 onerror='/* Bad stuff here... */'>`
Thì theo như logic html sẽ render ra là 
`You searched for: <img src=1 onerror='/* Bad stuff here... */'>` kèm theo đó là alert khi load img bị lỗi.

Trong trường hợp điển hình thì DOM-based XSS sẽ được thực hiện same same như Reflected XSS ở phần 1, trường input đầu vào sẽ được điền vào bằng 1 http request chẳng hạn như param của url cho phép hacker tấn công thông qua các url độc hại.
# 6. XSS có thể được hacker sử dụng như thế nào?
Kẻ tấn công XSS trên trang web thường có thể:
- Mạo danh hoặc giả dạng người dùng là nạn nhân.
- Thực hiện bất kỳ hành động nào mà người dùng có thể thực hiện.
- Đọc bất kỳ dữ liệu nào mà người dùng có thể truy cập.
- Nắm bắt thông tin đăng nhập của người dùng.
- Có thể thực hiện thay đổi giao diện của trang web.
- Chèn trojan vào trang web.
# 7. Tác động của XSS nghiêm trọng như thế nào?
Tác động thực tế của một cuộc tấn công XSS thường phụ thuộc vào bản chất của ứng dụng, chức năng và dữ liệu của ứng dụng cũng như trạng thái của người dùng bị xâm phạm. 

**Ví dụ:** 
- Trong một ứng dụng, nơi tất cả người dùng đều ẩn danh và tất cả thông tin đều được công khai, tác động thường sẽ là tối thiểu.

- Trong một ứng dụng chứa dữ liệu nhạy cảm, chẳng hạn như giao dịch ngân hàng, email hoặc hồ sơ, tác động thường sẽ nghiêm trọng.

 - Nếu người dùng bị xâm phạm có các đặc quyền cao trong ứng dụng, thì tác động thường sẽ rất nghiêm trọng, cho phép kẻ tấn công có toàn quyền kiểm soát ứng dụng.
# 8. Cách ngăn ngừa và phòng chống XSS
## 8.1 Giai đoạn đang phát triển
(tức là đang được phát triển :v là đang được code nha)

Các phương pháp được sử dụng phổ biến sẽ bao gồm:
- Filter input on arrival: Lọc dữ liệu đầu vào bao gồm các rule như sau
    - Encode HTML Trước khi chèn dữ liệu không tin cậy vào HTML Element
        - **Ví dụ:** `<div> ...ENCODE UNTRUSTED DATA BEFORE PUTTING HERE... </div>`
    - Encode các kí tự bằng HTML Entities.
        - ```
            Ví dụ: 
            & --> &amp;
            < --> &lt;
            > --> &gt;
            " --> &quot;
            ' --> &#x27;
            ```
    - Encode các Attribute của HTML Trước khi chèn dữ liệu không tin cậy vào HTML Attribute (như là width, name, value, blabla)
        -  **Ví dụ:** `<div attr="...ENCODE UNTRUSTED DATA BEFORE PUTTING HERE...">content`
    - Encode các giá trị của Javascript trước khi chèn dữ liệu không tin cậy vào giá trị của Javascript
        - **Ví dụ:** `<script>alert('...ENCODE UNTRUSTED DATA BEFORE PUTTING HERE...')</script>`
    - Encode Url trước khi chèn dữ liệu vào param
        -  **Ví dụ:** `<a href="http://www.somesite.com?test=...ENCODE UNTRUSTED DATA BEFORE PUTTING HERE...">link</a >`
- Use appropriate response headers: Sử dụng Content-Type định nghĩa kiểu dữ liệu server trả về hoặc có thể có thêm X-XSS-Protection nhằm hạn chế cuộc tấn công XSS.
    - **Ví dụ**: ```Content-Type: application/json; charset=utf-8 (quy định kiểu dữ liệu trả về là json nếu không cần thiết trả lại các kiểu dữ liệu khác như html, javascript, blabla)```
    - **Ví dụ sử dụng X-XSS-Protectiton Header:** ```X-XSS-Protection: 1; mode=block``` (bật chế độ xss filtering -> tự đông detect và loại bỏ những phần mã độc hại không an toàn)
- Content Security Policy: Là 1 cơ chế bảo mật của trình duyệt nhằm mục đích giảm thiểu XSS và 1 số cuộc tấn công khác, nó hoạt động bằng cách hạn chế hay cho phép những resource (hình ảnh, video, ...) được truy cập từ trang nào, giúp chặn những request độc hại bằng cách ta cấu hình ở trong header của request
    - **Ví dụ:** ```Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com``` (cho phép ảnh có thể load từ bất cứ đâu, media thì chỉ có thể từ media1 và media2, script chỉ được thực thi từ  *userscripts.example.com*)
- Có thể sử dụng nhiều lớp mã hóa theo thứ tự hợp lý để giảm khả năng bị tấn công XSS
    - **Ví dụ:** Escape kí tự người dùng nhập vào trước rồi đưa xuống backend xử lý thêm 1 lần ecode các kí tự nhập vào 1 lần nữa. 
## 8.2 Giai đoạn Release
- Chúng ta sẽ đặt rule cho WAF (Web Application Firewall) để WAF nhận biết được đó là tấn công XSS và block nó đi (thường thì WAF sử dụng blacklist để block các dòng mã độc hại).
    - **Ví dụ:** Trong blacklist chúng ta đã lọc các kí tự như <,>,[,],{,}, etc.... thì khi chúng ta nhập thử 1 đoạn ```<script>alert(1)</script>``` hoặc ```<IMG SRC="javascript:alert('XSS');">``` thì các kí tự như < hay > nằm trong blacklist sẽ được dectect và lọc ra.

Ví dụ với Amazon Server thì ta có thể cấu hình waf matches với option Contains XSS Injection Attacks và chuyển text transformation thành html entity decode
![](https://images.viblo.asia/c546b8a4-19fb-4f74-8a63-0b7a9eeee8b0.PNG)

- Hoặc còn cách khác là có thể kích hoạt Mod Security và set rule của Apache lại (link ở phần tham khảo nhé).
# 9. Danh Sách 20 Cheat Sheet XSS Thường Dùng

| CODE | Ý Nghĩa |
| -------- | -------- |
| <input onchange=alert(1) value=xss>     | Bay ra alert sau khi thay đổi giá trị, có thể áp dụng cho input, select và textarea     | 
| <xss onclick="alert(1)">test</xss> | Bay ra alert mỗi khi click vào |
| <xss draggable="true" ondrag="alert(1)">test</xss> | Bay ra alert mỗi khi kéo object |
| <xss ondrop= contenteditable>drop here</xss> | Bay ra alert khi thả 1 content nào đó vào |
| <input id=x tabindex=1 onfocus=alert(1)> | Bay ra alert khi focus vào element |
| <input oninput=alert(1) value=xss> | Bay ra alert khi nhập vào input, áp dụng cho input và textarea |
| <xss onkeydown="alert(1)" contenteditable>test</xss>	| Bay ra alert khi nhấn bất kì phím nào xuống, trừ Alt-f4 :v |
| <body onload=alert(1)> | Bay ra alert khi body được load, có thể áp dụng với một số element khác. |
| <xss onmouseover="alert(1)">test</xss> | Bay ra alert khi rê chuột ngang qua element |
| <xss onmouseup="alert(1)">test</xss> | Bay ra alert khi thả nút chuột ra, bấm giữ im thì nó không bay ra :v |
| <audio autoplay onplay=alert(1)><source src="validaudio.wav" type="audio/wav"></audio> | Bay alert alert khi play audio hoặc video |
| <xss class="carousel slide" data-ride=carousel data-interval=100 ontransitionend=alert(1)><xss class=carousel-inner><xss class="carousel-item active"></xss><xss class=carousel-item></xss></xss></xss> | Bay ra alert khi load mấy cái component carousel của bootstrap lên :v |
| <body onscroll=alert(1)><div style=height:1000px></div><div id=x></div> | Bay ra alert khi scroll chuột |
| <input onselect=alert(1) value="XSS" autofocus> |	Bay ra alert mỗi khi tô chọn vô text |
| <form onsubmit=alert(1)><input type=submit> | Bay ra alert khi submit form |
| <xss oncopy=alert(1) value="XSS" autofocus tabindex=1>test | Bay ra alert khi copy |
| <svg><animate onend=alert(1) attributeName=x dur=1s> | Bay ra alert khi svg animation load xong |
| <form><input oninvalid=alert(1) required><input type=submit> | Bay ra alert khi dữ liệu submit không hợp lệ, thường đi chung với form. Áp dụng cho input và textarea |
| <body onresize="alert(1)"> | Bay ra alert khi window resize |
 
# 10. Tổng Kết
 Vậy mình đã tóm tắt lại lý thuyết cũng như cách thức hoạt động và cách phòng chống XSS, cảm ơn mọi người đã đọc hết bài viết.

Nếu bài viết có sơ sót, các bạn có thể đóng góp ý kiến thêm để các bài viết sau tốt hơn ạ.

Chúc mọi người thành công.

# Tham Khảo
- XSS: https://portswigger.net/web-security/cross-site-scripting
- Video: https://www.youtube.com/watch?v=cbmBDiR6WaY
- How To Prevent XSS: https://www.youtube.com/watch?v=oEFPFc36weY
- How To Prevent XSS: https://portswigger.net/web-security/cross-site-scripting/preventing
- Configure Rule Firewall To Prevent SQLI & XSS Attack: https://www.blackhat.com/presentations/bh-usa-04/bh-us-04-mookhey/old/bh-us-04-mookhey_whitepaper.pdf
- Configure Rule WAF For Apache: https://www.linode.com/docs/guides/configure-modsecurity-on-apache/
- CheatSheet 2021 By PortSwigger: https://portswigger.net/web-security/cross-site-scripting/cheat-sheet