CameraX là thư viện Jetpack mới được giới thiệu tại Google IO 2019, được xây dựng để giúp phát triển máy ảnh dễ dàng hơn. Nó cung cấp một môi trường API dễ sử dụng, hoạt động trên hầu hết các thiết bị Android có khả năng tương thích ngược với Android 5.0 (API 21). 
Hôm nay, chúng ta sẽ nói về cách CameraX giải quyết một số vấn đề mà các nhà phát triển đang gặp phải với camera API cũ và xem cách chúng ta có thể tạo ứng dụng máy ảnh của riêng mình bằng CameraX.
## How it helps
Bây giờ câu hỏi vẫn là CameraX khác với các camera API khác như thế nào và làm thế nào nó có thể giúp chúng ta phát triển các ứng dụng máy ảnh tốt hơn. Dưới đây là một số cải tiến và lợi ích lớn nhất mà CameraX cung cấp.
 - Dễ sử dụng : CameraX cung cấp một số trường hợp sử dụng được xác định trước như xem trước, chụp ảnh và phân tích hình ảnh hoạt động trên hầu hết mọi thiết bị trên thị trường. Điều này cho phép các nhà phát triển tập trung vào các nhiệm vụ chúng ta cần hoàn thành thay vì dành thời gian viết chức năng cơ bản và quản lý các yêu cầu cho các thiết bị khác nhau.
 - Tính nhất quán trên các thiết bị: Quản lý tính nhất quán trên các thiết bị khác nhau là khó khăn và có rất nhiều điều cần tính đến bao gồm tỷ lệ khung hình, xoay và định hướng. CameraX xử lý cấu hình cơ bản đó và giảm đáng kể gánh nặng thử nghiệm của chúng ta với tư cách là nhà phát triển.
- Bổ sung tùy chọn: CameraX cũng cho phép các nhà phát triển sử dụng các tính năng camera tương tự mà ứng dụng máy ảnh được cài đặt sẵn cung cấp, với ít yêu cầu về mã. Điều này có thể bằng cách cung cấp các tiện ích bổ sung tùy chọn thêm hiệu ứng như Portrait, HDR, Night và Beauty trong các ứng dụng.
## Use CameraX 
- Bây giờ chúng ta đã biết tại sao CameraX hữu ích và nơi nó có thể được dùng để cải thiện trải nghiệm. 
- Hãy cùng thực hiện các bước để chúng ta có thể phát triển một ứng dụng máy ảnh đơn giản cho phép chúng ta chụp ảnh, bật đèn flash và chuyển ống kính. 
### 1. Importing the dependencies
- Trước tiên chúng ta cần thêm các dependencies cần thiết cho dự án. Chúng ta sẽ thêm các dòng mã sau vào tệp build.gradle (Module: app)
```
//Material Design
implementation 'com.google.android.material:material:1.1.0-alpha05'

// CameraX
def camerax_version = "1.0.0-alpha01"
implementation "androidx.camera:camera-core:${camerax_version}"
implementation "androidx.camera:camera-camera2:${camerax_version}"
```
### 2. Creating the UI
- Chúng ta đã xong bước thiết lập, tiếp theo chúng ta sẽ tạo main layout chứa ba buttons chính để điều khiển ứng dụng
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity"
        android:orientation="vertical">

    <TextureView
            android:id="@+id/view_finder"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />

    <com.google.android.material.floatingactionbutton.FloatingActionButton
            android:id="@+id/fab_camera"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:fabSize="normal"
            android:src="@drawable/ic_camera"
            android:layout_alignParentBottom="true"
            android:layout_margin="32dp"
            android:layout_centerHorizontal="true"
            app:backgroundTint="@android:color/white"/>

    <com.google.android.material.floatingactionbutton.FloatingActionButton
            android:id="@+id/fab_flash"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:fabSize="normal"
            android:src="@drawable/ic_flash"
            android:layout_alignParentBottom="true"
            android:layout_margin="32dp"
            app:backgroundTint="@android:color/white"/>

    <com.google.android.material.floatingactionbutton.FloatingActionButton
            android:id="@+id/fab_switch_camera"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:fabSize="normal"
            android:src="@drawable/ic_switch_camera"
            android:layout_alignParentBottom="true"
            android:layout_margin="32dp"
            android:layout_alignParentRight="true"
            app:backgroundTint="@android:color/white"/>

</RelativeLayout>
```
Lưu ý: Textureview đi kèm với thư viện CameraX và được sử dụng để hiển thị bản xem trước của máy ảnh trong ứng dụng.
### 3. Requesting the required permissions
- Tiếp theo chúng ta cần yêu cầu các quyền cần thiết cho ứng dụng.
```
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```
- Bên cạnh đó, chúng ta cũng phải cần đảm bảo rằng người dùng đã thực sự kích hoạt các quyền bằng cách kiểm tra chúng trong thời gian thực và thực hiện yêu cầu lại quyền nếu bị từ chối.
```
val permissions = arrayOf(android.Manifest.permission.CAMERA, android.Manifest.permission.WRITE_EXTERNAL_STORAGE, android.Manifest.permission.READ_EXTERNAL_STORAGE)
private fun hasNoPermissions(): Boolean{
    return ContextCompat.checkSelfPermission(this,
        Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED || ContextCompat.checkSelfPermission(this,
        Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED || ContextCompat.checkSelfPermission(this,
        Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED
}
fun requestPermission(){
    ActivityCompat.requestPermissions(this, permissions,0)
}
```
### 4. Configuring the preview
- Bây giờ sau khi đã tạo layout và yêu cầu các quyền cần thiết, chúng ta đã có thể bắt đầu thực hiện xem trước máy ảnh. Để làm được điều đó, chúng ta cần tạo một cấu hình xem trước và thêm một trình lắng nghe xem trước vào nó để cập nhật giao diện người dùng mỗi khi đầu ra thay đổi.
- Trước tiên, hãy tạo ra cấu hình xem trước trong hàm bindCamera()
```
private fun bindCamera(){
 val previewConfig = PreviewConfig.Builder()
     .setLensFacing(lensFacing)
     .build()
}
```
- Tiếp theo, chúng ta sử dụng cấu hình vừa tạo để tạo một đối tượng xem trước và có được View (chế độ xem) sẽ hiển thị bản xem trước trong UI.
```
val preview = Preview(previewConfig)

// The view that displays the preview
val textureView: TextureView = findViewById(R.id.view_finder)
```
- Bây giờ chúng ta chỉ cần thêm OnPreviewOutputUpdateListener vào bản xem trước và cập nhật View với đầu ra xem trước mà chúng ta nhận được.
```
// Handles the output data of the camera
preview.setOnPreviewOutputUpdateListener { previewOutput ->
    // Displays the camera image in our preview view
    textureView.surfaceTexture = previewOutput.surfaceTexture
}
```
### 5. Taking an image
- Tiếp theo hãy nhìn vào cách chúng ta có thể chụp ảnh bằng CameraX. Để làm được điều đó, chúng ta cần tạo một cấu hình chụp ảnh sẽ xác định chế độ ống kính và đèn flash mà chúng ta sẽ sử dụng cho hình ảnh của mình và chụp ảnh bằng function TakePhoto()
```
// Image capture config which controls the Flash and Lens
val imageCaptureConfig = ImageCaptureConfig.Builder()
    .setTargetRotation(windowManager.defaultDisplay.rotation)
    .setLensFacing(lensFacing)
    .setFlashMode(FlashMode.ON)
    .build()

imageCapture = ImageCapture(imageCaptureConfig)
```
- Ở đây chúng ta đặt chế độ flash, xoay và ống kính để chụp hình ảnh
- Sau đó, chúng ta sẽ xác định một onClickListener trên button fab, sẽ chụp ảnh và lưu nó vào bộ nhớ cục bộ.
```
private val filename = "test.png"
private val sd = Environment.getExternalStorageDirectory()
private val dest = File(sd, filename)
// Takes an images and saves it in the local storage
fab_camera.setOnClickListener {
    imageCapture?.takePicture(dest,
        object : ImageCapture.OnImageSavedListener {
            override fun onError(error: ImageCapture.UseCaseError,
                                 message: String, exc: Throwable?) {
                Log.e("Image", error.toString())
            }
            override fun onImageSaved(file: File) {
                Log.v("Image", "Successfully saved image")
            }
        })
}
```
### 6. Switching flash state
- Lúc này thì chúng ta đã có thể chụp ảnh, hãy để xem cách mà chúng ta có thể thay đổi đèn flash của máy ảnh. Đối với điều đó, chúng ta chỉ cần kiểm tra trạng thái flash hiện tại và thay đổi nó sang ngược lại.
```
// Changes the flash mode when the button is clicked
fab_flash.setOnClickListener {
    val flashMode = imageCapture?.flashMode
    if(flashMode == FlashMode.ON) imageCapture?.flashMode = FlashMode.OFF
    else imageCapture?.flashMode = FlashMode.ON
}
```
- Ở đây chúng tôi kiểm tra flashstate bằng cách lấy tham số flashMode từ cấu hình imageCapture. Sau đó chúng ta thay đổi nó sang trạng thái ngược lại.
### 7. Switching lenses
- Bây giờ, hãy tiếp tục bằng cách thêm chức năng chuyển đổi ống kính vào ứng dụng. Vì vậy, chúng ta cần lưu trạng thái lense hiện tại và thay đổi nó nếu nhấp vào button flash.
- Điều này nói dễ hơn làm vì ống kính chỉ có thể được chuyển đổi trong khi máy ảnh bị ràng buộc với vòng đời (Chúng ta sẽ liên kết máy ảnh với vòng đời trong bước tiếp theo). Đó là lý do tại sao trước tiên chúng ta cần hủy liên kết máy ảnh khỏi vòng đời và sau đó thay đổi cấu hình và liên kết lại.
```
CameraX.unbindAll()
```
- Sau đó, chúng ta có thể thay đổi trạng thái ống kính và gắn (bind) camera lại. 
```
private var lensFacing = CameraX.LensFacing.BACK
// Changes the lens direction if the button is clicked
fab_switch_camera.setOnClickListener {
    lensFacing = if (CameraX.LensFacing.FRONT == lensFacing) {
        CameraX.LensFacing.BACK
    } else {
        CameraX.LensFacing.FRONT
    }
    bindCamera()
}
```
### 8. Bind the camera to the lifecycle
- Cuối cùng, chúng ta cần liên kết máy ảnh với vòng đời của ứng dụng để chạy nó. Chúng ta có thể làm như vậy bằng cách gọi hàm bindToLifecycle () và chỉ cần chuyển activity dưới dạng vòng đời và cấu hình của chúng ta.
```
CameraX.bindToLifecycle(this as LifecycleOwner, imageCapture, preview)
```
Lưu ý: Nó sẽ cung cấp cho bạn một lỗi rằng MainActivity.kt không phải là vòng đời nếu appcompat dependency của bạn không phải là phiên bản 1.1.0 trở lên.
### 9. Complete Source Code for the MainActivity.kt
- Và đây là mã nguồn hoàn chỉnh cho MainActivity.kt 
```
package com.example.camerax

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.os.Environment
import android.util.Log
import android.view.TextureView
import androidx.camera.core.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.LifecycleOwner
import kotlinx.android.synthetic.main.activity_main.*
import java.io.File

val permissions = arrayOf(android.Manifest.permission.CAMERA, android.Manifest.permission.WRITE_EXTERNAL_STORAGE, android.Manifest.permission.READ_EXTERNAL_STORAGE)

class MainActivity : AppCompatActivity() {

    private val filename = "test.png"
    private val sd = Environment.getExternalStorageDirectory()
    private val dest = File(sd, filename)
    private var lensFacing = CameraX.LensFacing.BACK
    private var imageCapture: ImageCapture? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        bindCamera()

        // Takes an images and saves it in the local storage
        fab_camera.setOnClickListener {
            imageCapture?.takePicture(dest,
                object : ImageCapture.OnImageSavedListener {
                    override fun onError(error: ImageCapture.UseCaseError,
                                         message: String, exc: Throwable?) {
                        Log.e("Image", error.toString())
                    }
                    override fun onImageSaved(file: File) {
                        Log.v("Image", "Successfully saved image")
                    }
                })
        }

        // Changes the flash mode when the button is clicked
        fab_flash.setOnClickListener {
            val flashMode = imageCapture?.flashMode
            if(flashMode == FlashMode.ON) imageCapture?.flashMode = FlashMode.OFF
            else imageCapture?.flashMode = FlashMode.ON
        }

        // Changes the lens direction if the button is clicked
        fab_switch_camera.setOnClickListener {
            lensFacing = if (CameraX.LensFacing.FRONT == lensFacing) {
                CameraX.LensFacing.BACK
            } else {
                CameraX.LensFacing.FRONT
            }
            bindCamera()
        }
    }

    /**
     * Check if the app has all permissions
     */
    private fun hasNoPermissions(): Boolean{
        return ContextCompat.checkSelfPermission(this,
            Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED || ContextCompat.checkSelfPermission(this,
            Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED || ContextCompat.checkSelfPermission(this,
            Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED
    }

    /**
     * Request all permissions
     */
    fun requestPermission(){
        ActivityCompat.requestPermissions(this, permissions,0)
    }

    /**
     * Bind the Camera to the lifecycle
     */
    private fun bindCamera(){
        CameraX.unbindAll()

        // Preview config for the camera
        val previewConfig = PreviewConfig.Builder()
            .setLensFacing(lensFacing)
            .build()

        val preview = Preview(previewConfig)

        // The view that displays the preview
        val textureView: TextureView = findViewById(R.id.view_finder)

        // Handles the output data of the camera
        preview.setOnPreviewOutputUpdateListener { previewOutput ->
            // Displays the camera image in our preview view
            textureView.surfaceTexture = previewOutput.surfaceTexture
        }


        // Image capture config which controls the Flash and Lens
        val imageCaptureConfig = ImageCaptureConfig.Builder()
            .setTargetRotation(windowManager.defaultDisplay.rotation)
            .setLensFacing(lensFacing)
            .setFlashMode(FlashMode.ON)
            .build()

        imageCapture = ImageCapture(imageCaptureConfig)

        // Bind the camera to the lifecycle
        CameraX.bindToLifecycle(this as LifecycleOwner, imageCapture, preview)
    }

    override fun onStart() {
        super.onStart()

        // Check and request permissions
        if (hasNoPermissions()) {
            requestPermission()
        }
    }

}
```
## Conclusion 
- Như vậy, chúng ta đã đi qua phần tìm hiểu những tính năng, ưu điểm của thư viện CameraX, cách cấu hình và tạo 1 ứng dụng sử dụng Camerax có các tính năng như chụp ảnh, bật đèn flash và chuyển ống kính.
- Hy vọng rằng bài viết này đã giúp bạn hiểu những điều cơ bản về thư viện CameraX của Android và có thể sử dụng nó trong các dự án của mình.