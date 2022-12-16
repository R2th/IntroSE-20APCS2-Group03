![](https://images.viblo.asia/71c00321-dac2-49a6-a332-e744c8b63432.png)
source: https://raw.githubusercontent.com/ekito/koin/master/img/banner_2000.png
# Giới thiệu

Hiện tại nhắc tới **dependency injection** khi dev app Android thì đa phần chúng ta sẽ đều nghĩ ngay tới [Dagger 2](https://google.github.io/dagger/)

Về cơ bản khi cài đặt Dagger cho Android chúng ta sẽ cần định nghĩa đơn giản như sau:

```kotlin
class MainApplication : DaggerApplication()

interface AppComponent : AndroidInjector<MainApplication> { }

class NetworkModule { }

class AppModule { }

class ActivityModule { }

class FragmenModule { }

class ViewModelModule { }
```

Dagger hiện tại ổn định và mạnh mẽ tuy nhiên nó quá phức tạp, quá nhiều code lặp lại và hơn nữa khi dùng Dagger sẽ có thêm nhiều file code được tự động gen. Nếu bạn dùng Dagger với Data binding thì số code gen ra sẽ rất nhiều. Khi đó việc debug đôi khi là ác mộng.

Chính ví thế nên mình nghĩ liệu chúng ta có nên thử xem qua **Koin** khi mà gần đây **Koin** đã chính thức ra bản **1.0.0**.

# Koin là gì?

Koin là một lightweight dependency injection framework được viết bằng Kotlin và cho Kotlin, giải pháp bằng funtional nên không sinh code, không ánh xạ.

# Cài đặt

## Version hiện tại

```
koin_version = '1.0.0'
```

## Gradle

### Jcenter

```
repositories {
	jcenter()    
}
```

### Dependencies

Core
```
// Koin for Kotlin
implementation "org.koin:koin-core:$koin_version"
```

Android
```
// Koin for Android
implementation "org.koin:koin-android:$koin_version"
// Koin Android ViewModel feature
implementation "org.koin:koin-android-viewmodel:$koin_version"
```

## Cơ bản về Koin DSL

- module { } - tạo một Koin Module hoặc một submodule (ở trong một module khác)
- factory { } - cung cấp một newInstance
- single { } - cung cấp một singleton
- get() - yêu cầu component
- bind - thêm định nghĩa về kiểu cho đối tượng
- getProperty() - yêu cầu property

Về cơ bản chúng ta sẽ dùng module, factory, single, get.

Chi tiết hơn thì các bạn xem ở link này https://insert-koin.io/docs/1.0/quick-references/koin-dsl/

## Code nào

### Khai báo Koin module

```kotlin
val networkModule = module{
    single { createOkHttpCache(get()) } // create singleton, get() for component dependency
    single { createLoggingInterceptor() } // create singleton
}

fun createOkHttpCache(context: Context): Cache {
    val size = (10 * 1024 * 1024).toLong() // 10 Mb
    return Cache(context.cacheDir, size)
}

fun createLoggingInterceptor(): Interceptor {
    val logging = HttpLoggingInterceptor()
    logging.level = if (BuildConfig.DEBUG) HttpLoggingInterceptor.Level.BODY
    else HttpLoggingInterceptor.Level.NONE
    return logging
}
```
source: https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/di/ApiModule.kt

```kotlin
val viewModelModule = module {
    // viewModel { } create viewModel
    // get() for component dependency
    viewModel { PopularMovieViewModel(get(), get()) }
    
    // new way
    viewModel<PopularMovieViewModel>()
}
class PopularMovieViewModel constructor(
        val movieRepository: MovieRepository,
        val movieDao: MovieDao
) : VideModel()
```

### Start Koin

```kotlin
class MainApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        startKoin(this, listOf(
                appModule,
                networkModule,
                repositoryModule,
                viewModelModule
        ))
    }

}
```

### Inject trong Android

```kotlin
val viewModelModule = module {
    viewModel { PopularMovieViewModel(get(), get()) }
    
     // new way
    viewModel<PopularMovieViewModel>()
}

class PopularMovieViewModel constructor(
        val movieRepository: MovieRepository,
        val movieDao: MovieDao // inject in constructor
) : VideModel() {
    // or lazy inject
    val movieDao: MovieDao by inject()
    // or directly get
    val movieDao : MovieDao = get()
}

class PopularMovieFragment : Fragment() {
    // lazy inject
    val viewModel by viewModel<PopularMovieViewModel>()
    // or directly get
    val viewModel : PopularMovieViewModel = viewModel()
    // or directly get
    val viewModel getViewModel<PopularMovieViewModel>()
    
    // share viewModel between fragment and activity
    val viewModel by sharedViewModel<MainActivityViewModel>()
}
```

Như vậy là chúng ta đã setup xong dependency injection bằng Koin. Thật đơn giản phải không nào!

Đây là link pull request mình thực hiện chuyển từ Dagger sang Koin các bạn có thể tham khảo:

https://github.com/dangquanuet/The-Movie-DB-Kotlin/pull/60

![](https://images.viblo.asia/2c572fa9-d439-4c6e-a94e-04beb449f03c.png)

# So sánh một chút

## Lí do nên chuyển từ Dagger sang Koin

1. Dependencies ít hơn
2. Code ngắn gọn
3. Ít code sinh ra
4. Dễ hiểu và cài đặt
5. Hỗ trợ properties
6. Build time nhanh hơn
7. Chính thức 1.0.0

## Dagger còn tốt hơn Koin ở?

1. Dagger thực hiện trong compile time nên nếu có lỗi dependency thì sẽ phát hiện sớm
2. Chỉ cần @Inject là có thể inject
3. Koin hãn còn mới

Sau những gì mình đã giới thiệu thì các bạn hãy tự mình khám phá và quyết định xem có nên chuyển hẳn sang Koin không nhé. 

Xin chào và hẹn gặp lại các bạn! :D

# Tham khảo
https://insert-koin.io/

https://github.com/InsertKoinIO/koin

https://proandroiddev.com/london-tube-status-app-from-dagger-to-koin-17f96dbf8e0b

https://medium.com/@shinoogoyalaggarwal/koin-a-dependency-injection-framework-85ed1eb2eaa5

https://medium.com/@charbgr/bye-bye-dagger-1494118dcd41