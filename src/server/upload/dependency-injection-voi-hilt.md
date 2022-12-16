## Giới thiệu
[Vừa qua](https://medium.com/androiddevelopers/whats-new-in-jetpack-1891d205e136) Google đã giới thiệu một thư viện mới trong [Android Jetpack](https://developer.android.com/jetpack) có tên là **Hilt**. Hilt được xây dựng trên thư viện [Dagger](https://developer.android.com/training/dependency-injection/dagger-basics), một thư viện khá phổ biến được sử dụng cho [Dependency Injection](https://developer.android.com/training/dependency-injection) (DI). 

Hilt giúp giảm lượng boilerplate code (code mẫu) khi thực hiện [manual dependency injection](https://developer.android.com/training/dependency-injection/manual), cũng như giúp cho code của chúng ta dễ dàng trong việc *reusability*, *refactoring* và *testing*.

Trong Android, các thành phần như `Activity`, `Fragment`, `Service`, ... được khởi tạo bởi hệ điều hành cho nên chúng ta không thể inject các phụ thuộc trực tiếp từ constructor. 

Khi sử dụng Dagger, chúng ta cần một lượng lớn code để làm được điều này. Hilt giúp giảm các boilerplate code liên quan đến sử dụng Dagger trong Android app bằng cách nó sẽ tự động generate và cung cấp:
- Các **component** cho việc tích hợp với các Android framework class.
- Các **scope annotation** để dùng với các component mà Hilt tạo ra. 
- Các **Predefined binding** để đại diện cho các Android class như `Application` hoặc `Activity`.
- Các **Predefined qualifiers** để đại diện cho `@ApplicationContext` và `@ActivityContext`

Trong bài viết này, mình sẽ giới thiệu với các bạn cách làm thể nào để sử dụng Hilt trong Android app, cũng như demo về mirgate Dagger với Hilt. 

## Thêm các dependency
Đầu tiên, chúng ta thêm Gradle plugin trong `build.gradle` (project-level) cho Hilt.
```Kotlin
buildscript {
    // ...
    ext.hilt_version = '2.28-alpha'
    dependencies {
        // ...
        classpath "com.google.dagger:hilt-android-gradle-plugin:$hilt_version"
    }
}
```

Tiếp theo chúng ta cần apply plugin này và thêm các dependency trong `build.gradle` (module-level)
```Kotlin
// ...
apply plugin: 'kotlin-kapt'
apply plugin: 'dagger.hilt.android.plugin'

android {
    // ...
}

// ...
dependencies {
    implementation "com.google.dagger:hilt-android:$hilt_version"
    kapt "com.google.dagger:hilt-android-compiler:$hilt_version"
}
```
Lưu ý rằng, Hilt sử dụng các feature của Java 8, cho nên chúng ta cần enable Java 8 trong project bằng cách thêm vào `build.gradle` (module level)
```kotlin
android {
  // ...
  compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
}
```

## Hilt application class
Đối với `Application` class chúng ta cần annotate nó với `@HiltAndroidApp`.
```Kotlin
@HiltAndroidApp
class GithubApp : Application() {
    override fun onCreate() {
        super.onCreate()
        // ...
    }
}
```
`@HiltAndroidApp`sẽ tạo các component của Hilt. Các component này sẽ được attach với vòng đời của đối tượng `Application` và cung cấp các dependency cho nó. Hơn nữa, nó là component chính của của app cho nên các component khác sẽ có thể truy cập được các dependency mà nó cung cấp. 

## Inject dependencies vào Android class
Với Hilt chúng ta dễ dàng *Inject* các dependency các Android class bằng cách antotate chúng với annotation `@AndroidEntryPoint`. 

```Kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)
        // ...
    }
    // ...
}
```

```Kotlin
@AndroidEntryPoint
class SearchFragment : Fragment() {

    @Inject
    lateinit var appExecutors: AppExecutors
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        // ...
    }
    // ...
}
```

Hilt đang hỗ trợ các Android class như: 
- `Application` (dùng `@HiltAndroidApp`)
- `Activity`
- `Fragment`
- `View`
- `Service`
- `BroadcastReceiver`

Khi chúng ta annotate một Android class với `@AndroidEntryPoint` thì các class phụ thuộc vào nó cũng phải được annotate với annotation đó. Ví dụ như `SearchFragment` được attach vào `MainActivity`, mặc dù `MainActivity` không nhận bất kì dependency nào nhưng nó vẫn phải được annotate với `@AndroidEntryPoint`.

Một vài lưu ý khi sử dụng Hilt với các Android class đó là: 
- Hilt chỉ support các activity kế thừa từ `ComponentActivity`, như `AppCompatActivity`.
- Hilt chỉ supports các fragment kế thừa từ `androidx.Fragment`.
- Hilt không support các [retained fragment](https://developer.android.com/reference/android/app/Fragment#setRetainInstance(boolean)).

Để nhận được các denpendency từ một component chúng ta sẽ dùng annotation `@Inject` như dưới đây:
```Kotlin
@AndroidEntryPoint
class SearchFragment : Fragment() {

    @Inject
    lateinit var appExecutors: AppExecutors
}
```

Các class mà Hilt inject có thể có các base class cũng dùng injection, nhưng chúng sẽ không cần annotate với`@AndroidEntryPoint` nếu là abstract class.

## Định nghĩa các Hilt binding
Khi chúng ta thực hiện *field injection*, Hilt cần biết làm thế nào để cung cấp instance của các denpendency cần thiết từ component tương ứng.  *binding* sẽ chứa các thông tin cần thiết để cung cấp một instance của một kiểu dữ liệu như một dependency.

Chúng ta thường sử dụng *constructor injection* để cung cấp thông tin binding. Cũng như Dagger, chúng ta chỉ cần annotate constructor của class với `@Inject`.
```Kotlin 
@Singleton
class UserRepository @Inject constructor(
    private val appExecutors: AppExecutors,
    private val userDao: UserDao,
    private val githubService: GithubService
) {
    // ...
}
```

Các parameter của `UserRepository` cũng nhận các dependency, cho nên các class như `AppExecutors`, `UserDao` và `GithubService` cũng phải được xác định cách để cung cấp instance của chúng. 

Đối với `AppExecutors`, chúng ta cũng sẽ cung cấp thông tin *binding* thông qua *constructor injection*.
```Kotlin
open class AppExecutors(
    private val diskIO: Executor,
    private val networkIO: Executor,
    private val mainThread: Executor
) {

    @Inject
    constructor() : this(
        Executors.newSingleThreadExecutor(),
        Executors.newFixedThreadPool(3),
        MainThreadExecutor()
    )
    // ...
}
```

Nhưng với `UserDao` và `GithubService` chúng ta sẽ cung cấp nó qua một *Hilt module*.
```Kotlin
@Module
@InstallIn(ApplicationComponent::class)
class AppModule {
    @Singleton
    @Provides
    fun provideGithubService(): GithubService {
        return Retrofit.Builder()
            .baseUrl("https://api.github.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(LiveDataCallAdapterFactory())
            .build()
            .create(GithubService::class.java)
    }

    @Singleton
    @Provides
    fun provideDb(@ApplicationContext context: Context): GithubDb {
        return Room
            .databaseBuilder(context, GithubDb::class.java, "github.db")
            .fallbackToDestructiveMigration()
            .build()
    }

    @Singleton
    @Provides
    fun provideUserDao(db: GithubDb): UserDao {
        return db.userDao()
    }
    
    // ...
}
```

## Hilt modules
Đôi khi, chúng ta không thể dùng *constructor injection*. Ví dụ như, chúng ta không thể constructor-inject với một interface, hoặc một kiểu hay một class mà chúng ta không định nghĩa (có thể là một external library). Vì thế, với Hilt chúng ta có thể dùng `Hilt modules` để cung cấp thông tin *binding*.

Hilt module là một classs với annotation `@Module`. Giống như [Dagger module](https://developer.android.com/training/dependency-injection/dagger-android#dagger-modules), chúng ta có thể định nghĩa một dependency bằng annotation `@Provides` hoặc `Binds`. 

Tuy nhiên, Hilt cần chỉ rõ Android class mà mỗi module được dùng hoặc install in với annotation `@InstallIn`. Chúng ta sẽ tìm hiểu thêm về `@InstallIn` trong component *scope* và *lifetime*.

### `Binds`
```Kotlin
interface AnalyticsService {
     fun analyticsMethods()
}

// Constructor-injected, because Hilt needs to know how to
// provide instances of AnalyticsServiceImpl, too.
class AnalyticsServiceImpl @Inject constructor(
     // ...
) : AnalyticsService { 
    // ... 
}

@Module
@InstallIn(ActivityComponent::class)
abstract class AnalyticsModule {

    @Binds
    abstract fun bindAnalyticsService(
        analyticsServiceImpl: AnalyticsServiceImpl
    ): AnalyticsService
}
```

Trong ví dụ trên chúng ta có `AnalyticsService` interface, được implement bởi `AnalyticsServiceImpl`. Bây giờ, để cung cấp một instance của `AnalyticsService` chúng ta cần thông qua `AnalyticsServiceImpl`, cho nên `AnalyticsServiceImpl` sẽ có một *constructor-injected*. 

Với `AnalyticsModule`, chúng ta có function `bindAnalyticsService(_:AnalyticsServiceImpl)` sẽ nhận một `AnalyticsServiceImpl` và trả về `AnalyticsService`. Khi nó được annotate với `@Binds`, nó sẽ nhận instance từ `AnalyticsServiceImpl` thông qua constructor đã được *binding* trước đó và ép kiểu thành `AnalyticsService` để cung cấp cho các component cần dependency này. 

### `@Provides`
Chúng ta thường xuyên sử dụng các external library (như *Retrofit*, *OkHttpClient*, *Room* databases, bla bla) trong Android app. Với những thư viện này, chúng ta không thể khai báo một *constructor-injected* cho nó, cho nên để cung cấp thông tin *binding*, chúng ta sẽ cần đến annotation `@Provides`. 
```Kotlin
@Module
@InstallIn(ApplicationComponent::class)
class AppModule {
    @Singleton
    @Provides
    fun provideGithubService(): GithubService {
        return Retrofit.Builder()
            .baseUrl("https://api.github.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(LiveDataCallAdapterFactory())
            .build()
            .create(GithubService::class.java)
    }
    // ...
}
```
Với ví dụ này, chúng ta cần cung cấp một `GithubService` instance thông qua `Retrofit.Builder`. Trong `AppModule` sẽ có function `provideGithubService()`, sẽ trả về một `GithubService`. Khi được annotate với `@Provides` nó sẽ cung cấp instance được trả về từ function này cho các components cần nó. 

> Khi function hoặc constructor được annotate với `@Singleton`, thì **module** hoặc **constructor injection** sẽ cung cấp một [singleton instance](https://en.wikipedia.org/wiki/Singletonpattern) cho các component cần denpendency đó.

## Provide multiple binding cho các kiểu dữ liệu giống nhau
Trong trường hợp, chúng ta cần cung cấp nhiều dependency có cùng một kiểu thì chúng ta có thể sử dụng *qualifiers* trong Hilt. 

`Qualifier` là một annotation được dùng đễ nhận dạng cho từng *binding* cụ thể. 

Ví dụ, mình cần cung cấp 2 instance của `OkHttpClient` trong `NetworkModule`, với instance thứ nhất sẽ có auth interceptor và instance thứ hai sẽ có một interceptor khác. 
```Kotlin
@Module
@InstallIn(ApplicationComponent::class)
object NetworkModule {

  @Provides
  fun provideAuthInterceptorOkHttpClient(
    authInterceptor: AuthInterceptor
  ): OkHttpClient {
      return OkHttpClient.Builder()
               .addInterceptor(authInterceptor)
               .build()
  }

  @Provides
  fun provideOtherInterceptorOkHttpClient(
    otherInterceptor: OtherInterceptor
  ): OkHttpClient {
      return OkHttpClient.Builder()
               .addInterceptor(otherInterceptor)
               .build()
  }
}
```

Instance thứ nhất sẽ được sử dụng bởi `AnalyticsModule` cho `provideAnalyticsService(_:OkHttpClient)`

```Kotlin
@Module
@InstallIn(ActivityComponent::class)
object AnalyticsModule {

  @Provides
  fun provideAnalyticsService(okHttpClient: OkHttpClient): AnalyticsService {
      return Retrofit.Builder()
               .baseUrl("https://example.com")
               .client(okHttpClient)
               .build()
               .create(AnalyticsService::class.java)
  }
}
```
Lúc này, `provideAnalyticsService()` sẽ không thể biết được, mình nên nhận instance từ `provideAuthInterceptorOkHttpClient()` hay từ `provideOtherInterceptorOkHttpClient()`, do đó sẽ phát sinh lỗi khi thực hiện compile.

Vậy, để xác định được denpendency nào được inject vào `provideAnalyticsService()`, chúng ta cần có 2 `@Qualifier` cho từng `OkHttpClient` được cung cấp.
```Kotlin
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class AuthInterceptorOkHttpClient

@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class OtherInterceptorOkHttpClient
```

> `@Retention(AnnotationRetention.BINARY)` xác định rằng annotation này được lưu trữu trên binary output, nhưng invisible với [reflection](https://kotlinlang.org/docs/reference/reflection.html). Xem thêm về [Retention](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.annotation/-annotation-retention/).

Sau đó, `AnalyticsModule` và `AppModule` sẽ được định nghĩa lại như thế này:

```Kotlin
@Module
@InstallIn(ApplicationComponent::class)
object NetworkModule {

  @AuthInterceptorOkHttpClient
  @Provides
  fun provideAuthInterceptorOkHttpClient(
    authInterceptor: AuthInterceptor
  ): OkHttpClient {
      return OkHttpClient.Builder()
               .addInterceptor(authInterceptor)
               .build()
  }

  @OtherInterceptorOkHttpClient
  @Provides
  fun provideOtherInterceptorOkHttpClient(
    otherInterceptor: OtherInterceptor
  ): OkHttpClient {
      return OkHttpClient.Builder()
               .addInterceptor(otherInterceptor)
               .build()
  }
}
```

```Kotlin
@Module
@InstallIn(ActivityComponent::class)
object AnalyticsModule {

  @Provides
  fun provideAnalyticsService(
    @AuthInterceptorOkHttpClient okHttpClient: OkHttpClient
  ): AnalyticsService {
      return Retrofit.Builder()
               .baseUrl("https://example.com")
               .client(okHttpClient)
               .build()
               .create(AnalyticsService::class.java)
  }
}
```

Trong trường hợp, nó là một dependency của *constructor-injected* class hoặc *field injection*, chúng ta có thể dùng như sau:
```Kotlin
// As a dependency of a constructor-injected class.
class ExampleServiceImpl @Inject constructor(
  @AuthInterceptorOkHttpClient 
  private val okHttpClient: OkHttpClient
) : ExampleService

// At field injection.
@AndroidEntryPoint
class ExampleActivity: AppCompatActivity() {

  @AuthInterceptorOkHttpClient
  @Inject lateinit var okHttpClient: OkHttpClient
}
```

## Predefined qualifers
Trong Android app chúng ta thường xuyên cần đến `Context` class cho việc truy cập resource, content-provider, khởi tạo database, và nhiều thứ khác.  

Hilt cung cấp 2 qualifers đó là `@ApplicationContext` và `@ActivityContext` để làm điều này.
```Kotlin
@Module
@InstallIn(ApplicationComponent::class)
class AppModule {
    @Singleton
    @Provides
    fun provideDb(@ApplicationContext context: Context): GithubDb {
        // ...
    }
    // ...
}
```

## Inject `ViewModel` objects với Hilt
Hilt cung cấp một cách dễ dàng để inject vào `ViewModel` bằng annotation `@ViewModelInject`.

Để sử dụng nó, chúng ta sẽ cần thêm một vài dependencies trong `build.gradle` (module-level)
```Kotlin
// ...
dependencies {
  // ...
  implementation 'androidx.hilt:hilt-lifecycle-viewmodel:1.0.0-alpha01'
  // When using Kotlin.
  kapt 'androidx.hilt:hilt-compiler:1.0.0-alpha01'
  // When using Java.
  annotationProcessor 'androidx.hilt:hilt-compiler:1.0.0-alpha01'
}
```

Tiếp theo đó là cung cấp một `ViewModel` với construtor có `@ViewModelInject` annotation.
```Kotlin
class UserViewModel @ViewModelInject constructor(
    userRepository: UserRepository, 
    repoRepository: RepoRepository
) : ViewModel() {
    // ...
}
```
Bây giờ, `userRepository` và `repoRepository` sẽ được inject vào `UserViewModel` khi nó được khởi tạo. 

Cuối cùng, activity hoặc fragment có thể lấy instance `ViewModel` thông qua việc sử dụng `ViewModelProvider` hoặc `by viewModels()` trong [KTX extensions](https://developer.android.com/kotlin/ktx):

```Kotlin
@AndroidEntryPoint
class UserFragment : Fragment() {
    private val userViewModel: UserViewModel by viewModels()
    // ...
}
```

Vậy là chúng ta đã đi qua cơ bản cách để có thể sử dụng Hilt trong Android app của mình. Nếu bạn là người đã dùng Dagger 2, thì có thể tham khảo [pull request migrate Dagger sang Hilt](https://github.com/huuphuoc1396/architecture-components-samples/pull/1/files) của mình, mình đã implement dựa trên project [GithubBrowserSample](https://github.com/android/architecture-components-samples/tree/master/GithubBrowserSample) trong [architecture-components-samples](https://github.com/android/architecture-components-samples) của Google.

Source đầy đủ bạn có thể tham khảo [tại đây](https://github.com/huuphuoc1396/architecture-components-samples/tree/githubbrowser_dagger_to_hilt).

*Lưu ý là branch `githubbrowser_dagger_to_hilt` nhé* :D

Tiếp theo, chúng ta sẽ tìm hiểu thêm về **lifetime** và **scope** của component trong Hilt.

## Các component đã được tạo cho Android class

Mỗi Hilt component có trách nhiệm inject *binding* của nó vào Android class tương ứng. Một Android class sẽ liên kết với Hilt component thông qua `@InstallIn` annotation.

Trong ví dụ trước, chúng ta đã sử dụng `ActivityComponent`.  Ngoài ra, Hilt còn cung cấp mốt số component khác như:

| Hilt component | Injector for |
| -------- | -------- |
| ApplicationComponent	| Application | 
| ActivityRetainedComponent	| ViewModel | 
| ActivityComponent	| Activity | 
| FragmentComponent	| Fragment | 
| ViewComponent	| View | 
| ViewWithFragmentComponent	| View annotated with @WithFragmentBindings | 
| ServiceComponent	| Service | 
> Hilt không generate component cho broadcast receivers vì Hilt inject các broadcast receivers trực tiếp từ `ApplicationComponent`.

### Component lifetimes
Hilt sẽ tự động tạo và hủy các instance của các component class theo vòng đời của Android class tương ứng. 

| Generated component |	Created at | Destroyed at |
| -------- | -------- | -------- |
| ApplicationComponent | Application#onCreate()	| Application#onDestroy() |
| ActivityRetainedComponent	| Activity#onCreate() | Activity#onDestroy() |
| ActivityComponent	| Activity#onCreate()	| Activity#onDestroy() |
| FragmentComponent	| Fragment#onAttach()	| Fragment#onDestroy() |
| ViewComponent	| View#super()	| View destroyed |
| ViewWithFragmentComponent	| View#super()	| View destroyed |
| ServiceComponent	| Service#onCreate() | Service#onDestroy() |

>  `ActivityRetainedComponent` sẽ tồn tại qua configuration changes. 

### Component scopes
Mặc định, tất cả các binding trong Hilt đều là *unscoped*, có nghĩa là mỗi lần app request binding thì Hilt sẽ tạo một instance mới.

Với scope thì Hilt chỉ tạo một instance và chia sẻ chúng với các request khác trong cùng một scope.

Dưới đây là các scope với Android class và component tương ứng:
| Android class	| Generated component | Scope |
| -------- | -------- | -------- |
| Application | ApplicationComponent | @Singleton |
| View Model | ActivityRetainedComponent | @ActivityRetainedScope|
| Activity | ActivityComponent | @ActivityScoped |
| Fragment | FragmentComponent | @FragmentScoped |
| View | ViewComponent | @ViewScoped |
| View annotated with @WithFragmentBindings | ViewWithFragmentComponent	| @ViewScoped |
| Service | ServiceComponent | @ServiceScoped |

Ví dụ, chúng ta có `AnalyticsAdapter` install in `ActivityComponent`, sử dụng `@ActivityScoped`. Hilt sẽ provide một instance `AnalyticsAdapter` suốt vòng đời của activity tương ứng. 
```Kotlin
@ActivityScoped
class AnalyticsAdapter @Inject constructor(
    private val service: AnalyticsService
) { 
    // ... 
}
```

Bây giờ, giả sử chúng ta có `AnalyticsService` được sử dụng không chỉ trong một activity mà còn được sử dụng ở mọi nơi trong app. Lúc này phạm vi của `AnalyticsService` phù hợp với `ApplicationComponent`. Kết quả là, mỗi khi một component cần provide một instance của `AnalyticsService`, nó sẽ cung cấp cùng 1 instance trong mọi thời điểm. 

```Kotlin
// If AnalyticsService is an interface.
@Module
@InstallIn(ApplicationComponent::class)
abstract class AnalyticsModule {

  @Singleton
  @Binds
  abstract fun bindAnalyticsService(
    analyticsServiceImpl: AnalyticsServiceImpl
  ): AnalyticsService
}

// If you don't own AnalyticsService.
@Module
@InstallIn(ApplicationComponent::class)
object AnalyticsModule {

  @Singleton
  @Provides
  fun provideAnalyticsService(): AnalyticsService {
      return Retrofit.Builder()
               .baseUrl("https://example.com")
               .build()
               .create(AnalyticsService::class.java)
  }
}
```

## "Túm" lại

Mình đã giới thiệu với các bạn nội dung cơ bản về Hilt và cách để implement nó trong Android app. Nếu có bất kì vấn đề gì cần trao đổi, hãy để lại comment của bạn phía dưới nhé.

Đây là [**Demo**](https://github.com/huuphuoc1396/architecture-components-samples/tree/githubbrowser_dagger_to_hilt) và [Migrate Dagger to Hilt pull request](https://github.com/huuphuoc1396/architecture-components-samples/pull/1) của mình.

Thank you and Happy coding =))

![](https://media1.giphy.com/media/Z21HJj2kz9uBG/giphy.gif?cid=5a38a5a25e9524cd4b121b1a1ce96d3ae4148e07cbb024dd&rid=giphy.gif)

## Tham khảo
1. https://developer.android.com/training/dependency-injection/hilt-android
2. https://medium.com/androiddevelopers/whats-new-in-jetpack-1891d205e136
3. https://github.com/android/architecture-components-samples/tree/master/GithubBrowserSample