## Tóm tắt
`Cookie, session, token, JWT` nên lưu ở đâu, bạn cần quan tâm những vấn đề gì liê quan đến *security*? Trong bài viết này, mình sẽ chia sẻ những điều mình biết về nó.

Mình sẽ hướng đến các khái niệm quan trọng, cần ghi nhớ khi xử lý `user authentication` trong mô hình cơ bản nhất là **Client - Server**:

![Client-Server](https://images.viblo.asia/d0bbc6c5-67cd-4cc3-8e6f-8abf2107a457.png)

## Các vấn đề tiên quyết giúp cải thiện Security

### Giao thức được mã hóa httpS
- Việc `authentication` sử dụng **HTTP headers** và trao đổi các dữ liệu nhạy cảm (*password, access toke, ...*), vì vậy chúng nên được mã hóa giao thức giao tiếp, nếu không thông tin sẽ bị đánh cắp, hoặc thay đổi khi chưa đến được với **server/ client**.

### Không sử dụng URL query params để trao đổi dữ liệu nhạy cảm
- `URL query params` có thể tạo ra các logs ở server, browser, lịch sử ở trình duyệt, các hacker có thể lấy các dữ liệu đó để tìm ra các lỗ hổng của hệ thống.
- `URL` có chứa `authentication tokens` sẽ được copy và sử dụng bởi tất cả mọi ngừơi, gây ra việc chiếm quyền điều khiển ngoài ý muốn (**session-hijacking**).
- Việc này cũng có thể khiến `URL` bị quá dài, vượt quả giới hạn của *browser, servers*.

### Tránh bị tấn công brute force
- Các hacker sẽ cố gắng tìm ra *password, token, username* bằng việc thử hết tất cả các *password, token, username* có thể.
- Bổ sung chức năng giới hạn số lượt thử ở trên **backend server** sẽ giúp hạn chế tối đa quá trình tấn công này.
- **Ban** những user thường xuyên tạo ra quá nhiều server errors.
- Đừng để lộ thông tin về công nghệ được sử dụng trong ứng dụng, ví dụ như bạn nên xóa `X-Powered-By` =))

### Cập nhật dependencies đều đặn.
- Nếu bạn không sử dụng 1 **PaaS** trong ứng dụng, hay giữ cho **server** của bạn luôn luôn sử dụng các phiên bản **dependencies** mới nhất có thể.
## Authentication
Có 2 cơ chế chính để thực thi việc xác thực 1 client trong `REST API`:
- Bearer Token
- Authentication cookie

### Bearer Token
#### `Bearer token` là gì?
`Bearer token` là giá trị được truyền vào `Authentication` header của 1 **HTTP Request**. Nó không được lưu tự động, không hết hạn và không gắn liền với *domain*. Nó chỉ là 1 giá trị =))

> GET https://www.example.com/api/users 
> 
> Authorization: Bearer bearer_token_value

Để có 1 ứng dụng phi trạng thái, chúng ta thường sử dụng [JWT](https://jwt.io/introduction/) cho việc tạo ra **token**. Hiểu đơn giản, `JWT` gồm 3 phần:

- **Header**
- **Payload** và **expiration time** (optional)
- **Signature**

JWT là một mật mã an toàn, trong quá trình trao đổi thông tin khiến việc `authentication` trở nên **stateless**. `Signature` sẽ chứng thực cho **payload** không bị chỉnh sửa bằng các thuật toán *symmetric* hoặc *asymmetric (RSA)*. `Header` chứa thông tin **public key** để xác minh `Signature`. Ứng dụng phía **Client**, lần đầu request lên server, sẽ lấy về một `JWT token` thông qua việc đăng nhập *username, password*. Sau đó, thông qua **Javascript** để đính kèm `JWT token` bên trong mỗi **HTTP header**. Server sẽ xác thực `signature` tương ứng với `payload`, nếu chúng trùng nhau, chúng ta có thể tin tưởng nội dung của `Payload`.

---
#### Các case nên sử dụng Bearer Token
- Bạn muốn bảo vệ traffic giữa một **browser** và **backend**.
- Bảo vệ traffic giữa một **mobile application**, **desktop application** và **backend**.
- Bảo vệ traffic giữa 2 server **backend** (`M2M`), kiểm soát các thành phần khác nhau của server.

#### Nên lưu JWT token ở đâu?

Chúng ta có thể lưu `JWT` ở phía clients (*memory, local/ session cookie,, local storage,...*). Nhưng `JWT` không được khuyến khích lưu ở **local storage** của trình duyệt bởi:

- `JWT token` vẫn còn được lưu lại sau khi người dùng tắt browser nên session vẫn có thể restore cho đến khi `JWT token` hết hạn.
- **Local storage** của trang web có thể bị truy cập từ **Javascript**, như vậy dữ liệu đã không còn được bảo vệ.
- Nó không thể sử dụng cho **web workers**.

Theo mình, lưu `JWT` ở **session cookie** có lẽ là giải pháp tốt nhất. 

[Thảm khảo thêm](https://auth0.com/docs/security/store-tokens) thông tin về việc lưu token.

#### Các hình thức tấn công cần phòng tránh

**Cross-site Scripting (XSS) attack** là hình thức tấn công thường gặp nhất khi sử dụng **Javascript** để giải quyết các vấn đề bảo mật. Các hacker sẽ lợi dụng các dữ liệu input của người dùng để chèn các đoạn javascript code độc hại nhằm lấy cắp `JWT token` của nạn nhân, sau đó sử dụng để mạo danh người dùng.

Chúng ta có thể giảm thiểu khả năng bị **XSS** bằng cách kiểm soát dữ liệu input của nguời dùng.

### Authentication cookie

`Cookie` là một cặp *name-value*, được lưu trên web browser và chúng có thời gian hết hạn, gặp liền với một **domain**. `Cookie` được tạo bởi *client browser* bằng **Javascript**.

``` javascript
document.cookie = 'my_cookie_name=my_cookie_value'
```
hoặc từ Server thông quan **HTTP Response header**:
```scala
Set-Cookie: my_cookie_name=my_cookie_value
```

**Web browser** tự động gửi `cookie` kèm mỗi request tới` cookie domain`.

```shell
GET https://www.example.com/api/users
Cookie: my_cookie_name=my_cookie_value
```

Thông thường, `Cookie` được sử dụng để lưu một **Session ID**. **Session ID** được quản lý bởi server. Ở đây, mình đang nhắc đến một **stateful** app nơi mà server cần quản lý trạng thái trên server trong khi` JWT token` là **stateless**. Có 2 kiểu `Cookie`:
- **Session cookies**: Cookie này sẽ bị xóa khi nguời dùng tắt ứng dụng bởi vậy nó không cần định nghĩa thời gian hết hạn. Tuy nhiên, web browser có thể sử dụng session để phục hồi, điều này tạo ra các permanent cookie nếu browser không bao giờ đóng. Timeout của session phải được quản lý bởi phía server side.
- **Permanent cookies**: Thay vì hết hạn khi client đóng trình duyệt, permanent cookie hết hạn ở 1 thời điểm được định nghĩa trước (*Expires*) hoặc sau một khoảng thời gian (*Max- Age*).

**Server Cookies** có thể được cấu hình với những options:
- **HttpOnly** cookies: Khiến browser javascript không thể đọc được Cookie này
- **Secure** cookie: Browser sẽ gửi kèm cookie trong mỗi HTTP request chỉ khi request đó được gửi qua giao thức secure như httpS
- **SameSite** cookie: Server sẽ yêu cầu rằng cookie không được gửi thông qua *crosss-site request forgery* để tránh bị tấn công **CSRF**. SameSite cookies vẫn còn đang được thử nghiệm và có những trình duyệt chưa hỗ trợ.

#### Các case nên sử dụng

- Bạn muốn bảo vệ traffic giữa một *browser* và *backend*.
- `Cookies` sẽ không khả dụ và khó khăn để triển khai trên các nền tảng không phải **browser** như **mobile application**.

#### Nên lưu Cookies ở đâu?
Cookies được tự động lưu trên web browser với thời gian hết hạn và chỉ định domain cụ thể.
#### Các hình thức tấn công cần phòng tránh

- **Cross-Site Scripting (XSS)** nếu Cookies không được tạo với **HttpOnly** option: hacker có thể inject Javascript code để lấy cắp `authentication cookie` của nạn nhân. Để giảm thiểu việc bị **XSS**, **HttpOnly** option nên được set trên cookie.
- **Cross-Site Request Frogery (CSRF)** là hình thức tấn công thường gặp khi sử dụng `Authentication cookies`. Để giảm thiểu **CSRF**, **SameSite** option nên được set  trên cookie. Tuy nhiên có những browser vẫn chưa hỗ trợ option này nên còn vài hướng khác để hạn chế: 
- - Giảm thời gian timeout của mỗi session xuống dưới 10 phút hoặc ngắn hơn.
- - Yêu cầu user credentials trên mỗi hành vi của user (ví dụ: Yêu cầu user nhập password vào form khi user muốn đổi email).
- - Gửi cookie 2 lần: Trong lần đầu user truy cập trang web, nó sẽ tạo ra 1 giá trị tạm thời và set nó là cookie ( không có **HttpOnly** option để giá trị đó có thể sử dụng bởi Javascript) trên phía client để thực hiện một **HttpOnly authentication cookie**. Ứng dụng sẽ yêu cầu giá trị cookie tạm thời đó trên mỗi form submission giống như 1 giá trị của form và nó cũng là giá trị cookie. Khi có 1 POST request được gửi tới trang web, request đó chỉ được chấp nhận nếu giá trị trong form và trong cookie giống nhau.

###  Kết hợp cả 2 cơ chế

Sau một hồi lan man, túm lại **Server API** của chúng ta đang cần 1 cơ chế `authentication` mà:
- Support browser và các thành phần thứ 3 có thể gọi tới (**M2M call**).
- Chống được **XSS** và **CSRF**
- `Stateless` nếu có thể.
#### Điều gì sẽ xảy ra nếu đặt JWT token vào trong Cookie để kết hợp ưu điểm của cả hai?
**Server API** nên sử dụng `JWT bearer token` trong *header* của *request*, cũng như `JWT` bên trong `session cookie`. Nếu bạn muốn xác thực để javascript đọc `JWT payload`, bạn nên sử dụng giải pháp [two cookie authentication](https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3) bằng cách gộp 2 loại cookie vào để tránh bị tấn công **XSS**.
![Kịch bản của two cookie authentication](https://images.viblo.asia/1f8cb33e-3561-44de-8e8a-56ffd093a0fe.png)

`JWT` có thể được update trên mỗi request liên tiếp bởi server, cũng như `JWT` bên trong `cookie response` và chúng tự động được lưu bởi browser. Để hạn chế CSRF, các thay đổi sẽ không được thực thi thông qua giao thức **GET**, thay vào đó bạn sử dụng **PUT** hoặc **POST**. Nhưng  thay đổi động tới các vấn đề cần bảo mật cao nên yêu cầu **user credential**. Một `cookie` tạm thời (random number) mà javascript có thể đọc được và chúng được submit trong 1 giá trị hidden của form cùng với form data. **Server** sẽ phải kiểm tra, nếu giá trị trong `cookie` không trùng với giá trị trong form, hành vi user gửi lên sẽ không được thực thi.
![Một giá trị ngẫu nhiên đóng vai trò là Cookie giúp hạn chế CSRF](https://images.viblo.asia/e9fe454c-09a0-4a7d-afe7-2bdd11d7c7f6.png)
## Tổng kết
Tóm lại, chúng ta rút ra được rằng, một authentication flow cho SPA nên tuân theo các bước sau:
- Bước 1: Ứng dụng SPA kiểm tra Cookie với JWT payload có tồn tại không? Nếu có, user đã được đăng nhập, nếu không thì chuyển về trang **/login**. Nếu bạn chỉ dùng HttpOnlyy cookie, SPA nên gửi 1 request đến **/backend/api/me** để biết được user hiện tại là ai hoặc biết được user chưa đăng nhập và hiển thị lỗi nếu thiếu hoặc authentication cookie không khả dụng.
- Bước 2: 
- - Option 1: Trang **/login** ở dưới frontend yêu cầu user credential (username/ password) sau đó gửi chúng đến backend API thông qua 1 AJAX Request. AJAX Response sẽ set authentication cookie với JWT token bên trong.
- - Option 2: Trang **/login** sẽ cung cấp 1 OpenID authentication sử dụng OAuth flow. Giống như việc đăng nhập thông qua 1 bên thứ 3 vậy, trang **/login** sẽ chuyển hướng browser tới trang **/backend/auth/<provider. >**. Sau khi luồng OAuth hoàn thiện, phía backend sẽ set authentication cookie với JWT trong đó trong response. Nó sẽ chuyển hướng browser dưới frontend và SPA sẽ bắt đầu lại từ bước 1