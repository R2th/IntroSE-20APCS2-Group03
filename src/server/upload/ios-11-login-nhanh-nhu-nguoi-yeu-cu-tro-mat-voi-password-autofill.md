![](https://images.viblo.asia/d9e957ab-1e8b-418a-84da-6ffd28b31999.png)

# Password AutoFill trên iOS 11

Đăng nhập là bước đầu tiên mà người dùng phải thực hiện khi bắt đầu với ứng dụng yêu cầu tài khoản. Việc này thường mất vài giây nếu người dùng nhớ thông tin đăng nhập của họ và có thể nhập chúng ngay lập tức. Tuy nhiên với những người dùng có não cá vàng, phải cần đến một số công cụ để quản lý mật khẩu (iCloud Keychain, 1Password, LastPass, v.v.), thì việc login sẽ khá mất thười gian và đem lại trải nghiệm không mấy vui vẻ.

Đã có một số nỗ lực để cải thiện trải nghiệm này. Chẳng hạn, ứng dụng 1Password cung cấp một tiện ích mở rộng tuyệt vời mà các nhà phát triển ứng dụng có thể tận dụng. Một giải pháp khác đã có trong iOS kể từ WWDC 2014 là Safari Shared Credentials.

Mặc dù vậy, trong iOS 11, Apple đã giới thiệu một cách tốt nhất từ trước đến nay để hỗ trợ cho thao tác đăng nhập: API tự động điền mật khẩu. So với các giải pháp trước đây, người dùng dễ sử dụng hơn và nhanh hơn cho các nhà phát triển triển khai.

Trong bài viết này, chúng ta sẽ tìm hiểu cách làm sao để đăng nhập nhanh như cách người yêu cũ trở mặt và cải thiện khả năng giữ chân người dùng với Password AutoFill, một API mới được giới thiệu trong iOS 11.

# Mở đầu 
Password AutoFill cho phép người dùng điền thông tin đăng nhập của họ trực tiếp vào ứng dụng bằng cách tương tác với thanh QuickType được hiển thị phía trên bàn phím. Cải thiện luồng đăng nhập sẽ tăng khả năng giữ chân người dùng cũng như tăng trải nghiệm người dùng. Sau bài hướng dẫn này, ứng dụng của chúng ta sẽ có thể rút ngắn thời gian lưu thông tin đăng nhập xuống chỉ còn vài giây.

Có hai bước để triển khai Tự động điền mật khẩu trong ứng dụng là :

* Hiển thị thanh QuickType với biểu tượng phím và cho phép người dùng chọn thủ công đăng nhập chính xác.
* Kết nối ứng dụng và trang web một cách an toàn, để thanh QuickType có thể đề xuất đăng nhập chính xác cho người dùng để tăng tốc quá trình hơn nữa.

## Thanh QuickType
Bước đầu tiên là làm cho thanh QuickType xuất hiện. Sau bước này, người dùng sẽ có thể nhấn vào nó và chọn đăng nhập thủ công. Thuộc tính duy nhất cần thiết để xuất hiện thanh QuickType là đặt thuộc tính *textContent* trong đối tượng *UITextField* hoặc *UITextView* của bạn.

Bạn nên thêm thuộc tính này vào các trường email / username và password của mình. Như sau:

```
usernameTextField.textContentType = .username
passwordTextField.textContentType = .password
```

iOS sẽ hiển thị thanh QuickType trên tất cả các thiết bị chạy iOS 11 khi có ít nhất một mật khẩu được lưu trong Key Chain. Nếu đang chạy ứng dụng bằng Simulator và chúng ta không thấy thanh QuickType xuất hiện, rất có thể vì KeyChain đang trống .

![](https://images.viblo.asia/821b48f6-d3dd-4c6e-b8f2-7623c3a8e202.png)

Sau khi người dùng nhấn biểu tượng "chìa khóa" và xác thực qua Touch ID, một danh sách tất cả mật khẩu đã lưu sẽ được hiển thị. Người dùng có thể tìm kiếm hoặc cuộn qua và khi tìm thấy thông tin xác thực, chỉ cần một lần nhấn, các trường đăng nhập sẽ được điền vào.

Như chúng ta có thể thấy, phần chậm nhất trong quá trình này là tìm thông tin đăng nhập chính xác trong KeyChain. Trong phần tiếp theo chúng ta sẽ xem cách làm sao chúng ta có thể loại bỏ bước này và cải thiện trải nghiệm hơn nữa.

## Credentials Suggestions

Chúng ta cũng có thể cho iOS biết trang web mà ứng dụng của bạn được liên kết. Nếu KeyChain chứa thông tin đăng nhập được lưu từ Safari trên iOS hoặc macOS, những thông tin đăng nhập đó sẽ được đề xuất, giúp loại bỏ được bước tìm kiếm mật khẩu một cách thủ công trong KeyChain.

Nếu chúng ta đang sử dụng [Universal Links](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html), ứng dụng sẽ hiển thị thông tin đăng nhập cho trang web trong thanh QuickType. iOS biết trang web nào đang được liên kết với ứng dụng, vì vậy nó sẽ đề xuất mật khẩu chính xác cho trang web ấy.

Một cách khác để liên kết ứng dụng và trang web với nhau mà không cần [Universal Links](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html) là credentials associated domain.

Mở Xcode project, chuyển đến tab **Capabilities** và bật  **Associated Domains**. Thêm URL trang web cần liên kết vào đây. Giả sử tên miền trang web là **awesomewebsite.com**: tên miền được liệt kê phải là **webcredentials: awesomewebsite.com**.

![](https://images.viblo.asia/bb094208-ac89-40df-b931-3b6a58cf6d4f.png)

iOS hiện đã biết trang web được liên kết của ứng dụng. Bước cuối cùng là tải tệp lên máy chủ để iOS có thể xác minh rằng bạn sở hữu trang web mà bạn đang cố gắng liên kết với ứng dụng. (Điều này là để ngăn các ứng dụng độc hại đánh cắp thông tin đăng nhập từ các trang web khác.)

Tạo một tệp văn bản mới (bên ngoài dự án Xcode của bạn nếu bạn thích) có tên là **apple-app-site-association**. Đây là tên tiêu chuẩn mà iOS tìm kiếm cho máy chủ bằng kết nối an toàn (bạn phải cài đặt SSL trên máy chủ của mình). Chỉ cần sao chép và dán đoạn mã sau:

```
{
    "webcredentials" : {
        "apps" : ["1EMDW8DVTP.com.patrickbalestra.AutoFill"]
    }
}
```

Chúng ta cần thay đổi chuỗi trong trường `apps` thành `Team ID` (Lấy Team ID trong [developer portal](https://developer.apple.com/account/#/membership/) bên trong mục Membership), theo sau là dấu chấm và `bundle id` của ứng dụng. Tạo thư mục có tên `.well-known` trong thư mục root directory của máy chủ và tải tập tin lên đó.

Chạy ứng dụng và thanh QuickType sẽ gợi ý thông tin đăng nhập trang web và user có thể đăng nhập bằng một cú chạm.

![](https://images.viblo.asia/ae8b6976-6061-40d2-8a0b-9bb45abe3593.png)

Nếu bạn muốn tìm hiểu thêm về Password AutoFill, hãy xem [Session 206 at WWDC 2017](https://developer.apple.com/videos/play/wwdc2017/206/).

# Tổng Kết

Như chúng ta vừa thấy, việc thực hiện Password AutoFill rất dễ dàng. Bạn nên cân nhắc dành vài phút để triển khai nó cho người dùng và doanh nghiệp của mình. Nó sẽ tăng tốc quá trình đăng nhập và cải thiện khả năng giữ chân người dùng cho ứng dụng.

Nếu có bất cứ thắc mắc/góp ý/bình luận, đừng ngại để lại bình luận bên dưới bài viết. Cheers