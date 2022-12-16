![](https://images.viblo.asia/753cc8cd-065a-4e53-b539-ae078ab66a66.jpg)


   iOS (trước đây là iPhone OS) là hệ điều hành trên các thiết bị di động của Apple. Đây là hệ điều hành chạy trên các sản phẩm iPhone, iPad, và iPod Touch và là hệ điều hành phổ biến thứ 2 trên toàn cầu, sau Android.
  
Chính vì việc nó đứng thứ 2 trên toàn cầu nên các công cụ hổ trợ để phát triển nó cũng được nâng cấp lên từng ngày. Có rất nhiều ứng dụng để phục vụ việc phát triển được đưa ra. 

TestFlight Beta Testing là một sản phẩm của Apple giúp giới thiệu ứng dụng đang chạy thử nghiệm đến người dùng một cách dễ dàng hơn trước khi phát hành trên App Store.


Quá trình này được thực hiện thông qua iTunes Connect, cổng kết nối các nhà phát triển với thế giới. Trong bài hướng dẫn này, bạn sẽ được hướng dẫn chi tiết triển khai ứng dụng iOS, OS X trên App Store từ Xcode tới App Store bằng cách sử dụng iTunes Connect.

# III. Deploy TestFlight

## 1. Một số khái niệm.

### b. Apple Developer Account.
Để deploy ứng dụng lên Apple Store đương nhiên là anh Apple không cho mình không cái gì rồi. .Cái này mình nghĩ bạn nên tìm hiểu kỹ để lựa chọn gói cước sử dụng hợp lý nhất. Có 2 loại chính là **Apple Developer Program for Organizations**  99 USD/1 năm và **Apple Developer Enterprise Program** 299 USD/1 năm. 
### a. iTunes Connect là gì?

iTunes Connect là công cụ trên web để quản lý nội dung được bán trến iTunes Store, App Store, Mac App Store và iBook Store. Là các nhà phát triển ứng dụng, bạn sẽ sử dụng công cụ này để quản lý ứng dụng, hợp đồng, thuế, thông tin thanh toán, báo cáo bán hàng…
Khi bạn đăng ký là nhà phát triển ứng dụng, bạn sẽ được truy cập vào iTunes Connect, sử dụng Apple ID, Password, giúp các nhà phát triển quản lý sản phẩm của mình một cách dễ dàng và trực quan hơn, tích hợp công cụ giúp theo dõi xu hướng mới nhất, phân thích hành vi người dùng, nhận thông báo và trả lời từ đánh giá của khác hàng trên ứng dụng ngay trên iPhone, iPad và iPod touch. - Apple

### b. Certificates, App IDs, and Provisioning Profiles

Trước khi bạn có thể triển khai ứng dụng của mình trên App Store, bạn cần phải tạo ra 3 thứ sau:

– Certificate: Để xác định nhà phát triển, nhóm phát triển
Bạn cần request, download và sử dụng các signing certificate để xác thực, chứng nhận bạn có quyền phát triển và phát hành ứng dụng với tài khoản Apple developer tương ứng. Certificate được quản lý dưới dạng public key và private key. Khi muốn share certificate, bạn cần export certificate (private key) dưới dạng file .p12. Nếu làm mất private key, bạn phải tạo lại certificate khác từ đầu. Có 2 loại certificate bạn cần chú ý nó nhé.

– App id: Để xác định duy nhất một ứng dụng trên App Store
Như chúng ta đã biết, Apple phân biệt các ứng dụng với nhau thông qua App ID (định danh của mỗi ứng dụng). App ID là duy nhất và không thể tạo trùng. 

– Provisioning profile: Là chứng nhận ràng buộc, App id, và các thiết bị với nhau.
Một cách ngắn gọn để giải thích về provisioning profile là : Provisioning Profile là sự kết hợp giữa Certificate (Development hoặc Production) với App ID và danh sách Devices . Provisioning Profile có thể được tạo ra tự động nếu bạn enable option Auto Signing trên Xcode hoặc có thể được tạo và quản lý bởi các tài khoản admin trở lên. Để tạo provisioning profile cho một app ở môi trường development, bạn cần chọn App ID, chọn các Certificate được join vào, chọn list devices. 

## 2. Cách thức thực hiện.
Dưới đây là cách mà mình đã deploy một ứng dụng lên TestFlight 


###  Create App IDs Identifiers

Trước tiên bạn phải truy cập vào trang quản lý của Apple sau khi mua account với URL như sau : https://developer.apple.com/account/ios/identifier/bundle

Sau đó ấn vào button dấu cộng để add thêm App ID vào account của mình.
![](https://images.viblo.asia/bdab58b2-2338-445e-bda3-1193f3cebd49.png)

###  White Name and bundle ID

Nhập đúng tên App và bundle id của app trên Xcode của bạn .

![](https://images.viblo.asia/9f349bdc-fbf3-4217-9787-08f983c20cd5.png)

### Open keychain Access


![](https://images.viblo.asia/f6a4199f-a863-46e3-9ad6-43e440c38184.png)

### Request Certificate from Macbook Device

![](https://images.viblo.asia/536297e4-5ff2-4e06-8ed6-1ef9079d7dcc.png)

### Choose file Certificate and update it

Sau khi request Certificate từ Macbook Device bạn chọn file và update  lên ở đây nhé.
Sử dụng CSR bạn đã tạo và chon Generate ở dưới. Tải về Certificate và thêm nó vào Keychain Access bằng cách kích đúp vào nó. Tải về, cài đặt, và lưu trữ Certificate vừa sinh ra .
![](https://images.viblo.asia/33541352-02cb-484c-abee-c79fa60f8b42.png)

### Create Provisioning profile (Chose App Store)

Tiếp theo là đến phần tạo Provisioning.
Chọn kiểu Provisioning Profile muốn tạo, bạn sẽ được thông báo 3 kiểu như sau:
• iOS App Development
• App Store Distribution
• Ad Hoc Distribution
Chúng ta quan tâm tới App Store Distribution provisioning profile.

Làm như hình ảnh bên dưới nhe.
![](https://images.viblo.asia/de662777-d7f1-4ca4-9f18-67026f2b85cb.png)

### Choose Team cetificate.

![](https://images.viblo.asia/4cbb19db-ad7a-40f4-a990-20fab20be80f.png)

Sau khi chọn team xong . Click nút Download để lưu nó vào Development machine của bạn và thêm nó vào Xcode bằng cách kích đúp vào nó, click Done để hoàn thành.

## 3. Triển khai ứng dụng lên appstore.

### Login to appstoreconnect and click new app
Các bước ở trên sau khi hoàn thành thì bạn truy cập vào URL bên dưới.
https://appstoreconnect.apple.com/
và chọn mục My Apps để tạo cho mình 1 app trên appstore . Sau đó click để truy cập vào app vừa tạo nhé .
![](https://images.viblo.asia/32152187-7b66-4fd2-8429-bebf7d9b8415.png)

### In Xcode choose team cetificate
Các bước chuẩn bị đả hoàn thành. Bây giờ việc quan trọng nửa là chúng ta đẩy app lên. 

Trên Xcode bạn chọn đến cái team mà bạn đả tạo ở phần trên sau khi add 
![](https://images.viblo.asia/e939dcb9-fcdf-41f1-8ed0-22110ba4d1a5.png)

### Choose Archive and build 

![](https://images.viblo.asia/e792d843-e8e0-4ba4-9333-dfa61dac7046.png)

### After archives choose Distribute App

![](https://images.viblo.asia/036a6634-4a83-4ff1-8074-06d07a8be618.png)

### Click next and next to success .

![](https://images.viblo.asia/3253ba8a-84ba-4430-ade0-bc14b87ae4db.png)

### Login with appstoreconnect

![](https://images.viblo.asia/5fca9deb-05f6-42b2-bb3b-59f586452edd.png)

### Choose TestFlight

![](https://images.viblo.asia/3afca6ce-3922-402e-a804-92db17ed9812.png)

### And add new tester

![](https://images.viblo.asia/8511e84a-f48f-4bdf-844c-babc7afdecc2.png)

## 4. Create and Enable Testers to Beta Test Apps

Sau khi upload file ipa lên Itunes connect. Ứng dụng của bạn đã có thể invite cho testers , user mà bạn muốn.
Apple cho phép bạn định nghĩa 2 kiểu tester:

- Internal Tester:
Cho phép user có quyền truy cập, xem thông tin ứng dụng như Admin, Technical, App Manager, Developer, hoặc Marketer. Nó thường được sử dụng khi bạn làm một thành viên của team phát triển phần mềm hoặc khách hàng mà bạn đang phát triển ứng dụng cho họ. Bạn có thể add tối đa 25 internal testers.

- External Tester: Bạn có thể add bất kỳ ai bên ngoài nhóm phát triển của bạn cũng được. Họ có vai trò như những user đầu tiên trải nghiệm ứng dụng của bạn, có thể là tester. Và họ chỉ có quyền truy cập tải và cài đặt ứng dụng thông qua ứng dụng Itunes Connect của Apple khi được invite qua mail. Bạn có thể add tối đa 2000 external testers.

Để Add một Internal Tester, đầu tiên bạn truy cập vào Itune Connect. 
### Chọn User And Roles để Add thêm User.

Bạn cần nhập Tên và email người dùng bạn muốn invite.
URL : https://appstoreconnect.apple.com/access/users

![](https://images.viblo.asia/dc472a1c-7866-481b-8884-5c4283cb9c9c.png)
Sau đó chọn Next. Tại đây bạn uỷ quyền cho user với ứng dụng tương ứng. Nếu bạn chọn đó là Admin hoặc Finance thì user có full quyền với tất cả ứng dụng. Còn với các trường hợp khác bạn có thể cho phép user truy cập vào một số ứng dụng mà bạn cho phép và các nội dung được Apple thống kê bên dưới.

Sau cùng bạn config Notification cho user mà bạn mong muốn họ nhận được. Sau đó chọn Save lại là xong.

Một email Invitation sẽ được gửi đên người dùng và yêu cầu validate trước khi truy cập vào thông tin ứng dụng.

### Starting Beta Testing
My App lựa chọn ứng dụng của bạn. Chọn tab Activity. Tại đây bạn sẽ thấy tất cả các build mà bạn đã upload lên Itunes connect. Trường hợp build của bận ở trạng thái processing thì bạn phải đợi Apple kết thúc quá trình processing nó có thể mất vài phút đến 1h.

![](https://images.viblo.asia/542cc52f-67d4-4896-8a33-ec1da3227520.png)

Sau khi build của bạn đã active trên Itunes connect. Tiếp theo bạn chọn tab TestFlight. Nhập thông tin cho version test.

Add người bạn muốn invite test vào . Thêm Internal Testers mà bạn muốn invite bằng cách bấm vào dấu + sau đó chọn những User bạn đã Add trước đó. Bạn có thể edit thêm hoặc xoá các user đã add vào trước đó.

![](https://images.viblo.asia/843e4ce3-f261-49ba-8845-36109a5861e2.png)

Cuối cùng click start testing để gửi invitation cho tất cả user bạn đã add.

Sau khi đã add tất cả các user/ tester mà bạn muốn gửi invitation, save lại. Sau cùng chọn start testing. Inviation của bạn đã được gửi đi.

### Testing an App
Nếu bạn được invite bạn sẽ nhận được một email Invitaion TestFlight. 


Để cài đặt được ứng dụng của mình bạn cần phải cài đặt ứng dụng TestFlight mà apple cung cấp.
Bạn có thể cài đặt nó ở đây TestFlight

Sau khi cài đặt xong TestFlight bạn login với tài khoản đã được invite. và cài đặt ứng dụng mà bạn đã được invite.


Xong bây giờ user của bạn đã có thể trải nghiệm ứng dụng của bạn.

## 5.Kết Luận

Trong quá trình cài đặt và upload cùng với việc đợi review là khá nhiều và tốn thời gian của bạn, nói cách khác là khá rườm rà. Nhưng theo mình nghĩ nó là giải pháp tốt nhất để đưa ứng dụng của bạn tới user/tester đặc biệt là khách hàng của bạn. Bạn sẽ không cần phải gửi file ipa nặng nề, add UDID các kiểu. Hay cần một tài khoản enterprise để khách hàng có thể cài đặt ứng dụng của bạn mà không cần add UDID. Mặt khác nó còn là bước chuẩn bị cho bạn submit ứng dụng lên Apple store một cách nhanh chóng sau khi đả hoàn thành việc test.


Thank bạn đả theo dõi .Chờ đợi bài viết cuối cùng về việc deploy lên applestore của mình nhé.