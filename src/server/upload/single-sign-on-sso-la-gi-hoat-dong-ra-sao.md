## Single Sign-On (SSO) là gì?
### Giới thiệu
Ngày nay, hầy hết các trang web đều yêu cầu xác thực người dùng thì mới có thể truy cập vào chức năng và nội dung của họ. Với sự gia tăng của số lượng các trang web, thì đương nhiên, số lượng tài khoản mà mỗi người dùng cần có sẽ tăng theo.Thử tưởng tượng bạn đang sử dụng 10 dịch vụ khác nhau, mà mỗi tài khoản để truy cập các dịch vụ này thì đều yêu cầu tối thiểu 2 thông tin cơ bản là user name và password. Chà, việc ghi nhớ hết chỗ này cũng mệt lắm đây! Vậy thì thông minh hơn một chút, là sẽ sử dụng user name và password của các dịch vụ này là y hệt nhau :D Cơ mà với 10 dịch vụ, thì việc đăng nhập 10 lần là không thể tránh khỏi !!! Và vì thế, single sign-on ra đời

Single Sign-On, đúng như tên gọi, là cơ chế cho phép người dùng có thể truy cập nhiều trang web, ứng dụng mà chỉ cần đăng nhập một lần. Một khi đã được định danh ở một trang website A, thì cũng sẽ được định danh tương tự ở website B mà không cần lặp lại thao tác đăng nhập
![](https://images.viblo.asia/624c6eb9-3bf1-4726-9542-71507667a3ae.png)

### Ưu và nhược điểm
Một vài lợi ích có thể kể đến của single sign-on là:
* Giảm số lượng username và pasword mà người dùng cần phải ghi nhớ
* Giảm số lần phải nhập thông tin username và pasword
* Rủi ro về việc lộ thông tin người dùng cũng được tiết chế lại

Tuy nhiên, một vài hạn chế không thể không kể đến:
* Chi phí phát triển khi thông qua service thứ ba
* Phụ thuộc vào service bên ngoài

## Cơ chế hoạt động
### Hệ thống nhận dạng liên kết
Hệ thống nhận dạng liên kết( Federated Identity Glossary) là nơi tập trung và liên kết thông tin người dùng. Có 4 yếu tố nền tảng cấu thành nên hệ thống này:
* Xác thực (Authentication)
* Phân quyền (Authorization)
* Trao đổi thông tin người dùng (User attributes exchange)
* Quản lí người dùng (User management)

![](https://images.viblo.asia/7454d804-2982-46f5-91db-743fa108bdbd.jpg)


**Xác thực** có nghĩa là: kiểm tra thông tin đăng nhập và tiến hàng định danh người dùng.

**Phân quyền** dựa trên thông tin định danh để kiểm tra quyền truy cập của user.

**Trao đổi thông tin người dùng**  Mỗi hệ thống con sẽ cần và lưu trữ các thông tin khác nhau của người dùng, tuy nhiên sẽ có các thông tin bị lặp lại, ví dụ như tên, họ.... Do đó, cần có một nơi để tổng hợp lại các thông tin này, và trao đổi cho các hệ thống con.

**Quản lí người dùng** admin có thể quản lí người dùng bằng các thao tác thêm, sửa, xóa... ở các hệ thống con.

Single sign-on là một phần của hệ thống nhận dạng liên kết, có liên quan chặt chẽ với việc xác thực thông tin người dùng. Nó sẽ định danh người dùng, và sau đó chia sẻ thông tin định danh được với các hệ thống con.

### Cơ chế

Một user khi đăng nhập vào hệ thống A thì domain của A sẽ lưu thông tin định danh vào cookie, để user này cũng là đã đăng nhập khi truy cập vào hệ thống B thì domain B sẽ phải đọc được cookie của A tạo ra, nhưng điều này là không thể. Với các trình duyệt hiện nay, domain chỉ có thể truy cập cookie do chính nó tạo ra.![](https://images.viblo.asia/5c74f600-2a9c-4b14-abe7-e5ca247e2728.png)

Vì vậy, single sign-on sẽ phải chia sẻ thông tin cookie giữa các domain với nhau. Mỗi giao thức single sign-on sẽ có cơ chế chia sẻ khác nhau, nhưng điểm chung đều là tạo ra một domain trung tâm (central domain). Qua domain này, thông tin về cookie sẽ được chia sẻ đến các domain con. Ví dụ, central domain có thể tạo ra một json web token (jwt) và mã hóa nó. Khi ngươi dùng truy cập vào domain con thì sẽ được điều hướng đến domain trung tâm này, và token sẽ được trả lại và lưu ở phía trình duyệt. Sau đó, nếu người dùng tiếp tục truy cập vào domain con khác thì tương tự, cũng sẽ được điều hướng đến domain trung tâm, nhưng do lần này đã có token nên sẽ được định danh và việc đăng nhập lại là không cần thiết nữa.
![](https://images.viblo.asia/1577841e-29b5-4f8f-9166-6673d31ab2f0.png)

![](https://images.viblo.asia/d3ebdf8c-b725-4352-99f4-a91d45481006.png)

Đọc xong cũng thấy khá logic, nhưng khi kéo xuống các câu hỏi bên dưới, thì mình thấy có một câu được rất nhiều vote up như thế này:
> What is browser cookie storage and how it is accessible to by all three apps? I am supposing, the token should be stored by auth server and accessible to auth server, and after authentication browser is sending auth token with each request, and authenticated at auth server side, so why other apps are accessing browser cookie storage?

> Since it's a domain specific, private storage, shouldn't the representation of browser storage not have all three domains pointing to it? They don't share the same browser cookie storage. They only share the same information, but in different stores. Is that not correct? I realize that makes the visual a little more disparate, but the principle is an important one to understand and changes the flow slightly.

Hiểu là: brower lưu cookie kiểu gì vậy? Tôi đang hiểu là mỗi domain sẽ có 1 storage riêng trong local storage tổng để lưu cookie. Khi access đến domain1 và được redirect đến central domain xong thì sẽ có cookie lưu trong storage của domain1 và central, sau đó, với domain2 thì làm thế nào để lấy được cookie của central
Mình nghĩ là câu này cũng sẽ có nhiều người thắc mắc (vì có nhiều vote up mà :D) nên có một số ý hiểu mình muốn chia sẻ đó là:
* Local storage không chia thành nhiều storage con, mà chỉ có duy nhất một local storage mà thôi, tất cả cookie đều sẽ được lưu ở một chỗ, dạng key (là domain) và value. Chỉ là, các domain sẽ chỉ có quyền access đối với data mà nó tạo ra thôi.
* Không có chuyện các domain sử dụng cookie của nhau. Các domain sẽ tự request đến center domain và tự lưu cookie được trả ra, sau đấy, với mỗi request thì các domain sẽ tự dùng cookie mà mình có
* Phần lớn các service SSO hiện nay (ví dụ ở đây là Auth0) có 2 cách để xử lí ở vấn đề này:

    * Do tính chất của cookie, là các domain và subdomain có thể truy cập qua lại, nên central domain sẽ là dạng subdomain đối với một trong số các domain con. Ví dụ: domain con là abc.com thì auth0 sẽ tạo ra một central domain là auth0.abc.com. khi đấy, user nếu đã login ở abc.com thì sẽ có cookie lưu ở local storage mà cả abc.com và auth0.abc.com đều truy cập được. Khi đấy, nếu user login ở edf.com thì sẽ được redirect về central domain là auth0.abc.com, và sẽ có cookie, và lúc đấy user sẽ được xác thực
    * Sử dụng cơ chế Cross-origin resource sharing



## Social login

![](https://images.viblo.asia/134987e5-ec9f-4417-8fa5-16eeaff4a031.png)

Social login cũng là một dạng của single sign-on, là sử dụng những thông tin đăng nhập sẵn có của các hệ thống mạng xã hội như Facebook, Google, ..., người dùng có thể đăng kí vào các service thứ ba mà không cần tạo tài khoản. Và domain trung tâm khi này sẽ là domain của các mạng xã hội.



## Kết
Bài viết được lấy ý tưởng từ https://auth0.com/blog/what-is-and-how-does-single-sign-on-work/ và có thêm một số ý kiến chủ quan của tác giả