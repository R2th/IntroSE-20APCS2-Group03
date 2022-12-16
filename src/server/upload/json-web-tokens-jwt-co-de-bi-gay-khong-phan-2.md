# I. Tổng quan
Sau bài viết đầu tiên về chủ để an toàn khi sử dụng JWT Token với tiêu đề [](https://viblo.asia/p/json-web-tokens-jwt-co-de-bi-gay-khong-07LKXqBJZV4) nhận được sự quan tâm của đông đảo bạn đọc mình thấy có động lực để tiếp tục chuỗi bài viết về tấn công JWT. Nội dung phần 2 sẽ tiếp tục với một số hình thức tấn công JWT. Bài viết hi vọng giúp các bạn có những kiến thức về bảo mật JWT. Đặc biệt, mình hi vọng với chuỗi bài viết này sẽ giúp đội ngũ lập trình viên có thêm kiến thức về các hình thức tấn công JWT đơn giản. Từ đó, đội ngũ lập trình viên có thêm nhiều kiến thức và phương pháp để phòng tránh các cuộc tấn công vào JWT Token.

Ở phần 1, chúng ta đã được biết về cấu trúc, cơ chế hoạt động và một số lỗi thường gặp của lập trình viên khi sử dụng JWT Token (Không verify token trên server, không sử dụng thuật toán mã hóa khi verify token). Ở bài viết này, chúng ta tiếp tục với các hình thức tấn công JWT Token khác. 
# II. Brute-forcing secret keys 
## 1. Secret key trong JWT
Trước khi tìm hiểu về hình thức tấn công này, chúng ta cần hiểu về cơ chế hoạt động và cách sử dụng secret ket trong JWT:
Quá trình signing the Json Web Token (Ký JWT Token) diễn ra như sau:

![image.png](https://images.viblo.asia/51171e5e-c6d6-40ad-ac4e-96bf28b1fdb1.png)

Sau khi người dùng xác thực , server tiến hành signing JWT Token và gửi về cho phía client. Thuật toán signing sẽ sử dụng `header`, `payload` và `secret key` để tiến hành tạo ra một signature (chữ ký) duy nhất trên phía server và gửi lại phía client.

Sau khi nhận được JWT Token hợp lệ, client đã được xác thực sử dụng để truy cập các chức năng. Mỗi lần Client gửi JWT Token lên phía server, JWT Token sẽ được server sử dụng thuật toán verify để kiểm tra việc chữ ký có hợp lệ hay không (có bị sửa đổi trái phép hay không). Nói cách khác, server kiểm tra xem dữ liệu trong payload có bị thay đổi trái phép hay không.

![image.png](https://images.viblo.asia/9aff2a4c-93f2-48bc-8065-93077d90c216.png)

**Nhưng vấn đề nằm ở đâu?** Rõ ràng mỗi lần client gửi JWT Token lên server, nếu muốn thay đổi dữ liệu một cách hợp lệ, client cần thực hiện signing lại JWT Token trước khi gửi lên server. Và JWT Token này chỉ được server hợp lệ nếu `secret key` client sử dụng trùng với `secret key` được lưu trên phía server. Vậy ý tưởng ở đây là chúng ta sẽ tiến hành "đoán" secret key mà server sử dụng để ký và từ đó tiến hành sửa đổi dữ liệu, sau đó sẽ gửi lên phía server để tấn công. 

Đương nhiên, chúng ta sẽ không ngồi "đoán bừa" mà sẽ sử dụng các công cụ hỗ trợ. Chúng ta cùng đến với demo tấn công

## 2. Sử dụng hashcat để tiến hành brute-force secret key
Đây là một hình thức tấn công vào secret key của JWT Token.

### 2.1  JWT authentication bypass via weak signing key

**Bước 1**: User `wiener` sau khi xác thực thành công tiến hành truy cập vào `/my-account `

![image.png](https://images.viblo.asia/971e6e92-ee51-4fad-818d-3f9a22072596.png)

**Bước 2**: Truy cập vào trang admin:

![image.png](https://images.viblo.asia/994e2536-1535-40a4-b7e0-e7a957ac5637.png)

**Bước 3**: Thử sửa đổi JWT Token: `"sub": "wiener"`, thành `"sub": "administrator"` và truy cập nhưng không thành công:

![image.png](https://images.viblo.asia/c702d42f-239d-49f5-afe4-e9de2a06306b.png)

**Bước 4**: Brute-force secret key sử dụng hashcat
Command: 
```
sudo hashcat -a 0 -m 16500 jwt_token.txt jwt.secrets.list --force
```

![image.png](https://images.viblo.asia/43a3aced-a6b1-4fb3-aa3a-62a8de705a7c.png)

***Trong đó*:**
   
*  16500 : Là loại mã hóa sử dụng (Sử dụng trang: https://hashcat.net/wiki/doku.php?id=example_hashes để tìm kiếm JWT Token hash)
    
*    jwt_token.txt: File chứa jwt token
    
*    jwt.secrets.list: File chứa list các secret để brute-force (Wordlist sử dụng: https://github.com/wallarm/jwt-secrets/blob/master/jwt.secrets.list)

***Kết quả*:**

Brute-force thành công secret key có giá trị: secret1

**Bước 5**: Generate a forged signing key

***Thực hiện Base64-encoded secret key***: Sử dụng công cụ Decoder của BurpSuite

![image.png](https://images.viblo.asia/6b6d4256-221c-4efc-94a2-72b0a0a4e457.png)

***Tiến hành Sửa và ký lại JWT Token***
Tạo mới: "New Symmetric Key" và tiến hành gernerate (`k`: giá trị base64-eoncded secret key)

![image.png](https://images.viblo.asia/c848dae5-1cdd-479e-8fb7-628111bc89c9.png)

**Bước 6**: Sửa đổi và ký lại JWT Token

Quay lại Request ở repeater tiến hành sửa đổi dữ liệu ở payload:

1. Sửa đổi JWT Token: `"sub": "wiener"`, thành `"sub": "administrator"`
2. Sau đó tiến hành `Sign`
3. Chọn `Signing key` là chữ ký mới tạo và `Signing Algorithm` là `HS256`

![image.png](https://images.viblo.asia/73c10606-cefc-482a-b74a-2787c82510f7.png)

4. Tiến hành gửi request và truy cập trang quản trị users thành công

![image.png](https://images.viblo.asia/6f212b89-55b9-4acf-89bc-50518c37158c.png)

### 2.2 Nguyên nhân
 Nguyên nhân dẫn đến JWT bị tấn công ở đây là do developer dử dụng secret key quá yếu (quá ngắn, không đủ độ phức tạp và có trong wordlist có sẵn)
### 2.3 Biện pháp
Developer cần sử dụng key có độ dài đủ lớn (có thể lớn hơn 16 ký tự và càng phức tạp càng tốt) và không nằm trong wordlist có sẵn.

# III. JWT header parameter injections
Theo thiết kế của JWS (JSON Web Signature), trong phần `header` có chứa tham số `alg` là bắt buộc để chỉ định thuật toán mã hóa. Ngoài ra, chúng ta còn một số header khác (JOSE headers):
- jwk (JSON Web Key) - Cung cấp đối tượng JSON được nhúng thêm public key.
- jku (JSON Web Key Set URL) - Cung cấp đường dẫn nơi server có thể lấy về public keys đã được trusted sau đó dùng để verify token.
- kid (Key ID) - Cung cấp ID mà server có thể sử dụng để xác định chính xác khóa sử dụng trong trường hợp sử dụng nhiều khóa.
## 1. Injecting self-signed JWTs via the jwk parameter

Chữ ký Web JSON (JWS) mô tả một tham số `jwk` ở header, server có thể sử dụng để nhúng public key trực tiếp trong token của JWT.
Trong mô hình này, public key sử dụng để verify token nhằm xác định chữ ký có hợp lệ không:

**Mô hình sử dụng mã hóa đối xứng (symmetric key)**: Sử dụng thuật toán HS256 (HMAC + SHA-256), trong đó `secret` sử dụng vừa để ký vừa để verify token 

![jwt-symmetric-signing-algorithm.jpg](https://images.viblo.asia/709d303e-7c71-4138-93cd-6c94dc75e319.jpg)

**Mô hình sử dụng mã hóa bất đối xứng (asymmetric key)**: Sử dụng thuật toán RS256 (RSA + SHA-256), trong đó `private key` sử dụng để ký và `public key` để  để verify token.

![jwt-asymmetric-signing-algorithm.jpg](https://images.viblo.asia/40d70d1f-0987-47d5-af82-0b8d8bbdc35c.jpg)

**Một ví dụ của JWT header:**

```json
{
    "kid": "ed2Nf8sb-sD6ng0-scs5390g-fFD8sfxG",
    "typ": "JWT",
    "alg": "RS256",
    "jwk": {
        "kty": "RSA",
        "e": "AQAB",
        "kid": "ed2Nf8sb-sD6ng0-scs5390g-fFD8sfxG",
        "n": "yy1wpYmffgXBxhAUJzHHocCuJolwDqql75ZWuCQ_cb33K2vh9m"
    }
}
```

### 1.1 Tấn công sử dụng jwk header
Ý tưởng ở đây là chúng ta sẽ tự tạo ra bộ `public key` và `private key`, sau đó gửi public lên. Vì trên server chỉ kiểm tra nếu có `public key` server sẽ sử dụng để tiến hành verify.

**Bước 1**: Login vào tài khoản wiener

![image.png](https://images.viblo.asia/c5b8a2a6-87da-4299-8e20-fa4494fbae67.png)

**Bước 2**: Truy cập tới trang admin nhưng bị chặn do không phải là admin

![image.png](https://images.viblo.asia/3f05b8bf-f926-4830-b97d-191265214b8b.png)

**Bước 3**: Tạo mới RSA key

![image.png](https://images.viblo.asia/f5195fdc-f076-4b9a-aaf8-69677e294aba.png)


**Bước 4**: Thay đổi giá trị thành: `"sub": "administrator"` và Chọn `Attack` -> `Embedded JWK`

![image.png](https://images.viblo.asia/65845f01-c515-4179-bb81-eeee9a77c4a0.png)

**Bước 5**: Chọn key được tạo ra ở bước 3

![image.png](https://images.viblo.asia/5ea11d34-6188-4dac-b8c9-283ae7eb1864.png)

**Bước 6**: jwk được embedded thành công và truy cập được trang quản trị của admin

![image.png](https://images.viblo.asia/b29a68b9-093c-4cd6-aef0-c1dcfb8a7888.png)

### 1.2 Nguyên nhân
Nguyên nhân của lỗ hổng đến từ việc developer không white list public key được sử dụng để verify trên server mà thay vào đó dùng public key người dùng cung cấp để verify
### 1.3 Cách khắc phục
White list public được sử dụng để verify trên server.
Có thể tham khảo để sử dụng  jku (JSON Web Key Set URL) - Cung cấp đường dẫn nơi server có thể lấy về public keys đã được trusted sau đó dùng để verify token
# IV. Tổng kết
Bài viết có trình bày một số kịch bản tấn công vào JWT Token, nguyên nhân chủ yếu vẫn đến từ việc developer áp dụng chưa tốt JWT vào việc xác thực Token. Hi vọng qua bài viết bạn đọc có thêm góc nhìn bảo mật về JWT Token.
Nếu có bất kỳ thắc mắc hay trao đổi nào, vui lòng comment bên dưới bài viết. Mình không chắc sẽ giải đáp được tất cả những thắc mắc nhưng mình hứa sẽ tìm phương án tốt nhất để giải đáp được thắc mắc của các bạn. 

Cảm ơn các bạn đã theo dõi bài viết!!!