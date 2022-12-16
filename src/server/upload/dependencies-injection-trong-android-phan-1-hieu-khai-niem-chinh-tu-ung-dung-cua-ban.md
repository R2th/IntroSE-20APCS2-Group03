## Lời giới thiệu

Chào các bạn. Khi lập trình Android, chúng ta đều có những design pattern riêng cho team mình. Một trong những kĩ thuật khá quen thuộc chúng ta sử dụng với design pattern MVVM chính là Dependencies Injection (DI). Đã có nhiều thư viện ra đời để hỗ trợ DI như Dagger, Hilt, Koin. Bản thân mình những ngày đầu đọc khá nhiều về những thư viện này nhưng vẫn thực sự đã rất khó hiểu, cho nên mình đã quay về điểm xuất phát là tìm hiểu xem DI thực ra là cái gì và chúng ta đã từng implement nó như thế nào. Một trong các bài viết đi từ khái niệm ban đầu là hướng dẫn [Manual Dependencies Injection từ Android Developers](https://developer.android.com/training/dependency-injection/manual#basics-manual-di). Hãy cùng mình xem thử nhé.

## Dependencies Injection là như thế nào?

Mình nghĩ để hiểu được DI góp mặt trong những dự án Android của chúng ta như thế nào thì nên xem nó được vận dụng qua bài toán thực tế như sau: 
- Chúng ta có một ứng dụng có khá nhiều màn hình: Login, Register, Home, Setting... với mô hình MVVM
- Luồng đăng nhập có LoginActivity là đầu vào, và chúng ta cần object LoginViewModel để xử lí logic cũng như xí lí UI. 
- Giả sử màn hình chúng ta cần cái checkbox "Lưu username cho lần đăng nhập sau" thì chúng ta vừa cần request tới API cũng như cần handle storage local (có thể là Room cũng có thể chỉ cần SharedPreferences). Như vậy object LoginViewModel cần 2 objects của UserLocalDataSource và của UserRemoteDataSource
- UserRemoteDataSource làm việc với API thì lại cần object của Retrofit services
- Để đỡ việc cho LoginViewModel thì chúng ta tạo 1 class Repository là  UserRepository để lo việc xử lí với UserLocalDataSource và UserRemoteDataSource. Và LoginViewModel sẽ dùng object UserRepository này là được

![](https://developer.android.com/images/training/dependency-injection/4-application-graph.png)

Bạn hình dung ra sự phụ thuộc object này vào object khác chưa nào?

UserRepository chịu trách nhiệm làm việc với source local hoặc remote sẽ như thế này 

```
class UserRepository(
    private val localDataSource: UserLocalDataSource,
    private val remoteDataSource: UserRemoteDataSource
) { ... }

class UserLocalDataSource { ... }
class UserRemoteDataSource(
    private val loginService: LoginRetrofitService
) { ... }
```

Bây giờ cách đơn giản nhất là chúng ta khởi tạo hết trong LoginActivity xem thử nhé 

```
class LoginActivity: Activity() {

    private lateinit var loginViewModel: LoginViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // tạo instance của Retrofit để gọi API bằng cú pháp rất quen thuộc
        val retrofit = Retrofit.Builder()
            .baseUrl("https://example.com")
            .build()
            .create(LoginService::class.java)

        // Rồi truyền instance retrofit đó cho việc khởi tạo một object UserRemoteDataSource
        val remoteDataSource = UserRemoteDataSource(retrofit)
        
        // Tiếp theo là khởi tạo object UserLocalDataSource
        val localDataSource = UserLocalDataSource()

        // Giờ khởi tạo instance của UserRepository với đầu vào từ những instances trên
        val userRepository = UserRepository(localDataSource, remoteDataSource)

        // Cuối cùng khởi tạo viewmodel với đầu vào là instace của UserRepository ở trên
        // Ví dụ này thì chưa nói tới khởi tạo viewmodel nhờ vào ViewModelFactory đâu nhé
        loginViewModel = LoginViewModel(userRepository)
    }
}
```

Đấy chính là chúng ta đang tạo những dependencies injection: sự phụ thuộc của instance này vào instance kia, một cách đơn giản nhất.

Nhưng mà, cách làm này, không được khuyến khích lắm, bởi vì:
1. Chúng ta cần làm khá nhiều việc từ trên xuống dưới để khởi tạo một object viewmodel làm việc với data. Nghe chưa thuyết phục lắm nhỉ? Có bạn sẽ nghĩ là đã phụ thuộc nhau thì phải khai báo lần lượt chứ? 
2. Nếu màn hình Register cũng cần instance userRepository, để sau khi đăng kí xong chạy luồng đăng nhập, hoặc màn hình Setting để quản lí user profile, thì có phải chúng ta lại 1,2,3,4 hít thở để khai báo lại lần lượt không nào? 
3. Rồi kể cả giả sử có một chỗ quản lí giúp chúng ta đỡ các bước tạo ra đấy rồi, thì cũng sẽ khá khó để tái sử dụng object userRepository này ở màn hình khác, hay sử dụng chỉ 1 object quản lí user info cho toàn bộ app (chính là design pattern singleton)

## Manual Dependencies Injection: Tạo container để quản lí các dependencies này

Để giải quyết quá nhiều bước thủ công tạo ra instance userRepository , ta hãy cùng nhau định nghĩa một class cung cấp những object phụ thuộc (ở đây chính là remoteDataSource và localDataSource) cho việc tạo instance userRepository đó: 

```
class AppContainer {

    private val retrofit = Retrofit.Builder()
                            .baseUrl("https://example.com")
                            .build()
                            .create(LoginService::class.java)

    private val remoteDataSource = UserRemoteDataSource(retrofit)
    private val localDataSource = UserLocalDataSource()

    // sẽ tạo một instance của UserRepository nếu chúng ta có một instance của AppContainer
    val userRepository = UserRepository(localDataSource, remoteDataSource)
}
```

Giờ làm sao sử dụng container này cho toàn app? Ta tự tạo một class MyApplication hỗ trợ cho việc cung cấp container rồi khai báo nó trong AndroidManifest.xml
```

class MyApplication : Application() {

    // Instance của AppContainer sẽ được sử dụng tại bất cử đâu trong app
    val appContainer = AppContainer()
}
```
```
<application
        android:name=".MyApplication"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.MyTheme">
```

Rồi sử dụng nó trong màn hình Login như sau 
```
class LoginActivity: Activity() {

    private lateinit var loginViewModel: LoginViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // gọi property appContainer của object application để tạo userRepository cho việc khởi tạo instance của LoginViewModel
        val appContainer = (application as MyApplication).appContainer
        loginViewModel = LoginViewModel(appContainer.userRepository)
    }
}
```

Tạm ổn đúng không, chúng ta đã đỡ phải đi nhiều bước để khởi tạo loginViewModel rồi.

## Kết luận
Mình hi vọng trên đây là một ví dụ giúp các bạn đang khúc mắc có thể hiểu rõ hơn Dependencies injection trong dự án thực tế. Các bạn sẽ thấy hoá ra chúng ta đã và đang implement DI suốt đấy thôi. Trong phần 2, mình sẽ giới thiệu về ViewModelFactory và tìm hiểu về quản lí scope trong Manual Dependencies injection.

Phần 2: https://viblo.asia/p/dependencies-injection-trong-android-phan-2-quan-li-nhu-the-nao-khi-ung-dung-dan-xuat-hien-nhieu-luong-logic-3Q75wVMQlWb
Cám ơn các bạn đã đọc