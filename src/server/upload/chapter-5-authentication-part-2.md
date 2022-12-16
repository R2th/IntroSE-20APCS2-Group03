Trong Chương 4, chúng tôi đã đề cập đến hầu hết các trang web sử dụng tên người dùng và mật khẩu cho thông tin xác thực. Chúng ta cũng đã thảo luận về cách sử dụng lại các thông tin đăng nhập này để truy cập API không an toàn, do đó, API thường yêu cầu một bộ thông tin xác thực khác với thông tin đăng nhập được sử dụng để đăng nhập vào trang web. Một ví dụ phổ biến là các khóa API. Trong chương này, chúng tôi xem xét một giải pháp khác, Ủy quyền mở (OAuth), đang trở thành lược đồ xác thực được sử dụng rộng rãi nhất trên web.

## Làm cho cuộc sống dễ dàng hơn với mọi người

Bạn đã bao giờ phải hoàn thành một mẫu đăng ký như dưới đây?

![](https://images.zapier.com/storage/photos/f5ea39b4353c2b8bb4b0b4eb9c26f753.png?format=jpg)
*Hình 1. Khóa sản phẩm như đã thấy trên mẫu đăng ký Windows 8 của Microsoft.*

Nhập một khóa dài vào trường biểu mẫu như trường hợp trên rất tệ cho trải nghiệm người dùng. Đầu tiên, bạn phải tìm khóa cần thiết. Chắc chắn, nó đã ở ngay trong hộp thư đến của bạn khi bạn mua phần mềm, nhưng một năm sau, bạn cố gắng để nhớ ra nó (Email nào được gửi từ đâu? Tôi đã sử dụng email nào để đăng ký?!) nhập một thứ hoàn hảo - làm một lỗi đánh máy hoặc thiếu một ký tự sẽ dẫn đến thất bại, hoặc thậm chí có thể khiến bạn bị khóa khỏi phần mềm chưa đăng ký của bạn!

Buộc người dùng làm việc với các khóa API là một trải nghiệm tệ tương tự. Typose là một vấn đề phổ biến và nó yêu cầu người dùng thực hiện một phần thiết lập giữa máy khách và máy chủ theo cách thủ công. Người dùng phải lấy khóa từ máy chủ, sau đó đưa nó cho máy khách. Đối với các công cụ có nghĩa là tự động hóa công việc, chắc chắn có một giải pháp tốt hơn.

Nhập OAuth. Tự động hóa trao đổi khóa là một trong những vấn đề chính mà OAuth giải quyết. Nó cung cấp một cách tiêu chuẩn để khách hàng nhận được một khóa từ máy chủ bằng cách đưa người dùng đi qua một bộ các bước đơn giản. Từ quan điểm của người dùng, tất cả OAuth yêu cầu là nhập thông tin đăng nhập. Đằng sau hậu trường, máy khách và máy chủ đang trò chuyện qua lại để lấy cho khách một khóa hợp lệ.

Hiện tại có hai phiên bản OAuth, được đặt tên khéo léo là OAuth 1 và OAuth 2. Hiểu các bước trong quá trình là cần thiết để có thể tương tác với các API sử dụng chúng để xác thực. Vì họ chia sẻ một quy trình công việc chung, chúng ta sẽ tìm hiểu các bước xác thực của OAuth 2, sau đó chỉ ra các cách mà OAuth 1 khác bản 2 như thế nào.

## OAuth 2

Để bắt đầu, trước tiên chúng ta cần biết các thành phần tham gia vào một giao dịch của OAuth:

* Người dùng - Một người muốn kết nối hai trang web họ sử dụng
* Máy khách - Trang web được cấp quyền truy cập vào dữ liệu của người dùng
* Máy chủ - Trang web chứa dữ liệu của người dùng

Một mục tiêu của OAuth 2 là cho phép các doanh nghiệp điều chỉnh quy trình xác thực theo nhu cầu của họ. Do tính chất có thể mở rộng này, API có thể có các bước hơi khác nhau. Quy trình công việc được hiển thị bên dưới là một quy trình phổ biến được tìm thấy trong số các ứng dụng dựa trên web. Các ứng dụng di động và máy tính để bàn có thể sử dụng các biến thể nhỏ trong quy trình này.

Cùng với đó, dưới đây là các bước của OAuth 2.

### Bước 1 - Người dùng báo cho máy khách kết nối với máy chủ

![](https://images.zapier.com/storage/photos/14308b92c1ecbf386bf6f9968a26655d.png?format=jpg)

Người dùng bắt đầu quá trình bằng cách cho máy khách biết rằng họ muốn nó kết nối với máy chủ. Thông thường, điều này là bằng cách nhấp vào một nút.

### Bước 2 - Máy khách hướng người dùng đến máy chủ

Máy khách sẽ gửi thông tin người dùng đến trang web của máy chủ, cùng với một URL mà máy chủ sẽ gửi lại cho người dùng sau khi người dùng xác thực, được gọi là callback URL.

![](https://images.zapier.com/storage/photos/c5abbc5bbb8113fe396c3f1142365d30.png?format=jpg)

### Bước 3 - Người dùng đăng nhập vào máy chủ và cấp quyền truy cập của máy khách

![](https://images.zapier.com/storage/photos/6598fef75989e1c6631633cc5e6b500b.png?format=jpg)

Với tên người dùng và mật khẩu thông thường, người dùng sẽ xác thực với máy chủ. Hiện tại, máy chủ chắc chắn rằng một trong những người dùng của chính họ đang yêu cầu máy khách được cấp quyền truy cập vào tài khoản của người dùng và dữ liệu liên quan.

### Bước 4 - Máy chủ gửi thông tin người dùng trở lại máy khách, cùng với mã

![](https://images.zapier.com/storage/photos/4fa7f92cfc3ec2539ce2d91bc0bbb900.png?format=jpg)

Máy chủ sẽ gửi người dùng trở lại máy khách (đến call back URLtừ Bước 2). Ẩn trong phản hồi là một mã ủy quyền duy nhất cho khách hàng.

![](https://images.zapier.com/storage/photos/95009dd46bc2d822372c572b5788f59a.png?format=jpg)

### Bước 5 - Máy khách trao đổi mã + khóa bí mật để có được mã truy cập

Máy khách nhận mã ủy quyền mà nó nhận được và đưa ra yêu cầu khác đến máy chủ. Yêu cầu này bao gồm khóa bí mật của máy khách. Khi máy chủ nhìn thấy mã ủy quyền hợp lệ và khóa bí mật của máy khách đáng tin cậy, chắc chắn rằng máy khách là người dùng hoặc nó đang hành động thay mặt cho người dùng thực. Máy chủ phản hồi lại với mã thông báo truy cập.

![](https://images.zapier.com/storage/photos/7e0f9c20bc4504568d73d329b2fe940f.png?format=jpg)

### Bước 6 - Máy khách lấy dữ liệu từ máy chủ

![](https://images.zapier.com/storage/photos/249b7ca9a56bda87413b4de175e79981.png?format=jpg)

Tại thời điểm này, khách hàng có thể tự do truy cập máy chủ thay mặt cho người dùng. Mã thông báo truy cập từ Bước 6 về cơ bản là một mật khẩu khác vào tài khoản của người dùng trên máy chủ. Máy khách sẽ gửi mã truy cập với mọi yêu cầu để nó có thể xác thực trực tiếp với máy chủ.

## Làm mới mã thông báo khách hàng (Tùy chọn)

Một tính năng được giới thiệu trong OAuth 2 là tùy chọn để có quyền truy cập mã thông báo hết hạn. Điều này hữu ích trong việc bảo vệ tài khoản của người dùng bằng cách tăng cường bảo mật - mã thông báo hết hạn càng nhanh, mã thông báo bị đánh cắp càng ít thời gian, tương tự như cách số thẻ tín dụng hết hạn sau một thời gian nhất định. Tuổi thọ của mã thông báo được đặt bởi máy chủ. API trong tự nhiên sử dụng mọi thứ từ vài giờ đến vài tháng. Sau khi đạt được tuổi thọ, khách hàng phải yêu cầu máy chủ cung cấp mã thông báo mới.

## OAuth 1 khác như thế nào

Có một số khác biệt chính giữa các phiên bản của OAuth. Cái mà chúng ta đã đề cập ở trên; mã thông báo truy cập không hết hạn.

Một điểm khác biệt là OAuth 1 bao gồm một bước bổ sung. Giữa các bước 1 và 2 ở trên, OAuth 1 yêu cầu khách hàng yêu cầu máy chủ cung cấp mã thông báo yêu cầu. Mã thông báo này hoạt động giống như mã ủy quyền trong Oauth 2 và là mã được trao đổi để có được mã thông báo truy cập.

Một điểm khác biệt thứ ba là OAuth 1 yêu cầu phải được ký điện tử. Chúng tôi sẽ bỏ qua các chi tiết về cách hoạt động của việc ký (bạn có thể tìm các thư viện mã để làm việc này cho mình), nhưng điều đáng biết là tại sao nó lại ở một phiên bản chứ không phải phiên bản kia. Yêu cầu ký là một cách để bảo vệ dữ liệu khỏi bị giả mạo trong khi nó di chuyển giữa máy khách và máy chủ. Chữ ký cho phép máy chủ xác minh tính xác thực của các yêu cầu.

Tuy nhiên, ngày nay, hầu hết lưu lượng API xảy ra trên một kênh đã được bảo mật (HTTPS). Nhận thức được điều này, OAuth 2 đã loại bỏ chữ ký trong nỗ lực làm cho phiên bản hai dễ sử dụng hơn. Sự đánh đổi là OAuth 2 dựa vào các biện pháp khác để cung cấp bảo mật cho dữ liệu trong quá trình vận chuyển.

## Ủy quyền

Một yếu tố của OAuth 2 đáng được chú ý đặc biệt là khái niệm giới hạn quyền truy cập, được gọi là ủy quyền. Quay lại Bước 2, khi người dùng nhấp vào nút để cho phép khách hàng truy cập. Các quyền đó, được gọi là scope, là một tính năng quan trọng khác của OAuth 2. Chúng cung cấp một cách để khách hàng yêu cầu quyền truy cập hạn chế vào dữ liệu của người dùng, do đó giúp người dùng tin tưởng khách hàng dễ dàng hơn.

Điều làm cho phạm vi mạnh mẽ là nó là các hạn chế dựa trên máy khách. Không giống như Khóa API, trong đó các giới hạn được đặt trên khóa ảnh hưởng đến mọi khách hàng như nhau, phạm vi OAuth cho phép một khách hàng có quyền X và các quyền khác X và Y. Điều đó có nghĩa là một trang web có thể xem các liên hệ của bạn, trong khi một trang web khác có thể xem và chỉnh sửa chúng.

## Chapter 5 Recap

Trong chương này, chúng tôi đã tìm hiểu dòng quy trình xác thực OAuth. Chúng tôi so sánh hai phiên bản, chỉ ra sự khác biệt lớn giữa chúng.

Các thuật ngữ chính chúng ta đã tìm hiểu là:

* OAuth: một sơ đồ xác thực tự động hóa trao đổi khóa giữa máy khách và máy chủ.

* Mã thông báo truy cập (Access Token): một mã bí mật mà khách hàng có được khi hoàn thành thành công quy trình OAuth.

* Phạm vi: quyền xác định quyền truy cập của khách hàng đối với dữ liệu của người dùng.

## Next

Trong chương tiếp theo, chúng ta sẽ xem xét một số khái niệm cơ bản trong thiết kế API, bao gồm cách API tổ chức dữ liệu của họ để khách hàng có thể dễ dàng truy cập những gì họ muốn.

Go to Chapter 6!

## TÀI LIỆU THAM KHẢO
https://zapier.com/learn/apis/chapter-5-authentication-part-2/