![](https://images.viblo.asia/af27f104-0b2e-4ea5-bc92-6509552bf657.png)

Ứng dụng web tồn tại vô số điểm yếu, từ những điểm yếu bé xíu như lộ thông tin không quan trọng của Web server đến những điểm yếu to đùng như thực thi mã trên server ([RCE](https://en.wikipedia.org/wiki/RCE)). Những điểm yếu đứng top đầu trong [TOP 10 OWASP](https://owasp.org/www-project-top-ten/) sẽ được rất nhiều người chú ý và khai thác. Nhưng nay, ta sẽ không bàn đến những điểm yếu to đùng đó mà bàn bạc đến một điểm yếu kém to hơn đó là CORS.

Để hiểu được cách khai thác điểm yếu CORS ta cần tìm hiểu một số kiến thức liên quan như: 

+ SOP (Same-Origin Policy) là gì?
+ CORS là gì?

Tiện cho việc đọc và theo dõi, bài cũng sẽ trình bày các kiến thức nêu trên. Nhưng không được quá chi tiết mà chỉ đủ cho việc hiểu điểm yếu và có thể sử dụng để tấn công.

# SOP (Same-Origin Policy) là gì?
SOP là một kỹ thuật dùng để đảm bảo an toàn cho ứng dụng web. Vậy SOP đảm bảo an toàn cho ứng dụng web như nào? SOP bảo vệ ứng dụng web bằng cách chỉ cho phép **document** hay **script** trên trang web tải nội dung từ cùng nguồn (từ đây về sau mình sẽ dùng từ origin để thay thế). 

Vậy câu hỏi đặt ra là như thế nào là cùng **origin**?

Trước khi trả lời câu hỏi trên ta sẽ trả lời một câu hỏi khác đó là: **origin** là gì?

**Origin** được xây dựng dựa trên 3 thành phần:

+ protocol: HTTP, HTTPS, ...
+ port: 80, 443, ...
+ host: viblo.asia, ctf.viblo.asia, ...

Sau khi đã hiểu được **origin** rồi ta sẽ dễ dàng trả lời được câu hỏi trên: cùng **origin** đó là 2 URL phải trùng cả 3 thành phần đã nêu trên.

Ví dụ:  Kiểm tra những domain cùng **orgin** với domain: `https://cm0s.viblo.asia/dir1/index.html`

|                      URL                        |               Cùng Origin?               |                   Lý do                          |
|-------------------------------------------|:-------------------------------------------:|--------------------------------------------|
| `https://cm0s.viblo.asia/foo/test.php` | **Có** | Cùng **host**, **port**, **protocol** |
| `http://cm0s.viblo.asia/foo/test.php` | **Không** | Khác **protocol** |
| https://viblo.asia/p/toi-da-dang-nhap-vao-trang-quan-tri-website-cua-mot-ai-do-LzD5drG4ZjY | **Không** | Khác **Host** |

Mục đích của SOP là đảm bảo an toàn cho ứng dụng web. Nhưng nó cũng mang lại không ít phiền toái cho lập trình viên. Do là không phải lúc nào nội dung của một trang web cũng được tải từ cùng một nguồn mà nó có thể được tải từ nhiều nguồn khác nhau để cho nội dung phong phú hay để cho phù hợp với kiến trúc ứng dụng web.

# CORS là gì?
Để giúp đỡ cho lập trình viên một kỹ thuật mới ra đời và được đặt tên là CORS (Cross-Origin Resource Sharing). Với kỹ thuật này, ứng dụng web có thể tải nội dung từ **origin** khác được định nghĩ trong **HTTP Header**.

![](https://images.viblo.asia/5d1c0388-26f9-4531-8765-643042d3cbc0.png)

Hình trên mô tả cách một ứng dụng web  tải nội dung từ cùng **origin** và khác **origin**. Nếu khác **origin**
 thì phía server khi trả response về sẽ kèm theo một **HTTP Header** cho phép những domain nào được phép được nội dung mà nó trả về. Khi trình duyệt nhận được response nó sẽ kiểm tra xem trang hiện tại có thỏa mãn điều kiện mà server yêu cầu không, nếu đúng sẽ đọc được nội dung mà server trả về, nếu không thì trình duyệt sẽ từ chối.
 
 Khi yêu cầu nội dung từ một **origin** khác trình duyệt sẽ tự thêm vào một **HTTP Header** là **Origin**, sau đó server sẽ trả về có chứa **Access-Control-Allow-Origin HTTP Header** (nếu có) để áp chỉ những **origin** nào được phép đọc nội dung. Nếu trong header trả về có **Access-Control-Allow-Credentials** thì client được phép gửi kèm **cookie**.
 
 Minh họa:
 
 Request
 ```
 GET /sensitive-victim-data HTTP/1.1
Host: origin-1.com
Origin: https://origin-2.com
Cookie: sessionid=...
```

Response
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://origin-2.com
Access-Control-Allow-Credentials: true
```
# Tấn công CORS
Vậy là ta đã hiểu được **CORS** và **Same-Origin Policy** là gì. Giờ là lúc ta tiến hành khai thác lỗi CORS.

Vậy tấn công CORS như thế nào?

Theo như trình bày ở trên thì ta chưa thấy **CORS** và **Same-Origin Policy** có vấn đề gì. Vậy thì tấn công như nào?

Thực ra vấn đề ở đây là server không kiểm soát **origin** đọc dữ liệu của mình. Nếu server cho phép bất kỳ **origin** nào đọc dữ liệu thì sẽ có vấn đề nghiêm trọng xảy là. Nếu dữ liệu đọc được là thông tin bình thường thì không sao. Nếu thông tin đọc được là dữ liệu nhạy cảm như: **token**, **mật khẩu**, **số tiền hiện có**, **...** thì rất to chuyện.

Để thực hiện tấn công CORS rất đơn giản, ta chỉ cần thêm **Origin** vào **HTTP Header**, nếu server trả về có chưa **Access-Control-Allow-Origin** và trong có có địa chỉ có ta kiểm soát được hay **\*** thì trang này đã bị dính lỗ hổng CORS.

![](https://images.viblo.asia/3e863bdd-703c-41bc-85a7-aa9815c71deb.png)

# Viết tool tự động
Để thực hiện tự động quá trình kiểm tra điểm yếu COR mình tự viết tool đơn giản để kiểm tra trong lúc tìm hiểu và nghiên cứu lỗi này.

https://github.com/khanhbnv-0950/pentest-tool

![](https://images.viblo.asia/6722eba9-17dc-4edb-8c5a-5e0b453d8cfd.png)

# Tham khảo thêm
+ https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
+ https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
+ https://portswigger.net/web-security/cors