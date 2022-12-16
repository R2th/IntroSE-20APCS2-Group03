![](https://images.viblo.asia/2161aed8-3474-424b-9a36-aab0c6f4db21.jpg)
Password hashing không hề lạ lẫm với một cô cậu dev, dù là dỏm hay là xịn. Ngôn ngữ nào cũng có, ứng dụng nào cũng có. Hễ có người dùng ắt sẽ có password, hễ có password ắt có mặt hashing.

Vậy chúng ta hãy cùng nhau tìm hiểu về Hashing, Password Hashing và cách ứng dụng chúng nó trong Java bạn nhé ;) (Mấy ngôn ngữ khác đâu đó chắc sẽ tương tự :v:)
## 1. Hashing là gì?
Hashing (người ta hay dịch là băm) là quá trình tạo ra một chuỗi (được băm) từ một thông điệp (chuỗi) được truyền vào sử dụng một hàm toán học nào đó (hàm băm mật mã).

(Khái niệm Hashing hoàn toàn khác với Encrypting bạn nhé, [không nên đồng nhất với nhau](https://www.securityinnovationeurope.com/blog/page/whats-the-difference-between-hashing-and-encrypting))

Mặc dù hiện nay có rất nhiều "hàm băm", mỗi hàm được viết dưới nhiều thuật toán khác nhau, cho ra nhiều kết quả khác nhau. Tuy nhiên để là một hàm băm tốt cần phải có 4 thuộc tính bảo mật như sau:

1. **Có tính xác định**: Cùng một chuỗi đầu vào được xử lý bởi cùng hàm băm, sẽ cho ra cùng một kết quả.
2. **Không thể đảo ngược**: Không thể tạo ra chuỗi (thông điệp) từ một chuỗi đã được băm từ hàm băm.
3. **Có entropy cao**: Khi có một thay đổi nhỏ trong chuỗi thông điệp, sẽ tạo ra chuỗi băm khác nhau (Ví dụ: Abcde và abcde sẽ tạo ra 2 chuỗi băm khác nhau dù chỉ khác ở chữ a).
4. **Có tính duy nhất**: Hai thông điệp khác nhau thì nhận về 2 chuỗi băm khác nhau.

Hàm băm nào đáp ứng đủ 4 thuộc tính trên sẽ là một hàm đủ tiêu chuẩn để băm mật khẩu, vì sẽ làm tăng độ khó cho các kỹ thuật đảo ngược mật khẩu. Và thêm nữa, các chuyên gia cũng nói rằng, thuật toán băm phải có độ phức tạp lớn, để hàm băm chậm vì do một khi băm nhanh, sẽ dễ bị hacker lợi dụng để đoán mật khẩu bằng cách băm và so sánh hàng tỷ mật khẩu mỗi ngày.

Một số hàm băm đáp ứng đủ những tiêu chí này phải kể đến như PBKDF2, BCrypt, and SCrypt. Nhưng trước tiên chúng ta hãy cùng điểm lại một vài thuật toán băm cũ hơn và xem lý do tại sao người ta khuyến nghị không nên dùng chúng nó nữa.
## 2. MD5 (Không nên dùng)
Thuật toán đầu tiên của chúng ta là thuật toán phân loại thông điệp (message-digest) MD5, được phát triển từ năm 1992.

Tuy nhiên, sau vài năm lưu lạc chốn giang hồ, nó đã bị phát hiện ra rằng đã phạm vào "điều lệ thứ 4", 2 chuỗi băm được tạo ra có thể trùng nhau từ 2 thông điệp khác nhau. Và kinh điển hơn nữa, thuật toán này chạy rất nhanh, nên rất dễ bị hacker truy lùng mật khẩu bằng cách thử (nhanh quá cũng mệt thế đấy, chậm cho chắc).

**Chính vì thế, MD5 đến đây là tàn đời, không còn được khuyến khích dùng nữa!**

Trong Java, chúng ta dùng nó thông qua class MessageDigest. Cụ thể như nào, bạn google search "java md5" sẽ ra ngay nhé. (Vì không được khuyến khích sử dụng nên mình không post method dài dòng ở đây thêm nữa)
## 3. SHA-512 (Không nên dùng)
Kẻ thất bại tiếp theo, sẽ phải kể đến SHA-512, một thành viên trong gia đình **S**ecure **H**ash **A**lgorithm, mà trong đó, người anh đầu tiên là SHA-0 được phát triển từ năm 1993.
### 3.1 Vì sao SHA-512 được hạ sinh?
Khi khả năng xử lý của máy tính ngày càng cao, người ta đã tìm ra nhiều lỗ hổng mới trong các phiên bản SHA. Và thế là SHA-512 được hạ sinh để khắc phục những điểm đen còn tồn đọng của những người anh em kế nó. Phiên bản mới của SHA có chiều dài chuỗi băm dài hơn, sử dụng một thuật toán mới hơn.
### 3.2 Dùng trong Java
Bây giờ, chúng ta cùng xem thử cách sử dụng thuật toán băm SHA-512 trong Java sẽ như thế nào nhé.

Nhưng đầu tiên, chúng ta cần phải hiểu khái niệm **salt** trước đã. Nói một cách đơn giản, đây chỉ là một chuỗi ngẫu nhiên được tạo ra cho mỗi chuỗi băm (Mà bằng cách này, nó đã góp phần tăng entropy cho chuỗi băm, giúp mật khẩu không được đoán ra bởi hàng loạt các chuỗi băm được biên dịch sẵn).

Hàm băm mới của chúng ta đại khái sẽ như thế này:
```
salt <- generate-salt;
hash <- salt + ':' + sha512(salt + password)
```
### 3.3 Tạo một chuỗi Salt
Để tạo chuỗi salt, chúng ta sẽ sử dụng class **SecureRandom** từ package **java.security**:
```
SecureRandom random = new SecureRandom();
byte[] salt = new byte[16];
random.nextBytes(salt);
```
Sau đó, sử dụng class **MessageDigest** để cấu hình sử dụng hàm băm **SHA-512** với chuỗi salt đã tạo:
```
MessageDigest md = MessageDigest.getInstance("SHA-512");
md.update(salt);
```
Và bây giờ, mật khẩu sau khi được băm sẽ tạo ra như sau:
```
byte[] hashedPassword = md.digest(passwordToHash.getBytes(StandardCharsets.UTF_8));
```
### 3.4 Tại sao không còn được khuyến khích sử dụng?
Khi làm việc với chuỗi salt, SHA-512 vẫn là một lựa chọn hợp lý.

Tuy nhiên, ngoài kia đâu đó vẫn còn nhiều thuật toán mạnh hơn, chậm hơn và đẹp trai hơn nó.

Cùng xem tiếp bạn nhé ;)

Bật mí ... SHA-512 không có cấu hình cường độ như các thuật toán kia...
## 4. PBKDF2, BCrypt, and SCrypt
PBKDF2, BCrypt, và SCrypt là 3 thuật toán được đề xuất nên sử dụng...Bởi độ đẹp trai xuất sắc :D
### 4.1 Tại sao lại khuyến nghị nên dùng?
Mỗi thuật toán đều chậm, và hơn hết chúng đều có tính năng tuyệt vời là có thể cấu hình cường độ (configurable strength).

Nghĩa là máy tính càng ngày càng tăng sức mạnh tính toán, thì với những thuật toán đó, dù không thay đổi lại cấu trúc thuật toán những vẫn có thể làm chậm thuật toán đi bằng cách thay đổi dữ liệu đầu vào (Thêm tham số cấu hình cường độ cho thuật toán).

Để dễ dàng hình dung cách cấu hình như thế nào, bạn vui lòng tham khảo cách sử dụng các thuật toán trong Java ở bên dưới nhé.
### 4.2 Sử dụng PBKDF2 trong Java
Chuỗi salt là nguyên tắc cơ bản của quá trình băm mật khẩu, vì vậy chúng ta cần tạo trước chuỗi salt cho PBKDF2:
```
SecureRandom random = new SecureRandom();
byte[] salt = new byte[16];
random.nextBytes(salt);
```
Tiếp theo, chúng ta sẽ tạo ra các đối tượng thuộc các class **PBEKeySpec** và **SecretKeyFactory** sử dụng thuật toán PBKDF2WithHmacSHA1:
```
KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 128);
SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
```
**Tham số thứ ba (65536)** là tham số cường độ. Nó quy định số lần lặp mà thuật toán này chạy, tăng thời gian cần thiết để tạo ra chuỗi băm.

Cuối cùng, một chuỗi băm đã được tạo ra nhờ **SecretKeyFactory**:
```
byte[] hash = factory.generateSecret(spec).getEncoded();
```
### 4.2 Sử dụng BCrypt và SCrypt trong Java
Còn về BCrypt và SCrypt thì sao. Thực sự thì chúng nó chưa được Java đưa vào bộ JDK, mặc dù một số thư viện Java đã có hỗ trợ. Điển hình đó là **Spring Security**.

Nhưng, rất đáng để bạn sử dụng đấy ;)
## 5. Password Hashing với Spring Security
Mặc dù Java hỗ trợ cả hai thuật toán băm PBKDF2 và SHA, nhưng lại không hỗ trợ thuật toán BCrypt và SCrypt.

May mắn thay, Spring Security đã có hỗ trợ tất cả các thuật toán này thông qua **PasswordEncoder** interface:

* MessageDigestPasswordEncoder hỗ trợ thuật toán MD5 và SHA-512
* Pbkdf2PasswordEncoder hỗ trợ sử dụng PBKDF2
* BCryptPasswordEncoder hỗ trợ BCrypt
* SCryptPasswordEncoder thì SCrypt

Các bộ mã hóa mật khẩu PBKDF2, BCrypt và SCrypt đều hỗ trợ cấu hình độ mạnh mong muốn cho hàm băm mật khẩu. Vì thế, mật khẩu được băm bằm các hàm này bảo mật thôi rồi :D
## 6. Ngoại lề
Như vậy, qua nhiều phong ba bão táp, chúng ta đã luận bàn xong về password hashing (quá trình băm mật khẩu). Chắc ít nhiều các bạn cũng đã nắm sơ về lịch sử của các hàm băm. Hi vọng nhiêu đó có thể bổ sung thêm chút ít kiến thức cho những bạn chưa thật sự hiểu về "băm", "băm mật khẩu".

Một lần nữa xin được cảm ơn!

![](https://images.viblo.asia/155f3206-e244-4c94-bcce-31cd4b81aac9.gif)

Thân ái!