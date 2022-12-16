Flutter là một bộ công cụ giao diện người dùng. Nói cách khác, đây là bộ công cụ phát triển phần mềm ứng dụng toàn diện (SDK) đi kèm với các tiện ích và công cụ. Flutter là một công cụ mã nguồn mở và miễn phí để phát triển các ứng dụng di động, desktop, web. Flutter là một công cụ phát triển đa nền tảng. Điều này có nghĩa là với cùng một đoạn mã, chúng ta có thể tạo cả ứng dụng iOS và Android. Đây là cách tốt nhất để tiết kiệm thời gian và tài nguyên trong toàn bộ quy trình của chúng tôi. Trong đó, hot reload đang được các nhà phát triển di động quan tâm. Cho phép chúng tôi xem nhanh các thay đổi được triển khai trong mã với hot reload.

Phiên bản Quản lý Flutter cho phép các loại phiên bản Flutter khác nhau có sẵn trên cơ sở dự án. Điều này có nghĩa là chúng tôi có thể xác định các loại phiên bản Flutter cụ thể cho các loại dự án khác nhau, nó cho phép chúng tôi phát hành nhiều kênh, lưu vào bộ nhớ cache cục bộ, vì vậy hãy chuyển đổi các phiên bản. thì chúng tôi không phải đợi thiết lập.

Trong bài viết này, chúng ta sẽ tìm hiểu về Quản lý Phiên bản Trong Flutter. Trong phần này, chúng ta sẽ thấy cách thiết lập Quản lý phiên bản công việc một cách chớp nhoáng. Vậy hãy bắt đầu.

### Flutter Version Management (FVM):

Khi chúng tôi làm việc trên dự án Flutter của mình, chúng tôi cần phát hành phiên bản cập nhật và ứng dụng, xác minh nó và chuyển đổi các loại SDK khác nhau để kiểm tra nó, điều này khiến chúng tôi mất thời gian phát triển. Để tránh điều này, chúng tôi sử dụng Quản lý phiên bản Flutter, cung cấp cho chúng tôi các loại phiên bản Flutter khác nhau cho máy của chúng tôi. Vì vậy, mỗi lần Flutter có thể kiểm tra ứng dụng dựa trên bản phát hành Flutter cập nhật mà không cần chờ cài đặt và sẽ có thể chuyển sang phiên bản Flutter cho phù hợp.

### Cài đặt FVM:

Trước hết, chúng ta cần phải đảm bảo rằng flutter đã được cài đặt và flutter có phải là kênh ổn định hay không. nếu không thì Nhập mã dưới đây vào dòng lệnh của bạn.

```
// set flutter to stable channel
flutter channel stable
// check flutter channel
flutter channel
// output
Flutter channels:
  master
  dev
  beta
* stable
```

Sau đó, chúng ta phải xác định xem flutter của chúng ta đã được cài đặt hay chưa, nếu chưa thì trước tiên chúng ta sẽ cài đặt FVM.

```
$ pub global activate fvm
```

Bây giờ chúng ta sẽ thấy rằng một số cảnh báo được đưa ra ở cuối quá trình cài đặt, vì vậy chúng ta cần thêm đường dẫn fvm vào tệp cấu hình shell (.bashrc, bash_profile, v.v.) trước khi thực hiện bước tiếp theo

```
export PATH=”$PATH:`pwd`/flutter/bin”$ fvm install
export PATH=”$PATH:`pwd`/bin/cache/dart-sdk/bin”
export PATH=”$PATH:`pwd`/.pub-cache/bin”
```

#### Cài đặt SDK

FVM cho phép chúng ta cài đặt nhiều loại bản phát hành hoặc nhiều kênh. Để cài đặt kênh sử dụng ổn định và để cài đặt phiên bản phát hành flutter, chúng ta sẽ sử dụng v2.0.5 hoặc 1.17.0-dev.3.1 và ngay sau khi chúng ta chạy - bỏ qua thiết lập sau đó nó sẽ bỏ qua quá trình thiết lập

```
$ fvm install stable or fvm install 2.0.5
```

#### Phiên bản SDK cấu hình dự án:

Sau đó, chúng ta sẽ thấy rằng Dự án có được cấu hình để sử dụng một phiên bản cụ thể hay không, nếu không, chúng ta sẽ cài đặt nó trên phiên bản thích hợp mà không cần đối số.

```
$ fvm install
```

#### Danh sách các phiên bản đã cài đặt của Flutter:

Bây giờ bằng cách gõ vào lệnh sau, chúng ta có thể liệt kê phiên bản đã cài đặt trên máy của mình bằng cách sử dụng lệnh dưới đây FVM sẽ lưu trữ phiên bản SDK.

```
$ fvm list
```

#### Nâng cấp phiên bản SDK:

Sử dụng lệnh nâng cấp phiên bản SDK khi chúng tôi cần nâng cấp phiên bản SDK hiện tại của mình, do đó bạn phải gọi lệnh của SDK Flutter của mình như trong cài đặt Flutter thông thường.

```
$ fvm flutter upgrade
```

### Cài đặt IDE:

Bây giờ chúng ta sẽ xem cách định cấu hình IDE, dưới đây chúng tôi đã chỉ ra cách định cấu hình trong Android Studio chúng ta hãy xem nó ngay bây giờ.

#### Android Studio

Trong thư mục dự án gốc của bạn, hãy sao chép liên kết tượng trưng sau tuyệt đối.

```
Example: /absolute/path-to-your-project/.fvm/flutter_sdk
```

Sau đó, chúng tôi sẽ mở Languages and Frameworks trong menu của Android Studio -> Bây giờ hãy tìm kiếm Flutter và thay đổi đường dẫn đến Flutter SDK. và thực hiện thay đổi. Bây giờ bạn có thể chạy nó với các phiên bản đã chọn và gỡ lỗi nó. Nếu bạn muốn xem cài đặt mới được thực hiện thì chúng ta có thể sử dụng Android Studio sẽ khởi động lại.

![](https://images.viblo.asia/21918bae-71b2-4560-b95b-0382447d1081.png)

FVM: https://github.com/leoafarias/fvm