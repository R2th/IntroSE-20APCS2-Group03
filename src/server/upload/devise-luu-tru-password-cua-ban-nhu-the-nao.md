Là một Web developer hẳn là chức năng đăng ký, đăng nhập không còn gì xa lạ với các bạn. Tuy nói là quen thuộc, dễ làm, nhưng triển khai thế nào cho đúng thì chưa chắc là dễ. Đăng ký, đăng nhập, mã hóa password, reset password, confirm tài khoản, ... và lung tung thứ liên quan đến chức năng này.

Trong Ruby on Rails, [Devise](https://github.com/plataformatec/devise) giúp bạn triển khai mọi thứ liên quan đến cái chức năng đăng ký, đăng nhập "đơn giản" này. Bài viết hôm nay, mình xin được chia sẽ về một chức năng cơ bản trong gem Devise đó là mã hóa và lưu trữ password người dùng.

### Nguyên tắc cơ bản khi lưu trữ password của người dùng vào database:

* Không lưu dưới dạng plain text, vì lỡ DB có bị tấn công password của người dùng sẽ lộ ra theo 1 cách không thể nào dễ dàng hơn.
* Không nên mã hóa 2 chiều, vì kiểu gì mã hóa 2 chiều cũng sẽ có cách giải mã bằng private key.

Mặc định, Devise sẽ lưu trữ password của người dùng vào trường `encrypted_password`. Đây là một chuỗi mã hóa có dạng như sau:

`$2a$11$O39WZct.pMrCFmQGFk8Ng.tARLioWhBw/4EzeJcSB44/K0TfX7EV.`

Devise có thể dùng nó để xác thực người dùng, cũng như hạn chế việc "mò" ra được password thực sự. Vậy thì ẩn đằng sau cái chuỗi vô nghĩa này là gì?

### Devise sử dụng Bcrypt để lưu trữ thông tin một cách an toàn

Thuật toán hashing OpenBSD bcrypt() cho phép bạn dễ dàng lưu trữ một hash của mật khẩu một cách an toàn. Đây chính là thuật toán mã hóa một chiều, tức là từ hash value bạn không thể suy ngược trực tiếp ra password ban đầu. Vậy thì hash value nó hoạt động như thế nào mà có thể giữ password của bạn được an toàn?

Hãy trở lại với cái chuỗi `encrypted_password` lưu trữ trong database mình đã nêu ra ở trên

`$2a$11$O39WZct.pMrCFmQGFk8Ng.tARLioWhBw/4EzeJcSB44/K0TfX7EV.`

Đây chính là một hash value được sinh ra từ bcrypt với đầu vào là password của user. Nó bao gồm những thành phần như sau:

* **Bcrypt version** (`2a`): Được lưu trữ sau dấu `$` đầu tiên, đây là version của thuật toán bcrypt được sử dụng để tạo ra hash value.
* **Cost** (`11`): Được lưu sau dấu `$` thứ 2, đây là chi phí để tạo ra hash. Con số này định nghĩa số lần password được hash. Khi dùng Devise, giá trị `Cost` này được set bằng biến class là [stretches](https://github.com/plataformatec/devise/blob/715192a7709a4c02127afb067e66230061b82cf2/lib/devise.rb#L74), bạn có thể config con số này trong file `config/initializers/devise.rb` ở dòng `config.stretches = Rails.env.test? ? 1 : 11`.
* **Salt** (`$2a$11$O39WZct.pMrCFmQGFk8Ng.`): 29 ký tự đầu tiên, đây là một chuỗi string ngẫu nhiên để kết hợp với password user input vào. Giá trị này sẽ đảm bảo những password user dù giống nhau nhưng hash value sinh ra sẽ khác nhau, như vậy dù DB bị tấn công và lộ encrypted_password thì kẻ tấn công cũng sẽ tốn chi phí rất lớn trong việc mò ra password của tất cả users.
* **Checksum** (`tARLioWhBw/4EzeJcSB44/K0TfX7EV.`): Những ký tự còn lại, đây chính là hash value thực tế được sinh ra. Nói một cách dễ hiểu, đây là output của hàm `hash(salt + password)`

### Devise lưu trữ và compare password như thế nào?

Khi user thiết lập password, một chuỗi salt ngẫu nhiên sẽ được sinh ra bởi hàm `BCrypt::Engine.generate_salt(cost)`. Sau khi có được salt (`$2a$11$O39WZct.pMrCFmQGFk8Ng.`), Devise tiếp tục gọi tới hàm `BCrypt::Engine.hash_secret(password, salt)` để có giá trị hash value cuối cùng (`$2a$11$O39WZct.pMrCFmQGFk8Ng.tARLioWhBw/4EzeJcSB44/K0TfX7EV.`) và lưu xuống database ở trường `encrypted_password`.

![](https://images.viblo.asia/da7f417e-992d-44a2-853d-66f0ce3de1b6.png)

Giá trị hash này không thể dịch ngược, và salt thì lại random theo từng user. Vậy thì khi login, Devise xử lý như thế nào?

Trở lại với các thành phần của hash value mình đã nêu ở trên, hẳn các bạn cũng đã hiểu được cách xử lý.

Rất đơn giản, sau khi user submit thông tin đăng nhập (giả sử gồm email và password), hệ thống sẽ tìm kiếm record tương ứng với email đã gửi lên, lấy được `encrypted_password`, sau đó việc xác thực sẽ diễn ra như sau:

1. Lấy password mà user submit lên (ví dụ `12345678`)
2. Lấy ra được giá trị salt của user tìm kiếm được, chính là 29 ký tự đầu tiên trong `encrypted_password` (ví dụ: `$2a$11$O39WZct.pMrCFmQGFk8Ng.`)
3. Sử dụng hàm `BCrypt::Engine.hash_secret(password, salt)` để generate ra hash value tương ứng với salt và password ở trên
4. So sánh hash value vừa generate với `encrypted_password` nếu đúng thì xác thực thành công

![](https://images.viblo.asia/40e2337a-667a-4f4c-94a7-7dc0575aea88.png)

Đó chính là cách Devise đã lưu trữ và bảo vệ mật khẩu của bạn, hạn chế việc bị lộ nếu có tấn công từ kẻ xấu. Thank for your reading!