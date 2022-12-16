# 1. Tổng quan
CameraX là 1 thư viện hỗ trợ của Jetpack, nếu bạn chưa biết đến **Jetpack** thì có thể hình dung đây là một tập hợp các thư viện, công cụ và các hướng dẫn giúp developer phát triển ứng dụng một cách dễ dàng với việc hạn chế code nhàm chán, đơn giản những tác vụ phức tạp. Bạn có thể tham khảo thêm Jetpack tại [đây](https://developer.android.com/jetpack/) 

CameraX sẽ giúp bạn xây dựng ứng dụng camera một cách dễ dàng với việc cung cấp các API phù hợp với các thiết bị Android 5.0 (API 21). So với Camera2, việc sử dụng CameraX giúp bạn không phải bận tâm về vấn đề tương thích với các thiết bị. 

Ưu điểm khi sử dụng CameraX:

1. Dễ sử dụng

CameraX giới thiệu 1 số use case cho phép bạn tập trung vào các công việc cần thực hiện:
* **Preview**: hiển thị 1 image preview
* **Image analysis**: cho phép truy cập bộ đệm CPU cho việc analysis để sử dụng các thuật toán machine learning như MLKit
* **Image capture**: chụp và lưu ảnh

2. Tính nhất quán giữa các thiết bị

Việc quản lý camera trong ứng dụng không hề dễ dàng ví dụ như: aspect ratio, orientation, rotation, preview size, high-resolution image size. Nhưng với CameraX thì việc đó sẽ đơn giản hơn nhiều, 

3. Trải nghiệm mới

CameraX có thêm add-on là [Extensions](https://developer.android.com/training/camerax/vendor-extensions) cho phép bạn truy cập các tính năng được cung cấp cho camera. Một số tính năng mà extension này cung cấp là: Portrait, HDR, Night, Beauty. 

# 2. Camerax Architecture 
Chúng ta cùng nhau tìm hiểu ví dụ sử dụng CameraX:
```java
val preview = Preview.Builder().build()
val viewFinder: PreviewView = findViewById(R.id.previewView)

// PreviewView has a built-in surface provider and is the recommended provider
preview.setSurfaceProvider(viewFinder.previewSurfaceProvider)

// The use case is bound to an Android Lifecycle with the following code
cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, preview)
```
CameraX được liên kết với vòng đời ứng dụng sử dụng method **bindToLifecycle**(). CameraX lắng nghe vòng đời để quyết định khi nào mở camera, khi nào chụp ảnh, khi nào tắt camera. Và hãy sử dụng CameraX.unbindAll() khi bạn muốn hủy liên kết với vòng đời. 

* Config 

CameraX tự động cung cấp tính năng chỉ định của thiết bị mà ứng dụng sẽ được chạy, tức là CameraX sẽ tự động xác định độ phân giải tốt nhất để sử dụng nếu bạn không cung cấp độ phân giải chỉ định hoặc nếu độ phân giải bạn cài đặt không được hỗ trợ trên thiết bị. 
Mục đích của CameraX là khởi tạo thành công phiên làm việc với camera, điều đó có nghĩa CameraX sẽ thỏa hiệp độ phân giải và tỷ lệ ảnh dựa trên sự cho phép của thiết bị.

```
val imageCapture = ImageCapture.Builder()
    .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
    .setTargetAspectRatio(screenAspectRatio)
    .setTargetRotation(rotation)
    .setTargetResolution(resolution)
    .build()
```

# 3. Preview
Để thêm preview vào ứng dụng, sử dụng **PreviewView**, View này có thể crop, scale, rotate
* Config CameraXConfig.Provider

Implement CameraXConfig.Provider trong class Application 
```java
import androidx.camera.camera2.Camera2Config
import androidx.camera.core.CameraXConfig

public class MyCameraXApplication : Application(),  CameraXConfig.Provider {
  override fun getCameraXConfig(): CameraXConfig {
    return Camera2Config.defaultConfig()
  }
}
```
* Thêm PreviewView vào layout
```java
<FrameLayout
    android:id="@+id/container">
        <androidx.camera.view.PreviewView
            android:id="@+id/preview_view" />
</FrameLayout>
```
* Request CameraProvider
```java
import androidx.camera.lifecycle.ProcessCameraProvider
import com.google.common.util.concurrent.ListenableFuture

class MainActivity : AppCompatActivity() {
    private lateinit var cameraProviderFuture : ListenableFuture<ProcessCameraProvider>
    override fun onCreate(savedInstanceState: Bundle?) {
        cameraProviderFuture = ProcessCameraProvider.getInstance(this)
    }
}
```
* Check CameraProvider
```java
cameraProviderFuture.addListener(Runnable {
    val cameraProvider = cameraProviderFuture.get()
    bindPreview(cameraProvider)
}, ContextCompat.getMainExecutor(this))
```
* Chọn camera và liên kết với lifecycle

Khi đã tạo và check CameraProvider thành công, thực hiện các bước dưới đây:

- Tạo Preview và connect với PreviewView

- Chỉ định tùy chọn camera LensFacing 

- Liên kết với lifecycle 
```java
fun bindPreview(cameraProvider : ProcessCameraProvider) {
    var preview : Preview = Preview.Builder()
            .build()

    previewView.setSurfaceProvider(previewView.previewSurfaceProvider)

    var cameraSelector : CameraSelector = CameraSelector.Builder()
          .requireLensFacing(CameraSelector.LENS_FACING_BACK)
          .build()

    cameraProvider.bindToLifecycle(this as LifecycleOwner, cameraSelector, preview)
}
```

# 4. Analyze Image
Image analysis cung cấp bộ đệm CPU để thực thi các công việc phân tích ảnh sử dụng computer vision, machine learning. 
```java
val imageAnalysis = ImageAnalysis.Builder()
    .setTargetResolution(Size(1280, 720))
    .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
    .build()

imageAnalysis.setAnalyzer(executor, ImageAnalysis.Analyzer { image ->
    val rotationDegrees = image.imageInfo.rotationDegrees
    // insert your code here.
})

cameraProvider.bindToLifecycle(this as LifecycleOwner, cameraSelector, imageAnalysis, preview)
```

Image analysis có thể làm việc trong 2 chế độ: blocking và non-blocking. 

Chế độ blocking được enable sử dụng setBackpressureStrategy() với giá trị  STRATEGY_BLOCK_PRODUCER. Trong chế độ này, bộ thực thi sẽ nhận các frame từ camera theo thứ tự tuần tự. 

Chế độ non-blocking sử dụng setBackpressureStrategy() với giá trị STRATEGY_KEEP_ONLY_LATEST, chế độ này sẽ chỉ nhận frame cuối cùng từ camera

Sau khi config xong các chế độ, bạn sử dụng method setAnalyzer() để sử dụng các cách phân tích ảnh và đừng quên bind vào Lifecycle.
# 5. Image Capture
Sau khi config xong camera ở các bước trên, giờ đây bạn có thể chụp lại bức ảnh và lưu lại 
```java
fun onClick() {
    val outputFileOptions = ImageCapture.OutputFileOptions.Builder(File(...))
    imageCapture.takePicture(outputFileOptions,
        object : ImageCapture.OnImageSavedListener {
            override fun onError(error: ImageCapture.ImageCaptureError,
                                 message: String, exc: Throwable?) {
                // insert your code here.
            }
            override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                // insert your code here.
            }
        })
}
```

Bài viết đến đây cũng đủ dài, xin hẹn bạn đọc bài viết tới mình sẽ viết thêm về các extension bá đạo và vô cùng ảo diệu của CameraX này có thể kể đến như: HDR, Bokeh,...


Tham khảo

https://developer.android.com/training/camerax

https://codelabs.developers.google.com/codelabs/camerax-getting-started/#0