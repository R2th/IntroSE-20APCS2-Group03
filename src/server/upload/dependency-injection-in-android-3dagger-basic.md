## 1. Mở đầu
Như ở bài trước mình đã trình bày thì việc thực hiện dependency injection một cách thủ công hoặc dịch vụ định vị trong mộ ứng dụng Android có thể có vấn đề tuỳ thuộc vào quy mô dự án của chúng ta. Chúng ta có thể hạn chế sự phức tạp của dự án khi tăng quy mô bằng cách sử dụng Dagger để quản lý các phụ thuộc (dependencies)

Thay vì ta viết DI bằng tay thì Dagger tạo ra mã code tự động, bắt chước mã thủ công của chúng ta. Bởi vì code được tạo tại thời điểm biên dịch nên nó có thể theo dõi và hoạt động hiệu quả hơn các giải pháp dựa trên phản xạ khác. Sau đây chúng ta sẽ tìm hiểu cơ bản về Dagger
## 2. Lợi ích khi sử dụng Dagger
Dagger sẽ giải phóng chúng ta khỏi việc viết nhiều mã code và dễ bị lỗi bằng cách:
- Tạo ra AppContainer code (application graph) mà chúng ta đã triển khai thủ công trong phần trước. Nếu ai chưa hiẻu AppContainer là gì có thể tìm hiểu tại [đây](https://viblo.asia/p/dependency-injection-in-android-2dependency-injection-bang-tay-m68Z0pLXZkG)
- Tạo ra các factories cho các lớp có sẵn trong biểu đồ ứng dụng (application graph). Đây là cách phụ thuộc thoả mãn yêu cầu trong nội bộ ứng dụng.
- Sử dụng lại một phụ thuộc (dependency) hoặc tạo các thể hiện mới của một loại tuỳ thuộc vào cách ta cấu hình loại sử dụng phạm vi (scopes)
- Tạo các Containers cho các luồng cụ thể như ta đã làm với luồng Login trong phần trước bằng cách sử dụng thành phần trong Dagger. Điều này cải thiện hiệu suất của ứng dụng của ta bằng cách giải phóng các đối tượng trong bộ nhớ khi chúng không còn cần thiết.

Dagger tự động thực thiện tất cả những điều này trong thời gian build, miễn là ta khai báo các dependencies của một lớp và chỉ định các thoả mãn của chúng bằng các anotaions (chú thích). Dagger tạo ra mã code tương tự như chúng ta tạo bằng tay. Trong nội bộ thì Dagger tạo ra một biểu đồ các đối tượng có thể tham chiếu để tìm cách cung cấp thể hiện của một lớp. Đối với mỗi lớp trong biểu đồ, Dagger tạo ra một lớp loại factory-type mà nó sử dụng bên trong để lấy các instance của loại đó.

Tại thời gian build, Dagger đi qua mã code và:
- Build và xác nhận các biểu đồ phụ thuộc, đảm bảo rằng:

1.Mọi phụ thuộc của đối tượng đều có thể được thoả mãn, do đó không có Exceptions trong lúc runtime

2.Không có chu kỳ thụ thuộc tồn tại (dependency cycles), vì thế không có vòng lặp vô hạn

- Tạo ra các lớp được sử dụng trong thời gian runtime để tạo các đối tượng thực tế và các phụ thuộc của chúng.
## 3. Một trrường hợp đơn giản sử dụng trong Dagger: Tạo một factory
Để giải thích cách chúng ta có thể làm việc với Dagger, hãy tạo một factory đơn giản cho các lớp UserRepository được hiện thị trong sơ đồ sau: 
![](https://images.viblo.asia/7a3d6943-8f67-4734-b77f-70ad2b1c9d4a.png)
Xác định UserRepository như sau

Kotlin code:
```Kotlin
class UserRepository(
    private val localDataSource: UserLocalDataSource,
    private val remoteDataSource: UserRemoteDataSource
) { ... }
```
Java code:
```Java
public class UserRepository {

    private final UserLocalDataSource userLocalDataSource;
    private final UserRemoteDataSource userRemoteDataSource;

    public UserRepository(UserLocalDataSource userLocalDataSource, UserRemoteDataSource userRemoteDataSource) {
        this.userLocalDataSource = userLocalDataSource;
        this.userRemoteDataSource = userRemoteDataSource;
    }

    ...
}
```
Thêm một anotation là @Inject vào constructor của UserRepository để Dagger biết cách tạo UserRepository:

Kotlin code:
```Kotlin
// @Inject lets Dagger know how to create instances of this object
class UserRepository @Inject constructor(
    private val localDataSource: UserLocalDataSource,
    private val remoteDataSource: UserRemoteDataSource
) { ... }
```
Java code:
```Java
public class UserRepository {

    private final UserLocalDataSource userLocalDataSource;
    private final UserRemoteDataSource userRemoteDataSource;

    // @Inject lets Dagger know how to create instances of this object
    @Inject
    public UserRepository(UserLocalDataSource userLocalDataSource, UserRemoteDataSource userRemoteDataSource) {
        this.userLocalDataSource = userLocalDataSource;
        this.userRemoteDataSource = userRemoteDataSource;
    }
}
```
Trong đoạn code trên, ta đang bảo với Dagger:

1, Cách tạo một thể hiện UserRepository với chú thích @Inject ở Constructor

2, Phụ thuộc của nó là: UserLocalDataSource và UserRemoteDataSource

Bây giờ Dagger biết cách tạo một thể hiện của UserRepository, nhưng nó không biết cách tạo ra các phụ thuộc. Nếu ta chú thích các lớp khác nữa, Dagger biết cách tạo chúng:

Kotlin code:
```Kotlin
// @Inject lets Dagger know how to create instances of these objects
class UserLocalDataSource @Inject constructor() { ... }
class UserRemoteDataSource @Inject constructor() { ... }
```
Java code:
```Java
public class UserLocalDataSource {
    @Inject
    public UserLocalDataSource() { }
}

public class UserRemoteDataSource {
    @Inject
    public UserRemoteDataSource() { }
}
```
## 4. Dagger Components
Dagger có thể tạo một biều đồ về các phụ thuộc trong dự án của ta mà nó có thể sử dụng để tìm ra nơi cần lấy các phụ đó khi cần. Để cho Dagger làm được điều này, ta cần tạo một interface và chú thích nó là @Compopnent. Dagger tạo ra một container (thùng chứa) như ta đã làm với phương pháp thủ công. 

bên trong @Components interface, ta có thể định nghĩa các phương thức trả về và các thể hiện của các lớp ta cần (ví dụ UserRepository). @Component bảo Dagger tạo ra một container với các dependencies cần thiết đeer đáp ứng các loại mà nó trình bày. Đây gọi là Dagger Component, nó chưa một biểu đồ gồm các đối tượng mà Dagger biết cách cung cấp và các dependencies tương ứng của chúng.

Kotlin code:
```Kotlin
// @Component makes Dagger create a graph of dependencies
@Component
interface ApplicationGraph {
    // The return type  of functions inside the component interface is
    // what can be provided from the container
    fun repository(): UserRepository
}
```
Java code:
```Java
// @Component makes Dagger create a graph of dependencies
@Component
public interface ApplicationGraph {
    // The return type  of functions inside the component interface is
    // what can be consumed from the graph
    UserRepository userRepository();
}
```
Khi ta build project, Dagger tạo ra một triển khai giao diện ApplicationGraph cho ta: DaggerApplicationGraph. Với bộ chú thích của nó, Dagger tạo ra một biểu đồ phụ thuộc bao gồm các mối quan hệ giữa 3 lớp (UserRepository, UserLocalDataSource, UserRemoteDataSource) với chỉ một điểm nhập: Lấy ví dụ UserRepository, ta có thể sử dụng nó như sau:

Kotlin code:
```Kotlin
// Create an instance of the application graph
val applicationGraph: ApplicationGraph = DaggerApplicationGraph.create()
// Grab an instance of UserRepository from the application graph
val userRepository: UserRepository = applicationGraph.repository()
```
Java code:
```Java
// Create an instance of the application graph
ApplicationGraph applicationGraph = DaggerApplicationGraph.create();

// Grab an instance of UserRepository from the application graph
UserRepository userRepository = applicationGraph.userRepository();
```
Dagger tạo một phiên bản mới của UserRepository mỗi khi nó được yêu cầu.

Kotlin code:
```Kotlin
val applicationGraph: ApplicationGraph = DaggerApplicationGraph.create()

val userRepository: UserRepository = applicationGraph.repository()
val userRepository2: UserRepository = applicationGraph.repository()

assert(userRepository != userRepository2)
```
Java code:
```Java
ApplicationGraph applicationGraph = DaggerApplicationGraph.create();

UserRepository userRepository = applicationGraph.userRepository();
UserRepository userRepository2 = applicationGraph.userRepository();

assert(userRepository != userRepository2)
```
Thỉnh thoảng ta cần có thể hiện duy nhất về sự phụ thuộc trong một container. Ta có thể muốn điều này vì một số lý do sau:

1, Bạn muốn có các loại khác có loại phụ thuộc này để chia sẻ cùng một instance, chẳng hạn như nhiều đối tượng ViewModel trong flow login, bằng cách sử dụng chung một LoginUserData

2, Một đối tượng rất tốt kém để tạo và ta không muốn tạo một instance mới mỗi khi nó được khia báo là một dependency (ví dụ như JSON parser)

Ở ví dụ trên ta cũng có thể chỉ cho phép chỉ có một instance của UserRepository được tạo ra. Điều này hữu ích trong ứng dụng thức tế, chẳng hạn như nhiều ViewModel cùng phụ thuộc vào UserRepository, và ta không muốn tạo thêm nhiều thể hiện của UserLocalDataSource và UserRemoteDataSource

Trong cách sử dụng thủ công, ta chuyển UserRepository vào constructor của ViewModel. Trong Dagger ta phải cho nó biết ta chỉ muốn tạo ra một instance UserRepository mà thôi. Việc này có thể thực hiện được với Scope anotations.
## 5. Scoping with Dagger
Ta có thể sử dụng scope anotations để giới hạn thời gian tồn tại của một đối tượng trong vòng đời thành phần. Điều này có nghĩa là cùng một thể hiện của một dependency được sử dụng mỗi khi cần nó.

Để có một thể hiện duy nhất của UserRepository khi ta yêu cầu trong ApplicationGraph, sử dụng cùng một scope anotation cho interface @Component và UserRepository. Ta có thể sử dụng chú thích @Singleton đi kèm với gói javax.inject mà Dagger sử dụng:

Kotlin code:
```Kotlin
// Scope annotations on a @Component interface informs Dagger that classes annotated
// with this annotation (i.e. @Singleton) are bound to the life of the graph and so
// the same instance of that type is provided every time the type is requested.
@Singleton
@Component
interface ApplicationGraph {
    fun repository(): UserRepository
}

// Scope this class to a component using @Singleton scope (i.e. ApplicationGraph)
@Singleton
class UserRepository @Inject constructor(
    private val localDataSource: UserLocalDataSource,
    private val remoteDataSource: UserRemoteDataSource
) { ... }
```
Java code:
```Java
// Scope annotations on a @Component interface informs Dagger that classes annotated
// with this annotation (i.e. @Singleton) are scoped to the graph and the same
// instance of that type is provided every time the type is requested.
@Singleton
@Component
public interface ApplicationGraph {
    UserRepository userRepository();
}

// Scope this class to a component using @Singleton scope (i.e. ApplicationGraph)
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
```
Ngoài ra, ta có thể tạo và sử dụng scope anotations tuỳ chỉnh. Ta có thể tạo một scope anotation như sau:

Kotlin code:
```Kotlin
// Creates MyCustomScope
@Scope
@MustBeDocumented
@Retention(value = AnnotationRetention.RUNTIME)
annotation class MyCustomScope
```
Java code:
```Java
// Creates MyCustomScope
@Scope
@Retention(RetentionPolicy.RUNTIME)
public @interface MyCustomScope {}
```
Sau đó ta có thể sử dụng như trước

Kotlin code:
```Kotlin
@MyCustomScope
@Component
interface ApplicationGraph {
    fun repository(): UserRepository
}

@MyCustomScope
class UserRepository @Inject constructor(
    private val localDataSource: UserLocalDataSource,
    private val service: UserService
) { ... }
```
Java code:
```Java
@MyCustomScope
@Component
public interface ApplicationGraph {
    UserRepository userRepository();
}

@MyCustomScope
public class UserRepository {

    private final UserLocalDataSource userLocalDataSource;
    private final UserRemoteDataSource userRemoteDataSource;

    @Inject
    public UserRepository(UserLocalDataSource userLocalDataSource, UserRemoteDataSource userRemoteDataSource) {
        this.userLocalDataSource = userLocalDataSource;
        this.userRemoteDataSource = userRemoteDataSource;
    }
}
```
Trong cả hai trường hợp, đối tượng được cung cấp cùng sử dụng scope anotation với interface @Component. Do đó mỗi khi ta gọi applicationGraph.repository(), ta sẽ nhận được cùng một thể hiện của UserRepository

Kotlin code:
```Kotlin
val applicationGraph: ApplicationGraph = DaggerApplicationGraph.create()

val userRepository: UserRepository = applicationGraph.repository()
val userRepository2: UserRepository = applicationGraph.repository()

assert(userRepository == userRepository2)
```
Java code:
```Java
ApplicationGraph applicationGraph = DaggerApplicationGraph.create();

UserRepository userRepository = applicationGraph.userRepository();
UserRepository userRepository2 = applicationGraph.userRepository();

assert(userRepository == userRepository2)
```
## 6. Tổng kết
Vậy là qua bài viết này mình đã trình bày cơ bản những hiểu biết về Dagger, mong các bạn đọc và góp ý. Xin chân thành cảm ơn :D