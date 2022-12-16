# 1.  Giới thiệu về Microsoft Graph

Microsoft Graph là một cổng dữ liệu trong Microsoft 365. Nó cung cấp một mô hình lập trình thống nhất mà chúng ta có thể sử dụng để truy cập vào kho dữ liệu nằm trong  MicroSoft 365, Window 10 và  Enterprise Mobility + Security. Một cách đơn giản chúng ta có thể hiểu được đây như là một kho lưu trữ dữ liệu mà chúng ta có thể upload, download file từ đó, giống với Aws s3 hoặc google drive.

Tuy nhiên điểm mạnh của Microsoft Graph là nó được tích hợp thêm những tính năng của Microsoft 365 cho phép chúng ta có thể làm thao tác trực tiếp với file trên kho lưu trữ dễ dàng, đặc biệt là với những file tài liệu như word, pdf, excel, ...

![](https://images.viblo.asia/81e81699-d83b-4ed1-8c93-535ea8bfcb0f.png)

Microsoft Graph API cung cấp endpoint `https://graph.microsoft.com` để cung cấp quyền truy cập vào kho lưu trữ và sử dụng các dịch vụ của Microsoft 365. Chúng ta có thể sử dụng Rest APIs hoặc SDK để truy cập endpoint và xây dựng ứng dụng. Microsoft Graph cũng bao gồm những services mạnh mẽ giúp quản lý người dùng và thiết bi, quyền truy cập, bảo mật để bảo vệ dữ liệu.

![](https://images.viblo.asia/d79d720c-747b-4ad7-b3fa-1c778f63757f.png)

Nhìn qua có thể thấy Microsoft Graph cung cấp rất nhiều services, tuy nhiên trong bài viết này mình sẽ chỉ giới thiêu cách sử dụng Microsoft Graph API thông qua vài API đơn giản về quản lý file qua microsoft 365

# 2.  Sử dụng Microsoft Graph API

## Tạo một ứng dụng trên Micrososft Azure

- Trước hết chúng ta cần tài khoản để đăng nhập vào trang web https://portal.azure.com/#home, ai chưa có tài khoản thì tạo 1 tài khoản bằng email của mình nhé :)

![](https://images.viblo.asia/ed71eba8-fddc-4c29-acfa-ecd60308e008.png)

- Sau khi tạo tài khoản xong chúng ta tìm phần Manage Azure Active Directory -> View

![](https://images.viblo.asia/d1483f5d-94d9-4907-8b67-b3f9683eb4be.png)

- Tại đây ta cần phải đăng ký 1 app:  App registrations -> Register an application.

![](https://images.viblo.asia/204cd2ba-26e9-482f-8453-94aa73785bed.png)

- Nhập thông tin app cần đăng ký rồi ấn register

![](https://images.viblo.asia/64c132d6-e0f0-45b3-a6e8-4fdc6baaf649.png)

- Sau khi đăng ký xong, chúng ta đã có thông tin app bao gồm `Application (client) ID`, `Directory (tenant) ID`
- Để có thể sử dụng đc API truy cập vào tenant, ta cần có thêm secret key nữa, cách lấy secret_key như sau:

![](https://images.viblo.asia/48bc1c80-8252-428d-8a54-6e8fb4d7a03e.jpg)

- Từ menu chọn Certificates & secrets -> New client secret -> điền description + chọn Expires -> Add. Secret key sẽ hiện ra bên dưới.
- Chúng ta cần add tài khoản vào tenant vừa tạo để có thể thao tác với nó, User -> New User, điền thông tin và tạo tài khoản

![](https://images.viblo.asia/b6fdba91-b7b5-4e76-ba31-3c0744f4f84b.png)

- sau khi đã tạo xong tài khoản, ta add tài khoản vào app:

![](https://images.viblo.asia/bb688b7a-914e-406c-ab20-3e1d0c16fdfa.png)

- vào Owners -> add owners chọn user mới thêm

Về cơ bản từ đây chúng ta đã có thể thao tác cơ bản với Microsoft Graph APi rồi, thử 1 vài API nhé

![](https://images.viblo.asia/924c124e-c6ba-48c1-a510-9d139b37008f.png)

- config enviroment cho Postman, khởi tạo giá trị  cho từng trường ứng với thông tin app vừa đăng ký nhé

![](https://images.viblo.asia/0212c425-f2e6-42d0-b0dc-d2837c659f59.png)

- Lấy access token nào: link end_point `https://login.microsoftonline.com/{{TenantID}}/oauth2/v2.0/token`

Như vậy là chúng ta đã lấy được access token của Graph API, sau này chúng ta có thể sử dụng những tính năng khác như microsoft 365 nhưng yêu cầu trả phí, bạn nào muốn thử có thể sử dụng thử khi microsoft 365 cho phép sử dụng thử.

Nếu muốn sử dụng các tính năng của microsoft 365 thì chúng ta cần có licenses 365 E3, chúng ta có thể kích hoạt dùng thử trên trang chủ https://www.office.com/

![](https://images.viblo.asia/5a88e0d1-fe9b-420c-a91a-c41c3e4fee1f.png)

Sau khi có licenses ta có thể sử dụng một số API khác như get root, upload file, convert file. Mọi người có thể đọc thêm tại đây https://docs.microsoft.com/en-us/graph/api/overview?toc=./ref/toc.json&view=graph-rest-1.0


# 3.  Tài liệu tham khảo

- https://docs.microsoft.com/en-us/graph/api/overview?toc=./ref/toc.json&view=graph-rest-1.0
- https://docs.microsoft.com/en-us/graph/overview