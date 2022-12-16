![image.png](https://images.viblo.asia/667f4658-9ada-443a-87c4-5dd3c0c3d32c.png)


Nguồn gốc của bài viết này là mình nhận được yêu cầu sử dụng `SHA3-256` để match password khi thực hiện chức năng login, và DB lưu user cùng với password là của một bên thứ 3 nên đương nhiên là `họ nói gì ta làm đó rồi!` :v Nhưng bạn vẫn nên hiểu nó là gì đúng không? :D Nếu cùng suy nghĩ thì chúng ta băt đầu thôi =))

Nếu bạn chưa biết cái mã hóa này áp dụng thực tế làm gì thì có thể đọc qua một bài viết nhỏ này [here](https://viblo.asia/p/devise-luu-tru-password-cua-ban-nhu-the-nao-jvElao2mKkw)

Việc encrypt password theo 1 chuẩn bất kì trước khi lưu vào DB là một bước để đảm bảo security. Có rất nhiều chuẩn mã hóa khác nhau như MD5, SHA-1 hay SHA-2, ... Tiêu chuẩn ở đây là chỉ mã hóa 1 chiều, nghĩa là việc giải mã lại password sau khi đã mã hóa với các thuật toán trên là rất khó khăn như vậy mới được coi là bảo mật đúng không? Nhưng khó khăn chứ không phải không thể nên hiện tại các thuật toán mã hóa vẫn đang ngày càng được phát triển, cải tiến để bảo mật hơn, khó giải mã hơn

Trong bài viết này cùng mình tìm hiểu SHA3-256 đã có những cái gì mới so với phiên bản cũ nha

## SHA (Security Hash Algorithms)
https://en.wikipedia.org/wiki/Secure_Hash_Algorithms

- SHA có khá nhiều phiên bản đã được ra đời từ rất lâu trước đây, trước so với [MD5](https://en.wikipedia.org/wiki/MD5) nữa, lần đầu được ra mắt là vào năm 1993
- Được thiết kế bởi [National Security Agency (NSA)](https://en.wikipedia.org/wiki/National_Security_Agency) - nghe ngầu vãi đúng không :D - nó cũng là cái ảnh cho phần mở đầu đó :#
- [SHA2](https://en.wikipedia.org/wiki/SHA-2)  hiên được sử dụng rộng rãi nhất trên thế giới về độ bảo mật và SH3 là version mới nhất
- Với `SHA-256` output của nó sẽ là một chuỗi 256 bit, 32 bytes, `SHA-512` output sẽ là 512-bit, 64 bytes.
- ...


## SHA-2 and SHA-3
https://crypto.stackexchange.com/questions/68307/what-is-the-difference-between-sha-3-and-sha-256
#### 1. Designed by
- `SHA-2` được xây dựng bởi [National Security Agency (NSA)](https://en.wikipedia.org/wiki/National_Security_Agency)
- `SHA-3` được xâu dựng bởi [National Institute of Standards and Technology (NIST)](https://en.wikipedia.org/wiki/National_Institute_of_Standards_and_Technology)

#### 2. Performance
- `SHA-2` như `SHA-512`, `SHA-512/224`, and `SHA-512/256`  có hiệu suất nhanh hơn `SHA-3` đương nhiên là có bao gồm `SHA3-256` :v. Thật khó hiểu khi phiên bản sau lại có hiệu suất kém hơn nhỉ? thậm chí là còn có kết quả so sánh cụ thể trên trang https://www.blake2.net/
như sau:
 ![image.png](https://images.viblo.asia/d8551a74-e3b8-4020-954b-cba331d00b0d.png)

- Lí do? `Partly this was out of paranoia and political reasons in the SHA-3 design process.`
=> Hoang tưởng và vấn đề chính trị khi thiết kế? oh thật là khó hiểu mấy ổng :v
 

#### 3. Internal design
- `SHA-2` sử dụng cấu trúc [Davies–Meyer](https://www.google.com/search?q=Davies%E2%80%93Meyer+structure&oq=Davies%E2%80%93Meyer+structure&aqs=chrome..69i57&sourceid=chrome&ie=UTF-8)

- `SHA-3` sử dụng phép hoán vị [Keccak](https://crypto.stackexchange.com/questions/62675/what-is-a-permutation-in-keccak)


#### 4. Other

- Có một điểm nữa là `SHA-2` thiết kế dựa trên nguyên tắc của `MD4, MD5, SHA-0, và SHA-1`. Còn `SHA-3` lại có cách tiếp cận khác hoàn toàn nên những phát triển sau này sẽ không bị phụ thuộc vào `MD4`, ...

- Và cũng có những bài viết nói việc `SHA-3` chậm hơn so với phiên bản cũ là do các parameters đầu vào được thiết kế cố định và `VÔ Ý` viết thừa vì lý do `CHÍNH TRỊ` - ôi cuộc đời


#### 5. Summary image


![image.png](https://images.viblo.asia/5569638c-2ad1-4d96-8f34-ab88b520b591.png) 

Tìm hiểu một hồi mệt quá, thôi hỏi khách hàng cho nhanh vậy :D! Cám ơn các bạn đã đọc

Bài viết được `tham khảo` ở rất nhiều nguồn nên không nhớ :v