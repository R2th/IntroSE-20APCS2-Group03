Dependency injection (DI) là một kỹ thuật được sử dụng phổ biến trong lập trình và rất phù hợp trong Android development, các phụ thuộc được cung cấp cho class thay vì tự bản thân class tạo ra. Bằng cách tuân theo nguyên lý của DI, bạn đã đặt nền móng cho một app architecture tốt, code tái sử dụng tốt hơn và dễ test hơn. Bạn đã từng thử sử dụng dependency injection một cách thủ công trong ứng dụng của bạn chưa? Mặc dù ngày nay đã có nhiều thư viện hỗ trợ việc dependency injection được tạo ra, nó yêu cầu nhiều code làm cho project của bạn trở nên lớn hơn, do bạn phải cấu trúc các class và các phụ thuộc của nó bằng tay, bạn tạo container để tái sử dụng và quản lý dependency.

Hilt là một thư viện với định nghĩa một cách tiêu chuẩn để sử dụng DI trong ứng dụng của bạn bằng cách cung cấp các container cho mỗi Android class trong project và quản lý vòng đời của chúng một cách tự động cho bạn. Hil hiện nay vẫn đang ở bản alpha, hãy thử dùng nó và cho các lập trình viên tạo ra nó feedback nhé.

Hilt xây dựng dựa trên thư viện DI phổ biết nhất Dagger do đó có các lợi ích từ, **compile time correctness, runtime performance, scalability, và Android Studio support** mà Dagger cung cấp. Vì điều này, Dagger đã cho thấy sự đáp ứng tuyệt vời trên 75% của top 10K ứng dụng trên Google Play Store. Tuy nhiên bởi vì Dagger sinh ra code ở compile time nên quá trình build sẽ tốn nhiều thời gian hươn.

Bởi vì nhiều Android framework class được khởi tạo bởi hệ điều hành, nên có nhiều code cần viết thêm khi sử dụng Dagger trong các ứng dụng Android. Không như Dagger, Hilt được tích hợp với thư viện Jetpack và các lớp Android framework và xóa phần lớn code cần phải việt thêm cho phép bạn chỉ tập trung vào các phần quan trọng của việc xákc định và inject các ràng buộc mà không phải lo lắng về việc quản lý tất các các các setup của Dadgger. Nó tự động tạo ra và cung cấp

* **Component for intergrating Android framework classes** với Dagger mà nếu không thì bạn sẽ phải tự tạo bằng tay
* **Scope annotations** cho các component sẽ được Hilt sinh ra tự động
* **Định nghĩa trước các binding và qualifier**

Trên hết, Dagger và Hilt có thể cùng tồn tại, các ứng dụng có thể được migrate trên cơ sở khi cần thiết

# Hilt in action

Chỉ để cho bạn thấy Hilt dễ sử dụng như thé nào, hãy thực hiện nhanh một vài DI trong một ứng dụng Android thông thường. Hãy để Hilt inject một `AnalyticsAdapter` trong `MainActivity` của chúng ta,

Đầu tiên, kích hoạt Hilt trong ứng dụng của bạn bằng cách thêm annotation `@HiltAndroidApp` cho lớp application của bạn để trigger Hilt's code generation:

```Kotlin
@HiltAndroidApp
class MyApplication : Application() { ... }
```

Thứ 2, nói với Hilt cách cung cấp instance của `AnalyticsAdapter` bằng cách thêm annotation `@Inject` vào constructor:

```Kotlin
class AnalyticsAdapter @Inject constructor() { ... }
```

Và thứ 3, để inject một instance của `AnalyticsAdapter` vào `MainActivity`, cho phép Hilt trong activity với annotation `@AndroidEntryPoint` và thực hiện field injection sử dụng @Inject annotation.

```Kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
  @Inject lateinit var analytics: AnalyticsAdapter
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // analytics instance has been populated by Hilt
    // and it's ready to be used
  }
}
```

Để có thêm thông tin, bạn có thể dễ dàng kiểu tra những annotation trong phần ở dưới.

# Hilt đã support Jetpack

Bạn có thể sử dụng các thư viện Jetpack yêu thích của mình với Hilt. Hilt cung cấp injection trực tiếp **supprt cho ViewModel và WorkManager** trong bản release này.

Ví dụ, để inject một Architecture Components ViewModel `LoginViewModel` trong một `LoginActivity`: annotate `LoginViewModel` với `@ViewModelInject` và sử dụng nó trong activity hoặc fragment như bạn muốn:

```Kotlin
class LoginViewModel @ViewModelInject constructor(
  private val analyticsAdapter: AnalyticsAdapter
): ViewModel { ... }
@AndroidEntryPoint
class LoginActivity : AppCompatActivity() {
  private val loginViewModel: LoginViewModel by viewModels()
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // loginViewModel is ready to be used
  }
}
```

Đọc thêm về Jetpack support ở https://developer.android.com/training/dependency-injection/hilt-jetpack

# Bắt đầu sử dụng Hilt

Nếu bạn bị hấp dẫn bởi Hilt và muốn hoạc thêm nhiều về nó, ở đây có vài nguồn cho bạn học theo cách bạn thích:

## Getting started với Hilt

Học cách thêm Hilt vào ứng dụng Android của với với hướng dẫn sau: https://developer.android.com/training/dependency-injection/hilt-android#setup

## Documentation

Nếu bạn mới làm quen với DI hoặc Dagger, xem hướng dẫn cách thêm Hilt vào một Android app: https://developer.android.com/training/dependency-injection/hilt-android. Như một sự lựa chọn, nếu bạn đã biết Dagger, chúng tôi cũng cung cấp tài liệu trên dagger.dev: https://dagger.dev/hilt/

Nếu bạn chỉ tò mò về các annotation mới và những gì bạn có thể làm với Hilt hãy xem bảng ở cuối bài viết này

##  Cho Dagger user

Nếu bạn đã sử dụng Dagger hoặc dagger.android trong ứng dụng của bạn, xem cách migrade ở:  https://dagger.dev/hilt/migration-guide hoặc codelab đề cập ở dưới để giúp bạn chuyển qua Hilt. Vì Dagger và Hilt có thể sử dụng cùng với nhau, bạn có thể migrate ứng dụng của mình dần dần

##  Codelabs

Đê học Hilt step by step, hãy xem các codelab sau:

* Sử dụng Hilt trong ứng dụng Android của bạn: https://codelabs.developers.google.com/codelabs/android-hilt
* Migrate từ Dagger sang Hilt: https://codelabs.developers.google.com/codelabs/android-dagger-to-hilt

##  Sample code:

Xem code đã được sư dụng tại Google I/O 2020 và trong `dev-hit` branch của Android architecture-samples Github repository.

# Các annotation mới

![](https://images.viblo.asia/81d79fde-dedc-4573-ba9d-8642f9a3e8bc.png)


# Kết

Với Hilt chúng ta có thể đơn giản hóa việc sử dụng Dagger trong ứng dụng, hi vọng bài viết này sẽ giúp các bạn có cái nhìn tổng quan về Hilt và tạo tiền đề cho các bạn tìm hiểu sâu hơn về Hilt

Cảm ơn các bạn đã ủng hộ, nếu hay hãy upvote cho mình nhé.

#  Tham khảo
Bài viết có tham khảo từ nguồn:
https://medium.com/androiddevelopers/dependency-injection-on-android-with-hilt-67b6031e62d