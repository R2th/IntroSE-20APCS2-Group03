Đầu tiên các bạn cần biết qua mô hình bảo mật trong Android.

Mô hình bảo mật Android là một mô hình cách ly (isolation model) cung cấp một môi trường an toàn để thực thi ứng dụng Android. Tuy nhiên, mô hình cách ly (isolation model) không cung cấp hạn chế đã hạn chế chức năng ứng dụng trong ứng dụng Android. (Elenkov, Root & Sawyer, 2015)

![](https://images.viblo.asia/0a90b5dd-11dc-4c95-b042-79856967815c.png)
<div align="center">*Hình 1. Mô hình bảo mật Android*</div><br>

Một trong những hạn chế có thể xảy ra trong ứng dụng Android là thiếu các chức năng hữu ích có thể đạt được bằng cách truy cập hệ thống & trình điều khiển quan trọng (important system & drivers) như máy ảnh, dịch vụ định vị, dịch vụ mạng và các chức năng khác. Hơn nữa, việc hạn chế ứng dụng để trao đổi dữ liệu sẽ làm giảm khả năng nâng cao khả năng ứng dụng và khung phát triển.

Theo đó trong kiến trúc bảo mật của Android thì mặc định, tất cả các ứng dụng Android không có quyền truy cập đến bất kỳ tài nguyên được bảo vệ nào do sẽ có tác đọng xấu đến hệ thống hoặc các ứng dụng khác.
Vì mỗi ứng dụng chạy trong một đơn vị riêng biệt (được gọi là sandbox), nó phải chia sẻ dữ liệu một cách rõ ràng thông qua việc khai báo quyền cho bất kỳ tài nguyên nào không có sẵn trong sandbox.

## Application Signing
Mọi ứng dụng được cài đặt trên thiết bị Android phải được ký (signed) bởi nhà phát triển trước khi được xuất bản. Chữ ký này liên kết ứng dụng với tác giả của nó. Nếu hai ứng dụng được phát triển bởi cùng một nhà phát triển, họ có thể chia sẻ dữ liệu của nhau nếu họ có cùng chữ ký và có cờ **android:sharedUserId** được đặt trong file manifest.

Việc ký một ứng dụng bằng chứng chỉ yêu cầu một khóa riêng tư (private key) được duy trì bởi nhà phát triển. Nó là của nhà phát triển trách nhiệm để giữ tệp khóa cá nhân ở nơi an toàn, bảo mật. Khi phát hành cập nhật của một ứng dụng vào Google Play yêu cầu ký nó với cùng một chứng chỉ, nếu không, tất cả những người dùng trước đó sẽ không được thông báo về cập nhật và cuối cùng là mất các bản cập nhật.

> *Chú ý: Chứng chỉ số (**digital certificate**) là một hộ chiếu (**passport**) điện tử cho phép người, máy tính hoặc tổ chức để trao đổi thông tin an toàn qua Internet bằng cách sử dụng cơ sở hạ tầng khóa công khai (PKI). Tin nhắn được mã hóa (encrypted) bằng khóa công khai (public key) và chỉ có thể được giải mã (decrypted) bằng khóa cá nhân (private key).
> Khoá cá nhân (private key) là một tệp có một tập hợp số ngẫu nhiên được tạo. Bạn cần giữ thông tin này ở chế độ riêng tư là điều cần thiết cho chìa khóa của bạn vẫn an toàn trong suốt thời gian tồn tại của chứng chỉ.*

## Installing applications

Permissions (quyền) được khai báo trong thời gian phát triển của một ứng dụng. Với việc phát hành Android 6.0 (API 23), hành vi của quyền đã được thay đổi. Trước đây, Android đã nhắc người dùng tất cả các quyền cần thiết tại thời điểm cài đặt. Đối với API 23 trở lên, quyền hiện được hỏi động cho người dùng trong ứng dụng thời gian chạy. Thay đổi hành vi này cho phép người dùng có điều khiển nhiều hơn

qua đó các quyền được cấp cho ứng dụng và cũng có một số ngữ cảnh tại sao một ứng dụng đang yêu cầu một số quyền nhất định. Người dùng cũng có khả năng thu hồi (revoke) các quyền đã cấp (granted permissions) trước đó đối với một ứng dụng bằng cách điều hướng đến màn hình Cài đặt của ứng dụng.

Tất cả các quyền được khai báo trong tệp kê khai (AndroidManifest.xml) của một ứng dụng và nhà phát triển có trách nhiệm kiểm tra (in code) cho dù các quyền liên quan đã được cấp trước đó hay không truy cập các thành phần (components) / cảm biến (sensors) nhất định của thiết bị của người dùng.

> *Tiếp theo, các bạn có thể đọc thêm về Permissions[ tại đây](https://viblo.asia/p/permissions-trong-android-permissions-in-android-WAyK8rYmlxX).*