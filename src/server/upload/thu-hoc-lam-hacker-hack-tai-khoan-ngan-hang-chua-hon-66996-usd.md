Chào các bạn đã quay trở lại với chanel youtube của mình!

Ý lộn, sửa

Chào các bạn đã quay trở lại với blog của mình `manhnv.com`.

Cũng đã lâu rồi, được hẳn 1 tuần rồi mình chưa ra bài viết nào vì mình hết ý tưởng viết bài rồi, nhiều lúc viết bài về kỹ thuật nhiều quá chả ai đọc (**sad x3000**). `Nửa đêm vỗ gối ruột đau như cắt, nước mắt đầm đìa, chỉ hận không có nhiều ý tưởng hơn để viết thật nhiều bài cho các bạn đọc cho vui`, nhất là dịp covid này thì phải có bài mới cho mọi người đọc đỡ buồn đúng không nào.

Đó, thì cũng qua 1 tuần (6-7 đêm vỗ gối, nước mắt đầm đìa) thì hôm nay mình cũng có một ý tưởng mới để viết cho các bạn một bài đọc cho qua những ngày tháng covid nhé.

Chúng ta bắt đầu thôi nhỉ! :D

Lưu ý: Bài này có thể chỉ phù hợp với những bạn nào chưa biết gì về hack và đang muốn biết là để học hack thì học ở đâu, nên những cao thủ xin bỏ qua bài này nhé :D

## Đầu tiên, vậy thì hack là gì? Hacker là gì?

Thực ra thì câu hỏi này có vẻ quá dư thừa trong bài này khi mà trên mạng biết bao nhiêu bài viết giải thích `Hack là gì?` hay `Hacker là gì?`, ... các bạn chịu search google phát là ra hàng triệu kết quả tiếng Việt có, tiếng Anh có.

 ![Hack là gì?](https://manhnv.com/images/posts/hacking/thu-thach-mot-ngay-lam-hacker-cho-nguoi-moi/hack-la-gi.png "Hack là gì?")

Nhưng, để tìm hiểu về hack thì cũng nên biết hack là gì, nên để hiểu đơn giản thì hack là: `Hack là việc lợi dụng những lỗ hổng bảo mật can thiệp một cách trái phép vào phần mềm, phần cứng, máy tính, hệ thống máy tính, mạng máy tính nhằm thay đổi các chức năng vốn có của nó.` - Nguồn: https://indianembassy-tm.org

Hacker là gì?  `Hacker là những người sử dụng các kỹ năng (lập trình, phần mềm, phần cứng, hệ thống mạng…) đồng thời lợi dụng những lỗ hổng bảo mật để can thiệp một cách trái phép vào phần mềm, phần cứng, máy tính, hệ thống máy tính, mạng máy tính nhằm thay đổi các chức năng vốn có của nó theo ý thích của bản thân mình.` - https://indianembassy-tm.org

Vậy là các bạn đã hiểu rõ sơ sơ về khái niệm rồi giờ chúng ta đi vào vấn đề chính là `Thử thách một ngày làm hacker cho người mới | Hack tài khoản ngân hàng chứa hơn 66996 USD`.

## Hack, Hack, hack

Chuyện là, mình có tìm ra được một website `https://www.hacksplaining.com/` này khá là hay, giúp các bạn có thể tập tập tành, đóng vai một hacker được thỏa sức học hỏi các lỗ hổng cơ bản nhất để có một cái nhìn nhất định về hack.

![hacksplaining](https://manhnv.com/images/posts/hacking/thu-thach-mot-ngay-lam-hacker-cho-nguoi-moi/hacksplaining.png "hacksplaining.png")

Thế thì website này có gì vui?

Trong đây có rất nhiều bài hướng dẫn về rất rất nhiều lỗi mà để có thể là một hacker các bạn phải biết.

![hacksplaining](https://manhnv.com/images/posts/hacking/thu-thach-mot-ngay-lam-hacker-cho-nguoi-moi/vuln1.png "hacksplaining.png")

![hacksplaining](https://manhnv.com/images/posts/hacking/thu-thach-mot-ngay-lam-hacker-cho-nguoi-moi/vuln2.png "hacksplaining.png")

Các lỗ hổng này đều dựa trên `OWASP TOP 10`.
`Each year OWASP (the Open Web Application Security Project) publishes the top ten security vulnerabilities. It represents a broad consensus about the most critical security risks to web applications. Click through on the lessons below to learn more about how to protect against each security risk.`

Về cơ bản thì các bạn vào đây, sẽ được học về cách khai thác cũng như biết được vì sao sinh ra các lỗi bảo mật đó. Các bạn sẽ được dạy `step by step`, nên việc một bạn mới muốn tìm hiểu về hack có thể rất dễ để nắm bắt và làm theo.

## Thử hack tài khoản ngân hàng chứa hơn 66996 USD

Để hình dung cho các bạn cách mà `hacksplaining` hướng đẫn tìm hiểu về các lỗi bảo mật thì mình sẽ chọn đại một cái để làm cho các bạn xem qua.

Ở đây, mình chọn lỗi `sql injection` - một lỗi kinh điển nhất mà cho đến nay nó vẫn đang còn xuất hiện rất nhiều.

Khi chọn vào thì đầu tiên các bạn sẽ thấy các step và một application có lỗi bảo mật (ở đây được mô phỏng là một application của Bank) như khoanh đỏ trong hình.

![hacksplaining](https://manhnv.com/images/posts/hacking/thu-thach-mot-ngay-lam-hacker-cho-nguoi-moi/sql-injection.png "hacksplaining.png")

Bấm next, các bạn sẽ thấy hiển thị một khung logs - Đây là khung mô phỏng lại logs khi mà application chạy.

![hacksplaining](https://manhnv.com/images/posts/hacking/thu-thach-mot-ngay-lam-hacker-cho-nguoi-moi/logs-sqli.png "hacksplaining.png")

Tiếp theo, chúng ta được gợi ý là đăng nhập vào một tài khoản.

![hacksplaining](https://manhnv.com/images/posts/hacking/thu-thach-mot-ngay-lam-hacker-cho-nguoi-moi/login.png "hacksplaining.png")

Tuy nhiên, khi đăng nhập vào thì được thông báo `Unknown email or password.` và một hướng dẫn kêu thử đăng nhập lại nhưng mật khẩu lần này thêm dấu `'` và phía sau. Tôi thử làm theo.

![hacksplaining](https://manhnv.com/images/posts/hacking/thu-thach-mot-ngay-lam-hacker-cho-nguoi-moi/login-fail.png "hacksplaining.png")

Sau khi đăng nhập như gợi ý, thì có 2 thứ ta có thể thấy được:

- Được gợi ý là ứng dụng đã crasshed
- Nhìn vào khung logs sẽ thấy có logs của SQL bị lỗi

![hacksplaining](https://manhnv.com/images/posts/hacking/thu-thach-mot-ngay-lam-hacker-cho-nguoi-moi/application-crashed.png "hacksplaining.png")


Bấm tiếp tục để xem, thì chúng ta nhận được gợi ý rằng, với thông báo lỗi trong logs và hãy suy nghĩ một câu lệnh hoàn chỉnh trong ứng dụng sẽ là như hình.

![hacksplaining](https://manhnv.com/images/posts/hacking/thu-thach-mot-ngay-lam-hacker-cho-nguoi-moi/code-sqli.png "hacksplaining.png")

```sql
SELECT *
  FROM users
 WHERE email = 'user@gmail.com'
   AND pass  = 'password'' LIMIT 1
```

Đây chính là một lỗi sql injection. Tiếp theo chúng ta sẽ được gợi ý cách khai thác là thử đăng nhập với mật khẩu là `' or 1=1;--`

![hacksplaining](https://manhnv.com/images/posts/hacking/thu-thach-mot-ngay-lam-hacker-cho-nguoi-moi/exploit.png "hacksplaining.png")

Câu lệnh SQL bây giờ luôn luôn đúng như sau:

```sql
SELECT *
  FROM users
 WHERE email = 'user@gmail.com'
   AND pass  = '' or 1=1;--' LIMIT 1
```

Thử đăng nhập lại, bây giờ đã đăng nhập thành công.

![hacksplaining](https://manhnv.com/images/posts/hacking/thu-thach-mot-ngay-lam-hacker-cho-nguoi-moi/login-success.png "hacksplaining.png")

Như vậy chúng ta đã có thể đăng nhập vào một tài khoản ngân hàng có chứa `66996.4 USD` mà không cần biết mật khẩu của tài khoản đó.

## Giải thích về câu lệnh

Trong ví dụ trên, chúng ta có thể tưởng tượng ra source code của ứng dụng đang được viết như vầy.

```js

var username; // Lấy từ form bạn nhập vào
var password; // Lấy từ form bạn nhập vào

var sql = "SELECT * FROM users WHERE email = '" + username + "' AND pass  = '" + password + "'LIMIT 1";

db.query(sql);
```

Vậy khi đăng nhập một cách bình thường là `username=user@email.com` và `password=password`, thì câu lệnh SQL sẽ là:

```sql
SELECT *
  FROM users
 WHERE email = 'user@gmail.com'
   AND pass  = 'password' LIMIT 1
```

Khi câu lệnh này được truy vấn vào database, vì `password=password` không phải là của tài khoản `user@email.com` nên sẽ được database trả về rỗng. Như vậy thì không đăng nhập được, như ta thấy ở trên là được ứng dụng trả về `Unknown email or password.`.

Vậy để cho câu lệnh luôn luôn đúng thì ta phải biến đổi được câu lệnh sql thành.

```sql
SELECT *
  FROM users
 WHERE email = 'user@gmail.com'
   AND pass  = 'password' or 1=1 LIMIT 1
```

`or 1=1` tương đương với điều kiện truy vấn luôn luôn đúng. Vậy là chỉ cần nhập bất kỳ sqli nào khiến cho câu lệnh sql luôn luôn đúng thì chúng ta đã thành công. Ví dụ 1 số payload như dưới đây:

```
password' or 1=1
password' or 1=1;--

' or 1=1'
' or 1=1;--
```

Dấu `;` dùng để kết thúc câu truy vấn sql
Dấu `--` dùng để comment tất cả câu lệnh sql phía sau nó, nhằm mục đích ngăn việc gây ra lỗi nếu như phía sau nó còn có câu lệnh sql.

Các bạn cũng có thể đọc qua bài này của mình để hiểu hơn về vấn đề này: https://manhnv.com/2019/05/mo-ta-sql-injection-la-gi-va-cach-kiem-tra/


## Kết luận

Như vậy là mình đã giới thiệu cho các bạn cách để có thể trải nghiệm cũng như học làm hacker như thế nào. Các bạn chủ động tìm hiểu các lỗi còn lại nhé.

Tuy nhiên, trang website mình giới thiệu các bạn chỉ là các lỗi cơ bản và cách khai thác cũng rất rất cơ bản nên việc để trở thành 1 hacker tay to các bạn cần học thêm nhiều nhiều nhiều nữa thì mới có thể xưng bá thiên hạ được nhé.

Có thể bài này không hay như các bạn kỳ vọng, mình còn có nhiều bài khác rất hay tại https://manhnv.com nhé! Anyway ...

Cảm ơn các bạn đã đọc bài này của mình.

Chúc các bạn sẽ đạt được thành tựu và xưng bá được thiên hạ nhé!