Khi sử dụng các ứng dụng như [Draw.io](https://app.diagrams.net/) hay một số ứng dụng, trang web nào đó, bạn đã bao giờ gặp thông báo yêu cầu cấp quyền truy cập đến Google drive chưa? 

Bạn đã bao giờ vào một trang web bất kì và sử dụng tính năng đăng kí/đăng nhập bằng facebook, google chưa?

Bạn đã bao giờ dùng outlook đính kèm file từ office365 chưa?

Bạn có tò mò flow bên dưới nó hoạt động như thế nào không?

Chúng ta hãy cùng tìm hiểu những vấn đề trên trong bài này nhé. 😁

## 1 OAuth 2.0:
Bạn có hai ứng dụng, tạm gọi là app1 và app2. App1 chứa danh sách bạn bè của end-user, App2 có chức năng tự động gửi lời chúc sinh nhật. Bạn muốn App2 có thể tự động gửi lời chúc sinh nhật cho danh sách bạn bè của end-user ở App1, làm cách nào để App2 lấy được danh sách bạn bè ở App1?
- End-user tự nhập lại danh sách bạn bè ở App1 vào App2. Nếu số lượng bạn bè lớn lên tới vài trăm người thì phải làm sao? Liệu end-user có bỏ app của bạn mà đi sang app khác không?
- Bạn cho phép App2 export danh sách bạn bè, sau đó import vào App1. Nếu sau thời điểm import, số lượng bạn bè tăng lên thì end-user phải import lại? Nếu App2 không có chức năng export danh sách bạn bè, App1 không có chức năng import danh sách bạn bè thì sao? Liệu end-user có bỏ app của bạn mà đi?
- App2 lưu lại username/password khi end-user đăng nhập và sử dụng nó để đăng nhập vào App1 mỗi khi cần cần truy cập tới danh sách bạn bè. Cách này chỉ hoạt động được khi end-user dùng chung username/password ở cả App1 và App2. Tuy nhiên:
    - Cách này sẽ không bảo mật. Ngoài ra mỗi lần end-user thay đổi mật khẩu ở App1 thì họ phải qua App2 để thay đổi mật khẩu cho đồng nhất.
    - Vì App2 có mật khẩu và tài khoản của App1 nên App2 có thể truy cập được nhiều thông tin hơn ngoài danh sách bạn bè. Giả sử có những thông tin trong App1 như hình ảnh nhạy cảm cũng bị App2 truy cập. Như vậy sẽ dẫn tới nhiều hệ lụy phiền toái sau này.
    
Ba cách này dường như không khả thi. 
Trên thực tế người ta sẽ giải quyết vấn đề này bằng cách để App2 lấy danh sách bạn bè từ App1 chỉ cần người end-user xác nhận cho phép App2 truy cập vào danh sách bạn bè của App1. Lúc đó App2 chỉ được phép lấy danh sách bạn bè, những thông tin khác hoàn toàn không có quyền truy cập. Nó cũng giống với việc khi bạn tạo file trong [Draw.io](https://app.diagrams.net/) và chọn vùng lưu trữ là google drive, popup yêu cầu xác nhận quyền truy cập vào google drive sẽ hiện lên. Đây là một ví dụ điển hình về OAuth 2.0


### 1.1 OAuth là gì?
OAuth (Open Authorization) 2.0 là tiêu chuẩn được thiết kế cho phép website hoặc ứng dụng thay mặt người dùng truy cập vào resouces của website hoặc ứng dụng khác. OAuth 2.0 cung cấp quyền truy cập được đồng ý bởi người dùng và hạn chế các hành động của những ứng dụng khác có thể thực hiện mà không cần chia sẽ thông tin đăng nhập. OAuth 2.0 là giao thức ủy quyền, không phải là giao thức xác thực, do đó nó được thiết kế để truy cập vào các tài nguyên như API hoặc dữ liệu người dùng. Vậy nên người dùng phải có tài khoản và quyền truy cập vào tài nguyên, API trước đó.

### 1.2 Các thành phần của OAuth 2.0:
OAuth 2.0 có 4 thành phần quan trọng: 
- Client: Client là hệ thống yêu cầu truy cập vào resources được bảo vệ.
- Resource Owner: Người/hệ thống nắm giữ resources được bảo vệ.
- Authorization Server: Server chuyên nhận request từ client và cấp phát access token khi nhận được sự chấp thuận Resource Owner. Authorization Server thường sẽ có hai endpoints
    - Authorization Enpoint: dùng để xác thực, cấp phát authorization code
    - Token endpoint: dùng để xác thực authorization code và trả về access token. Kiểu access token hay được sử dụng phổ biến là JSON web token(JWT).
- Resource Server: Server chứa resources của user, server này sẽ nhận request yêu cầu truy cập resources từ client, sau đó xác thực access token và trả về resources tương ứng.
 
### 1.3 Cách hoạt động:
Chúng ta hãy cùng đến với một ví dụ thực tế là Draw.io truy cập vào google drive để lưu trữ file nhé.
Đầu tiên cần phải xác định các thành phần:
- Client Application: Draw.io
- Resource Owner(RO): Bạn là người sở hữu resource ở google drive, vậy nên Resource Owner chính là bạn.
- Authorization server(AS): Google OAuth Server
- Resource Server(RS): Google drive

Luồng thực thi:
![image.png](https://images.viblo.asia/8a568375-f548-4de3-843e-4ee3c4b78bde.png)
 1. Bạn (resource owner) truy cập vào ứng dụng Draw.io(Client) sau đó chọn nơi lưu trữ file là google drive, Draw.io(client) sẽ điều hướng bạn tới Google OAuth server(Authorization server).
 2. Ở Google OAuth server(Authorization server), bạn cần đăng nhập, sau đó Google OAuth server sẽ hỏi rằng "Bạn có cho phép Draw.io(client) truy cập, đọc ghi file vào google drive(resource server) không?" Bạn chọn `cho phép` hoặc `không cho phép`. Nếu bạn không cho phép thì quá trình này sẽ buộc dừng lại tại đây, bye bye. Nếu bạn cho phép thì tới bước 3.
 3. Sau khi bạn chọn `cho phép`, Draw.io(Client) sẽ nhận authorization code ở callback URL.
 4. Draw.io(client) sẽ gửi một request khác kèm authorization code  tới Google OAuth Server(Authorization Server) bảo: `hey, User đã cho tại hạ(Draw.io) quyền truy cập vào google drive rồi. Mã Authorization code đây, huynh đệ(Google OAuth Server) kiểm tra đi. Nếu ok thì hãy cho tại hạ access token đi.` Ở đây bạn có thể hiểu đơn giản authorization code là giấy xác nhận bạn đã được cho phép, còn access token chính là giấy thông hành. Sau khi Google OAuth Server(Authorization Server) làm các công việc của nó xong sẽ trả về cho Draw.io(client) access token.
 5. Draw.io(client) sẽ gọi tới API của Google drive(resource server) kèm với access token, sau đó draw.io(client) có thể truy cập, đọc ghi file vào google drive được rồi.
 
Trên đây là cách hoạt động của OAuth 2.0 ở mô hình native client to server, user có thể đăng nhập click vào popup cho phép truy cập tương tác giao diện...

Nhưng trong thực tế, OAuth 2.0 lại được dùng khá nhiều ở mô hình server to server.

Chúng ta cùng đến một sơ đồ khác. Trong sơ đồ, resource owner cần truy cập, thêm thông tin vào app2 thông qua app1.
1. Trước khi user truy cập vào app1, app1 cần được tích hợp với app2. Nhà phát triển App1 cần đăng kí ứng dụng của mình trên App2, họ cung tên/định danh, domain... và callback URL hoặc redirect URi để App2 có thể gửi token ![image.png](https://images.viblo.asia/91212e40-e36b-4ffc-924c-69112cc6d459.png)
2.  App2 sẽ kiểm tra thông tin mà App1 đăng kí, sau đó gửi lại client_id, client_secret, nó tương tự như username và password

Hai bước trên chỉ làm một lần khi phát triển phần mềm. Tiếp theo: 

1.  User(Resource owner) thực hiện hành động thêm dữ liệu app2 trong app1, browser của user sẽ redirect sang Authorization Server của App2 với message chứa client_id, redirect_URI, response_type, scope.
2. App2 xác thực thông tin và tạo authorization code sau đó gửi ngược về App1
3. Lúc này, App1 sẽ gửi request gồm authorization code, client_id, secret_id, grant_type tới Authorization Server của App2
4. App2 kiểm tra thông tin, sau đó sẽ trả về acccess token cho App1
5. App1 sẽ dùng access token để gọi tới resource server của App2 để lấy resource
![image.png](https://images.viblo.asia/eb5d11ab-04fa-4ef1-859d-51dfca0bba25.png)

### 1.4 Dùng OAuth khi nào?
OAuth được dùng khi ứng dụng của bạn muốn truy cập vào tài nguyên của các đối tác bên ngoài. OAuth giúp ứng dụng của bạn truy cập dữ liệu được bảo vệ một cách an toàn hơn. Điển hình tiêu biểu là ứng dụng truy cập vào google drive để đọc, ghi file.

## 2 OpenID Connect:
Khi sử dụng các ứng dụng hoặc website, bạn có từng cảm thấy phiền phức khi trang web yêu cầu bạn đăng kí/đăng nhập mới được đọc, xem thông tin trong trang đó không? Với những ứng dụng trang web lạ, lần đầu nhìn thấy, bạn có từng sợ rằng họ sẽ lấy thông tin đăng nhập của bạn để làm nhiều việc phiền phức khác như gửi email quảng cáo...? Hoặc bạn có cảm thấy phiền khi qua trang web này, trang web kia lại phải đăng kí, đăng nhập và phải nhập lại thông tin profile nhiều lần không? Mỗi trang web có một tài khoản riêng, nhiều khi không nhớ nỗi tài khoản mật khẩu để đăng nhập, không biết mình đã tạo tài khoản ở trang này bao giờ chưa. Cá nhân mình, và mình tin một số người cũng gặp phải điều tương tự. Vấn đề này dẫn đến end-user thường hay ngần ngại, bỏ app mà đi. Để giải quyết việc đó thì các trang web hỗ trợ cho phép đăng nhập bằng facebook hoặc google dựa theo cơ chế OpenID Connect. Từ đó end-user chỉ cần một vài thao tác đơn giản thay vì phải điền thông tin cá nhân phức tạp.

### 2.1 OpenID Connect là gì?
OpenID Connect(OIDC) là tầng định danh được xây dựng dựa trên OAuth 2.0 framework. Nó cho phép bên thứ ba xác thực định danh của end-user và lấy thông tin profile của họ. 

### 2.2 Cách hoạt động:
![image.png](https://images.viblo.asia/8090ae65-64f9-4491-bd30-dad4ef60583f.png)
1. Khi end-user click vào sign-in button trên trang web hoặc ứng dụng của bạn, browser/ứng dựng sẽ redirect end-user tới OpenID Provider(trang Google OAuth server)
2. OpenID Provider tiến hành xác thực user.
3. Sau khi xác thực thành công. OpenID Provider(Google OAuth Server) sẽ gửi code dùng một lần lại browser thông qua redirect uri
4. Mã code mà browser nhận sẽ được chia sẽ tạm thời cho server
5. Server gửi mã code đó tới Google OAuth Server. Sau đó server có thể truy cập vào thông tin profile từ Google OAuth Server

### 2.3 Dùng OpenID Connect khi nào?
OpenID Connect được dùng khá phổ biến để định danh users từ mobile app cho tới website. Để hạn chế user phải làm đi làm lại nhiều lần quá trình đăng kí, nhập thông tin profile, xác thực email..., chúng ta có thể sử dụng OpenID Connect. Nó được sử dụng cho single sign-on(SSO) qua nhiều ứng dụng. Tiêu biểu, điển hình nhất mà chúng ta hay thấy là khi truy cập vào ứng dụng nào đó và thấy họ cho phép đăng nhập bằng facebook hoặc google.

## 3 Tổng kết:
Bạn có thể bạn sẽ cảm thấy flow trên khá là phức tạp, nhưng trong thực tế, trong khi phát triển phần mềm, các trang như Google, Facebook tạo ra các library hỗ trợ cho việc single sign-on(Cơ chế OpenID Connect) hay cấp quyền truy cập vào tài nguyên(OAuth 2.0). Bạn chỉ cần cài đặt thư viện và cung cấp client_id, secret_id hoặc làm theo tutorial khá đơn giản. Bên trên mình mô tả lại chi tiết cách vận hành thật sự bên dưới của các library mà facebook, google cung cấp. Từ việc hiểu rõ nguyên lý đó, bạn có thể áp dụng cho nhiều trường hợp thực tế trong trang web của bạn.

Trên đây là những suy nghĩ, tìm hiểu, tổng hợp được trên mạng và video này [What is OAuth 2.0 and OpenID Connect?](https://www.youtube.com/watch?v=LyqeHAkxVyk) trên youtube. Hi vọng nó có ích với bạn.


# Sau tất cả
**Sau tất cả, mình là [Ryan Cao](https://ryancao.netlify.app/about/)**, là một developer chân chính đang trên đường chém gió. Để ủng hộ mình các bạn có thể upvote bài viết này, follow [Github Caophuc799](https://github.com/Caophuc799) và đón đọc các bài viết trên [Ryan Cao blog](https://ryancao.netlify.app/) chính thức của mình để mình có thêm động lực chia sẽ những bài viết hay, ý nghĩa khác nhé