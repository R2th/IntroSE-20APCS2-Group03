## Mở đầu
Xin chào các bạn hôm này mình sẽ giới thiệu cho các bạn một cách tạo certificates, identifiers & profiles với tài khoản Apple Developer.

***Yêu cầu***
Có tài khoản Apple Developer. Ai chưa có thì không cần đọc tiếp nha :frowning_face::
### Đăng nhập tài khoản
Truy cập [Link](https://developer.apple.com/account/) > đăng nhập tài khoản > Chọn **Certificates, Identifiers & Profiles**. Bạn thấy giao diện như bên dưới nghĩa là bạn đã làm đúng rồi :tada:

![](https://images.viblo.asia/a10c5376-7c4c-4c4e-9a9e-9a9ca6d76c1f.png)
### Tạo Certificates
**Certificates** để định danh cho tài khoản, nhiều người có thể dùng chung một tài khoản trả phí bằng cách phân quyền và chia sẻ file Certificates.

Chọn **Certificates** > Click dấu **+** cạnh tiêu đề **Certificates**, chọn **Apple Developmen** hoặc **Apple Distribution** tuỳ theo như cầu sử dụng  > *Continue* > Để tiếp tục chúng ta cần tạo CSR

![](https://images.viblo.asia/e3dafa32-b2af-42c9-8f4f-c88658a8874e.png)

Để tạo Certificate Signing Request (CSR) chúng ta ra ngoài macbook tìm **Keychain**

![](https://images.viblo.asia/28b85f91-9dbf-4ad8-9d5f-97731e586491.png)

Sau khi mở Keychain, trên thanh công cụ chọn **Keychain Access** > **Certificate Assistant** > **Request a certificate from a certificate authority...**

![](https://images.viblo.asia/88570d58-f3df-4fc8-ab64-b6336b5cbce1.png)

Điền email, tích vào **Saved to disk** > *Continue*.  Sau đó quay lại trình duyệt web chọn **Choose File**  CSR vừa tạo > *Continue*

Download file Certificates vừa tạo về. Click đụp vào file **Certificates**

![](https://images.viblo.asia/49bb8d27-d8ec-47b1-85c7-499cc89b7cb8.png)

Chọn **Add**. Như vậy là chúng ta đã thêm thành công  file **Certificates** vào **Keychain**

![](https://images.viblo.asia/ba33d31f-3e82-4a66-9ae0-e319fd4b7c70.png)

Để chia sẻ cho nhưng người khác sử dụng chung. Chuột phải chọn **Export**, điền tên, mật khẩu > chọn **Save**. File này có thể chia sẻ cho mọi người trong team (Nhớ kèm theo mật khẩu :grinning:)

### Tạo Identifiers
**Identifiers** để định danh cho một app.

Chọn **Identifiers** > Click dấu **+** cạnh tiêu đề **Identifiers** > chọn **App ID** > *Continue* > **Select a type (App)** > *Continue* 

![](https://images.viblo.asia/8dcde957-3261-4acf-b027-ca61a9166bd2.png) 

Điền tên app để phân biệt với các app khác và **Bundle ID** >* Continue* > *Register*. Thế là ta đã tạo thành công **Identifiers**. 

### Tạo Profiles
**Profiles** để build một app ra device thông qua Xcode.  Certificates (Apple Developmen) để build trục tiếp ra device, Certificates (Apple Distribution) để build Store và Ad Hoc

Chọn **Profiles** > Click dấu **+** cạnh tiêu đề **Profiles** > chọn **iOS App Development** > *Continue* > Mục App ID chọn **Identifies** mà ta vừa tạo ở trên > *Continue* > chọn **Certificates (Apple Developmen)** mà ta đã tạo ở trên > *Continue* > Chọn **Device** mà ta đã tạo sẵn (Các bạn tự tìm hiểu cách tạo **Devices**)  > *Continue* > Điền tên **Profile** > *Generate*

Download file Profile vừa tạo về.

## Kết thúc
Thế là ta đã tạo thành công **Certificates, Identifiers & Profiles**. Những file này sử dụng như thế nào các bài đọc hãy đọc ở bài viết tiếp theo.
Cảm ơn.