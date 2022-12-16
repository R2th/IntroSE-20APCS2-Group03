SDK Stream Chat cho phép bạn thêm dữ liệu tùy chỉnh vào nhiều đối tượng của API của nó. Hãy cùng xem qua một trường hợp sử dụng để thêm dữ liệu tùy chỉnh vào tệp đính kèm nhéeeee. <br> [Android Chat SDK](https://getstream.io/chat/sdk/android/) của Stream hỗ trợ [gửi các  tệp đính kèm tùy chỉnh](https://getstream.io/blog/android-chat-custom-attachments/) với tin nhắn. Trong hướng dẫn này, bạn sẽ tìm hiểu cách để gửi dữ liệu vị trí như một tệp đính kèm tùy chỉnh.<br> **Lưu ý:** Hướng dẫn này giả định là bạn đã biết basics về Stream API. Để bắt đầu, ghé qua [Hướng dẫn Nhắn tin In-App Android](https://getstream.io/tutorials/android-chat/), và xem qua [Android SDK trên Github](https://github.com/GetStream/stream-chat-android).
## Lấy ra Vị trí Hiện tại
Trước khi gửi tệp đính kèm của bạn, đầu tiên, bạn sẽ cần lấy ra bị trí hiện tại của người dùng. Việc thực hiện để lấy ra vị trí hiện tại đã được cài đặt sẵn, và bạn có thể xem trong [project mẫu](https://github.com/wangerekaharun/StreamLocationSharing) cho hướng dẫn này.<br> Có một file `LocationUtils` có chứa một phương thức extend lớp `FusedLocationProviderClient`. Phương thức mở rộng trả về một `callbackFlow` với dữ liệu vị trí.<br> Để lấy ra vị trí bạn có thể lấy kết quả trong Activity như được chỉ ra dưới đây:<br>
```java
lifecycleScope.launch {
    lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
        fusedLocationClient.locationFlow().collect {
            currentLocation = LatLng(it.latitude, it.longitude)
        }
    }
}
```
Tại đây, bạn đang lấy ra vị trí từ `FusedLocationProviderClient` như một `Flow`, sử dụng phương thức mở rộng `locationFlow()`. Bạn cũng lấy kết quả từ một cách an toàn sử dụng phương phức `Lifecycle`.<br> Bây giờ bạn đã có vị trí hiện tại của người dùng. Trong phần tiếp theo, bạn sẽ tìm cách thêm tọa độ vị trí như là tệp đính kèm tùy chỉnh.
### Thiết lập khóa API
Để có thể load một bản đồ, bạn sẽ cần có Nền tảng Google Map console trong dự án của bạn. Từ console, bạn có thể lấy một API Key cho app của bạn cái mà cho phép app truy cập tấp cả chức năng bản đồ. Đọc thêm về nó trên [tài liệu chính thức ](https://developers.google.com/maps/documentation/android-sdk/start#create-project).<br>
Khi đã có API Key, bạn có thể thêm nó trong file `local.properties` như sau:
```
googleMapsKey="YOUR_API_KEY"
```
## Thêm Vị trí như một Tệp đính kèm Tùy chỉnh
Để thêm vị trí vào tệp đính kèm tùy chỉnh, bạn cần tạo đối tượng `Attachment` như được hiển thị dưới đây.
```java
//1
val attachment = Attachment(
    type = "location",
    extraData = mutableMapOf("latitude" to currentLocation.latitude, "longtitude" to currentLocation.longtitude),
)

// 2
val message = Message(
    cid = channelId,
        text = "My current location",
        attachments = mutableListOf(attachment),
)
```
Giải thích đoạn code bên trên:<br>
1. Tại đây, bạn tạo một tệp đính kèm có kiểu `location` tùy chỉnh. Bạn sẽ dùng key này sau để nhận dạng và hiển thị tệp đính kèm như thế này. Bạn cũng truyền vào vĩ độ và kinh độ từ toạ độ vị trí của bạn sử dụng tham số `extraData` cái mà cho phép bạn thêm bất kì cặp key-value nào vào một tệp đính kèm.
2. Bạn thêm tệp đính kèm vị trí vào một `Message` mới dùng thuộc tính `attachments`.<br>

Với điều này, bạn có thể gửi tin nhắn của bạn với tệp đình kèm tùy chỉnh.
## Tạo một Bản xem trước cho một Bản đồ
Android SDK xuất ra bản xem trước cho tệp đính kèm mặc định như hình và file. Đối với các tệp đính kèm tùy chỉnh, bạn sẽ ghi đè lớp `AttachmentViewFactory`, cái mà sẽ chp phép bạn tạo và kết xuất ra chế độ xem tùy chỉnh cho các tệp đính kèm.<br>
Đầu tiên, tạo một layout cho tệp đính kèm tùy chỉnh của bạn: <br>
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <com.google.android.gms.maps.MapView
        android:id="@+id/mapView"
        android:layout_width="match_parent"
        android:layout_height="200dp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```
Layout có một `MapView` để hiển thị vị trí lên bản đồ.<br> Tiếp theo, bạn sẽ tạo một `LocationAttachmentViewFactory` cái mà extend `AttachmentViewFactory`. Lớp này như sau:
```java
class LocationAttachmentViewFactory(
    private val lifecycleOwner: LifecycleOwner
): AttachmentViewFactory() {
    // 1
    override fun createAttachmentView(
        data: MessageListItem.MessageItem,
        listeners: MessageListListenerContainer,
        style: MessageListItemStyle,
        parent: ViewGroup
    ): View {
        // 2
        val location = data.message.attachments.find { it.type == "location" }
        return if (location != null) {
            val lat = location.extraData["latitude"] as Double
            val long = location.extraData["longitude"] as Double
            val latLng = LatLng(lat, long)
            // 3
            createLocationView(parent, latLng)
        } else {
            super.createAttachmentView(data, listeners, style, parent)
        }
    }

    private fun createLocationView(parent: ViewGroup, location: LatLng): View {
        val binding = LocationAttachementViewBinding
            .inflate(LayoutInflater.from(parent.context), parent, false)

        // 4
        val mapView = binding.mapView
        mapView.onCreate(Bundle())
        // 5
        mapView.getMapAsync { googleMap ->
            googleMap.setMinZoomPreference(18f)
            googleMap.moveCamera(CameraUpdateFactory.newLatLng(location))
        }

        // 6
        lifecycleOwner.lifecycle.addObserver(object : LifecycleObserver {
            @OnLifecycleEvent(Lifecycle.Event.ON_DESTROY)
            fun destroyMapView(){
                mapView.onDestroy()
            }

            @OnLifecycleEvent(Lifecycle.Event.ON_START)
            fun startMapView(){
               mapView.onStart()
            }

            @OnLifecycleEvent(Lifecycle.Event.ON_RESUME)
            fun resumeMapView(){
                mapView.onResume()
            }

            @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
            fun stopMapView(){
                mapView.onStop()
            }
        })

        return binding.root
    }

}
```
Phân tích code trên:<br>
1. Phương thức này chịu trách nhiệm kết xuất ra giao diện của tất cả các file đính kèm. Trong phương thức này, bạn chỉ cần thay đổi UI cho các tệp đính kèm mà có 1 vị trí. Tệp đính kèm khác giữ nguyên không thay đổi, và có thể dùng triển khai mặc đinhk
2. Ở đây, bạn đang lấy ra dữ liệu vị trí mà bạn truyền vào tin nhắn dùng key `location` mà bạn đã định nghĩa trước đó.
3. Bạn đang gọi `createLocationView` cái mà chịu trách nhiệm phóng to view.
4. Tại đây bạn khởi tạo`mapView`.
5. Bạn đang gọi phương thức `getMapAsync()`. Phương thức này đặt một đối tượng callback mà được kích hoạt khi instance `GoogleMap` sẵn sàng để sử dụng. Khi điều đó được gọi, bạn đang cập nhật một bản đồ với một mức thu phóng và chuyển nó đến vị trí mà bạn đã thêm vào tệp đính kèm của bạn
6. Bạn đang thêm một `LifecycleObserver`. Điều này để gọi lifecycle phương thức `MapView` khác phụ thuộc vào trạng thái lifecycle của `LocationAttachmentViewFactory`. Ví dụ bạn phải bỏ `MapView` khi một view đã bị hủy bỏ. Bạn đạt được điều này bằng cách gọi `mapView.onDestroy()` khi bạn nhận được sự kiện lifecycle `ON_DESTROY`.

Với factory tùy chỉnh vừa tạo, giờ đây bạn cần cài đặt `MessageListView` để dùng nó. Bạn làm điều này như sau:<br>
```
binding.messageListView.setAttachmentViewFactory(LocationAttachmentViewFactory(lifecycleOwner = this))
```
Bạn truyền `Activity` như `lifecycleOwner` cho `LocationAttachmentViewFactory`. Điều này móc các hành vi trên bản đồ với lifecycle của `Activity` hiện tại.<br>
Với điều này, app của bạn đã sẵn sàng để gửi cũng như xem trước tệp đính kèm vị trí tùy chỉnh. Với dự án, nút hành động để gửi vị trí ở menu tùy chọn được hiện thị như hình dưới đây.<br>
![image.png](https://images.viblo.asia/06ff0062-72cb-4b58-942b-a64e7207ecc2.png)<br>
 Bạn cũng sẽ sử dụng menu tùy chọn để gửi vị trí hiện tại của người dùng từ app đến Android Chat SDK của Stream. Khi bạn chạm vào icon vị trí ở góc trên bên phải, nó sẽ gửi một tin nhắn với dòng chữ: "My current location" (đối tượng `Message` đã được chuẩn bị trước đó).<br>
 Như hình trên, tệp đính kèm hiển thị ra một map và `TextView`. Bản đồ hiện ra vị trí của tọa độ được gửi như 1 tệp đính kèm tùy chỉnh.
 ## Kết luận
Bạn đã thấy được việc thệm một vị trí như là tệp đính kèm tùy chỉnh dễ như thế nào. Bây giờ bạn có thể làm phong phú hơn app chat của mình với chia sẻ vị trí.<br>
Project mẫu: [Github](https://github.com/wangerekaharun/StreamLocationSharing)<br>
Bạn có thể thực hiện thêm ý tưởng này từ đây để triển khai chia sẻ vị trí trực tiếp, liên tục, bằng cách chỉnh sửa tin nhắn đã được gửi khi vị trí thiết bị của bạn được cập nhật. Điều này sẽ yêu cầu một số quản lý bookkeeping và lifecycle bổ sung, nhưng SDK trò chuyện của Stream hỗ trợ nó với các tính năng chỉnh sửa và thông báo thời gian thực.

Bạn có thể tìm hiểu thêm về Android SDK bằng cách kiểm tra [kho lưu trữ GitHub của nó](https://github.com/GetStream/stream-chat-android) và bằng cách xem tài liệu.

Bạn cũng có thể xem qua phần [Tệp đính kèm tùy chỉnh Chế độ xem danh sách Tin nhắn](https://getstream.io/chat/docs/android/message_list_view/?language=kotlin&q=AttachmentViewFactory#customizations) để giải thích thêm về tệp đính kèm tùy chỉnh.
 

















<br><br><br><br><br><br><br><br><br><br>
<br><br><br><br><br><br><br><br><br><br>