**CameraX** là một thư viện Jetpack của Android được xây dựng với mục đích dễ dàng tận dụng khả năng của `API camera 2`. Ngoài việc tận dụng những khả năng vốn có của API camera 2 , CameraX còn giải quyết vấn đề tương thích trên các thiết bị khác nhau ( Samsung, Xiaomi, Huawei …) . CameraX hỗ trợ hầu hết các thiết bị Android, có khả năng hỗ trợ tới phiên bản `Android 5.0 (API 21)`.
![](https://images.viblo.asia/b2c9fa64-61a5-4861-9f36-7640e7e51f37.png)
### Cấu trúc của CameraX
CameraX được xây dựng dựa trên cấu trúc `use-case` cơ bản với 3 tác vụ xử lý chính giúp cho bạn có thể tương tác với camera một cách dễ dàng
1. **Preview**: Cung cấp một bản xem trước với `SurfaceTexture`
2. **Image analysis** : Cung cấp một cách để xử lý các dữ liệu với camera ( khung hình), phân tích các khung hình trong thời gian thực phục vụ cho Computer Vision, ML hay thêm vào các extensions như HDR, beauty, ... để làm đẹp ảnh.
3. **Image capture** : Cung cấp các phương thức để chụp hình và lưu trữ

### Preview
Preview cung cấp một `SurfaceTexture` để truyền dữ liệu đầu vào cho camera. Nó cung cấp các thông tin bổ sung cho chế độ xem để cắt, chia tỷ lệ hay xoay khung hình cho đúng yêu cầu. Nó được khởi tạo bằng cách sử dụng một cấu hình được xác định trong `PreviewConfig`
```
fun buildPreviewUseCase(): Preview {
    val previewConfig = PreviewConfig.Builder()
        .setTargetAspectRatio(aspectRatio)
        .setTargetRotation(rotation)
        .setTargetResolution(resolution)
        .setLensFacing(lensFacing)
        .build()
    
    val preview = Preview(previewConfig)
    preview.setOnPreviewOutputUpdateListener { previewOutput ->
        cameraTextureView.surfaceTexture = previewOutput.surfaceTexture
    }

    return preview
}
```
Cấu hình `builder` cung cấp các tùy chọn để đặt tỷ lệ dung hình (4:3,16:9...) và các tùy chỉnh về độ phân giải của hình ảnh. Tuy nhiên mục này không được ưu tiên vì tùy thiết bị có độ phân giải bao nhiêu thì sẽ được tùy chỉnh trong phạm vi mà thiết bị đó hỗ trợ. Xoay cũng có thể được cấu hình nhưng mặc định giá trị sẽ được lấy theo hướng của thiết bị.
Một điều quan trọng cần tính đến là khi thiết bị xoay ngang hoặc xoay dọc. Khi thiết bị ở trạng thái xoay ngang, thì preview cũng sẽ được xoay ngang theo. Tức là chúng ta đã thực hiện chuyển đổi màn hình TextureView để truyển đổi dữ liệu
```
preview.setOnPreviewOutputUpdateListener { previewOutput ->
    cameraTextureView.surfaceTexture = previewOutput.surfaceTexture

    // Compute the center of preview (TextureView)
    val centerX = cameraTextureView.width.toFloat() / 2
    val centerY = cameraTextureView.height.toFloat() / 2

    // Correct preview output to account for display rotation
    val rotationDegrees = when (cameraTextureView.display.rotation) {
        Surface.ROTATION_0 -> 0
        Surface.ROTATION_90 -> 90
        Surface.ROTATION_180 -> 180
        Surface.ROTATION_270 -> 270
        else -> return@setOnPreviewOutputUpdateListener
    }

    val matrix = Matrix()
    matrix.postRotate(-rotationDegrees.toFloat(), centerX, centerY)

    // Finally, apply transformations to TextureView
    cameraTextureView.setTransform(matrix)
}
```
### Image Analysis
Trường hợp sử dụng phân tích hình ảnh cung cấp cho ứng dụng của bạn hình ảnh có thể truy cập CPU để thực hiện xử lý hình ảnh, AI , Machine Learning. Ứng dụng thực hiện một phương thức Phân tích được chạy trên mỗi khung. Được định nghĩa sẵn trong `ImageAnalysisConfig`.
```
fun buildImageAnalysisUseCase(): ImageAnalysis {
    val analysisConfig = ImageAnalysisConfig.Builder()
        .setTargetAspectRatio(aspectRatio)
        .setTargetRotation(rotation)
        .setTargetResolution(resolution)
        .setImageReaderMode(readerMode)
        .setImageQueueDepth(queueDepth)
        .build()
        
    val analysis = ImageAnalysis(analysisConfig)
    analysis.setAnalyzer { image, rotationDegrees ->
        val rect = image.cropRect
        val format = image.format
        val width = image.width
        val height = image.height
        val planes = image.planes
    }

    return analysis
}
```
Chúng ta có thể hiểu được chúng như một cái máy phân tích được chạy khi bắt đầu có hình ảnh truyển tới trong preview. Chúng nhận phương thức truyền vào là một object `ImageProxy` với phương thức `setAnalyzer`. Việc phân tích dữ liệu hình ảnh phải được diễn ra thật nhanh để không làm tắc nghẽn trong quá trình thu nhận data từ preview. Trong những trường hợp xử lý các tác vụ nặng , bạn nên copy hình ảnh ra một nơi khác và xử lý chúng lâu hơn.
Ngoài các tham số cấu hình được sử dụng trong trường hợp sử dụng xem trước (độ phân giải, tỷ lệ khung hình và góc quay), có thể đặt chế độ đầu đọc cho trường hợp sử dụng phân tích hình ảnh, điều này chỉ định cách hình ảnh được truyền vào để phân tích. Hai chế độ là có thể, `ACQUIRE_LATEST_IMAGE` và `ACQUIRE_NEXT_IMAGE`. Cái trước lấy hình ảnh mới nhất từ ​​đường ống thu nhận hình ảnh trong khi bỏ qua bất kỳ hình ảnh cũ nào khác, cái sau lấy hình ảnh tiếp theo trong đường ống.
1. `ACQUIRE_LATEST_IMAGE` lấy hình ảnh mới nhất từ truyền từ preview và bỏ qua tất cả hình ảnh cũ.
2. `ACQUIRE_NEXT_IMAGE` lấy hình ảnh được truyền vào tiếp
3. 
Cuối cùng, hàng đợi độ sâu là một tham số chỉ định số lượng hình ảnh có sẵn trong đường ống cho máy tính hoặc AI Việc tăng nó có ảnh hưởng đến hiệu suất và việc sử dụng bộ nhớ của máy ảnh.
Khi `ACQUIRE_LATEST_IMAGE` được sử dụng, chỉ có hình ảnh mới nhất trong đường ống được phân tích, do đó, việc tăng hàng đợi độ sâu (làm cho hàng đợi lớn hơn) sẽ giúp máy phân tích có nhiều thời gian hơn để phân tích hình ảnh trước khi đình trệ đường ống.
Khi `ACQUIRE_NEXT_IMAGE` được sử dụng, việc tăng hàng đợi độ sâu sẽ giúp đường ống chạy trơn tru hơn, đặc biệt là khi thiết bị chịu tải cao.
### Image capture
Mục tiêu cuối cùng cho hầu hết các ứng dụng máy ảnh là chụp ảnh, đây là vai trò của trường hợp sử dụng chụp ảnh. Nó theo mô hình tương tự như 2 trường hợp sử dụng khác.
Cấu hình chụp ảnh **Builder** cho phép đặt chế độ flash trong khi chụp ảnh ( ON, OFF hoặc AUTO) cũng như chế độ chụp `MIN_LATENCY` hoặc `MAX_QUALITY`ưu  tiên độ trễ hơn chất lượng hình ảnh hoặc ngược lại khi chụp ảnh.
```
fun buildImageCaptureUseCase(): ImageCapture {
    val captureConfig = ImageCaptureConfig.Builder()
        .setTargetAspectRatio(aspectRatio)
        .setTargetRotation(rotation)
        .setTargetResolution(resolution)
        .setFlashMode(flashMode)
        .setCaptureMode(captureMode)
        .build()
        
    val capture = ImageCapture(captureConfig)
    cameraCaptureImageButton.setOnClickListener {
        // Create temporary file
        val fileName = System.currentTimeMillis().toString()
        val fileFormat = ".jpg"
        val imageFile = createTempFile(fileName, fileFormat)
        
        // Store captured image in the temporary file
        capture.takePicture(imageFile, object : ImageCapture.OnImageSavedListener {
            override fun onImageSaved(file: File) {
                // You may display the image for example using its path file.absolutePath
            }

            override fun onError(useCaseError: ImageCapture.UseCaseError, message: String, cause: Throwable?) {
                // Display error message
            }
        })
    }

    return capture
}
```
Các ImageCapture cho phép để xác định một vị trí để lưu trữ hình ảnh mới được thực hiện và một người biết lắng nghe đó là viện dẫn mỗi lần một bức ảnh được chụp. Trình nghe này chứa 2 callback lại cho các hoạt động chụp ảnh thành công và thất bại.

### CameraX Lifecycles
CameraX là một lifecycle-aware nên phù hợp với vòng đời của Activity và Fragment . CameraX quan sát vòng đời để xác định khi nào nên mở máy ảnh, khi nào tạo phiên chụp và khi nào nên dừng và tắt.
### Combine use cases
Các ca sử dụng có thể chạy đồng thời với nhau, mặc dù các ca sử dụng đều có thể liên kết với vòng đời của ứng dụng, nhưng cách tốt nhất vẫn là chạy đồng thời ba ca sử dụng với nhau với một lần gọi CameraX.bindToLifecycle()
```
val imageCapture: ImageCapture

override fun onCreate() {
    val previewConfig = PreviewConfig.Builder().build()
    val imageCaptureConfig = ImageCaptureConfiguration.Builder().build()

    val imageCapture = ImageCapture(imageCaptureConfig)
    val preview = Preview(previewConfig)

    val textureView = findViewById(R.id.textureView)

    preview.setOnPreviewOutputUpdateListener { previewOutput ->
        textureView.surfaceTexture = previewOutput.surfaceTexture
    }

    CameraX.bindToLifecycle(this as LifecycleOwner, preview, imageCapture)
}
```
Chúng ta có thể theo dõi các kết hợp sau được hỗ trợ
![](https://images.viblo.asia/85fc3840-57cf-4180-a70f-18198dcf29e1.png)
### Permissions
Sử dụng máy ảnh của thiết bị yêu cầu sự cho phép máy ảnh từ người dùng. CameraX không xử lý việc này, do đó, bạn phải yêu cầu thiết bị đó trong thời gian chạy trước khi tương tác với API. Bạn có thể làm điều này bằng cách xin quyền ứng dụng Camera trong `manifest.xml`
```
<uses-permission android:name="android.permission.CAMERA" />
```
Sau đó xin quyền sử dụng camera khi vào ứng dụng
```
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    if (isCameraPermissionGranted()) {
        displayCameraFragment()
    } else {
        requestCameraPermission()
    }
}

override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    if (requestCode == CAMERA_REQUEST_CODE) {
        if (grantResults.contains(PackageManager.PERMISSION_GRANTED)) {
            displayCameraFragment()
        } else {
            displayErrorMessage()
        }
    }
}

private fun isCameraPermissionGranted(): Boolean {
    val permission = ContextCompat.checkSelfPermission(requireContext(), Manifest.permission.CAMERA)
    return permission == PackageManager.PERMISSION_GRANTED
}

private fun requestCameraPermission() {
    requestPermissions(arrayOf(Manifest.permission.CAMERA), CAMERA_REQUEST_CODE)
}
```
Khi người dùng cho phép sử dụng camera trên thiết bị của họ. Lúc này bạn có thể sử dụng CameraX API.
### Declare dependencies
Để sử dụng được CameraX bạn cần phải thêm Google Maven repository vào dự án của mình
Mở **build.gradle** trong dự án của bạn và thêm `google()` như đoạn code dưới đây :
```
allprojects {
  repositories {
    google()
    jcenter()
  }
}
```
Thêm đoạn code bên dưới vào build.gradle của các module có sử dụng CameraX
```
dependencies {
    // CameraX core library.
    def camerax_version = "1.0.0-alpha01"
    implementation "androidx.camera:camera-core:${camerax_version}"
    // If you want to use Camera2 extensions.
    implementation "androidx.camera:camera-camera2:${camerax_version}"

}
```

### Tổng kết
- Trên đây là những tổng hợp của mình về CameraX , do chưa có nhiều kinh nghiệm có gì sai sót mong các bạn góp ý (bow). Ngoài ra các bạn có thể tham khảo các tài liệu ở bên dưới

### Tài liệu tham khảo
* Further learning
* The official documentation on CameraX
* Android Jetpack: Understand the CameraX Camera-Support Library (Google I/O’19)
* Codelab: Getting started with CameraX