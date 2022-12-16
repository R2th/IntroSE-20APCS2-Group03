![](https://images.viblo.asia/77eaa6b4-e4ea-4a86-af89-fd0a4308d933.png)

## API Testing như thế nào cho đúng?

Có lẽ đa số chúng ta cũng đã từng làm việc với API Testing rồi phải không ạ? Nếu các bạn đã từng tham gia vào các khóa học về Testing thì cũng đã biết cách làm sao để Test API, và làm sao để sử dụng POSTMAN để triển khai API như thế nào rồi phải không ạ? Vậy thì trong bài viết này, mình sẽ hướng dẫn các bạn cách sắp xếp lại các Test cases và cách Test API một cách thông minh và hợp lý.

![](https://images.viblo.asia/6831a4db-0a6c-4995-8d6a-9f7e1220598d.png)

Nhắc lại một chút về API, thì API cũng chỉ là cầu nối giữa Server và Client, nó không thực hiện bất kỳ một Business logic nào cả, nó chỉ đơn thuần là chuyển giao thông tin mà thôi. Vậy thì, khi Test API chúng ta cần phải tập trung vào Business logic ở phía server.

Để cho dễ hình dung, mình sẽ lấy một ví dụ về các bước để thay đổi mật khẩu.

1.         User vào phần `Profile` để thay đổi mật khẩu
2.         User nhấn vào nút `Update`.
3.         API sẽ chịu trách nhiệm là gửi thông tin mật khẩu cũ và thông tin mật khẩu mới đó về server.
4.         Server sẽ đọc thông tin và kiểm tra.
5.         Nếu tất cả mọi thứ đều OK thì server sẽ tiến hành cập nhật mật khẩu mới.
6.         Server sẽ trả về Response cho Client và nói rằng đã cập nhật thành công.
7.         Cuối cùng là User sẽ nhìn thấy mật khẩu đã được cập nhật thành công.

Vậy thì, khi chúng ta thực hiện các bước 4, 5 và 6, và các bước đó được gọi là `Syntax Testing` và `Functional Testing`.

> 4.         Server sẽ đọc thông tin và kiểm tra.
> 5.         Nếu tất cả mọi thứ đều OK thì server sẽ tiến hành cập nhật mật khẩu mới.
> 6.         Server sẽ trả về Response cho Client và nói rằng đã cập nhật thành công.

Bây giờ chúng ta hãy chùng đi tìm hiểu khái niệm về `Syntax Testing` và `Functional Testing` là gì nha.

### 1. Syntax Testing

`Syntax Testing` là kiểu Test để kiểm tra các method và các data để kiểm tra xem liệu rằng Hệ thống có chấp nhận nếu data đó đúng và từ chối nếu data đó sai hay không?
- Trường hợp 1: Bỏ trống các trường bắt buộc, thì trong Response trả về sẽ có thông báo lỗi, và các thông tin khác không được cập nhật. Server không được thực hiện bất kỳ business logic nào cả.
- Trường hợp 2: Khi chúng ta bỏ trống các trường mà không bất buộc nhập. Thì đương nhiên rồi, sẽ không có lỗi gì cả và server sẽ vẫn thực hiện các tác vụ business logic bình thường.
- Trường hợp 3: Khi chúng ta điền các thông tin sai định dạng. Ví dụ trường `Số điện thoại` các bạn nhập chữ, thì trong Response trả về sẽ có thông báo lỗi.

Thì đó là khái niệm về Syntax Testing. Bây giờ chúng ta sẽ tìm kiểm thêm một khái niệm nữa đó là:

### 2. Functional Testing

`Functional Testing` chính là kiểm tra xem các method xử lý dữ liệu và thực hiện chức năng đó có đúng hay không? Chúng ta có ví dụ như sau:
 - Ví dụ 1: Mật khẩu sau khi Updated có được cập nhật vào Database hay không? Lúc này thì các bạn cần phải kiểm tra data dưới database.
 - Ví dụ 2: Các bạn cần phải kiểm tra thông tin Response trả về có chính xác hay không?
 Đó là những thông tin các bạn cần phải kiểm tra. Qua 2 ví dụ thì các bạn đã hiểu `Functional Testing` là gì rồi phải không ạ? Thì bây giờ chúng ta sẽ đi qua một khái niệm tiếp theo.
 
###  3. Test Scenerios

`Test Scenerios` sẽ giúp chúng ta gộp các API lại với nhau để kiểm tra xem liệu rằng sau khi gộp có xảy ra lỗi hay không?
Ví dụ: Chúng ta có một số method API thực hiện Test API đơn lẽ như là:
- login
- getCustomer
- updateBilling
- updateAddress
- logout
Vậy thì chúng ta đang có 5 chức năng hoạt động riêng lẽ, bây giờ chúng ta hãy Intergrate chúng lại với nhau. Ở đây mình sẽ chia ra thành 2 mục Test Scenerios:

` Test Scenerios 1: Chúng ta sẽ gộp lại chức năng login, getCustomer và logout.`

` Test Scenerios 2: Chúng ta sẽ gộp lại chức năng login, getCustomer, updateAddress và logout.`
Các bạn có thể gộp thêm các chức năng khác lại với nhau để kiểm tra thêm.

**Lưu ý: Khi các bạn thực hiện Test API nên tránh hạn chế đè lên nhau, nên để mỗi chức năng riêng lẽ, càng riêng lẽ càng tốt. Vì sau này chúng sẽ hỗ trợ chúng ta trong Automation Test.**

Thì bài viết của mình hôm nay đến đây là hết, nếu các bạn cảm thấy hay, mong là nó sẽ giúp ích được các bạn trong quá trình làm việc.         

Nguồn: The iTMS Coaching

https://www.youtube.com/watch?v=cO8KTAetc_0&t=335s