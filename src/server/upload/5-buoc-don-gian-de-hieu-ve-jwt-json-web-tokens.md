Trong bài viết hôm nay sẽ giới thiệu các nguyên tắc cơ bản về JWT (JSON Web Token) và lý do tại sao chúng ta lại sử dụng chúng. JWT là một phần quan trọng trong việc đảm bảo sự tin cậy và bảo mật trong ứng dụng của bạn. JWT cho phép xác nhận quyền sở hữu, chẳng hạn như dữ liệu người dùng, được mô tả một cách an toàn.

Để thấy được cách hoạt động của JWT, hãy bắt đầu với định nghĩa về nó:

*JWT là là một đối tượng JSON được định nghĩa trong RFC 7519 như một đoạn mã an toàn để trình bày một tập hợp thông tin giữa hai bên. Đoạn mã token bao gồm header, payload và signature.*

Nói một cách đơn giản, JWT chỉ là một chuỗi có định dạng :

`header.payload.signature`

Để thấy được cách thức và tại sao JWT sử dụng, chúng ta sẽ đi qua một 1 ví dụ với 3 thực thể đơn giản. Các thực thể trong ví dụ là user, server của ứng dụng và server xác thực. Server xác thực sẽ cung cấp JWT cho người dùng. Với JWT này, người dùng sau đó có thể giao tiếp một cách bảo mật và an toàn với ứng dụng.

![](https://images.viblo.asia/3a5b5bc5-cd41-490d-99c3-dd4a731e690d.png)

Trong ví dụ này, trước tiên người dùng đăng nhập vào máy chủ xác thực bằng cách sử dụng hệ thống đăng nhập của máy chủ (ví dụ: username và password, Facebook login, Google login, etc). Server xác thực sau đó tạo JWT và gửi nó cho người dùng. Khi người dùng thực hiện các lần gọi API đến ứng dụng, người dùng chuyển JWT cùng với cuộc gọi API. Trong thiết lập này, server của ứng dụng sẽ được cấu hình để xác minh rằng JWT đến được tạo ra bởi server xác thực. Vì vậy, khi người dùng thực hiện các cuộc gọi API đính kèm JWT, ứng dụng có thể sử dụng JWT để xác minh rằng cuộc gọi API đến từ một người dùng đã được xác thực.

## STEP 1. Tạo HEADER.

Thành phần tiêu đề (header) dùng để khai báo chữ ký và thuật toán mã hóa sẽ dùng cho token. Header là đối tượng JSON có địng dạng như sau:

```
{
    "typ": "JWT",
    "alg": "HS256"
}
```

Trong đoạn mã JSON, giá trị của khóa "typ" xác định rằng đối tượng là JWT và giá trị của khóa "alg" chỉ định thuật toán băm nào được sử dụng để tạo ra chữ ký (signature) cho JWT. Trong ví dụ của mình, thuật toán được sử dụng là HMAC-SHA256, thuật toán băm sử dụng secret key để tính toàn chữ ký (signature).

## Step 2. Tạo PAYLOAD

Phần thứ 2 của JWT là payload, nơi chứa các nội dung của thông tin . Thông tin truyền đi có thể là mô tả của một thực thể hoặc cũng có thể là các thông tin bổ sung thêm cho phần Header. Nó được chia làm 3 loại: reserved, public và private.

Thành phần payload của JWT là dữ liệu được lưu trữ bên trong JWT (dữ liệu này còn được gọi là "các xác nhận quyền sở hữu" của JWT). Trong ví dụ này, máy chủ xác thực tạo ra một JWT với thông tin người dùng được lưu trữ bên trong nó, đặc biệt là ID của người dùng.

```
{
    "userId": "b08f86af-35da-48f2-8fab-cef3904660bd"
}
```

Trong ví dụ, chúng ta chỉ đưa ra một xác nhận quyền sở hữu vào payload. Bạn có thể đưa nhiều yêu cầu nếu bạn muốn. Có một số tiêu chuẩn yêu cầu khác nhau cho payload JWT, chẳng hạn như "iss", "sub" và "exp". Các trường này có thể được sử dụng khi tạo JWT, nhưng chúng là các tùy chọn nhé. Bạn có thể tham khảo chi tiết hơn danh sách về các trường chuẩn của JWT trên [wikipedia](https://en.wikipedia.org/wiki/JSON_Web_Token#Standard_fields).

Lưu ý rằng kích thước của dữ liệu sẽ ảnh hưởng đến kích thước tổng thể của JWT, điều này thương không phải là vấn đề nhưng nếu JWT quá lớn có thể ảnh hưởng tiêu cực đến hiệu suất và gây ra độ trễ.


## Step 3. Tạo SIGNATURE

Chữ ký (signature) được tính bằng cách sử dụng thuật toán sau:

```
// signature algorithm
data = base64urlEncode( header ) + “.” + base64urlEncode( payload )
hashedData = hash( data, secret )
signature = base64urlEncode( hashedData )
```

Thuật toán này thực hiện bằng cách giải mã (header + payload). Thuật toán sau đó kết hợp các chuỗi được mã hóa kết quả cùng với dấu chấm (.) ở giữa chúng.
Trong đoạn mã, chuỗi nối này được gán cho data. Chuỗi dữ liệu được băm bằng secret key sử dụng thuật toán băm được chỉ định trong tiêu đề JWT. Kết quả dữ liệu băm được gán cho hashedData. Dữ liệu băm này sau đó được mã hóa base64url để tạo ra chữ ký (signature) JWT.

Trong ví dụng, cả header và payload được mã hóa [base64url](http://kjur.github.io/jsjws/tool_b64uenc.html):

```
// header
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
// payload
eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ
```

Sau đó, áp dụng thuật toán signature với secret key trên, header và payload được mã hóa và ghép nối với nhau, chúng ta nhận được dữ liệu được băm cung cấp cho signature. Trong TH của chúng ta, điều này có nghĩa là áp dụng thuật toán HS256, với secret key là "secret" trên chuỗi dữ liệu để nhận được chuỗi *hashedData*. Sau đó, thông qua base64url mã hóa chuỗi *hashedData*, chúng ta nhận được chữ ký của JWT như sau:

```
// signature
-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
```

## Step 4. Kết hợp ba thành phần JWT với nhau.

Bây giờ chúng ta đã tạo ra cả 3 thành phần, chúng ta có thể tạo JWT. Nhớ lại cậu trúc của JWT : *header.payload.signature*, chúng ta chỉ cần kết hợp các thành phần, với dấu chấm (.) để phân cách chúng. Chúng ta sử dụng phiên bản được mã hóa base64 của header, payload và signature được tạo ở bước 3.

```
// JWT Token
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ.-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
```

Bạn có thể thử tạo JWT cho riêng mình tại jwt.io.

Quay trở lại ví dụ của chúng ta, máy chủ xác thực có thể gửi JWT này cho người dùng.

**JWT bảo vệ dữ liệu của chúng ta bằng cách nào ?**

Điều quan trọng là phải hiểu rằng mục đích của việc sử dụng JWT là KHÔNG ẩn hoặc làm mờ dữ liệu theo bất kỳ cách nào. Lý do tại sao JWT được sử dụng là để chứng minh rằng dữ liệu được gửi thực sự được tạo ra bởi một nguồn xác thực.

Như đã trình bày trong các bước trước, dữ liệu bên trong JWT là mã hóa và được đánh dấu, không mã hóa. Mục đích của việc mã hóa dữ liệu là chuyển đổi cấu trúc dữ liệu. Dữ liệu đăng ký cho phép người nhận dữ liệu xác minh tích xác thực của nguồn dữ liệu. Vì vậy, mã hóa và đánh dấu dữ liệu **KHÔNG** bảo mật dữ liệu. Mặc khác, mục đích chính của mã hóa là bảo mật dữ liệu và ngăn chặn truy cập trái phép. Để có giải thích chi tiết hơn về sự khác biệt giữa giải mã và mã hóa và cũng để biết thêm thông tin về cách hoạt động của hàm băm, bạn có thể xem tại [bài biết](https://danielmiessler.com/study/encoding-encryption-hashing-obfuscation/#encoding).

## Step 5. Xác thực mã JWT.

Trong ví dụ về 3 thực thể đơn giản, chúng ta đang sử dụng JWT được đăng ký bởi thuật toán HS256, nơi chỉ có máy chủ xác thực và máy chủ ứng dụng mới biết được mã secret. Máy chủ ứng dụng nhận key secret từ mày chủ xác thực khi ứng dụng thiết lập quá trình xác thực. Từ khi ứng dụng biết được secret key, khi người dùng thực hiện các cuộc gọi API đính kèm JWT vào ứng dụng, ứng dụng có thể thực hiện cùng một thuật toán signature như trong Bước 3 trên JWT. Sau đó, ứng dụng có thể xác minh rằng signature thu được từ việc thực hiện băm của chính nó khớp với signature trên chính JWT (nghĩa là khớp với signature JWT được tạo ra bởi máy chủ xác thực). Nếu signature khớp với nhau, thì điều đó có nghĩa là JWT hợp lệ, cuộc gọi API đến từ một nguồn xác thực. Nếu signature không khớp, thì có nghĩa là JWT nhận được không hợp lệ, có thể là dấu hiệu của một tấn công tiềm tàng trên ứng dụng. Vì vậy bằng cách xác minh JWT, ứng dụng sẽ thêm một lớp tin cậy giữa chính nó và người dùng.

## Kết luận

Chúng ta thấy được JWT là gì, cách chúng được tạo ra và xác thực ra sao, và cách chúng có thể được sử dụng để đảm bảo sự tin cậy giữa ứng dụng và người dùng. Đây là điểm khởi đầu để hiểu các nguyên tắc cơ bản của JWT và tại sao chúng lại hữu ích. JWT chỉ là một phần của câu chuyện trọng việc đảm bảo sự tin tưởng và bảo mật trong ứng dụng của bạn.

Cần lưu ý rằng thiết lập xác thực JWT được mô tả trong bài giới thiệu của mình đang sử dụng thuật toán đối xứng (HS256). Bạn cũng có thể thiết lập xác thực JWT của mình theo cách tương tự ngoài trừ sử dụng thuật toán không đối xứng (nhưng RS256), nơi máy chủ xác thực có secret key và máy chủ ứng dụng có public key. Bạn có thể tìm hiểu sự khác nhau giữa thuật toán đối xứng và không đối xứng tại [Stach Overflow](https://stackoverflow.com/questions/39239051/rs256-vs-hs256-whats-the-difference).

Cũng cần lưu ý rằng JWT nên được gửi qua kết nối HTTPS (không phải HTTP). Việc có HTTPS giúp ngăn chặn người dùng ăn cắp trái phép JWT đã gửi bằng cách làm cho nó [không thể chặn](https://en.wikipedia.org/wiki/HTTPS#Security) được liên lạc giữa các máy chủ và người dùng.

Ngoài ra, việc hết hạn payload JWT của bạn, một đoạn ngắn đặc biệt, là quan trọng để nếu JWT cũ bị xâm phạm, chúng sẽ bị coi là không hợp lệ, và không thể sử dụng được nữa.

**Tài liệu tham khảo**

https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec

https://techmaster.vn/posts/33959/khai-niem-ve-json-web-token

https://jwt.io/introduction/