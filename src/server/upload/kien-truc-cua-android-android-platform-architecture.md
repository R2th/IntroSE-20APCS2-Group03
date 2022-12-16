**Android** là một hệ điều hành mã nguồn mở, được xây dựng dựa trên **Linux** và có thể sử dụng cho nhiều thiết bị khác nhau.<br>
Bao gồm các thành phần chính theo sơ đồ bên dưới:

![](https://images.viblo.asia/61b8bebe-413d-40ca-9993-28d36ddbe62f.png)
*<div align="center">Hình 1. Ngăn xếp các thành phần trong cấu trúc hệ điều hành của Android.</div>*

## Nhân Lunix (The Linux Kernel )

Nhân Linux là nền tảng của nền tảng Android. Nó giúp Android trong các dịch vụ và chức năng hệ thống cốt lõi như phân luồng, cấp thấp quản lý bộ nhớ, bảo mật, quản lý quy trình, mạng và
trình điều khiển phần cứng.

Nhân Linux cũng hoạt động như một lớp trừu tượng (**abstraction layer**) giữa phần cứng và phần mềm của nền tảng. 

## Hardware Abstraction Layer (HAL)
**[Hardware Abstraction Layer (HAL)](https://source.android.com/devices/architecture/hal-types)** cung cấp các giao diện tiêu chuẩn thể hiện các khả năng của phần cứng thiết bị với framework API Java cấp cao hơn (higher-level[ Java API framework](https://developer.android.com/guide/platform#api-framework)). HAL bao gồm nhiều mô-đun thư viện, mỗi mô-đun thực hiện một giao diện cho một loại thành phần phần cứng cụ thể, chẳng hạn như mô-đun [Camera](https://source.android.com/devices/camera/index.html) hoặc [Bluetooth](https://source.android.com/devices/bluetooth.html). Khi một framework API thực hiện cuộc gọi để truy cập phần cứng của thiết bị, hệ thống Android sẽ tải mô-đun thư viện cho thành phần phần cứng đó.

## Android Runtime 

Đối với các thiết bị chạy Android phiên bản 5.0 (API cấp 21) trở lên, mỗi ứng dụng chạy trong quy trình riêng và với phiên bản [Android Runtime (ART)](https://source.android.com/devices/tech/dalvik/index.html) riêng. ART được viết để chạy nhiều máy ảo trên các thiết bị có bộ nhớ thấp bằng cách thực thi các tệp DEX, một định dạng bytecode được thiết kế đặc biệt cho Android được tối ưu hóa cho bộ nhớ tối thiểu. Xây dựng các công cụ, chẳng hạn như [d8](https://developer.android.com/studio/command-line/d8), biên dịch các mã nguồn Java thành DEX bytecode, có thể chạy trên nền tảng Android.

Một số tính năng chính của ART bao gồm:

* Biên dịch trước thời gian (AOT) và đúng lúc (JIT)
* Thu gom rác tối ưu hóa (GC)
* Trên Android 9 (API cấp 28) trở lên, chuyển đổi tệp định dạng [Dalvik Executable (DEX)](https://developer.android.com/about/versions/pie/android-9.0#art-aot-dex) của gói ứng dụng thành mã máy nhỏ gọn hơn.
* Hỗ trợ **debug** tốt hơn, bao gồm trình biên dịch lấy mẫu chuyên dụng (profiler), các ngoại lệ chẩn đoán chi tiết và báo cáo sự cố cũng như khả năng thiết lập các điểm theo dõi để giám sát các trường cụ thể

Trước phiên bản Android 5.0 (API cấp 21), Dalvik là Android runtime. Nếu ứng dụng của bạn chạy tốt trên ART, thì ứng dụng đó cũng sẽ hoạt động trên Dalvik, nhưng [điều ngược lại có thể không đúng](https://developer.android.com/guide/practices/verifying-apps-art).

Android cũng bao gồm một bộ thư viện thời gian chạy cốt lõi cung cấp hầu hết các chức năng của ngôn ngữ lập trình Java, bao gồm một số [tính năng của ngôn ngữ Java 8,](https://developer.android.com/studio/write/java8-support) mà framework API Java sử dụng.

## Native C/C++ Libraries

Nhiều thành phần và dịch vụ hệ thống cốt lõi của Android, chẳng hạn như ART và HAL, được xây dựng từ mã gốc (**native code**) yêu cầu thư viện gốc được viết bằng **C** và **C ++.** Nền tảng Android cung cấp các API khung Java để hiển thị chức năng của một số thư viện gốc này cho các ứng dụng. Ví dụ: bạn có thể truy cập [OpenGL ES](https://developer.android.com/guide/topics/graphics/opengl) thông qua [API Java OpenGL](https://developer.android.com/reference/android/opengl/package-summary) của Android framework để thêm hỗ trợ vẽ và thao tác đồ họa 2D và 3D trong ứng dụng của bạn.

Nếu bạn đang phát triển một ứng dụng yêu cầu mã C hoặc C ++, bạn có thể sử dụng [Android NDK](https://developer.android.com/ndk) để truy cập trực tiếp vào một số thư viện nền tảng gốc ([native platform libraries](https://developer.android.com/ndk/guides/stable_apis)) này từ mã gốc của mình.

## Java API Framework
Toàn bộ tập hợp tính năng của Hệ điều hành Android có sẵn cho bạn thông qua các API được viết bằng ngôn ngữ Java. Các API này tạo thành các khối xây dựng mà bạn cần để tạo ứng dụng Android bằng cách đơn giản hóa việc sử dụng lại các thành phần (**components**) và dịch vụ (**services**) hệ thống mô-đun, cốt lõi, bao gồm những nội dung sau:

* [View System](https://developer.android.com/guide/topics/ui/overview) đa đạng và có thể mở rộng, bạn có thể sử dụng để xây dựng giao diện người dùng (**UI**) của ứng dụng. Bao gồm lists, grids, text boxes, buttons,...  và thậm chí cả trình duyệt web có thể nhúng (embeddable web browser)
* [Resource Manager](https://developer.android.com/guide/topics/resources/overview), cung cấp quyền truy cập vào các tài nguyên không phải mã ( non-code resources) như các chuỗi string, graphic, và các file layout
* [Notification Manager](https://developer.android.com/guide/topics/ui/notifiers/notifications) cho phép tất cả các ứng dụng hiển thị cảnh báo tùy chỉnh trên thanh trạng thái
* [Activity Manager](https://developer.android.com/guide/components/activities/intro-activities) quản lý vòng đời của ứng dụng và cung cấp ngăn xếp điều hướng chung
* [Content Providers](https://developer.android.com/guide/topics/providers/content-providers) cho phép ứng dụng truy cập dữ liệu từ các ứng dụng khác, chẳng hạn như ứng dụng Danh bạ hoặc chia sẻ dữ liệu của riêng họ<br>

Các Developer có toàn quyền truy cập vào các [framework API](https://developer.android.com/reference/packages) giống nhau mà các ứng dụng hệ thống Android sử dụng.

## System Apps 
Android đi kèm với nhiều ứng dụng cốt lõi được cài đặt sẵn cho email, nhắn tin, lịch, v.v ... Tuy nhiên, bất kỳ ứng dụng tương ứng nào khác
có thể được tạo thành một ứng dụng mặc định thay cho các lõi này ứng dụng. Các ứng dụng hệ thống (System Apps) này có thể được gọi từ ứng dụng của riêng bạn. Ví dụ, nếu bạn muốn
cung cấp chức năng nhắn tin cho một ứng dụng, bạn không cần để tự xây dựng chức năng đó. Bạn có thể gọi ứng dụng hệ thống cho nhắn tin từ trong ứng dụng của bạn để gửi tin nhắn.

Bài viết được tham khảo từ https://developer.android.com/guide/platform