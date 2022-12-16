Hôm nay mình sẽ viết một bài về CameraX  của Android Jetpack. Về cơ bản thì CameraX là một thư viện của bộ Jetpack nó giúp việc xây dựng một app về camera trở nên dễ dàng hơn, nó rút gọn code hơn so với thư viện trước đó và còn có thêm các extension cho phép thêm các hiệu ứng trên các dòng thiết bị có hỗ trợ. Ví dụ như: HDR, Beauty, chụp đêm...

![](https://images.viblo.asia/7200a296-5819-4a47-9eea-d1a110e8bcdd.png)

# CameraX structure
Các dev sử dụng CameraX để giao tiếp với máy ảnh của thiết bị thông qua một phần trừu tượng gọi là use case và một vài use case hiện có sẵn:

**Preview**:  cho phép trên app hiển thị những gì camera đang chụp.\
**Image analysis**: cung cấp bộ đệm có thể truy cập CPU để phân tích ảnh, dùng nhiều trong Machine Learning.\
**Image capture**: Chụp và lưu ảnh.

Các use case này có thể được dùng song song với nhau. 

# Tạo một app CameraX đơn giản
## Configure
Minimum API là 21 và dùng Android Stuido 3.6 trở lên.\
Mở build.gradle(Module: app) thêm các dependencies bên dưới vào .
```
    def camerax_version = "1.0.0-beta12"
    // CameraX core library using camera2 implementation
    implementation "androidx.camera:camera-camera2:$camerax_version"
    implementation "androidx.camera:camera-lifecycle:$camerax_version"
    implementation "androidx.camera:camera-view:1.0.0-alpha19"
```
CameraX cần một số phương thức của Java 8, vì vậy chúng ta cần đặt các tùy chọn biên dịch của mình cho phù hợp. 
```
android {
    compileSdkVersion 30
    buildToolsVersion "30.0.2"
    ....
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
  ...
}
```
Trong file `AndroidManifest.xml`
```
<uses-feature android:name="android.hardware.camera.any" />
<uses-permission android:name="android.permission.CAMERA" />
```
Sau đó **sync** lại gradle.

## Code UI đơn giản
Trong file `activity_main.xml` thêm đoạn code như sau:
```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.jp.gyao.camerax.MainActivity">

    <androidx.appcompat.widget.AppCompatButton
        android:id="@+id/btCamera"
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:text="Take a Photo"
        android:elevation="10dp"
        android:includeFontPadding="false"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

//Thẻ preview cho phép hiển thị lên màn hình điện thoại những gì camera thấy được.
    <androidx.camera.view.PreviewView
        android:id="@+id/viewFinder"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

## Code các chức năng chính
Trong `MainActivity.kt `của mình thì trong `onCreate ()` sẽ để hàm xin quyền Camera. Mặc dù ở onCreate () đã xin quyền hoàn tất nhưng máy ảnh sẽ chưa hoạt động cho đến khi ta triển khai các phương thức trong tệp.

```
typealias LumaListener = (luma: Double) -> Unit

class MainActivity : AppCompatActivity() {
   private var imageCapture: ImageCapture? = null

   private lateinit var outputDirectory: File
   private lateinit var cameraExecutor: ExecutorService

   override fun onCreate(savedInstanceState: Bundle?) {
       super.onCreate(savedInstanceState)
       setContentView(R.layout.activity_main)

       // Xin quyền máy ảnh
       if (allPermissionsGranted()) {
           startCamera()
       } else {
           ActivityCompat.requestPermissions(
               this, REQUIRED_PERMISSIONS, REQUEST_CODE_PERMISSIONS)
       }

       // Lắng nghe sự kiện chụp ảnh.
       camera_capture_button.setOnClickListener { takePhoto() }
        
        //Một biến để lưu trữ đường dẫn ảnh.
       outputDirectory = getOutputDirectory()

      //Tạo một luồng mới chạy độc lập.
       cameraExecutor = Executors.newSingleThreadExecutor()
   }

   private fun takePhoto() {}

   private fun startCamera() {}

   private fun allPermissionsGranted() = REQUIRED_PERMISSIONS.all {
       ContextCompat.checkSelfPermission(
           baseContext, it) == PackageManager.PERMISSION_GRANTED
   }

   private fun getOutputDirectory(): File {
       val mediaDir = externalMediaDirs.firstOrNull()?.let {
           File(it, resources.getString(R.string.app_name)).apply { mkdirs() } }
       return if (mediaDir != null && mediaDir.exists())
           mediaDir else filesDir
   }

   override fun onDestroy() {
       super.onDestroy()
       cameraExecutor.shutdown()
   }

   companion object {
       private const val TAG = "CameraXCoBan"
       private const val FILENAME_FORMAT = "yyyy-MM-dd-HH-mm-ss-SSS"
       private const val REQUEST_CODE_PERMISSIONS = 10
       private val REQUIRED_PERMISSIONS = arrayOf(Manifest.permission.CAMERA)
   }
}
```

### Implement Preview use case
Trong một ứng dụng máy ảnh, `viewfinder` được sử dụng để cho phép người dùng xem trước ảnh họ sẽ chụp. Ta có thể triển khai `viewfinder` bằng cách sử dụng lớp CameraX Preview.

```
private fun startCamera() {
  // Sử dụng để ràng buộc vòng đời của máy ảnh với vòng đời của View. Điều này giúp loại bỏ nhiệm vụ mở và đóng máy ảnh vì CameraX nhận biết được vòng đời.
   val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

   cameraProviderFuture.addListener(Runnable {
     
       val cameraProvider: ProcessCameraProvider = cameraProviderFuture.get()

       // Preview
       val preview = Preview.Builder()
          .build()
          .also {
             it.setSurfaceProvider(viewFinder.surfaceProvider)
          }

       // Lựa chọn mặc định dùng camera sau.
       val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

      // Bên trong khối try, hãy đảm bảo không có gì liên kết với cameraProvider, sau đó liên kết cameraSelector và đối tượng Preview với cameraProvider.
       try {
           // Huỷ liên kết với vòng đời của View trước khi liên kết trở lại
           cameraProvider.unbindAll()

           // Liên kết Preview use case đến Camera.
           cameraProvider.bindToLifecycle(
               this, cameraSelector, preview)

       } catch(exc: Exception) {
           Log.e(TAG, "Liên kết thất bại", exc)
       }

   }, ContextCompat.getMainExecutor(this)) //Chạy trên luồng chính.
}
```
![](https://images.viblo.asia/fe71290f-019c-47c0-85d2-585f5e370fd6.png)

### Implement ImageCapture use case

```
    private fun takePhoto() {
    
    // Đầu tiên, hãy kiểm tra ImageCapture. Nếu trường hợp sử dụng là null, thì ta thoát ra khỏi hàm.
        val imageCapture = imageCapture ?: return

    // Tiếp theo, tạo một tệp để lưu giữ hình ảnh. Thêm dấu thời gian để tên tệp sẽ là duy nhất.
        val photoFile = File(outputDirectory,
                SimpleDateFormat(FILENAME_FORMAT, Locale.US).format(System.currentTimeMillis()) + ".png")
                
    // Tạo một đối tượng OutputFileOptions. Đối tượng này là nơi ta có thể chỉ định mọi thứ về đầu ra của mình. Ở đây mình sẽ lưu vào trong tệp vừa tạo ở trên.
    
        val outputOption = ImageCapture.OutputFileOptions.Builder(photoFile).build()
        
        
    // Khi gọi hàm takePicture() trên đối tượng imageCapture. Truyền vào outputOptions, trình thực thi và một lệnh gọi lại khi ảnh được lưu.
        imageCapture.takePicture(
                outputOption, ContextCompat.getMainExecutor(this), object : ImageCapture.OnImageSavedCallback {
                
     // Nếu việc chụp không bị lỗi, ảnh đã được chụp thành công! Lưu ảnh vào tệp bạn đã tạo trước đó.
            override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                val savedUri = Uri.fromFile(photoFile)
                val msg = "Đường dẫn ảnh: $savedUri"
                Toast.makeText(this@MainActivity, msg, Toast.LENGTH_SHORT).show()
                Log.d(TAG, msg)
            }
     // Nếu thất bại thì in ra log.
            override fun onError(exception: ImageCaptureException) {
                Log.e(TAG, "Không lấy được ảnh: ${exception.message}", exception)
            }

        })
    }
```
Tiếp đó vào trong hàm` startCamera() ` thêm vào đoạn code sau:\
 ```
 imageCapture = ImageCapture.Builder().build()
 ...
 
 // Thêm biến imageCapture vào trong cameraProvider
 cameraProvider.bindToLifecycle(
   this, cameraSelector, preview, imageCapture)
 ```
 
 ![](https://images.viblo.asia/f1b6ec6d-4159-44e5-bc1b-9751bb33fd57.jpg)

 ### Implement ImageAnalys use case
Để làm cho ứng dụng máy ảnh thú vị hơn thì mình sử dụng tính năng ImageAnalys. Nó cho phép xác định một lớp tùy chỉnh triển khai giao diện `ImageAnalysis.Analyzer` và sẽ được gọi với các khung mà máy ảnh hướng đến. 

Thêm bộ phân tích này vào dưới dạng một lớp bên trong trong `MainActivity.kt`. Máy phân tích ghi lại độ sáng trung bình của hình ảnh. Để tạo một trình phân tích, ta ghi đè chức năng phân tích trong một lớp triển khai giao diện ImageAnalysis.Analyzer.

```
    private class LuminosityAnaLyzer(private val listener: LumaListener) : ImageAnalysis.Analyzer {
        private fun ByteBuffer.toByteArray(): ByteArray {
            rewind() // Đưa bộ đệm về 0
            val data = ByteArray(remaining()) //copy bộ đệm vào mảng byte
            get(data)
            return data
        }

        override fun analyze(image: ImageProxy) {
            val buffer = image.planes[0].buffer
            val data = buffer.toByteArray()
            val pixels = data.map { it.toInt() and 0xFF }
            val luma = pixels.average()
            listener(luma)
            image.close()
        }
    }
```

Với lớp triển khai giao diện `ImageAnalysis.Analyzer`, tất cả những gì chúng ta cần làm là khởi tạo một phiên bản của `LuminosityAnalyze`r trong `ImageAnalysis`, tương tự như các trường hợp sử dụng khác và cập nhật lại hàm` startCamera() `trước khi gọi đến `CameraX.bindToLifecycle()`:

```
private fun startCamera(){
...
val imageAnalyzer = ImageAnalysis.Builder()
   .build()
   .also {
       it.setAnalyzer(cameraExecutor, LuminosityAnalyzer { luma ->
           Log.d(TAG, "Average luminosity: $luma")
       })
   }
   ...

   cameraProvider.bindToLifecycle( this, cameraSelector, preview, imageCapture, imageAnalyzer)
   }
```
![](https://images.viblo.asia/4e3da05a-1541-48ea-8e55-747ea63c3f2e.png)

Vậy là mình đã hướng dẫn các bạn làm một App CameraX đơn giản rồi, cảm ơn các bạn đã xem qua :grinning::heart_eyes::kissing_heart::kissing_heart::kissing_heart::kissing_heart::kissing_heart:

### Link source code
> https://github.com/nghiaptx-2124/CameraX.git

### Tài liệu tham khảo

> https://codelabs.developers.google.com/codelabs/camerax-getting-started

> https://developer.android.com/training/camerax/architecture