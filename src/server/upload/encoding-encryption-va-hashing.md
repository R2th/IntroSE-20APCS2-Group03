Bài viết này mình sẽ đưa ra một số khái niệm cũng như nhưng điểm lưu ý giúp chúng ta có thể phân biệt được Encode, Encryption hay Hash. Bởi trong thực tế mình biết khá nhiều bạn sẽ biết về các khái niệm này, tuy nhiên sẽ không phân biệt cụ thể được chúng mà chỉ ở mức **" Ừm, có lẽ chúng dùng để bảo mật :D"**.

Cũng không hoàn toàn sai, nhưng chúng ta sẽ tìm hiểu cụ thể xem chúng khác nhau như nào nhé. Let's go !

# Enconding 
Đây là một phương pháp được sử dụng khá nhiều trong các hệ thống ngày nay.

Bạn đang nghĩ đây là cách chúng ta dùng để bảo mật? Các thông tin nhạy cảm như tên tuổi, địa chỉ hay tài khoản khách hàng có thể lưu an toàn với encoding ? Không phải như vậy nhé !

![](https://images.viblo.asia/2046cc09-dd35-471c-a3d8-3b5f4d03833b.gif)

Khoan, hãy nhìn vào bảng trên. Các bạn có thấy quen thuộc không ? Đây chính là bảng mã ASCii mà chúng ta mài mông nghiên cứu trên ghế giảng đường :D 

Khoan hãy nói về encoding. Các bạn có nhơ chúng ta đã từng làm những bài tập vỡ lòng dạng chuyển đổi 1 đoạn text thành mã bit và ngược lại hay không.

```
Ví dụ:
A -> 01000001
hay B -> 01000010
```
Quá trình biến đổi từ A -> 01000001 có thể gọi là **Encoding** và ngược lại tất nhiên sẽ là **Decode**.

Từ 1 ví dụ đó chúng ta sẽ có nhận định sau về encode: Bản chất encode thực hiện việc biến đổi data thành 1 format khác dựa trên một quy chuẩn nào đó. Và quy chuẩn ở trên của chúng ta sẽ là ASCii.

Nhắc lại kiến thức một chút vậy thôi. Điều mình muốn nhấn mạnh chính là cái cơ chế của encode. Các bạn thấy mình có thể dễ dàng lên google tìm ra bảng mã ASCii và gắn vào bài viết này phải không.

Ứng dụng của các bạn đang encode dữ liệu rồi đưa cho mình và thách đố mình hiểu được. Vậy là xong. Mình ăn kèo. Bỏ ra mấy ngày ngồi so mã với bảng trên vậy :D

Đùa thôi ai làm thủ công như vậy. Tuy nhiên điều mình muốn nói là

- Encoding chỉ là cách thức chuyển hóa dữ liệu của các bạn thành 1 dạng khác mà có thể tiêu thụ được trên các hệ thống khác nhau.
- Encoding không hề bảo mật. Ta chỉ cần dùng đúng thuật toán encode là có thể giải mã ngược lại mà không cần một key nào

Ở phần encode này các bạn có thể tham khảo thêm về Unicode, Base64, Url Encoding,... mà được sử dụng rất nhiều cho việc encode này.

# Encryption

![](https://images.viblo.asia/e537fcea-45bb-46b5-b0d6-bcd0807e347b.png)

Ok, nhắc đến encryption thì chắc chắn chúng ta biết ngay nó để bảo mật dữ liệu. 

So sánh với encode thông thường ở trên, khi mà ta chỉ cần dùng đúng công cụ encode để decode ngược lại là xong. Nhưng với encryption, quá trình mã hóa sẽ kèm theo 1 secret-key hay là 1 mã bảo mật mà chỉ người tạo biết được. 

Do đó, để có thể giải mã, chúng ta cẩn có đủ 3 thông tin :

- Đầu tiên chắc chắn là đoạn dữ liệu đã bị mã hóa
- Thuật toán dùng để mã hóa
- Cuối cùng quan trọng nhất vẫn là key mật mà người tạo đã sử dụng cho thuật toán này.


Với encyption, chúng ta có thể làm 1 số task đặc biệt như gửi thông tin đến 1 người nhận cụ thể và chỉ họ mới có thể đọc được, hay truyền 1 số thông tin nhạy cảm trên internet,...

Một số thuật toán mã hóa các bạn có thể tham khảo tại link sau 

https://www.toptenreviews.com/encryption-algorithms
Chắc chắn các bạn đã dùng qua 1 vài trong số đó rồi đấy, tin mình đi :))

# Hashing
![](https://images.viblo.asia/fe484dd5-56f7-47b2-adea-324035639951.png)

Hashing chỉ quy trình biến đổi một chuỗi data đầu vào (input), xử lý bằng một thuật toán đặc biệt (hash function) và cho ra kết quả là  dạng data khác.

Đặc điểm của hashing:

- Với 1 đầu vào thì luôn chỉ cho ra 1 đầu ra duy nhất (Tất nhiên đấy là với 1 thuật toán tốt, trong thực tế vẫn có hash funtion cho ra cùng 1 output với 2 input khác nhau, gọi là đụng độ giá trị băm (collision))
- Là quá trình 1 chiều, biến đổi từ input -> output chứ không làm ngược lại được.

Ý nghĩa:

 - Với tính nhất quán của input với output, nên hashing được đại diện cho sự toàn vẹn dữ liệu. Bởi với bất kì 1 thay đổi nhỏ nào của input là bạn đã có 1 output hoàn toàn khác.
 - Vì tính chất 1 chiều như vậy, hashing được dùng trong các tính năng của hệ thống mà không cần phải tương tác với dữ liệu dạng sơ khai để nhằm bảo mật . 

Hơi trừu tượng phải không, mình sẽ lấy 1 ví dụ thường gặp nhất nhé. Hashing password
Khi user tạo tài khoản, thay vì lưu trữ pass trong db dạng plaintext, thì chúng ta sẽ hash chúng và lưu vào db.
Và khi hash như vậy, thì ngay cả hệ thống của chúng ta sau này cũng chẳng biết đoạn hash lưu trong db kia ứng với plaintext gì. Tuy nhiên chúng ta vẫn có thể thực hiện cơ chế xác thực user như sau:

1. User login với username và pass
2. Hệ thống tìm row tương ứng trong db với username và lấy ra **hashed-pass**
3. Sau đó, ta dùng thuật toán tương tự, hash pass mà user vừa nhập vào rồi so sánh với hased-pass trong db. Nếu khớp thì đó chính là pass hợp lệ.


Đến đây chúng ta chắc sẽ thấy rõ điểm khác biệt giữa **encryption** và **hashing** phải không ?

- Encryption là 1 quy trình mã hóa **2 chiều**. Sau khi mã hóa, ta hoàn toàn có thể **dùng secret-key** để giải mã và lấy ra plain-text ban đầu.
- Hashing không có key như vậy. Và tất nhiên nó là quy trình  chỉ có **1 chiều** mã hóa chứ không giải mã được.

Trước khi kết thúc, mình xin phép chém gió nhanh một chút về bảo mật với hashing ( Không phải dân bảo mật nên có gì chém sai ae thông cảm :D).

Hiện nay hashing được dùng rất nhiều. Tuy nhiên như thế nào sẽ là một thuật toán hash **xịn**.

![](https://images.viblo.asia/c2b4f60d-7e63-4cbe-937a-61c7717df449.png)

Có thể thấy hash (hay bảng băm) là khái niệm chúng ta đã tiếp cận từ hội đại học. Tuy nhiên những hash-function đó chỉ phục vụ ở mức độ hình thành data struture. Bởi lẽ funtion biến đổi của nó khá đơn giản khiến cho việc bẻ khóa là hoàn toàn khả thi. Tuy nhiên hash-function cho việc hash-pass lại khác. Nó cần độ phức tạp cao hơn để tránh bị giải mã ngược. Hay nói cách khác trong case này, **Hash chạy càng chậm càng tốt** và **Không phải cái gì nhanh ra cũng là có lợi :D**

Mọi người có thể tham khảo một số thuật toán hash rất ngon hiện tại như PBKDF2, BCrypt, và SCrypt. HIện tại với java thì thì mình thấy cả 3 thuật toán này đều được support (jdk và với Spring)

Ngoài ra có 1 số khái niệm về hash như hash-salt, Dictionary, Brute Force Attacks hay Rainbow-Table,.... nói về các cách hash tối ưu cũng như các cách thức crack-hash. Mình sẽ để link tham khảo ở dưới cho mọi người nhé.

Lan man dài dòng thì đến đây cũng xong. Hy vọng bài viết hữu ích. Do không phải dân chuyên nên chém sai chỗ nào ae vào góp ý giúp mình nhé :) 

Link tham khảo: 
https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/
https://crackstation.net/hashing-security.htm
https://www.thesslstore.com/blog/difference-encryption-hashing-salting/
https://searchsecurity.techtarget.com/definition/encryption