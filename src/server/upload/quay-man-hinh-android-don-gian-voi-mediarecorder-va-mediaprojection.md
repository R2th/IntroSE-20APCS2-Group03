## Mở đầu
Một trong những API hữu ích được giới thiệu trong Android 5.0 là API [MediaProjection](https://developer.android.com/reference/android/media/projection/MediaProjection).  MediaProjection cung cấp cho ứng dụng khả năng record nội dung màn hình, ghi lại âm thanh hệ thống, chúng ta cũng có thể chia sẻ màn hình qua mạng. Các khả năng của MediaProjection tùy thuộc vào từng loại MediaProjection.

Còn với MediaRecorder, cái tên đã nói lên chức năng của nó, giúp chúng ta thực hiện việc ghi lại nội dung màn hình và âm thanh.

## Tạo ứng dụng quay màn hình đơn giản
### Tạo màn hình gồm 2 nút StartRecord và StopRecord :D
```xml:activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:gravity="center_horizontal"
    android:orientation="vertical"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button_start"
        android:text="Start Record"
        android:layout_gravity=""
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="100dp"/>
    <Button
        android:id="@+id/button_stop"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Stop Record"
        android:layout_marginTop="200dp"/>
</LinearLayout>
```

### Xin quyền WRITE_EXTERNAL_STORAGE và RECORD_AUDIO

Để có thể thực hiện việc ghi lại âm thanh hệ thống chúng ta cần có quyền RECORD_AUDIO.
 Và sau khi thực hiện quay màn hình, chúng ta cần lưu video quay được vào bộ nhớ, vì vậy chúng ta cần quyền WRITE_EXTERNAL_STORAGE.
 
 **Thêm 2 dòng sau vào file Manifest**
```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
```

Với 2 quyền này thì chúng ta phải xin quyền ở Runtime  nữa,  thêm đoạn sau vào MainActivity
```kotlin:MainActivity.kt
private val PERMISSION_CODE = 218
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        if (!hasPermission(permissions)) {
            requestPermission(permissions)
        }
    }

    private fun hasPermission(permissions: Array<String>): Boolean {
        for (permission in permissions) {
            if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
                return false;
            }
        }
        return true
    }

    private fun requestPermission(permissions: Array<String>) {
        ActivityCompat.requestPermissions(this, permissions, PERMISSION_CODE)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            PERMISSION_CODE ->
                if (grantResults.isNotEmpty() && grantResults[0] + grantResults[1] == PackageManager.PERMISSION_GRANTED) {
                    //permission granted
                } else {
                    //permission not granted
                }
        }
    }
```
Khi khởi động ứng dụng thì popup xin quyền truy cập file và ghi âm được hiển thị. Để cho đơn giản thì ta sẽ đồng ý cấp quyền ở bước này :D.

### Tạo lớp RecordHelper thực hiện việc quay màn hình
**Để thực hiện quay màn hình thì ta cần các đối tượng:**
* MediaRecorder
* MediaProjection
* [MediaProjectionManager](https://developer.android.com/reference/android/media/projection/MediaProjectionManager):  quản lý tạo ra một số loại MediaProjection
* [VirtualDisplay](https://developer.android.com/reference/android/hardware/display/VirtualDisplay): Virtual Displays, màn hình ảo có thể được sử dụng để ghi lại màn hình hoặc gửi qua mạng.
Android dã thêm platform  hỗ trợ cho màn hình ảo trong Hardware Composer phiên bản 1.3. Màn hình ảo này cũng tương tự như màn hình vật lý.

Đầu tiên, tạo class RecordHelper và khai báo các đối tượng
```kotlin:RecordHelper
class RecordHelper(private val activity: Activity, private val metrics: DisplayMetrics) {
     private lateinit var mediaRecorder: MediaRecorder

        private var mediaProjection: MediaProjection? = null

         var mediaProjectionManager: MediaProjectionManager =
            activity.getSystemService(Context.MEDIA_PROJECTION_SERVICE) as MediaProjectionManager

        private var virtualDisplay: VirtualDisplay? = null
 }
```

Để khởi tạo được MediaProjection, chúng ta tạo Intent từ phương thức MediaProjectionManager.createScreenCaptureIntent() và truyền Intent đó qua phương thức Acitivity.startActivityForResult() cùng với một requestCode.   Nếu requestCode trả về trong phương thức onActivityFOrResult()  bằng với requestCode đã gửi đi và resultCode = RESULT_OK thì resultCode đó và Intent trả về sẽ được dùng để khởi tạo MediaProjection
```kotlin:RecordHelper
fun startRequestRecord(requestCode: Int) {
        activity.startActivityForResult(mediaProjectionManager.createScreenCaptureIntent(), requestCode)
}
    
fun startRecord(intent: Intent?, resutCode: Int) {
        if (mediaProjection == null) {
            mediaProjection = mediaProjectionManager.getMediaProjection(resutCode, intent)
        }
        initMediaRecorder()
        virtualDisplay = getVirtualDisplay()

        mediaRecorder.start()
}
```

```kotlin:MainActivity
private val REQUEST_CODE = 101

override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val displayMetrics = DisplayMetrics()
        windowManager.defaultDisplay.getMetrics(displayMetrics)

        recordHelper = RecordHelper(this, displayMetrics)

        if (!hasPermission(permissions)) {
            requestPermission(permissions)
        }

        button_start.setOnClickListener {
            //            recordHelper.startRequestRecord(REQUEST_CODE)
            recordHelper.startRequestRecord(REQUEST_CODE)
        }
        button_stop.setOnClickListener { recordHelper.finishRecord() }
    }
 override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        when (requestCode) {
            REQUEST_CODE -> {
                recordHelper.startRecord(data, resultCode)
            }
        }
}
```
Sau khi khởi tạo MediaProjection, chúng ta khởi tạo MediaRecorder
```kotlin:RecordHelper
private fun initMediaRecorder() {
        try {
            mediaRecorder = MediaRecorder()
            mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC)
            mediaRecorder.setVideoSource(MediaRecorder.VideoSource.SURFACE)
            mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP)
            val outputFile = File(getExternalStoragePublicDirectory(DIRECTORY_DOWNLOADS), "/qqqvideo.mp4")
            mediaRecorder.setOutputFile(outputFile.absolutePath)
            val cpHigh = CamcorderProfile.get(CamcorderProfile.QUALITY_HIGH)
     
            mediaRecorder.setVideoSize(1920,1080)
            mediaRecorder.setVideoEncoder(MediaRecorder.VideoEncoder.H264)
            mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB)
            mediaRecorder.setVideoEncodingBitRate(3000000)
            mediaRecorder.setVideoFrameRate(cpHigh.videoFrameRate)
            mediaRecorder.setVideoEncodingBitRate(cpHigh.videoBitRate)

            mediaRecorder.prepare()

        } catch (e: Exception) {
            e.printStackTrace()
        }
}
```
* **setAudioResource():** Xác định nguồn âm thanh được sử dụng để ghi âm. Nếu phương thức này không được gọi, file record được  sẽ không chứa  âm thanh. Phương thức này phải được gọi trước setOutputFormat()
* **setVideoSource():** Xác định nguồn video được sử dụng để ghi. Nếu phương thức này không được gọi,  file record được sẽ không chứa video. Phương thức này phải được gọi trước setOutputFormat()
* **setOutputFormat():** Đặt định dạng file record. Gọi phương thức này sau setAudioSource() / setVideoSource() nhưng trước khi prepare ()
* **setOutputFile():** Đặt đường dẫn của  file record sẽ được tạo. Gọi phương thức này sau
setOutputFormat() nhưng trước khi prepare().
* **setVideoSize():** Xác định kích thước của video. Phải được gọi
sau setVideoSource() nhưng trước prepare().  Nếu bạn chỉ định kích thước video không được thiết bị hỗ trợ thì việc prepare() sẽ không thành công.
* **setVideoEncoder():** Đặt bộ mã hóa video sẽ được sử dụng để ghi. Nếu phương thức này không được gọi, tệp đầu ra sẽ không chứa video. Gọi phương thức  này sau
setOutputFormat () và trước khi prepare().
* **setAudioEncoder():** Đặt bộ mã hóa âm thanh sẽ được sử dụng để ghi. Nếu phương thức này không được gọi, tệp đầu ra sẽ không chứa âm thanh. Gọi phương thức  này sau
setOutputFormat () và trước khi prepare().
* **prepare():** thực hiện chuẩn bị Recorder cho việc record.

Tạo VirtualDisplay:
```kotlin:RecorderHelper
private fun getVirtualDisplay(): VirtualDisplay? = mediaProjection?.createVirtualDisplay(
        "VIRTUAL_DISPLAY_NAME",
        metrics.widthPixels,
        metrics.heightPixels,
        metrics.densityDpi,
        DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
        mediaRecorder.surface,
        null,
        null
    )
```
* **VIRTUAL_DISPLAY_NAME** : tên của màn hình ảo, không được rỗng.
* **metrics.widthPixels** :  chiều rộng màn hình ảo theo đơn vị pixel, phải lớn hơn 0
* **metrics.heightPixels** :  chiều dài màn hình ảo theo đơn vị pixel, phải lớn hơn 0
* **metrics.densityDpi** : mật đọ pixel của màn hình ảo, phải lớn hơn 0
* **mediaRecorder.surface** : bề mặt àm nội dung của màn hình ảo được render 

Sau khi nhận được Intent từ onACtivityForResult() , bắt đầu thực hiện ghi màn hình:
```kotlin:RecorderHelper
 fun startRecord(intent: Intent?, resutCode: Int) {
        if (mediaProjection == null) {
            mediaProjection = mediaProjectionManager.getMediaProjection(resutCode, intent)
        }
        initMediaRecorder()
        virtualDisplay = getVirtualDisplay()

        mediaRecorder.start()
    }
```

và dùng ghi :
```kotlin:RecorderHelper
 fun finishRecord() {
        mediaRecorder.stop()
        mediaRecorder.reset()
        virtualDisplay = null
        mediaProjection?.stop()
        mediaProjection = null
    }
```

## Kết quả:
![](https://images.viblo.asia/c4ce064c-177a-4498-9a5e-9f01b2d28d42.gif)

Do kích thước video đang đặt là 1920X1080 và đang quay trên màn hình cố độ phân giải cao hơn nên video chỉ có tí xíu này thôi :D.


Tài liệu tham khảo:

https://www.truiton.com/2015/05/capture-record-android-screen-using-mediaprojection-apis/