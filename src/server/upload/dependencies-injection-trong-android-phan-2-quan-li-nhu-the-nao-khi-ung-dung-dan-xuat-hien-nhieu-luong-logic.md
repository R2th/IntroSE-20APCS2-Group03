## Lời giới thiệu

Trong [phần 1](https://viblo.asia/p/dependencies-injection-trong-android-phan-1-hieu-khai-niem-chinh-tu-ung-dung-cua-ban-07LKXokJ5V4), mình đã đi qua 1 ví dụ để có thể hiểu Dependencies Injection trong Android là như thế nào. Chúng ta cũng đã tạo thủ công 1 class AppContainer chuẩn bị sẵn các bước và luôn sẵn sàng để tạo ra một instance, nhằm phục vụ cho việc tạo một instance nào đó khác. Và chúng ta có thể sử dụng container đó ở bất cứ đâu trong toàn app. Trong phần 2 này, chúng ta hãy thử xem xét khi mà ứng dụng bắt đầu to ra, có nhiều luồng cần xử lí thì chúng ta sẽ làm thế nào.
Bài viết này sẽ đi qua 2 phần: quản lí viewmodel tập trung hơn và quản lí các container khi ứng dụng nhiều luồng xử lí hơn.

## Quản lí ViewModel tập trung hơn

Thực tế thì UserViewModel của chúng ta hầu như không được khởi tạo trực tiếp mà sẽ nhờ vào ViewModelProvider. Đó là nhờ cách hoạt động của ViewModelProvider: 

* Nếu nhờ ViewModelProvider tạo cho chúng ta một viewmodel nào đó, nó sẽ trả về ViewModel nếu đang tồn tại, còn không có thì nó mới đi tạo mới instance ViewModel này. 
* ViewModel được tạo bởi ViewModelProvider sẽ được gắn vào scope đi kèm (activity hoặc là fragment). Các bạn có thể xem thêm [tại đây](https://developer.android.com/topic/libraries/architecture/viewmodel#lifecycle). 

Điều này là rất có ích khi mà fragment vì lí do gì đó mà bị kill và được tạo lại (ví dụ như xoay màn hình hoặc là bộ nhớ bị giải phóng khi không đủ), nếu như viewmodel được khởi tạo trực tiếp từ ViewModel() thì mỗi lần fragment tạo mới, nó cũng sẽ tạo mới thêm một viewmodel và xử lí lại từ đầu. 
Một sự lợi hại nữa là trong bài toán mà nhiều fragments chia sẻ dữ liệu từ cùng một viewmodel của Activity mà chúng gắn vào khi chúng có một luồng xử lí. Các fragments không bị ảnh hưởng lẫn nhau và không cần quan tâm đến nhau. Và viewmodel chỉ bị clear khi Activity kết thúc.

Thường thì cú pháp để tạo viewmodel thông qua ViewModelProvider sẽ như sau:
`ViewModelProvider(context).get(LoginViewModel::class.java)`

Một điều cần lưu ý nữa là khi LoginViewModel của chúng ta cần pass tham số trong constructor, ví dụ phải truyền vào UserRepository mà ViewModelProvider lại chỉ có thể tạo ViewModel không có tham số. Lúc này bạn sẽ cần tới ViewModelProvider.Factory để khởi tạo viewmodel với tham số ở constructor

```
class LoginViewModelFactory(
        private val localDataSource: UserLocalDataSource,
        private val remoteDataSource: UserRemoteDataSource) : ViewModelProvider.Factory {
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(LoginViewModel::class.java)) {
            return LoginViewModel(localDataSource, remoteDataSource) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}

```

Vậy thì giờ chúng ta có thể dùng LoginViewModelFactory trong AppContainer để khởi tạo LoginViewModel. Chúng ta sẽ thử dùng trong LoginActivity nhé:

```
// AppContainer vẫn như cũ
class AppContainer {
    ...
    val userRepository = UserRepository(localDataSource, remoteDataSource)

   // chúng ta tạo một factory ở đây để màn hình Login dùng nó để tạo ra LoginViewModel sau nhé
    val loginViewModelFactory = LoginViewModelFactory(userRepository)
}

class LoginActivity: Activity() {

    private lateinit var loginViewModel: LoginViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val appContainer = (application as MyApplication).appContainer
        
        // gọi LoginViewModelFactory trong AppContainer để tạo LoginViewModel nhờ vào hàm create()
        loginViewModel = appContainer.loginViewModelFactory.create()
    }
}
```
Ok vậy là chúng ta đã quản lí viewmodel một cách tập trung hơn nhờ vào ViewModelProvider.Factory rồi đúng không nào. 

## Khi luồng logic của ứng dụng mở rộng

Chúng ta mới chỉ xử lí luồng đăng nhập cho ứng dụng thôi đúng không. Hãy xem xét ứng dụng khi có thêm những chức năng khác như Register, hay Setting. Mỗi luồng chức năng sẽ có một container để tạo các viewmodels xử lí data và logic cho các luồng đó. Vậy thì AppContainer của chúng ta lúc này sẽ bao gồm tất cả các container đó. AppContainer sẽ dần to ra và chứa nhiều dần các instance cho những luồng riêng biệt. 

Với các luồng khác nhau, có thể chúng ta muốn các đối tượng chỉ sống trong phạm vi của luồng đó. Ví dụ: khi tạo LoginUserData (chứa username và password cho chỉ luồng đăng nhập thôi chả hạn), chúng ta không muốn lưu giữ dữ liệu từ luồng đăng nhập cũ mà nên có một instance mới cho mỗi luồng mới. Điều này dẫn tới việc tối ưu hóa biểu đồ ứng dụng và vùng chứa luồng cũng có thể vất vả hơn. Chúng ta sẽ cần nhớ phải đi xoá instance chứa data khi nào luồng kết thúc.

Lấy ví dụ rõ hơn như sau: Giờ ở luồng đăng nhập, chúng ta có 2 fragment (2 màn hình theo thứ tự, có thể thấy ở luồng đăng nhập rất nhiều app như Gmail hay Skype ) LoginUsernameFragment chỉ nhập username và LoginPasswordFragment để nhập mật khẩu, được attached vào LoginActivity. Hai Fragments này muốn :
* Truy cập vào cùng một instance LoginUserData cần được chia sẻ cho đến khi quá trình đăng nhập kết thúc.
* Tạo một instance LoginUserData khi luồng đăng nhập bắt đầu lại.
Vậy thì chúng ta cần LoginContainer để xử lí cho luồng đăng nhập này như sau:

```
class LoginContainer(val userRepository: UserRepository) {

    val loginData = LoginUserData()

    val loginViewModelFactory = LoginViewModelFactory(userRepository)
}
```

```
// AppContainer bây giờ chứa LoginContainer cùng nhiều container khác
class AppContainer {
    ...
    val userRepository = UserRepository(localDataSource, remoteDataSource)

    // LoginContainer có thể null vì khi chúng ta muốn clear memory nếu kết thúc luồng đăng nhập
    var loginContainer: LoginContainer? = null
}
```

Và ở LoginActivity chúng ta sẽ khởi tạo ViewModel, khởi tạo LoginUserData . Các Fragments là LoginUsernameFragment và  LoginPasswordFragment sẽ chia sẻ những instance về data và logic này. Tuy nhiên khi kết thúc luồng đăng nhập, ViewModel thì có thể tự bị cleared() nhưng còn LoginUserData thì chúng ta phải tự xoá thủ công. Hãy xoá trong onDestroy() như sau:
```
class LoginActivity: Activity() {

    private lateinit var loginViewModel: LoginViewModel
    private lateinit var loginData: LoginUserData
    private lateinit var appContainer: AppContainer


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        appContainer = (application as MyApplication).appContainer

        appContainer.loginContainer = LoginContainer(appContainer.userRepository)

        loginViewModel = appContainer.loginContainer.loginViewModelFactory.create()
        loginData = appContainer.loginContainer.loginData
    }

    override fun onDestroy() {
        appContainer.loginContainer = null
        super.onDestroy()
    }
}
```

Các bạn có thể thấy là chúng ta phải tự mình quản lý phạm vi và vòng đời của các container, tối ưu hóa và loại bỏ các container không còn cần thiết để giải phóng bộ nhớ. Chúng ta cần làm điều này cẩn thận và đúng cách để tránh dẫn đến các lỗi nhỏ và rò rỉ bộ nhớ trong ứng dụng.

## Kết Luận

Manual Dependencies Injection một kỹ thuật tốt để tạo các ứng dụng Android có tính scalable. Chúng ta sử dụng các containers như một cách để cung cấp, chia sẻ các instance hay data trong các luồng khác nhau của ứng dụng của bạn tại 1 nơi tập trung hơn như nhờ vào những factory. Tuy nhiên, rõ ràng là khi ứng dụng của chúng ta lớn dần thì sẽ có rất nhiều đoạn mã kiểu boilerplate, những scope và vòng đời phải cần xử lí cẩn thận và điều này có thể dễ xảy ra lỗi. Chúng ta cũng chưa quản lí được những instance cần tính chất Singleton trong toàn ứng dụng.

Trong phần tiếp theo, mình sẽ giới thiệu về Dagger, cách sử dụng Dagger để tự động hóa quy trình này thay vì cách quản lí các DI thủ công như hai phần vừa rồi.

Phần 3: https://viblo.asia/p/dependencies-injection-trong-android-phan-3-dagger2-3P0lPG84Zox

Cám ơn các bạn đã đọc.

Tham khảo: https://developer.android.com/training/dependency-injection/manual