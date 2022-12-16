Để bảo vệ dữ liệu người dùng và giảm dung lượng mà ứng dụng sử dụng, Android 10 đã đưa ra các thay đổi đối với  External storage . Bản xem trước dành cho nhà phát triển Android 11 tiếp tục nỗ lực này đồng thời bổ sung các cải tiến được thiết kế để giúp các nhà phát triển thích ứng với những thay đổi.

Hầu hết các ứng dụng được xuất bản trên Google Play yêu cầu quyền lưu trữ đều làm như vậy vì những lý do phổ biến, chẳng hạn như lưu tệp trên thẻ SD hoặc đọc tệp phương tiện. Các ứng dụng này có thể lưu một số lượng lớn tệp trên đĩa vẫn còn sau khi ứng dụng được gỡ cài đặt. Họ cũng có thể đọc các tệp nhạy cảm tiềm ẩn từ các ứng dụng khác.

Với Android 10, Google đã bắt đầu điều chỉnh cách hoạt động của quyền lưu trữ để cung cấp cho các ứng dụng quyền truy cập mà chúng cần. Điều này cũng hạn chế sự lộn xộn của tệp bằng cách khuyến khích các ứng dụng lưu tệp trong các thư mục được chỉ định của chúng. Các tệp này sẽ bị xóa khi ứng dụng bị xóa.

Những thay đổi về bộ nhớ trong Android 10 tuân theo ba nguyên tắc cơ bản:

* Phân bổ tốt hơn : Hệ thống biết tệp nào thuộc về ứng dụng nào, giúp người dùng quản lý tệp của họ dễ dàng hơn. Và khi một ứng dụng bị gỡ cài đặt, nội dung mà nó tạo ra sẽ không ở lại trừ khi người dùng muốn nó
* Bảo vệ dữ liệu ứng dụng : Khi một ứng dụng ghi các tệp dành riêng cho ứng dụng vào bộ nhớ ngoài, các tệp này sẽ không hiển thị với các ứng dụng khác
* Bảo vệ dữ liệu người dùng : Khi người dùng tải xuống các tệp, chẳng hạn như tệp đính kèm email nhạy cảm, các tệp này sẽ không hiển thị với hầu hết các ứng dụng

![](https://images.viblo.asia/cacc15fb-3a08-4f8d-91c7-fcbbb1b82ae0.png)

Các ứng dụng với target version là Android 10 (API 29) có thể đóng góp vào thư mục ứng dụng bên ngoài của riêng chúng và tổ chức các bộ sưu tập phương tiện (âm thanh, video, hình ảnh và nội dung tải xuống) mà không cần yêu cầu quyền lưu trữ. Quyền Bộ nhớ chỉ cho phép ứng dụng đọc các tệp phương tiện được các ứng dụng khác chia sẻ trong bộ sưu tập âm thanh, video và hình ảnh. Tuy nhiên, nó không cấp quyền truy cập đọc vào các tệp trong bộ sưu tập Tải xuống mà ứng dụng không tạo. Cách duy nhất để các ứng dụng truy cập các tệp không phải phương tiện được tạo bởi các ứng dụng khác trong Android 10 là sử dụng bộ chọn tài liệu do Storage Access Framework cung cấp .

Trong Android 11, chúng tôi sẽ tiếp tục cải thiện trải nghiệm của nhà phát triển liên quan đến Bộ nhớ theo phạm vi bằng cách giới thiệu các thay đổi sau.

Android 10 yêu cầu tất cả các ứng dụng phải sử dụng API MediaStore để truy cập ảnh, video và tệp nhạc. Tuy nhiên, nhiều ứng dụng phụ thuộc nhiều vào các API sử dụng đường dẫn tệp, bao gồm cả thư viện của bên thứ ba, không thể dễ dàng chuyển sang sử dụng trình mô tả tệp.  Ứng dụng của bạn có thể sử dụng thuộc tính trong Manifest requestLegacyExternalStorage để đảm bảo khả năng tương thích cho  Android 10.

Bên dưới, các yêu cầu I / O sử dụng đường dẫn tệp được ủy quyền cho API MediaStore. Việc chuyển hướng này có một số tác động đến hiệu suất khi được sử dụng để đọc các tệp bên ngoài bộ nhớ biệt lập. Hơn nữa, việc sử dụng đường dẫn tệp không mang lại bất kỳ lợi ích tính năng nào so với API MediaStore.

Trên Android 10, người dùng được yêu cầu xác nhận từng tệp mà ứng dụng yêu cầu chỉnh sửa hoặc xóa. Với Android 11, các ứng dụng có thể yêu cầu sửa đổi hoặc xóa một số tệp phương tiện cùng một lúc . 

![](https://images.viblo.asia/96a19ccd-7e14-49d8-a496-2acbd2ef3884.png)

**Storage Access Framework changes(SAF)**

Trong Android 11, người dùng sẽ không thể cấp quyền truy cập thư mục vào thư mục Tải xuống gốc, thư mục gốc của từng ổ đĩa thẻ SD đáng tin cậy hoặc các thư mục ứng dụng bên ngoài. Các ứng dụng vẫn có thể sử dụng Storage Access framework API và  Document picker để yêu cầu người dùng chọn các tệp riêng lẻ từ bộ nhớ dùng chung.

**Quyền đặc biệt cho các ứng dụng quản lý tệp**
Đối với các ứng dụng yêu cầu quyền truy cập rộng rãi vào bộ nhớ dùng chung, chẳng hạn như trình quản lý tệp hoặc ứng dụng sao lưu, Android 11 sẽ giới thiệu một quyền đặc biệt được gọi là MANAGE_EXTERNAL_STORAGE. Điều này sẽ cấp quyền truy cập đọc và ghi cho tất cả bộ nhớ dùng chung, bao gồm cả các tệp non-media. Tuy nhiên, nội dung của các thư mục dành riêng cho ứng dụng, cả trong bộ nhớ trong và bên ngoài, sẽ không thể truy cập được.

Chúng tôi muốn tiếp tục cho phép một số ứng dụng có quyền truy cập rộng rãi vào các tệp trên bộ nhớ ngoài, miễn là chúng có trường hợp sử dụng thực sự yêu cầu. Trong Android 11, các ứng dụng này có thể khai báo MANAGE_EXTERNAL_STORAGE điều này sẽ cho phép chúng yêu cầu người dùng cấp cho chúng “Quyền truy cập tất cả tệp” trong cài đặt. 

Sau đây là một số ví dụ ứng dụng sẽ được phép:
Trình quản lý tệp— ứng dụng có mục đích chính là cho phép người dùng quản lý tệp
Sao lưu và khôi phục - ứng dụng yêu cầu quyền truy cập hàng loạt vào tệp (ví dụ: chuyển đổi thiết bị hoặc sao lưu vào Cloud)
Tuy nhiên, nếu ứng dụng của bạn yêu cầu quyền truy cập vào một tệp, chẳng hạn như ứng dụng trình xử lý văn bản, thay vào đó, bạn nên sử dụng Khung truy cập bộ nhớ. Bạn có thể xem chính sách của Google Play về quyền này tại đây .

Trên Android 11, nếu ứng dụng của bạn yêu cầu MANAGE_EXTERNAL_STORAGE hoặc sử dụng các API dựa trên đường dẫn tệp, bạn có thể hỗ trợ khả năng tương thích ngược trên các phiên bản cũ hơn bằng cách khai báo requestLegacyExternalStorage=true trong Manifest.

**Tài liệu tham khảo**

https://medium.com/androiddevelopers/modern-user-storage-on-android-e9469e8624f9