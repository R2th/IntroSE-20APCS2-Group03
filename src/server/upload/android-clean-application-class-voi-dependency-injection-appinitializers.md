## I. Tổng quan
Nếu bạn đang xây dựng một ứng dụng Android, thì bạn sẽ có một vị khách đặc biệt trong codebase của mình đó là class: Application

Khi ứng dụng của bạn xây dựng , nó rất có thể nhiều thư viện yêu cầu một số loại khởi tạo trong class Application với mục đích chuẩn bị sử dụng trong toàn bộ ứng dụng, gây khó khăn cho việc duy trì và mở rộng.

Theo tài liệu của Android, trách nhiệm của class Application là duy trì trạng thái ứng dụng trong suốt quá trình ứng dựng khởi chạy

Chính vì vậy, làm thế nào chúng ta có thể giữ cho class này tập trung vào trách nhiệm duy nhất này

## II. Ngăn sự khởi tạo vào các class
Vì vậy, hãy bắt đầu bằng cách di chuyển từng block khởi tạo vào một class. Bất kỳ quá trình khởi tạo nào cũng sẽ yêu cầu application instance hoàn thành việc tạo ra nó, vì vậy, hãy để tạo một interface đơn giản mà các class sẽ implement chúng

```
interface AppInitializer {
    fun init(application: Application)
}
```

Bây giờ, bắt đầuimplement nó. Dưới đây là một ví dụ về block init Stetho:

```
class StethoInitializer @Inject constructor() : AppInitializer {

    override fun init(application: Application) {
        val realmInspector = RealmInspectorModulesProvider.builder(application).build()
        val dumpAppProvider = Stetho.defaultDumperPluginsProvider(application)
        Stetho.initialize(
            Stetho.newInitializerBuilder(application)
                .enableDumpapp(dumpAppProvider)
                .enableWebKitInspector(realmInspector)
                .build()
        )
    }
    
}
```

Sau khi thực hiện công việc trên, bạn sẽ kết thúc một class  với mỗi block init , nhìn nhanh vào package ví dụ sau sẽ biết được ứng dụng của bạn cần init những gì

![](https://images.viblo.asia/1c050cb0-5271-457d-9d80-4111f0bbc936.png)

Nhìn thì có vẻ tốt nhưng làm sao để chúng ta có thể khởi tạo đống trên nhanh mà không thấy "oải"

## III. Dagger2 Multibindings có thể giúp ta làm việc này
Vì vậy, hãy sử dụng Dagger và một trong những tính năng mạnh mẽ của nó: Multi bindings.

Tạo dagger module, và khai báo tất cả các implement trong 'AppInitializer' của bạn

```
@Module
abstract class AppInitializersModule {
    @Binds
    @IntoSet
    abstract fun providesFabricInitializer(initializer: FabricInitializer): AppInitializer
    @Binds
    @IntoSet
    abstract fun providesStethoInitializer(initializer: StethoInitializer): AppInitializer
}
```

Với @IntoSet, bạn sẽ nói với Dagger rằng AppInitializerdependency sẽ cộng tác trong Set nếu bạn inject nó

Vì vậy, khi inject  Set<AppInitializer> sẽ lấp đầy nó với tất cả các nhà cung cấp trình khởi tạo ứng dụng có chú thích @IntoSet mà bạn đã khai báo trong (các) module của mình.
    
Vì vậy, hãy gom khởi tạo thành một lớp, chỉ cần khai báo lớp khởi tạo và chạy chúng:

```
class AppInitializers @Inject constructor(
    private val initializers: Set<@JvmSuppressWildcards AppInitializer>
) {
    fun init(application: MainApplication) {
        initializers.forEach{
            it.init(application)
        }
    }
}
```

Bây giờ có thể inject chúng

```
class MyAwesomeApplication : Application() {
    
    @Inject lateinit var appInitializers: AppInitializers
    
    override fun onCreate() {
        // ...
        appInitializers.init(this)
        // ...
    }
}
```

## IV. Tổng kết
Bây giờ, nhờ Dagger, khởi tạo ứng dụng của bạn trở lên dễ dàng, ngắn gọn, dễ sử dụng hơn. Bạn có thể sử dụng sức mạnh của Dagger để làm một số thứ hay ho khác nữa.
Bài viết được tham khảo từ: https://proandroiddev.com/clean-android-application-class-with-dependency-injection-appinitializer-45999096f955