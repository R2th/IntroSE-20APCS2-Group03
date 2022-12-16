![](https://images.viblo.asia/7871c951-989c-4714-baa8-e7470a5fa86b.png)

Vậy bạn có một ứng dụng Flutter và bạn muốn giới thiệu nó với mọi người? Không cần tìm đâu xa! Hướng dẫn này chỉ ra cách lưu trữ web app của bạn trên trên Firebase chỉ trong 4 bước đơn giản (2 bước nếu bạn đã cài đặt firebase-tools và hiện có dự án Firebase). Giả sử rằng bạn đã cài đặt Flutter và có thể chạy ứng dụng Flutter của bạn ở local. Nếu bạn chưa quen với Flutter, trước tiên hãy xem [hướng dẫn bắt đầu](https://flutter.dev/docs/get-started/install).

### Điều kiện tiên quyết

Nếu dự án của bạn được tạo trước khi flutter web được enabled, thì dự án của bạn cần một bản sao của thư mục web có file `index.html`. Nếu không có thư mục web trong thư mục gốc của bạn, hãy chạy lệnh sau để tạo một thư mục:

```
$ flutter create .
```

Nếu bạn tạo một dự án sau khi flutter web được enabled, nó sẽ tự động tạo tệp `web/index.html` cho bạn. Tốt, bây giờ đến phần thiết lập Lưu trữ Firebase.
Lưu ý: Có thể bỏ qua bước 1 và 2 nếu bạn đã cài đặt dự án Firebase và các công cụ firebase.

### Bước 1: Tạo dự án Firebase

Bỏ qua bước này nếu bạn đã có dự án Firebase để sử dụng.
Lưu ý: Một dự án mới cũng có thể được tạo trên dòng lệnh từ bên trong bước 2, nhưng hướng dẫn này sẽ tạo nó trong bảng điều khiển Firebase.
Trong trình duyệt, hãy truy cập [Firebase Console](https://console.firebase.google.com/).

![](https://images.viblo.asia/049deca6-6ffa-404e-8b95-4a8eb64a6a55.png)

Nhấp vào **Add project** và đặt tên cho dự án của bạn:

![](https://images.viblo.asia/c2f7c864-112d-49bc-a57a-aa23c712d43f.png)

Lưu ý: Tên dự án thực tế có thể tạo thêm một số ký tự ở cuối để tạo tính duy nhất.

Nhấp vào **Continue**. Để đơn giản, không bật Google Analytics cho dự án này, vì vậy hãy tắt nó và nhấp vào **Create project**. Nếu bạn muốn sử dụng Google Analytics, hãy bật nó lên và sẽ có thêm một bước là chọn hoặc tạo dự án Google Analytics.

![](https://images.viblo.asia/3f1b8686-548c-4b10-a981-b0887b75ddfa.png)

Đợi trong vài giây khi dự án được tạo, cho đến khi bạn thấy rằng nó đã sẵn sàng và nhấp vào **Continue**.

![](https://images.viblo.asia/5263dc4d-c4d0-4f0d-9fe0-69d60ff35aa7.png)

Đó là bước 1!

### Bước 2: Cài đặt CLI của firebase-tools

Bỏ qua bước này nếu bạn đã cài đặt firebase-tools.

Nếu bạn không có npm, bạn phải cài đặt nó trước.

Lưu ý: Nếu bạn không chắc `npm` đã được cài đặt trên máy của mình hay chưa, hãy chạy `$ npm -v` và xem nó có liệt kê số phiên bản hay không. Nếu có, thì bạn đã có `npm`. Nếu nó thông báo “không tìm thấy lệnh”, bạn cần cài đặt nó.

[Installing npm on windows](https://www.guru99.com/download-install-node-js.html)
[Installing npm on linux](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
[Installing npm on mac](https://treehouse.github.io/installation-guides/mac/node-mac.html)

Hoặc tải xuống trực tiếp từ Node.js.

Sau khi cài đặt xong **npm**, hãy chạy lệnh sau để cài đặt **firebase-tools**:

```
$ npm install -g firebase-tools
```

**firebase-tools** hiện đã được cài đặt!

### Bước 3: Khởi tạo lưu trữ Firebase cho dự án Flutter của bạn

Mở một Terminal và điều hướng đến thư mục gốc cho ứng dụng Flutter của bạn và chạy lệnh này để đăng nhập:

```
$ firebase login
```

Lưu ý: Nếu bạn đã đăng nhập và muốn đăng nhập lại bằng tài khoản khác, trước tiên hãy đăng xuất bằng:

```
$ firebase logout
```

Làm theo lời nhắc lệnh và liên kết trong trình duyệt của bạn. Chấp nhận các quyền bằng cách nhấp vào Ok. Khi bạn quay lại Terminal của mình, bạn sẽ thấy rằng bạn hiện đã đăng nhập:

![](https://images.viblo.asia/05969d70-ef3e-4e00-b3c1-6d6405fc3fe3.jpg)

Tiếp theo, chạy lệnh này từ thư mục gốc của ứng dụng Flutter của bạn để khởi tạo dự án Firebase của bạn:

```
$ firebase init
```

![](https://images.viblo.asia/8819fe5f-9baa-4923-bf2a-787361d9d07d.png)

Sử dụng các phím mũi tên để điều hướng con trỏ đến Hosting và nhấn phím cách để chọn, sau đó nhấn enter. Bây giờ bạn sẽ thấy màn hình này:

![](https://images.viblo.asia/8c8c816a-4e3a-433a-9304-071cfb0848ce.png)

Chọn Sử dụng một dự án hiện có bằng cách nhấn Enter. Sử dụng các phím mũi tên để chọn dự án bạn đã thực hiện ở bước 1.
Tiếp theo, nhập `build/web` làm thư mục chung và nhấn enter, sau đó nhập y để chọn tùy chọn ứng dụng trang đơn:

![](https://images.viblo.asia/0ea9cf9c-1857-46d5-9559-c638cd5e779c.png)

Lưu ý: Sau bước này, 2 tệp mới được tạo (**.firebaserc** và **firebase.json**) trong thư mục gốc của bạn. Kiểm tra và đảm bảo rằng chúng ở đó. Nếu không, hãy kiểm tra lỗi trong bước firebase init và thử lại.

### Bước 4: Xây dựng và triển khai!

Xây dựng ứng dụng web của bạn:

```
$ flutter build web
```

Điều này xây dựng các tệp cần thiết trong `<root-directory>/build/web`.
Lưu ý: Nếu bạn thấy cảnh báo: “Experimental feature web is not supported on stable branches”, hãy đảm bảo rằng bạn đang ở trên ít nhất kênh nhà phát triển và web đã được bật. Ví dụ:

```
$ flutter channel
  beta
* dev
  master
  stable
$ ~ $ flutter devices
2 connected devices:
Chrome     • chrome     • web-javascript • Google Chrome 78.0.3904.87
Web Server • web-server • web-javascript • Flutter Tools
```

Cuối cùng, hãy chạy:

```
$ firebase deploy
```

Các tệp lưu trữ được tải lên và lưu trữ tại Firebase của bạn. Bạn có thể theo liên kết trong Terminal đến dự án web Flutter của mình!

Reference: https://medium.com/flutter/must-try-use-firebase-to-host-your-flutter-app-on-the-web-852ee533a469