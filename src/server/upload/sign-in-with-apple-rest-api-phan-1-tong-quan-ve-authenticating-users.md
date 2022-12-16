## Tổng quan
 Sign in bằng Apple REST API: là việc giao tiếp giữa app services của bạn với Apple’s authentication servers.
 
 Để sign in từ web app hoặc platform khác như: Android, sử dụng [Sign in with Apple JS](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js). Ngoài ra, cho user set up accounts và sign in với native iOS, masOS, tvOS, và watch OS app thì sử dụng [Authentication Services framework](https://developer.apple.com/documentation/authenticationservices).
 
##  Authenticating Users với Sign in bằng Apple
Sign in bằng Apple cho phép người dùng đăng nhập vào ứng dụng của bạn trên tất cả các platforms của bạn bằng xác thực 2 lớp với Apple ID.  Sau khi người dùng chọn Đăng nhập bằng Apple để đăng nhập, ứng dụng của bạn sẽ nhận được mã thông báo và thông tin người dùng mà bạn có thể verify từ server.

Khi người dùng chọn Sign in with Apple, luồng xử lý sẽ được mô tả như sau:

![](https://images.viblo.asia/3f717227-a514-45df-8f66-9de6ecc14c22.png)

Khởi tạo authentication session với server app của bạn và liên kết client session với mã thông báo ID bằng giá trị nonce. Bạn có thể yêu cầu nhận thông tin của người dùng, chẳng hạn như tên và địa chỉ email. Nếu người dùng đã approved truy cập thông tin này, yêu cầu ủy quyền của bạn bao gồm thông tin được yêu cầu. 

Sign in bằng Apple bảo vệ thông account user bằng xác thực 2 lớp. Người dùng đã đăng nhập vào thiết bị Apple có thể nhanh chóng đăng nhập vào ứng dụng của bạn theo những cách sau:

* Face ID hoặc Touch ID trên các thiết bị được bảo vệ bằng passcode
* Passcode, nếu Touch ID hoặc Face ID không khả dụng
* Apple ID password, nếu passcode không được đặt

Ứng dụng gốc chỉ cho phép user dùng iCloud đã đăng nhập sử dụng Đăng nhập bằng Apple. Web cho phép đăng nhập bằng bất kỳ ID Apple nào.
> 
> Lưu ý
> 
> Trên các thiết bị không phải của Apple, người dùng phải đăng nhập bằng Apple ID, mật khẩu và mã xác thực hai lớp.

## Nhận thông tin user từ Apple ID Servers

Thông tin bạn truy xuất phải bao gồm thông tin đăng nhập cần thiết để xác minh danh tính của người dùng. Server trả về thông tin xác thực và thông tin người dùng dựa trên yêu cầu ban đầu. Thông tin trả về có thể bao gồm danh tính người dùng, tên ,địa chỉ email đã xác minh và trạng thái người dùng thực.

Sau khi xác thực thành công người dùng, server trả về  identity token, authorization code và user identifier cho ứng dụng của bạn.

Identity token là mã JSON Web Token (JWT) và chứa các claims:

iss:
Apple generates token, là giá trị: https://appleid.apple.com.


sub:
Subject đã đăng ký xác nhận quyền sở hữu chính là subject của mã identity token. Vì mã thông báo này dành cho ứng dụng của bạn, nên giá trị là mã định danh duy nhất cho người dùng.


aud:
Đối tượng đã đăng ký xác nhận quyền sở hữu xác định người nhận mà mã identity token được dự định. Vì mã thông báo dành cho ứng dụng của bạn nên giá trị là client_id từ developer account.


iat:
Thời gian mà Apple phát hành mã identity token, tính theo số giây kể từ Epoch, tính theo giờ UTC.


exp:
Thời gian hết hạn của Identity token, tính theo số giây kể từ Epoch, tính theo giờ UTC.


nonce:
Dạng string: được sử dụng để liên kết client session và mã identity token. Giá trị này được sử dụng để giảm thiểu các cuộc tấn công phát lại và chỉ hiện diện nếu được thông qua trong yêu cầu authorization.


nonce_supported:
Dạng Boolean: cho biết liệu giao dịch có trên nonce-supported platform hay không.


email:
Địa chỉ email của người dùng.


email_verified:
Dạng String hoặc Boolean,: cho biết email đã được xác minh hay chưa. Giá trị có thể là String (”true”) hoặc a Boolean (true).  


is_private_email:
Dạng String hoặc Boolean: xác minh xem địa chỉ email có phải là địa chỉ proxy hay không. Giá trị có thể là String (”true”) hoặc a Boolean (true).  


real_user_status:
Dạng Integer xác minh có phải người dùng thật hay không, sử dụng giá tri này nhằm giảm thiểu sự gian lận. Các giá trị có thể là : 0 (hoặc Không được hỗ trợ). 1 (hoặc Không xác định), 2 (hoặc Có khả năng xảy ra).

Sử dụng authorization code để verify token claims với Apple servers và lấy refesh token mới. Mình sẽ trình bày ở phần 2 - **[Generate and Validate Tokens](https://viblo.asia/p/sign-in-with-apple-rest-api-phan-2-XL6lA26r5ek)**.

## Send Information to App Servers and Verify Tokens

Đảm bảo rằng app của bạn chuyển tiếp thông tin đăng nhập và thông tin người dùng tới server app của bạn. API thu thập thông tin này và chia sẻ thông tin đó với ứng dụng của bạn vào lần đầu tiên khi người dùng đăng nhập vào ứng dụng bằng cách Đăng nhập với Apple. Nếu người dùng sau đó sử dụng Đăng nhập bằng Apple trên một thiết bị khác, API sẽ không yêu cầu lại tên hoặc email của người dùng. Mà chỉ thu thập lại thông tin nếu người dùng ngừng sử dụng Đăng nhập với Apple và sau đó kết nối lại với app của bạn.

Vì thông tin của người dùng không được chia sẻ với app của bạn trong bất kỳ lệnh gọi API nào tiếp theo, nên app của bạn sẽ lưu trữ ở local storage, ngay sau khi bạn nhận được thông tin từ API response. Trong trường hợp xảy ra lỗi trong quy trình xử lý hoặc mạng của bạn có trục trặc, bạn có thể đọc thông tin từ local storage và thử xử lý lại.

Server app của bạn xác minh tính hợp lệ của token với ID Apple server. Thông tin cụ thể sẽ được trình bày ở phần 3 - **Verifying a User**.

Bài viết được mình tham khảo từ bài [Sign in with Apple REST API](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api) , [Authenticating Users with Sign in with Apple](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/authenticating_users_with_sign_in_with_apple). Bài tiếp theo mình sẽ trình bày về **Generate and Validate Tokens**.