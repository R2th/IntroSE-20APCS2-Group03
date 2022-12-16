##  Giới thiệu
   Lập trình từ trước đến nay luôn là một công việc đầy khó khăn và thách thức, tuy nhiên cũng rất thú vị đối với mỗi lập trình viên. Trong lập trình iOS, để phát triển một ứng dụng đáp ứng nhu cầu của người dùng đòi hỏi người lập trình viên phải bỏ ra không ít tâm huyết. Bên cạnh đó, Apple luôn luôn đặt ra những tiêu chuẩn khắt khe đối với những ứng dụng trên nền tảng của mình về chất lượng cũng như an toàn thông tin. Do đó, để đưa ứng dụng đến được tới tay người dùng không phải là một việc dễ dàng. Bạn phải trải qua một quy trình dài gồm rất nhiều bước và tương đối nhập nhằng. Trong bài viết này, tôi xin trình bày các bước đầy đủ để submit một ứng dụng lên App Strore.

## Giải thích một số keyword cần nắm.

Trước khi bắt đầu, bạn cần nắm rõ một số thuật ngữ của Apple liên quan đến việc build và release App. 

**- Apple Id:** là tài khoản của người dùng để có thể đăng nhập vào tấc cả sản phẩm của Apple. Đối với lập trình viên Apple, chúng ta sử dụng tài khoản để quản lí thông tin của App thông qua cổng App Developer:  https://developer.apple.com. Để tham gia trở thành Apple Developer bạn phải nâng cấp tài khoản Apple Id của mình. Chi phí cho tài khoản cá nhân là 99$/ năm.

**Certificate:** Đối với các thiết bị iOS (non-jaibreak), các ứng dụng chỉ có thể run khi được tải từ App Store và được cấp phép bởi một chứng chỉ của Apple. Chứng chỉ đó gọi là Certificate. Khi build một ứng dụng chúng ta cần nhúng vào đó certificate được cấp bởi Apple. Khi run App, các thiết bị sẽ tiến hành verify chứng chỉ đó. Nếu hợp lệ thì chứng chỉ sẽ được run và ngược lại. Certificate gồm 2 loại:

1.  *Developement Certificate:*  Trong quá trình phát triển ứng dụng, bạn cần phải build App trên device thật để hỗ trợ testing. Do đó, certificate này giúp App của bạn có thể run trên các devices nội bộ đã được đăng kí sẵn. Những device ko được đăng kí sẽ ko thể run App.
2.  *Distribution Certificate:* Sau khi hoàn thành phát triển App. Bạn muốn upload App Store để người dùng có thế sử dụng. Distribution Certificate, là chứng chỉ đảm bảo App của bạn có thể được chạp trên tấc cả thiết bị iOS.


**Provisioning:**  Chúng ta đều biết Apple luôn chú trọng vào bảo mật an toàn thông tin. Vì vậy, việc truyền dữ liệu từ ngoài vào thiết bị cũng được kiểm duyệt. Do đó, bạn cần có provisioning để giúp build và đưa ứng dụng lên device. Có 2 loại provisioning:

1.  *Development provisioning:*  tương tự development certificate, development provisioning hỗ trợ trong qúa trình phát triển, giúp có thể build App lên device iOS.
2.  *Distribution provisioning:* cho phép bạn build app để đưa lên App Strore 

**AppID:** Mỗi dụng đều cần có App Id, nó giúp xác mình Ứng dụng của bạn.

**Itunes connect:** Đây là nơi bạn summit ứng dụng và chờ sự approve từ Apple. Ngoài ra, bạn sẽ phải điền một số thông tin và hình ảnh của ứng dụng.

## Các bước tiến hành

##### 1. Đăng kí tham gia Apple Developer

Như đã đề cập ở trên, nếu muốn đưa ứng dụng lên App Store bạn cần phải tham gia trở thành Apple Developer. Chi phí để duy trì là 99$/ năm cho tài khoản cá nhân.

Các bước tham gia chi tiết tại dây: https://nandbox.com/en/seven-steps-to-enroll-in-the-apple-developer-program/


##### 1. Tạo  Distribution Certificate:
Sau khi đã hoàn tất để trở thành App Developer, chúng ta sẽ bắt đầu tạo distribution certificate.![](https://images.viblo.asia/51625c36-661e-4e34-a54d-f94194542634.png)
Chọn Tab Certificates, IDs, Profiles ở menu bên trái màn hình để mở tab quản lí App profile.
![](https://images.viblo.asia/e3e61a5c-c72c-492e-bc99-034a9c0126d0.png)
Bấm vào nút + để tạo certificate
![](https://images.viblo.asia/76408607-6214-401c-a971-40ab0a5f4829.png)
Chọn option iOS App development rồi bấm continue

Bước tiếp theo yêu cầu bạn request file CSR.!
![](https://images.viblo.asia/bf09e9db-5c6a-4285-bc68-635de5150046.png)

Để tạo file chúng ta mở Keychain Access
![](https://images.viblo.asia/7c8afba8-74b4-40be-a90c-2529f9b34b45.png)
>  Request a Certificate From a Certificate Authority
![](https://images.viblo.asia/ceafc8b5-26b1-4ec1-8596-e3b60db83747.png)

Nhập thông tin cho Certificate rồi bấm continue. Sau khi hoàn thành bước này bạn chọn nơi để lưu file CSR và quay lại trang web.
> ![](https://images.viblo.asia/142498c8-a056-4167-9f19-f5969d9c0805.png)

Bước tiếp theo yêu cầu upload file CSR bạn vừa tạo -> Continue
![](https://images.viblo.asia/d32e6089-ad3a-4302-9584-d67da8848d28.png)

Đến đây bạn đã tạo được Development Certificate. Để tạo distribution certificate tiếp tục chọn Add another
![](https://images.viblo.asia/1d7f991f-f828-4e21-8fe0-132c79905283.png)
 
 > Chon option App strore
![](https://images.viblo.asia/0c7775f9-c387-4a88-badd-d98c27981fe6.png)

thực hiện lại giống các bước đối với Developer Certificate.
Sau khi thực hiện xong cacs bước này bạn đã tạo được Distribution Certificate. > Dowload và open file sẽ thấy kết quả được add vào Keychain.

##### 2. Tạo App Id.

Mỗi ứng dụng cần tạo App ID.
Ở menu bên trái > Identifiers > Bấm vào nút +
![](https://images.viblo.asia/003abcae-40f4-4131-8b74-444da1c911ca.png)


Tiếp theo, điền các thông tin của ứng dụng gồm phần mô tả, bundle ID ... Sau khi điền xong bấm vào button Register.
![](https://images.viblo.asia/03fb5efb-dd80-4661-a8e5-61076cab70aa.png)

Thông báo bạn đã tạo AppID thành công. Khi App Id được tạo, chúng ta đã sẵn sàng để tạo provisioning.
![](https://images.viblo.asia/7b7683d2-ec92-4166-a564-a5173e933646.png)
##### 3. Tạo Provisioning.
Ở menu bên trái chọn mục Provisioning Profile > bấm button + ở góc trên.
![](https://images.viblo.asia/5ec45271-13c5-4502-b59c-ec758172f255.png)


 Chọn option iOs App development để tạo DP. chọn App strore để tạo Distribution Provisioning
![](https://images.viblo.asia/86f2f86f-0bec-4deb-86ce-87e18d98d346.png)
 
 Chọn App ID vừa tạo trước và bấm Continue
![](https://images.viblo.asia/d7a6aa45-08a5-4a73-90f3-8c91a6bfaa9f.png)


Chọn Certificate tương ứng được tạo ở bước 1
![](https://images.viblo.asia/2c1332a4-ca5f-4432-8be7-e7e3a4cffecc.png)


Chọn những device để build App (đối với Development Provisioning)
![](https://images.viblo.asia/b5daf8fd-ea3b-48e4-b487-d20a88a8d937.png)


Đến đây bạn đã hoàn tất việc tạo provisioning và sẵn sàng cho việc build App để upload lên App Store.
![](https://images.viblo.asia/ea48dd32-8bba-4a4e-93ee-2c2c27fdfeb9.png)

##  Kết luận
Trong phần này tôi đã trình bày các bước cơ bản để trở thành App Developer và có thể build ứng dụng để đẩy lên App store. Trong bài tiếp theo tôi sẽ hướng dẫn cách để build App và Submit app.

Part 2: https://viblo.asia/p/cac-buoc-submit-ung-dung-len-app-store-part-2-Ljy5VpbbZra