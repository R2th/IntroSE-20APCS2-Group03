# Mở Đầu
Ngày này với sự phát triển nhanh chóng của internet, điện thoại thông minh thì việc mua sắm trực tuyến, đặt đồ ăn online, thanh toán các loại hóa đơn bằng điện thoại thông mình đang trở lên rất phổ biến, tuy nhiên việc thanh toán trực tuyến tiềm ẩn rất nhiều rủi ro về bảo mật. Nó là vấn đề quyết định đến sự sống còn của các dịch vụ thanh toán và mua sắm trực tuyến và FIDO nổi lên như một ứng viên sáng giá về cung giải pháp bảo mật cho các nhà cung cấp dịch vụ. Vậy FIDO là gì chúng t cùng tìm hiểu xem nhé 
# FIDO Là Gì ?
FIDO là từ viết tắt của Fast IDentity Online, cái tên đã nói lên tất cả có thể hiểu nó là xác thực nhanh trực tuyến.
- FIDO là hiệp hội cộng nghiệp mở với xử mệnh tập trung các tiêu chuẩn xác thực để giảm sự phụ thuộc password . Nỗ lực thay đổi bản chất xác thực bằng các tiêu chuẩn an toàn hơn password và OTP , đơn giản cho người dùng dễ triển khai cho các nhà cung cấp dịch vụ 

### Cách thức hoạt động
Các giao thực của FIDO sử dụng tiêu chuẩn mã hóa công khai để cung cấp giải pháp xác thực mạnh mẽ . trong suốt quá trình đăng kí với một dịch vụ trực tuyến thiết bị người dùng cuối sẽ tạo 1 cặp khóa mới . giữ lại khóa bí mật trong thiết bị , và đăng kí thiết bị công khai với nhà cung cấp dịch vụ trực tuyến . việc xác thực được thực hiện bằng cách người dùng sử dụng thiết bị lưu giữ khóa riêng để ký vào các chuỗi yêu cầu từ hệ thống cung cấp dịch vụ trực tuyến . các khóa riêng này chủ được sử dụng kho các thiệt bị lưu khóa được mở bởi chính chủ nhân của nó . việc mở khóa được thực hiện một cách an toàn  vân tay , mã pin, chèn một thiết bị xác thực hai yếu tố hoặc nhấn nút trên thiết bị .
![](https://images.viblo.asia/74b2dff7-ec2d-429e-8964-540a07cae954.png)

![](https://images.viblo.asia/ad1ccfaf-f2a1-4a0a-bb51-2e839f7c45be.png)
### 	Tiêu chuẩn xác thực của FIDO 

FIDO có 2 tiêu chuẩn  :
* UAF  xác thực không mật khẩu
* U2F  xác thực 2 bước 

![](https://images.viblo.asia/b6414724-09b8-49c8-ab15-26e174fb46d8.png)

![](https://images.viblo.asia/26d0bac9-cdff-477c-ab20-15b84a1fd8c5.png)
##### UAF 
UAF là từ viết tắt của Universal Authentication Framework,các giao thức FIDO UAF cho phép các dịch vụ trực tuyến sử dụng cơ chế bảo mật không sử dụng mật khẩu (password-less) và bảo mật đa yếu tố. Người dùng có thể đăng ký tài khoản của mình một cách trực tuyến với những thông tin đi kèm thông qua việc quét vân tay, quét võng mạc bằng camera, nói vào micro hoặc thậm chí đơn giản là cung cấp một mã PIN. Giao thức UAF cho phép người dùng được lựa chọn phương pháp xác thực nào tiện lợi và tối ưu nhất dựa vào tính năng xác thực mà thiết bị của người dùng đang sở hữu. Chỉ bằng một lần đăng ký, người dùng đơn giản là thực hiện lại hành động kiểm tra sinh trắc học hoặc nhập PIN để có thể xác thực cho các dịch vụ trực tuyến này mà không cần nhớ đến những chuỗi mật khẩu dài dòng nữa. Bên cạnh đó, UAF còn cho phép cơ chế xác thực nhiều lớp kết hợp chẳng hạn như kết hợp vân tay + PIN.

 có thể tưởng tượng đến UAF như cách mà Apple sử dụng cảm biến Touch ID để giúp chúng ta đăng nhập vào App Store, hay cách mà Samsung dùng cảm biến vân tay từ đời Note 4, Note 5, S6, S6 Edge đến các thế hệ tiếp theo để giúp bạn login vào các website hay mua hàng PayPal mà không cần gõ mật khẩu. Mỗi khi cần xác thực, chỉ việc để ngón tay lên cảm biến là xong, mọi thứ khác sẽ được tiến hành hoàn toàn tự động.

* Mô hình Kiến trúc UAF.

![](https://images.viblo.asia/0866a817-5bcd-4aaa-a502-72f67f404b85.png)
FIDO client : thực hiện thực hiện giao thức FIDO UAF ở phía người dùng có nhiệm vụ 
*	Tương tác với bộ xác thực FIDO authenticatior thông qua lớp thư viện ASM – authenticator Speccific Module một bộ thư viện chuẩn giao tiếp với bộ thiết bị xác thực tương ứng .
*	Thông qua tương tác với 1 user agent trên thiết bị như ứng dụng di động trình duyệt giao tiếp với hệ thống máy chủ FIDO server .
FIDO server : thực hiện giao thức FIDO UAF ở phía máy chủ server có nhiệm vụ .
*	Tương tác với máy chủ web để giao tiếp giữa giao thức của FIDO UAF với client FIDO UAF.
*	Xác nhận bộ chứng thực FIDO UAF đã được đăng kí sử dụng  
*	Quản lý sự liên kết giữa các tài khoản người dùng với bộ xác thực 
* Kiểm tra xác thực người dùng và gửi đáp ứng xác nhận giao dịch để xác minh tính hợp lệ của chúng .
FIDO UAF protocol : mang thông điệp giao tiếp giữu thiết bị người dùng sử dụng với relaying party . gói giao thứu có các loại  
*	Đăng ký bộ xác thực 
*	Xác thực người dùng 
*	Xác nhận giao dịch an toàn 
*	Xóa đăng kí bộ xác thực
FIDO UAF authencator abstraction layer : lớp mô tả bộ xác thực  UAF cung cấp thông tin về các API để các FIDO client sử dụng .
FIDO UAF authenticator : bộ xác thực  FIDO UAF là một thực thể an toàn , kết nối hoặc được tích hợp trong chính thiết bị FIDO UAF , có thể tạo ra các dữ liệu rất quan trọng để gửi đến relying party 
FIDO UAF Authentiacator Metadata Validation :  siêu dữ liệu xác minh bộ phận xác thực , khóa bảo mật trong bộ phận xác thực tạo ra ký và FIDO server sẽ xác minh chữ ký này sử dụng khóa công khai đã được lưu trong hệ thống máy chủ . siêu dữ liệu chứa các giáy chứng nhận được lưu trên hệ thống máy chủ .

Phương Thức : đăng kí xác thực , xác thực người dùng ,  xác thực giao dịch , xóa toàn bộ đăng kí. 

###### 	Đăng kí xác thực FIDO UAF .
![](https://images.viblo.asia/cb26fb9f-bc1f-4bbe-a0c3-10351fdbbf83.PNG)
*  app , dịch vụ  người dùng  gửi yêu cầu đăng kí với FIDO server
*  FIDO server gửi lại yêu cầu  + điều kiên xác nhận  cho dịch vụ người dùng 
*  người dùng tạo 1 cặp khóa cụ thể cho ứng dụng và giữ lại  private key
* dịch vụ gửi lại đăng kí chứng thực kèm theo public key 
* xác nhận phản hồi chứng thực
###### Xác thực 
![](https://images.viblo.asia/9006e9fd-74c7-4610-82fb-7ba7868dad8c.PNG)

* dịch vụ người dùng  gửi yêu cầu xác thực lên FIDO server . 
* FIDO server gửi lại yêu cầu xác thực + điều kiện  cho thiết bị người dùng   
* Xác minh mở khóa người dùng bằng hành động sử dụng private key 
* Phản hồi xác thực có kèm theo private key
* Xác nhận phản ứng  sử dụng người dùng  khóa công khai

###### Xác nhận giao dịch 
![](https://images.viblo.asia/6fa8e31e-576b-4bae-a68b-395b181e4bfb.PNG)
*  Dịch vụ người dùng gửi yêu cầu lên server FIDO 
*  FIDO server gửi “văn bản giao dịch ” cho  client yêu cầu người dùng xác nhận xác nhận
*  Người dùng xác nhận văn bản giao dịch và khóa riêng 
* Văn bản giao dịch được kí bởi hàm băm và khóa riêng
*	Xác nhận phản hồi của văn bản hàm băm và khóa công khai

# Kết Luận
Bài viết khá dài nên  phần `U2F` mình xin phép được trình bày ở bài tiếp theo. Trong bài tiếp theo mình sẽ trình bày về `U2F`, ứng dụng của nó trong các lĩnh vực đời sống. Cảm ơn  các bạn đã theo dõi