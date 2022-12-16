### 1. Giới thiệu

Để thuận tiện cho người dùng trong việc lấy lại mật khẩu các website hiện nay hầu như đều có chức năng forgot password. Chức năng quên mật khẩu thường được thiết kế để cho phép người dùng đặt lại mật khẩu bằng cách gửi cho người dùng một đoạn code, mã opt, đường link đặt lại mật khẩu thông qua mail hoặc số điện thoại người dùng đăng ký. 

Mặc dù chức năng này đơn giản, dễ thiết kế và dễ thực hiện, thế nhưng nó lại tồn tại rất nhiều lỗ hổng nếu như người lập trình không kiểm soát các input của người dùng, ví dụ như hacker thông qua chức năng này có thể brute force để tìm kiếm những username trong hệ thống, hoặc sử dụng để spam email, sms và nguy hiểm nhất là account takeover.

### 2. Một số lỗi cơ bản
Thông thường chức năng đặt lại mật khẩu được thiết kế như sau:
- Người dùng sẽ nhập tên người dùng hoặc địa chỉ email của họ để đặt lại mật khẩu.
- Ứng dụng sẽ kiểm tra người dùng có tồn tại hay không sau đó tạo một đường link, hoặc một đoạn code liên kết với chính tài khoản đó.
- Sau đó ứng dụng sẽ gửi môt email hoặc sms tới người dùng.
- Khi người dùng nhận được code hoặc đường link có thể kiểm dùng nó để đặt lại mật khẩu của mình.

Xét về quá trình đặt lại mật khẩu như trên thì tương đối an toàn. Tuy nhiên nó chỉ an toàn với một người dùng bình thường, còn đối với một số người dùng có ý định tấn công vào website của bạn thì vẫn còn khá nhiều lỗ hổng bảo mật có thể xảy ra ở đây.

Điểm yếu đầu tiên và hay mắc phải nhất của chức năng này là lập trình viên gen một token quá yếu và không giới hạn số lần nhập sai token của người dùng.

![](https://images.viblo.asia/216ff861-65b1-4bf4-995e-f4c9af361d42.png)


Trên đây là đoạn request reset password gồm email và code, có thể thấy đoạn code chỉ có 4 số và dường như lập trình viên đã không giới hạn số lần sai code. Vậy chỉ cần tối đa 9000 request để có thể brute force thành công được code của nạn nhân:

![](https://images.viblo.asia/bcba284b-e704-4111-acdf-95bfcbe1a5bc.png)

Đây là một lỗi cơ bản nhưng cực kỳ nghiêm trọng dẫn đến hacker có thể account takeover khi biết email hay username của nạn nhân.

![](https://images.viblo.asia/a648a624-f003-408d-8b04-320cb345c2dc.png)

Đến với trường hợp tiếp theo, dưới đây là ví dụ minh họa về đoạn code được xử lý để người dùng đặt lại mật khẩu:
```php
<?php
    $mail = 'test@123.com';
    check_user($mail);
    $token = bin2hex(random_bytes(16));
    $resetPasswordURL = "https://{$_SERVER['HTTP_HOST']}/resetpassword/?token=".$token;
    send_user($mail,$resetPasswordURL);
?>
```

Đoạn mã trên đã làm rất tốt việc gen token để tránh việc brute force. Sau khi người dùng sử dụng chức năng đặt lại mật khẩu thì sẽ nhận được email để thay đổi mật khẩu có dạng như sau:
```
https://web-lab.pwn/resetpassword/?token=8e40cb4e796b37c5dcf606873dc33e4d
```
Nhìn đường link thì rất an toàn bởi token đã được sinh với 16 bytes, việc brute force thành công là rất thấp. Thế nhưng có một điều đáng chú ý là lập trình viên lại sử dụng một biến global `$SERVER['HTTPHOST']` trong đường link được gửi cho người dùng. 

![](https://images.viblo.asia/4f6f951e-ee02-4b4a-a9d0-675b65e7560c.png)

Đây là request để thực hiện việc đặt lại mật khâu. Trông có vẻ hoàn toàn bình thường,  thế nhưng có một điều đáng chú ý là lập trình viên lại sử dụng một biến global `$SERVER['HTTPHOST']` trong đường link được gửi cho người dùng. Vậy nên hacker có thể sử dụng một số kỹ thuật để inject host header dẫn đến đường link được gửi đến người dùng hoàn toàn không đúng, có thể dẫn đến link token.

Để khai thác hacker chỉ cần chặn bắt request sau đó thử thay đổi host:
```
Host: hacker.com
```
Hoặc
```
Host: target.com
X-Forwarded-Host: hacker.com
```
Hoặc
```
Host: target.com
Host: hacker.com
```
Cũng có thể sử dụng forward request: 
```http
POST https://target/forgot-password HTTP/1.1
Host: hacker.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 34
Connection: close
Upgrade-Insecure-Requests: 1

email=test@gmail.com
```

Nếu như việc khai thác trên thành công nạn nhân sẽ nhận được một đường link
```
https://hacker.com/reset-password/?token=0da562b00ff3058d7828aa8fbf8c846b
```
Nạn nhân sẽ click vào để thay đổi mật khẩu, đồng thời server của hacker đang lắng ghe các request đến, lúc này hacker sẽ nhận được request trong đấy có chưa token của nạn nhân và hacker chỉ cần sử dụng token đấy và thay đổi mật khẩu, như vậy là hacker đã lấy được hoàn toàn account của nạn nhân rồi :sweat_smile::sweat_smile:

Đối với trường hợp này lập trình viên nên gán cố định đường link chỉ thay đổi token hoặc sử dụng `$_SERVER['SERVER_NAME']` thay vì sử dụng `$_SERVER['HTTP_HOST']`

Ngoài ra còn một số trường hợp khác như:
- Sử dụng multi email parameter.
- Sửa đổi các response.
- Sử dụng các token đã hết hạn.
- Sử dụng chính token của mình.

### 3. Cách phòng chống
Việc phòng chống nên được chia ra làm hai phần như sau. Phần đầu tiền là bước người dùng yêu cầu trang web đặt lại mật khẩu và phần thứ hai là người dùng đặt mật khẩu mới.

#### 1. Yêu cầu đặt lại mật khẩu.
Khi người dùng yêu cầu đặt lại mật khẩu cần tuân thủ một số biện pháp sau đây:
- Người dùng chỉ nhập username hoặc email để thay đổi mật khẩu của họ.
- Website cần trả lại một thông báo nhất định, đặc biệt không trả lại token trên reponse.
- Dùng các biện pháp chống auto như CAPTCHA, giới hạn số lần, hoặc giới hạn số thời gian hoặc một vài biện pháp khác để chống lại việc có thể hacker sẽ dùng chính chức năng này để spam một người dùng trong hệ thống.
- Ngoài ra cần tuân thủ những biện pháp bảo mật khác như phòng chống SQLi và Input Validation.
#### 2. Reset Password
Sau khi người dùng nhận được link thông qua email hoặc code qua SMS cần xác thực lại token khi thay đổi mật khẩu. Để đảm bảo cần thực hiện một số biện pháp như sau:
- Người dùng nên nhập mật khẩu hai lần.
- Tuân thủ chính mật khẩu mạnh và đồng bộ với chính sách mật khẩu ứng dụng đang sử dùng.
- Gửi email xác nhận mật khẩu đã được thay đổi.
- Khi thay đổi mật khẩu thành công không tự động đăng nhập, người dùng cần phải đăng nhập như bình thường.

### 4. Một số reports thực tế
https://hackerone.com/reports/342693

https://hackerone.com/reports/272379

https://hackerone.com/reports/737042

https://hackerone.com/reports/226659

https://hackerone.com/reports/167631

### 5. Tài liệu tham khảo
https://portswigger.net/web-security/host-header/exploiting/password-reset-poisoning

https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html

https://www.acunetix.com/blog/articles/password-reset-poisoning/