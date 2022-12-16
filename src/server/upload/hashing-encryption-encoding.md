Thường có sự nhầm lẫn giữa ba thuật ngữ **Hashing**, **Encryption**, **Encoding**, nhưng hoàn cảnh và lý do sử dụng mỗi loại là hoàn toàn khác nhau. Sự khác biệt sẽ được liệt kê trong nội dung phía dưới.
## 1. Hashing
![](https://images.viblo.asia/f1965217-7191-49b7-a6e5-6186c98fd8eb.jpg)

Hashing được sử dụng để bảo vệ tính toàn vẹn của dữ liệu.

Hash là một chuỗi được tạo ra thông qua một thuật toán.

Thuật toán nhận đầu vào tùy ý, trả ra nột chuỗi có độ dài cố định và phải đảm bảo:
- Tính nhất quán: Đầu vào giống nhau sẽ luôn tạo ra cùng một hash. Một chút thay đổi của giá trị đầu vào cũng sẽ thay đổi hoàn toàn hash được tạo ra (Hiệu ứng này được gọi là Avalanche Effect).
- Tính duy nhất: Không có cùng một hash cho hai giá trị đầu vào khác nhau.
- Tính một chiều: Chỉ có thể chuyển thành hash và không có chiều ngược lại. Không thể lấy được giá trị đầu vào sau khi chuyển đổi.

Ví dụ, sử dụng thuật toán SHA-1:
```
Everybody loves donuts ---> daebbfdea9a516477d489f32c982a1ba1855bcd
```
```
Everybody loves donut  ---> 8f2bd584a1854d37f9e98f9ec4da6d757940f388
```
Hash đã thay đổi hoàn toàn khi loại bỏ "s" khỏi "donuts".

Một số thuật toán hash phổ biến: Secure Hash Function (SHA) , md5, Bcrypt...

Ứng dụng quen thuộc nhất của hashing là lưu trữ mật khẩu, không lưu trực tiếp mật khẩu vào cơ sở dữ liệu mà chỉ lưu hash của "salted password", điều này đảm bảo chỉ có người dùng sở hữu mật khẩu của họ. Salt là một chuỗi ngẫu nhiên được nối với mật khẩu mà chỉ server sở hữu, điều này giúp hai mật khẩu giống nhau thì hash được lưu sẽ luôn khác nhau, đồng thời nếu bị đánh cắp thì hacker cũng không thể xác định những người dùng cùng mật khấu. Quy trình lưu trữ và xác thực mật khẩu như sau:
1. Khi người dùng tạo mật khẩu, mật khẩu sẽ được gửi đến Server. 
2. Server sẽ thêm salt vào mật khẩu và chuyển chuỗi này thành hash. Hash này sẽ được lưu vào cơ sở dữ liệu.
3. Khi người dùng xác thực, nếu hash được tạo ra từ salted password khớp với cơ sở dữ liệu, người dùng được cấp quyền truy cập.
## 2. Encryption
![](https://images.viblo.asia/d63e03dc-c9b6-46bb-a292-35aa1f60d074.jpg)

Encryption là quá trình chuyển đổi dữ liệu thành một định dạng không thể đọc được để giữ an toàn và bảo mật cho chúng, chỉ những người được ủy quyền mới có thể đảo ngược nó. Quá trình đảo ngược được gọi là **Decryption**

Encryption sử dụng một khóa bí mật cùng với thuật toán để thực hiện chuyển đổi dữ liệu. Như vậy, cần sở hữu thuật toán và khóa để lấy được dữ liệu gốc.

Có hai loại encryption: Symmetric key and asymmetric key.
- Symmetric encryption: Sử dụng cùng một khóa để mã hóa và giải mã dữ liệu. 
- Asymmetric encryption: Hai khóa khác nhau được sử dụng để mã hóa và giải mã dữ liệu. Một khóa được gọi là "Public key" và khóa còn lại là "Private key". Khi dữ liệu được gửi qua HTTPS, nó sẽ được mã hóa bằng public key, khóa này được lưu trữ trong trình duyệt. Private key chỉ bên nhận dữ liệu sở hữu và phải được giữ bí mật. Sử dụng hai khóa riêng biệt làm cho quá trình mã hóa an toàn hơn và chậm hơn một chút.

Cả hai kỹ thuật này đều được sử dụng trong SSL/TLS certificate. Asymmetric encryption được áp dụng cho quá trình SSL handshake - xác thực server. Khi đã kết nối server với client, symmetric encryption sẽ đảm nhận việc mã hóa dữ liệu.

Một số thuật toán encryption: Advanced Encryption Standard (AES), Blowfish, RSA...
## 3. Encoding
![](https://images.viblo.asia/b1f820f7-d92c-45e4-80e9-416a6b0ebd06.jpg)

Encoding là một quá trình thay đổi dữ liệu sang một định dạng mới thông qua một lược đồ có sẵn, công khai. 

Encoding là quá trình có thể đảo ngược, quá trình này được gọi là **Decoding**. Không yêu cầu khóa chỉ cần thuật toán đã mã hóa để giải mã nó.

Encoding thường được sử dụng để đảm bảo dữ liệu được toàn vẹn và có thể được sử dụng bởi nhiều hệ thống. Mục đích của encoding không phải là bảo mật dữ liệu vì dễ dàng bị đảo ngược.

Thuật toán encoding phổ biến nhất là Base64, ngoài ra có ASCII, Unicode, URL Encoding...
## 4. Tổng kết
|  | Hashing | Encryption | Encoding |
| -------- | -------- | -------- | -------- |
| Sử dụng thuật toán | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Sử dụng key | :x: | :heavy_check_mark: | :x: |
| Toàn vẹn dữ liệu | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Bảo mật dữ liệu | :heavy_check_mark: | :heavy_check_mark: | :x: |
| Đảo ngược | :x: | :heavy_check_mark: | :heavy_check_mark: |

**Tham khảo:**

[Encryption, Encoding and Hashing: Explained](https://www.packetlabs.net/encryption-encoding-and-hashing/)

[Hashing vs. Encryption vs. Encoding vs. Obfuscation](https://danielmiessler.com/study/encoding-encryption-hashing-obfuscation/)

[Explained: Hashing vs. Encryption vs. Encoding](https://cheapsslsecurity.com/blog/explained-hashing-vs-encryption-vs-encoding/)