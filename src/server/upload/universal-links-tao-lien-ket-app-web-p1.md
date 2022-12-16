Ở bài này, chúng ta sẽ tìm hiểu phựơng pháp kết nối ứng dụng iOS của bạn với trang web của bạn bằng Universal Links, để user có thể nhấn vào liên kết và chuyển trực tiếp đến màn hình tương ứng trong ứng dụng của bạn! :]]

Bạn có trang web chia sẻ nội dung với ứng dụng iOS không?

Kể từ iOS 9, bạn có thể kết nối chúng bằng cách sử dụng các universal links, có nghĩa là người dùng hiện có thể chạm vào liên kết HTTP trên iPhone và được chuyển tiếp đến màn hình ứng dụng của bạn!


Trong hướng dẫn này, bạn sẽ tìm hiểu cách liên kết iOS app với trang web được lưu trữ trên [heroku](https://www.heroku.com).


Hướng dẫn này giả định bạn có hiểu biết cơ bản về phát triển iOS và Swift. Nếu bạn mới sử dụng chúng, hãy xem qua một số hướng dẫn khác về iOS và Swift trước.

Cuối cùng, bạn phải có tài khoản nhà phát triển Apple có trả tiền.
Thật không may, một tài khoản miễn phí sẽ không hoạt động. :((


**Lưu ý**: Các Universal links sẽ thay thế cho các ứng dụng được đăng ký URL schemes của chúng.
Chúng hoạt động bằng cách cung cấp một file nhỏ (được phân phối qua HTTPS) từ thư mục gốc của miền web trỏ đến App ID cụ thể và sau đó đăng ký App ID cụ thể đó với Apple để xử lý các liên kết từ miền đó.


Do các yêu cầu này, bạn sẽ không thể thử nghiệm hoàn toàn các universal links mà không cần có trang web thực có thể truy cập qua HTTPS và ứng dụng thực trên App Store, nhưng bạn vẫn có thể học được cách dùng universal links bằng cách thực hiện quy trình thiết lập mọi thứ.

### Getting Started
[Download meterials](https://koenig-media.raywenderlich.com/uploads/2018/09/UniversalLinks.zip)


Bắt đầu bằng cách tải xuống các tài liệu bạn cần bằng cách sử dụng nút Tải xuống tài liệu ở trên hoặc của hướng dẫn này. Mở dự án khởi động, sau đó build và run. 


Bạn sẽ thấy màn hình chính *ComputersController* như sau:
![](https://images.viblo.asia/6553fb6c-4a17-461b-896b-21981a4a0aa7.png)

Ứng dụng sẽ show lên một vài các máy tính bảng phổ biến nhất trên thị trường.


Tap vào các cell để để đi tới chế độ xem chi tiết, *ComputerDetailController*.


Tại đây, bạn có thể xem thông tin về sản phẩm cụ thể, bao gồm trang web, nhà cung cấp và giá cả.

![](https://images.viblo.asia/217cdd2b-65e1-4271-a668-9e11f68322a2.png)

Tôi cũng đã tạo một trang web cơ bản với thông tin tương tự. Kiểm tra [link](https://rw-universal-links-starter.herokuapp.com) tại đây.

![](https://images.viblo.asia/0a321c71-0bbc-4760-956e-b4389ecc293d.png)

Đừng băn khoăn phần Heroku: Đây chỉ là một cách nhanh chóng để bạn truy cập vào trang web demo cho hướng dẫn. Mặc dù không được yêu cầu bởi hướng dẫn này, bạn có thể tùy ý triển khai trang web vào tài khoản Heroku của riêng bạn. Nếu bạn muốn làm như vậy, hãy làm theo hướng dẫn tại [đây](https://github.com/raywenderlich/universal-links).

Giờ đây bạn đã thấy cả ứng dụng và trang web, đã đến lúc tìm hiểu cách để kết nối chúng.
Mục tiêu cuối cùng: Bất cứ khi nào người dùng nhấn vào bất kỳ liên kết trang web nào của bạn trên thiết bị iOS - chẳng hạn như https://rw-universal-links-starter.herokuapp.com/arduino.html - nó sẽ mở ra màn hình nào đó trong ứng dụng thay vì Safari.

Để thực hiện điều này, bạn cần phải làm ba việc:


Thông báo cho ứng dụng của trang web.


Thông báo cho trang web của ứng dụng.


Xử lý hướng di chuyển màn hình trong app bất cứ khi nào người dùng nhấn vào một liên kết.


Có một vài yêu cầu để tạo universal links. 
Thứ nhất, bạn phải có quyền “write access” vào trang web được liên kết, phải sử dụng HTTPS và bạn phải có upload file lên đó.


Thứ hai, bạn phải sở hữu ứng dụng được liên kết để bạn có thể chỉnh sửa “capabilities” trong provisioning profile của mình để đăng ký trang web và có thể triển khai nó vào App Store.


Vì những lý do này, bạn sẽ không thể test tutorial app.
Tuy nhiên, bạn vẫn sẽ trải qua quá trình này để tìm hiểu cách thực hiện.

## Configuring the App

Trước tiên, bạn cần định cấu hình ứng dụng để xử lý các universal links. Mở **UniversalLinks.xcodeproj** từ thư mục Starter và làm như sau:

Chọn **UniversalLinks** project.
Chọn **UniversalLinks** target.
Chọn **Capabilities** tab.
Bật On phần **Associated Domains** lên.


![](https://images.viblo.asia/9ce1271e-d718-4bb5-9e13-67c1e4da9270.png)


Bạn có thể nhận thông báo **Select a Development Team to Use for Provisioning** (Chọn nhóm phát triển để sử dụng cho cấp phép).


Chọn bất kỳ Apple developer team đã được trả phí mà bạn đang truy cập và nhấn **Select** để tiếp tục.


Nếu bạn thấy thông báo *Add an Apple ID Account*, điều đó có nghĩa là bạn hiện chưa đăng nhập vào bất kỳ tài khoản nào.
Trong trường hợp này, nhấn nút **Add** và đăng nhập vào Apple developer (đã đóng phí) mà bạn là thành viên.


Điều quan trọng là đây là tài khoản trả phí.
Nếu bạn sử dụng một tài khoản miễn phí, Xcode có thể crash; đây dường như là một bug của Xcode. :(


Bạn cũng có thể được một thông báo lỗi trong phần **Signing** của tab chung, báo rằng **“The app ID ‘com.razeware.UniversalLinks’ cannot be registered to your development team. Change your bundle identifier to a unique string to try again.”**
Điều này là do identifier của app đã được tác giả app này sử dụng, bạn không thể dùng lại nó.


Trong ứng dụng của riêng bạn, hãy đảm bảo app identifier của bạn là duy nhất (theo cú pháp tên miền ngược).
Tuy nhiên, đối với ứng dụng hướng dẫn này, bạn có thể bỏ qua thông báo này.


Tiếp theo, nhấn + và thêm tên miền sau: **applinks: rw-universal-links-final.herokuapp.com**.
Nếu bạn làm theo hướng dẫn để khởi chạy ứng dụng Heroku của riêng bạn thì thay thế chuỗi sau dấu hai chấm bằng tên miền đầy đủ của ứng dụng Heroku của bạn.


Hãy chắc chắn thêm tiền tố **applinks**. Bây giờ bạn sẽ thấy như sau:


![](https://images.viblo.asia/2cc4b1e5-2dec-4f88-9ba6-f25c44256f7b.png)


Bước đầu tiên đã hoàn tất! Ứng dụng hiện nhận biết được URL của trang web.


Ở phần tiếp theo, mình sẽ cấu hình Web và xử lí Universal Link. Các bạn có thể xem link Bài gốc ở [đây](https://www.raywenderlich.com/6080-universal-links-make-the-connection)