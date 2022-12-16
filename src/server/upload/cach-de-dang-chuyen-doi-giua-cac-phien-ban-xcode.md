Đây là bài dịch từ trang [medium.com](https://medium.com/). Mời các bạn xem bài gốc tại đây: https://medium.com/better-programming/easily-swith-between-xcode-versions-b36f9f685979

Làm sao dễ dàng chuyển đổi giữa các phiên bản *Xcode* để kiểm tra mã của mình một cách toàn diện nhất.

![](https://images.viblo.asia/39343da0-c51a-4514-80b9-3cc7d2e0fb9d.jpeg)

*iOS 14* đã chính thức được phát hành. Nếu bạn cần cài đặt phiên bản *Xcode* mới để kiểm tra ứng dụng của mình và bạn cũng cần giữ phiên bản *Xcode* cũ vì một lý do nào đó, thì bài viết này là dành cho bạn.

Mỗi khi có phiên bản iOS mới, chúng ta phải cập nhật trình biên dịch để có thể kiểm tra ứng dụng với hệ điều hành mới trên iPhone mới.

Tôi đã làm việc trên một vài ứng dụng và luôn gặp một tình huống như sau: Một phiên bản mới của hệ điều hành iOS ra mắt và chúng ta phải cập nhật *Xcode* của mình, nhưng CI của chúng ta được cấu hình với phiên bản trước đó hoặc có thể chúng ta có một thư viện được các nhà phát triển duy trì và họ sử dụng cùng một phiên bản *Xcode* cũ để nhất quán giữa các ứng dụng.

Giải pháp luôn là tải xuống thủ công tất cả các phiên bản chúng ta cần và sau đó cầu nguyện với một vị thần nào đó rằng không có gì phá vỡ khả năng tương thích trong mã.
Có cách nào dễ hơn không?

### Cách dễ nhất và nhanh nhất
Có một công cụ gọi là **[xcode-install](https://github.com/xcpretty/xcode-install)** cho phép bạn dễ dàng cài đặt và quản lý nhiều phiên bản Xcode trên máy tính của mình. Chắc chắn, bạn đã nghe nói đến [NVM](https://github.com/nvm-sh/nvm) (trình quản lý phiên bản Node) hoặc [RVM](https://rvm.io/) (trình quản lý phiên bản Ruby). Đây là một cái gì đó tương tự, nhưng đối với Xcode.

#### Cài đặt
Chỉ cần chạy lệnh này trên *terminal* của bạn:
```
$ gem install xcode-install
```

#### Sử dụng
Bây giờ đã đến lúc sử dụng và bắt đầu quản lý các phiên bản *Xcode* của chúng ta.
Chúng ta có thể liệt kê tất cả các phiên bản Xcode có sẵn và đã được cài đặt trong máy bằng lệnh sau:
```
xcversion list
```

Cài đặt một phiên bản *Xcode* cụ thể bằng lệnh sau:
```
xcversion install 12
```

Chọn một phiên bản *Xcode* cụ thể để sử dụng với lệnh sau:
```
xcversion select 12
```

Nếu bạn muốn thay đổi *symlink* tại `/Applications/Xcode`, hãy chạy sau:
```
xcversion select 12 --symlink
```

Và đây là lệnh để xem phiên bản hiện đang được chọn:
```
$ xcversion selected
```

*xcode-install* cần các biến môi trường là thông tin đăng nhập của bạn để truy cập vào *[Apple Developer Center](https://developer.apple.com/)*.
Chúng được lưu trữ bằng cách sử dụng *[credentials_manager](https://github.com/fastlane/fastlane/tree/master/credentials_manager#using-environment-variables)* của *[fastlane](http://fastlane.tools/)*:
```
XCODE_INSTALL_USER
XCODE_INSTALL_PASSWORD
```
Vậy là xong, bây giờ chúng ta có thể cài đặt hoặc xóa bất kỳ phiên bản xcode nào bằng một lệnh duy nhất…

### Và còn gì nữa với xcode-install
*xcode-install* cũng có thể cài đặt các công cụ dòng lệnh của *Xcode* bằng cách gọi lệnh:
```
xcversion install-cli-tools
```

*xcode-install* cũng có thể quản lý các trình mô phỏng (iOS simulator) của bạn bằng cách sử dụng lệnh `simulators` như sau:
```
xcversion simulators
```

Tôi hy vọng công cụ này có thể hữu ích cho bạn. Tôi gọi nó là XVM (trình quản lý phiên bản Xcode) nhỏ của tôi.