Xác thực bằng thông tin đăng nhập và mật khẩu được biết là cách tiếp cận phổ biến để nhận dạng người dùng trên internet và truy cập tài nguyên trên web. 
Tuy nhiên, ngày nay, với sức mạnh tính toán hiện có, những kẻ tấn công mạng có cơ sở để thử nghiệm hàng tỷ kết hợp mật khẩu trong một giây. Hơn thế nữa, thống kê nói rằng 65% mọi người sử dụng cùng một mật khẩu, thường là mật khẩu đơn giản, ở mọi nơi. Điều này có nghĩa là đánh cắp thông tin đăng nhập của bạn hoặc nhặt chúng thông qua tấn công brute-force không còn là một nhiệm vụ phức tạp nữa.

Xác thực hai yếu tố (còn được gọi là 2FA ) là phương pháp xác nhận danh tính người dùng trong đó người dùng chỉ được cấp quyền truy cập sau khi trình bày thành công hai yếu tố cho cơ chế xác thực: 
* điều họ và chỉ họ biết - đăng nhập & mật khẩu, mã PIN, v.v.) 
* sở hữu (thứ mà họ và chỉ họ có). Các yếu tố sở hữu có thể là - thẻ ID, mã thông báo bảo mật, điện thoại thông minh, v.v. - thứ gì đó không phải là thứ logic mà bạn biết , mà là một thực thể vật lý.

Trong bài đăng này, tôi muốn trình bày cách triển khai xác thực hai yếu tố cho ứng dụng web bằng Google Authenticator làm yếu tố bảo mật sở hữu.
# TOTP (Thuật toán mật khẩu một lần dựa trên thời gian)

Ứng dụng Google Authenticator dựa trên thuật toán TOTP. Thuật toán mật khẩu một lần dựa trên thời gian (TOTP) là thuật toán tính mật khẩu một lần từ khóa bí mật chung và thời gian hiện tại. Thuật toán này được mô tả và tiêu chuẩn hóa trong RFC 6238 . Và ở đây, trong ứng dụng mẫu, tôi đã sử dụng hàm tạo TOTP để triển khai.


# Thực hiện
Để làm cơ sở cho ví dụ 2FA, tôi đã tạo một ứng dụng Web Java rất đơn giản thông qua Spring Boot. Cấu trúc của ứng dụng này rất đơn giản. Nó bao gồm:

4 trang HTML tĩnh
Trang chủ
Trang đăng ký người dùng
Trang đăng nhập
Trang được bảo mật - không khả dụng cho người dùng ẩn danh, nhưng có thể truy cập được đối với người dùng đã trải qua hai bước xác thực
Tệp Javascript chứa các tập lệnh JQuery để thêm chức năng cho các trang HTML tĩnh.
Bộ điều khiển Spring REST để đăng nhập và đăng ký người dùng ở phía máy chủ.
Và các dịch vụ cơ bản để hỗ trợ thực hiện bộ điều khiển REST
Bạn có thể xem phiên bản ứng dụng đã triển khai và đang hoạt động trong kho GitHub:

```
https://github.com/asholokh/google-auth-sample
```

# Đăng ký người dùng
Luồng đăng ký người dùng bao gồm hai bước:

* Chỉ định đăng nhập và mật khẩu
* Đăng ký khóa bí mật được tạo trong ứng dụng Google Authenticator

Khi ứng dụng tạo một người dùng mới với thông tin đăng nhập và mật khẩu cụ thể, nó cũng tạo ra một khóa bí mật duy nhất. Khóa này sau đó sẽ được sử dụng để tạo mã dựa trên thời gian. Vì vậy, rõ ràng là khóa bí mật (mã thông báo) này không nên được chia sẻ với bất kỳ ai, giống như mật khẩu.

Đây là cách luồng đăng ký người dùng nhìn trên UI:

![](https://andriysholokhdotcom.files.wordpress.com/2018/03/userregisterflow.png?w=660)

Token trên ảnh chụp màn hình này là khóa bí mật người dùng được mã hóa ở định dạng Base32. Đây là một yêu cầu để làm cho nó có thể được sử dụng trong Google Authenticator hoặc các ứng dụng OTP khác.

Mã QR đại diện cho một liên kết với định dạng cụ thể, có thể được quét và hiểu bởi Google Authenicator. Định dạng của liên kết này là như sau
```
otpauth://TYPE/LABEL?PARAMETERS
```

Ví dụ :
```
otpauth://totp/2FaExample.com?secret=3djh8sdjhfg7n634856dn&issuer=2FaExample
```

Để tự tạo hình ảnh QR, tôi đã sử dụng dịch vụ zxing.org bằng cách sử dụng liên kết sau:

```
https://zxing.org/w/chart?cht=qr&chs=250x250&chld=M&choe=UTF-8&chl=otpauth://totp/2FaExample.com?secret=" + data + "&issuer=2FaExample
```

trong đó 'data' là chuỗi khóa bí mật của người dùng.

Sau khi nhấp vào 'Done' trên màn hình 'Định cấu hình mã thông báo của bạn, người dùng đã đăng ký sẽ sẵn sàng cho các lần thử đăng nhập. Xin lưu ý rằng khóa bí mật chỉ được hiển thị cho người dùng một lần. Vì vậy, nó quan trọng để lưu hoặc ghi nhớ nó. Nếu không, nó sẽ không thể đăng nhập.

# Luồng xác thực
Quá trình xác thực bao gồm hai bước:

* Đăng nhập / xác minh mật khẩu
* Kiểm tra mã thông báo TOTP một lần.

Nhìn vào sơ đồ dưới đây để biết thêm chi tiết.
![](https://andriysholokhdotcom.files.wordpress.com/2018/03/userloginflow.png?w=660)

Trong ứng dụng mẫu được mô tả, tôi đã sử dụng triển khai tham chiếu thuật toán TOTP, được cung cấp như một phần của RFC 6238 . Tôi đã copy và paste bản triển khai đó vào dự án, vì vậy tôi sẽ không mô tả bất cứ điều gì liên quan đến nó. Bạn có thể [vào đây](https://tools.ietf.org/html/rfc6238#appendix-A) và xem xét nó.

Những gì mà ứng dụng làm là:

1. Nhận thông tin đăng nhập và mật khẩu người dùng
2. Xác minh rằng người dùng với thông tin đăng nhập và mật khẩu tồn tại.
3. Nhận mã thông báo từ người dùng (ảnh chụp màn hình ở trên)
4. Lấy khóa bí mật của người dùng từ cơ sở dữ liệu.
5. Bằng khóa bí mật này và thời gian hiện tại tạo TOTP bằng thuật toán được đề cập.
6. So sánh TOTP được tạo (bước 5) với mã thông báo do người dùng cung cấp (bước 3).

Điều quan trọng phải nói rằng là có một yêu cầu để làm cho luồng này hoạt động chính xác. Vì thuật toán TOTP sử dụng thời gian để tính toán mã token, thời gian hiện tại trên máy chủ ứng dụng và trên thiết bị có Google Authenticator được cài đặt phải khớp với nhau. Nếu không, các mã thông báo sẽ không bao giờ khớp với bước 6.

# Đáng để biết thêm
Điều quan trọng là phải hiểu rằng ứng dụng Google Authenicator chỉ là một trong những triển khai thuật toán tạo TOTP. Hoàn toàn có thể sử dụng bất kỳ ứng dụng nào thực hiện cùng thông số kỹ thuật, ví dụ FreeOTP, Authy hoặc thậm chí của riêng bạn. Nó chỉ phải thực hiện Thuật toán mật khẩu một lần dựa trên thời gian để tạo mật khẩu một lần.

Trong bài đăng này, tôi đã mô tả cách triển khai xác thực hai yếu tố bằng thuật toán Google Authenticator và TOTP để tạo mã thông báo. Để làm cho 2FA an toàn hơn nữa, có thể sử dụng bất kỳ phương pháp tạo mã thông báo nào khác, ví dụ: SMS, cuộc gọi điện thoại, mã thông báo phần cứng riêng, v.v.

Nguồn : https://andriysholokh.com/2018/03/20/two-factor-authentication-with-google-authenticator/