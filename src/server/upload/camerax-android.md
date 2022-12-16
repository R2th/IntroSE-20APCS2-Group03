## Overview

CameraX là một thư viện hỗ trợ Jetpack, được xây dựng để giúp bạn phát triển ứng dụng máy ảnh dễ dàng hơn. Nó cung cấp một bề mặt API nhất quán và dễ sử dụng, hoạt động trên hầu hết các thiết bị Android, có khả năng tương thích ngược với Android 5.0 (API cấp 21).

Mặc dù CameraX tận dụng các khả năng của camera2, nhưng nó sử dụng một cách tiếp cận đơn giản hơn, nhận biết lifecycle và dựa trên các trường hợp sử dụng. Nó cũng giải quyết các vấn đề về khả năng tương thích của thiết bị cho bạn để bạn không phải code dành riêng cho thiết bị vào code base của mình. Các tính năng này làm giảm số lượng code bạn cần viết khi thêm tính năng camera vào ứng dụng của mình.

Cuối cùng, CameraX cho phép các nhà phát triển tận dụng những trải nghiệm và tính năng máy ảnh tương tự mà các ứng dụng máy ảnh cài đặt sẵn cung cấp, chỉ với hai dòng code. Tiện ích mở rộng CameraX là tiện ích bổ sung tùy chọn cho phép bạn thêm hiệu ứng trên các thiết bị được hỗ trợ. Các hiệu ứng này bao gồm Chân dung, HDR, Ban đêm và Làm đẹp.

## CameraX architecture

### Structure

Các nhà phát triển sử dụng CameraX để giao tiếp với máy ảnh của thiết bị thông qua một phần trừu tượng gọi là ca sử dụng. Các trường hợp sử dụng sau hiện có sẵn:

* **Preview**: chấp nhận một bề mặt để hiển thị preview, chẳng hạn như **PreviewView**.
* **Image analysis**:  cung cấp bộ đệm có thể truy cập CPU để phân tích, chẳng hạn như cho machine learning.
* **Image capture**: chụp và lưu ảnh.

Các ca sử dụng có thể được kết hợp và hoạt động đồng thời. Ví dụ: một ứng dụng có thể cho phép người dùng xem hình ảnh mà máy ảnh nhìn thấy bằng trường hợp sử dụng Preview, có trường hợp sử dụng Image analysis để xác định xem những người trong ảnh có đang mỉm cười hay không và bao gồm trường hợp sử dụng Image capture để chụp ảnh một khi họ đang có.

### API model

Để làm việc với thư viện, bạn chỉ định những điều sau:
* Trường hợp sử dụng mong muốn với các tùy chọn cấu hình.
* Làm gì với dữ liệu đầu ra bằng cách đính kèm listener.
* Luồng dự kiến, chẳng hạn như khi nào bật máy ảnh và khi nào produce data, bằng cách ràng buộc trường hợp sử dụng [Android Architecture Lifecycles](https://developer.android.com/topic/libraries/architecture).

Bạn cấu hình các ca sử dụng bằng phương thức **set()** và hoàn thiện chúng bằng phương thức **build()**. Mỗi object ca sử dụng cung cấp một tập hợp các API dành riêng cho ca sử dụng. Ví dụ, trường hợp sử dụng chụp ảnh gọi phương thức **takePicture()**.

Thay vì một ứng dụng đặt các lệnh gọi phương thức bắt đầu và dừng cụ thể trong **onResume()** và **onPause()**, ứng dụng chỉ định lifecycle để liên kết với máy ảnh, bằng cách sử dụng [cameraProvider.bindToLifecycle()](https://developer.android.com/reference/androidx/camera/lifecycle/ProcessCameraProvider#bindToLifecycle(androidx.lifecycle.LifecycleOwner,%20androidx.camera.core.CameraSelector,%20androidx.camera.core.UseCase...)). Sau đó, lifecycle đó sẽ thông báo cho CameraX khi nào cần định cấu hình phiên chụp máy ảnh và đảm bảo trạng thái máy ảnh thay đổi một cách thích hợp để phù hợp với quá trình chuyển đổi lifecycle.

### API model example

Trường hợp sử dụng preview tương tác với [Surface](https://developer.android.com/reference/android/view/Surface) để hiển thị. Các ứng dụng tạo ca sử dụng với các tùy chọn cấu hình bằng cách sử dụng code sau:

```kotlin
val preview = Preview.Builder().build()
val viewFinder: PreviewView = findViewById(R.id.previewView)

// The use case is bound to an Android Lifecycle with the following code
val camera = cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, preview)

// PreviewView creates a surface provider and is the recommended provider
preview.setSurfaceProvider(viewFinder.getSurfaceProvider())
```

## CameraX Lifecycles

CameraX observes lifecycle để xác định khi nào mở máy ảnh, khi nào tạo phiên chụp và khi nào nên dừng và tắt máy. Các API ca sử dụng cung cấp các lệnh gọi phương thức và callbacks để theo dõi tiến trình.

Như đã giải thích trong [Kết hợp các trường hợp sử dụng](https://developer.android.com/training/camerax/architecture#combine-use-cases), bạn có thể liên kết một số hỗn hợp các trường hợp sử dụng vào một lifecycle duy nhất. Khi ứng dụng của bạn cần hỗ trợ các trường hợp sử dụng không thể kết hợp, bạn có thể thực hiện một trong những cách sau:

* Nhóm các trường hợp sử dụng tương thích lại với nhau thành nhiều [fragments](https://developer.android.com/reference/androidx/fragment/app/Fragment) và sau đó chuyển đổi giữa các fragments.
* Tạocustom lifecycle component và sử dụng nó để kiểm soát lifecycle máy ảnh theo cách thủ công.

Nếu bạn tách  Lifecycle owners của các trường hợp sử dụng máy ảnh và chế độ xem của mình (ví dụ: nếu bạn sử dụng custom lifecycle hoặc [retain fragment](https://developer.android.com/reference/android/app/Fragment#setRetainInstance(boolean))), thì bạn phải đảm bảo rằng tất cả các trường hợp sử dụng đều không bị ràng buộc khỏi CameraX bằng cách sử dụng [ProcessCameraProvider.unbindAll()](https://developer.android.com/reference/androidx/camera/lifecycle/ProcessCameraProvider#unbindAll()) hoặc bằng cách hủy liên kết từng trường hợp sử dụng riêng lẻ. Ngoài ra, khi bạn liên kết các trường hợp sử dụng với Lifecycle, bạn có thể cho phép CameraX quản lý việc mở và đóng phiên chụp và hủy liên kết các trường hợp sử dụng.

Nếu tất cả chức năng máy ảnh của bạn tương ứng với vòng đời của một thành phần nhận biết lifecycle  đơn lẻ chẳng hạn như [AppCompatActivity](https://developer.android.com/reference/androidx/appcompat/app/AppCompatActivity) hoặc một **AppCompat** fragment, thì việc sử dụng lifecycle  của thành phần đó khi liên kết tất cả các trường hợp sử dụng mong muốn sẽ đảm bảo rằng chức năng máy ảnh sẵn sàng khi Thành phần nhận biết lifecycle đang hoạt động và được xử lý an toàn, không tiêu tốn bất kỳ tài nguyên nào và ngược lại.

## Custom LifecycleOwners

Đối với các trường hợp nâng cao, bạn có thể tạo [LifecycleOwner](https://developer.android.com/reference/androidx/lifecycle/LifecycleOwner) tùy chỉnh để cho phép ứng dụng của bạn kiểm soát rõ ràng vòng đời phiên CameraX thay vì buộc nó với một Android **LifecycleOwner** tiêu chuẩn.

Đoạn code sau đây cho thấy cách tạo custom LifecycleOwner đơn giản:

```kotlin
class CustomLifecycle : LifecycleOwner {
    private val lifecycleRegistry: LifecycleRegistry

    init {
        lifecycleRegistry = LifecycleRegistry(this);
        lifecycleRegistry.markState(Lifecycle.State.CREATED)
    }
    ...
    fun doOnResume() {
        lifecycleRegistry.markState(State.RESUMED)
    }
    ...
    override fun getLifecycle(): Lifecycle {
        return lifecycleRegistry
    }
}
```

Sử dụng **LifecycleOwner** này, ứng dụng của bạn có thể đặt các chuyển đổi trạng thái tại các điểm mong muốn trong code của ứng dụng. Để biết thêm về cách triển khai chức năng này trong ứng dụng của bạn, hãy xem phần [Triển khai một custom LifecycleOwner](https://developer.android.com/topic/libraries/architecture/lifecycle#implementing-lco).

## Các trường hợp sử dụng đồng thời

Các ca sử dụng có thể chạy đồng thời. Mặc dù các ca sử dụng có thể được liên kết tuần tự với một lifecycle, nhưng tốt hơn là liên kết tất cả các ca sử dụng bằng một lệnh gọi đến **CameraProcessProvider.bindToLifecycle()**. Để biết thêm thông tin về các phương pháp hay nhất để thay đổi cấu hình, hãy xem [Handle configuration changes](https://developer.android.com/guide/topics/resources/runtime-changes).

Trong code sau, ứng dụng chỉ định hai trường hợp sử dụng sẽ được tạo và chạy đồng thời. Nó cũng chỉ định lifecycle để sử dụng cho cả hai trường hợp sử dụng, để cả hai bắt đầu và dừng theo lifecycle.

```kotlin
private lateinit var imageCapture: ImageCapture

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

    cameraProviderFuture.addListener(Runnable {
        // Camera provider is now guaranteed to be available
        val cameraProvider = cameraProviderFuture.get()

        // Set up the preview use case to display camera preview.
        val preview = Preview.Builder().build()

        // Set up the capture use case to allow users to take photos.
        imageCapture = ImageCapture.Builder()
                .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
                .build()

        // Choose the camera by requiring a lens facing
        val cameraSelector = CameraSelector.Builder()
                .requireLensFacing(CameraSelector.LENS_FACING_FRONT)
                .build()

        // Attach use cases to the camera with the same lifecycle owner
        val camera = cameraProvider.bindToLifecycle(
                this as LifecycleOwner, cameraSelector, preview, imageCapture)

        // Connect the preview use case to the previewView
        preview.setSurfaceProvider(
                previewView.getSurfaceProvider())
    }, ContextCompat.getMainExecutor(this))
}
```

Các kết hợp cấu hình sau được hỗ trợ:

![image.png](https://images.viblo.asia/475463b3-16f6-41ab-9415-f520480eb292.png)

Khi các tiện ích mở rộng được bật, chỉ **ImageCapture** và **Preview** được đảm bảo. Tùy thuộc vào việc triển khai OEM, cũng có thể không sử dụng **ImageAnalysis**.
**ImageCapture** không tự hoạt động, mặc dù **Preview** và **ImageAnalysis** có.

## Permissions

Ứng dụng của bạn sẽ cần quyền [CAMERA](https://developer.android.com/reference/android/Manifest.permission#CAMERA). Để lưu hình ảnh vào tệp, nó cũng sẽ yêu cầu quyền [WRITE_EXTERNAL_STORAGE](https://developer.android.com/reference/android/Manifest.permission#WRITE_EXTERNAL_STORAGE), ngoại trừ trên các thiết bị chạy Android 10 trở lên.
Để biết thêm thông tin về cách định cấu hình quyền cho ứng dụng của bạn, hãy đọc [Yêu cầu quyền ứng dụng](https://developer.android.com/training/permissions/requesting).

## Requirements

CameraX có các yêu cầu phiên bản tối thiểu sau:
* Android API level 21
* Android Architecture Components 1.1.1

Đối với các hoạt động nhận biết vòng đời, hãy sử dụng [FragmentActivity](https://developer.android.com/reference/androidx/fragment/app/FragmentActivity) hoặc [AppCompatActivity](https://developer.android.com/reference/androidx/appcompat/app/AppCompatActivity).

## Declare dependencies

Để thêm dependency CameraX, bạn phải thêm [Google Maven repository](https://developer.android.com/studio/build/dependencies#google-maven) vào project của mình.
Mở file **build.gradle** project và thêm kho lưu trữ **google()** như sau:

```kotlin
allprojects {
    repositories {
        google()
        jcenter()
    }
}
```

Thêm phần sau vào cuối Android:

```kotlin
android {
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    // For Kotlin projects
    kotlinOptions {
        jvmTarget = "1.8"
    }
}
```

Thêm phần sau vào file **build.gradle** của mỗi modukle cho app:

```kotlin
dependencies {
    // CameraX core library using the camera2 implementation
    val camerax_version = "1.0.0"
    // The following line is optional, as the core library is included indirectly by camera-camera2
    implementation("androidx.camera:camera-core:${camerax_version}")
    implementation("androidx.camera:camera-camera2:${camerax_version}")
    // If you want to additionally use the CameraX Lifecycle library
    implementation("androidx.camera:camera-lifecycle:${camerax_version}")
    // If you want to additionally use the CameraX View class
    implementation("androidx.camera:camera-view:1.0.0-alpha26")
    // If you want to additionally use the CameraX Extensions library
    implementation("androidx.camera:camera-extensions:1.0.0-alpha26")
}
```

Phần giới thiệu CameraX đến đây là hết. Cảm ơn mọi người đã đọc bài của mình :D