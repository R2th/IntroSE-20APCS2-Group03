![](https://images.viblo.asia/627cbe8c-c1fa-4a24-9bb5-640f6063587a.jpg)

Xin chào mọi người, trong bài viết lần này tôi sẽ tập trung vào 「Bảo mật mật khẩu người dùng」trong phát triển ứng dụng và suy nghĩ về cách lưu trữ an toàn mật khẩu của người dùng. 
# Mục lục
### 1. Tính an toàn trong lưu trữ mật khẩu người dùng
 a. Thực trạng của mật khẩu người dùng
 
 b.  Mã hóa mật khẩu
 
 c. Tăng cường tính bảo mật dựa trên salt
 
 d. Tăng tải tính dựa trên stretching
### 2. bcrypt 
 a. Ví dụ thực hiện trên PHP
 
 b. Điểm chú ý

### 3. Sử dụng bcrypt để lưu an toàn mật khẩu người dùng  

### 1. Tính an toàn trong lưu trữ mật khẩu người dùng
 a. Thực trạng của mật khẩu người dùng
 
Trước tiên, tại sao chúng ta cần phải lưu trữ mật khẩu an toàn ngay từ ban đầu? 
Nếu mật khẩu người dùng bị rò rỉ, Những kẻ tấn công có thể sử dụng tài khoản đăng nhập để giả mạo người dùng thực hiện nhiều dịch vụ khác nhau mà người dùng đang sử dụng từ ngân hàng cho đến các trang web mua sắm. 
Ví dụ, trong cuộc điều tra do Keeper thực hiện, đã có 87% người từ 18 đến 30 tuổi đã phải tái sử dụng lại mật khẩu.
Điều này có nghĩa là, Nễu lỡ mật khẩu từ dịch vụ bạn đang sử dụng bị rò rỉ ra ngoài, sự ảnh hưởng không chỉ giới hạn đối với dịch vụ của bạn, mà những kẻ tấn công còn có thể truy cập trái phép vào bất kỳ dich vụ nào được sử dụng bởi người dùng đó. Vì vậy, phải thật sự cẩn thận đến việc lưu trữ mật khẩu trong phát triển dịch vụ.

b.  Mã hóa mật khẩu

Để mật khẩu được an toàn ngay cả khi nó bị xâm chiếm và bị rò rỉ ra bên ngoài do những kẻ tấn công, Khi lưu trữ mật khẩu trong cơ sở dữ liệu hoặc tương tự, chúng ta thường sẽ sử dụng một hàm băm và thực hiện nó giống như kiểu 「mã hóa một chiều」, Kiểu mã hóa  có những tính chất như sau : 
- Qúa trình chuyển đổi có thể mã hóa được nhưng không thể khôi phục lại được ban đầu.
- Tuy không thể khôi phục lại được ban đầu nhưng nếu thông qua hàm này với cùng một giá trị thì có thể nhận được kết quả mã hóa (giá trị băm) tương tự.
- Khi mà đối chiếu thì sẽ so sánh giá trị của kết quả này
Bằng cách sử dụng hàm băm này, có thể lưu trữ được giá trị băm mà không thể khôi phục lại mật khẩu ban đầu vào trong cơ sở dữ liệu, vì thế những kẻ tấn công khó có thể đoán được mật khẩu ban đầu ngay cả khi kẻ tấn công đã ăn cắp được giá trị băm.

c. Tăng cường tính bảo mật dựa trên salt

Như đã nói ở trên, những kẻ tấn công khó có thể đoán được mật khẩu cả khi có được giá trị băm. Tuy nhiên vẫn có phương pháp để giả mã nó. Đó là sẽ dự trên tính chất của hàm băm, đấy là 「Có thể nhận về cùng một giá trị băm nếu truyên vào hàm băm cùng một giá trị」. 
Nói cách khác, nếu  tấn công liên tục mật khẩu để có thể nhận được một giá trị băm như giá trị những kẻ tấn công đã đánh cắp thì việc lấy lại được mật khẩu ban đầu là điều có thể thực hiện được. Ngược lại, vì giá trị được tính trước cho mật khẩu với một số chữ số nhất định đã được công khai  trên mạng trước đó, chỉ cần một chút nỗ lực những kẻ tấn công có thể khôi phục lại được mật khẩu ban đầu một cách dễ dàng. 
Tất nhiên việc tấn công brute force và  tính toán như trên cần phải có sự nhẫn nại bởi vì phải mất một khoảng thời gian rất lớn để tính toán nếu mật khẩu có đủ chiều dài.
Tuy nhiên, không bắt buộc phải yêu cầu mật khẩu 20 tới 30 ký tự cho tất cả người dùng. Ở đây, tôi sẽ cung cấp cho mỗi người dùng một chuỗi ký tự ngẫu nhiên gọi là salt. Bằng cách đính kèm cùng mật khẩu thì có thể kéo dài sức mạnh mật khẩu đáng kể và có thể chịu đựng được các tính toán trước được dài hơn. Chuỗi ký tự ngẫu nhiên này được sử dụng để đối phó với các tính toán trước nên bạn hoàn toàn có thể lưu nó vào trong cơ sở dữ liệu cùng với mật khẩu đã được băm. 

d. Tăng tải tính dựa trên stretching

Nếu bạn sử dụng salt, thì bạn có thể chịu đựng được các tính toán trước, nhưng nếu thực hiện cuộc tấn công dictionary hay tấn công brute force vào từng thông tin người dùng thì việc sử dụng salt sẽ không có hiệu quả. Do đó, như là một biện pháp tiếp theo để có thể làm khó chịu những kẻ tấn công cụ thể như sau :  Làm phức tạp tính toán giá trị băm và tăng thời gian tính toán ở tấn công brute force.
Phương pháp này được gọi là stretching, là một phương pháp hiệu quả để đối phó với kiểu tấn công dictionary và tấn công brute force.
Cụ thể của phương pháp này thực sự rất đơn giản, nó giống như kiểu "vượt qua hàm băm nghìn lần". Điều này có nghĩa là sẽ mất hàng nghìn lần thời gian xử lý cho mỗi mật khẩu. Vì vậy làm chậm thời gian cho đến lúc bị giải mã.

### 2. bcrypt 

Dựa vào những phương pháp trên, một biện pháp được đưa ra như là sự kết hợp của "băm", "salt", "streching". Đó chính là bcrypt.
bcrypt sử dụng một thuât toán mã hóa được gọi là "blowfish" . Kết quả  về từ hàm băm mật khẩu bao gồm giá trị băm, số lần salt và streching sẽ được set lại thành một giá trị gọi là Modular Crypt Format.
Sau đây là kết quả của việc băm một chuỗi ký tự "吾輩は猫である": 
```
$2a$10$4bZqo1S5J5yQk23.n/Vl4OATcXA/e7DnhRaTR7Ico4H5fXPKBcadm
 │  │  │                     │
 │  │  │                     └ ハッシュ値 (184bit; Radix-64 31桁)
 │  │  └ salt値 (128bit; Radix-64 22桁)
 │  └ コスト (ストレッチング回数 = 2^n; この場合2^10 = 1024回)
 └ ハッシュ関数のバージョン (2 = bcrypt; a = 改訂版)
```


bcrypt trả về một chuỗi duy nhất với tất cả các tham số cần thiết thiết lập cũng như sức mạnh của nó như một chức năng băm mật khẩu. Vì vậy trên phương diện database chỉ cần một cột kiểu chuỗi có thể lưu được giá trị băm này, đây là một điểm lợi rất lớn của bcryt.
Ngoài ra, bcrypt hỗ trợ đầu vào của mỗi ký tự ở định dạng UTF-8 như là giá trị băm của chuỗi ký tiếng nhật trong ví dụ trên. Vì vậy nó có thể băm mật khẩu mà không giới hạn ký tự cho các ký tự cả chữ và số... 

a. Ví dụ thực hiện trên PHP

Trên PHP kể từ version 5.5.0 trở về sau, chức ngoài chức năng password_hash có sẵn còn hỗ trợ thêm chức năng password_verify để hỗ trợ cho bcrypt. Việc sử dụng các chức năng này giúp cho việc dễ dàng băm và xác minh bằng bcrypt.

```
// パスワードのハッシュ化
$hashed = password_hash($password, PASSWORD_BCRYPT);

// パスワードの検証 (ハッシュ値との比較)
$isValid = password_verify($password, $hash);
```

b. Điểm chú ý

Việc thực thi bcrypt trên hầu hết các ngôn ngữ bao gồm cả PHP, thì do sự rằng buộc của thuật toán nên giá trị đầu vào(mật khẩu) được cắt nén thành 72 byte (Ký tự Multi byte cũng được xử lý như  là UTF-8).
Vì vậy, sức chứa tối đa của mật khẩu kiểu ký tự ASCII (ký tự, ký tự chứ số) lớn nhất là 72 ký tự.

### 3. Sử dụng bcrypt để lưu an toàn mật khẩu người dùng
Với những lý do trên, trong việc lưu trữ mật khẩu của người dùng, bạn hãy sử dụng bcrypt để lưu trữ mật khẩu một cách an toàn nhất nhé.

Tài liệu tham khảo : https://liginc.co.jp/377191