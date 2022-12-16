Sau bốn chương chúng ta bắt đầu có thêm sự hiểu biết về API. Chúng ta biết máy khách và máy chủ là gì, chúng ta biết cách chúng sử dụng HTTP để nói chuyện với nhau và chúng ta biết chúng dùng các định dạng dữ liệu cụ thể để hiểu nhau. Tuy nhiên, biết cách chúng nói chuyện ra sao, thì một câu hỏi quan trọng phát sinh là: làm thế nào để máy chủ biết máy khách gửi yêu cầu là ai? Trong chương này, chúng ta sẽ khám phá hai cách mà máy khách có thể chứng minh danh tính của mình với máy chủ.

## Danh tính trong thế giới ảo

Bạn có thể đã đăng ký một tài khoản trên một trang web trước đây. Quá trình này bao gồm trang web yêu cầu bạn cung cấp một số thông tin cá nhân, đáng chú ý nhất là tên người dùng và mật khẩu. Hai mẩu thông tin này trở thành dấu hiệu nhận dạng của bạn. Chúng tôi gọi đây là thông tin đăng nhập của bạn. Khi bạn truy cập trang web một lần nữa, bạn có thể đăng nhập bằng cách cung cấp các thông tin đăng nhập.

Đăng nhập bằng tên người dùng và mật khẩu là một ví dụ về quy trình kỹ thuật được gọi là xác thực. Khi bạn xác thực với một máy chủ, bạn chứng minh danh tính của mình với máy chủ bằng cách cho nó biết thông tin mà chỉ bạn biết (ít nhất chúng tôi hy vọng chỉ có bạn biết điều đó). Khi máy chủ biết bạn là ai, nó có thể tin tưởng bạn và tiết lộ dữ liệu riêng tư trong tài khoản của bạn.

Có một số kỹ thuật của API được sử dụng để xác thực khách hàng. Chúng được gọi là sơ đồ xác thực. Bây giờ chúng ta hãy cùng tìm hiểu hai trong số các chương trình này nhé.

## Xác thực cơ bản

Ví dụ đăng nhập ở trên là hình thức xác thực cơ bản nhất. Trên thực tế, tên chính thức của nó là Xác thực cơ bản. Mặc dù tên này không giành được bất kỳ giải thưởng sáng tạo nào, nhưng lược đồ này là một cách hoàn toàn chấp nhận được để máy chủ xác thực ứng dụng khách trong API.

Xác thực cơ bản chỉ yêu cầu tên người dùng và mật khẩu. Máy khách lấy hai thông tin này, kết hợp chúng lại với nhau để tạo thành một giá trị và chuyển yêu cầu đó trong một tiêu đề HTTP có tên là Ủy quyền (Authorization).

![](https://images.zapier.com/storage/photos/8c6904593b69ea46786f22fe1642f78c.png?format=jpg)

Khi máy chủ nhận được yêu cầu, nó nhìn vào tiêu đề Ủy quyền và so sánh nó với thông tin đăng nhập mà nó đã lưu trữ. Nếu tên người dùng và mật khẩu khớp với một trong những người dùng trong danh sách của máy chủ, máy chủ sẽ đáp ứng yêu cầu của khách hàng với tư cách là người dùng đó. Nếu không khớp, máy chủ trả về mã trạng thái đặc biệt (401) để cho khách hàng biết rằng xác thực thất bại và yêu cầu bị từ chối.

Mặc dù Basic Auth là một lược đồ xác thực hợp lệ, tuy nhiên ý tưởng sử dụng tên người dùng và mật khẩu để truy cập API để quản lý tài khoản không phải là một ý tưởng hay. Điều đó giống như việc khách sạn trao cho khách một chìa khóa có thể mở toàn bộ tòa nhà chứ không phải cho một căn phòng.

Tương tự với API, có thể đôi khi máy khách có quyền khác với chủ tài khoản. Lấy ví dụ một chủ doanh nghiệp thuê một nhà thầu viết chương trình sử dụng API thay mặt họ. Việc tin tưởng nhà thầu và trao thông tin đăng nhập của tài khoản sẽ khiến chủ sở hữu gặp rủi ro vì một nhà thầu vô đạo đức có thể thay đổi mật khẩu, password tài khoản của họ. Rõ ràng, nó sẽ là tốt đẹp nếu có một sự thay thế an toàn hơn.

![](https://images.zapier.com/storage/photos/9d065ad75953f866fd3e43698f723135.png?format=jpg)

## API Key Authentication

Xác thực khóa API là một kỹ thuật khắc phục điểm yếu của việc sử dụng thông tin đăng nhập được chia sẻ bằng cách yêu cầu API được truy cập bằng một khóa duy nhất. Trong sơ đồ này, khóa thường là một chuỗi dài các chữ cái và số khác với mật khẩu đăng nhập của chủ tài khoản. Chủ sở hữu đưa chìa khóa cho khách hàng, rất giống như một khách sạn đưa cho khách một chìa khóa cho một phòng.

Khi máy khách xác thực bằng khóa API, máy chủ sẽ biết cho phép máy khách truy cập dữ liệu, nhưng giờ đây có tùy chọn để giới hạn các chức năng quản trị, như thay đổi mật khẩu hoặc xóa tài khoản. Đôi khi, các khóa được sử dụng đơn giản để người dùng không phải cung cấp mật khẩu. Tính linh hoạt là có với xác thực API Key để hạn chế kiểm soát cũng như bảo vệ mật khẩu người dùng.

Vậy, khóa API được gửi như thế nào? Có một tiêu đề cho nó, phải không? Thật không may, không có. Không giống như Basic Auth, một tiêu chuẩn được thiết lập với các quy tắc nghiêm ngặt, các khóa API đã được hình thành tại nhiều công ty trong những ngày đầu của web. Kết quả là, xác thực khóa API hơi giống với miền tây hoang dã; Mọi người đều có cách làm riêng của họ.

Tuy nhiên, theo thời gian, một vài cách tiếp cận phổ biến đã xuất hiện. Một là để khách hàng đặt khóa trong tiêu đề Ủy quyền, thay cho tên người dùng và mật khẩu. Một cách khác là thêm khóa vào URL (http://example.com?api_key=my_secret_key). Ít phổ biến hơn là chôn khóa ở đâu đó trong thân yêu cầu bên cạnh dữ liệu. Bất cứ nơi nào chìa khóa đi, hiệu ứng là như nhau - nó cho phép máy chủ xác thực ứng dụng của máy khách.

## Tóm tắt chương 4:

Trong chương này, chúng tôi đã tìm hiểu làm thế nào máy khách có thể chứng minh danh tính của mình với máy chủ, một quá trình được gọi là xác thực. Chúng ta đã xem xét hai kỹ thuật hay sơ đồ, API sử dụng để xác thực.

Các thuật ngữ chính chúng ta đã học là:
1. **Authentication**: quá trình máy khách chứng minh danh tính của mình với máy chủ
2. **Credentials**: những mẩu thông tin bí mật được sử dụng để chứng minh danh tính của máy khách (tên người dùng, mật khẩu ...)
3. **Basic Auth**: lược đồ sử dụng tên người dùng và mật khẩu được mã hóa cho thông tin đăng nhập
4. **API Key Auth**: lược đồ sử dụng khóa duy nhất cho thông tin đăng nhập
5. **Authorization Header**: tiêu đề HTTP được sử dụng để giữ thông tin đăng nhập

## Tiếp theo
Trong chương tiếp theo, chúng ta tiếp tục thảo luận về xác thực bằng cách xem xét một kỹ thuật thứ ba; một trong đó đang nhanh chóng trở thành tiêu chuẩn của web.

*Go to Chapter 5!*

## TÀI LIỆU THAM KHẢO

https://zapier.com/learn/apis/chapter-4-authentication-part-1/