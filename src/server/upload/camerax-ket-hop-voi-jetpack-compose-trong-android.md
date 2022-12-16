Trong UI toolkit Jetpack compose mới của Android (Hiện tại là bản [beta](https://android-developers.googleblog.com/2021/02/announcing-jetpack-compose-beta.html)) đã cung cấp những tinh năng bạn cần để tạo ra những ứng dụng hiệu quả nhất.
[CameraX](https://developer.android.com/training/camerax) là một trog những thư viện jetpack mà giúp cho bạn kiểm soát camera một cách dễ dàng.

Compose vẫn còn đang được phát triển, vẫn còn nhiều View chưa được hỗ trợ viết bằng Compose. Hiện tại, không có bất kỳ function chính thức của Compose nào cho CameraX, vì vậy chúng tôi phải inflate một View android bên trong Compose. Trong bài viết này, tôi sẽ trình bày một cách thông dụng để sử dụng CameraX trong Jetpack Compose

### Compose PreviewView

Trong CameraX library, [Preview](https://developer.android.com/reference/androidx/camera/core/Preview) là một use case cung cấp một `camera preview stream` cho Camera. Class [PreviewView](https://developer.android.com/reference/androidx/camera/view/PreviewView) xử lý các task liên quan đến View. Để hiện thị hình ảnh trong Jetpack compose chúng ta cần inflate một `PreviewView` bên trong Compose View. AndroidView là một `composable` có thể được sử dụng để thêm Android Views vào bên trong hàm @Composable. Trong hàm AndroidView, nó yêu cầu ba tham số:
1. **ViewBlock**:  Điều này mong đợi một hàm để tạo một Class mở rộng một Android view. Ở đây, chung ta cần tạo và cung cấp một class PreviewView 
2. **Modifier**:  Này cho phép có thể áp dụng các modifier trong layout chứa các view được khởi tạo. Nếu chúng ta muốn preview toàn màn hình điện thoại, ta dùng `Modifier.fillMaxSize()` 
3. **Update**: Chức năng này được sử dụng để xử lý tất cả các cập nhật của `composition tree`. Vì chúng ta đang streaming Preview Camera fame nên chúng ta không cần thực hiện bất kỳ cập nhật chế độ xem nào tại đây.

Bạn có thể tìm thấy toàn bộ `composable function` của CameraPreview bên dưới

![](https://images.viblo.asia/eef96d48-a728-4f39-9171-e6b9c8a43acf.PNG)

Từ đoạn code phía trên chúng ta nhận ra:
1. Chúng ta tạo instance  của [ProcessCameraProvider](https://developer.android.com/reference/androidx/camera/lifecycle/ProcessCameraProvider)  từ `local context`, sẽ được sử dụng để bind vòng đời của camera và sử dụng `remember{}` để lưu lại vòng đời của quá trình
2. Chúng ta tạo PreviewView với context và các thiết lập Preview bên trong runnable với `cameraProviderFuture` . Bạn cần tạo `ContextCompat.getMainExecutor()` theo nó yêu cầu để chạy trên main thread
3. Trong runnable, bạn có thể thiết lập các surface View để khởi tạo object Preview và chọn camera với `CameraSelected`. Trước khi bind vòng đời camera vào  `lifecycle owner`, ta gọi `unbindAll()` để chắc rằng không gì bị ràng buộc, (xóa tất cả use case)
4. Sau khi thiết lập tất cả, bạn cần return PreviewView

Nếu bạn thêm  `composable function` này vào bên trong phương thức `setContent()`, bạn sẽ thấy toàn màn hình Camera hiện ra, Với sự giúp đỡ của thư viện CameraX, bạn không cần phải quản lý trạng thái của camera hay kể cả hình ảnh. 

### Phân tích hình ảnh với Palette

CameraX API không chỉ hiện thị preview camera và chụp ảnh dễ dàng hơn, bạn còn có thể áp dựng phân tích hình ảnh một cách đơn giản. Bạn có thể cung cấp một custom class implements [ImageAnalysis.Analyzer](https://developer.android.com/reference/androidx/camera/core/ImageAnalysis.Analyzer) interface, sẽ được gọi cùng với `camera frames`. Vì vậy bạn có thể nhận được dữ liệu hình ảnh và thực thi một trình phân tích. Ở đây, tôi dùng thư viện palette để kiểm tra màu tối của `camera frames`
```
val imageAnalysis = ImageAnalysis.Builder()
        .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
        .build()
        .apply {
            setAnalyzer(executor,analyzer)
        }
    
    cameraProvider.bindToLifecycle(
        lifecycleOwner,
        cameraSelector,
        imageAnalysis,
        preview
    )
```

Trình phân tích hình ảnh có thể truy cập proxy hình ảnh dựa trên cấu hình của bạn khi tạo trình phân tích. Thư viện CameraX tạo ra dữ liệu hình ảnh ở định dạng YUV_420_888 (mã định dạng hình ảnh 35 nếu bạn gọi `getFormat ()`). Đối tượng palette cho phép bạn truy cập vào các màu trong hình ảnh Bitmap đồng thời cung cấp sáu cấu hình màu chính từ bitmap. Để tạo một palette, bản dựng Palette cần một bitmap khi khởi tạo instance, vì vậy chúng ta cần một cách để chuyển đổi dữ liệu hình ảnh xem trước sang bitmap. May mắn thay, có một chức năng chuyển đổi đã được đăng ở [đây](https://stackoverflow.com/questions/56772967/converting-imageproxy-to-bitmap/56812799#56812799). Bạn có thể tìm thấy thêm chi tiết triển khai ở hình bên dưới. Một điều cần nhớ là đóng proxy hình ảnh sau khi bạn hoàn thành phân tích. 

![](https://images.viblo.asia/1cee0336-7a5d-439d-9237-2b6f8ecdee6d.PNG)

### Cập nhật Mesh View với trạng thái

Trong Mesh View, một `MeshColoris` được sử dụng để xác định trạng thái và `ViewModel` sẽ lưu trữ trạng thái. Bây giờ, chúng ta có bộ phân tích hình ảnh để kiểm tra bảng màu của `camera frames`. Để cập nhật trạng thái Mesh View, sự kiện thay đổi onColorChanged được hiển thị bởi ViewModel và sẽ được trình phân tích hình ảnh kích hoạt vài giây một lần. Hãy kết nối mọi thứ lại với nhau để hiển thị chế độ Mesh View động bằng cách sử dụng luồng dữ liệu một chiều và vòng lặp cập nhật trạng thái và sự kiện diễn ra như sau:

![](https://images.viblo.asia/f58f3797-cd1e-4f82-bbbe-e487ae2b300c.PNG)

Đối với MeshView composable, trạng thái sẽ được chuyển từ ViewModel và onColorChanged sẽ được gọi bởi ImgeAnalyzer để đáp ứng với các thay đổi của `camera frames`.

Nguồn: 

https://developer.android.com/training/camerax <br/>
https://android-developers.googleblog.com/2021/02/announcing-jetpack-compose-beta.html <br/>
https://proandroiddev.com/compose-camerax-on-android-58578f37e6df