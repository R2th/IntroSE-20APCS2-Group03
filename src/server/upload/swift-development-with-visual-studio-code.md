Visual Studio Code (VSCode) là một trình soạn thảo văn bản và mã nguồn mở đa nền tảng của Microsoft. Đây là một trong những dự án nguồn mở thú vị nhất hiện nay, với các bản cập nhật thường xuyên từ hàng trăm cộng tác viên. VSCode là một trong những công cụ đầu tiên hỗ trợ Language Server Protocol (LSP), đã đóng một vai trò quan trọng trong việc cung cấp trải nghiệm tuyệt vời cho nhà phát triển bằng nhiều ngôn ngữ và công nghệ.

Tuần này, tôi sẽ hướng dẫn cách bắt đầu với hỗ trợ Language Server Protocol mới của Swift trong Visual Studio Code trên macOS. Nếu bạn chưa thử viết Swift bên ngoài Xcode hoặc đã là người dùng VSCode và hoàn toàn mới sử dụng ngôn ngữ này, thì bài viết này sẽ cho bạn biết mọi thứ bạn cần biết.

![](https://images.viblo.asia/8c83749f-b8e1-4a9d-8145-42e8b14c1e15.png)

### Bước 0: Cài đặt Xcode

Nếu bạn chưa cài đặt Xcode trên máy của mình, hãy mở ứng dụng Terminal và chạy lệnh sau:
```
$ xcode-select --install
```

Chạy lệnh này sẽ xuất hiện một lời nhắc hệ thống.

![](https://images.viblo.asia/7792c87b-25bc-48f2-b8f9-313dc33249d5.png)

Nhấp vào nút "Get Xcode” và tiếp tục cài đặt trên App Store.

Bạn có thể xác minh rằng mọi thứ đang hoạt động như mong đợi bằng cách chạy lệnh sourcekit-lsp:
```
$ xcrun sourcekit-lsp
```

Lệnh này khởi chạy một quy trình máy chủ ngôn ngữ mới, nhưng đừng lo lắng nếu nó không cung cấp bất kỳ phản hồi nào cho STDOUT - điều đó có nghĩa là nó đang hoạt động như dự kiến. Thoát quy trình bằng tín hiệu ETX (Control(^) C).

### Bước 1: Cài đặt Visual Studio Code

Tải xuống Visual Studio Code và cài đặt nó vào thư mục Application hệ thống của bạn. Mở ứng dụng và làm theo hướng dẫn để khởi chạy từ dòng lệnh. Bạn cần có lệnh mã có thể truy cập từ $PATH để cài đặt tiện ích mở rộng SourceKit-LSP sau này.

https://code.visualstudio.com/
https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line

### Bước 2: Cài đặt Node và NPM

Phần extension của VSCode được viết bằng JavaScript/TypeScript. Nếu bạn chưa thiết lập để phát triển JS, bạn có thể tải xuống Node (JavaScript run-time cho bên ngoài trình duyệt) và npm (trình quản lý gói cho Node) với Homebrew bằng cách sử dụng các lệnh sau hoặc thủ công bằng cách làm theo các hướng dẫn sau:
```
brew install node
```

Để xác minh rằng bạn có cài đặt đang hoạt động, hãy chạy lệnh sau:

```
$ npm --version
6.13.4
```

### Bước 3: Build và cài đặt tiện ích mở rộng SourceKit-LSP cho Visual Studio Code

Từ dòng lệnh, sao chép kho lưu trữ "sourcekit-lsp":https://github.com/apple/sourcekit-lsp và điều hướng đến Editors/vscode trong thư mục kết quả. Sử dụng npm để tạo tiện ích mở rộng và sau đó sử dụng lệnh mã để cài đặt nó:
```
$ git clone https://github.com/apple/sourcekit-lsp.git
$ cd sourcekit-lsp/Editors/vscode/
$ npm run createDevPackage
$ code --install-extension out/sourcekit-lsp-vscode-dev.vsix
```

Bây giờ hãy mở lại VSCode và mở một dự án Swift, chẳng hạn như "dự án này":https://github.com/flight-school/money và thử nghiệm hỗ trợ Language Server Protocol cho Swift.

![](https://images.viblo.asia/b3096810-3e02-4ffb-81cd-6616466f933e.png)

Vậy là bạn đã có nó - tạo nên trải nghiệm phát triển Swift hạng nhất bên ngoài Xcode.