Nguồn của ảnh : ![](https://images.viblo.asia/cf58184b-ae6c-42ac-9517-f500701ef6c3.jpeg)https://images.viblo.asia/cf58184b-ae6c-42ac-9517-f500701ef6c3.jpeg

**Koin là gì nào ?**

Koin là Dependency Injection framework đơn giản. Nó giúp cho Developers đơn giản hơn trong việc tái sử dụng code giống như Dagger. Được viết  bằng Kotlin thuần túy. Không tạo code và không ánh xạ

**Core components của Koin**

1. startKoin : Nó là điểm bắt đầu. Phương thức này nhận 1 list "modules"
2. Koin DSL
* module { } :   Là một Koin Module (hoặc một Koin Submodule trong một module khác)
* factory { } :  Cung cấp một newInstance 
* single { } : Cung cấp một Singleton
* get() : Yêu cầu component

Bạn muốn tham khảo thêm bạn có thể vào link : https://insert-koin.io/docs/1.0/quick-references/koin-dsl/

**Làm sao để bắt đầu với Koin**

**Setup Koin**

Tất cả bạn cần thiết lập ứng dụng của bạn với  Gradle

```
// Add Jcenter to your repositories if needed
repositories {
    jcenter()    
}
dependencies {
    // Koin for Android
    implementation 'org.koin:koin-android:1.0.2'
    // Android Scope feature
    implementation 'org.koin:koin-android-scope:1.0.2'
    // Android Scope feature - AndroidX
    implementation 'org.koin:koin-androidx-scope:1.0.2'
    // Android Architecture ViewModel feature
    implementation 'org.koin:koin-android-viewmodel:1.0.2'
    // Android Architecture ViewModel feature - AndroidX
    implementation 'org.koin:koin-androidx-viewmodel:1.0.2'
}
```

**Mình chia làm 2 loại sau**

**1- Bắt đầu với Android**

**Components của chúng ta** 


```
interface HelloRepository {
    fun giveHello(): String
}

class HelloRepositoryImpl() : HelloRepository {
    override fun giveHello() = "Hello Koin"
}
```

và tạo 1 lớp presenter cho việc sử dụng data này

```
class MySimplePresenter(val repo: HelloRepository) {

    fun sayHello() = "${repo.giveHello()} from $this"
}
```

**Viết Koin module**

```
val appModule = module {

    // single instance of HelloRepository
    single<HelloRepository> { HelloRepositoryImpl() }

    // Simple Presenter Factory
    factory { MySimplePresenter(get()) }
}
```



**Start Koin**

startKoin() được gọi trong  Application class:

```
class MainApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        
        // start Koin context
        startKoin(this, listOf(appModule)
    }
}
```

startKoin chỉ được gọi một lần. Vì thế bạn chắc chắn rằng tất cả modules được gọi trong list.

**Injecting dependencies**

MySimplePresenter sẽ được tạo với HelloRepository . Để đưa nó vào Activity chúng ta sử dụng  by inject()

```
class MySimpleActivity : AppCompatActivity() {

    // Lazy injected MySimplePresenter
    val firstPresenter: MySimplePresenter by inject()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        //...
    }
}
```


**2- Bắt đầu với Android Architetcure và ViewModel**

**Components của chúng ta :**

```
interface HelloRepository {
    fun giveHello(): String
}

class HelloRepositoryImpl() : HelloRepository {
    override fun giveHello() = "Hello Koin"
}
```

và tạo 1 lớp presenter cho việc sử dụng data này

```
class MyViewModel(val repo : HelloRepository) : ViewModel() {

    fun sayHello() = "${repo.giveHello()} from $this"
}
```

**Viết Koin module**

```
val appModule = module {

    // single instance of HelloRepository
    single<HelloRepository> { HelloRepositoryImpl() }

    // MyViewModel ViewModel
    viewModel { MyViewModel(get()) }
}
```



**Start Koin**

startKoin() được gọi trong  Application class:

```
class MainApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        
        // start Koin context
        startKoin(this, listOf(appModule)
    }
}
```

startKoin chỉ được gọi một lần. Vì thế bạn chắc chắn rằng tất cả modules được gọi trong list.

**Injecting dependencies**

MyViewModel sẽ được tạo với HelloRepository . Để đưa nó vào Activity chúng ta sử dụng  `by viewModel()`

```
class MyViewModelActivity : AppCompatActivity() {
    
    // Lazy Inject ViewModel
    val myViewModel: MyViewModel by viewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_simple)

        //...
    }
}
```

**Lý do để chuyển từ Dagger qua Koin:**

1. Sự phụ thuộc (Dependencies ) ít hơn
2. Ít code phát sinh hơn
3. Dễ dàng hiểu và điều chỉnh
4. Hỗ trợ cho  properties

**Dù thế nào thì Koin vẫn có những bất lợi so với Dagger như sau :**

1. Koin vẫn là Work-In-Progress vì thế không đủ tốt để cho project lớn. (Như mình đọc bài này, không biết bây giờ kotlin đã khác chưa, bạn có thể update lại giúp mình :grinning: )
2. Dagger thực hiện tất cả các xử lý tại thời gian biên dịch và nếu có bất kì lỗi gì trong dependency graph, developer sẽ biết được nó sớm hơn.
3. Chúng ta không thể inject bằng cách sử dụng một keywork đơn giản như inject  trong Dagger. Tất cả mọi thứ cần được xác định trong module list
4. Không có quá nhiều tài liệu về Koin bây giờ

Bạn có thể đọc thêm tại link :

https://insert-koin.io/docs/1.0/setup/

https://insert-koin.io/docs/1.0/getting-started/android-viewmodel/

https://insert-koin.io/docs/1.0/getting-started/android/


Tài liệu tham khảo : https://medium.com/@shinoogoyalaggarwal/koin-a-dependency-injection-framework-85ed1eb2eaa5