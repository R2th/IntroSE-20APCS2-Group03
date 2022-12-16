Dependecy injection (DI) là một công nghệ được sử dụng rộng rãi trong lập trình và rất phù hợp khi lập trình android, nơi các phụ thuộc được cung cấp cho class thay vì tạo ra chúng. Bằng cách tuân theo các nguyên tắc DI, ta tạo một nền tảng tốt cho ứng dụng của mình với khả năng sử dụng lại đoạn code lớn và dễ dàng testing. Đã bao giờ bạn thử inject phụ thuộc thủ công bằng code chưa? Ngay cả nhiều thư viên dependecy injection hiện có ngày nay, nó đòi hỏi rất nhiều đoạn code khi dự án ngày càng trở nên lớn, vì ta phải xây dựng mọi class và các phụ thuộc của nó bằng tay, và tao ra các container để sử dụng và quản lý phụ thuộc 
 
 Với thư viện Hint đinh nghĩa một các tiêu chuẩn để thực hiện DI trong ứng dụng của bạn bằng cách cung cấp các container trong mọi class Android trong dự án của bạn và tự động quản lý vòng đời của chúng cho bạn.
 
 Hint được xây dụng dựa trên một thư viện DI nổi tiếng là Dagger, vì vậy nó thừa hưởng từ tính chính xác về thời gian biên dịch, runtime performance, khả năng mở rộng và hỗ trợ Android Studio mà Dagger cung cấp. Vì điều này Dagger chiếm 74% trong 10k ứng dụng hàng đầu trong Google Play. Tuy nhiên, do việc tạo mã thời gian biên dịch nên thời gian build ứng dụng tăng lên
 
 Do nhiều class framework android được tạo bởi chính hệ điều hành. nên có một bản tóm tắt liên quan khi sử dụng Dagger trong các ứng dụng Android. Không giống như Dagger, Hilt được tích hợp với các thư viện Jetpack và framework class và loại bỏ hầu hết các bản mẫu để cho phép bạn tập trung vào các phân quan trọng của việc xác định và ịnect các dependecy mà không phải lo lắng về việc quản lí tất cả các setup và cầu nối của Dagger. Nó sẽ tự động tạo và cung cấp
 
 * Các components để tích hợp Android framework class với Dagger mà bạn cần phải tạo bằng tay
 * Scope annotations cho các thành phần được Hint tạo tự động
 * Predefined bindings and qualifiers.
 
Vì Dagger và Hint đều có thể cùng tồn tại nên ta có thể dễ dàng migrated khi cần thiết

## Hint in action

Ở ví dụ này mình sẽ chỉ ra cho các bạn Hint dễ sử dụng đến mức nào bằng việc inject AnalyticsAdapter vào MainActivity

Đầu tiền, enable Hint trong ứng dụng của bạn bằng annotation @HintAndroidApp kích hoạt việc Hint gen code

```kotlin
@HiltAndroidApp
class MyApplication : Application() { ... }
```

Thứ hai, bảo Hint làm cách nào để cung cấp instance của AnalyticsAdapter bằng annotating với constructor với @Inject 

```kotlin
class AnalyticsAdapter @Inject constructor() { ... }
```

Để inject instance của AnalyticsAdapter vào MainActivity, enable Hilt trong activity với annotation @AndroidEntryPoint và thực hiện injection bằng annotation @Inject 

```kotlin 
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

## Hilt với Jetpack support
Bạn có thể sử dụng các thư viện Jetpack yêu thích của mình với Hilt . Hilt đã hỗ trợ cung cấp injection trực tiếp cho ViewModel và WorkManager

Ví dụ, để inject LoginViewModel vào LoginActivity: annotate LoginViewModel với @ViewModelnject và sử dụng nó trong activity và fragment mong muốn 

```kotlin 
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
## Start using Hilt
Để tìm hiểu về hilt trong ứng dụng Android bạn có thể đọc [doc](https://developer.android.com/training/dependency-injection/hilt-android#setup) này 

Nếu chưa quen với DI hoặc Dagger hãy xem [guide](https://developer.android.com/training/dependency-injection/hilt-android) này để thêm Hilt vào ứng dụng android 

Nếu bạn đã sử dụng Dagger thì có thể migrating sang Hilt với [doc](https://dagger.dev/hilt/migration-guide) này

Đây là một project sử dụng Hilt : https://github.com/android/architecture-samples/tree/dev-hilt

Còn đây là một số annotation trong Hilt 

![](https://miro.medium.com/max/1000/1*crqOJ-Z80fauzV9zLwQ1iA.png)

References: https://medium.com/androiddevelopers/dependency-injection-on-android-with-hilt-67b6031e62d