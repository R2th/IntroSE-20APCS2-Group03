Trong bài này mình sẽ giải thích cách hoạt động của hệ mật mã ElGamal. Bài có sử dụng một số tính toán được giải thích trong bài trước về RSA. Bạn có thể đọc lại tại đây [https://viblo.asia/p/ma-hoa-rsa-hoat-dong-the-nao-3Q75w119ZWb](https://viblo.asia/p/ma-hoa-rsa-hoat-dong-the-nao-3Q75w119ZWb)
# Ý tưởng ban đầu
Như bạn đã biết, các hệ mã hóa bất đối xứng sử dụng tính chất của các bài toán mà việc tính xuôi rất dễ dàng nhưng việc tính ngược lại lại tốn nhiều thời gian, có thể đến hàng triệu năm. RSA sử dụng bài toán phân tích ra thừa số nguyên tố, bạn có thể dễ dàng tính `N = p * q` nhưng nếu chỉ cho N thì bạn không thể tìm đc cặp p và q 1 cách nhanh chóng. Và bài toán của ElGamal là bài toán logarit rời rạc.
## Bài toán logarit rời rạc
Trong bài viết về RSA mình đã trình bày cách nhanh chóng tính được `a^b mod m` dù b có hàng trăm chữ số. Nhưng nếu có `l = a^b mod m`, a và m, thì có thể tính được b hay không? Đáp án tất nhiên là "rất khó". Cách duy nhất là phải thử từng số mũ của a. Dĩ nhiên là vì kết quả của tất cả các phép toán trong modulo m đều giới hạn nên việc thử này không phải là vô hạn nhưng nếu phải thử cho những số có hàng trăm chữ số thì điều đó vẫn là không thể (với sức mạnh tính toán hiện tại).
# Cách thực hiện
## Sinh khóa
Việc sinh hệ mã hóa của ElGamal không khó như RSA. Chỉ đơn giản là chọn một số nguyên tố p, một hệ số alpha và một khóa bí mật a. Sau đó tính hệ số `beta = alpha^a mod p`. Đến đây bạn sẽ hỏi sao dễ thế, phần loằng ngoằng sẽ nói đến ở đoạn sau. Vậy ta có private key là a và p, public key là p, alpha, beta.

Ví dụ chọn luôn p = 11, alpha = 2, a = 3. Ta dễ dàng tính được beta = 2^3 = 8. Vậy ta có public key là p = 11, alpha = 2, beta = 8. Việc tính 8 là 2 mũ mấy (`log2(8) = ?`) thì dễ nhưng nếu 2 số này rất lớn và số p rất lớn thì việc thử toàn bộ các số mũ không ăn thua đâu.
## Mã hóa
Giả sử với public key ở trên ta muốn mã hóa số x = 10, ta chọn một số k = 6 chẳng hạn.
Ta tính 2 số:
```ruby
y1 = alpha^k % p = 2^6 % 11 = 9
y2 = x*beta^k % p = 10 * 8^6 % 11 = 8
```
Ok giờ ta có bản mã cần gửi đi là e(y1, y2) = (9, 8). Số k thì bị bỏ đi, vụ này bàn sau.
## Giải mã
Việc giải mã cũng dễ thôi, chỉ cần tính:
```ruby
d(y1, y2) = y2 * (y1^-a) % p
          = 8 * (9^3)^-1 % 11
          = 8 * 4 % 11
          = 32 % 11
          = 10 = x
```
## Giải thích
Xem nào, ta sẽ thấy đc
```ruby
x = y2 * (y1^-a)
  = x * beta^k * alpha^(-a*k)
  = x * alpha^(a*k) * alpha^(-a*k)
  = x
```
Dễ mà, đơn giản chỉ thế thôi.
## Vấn đề
Nào quay lại vấn đề. Thế vấn đề ở đâu nhỉ. Như đã nói các phép toán trong modulo có số lượng kết quả giới hạn. Điều đơn giản nhất có thể nhìn ra là nếu cứ tính:

```ruby
a^1 mod m
a^2 mod m
a^3 mod m
a^4 mod m
a^5 mod m
...
```

Thì rồi sớm hay muộn kết quả cũng lặp lại thành vòng. Ví dụ với p = 11 như trên nhưng chọn alpha = 4
thì ta có:
```ruby
4^1 % 11 = 4
4^2 % 11 = 4^1 * 4 % 11 = 4 * 4 % 11 = 5
4^3 % 11 = 4^2 * 4 % 11 = 5 * 4 % 11 = 9
4^4 % 11 = 4^3 * 4 % 11 = 9 * 4 % 11 = 3
4^5 % 11 = 4^4 * 4 % 11 = 3 * 4 % 11 = 1
4^6 % 11 = 4^5 * 4 % 11 = 1 * 4 % 11 = 4
4^7 % 11 = 4^6 * 4 % 11 = 4 * 4 % 11 = 5
...
```
Đó giờ cứ tính tăng mũ lên thì kết quả cũng chỉ xoay quanh 4->5->9->3->1->4.
Vậy thì việc duyệt các số kết quả của bài toán logarit rời rạc trở lên dễ hơn rất nhiều. Nên việc chọn alpha phải tìm cách để vòng kết quả này càng lớn càng tốt, lý tưởng nhất là bằng chính số p.