# Mở đầu
Là một client developer, việc tạo ứng dụng với xác thực có thể là một quá trình tẻ nhạt. Vì chúng ta cần xử lý xác thực trong máy chủ và duy trì mã. Nó có một số trường hợp cần được duy trì dựa trên cơ chế xác thực (Cơ bản, OAuth, v.v.). Bài viết này giúp bạn tạo một chương trình phụ trợ độc lập ít xác thực hơn cho ứng dụng phản ứng của bạn. Hoặc ngoài ra, bạn cũng có thể thêm cấu hình máy chủ để xác thực với máy chủ của mình.

# 1. Tại sao lại sử dụng OAuth?
Có nhiều lý do để sử dụng OAuth.
* Nó được bảo mật.
* Nó không yêu cầu bất kỳ thông tin xác thực nào từ người dùng. Vì vậy, không cần phải nhớ nhiều mật khẩu.
* Các trang web cũng có thể lấy thông tin cần thiết về người dùng mà không mất nhiều thời gian vào các biểu mẫu.

Và cụ thể trong trường hợp của chúng tôi, chúng tôi không cần máy chủ để xác thực hoặc để lấy thông tin chi tiết ban đầu của người dùng.

Tôi đã tìm thấy một package được gọi là `react-google-login`. Trong đó cung cấp các cơ chế đơn giản để thêm thông tin đăng nhập Google. Bạn có thể sử dụng trực tiếp thành phần `GoogleLogin` của họ hoặc bạn có thể sử dụng các nút tùy chỉnh. Họ cũng cung cấp các hook tùy chỉnh như `useGoogleLogin` và `useGoogleLogout`, vì vậy sẽ dễ dàng cho những người yêu thích hook. (Cả hai phương pháp được mô tả bên dưới).

[Tài liệu](https://www.npmjs.com/package/react-google-login) họ cung cấp cho repository này thật tuyệt vời. Như phần trên, bài viết này giúp tạo ứng dụng của bạn trong bảng điều khiển dành cho nhà phát triển của Google và truy cập vào `clientId`. `access_token` ban đầu thu được bởi gói này sẽ chỉ tồn tại trong một giờ (Vì lý do bảo mật). Và chúng ta cần lặp lại quy trình để truy cập `access_token` mới bằng cách sử dụng `refresh_token`. Vì vậy, bạn có thể tạo một **production-ready application**.

# 2. Cài đặt các thông tin cần thiết.
## 2.1 Cài đặt Google developer console.
Chúng tôi cần tạo một ứng dụng trong bảng điều khiển dành cho nhà phát triển của Google (**Google developer console**). Nó cung cấp `clientId` được sử dụng để xác định ứng dụng của bạn để biết chi tiết xác thực. Làm theo các bước dưới đây để lấy `clientId`:
* Đi tới trang [Thông tin xác thực (Credentials page)](https://console.cloud.google.com/apis/credentials). (Nếu bạn là người mới, hãy tạo [một dự án](https://console.cloud.google.com/projectcreate) và làm theo các bước sau).
* Nhấp vào Tạo thông tin đăng nhập> ID ứng dụng khách OAuth (**Create credentials > OAuth client ID**).
* Chọn loại ứng dụng Web (**Web application**).
* Đặt tên cho OAuth 2.0 client của bạn và nhấp vào Tạo (**Create**).

Đảm bảo rằng bạn đã cung cấp tên miền và URL chuyển hướng của mình. Để Google xác định miền gốc mà nó có thể cung cấp xác thực.
![](https://images.viblo.asia/b22b4a14-b54f-47c8-973b-1b9bce6d603a.PNG)

Bạn cũng có thể thêm local route của mình để phát triển. Bây giờ thiết lập xác thực trong bảng điều khiển dành cho nhà phát triển của Google đã sẵn sàng.

## 2.2 Thêm package react-google-login
Trong gói CRA, hãy cài đặt `react-google-login`
```markdown
npm i react-google-login
```

or

```markdown
yarn add react-google-login
```

# 3. Tạo Login With Google bằng cách sử dụng Component
Tạo component `Login` hoạt động như một login button.
![](https://images.viblo.asia/cc2c5027-eb70-4348-897a-41462219f5c7.png)

Tương tư, tạo component `Logout`
![](https://images.viblo.asia/7c53ea0e-698e-4a44-9524-f860bb0e58d1.png)

Và thêm cả hai vào vị trí cần thiết của ứng dụng của bạn. Ví dụ trong `App.js`
![](https://images.viblo.asia/8f18bad1-bc6e-4741-b4cc-a31d1641bddf.png)

=> Bây giờ khi chạy ứng dụng của bạn sẽ hiển thị `profileObj` trong console sau khi đăng nhập.

Nhưng sau 1 giờ `tokenId` của bạn sẽ hết hạn và do đó nó sẽ không được sử dụng để truy cập dữ liệu hoặc xác thực người dùng. Và do đó chúng ta cần tạo `tokenId` mới. Để làm cho mọi thứ hoạt động, chúng tôi cần thêm một số trường hợp bổ sung trong component `Login`.
![](https://images.viblo.asia/4f7e24f5-c492-426a-8e78-bd10a6ea77cb.jpg)

Hàm `refreshTokenSetup` sẽ xử lý các `tokenIds` mới
![](https://images.viblo.asia/dfb56843-ecf6-4b07-9368-8228234ec984.jpg)

Hàm này kiểm tra `expires_in` timestamp hoặc thời gian tùy chỉnh của chúng tôi (trước khi mã thông báo hết hạn) và gọi `reloadAuthResponse` là một hàm sử dụng được cung cấp bởi thư viện và nó xử lý `refresh_token` và nhận được `tokenId` mới.

==> Và Đăng nhập Google được thêm vào ứng dụng của bạn thành công. Vì vậy, bây giờ bạn có thể truy cập vào **name, photo URL, email, google Id,** v.v.

Cách trên sử dụng nút mặc định Đăng nhập Google. Bạn cũng có thể sử dụng nút tùy chỉnh của mình bằng cách sử dụng `render` prop.
![](https://images.viblo.asia/629653cd-2d06-4aa6-87c7-5df79f1e2c04.png)

# 4. Tạo Login With Google bằng cách sử dụng Hooks
Chúng ta cũng có thể triển khai chức năng tương tự bằng cách sử dụng **React Hooks**.

Tạo `LoginHooks.js`
![](https://images.viblo.asia/47975490-6074-45b7-96e5-bf029eb69657.png)

Tạo `LogoutHooks.js`
![](https://images.viblo.asia/94741fa9-5306-4954-8088-7d7118a424a7.png)

# 5. Xác minh phía máy chủ
Nếu bạn muốn thêm xác minh phía Máy chủ, hãy Gửi `tokenId` từ máy khách đến máy chủ khi function `onSuccess` trong compnent `Login` được gọi.

Vì vậy, trong khi xử lý các tuyến đã xác thực, Tất cả các yêu cầu từ máy khách cần phải gửi `tokenId` của người dùng trong tiêu đề dưới dạng mã **Bearer token**. Tại Máy chủ, sau khi nhận được mã thông báo, nó phải được xác minh hoặc mã thông báo này :
* Thuộc ứng dụng hiện tại.
* Nó đã hết hạn chưa.

Bạn có thể thực hiện chúng theo cách thủ công nhưng google đề xuất sử dụng thư viện xác thực của họ.

Ở phía Máy chủ (Ở đây Node.js được sử dụng).

Cài đặt gói thư viện `google-auth-library` được hỗ trợ chính thức của Google được sử dụng để xác thực và xác minh các ứng dụng OAuth.
![](https://images.viblo.asia/e7351f01-0cb9-4cdf-8a49-126cf6fb9129.png)

Ở đây, chúng tôi đã gửi `GOOGLE_CLIENT_ID`, nó sẽ xác minh xem mã thông báo này có thuộc ứng dụng của chúng tôi hay không. Và nó phân tích cú pháp chúng và cung cấp chi tiết hồ sơ trong chức năng `getPayload`. Và bạn có thể sử dụng chúng để truy cập dữ liệu người dùng.

# Kết luận
Bài của mình đến đây là kết thúc. Hy vọng nó sẽ hữu ích phần nào đó cho các bạn trong quá trình đang thực chiến dự án. Bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm, và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn.