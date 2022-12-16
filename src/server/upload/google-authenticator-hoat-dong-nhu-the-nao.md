# MỞ ĐẦU
Ngày nay rất nhiều người sử dụng ứng dụng `Google Autheticator` (hay `Authy`) trên smartphone để thực hiện `xác thực 2 lớp`. Tuy nhiên làm thế nào mà kể cả khi không bật mạng, ứng dụng xác thực 2 bước này vẫn hoạt động bình là điều mình rất băn khoăn và đã thử research trên anh Gu Gồ (lol)

`Google Authenticator` là ứng dụng hiện thực hóa thuật toán `Time-Based One-Time Password (TOTP)`. Nó bao gồm các thành phần sau:
* 1 khóa bí mật chia sẻ (shared secret - một dãy các byte)
* 1 đầu vào là thời gian hiện tại
* 1 hàm mã hóa

### Shared Secret
Trước hết cần sử dụng một khóa bí mật để thiết lập tài khoản trên điện thoại. Ta có thể chụp ảnh mã QR bằng điện thoại của mình hoặc có thể nhập theo cách thủ công. Trong trường hợp nhập thủ công, khóa bí mật của dịch vụ này được hiển thị theo định dạng sau:


| xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx |
|---|
Mã QR chứa token tương tự là 1 URL:
| otpauth://totp/Google%3Ayourname@gmail.com?secret=xxxx&issuer=Google |
|---|

### Input (Current time)
Giá trị input đơn giản là thời giạn hiện tại của điện thoại của bạn, không cần có sự tương tác giữa client và server một khi đã có khóa bí mật. Tuy nhiên điều quan trọng là thời gian trên điện thoại phải trùng với thời gian trên server bởi server sẽ lặp lại chính xác những gì xảy ra tương tự trên điện thoại với input là thời gian hiện tại trên server. 

Cụ thể hơn, server sẽ so sánh giá trị token mà người dùng submit với tất cả các token được sinh ra trong một khoảng thời gian nhất định (vài chục giây đến vài phút), nếu trùng nhau thì token bạn nhập là hợp lệ và pass qua vòng authentication thứ 2.

### Signing Function
Hàm mã hóa được sử dụng ở đây là `HMAC-SHA1`. HMAC là viết tắt của `Hash-based message authentication code` và nó là một thuật toán sử dụng hàm mã hóa một chiều (trong trường hợp này là SHA1) để mã hóa giá trị. 

Sử dụng `HMAC` khá là an toàn bởi chỉ khi có khóa bí mật mới sinh được cùng một giá trị output cho cùng một giá trị input. Nghe thì phức tạp nhưng thuật toán thực tế thì đơn giản:
| hmac = SHA1(secret + SHA1(secret + input)) |

### Algorithm
Trước hết ta cần base32 decode khóa bí mật. Vì Google hiển thị khóa bí mật bao gồm cả dấu cách và bằng chữ in thường để dễ đọc, nên ta cần loại bỏ dấu cách và uppercase chúng lên:
```
original_secret = xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx
secret = BASE32_DECODE(TO_UPPERCASE(REMOVE_SPACES(original_secret)))
```
Tiếp theo lấy input là thời gian hiện tại của hệ thống:
```
input = CURRENT_UNIX_TIME()
```
Một điều dễ nhận thấy ở Google Authenticator là mã sinh ra thường hợp lệ trong 1 khoảng thời gian nhất định trước khi lại sinh ra một giá trị mới. Nếu giá trị này thay đổi liên tục mỗi giây thì rất khó cho người dùng kịp đọc hay copy paste nó. Giá trị mặc định là 30s, lấy thời gian hiện tại chia cho 30 thì trong 30s giá trị input là như nhau:
```
input = CURRENT_UNIX_TIME() / 30
```
Cuối cùng áp dụng hàm mã hóa `HMAC-SHA1`:
```
original_secret = xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx
secret = BASE32_DECODE(TO_UPPERCASE(REMOVE_SPACES(original_secret)))
input = CURRENT_UNIX_TIME() / 30
hmac = SHA1(secret + SHA1(secret + input))
```
Cho đến thời điểm bây giờ, ta đã phần lớn hoàn thành dịch vụ xác thực 2 bước 2FA. Tuy nhiên kết quả ta thu được giá trị HMAC có độ dài tiêu chuẩn của một giá trị sau khi đi qua hàm mã hóa SHA1 (20 bytes, 40 ký tự hexa) và chắc chả ai muốn sử dụng dịch vụ này khi phải nhập 40 ký tự cả. Khoảng 6 kí tự là vừa đẹp.
```
four_bytes = hmac[LAST_BYTE(hmac):LAST_BYTE(hmac) + 4]
```
Ta có thể chuyển về dạng unsigned integer 32bit (4 bytes)
```
large_integer = INT(four_bytes)
```
Bây giờ thì ta đã chuyển giá trị sinh ra về con số rồi, tuy nhiên đây vẫn sẽ là số tương đối lớn (2^32 - 1). Để thu được con số nhỏ hơn, ta lấy giá trị thu được chia lấy dư cho 1 triệu:
```
large_integer = INT(four_bytes)
small_integer = large_integer % 1,000,000
```
Cuối cùng, đoạn pseudo code hoàn chỉnh:
```
original_secret = xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx
secret = BASE32_DECODE(TO_UPPERCASE(REMOVE_SPACES(original_secret)))
input = CURRENT_UNIX_TIME() / 30
hmac = SHA1(secret + SHA1(secret + input))
four_bytes = hmac[LAST_BYTE(hmac):LAST_BYTE(hmac) + 4]
large_integer = INT(four_bytes)
small_integer = large_integer % 1,000,000
```
# KẾT LUẬN
 ### Tài liệu tham khảo
 [https://garbagecollected.org/2014/09/14/how-google-authenticator-works/](https://garbagecollected.org/2014/09/14/how-google-authenticator-works/)