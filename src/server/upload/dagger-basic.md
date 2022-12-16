# Dagger basic
Manual dependency injection hoặc service locators trong ứng dụng Android có thể gặp vấn đề tùy thuộc vào quy mô dự án của bạn. Bạn có thể hạn chế sự phức tạp của dự án khi nó tăng quy mô bằng cách sử dụng [Dagger](https://dagger.dev/) để quản lý các dependencies.

Dagger tự động tạo code bắt chước code mà bạn có thể viết bằng tay. Bởi vì code được tạo tại thời điểm biên dịch, nó có thể truy nguyên và hiệu suất cao hơn các giải pháp dựa trên reflection-based khác như [Guice](https://en.wikipedia.org/wiki/Google_Guice).

## Lợi ích của việc sử dụng Dagger

* Generating AppContainer code (application graph) mà bạn đã triển khai thủ công trong phần manual DI.
* Tạo các factory cho các class có sẵn trong application graph. Đây là cách DI được triển khai.
* Quyết định xem có nên sử dụng lại một dependency  hay tạo một instance mới thông qua việc sử dụng scopes.
* Tạo các containers cho các luồng cụ thể như bạn đã làm với luồng đăng nhập trong phần trước bằng cách sử dụng các thành phần con Dagger. Điều này cải thiện hiệu suất của ứng dụng của bạn bằng cách giải phóng các đối tượng trong bộ nhớ khi chúng không còn cần thiết.

Dagger tự động thực hiện tất cả những điều này vào thời gian build miễn là bạn khai báo các dependencies của một class và chỉ định cách triển khai chúng bằng cách sử dụng các annotations. Dagger tạo code tương tự như những gì bạn sẽ viết bằng tay. Trong đó, Dagger tạo ra một biểu đồ các object mà nó có thể tham chiếu để tìm cách cung cấp một instance của một class. Đối với mỗi class trong graph, Dagger tạo ra một [factory-type](https://en.wikipedia.org/wiki/Factory_method_pattern) class mà nó sử dụng bên trong để lấy các instance của loại đó.

Trong build time, Dagger dạo qua code và:

* Build và xác nhận các dependency graphs, đảm bảo rằng:
- Mọi dependencies của đối tượng đều có thể được thỏa mãn, do đó không có runtime exception.
- Không có dependency cycles, do đó không có vòng lặp vô hạn
* Tạo các class được sử dụng trong run time để tạo các đối tượng thực tế và các dependency của chúng.

## Trường hợp sử dụng đơn giản trong Dagger: Tạo factory

Để giải thích đơn giản làm thế nào để có thể làm việc với Dagger, hãy tạo một factory đơn giản cho **UserRepository** class như sau:

![](https://images.viblo.asia/ae8ee4d2-ff82-4fc5-94a2-0f52f40b468f.png)

UserRepository:

```kotlin
class UserRepository(
    private val localDataSource: UserLocalDataSource,
    private val remoteDataSource: UserRemoteDataSource
) { ... }
```

Thêm một annotation **@Inject** vào constructor của **UserRepository** để Dagger biết cách tạo **UserRepository**

```kotlin
// @Inject lets Dagger know how to create instances of this object
class UserRepository @Inject constructor(
    private val localDataSource: UserLocalDataSource,
    private val remoteDataSource: UserRemoteDataSource
) { ... }
```

Trong đoạn code trên, bạn đã thông báo cho Dagger:
1. Làm thế nào để tạo **UserRepository** instance với annonated constructor **@Inject**
2. Dependency của nó là gì: **UserLocalDataSource** và **UserRemoteDataSource**

Bây giờ Dagger đã biết làm thế nào để tạo instance của **UserRepository**, nhưng nó không biết làm thế nào để tạo dependency của nó. Nếu bạn cũng annonate các class khác, Dagger sẽ biết tạo như thế nào:

```kotlin
// @Inject lets Dagger know how to create instances of these objects
class UserLocalDataSource @Inject constructor() { ... }
class UserRemoteDataSource @Inject constructor() { ... }
```

## Dagger components

Dagger có thể tạo một biểu đồ về các dependencies trong project của bạn mà nó có thể sử dụng để tìm ra nơi cần lấy các dependencies đó khi cần. Để Dagger làm được điều này, bạn cần tạo một interface  và annonate nó với **@Component**. Dagger tạo ra một container như bạn đã làm với phương pháp manual DI.

Bên trong **@Component** interface, bạn có thể định nghĩa các hàm trả về các instance của các class bạn cần (ví dụ: **UserRepository**). **@Component** sẽ nói cho Dagger generate một container với tất cả các dependency bắt buộc để thỏa mãn require. Nó được gọi là *Dagger component*; nó bao gồm biểu đồ các object mà Dagger biết cách cung cấp và các dependency tương ứng của chúng.

```kotlin
// @Component makes Dagger create a graph of dependencies
@Component
interface ApplicationGraph {
    // The return type  of functions inside the component interface is
    // what can be provided from the container
    fun repository(): UserRepository
}
```

Khi bạn build project, Dagger tạo ra một implementation của interface **ApplicationGraph** cho bạn: **DaggerApplicationGraph**. Với bộ xử lý annotation của nó, Dagger tạo ra một biểu đồ dependency  bao gồm các mối quan hệ giữa ba lớp (**UserRepository**, **UserLocalDatasource** và **UserRemoteDataSource**) chỉ với một entry point: lấy một thể hiện **UserRepository**. Bạn có thể sử dụng nó như sau:

```kotlin
// Create an instance of the application graph
val applicationGraph: ApplicationGraph = DaggerApplicationGraph.create()
// Grab an instance of UserRepository from the application graph
val userRepository: UserRepository = applicationGraph.repository()
```

Dagger tạo một instance mới của **UserRepository** mỗi lần nó được yêu cầu:

```kotlin
val applicationGraph: ApplicationGraph = DaggerApplicationGraph.create()

val userRepository: UserRepository = applicationGraph.repository()
val userRepository2: UserRepository = applicationGraph.repository()

assert(userRepository != userRepository2)
```

Đôi khi, bạn cần có một ví dụ  về dependency trong một container. Bạn có thể muốn điều này vì một số lý do:

1. Bạn muốn các loại khác có loại này làm dependency để chia sẻ cùng một instance, chẳng hạn như nhiều đối tượng **ViewModel** trong luồng đăng nhập bằng cùng một **LoginUserData**.
2. Một object rất khó để tạo và bạn không muốn tạo một instance mới mỗi lần nó được khai báo là dependency (ví dụ JSON parser).

Trong ví dụ này, bạn có thể muốn có một phiên bản **UserRepository** duy nhất có sẵn trong biểu đồ để mỗi lần bạn yêu cầu **UserRepository**, bạn luôn nhận được cùng một instance. Điều này hữu ích trong ví dụ của bạn bởi vì trong một ứng dụng thực tế có biểu đồ ứng dụng phức tạp hơn, bạn có thể có nhiều đối tượng ViewModel tùy thuộc vào **UserRepository** và bạn không muốn tạo phiên bản mới của **UserLocalDataSource** và **UserRemoteDataSource** mỗi khi cần cung cấp **UserRepository** .

Trong manual dependency injection, bạn thực hiện điều này bằng cách chuyển cùng một thể hiện của **UserRepository** cho các hàm tạo của các lớp **ViewModel**; nhưng trong Dagger, vì bạn không viết mã đó theo cách thủ công, bạn phải cho Dagger biết bạn muốn sử dụng cùng một thể hiện. Điều này có thể được thực hiện với các *scope annotaition*.

## Scoping với Dagger

Bạn có thể sử dụng các scope annotations để giới hạn thời gian tồn tại của một đối tượng trong vòng đời của nó. Điều này có nghĩa là cùng một instance của một dependency được sử dụng mỗi khi loại đó cần được cung cấp.

Để có một phiên bản duy nhất của **UserRepository** khi bạn yêu cầu repository trong ApplicationGraph, hãy sử dụng cùng một  scope annotation cho giao diện **@Component** và **UserRepository**. Bạn có thể sử dụng chú thích **@Singleton** đi kèm với gói javax.inject mà Dagger sử dụng:

```kotlin
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

Ngoài ra, bạn có thể tạo và sử dụng scope annotation. Bạn có thể tạo một scope annotation như sau:

```kotlin
// Creates MyCustomScope
@Scope
@MustBeDocumented
@Retention(value = AnnotationRetention.RUNTIME)
annotation class MyCustomScope
```

Và rồi bạn có thể sử dụng như trước:

```kotlin
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

Trong cả 2 trường hợp, object được cung cấp cùng scope được sử dụng để chú thích giao diện **@Component**. Do đó, mỗi khi bạn gọi **applicationGraph.repository()**, bạn sẽ nhận được cùng một instance của **UserRepository**.

```kotlin
val applicationGraph: ApplicationGraph = DaggerApplicationGraph.create()

val userRepository: UserRepository = applicationGraph.repository()
val userRepository2: UserRepository = applicationGraph.repository()

assert(userRepository == userRepository2)
```

## Kết luận

Điều quan trọng là phải nhận thức được lợi ích của Dagger và những điều cơ bản về cách thức hoạt động trước khi bạn có thể sử dụng nó trong các tình huống phức tạp hơn. Trong phần tiếp theo, mình sẽ giới thiệu với các bạn các thêm Dagger vào ứng dụng Android.

Cảm ơn mọi người đã đọc bài của mình :D