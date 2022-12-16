OAuth2.0 là một giao thức authorization, cho phép truy cập tài nguyên của resource owner bằng cách bật client applications trên các dịch vụ HTTP như Facebook, GitHub, v.v. Nó cho phép chia sẻ tài nguyên được lưu trữ trên trang này sang trang khác mà không cần sử dụng thông tin đăng nhập của họ . Nó sử dụng token như tên người dùng và mật khẩu để thay thế.
Sau đây là phần giải thích cách thức hoạt động của OAuth 2.0 một cách dễ hiểu nhất.
1. Có một máy chủ quản lý dữ liệu của người dùng. Máy chủ được gọi là "Resource Server".

![](https://images.viblo.asia/0db319ed-2cea-4180-9c41-5765c402557c.png)

2. Client application muốn sử dụng user's data thì cần phải gọi thông qua API
![](https://images.viblo.asia/3e58a382-7b5f-418b-a92d-07fb4fb0792d.png)
3. Client application call api và resource server sẽ trả về user's data
![](https://images.viblo.asia/00d0de1e-7049-4728-9e51-ae0cf8f4ab0e.png)
Qua 3 steps trên thì ứng dụng nào cũng có thể lấy data, chúng ta cần có bước cấp quyền để được phép truy cập tài nguyên, và nó gọi là Access Token.
4. Access Token sẽ được cấp cho client applicatiton và khi request để lấy data thĩ sẽ gửi kèm access token để verify
![](https://images.viblo.asia/eb1f4af2-43c4-42cb-9375-1cb354dbece1.png)
5. Resource server sẽ trích xuất access token để verify. Nếu access token verify tức là client application có quyền truy cập vào dữ liệu của người dùng.
![](https://images.viblo.asia/31ac3ea3-a530-4cf1-a454-ce420a560d02.png)
- Chúng ta có access token để cấp quyền truy cập, vậy ai tạo ra access token và đó là Authorization Server
6.  Authorization Server sẽ tạo access token cho clien application
![](https://images.viblo.asia/e64c9366-731d-4ec5-9c28-74a0bf583246.png)
7. Trong ứng dụng thực tế client application sẽ yêu cầu access token trước và resource server sẽ yêu cầu cấp cho phép truy cập data của user. Sau đó mới tạo access token cho client application.
![](https://images.viblo.asia/a3e415df-bc88-47e3-b50d-64369d92c113.png)
8. Vùng tròn màu đỏ chính là OAuth 2.0. Nó là chuẩn hóa hiện nay đang dùng cho phần này.
![](https://images.viblo.asia/79407c3a-26ea-4380-bd67-9e2ac1084c90.png)

Chúng ta đã cùng nhau tìm hiểu cách thức hoạt động cơ bản về oauth 2.o. Nếu muốn tìm hiểu chi tiết hơn về nó thì có thể tham khảo thêm trong tài liệu chính thức về oauth tại [đây nhé](https://tools.ietf.org/html/rfc6749#section-1).

Happy coding!