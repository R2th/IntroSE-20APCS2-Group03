# Giới thiệu về CameraX

## I. Lịch sử
Android bắt đầu với android.hardware.Camera, đây là một bộ API đơn giản cho phép các nhà phát triển triển khai nhanh chóng tính năng camera trong ứng dụng của họ. Nhưng một vấn đề là nó đã được thêm vào android từ trong android SDK 1, chúng bắt đầu bị lỗi thời. Thị trường thay đổi và người dùng bắt đầu đòi hỏi nhiều hơn từ camera điện thoại của họ.

Android đã giới thiệu API Camera2, nó cho phép các nhà sản xuất và các developers khả năng thêm các tính năng mới phức tạp hơn cho camera. Mặc dù là một API hoàn toàn mới và có tính toàn diện, tuy nhiên nhiều developers cho rằng nó quá phức tạp để thực hiện các tác vụ đơn giản.

## II. CameraX
Nhận thấy sự phức tạp của Camera2, Google hiện đã phát hành thư viện JetX CameraX. Bộ API này bao gồm cả API của Camera2. CameraX giới thiệu ý tưởng về các trường hợp sử dụng từ đơn giản đến phức tạp, giúp bản thân nó biến thành một API đơn giản.

### Use-cases

CameraX được ra mắt với 3 use-cases (trường hợp sử dụng). Xem trước, đó là nhận được một hình ảnh trên màn hình. Phân tích hình ảnh, cho phép truy cập vào một luồng hình ảnh để sử dụng trong các thuật toán của bạn, chẳng hạn như để chuyển vào MLKit. Chụp ảnh, để lưu hình ảnh chất lượng cao.

3 use-cases này sẽ đáp ứng phần lớn nhu cầu của các nhà phát triển. Chúng có thể được kết hợp với nhau hoặc sử dụng riêng lẻ.

### Giảm độ phức tạp

CameraX không chỉ cung cấp các use-cases mà còn cung cấp tất cả các sắc thái của riêng mỗi thiết bị. Android đang đầu tư vào một phòng thí nghiệm thử nghiệm tự động để đảm bảo rằng tất cả các API CameraX hoạt động giống nhau. Bất kể bạn đang dùng thiết bị gì.

### Tính năng

Tất nhiên, Android không muốn giảm số lượng tính năng có sẵn cho các nhà sản xuất (bao gồm cả các tính năng cho phạm vi Pixel). Để phục vụ cho các tính năng máy ảnh độc đáo và tuyệt vời này, họ đã tạo ra một API mở rộng. Với API này, bạn có thể truy vấn tính khả dụng của một tiện ích mở rộng cụ thể và kích hoạt nó.

## III. Image Capture

### Dependencies

```kotlin
def camerax_version = "1.0.0-alpha01"
implementation "androidx.camera:camera-core:${camerax_version}"
implementation "androidx.camera:camera-camera2:${camerax_version}"
```

Đầu tiên, bạn cần thêm các dependencies cần thiết, hãy đảm bảo rằng bạn thêm cả hai dòng này. Nếu bạn không thêm cái thứ hai, bạn sẽ thấy một ngoại lệ như dưới đây:

Caused by: `java.lang.IllegalStateException: CameraX not initialized yet.`

### TextureView

```xml
<TextureView
    android:id="@+id/texture"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

Tiếp theo, bạn sẽ cần thêm một TextureView đơn giản gán vào fragment hoặc activities layout.

### Permissions

Bạn sẽ cần phải xin quyền android.permission.CAMERA 

```kotlin
internal class CameraFragment : Fragment() {

    // ...

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        if (allPermissionsGranted()) {
            texture.post { startCamera() }
        } else {
            requestPermissions(REQUIRED_PERMISSIONS, REQUEST_CODE_PERMISSIONS)
        }
        
        // ...
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        when (requestCode) {
            REQUEST_CODE_PERMISSIONS -> {
                if (allPermissionsGranted()) {
                    texture.post { startCamera() }
                } else {
                    // TODO : Handle permission not granted
                }
            }
            else ->
                super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        }
    }

    private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
        ContextCompat.checkSelfPermission(
            requireContext(), it
        ) == PackageManager.PERMISSION_GRANTED
    }

    // ...

    companion object {

        private const val REQUEST_CODE_PERMISSIONS = 1
        private val REQUIRED_PERMISSIONS = arrayOf(Manifest.permission.CAMERA)
    }
}
```
Khi bạn có permission, bạn có thể khởi động camera.

### Start Camera

```kotlin
private fun startCamera() {
    val previewConfig = PreviewConfig.Builder().build()
    val preview = Preview(previewConfig)

    preview.setOnPreviewOutputUpdateListener { previewOutput ->
        val parent = texture.parent as ViewGroup
        parent.removeView(texture)
        texture.surfaceTexture = previewOutput.surfaceTexture
        parent.addView(texture, 0)
        updateTransform()
    }
    
    val imageCaptureConfig = ImageCaptureConfig.Builder().build()
    imageCapture = ImageCapture(imageCaptureConfig)

    CameraX.bindToLifecycle(this, preview, imageCapture)
}
```

Sử dụng PreviewConfig.Builder và ImageCaptureConfig.Builder để thiết lập các trường hợp, có nhiều tùy chọn cấu hình khác nhau để kiểm tra.

Sử dụng setOnPreviewOutputUpdateListener () để thêm bản xem trước vào TextureView. Tuy nhiên, phải xóa và thêm lại TextureView vào layout. Điều này là do TextureView tạo trong nội bộ SurfaceTexture của riêng nó khi được gắn vào parent. Nếu bạn không thực hiện điều này, bạn sẽ không thể xem bản xem trước của camera và bạn sẽ nhận được thông báo trong nhật ký lỗi: `SurfaceTexture is not attached to a View`

### Update Transform

```kotlin
private fun updateTransform() {
    val matrix = Matrix()
    val centerX = texture.width / 2f
    val centerY = texture.height / 2f

    val rotationDegrees = when(texture.display.rotation) {
        Surface.ROTATION_0 -> 0
        Surface.ROTATION_90 -> 90
        Surface.ROTATION_180 -> 180
        Surface.ROTATION_270 -> 270
        else -> return
    }
    matrix.postRotate(-rotationDegrees.toFloat(), centerX, centerY)

    texture.setTransform(matrix)
}
```

Hàm updateTransform() dùng để sửa các thay đổi trong điều hướng thiết bị.

### Capture

```kotlin
private fun initCaptureButton() {
    fab_capture.setOnClickListener {
        val file = File(requireContext().filesDir, UUID.randomUUID().toString())
        imageCapture.takePicture(file,
            object : ImageCapture.OnImageSavedListener {
                override fun onError(
                    error: ImageCapture.UseCaseError,
                    message: String, exc: Throwable?
                ) {
                    // TODO : Handle error
                }

                override fun onImageSaved(file: File) {
                    // Image saved successfully
                }
            }
        )
    }
}
```
Để chụp ảnh, sử dụng ImageCapture đã được tạo ra trong startCamera() và gọi TakePicture(). Chúng ta cần truyền cho nó một File và OnImageSattedListener.

### Barcode scanner

Để quét mã vạch trong thời gian thực.

## IV. Tổng kết

Thư viện CameraX đã mang lại rất nhiều sự đơn giản cho vũ trụ máy ảnh. Nó đơn giản hóa việc viết mã cho phần lớn các trường hợp sử dụng, trong khi vẫn cung cấp các khả năng thích hợp.

CameraX một số tính năng vẫn cảm thấy hơi phức tạp, ví dụ: nhấn để lấy nét. Nhưng hy vọng, khi thư viện này phát triển, các tính năng này sẽ được xử lý.

## V. Tài liệu tham khảo
> https://developer.android.com/training/camerax https://codelabs.developers.google.com/codelabs/camerax-getting-started/ https://github.com/android/camera/tree/master/CameraXBasic
> https://android.jlelse.eu/camerax-an-introduction-b3d76c3820e6