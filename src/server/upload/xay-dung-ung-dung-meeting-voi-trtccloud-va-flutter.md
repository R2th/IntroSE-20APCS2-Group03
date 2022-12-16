### Yêu cầu về môi trường:
* Flutter 2.0 trở lên
* Phát triển cho Android:
   * Android Studio 3.5 trở lên
   * Thiết bị chạy Android 4.1 trở lên
* Đang phát triển cho iOS:
   * Xcode 11.0 trở lên
   * Dự án của bạn có certificate hợp lệ.

### Điều kiện tiên quyết
Bạn đã đăng ký tài khoản Tencent Cloud và hoàn tất xác minh danh tính.
- https://intl.cloud.tencent.com/document/product/378/17985
- https://intl.cloud.tencent.com/document/product/378/3629

### Hướng dẫn tạo ứng dụng trên Tencent Cloud

#### Bước 1. Tạo ứng dụng.
1. Đăng nhập vào bảng điều khiển TRTC và chọn Development Assistance > Demo Quick Run.
2. Nhập tên ứng dụng, ví dụ: TestTRTC và nhấp vào Create.

#### Bước 2. Tải xuống SDK và mã nguồn demo.
Link mã nguồn demo: https://github.com/oNguyenTheAnhB/TRTCSimpleDemo-Flutter

#### Bước 3: Cấu hình dự án
1. Tìm và mở /example/lib/debug/GenerateTestUserSig.dart.
2. Đặt các tham số trong GenerateTestUserSig.dart như sau:
* SDKAPPID: `PLACEHOLDER` by default. Đặt nó thành `SDKAppID` thực tế.
* SECRETKEY: `PLACEHOLDER` by default. Đặt nó thành khóa thực.

#### Bước 4: Biên dịch và chạy dự án.
1. Chạy `flutter pub get`.
2. Biên dịch, chạy và gỡ lỗi dự án.

#### Android
Run `fluter run`
Mở dự án demo bằng Android Studio (3.5 trở lên).
Chạy dự án.

#### iOS
Mở dự án trong thư mục `\ios` với Xcode (11.0 trở lên).
Biên dịch và chạy dự án demo.

### Mô tả dự án:

Ứng dụng demo yêu cầu bạn nhập số phòng và userId được tạo trên console của tencent cloud để có thể enterRoom.

![](https://images.viblo.asia/99826e05-a072-41e7-89ae-5be17c4a6aa2.jpg)

Mình có mô tả chức năng của ứng dụng qua sequence diagram:

![](https://images.viblo.asia/f711f514-71d6-440c-b306-53ba342e8553.png)

Khi user đã tham gia vào room thì sẽ bắt đầu lắng nghe listener của TRTCCloud. Đây là list các function của TRTC SDK: https://cloud.tencent.com/document/product/647/51530

Demo: https://github.com/oNguyenTheAnhB/TRTCSimpleDemo-Flutter

Link: https://intl.cloud.tencent.com/document/product/647/35098