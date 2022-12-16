Trong cryptography, One-time pad là một kỹ thuật mã hóa không thể bị bẻ khóa, nhưng yêu cầu sử dụng khóa chia sẻ trước dùng một lần không nhỏ hơn thông điệp được gửi. Trong kỹ thuật này, một bản rõ được ghép nối với một khóa bí mật ngẫu nhiên.
# Giới thiệu về ONE-TIME PAD
## One-time pad là gì?
One-time pad (OTP) là một kỹ thuật mã hóa không thể bị bẻ khóa, nhưng yêu cầu sử dụng khóa chia sẻ trước một lần có cùng kích thước hoặc dài hơn thông điệp được gửi. Trong kỹ thuật này, một bản rõ được ghép nối với một Khóa bí mật ngẫu nhiên (còn được gọi là One-time pad). Sau đó, mỗi bit hoặc ký tự của bản rõ được mã hóa bằng cách kết hợp nó với bit hoặc ký tự tương ứng từ vùng đệm bằng cách sử dụng phép cộng mô-đun.
Bản mã thu được sẽ không thể giải mã hoặc phá vỡ nếu bốn điều kiện sau được đáp ứng: 

*    Chìa khóa phải thực sự ngẫu nhiên
*    Khóa ít nhất phải dài bằng bản rõ
*    Chìa khóa không bao giờ được sử dụng lại toàn bộ hoặc một phần
*    Chìa khóa phải được giữ bí mật hoàn toàn

Nó cũng đã được chứng minh rằng bất kỳ mật mã nào có thuộc tính bảo mật hoàn hảo đều phải sử dụng các khóa với các yêu cầu tương tự như khóa OTP.

## Lịch sử
* OTP xuất hiện từ đầu thế kỉ 20 và còn có tên gọi khác là Vernam Cipher, nó được mệnh danh là cái chén thánh của ngành mã hóa dữ liệu. 
* OTP là thuật toán duy nhất chứng minh được về lý thuyết là không thể phá được ngay cả với tài nguyên vô tận (tức là có thể chống lại kiểu tấn công brute-force).
* Frank Millernăm 1882 là người đầu tiên mô tả hệ thống đệm dùng one-time pad để bảo mật điện báo.

# One-Time Pad được xác định như sau:
```
E(m, k) = m XOR k = c`
```

```
D(c, k) = c XOR k = (m XOR k) XOR k = m`
```
![](https://images.viblo.asia/7ab6c9d1-45fa-4543-add9-1575be5f5f48.png)


Với OTP, khóa k phải đáp ứng 3 điều kiện sau đây:
* Độ dài của khóa phải bằng kích thước bản rõ.
* Khóa phải được chọn hoàn toàn ngẫu nhiên (truly random).
* Và khóa chỉ được sử dụng một lần.

Nếu thỏa mãn 3 điều kiện trên, hệ mã OTP sẽ là an toàn tuyệt đối (perfect security) theo định lý của Clause Shannon.
OTP sẽ cho ta tốc độ tính toán rất nhanh

# Biến thể OTP trong thực tế 
```
E'(m, k) = E(m, PRG(k)) = m XOR PRG(k) = c`
```

```
D'(c, k) = D(c, PRG(k)) = (m XOR PRG(k)) XOR PRG(k) = m
```
Trong đó, k có kích thước nhỏ hơn rất nhiều so với m.

# Cách hoạt động
## Ý tưởng
Ý tưởng thực hiện sẽ lần lượt triển khai theo các bước như sau:
1. Chuyển dữ liệu sang dạng nhị phân (ta gọi đây là plaintext).
1. Sinh ngẫu nhiên một mảng dữ liệu nhị phân với chiều dài bằng chiều dài của plaintext (ta gọi đây là pad). Chú ý pad ở đây phải là truly random.
1. XOR từng bit trong plaintext với bit ở vị trí tương ứng trong pad để được dữ liệu mã hóa (ta gọi đây là cipher).
1. Để lấy plaintext từ cipher, ta chỉ cần thực hiện XOR cipher với pad.


***Mã hoá:***
```
(text T(19) + khoá X(23)) mod 26 = Q(16)
```

***Giải mã:***

```
(Q(16) – khoá X(23)) mod 26 = text T(19)
```

Với 26 là kích thước bản chữ cái. 

![](https://images.viblo.asia/1b930703-d7ea-4ce4-a724-be97bf9eea05.jpg)

Đĩa Vigenere là  một thiết bị để hỗ trợ quá trình tinh toán này

## Mã  hóa

![](https://images.viblo.asia/b34d5124-0b35-4574-bbbe-57d843d25ecf.png)

![](https://images.viblo.asia/01720cb6-70b6-4c44-ab80-23f666fedba9.png)

## Giải mã
![](https://images.viblo.asia/e64f5590-8657-440c-8ca3-3a7e62796cf9.png)


# Mô phỏng One-Time Pad bằng javascript
Ý tưởng thực hiện sẽ như thế này:
* Đầu tiên mình sẽ có 1 chuỗi charset là các chữ cái từ A-Z và 0-9.
* Tiếp theo mình viết hàm tạo key ngẫu nhiên OTP.
* Mình sẽ viết 1 hàm mã hóa(encrypt) nhận vào bản rõ cần mã hóa.
* Và cuối cùng mình sẽ viết một hàm giải mã(decrypt) nhận vào Key (OTP) và kết quả của hàm mã hóa(bản mã). Mình dùng for để XOR bản mã với charset. Cụ thể là vị trí của từng kí tự trong bản mã ứng với kí tự nào trong chuỗi  charset ban đầu thông qua OTP

Chi tiết sẽ mình code như dưới đây.

```
charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toUpperCase();
OTP: function () {
    return this.charset.split('').sort(function () {
        return 0.5 - Math.random()
    }).join('');
},
encrypt: function (plaintext) {
    let otp = this.OTP();
    let result = '';
    for (let a of plaintext.toUpperCase()) {
        if (otp.includes(a)) {
            result += otp[this.charset.indexOf(a)];
        }
    }
    return {'result': result, 'otp': otp};
},
decrypt: function (otp, secret) {
    let result = '';
    for (let a of secret.toUpperCase()) {
        if (otp.includes(a)) {
            result += this.charset[otp.indexOf(a)];
        }
    }
    return result;
},
```
[Kết quả sẽ như sau](https://smpasw.web.app/attt/)
# Kết luận và ứng dụng thực tiễn
*Một điều đáng buồn là phương pháp One-Time Pad không có ý nghĩa sử dụng thực tế. Vì chiều dài khóa bằng chiều dài bản tin, mỗi khóa chỉ sử dụng một lần, nên thay vì truyền khóa trên kênh an toàn thì có thể truyền trực tiếp bản rõ mà không cần quan tâm đến vấn đề mã hóa*

**Lưu ý: One-Time Pad khác với One Time Password.**

*One Time Password là mật khẩu sử dụng một lần, nó thường xuất hiện trong giao dịch thanh toán như chuyển khoản, mua hàng online…*