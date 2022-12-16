## 1. Cách thực hành tốt nhất
Nếu bạn đã quen với Dagger ở những bài trước thì chúng ta sẽ tiếp tục thôi ^^. Dưới đây là cách thực hành tốt nhất:

*Sử dụng constructor injection với @Inject để thêm các Dagger graph khi nào có thể. Khi nó không:
+ Sử dụng @Binds để báo cho Dagger biết nên thực hiện giao diện nào
+ Sử dụng @Provides để nói với Dagger cách cung cấp các lớp mà dự án của bạn không sở hữu

*Bạn chỉ nên khai báo các modules một lần trong một thành phần (component)

*Đặt tên cho các scope anotation tuỳ thuộc vào vòng đời sử dụng của nó. Ví dụ như @ApplicationScope, @LoggedUserScope, và @ActivityScope
## 2. Thêm các phụ thuộc (Adding dependencies)
Để sử dụng Dagger, bạn thêm các phụ thuộc này vào file build.gradle. Có thể tìm version mới nhất ở [github dagger](https://github.com/google/dagger/releases)
```Java
dependencies {
    implementation 'com.google.dagger:dagger:2.x'
    annotationProcessor 'com.google.dagger:dagger-compiler:2.x'
}
```
## 3. Dagger in Android
Hãy xem xét một ứng dụng Android mẫu với các biểu đồ phụ thuộc dưới đây:
![](https://images.viblo.asia/7a305c56-92ed-4867-bf73-9018cc1b1186.png)
Trong Android bạn thường tạo một biểu đồ Dagger trong lớp ứng dụng vì bạn muốn một thể hiện của biểu đồ nằm trong bộ nhớ miễn là ứng dung đang chạy. Trong trường hợp này biểu đồ gắn vào vòng đời ứng dụng.  Đối với điều đó bạn cũng sẽ cần biẻu đồ trong lớp ứng dụng. Một lợi thế của phương pháp này là các biểu đồ có sẵn trong các lớp Android Framework. Ngoài ra nó đơn giản hoá việc kiểm tra bằng cách cho phép ta sử dụng một lớp ứng dụng tuỳ chỉnh trong các trường hợp test.

Bởi vì giao diện cái mà tạo graph được chú thích với @Component, bạn có thể gọi nó là ApplicationComponent hoặc ApplicationGraph. Ta thường giữ một thể hiện của thành phần đó trong lớp ứng dụng tuỳ chỉnh của mình và gọi nó mỗi khi bạn cần biểu đồ ứng dụng, như được hiển thị trong đoạn code sau:
```Java
// Definition of the Application graph
@Component
public interface ApplicationComponent {
}

// appComponent lives in the Application class to share its lifecycle
public class MyApplication extends Application {

    // Reference to the application graph that is used across the whole app
    ApplicationComponent appComponent = DaggerApplicationComponent.create();
}
```

Bởi vì một số lớp Android framework như ác activity và fragment được hệ thống khởi tạo, Dagger không thể khởi tạo chúng cho chúng ta. Đối với các Activity cụ thể, bất kỳ mã khởi tạo nào cũng cần phải đi vào phương thức onCreate(). Điều đó có nghĩ là ta không thể sử dụng anotation @Inject trong constructor như bạn đã làm ở ví dụ trước. Thay vào đó ta phải sử dụng field injection

Thay vì tạo các phụ thuộc trong một Activity yêu cầu trong phương thức onCreate(), ta muốn Dagger đưa vào những phụ thuộc đó. Để field injection, bạn áp dụng anotation @Inject cho các trường mà bạn muốn lấy từ biểu đồ Dagger
```Java
public class LoginActivity extends Activity {

    // You want Dagger to provide an instance of LoginViewModel from the graph
    @Inject
    LoginViewModel loginViewModel;
}
```
Để cho đơn giản thì LoginViewModel không phải là ViewModel của Architecture Components, nó chỉ là một lớp thông thường hoạt động như ViewModel

Một trong những cân nhắc đối với Dagger đó là các fields được injected không thể là private

Đáng nhẽ phần này mình sẽ giới thiệu chi tiết về inject Activity, Dagger Modules, Dagger Scopes, Dagger subcomponents. .... Do có chút hạn chế về thời gian mình sẽ update sau nhé ^^

## 4. Practices tốt nhất khi xây dựng biểu đồ Dagger
Khi xây dựng một một biểu đồ Dagger cho ứng dụng của bạn:
- Khi bạn tạo một component, bạn nên xem xét phần tử nào chịu trách nhiệm cho vòng đời của component đó. Trong trường hợp này, lớp ứng dụng chịu trách nhiệm về ApplicationComponent và LoginActivity chịu trách nhiêmj về LoginComponent
- Sử dụng scope khi nó có ý nghĩa. Việc lạm dụng scope có thể tác động tiêu cực đến hiệu suất runtime của ứng dụng: đối tượng nằm trong bộ nhớ miễn là thành phần đó nằm trong bộ nhớ và nhận được một đối tượng có phạm vi to hơn. Khi Dagger cung cấp đối tượng, nó sử dụng từ khoá DoubleCheck thay vì cung cấp factory-type
## 5. Testing một project khi sử dụng Dagger
Một trong những lợi ích của việc sử dụng Dependency Injection với Dagger đó là giúp chúng ta testing một cách dễ dàng hơn.
### Unit tests
Ta không phải sử dụng Dagger cho các Unit test. Khi test một class sử dụng constructor injection, ta không cần sử dụng Dagger để khởi tạo lớp đó. Ta có thể gọi trực tiếp constructor của nó mà chuyển trực tiếp các phụ thuộc fake hoặc mock nếu chúng không được chú thích.
```Java
@ActivityScope
public class LoginViewModel {

    private final UserRepository userRepository;

    @Inject
    public LoginViewModel(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}

public class LoginViewModelTest {

    @Test
    public void happyPath() {
        // You don't need Dagger to create an instance of LoginViewModel
        // You can pass a fake or mock UserRepository
        LoginViewModel viewModel = new LoginViewModel(fakeUserRepository);
        assertEquals(...);
    }
}
```
### End-to-end tests
Đối với các integration test, một cách thực hiện tốt là tạo một TestApplicationComponent có nghĩa để testing. Production và testing sử dung một cấu hình component khác nhau.

Điều này đòi hỏi thiết kế modules nhiều hơn các modules thực tế trong ứng dụng. Các component testing mở rộng production component và cài đặt một bộ modules khác nhau.
```Java
// TestApplicationComponent extends from ApplicationComponent to have them both
// with the same interface methods. You need to include the modules of the
// Component here as well, and you can replace the ones you want to override.
// This sample uses FakeNetworkModule instead of NetworkModule
@Singleton
@Component(modules = {FakeNetworkModule.class, SubcomponentsModule.class})
public interface TestApplicationComponent extends ApplicationComponent {
}
```
FakeNetworkModule đã fake implement NetworkModule ban đầu. Ở đó ta có thể cung cấp các trường fake hoặc mock của bất kỳ điều gì mà bạn muốn thay thế.
```Java
// In the FakeNetworkModule, pass a fake implementation of LoginRetrofitService
// that you can use in your tests.
@Module
public class FakeNetworkModule {

    @Provides
    public LoginRetrofitService provideLoginRetrofitService() {
        return new FakeLoginService();
    }
}
```
Trong các integration hoặc end-to-end tests, bạn sẽ sử dụng TestApplication để tạo TestApplicationComponent thay vì ApplicationComponent
```Java
// Your test application needs an instance of the test graph
public class MyTestApplication extends MyApplication {
    ApplicationComponent appComponent = DaggerTestApplicationComponent.create();
}
```
Sau đó ứng dụng testing này được sử dụng trong TestRunner tuỳ chỉnh mà bạn sẽ sử dụng để chạy instrumentation tests. 
## 6.  Làm việc với Dagger modules
Dagger modules là một cách để gói gọn cách cung cấp các đối tượng the cách ngữ nghĩa. Ta có thể bao gồm các modules trong các thành phần nhưng bạn có thể bao gồm các modules bên trong các modules khác. Điều này là mạnh mẽ nhưng cũng dễ dàng sử dụng sai.

Khi một module đã được thêm vào một component hoặc module khác, nó đã có trong biểu đồ Dagger; Dagger can thể cung cấp các đối tượng trong thành phần đó. Trước khi thêm một module, hãy kiểm tra xem module đó phải là một phần của biểu đồ Dagger không bằng cách kiểm tra xem nó đã được thêm vào component hay chưa bằng cách biên dịch chương trình để Daggercos thể tìm thấy các dependencies cần thiết cho module đó không.

Thực tiễn tốt chỉ ra rằng các module chỉ nên được khai báo một lần trong một thành phần

Giả sử bạn có biểu đồ được cấu hình theo cách này. ApplicationComponent bao gồm Module1 và Module2 và Module1 bao gồm ModuleX
```Java
@Component(modules = {Module1.class, Module2.class})
public interface ApplicationComponent { ... }

@Module(includes = {ModuleX.class})
public class Module1 { ... }

@Module
public class Module2 { ... }
```
Nếu bây giờ Module2 phụ thuộc vào các lớp được cung cấp bởi ModuleX. Một thực tiễn xấu là bao gồm các ModuleX trong Module2 vì ModuleX được bao gồm hai lần trong biểu đồ như được thấy rong đoạn code sau:
```Java
// Bad practice: ModuleX is declared multiple times in this Dagger graph.
@Component(modules = {Module1.class, Module2.class})
public interface ApplicationComponent { ... }

@Module(includes = ModuleX::class)
public class Module1 { ... }

@Module(includes = ModuleX::class)
public class Module2 { ... }
```
Thay vào đó, ta nên làm một trong những điều sau đây:
- Tái cấu trúc các module và trích xuất các module chung ra thành phần.
- Tạo một module mới với các đối tượng mà cả hai module chia sẻ và trích xuất nó ra component

Không tái cấu trúc theo cách này dẫn đến rất nhiều module bao gồm lẫn nhau mà không có ý thức rõ ràng về tổ chức và làm cho khó khăn hơn để xem mỗi phụ thuộc đến từ đâu.

Thực hành tốt (option 1): ModuleX được khai báo một lần trong biểu đồ Dagger
```Java
@Component(modules = {Module1.class, Module2.class, ModuleX.class})
public interface ApplicationComponent { ... }

@Module
public class Module1 { ... }

@Module
public class Module2 { ... }
```
Thực hành tốt (option 2): Các phụ thuộc phổ biến từ Module1 và Module2 trong ModuleX được trích xuất ra từ một module mới có tên là ModuleXCommon được bao gồm trong Component. Sau đó hai module có tên ModuleXWithModule1Dependencies và ModuleXWithModule2Dependencies được tạo ra với các phụ thuộc dành riêng cho từng module. Tất cả các module được khai báo một lần trong biểu đồ Dagger
```Java
@Component(modules = {Module1.class, Module2.class, ModuleXCommon.class})
public interface ApplicationComponent { ... }

@Module
public class ModuleXCommon { ... }

@Module
public class ModuleXWithModule1SpecificDependencies { ... }

@Module
public class ModuleXWithModule2SpecificDependencies { ... }

@Module(includes = ModuleXWithModule1SpecificDependencies.class)
public class Module1 { ... }

@Module(includes = ModuleXWithModule2SpecificDependencies.class)
public class Module2 { ... }
```
## 7.  Kết luận
Qua bài viết này thì mình đã giới thiệu một cách cơ bản sử dung Dagger. Để hoàn thành bài viết này mình đã tham khảo tài liệu từ Google Android. Chắc chắn còn nhiều thiếu sót, mình mong nhận được đóng góp từ các bạn và sẽ bổ sung.