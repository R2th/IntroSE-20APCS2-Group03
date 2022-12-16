Hilt, một giải pháp được Jetpack đề xuất cho Dependence Injection (DI) trong Android apps được thông báo là đã ổn định. Điều này đồng nghĩa với việc chúng ta thỏa sức sử sụng chúng trong dự án. Đơn giản hơn Dagger, Hilt cho phép bạn viết ít code xoắn não hơn, đồng thời được thiết kế để tích hợp với nhiều thư viện Jetpack.

Hilt được lần đầu trình làng với bản alpha vào tháng 6 năm 2020 với sứ mệnh định nghĩa về một quy chuẩn cho việc thực hiện DI ở trong app Android của bạn. Thay vì tạo đồ thị phụ thuộc bằng tay, và inject cũng như chuyển các đối tượng tới nơi cần dùng theo cách thủ công, Hilt tự động tạo tất cả các mã đó cho bạn tại thời điểm biên dịch bằng các chú thích. Ngoài ra vì được tích hợp hoàn toàn với Android, Hilt tự động quản lý vòng đời của các phụ thuộc mà bạn liên kết tới.

Hãy xem thao tác thực hiện Hilt với ví dụ nhanh. Sau khi thiết lập Hilt, việc sử dụng Hilt dễ dàng bằng các thêm một vài chú thích sau.
```
@HiltAndroidApp // Setup Hilt in your app
class MyApplication : Application() { ... }

// Make Hilt aware of this ViewModel
@HiltViewModel
class LoginViewModel @Inject constructor(
    private val savedStateHandle: SavedStateHandle,
    /* ... Other dependencies Hilt takes care of ... */
) : ViewModel() { ... }


// Make the activity use the right ViewModel factory and
// inject other dependencies
@AndroidEntryPoint 
class LoginActivity : AppCompatActivity() {

    private val loginViewModel: LoginViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // loginViewModel is ready to be used
    }
}
```
## Đơn giản hơn Dagger
Hilt được xây dựng dựa trên thư viện Dagger, vì vậy những lợi ích từ độ chính xác của thời gian biên dịch, hiệu suất thời gian chạy, khả năng mở rộng và hỗ trợ Android Studio mà Dagger cung cấp cũng sẵn có trong Hilt. Một số chú thích của Dagger, chẳng hạn như @Inject để cho Dagger và Hilt biết cách cung cấp một thể hiện của một loại, thường được sử dụng trong Hilt. Nhưng với Hilt lại đơn giản hơn rất nhiều.

## Ít Boiler code hơn
Hilt xác định các thành phần tiêu chuẩn, hoặc đồ thị dependency, được tích hợp đầy đủ với các lớp framework Android như Application, activities, fragments, hay views. Cũng như chú thích các phạm vi cho các trường hợp của các loại cho các thành phần đó.
> “Hilt automatically generates the test application and test component via @HiltAndroidTest. We were able to remove between 20% and 40% of boilerplate wire up test code after migrating to Hilt!” — Jusun Lee, Software Engineer, YouTube

## Được thiết kế chuẩn cho Android
Hilt chỉ hoạt động trong các ứng dụng Android. Một số chú thích như @HiltAndroidApp, @AndroidEntryPoint, hay @HiltViewModel được dành riêng cho Hilt và xác định một cách kiên định để thực hiện DI trên Android.
## Tích hợp với các thư viện Jetpack khác
Bạn có thể sử dụng các thư viện Jetpack yêu thích của mình với Hilt. Cho đến nay, Jetpack cung cấp hỗ trợ chèn trực tiếp cho ViewModel, WorkManager, Navigation và Compose.
## Tài liệu để học Hilt 
Hilt là giải pháp DI được dề xuất của Jetpack cho các ứng dụng Android. Để tìm hiểu thêm về nó và bắt đầu sử dụng nó trong các ứng dụng của bạn, hãy nghiên cứu các tài liệu sau đây:
* Learn about the benefits of dependency injection [here](https://developer.android.com/training/dependency-injection).
* [Documentation](https://developer.android.com/training/dependency-injection/hilt-android) to learn how to use Hilt in your app.
* [Migration guide](https://dagger.dev/hilt/migration-guide) from Dagger to Hilt.
* Codelabs to learn Hilt in a step-by-step approach: [Using Hilt in your Android app](https://codelabs.developers.google.com/codelabs/android-hilt) and [Migrating from Dagger to Hilt](https://codelabs.developers.google.com/codelabs/android-dagger-to-hilt).
* Code samples! Check out Hilt in action in the [Google I/O 2020](https://github.com/google/iosched) and [Sunflower apps](https://github.com/android/sunflower/).
* [Cheat sheet](https://developer.android.com/images/training/dependency-injection/hilt-annotations.pdf) to quickly see what the different Hilt and Dagger annotations do and how to use them.

Chúc các bạn thành công và sớm ngày làm chủ được Hilt!!
source: https://medium.com/androiddevelopers/hilt-is-stable-easier-dependency-injection-on-android-53aca3f38b9c