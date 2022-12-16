# Giới thiệu
Dạo gần đây mình tình cờ gặp rất nhiều lỗi XSS, tuy nhiên trang đó lại có sử dụng dữ liệu người dùng input vào để export ra PDF. Vậy làm sao để có thể nâng impact lên mức cao hơn, mình cũng đã gặp nhiều case dễ dàng có, khó khăn cũng có, hi vọng bài biết này của mình sẽ giúp bạn đọc hiểu rõ vấn đề khi code hoặc pentest 1 tính năng export PDF.
> Bài viết này được viết vào một buổi sáng trời khá đẹp nhưng vội vàng, hi vọng có câu từ nào chưa được chau chuốt mong bạn đọc bỏ qua, hoặc có thể comment bên dưới để mình edit lại cho từ ngữ được mượt mà hơn :D, cảm ơn các bạn.
# Mở đầu
Vào một buổi sáng hôm nào mình cũng không nhớ nữa, một người em của mình có bảo mình là mới phát hiện ra Stored XSS trên một trang web cũng khá nhiều người dùng, đâu đó khoảng 1 triệu thì phải - hoặc nhiều hơn mình không chắc :D. Mình cũng tò mò thử vào xem chỗ nào trigger XSS. Trang này thì có validate input đầu vào của người dùng trên client chứ không check lại phía server, vậy đơn giản rồi. Nhưng mà mình chẳng hiểu code kiểu gì truyền payload xss alert lên thì server báo về 504, tuy nhiên nội dung vẫn được cập nhật ![](https://chatpp.thangtd.com/img/emoticons/facepalm.gif)

![](https://images.viblo.asia/bc711f6e-96e7-4a0d-ac33-e265a21e58b4.png)

Và trigger XSS

![](https://images.viblo.asia/db0b83ec-0bd8-456f-9bd3-6ebd3549fcd1.png)

Vậy là đã Stored XSS được rồi, lỗi này đánh cao nhất được ở mức high, tuy nhiên mình đang cần nâng impact của lỗi này lên cao hơn là Critical. Mình tìm thấy có 1 tính năng là export file PDF cho người dùng tải về. Vậy thử một chút payload khác xem sao ![](https://chatpp.thangtd.com/img/emoticons/jp/go.png)

```html
<script>document.write(document.location)</script>
```

Rồi tạo file PDF ta được điều này

![](https://images.viblo.asia/1e6f0fa6-b6d6-4726-8acf-3e8558a77461.png)

Ồ men, code script chạy được. Vậy là ta có thể inject được script vào rồi để server render ra file PDF. Đọc lại bài của một người anh ngồi cạnh tại [Khai thác lỗ hổng để lấy được source code của dịch vụ Y của platform X
](https://viblo.asia/p/khai-thac-lo-hong-de-lay-duoc-source-code-cua-dich-vu-y-cua-platform-x-maGK7k1AKj2), thử truyền payload đọc **/etc/passwd** xem có đọc được không

```html
<script>x = new XMLHttpRequest; x.onload = function () { document.write(this.responseText + document.location.pathname) }; x.open('GET', 'file:///etc/passwd'); x.send();</script>
```

![](https://images.viblo.asia/bbacd673-2e02-411f-8a4a-ee45c15d1067.png)

Kết quả đúng như trong sách viết, **nhưng mà ở endpoint khác**, trang này có 2 nút tải PDF về, 1 nút thì render bằng **wkhtmltopdf**, còn nút kia sử dụng **Skia/PDF m86** dùng **Chromium** để render. Ở đây mình sẽ chỉ focus vào **Skia/PDF m86** nhé.

Do trang này sử dụng **Skia/PDF m86** dùng **Chromium** nên mặc định Chromium sẽ chặn JS gọi file local

![](https://images.viblo.asia/4bd945ed-b342-42d8-9427-bda6038e7aef.png)

Vậy thì giờ chúng ta sẽ làm thế nào bây giờ ![](https://chatpp.thangtd.com/img/emoticons/facepalm.gif)

Nhưng, ông trời không phụ lòng người, kiểm tra dịch vụ site này đang chạy thì nó đang sử dụng AWS

![](https://images.viblo.asia/4dce7519-eaf1-495d-811c-227a4b377422.png)

Do PDF được render từ phía server, nên có thể sử dụng tấn công SSRF, nhúng iframe hoặc viết payload JS để thực hiện call localhost. 

![](https://images.viblo.asia/d1f818e6-f1b9-4bbf-a960-f2b79a3cf1ad.png)

Do AWS bản v2 có URL hơi khác so với v1, nên có thể sử dụng payload này để đọc thông tin ec2

```html
<iframe src=http://169.254.169.254/latest/meta-data/identity-credentials/ec2/security-credentials/ec2-instance></iframe>
```
![](https://images.viblo.asia/bbd2fa7c-20b4-44d3-8c69-30aa6f29747c.png)

Bingo, vậy là ta có thể nâng impact của XSS lên cao hơn, chúng ta có thể sử dụng Token, Accesskey, SecretKey của AWS để kiểm tra xem nó có full quyền hay không, mình sử dụng tool này để kiểm tra xem với Token này mình có thể thực hiện hành động gì trên AWS [https://github.com/andresriancho/enumerate-iam](https://github.com/andresriancho/enumerate-iam)

# Tổng kết
Việc tìm ra lỗi là một chuyện, còn việc nâng impact, kết hợp các lỗi khác tạo thành lỗi lớn hơn, đặc biệt trong những sàn bugbounty, những lỗi cao có thể được trả tiền gấp đôi lỗi thấp hơn. Hi vọng bài viết này có ích với các bạn, let's go.