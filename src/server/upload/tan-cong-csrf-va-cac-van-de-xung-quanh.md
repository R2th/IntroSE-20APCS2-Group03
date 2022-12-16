## Giới thiệu một chút về Web Cookies
Do HTTP là giao thức không trạng thái, các request trước và sau không hề liên quan đến nhau. HTTP không thể phân biệt người dùng này với người dùng khác được. Để giải quyết vấn đề này, **cookie** được ra đời để phân biệt các người dùng với nhau. Các server sẽ set-cookie cho trình duyệt lưu lại, sau đó mỗi khi gửi request thì trình duyệt sẽ thêm mã cookie này rồi gửi đến server.

Khi có một request được gửi từ trình duyệt đến một trang web nào đấy, trình duyệt sẽ kiểm tra xem giá trị cookie nào mà trình duyệt lưu lại thuộc máy chủ đó không. Trong khi thực hiện việc này, nó sẽ kiểm tra xem các thuộc tính, flag của cookie (domain, URL, httponly, secure, ...) có khớp với dữ liệu đã lưu trong trang web đó không. Nếu chúng khớp, trình duyệt sẽ gửi các cookie có liên quan cùng với request đó.

## Vậy thế nào là CSRF (Cross-site Request Forgery)
![](https://portswigger.net/web-security/images/cross-site%20request%20forgery.svg)
CSRF hay XSRF là kiểu tấn công dựa vào chứng thực request trên website thông qua việc sử dụng cookies. Nói cho dễ hiểu, khi bạn truy cập 1 trang web của Attacker, Attacker tự động tạo 1 request đến trang target mà tất cả các cookie được lưu trong trình duyệt của người dùng với trang target sẽ được tự động thêm vào. Nói cách khác, 1 phiên làm việc thuộc 1 trang lại có thể được sử dụng bởi trang khác. Đây chính là mấu chốt của việc tấn công CSRF.

Trong thuật ngữ chuyên ngành, việc lạm dụng trình duyệt kiểu này được gọi là CSRF (Cross-site Request Forgery). Đó là một lỗ hổng bảo mật web cho phép Attacker khiến người dùng thực hiện các hành động mà họ không có ý định thực hiện. Lỗi này có thể được Attacker khai thác để theo dõi người dùng hoặc quảng cáo. 

## Ví dụ về CSRF
Chúng ta có 1 trang web đơn giản hiển thị tên username là `abc`.

![](https://images.viblo.asia/b480602c-a89a-4c59-a060-1e824c36d322.png)

Bên trong trang web này có 1 chức năng là `Change Your username` dùng để đổi tên username, và mình đã sử dụng chức năng này rồi viết 1 đoạn mã như sau rồi đẩy lên 1 trang web khác. Khi người dùng vào trang web có chứa đoạn mã này thì `username` của trang target kia sẽ bị đổi thành `pwned`.
```html
<html>
  <body>
  <script>history.pushState('', '', '/')</script>
    <form action="https://x-23.herokuapp.com/hi/settings.php" method="POST">
      <input type="hidden" name="new&#95;name" value="pwned" />
      <input type="submit" value="Submit request" />
    </form>
    <script>
      document.forms[0].submit();
    </script>
  </body>
</html>
```
![](https://images.viblo.asia/abe8ae1e-bef1-4762-bdef-a5bffb4db5cd.gif)

## Vậy làm thế nào để ngăn chặn CSRF
- Thông thường bạn có thể tránh theo dõi như thế này trong trình duyệt Firefox và Chrome. Tuy nhiên, khi chặn như vậy thì chúng sẽ ngăn việc gửi cookie cùng với request của bất kì trang web bên thứ 3 nào. Như vậy trải nghiệm duyệt web của bạn sẽ rất là tệ. Vì thế, bằng cách chặn cookie, bạn hoàn toàn có thể chặn CSRF, nhưng mà đổi lại việc trải nghiệm của bạn trên internet mình cá là không vui vẻ gì đâu. 
### Same-Site
- Có 1 thuộc tính cookie mới, Chrome đã bắt đầu hỗ trợ vào ngày 29 tháng 3 và theo sau là các trình duyệt phổ biến khác. Đó được gọi là thuộc tính **Cookie Same-Site**. Các đội developer có thể chỉ dẫn cho trình duyệt kiểm soát xem cookie có được gửi cùng với request của trang web bên thứ 3 tạo ra hay không, bằng cách sử dụng thuộc tính cookie Same-Site. Đây là một giải pháp thiết thực hơn so với việc từ chối gửi cookie.
- Đặt thuộc tính Same-Site khá đơn giản, nó chỉ cần thêm giá trị SameSite vào cookie, ví dụ:
```
Set-Cookie: CookieName=CookieValue; SameSite=Lax;
Set-Cookie: CookieName=CookieValue; SameSite=Strict;
```
> Thử set lại SameSite=Lax rồi thử lại ví dụ phía bên trên xem sao

![](https://images.viblo.asia/0f6489db-d2be-48d2-95be-d4450133b103.gif)

SameSite đã thực hiện tốt vai trò của mình, nó đã ngăn chặn được cuộc tấn công CSRF. Nhưng tại sao lại có 2 loại SameSite là **Lax** và **Strict** ở đây, nó sinh ra để ngăn chặn CSRF thôi mà. Vậy chúng ta có thể tiếp tục tìm hiểu so sánh 2 loại SameSite
### Sự khác nhau giữa Lax và Strict SameSite
#### Strict
- Như cái tên đã cho thấy rằng, đây là tùy chọn trong đó quy định Same-Site được áp dụng nghiêm ngặt. Khi thuộc tính SameSite được đặt là Strict, cookie sẽ không được gửi cùng với các request được bắt đầu bởi các trang web của bên thứ 3.
- Đặt cookie là Strict có thể ảnh hưởng tiêu cực đến trải nghiệm duyệt web. Ví dụ: nếu bạn nhấp vào 1 liên kết dẫn đến trang profile của Facebook, và Facebook.com đặt cookie của nó là `SameSite=Strict` thì bạn không thể tiếp tục redirect trên Facebook trừ khi bạn đăng nhập lại vào Facebook. Lý do là vì Cookie của Facebook không được gửi kèm với request này.
#### Lax
- Khi bạn đặt thuộc tính SameSite của cookie thành Lax, cookie sẽ được gửi cùng với GET request được tạo bởi bên thứ 3.
- Tại sao lại chỉ chấp nhận GET request, thực ra thì nó chấp nhận các phương thức request khác như GET, HEAD, OPTIONS, TRACE. Vì đây chính là các kiểu request được cho là "An Toàn" được định nghĩa trong phần 4.2.1 của RFC 7321. Nhưng ở đây chúng ta chỉ quan tâm đến GET request mà thôi.
- Với ví dụ bên trên, do phương thức POST là kiểu HTTP "không an toàn" nên Cookie k được gửi khi `SameSite=Lax`.
## Có phải chúng ta sắp phải tạm biệt với CSRF
- Có vẻ như thuộc tính cookie SameSite là một biện pháp bảo mật hiệu quả chống lại các cuộc tấn công CSRF. 
- Sự phổ biến của CSRF đang đi xuống, chứng minh cho điều này thì CSRF đang ở vị trí thứ 5 danh sách Top 10 của OWASP được công bố vào năm 2010, nhưng nó lại xuống vị trí thứ 8 vào năm 2013. Và bây giờ chúng ta k thấy nó xuất hiện trong danh sách Top 10 của OWASP nữa. 
- Trình duyệt phổ biến nhất hiện nay là Google Chrome cũng đã có cập nhật về SameSite

>Sept 26, 2019
>
> Starting in Chrome 80, cookies that do not specify a SameSite attribute will be treated as if they were SameSite=Lax with the additional behavior that they will still be included in POST requests to ease the transition for existing sites. Cookies that still need to be delivered in a cross-site context can explicitly request SameSite=None, and must also be marked Secure and delivered over HTTPS. We will provide policies if you need to configure Chrome Browser to temporarily revert to legacy SameSite behavior.

>Cookies default to SameSite=Lax
>
>Treat cookies as SameSite=Lax by default if no SameSite attribute is specified. Developers are still able to opt-in to the status quo of unrestricted use by explicitly asserting SameSite=None.
>
>The Stable version of Chrome 80 is targeted for enabling this feature by default. This feature is available as of Chrome 76 by enabling the same-site-by-default-cookies flag. See https://www.chromium.org/updates/same-site for full timeline.
- Bên cạnh đó thì Firefox cũng đã có cập nhật thêm về Same-Site ở phiên bản FireFox 69.
```
network.cookie.sameSite.laxByDefault
network.cookie.sameSite.noneRequiresSecure
```
- Vậy chúng ta có thể hi vọng vào 1 ngày mà CSRF sẽ không còn nữa phải không nào.

## Tham khảo
- https://www.netsparker.com/blog/web-security/same-site-cookie-attribute-prevent-cross-site-request-forgery/
- https://scotthelme.co.uk/csrf-is-dead/
- https://portswigger.net/web-security/csrf/
- https://www.chromestatus.com/feature/5088147346030592