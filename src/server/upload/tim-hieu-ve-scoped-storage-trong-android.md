![](https://images.viblo.asia/9726face-461a-4fd4-b25f-983858660ca9.png)
# Giới thiệu
Với sự ra mắt của Android 10, nhiều tính năng mới đã được giới thiệu và Scoped Storage là một trong số đó. Trong bài này, chúng ta sẽ tìm hiểu cách chuẩn bị các ứng dụng Android của bạn cho Scoped Storage. Vậy hãy bắt đầu. Sau đây là dòng thời gian của blog này:

* Vấn đề
* Giải pháp - Scoped Storage
* Các tính năng chính của Scoped Storage
* Download Collection
* Truy cập ứng dụng đặc biệt
* Không muốn sử dụng Scoped Storage thì sao?
* Kết luận

*Nguồn tham khảo: https://blog.mindorks.com/understanding-the-scoped-storage-in-android*
# Vấn đề
Trước Android 10, chúng ta có khái niệm về ***Shared Storage***. Mỗi ứng dụng trong thiết bị đều có một số bộ nhớ riêng trong bộ nhớ trong và bạn có thể tìm thấy ứng dụng này trong thư mục **android / data / your_package_name**. Ngoài bộ nhớ trong này, phần còn lại của bộ nhớ được gọi là ***Shared Storage***, tức là mọi ứng dụng có quyền lưu trữ đều có thể truy cập vào phần này của bộ nhớ. Điều này bao gồm các media collections và các tập tin khác của các ứng dụng khác nhau. Nhưng vấn đề là ứng dụng có quyền lưu trữ không yêu cầu quyền truy cập của tất cả các tệp này. Tất cả những gì họ muốn là thực hiện một số thao tác nhỏ trên một phần nhỏ của bộ nhớ và đó là vấn đề. Ví dụ, một số ứng dụng chỉ cần chọn hình ảnh người dùng để tải nó lên làm ảnh hồ sơ và không có gì khác. Vậy, tại sao phải cung cấp cho họ toàn quyền truy cập vào Bộ lưu trữ chung đó?

Ngoài ra, vấn đề thứ hai là khi ứng dụng có khả năng ghi rộng như vậy trên bộ lưu trữ thì các tệp do ứng dụng tạo ra bị phân tán và khi người dùng gỡ cài đặt ứng dụng thì các tệp do ứng dụng tạo ra chỉ còn trong bộ lưu trữ và không bị xóa và mất rất nhiều không gian.

Vì vậy, chúng ta cần một số loại cơ chế, với sự trợ giúp mà các ứng dụng có thể có quyền truy cập cụ thể mà chúng cần mà không cần có khả năng đọc và viết rộng đến mức chúng không thực sự cần. Điều này có thể được thực hiện với sự trợ giúp của **Scoped Storage**. Hãy tìm hiểu về nó.

# Giải pháp - Scoped Storage
Ý tưởng của Scoped Storage là phân chia dung lượng lưu trữ thành các bộ sưu tập được chỉ định để giới hạn quyền truy cập vào bộ lưu trữ rộng. Có một số nguyên tắc nhất định mà Scoped Storage dựa vào:

* **Better Attribution**: Phân bổ tốt hơn có nghĩa là hệ thống biết tệp nào được tạo bởi ứng dụng nào. Lợi ích của việc này là, bạn sẽ quản lý tốt hơn các tệp của một ứng dụng cụ thể. Ngoài ra, khi bạn gỡ cài đặt một ứng dụng khỏi thiết bị thì tất cả các nội dung liên quan đến ứng dụng cũng sẽ bị xóa trừ khi người dùng rõ ràng muốn giữ nó.
* **App data protection**: Như chúng ta biết rằng bộ nhớ trong của ứng dụng là riêng tư và các ứng dụng khác không thể truy cập được. Nhưng bộ nhớ ngoài được truy cập bởi các ứng dụng có quyền lưu trữ. Với sự trợ giúp của **Scoped Storage**, dữ liệu trong bộ nhớ ngoài không thể dễ dàng truy cập bởi các ứng dụng khác.

Vì vậy, bằng cách sử dụng các nguyên tắc này, **Scoped Storage** đã đi kèm với Android 10 và có một số tính năng chính.

# Các tính năng chính của Scoped Storage
Một số tính năng chính của Scoped Storage là:

* **Unrestricted access**: Mọi ứng dụng đều có quyền truy cập không hạn chế vào bộ lưu trữ của riêng nó, tức là lưu trữ nội bộ cũng như bên ngoài. Vì vậy, với Android 10, bạn không cần cung cấp quyền lưu trữ để ghi tệp vào thư mục ứng dụng của riêng bạn trên thẻ SD.
* **Unrestricted media**: Bạn có quyền truy cập không hạn chế để đóng góp các tệp vào bộ sưu tập phương tiện và tải xuống ứng dụng của riêng bạn. Vì vậy, không cần phải xin phép nếu bạn muốn lưu bất kỳ hình ảnh, video hoặc bất kỳ tệp phương tiện nào khác trong bộ sưu tập phương tiện. Bạn có thể đọc hoặc ghi các tệp phương tiện do bạn tạo nhưng để đọc tệp phương tiện của ứng dụng khác, bạn cần phải có quyền ***READEXTERNALSTORAGE*** từ người dùng. Ngoài ra, quyền ***WRITE_EXTERNAL_STORAGE*** sẽ không được chấp nhận trong bản phát hành Android tiếp theo và bạn sẽ có quyền truy cập đọc nếu bạn sử dụng ***WRITE_EXTERNAL_STORAGE***. Bạn phải yêu cầu người dùng chỉnh sửa rõ ràng các tệp phương tiện không được đóng góp bởi ứng dụng của bạn.
* **Organized collection**: Ở đây, trong **Scoped Storage**, chúng tôi có một bộ sưu tập phương tiện có tổ chức như cho hình ảnh, video, v.v. và bộ sưu tập tải xuống cho các tệp không phải phương tiện truyền thông.
* **Media location metadata**: Có quyền mới được giới thiệu trong Android 10, tức là **ACCESS_MEDIA_LOCATION**. Nếu bạn muốn có được vị trí của phương tiện truyền thông thì bạn phải có sự cho phép này. Ví dụ, đôi khi hình ảnh được chụp bởi máy ảnh cũng hiển thị vị trí của hình ảnh được chụp. Vì vậy, nếu bạn muốn hiển thị vị trí đó thì bạn phải có sự cho phép này. Đó là quyền thời gian chạy, vì vậy bạn cần khai báo điều này trong tệp kê khai của bạn và từ đối tượng *MediaStore*, gọi *setRequireOrigen()*, truyền URI của hình ảnh.

```kotlin
// Get location data from the ExifInterface class.
val photoUri = MediaStore.setRequireOriginal(photoUri)
contentResolver.openInputStream(photoUri).use { stream ->
    ExifInterface(stream).run {
        // If lat/long is null, fall back to the coordinates (0, 0).
        val latLong = ?: doubleArrayOf(0.0, 0.0)
    }
}
```

* **System Picker**: Để truy cập các tệp khác ngoại trừ các tệp phương tiện này, chúng ta phải sử dụng **System Picker** được truy cập bằng *Storage Access Framework*.
* **Read/write from outside**: Để đọc và ghi bất kỳ tệp nào bên ngoài bộ sưu tập, bạn cần sử dụng **System Picker**.

**LƯU Ý: Nếu bạn đang sử dụng Scoped Storage, thì bạn nên di chuyển tất cả các tệp media hoặc tất cả các tệp có trong Shared Storage vào thư mục của ứng dụng. Nếu không, bạn sẽ mất quyền truy cập vào các tập tin đó.**

# Download Collection
Chúng ta đã thấy cách chỉnh sửa và đọc bộ sưu tập media trong Scoped Storage. Đối với các tệp khác không phải là tệp media như PDF hoặc doc, Android 10 có bộ sưu tập có tên **Download Collection**. Giống như *Media Collection*, bạn không cần phải có bất kỳ quyền nào để chỉnh sửa hoặc đọc các tệp không phải media trong Download Collection của ứng dụng của bạn.

Nhưng trong Media Collection, chúng ta đã thấy rằng quyền **READ_EXTERNAL_STORAGE** cho phép truy cập đọc vào tất cả các tệp phương tiện được đóng góp bởi ứng dụng khác. Trong khi Download Collection, để đọc các tệp không phải phương tiện được tạo bởi các ứng dụng khác, bạn cần sử dụng System Picker  với Storage Access Framework API. Điều này sẽ cho phép người dùng cung cấp một số quyền cho ứng dụng. Nếu người dùng cấp quyền truy cập thì bạn có toàn quyền truy cập vào các tệp đó, tức là bạn có thể đọc, viết hoặc thậm chí xóa các tệp không phải phương tiện truyền thông.

# Truy cập ứng dụng đặc biệt
Bằng cách sử dụng Scoped Storage, ứng dụng của bạn sẽ được phép sử dụng một số bộ nhớ hạn chế. Nếu bạn muốn có quyền truy cập rộng rãi vào bộ nhớ chia sẻ, thì ứng dụng của bạn có thể được cấp quyền truy cập đặc biệt. Vì vậy, bạn phải chứng minh rằng ứng dụng của bạn cần quyền truy cập đầy đủ vào bộ nhớ chia sẻ bằng cách gửi biểu mẫu khai báo tới Google Play Console. Sau này, nếu người dùng của bạn cấp quyền để có quyền truy cập rộng thì bạn sẽ có được chế độ xem chưa được lọc của MediaStore bao gồm tệp không phải phương tiện truyền thông. Tuy nhiên, ứng dụng của bạn sẽ không có quyền truy cập vào các thư mục ứng dụng bên ngoài.

# Nếu bạn không muốn sử dụng Scoped Storage trong Android 10 thì sao?
Nếu bạn không hài lòng với Scoped Storage thì bạn có thể sử dụng phương thức được sử dụng trước đây là sử dụng quyền lưu trữ bằng cách sử dụng cờ có tên requestLegacyExternalStorage trong tệp kê khai của bạn.
```kotlin
<manifest ... >
  <!-- This attribute is "false" by default on apps targeting
       Android 10 or higher. -->
  <application android:requestLegacyExternalStorage="true" ... >
    ...
  </application>
</manifest>
```
Tuy nhiên, trong các phiên bản Android trong tương lai, quyền này sẽ không khả dụng.

# Phần kết luận
Như vậy, trong bài này, chúng ta hiểu khái niệm về Scoped Storage đã được giới thiệu trong Android 10. Bạn nên bắt đầu sử dụng Scoped Storage ASAP vì nó sẽ bắt buộc trong phiên bản tiếp theo của Android.