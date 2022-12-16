Chắc các bạn cũng biết rằng HTTP là một chiếc cầu nối giữa client và server (giao thức truyền tải). Và nó là một giao thức stateless (stateless protocol).

Vậy stateless là gì nhể? Giải thích một cách dễ hiểu thì một giao thức stateless là giao thức mà sau khi client gửi dữ liệu lên server, server thực thi xong, trả kết quả lại về cho client thì “quan hệ” giữa client và server bị “cắt đứt”, server không lưu lại bất cứ dữ liệu trạng thái gì của client.

Để giải thích bằng ví dụ thì điều này có nghĩa là nếu như chúng ta đăng nhập vào tài khoản Facebook. Sau đó chúng ta di chuyển sang trang Settings thì chúng ta sẽ phải đăng nhập lại vì server không giữ trạng thái của chúng ta. Tuy vậy bài toán này đã được giải quyết với session và cookies. Bằng cách lưu giữ thông tin tại 2 phía client và server thông qua session và cookies mà server có thể biết được client này đã đăng nhập được hay chưa.

Ngoài Session và Cookies ra thì vẫn còn 1 vài kỹ thuật nữa được sử để xác thực đăng nhập (authentication). Trong đó có JWT.

# 1. JWT là gì?

– JWT là viết tắt của  "JSON Web Token" – một tiêu chuẩn mở (RFC 7519) cho việc bảo việc trong truyền tải dữ liệu giữa các endpoint.

> A JSON Web Token (JWT) is a JSON object that is defined in RFC 7519 as a safe way to represent a set of information between two parties. The token is composed of a header, a payload, and a signature.
> 
> — Mình tạm dịch: —
> 
> JWT là một JSON object được định nghĩa trong chuẩn RFC 7519 như là một cách an toàn để trao đổi thông tin giữa hai bên. Và Token thì bao gồm một header, một payload và một chữ ký.

JSON Web Token bao gồm 3 phần, được ngăn cách nhau bởi dấu chấm (.), đó là:

- Header
- Payload
- Signature

## Header
– Đây là nơi chứa cái thông tin mà được dùng để trả lời cho câu hỏi: “Mã JWT được tính toán như thế nào?”

   Ví dụ cho một cái Header, nó là một đối tượng JSON giống như thế này:

```
{
  "typ": "JWT",
  "alg": "HS256"
}
```

– Trong cái Header ví dụ trên:

   - Thì “typ” (viết tắt của type) là kiểu Token, ở đây chính là JWT.
    
   - Còn “alg” (viết tắt của algorithm) là thuật toán băm tạo ra chữ ký cho Token, ở ví dụ trên HS256 là thuật toán có tên HMAC-SHA256, một thuật toán băm sử dụng khóa bí mật (Secret Key) để tính toán tạo ra chữ ký.

## Payload: 
  –  Đây là nơi chứa những dữ liệu mà chúng ta muốn lưu lại trong JWT.
  
  Ví dụ mình muốn lưu một vài thông tin của thằng user vào token, như thế này:
  
```
{
  "userId": "7j79y-kdjr8n4h",
  "username": "trongnhandev",
  "occupation": "Full stack web developer",
  // standard fields
  "iss": "Trong Nhan",
  "iat": 1568456819,
  "exp": 1568460419
}
```

Trong ví dụ trên, mình lưu 3 thông tin của thằng user khi login thành công đó là id, tên và nghề nghiệp, dĩ nhiên các bạn muốn lưu thêm bao nhiêu cũng được.

* Có 2 lưu ý khi định nghĩa payload đó là:
    * Không cho password, thông tin cần bảo mật vào payload có thể bị decode
    * Không cho quá nhiều thông tin vào payload vì sẽ tạo ra độ trễ cho server

Ngoài ra để ý cho mình 3 cái trường mình để phía dưới dòng Standard Fields, chúng nó là những trường tiêu chuẩn, là optional nghĩa là các bạn có thể tạo hoặc không, nhưng mà nên tạo nhé vì nó sẽ hữu ích.

– “iss” viết tắt của Issuer là thông tin người tạo ra Token (không phải user đâu nhé, mà nó chính là tên cái hệ thống backend của các bạn chẳng hạn)

– “iat” viết tắt của Issued at, là nhãn thời gian lúc mà cái token được tạo.

– “exp” viết tắt của Expiration time, xác định thời gian hết hạn của Token

Ngoài ra còn nhiều standard fields nữa, các bạn hãy tham khảo ở đây nhé, thấy cái nào phù hợp thì dùng cho ứng dụng của các bạn.
https://en.wikipedia.org/wiki/JSON_Web_Token#Standard_fields

## Signature: 
Cùng xem qua đoạn mã giả dưới đây rồi mình sẽ giải thích chi tiết về phần thực hiện lấy chữ ký này nhé:

```
// signature algorithm
const data = base64urlEncode(header) + “.” + base64urlEncode(payload);
const hashedData = Hash(data, secret);
const signature = base64urlEncode(hashedData);
```
– Đầu tiên, chúng ta sẽ Encode (chuyển đổi) 2 cái Header và Playload ở trên theo kiểu Base64URL Encoder, và nối 2 chuỗi nhận được lại (cách nhau bởi dấu chấm “.”) rồi gán nó vào một biến là data.

– Tiếp theo sẽ Hash (băm) cái data đó bằng “alg”, chính thuật toán tạo chữ ký mà chúng ta đã định nghĩa ở trên Header (HS256 – HMAC-SHA256) kèm với một chuỗi bí mật secret (chuỗi secret này sẽ được đặt tùy vào lập trình viên của mỗi dự án và đảm bảo không được để lộ chuỗi này ra ngoài, có thể đưa vào biến môi trường ENV.)

– Sau khi băm xong ở trên thì thực hiện Encode tiếp một lần nữa cái dữ liệu băm đó dưới dạng Base64URL Encode, và chúng ta sẽ thu được chữ ký “Signature”.

– Sau khi đã có đủ 3 thành phần HEADER, PAYLOAD, SIGNATURE thì làm gì? Bước này đặc biệt quan trọng, đó là chúng ta sẽ kết hợp 3 thành phần trên lại và phân cách chúng nó bởi dấu chấm theo đúng cấu trúc chuẩn của JWT: 

> header.payload.signature

Cụ thể hơn, mình sẽ mô tả lại bằng đoạn mã giả này:

```
const headerEncode = base64urlEncode(header); // ví dụ kết quả: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
const payloadEncode = base64urlEncode(payload); // ví dụ kết quả: eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ
const data = headerEncode + "." + payloadEncode;
const hashedData = Hash(data, secret);
const signature = base64urlEncode(hashedData);  // ví dụ kết quả: xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
// cuối cùng thì mã JWT theo đúng cấu trúc header.payload.signature sẽ trông như sau:
const JWT = headerEncode + "." + payloadEncode + "." + signature;
// Kết quả: 
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ.xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM"
```

Ngoài ra thì các bạn cũng có thể tự tạo nhanh một mã JWT bằng công cụ online ở đây:
– https://jwt.io/

#  2. JWT bảo vệ dữ liệu của chúng ta bằng cách nào?
> Câu trả lời đó là: JWT không bảo vệ dữ liệu của bạn.

– Mục đích quan trọng mà các bạn cần phải nắm được là JWT nó không ẩn, không làm mờ, không che giấu dữ liệu gì cả, mà nó được sử dụng để chứng minh rằng dữ liệu được tạo ra bởi một nguồn xác thực.

– Các bạn có thể nhìn lại ở các bước xử lý Header, Payload, Signature trên kia, dữ liệu chỉ được Encoded và Hash (Signed) chứ không phải Encrypted.

“Lưu ý: mình phải giữ nguyên mấy từ trên bằng tiếng anh bởi vì Encoded và Encrypted dịch ra tiếng việt đều là “Mã hóa” nhưng bản chất ý nghĩa của chúng hoàn toàn khác nhau.”

Ngoài ra Các bạn có thể tham khảo ở 2 link dưới đây để hiểu thêm về sự khác nhau giữa Encoded và Encrypted nhé:

– https://danielmiessler.com/study/encoding-encryption-hashing-obfuscation/#encoding

– https://stackoverflow.com/a/4657456

Vậy thì có bạn sẽ đặt ra thắc mắc: “nếu một kẻ tấn công ở giữa (Man-in-the-middle) bắt được gói tin có chứa mã JWT rồi họ decode ra và lấy được thông tin của user thì sao?”

> Câu trả lời là: “đúng, điều đó là có thể, vậy nên hãy luôn luôn đảm bảo rằng ứng dụng của các bạn chắc chắn phải có giao thức mã hóa đường truyền HTTPS nhé.“

# 3. Server xác thực mã JWT gửi lên từ client ra sao?

– Trong phần trên kia các bạn hãy nhìn lại cho mình đó là khi tạo mã JWT, chúng ta có sử dụng tới một chuỗi bí mật “Secret” trong bước tạo chữ ký (signature).
Chuỗi “Secret” này là unique cho ứng dụng và phải được ưu tiên lưu trữ bảo mật cẩn thận ở phía server.

– Khi nhận được mã Token gửi lên từ phía client, Server sẽ lấy phần Signature (chữ ký) bên trong mã token đó, và verify (kiểm tra ) xem cái chữ ký nhận được có đúng chính xác là được HASH (băm) bởi cùng một thuật toán và chuỗi “Secret” như trên hay không.

– Và cuối cùng, rõ ràng, nếu chữ ký của client gửi lên khớp với chữ ký được tạo ra từ máy chủ, thì cái JWT đó là hợp lệ, ngược lại thì không, và người lập trình API phía Backend như chúng ta sẽ tùy vào từng trường hợp mà response về cho client một cách hợp lý.

![](https://images.viblo.asia/ba9514b7-5ef7-4ee0-8996-d00436cc9971.png)

# 4. Cơ chế xác thực đăng nhập bằng Session và Cookies (Session-Based Authentication)

– Với cơ chế này thì sau khi đăng nhập, server sẽ tạo ra session cho user và lưu vào đâu đó (có thể là file, memory, database,…). Sau đó một session ID sẽ được lưu vào trong cookies của trình duyệt. Trong khi user truy cập vào website thì session ID đó sẽ được trình duyệt lấy ra và gửi kèm theo trong request. Nhờ vậy mà server có thể tham chiếu đến session đã lưu trên server để biết user này đã đăng nhập hay chưa. Sau khi user log-out (đăng xuất) thì session sẽ bị xóa đi.

![](https://images.viblo.asia/d22726df-c71c-4a83-a767-45c01e29bbb4.png)


# 5. Cơ chế xác thực đăng nhập bằng Token – (Token-Based Authentication)

– Khi nhắc đến cơ chế xác thực đăng nhập bằng Token (Token-Based Authentication) thì đa phần người ta thường nhắc đến JWT. Trước đây thì các trang web chỉ sử dụng cơ chế Session và Cookies tuy vậy hiện nay cơ chế sử dụng Token vô cùng phổ biến và dần trở thành một tiêu chuẩn cho việc xác thực đăng nhập.

– Cơ chế của JWT là như thế nào? Khi user đăng nhập thì server sẽ tạo ra một đoạn token được mã hóa và gửi lại nó cho client. Khi nhận được token này thì client sẽ lưu trữ vào bộ nhớ (thường sẽ là local storage). Sau đó mỗi khi client request lên server thì sẽ gửi kèm theo token. Từ token này server sẽ biết được user này là ai.

> “Đối với việc lưu trữ JWT ở client, sẽ có vài trường hợp, nếu như là trình duyệt web thì JWT có thể lưu vào Local Storage, IOS app thì sẽ là Keychain và Android app sẽ lưu vào SharedPreferences.”

![](https://images.viblo.asia/d439ca16-436a-42bc-9c6a-8b17c72c8097.png)

# Nên dùng cách nào?
Xác thực bằng JWT là phương pháp được mà mình nghĩ sẽ trở thành 1 tiêu chuẩn trong tương lai để dần thay thế cho Session, Cookies khi mà SPA đang trở thành xu thế. Ngoài ra nó có thể scale tốt hơn so với Session Cookies vì token sẽ được lưu trữ ở phía client trong khi Session thì phải lưu ở máy chủ và đây có thể là vấn đề khi một số lượng lớn người dùng sử dụng hệ thống cùng một lúc.

Tuy nhiên, một nhược điểm với JWT là có kích thước lớn hơn nhiều so với session ID vì JWT chứa nhiều thông tin người dùng hơn. Ngoài ra chúng ta cần phải cần thận trong việc cho thông tin người dùng vào JWT vì nó có thể bị decode.