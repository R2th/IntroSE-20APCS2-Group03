HTTP là Stateless. Tất cả các request đều là stateless. Vậy stateless là gì?
# Stateless
- Trong lập trình web, chúng ta có sự tương tác giữa client với server. Phần mềm gồm 2 thành phần chính: phần mềm và data. Như vậy, một phần mềm được thiết kế theo tương tác client – server thì phần nhiều tập lệnh sẽ nằm phía server. Client có nhiệm vụ gửi dữ liệu lên để xử lý sau đó nhận kết quả trả về.
Stateless là thiết kế không lưu dữ liệu của client trên server. Có nghĩa là sau khi client gửi dữ liệu lên server, server thực thi xong, trả kết quả thì “quan hệ” giữa client và server bị “cắt đứt” – server không lưu bất cứ dữ liệu gì của client. Như vậy, khái niệm “trạng thái” ở đây được hiểu là dữ liệu.


-----


Tuy nhiên trong một số tình huống ta muốn lưu trữ dữ liệu, chẳng hạn trong một website bán hàng online, sau khi chúng ta đưa 1 sản phẩm vào trong giỏ hàng, chúng ta không muốn sản phẩm đó bị xoá khỏi giỏ hàng khi chuyển tới 1 trang mới. Trường hợp này chúng ta cần phải lưu những sản phẩm trong giỏ hàng bất kể khi điều hướng tói đường link khác trong website đó

# Session Based Authentication
Trong ***Session Based Authentication***, server sẽ tạo một session cho người dùng sau khi người dùng đăng nhập. Session ID sẽ được lưu ở cookie trong trình duyệt của người dùng. Trong khi người dùng vẫn còn đăng nhập, cookie sẽ gửi tiếp cùng với những request tiếp theo. Server có thể so sánh session ID lưu trữ ở cookie với session được lưu trong bộ nhớ để xác minh thông tin người dùng và gửi phản hồi với trạng thái tương ứng

![](https://images.viblo.asia/fdd3546f-1ee6-4ea7-afa4-d07189532c30.png)

*Luồng hoạt động của Session Based Authentication*

# Token Based Authentication

Một số trang website sử dụng JSON Web Token (JWT) thay thế cho việc xác thực bằng session.  Trong ***Token Based Authentication***, server tạo JWT một cách bí mật và gửi  JWT tới client. Client lưu JWT (thường là local storage) và thêm JWT vào header  với mọi request. Server sau đó sẽ xác thự JWT với mọi request từ client và trả về response.

![](https://images.viblo.asia/17eeed29-52cf-4b4c-92b4-17c9adeb249a.png)

*Luồng hoạt động của Token Based Authentication*

Sự khác biệt lớn nhất ở đây là user's state không lưu trên server, state được lưu trữ bên trong token ở client. Phần lớn các trang web hiện nay đều sử dụng JWT cho vệc xác thực do khả năng mở rộng cho các thiết bị di động.

# Node Modules cho JWT
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) là thư viện sử dụng để tạo JWT token trên server. Một khi người dùng đã đăng nhập, client sẽ truyền JWT token đằng sau header.authorization.bearer attribute.
```
{
  method: "GET",
  headers:{
    "Authorization": "Bearer ${JWT_TOKEN}"
  }
}
```
[expres-jwt](https://github.com/auth0/express-jwt) là thư viện có thể sự dụng để xác thực JWT token bằng việc so sánh secret-code

# Scalability - Khả năng mở rộng

**Session based authentication:** vì sessions lưu trữ trên server, khả năng mở rộng là một vấn đề khi có một lượng lớn người dùng sử dụng hệ thống cùng 1 lúc

**Token based authentication:** Không gặp vấn đề vì token được lưu trữ tại client

# Multiple Device - Đa thiết bị

**Session based authentication:** Cookies thường hoạt động đơn lẻ trên domain hoặc subdomain và chúng thường bị tắt đi bởi trình duyệt nếu họ làm việc trên cross-domain (3rd party cookies). Nó đặt ra vấn đề khi APIs được phục vụ từ các domain khác nhau với Mobile và Web device.

**Token based authentication:** Không gặp vấn đề với cookies vì JWT được thêm vào với mỗi request header.

Token Based Authentication sử dụng JWT là phương pháp được khuyến khích hơn trong các website. Một nhược điểm với JWT là kích thước của JWT lớn hơn nhiều so với Session ID được lưu trữ trong cookie vì JWT chứa nhiều thông tin của người dùng hơn. Cần đảm bạo rằng chỉ có thông tin cần thiết được đưa vào JWT và những thông tin quan trọng nên được bỏ qua để ngăn chặn các cuộc tấn công XSS.

# Tư liệu tham khảo:

1.  [https://medium.com/@sherryhsu/session-vs-token-based-authentication-11a6c5ac45e4](https://medium.com/@sherryhsu/session-vs-token-based-authentication-11a6c5ac45e4)
2.  [https://ponyfoo.com/articles/json-web-tokens-vs-session-cookies](https://ponyfoo.com/articles/json-web-tokens-vs-session-cookies)
3.  [Token Based Authentication -- Implementation Demonstration](https://www.w3.org/2001/sw/Europe/events/foaf-galway/papers/fp/token_based_authentication/)