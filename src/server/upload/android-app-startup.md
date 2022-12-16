Gần đây Jetpack có giới thiệu 1 thư viện mới là **[AndroidX App Startup](https://developer.android.com/topic/libraries/app-startup)** sử dụng để khởi tạo các thành phần khi khởi động ứng dụng 1 cách đơn giản và hiệu quả. Bài viết này chúng ta sẽ cùng nhau tìm hiểu về bộ thư viện này.
# 1. Tại sao sử dụng AndroidX App Startupp
Thông thường, trong 1 ứng dụng Android, có thể sẽ sử dụng 1 số thư viện chạy các logic khởi tạo khi khởi động ứng dụng. Ví dụ như WorkManager và Lifecycle có khởi tạo khi ứng dụng được chạy. Người dùng luôn mong muốn việc khởi tạo các thành phần này nhanh nhất có thể, nhưng đôi khi việc có nhiều ContentProvider được khởi chạy có thể sẽ làm chậm thời gian khởi tạo của ứng dụng đi khiến cho trải nghiệm người dùng sẽ không được tốt. Do đó App Startup ra đời nhằm khắc phục tình trạng trên bằng cách thay vì khai báo các ContentProvider riêng lẻ cho các thành phần riêng lẻ khi khởi tạo thì App Startup cho phép bạn định nghĩa một single ContentProvider chung cho tất cả các thành phần. Điều đó sẽ cải thiện đáng kể thời gian khởi động ứng dụng.
# 2. Sử dụng như thế nào
Để sử dụng App Startup trong ứng dụng, thêm đoạn setting sau vào file gradle:
```java
dependencies {
    implementation "androidx.startup:startup-runtime:1.0.0-alpha01"
}
```
![](https://images.viblo.asia/39f49894-e466-4882-88e6-71f800afb36e.png)

![](https://images.viblo.asia/0af3470c-301b-4e6e-8958-167e56f940a4.png)

## 2.1. Khởi tạo

Tạo class implement **Initializer**

```java
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
Ví dụ ứng dụng phụ thuộc WorkManager và cần khởi tạo để chạy ứng dụng. Khai báo 1 class WorkManagerInitializer implement **Initializer**
* method **create**(), chứa tất cả công việc cần thiết để khởi tạo thành phần và return 1 instance T
* method **dependencies**() return 1 list các Initializer khác mà initializer hiện tại phụ thuộc. Sử dụng method này để control thứ tự khởi tạo của các thành phần khi ứng dụng khởi chạy

dependencies() return 1 list rỗng vì WorkManager không phụ thuộc thư viện nào khác.

Ví dụ có 1 thư viện khác là ExampleLogger, nó phụ thuộc vào WorkManager. Tức là bạn cần khởi tạo WorkManager trước, rồi mới khởi tạo ExampleLogger.
```java
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

## 2.2. Set up manifest entries 

App Startup có 1 content provider là **InitializationProvider** sử dụng để khai báo trong AndroidManifest thành phần initializer. Bạn cần khai báo initializer trong cặp thẻ **meta-data** trong entry InitializationProvider. Sau đó App Startup sẽ gọi đến method dependencies() và lấy các thành phần trong đó để khởi tạo.
```java
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

Bạn không cần thêm cặp thẻ meta-data cho WorkManagerInitializer vì WorkManagerInitializer là 1 dependency của ExampleLoggerInitializer. Tức là khi khởi tạo ExampleLoggerInitializer thì WorkManagerInitializer cũng đã được khởi tạo rồi.

Thuộc tính **tools: node = "merge"** đảm bảo rằng công cụ sáp nhập manifest giải quyết các conflict 1 cách đúng đắn.

Run lint check

Thư viện App Startup bao gồm một tập hợp các quy tắc lint mà bạn có thể sử dụng để kiểm tra xem bạn đã xác định chính xác các công cụ khởi tạo thành phần của mình chưa. Bạn có thể thực hiện các kiểm tra lint này bằng cách chạy **./gradlew: app: lintDebug** từ command line.

## 2.3. Tự chạy thành phần khởi tạo 
Thông thường khi bạn sử dụng App Startup, đối tượng InitializationProvider sử dụng một thực thể có tên là AppInitializer để tự động chạy các thành phần khởi tạo khi khởi động ứng dụng. Tuy nhiên, bạn cũng có thể sử dụng AppInitializer trực tiếp để khởi tạo thủ công các thành phần mà ứng dụng của bạn không cần khi khởi động. Điều này được gọi là *lazy initialization* và nó có thể giúp giảm thiểu việc khởi động.

Trước tiên, bạn phải tắt khởi tạo tự động cho bất kỳ thành phần nào bạn muốn khởi tạo thủ công.

### 2.3.1. Tắt khởi tạo tự động với 1 thành phần độc lập 

```java
<provider
    android:name="androidx.startup.InitializationProvider"
    android:authorities="${applicationId}.androidx-startup"
    android:exported="false"
    tools:node="merge">
    <meta-data android:name="com.example.ExampleLoggerInitializer"
              tools:node="remove" />
</provider>
```

Sử dụng **tools: node = "remove"**

Lưu ý: khi sử dụng tắt tự động khởi tạo thì cũng sẽ tắt khởi tạo tự động cho các thành phần phụ thuộc

### 2.3.2. Tắt khởi tạo tự động cho tất cả các thành phần

```java
<provider
    android:name="androidx.startup.InitializationProvider"
    android:authorities="${applicationId}.androidx-startup"
    tools:node="remove" />
```

Nếu khởi tạo tự động bị vô hiệu hóa cho một thành phần, bạn có thể sử dụng AppInitializer để tự khởi tạo thành phần đó và các phụ thuộc của nó.
```java
AppInitializer.getInstance(context)
    .initializeComponent(ExampleLoggerInitializer::class.java)
```

Tham khảo

https://developer.android.com/topic/libraries/app-startup