Android 11 (API  30) nâng cao hơn nữa nền tảng, bảo vệ tốt hơn cho ứng dụng và dữ liệu người dùng trên bộ nhớ ngoài. Bản phát hành này giới thiệu một số cải tiến, chẳng hạn như chọn tham gia truy cập đường dẫn tệp raw cho media, hoạt động chỉnh sửa hàng loạt cho media và cập nhật UI cho Storage Access Framework.

Bản release cũng cung cấp các cải tiến đối với [scoped storage](https://developer.android.com/training/data-storage#scoped-storage) (bộ nhớ theo phạm vi), giúp các developer chuyển sang sử dụng mô hình lưu trữ này dễ dàng hơn. Để biết thêm thông tin, hãy xem [hướng dẫn các trường hợp sử dụng bộ nhớ Android](https://developer.android.com/training/data-storage/use-cases) và các phương pháp bài viết trên Medium có tiêu đề [Câu hỏi thường gặp về bộ nhớ Android 11.](https://medium.com/androiddevelopers/android-11-storage-faq-78cefea52b7c).

## Thực thi Scoped storage

Các ứng dụng chạy trên Android 11 nhưng target Android 10 (API level 29) vẫn có thể yêu cầu thuộc tính [requestLegacyExternalStorage](https://developer.android.com/reference/android/R.attr#requestLegacyExternalStorage). Thuộc tính này cho phép các ứng dụng[ tạm thời chọn không tham gia các thay đổi](https://developer.android.com/training/data-storage/use-cases#opt-out-scoped-storage) liên quan đến bộ nhớ theo phạm vi, chẳng hạn như cấp quyền truy cập vào các thư mục khác nhau và các loại tệp phương tiện khác nhau. Sau khi bạn cập nhật ứng dụng của mình để target Android 11, hệ thống sẽ bỏ qua cờ **requestLegacyExternalStorage**.

### Duy trì khả năng tương thích với Android 10

Nếu ứng dụng của bạn chọn không sử dụng scoped storage khi chạy trên thiết bị Android 10, bạn nên tiếp tục đặt **requestLegacyExternalStorage** thành true trong file manifest của ứng dụng. Bằng cách đó, ứng dụng của bạn có thể tiếp tục hoạt động bình thường trên các thiết bị chạy Android 10.

### Di chuyển dữ liệu sang các thư mục hiển thị khi sử dụng scoped storage

Nếu ứng dụng của bạn sử dụng mô hình lưu trữ cũ và được nhắm mục tiêu trước đó là Android 10 trở xuống, bạn có thể đang lưu trữ dữ liệu trong một thư mục mà ứng dụng của bạn không thể truy cập khi enable  [scoped storage](https://developer.android.com/training/data-storage#scoped-storage). Trước khi bạn target Android 11, hãy di chuyển dữ liệu sang một thư mục tương thích với scoped storage.

### Test scoped storage

Để enable scoped storage trong ứng dụng của bạn, bất kể target SDK của ứng dụng và giá trị flag trong manifest, hãy bật các flag tương thích ứng dụng sau:

* [DEFAULT_SCOPED_STORAGE](https://developer.android.com/about/versions/11/test-changes#default_scoped_storage) (enabled for all apps by default)
* [FORCE_ENABLE_SCOPED_STORAGE](https://developer.android.com/about/versions/11/test-changes#force_enable_scoped_storage) (disabled for all apps by default)

Để **disable** scoped storage và sử dụng mô hình lưu trữ cũ thay thế, hãy bỏ đặt cả hai flag.

## Quản lý bộ nhớ thiết bị

Bắt đầu từ Android 11, các ứng dụng sử dụng mô hình scoped storage chỉ có thể truy cập vào các tệp bộ nhớ đệm dành riêng cho ứng dụng của chúng. Nếu ứng dụng của bạn cần quản lý bộ nhớ thiết bị, hãy làm theo hướng dẫn về cách [truy vấn dung lượng trống](https://developer.android.com/training/data-storage/app-specific#query-free-space).

1.  Kiểm tra dung lượng trống bằng cách gọi intent [ACTION_MANAGE_STORAGE](https://developer.android.com/reference/kotlin/android/os/storage/StorageManager#action_manage_storage).
2.  Nếu bộ nhớ trong device không còn đủ, yêu cầu người dùng cho phép ứng dụng của bạn clear tất cả cache. Để làm như vậy, gọi intent [ACTION_CLEAR_APP_CACHE](https://developer.android.com/reference/kotlin/android/os/storage/StorageManager#action_clear_app_cache).

Chú ý:  **ACTION_CLEAR_APP_CACHE** về cơ bản có thể ảnh hưởng đến tuổi thọ pin và có thể xóa một số lượng lớn file khỏi thiết bị.

## Thư mục dành riêng cho ứng dụng trên bộ nhớ ngoài

Bắt đầu từ Android 11, app không thể tự tạo [thư mục dành riêng cho ứng dụng](https://developer.android.com/training/data-storage/app-specific#external). Để truy cập vào đường dẫn hệ thông cung cấp cho app, hãy gọi hàm [getExternalFilesDirs()](https://developer.android.com/reference/android/content/Context#getExternalFilesDirs(java.lang.String)).

## Media file access

Để giúp truy cập media dễ dàng hơn trong khi vẫn giữ được quyền riêng tư của người dùng, Android 11 bổ sung các tính năng sau.

### Thực hiện các hoạt động hàng loạt

Để có tính nhất quán giữa các thiết bị và tăng thêm sự tiện lợi cho người dùng, Android 11 bổ sung một số phương pháp giúp [quản lý các nhóm tệp phương tiện](https://developer.android.com/training/data-storage/shared/media#manage-groups-files) dễ dàng hơn.

### Truy cập tệp bằng đường dẫn tệp trực tiếp và thư viện gốc

Để giúp ứng dụng của bạn hoạt động trơn tru hơn với các thư viện phương tiện của bên thứ ba, Android 11 cho phép bạn sử dụng các API khác với API [MediaStore](https://developer.android.com/reference/android/provider/MediaStore) để truy cập các tệp phương tiện từ bộ nhớ được chia sẻ bằng đường dẫn tệp trực tiếp. Các API này bao gồm:

* [File](https://developer.android.com/reference/java/io/File) API.
* Thư viện gốc, chẳng hạn như** fopen()**.

## Truy cập data từ các apps khác

Để bảo vệ quyền riêng tư của người dùng, trên các thiết bị chạy Android 11 trở lên, hệ thống hạn chế hơn nữa quyền truy cập của ứng dụng của bạn vào các thư mục riêng tư của ứng dụng khác.

### Quyền truy cập vào thư mục dữ liệu trên bộ nhớ trong

Android 9 (API level 28) bắt đầu hạn chế ứng dụng nào có thể làm cho [các tệp trong thư mục dữ liệu của chúng trên bộ nhớ trong](https://developer.android.com/training/data-storage/app-specific#internal) có thể truy cập được vào các ứng dụng khác. Các ứng dụng target đến Android 9 trở lên[ không thể làm cho các tệp trong thư mục dữ liệu của chúng có thể truy cập được trên toàn thiết bị](https://developer.android.com/about/versions/pie/android-9.0-changes-28#per-app-selinux).

Android 11 mở rộng theo hạn chế này. Nếu ứng dụng của bạn target Android 11, thì ứng dụng đó không thể truy cập vào các tệp trong thư mục dữ liệu của bất kỳ ứng dụng nào khác, ngay cả khi ứng dụng khác target Android 8.1 (API level 27) trở xuống và đã làm cho các tệp trong thư mục dữ liệu của nó có thể đọc được.

### Quyền truy cập vào các thư mục dành riêng cho ứng dụng trên bộ nhớ ngoài

Trên Android 11, các ứng dụng không còn có thể truy cập tệp trong[ thư mục dành riêng cho ứng dụng](https://developer.android.com/training/data-storage/app-specific#external) của bất kỳ ứng dụng nào khác trong bộ nhớ ngoài.

## Hạn chế truy cập tài liệu

Để nhà phát triển có thời gian thử nghiệm, các thay đổi sau liên quan đến Storage Access Framework (SAF) chỉ có hiệu lực nếu ứng dụng của bạn target Android 11 trở lên.

### Truy cập vào các thư mục

Bạn không còn có thể sử dụng intent action [ACTION_OPEN_DOCUMENT_TREE](https://developer.android.com/training/data-storage/shared/documents-files#grant-access-directory) để yêu cầu quyền truy cập vào các thư mục sau:

* Thư mục gốc của ổ lưu trữ nội bộ.
* Thư mục gốc của mỗi thẻ SD mà nhà sản xuất thiết bị coi là đáng tin cậy, bất kể thẻ đó được mô phỏng hay tháo rời. Một khối lượng đáng tin cậy là một khối lượng mà một ứng dụng có thể truy cập thành công hầu hết thời gian.
* Thư mục **Download**

### Quyền truy cập vào tệp

Bạn không còn có thể sử dụng [ACTION_OPEN_DOCUMENT_TREE](https://developer.android.com/training/data-storage/shared/documents-files#grant-access-directory) hoặc intent [ACTION_OPEN_DOCUMENT](https://developer.android.com/training/data-storage/shared/documents-files#open-file) để yêu cầu người dùng chọn các tệp riêng lẻ từ các thư mục sau:

* Thư mục **Android/data/** và tất cả các thư mục con.
* Thư mục **Android/obb/** và tất cả các thư mục con.

### Test thay đổi

Để kiểm tra sự thay đổi hành vi này, hãy làm như sau:

1. Gọi một intent action **ACTION_OPEN_DOCUMENT**. Kiểm tra xem cả hai thư mục Android/data/ và Android/obb/ đều không xuất hiện.
2. Làm một điều trong số sau đây:
*   Bật flag tương thích ứng dụng [RESTRICT_STORAGE_ACCESS_FRAMEWORK](https://developer.android.com/about/versions/11/test-changes#restrict_storage_access_framework).
*   Target Android 11 hoặc cao hơn.
4. Gọi một intent action **ACTION_OPEN_DOCUMENT_TREE**. Kiểm tra xem thư mục Download có xuất hiện và nút tác vụ được liên kết với thư mục bị chuyển sang màu xám không.

## Permission

Android 11 giới thiệu những thay đổi sau liên quan đến quyền lưu trữ.


### Target bất kì phiên bản nào

Những thay đổi sau có hiệu lực trong Android 11, bất kể phiên bản SDK target của ứng dụng của bạn là gì:

* Quyền **Storage** runtime đổi tên thành **Files & Media**.
* Nếu ứng dụng của bạn không chọn không tham gia [scoped storage](https://developer.android.com/training/data-storage#scoped-storage) và yêu cầu quyền [READ_EXTERNAL_STORAGE](https://developer.android.com/reference/android/Manifest.permission#READ_EXTERNAL_STORAGE), người dùng sẽ thấy một hộp thoại khác so với Android 10. Hộp thoại cho biết rằng ứng dụng của bạn đang yêu cầu quyền truy cập vào ảnh và phương tiện, như trong hình: 

![](https://images.viblo.asia/862fa7a9-59fd-4273-af7e-a871c7f70d9c.png)

Người dùng có thể xem ứng dụng nào có quyền **READ_EXTERNAL_STORAGE** trong cài đặt hệ thống. Trên trang **Settings > Privacy > Permission manager > Files and media**, mỗi ứng dụng có quyền được liệt kê trong **Allowed for all files**. Nếu ứng dụng của bạn target Android 11, hãy nhớ rằng quyền truy cập vào "all files" ở chế độ chỉ đọc. Để đọc** và ghi** vào tất cả các tệp trong bộ nhớ dùng chung bằng ứng dụng này, bạn cần có quyền [truy cập tất cả các tệp](https://developer.android.com/about/versions/11/privacy/storage#all-files-access).

### Target Android 11

Nếu ứng dụng của bạn target Android 11, thì cả quyền **WRITE_EXTERNAL_STORAGE** và quyền đặc quyền **WRITE_MEDIA_STORAGE** không còn cung cấp thêm bất kỳ quyền truy cập nào nữa.

Xin lưu ý rằng trên các thiết bị chạy Android 10 (API level 29) trở lên, ứng dụng của bạn có thể đóng góp vào các bộ sưu tập phương tiện được xác định rõ như **MediaStore.Downloads** mà không yêu cầu bất kỳ quyền nào liên quan đến bộ nhớ. Tìm hiểu thêm về [cách chỉ yêu cầu các quyền cần thiết](https://developer.android.com/training/data-storage/shared/media#request-permissions) khi làm việc với các tệp phương tiện trong ứng dụng của bạn.

## All files access

Phần lớn các ứng dụng yêu cầu quyền truy cập bộ nhớ dùng chung có thể tuân theo các best practices để [chia sẻ tệp media](https://developer.android.com/training/data-storage/use-cases#share-media-all) và [chia sẻ tệp không phải media](https://developer.android.com/training/data-storage/use-cases#sharing-non-media-files). Tuy nhiên, một số ứng dụng có trường hợp sử dụng cốt lõi yêu cầu quyền truy cập rộng rãi vào các tệp trên thiết bị, nhưng không thể làm như vậy hiệu quả bằng cách sử dụng các phương pháp lưu trữ thân thiện với quyền riêng tư. Android cung cấp quyền truy cập ứng dụng đặc biệt được gọi là *All files access* cho những trường hợp này. Để tìm hiểu thêm, hãy xem hướng dẫn về [cách quản lý tất cả các tệp](https://developer.android.com/training/data-storage/manage-all-files) trên thiết bị lưu trữ.