## 1. Mở đầu
 Ở phần trước mình đã giới thiệu một cách tổng quan Dependency Injection là gì. Có nói đến việc implement DI có thể bằng tay (thủ công) hay tự động. Trong bài viết này mình sẽ chia sẻ cách dùng kỹ thuật DI trong một ứng dụng Android bằng cách thủ công cũng như ưu và nhược điểm của nó nhé ^^ 
## 2. Application graph
Kiến trúc ứng dụng Android được đề xuất khuyến khích chia mã code của bạn phân tách thành các lớp, modul riêng biệt để hưởng lợi từ separation of concerns, có một nguyên tắc cơ bản đó là mỗi class của hệ thống phân cấp có một trách nhiệm được xác định là duy nhất. Khi mà phân tách như thế thì sẽ dẫn đến nhiều lớp nhỏ hơn cần được kết nối với nhau để thực hiện các dependencies (phụ thuộc) của nhau. Dưới đây là mô hình biểu đồ của ứng dụng Android được google khuyến nghị
![](https://images.viblo.asia/b0e1bb73-cb44-45ce-9ee2-be434973d42a.png)
Sự phụ thuộc giữa các class có thể đượ biểu diễn dưới dạng biểu đồ, trong đó mỗi lớp được kết nối với các lớp mà nó phụ thuộc vào. Sự thể hiện tất cả các lớp của bạn và các phụ thuộc giữ chúng tạo nên application graph (biểu đồ ứng dụng). Như biểu đồ trên bạn có thể thấy sự trừu tượng của nó. Khi class A (ViewModel) phụ thuộc vào class B (Repository) thì sẽ có một mũi tên từ A đến B chỉ sự phụ thuộc đó. 

Dependency injection giúp thực hiện các kết nối này và cho phép chúng ta swap các triển khai cho testing. Ví dụ khi testing ViewModel, class phụ thuộc và Repository, chúng ta có thể dễ dàng test các triển khai của Repository với fakes hoặc mocks để kiếm tra các trường hợp khác nhau.
## 3. Basic of manual dependency injection
Phần này sẽ hướng dẫn Dependency injection thủ công trong ứng dụng thực Android. Sẽ cho bạn biết cách sử dụng DI trong ứng dụng của mình như thế nào. Các tiếp cận thủ công này sẽ cho bạn hiểu được bản chất của Dagger, nhưng sau này bạn có thể dùng nó một cách tự động.

Xem xét một luồng là một nhóm các màn hình trong ứng dụng phục vụ một tính năng nào đó. Login, Registration, checkout là những ví dụ về luồng.

Một flow đăng nhập của ứng dụng Android thông thường, LoginActivity phụ thuộc vào LoginViewModel, LoginViewModel lại phụ thuộc vào UserRepository. Rồi UserRepository lại phụ thuộc vào UserLocalDataSource và UserRemoteDataSource, UserRemoteDataSource lại phụ thuộc và Retrofit Service, ...
![](https://images.viblo.asia/b977a4cf-287c-469a-be94-382295218500.png)
LoginActivity là đầu vào của luồng đăng nhập, và là nơi người dùng tương tác. Do đó, LoginActivity cần tạo ra LoginViewModel với tất cả các phụ thuộc của nó. 

Các lớp Repository và DataSource sẽ trông như thế này
```Java
class UserLocalDataSource {
    public UserLocalDataSource() { }
    ...
}

class UserRemoteDataSource {

    private final Retrofit retrofit;

    public UserRemoteDataSource(Retrofit retrofit) {
        this.retrofit = retrofit;
    }

    ...
}

class UserRepository {

    private final UserLocalDataSource userLocalDataSource;
    private final UserRemoteDataSource userRemoteDataSource;

    public UserRepository(UserLocalDataSource userLocalDataSource, UserRemoteDataSource userRemoteDataSource) {
        this.userLocalDataSource = userLocalDataSource;
        this.userRemoteDataSource = userRemoteDataSource;
    }

    ...
}
```
Đây là code trong LoginActivity:
```Java
public class MainActivity extends Activity {

    private LoginViewModel loginViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // In order to satisfy the dependencies of LoginViewModel, you have to also
        // satisfy the dependencies of all of its dependencies recursively.
        // First, create retrofit which is the dependency of UserRemoteDataSource
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://example.com")
                .build()
                .create(LoginService.class);

        // Then, satisfy the dependencies of UserRepository
        UserRemoteDataSource remoteDataSource = new UserRemoteDataSource(retrofit);
        UserLocalDataSource localDataSource = new UserLocalDataSource();

        // Now you can create an instance of UserRepository that LoginViewModel needs
        UserRepository userRepository = new UserRepository(localDataSource, remoteDataSource);

        // Lastly, create an instance of LoginViewModel with userRepository
        loginViewModel = new LoginViewModel(userRepository);
    }
}
```
Với cách tiếp cận cũ này sẽ có vấn đề sau:
1. Có rất nhiều code được viết ra. Nếu ta muốn tạo ra một LoginViewModel trong một nơi khác ta phải duplicate đoạn code trên.
2. Sự phụ thuộc phải được khái báo thứ tự thì mới chạy được. Ta phải tạo Retrofit trước RemoteDataSource, phải tạo các DataSource trước UserRepository, phải tạo UserRepository trước LoginViewModel.
3. Thật khó để sử dụng lại các object. Nếu bạn muốn sử dụng lại UserRepository trên nhiều tính năng khác, bạn phải cho nó follow theo singleton pattern. Nhưng singleton pattern làm cho việc testing trở nên khó khăn bởi vì tất cả các trường hợp test chỉ có đối tượng của UserRepository tạo ra.
## 4. Managing dependency with a container
Để giải quyết vấn đề tái sử dụng object trên, ta có thể tạo ra một lớp dependencies container để dùng chứa các phụ thuộc. Tất cả các thể hiện được cung cấp bởi lớp này có thể để ở trạng thái public. Trong ví dụ trên ta chỉ cần một thể hiện của UserRepository và có thể dùng nhiều nơi. Có thể đặt các dependencies private và khi nào được cung cấp thì chuyển sang public.
Java:
```Java
// Container of objects shared across the whole app
public class AppContainer {

    // Since you want to expose userRepository out of the container, you need to satisfy
    // its dependencies as you did before
    private Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("https://example.com")
            .build()
            .create(LoginService.class);

    private UserRemoteDataSource remoteDataSource = new UserRemoteDataSource(retrofit);
    private UserLocalDataSource localDataSource = new UserLocalDataSource();

    // userRepository is not private; it'll be exposed
    public UserRepository userRepository = new UserRepository(localDataSource, remoteDataSource);
}
```
Bởi vì những dependencies này được sử dụng trên toàn bộ ứng dụng, chúng cần được đặt ở một nơi chung mà tất cả các Activity có thể sử dụng: Application class. Tạo mộ lớp custom application chứa một thể hiện của AppContainer.
```Java
// Custom Application class that needs to be specified
// in the AndroidManifest.xml file
public class MyApplication extends Application {

    // Instance of AppContainer that will be used by all the Activities of the app
    public AppContainer appContainer = new AppContainer();
}
```
Chú ý rằng AppContainer chỉ là một class thông thường với một thể hiện duy nhất được chia sẻ và đặt trong Application Class. Và nó không theo singleton pattern (Không phải là object trong Kotlin, và Java, không được truy cập bằng phương thức Singleton.getInstance() điển hình)

Bây giờ ta có thể lấy thể hiện của AppContainer từ ứng dụng và nhận được chia sẻ của các cá thể UserRepository.
```Java
public class MainActivity extends Activity {

    private LoginViewModel loginViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Gets userRepository from the instance of AppContainer in Application
        AppContainer appContainer = ((MyApplication) getApplication()).appContainer;
        loginViewModel = new LoginViewModel(appContainer.userRepository);
    }
}
```
Trong ví dụ này bạn không có một Singleton của UserRepository. Thay vào đó bạn có một AppContainer được chia sẻ cho các Activity.
Nếu LoginViewModel là cần thiết ở nhiều nơi trong ứng dụng. Có một nơi tập trung mà bạn tạo ra thể hiện của nó. Ta có thể tạo LoginViewModel trong container và cung cấp các đối tượng mới theo Factory.
```Java
// Definition of a Factory interface with a function to create objects of a type
public interface Factory {
    T create();
}

// Factory for LoginViewModel.
// Since LoginViewModel depends on UserRepository, in order to create instances of
// LoginViewModel, you need an instance of UserRepository that you pass as a parameter.
class LoginViewModelFactory implements Factory {

    private final UserRepository userRepository;

    public LoginViewModelFactory(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public LoginViewModel create() {
        return new LoginViewModel(userRepository);
    }
}
```
Sau đó ta có thể khai báo LoginViewModelFactory trong AppContainer và lấy được LoginViewModel ở LoginActivity.
```Java
// AppContainer can now provide instances of LoginViewModel with LoginViewModelFactory
public class AppContainer {
    ...

    public UserRepository userRepository = new UserRepository(localDataSource, remoteDataSource);

    public LoginViewModelFactory loginViewModelFactory = new LoginViewModelFactory(userRepository);
}

public class MainActivity extends Activity {

    private LoginViewModel loginViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Gets LoginViewModelFactory from the application instance of AppContainer
        // to create a new LoginViewModel instance
        AppContainer appContainer = ((MyApplication) getApplication()).appContainer;
        loginViewModel = appContainer.loginViewModelFactory.create();
    }
}
```
Các tiếp cận này tốt hơn phương pháp trên đó nhưng vẫn còn một số thứ cần xem xét:
1. Bạn phải tự quản lý AppContainer, tạo các thể hiện của dependencies bằng tay. 
2. Vẫn rất còn nhiều code phải viết. Bạn cần tạo ra các factories và các tham số bằng tay tùy thuộc bạn có muôn sử dụng một đối tượng hay không.
## 5. Managing dependencies in application flows
AppContainer sẽ trở nên cồng kềnh khi ứng dụng có nhiều chức năng. Khi ứng dụng lớn ta lại bắt đầu thực hiện những bước tương tự, thậm chí còn nhiều thứ phát sinh:
1. Khi bạn có các luồng tính năng khác nhau, bạn cũng có thể chỉ muốn các đối tượng chỉ sống trong phạm vi vùng đó. Ví dụ trong trường hợp bạn tạo một LoginUserData (gồm username và password) thì bạn không muốn lưu trữ dữ liệu từ luồng đăng nhập cũ từ một người dùng khác. Bạn cần một dữ liệu mới cho luồng mới. Bạn có đạt được điều đó bằng cách tạo ra đối tượng FlowContainer trong AppContainer (ví dụ ở bên dưới)
2. Tối ưu hóa Application Graph và flow containers có thể khó khăn. 

Chúng ta hãy tạo một LoginContainer. Ta có thể tạo nhiều thế hiện LoginContainer trong ứng dụng nếu muốn, vì vậy thay vì biến nó thành một Singleton hãy biến nó thành một lớp với các phụ thuộc mà luồng đăng nhập cần từ AppContainer
```Java
// Container with Login-specific dependencies
class LoginContainer {

    private final UserRepository userRepository;

    public LoginContainer(UserRepository userRepository) {
        this.userRepository = userRepository;
        loginViewModelFactory = new LoginViewModelFactory(userRepository);
    }

    public LoginUserData loginData = new LoginUserData();

    public LoginViewModelFactory loginViewModelFactory;
}

// AppContainer contains LoginContainer now
public class AppContainer {
    ...
    public UserRepository userRepository = new UserRepository(localDataSource, remoteDataSource);

    // LoginContainer will be null when the user is NOT in the login flow
    public LoginContainer loginContainer;
}
```
Khi bạn có một Container cho một Flow, bạn phải quyết định khi nào tạo và xóa thể hiện của Container. Bởi vì luồng đăng nhập khép kín trong ActivityLogin. Do đó ta tạo thể hiện trong onCreate() và xóa nó trong onDestroy()
```Java
public class LoginActivity extends Activity {

    private LoginViewModel loginViewModel;
    private LoginData loginData;
    private AppContainer appContainer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        appContainer = ((MyApplication) getApplication()).appContainer;

        // Login flow has started. Populate loginContainer in AppContainer
        appContainer.loginContainer = new LoginContainer(appContainer.userRepository);

        loginViewModel = appContainer.loginContainer.loginViewModelFactory.create();
        loginData = appContainer.loginContainer.loginData;
    }

    @Override
    protected void onDestroy() {
        // Login flow is finishing
        // Removing the instance of loginContainer in the AppContainer
        appContainer.loginContainer = null;

        super.onDestroy();
    }
}
```
## 6. Kết luận
Dependency injection là một kỹ thuật tốt để tạo ra các ứng dụng Android có thể mở rộng và dễ dàng để testing. Sử dụng các Containers như một cách để chia sẻ các thể hiện của các phần khác nhau trong ứng dụng, hay nói cách khác nó là nơi tập trung để tạo ra các thể hiện của các lớp (using factories)

Khi ứng dụng của bạn lớn hơn, bạn sẽ bắt đầu thấy rằng bạn phải viết rất nhiều code (như factories), do đó có thể dễ bị lỗi. Bạn cũng phải tự mình quản lý phạm vi và vòng đời của các container, tối ưu hóa và loại bỏ các container không cần thiết để giải phóng bộ nhớ. Điều này nếu không làm chính xác có thể dẫn đến những lỗi rất tinh vi hay là memory leaks (rò rỉ bộ nhớ) trong ứng dụng của bạn. Đây chính là nhược điểm của cách dùng Dagger thủ công

Trong phần tới mình sẽ chia sẽ cách dùng Dagger một cách tự động. Những kiến thức chia sẻ này mình tham khảo của Google, cám ơn bạn đã theo dõi bài viết.