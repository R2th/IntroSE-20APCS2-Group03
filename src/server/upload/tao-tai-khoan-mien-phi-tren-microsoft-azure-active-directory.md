# Giới thiệu
OpenID Connect là một lớp nhận dạng đơn giản được xây dựng dựa trên giao thức OAuth 2.0. OAuth 2.0 định nghĩa các cơ chế để có được và sử dụng mã thông báo truy cập để truy cập các tài nguyên được bảo vệ, nhưng chúng không xác định các phương thức tiêu chuẩn để cung cấp thông tin nhận dạng. OpenID Connect thực hiện xác thực như một phần mở rộng cho quy trình ủy quyền OAuth 2.0. Nó cung cấp thông tin về người dùng cuối dưới dạng id_token để xác minh danh tính của người dùng và cung cấp thông tin hồ sơ cơ bản về người dùng.

OpenID Connect là đề xuất của chúng tôi nếu bạn đang xây dựng một ứng dụng web được lưu trữ trên máy chủ và được truy cập qua trình duyệt.

# Đăng ký ứng dụng AD tenant
Trước tiên, hãy đăng ký ứng dụng của bạn với Azure Active Directory tenant (Azure AD). Điều này sẽ cung cấp ID ứng dụng cho ứng dụng của bạn, cũng như cho phép nó nhận mã thông báo.

1. Đăng nhập vào [cổng thông tin Azure portal](https://portal.azure.com/) .

2. Chọn người AD tenant cách chọn tài khoản của bạn ở góc trên cùng bên phải của trang, sau đó chọn điều hướng Thư mục chuyển đổi và sau đó chọn đối tượng thuê phù hợp.

3. Bỏ qua bước này nếu bạn chỉ có một Azure AD tenant trong tài khoản của mình hoặc nếu bạn đã chọn Azure AD tenant phù hợp.
Trong cổng thông tin Azure, tìm kiếm và chọn Azure Active Directory .

4. Trong menu bên trái Azure Active Directory , chọn Đăng ký ứng dụng , sau đó chọn Đăng ký mới .

5. Thực hiện theo các hướng dẫn và tạo một ứng dụng mới. Không thành vấn đề nếu đó là ứng dụng web hoặc ứng dụng khách công cộng (di động & máy tính để bàn) cho hướng dẫn này, nhưng nếu bạn muốn các ví dụ cụ thể cho các ứng dụng web hoặc ứng dụng khách công cộng, hãy xem phần khởi động nhanh của chúng tôi.

6. Tên là tên ứng dụng và mô tả ứng dụng của bạn cho người dùng cuối.
Trong Loại tài khoản được hỗ trợ , chọn Tài khoản trong bất kỳ thư mục tổ chức và tài khoản Microsoft cá nhân nào .
Cung cấp URI chuyển hướng . Đối với các ứng dụng web, đây là URL cơ sở của ứng dụng của bạn nơi người dùng có thể đăng nhập. Ví dụ http://localhost:12345 . Đối với máy khách công cộng (thiết bị di động và máy tính để bàn), Azure AD sử dụng nó để trả về các phản hồi mã thông báo. Nhập một giá trị cụ thể cho ứng dụng của bạn. Ví dụ http://MyFirstAADApp .
Khi bạn đã hoàn tất đăng ký, Azure AD sẽ chỉ định cho ứng dụng của bạn một mã định danh khách hàng duy nhất ( ID ứng dụng ). Bạn cần giá trị này trong các phần tiếp theo, vì vậy hãy sao chép nó từ trang ứng dụng.

7. Để tìm ứng dụng của bạn trong cổng thông tin Azure, chọn Đăng ký ứng dụng , sau đó chọn Xem tất cả các ứng dụng .

## Luồng xác thực bằng OpenID Connect
Luồng đăng nhập cơ bản nhất chứa các bước sau - mỗi bước được mô tả chi tiết bên dưới.
![](https://images.viblo.asia/861fceb7-d8e5-40d3-8184-3d1afc88ea87.png)

## Tài liệu siêu dữ liệu OpenID Connect
OpenID Connect mô tả một tài liệu siêu dữ liệu chứa hầu hết thông tin cần thiết cho một ứng dụng để thực hiện đăng nhập. Điều này bao gồm thông tin như các URL sẽ sử dụng và vị trí của các khóa ký công khai của dịch vụ. Tài liệu siêu dữ liệu OpenID Connect có thể được tìm thấy tại:
`https://login.microsoftonline.com/{tenant}/.well-known/openid-configuration`

Siêu dữ liệu là một tài liệu Ký hiệu đối tượng JavaScript (JSON) đơn giản. Xem đoạn trích sau đây để biết ví dụ. Nội dung của đoạn trích được mô tả đầy đủ trong đặc tả OpenID Connect . Lưu ý rằng việc cung cấp ID đối tượng thuê thay vì common thay cho {tenant} ở trên sẽ dẫn đến các URI dành riêng cho người thuê trong đối tượng JSON được trả về.
`{ "authorization_endpoint": "https://login.microsoftonline.com/{tenant}/oauth2/authorize", "token_endpoint": "https://login.microsoftonline.com/{tenant}/oauth2/token", "token_endpoint_auth_methods_supported": [ "client_secret_post", "private_key_jwt", "client_secret_basic" ], "jwks_uri": "https://login.microsoftonline.com/common/discovery/keys" "userinfo_endpoint":"https://login.microsoftonline.com/{tenant}/openid/userinfo", ... }`

Nếu ứng dụng của bạn có khóa ký tùy chỉnh do sử dụng tính năng ánh xạ khiếu nại , bạn phải nối thêm tham số truy vấn có chứa ID ứng dụng để có được jwks_uri chỉ vào thông tin khóa ký của ứng dụng. Ví dụ:
`https://login.microsoftonline.com/{tenant}/.well-known/openid-configuration?appid=6731de76-14a6-49ae-97bc-6eba6914391e jwks_uri https://login.microsoftonline.com/{tenant}/discovery/keys?appid=6731de76-14a6-49ae-97bc-6eba6914391e`

Tham khảo: [Authorize access to web applications using OpenID Connect and Azure Active Directory](https://docs.microsoft.com/vi-vn/azure/active-directory/azuread-dev/v1-protocols-openid-connect-code)