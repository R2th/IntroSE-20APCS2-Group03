## 1. Tổng quan
Một project có nhiều module Gradle được gọi là mutil-module project. Trong một mutil-module project, vận chuyển file APK không có dynamic feature, thông thường có một app module có thể phụ thuộc hầu hết các module khác và một base module hoặc core module mà phần còn lại của các module thường phụ thuộc vào. Module App thường chứa các lớp ứng dụng của chúng ta, trong khi Base Module chứa các lớp chung được chia sẻ trong dự án

Module App là nơi thích hợp để khai báo các thành phần ứng dụng (ví dụ như ApplicationComponent như hình ảnh bên dưới), có thể cung cấp các đối tượng mà các thành phần khác có thể cần cũng như các singleton của ứng dụng. Ví dụ như các lớp OkHttpClient, JSON parser, trình truy cập Database, hoặc SharedPreferences có thể được xác định trong Core Module, sẽ được cung cấp bởi ApplicationComponent được xác định trong Module App.

Trong module app ta có thể có các components với sự sống ngắn hơn. Một ví dụ đó là UserComponents với cấu hình đặc biệt cho Người dùng (như UserSession) sau khi đăng nhập

Trong các module khác nhau của dự án, ta có thể định nghĩa ít nhất một thành phần con có logic cụ thể cho module đó như hình
![](https://images.viblo.asia/65f04eef-4c4a-444b-ba2b-2e6fb3705ccc.png)

Ví dụ: Trong module login ta có thể có một LoginComponent có phạm vi với anotation @ModuleScope, nó cung cấp các đối tượng phổ biến cho tính năng đó, chẳn hạn như LoginRepository. Bên trong module đó ta cũng có thể có các thành phần khác phụ thuộc vào LoginComponent với phạm vi tùy chỉnh khác. Ví dụ @FeatureScope cho LoginActivityComponent hoặc một TermsAndConditionsComponent nơi ta có thể giới hạn nhiều logic đặc trưng hơn như đối tượng ViewModel

Đối với các module khác ví dụ như Registration, ta sẽ có mộ thiết lập tương tự.

Một quy tắc chung cho một project đa module đó là các module cùng cấp không nên phụ thuộc lẫn nhau. Nếu làm như vậy hãy xem xét liệu logic chia sẻ (phần phụ thuộc) có nên là một  phần của parent module hay không. Nếu không hãy tạo một module mới kế thừa parent module và 2 module ban đầu kế thừa module mới này. 

Một cách thực hiện tốt nhất, ta thường sẽ tạo một thành phần trong module ở các trường hợp sau:

- Ta cần thực hiện field injection, như với LoginActivityComponent
- Ta cần phải giới hạn các đối tượng, như với LoginComponent

Nếu cả hai trường hợp này bạn không sử dụng và ta cần cho Dagger biết cách cung cấp các đối tượng từ module đó, tạo và hiển thị moduel Dagger bằng các phương thức @Provider hoặc @Binds nếu không thể thực hiện construction injection cho các lớp đó. 

## 2. Implement các thành phần con của Dagger
Ví dụ nếu ta nghĩ về một luồng Login thông thường, và code ta có ở bài trước sẽ không biên dịch được nữa
```Java
public class LoginActivity extends Activity {
    ...

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Creation of the login graph using the application graph
        loginComponent = ((MyApplication) getApplicationContext())
                                .appComponent.loginComponent().create();

        // Make Dagger instantiate @Inject fields in LoginActivity
        loginComponent.inject(this);

        ...
    }
}
```
Lý do để module login không biết về MyApplication hoặc appComponent. Để làm cho nó hoạt động, bạn cần xác định một interface trong feature module, cái mà cung cấp một FeatureComponent mà MyApplication cần triển khai.

Trong ví dụ sau, ta có thể xác định interface LoginComponentProvider cung cấp LoginComponent trong login module cho luồng Login
```Java
public interface LoginComponentProvider {
   public LoginComponent provideLoginComponent();
}
```
Bây giờ LoginActivity sẽ sử dụng interface đó thay vì đoạn code ở trên
```Java
public class LoginActivity extends Activity {
    ...

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        loginComponent = ((LoginComponentProvider) getApplicationContext())
                                .provideLoginComponent();

        loginComponent.inject(this);

        ...
    }
}
```
Bây giờ MyApplication cần triển khai interface đó và thực hiện các phương thức cần thiết
```Java
public class MyApplication extends Application implements LoginComponentProvider {
  // Reference to the application graph that is used across the whole app
  ApplicationComponent appComponent = DaggerApplicationComponent.create();

  @Override
  public LoginComponent provideLoginComponent() {
    return appComponent.loginComponent.create();
  }
}
```
Đây là cách ta có thể sử dụng các thành phần con của Dagger trong dự án đa module. Với dynamic feature module, giải pháp khác nhau tùy thuộc vào cách các module phụ thuộc lẫn nhau.
## 3. Phụ thuộc thành phần với các dynamic feature module
Với dynamic feature module, cách các module thường vụ thuộc vào nhau được đảo ngược. Thay vì app module, bao gồm cả feature modules, dynamic feature modules phụ thuộc vào app module
![](https://images.viblo.asia/671199f4-739d-4270-a84d-ca42a80b18f5.png)
Trong Dagger, các component cần biết về các subcomponent của chúng. Thông tin này bao gồm một Dagger module được add vào một parent component 

Thật không may với sự đảo ngược phụ thuộc giữa app module và dynamic feature module, subcomponent không thể nhìn thấy từ app module bởi vì nó không năm trong build path. Ví dụ LoginComponent được xác định trong dynamic feature module không thể là subcomponent của ApplicationComponent define trong module app

Dagger có một cơ chế gọi là component dependecies mà ta có thể sử dụng để giải quyết vấn đề này. Thay vì child component là subcomponent của parent component thì child phụ thuộc vào parent component. Cùng với đó không có mối quan hệ parent - child; bây giờ các components phụ thuộc từ nơi khác để có được sự phụ thuộc nhất định. 

Phía dưới là các định nghĩa cho các class và AppComponent là một phần của app Gradle module.
```Java
// UserRepository's dependencies
public class UserLocalDataSource {

    @Inject
    public UserLocalDataSource() {}
}

public class UserRemoteDataSource {

    @Inject
    public UserRemoteDataSource() { }
}

// UserRepository is scoped to AppComponent
@Singleton
public class UserRepository {

    private final UserLocalDataSource userLocalDataSource;
    private final UserRemoteDataSource userRemoteDataSource;

    @Inject
    public UserRepository(UserLocalDataSource userLocalDataSource, UserRemoteDataSource userRemoteDataSource) {
        this.userLocalDataSource = userLocalDataSource;
        this.userRemoteDataSource = userRemoteDataSource;
    }
}

@Singleton
@Component
public interface ApplicationComponent { ... }
```
Nếu login gradle module bao gồm app module, ta có một LoginActivity cần một thể hiện LoginViewmodel để được inject.
```Java
// LoginViewModel depends on UserRepository that is scoped to AppComponent
public class LoginViewModel {

    private final UserRepository userRepository;

    @Inject
    public LoginViewModel(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```
LoginViewModel có một phụ thuộc vào UserRepository và nằm trong phạm vi AppComponent. Hãy tạo một LoginComponent phụ thuộc vào AppComponent để inject LoginActivity.
```Java
// Use the dependencies attribute in the Component annotation to specify the
// dependencies of this Component
@Component(dependencies = AppComponent.class)
public interface LoginComponent {

    void inject(LoginActivity loginActivity);
}
```
LoginComponent chỉ định một phụ thuộc vào vào AppComponent bằng cách add nó vào tham số của component anotation. Bởi vì LoginActivity sẽ được inject bởi Dagger, add thêm phương thức inject() vào interface.

Khi tạo một LoginComponent một phiên bản của AppComponent cần được truyền vào. Sử dụng component factory để thực hiện
```Java
@Component(dependencies = AppComponent.class)
public interface LoginComponent {

    @Component.Factory
    interface Factory {
        // Takes an instance of AppComponent when creating
        // an instance of LoginComponent
        LoginComponent create(AppComponent appComponent);
    }

    void inject(LoginActivity loginActivity);
}
```
Bây giờ LoginActivity có thể tạo một thể hiện của LoginComponent và gọi phương thức inject()
```Java
public class LoginActivity extends Activity {

    // You want Dagger to provide an instance of LoginViewModel from the Login graph
    @Inject
    LoginViewModel loginViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Gets appComponent from MyApplication available in the base Gradle module
        AppComponent appComponent = ((MyApplication) getApplicationContext()).appComponent;

        // Creates a new instance of LoginComponent
        // Injects the component to populate the @Inject fields
        DaggerLoginComponent.factory().create(appComponent).inject(this);

        // Now you can access loginViewModel
    }
}
```
LoginViewModel phụ thuộc vào UserRepository, và để LoginComponent có thể truy cập nó từ AppComponent, AppComponent cần phải lộ trong interface.
```Java
@Singleton
@Component
public interface AppComponent {
    UserRepository userRepository();
}
```
Các quy tắc về phạm vi với các component phụ thuộc hoạt động theo cùng một cách với các thành phần con. Bởi vì LoginComponent sử dụng một phiên bản của AppComponent, chúng không thể sử dụng cùng một scope anotation

Nếu bạn muốn scope LoginViewModel thành LoginComponent. Bạn sẽ làm điều đó như trước đây bằng cách sử dụng custom @ActivityScope anotation
```Java
@ActivityScope
@Component(dependencies = AppComponent.class)
public interface LoginComponent { ... }

@ActivityScope
public class LoginViewModel {

    private final UserRepository userRepository;

    @Inject
    public LoginViewModel(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```
## 4. Best practices
- ApplicationComponent phải luôn nằm trong module app
- Tạo các thành phần Dagger trong các module nếu ta cần thực hiện field inject trong module đó hoặc bạn cần giới hạn đối tượng cho một luồng cụ thể trong ứng dụng
- Đối với các Gradle module là các utilities hoặc helpers và không cần xây dựng một graph (đó là lý do tại sao cần một thành phần Dagger), tạo và hiện thị các module Dagger với @Providers và @Bind của các lớp không hỗ trợ constructor injection
- Để sử dụng Dagger trong Android với dynamic feature modules, sử dụng các component dependencies để truy cập các phụ thuộc được cung cấp bởi ApplicationComponent được xác định trong app module
## 5. Tổng kết
Qua bài viết này mình đã giới thiệu cơ bản cách sử dụng Dagger trong một ứng dụng có nhiều modules. Chắc chắn bài viết mang tính hàn lâm và còn khá khó hiểu. Các bạn cố gắng thực hành và làm nhiều thì sẽ rõ hơn thôi. Cám ơn đã theo dõi bài viết. Để thực hiện được bài viết này mình đã tham khảo tài liệu của Google Android