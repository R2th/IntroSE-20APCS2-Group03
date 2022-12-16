# I. Lời mở đầu
* Trong bài viết này, mình sẽ demo xây dựng một ứng dụng hiện thực chức năng live-stream trực tiếp từ camera của device. Thư viện cho Android được mình sử dụng là [rtmp-rtsp-stream-client-java](https://github.com/pedroSG94/rtmp-rtsp-stream-client-java) - một thư viện open-source và có nhiều tính năng bá đạo mà bạn có thể tham khảo tại [đây](https://github.com/pedroSG94/rtmp-rtsp-stream-client-java#features); về phía server mình đăng ký tài khoản trial của [Wowza Streaming Cloud](https://cloud.wowza.com).

# II. Nội dung chính
## 1. Cấu hình Wowza Streaming Cloud
* Đầu tiên chúng ta sẽ tạo một acc trial và cấu hình với phương thức rtsp như hình sau

![](https://images.viblo.asia/4dd21270-5b1c-4e68-a37e-6b6681e57755.png)

![](https://images.viblo.asia/220ea424-bf98-40c1-a8a8-7674953df7a5.png)

* Chúng ta chú ý 2 giá trị Primary Server (rtsp://f41209.entrypoint.cloud.wowza.com/app-2646) và Stream name (d7ce5c25) để sử dụng cho client.
## 2. Xây dựng ứng dụng Android
* Chúng ta sẽ tạo 1 project mới và thêm jitpack maven vào build.gradle của project
```
repositories {
    ...
    maven { url 'https://jitpack.io' }
}
```
* Và thêm rtplibrary trong build.gradle của app
```
implementation 'com.github.pedroSG94.rtmp-rtsp-stream-client-java:rtplibrary:1.6.1'
```
* Cấp quyền truy cập cho app trong manifest
```
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<!--some devices need it-->
<uses-feature android:name="android.hardware.camera"/>
<uses-feature android:name="android.hardware.camera2.full"/>
<uses-feature android:name="android.hardware.camera2.autofocus"/>
```
* Layout chính của app sẽ như sau
```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent" android:layout_height="match_parent"
        tools:context=".MainActivity">
    <SurfaceView
            android:id="@+id/cameraView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintBottom_toBottomOf="parent"/>
    <Button android:id="@+id/btn_live"
            android:layout_marginBottom="8dp"
            android:layout_marginStart="8dp"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:text="@string/start_live"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toStartOf="parent"/>
    <Button android:id="@+id/btn_record"
            android:layout_width="0dp" 
            android:layout_height="wrap_content"
            android:text="@string/start_record_video"
            android:layout_marginStart="8dp"
            app:layout_constraintTop_toTopOf="@+id/btn_live"
            app:layout_constraintBottom_toBottomOf="@+id/btn_live"
            app:layout_constraintStart_toEndOf="@+id/btn_live"/>
    <Button android:id="@+id/btn_switch_camera"
            android:layout_width="0dp" 
            android:layout_height="wrap_content"
            android:text="@string/switch_camera"
            android:layout_marginStart="8dp"
            android:layout_marginEnd="8dp"
            app:layout_constraintTop_toTopOf="@+id/btn_live"
            app:layout_constraintBottom_toBottomOf="@+id/btn_live"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toEndOf="@+id/btn_record"/>
</androidx.constraintlayout.widget.ConstraintLayout>
```
* Đầu tiên chúng ta sẽ implement 2 interface là **ConnectCheckerRtsp** và **SurfaceHolder.Callback** trong activity/fragment chứa camera view. Sau đó kiểm tra và yêu cầu user cấp quyền truy cập cho app
```
private val permissions = arrayOf(
    Manifest.permission.RECORD_AUDIO,
    Manifest.permission.CAMERA,
    Manifest.permission.WRITE_EXTERNAL_STORAGE
)
```
```
private fun hasPermissions(): Boolean {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        for (permission in permissions) {
            if (PackageManager.PERMISSION_GRANTED != ActivityCompat.checkSelfPermission(this, permission)) {
                return false
            }
        }
    }
    return true
}
```
```
if (!hasPermissions()) {
    ActivityCompat.requestPermissions(this, permissions, 1)
}
```
* Chúng ta sẽ định nghĩa các giá trị constant cho app
```
companion object {
    const val URL_LIVE_STREAM = "rtsp://f41209.entrypoint.cloud.wowza.com/app-2646/"
    const val STREAM_NAME = "d7ce5c25"
    const val PREFIX_FILE_PATH = "/demo_live_stream"
    const val RETRY_COUNT = 10
}
```
* URL_LIVE_STREAM và STREAM_NAME lần lượt là thông tin Primary Server và Stream Name khi chúng ta cấu hình Wowza Streming Cloud
* Nếu muốn lưu video đang live-stream vào device thì chúng ta cần định nghĩa đường dẫn để lưu file mp4
```
filePath = File(Environment.getExternalStorageDirectory().absolutePath.plus(PREFIX_FILE_PATH))
```
* Trong hàm surfaceChanged() chúng ta sẽ gọi chế đọ preview của camera
```
rtspCamera.startPreview()
```
* Để có thể live-stream, chúng ta sẽ định nghĩa chức năng cho button btn_live
```
btn_live.setOnClickListener {
    if (rtspCamera.isStreaming) {
        btn_live.setText(R.string.start_live)
        rtspCamera.stopStream()
    } else {
        if (rtspCamera.isRecording || rtspCamera.prepareAudio() && rtspCamera.prepareVideo()) {
            btn_live.setText(R.string.stop_live)
            rtspCamera.startStream(URL_LIVE_STREAM.plus(STREAM_NAME))
        } else {
            Toast.makeText(
                this, "Error preparing stream, This device cant do it",
                Toast.LENGTH_SHORT
            ).show()
        }
    }
}
```
* Để chuyển đổi camera, chúng ta sẽ định nghĩa chức năng cho button btn_switch_camera
```
btn_switch_camera.setOnClickListener {
    try {
        rtspCamera.switchCamera()
    } catch (e: CameraOpenException) {
        Toast.makeText(this, e.message, Toast.LENGTH_SHORT).show()
    }
}
```
* Để ghi lại video khi live-stream chúng ta sẽ định nghĩa chức năng cho button btn_record
```
btn_record.setOnClickListener {
            if (!rtspCamera.isRecording) {
                try {
                    if (!filePath.exists()) {
                        filePath.mkdir()
                    }
                    currentMillis = System.currentTimeMillis().toString()
                    if (!rtspCamera.isStreaming) {
                        if (rtspCamera.prepareAudio() && rtspCamera.prepareVideo()) {
                            rtspCamera.startRecord(
                                filePath.absolutePath
                                        + "/"
                                        + currentMillis
                                        + ".mp4"
                            )
                            btn_record.setText(R.string.stop_record_video)
                            Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT)
                                .show()
                        } else {
                            Toast.makeText(
                                this,
                                "Error preparing stream, This device cant do it",
                                Toast.LENGTH_SHORT
                            ).show()
                        }
                    } else {
                        rtspCamera.startRecord(
                            (filePath.absolutePath
                                    + "/"
                                    + currentMillis
                                    + ".mp4")
                        )
                        btn_record.setText(R.string.stop_record_video)
                        Toast.makeText(this, "Recording... ", Toast.LENGTH_SHORT).show()
                    }
                } catch (e: IOException) {
                    rtspCamera.stopRecord()
                    btn_record.setText(R.string.start_record_video)
                    Toast.makeText(this, e.message, Toast.LENGTH_SHORT).show()
                }

            } else {
                rtspCamera.stopRecord()
                btn_record.setText(R.string.start_record_video)
                Toast.makeText(
                    this, ("file "
                            + currentMillis
                            + ".mp4 saved in "
                            + filePath.absolutePath), Toast.LENGTH_SHORT
                ).show()
            }
        }
```
>  Done! Và đây là thành quả {@embed: https://www.youtube.com/watch?v=56xPo58XHDU}
# III. Kết
* Hy vọng với bài viết của mình các bạn sẽ có thêm một lựa chọn khi làm việc với các ứng dụng liên quan tới nền tảng live stream. Link source code mình để ở [đây](https://github.com/nguyennh-0786/DemoLivestream). Cảm ơn các bạn đã theo dõi bài viết của mình!