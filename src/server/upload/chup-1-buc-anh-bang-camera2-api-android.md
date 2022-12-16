# Tổng quan
Trong quá trình làm việc với Android, chắc hẳn không nhiều Developer đã thực hiện lập trình với Camera. Giờ đây, với cuộc chạy đua về camera giữa các ông lớn trong làng di động, chắc hẳn xây dựng những ứng dụng tận dụng được sức mạnh phần cứng này sẽ giúp ta làm được rất nhiều thứ hay ho.
Những chức năng cơ bản nhất mà 1 Dev có thể nghĩ ra với camera Smartphone có thể kể đến như quét mã QR, hay đơn giản hơn là chụp 1 bức ảnh rồi xử lý thông qua các thư viện. Trong bài viết này, mình và các bạn sẽ cùng xây dựng 1 ứng dụng Android cơ bản có thể chụp 1 bức ảnh và xem lại bức ảnh đó. Kotlin là ngôn ngữ sử dụng trong ví dụ này.
Ta sẽ sử dụng API camera mới nhất của Android là Camera2, và để cho đơn giản, mình sẽ bỏ qua bước tạo và thiết lập Project.
# Các bước thực hiện
## Cấp quyền và xin quyền

Để sử dụng Camera, ta cần thêm quyền truy cập vào file Manifest.xml bằng thẻ `<uses-permission>` như sau:

`<uses-permission android:name="android.permission.CAMERA"/>`

Sau đó, ta thêm 1 function kiểm tra và request quyền Camera trong MainActivity như sau:
```
private fun requestCameraPermission() {
        if (ActivityCompat.checkSelfPermission(
                this,
                CAMERA
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            //100 là request code, có thể là 1 số nguyên bất kỳ
            ActivityCompat.requestPermissions(
                this, arrayOf(CAMERA), 100
            )
        }
    }
```

## Tạo Layout UI

Bước tiếp theo là tạo 1 layout, ở đây layout của mình gồm 1 TextureView để hiển thị camera, 1 button để chụp và 1 ImageView để hiển thị ảnh vừa chụp. Layout XML của mình sẽ trông như sau:

```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextureView
        android:id="@+id/textureView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginBottom="24dp"
        app:layout_constraintBottom_toTopOf="@id/imageView"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:layout_marginBottom="24dp"
        android:scaleType="centerCrop"
        android:src="@mipmap/ic_launcher"
        app:layout_constraintBottom_toTopOf="@id/buttonCapture"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <Button
        android:id="@+id/buttonCapture"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="24dp"
        android:text="Capture"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

Sau khi build, UI sẽ trông như sau:

![](https://images.viblo.asia/0d668be6-56aa-46a6-9433-c3f0cdc9e6e6.jpg)


## Tạo Camera Device và Manager

Tiếp tục với MainActivity.kt

Trước tiên, ta tạo các biến sau:

```
    private lateinit var cameraId: String
    private lateinit var cameraHandler: Handler
    private lateinit var handlerThread: HandlerThread
    private lateinit var captureRequest: CaptureRequest.Builder
    private lateinit var cameraDevice: CameraDevice
    private lateinit var cameraCaptureSession: CameraCaptureSession
```

Tạo hàm khởi tạo CameraManager:

```
private fun prepareCamera() {
        val cameraManager = getSystemService(Context.CAMERA_SERVICE) as CameraManager
        cameraId = cameraManager.cameraIdList[0]
        requestCameraPermission()
        if (ActivityCompat.checkSelfPermission(this, CAMERA) == PackageManager.PERMISSION_GRANTED) {
            cameraManager.openCamera(cameraId, stateCallback, null)
        }
    }
```

Ta cần 1 class stateCallback, tạo 1 class kế thừa CameraStateCallback, ta viết như sau:

```
class CameraStateCallback(private val startCameraPreview: (cameraDevice: CameraDevice) -> Unit) :
    CameraDevice.StateCallback() {

    override fun onDisconnected(camera: CameraDevice) = camera.close()
    override fun onError(camera: CameraDevice, error: Int) = camera.close()
    override fun onOpened(camera: CameraDevice) = startCameraPreview(camera)
}
```

Dùng 1 lambda làm tham số hàm để sử dụng về sau.

Tạo biến stateCallbak trong MainActivity:

```
private val stateCallback =
        CameraStateCallback { cameraDevice -> startCameraPreview(cameraDevice) }
```

Tạo tiếp hàm startCameraPreview() :

```
private fun startCameraPreview(cameraDevice: CameraDevice) {
        this.cameraDevice = cameraDevice
        val surfaceTexture = textureView.surfaceTexture
        val surface = Surface(surfaceTexture)
        captureRequest = cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW)
        captureRequest.addTarget(surface)
        cameraDevice.createCaptureSession(listOf(surface), captureStateCallback, null)
    }
```

Ta cần tiếp 1 captureStateCallBack, tạo 1 class kế thừa  CameraCaptureSession.StateCallback như sau:

```
class CaptureStateCallback(private val callback: (cameraSession: CameraCaptureSession) -> Unit) :
    CameraCaptureSession.StateCallback() {

    override fun onConfigureFailed(session: CameraCaptureSession) {}
    override fun onConfigured(session: CameraCaptureSession) = callback(session)
}
```

Ta tiếp tục dùng lambda để truyền hàm về sau.

Khởi tạo biến captureStateCallback:

```
private val captureStateCallback =
        CaptureStateCallback { cameraSession -> updatePreview(cameraSession) }
```

Khi đã cấu hình xong, ta cần update camera preview liên tục lên TextureView, tạo hàm updatePreview như sau:

```
private fun updatePreview(session: CameraCaptureSession) {
        captureRequest.set(CaptureRequest.CONTROL_MODE, CameraMetadata.CONTROL_MODE_AUTO)
        session.setRepeatingRequest(captureRequest.build(), null, cameraHandler)
        cameraCaptureSession = session
    }
```

Sau đó, ta implement interface TextureView.SurfaceTextureListener cho MainActivity và override các method cần thiết, ở đây ta chỉ quan tâm hàm onSurfaceTextureAvailable.

Ta gọi đến hàm prepareCamera() trong hàm onSurfaceTextureAvailable như sau:

```
override fun onSurfaceTextureAvailable(surface: SurfaceTexture?, width: Int, height: Int) {
        prepareCamera()
    }
```

## Tạo Thread để chạy Camera

Để handle Camera, ta cần tạo 1 thread và handler, tạo 1 hàm startCameraThread như sau:

```
private fun startCameraThread() {
        handlerThread = HandlerThread("THREAD_NAME")
        handlerThread.start()
        cameraHandler = Handler(handlerThread.looper)
    }
```

Cuối cùng, ta thêm code trong 2 callback của MainActivity onCreate và onResume như sau:

```
override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        textureView.surfaceTextureListener = this
    }

    override fun onResume() {
        super.onResume()
        startCameraThread()
    }
```

Build và chạy ứng dụng, ta sẽ được kết quả như hình dưới. Vậy là đã được 80% quá trình. Việc bây giờ là thực hiện chụp và hiển thị ảnh chụp lên imageView.

![](https://images.viblo.asia/655deb0e-646a-4300-9caa-e2f98343c6fa.jpg)


## Chụp và hiển thị ảnh chụp

Tạo 1 hàm captureImage() và thêm vào đoạn code sau:
        
        val imageReader = ImageReader.newInstance(400, 400, ImageFormat.JPEG, 1)
        val outputSurfaces =
        mutableListOf<Surface>(imageReader.surface)

Ta dùng imageReader để nhận dữ liệu từ textureView, ở đây mình ví dụ chụp ảnh với kích thước 400px*400px

Tạo captureRequest bằng cách thêm đoạn code sau:

```
val captureRequest =
            cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_STILL_CAPTURE)
        captureRequest.addTarget(imageReader.surface)
        captureRequest.set(CaptureRequest.CONTROL_MODE, CameraMetadata.CONTROL_MODE_AUTO)
```

Ta thêm 2 class ImageAvailableListener.kt và CameraCaptureListener.kt có nội dung lần lượt như sau:

```
ImageAvailableListener.kt

class ImageAvailableListener(private val getOutputImage: (reader: ImageReader) -> Unit) :
    ImageReader.OnImageAvailableListener {

    override fun onImageAvailable(reader: ImageReader?) = getOutputImage(reader!!)
}
```

```
CameraCaptureListener.kt

class CameraCaptureListener : CameraCaptureSession.CaptureCallback()
```

Thêm vào hàm captureImage đoạn code khởi tạo 2 class này, ta được hàm captureImage hoàn chỉnh như sau:

```
private fun captureImage() {
    val imageReader = ImageReader.newInstance(400, 400, ImageFormat.JPEG, 1)
    val outputSurfaces =
        mutableListOf<Surface>(imageReader.surface)
    val captureRequest =
        cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_STILL_CAPTURE)
    captureRequest.addTarget(imageReader.surface)
    captureRequest.set(CaptureRequest.CONTROL_MODE, CameraMetadata.CONTROL_MODE_AUTO)
    val imageAvailableListener = ImageAvailableListener { reader ->
        //
    }
    imageReader.setOnImageAvailableListener(imageAvailableListener, null)
    cameraDevice.createCaptureSession(
        outputSurfaces,
        CaptureStateCallback { cameraSession ->
            cameraSession.capture(
                captureRequest.build(),
                CameraCaptureListener(),
                cameraHandler
            )
        },
        cameraHandler
    )
}
```

Ta set sự kiện click cho buttonCapture và gọi đến hàm này :

`buttonCapture.setOnClickListener { captureImage() }`

Nếu bây giờ build và chạy thử, khi nhấn chụp, màn hình preview camera sẽ tạm dừng, nhưng sẽ không có gì xảy ra tiếp theo. Điều đó có nghĩa là ứng dụng đã chụp thành công và camera preview tạm dừng. Việc cuối cùng ta cần làm là hiển thị output ra imageView, và tiếp tục chạy camera preview để chụp các tấm khác. 

Ta tạo hàm chuyển output thành Bitmap để hiển thị lên imageView, do đầu ra của imageAvailableListener là 1 Image:

```
private fun displayImage(outputImage: Image) {
        val buffer: ByteBuffer = outputImage.planes[0].buffer
        val bytes = ByteArray(buffer.capacity())
        buffer.position(0)
        buffer.get(bytes)
        val bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.size, null)
        imageView.setImageBitmap(bitmap)
        imageView.rotation = 90f
    }
```

Do mặc định ảnh chụp ra sẽ có orientation theo chiều ngang, nên ta cần xoay ảnh lại hoặc config cho capture session, phần này các bạn có thể tìm hiểu thêm, trong phạm vi ví dụ, để cho dễ hiểu, mình đơn giản là xoay imageView 90 độ để hiển thị đúng chiều.

Cuối cùng, ta thêm đoạn code này trong param của imageAvailableListener tại hàm captureImage():

```
displayImage(reader.acquireLatestImage())
            startCameraPreview(cameraDevice)
```

Build và thưởng thức thành quả, ta sẽ thu được ứng dụng có khả năng chụp và hiển thị ảnh như hình dưới.

![](https://images.viblo.asia/8eeba256-1bc6-4770-993e-91ae2cb0f273.gif)

Đây là repo chứa toàn bộ code của ứng dụng, các bạn có thể clone về sử dụng và mở rộng:

https://github.com/phuonganhtuan/camera_demo

# Kết luận

Thật tuyệt đúng không?^^. Tuy Code có vẻ khác dài và khó hiểu, tuy nhiên chỉ cần làm quen 1 thời gian ngắn, bạn sẽ làm chủ được Camera2 và các API nó cung cấp. Ví dụ này mình chỉ đơn giản xây dựng từng bước để chụp 1 bức ảnh, mình sẽ để phần giải thích cho các bạn tự tìm hiểu, vì nó sẽ rất dài và cần thời gian nghiền ngẫm. Chúc các bạn thành công với Camera2.

Nguồn tham khảo: https://developer.android.com/reference/android/hardware/camera2/package-summary