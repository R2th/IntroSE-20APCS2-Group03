Khi làm việc với api, ta có thể sẽ phải làm việc rất nhiều với cơ chế xác thực người dùng. Nó có thể thay đổi tùy theo từng cách sử dụng khác nhau. Bài viết sẽ tìm hiểu về các cách phổ biến để thực hiện authentication khi thực hiện với api. <br>

# 1. Authentication và authorization
Trước khi tìm hiểu về các phương thức, ta sẽ tìm hiểu ngắn gọn sự khác nhau giữa authentication và authorization <br>
**Authentication**: được định nghĩa là khi thực thể chứng minh danh tính là gì hay nói một cách đơn giản là trả lời cho câu hỏi "who you are" <br>
**Authorization** : được định nghĩa là khi thực thể chứng minh có quyền truy cập, đơn giản như kiểu có một cái chìa khóa nhưng chỉ được phép mở một vài cửa trong nhà chứ không được phép mở tất cả các cửa. Hay nói cách khác nó trả lời cho câu hỏi "what you can do" <br>
![](https://images.viblo.asia/e95341d5-3d10-4789-8bb7-a000e86f7fae.png)
# 2. Các phương thức phổ biến dùng authentication
## 2.1 Basic Authentication
Đây là phương thức xác thực ít được khuyến khích bởi tình bảo mật của nó không an toàn. Trong phương thức này ta rất dễ dàng thực hiện được như sau. Người gửi (sender) sẽ gửi username, password của mình trong header của request. Username và password phải được mã hóa dưới dạng Base64 để đảm bảo tính an toàn hơn. <br>
Với phương thức này có thể không cần yêu cầu về cookies, session ID... bởi vì chỉ cần sử dụng với http header, không cần đến hỗ trợ từ response khác. Một ví dụng về request header sử dụng phương thức này <br>
```
    Authorization: Basic bG9sOnNlY3VyZQ==
```
Có thể tìm hiểu thêm phương thức này và cách thực hiện tại [đây](https://www.toolsqa.com/postman/basic-authentication-in-postman/)
## 2.2 Bearer Authentication
Phương thức này hay còn được gọi là token authentication có thể hiểu đơn giản là "cấp quyền truy cấp cho người mang (bearer) token này". Bearer token sẽ cho phép truy cập đến một số tài nguyên hoặc url nhất định và thường là một chuỗi string được mã hóa, được sinh ra bởi server trong response để thực hiện request login. <br>
Khi thực hiện bằng phương thức này thì client phải gửi bearer token này trong header để thực hiện request <br>
```
    Authorization: Bearer <token>
```

Cách thức thực hiện với bearer authentication có thể như sau: <br>
Khi user gửi requesst đến server để lấy một token bằng username, password thông qua SSL, server sẽ trả về một chuỗi access token. Access token này chính là bearer token mà client cần phải gửi vào header nếu muốn thực hiện các request khác để server xác thực user đó là đúng. Token này có thể là một chuỗi mã hóa với các thuộc tính của user, vai trò của user đó. Khi server nhận được token này, sẽ giải mã sau đó sẽ thực hiện validate request đó trong ứng dụng xem user có được quyền thực hiện request đó hay không. Token này thường sẽ có hạn (ví dụ: 30 phút sau khi lấy sẽ hết hạn) bởi vì có thể role của user sẽ thay đổi trong quá trình thực hiện. Sẽ có trường hợp ví dụ user đang có role="Admin" chuyển thành "User". Nếu token không hết hạn thì token cũ với role="Admin" vẫn có quyền truy cập với role đó mặc dù đã bị thay đổi. <br>
## 2.3 Api Keys
Phương thức này được tạo ra với mục đích khắc phục những vấn đề của basic authentication. Trong phương thức này, một giá trị key duy nhất sinh (unique key) ra và gán cho user trong lần đầu tiên, biểu thị rằng user đó được xác định. Khi user quay trở lại hệ thống, unique key (có thể được sinh ra từ việc kết hợp giữa thông tin phần cứng, địa chỉ IP và thời gian của server) được sử dụng để chứng minh rằng user là giống với lần đầu tiên. <br>
![](https://images.viblo.asia/d70c0734-bf96-4c06-9b40-3f965a94b065.png)
Rất nhiều api key được gửi dưới dạng là một phần của URL (query string) để giúp nhận biết rằng ai không nên có quyền truy cập. Một lựa chọn tốt hơn là gửi api key trong authorization header, như kiểu `Authorization: Apikey 1234567890abcdef`. <br>

Trong thực tế thì api key xuất hiện dưới dạng như: <br>
. Authorization Header <br>
. Basic Authen <br>
. Body Data <br>
. Query String <br>
Một số trường hợp có thể sử dụng api keys, ví dụ trường hợp có một api được giới hạn với quyền chỉ được đọc. Trong trường hợp dùng với authentication rest api, thì cần phải quan tâm đến vấn đề bảo mật hơn.
## 2.4 OAuth (2.0)
OAuth là viết tắt của Open với Authentication hoặc Authorization. OAuth ra đời nhằm giải quyết các vấn đề trên và xa hơn nữa, đây là một phương thức chứng thực giúp các ứng dụng có thể chia sẻ tài nguyên với nhau mà không cần chia sẻ thông tin **username** và **password**.
OAuth bao gồm bốn vai trò khác nhau: <br>
**Resource Server**: REST API là một ví dụ, một máy chủ HTTP nơi người dùng có thể tạo, sửa đổi hoặc xóa các bản ghi, tài liệu hoặc tệp. <br>

**Resource Owner**: Duy trì quyền sở hữu tài nguyên mà người dùng đã tạo hoặc sửa đổi trên máy chủ và người ủy quyền cho ứng dụng bên thứ 3 truy cập vào tài khoản của họ. Ứng dụng của bên thứ 3 có quyền truy cập hạn chế vào tài khoản của người dùng, dựa trên phạm vi của phạm vi của ủy quyền được cấp. <br>

**Client**: Ứng dụng bên thứ 3 muốn truy cập vào tài khoản người dùng. Trước khi nó có thể làm như vậy, máy chủ resource/authorization và chủ sở hữu tài nguyên phải ủy quyền cho yêu cầu đó. Mọi khách hàng phải được đăng ký với máy chủ authorization và sẽ được cung cấp cho nó thông tin xác thực duy nhất của riêng mình (client_id và client_secret) để xác thực riêng. <br>

**Authorization Server** (thường là giống Resource Server): Đôi khi, ta có thể muốn rút ra khỏi máy chủ authorization từ máy chủ resource và triển khai nó như một phiên bản chuyên dụng, đặc biệt là trong các môi trường phân tán. <br>

Lấy một ví dụ như sau: <br>
Khi ta đăng nhập bằng Facebook hay Gmail, website sẽ dẫn ta đến trang (hoặc phần mềm) Facebook và liệt kê những quyền mà nó cần phải có để cho phép bạn đăng nhập và sử dụng dịch vụ. Nếu ta đồng ý thì lúc này Facebook sẽ phát cho website một cái token Token này chứa một số quyền hạn nhất định giúp cho website có thể xác minh chúng ta là ai cũng như giúp cho website có thể hoạt động được. Nếu website này bị hacker tấn công thì nó chỉ lấy được thông tin hay hoạt động của ta trên website đó mà không ảnh hưởng đến những website khác đang sử dụng. Do đó cách đăng nhập bằng phương thức OAuth này rất an toàn cho người dùng cuối như chúng ta. <br>

### Sơ đồ luồng hoạt động của OAuth2 <br>
1. **Ứng dụng (website hoặc mobile app)** yêu cầu ủy quyền để truy cập vào **Resource Server** (Gmail,Facebook, Twitter hay Github…) thông qua **User**
2. Nếu **User** ủy quyền cho yêu cầu trên, **Ứng dụng** sẽ nhận được ủy quyền từ phía **User** (dưới dạng một token string)
3. **Ứng dụng** gửi thông tin định danh (ID) của mình kèm theo ủy quyền của **User** tới **Authorization Server**
4. Nếu thông tin định danh được xác thực và ủy quyền hợp lệ, **Authorization Server** sẽ trả về cho **Ứng dụng** access_token. Đến đây quá trình ủy quyền hoàn tất.
5. Để truy cập vào tài nguyên (resource) từ **Resource Server** và lấy thông tin, **Ứng dụng** sẽ phải đưa ra `access_token` để xác thực.
6. Nếu `access_token` hợp lệ, **Resource Server** sẽ trả về dữ liệu của tài nguyên đã được yêu cầu cho **Ứng dụng**.
    ![](https://images.viblo.asia/2273b007-7f3e-4993-9dfd-d4f5a60c00da.png)

Trên đây là những gì tìm hiểu về các phương thức khi thực hiện authentication rest api. Hi vọng bài viết giúp ích cho mọi người!
# Reference
https://medium.com/security-operations/what-is-oauth-and-why-should-i-use-it-5aa2f27ce387 <br>
https://blog.restcase.com/4-most-used-rest-api-authentication-methods/ <br>
https://habr.com/en/post/449182/ <br>
https://dzone.com/articles/four-most-used-rest-api-authentication-methods