![](https://images.viblo.asia/914ab0f3-c40d-4015-97e9-cd62c3e25b55.png)

Single Sign-on (SSO) xảy ra khi người dùng đăng nhập vào một ứng dụng và sau đó tự động đăng nhập vào các ứng dụng khác, bất kể platform, technology hoặc domain mà người dùng đang sử dụng. Người dùng chỉ đăng nhập một lần, do đó tên của tính năng này là Single Sign-on.

Ví dụ: Nếu bạn đăng nhập vào một dịch vụ của Google như Gmail, bạn sẽ tự động được xác thực với YouTube, AdSense, Google Analytics và các ứng dụng khác của Google. Tương tự, nếu bạn đăng xuất khỏi Gmail hoặc các ứng dụng Google khác, bạn sẽ tự động đăng xuất khỏi tất cả các ứng dụng; điều này được gọi là Single Logout.
## Lợi ích
SSO cung cấp trải nghiệm liền mạch cho người dùng khi sử dụng các ứng dụng và dịch vụ cho người dùng. Thay vì phải nhớ thông tin đăng nhập riêng cho từng ứng dụng hoặc dịch vụ, người dùng chỉ cần đăng nhập một lần và truy cập các ứng dụng khác.
## Đối với người dùng
Bất cứ khi nào người dùng truy cập một domain mà yêu cầu xác thực, họ sẽ được chuyển hướng đến domain khác để xác thực, tại đây có thể yêu cầu đăng nhập. Nếu người dùng đã đăng nhập, họ có thể được chuyển hướng ngay lập tức đến domain truy cập ban đầu mà không cần đăng nhập lần nữa.
## Cách hoạt động
Single Sign-on và Single Logout có thể sử dụng thông qua [session](https://auth0.com/docs/sessions). Có thể có tối đa 3 session khác nhau cho người dùng có SSO:

- Local session được duy trì bởi ứng dụng
- Authorization Server session, nếu SSO được kích hoạt
- Identity Provider session, nếu người dùng chọn đăng nhập thông qua Identity Provider (như Google, Facebook hoặc 1 Identity Provider dạng SAML)

Với SSO, một domain trung tâm thực hiện xác thực và sau đó chia sẻ session với các domain khác. Cách một session được chia sẻ có thể khác nhau giữa các protocol SSO, nhưng khái niệm chung là giống nhau.

Ví dụ: Domain xác thực có thể tạo 1 [JSON Web Token (JWT)](https://auth0.com/docs/tokens/concepts/jwts) (Được mã hóa bằng JSON Web Encryption (JWE)) đã được signed, chứa tất cả thông tin cần thiết để xác định người dùng cho bất kỳ domain khác cần xác thực. Token này được truyền cho client, nhưng vì đã signed, nên client không thể sửa đổi nó theo bất kỳ cách nào. Mã thông báo có thể được chuyển đến domain ban đầu bằng chuyển hướng và được sử dụng bởi domain xác thực và 1 vài domain khác để xác định người dùng.
## Các protocol
**Security Assertion Markup Language & Web Services Federation**

[Security Assertion Markup Language (SAML)](https://auth0.com/docs/protocols/saml) và [Web Services Federation (WS-Fed)](https://auth0.com/docs/protocols/ws-fed) là 2 protocol được sử dụng rộng rãi trong triển khai SSO. Cả SAML và WS-Fed trao đổi dữ liệu ủy quyền và dữ liệu xác thực ở định dạng XML; Các phần chính của trao đổi này là người dùng, identity provider và service provider.

Với SAML hoặc WS-Fed:
1. Người dùng yêu cầu tài nguyên từ service provider.
2. Service provider liên kết với identity provider để kiểm tra người dùng có quyền truy cập vào tài nguyên không.
3. Identity provider xác minh danh tính người dùng và nếu hợp lệ xác nhận lại cho service provider rằng người dùng có quyền truy cập.

**Kết nối OpenID**

[OpenID Connect (OIDC)](https://auth0.com/docs/protocols/oidc) là một protocol xác thực thường được sử dụng khi thực hiện consumer-facing SSO. OIDC xử lý xác thực thông qua [JSON Web Tokens](https://auth0.com/docs/tokens/concepts/jwts) và identity provider trung tâm.

Với OIDC:
1. Người dùng yêu cầu quyền truy cập vào một ứng dụng.
2. Ứng dụng chuyển hướng người dùng đến identity provider để xác thực.
3. Identity provider xác minh người dùng và nếu thành công, sẽ nhắc người dùng cấp quyền truy cập dữ liệu cho ứng dụng.
4. Nếu quyền truy cập được cấp, identity provider sẽ tạo 1 ID Token, chứa thông tin nhận dạng người dùng mà ứng dụng có thể sử dụng.
5. Identity provider trả lại người dùng cho ứng dụng.

**Lightweight Directory Access Protocol + Active Directory**

[Lightweight Directory Access Protocol (LDAP)](https://auth0.com/docs/protocols/ldap) là một protocol ứng dụng được sử dụng để truy cập vào thư mục thông tin đăng nhập có thể được chia sẻ bởi nhiều ứng dụng; Nó thường được sử dụng bởi mạng nội bộ. Khi được ghép nối với Active Directory (AD), LDAP cung cấp một vị trí tập trung cho danh tính người dùng, vì vậy ứng dụng sẽ tạo 1 yêu cầu xác thực đến LDAP/AD server. LDAP trao đổi thông tin theo LDAP Data Interchange Format (LDIF).
## Inbound SSO
Đối với [Inbound SSO](https://auth0.com/docs/sso/current/inbound), Auth0 là nhà cung cấp SSO.

Khi người dùng đăng nhập vào một ứng dụng:
1. Ứng dụng đưa ra cho người dùng một hoặc nhiều identity providers bên ngoài.
2. Người dùng chọn một identity providers để xác thực và đăng nhập.
3. Sau khi xác thực thành công, người dùng được trả lại ứng dụng.

Inbound SSO trong Auth0 được xử lý bởi các [connection](https://auth0.com/docs/identityproviders).
## Outbound SSO
Đối với [Outbound SSO](https://auth0.com/docs/sso/current/outbound), 1 third-party identity provider là nhà cung cấp SSO.

Khi người dùng đăng nhập vào một ứng dụng:
1. Ứng dụng chuyển hướng người dùng đến một identity provider.
2. Third-party identity provider thực hiện xác thực và ủy quyền.
3. Sau khi xác thực thành công, người dùng được trả lại ứng dụng.

**Auth0's SSO Dashboard Extension**

Khi lập kế hoạch triển khai Outbound SSO, bạn có thể chọn sử dụng Auth0's [SSO Dashboard Extension](https://auth0.com/docs/extensions/sso-dashboard), cho phép bạn tạo một bảng điều khiển liệt kê nhiều ứng dụng doanh nghiệp có thể được kích hoạt cho SSO. Bảng điều khiển này sau đó được đưa ra cho người dùng khi đăng nhập.
## Sử dụng
Để biết ví dụ và hướng dẫn triển khai, hãy xem [Architecture Scenarios](https://auth0.com/docs/architecture-scenarios).

**Business to Business**

Đối với các kịch bản Business to Business (B2B), SSO có thể đơn giản hóa việc đóng gói ứng dụng của bạn cho tiêu dùng doanh nghiệp. Với Auth0, các ứng dụng của bạn có thể hỗ trợ các tình huống liên kết doanh nghiệp phổ biến như Active Directory, Lightweight Directory Access Protocol (LDAP), Ping hoặc Security Assertion Markup Language (SAML). Điều này cho phép các đối tác và khách hàng doanh nghiệp của bạn đăng nhập bằng các công nghệ nhận dạng doanh nghiệp ưa thích của họ.
- Nghiên cứu điển hình: [Safari](https://auth0.com/learn/safari-case-study/)

**Business to Consumer/Customer Identity Access Management**

Đối với các tình huống Business to Consumer (B2C) hoặc Customer Identity Access Management (CIAM), SSO có thể cung cấp quyền truy cập không ma sát vào các ứng dụng hoặc dịch vụ của bạn. Bạn có thể cho phép khách hàng xác thực thông qua các identity providers xã hội phổ biến như Google, Facebook, LinkedIn, Twitter và Microsoft thay vì yêu cầu họ tạo tài khoản khác.
- Nghiên cứu điển hình: [Giving Compass](https://auth0.com/learn/giving-compass-case-study/)

**Business to Employees**

Đối với kịch bản Business to Employees (B2E), SSO có thể đơn giản hóa việc cung cấp và quản lý thông tin đăng nhập của nhân viên. Thay vì theo dõi thông tin đăng nhập cho mỗi dịch vụ, nhân viên có thể đăng nhập một lần và có quyền truy cập vào mọi thứ họ cần. Và nếu một nhân viên rời đi, việc từ chối một tài khoản sẽ dễ dàng hơn nhiều.
- Nghiên cứu điển hình: [Schneider Electric](https://auth0.com/learn/schneider-electric-case-study/)

*Bài viết được dịch từ: [Single Sign-On](https://auth0.com/docs/sso/current#business-to-employees)*