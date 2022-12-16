![](https://images.viblo.asia/1a08b937-8b65-4779-a1e7-e1d456e30bc7.png)


## Two Factor Authentication của github dùng phương pháp gì
**Xác thực hai yếu tố (2 lớp) là gì?**

Xác thực hai yếu tố (2FA) chỉ là một lớp bảo mật bổ sung cho tài khoản của người dùng. Điều đó có nghĩa là, sau khi bật xác thực hai yếu tố, người dùng phải thực hiện thêm một bước nữa để đăng nhập. Ví dụ: các bước thông thường để đăng nhập vào tài khoản là:
 ![](https://images.viblo.asia/3e1c8382-acd1-4895-becf-7f5f504059e4.png)

Sau khi bật xác thực 2 lớp:

![](https://images.viblo.asia/5907217a-7182-4daa-bee9-f258ea3afc21.png)

Việc xử dụng bảo vệ 2 lớp sẽ giúp cho tái khoản của người dùng an toàn hơn. Giúp tránh các truy cập trái phép khi chẳng may bị mất mật khẩu. Bới vì khi đăng nhập cần phải xác thực thêm 1 lần bằng mật khẩu sử dụng 1 lần (One Time Password - OTP).

Hiện tại có 2 phương thức cung cấp OTP  phổ biến là: 

1. **Dựa trên SMS**: Trong phương pháp này, mỗi khi người dùng đăng nhập, họ sẽ nhận được một tin nhắn văn bản đến số điện thoại đã đăng ký của họ, trong đó có OTP
2. **Dựa trên TOTP**: Trong phương pháp này, trong khi bật xác thực 2 yếu tố, người dùng được yêu cầu quét hình ảnh QR bằng một ứng dụng điện thoại thông minh cụ thể: "Google authenctor, Authentor".
Ứng dụng đó sau đó liên tục tạo OTP ngườii dùng.


Phương pháp dựa trên SMS đã rất phổ biến hiện nay. Dễ dàng sử dụng, nhưng nó có những vấn đề riêng, chẳng hạn như chờ tin nhắn SMS mỗi lần đăng nhập, các vấn đề bảo mật, v.v... Hiện nay phương pháp dựa trên TOTP đang dần được đưa vào sử dụng rộng rãi . Các chuyên gia cũng khuyến cáo nên sử dựng phương pháp này vì nó có những ưu điểm hơn so với phương pháp dựa trên SMS.

Hiện nay, github sử dụng cả 2 phương pháp trên nhưng TOTP được khuyến cáo sử dụng nhiều hơn vì một số quốc gia github không hỗ trợ SMS như ở Việt Nam chẳng hạn.

## Phương pháp xác thực 2 lớp dựa trên TOTP

Bằng cách sử dụng TOTP, việc tạo OTP được thực hiện ở phía người dùng (thay vì phía máy chủ) thông qua ứng dụng trên điện thoại thông minh. Điều này có nghĩa là user luôn có quyền truy cập vào OTP của mình. Vì vậy server không phải tạo OTP và gửi qua SMS nữa. Các OTP này sẽ thay đổi liên tục theo thời gian do vậy nó có độ tin cậy như OTP được tạo từ server.

Khi người dùng bật tính năng bảo vệ 2 lớp tư tưởng cho việc xử lý này như sau:

1. Server sẽ tạo một khóa bí mật (secret key) ứng với user đó
2. Server chia sẻ khóa bí mật này cho ứng dụng trên smartphone của người dùng
3. Ứng dụng trên smart phone sẽ khởi tạo counter
4. Ứng dụng sẽ generate OTP với khóa bí mật và counter đó
5. Ứng dụng thay đổi OTP sau mỗi khoảng thời gian nào đó và khiến cho OTP thay đổi liên tục


Dựa trên tư tưởng này chúng ta có **3 vấn đề** cần giải quyết:

1. Ứng dụng sẽ tạo OTP như thế nào với khóa bí mật và counter?
2. Counter sẽ được cập nhật như thế nào? Server theo dõi cái counter này như thế nào?
3. Server sẽ chia sẽ khóa bí mật này với ứng dụng như thế nào?


Để giải quyết 3 vấn đề này trước tiên chúng ta cần tìm hiểu HOTP. Vậy HOTP là cái gì vậy?

### Tìm hiểu  HOTP

HOTP là viết tắt của "HMAC-Based One-Time Password" Thuật toán tạo OTP dựa trên hàm HMAC. HOTP định nghĩa một thuật toán để tạo mật khẩu một lần từ khóa bí mật và counter.

THuật toán này có 2 bước chính sau:

1. Bước đầu tiên là tạo một băm [HMAC](https://en.wikipedia.org/wiki/HMAC) từ khóa bí mật và counter .

```
# HMAC sử dụng SHA-1 làm hash function

hmacHash = HMAC-SHA-1(secretKey, counter)
# HMAC-SHA-1 thực thế là SHA1(secret + SHA1(secret + counter))
```

Sau hàm trên ta sẽ thu được một chuỗi dài 20 bytes (40 ký tự hexa) nếu  quy ra số thì mã này dài quá.. không phù hợp để làm OTP. Vậy nên chúng ta có phương pháp cắt ngắn số này như sau

2. Cắt ngắn Hmac nhận được theo độ dài mong muốn. ta sẽ lấy ra 1 khoảng ngẫu nhiên 4 bytes liên tiếp đến tiến hành rút gọn

    * Tìm ra vị trí cần lấy offset: ta sẽ lấy byte cuối cùng ( `hmacHash[19]` & 0xf ) and bit với 0xf để lấy ra 1 giá trị <=15 
    * Lấy ra 4 byte từ vị trí offset: `truncatedHash = [hmacHash[offset], hmacHash[offset+3]]` từ đây ta sẽ lấy được 4byte
    *  Ta quy đổi giá trị 4 bytes thành giá trị số nguyên có dấu.  => ta sẽ nhận được một số nguyên đủ lớn.
    *  Sau khi đã có số nguyên lớn ta tiến hành chia lấy dư cho 10^độ dài OTP 
    
    `finalOTP = (truncatedHash % (10 ^ numberOfDigitsRequiredInOTP))`

VÍ dụ:

![](https://images.viblo.asia/46f0234c-73cd-4814-a9fd-2cf29e36dd41.png)


Tham khảo thêm thuật toán tại HOTP: https://tools.ietf.org/html/rfc4226

Code demo python:

```
import hmac, base64, struct, hashlib, time

def get_hotp_token(secret, counter):
    key = base64.b32decode(secret, True)
    msg = struct.pack(">Q", counter)
    h = hmac.new(key, msg, hashlib.sha1).digest()
    o = ord(h[19]) & 15
    h = (struct.unpack(">I", h[o:o+4])[0] & 0x7fffffff) % 1000000
    return h
```

hoặc xem thêm tại: [https://github.com/tadeck/onetimepass/blob/master/onetimepass/__init__.py](https://github.com/tadeck/onetimepass/blob/master/onetimepass/__init__.py)


**HOTP** có vấn đề sau: Làm sao để truyền vào counter cho chuẩn? Vấn đề này sẽ được giải quyết với **TOTP** 

### Tìm hiểu TOTP

**TOTP** ("Time-Based One-Time Password") sử dụng thuật toán HOTP để lấy mật khẩu một lần. Sự khác biệt duy nhất là nó sử dụng “Thời gian” thay cho “counter" và điều đó đưa ra giải pháp cho vấn đề thứ hai đã đề cập ở phần trước.

Thời gian được TOTP sử dụng ở đây là Unixtime nên không phụ thuộc vào múi giờ giữa ứng dụng và server.

Tuy nhiên, Unix time được xác định bằng giây, vì vậy nó thay đổi mỗi giây. Nếu chỉ  sử dụng UnixTime thì  điều đó có nghĩa là mật khẩu được tạo sẽ thay đổi mỗi giây => không khả thi . Thay vào đó, chúng ta cần thêm một khoảng thời gian đáng kể trước khi thay đổi mật khẩu. Ví dụ: Ứng dụng Google Authenticator thay đổi mã 30 giây một lần.

Vậy khi này chúng ta sẽ thay counter của HOTP bằng công thức sau:

```
counter = currentUnixTime / period # period defaut thường là 30 giây
```

Vậy nên khi tạo TOTP server sẽ đưa ra khóa bí mật +  con số period cụ thể để tạo ra OTP khớp giữa ứng dụng và client.

### Điểm yếu 

Không có biện pháp bảo vệ nào trong TOTP chống lại kẻ tấn công lừa khi nhập mã OTP vào một trang web giả mạo
Vì khóa bí mật nằm trên điện thoại và nó  không phải là thiết bị bảo mật chuyên dụng, nếu cài phần mềm độc hại trên điện thoại, nó có thể đánh cắp khóa bí mật. Tuy nhiên, đây vẫn là một giải pháp tốt cho việc bảo vệ 2 lớp và nó an toàn hơn so với SMS.

## Khi mất 2FA thì phải làm sao

Thông thường khi bật 2FA server sẽ tạo ra 1 list các recovery code và yêu cầu người dùng phải lưu trữ để đề phòng trường hợp rủi ro.
Ngoài ra, Các ứng dụng như Ứng dụng Google Authenticator cho phép bạn tạo mật khẩu bằng cách nhập trực tiếp khóa bí mật. Nếu người dùng bị mất mã, họ có thể nhập khóa bí mật đã lưu an toàn đó vào ứng dụng điện thoại để tạo lại OTP.

Trong trường hợp xấu nhất là mất điện thọai và recovery code thì phải làm sao? 

## **Bạn hãy lên github mà hỏi nhé**

Trong phần tới sẽ có demo một hệ thống sử dụng 2FA  với TOTP bằng Python nhé

## Tham khảo 

https://tools.ietf.org/html/rfc4226

https://www.freecodecamp.org/news/how-time-based-one-time-passwords-work-and-why-you-should-use-them-in-your-app-fdd2b9ed43c3/