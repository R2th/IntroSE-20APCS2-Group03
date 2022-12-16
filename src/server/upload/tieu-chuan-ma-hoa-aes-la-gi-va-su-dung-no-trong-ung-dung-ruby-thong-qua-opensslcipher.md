### 1. Tiêu chuẩn mã hóa AES là gì?

#### 1.1 Giới thiệu

AES (Advanced Encryption Standard)  là một thuật toán “mã hóa khối” (block cipher). AES trở thành một trong những thuật toán mã hóa phổ biến nhất sử dụng khóa mã đối xứng để mã hóa và giải mã (một số được giữ bí mật dùng cho quy trình mở rộng khóa nhằm tạo ra một tập các khóa vòng).

#### 1.2 Đặc điêm kỹ thuật

Một số khái niệm:
- Bản rõ (Plaintext): Dạng ban đầu của thông báo
- Bản mã (Ciphertext): Dạng mã của bản rõ ban đầu
- Khóa (Key): thông tin tham số dùng để mã hóa
- Mã hóa (Encryption): Quá trình biến đổi thông tin từ dạng bản rõ sang bản mã bằng khóa hoặc không cần khóa
- Giải mã (Decryption): Quá trình ngược lại biến đổi thông tin từ dạng bản mã sang bản rõ

AES là một thuật toán mã hóa khối đối xứng với độ dài khóa là 128 bít (một chữ số nhị phân có giá trị 0 hoặc 1), 192 bít và 256 bít tương ứng dọi là AES-128, AES-192 và AES-256. AES-128 sử dụng 10 vòng (round), AES-192 sử dụng 12 vòng và AES-256 sử dụng 14 vòng.

AES được thực hiện bởi các hàm theo thứ tự sau: Trộn từng byte (SubBytes), trộn từng hàng (ShiftRows), trộn từng cột (MixColumns) và mã hóa (AddRoundKey). Trong đó SubBytes, ShiftRows, MixColumns có nhiệm vụ làm cho mối quan hệ giữa bản rõ và bản mã bị che khuất (phương thức "mập mờ"). AddRoundKey sử dụng key mã hóa để mã hóa dữ liệu đầu vào bằng việc phân tán những kiểu mẫu của bản rõ sang bản mã (phương thức "khuếch tán")

- Chi tiết thuật toán chúng ta có thể tham khảo trên: https://vi.wikipedia.org/wiki/Advanced_Encryption_Standard

- Về cơ bản, cơ chế sẽ như sau:

![](https://images.viblo.asia/e2e8cb30-3320-4afe-86f3-aad346e92013.png)

### 2. OpenSSL::Cipher

#### 2.1 Giới thiệu:
Trong công nghệ bảo mật của các ứng dụng thì OpenSSL::Cipher là một tiện ích nguồn mở dùng để mã hoá dữ liệu vô cùng quan trọng, cung cấp các module cho phép mã hóa, giải mã dữ liệu. Thông thường ứng dụng ruby sẽ sử dụng module Cipher để thực hiện việc mã hóa này.

module của Cipher mình giới thiệu ở đây sẽ sử dụng phương pháp mã hóa là: Secret Key Encryption - mã hóa key bí mật

Đơn giản mà nói thì đây là kiểu mã hóa dùng một key bí mật mà đảm bảo dùng key này ta có thể mã hóa dữ liệu (plain text) thành 1 đoạn mật mã (ciphertext) và đồng thời có thể khôi phục được duy nhất toàn bộ dữ liệu từ đoạn mã hóa kia. Tuy nhiên kiểu đơn giản (như kiểu ECB mode) như này thì sẽ không an toàn cho 1 số trường hợp ví dụ khi bạn mã hóa 1 đoạn (16bytes) các ký tự giống nhau thì đoạn mã hóa trả ra cũng sẽ bị lặp lại.

Do đó mã hõa dùng key bí mật hiện đại ngày nay ngoài 2 trường trên người ta đã thêm 1 trường mới là vecto khởi tạo IV (Initialization Vector) hoặc nonce (1 số ngẫu nhiên dùng 1 lần). Trong mã hóa này thì trường key sẽ cần bảo mật 2 trường IV, nonce thì sẽ lưu trong đoạn mã gửi đi.

#### 2.2. Ví dụ sử dụng module Cipher

Ví dụ ta có một đoạn plain text như sau: plain_text = "test ma hoa", phía mã hóa và phía giải mã thống nhất 1 đoạn key mã hóa bao gồm 16 ký tự là "keygiaima1234567", 2 bên thống nhất phương pháp sinh ra Initialization Vector (iv) từ key mã hóa trên là:
```
Digest::MD5.hexdigest key
```

##### Tiến hành mã hóa:

```
cipher = OpenSSL::Cipher::AES.new(128, :CBC)
cipher.encrypt
cipher.key = key
cipher.iv = iv

encrypted = cipher.update(plain_text) + cipher.final
```

kết quả của encrypted = "\xC9\x93\xBDllp\x93\xC7K\xBC\xB7\b\xD8\xC9\x02-"

![](https://images.viblo.asia/7ac94dd5-8dc1-4121-898b-2ad30c7d79d4.png)

##### Tiến hành giải mã:

```
decipher = OpenSSL::Cipher::AES.new(128, :CBC)
decipher.decrypt
decipher.key = key
decipher.iv = iv

plain = decipher.update(encrypted) + decipher.final
```

Kết quả:

![](https://images.viblo.asia/79c7f613-f97f-463b-902c-2d9a10b349aa.png)

Vậy kết quả của việc giải mã đã cho ra đoạn text ban đầu. Và việc mã hóa này phải có key bảo mật và phương pháp sinh ra Initialization Vector mới có thể giải mã được. Ứng dụng của nó có rất nhiều, nhưng dễ thấy nhất trong việc bảo mật request của client và server, tránh bị spam bằng postman nếu bạn sử dụng một params động sinh ra từ việc mã hóa.

### 3. Kết luận

Qua bài viết, mình đã giới thiệu về tiêu chuẩn mã hóa AES và module Cipher dùng để mã hoá, giải mã của tiện ích OpenSSL::Ciphe. Việc bảo mật thì luôn cần thiết giúp tránh spam, fake request nhằm hack hệ thống ...

### 4. Tài liệu tham khảo

https://docs.ruby-lang.org/en/trunk/OpenSSL/Cipher.html
https://vi.wikipedia.org/wiki/Advanced_Encryption_Standard