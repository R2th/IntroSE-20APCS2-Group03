Bài viết này dễ giới thiệu cũng như so sánh một chút về các loại mã hóa, giúp bạn có sự lựa chọn phù hợp tùy vào yêu cầu và tính chất của dự án.

## 1.	Mã hóa MD5
Có lẽ đây là loại mã hóa quen thuộc và hay dùng nhất đối với mọi người.

MD5 (Message-Digest algorithm 5) là một hàm băm mật mã theo chuẩn RFC 1321. Các chương trình mã hoá MD5 thường được gọi là MD5Sum.
Ví dụ mã hóa MD5:
```
MD5("The quick brown fox jumps over the lazy dog") 
  = 9e107d9d372bb6826bd81d3542a419d6
```
Khi thay đổi dù chỉ 1 chữ thì toàn bộ chuỗi mã hóa cũng thay đổi
```
MD5("The quick brown fox jumps over the lazy eog") 
  = ffd93f16876049265fbaef4da268dd0e
```
Chuỗi mã hóa của ký tự rỗng là:
```
MD5("") 
  = d41d8cd98f00b204e9800998ecf8427e
```


MD5 có giá trị 128-bit từ dữ liệu đầu vào, thường được dùng để check độ tin cậy của tập tin. Thông thường máy chủ tập tin sẽ cung cấp một MD5 để so sánh với MD5 được cài trong tập tin. MD5 được thiết kế vào năm 1991 để thay thế cho hàm băm trước đó là MD4 (đã được chứng minh là không an toàn).
Sau này, MD5 cũng bị tìm thấy nhiều lỗ hổng nhưng vẫn được sử dụng rộng rãi đến hiện tại. Với những người không tin tưởng MD5 thì họ có thể sử dụng SHA hoặc Bcrypt.
Để bẻ khóa MD5 chỉ cần lên google search là ra ngay kết quả, tuy nhiên bạn có thể tham khảo một số tool [tại đây](https://trangcongnghe.com/thu-thuat/bao-mat/705-top-5-cong-cu-be-khoa-md5-online.html). 



## 2.	Mã hoán SHA
SHA (Secure Hash Algorism) bao gồm 5 thuật giải : SHA-1, SHA-224, SHA-256, SHA384, SHA-512; được phát biểu theo nguyên văn của  FIPS là (tạm dịch):

> 1) Cho một giá trị băm nhất định được tạo nên bởi một trong những thuật giải SHA, việc tìm lại được đoạn dữ liệu gốc là không khả thi.
> 2) Việc tìm được hai đoạn dữ liệu khác nhau có cùng kết quả băm tạo ra bởi một trong những thuật giải SHA là không khả thi.
> Bất cứ thay đổi nào trên đoạn dữ liệu gốc, dù nhỏ, cũng sẽ tạo nên một giá trị băm hoàn toàn khác với xác suất rất cao.


Tuy nhiên, hiện nay cả 2 ý phát biểu trên đang dần bị phủ định do hiện tại SHA-1 đã bị 3 người mật mã học Trung Quốc phát triển thành công thuật giải dùng để tìm ra 2 đoạn dữ liệu nhất định có cùng kết quả băm tạo ra bởi SHA-1, đồng thời trên mạng cũng đã phát triển những tool có thể bẻ khóa được SHA-1.
Đối với SHA-2 (tên gọi chung của 4 loại SHA sau) thì hiện tại chưa tìm ra được lỗ hổng nào, tuy nhiên vì SHA2 và SHA1 khá tương đồng nhau về thuật giải nên người ta dự đoán trong tương lai SHA2 cũng sẽ trở nên không an toàn và được thay thế bởi một thuật giải khác.
Bạn có thể bắt đầu tìm ra lỗ hổng của SHA-2 cũng như phát minh ra một thuật giải khác thay thế giống như người ta đã phát minh ra SHA-1 để thay thế cho MD5 vậy.
NIST cũng đã khởi đầu một cuộc thi phát triển thuật giải băm mới an toàn hơn SHA, giống như quy trình phát triển chuẩn mã hóa tiên tiến (Advanced Encryption Standard hay AES)

Một số ví dụ của SHA:
SHA-1:
```
SHA1("The quick brown fox jumps over the lazy dog") 
  = 2fd4e1c6 7a2d28fc ed849ee1 bb76e739 1b93eb12
```
Khi thay đổi chỉ 1 ký tự, mã băm hoàn toàn thay đổi
```
SHA1("The quick brown fox jumps over the lazy cog") 
  = de9f2c7f d25e1b3a fad3e85a 0bd17d9b 100db4b3
```
SHA-1 của giá trị rỗng:
```
SHA1("")
 = da39a3ee 5e6b4b0d 3255bfef 95601890 afd80709
```
SHA-256:
```
SHA256("The quick brown fox jumps over the lazy dog") 
 = d7a8fbb3 07d78094 69ca9abc b0082e4f 8d5651e4 6d3cdb76 2d02d0bf 37c9e592
```
 
Khi thay đổi 1 ký tự:
```
SHA256("The quick brown fox jumps over the lazy cog")
 = e4c4d8f3 bf76b692 de791a17 3e053211 50f7a345 b46484fe 427f6acc 7ecc81be
```
SHA-256 của ký tự rỗng
```
SHA256("")
 = e3b0c442 98fc1c14 9afbf4c8 996fb924 27ae41e4 649b934c a495991b 7852b855
```
•	Dành cho những bạn muốn tìm hiểu thêm lỗ hổng của SHA-1:
http://ictnews.vn/cntt/bao-mat/giai-ma-ve-lo-hong-bao-mat-cua-ham-bam-sha-1-ma-google-moi-tim-ra-149837.ict


## 3.	Mã hóa Bcrypt
Một thời  gian trở lại đây, Bcrypt được biết đến nhiều hơn như là một thuật toán chuyên được dùng để mã hóa password an toàn hơn MD5, SHA.
Vì sao Bcrypt lại an toàn hơn? 
Thứ nhất trong khi chuỗi mã hóa của MD5 hay SHA là cố định đối với 1 chuỗi dữ liệu nhưng với Bcrypt lại là một chuỗi ngẫu nhiên, không cố định.
Đồng thời, ta có thể tùy chỉnh thời gian  tạo ra 1 chuỗi mã hóa (salt), thời gian này càng lâu thì mật khẩu mã hóa càng an toàn. Điều này có nghĩa là kiểu tấn công brute force khó mà thực hiện được đối với kiểu mã hóa này.

Kiểu Bcrypt này có thể được sử dụng trong nhiều ngôn ngữ lập trình, tuy nhiên có những ngôn ngữ được hỗ trợ sẵn và những ngôn ngữ lại không. Đối với những ngôn ngữ không hỗ trợ sẵn thì bạn phải import thêm thư viện để có thể sử dụng.

Dưới đây, sẽ đưa ra ví dụ sử dụng Bcrypt với Java và Nodejs.

**Java: cần sử dụng thêm thư viện JBcrypt**
```
String password = "password";
String hash = BCrypt.hashpw(password, BCrypt.gensalt(10));
```

Gensalt quy định số vòng lặp để tạo ra chuỗi mã hóa, có thể chỉ định từ 4-30 vòng. Số vòng lặp càng cao, thời gian tạo ra chuỗi mã hóa càng lâu và password sẽ càng an toàn.

**Nodejs: cài thêm gói bcrypt**

Mở termianal lên và gõ câu lệnh:

`npm install bcrypt` 

Gói này hỗ trợ cả 2 phương thức đồng bộ và bất đồng bộ, tuy nhiên để đỡ mất thời gian hơn thì người ta thường dùng phương thức bất đồng bộ.

Phương thức bất đồng bộ:
```
const bcrypt = require('bcrypt')

bcrypt.genSalt(12, function (err, salt) {
    bcrypt.hash('password', salt, function (err, hash) {

        //some code

        })
    })    
```
Phương thức đồng bộ:
```
const bcrypt = require('bcrypt')

var salt = bcrypt.genSaltSync(12)
var hash = bcrypt.hashSync(password', salt)
```

Hy vọng với 3 phương thức mã hóa ở trên các bạn có thể lựa chọn được phương thức phù hợp nhất với dự án của mình, tùy theo yêu cầu của khách hàng về độ bảo mật của dự án.