Trong thời đại công nghệ ngày nay, việc đăng nhập bằng các tài khoản của các nền tảng khác không phải điều gì xa lạ đối với mỗi người dùng chúng ta. Việc này khả thi nhờ một vài cơ chế khác nhau, một trong số đó là OAuth 2.0. Tuy nhiên, việc áp dụng OAuth 2.0 cũng muôn màu muôn vẻ mà nếu có sai sót thì có thể xảy ra các lỗ hổng cho kẻ xấu lợi dụng. Trong bài này chúng ta cùng tìm hiểu 1 chút nho nhỏ về các lỗ hổng có thể xảy ra khi ứng dụng OAuth 2.0 nhé.
## I. OAuth 2.0 Framework
### 1. Khái niệm OAuth 2.0 framework

Đầu tiên mình xin dẫn ra abstract của OAuth 2.0 Framework theo **Internet Engineering Task Force (IETF)**:

>    The OAuth 2.0 authorization framework enables a third-party
>    application to obtain limited access to an HTTP service, either on
>    behalf of a resource owner by orchestrating an approval interaction
>    between the resource owner and the HTTP service, or by allowing the
>    third-party application to obtain access on its own behalf.  This
>    specification replaces and obsoletes the OAuth 1.0 protocol described
>    in RFC 5849.

Theo đó, OAuth 2.0 là một cơ chế cho phép các dịch vụ bên thứ 3 có quyền truy cập tới một số tài nguyên nhất định của chủ sở hữu tài nguyên. Ban đầu OAuth 2.0 được thiết kế nhằm mục địch xác thực quyền truy cập tới một số tài nguyên nhất định của người dùng. Tuy nhiên, với sự tiện lợi của mình, các trang web dần nhận ra có thể sử dụng framework này đối với việc định danh người dùng dịch vụ thông qua các thông tin được xác thực bởi bên cung cấp dịch vụ OAuth. 

**Note**: Thông thường khái niệm OAuth được nhắc tới sẽ là nói về OAuth 2.0. Tuy nhiên, hiện nay vẫn còn một số ít sử dụng các cơ chế thấp hơn như OAuth 1a. OAuth 2.0  được viết mới hoàn toàn thay vì đi lên từ bản 1 nên 2 phiên bản tuy cùng là OAuth nhưng lại hoàn toàn khác nhau. Nếu chỉ nhắc tới OAuth mà không nói gì thêm, ta có thể mặc định là OAuth 2.0.

### 2. OAuth Roles

Theo định nghĩa của IETF, trong OAuth có tất cả 4 roles:
- Resource owner: là người dùng sở hữu tài nguyên, thường được hiểu là end-user.
- Resource server: là nơi mà các tài nguyên lưu trữ. Được truy cập và phản hồi lại thông qua các cơ chế xác thực như access token.
- Client: Là dịch vụ gửi yêu cầu truy cập tới tài nguyên đại diện cho resource owner và các xác thực của nó.
- Authorization server: Dịch vụ cung cấp access token cho client sau khi đã xác minh thành công người dùng và đạt được xác thực quyền truy cập vào tài nguyên.

Trên thực tế,  authorization có thể nằm trên cùng một server với resource server hoặc không. Một authorization server có thể cung cấp access token cho nhiều resource server.

### 3. OAuth Grant Types
OAuth grant type mô tả trình tự chính xác các bước trong quá trình OAuth. Client cũng sử dụng trình tự này mà quyết định quá trình giao tiếp với authorization server nên OAuth grant type còn được gọi là OAuth Flows.

Việc triển khai OAuth là muôn màu muôn vẻ nên OAuth grant type cũng đa dạng vô cùng. Có thể tới vài dạng phổ biến nhất như:
- Authorization Code grant type
- Client Credentials grant type
- Device Code grant type
- Refresh Token grant type
- Implicit grant type

Trong bài này mình sẽ nói chủ yếu về Authorization code grant type và implicit grant type vì độ phổ biến của 2 kiểu này khá cao.

#### a. Authorization code grant type
Trong kiểu grant type này, client sẽ trao đổi authorization code để lấy được access token. Quá trình này có thể được mô tả trong mô hình dưới đây:

![](https://images.viblo.asia/9a1c269d-6b47-48fd-8bcf-e099a5488fb4.jpg)

Giải thích từng bước của quá trình:

##### 1. Client gửi một request tới server authentication:

```http
GET /authorization?client_id=12345&redirect_uri=https://client-app.com/callback&response_type=code&scope=openid%20profile&state=ae13d489bd00e3c24 HTTP/1.1
Host: oauth-authorization-server.com
```

Trong đó bao gồm các tham số khá đặc trưng như:

- *clientid*: 1 đoạn mã định danh duy nhất của client, được tạo khi client đăng kí với dịch vụ authorization
- *redirecturi*:  là uri mà browser sử dụng để redirect tới sau khi nhận được authorization code. Thường gọi là *callback URI*
- *responsetype*: là kiểu trả về mà client muốn. Ở đây là *code*.
- *scope*: các nhóm dữ liệu, tài nguyên mà client muốn truy cập tới. Tùy theo từng dịch vụ OAuth mà có thể khác nhau.
- *state* (optional): Là một giá trị duy nhất và không đoán được. Sẽ được gửi lại trong các response và request khác như callback request giống như 1 csrf token.

Ví dụ đăng nhập với facebook (facebook sử dụng là openid, tuy nhiên cơ chế không quá khác biệt) request sẽ dạng như thế này:

![](https://images.viblo.asia/50ada46b-c82f-4ed2-b3dd-6b54ff6606d2.png)

##### 2. Người dùng đăng nhập và cho phép quyền truy cập

Sau khi nhận được request khởi tạo trên, browser sẽ redirect người dùng tới 1 trang đăng nhập vào hệ thống cung cấp OAuth:

![](https://images.viblo.asia/9c1d6670-7094-4b7c-8daf-ffdcc312dd33.png)

Sau khi xác minh người dùng thành công, authorization server sẽ hỏi người dùng về có cung cấp các quyền cụ thể cho ứng dụng client hay không:

![](https://images.viblo.asia/b62d7db7-18f5-45c1-9c0e-da642b03cc9f.png)

Nếu người dùng đồng ý thì quá trình sẽ tiếp tục sang bước tiếp theo

##### 3. Authorization server gửi authorization code tới cho client
Sau khi có được sự đồng ý của người dùng cho phép truy cập các tài nguyên, authorization server sẽ gửi lại client 1 đoạn authorization code

![](https://images.viblo.asia/6f131a9e-f8a0-4487-9380-b76955c9530c.png)

##### 4. Request access token

Khi đã có được authorization code, client sẽ thực hiện request lấy access token từ authorization server. Request này sẽ được tạo trong một kênh riêng không đi qua browser. Client_secret cũng sẽ được truyền qua kênh này.

##### 5. Client nhận access token 

Khi authorization server nhận được request của client, nó sẽ phản hồi lại 1 access token tương ứng với authorization code được gửi lên

##### 6. Thực hiện API call

Sau khi đã có được access token, giờ client có thể request tới tài nguyên cần thiết để lấy được tài nguyên.

##### 7. Nhận dữ liệu cần thiết

Lúc này resource server dựa vào access token của client mà trả về các dữ liệu tương ứng.

#### Ưu điểm
Dựa theo mô hình của authorization code grant type, tất cả các dữ liệu quan trọng (ví dụ như access token) đều không đi qua browser mà thông qua một kênh riêng giữa client và authorization server. Điều này giúp tăng tính bảo mật trong quá trình xác thực OAuth. Ngoài ra, client secret cũng sử dụng kênh này để truyền và gửi nên có thể đảm bảo tính an toàn của secret này.

#### Nhược điểm
Nhược điểm duy nhất ở đây là việc triển khai có chút phức tạp hơn so với 1 số kiểu khác.

#### b. Implicit grant type
Implicit grant type đơn giản hơn khá nhiều so với authorization code grant type. Lí do là nó bỏ qua việc request authorization code mà trực tiếp request lấy access token từ phía authorization server. Mô hình của implicit grant type có thể hiểu đơn giản như sau:

![](https://images.viblo.asia/1f2077ae-8d62-4328-b0b8-3c24e9240a9a.jpg)

##### Ưu điểm
Đơn giản, dễ triển khai

##### Nhược điểm
Tất cả các request được gửi qua browser thay vì 1 kênh riêng giữa client và authorization server. Điều này dẫn tới việc các dữ liệu của người dùng và access token có thể bị tấn công, đánh cắp. Ngoài ra việc bảo vệ client secret cũng không hề dễ dàng.


## II. Những vấn đề bảo mật cần cân nhắc khi sử dụng OAuth 2.0
Đối với một framework mạnh mẽ và linh hoạt như OAuth 2.0, vấn đề bảo mật cần cân nhắc đến rất nhiều các yếu tố. Các yếu tố mình đề cập ở dưới đây là các yếu tố được chỉ ra trong [RFC 6749 về OAuth 2.0](https://tools.ietf.org/html/rfc6749#section-10).
### 1. Xác minh người dùng
- Các thông tin xác thực người dùng **PHẢI LUÔN LUÔN** được bảo mật
- Khuyến khích sử dụng xác thực đa yếu tố
- **KHÔNG ĐƯỢC** lưu mật khẩu hay các thông tin định danh khác ở ứng dụng native hay user-agent-based với mục đích xác thực
- Hạn chế tối đa việc để lộ bất cứ thông tin định danh nào của người dùng (code, refresh token...)
- ...
### 2. Giả mạo người dùng
- Authorization server **phải** xác thực người dùng bất cứ khi nào có thể.
- Authorization server nên cho người dùng biết về ứng dụng client, scope và thời gian ủy quyền với client.
- Authorization server không nên tự động xử lí các yêu cầu ủy quyền lặp lại.
- ...
### 3. Access tokens
- Access token phải được và luôn được bảo mật trong lưu trữ và truyền tải
- Access token chỉ được phép truy cập bởi authorization server, resource server với access token hợp lệ và người dùng sở hữu access token.
- Access token phải được truyền tải trên giao thức TLS.
- Access token phải không được tạo mới, sửa hay đoán được giá trị
- Access token nên được ủy quyền ở mức tối thiểu
- ...
### 4. Refresh tokens
- Refresh token phải được và luôn được bảo mật trong lưu trữ và truyền tải
- Refresh token chỉ được phép truy cập bởi authorization server và người dùng sở hữu access token.
- Refresh token phải được truyền tải trên giao thức TLS.
- Authorization server phải đảm bảo refresh token tương ứng với định danh của người dùng khi người dùng đã xác thực
- Nếu người dùng không thể xác thực, authorization server phải có các cơ chế khác để đảm bảo refresh token khoong bị lợi dụng
- Refresh token phải không được tạo mới, sửa hay đoán được giá trị
- ...
### 5. Authorization codes
- Việc truyền tải authorization code phải trên một kênh bảo mật
- Client phải đảm bảo redirect uri phải xác thực qua TLS
- Nếu client sử dụng authorization code để làm phương thức xác thực tài nguyên của mình, phải đảm bảo mọi thức truyền tải trên giao thức TLS.
- Authorization code phải có tuổi đời ngắn và dùng một lần
- Nếu có thể xác thực người dùng, client phải xác thực chính xác người dùng và authorization code là tương ứng với nhau.
### 6. Việc xử lí redirect URI trong Authorization codes 
- Redirect URI là một điểm nhạy cảm mà hacker rất dễ lợi dụng để tấn công cơ chế OAuth
- Authorization server phải yêu cầu public client
- Authorization server nên yêu cầu client đăng kí redirect URI 
- Redirect URI phải được kiểm tra, đối chiều với redirect URI client đã đăng kí
### 7. Mật khẩu của resource owner
- Hạn chế tối đa việc sử dụng resource owner password credentials grant type
- Sử dụng các kiểu grant type khác nếu có thể
### 8. Tính bảo mật của request
- Access tokens, refresh tokens, resource owner passwords, and client credentials không được truyển tải dưới dạng cleartext
- Authorization code không nên được truyền đi dưới dạng cleartext
- Các tham số có thể truyền tải hoặc lưu trữ không an toàn như *state* hay *scope* không nên chứa các thông tin nhạy cảm của client hay resource owner dưới dạng cleartext
### 9. Xác thực endpoint
- Tất cả request giữa các endpoints phải truyền tải trên giao thức TLS
- Client phải xác nhận đúng chứng chỉ TLS của authorization server 
### 10. Tấn công "đoán" thông tin xác thực
- Authorization server phải đảm bảo hacker không thể đoán được giá trị của access tokens, authorization codes, refresh tokens, resource owner passwords, and client credentials
- Xác suất kẻ tấn công đoán được access token phải nhỏ hơn $2^{-128}$ và được khuyến khích nên nhỏ hơn $2 ^ {-160}$
- Authorization server phải có các cơ chế bổ sung nhằm đảm bảo xác thực của end-user.
### 11. Tấn công lừa đảo (phishing)
- Nhà cung cấp dịch vụ nên có các cơ chế để người dùng hiểu biết hơn về các tấn công lừa đảo
- Nên có các cơ chế xác thực đa yếu tố
- Để hạn chế phishing attack, authorization server phải sử dụng giao thức TLS cho tất cả các endpoint có tương tác với end-user.
### 12. Cross-site request forgery (CSRF)
- Authorization server phải có các cơ chế bảo vệ khỏi các tấn công CSRF cho redirect_uri
- Nên sử dụng tham số *state* như một csrf token cho các request 
- Giá trị của csrf token phải đảm bảo là không thể đoán được
- Trạng thái xác thực của user-agent chỉ có thể được truy cập bởi client và user-agent (được bảo vệ bới Same-Origin Policy)
### 13. Click-jacking 
- Ứng dụng native nên sử dụng một browser ngoài thay vì browser nhúng để thực hiện xác thực
- Đối với các browser đời mới, sử dụng header *x-frame-options* để ngăn việc sử dụng iframe
- Đối với các browser phiên bản thấp hơn, có thể sử dụng kĩ thuật JavaScript frame-busting (tuy nhiên không đảm bảo với tất cả browser)
### 14. Code injection và Input validation
- Authorization server phải có các cơ chế kiểm tra, xử lí, xác thực các giá trị được gửi lên từ phía client, đặc biệt với các tham số *state* và *redirect_uri*
### 15. Open redirect
- Authorization server phải có các cơ chế kiểm tra, xử lí, xác thực các giá trị được gửi lên từ phía client, đặc biệt với các tham số *state* và *redirect_uri*

### 16. Sử dụng access token sai mục đích trong implicit flow
- Access token của người dùng có thể bị đánh cắp bằng nhiều cách như phishing, CSRF attack ...
- Trong implicit flow, authorization rất khó xác định thực sự ai đang sử dụng access token
- Kẻ tấn công với access token đánh cắp từ người dùng có thể lấy được các thông tin của người dùng từ phía resource server

==> Vì cơ chế của implicit flow rất thiếu an toàn, khuyến cáo tốt nhất là không sử dụng grant type loại này

**P/s:** Trong phần này, mình nói qua về OAuth 2.0 và các yếu tố liên quan tới security của framework này. Phần 2 mình sẽ demo một số kiểu tấn công có thể thực hiện để tấn công vào cơ chế xác thực này dựa trên một số lỗ hổng đã được đề cập ở trên.


## References
- [https://tools.ietf.org/html/rfc6749](https://tools.ietf.org/html/rfc6749)
- [https://portswigger.net/web-security/oauth](https://portswigger.net/web-security/oauth)