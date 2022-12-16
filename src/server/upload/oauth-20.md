## OAuth 2.0 là gì?

OAuth là một giao thức authorization mở, cho phép truy cập tài nguyên của chủ sở hữu tài nguyên bằng cách cho phép các ứng dụng khách trên các dịch vụ HTTP như Facebook, GitHub, v.v. Nó cho phép chia sẻ tài nguyên được lưu trữ trên một trang này sang trang khác mà không cần sử dụng thông tin đăng nhập của họ. Thay vào đó nó sử dụng các token username và password.

OAuth 2.0 được phát triển bởi IETF OAuth Working Group, được công bố vào tháng 10 năm 2012.

## Tại sao nên sử dụng OAuth 2.0?

- Bạn có thể sử dụng OAuth 2.0 để đọc dữ liệu của người dùng từ một ứng dụng khác.
- Nó cung cấp quy trình authorization cho web, ứng dụng máy tính để bàn và thiết bị di động.
- Đây là một ứng dụng web phía máy chủ sử dụng authorization code và không tương tác với thông tin đăng nhập của người dùng.

## Các tính năng của OAuth 2.0

- OAuth 2.0 là một giao thức đơn giản cho phép truy cập tài nguyên của người dùng mà không cần chia sẻ mật khẩu.
- Nó cung cấp các user agent flow để chạy ứng dụng khách bằng scripting language, chẳng hạn như JavaScript. Thông thường, một trình duyệt là một user agent.
- Nó truy cập dữ liệu bằng cách sử dụng các token thay vì sử dụng thông tin đăng nhập của họ và lưu trữ dữ liệu trong online file system của người dùng như tài liệu Google Docs hoặc Dropbox.-

## Ưu điểm của OAuth 2.0

- OAuth 2.0 là một giao thức rất linh hoạt dựa trên SSL (Secure Sockets Layer đảm bảo dữ liệu giữa máy chủ web và trình duyệt vẫn giữ được tính riêng tư) để lưu token truy cập của người dùng.
- OAuth 2.0 dựa trên SSL, được sử dụng để đảm bảo các giao thức bảo mật và đang được sử dụng để giữ an toàn cho dữ liệu.
- Nó cho phép truy cập hạn chế vào dữ liệu của người dùng và cho phép truy cập khi authorization token hết hạn.
- Nó có khả năng chia sẻ dữ liệu cho người dùng mà không phải tiết lộ thông tin cá nhân.
- Nó dễ dàng hơn để thực hiện và cung cấp xác thực mạnh mẽ hơn.

## Nhược điểm của OAuth 2.0

- Nếu bạn thêm nhiều phần mở rộng ở các đầu cuối trong đặc tả hệ thống, nó sẽ tạo ra một loạt các triển khai không thể tương tác, có nghĩa là bạn phải viết các đoạn mã riêng cho Facebook, Google, v.v.
- Nếu các trang web yêu thích của bạn được kết nối với trung tâm trung tâm và tài khoản trung tâm bị hack, thì nó sẽ dẫn đến các ảnh hưởng nghiêm trọng trên một số trang web thay vì chỉ một.

## Flow thực hiện

![](https://images.viblo.asia/16878a7c-e6db-4f2f-ba88-35b99e57b2e0.jpg)

Bước 1 - Đầu tiên, người dùng truy cập tài nguyên bằng client application như Google, Facebook, Twitter, v.v.

Bước 2 - Tiếp theo, client application sẽ được cung cấp id khách hàng và mật khẩu máy khách trong khi đăng ký URI chuyển hướng (Uniform Resource Identifier).

Bước 3 - Người dùng đăng nhập bằng ứng dụng xác thực. ID khách hàng và mật khẩu máy khách là duy nhất cho ứng dụng khách trên authorization server.

Bước 4 - Authentication server chuyển hướng người dùng đến một Uniform Resource Identifier (URI) chuyển hướng bằng authorization code.

Bước 5 - Người dùng truy cập trang nằm ở URI chuyển hướng trong client application.

Bước 6 - Client application sẽ được cung cấp authentication code, client id và passoword và gửi chúng đến authorization server.

Bước 7 - Authenticating application trả về access token vào client application.

Bước 8 - Khi client application nhận được access token, người dùng bắt đầu truy cập tài nguyên của chủ sở hữu tài nguyên bằng client application.

## Tham khảo

https://www.tutorialspoint.com/oauth2.0/oauth2.0_overview.htm