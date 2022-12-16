Chủ đề hôm nay khá thú vị nhé. Đây là câu hỏi mà tớ luôn thắc mắc từ khi biết dùng internet:

> Liệu Facebook có biết được mật khẩu khi mình tạo tài khoản ở đó không?

Mình chắc hẳn nhiều bạn cũng có câu hỏi tương tự thế. Và trong bài viết này, hãy cùng nhau tìm hiểu cách password được lưu như thế nào, từ đó tìm ra được đáp án cho câu hỏi trên.

![](https://images.viblo.asia/4214828e-d35a-4e8c-b42d-9c94049e5867.jpg)

## 1. Plain text hay encrypted?

Okay phần đầu tiên hãy bắt đầu với hai cách lưu password thông thường nhất trong database. Mình sẽ đi từ mức không an toàn lên dần các mức độ bảo mật cao hơn.

### 1.1. Plain text

Đầu tiên là cách lưu password vào DB dưới dạng văn bản thuần - plain text. Cơ bản thì chúng ta chẳng làm gì với password cả, cứ thế lưu thẳng vào DB.

Đây là phương pháp rất rất không an toàn, nếu hacker tấn công hệ thống và chiếm được DB, thì có thể dễ dàng xem được mọi password của user.

Người dùng thường có thói quen dùng chung password cho nhiều nơi. Pass Facebook, Google, banking,... thường là một vì ngại nhớ nhiều mật khẩu. Do đó, nếu biết được một password thì có thể chiếm được nhiều loại tài khoản khác. Nguy hiểm chưa.

### 1.2. Encrypted

Đây là phương pháp tốt hơn một tí so với plain text. Cụ thể mật khẩu sẽ được encrypt (mã hóa) lại trước khi đưa vào DB. Khi user đăng nhập, có hai cách để check:

* Encrypt mật khẩu user gửi lên, so sánh với encrypt trong DB có giống nhau hay không
* Decrypt (giải mã) mật khẩu trong DB, so sánh với mật khẩu user gửi lên

Dù cách nào đi nữa, thì chỉ mã hóa thôi vẫn không đủ an toàn. Chỉ cần biết được thuật toán encrypt, hacker có thể viết script để decrypt hàng loạt. Kết quả vẫn bị lộ như thường :(

## 2. Hashing, hãy nghĩ theo cách ngược lại

### 2.1. Hash mật khẩu

Hash là dạng đặc biệt của encrypt. Encrypt một chuỗi A thành chuỗi B, thì luôn có thể giải mã ngược lại từ B thành A. Do đó, giải thuật mã hóa gọi là reversible algorithm.

Tuy nhiên, hash là dạng mã hóa một chiều, nên khi hash chuỗi A thành B thì không thể nào từ B tìm ra A được.

Do đó, level tiếp theo của bảo mật password là chỉ lưu hash vào trong DB. Cách hoạt động như sau:

* Khi user đăng kí, hệ thống nhận được password
* Hash password đó và lưu mã hash vào trong DB
* Khi user đăng nhập, lấy pass user gửi lên, hash và so sánh với hash trong DB
* Nếu hai hash giống nhau thì password giống nhau

![](https://images.viblo.asia/7c6baa7a-8f3c-463b-98d2-79a1327909be.png)

Hash sẽ có trường hợp đụng độ (collision), ví dụ hai chuỗi A, B khác nhau nhưng lại cho cùng mã hash. Do đó, người ta chọn các giải thuật hash sao cho ít đụng độ nhất có thể.

Đến đây, bạn có thể tưởng rằng hashing đã đủ an toàn. Nhưng không, trước đây mình cũng nghĩ thế, nhưng rồi mình sớm nhận ra điều đó không đúng.

> **John:** Password của tôi đã được hash, anh không thể nào biết được pass của tôi là gì :)
> 
> **Hacker:** À thế à :D
> 
> **Hacker:** Password của anh là 12345 đúng chứ?
> 
> **John:** Sao anh biết? Nó đã được hash rồi.
> 
> **Hacker:** Đúng, chúng đã được hash, nhưng mã hash của chúng ta giống nhau, và pass của tôi là 12345
> 
> **John:** ...
> 
> **Hacker:** Không chỉ hai chúng ta, còn 12345 user khác cũng có cùng mã hash như vậy

Đấy, qua mẩu chuyện ví dụ trên các bạn cũng hiểu được vì sao hash rồi vẫn chưa đủ an toàn. Có thể nếu password của chúng ta đặt khó hơn thì sẽ không dễ bị trùng, nhưng tại sao hacker lại thích lấy mật khẩu của bạn?

### 2.2. Tại sao hacker lại muốn password của bạn?

> **Hacker:** Tại sao tôi phải lấy account của bạn nhỉ, trong khi tôi có thể lấy được 10000 account khác dễ hơn nhiều.

Đó là cách suy nghĩ theo chiều ngược lại. Bạn nghĩ password riêng bạn không thể bị dò ra, account của bạn an toàn. Nhưng xét trên tổng thể, hacker không rảnh để hack account của bạn, mà là phần lớn user khác. Bạn chỉ vô tình lọt vào số đó thôi.

Một hệ thống được đánh giá an toàn hay không, không phụ thuộc vào việc account của bạn có dễ bị hack hay không, mà là xét trên tổng thể. Do đó:

* Bạn đặt mật khẩu mạnh, tài khoản của bạn an toàn
* Hệ thống phải đủ mạnh để bảo vệ, không chỉ bạn mà còn rất nhiều user khác

Bài viết này chủ yếu trình bày về ý thứ 2, tức là xét trên tổng thể.

### 2.3. Brute force và dictionary attack

Đây là hai kĩ thuật dùng để tấn công vào hệ thống dùng hashing để lưu password:

* Brute force là sinh ra 1 đống mật khẩu có khả năng và thử từng cái một. Cách này chậm và chỉ dò ra được những password đơn giản. Tuy nhiên, nếu có máy tính mạnh và giải thuật hash nhanh thì có thể dò được rất nhiều mật khẩu.
* Dictionary attack là dùng 1 list mật khẩu thường gặp, như 12345, anhyeuem ([password này đã được lên top thế giới rồi nhé](https://kenh14.vn/anhyeuem-lot-top-mat-khau-pho-bien-nhat-nam-2020-20201121173358685.chn) 😀), qwerty,… Ưu điểm của cách này là có thể dò được kha khá account phổ biến.

Tuy nhiên, cách phòng tránh cũng khá dễ. Chúng ta chỉ cần thêm tính năng chờ đợi 10 giây, 30 giây, 5 phút,… sau khi nhập sai pass quá N lần là tạm ổn. Hoặc dùng reCaptcha. Tuy nhiên, trong trường hợp hacker tấn công database, có được hết dữ liệu thì cách trên cũng vô dụng.

## 3. Vậy nên làm thế nào?

Để an toàn hơn, thì người ta đưa ra 4 cách tiếp theo để tăng cường độ bảo mật cho hash.

### 3.1. Dùng giải thuật hash chậm hơn

Tuy hash password ở trên chưa đủ an toàn, nhưng chúng ta không bỏ hẳn nó đi mà dùng chung hash với các kĩ thuật khác để bảo mật hơn.

Hash thì có nhiều thuật toán hash, cũng cần lựa chọn cho phù hợp. Ví dụ cả SHA-512 và bcrypt cũng đều là hash, nhưng bcrypt chậm hơn nhiều lần (10000 lần) nên được chọn (để hacker khó hash hơn vì chậm). Ngoài bcrypt ra còn có scrypt, PBKDF2 đều là những thuật toán hash chậm thường dùng trong bảo mật password.

Ngoài chậm hơn, thì người ta còn tính đến cả những thuật toán tốn bộ nhớ hơn, rẽ nhánh, lặp nhiều hơn. Điều này dễ hiểu vì hacker sẽ dùng GPU để tính (nhanh hơn), khi gặp các thuật toán thiên về CPU (lặp, rẽ nhánh,…) thì GPU sẽ trở nên kém hiệu quả hơn.

### 3.2. Thêm muối (salt)

Đúng đấy, bạn không nhìn nhầm đâu. Cần thêm muối (**salt**) vào password trước khi hash để an toàn hơn. Về cơ bản, salt là một chuỗi random, gắn thêm vào chuỗi password và hash cả hai luôn. Do đó sẽ tránh được việc bị trùng mã hash (như câu chuyện ở trên).

```java
password = hash(salt + password)
```

Trước đây thì người ta lưu hash và salt riêng biệt, nhưng rồi như thế cũng dễ cho hacker quá nên người ta bỏ chung salt vào với hash trong DB luôn. Như vậy, mỗi user sẽ gồm 2 trường là hash password và salt.

### 3.3. Thêm tiêu (pepper)

Lại một tí gia vị nữa cho password trước khi hash. **Pepper** (tiêu) cũng là một chuỗi giống như salt, nhưng là bí mật và dùng chung cho mọi user (salt thì mỗi user mỗi khác). Thêm nữa salt thì lưu cùng password, còn pepper thì thường lưu trong source code (được giữ bí mật khỏi database).

```java
password = hash(pepper + salt + password)
```

### 3.4. Tăng số lần hash

Công thức hash ngay bên trên không chỉ thực hiện một lần, vậy thì quá đơn giản. Người ta sẽ hash như vậy tầm 10 lần liên tiếp, số 10 gọi là **salt rounds**, hoặc number of iterations. Và lượng thời gian cần để giải mã tăng theo mũ hai, ví dụ salt rounds là 10 thì sẽ tốn thời gian gấp 2^10 lần.

![](https://images.viblo.asia/916a101a-0bcb-4d09-9e41-7fcd9508f3f3.png)

Do đó, cách lưu password an toàn nhất là kết hợp cả 4 phương pháp trên. Và do tính chất phức tạp của thuật toán, hầu hết các security framework đều hỗ trợ các hàm generate hash cả nên dễ dàng implement hơn.

---

Và cuối cùng, trở lại câu hỏi ban đầu, chúng ta chắc hẳn ai cũng có câu trả lời rồi.

> Nếu một hệ thống bảo mật, an toàn như Facebook, thì ngay cả Mark Zuckerberg cũng không thể nào xem được mật khẩu của user

Lưu mật khẩu an toàn trong DB chỉ là một phần rất nhỏ của bảo mật. Hacker có vô vàn cách thức khác nhau để tấn công, tuy nhiên nếu password được lưu đúng cách thì hacker cũng không thể nào biết được password của bạn.

Bài viết có tham khảo (chỉ tham khảo học hỏi thôi nhe) ở nguồn https://www.vaadata.com/blog/how-to-securely-store-passwords-in-database. Cảm ơn vì đã đọc bài viết, và nếu thấy hay hãy upvote bài viết để ủng hộ tớ nhé.