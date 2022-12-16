**App Startup library** cung cấp một cách đơn giản, hiệu quả để khởi tạo các thành phần khi khởi động ứng dụng.

Nó có thể được sử dụng bởi *library developers* cũng như *app developers* để sắp xếp hợp lý các trình tự khởi động và đặt thứ tự khởi tạo một cách rõ ràng.

Thay vì xác định các content providers riêng biệt cho từng component mà bạn muốn khởi tạo, App Startup cho phép bạn xác định các component initializers dùng chung một content provider. Điều này có thể cải thiện đáng kể thời gian khởi động ứng dụng.

### Vấn đề

Nếu bạn có một chút kinh nghiệm sử dụng  `Firebase/WorkManager` trong các ứng dụng Android của mình. Bạn có thể đã thấy rằng cách bạn có được instance của Firebase/WorkManager bằng cách gọi:

```kotlin
FirebaseAuth.getInstance()
WorkManager.getInstance()
```

Trong hầu hết các trường hợp để khởi tạo thư viện hoặc bất kỳ thành phần nào khác, chúng ta cần gọi một số loại phương thức kiểu như này:

```kotlin
NotificationManager.init(applicationContext)
```

Nhưng trong trường hợp khởi tạo firebase, nó không gọi bất kỳ phương thức nào để khởi tạo, nó chỉ đơn giản là get instance là được. Nếu bạn tự hỏi nó hoạt động như thế nào thì câu trả lời là `ContentProvider`.

Bạn có thể xác minh điều đó bằng cách kiểm tra file `AndroidManifest` nhất trong dự án của bạn. đây là ví dụ `provider` dùng bởi `FirebaseAuthUI`:

```xml
<provider
    android:name="com.firebase.ui.auth.data.client.AuthUiInitProvider"
    android:authorities="${applicationId}.authuiinitprovider"
    android:exported="false"
    android:initOrder="90" />
```

Khi ứng dụng khởi động, tất cả các content providers đều được khởi chạy và từ đó trở đi, chúng ta có thể sử dụng Firebase bằng cách sử dụng `FirebaseAuth.getInstance()`.

Nhưng cách tiếp cận này có một số hạn chế. Giả sử nếu mà có  `n components` trong ứng dụng của mình tuân theo cách tiếp cận ContentProvider để khởi chạy thì đó là n ContentProviders dẫn đến làm chậm quá trình khởi động ứng dụng.

### Giải pháp

AndroidTeam đã giới thiệu thư viện mới dưới của AndroidJetpack được gọi là **App StartUp**. Chúng ta sẽ thấy cách thư viện này làm cho cuộc sống dễ dàng hơn bao giờ hết khi nói đến việc khởi tạo các components khi khởi động ứng dụng :)

- Để sử dụng Jetpack Startup trong library hoặc app, **cần thêm nó vào Gradle file:**

```kotlin
dependencies {
    implementation "androidx.startup:startup-runtime:1.0.0"
}
```

**Có 2 cách tiếp cận để sử dụng thư viện này.**

1. Khởi tạo bất kỳ thành phần nào khi bắt đầu ứng dụng
2. Lazy/ hởi tạo thủ công

### Implement component initializers

Đầu tiên, bạn **cần phải implement  `Initializer<T> interface`** , nó có 2 methods:

- Method `create()` , trong đó chứa tất cả các hoạt động cần thiết để khởi tạo component và trả về một instance của `T`. Ở đây `T` tham chiếu đến `type of component` mà bạn muốn khởi tạo.
- Method `dependencies()` , trả về danh sách các objects `Initializer<T>` khác mà trình khởi tạo phụ thuộc vào. Bạn có thể sử dụng method này để kiểm soát thứ tự ứng dụng chạy trình khởi động khi khởi động.

- Giả sử  ta muốn khởi chạy WorkManager khi khởi động ứng dụng:
    ```kotlin
    // Initializes WorkManager.
    class WorkManagerInitializer : Initializer<WorkManager> {
    
        override fun create(context: Context): WorkManager {
            val configuration = Configuration.Builder().build()
            WorkManager.initialize(context, configuration)
            return WorkManager.getInstance(context)
        }
        
        override fun dependencies(): List<Class<out Initializer<*>>> {
            // No dependencies on other libraries.
            return emptyList()
        }
    }
    ```
    >  Trường hợp này phương thức trả về một empty list vì nó không phụ thuộc vào bất kỳ thư viện nào khác.

- Giả sử rằng ứng dụng của bạn cũng phụ thuộc vào một thư viện có tên là ExampleLogger, đến lượt nó lại phụ thuộc vào WorkManager. Sự phụ thuộc này có nghĩa là bạn cần đảm bảo rằng App Startup khởi tạo WorkManager trước.

    ```kotlin
    // Initializes ExampleLogger.
    class ExampleLoggerInitializer : Initializer<ExampleLogger> {

        override fun create(context: Context): ExampleLogger {
            // WorkManager.getInstance() is non-null only after
            // WorkManager is initialized.
            return ExampleLogger(WorkManager.getInstance(context))
        }

        override fun dependencies(): List<Class<out Initializer<*>>> {
            // Defines a dependency on WorkManagerInitializer so it can be
            // initialized after WorkManager is initialized.
            return listOf(WorkManagerInitializer::class.java)
        }
    }
    ```

Tiếp theo, chúng ta **cần thêm provider entries vào file AndroidManifest**.
App Startup bao gồm một content provider đặc biệt có tên là InitializationProvider được sử dụng để discover và call các component initializers của bạn. Điều này có nghĩa là để App Startup có thể phát hiện ra component initializers, bạn phải đáp ứng một trong các điều kiện dưới:
- Component initializer có một  `<meta-data>` trong mục  `InitializationProvider`  ở manifest.
- Component initializer được liệt kê trong phương thức `dependencies()` từ một initializer đã được discovered.

```xml
<provider
    android:name="androidx.startup.InitializationProvider"
    android:authorities="${applicationId}.androidx-startup"
    android:exported="false"
    tools:node="merge">
    <!-- This entry makes ExampleLoggerInitializer discoverable. -->
    <meta-data  android:name="com.example.ExampleLoggerInitializer"
          android:value="androidx.startup" />
</provider>
```

### Lazy/ khởi tạo thủ công

Thông thường khi bạn sử dụng **App Startup**, object  `InitializationProvider` sử dụng một entity có tên là `AppInitializer` để tự động discover và chạy các component initializers khi khởi động ứng dụng. Tuy nhiên, bạn cũng có thể sử dụng `AppInitializer` trực tiếp nếu muốn khởi tạo các components theo cách thủ công. Đây được gọi là ***lazy initialization\*** và nó có thể giúp giảm thiểu chi phí khởi động.

- Trước tiên tắt tính năng khởi tạo tự động cho bất kỳ components nào mà bạn muốn khởi tạo theo cách thủ công. VD tắt của ExampleLogger:

```xml
<provider
    android:name="androidx.startup.InitializationProvider"
    android:authorities="${applicationId}.androidx-startup"
    android:exported="false"
    tools:node="merge">
    <meta-data android:name="com.example.ExampleLoggerInitializer"
              tools:node="remove" />
</provider>
```

- Để tắt tất cả khởi tạo tự động, xoá tất cả entries của `InitializationProvider`ở trong manifest:

```xml
<provider
    android:name="androidx.startup.InitializationProvider"
    android:authorities="${applicationId}.androidx-startup"
    tools:node="remove" />
```

- Để khởi tạo theo khách thủ công. VD:  khởi tạo ExampleLogger:

```kotlin
AppInitializer.getInstance(context).initializeComponent(ExampleLoggerInitializer::class.java)
```

### Reference

- https://developer.android.com/topic/libraries/app-startup
- https://medium.com/nerd-for-tech/boost-app-start-up-time-with-jetpack-startup-library-f1d61bdb640b