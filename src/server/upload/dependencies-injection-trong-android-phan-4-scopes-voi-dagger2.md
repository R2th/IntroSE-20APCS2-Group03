## Lời giới thiệu

Đã bao giờ bạn biết tới Singleton Design pattern chưa? Đôi lúc bạn chỉ muốn có một instance duy nhất trong toàn app vì những lí do sau: 

1.  Nhiều khi một instance rất tốn nhiều bước để tạo và bạn không muốn tạo một instance mới, mà lại được quá nhiều chỗ trong app sử dụng, như là instance RetrofitService, instance JsonParser, instance OkHttpClient. Cho dù cả việc tạo mới đã có Dagger lo, nhưng quá nhiều instance dư thừa sẽ khiến ảnh hưởng memory.

2. Cũng có khi bạn muốn chia sẻ logic chung từ 1 instance ở nhiều nơi, ví dụ như bạn chia sẻ 1 instance LoginViewModel ở UsernameFragment cùng với PasswordFragment.

Nếu quản lí scope trong manual dependencies injection, chúng ta sẽ phải xử lí thủ công truyền cùng 1 instance qua lại 1 giữa các nơi mà sẽ sử dụng nó. Nhưng với Dagger, nó đã giúp bạn tạo ra các instance nên nó cũng có thể giúp bạn sử dụng cùng 1 instance đó ở nhiều nơi, nhờ vào các annotations.

## Singleton scope

Ví dụ chúng ta đang muốn sử dụng  UserRepository trong các tính năng khác của ứng dụng  nhưng không muốn tạo một đối tượng mới bất cứ khi nào cần, bạn có thể chỉ định nó là một đối tượng duy nhất cho toàn bộ ứng dụng. Hoặc với LoginRetrofitService cũng vậy chả hạn: việc tạo có thể tốn công, và bạn cũng muốn một phiên bản duy nhất của đối tượng đó được sử dụng lại.

Để có một instance của UserRepository duy nhất trong ứng dụng  khi bạn yêu cầu Dagger tạo từ Graph, cách thường dùng nhất là chúng ta có thể sử dụng annotation @Singleton. Đây là annotation duy nhất từ `javax.inject` package chứ không phải của Dagger. Chúng ta cũng có thể tự tạo và sử dụng bất cứ scope annotation cho việc unique instance nào khác.
Tuy nhiên dùng annotation nào thì chúng ta sẽ phải sử dụng cho ở cả Component cung cấp unique instance đó luôn

```
// Dùng annotation @Singleton tại interface Component này thông báo cho Dagger rằng cứ hễ class nào có cùng
// annotation @Singleton sẽ bị ràng buộc bởi vòng đời của Graph cho nên từ đó Dagger sẽ biết 
// đi trả về chính xác duy nhất cùng một instance mỗi lần được request.
@Singleton
@Component(modules = [NetworkModule::class])
interface ApplicationComponent {
    fun inject(activity: LoginActivity)
}

@Singleton  <- chỉ định ở đây
class UserRepository @Inject constructor(
    private val localDataSource: UserLocalDataSource,
    private val remoteDataSource: UserRemoteDataSource
) { ... }

@Module
class NetworkModule {
    @Singleton // <- chỉ định ở đây
    @Provides
    fun provideLoginRetrofitService(): LoginRetrofitService { ... }
}
```

## Tự tạo một scope

Bạn cũng có thể tự tạo một custom scope như sau:
```
@Scope
@MustBeDocumented
@Retention(value = AnnotationRetention.RUNTIME)
annotation class MyCustomScope
```

Như vậy thì nếu sử dụng cho Class và component sẽ như sau: 
```
@MyCustomScope
@Component(modules = [NetworkModule::class])
interface ApplicationComponent {
    fun inject(activity: LoginActivity)
}

@MyCustomScope
class UserRepository @Inject constructor(
    private val localDataSource: UserLocalDataSource,
    private val remoteDataSource: UserRemoteDataSource
) { ... }

@Module
class NetworkModule {
    @MyCustomScope
    @Provides
    fun provideLoginRetrofitService(): LoginRetrofitService { ... }
}
```

Trên đây là Cơ bản về Scope trong Dependencies Injection trong Dagger2. @Singleton được sử dụng rất rất nhiều trong các dự án hiện tại, có phạm vi toàn app, thời gian sống lâu nhất, thường được dùng đẻ nhờ Dagger quản lí với các instance làm việc với Networks, API service, Database.... 

Trong Phần tiếp theo mình sẽ giới thiệu về Subcomponent và ứng dụng của Custom Scope với Subcomponent.
Cám ơn các bạn đã đọc