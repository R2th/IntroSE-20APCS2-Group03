Do kì này trên trường mình có học môn An toàn ứng dụng web và phải đọc về trình duyệt web khá nhiều nên bài viết lần này mình sẽ giới thiệu cơ bản về thứ mà khách hàng nào cũng phải sử dụng để tương tác với các ứng dụng web của chúng ta: browser - trình duyệt web

**Browser là một phần mềm hiển thị nội dung trang web**. Nhiệm vụ của nó là tải về một trang web và biểu diễn lại trang đó để người dùng có thể xem và hiểu được. Về cơ bản tất cả những gì chúng ta biết về hoạt động của browser đến lúc này là:
* Người dùng nhập đường dẫn trang web vào thanh địa chỉ của browser
* Browser tải xuống các "tài liệu" từ địa chỉ đó và hiển thị chúng
![](https://images.viblo.asia/8ca950ba-781c-4d9c-87b3-a7cf489b4cc1.png)

Mọi người hầu hết đều đang sử dụng các trình duyệt phổ biến như Chrome, Firefox, Edge hoặc Safari. Ngoài những ông lớn đó ra chúng ta còn có Opera, Tor,... Và ngoài các trình duyệt web với giao diện đồ họa thông thường, mình muốn giới thiệu thêm về [Lynx](https://lynx.browser.org/). Lynx là một trình duyệt rất nhẹ với giao diện là các dòng text của command line thay vì giao diện đồ họa thông thường. Về cơ bản lynx có đủ các thành phần cấu tạo giống các trình duyệt web phổ biến khác. Người dùng nhập vào thanh địa chỉ, trình duyệt tải document và hiển thị lại. Điểm khác biệt duy nhất ở đây là lynx không sử dụng các engine render đồ họa thông thường mà chỉ có giao diện dòng lệnh, do đó một website sẽ trông như thế này nếu sử dụng lynx:
![](https://images.viblo.asia/c16b5c6b-224b-4d2b-807d-4082a6cd7c5f.png)
## Browser làm những công việc gì
Các công việc chủ yếu của một trình duyệt sẽ gồm:
* Phân giải DNS
* Truyền HTTP
* Hiển thị
* Lặp lại các công việc trên
### Phân giải DNS
Quá trình này giúp đảm bảo khi một người dùng nhập vào địa chỉ, trình duyệt sẽ biết được máy chủ nào kết nối với địa chỉ đó. Trình duyệt sẽ liên hệ với một máy chủ DNS để chuyển `google.com` thành `216.58.207.110`, và một địa chỉ IP mà trình duyệt có thể kết nối tới.
### Trao đổi HTTP
Sau khi trình duyệt đã xác định được máy chủ nào sẽ lắng nghe các request nó gửi tới, nó sẽ khởi tạo một kết nối TCP và bắt đầu trao đổi HTTP. Trao đổi HTTP là cách một trình duyệt giao tiếp với server, gửi cho server các yêu cầu và đợi server phản hồi lại.

HTTP là tên một giao thức phổ biến được dùng để giao tiếp trên web, các trình duyệt chủ yếu sử dụng HTTP để giao tiếp với server. Một trao đổi HTTP thường có **client** (trình duyệt) gửi **request** và **server** phản hồi lại bằng một **response**

Ví dụ sau khi trình duyệt đã kết nối thành công tới máy chủ của `google.com`, nó sẽ gửi một request như thế này
```
GET / HTTP/1.1
Host: google.com
Accept: */*
```
* `GET / HTTP/1.1:` trình duyệt yêu cầu server lấy các file từ thư mục `/`, và sử dụng giao thức `HTTP/1.1` để trao đổi
* `Host: google.com`: Đây là **header bắt buộc duy nhất** của HTTP/1.1. Vì một server có thể có nhiều tên miền khác nhau (`google.com`, `google.co.uk`), phía client chỉ rõ request sẽ gửi tới host nào
* `Accept: */*`: đây là một header tùy chọn, browser nói với server rằng nó sẽ chấp nhận bất kỳ loại response nào. Server có thể trả về response với bất cứ định dạng nào: JSON, XML hoặc HTML.

Sau khi browser đã gửi request xong, server sẽ gửi về response
```
HTTP/1.1 200 OK
Cache-Control: private, max-age=0
Content-Type: text/html; charset=ISO-8859-1
Server: gws
X-XSS-Protection: 1; mode=block
X-Frame-Options: SAMEORIGIN
Set-Cookie: NID=1234; expires=Fri, 18-Jan-2019 18:25:04 GMT; path=/; domain=.google.com; HttpOnly
<!doctype html><html">
...
...
</html>
```
Trong gói tin trả về kia server cho biết rằng request đã được thực hiện thành công(`200 OK`), server nào thực hiện xử lý request(`Server: gws`), các chính sách `X-XSS-Protection` của phản hồi, vân vân. Hiện tại mọi người chưa cần hiểu hết từng dòng một trong response kia. Chúng ta sẽ bàn đến nó sau khi đề cập tới giao thức HTTP ở riêng một bài khác. Tất cả những gì chúng ta cần nhớ tính tới thời điểm này là client và server thực hiện trao đổi thông tin bằng giao thức HTTP
### Hiển thị
Một website sẽ như thế nào nếu tất cả những gì chúng hiển thị chỉ là những ký tự vô nghĩa? Đó là lí do một trình duyệt hoàn chỉnh cần có chức năng render.
```
<!doctype html><html">
...
...
</html>
```
Trong phần body của response trả về, server sẽ gửi theo cách mà response đó được hiển thị như thế nào trong header `Content-Type`. Trong ví dụ của chúng ta content-type là `text/html`, nên response trả về sẽ chứa các thẻ của HTML. Và đây là lúc trình duyệt thực hiện nhiệm vụ của mình. Nó sẽ phân tách đoạn HTML, tải thêm các tài nguyên đính kèm (các file Javascript hoặc CSS), và hiển thị chúng cho người dùng. Kết quả là chúng ta có một trang web mà ai cũng có thể đọc được. Để hiểu rõ hơn quá trình browser render một trang web, mọi người có thể đọc thêm bài viết [này](https://github.com/alex/what-happens-when), nó giải thích rất kĩ các cơ chế đằng sau quá trình render.

Về vấn đề bảo mật, những kẻ tấn công có thể **dễ dàng tìm ra các lỗ hổng trong quá trình trao đổi HTTP và render** của một trình duyệt. Hiểu rõ về hai chức năng này của trình duyệt sẽ giúp bạn có thể tăng cường bảo mật cho các ứng dụng web của bạn.
## Các nhà cung cấp
4 trình duyệt web phổ biến hiện nay thuộc về các những công ty lớn sau:
* Chrome của Google
* Firefox của Mozilla
* Safari của Apple
* Edge của Microsoft

Ngoài việc cạnh tranh thị phần của nhau trong kinh doanh thì những công ty này cũng cam kết cùng nhau hoạt động để cải thiện các **tiêu chuẩn của web**, có thể hiểu nôm na là "những yêu cầu tối thiểu" mà một trình duyệt phải đáp ứng.

[W3C](https://www.w3.org/) chính là kết quả của quá trình phát triển các tiêu chuẩn này, nhưng các trình duyệt web cũng thường tự phát triển các tính năng riêng của mình rồi dần dần các trình duyệt khác cũng học theo và trở thành tiêu chuẩn, và vấn đề bảo mật cũng không ngoại lệ. Một ví dụ điển hình là ở Chrome 51 đã giới thiệu [SameSite cookies](https://www.chromestatus.com/feature/4672634709082112), một chức năng cho phép ứng dụng web tránh được các lỗ hổng CSRF. Các công ty khác cũng bắt đầu làm theo và kết quả là SameSite trở thành một tiêu chuẩn web. Tới thời điểm hiện tại chỉ còn Safari là trình duyệt web lớn duy nhất không hỗ trợ SameSite cookie. 

![](https://images.viblo.asia/e6775491-2c2d-498d-9d55-eaa842781dcc.png)

Điều này cho thấy
* Safari không quan tới vấn đề bảo mật của người dùng (mặc dù vậy từ Safari 12 trở đi SameSite cookie đã được hỗ trợ)
* **Việc vá một lỗ hổng trên một trình duyệt không có nghĩa là tất cả người dùng ứng dụng web của bạn đã an toàn.**

Lưu ý điểm thứ hai nhé. Khi phát triển các ứng dụng web, chúng ta không chỉ đảm bảo rằng các ứng dụng đó có thể hiển thị ổn trên các trình duyệt khác nhau mà còn cần phải chắc chắn rằng tất cả người dùng ứng dụng đều được bảo vệ trên mọi nền tảng.

Cách tiếp cận với an toàn bảo mật web cần phụ thuộc vào những nhà phát triển trình duyệt cung cấp những gì cho chúng ta. Hiện nay hầu hết các trình duyệt đều hỗ trợ các chức năng giống nhau, nhưng đôi khi vẫn xảy ra vài trường hợp giống như Safari và SameSite cookies, lúc đó chúng ta cần tính toán hợp lý để đưa ra các giải pháp bảo mật tốt nhất. Trong trường hợp đó, nếu chúng ta muốn giảm thiểu tấn công CSRF chỉ bằng cách sử dụng SameSite cookie, chúng ta cần phải biết rằng điều đó có thể làm người dùng sử dụng Safari gặp nguy hiểm

Chúng ta cũng nên nhớ rằng chúng ta có quyền quyết định sẽ hỗ trợ các phiên bản trình duyệt nào. Việc hỗ trợ tất cả mọi trình duyệt là bất khả thi (ai dám đảm bảo có thể hỗ trợ hoàn hảo cho người dùng sử dụng Internet Explorer 6 chứ?). Hãy đảm bảo các phiên bản gần đây nhất của các trình duyệt phổ biến đều được hỗ trợ. Ngoài ra nếu vì một vài lí do nào đó mà bạn không hỗ trợ một số nền tảng cụ thể, hãy cho người dùng biết điều đó. **Mẹo nhỏ**: Hãy luôn khuyến khích người dùng sử dụng các phiên bản mới nhất của trình duyệt.

## Bug Bounty
Việc người dùng sử dụng ứng dụng của chúng ta thông qua một bên thứ ba (trình duyệt) làm gia tăng thêm sự phức tạp về tính bảo mật: bản thân trình duyệt luôn chứa các lỗ hổng bảo mật.

Các công ty thường đưa ra các giải thưởng (aka chương trình săn bug) cho những ai có thể tìm ra lỗ hổng trong trình duyệt của họ. Các bugs này thường không liên quan tới ứng dụng của bạn mà chủ yếu nằm ở các vấn đề bảo mật của browser.

[Chương trình trao thưởng của Chrome](https://www.google.com/about/appsecurity/chrome-rewards/) cho phép mọi người thông báo các lỗ hổng họ tìm được với đội ngũ bảo mật của Chrome. Nếu các lỗ hổng này được xác minh, một bản vá cùng các khuyến cáo cập nhật sẽ được tung ra và những ai tìm ra lỗ hổng sẽ nhận được giải thưởng từ chương trình. Các công ty như Google đầu tư một khoản rất lớn vào các chương trình săn bug này. Trong chương trình săn bug, đôi bên cùng có lợi: các công ty có thể cải thiện được chất lượng phần mềm của họ và những ai tìm ra bug thì được trả công. 

## Browser cho lập trình viên:
Với các lập trình viên, ngoài trình duyệt web thông thường chúng ta còn một công cụ khác rất hữu ích là [cURL](http://curl.haxx.se/). Nó cho phép chúng ta thực hiện các trao đổi HTTP giống hệt một trình duyệt bình thường bằng cách gửi các HTTP request từ cửa sổ dòng lệnh.
![](https://images.viblo.asia/55f8881d-2bff-49da-9496-a94869cefc29.png)

Trong ví dụ trên chúng ta đã gửi request lấy tài liệu tới địa chỉ `viblo.asia`, và máy chủ trả về kết quả thành công. Thay vì trả về toàn bộ phần body của response trong cửa sổ dòng lệnh, chúng ta dùng `-I` để chỉ lấy về phần headers. Ngoài ra chúng ta cần lấy thêm về một số thông tin nữa, như cách request được thực thi thế nào trong quá trình trao đổi HTTP, lúc này chúng ta sẽ dùng thêm `-v`. Các thông tin lấy về sẽ giống hệt các thông tin từ một trình duyệt web thông thường.

Như chúng ta thấy, trình duyệt web chỉ đơn giản là các HTTP client và có thêm các chức năng khác như bookmark, lưu trữ lịch sử,... Và về cơ bản bạn không cần một trình duyệt để kiểm tra độ bảo mật trong ứng dụng của bạn, bạn chỉ cần "curl" và xem các response trả về thế nào. Điểm cuối cùng mình muốn lưu ý là mọi thứ đều có thể là browser. Nếu bạn có một ứng dụng điện thoại nhận các API trả về từ HTTP, thì ứng dụng đó cũng là một browser, chỉ khác cái là nó sẽ chỉ nhận một loại response trả về (được định nghĩa trong API).

Về cơ bản đó là tất cả những gì về trình duyệt mà dân lập trình web cần biết, còn để hiểu sâu hơn về các vấn đề bảo mật khác trong trình duyệt web nói riêng và bảo mật web nói chung thì hẹn mọi người ở các bài viết khác.

## Tham khảo
https://medium.freecodecamp.org/web-application-security-understanding-the-browser-5305ed2f1dac