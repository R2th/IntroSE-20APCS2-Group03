Nội dung bài viết dành cho những người mới, chưa có nhiều kiến thức và kinh nghiệm lập trình Android Native.
# Khái niệm về DI
Trong kỹ thuật lập trình phần mềm, Dependency Injection (DI) là một kỹ thuật được sử dụng rộng rãi. Bằng việc tuân theo các nguyên tắc của DI, chúng ta có thể đạt được các lợi ích như tái sử dụng code một cách hiệu quả, tái cấu trúc code cũng như dễ dàng để test.

Để hiểu rõ hơn, chúng ta sẽ đi vào ví dụ sau đây.
```
class Car {

    private val engine = Engine()

    fun start() {
        engine.start()
    }
}

fun main(args: Array) {
    val car = Car()
    car.start()
}
```

Một lớp Car cần lớp Engine. Lúc này lớp Engine được gọi là Dependency, Có nhiều cách khác nhau để thực hiện đều này, chúng ta có thể khởi tạo hẳn một instance của Engine ở trong lớp Car và sử dụng nó. Hoặc coi Engine là một thuộc tính và sau đó set thuộc tính này kiểu như là setter mà chúng ta thường làm.

Tuy nhiên nếu trường hợp có nhiều dependencies hơn, thì việc này quả thật khá căng và có thể mắc sai sót. Yêu cầu đưa ra chính là cố tái sử dụng code, dể dàng tái cấu trúc code và dễ dàng test. Chính vì vậy, các lập trình viên đã đưa ra ý tưởng, tạo 1 object lưu trữ các dependencies. Khởi tạo chúng lần đầu ngay trong Application, rồi sử dụng chúng trong lớp Car.

Tuy nhiên với trường hợp các dependencies lồng nhau thì sao, như là trong lớp engine còn có các dependency khác. 

## Manual Dependency Injection
Manual Dependency Injection là cách lồng ghép các dependencies ở trong constructor. Tiếp theo cách này được nâng cấp lên với việc sử dụng app container, là một thằng chứa đựng tất cả các dependencies, công việc khởi tạo sẽ nằm trong thằng này. App container cần được đặt ở một chỗ mà bất kỳ acticity nào cũng có thể sử dụng. Chính xác, đó chính là Application.
```
// Container of objects shared across the whole app
class AppContainer {

    // Since you want to expose userRepository out of the container, you need to satisfy
    // its dependencies as you did before
    private val retrofit = Retrofit.Builder()
                            .baseUrl("https://example.com")
                            .build()
                            .create(LoginService::class.java)

    private val remoteDataSource = UserRemoteDataSource(retrofit)
    private val localDataSource = UserLocalDataSource()

    // userRepository is not private; it'll be exposed
    val userRepository = UserRepository(localDataSource, remoteDataSource)
}
```

```
// Custom Application class that needs to be specified
// in the AndroidManifest.xml file
class MyApplication : Application() {

    // Instance of AppContainer that will be used by all the Activities of the app
    val appContainer = AppContainer()
}
```

Việc tái sử dụng code đã được thực thi, đến đây có vẻ ổn nhưng chúng ta phải quản lý App Container bằng tay, vẫn cón khác boilerplate code và đặc biệt là data trong phiên xử lý trước vẫn còn có thể tồn đọng. 

Để khắc phục điều này, chúng ta có thể khởi tạo thêm các Container khác, reset lại data mỗi khi phiên kết thúc. Quy trình này được gọi là Application flows. Cách này buộc phải quản lý các container và cẩn trọng xử lý data trong mỗi phiên. 

# Hilt
Bản alpha Hilt được released lần đầu vào giữa năm 2020, với sứ mệnh định nghĩa cách thức chuẩn để thực thi DI. Và đến nay, Hilt đã ổn định và được Jetpack recommend. Hilt xử lý các vấn đề của Manual Dependency Injection, cung cấp các containers cho tất cả class và tự động quản lý lifecycles của chúng. Hilt được build dựa trên những đặc điểm nổi bật của Dagger và đơn giản hơn Dagger.

Đầu tiên, chúng ta cần thêm thư viện để sử dụng Hilt. Tham khảo [version mới nhất](https://developer.android.com/training/dependency-injection/hilt-android#setup).
## Cách sử dụng
Đầu tiên chúng ta luôn phải có Application với annotation @HiltAndroidApp. Nó sẽ generate ra một thằng Hilt Component được đính kèm với Application lifecycle và cung cấp các dependencies. Hiểu nôm na, nó gần giống như một thằng App Container được đính kèm application. 
```
@HiltAndroidApp
class ExampleApplication : Application() { ... }
```
Bước tiếp theo, việc cung cấp các dependencies cho các class thông qua annotation @AndroidEntryPoint. 
```
@AndroidEntryPoint
class ExampleActivity : AppCompatActivity() { ... }
```
Danh sách các Android classes được Hilt support:
* Application (by using @HiltAndroidApp
* ViewModel (by using @HiltViewModel thay thể cho ViewModel Injection Constructor bắt đầu từ bản alpha 03)
* Activity (by using @AndroidEntryPoint)
* Fragment (by using @AndroidEntryPoint)
* View (by using @AndroidEntryPoint)
* Service (by using @AndroidEntryPoint)
* BroadcastReceiver (by using @AndroidEntryPoint)

Lưu ý; Nếu bạn chú thích một Android class với @Android EntryPoint, sau đó bạn cũng nên chú thích cả class mà phụ thuộc vào nó. Ví dụ bạn chú thích vào một fragment, thì bạn cũng phải chú thích vào bất kì acitivies nào sử dụng fragment đó. 

Giải thích thêm về cơ chế của @AndroidEntryPoint. Khi gán chú thích này vào một class thì sẽ tự động generate ra một thằng Hilt Component. Thằng Component này nhận các denpendencies từ những thằng cha mẹ tương ứng. Thông thường, để nhận dependencies từ những component, ta sử dụng chú thích @Inject.

Bài viết phần một tới đây là kết thức. Mình sẽ sớm cập nhật phần hai. Hy vọng các bạn sẽ có thêm những kiến thức thú vị về lập trình Android. Chúc các bạn ngày tốt lành.

Fb group: Android 24h

Link tài liệu tham khảo: https://developer.android.com/training/dependency-injection