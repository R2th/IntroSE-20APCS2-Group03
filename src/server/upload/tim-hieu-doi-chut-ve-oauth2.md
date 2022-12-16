Chắc hẳn một trong số các bạn cũng đã từng nghe qua khái niệm **OAuth** trước đây. Về cơ bản, **OAuth** là một phương thức xác thực giúp một ứng dụng bên thứ 3 có thể được ủy quyền bởi người dùng để truy cập đến tài nguyên người dùng nằm trên một dịch vụ khác. OAuth là từ ghép của O (Open) và Auth tượng trưng cho:
- **Authentication:** *xác thực* người dùng.
- **Authorization:** *cấp quyền* truy cập đến tài nguyên mà người dùng hiện đang nắm giữ.

**OAuth2** là bản nâng cấp của **OAuth1.0**, là một  giao thức chứng thực cho phép các ứng dụng chia sẻ một phần tài nguyên với nhau mà không cần xác thực qua **username** và **password** như cách truyền thống từ đó giúp hạn chế được những phiền toái khi phải nhập username, password ở quá nhiều nơi hoặc đăng ký quá nhiều tài khoản mật khẩu mà chúng ta chẳng thể nào nhớ hết.

# Các vai trò trong OAuth2
Trong **OAuth2** định nghĩa 4 vai trò:
- **Resource owner:** là những người dùng có khả năng cấp quyền truy cập, chủ sở hữu của tài nguyên mà ứng dụng muốn lấy.
- **Resource server:** nơi lưu trữ các tài nguyên, có khả năng xử lý yêu cầu truy cập đến các tài nguyên được bảo vệ. 
- **Client:** là những ứng dụng bên thứ 3 muốn truy cập vào phần tài nguyên được chia sẻ với tư cách của người sở hữu (resource owner) và tất nhiên trước khi truy cập ứng dụng cần được sự ủy quyền của *user*.
- **Authorization server:** làm nhiệm vụ xác thực, kiểm tra thông tin mà user gửi đến từ đó cấp quyền truy cập cho ứng dụng bằng việc sinh ra các đoạn mã **access token**. Đôi khi *authorization server* cũng chính là *resource server*.

# Token
**Token** là một đoạn mã được sinh ra ngẫu nhiên bởi **Authorization server** khi có yêu cầu được gửi đến từ **Client**.

Có 2 loại token:
- Access token
- Refresh token

## 1.Access token
Là một đoạn mã dùng để xác thực quyền truy cập, cho phép ứng dụng bên thứ 3 có thể truy cập vào những dữ liệu của người dùng trong một phạm vi nhất định mà nó cho phép. Token này được gửi bởi **Client** như một tham số được truyền vào *hreader* trong mỗi request khi cần truy cập đến tài nguyên trong **Resource server**. 

Nếu để lộ mất *access token* thì cũng có thể coi như bị lộ *password* bởi có thể lợi dụng nó để lấy được những tài nguyên mà nó đang bảo vệ. Vì vậy, *access token* có một thời gian sử dụng nhất định (2 giờ, 2 tháng...) tùy thuộc vào nhu cầu sử dụng cũng như yêu cầu về tính bảo mật. *Access token* chỉ được sử dụng một lần duy nhất, khi nó hết hiệu lực **Client** sẽ phải gửi lại yêu cầu đến **Authorization server** để lấy một mã *access token* mới.

## 2. Refresh token
Được sinh ra bởi **Authorization server**, cùng lúc với *access token* nhưng lại khác nhau về chức năng. *Refresh token* sẽ được gửi đi để lấy về một *access token* mới khi nó hết hạn, cũng chính vì vậy nó có thời gian hiệu lực lâu hơn *access token*. Với *access token* thời gian hiệu lực có thể là 2 giờ thì *refresh token* có thể lên đến 10 giờ. 

Việc có mặt của *refresh token* giúp cho **Client** có thể lấy lại được *access token* mà không cần phải nhận xác thực lại từ phía người dùng. Nếu người dùng đăng xuất, *refresh token* cũng sẽ bị xóa theo.

# Scope
**Scope** là một tham số được định nghĩa trong **Authorization server** dùng để giới hạn quyền, phạm vi tài nguyên mà **access token** được phép truy cập. **Client** sẽ xác định sử dụng *scope* nào khi yêu cầu sinh ra một đoạn **access token**.


# Phân loại
**OAuth2** có 4 loại định danh chính:
- **Authorization Code**
- **Resource Owner Password Credentials**
- **Implicit**
- **Client Credentials**

Trước khi đi vào chi tiết từng loại của OAuth2, chúng ta cùng tìm hiểu qua 2 thuật ngữ dùng để xác nhận Client với Authorization server:
- **Client Identifier (Client ID):** chuỗi ký tự được sử dụng để định danh ứng dụng.
- **Client Secret:** là một chuỗi ký tự dùng cho việc xác thực **Client** khi ứng dụng yêu cầu truy cập thông tin tài khoản người dùng. Chuỗi này được giữ bí mật giữa Client và Authorization Server.

Có thể hiểu **Client ID** là *username*, **Client Secret** là *password* của Client đối với Authorization cũng được. :D

## 1.Authorization Code
Đây là loại phổ biển nhất thường được sử dụng khi **Client** là một máy chủ web (Server-side Application). Nó cho phép lấy về một access token dài hạn (long-lived) và có thể lấy về một access token mới thông qua fresh token (nếu có). 

**Ví dụ:**
- Resource Owner: Là bạn
- Resource Server: Máy chủ Google
- Client: Bất kỳ website nào
- Authorization Server: Máy chủ Google


**Cách hoạt động:**
![](https://images.viblo.asia/63abac71-cc5d-45c0-b659-d8f165fad30f.png)

- Người dùng click vào nút đăng nhập trên ứng dụng web.
- Ứng dụng web chuyển hướng người dùng đến **Authorization server** để bắt đầu quá trình nhận authorization code.
- Người dùng được chuyển đến trang đăng nhập.
- Người dùng nhập thông tin đăng nhập để xác thực ví dụ như nhập *username* và *password*.
- Authorization server sẽ xác thực thông tin đăng nhập và chuyển hướng người dùng đến *"redirect uri"* của ứng dụng (nơi ứng dụng bắt thông tin trả về từ Authorization server) kèm theo một đoạn *"authorization code"*.
- Ứng dụng (Client) gửi request đến Authorization server gồm Client ID, Client sercret (đã khai báo với Authorization server trước đó) cùng với đoạn mã authorization code vừa nhận.
- Authorization server sẽ xác minh thông tin mà Client vừa gửi.
- Nếu thông tin mà Client gửi lên là hợp lệ, Authorization sẽ trả về access token cùng với refresh token (nếu có).
- Ứng dụng gửi request tới Resource server kèm theo Access token vừa nhận được.
- Resource server kiểm tra access token, nếu hợp lệ thì trả về cho Client tài nguyên tương ứng mà access token cho phép truy cập.

## 2. Resource Owner Password Credentials
Loại này cho phép các ứng dụng bên thứ 3 có thể lấy về token bằng cách sử dụng các thông tin từ tài khoản của người dùng. Loại này được đánh giá là không được bảo mật hơn *Authorization Code*, chỉ nên dùng ở một số trang web lớn hoặc thực sự tin tưởng bởi vì nó trực tiếp xử lý thông tin tài khoản của người sử dụng.

**Cách hoạt động:**
![](https://images.viblo.asia/f1a02f5f-30d5-4cd7-a52f-76df40d9bb8b.png)

- Người dùng nhập thông tin đăng nhập (ví dụ: username, password...) vào form trên chính ứng dụng đang dùng (Client).
- Ứng dụng(Client) gửi thông tin đăng nhập cùng Client ID, Client secret lên Authorization server.
- Authorization server kiểm tra thông tin đăng nhập của người dùng cũng như định danh mà Client gửi lên, nếu tất cả là hợp lệ thì sẽ trả về access token cùng với refresh token (nếu có).
- Ứng dụng sử dụng access token vừa nhận được để truy cập đến Resource server.

## 3. Implicit
Loại này thường được sử dụng cho các ứng dụng mobile hoặc ứng dụng chạy trên trình duyệt web. Trong loại này, access token được gửi thẳng đến ứng dụng thông qua URI trên trình duyệt (browser). Phương thức này hoàn toàn tin tưởng vào URI đã đăng ký trước đó mà không cần thông qua bất kỳ phương thức xác thực nào đối với phía ứng dụng (Client).

Loại xác thực này không hỗ trợ *refresh token*.

![](https://images.viblo.asia/bb9dc572-3a6b-40d8-807a-d020c9ca3a4a.png)


**Cách hoạt động:**
- Người dùng click vào đăng nhập bên phía ứng dụng web
- Người dùng được chuyển hướng bởi trình duyệt tới Authorization server.
- Nếu người dùng cho phép truy cập, Authorization server chuyển hướng về lại ứng dụng với một đoạn access token được gửi trong đoạn URI. Ví dụ:
    ```
    https://example.com/oauth-callback#access_token=MNBD2DAasd99
    ```
- Bây giờ ứng dụng (Client) có thể truy vấn tới Resource server thông qua access token vừa lấy được.


## 4. Client Credentials
Loại ủy quyền này nhằm phục vụ cho mục đích giúp Client xác thực chính nó với Authorization server để truy cập vào chính những tài nguyên mà nó hiện đang nắm giữ.

Cũng như loại trên, Client Credentials không hỗ trợ *refresh token*.

![](https://images.viblo.asia/3c30ebfc-c473-4391-a21d-acec8f99b548.png)

**Cách hoạt động:**
- Client gửi *Client ID* và *Client secret* của chính mình đến Authorization server.
- Authorization server xác thực thông tin được gửi đến, nếu xác nhận đó là Client thì gửi lại access token.
- Client dùng access token đó truy cập đến Resource server để lấy tài nguyên.

# Kết luận 
Trên đây là những phần cơ bản về OAuth2 mà mình có thể tìm hiểu được, hy vọng chúng sẽ giúp ích được cho các ban phần nào.

Bài viết dựa trên những hiểu biết cá nhân nên không tránh khỏi những thiếu sót, mọi người có thắc mắc hay phản hồi gì thì hãy comment xuống bên dưới để mình có thể giải đáp cũng như bổ sung để bài viết được hoàn thiện hơn. 

Cảm ơn các bạn đã theo dõi bài viết.

# Tham khảo 
https://auth0.com/docs