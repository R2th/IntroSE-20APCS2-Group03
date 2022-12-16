Kiến trúc Android khuyến khích chia code thành nhiều class. Nguyên tắc trong các lớp phân cấp sẽ đảm nhiệm một chức năng duy nhất, việc chia nhỏ các lớp dẫn tới việc là chúng phải có sự liên kết lại với nhau để hỗ trợ nhau trong một chức năng nào đó. 

![](https://images.viblo.asia/224054c0-b19e-45fd-8a08-154c2515253c.png)
HÌnh 1 : Biểu đồ  kiến trúc cơ bản của một ứng dụng.
 
 Sự phụ thuộc giữa các lớp được miêu tả như biểu đồ phía trên. Trong đó mỗi lớp sẽ được kết nối với những phụ thuộc mà nó cần. Biểu hiện của tất cả các lớp và sự phụ thuộc của chúng tạo nên biểu đồ của ứng dụng. Trong hình 1, Bạn có thể tưởng tượng được ứng dụng có những phần nào và phần nào kết nối với phần nào. Khi lớp A (Viewmodel) phụ thuộc vào lớp B (Repository) sẽ có 1 dòng trỏ từ A đến B để thể hiện sự phụ thuộc đó.

 Dependency injection giúp chúng ta tạo sự kết nối này và giúp bạn thực thi việc testing. Ví dụ như là : khi bạn test cho Viewmodel mà phụ thuộc vào Repository, có thể có các kiểu khác nhau của Repository với việc làm giả dữ liệu để test với nhiều trước hợp khác nhau.

### Khái niệm cơ bản của Dependency Injection

Phần này bao gồm việc áp dụng DI thủ công  với ứng dụng android. Chúng ta tiếp cận DI một cách lặp đi lặp lại về cách sử dụng DI trong ứng dụng của bạn. Và cải thiện cho đến khi nó gần giống với việc mà Dagger tự động tạo ra cho các bạn. Để bạn hiểu hơn nữa về Dagger bạn có thể  tham khảo tại đây [Dagger basics](https://developer.android.com/training/dependency-injection/dagger-basics)

Chúng ta cũng xem một lượt qua nhóm các màn hình trong ứng dụng của bạn nó cũng tương ứng với một tính năng. Login, registration and checkout là tất cả về biểu đồ này.

Với màn hình Login, LoginActivity phụ thuộc vào LoginViewModel, Mà LoginViewModel lại phụ thuộc vào Repository. Sau đó Repository lại phụ thuộc vào UserLocalDataSource và UserRemoteDataSource rồi lần lượt phụ thuộc vào Retrofit như biểu đồ bên dưới đây:

 ![](https://images.viblo.asia/40e6238a-cdc7-4046-b4ad-c8d497cb592b.png)

 LoginActivity là điểm vào luồng đăng nhập. Và User tương tác với Activity. Sau đó LoginActivity cần tạo LoginViewModel với tất cả sự phụ thuộc.
 
2 lớp Repository và DataSource  luồng sẽ trông như sau :

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

Còn đây là LoginActivity :

```
class LoginActivity: Activity() {

    private lateinit var loginViewModel: LoginViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // In order to satisfy the dependencies of LoginViewModel, you have to also
        // satisfy the dependencies of all of its dependencies recursively.
        // First, create retrofit which is the dependency of UserRemoteDataSource
        val retrofit = Retrofit.Builder()
            .baseUrl("https://example.com")
            .build()
            .create(LoginService::class.java)

        // Then, satisfy the dependencies of UserRepository
        val remoteDataSource = UserRemoteDataSource(retrofit)
        val localDataSource = UserLocalDataSource()

        // Now you can create an instance of UserRepository that LoginViewModel needs
        val userRepository = UserRepository(localDataSource, remoteDataSource)

        // Lastly, create an instance of LoginViewModel with userRepository
        loginViewModel = LoginViewModel(userRepository)
    }
}
```

Vậy vấn đề gặp phải là gì :

1. Có nhiều đoạn code khá giống nhau. Nếu bạn muốn khởi tạo LoginViewModel ở một nơi nào bất kỳ trong code, Bạn phải duplication code nó lên. 
2. Sự phụ thuộc phải khai báo một cách tuần tự (Có nghĩa là phải xong class A mới được tạo class B)
3. Nó thì khó khăn trong việc tái sử dụng. Nếu bạn muốn sử dụng UserRepository với nhiều chức năng, Bạn phải tạo nó với Singleton pattern. Nhưng Singleton pattern tạo cho việc test trở lên khó khăn hơn nhiều. 

### Quản lý sự phụ thuộc với Container

Để giải quyết vấn đề tái sử dụng lại đối tượng,  Bạn có thể tạo dependencies container class mà bạn có thể lấy dependencies. Tất cả khởi tạo bởi container có thể được để public. Trong ví dụ này, bởi vì bạn chỉ cần khởi tạo UserRepository, Bạn có thể tạo dependencies là private và bạn có thể để public nếu bạn thấy cần thiết :

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

Bởi vì dependencies này được sử dụng trong toàn bộ ứng dụng vì vậy chúng ta cần một nơi để tất cả Activity có thể sử dụng đó chính là Application class. Bây giờ chúng tao tạo một Application class chứa AppContainer như sau :

```

// Custom Application class that needs to be specified
// in the AndroidManifest.xml file
class MyApplication : Application() {

    // Instance of AppContainer that will be used by all the Activities of the app
    val appContainer = AppContainer()
}
```

Bây giờ bạn có thể khởi tạo AppContainer từ Application và chia sẻ UserRepository :

```

class LoginActivity: Activity() {

    private lateinit var loginViewModel: LoginViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Gets userRepository from the instance of AppContainer in Application
        val appContainer = (application as MyApplication).appContainer
        loginViewModel = LoginViewModel(appContainer.userRepository)
    }
}
```

Trong trường hợp này, Bạn không có một singleton UserRepository. Thay vào đó, Bạn có AppContainer và chia sẻ nó cho tất cả các Activity
 
 Nếu LoginViewModel được cần nhiều nơi hơn trong ứng dụng của bạn, vậy nơi nào để tạo LoginViewModel một cách hợp lý?  Bạn có thể chuyển việc tạo LoginViewModel vào vùng chứa và cung cấp tham số cho nó với Factory. Code của bạn cho LoginViewModelFactory trông như sau:
 ```

 // Definition of a Factory interface with a function to create objects of a type
interface Factory {
    fun create(): T
}

// Factory for LoginViewModel.
// Since LoginViewModel depends on UserRepository, in order to create instances of
// LoginViewModel, you need an instance of UserRepository that you pass as a parameter.
class LoginViewModelFactory(private val userRepository: UserRepository) : Factory {
    override fun create(): LoginViewModel {
        return LoginViewModel(userRepository)
    }
}
```

Bạn có thể thêm LoginViewModelFactory vào trong AppContainer và LoginActivity sử dụng chúng:
```

// AppContainer can now provide instances of LoginViewModel with LoginViewModelFactory
class AppContainer {
    ...
    val userRepository = UserRepository(localDataSource, remoteDataSource)

    val loginViewModelFactory = LoginViewModelFactory(userRepository)
}

class LoginActivity: Activity() {

    private lateinit var loginViewModel: LoginViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Gets LoginViewModelFactory from the application instance of AppContainer
        // to create a new LoginViewModel instance
        val appContainer = (application as MyApplication).appContainer
        loginViewModel = appContainer.loginViewModelFactory.create()
    }
}
```

Cách tiếp cận này có vẻ ổn hơn so với ví dụ trước nhỉ. Nhưng nó vẫn còn một số thách thức:

1. Bạn phải quản lý AppContainer , khởi tạo tất các sự phụ thuộc bằng thủ công.
2. Vẫn còn nhiều code phát sinh. 

### Quản lý sự phụ thuộc trong luồng ứng dụng
 
 AppContainer trở lên phức tạp khi bạn muốn thêm nhiều chức năng vào dự án của bạn. Khi ứng dụng của bạn ngày càng lớn hơn và bắt đầu với nhiều luồng khác nhau hơn. Nó phát sinh nhiều vấn đều hơn nữa:
 
1.  Khi bạn có nhiều luồng hơn, Bạn thì chỉ muốn đối tượng bạn tạo chỉ tồn tại trong một luồng cụ thể nào đó. Ví dụ như là : Khi bạn tạo LoginUserData (Bao gồm username và password chỉ sử dụng trong luồng login). Bạn không muốn giữ lại data từ luồng login đã tạo trước đó. Mà bạn lại muốn mỗi 1 luồng mới sẽ khởi tạo lại. Bạn có thể tạo 1 luồng mới như FlowContainer bên trong AppContainer mình sẽ tạo cho bạn ở bên ví dụ dưới.
2. Tối ưu biểu đồ ứng dụng của bạn và những luồng chứa trở lên khó khăn hơn. Ban còn nhớ xóa những thứ không cần thiết trong luồng của bạn

Bạn hãy tưởng tượng , bạn có luồng login  gồm có 1 activity( LoginActivity) và nhiều fragments (LoginUsernameFragment và LoginPasswordFragments). Những views muốn:

1. Truy xuất đc LoginUserData  cùng 1 data . và tồn tại  cho tới khi luồng login kết thúc
2. Tạo mới LoginUserData khi mà luồng bắt đầu.


 Container này được tạo khi luồng login bắt đầu và nhớ loại bỏ khỏi bộ nhớ khi luồng kết thúc.
 
Cùng bắt đầu với ví dụ về LoginContainer. Bạn muốn khởi tạo nhiều LoginContainer trong ứng dụng . vì thế thay vì sử dụng singleton, tạo class bên trong AppContainer.
```

 class LoginContainer(val userRepository: UserRepository) {

    val loginData = LoginUserData()

    val loginViewModelFactory = LoginViewModelFactory(userRepository)
}

// AppContainer contains LoginContainer now
class AppContainer {
    ...
    val userRepository = UserRepository(localDataSource, remoteDataSource)

    // LoginContainer will be null when the user is NOT in the login flow
    var loginContainer: LoginContainer? = null
}
```

Chỉ khi bạn có một container cụ thể trong luồng thì bạn mới phải quyết định khi nào được tạo và khi nào phải xóa nó đi.  Trong LoginActivity bạn có thể khởi tạo container trong **onCreate()** và nhớ xóa nó trong **onDestroy()**
```

class LoginActivity: Activity() {

    private lateinit var loginViewModel: LoginViewModel
    private lateinit var loginData: LoginUserData
    private lateinit var appContainer: AppContainer


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        appContainer = (application as MyApplication).appContainer

        // Login flow has started. Populate loginContainer in AppContainer
        appContainer.loginContainer = LoginContainer(appContainer.userRepository)

        loginViewModel = appContainer.loginContainer.loginViewModelFactory.create()
        loginData = appContainer.loginContainer.loginData
    }

    override fun onDestroy() {
        // Login flow is finishing
        // Removing the instance of loginContainer in the AppContainer
        appContainer.loginContainer = null
        super.onDestroy()
    }
}
```

Bạn hãy nhớ quan tâm tới vòng đời của ứng dụng. Và bạn cũng thực hiện như thế tương tự với fragment.

### Cuối cùng

Tới đây là hết rồi, bài này mình chỉ mô tả đơn giản về cách vận hành làm sao để áp dụng Dependency Injection trong dự án của bạn một cách  đơn giản. Mà nó cũng gần giống nhất với Dagger đang sử dụng. Mình hy vọng bài này có thể giúp được các bạn.  
Còn có thiếu xót gì các bạn có thể comment bên dưới để mình cải thiện hơn nhé. :heart_eyes::heart_eyes::heart_eyes:


 Bạn có thể tham khảo  : https://developer.android.com/training/dependency-injection/manual
 
 Ví dụ : https://github.com/haiminhtran810/LearnManuaDI