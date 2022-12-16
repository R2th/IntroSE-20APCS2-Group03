![](https://images.viblo.asia/0023f84d-b4a1-4141-9aa3-f7f1a097c6dc.jpg)

Xin chào các bạn!

Đã bao giờ bạn đăng nhập vào một trang web hay ứng dụng mà trên màn hình đăng nhập đó có thêm button "Đăng nhập với Google" hay "Đăng nhập với Facebook" như thế này chưa?

![](https://images.viblo.asia/776cf8f5-46da-428e-9204-33fe74a17dc8.png)

Đây chính là OAuth2 mà tôi sẽ giới thiệu với các bạn. Bạn có tò mò rằng nó là gì và hoạt động ra sao không? Hãy cùng tôi tìm hiểu nhé! :wink:

## 1. OAuth2 là gì?
- OAuth2 viết tắt của **Open** với **Authentication** / **Authorization**.
- OAuth2 là một **authorization framework** cho phép các ứng dụng có quyền truy cập hạn chế vào tài khoản người dùng trên dịch vụ HTTP, chẳng hạn như Facebook, Github,... Nó hoạt động bằng cách ủy quyền xác thực người dùng cho dịch vụ lưu trữ tài khoản người dùng và ủy quyền cho các ứng dụng của bên thứ ba truy cập vào tài khoản của người dùng. OAuth2 cung cấp các authorization flows cho ứng dụng web và desktop hay thiết bị di động.
- **Authentication**: xác thực người dùng.
- **Authorization**: người dùng ủy quyền cho ứng dụng truy cập tài nguyên của họ.

OAuth 1 và 2 có khá nhiều điểm khác biệt, để hiểu rõ hơn 2 version này bạn có thể tham khảo tại [link](https://www.oauth.com/oauth2-servers/differences-between-oauth-1-2/). Trong phạm vi bài viết này mình sẽ chỉ đề cập đến OAuth2.

## 2. Quá trình hình thành và phát triển

- Được tạo và hỗ trợ mạnh mẽ ngay từ đầu bởi Twitter, Google và các công ty khác, OAuth được phát hành như một tiêu chuẩn mở vào năm 2010 với tên gọi RFC 5849, và nhanh chóng được áp dụng rộng rãi. 
- Trong hai năm tiếp theo, nó đã được sửa đổi đáng kể và phiên bản 2.0 của OAuth, được phát hành vào năm 2012 với tên gọi RFC 6749. Mặc dù phiên bản 2.0 đã bị chỉ trích rộng rãi vì nhiều lý do bảo mật, nó thậm chí còn trở nên phổ biến hơn. 
- Ngày nay, bạn có thể thêm Amazon, Facebook, Instagram, LinkedIn, Microsoft, Netflix, Paypal và danh sách những ai là người sử dụng Internet khác.

## 3. OAuth2 Roles
OAuth2 xác định bốn roles như sau:
- **Resource Owner** (Chủ sở hữu tài nguyên)
- **Client** (Khách hàng)
- **Resource Server** (Máy chủ tài nguyên)
- **Authorization Server** (Máy chủ ủy quyền)

### 3.1. Resource Owner: User
Resource Owner là User cho phép ứng dụng truy cập vào tài khoản của họ. Quyền truy cập của ứng dụng vào tài khoản của User bị giới hạn trong “phạm vi” của ủy quyền được cấp (ví dụ: quyền đọc hoặc ghi).

### 3.2. Client:  Ứng dụng
Client là ứng dụng muốn truy cập vào tài khoản của người dùng. Trước khi có thể làm như vậy, nó phải được người dùng ủy quyền và ủy quyền phải được xác thực bởi API.

### 3.3. Resource / Authorization Server: API
- Resource Server lưu trữ các tài khoản người dùng được bảo vệ 
- Authorization Server xác minh danh tính của người dùng sau đó cấp mã thông báo truy cập cho ứng dụng.

Theo quan điểm của nhà phát triển ứng dụng, API của dịch vụ hoàn thành cả vai trò Resource và Authorization Server. Chúng tôi sẽ đề cập đến cả hai vai trò này được kết hợp, là vai trò Dịch vụ hoặc API.

## 4. Luồng hoạt động

![](https://images.viblo.asia/b03d5491-c50a-4395-ad23-b67df4e27c47.png)

Mình giải thích một chút về luồng hoạt động nha:

1. **Ứng dụng** (web hay app mobile) yêu cầu ủy quyền để truy cập **Resource Server** (Gmail, Facebook, Github...) từ **User**.
2. Nếu **User** cho phép yêu cầu, **ứng dụng** sẽ nhận được ủy quyền thừ phía **User**
3. **Ứng dụng** yêu cầu mã thông báo truy cập từ **Authorization Server** (API) bằng cách gửi thông tin định danh của chính nó và của User.
4. Nếu danh tính ứng dụng được xác thực và cấp ủy quyền hợp lệ, **Authorization Server** (API) sẽ cấp 1 **`access_token`** thông báo truy cập cho **ứng dụng**.  Đến đây việc ủy quyền đã hoàn tất.
5. Ứng dụng yêu cầu tài nguyên từ **Resource Server** (API) và xuất trình **`access_token`** để xác thực.
6. Nếu **`access_token`** hợp lệ, **Resource Server** (API) sẽ cung cấp tài nguyên cho **ứng dụng**.

Luồng hoạt động thực tế có thể khác tùy thuộc vào loại authorization, trên đây chỉ là ý tưởng chung về cách thức thực hiện.

## 5. So sánh OAuth2 với một số công nghệ bảo mật khác
### 5.1 OpenID

Có một số công nghệ bảo mật khác mà bạn có thể nghe nói đến trong cùng ngữ cảnh với OAuth2 và một trong số chúng là OpenID. **OpenID là về authentication **

Có một chú StackOverflower đã bình luận như sau:
> "OpenID dành cho con người đăng nhập vào máy, OAuth dành cho máy thay mặt con người đăng nhập vào máy."

OpenID bắt đầu ra đời vào năm 2005 như một phương tiện để đăng nhập vào trang blog LiveJournal nổi tiếng lúc bấy giờ nhưng nhanh chóng lan sang các trang khác. Trong những ngày đầu của Web 2.0, ý tưởng là thay vì có nhiều lần đăng nhập cho nhiều trang web, OpenID sẽ đóng vai trò như một lần đăng nhập duy nhất, xác minh danh tính của người dùng. Nhưng trên thực tế, OpenID rất khó triển khai ở phía developer và chưa bao giờ thực sự trở nên hấp dẫn đối với Users, đặc biệt là khi có sự cạnh tranh trong không gian đó. 

Đến năm 2011, OpenID đã trở thành một chương trình cũng được chạy và Wired tuyên bố rằng "Lý do chính không ai sử dụng OpenID là vì Facebook Connect làm điều tương tự và nó tốt hơn. Mọi người đều biết Facebook là gì và dễ hiểu hơn là Facebook đang xử lý danh tính của bạn hơn là một thứ mơ hồ, không được công nhận có tên là OpenID." (Facebook Connect hóa ra cũng không phải là một kẻ đánh bại thế giới, nhưng ít nhất mọi người biết Facebook là gì).

### 5.2. SAML
SAML viết tắt của Security Assertion Markup Language, là một công nghệ khác mà bạn sẽ nghe nói đến giống như OAuth2. Nói một cách chính xác, tên SAML đề cập đến ngôn ngữ XML nhưng thuật ngữ này cũng bao hàm các thông điệp và câu hình giao thức khác nhau tạo nên một phần của tiêu chuẩn SAML mở. SAML mô tả một khuoon khổ cho phép một máy tính thực hiện cả authentication and authorization thay mặt cho một hoặc nhiều máy tính khác. SAML có thể tự cung cấp chức năng đăng nhập một lần.

Dưới đây là so sánh giữa OAuth2 với OpenID VÀ SAML
![](https://images.viblo.asia/818710e2-e302-4011-a156-aedbfb6e185f.png)


Cảm ơn bạn vì đã kiên nhẫn đọc đến đây, túm lại bài viết này chúng ta cần nắm được:
- OAuth2 là gì? 
- Có những Roles nào?
- Hoạt động ra sao?
- Tại sao có nhiều ứng dụng sử dụng nó?

Hy vọng có thể giúp bạn có cái nhìn tổng quan về OAuth2, hẹn gặp lại bạn ở post tiếp theo nhé. Thân ái và hẹn gặp lại. :relaxed::relaxed::relaxed:

**Link tham khảo**:
- [An Introduction to OAuth 2](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)
- [Differences Between OAuth 1 and 2](https://www.oauth.com/oauth2-servers/differences-between-oauth-1-2/)
- [Everything You Wanted to Know About OAuth 2](https://auth0.com/blog/everything-you-wanted-to-know-about-oauth-2-but-were-too-afraid-to-ask/)
- [What is OpenID?](https://openid.net/what-is-openid/)
- [What is SAML and How Does it Work?](https://www.varonis.com/blog/what-is-saml/)