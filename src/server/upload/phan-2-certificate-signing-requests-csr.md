Trong bài trước [Nguyên tắc cơ bản về Code Signing](https://viblo.asia/p/phan-1-ban-ve-code-signing-trong-ios-yMnKMAJrK7P) chúng ta đã cùng nhau tìm hiểu một số khái niệm cơ bản về Code Signing, những lợi ích và hạn chế của nó. Bây giờ chúng ta cùng nhau đi tìm hiểu sâu hơn về nó. Bắt đầu từ việc tạo Certificate Signing Request (CSR)

Như các bạn đã biết chúng ta cần một chứng chỉ (certificates) cho môi trường development và production. Việc tạo nó chính là bước đầu tiên của quá trình xây dựng ứng dụng. Trong bài viết này mình sẽ đề cập tới việc tạo và sử dụng nó.

### 1. CSR là gì?

- CRS như một lá thư được gửi từ người viết đến một cơ quan chuyên cấp chứng chỉ nhằm mục đích đăng ký chứng nhận nhận dạng. Điều này có sử dụng khoá công khai bao gồm các chính sách để tạo và quản lý việc phân phối chứng chỉ số này (được gọi là hạ tầng khoá công khai viết tắt public key infrastructure PKI).

- Quá trình tạo CSR theo chuẩn của PKI tức là người viết đơn phải tự tạo khoá công khai và khoá riêng (sau này bạn tạo thì phải ngay trên máy tính của bạn). Người viết đơn sau đó cần đính kèm khoá công khai với CSR cùng các thông tin khác như email, address... và giữ bí mật về khoá riêng của họ. Đặt biệt khi bạn tạo CSR sẽ cần một số thông tin như common name, email... toàn bộ các thông tin này cũng nhằm mục đích ngăn chặn các CSR không có thật.

### 2. Cách tạo CSR và gửi nó tới Apple

- CSR là quá trình yêu cầu cấp chứng chỉ từ một tổ chức chuyên phát hành chứng chỉ mà ở đây chính là Apple để Apple xác minh chi tiết yêu cầu cấp chứng chỉ của nhà phát triển (developer) nếu thông tin là chính xác. Như trên mình có nói đó, bạn phải tạo yêu cầu này từ máy tính mác của bạn.

#### 2.1. Tạo CSR bằng GUI 
- Các bạn có thể tham khảo tại đây [document](https://support.apple.com/vi-vn/guide/keychain-access/request-a-certificate-certificate-authority-kyca2793/mac)
- Thông thường các bạn có thể chỉ cần quan tâm một vài bước sau để tạo
    - Từ Spotlight bạn search Keychain Access 
    - Chọn keychain access > certificate assistant > request a certificate from certificate authority
    - Nhập các thông tin cần thiết như mail, name,...
    - Tiếp theo bạn chọn save to disk và lưu lại ở máy tính
 
#### 2.1. Tạo CSR bằng command line

- Ngoài cách sử dụng giao diện để tạo thì chúng ta cũng có thể sử dụng command line để tạo 
```
openssl genrsa -out thisiskey.key 2048
openssl req -new -key thisiskey.key -out CertificateSigningRequest.certSigningRequest -subj "/emailAddress=emailaddress@sample.com, CN=Common Name, C=GB"
```

- Sau khi bạn tạo dù theo cách sử dụng giao diện hay command line thì bạn sẽ thấy một file **CertificateSigningRequest.certSigningRequest** ngay trên máy tính của bạn. Và file này bạn sẽ upload lên server của Apple 
- Lúc này bạn đã có file ở tại máy tính của bạn.
    - Trong khi tạo CSR thì cặp khoá công khai và khoá riêng sẽ được tạo ra
    - Khoá công khai thì được đính kèm vào CSR
    - Khoá riêng sẽ được giữ bên trong máy của bạn

### 3. Upload CSR
> Truy cập vào [Member center](https://developer.apple.com/account/ios/certificate/) và chọn như hình vẽ

> Chọn tạo CSR với mode là app development

![](https://images.viblo.asia/e8584a9d-ff16-4a5a-af01-314d4ee8d616.png)

> Xác nhận các thông tin về CSR

![](https://images.viblo.asia/7dd5e4dc-4b43-47c9-824b-263342f03bc3.png)

> Form để upload file cer bạn đã tạo bên trên.

![](https://images.viblo.asia/b003cd3d-6ff3-48e9-8a7f-dd2246176b3b.png)

> Cuối cùng bạn hãy download certificate đã được tạo ra.

![](https://images.viblo.asia/a4ae3b6c-ab37-4dbc-8dff-3134723d1403.png)

- Lúc này bạn đã có file với đuôi là cer và được tải xuống máy của bạn. Hãy double click vào file đó để thêm chứng chỉ này vào key chain. Tại đây bạn hãy xác minh keychain có chứng chỉ mới được tạo ra với khoá riêng. (hãy mở keychain access)
- Nếu bạn thấy chứng chỉ bằng khoá riêng thì tức là bạn đã tạo thành công. Và bạn cũng có thể xác nhận bằng lệnh sau
    ```
    security find-identity -v -p codesigning
    ```
- Bạn có thể xem toàn bộ các thông tin của cer bằng cách sử dụng command sau
    ```
    openssl x509 -in ios_development.cer -inform DER -text -noout
    ```
    ![](https://images.viblo.asia/9fb3fcac-ba51-469a-bd52-8ef084f00142.png)
    
> Trên đây là một số thông tin về cer sau khi sử dụng command trên. Các bạn có thể tự mình thử đọc thông tin của cer bằng lệnh trên nhé.

### 4. Export p12
- Bạn có thể xuất file p12 ra bằng cách chuột phải vào certificate trong keychain access và chọn export

![](https://images.viblo.asia/5c79d2f0-046d-46df-9349-bae567dc934f.png)

- File p12 mà bạn export ra nó bao gồm cả thông tin cer của bạn và kết hợp với khoá riêng.


Tổng kết: Ở bài viết này tôi đã hướng dẫn và giải thích cho các bạn hiểu chi tiết về cer cũng như quá trình tạo và sử dụng nó. Tuy nhiên nếu chỉ có cer thì một mình nó không thể ký mã cho ứng dụng iOS. Bạn sẽ cần phải có cả khoá riêng. Trong phần sau mình sẽ tiếp tục đào sâu hơn về nó - phần quan trọng không thể thiếu trong quá trình code sign đó chính là provisioning profile