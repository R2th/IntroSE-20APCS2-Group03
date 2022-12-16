### Mở đầu.
JWT(JSON Web Token) là công nghệ phổ biến ngày nay, nhưng cũng đồng thời cũng gây tranh cãi rất nhiều.

Có nhiều người nói đừng bao giờ dùng nó, trong khi những người khác lại nói nó thật tuyệt vời. Vậy sự thật là gì? Nên hay không nên dùng? Đó là lý do chúng ta ở đây.

### 1. Giới thiệu ngắn gọn về JWT.
JWT về mặt kỹ thuật là một cơ chế để xác minh chính chủ một số dữ liệu JSON. Nó là một chuỗi biến đổi, có thể chứa một lượng dữ liệu không giới hạn (không giống như một cookie) và nó đã được mã hóa bằng chữ ký.

Khi một máy chủ nhận được JWT, nó có thể đảm bảo dữ liệu mà nó chứa có thể được tin cậy bởi vì nó đã được xác thực với chữ ký đã được lưu trữ. Không yếu tố trung gian nào có thể sửa đổi JWT sau khi nó được gửi.

Điều quan trọng cần lưu ý là JWT đảm bảo quyền sở hữu dữ liệu nhưng không mã hóa; bất kỳ ai cũng có thể xem dữ liệu JSON chúng ta lưu trữ trong JWT một khi họ có được JWT đấy, vì nó chỉ được tuần tự hóa, không được mã hóa. Vì lý do này, nên sử dụng JWT với HTTPS.

### 2. Vậy nó tốt trong trường hợp nào?

JWT là một công nghệ tuyệt vời để xác thực API và ủy quyền từ máy chủ đến máy chủ.

Nó không phải là một lựa chọn tốt cho các session.

### 3. Sử dụng JWT để xác thực API

Ứng dụng nhiều nhất của JWT Token, và mục đích duy nhất bạn nên sử dụng JWT là dùng nó như một cơ chế xác thực API.

Điều này hiện nay là quá phổ biến và được sử dụng rộng rãi, kể cả Google cũng sử dụng JWT để xác thực các APIs của họ.

Ý tưởng rất đơn giản:
* Bạn sẽ nhận được secret token từ service khi bạn thiết lập API
![](https://images.viblo.asia/caa3f8b3-9d65-496b-a831-9fd4c5150648.png)
* Ở phía client, bạn sẽ sử dụng secret token để kí tên và gắn nó vào  token (hiện nay có rất nhiều thư viện hỗ trợ việc này)
* Bạn sẽ gắn nó như một phần của API request và server sẽ biết nó là ai dựa trên request được ký với 1 unique identifier duy nhất:

![](https://images.viblo.asia/977f88bf-8adf-4a4b-bc88-e7113d310b60.png)

### 4. Vô hiệu hoá 1 single token
Làm thế nào bạn có thể làm mất hiệu lực môt single token? Một cách đơn giản là thay đổi secret key của server, làm mất hiệu lực tất cả các token. Nhưng làm vậy sẽ khiến khách hàng choáng váng, không hiểu vì sao mà token của họ “toang” như vậy.

Một cách khác để xử lý vấn đề này là thêm yếu tố thời gian vào đối tượng người dùng. Mã token tự động lưu trữ giá trị created at trong thuộc tính iat. Mỗi lần bạn kiểm tra token, bạn chỉ cần so sánh giá trị created at với giá trị thời gian ở đối tượng user.

Để vô hiệu hóa token, chỉ cần cập nhật giá trị phía máy chủ và nếu iat cũ hơn, bạn có thể reject token.

### 5. Lưu trữ JWTs an toàn
JWT cần được lưu trữ ở nơi an toàn bên trong trình duyệt của người dùng.

Nếu bạn lưu trữ nó bên trong localStorage, nó có thể truy cập bằng bất kỳ script nào trong trang của bạn (điều này thực sự tệ, vì một cuộc tấn công XSS có thể cho phép kẻ tấn công bên ngoài lấy được token).

Đừng lưu token trong localStorage (hoặc sessionStorage). Nếu bất kỳ mã script bên thứ ba nào bạn đưa vào trang của mình bị xâm phạm, nó có thể truy cập tất cả các token của người dùng.
JWT cần được lưu trữ bên trong httpOnly cookie, một loại cookie đặc biệt mà chỉ có thể gửi trong các yêu cầu HTTP đến server và nó không bao giờ có thể truy cập (cả để đọc hoặc viết) từ JavaScript chạy trên trình duyệt.
### 6. Sử dụng JWT để trao đổi thông tin an toàn giữa hai máy chủ
Vì JWT đã được ký, người nhận có thể chắc chắn rằng khách hàng thực sự là người mà họ nghĩ.

### 6.1. Sử dụng JWT cho xác thực SPA
JWTs có thể được sử dụng như một cơ chế xác thực không cần đến cơ sở dữ liệu. Server có thể tránh sử dụng cơ sở dữ liệu vì dữ liệu lưu trữ trong JWT được gửi cho khách hàng là an toàn.

### 6.2. Sử dụng JWT để uỷ quyền hoạt động trên các máy chủ
Giả sử bạn đăng nhập vào 1 máy chủ, SERVER1, sau khi đăng nhập thành công thì được chuyển hướng đến một máy chủ khác SERVER2 để thực hiện một số xử lý.

SERVER1 có thể cấp cho bạn 1 JWT để ủy quyền cho phép bạn kết nối đến SERVER2. Hai máy chủ không cần chia sẻ cùng 1 session hoặc bất cứ điều gì để xác thực bạn. Sử dụng token để xử lý trường hợp này là rất hoàn hảo.
### 
### 7. Session tokens cho các regular web apps
Bạn có thể nghĩ rằng việc sử dụng JWTs cho session token là một ý tưởng hay lúc đầu, chẳng hạn:

Bạn có thể lưu trữ bất kỳ loại thông tin user nào trên client
Server có thể tin tưởng client vì JWT đã được ký và không cần phải gọi cơ sở dữ liệu để lấy thông tin bạn đã lưu trữ trong JWT
Bạn không cần phải kết hợp các sessions trong cơ sở dữ liệu tập trung khi bạn gặp vấn đề cần horizontal scaling
Cuối cùng, nếu bạn đã có cơ sở dữ liệu cho ứng dụng của mình, chỉ cần sử dụng bảng session và sử dụng các regular session được hỗ trợ bởi các framework server side là đủ.

Tại sao? Sẽ mất nhiều công sức nếu sử dụng JWT: vì chúng được gửi trong mọi request đến máy chủ và nó luôn luôn mất công sức hơn là sử dụng server-side sessions.

Ngoài ra, mặc dù các rủi ro bảo mật được giảm thiểu khi gửi JWT bằng HTTPS, nhưng luôn luôn tồn tại khả năng nó bị chặn, dữ liệu bị đánh cắp và “toang” -> khách hàng của bạn sẽ bị “lột trần”.

### 8. Cách chọn thư viện JWT hoàn hảo
Hãy vào trang jwt.io và xem danh sách thư viện. Nó có danh sách các thư viện phổ biến nhất để triển khai JWT.

Chọn ngôn ngữ bạn dùng và chọn thư viện mà bạn thích, thư viện tốt nhất là thư viện có số lượng tích xanh nhiều nhất.

![](https://images.viblo.asia/bea2a422-6947-4ac2-a914-94075a86621c.png)
### 9. Kết luận
JWT là một tiêu chuẩn rất phổ biến mà bạn có thể sử dụng để xác thực requests bằng cách sử dụng chữ ký và trao đổi thông tin giữa các bên. Hãy chắc chắn rằng bạn lúc nào thì sử dụng nó, lúc nào thì không và cách ngăn chặn các vấn đề bảo mật cơ bản nhất.

Nguồn: https://blog.logrocket.com/jwt-authentication-best-practices/