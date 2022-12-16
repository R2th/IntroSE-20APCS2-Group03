Phần trước đã giới thiệu các khái niệm cơ bản về Hilt và các container được tạo ra. Nó cũng bao gồm việc hướng dẫn sử dụng Hilt trong ứng dụng. Mọi người có thể xem lại bài viết đó tại đây [[Dependency injection với Hilt](https://viblo.asia/p/dependency-injection-voi-hilt-63vKj9bR52R)]. Trong bài viết này tôi sẽ giới thiệu việc sử dụng Hilt trong các ứng dụng có nhiều module.

Việc tạo mã Hilt cần quyền truy cập vào tất cả các module Gradle sử dụng Hilt. Module Gradle biên dịch class Application cần có tất cả các module Hilt và các class constructor-injected. Nếu dự án nhiều module bao gồm các module Gradle thông thường, thì có thể sử dụng Hilt như được mô tả trong bài viết [Dependency injection với Hilt](https://viblo.asia/p/dependency-injection-voi-hilt-63vKj9bR52R). Tuy nhiên, đây không phải là trường hợp của các ứng dụng bao gồm nhiều module.
Lưu ý: Đối với các dự án nhiều module liên kết với nhau, hãy xem xét bật cờ **enableExperimentalClasspathAggregation** trong class **build.gradle**. Đọc thêm về nó trong tài liệu [Hilt documentation](https://dagger.dev/hilt/gradle-setup#classpath-aggregation).

Trong các feature module, cách mà các module thường phụ thuộc vào nhau được đảo ngược. Do đó, Hilt không thể xử lý các annotation trong các feature module. Bạn phải sử dụng Dagger để thực hiện inject vào các feature module của mình.

Bạn phải sử dụng component dependencies để giải quyết vấn đề này với các feature module. Thứ tự làm như sau:
1. Khai báo một **interface** với **@EntryPoint** trong module (hoặc trong bất kỳ module nào khác có thể được xử lý bởi Hilt) với các phụ thuộc mà feature module cần.
2. Tạo một component của Dagger phụ thuộc vào **interface @EntryPoint**.
3. Sử dụng Dagger như bình thường trong feature module.

Hãy xem xét ví dụ từ [Dependency injection với Hilt](https://viblo.asia/p/dependency-injection-voi-hilt-63vKj9bR52R). Giả sử thêm một feature module là đăng nhập vào project. Bạn triển khai tính năng đăng nhập với một activity được gọi là LoginActivity. Điều này có nghĩa là bạn chỉ có thể nhận các ràng buộc từ thành phần ứng dụng.
Đối với tính năng này, bạn cần một **OkHttpClient** với **authInterceptor binding**.
Đầu tiên, tạo interface @EntryPoint được cài đặt trong SingletonComponent với các ràng buộc mà module đăng nhập cần:
```
// LoginModuleDependencies.kt - File in the app module.

@EntryPoint
@InstallIn(SingletonComponent::class)
interface LoginModuleDependencies {

  @AuthInterceptorOkHttpClient
  fun okHttpClient(): OkHttpClient
}
```

Để thực hiện inject các trường trong LoginActivity, hãy tạo một component phụ thuộc vào interface @EntryPoint:
```
// LoginComponent.kt - File in the login module.

@Component(dependencies = [LoginModuleDependencies::class])
interface LoginComponent {

  fun inject(activity: LoginActivity)

  @Component.Builder
  interface Builder {
    fun context(@BindsInstance context: Context): Builder
    fun appDependencies(loginModuleDependencies: LoginModuleDependencies): Builder
    fun build(): LoginComponent
  }
}
```

Khi các bước đó hoàn tất, hãy sử dụng Dagger như bình thường trong feature module. Ví dụ: bạn có thể sử dụng các liên kết từ SingletonComponent như một phần phụ thuộc của một class:
```
// LoginAnalyticsAdapter.kt - File in the login module.

class LoginAnalyticsAdapter @Inject constructor(
  @AuthInterceptorOkHttpClient okHttpClient: OkHttpClient
) { ... }
```

Để thực hiện chèn các field, hãy tạo một instance của component bằng cách sử dụng applicationContext để lấy các phụ thuộc SingletonComponent:
```
// LoginActivity.kt - File in the login module.

class LoginActivity : AppCompatActivity() {

  @Inject
  lateinit var loginAnalyticsAdapter: LoginAnalyticsAdapter

  override fun onCreate(savedInstanceState: Bundle?) {
    DaggerLoginComponent.builder()
        .context(this)
        .appDependencies(
          EntryPointAccessors.fromApplication(
            applicationContext,
            LoginModuleDependencies::class.java
          )
        )
        .build()
        .inject(this)

    super.onCreate(savedInstanceState)
    ...
  }
}
```

Để biết thêm ngữ cảnh về phụ thuộc module trong feature module, hãy xem [Component dependencies with feature modules](https://developer.android.com/training/dependency-injection/dagger-multi-module#dagger-dfm).

Để biết thêm thông tin về Dagger trên Android, hãy xem [Using Dagger in Android apps](https://developer.android.com/training/dependency-injection/dagger-android).