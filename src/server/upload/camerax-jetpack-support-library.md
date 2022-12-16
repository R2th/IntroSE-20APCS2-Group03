![](https://images.viblo.asia/b7c0baba-a509-47f7-a374-e34f8e30e3b2.png)

**CameraX** là thư viện hỗ trợ trong gói **Jetpack**, được xây dựng giúp việc phát triển các ứng dụng về camera dễ dàng hơn. Nó cung cấp các `API` nhất quán và dễ sử dụng, hoạt động trên hầu hết các thiết bị Android, có khả năng tương thích ngược tới phiên bản `Android 5.0 (API 21)`.

Ngoài việc tận dụng được các khả năng của `camera2`, **CameraX** sử dụng một cách tiếp cận đơn giản dựa trên `use-case` và là một thành phần `lifecycle-aware`, nghĩa là nó hoạt động tương thích với vòng đời của `fragment/activity`. Nó cũng giải quyết các vấn đề về tương thích thiết bị cho bạn. 

Cuối cùng, **CameraX** cho phép các nhà phát triển tận dụng các trải nghiệm và tính năng tương tự của ứng dụng camera được cài đặt sẵn trong máy, chỉ với hai dòng code. [CameraX Extentions](https://developer.android.com/training/camerax/vendor-extensions) là các tiện ích bổ sung cho phép bạn thêm các hiệu ứng như `Portrait`, `HDR`, `Night` hay `Beauty`, ...
<br>

## Những lợi ích chính
* **Dễ dàng sử dụng**: CameraX sử dụng các `use-case` giúp bạn tập trung vào task mà bạn muốn hoàn thành thay vì việc tốn thời gian xử lý các vấn đề về tính đặc thù của thiết bị (`device-specific`). Một số `use-case` cơ bản: [Preview](https://developer.android.com/training/camerax/preview), [Image Analysis](https://developer.android.com/training/camerax/analyze), [Image capture](https://developer.android.com/training/camerax/take-photo).
* **Tính nhất quán trên các thiết bị**: nhất quán về các thành phần như `aspect ratio`, `orientation`, `rotation`, ... 
* **Các trải nghiệm camera mới**: CameraX có bộ add-on gọi là [Extentions](https://developer.android.com/training/camerax/vendor-extensions), nó cho phép bạn đưa vào các tính năng như một ứng dụng camera native (`Portrait`, `HDR`, `Night` hay `Beauty`), chỉ với 2 dòng code.

## Các bước triển khai CameraX
### Bước 01:
Thêm `dependency` sau vào file `gradle` của bạn:
```java
dependencies {
  def camerax_version = "1.0.0-alpha01"
  implementation "androidx.camera:camera-core:$camerax_version"
  implementation "androidx.camera:camera-camera2:$camerax_version"
}
```
### Bước 02:
Project của chúng ta sẽ có một Activity (`MainActivity.kt`) và file layout (`activity_main.xml`) của nó. Ở trong `activity_main.xml`, bạn thêm vào một **TextureView** để hiển thị Camera:
```java
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextureView
        android:id="@+id/texture"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <androidx.appcompat.widget.AppCompatButton
        android:id="@+id/btn_take_picture"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:gravity="center"
        android:text="Capture"
        android:textAllCaps="false"
        android:textColor="@android:color/black"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
### Bước 03:
Bây giờ, bạn cần khai báo quyền truy cập Camera ở trong file `AndroidManifest`:
```java
<uses-permission android:name="android.permission.CAMERA" />
```
### Bước 04:
Tiếp theo, hãy thêm đoạn code sau vào file `MainActivity.kt` của bạn:
```java
class MainActivity : AppCompatActivity() {

    private var lensFacing = CameraX.LensFacing.BACK

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        texture.post { startCamera() }

        // Every time the provided texture view changes, recompute layout
        texture.addOnLayoutChangeListener { _, _, _, _, _, _, _, _, _ ->
            updateTransform()
        }
    }

    private fun startCamera() {
        val metrics = DisplayMetrics().also { texture.display.getRealMetrics(it) }
        val screenSize = Size(metrics.widthPixels, metrics.heightPixels)
        val screenAspectRatio = Rational(metrics.widthPixels, metrics.heightPixels)

        val previewConfig = PreviewConfig.Builder().apply {
            setLensFacing(lensFacing)
            setTargetResolution(screenSize)
            setTargetAspectRatio(screenAspectRatio)
            setTargetRotation(windowManager.defaultDisplay.rotation)
            setTargetRotation(texture.display.rotation)
        }.build()

        val preView = Preview(previewConfig)
        preView.setOnPreviewOutputUpdateListener {
            texture.surfaceTexture = it.surfaceTexture
            updateTransform()
        }

        // Create configuration object for the image capture use case
        val imageCaptureConfig = ImageCaptureConfig.Builder().apply {
            setLensFacing(lensFacing)
            setTargetAspectRatio(screenAspectRatio)
            setTargetRotation(texture.display.rotation)
            setCaptureMode(ImageCapture.CaptureMode.MAX_QUALITY)
        }.build()

        // Build the image capture use case and attach button click listener
        val imageCapture = ImageCapture(imageCaptureConfig)
        
        btn_take_picture.setOnClickListener {
            val file = File(
                "${Environment.getExternalStoragePublicDirectory
                (Environment.DIRECTORY_PICTURES)}${System.currentTimeMillis()}.jpg"
            )

            imageCapture.takePicture(file, object : ImageCapture.OnImageSavedListener {
                override fun onImageSaved(file: File) {
                    val msg = "Successfully: ${file.absolutePath}"
                    Toast.makeText(this@MainActivity, msg, Toast.LENGTH_SHORT).show()
                }

                override fun onError(useCaseError: ImageCapture.UseCaseError, message: String, cause: Throwable?) {
                    val msg = "Failed: $message"
                    Toast.makeText(this@MainActivity, msg, Toast.LENGTH_SHORT).show()
                }
            })
        }

        CameraX.bindToLifecycle(this, preView, imageCapture)
    }

    private fun updateTransform() {
        val matrix = Matrix()
        val centerX = texture.width / 2f
        val centerY = texture.height / 2f

        val rotationDegrees = when (texture.display.rotation) {
            Surface.ROTATION_0 -> 0
            Surface.ROTATION_90 -> 90
            Surface.ROTATION_180 -> 180
            Surface.ROTATION_270 -> 270
            else -> return
        }
        matrix.postRotate(-rotationDegrees.toFloat(), centerX, centerY)
        texture.setTransform(matrix)
    }
}
```
Cụ thể:

* **CameraX.bindToLifeCycle()** `bind` camera vào vòng đời của activity.
* **PreviewConfig.Builder()** là builder class cho **PreviewConfig** (dùng để xem preview của ảnh chụp), bạn có thể sử dụng class này để điều chỉnh các thiết lập như: **lens, resolution, aspect ratio, ...**
* **ImageCaptureConfiguration.Builder()** tương tự là builder class để điều chỉnh các thiết lập khi ảnh được chụp.
* **rotationDegrees** để căn chỉnh lại output của **Preview** và xoay ảnh lại cho đúng.
* Khi nút **Capture** được nhấn, ảnh sẽ được lưu lại vào trong bộ nhớ local của thiết bị.
<br><br>

Trên đây là những bước cơ bản để sử dụng **CameraX**, một thành phần mới trong Jetpack. Ngoài ra, bạn còn có thể tạo ra ứng dụng để quay lại video, sử dụng lớp **ImageAnalysis** để phục vụ việc phân tích ảnh cho Computer Vision, ML hay thêm vào các extensions như HDR, beauty, ... để làm đẹp ảnh.