## Lời giới thiệu

Trong [phần 1](https://viblo.asia/p/dependencies-injection-trong-android-phan-1-hieu-khai-niem-chinh-tu-ung-dung-cua-ban-07LKXokJ5V4) và [phần 2](https://viblo.asia/p/dependencies-injection-trong-android-phan-2-quan-li-nhu-the-nao-khi-ung-dung-dan-xuat-hien-nhieu-luong-logic-3Q75wVMQlWb), chúng ta đã hình dung được việc tự quản lí các dependencies injection cũng như sự vất vả khi mà bài toán bắt đầu lớn hơn, càng nhiều chỗ cần dùng thì càng nhiều lần phải từng bước tạo chúng, và cũng càng phải cần quản lí chặt chẽ phạm vi, sự tồn tại của chúng. Trong khi chúng ta chỉ làm việc chủ yếu với 1 instance thôi, nếu như có một công cụ nào đó, không những giúp chúng ta đỡ thủ công tạo những instance phụ thuộc cho nó , mà còn giúp chúng ta quản lí phạm vi sử dụng của chúng luôn thì tuyệt vời đúng không? Dagger được sinh ra là để làm việc đó đấy. Dagger nói rằng: "bạn chỉ cần cho tôi biết chỗ nào bạn sẽ cần cung cấp những instance và cách tạo những instance đó thôi, mọi việc cứ để tôi lo!" Hãy cùng mình tìm hiểu thử xem nhé.

## 1. Chỉ cho Dagger instances nào bạn muốn nó khởi tạo giùm

Mình vẫn sẽ lấy bàn toán cũ chúng ta đang ví dụ ở những phần trước nhé. Các bạn vẫn còn nhớ chứ? Cái thằng mà chúng ta làm việc chủ yếu là LoginViewModel, và một loạt các instance phụ thuộc để tạo 1 LoginViewModel như hình dưới đây:
![](https://images.viblo.asia/1bea3d8b-1aa7-4a6a-ad09-a449f1da3597.png)

Trước hết là thêm thư viện trong `build.gradle`
```
apply plugin: 'kotlin-kapt'

dependencies {
    implementation 'com.google.dagger:dagger:2.x'
    kapt 'com.google.dagger:dagger-compiler:2.x'
}
```

Bây giờ chúng ta sẽ nhờ Dagger tạo cho chúng ta 1 instance LoginViewModel . Muốn vậy thì phải đánh dấu cho Dagger biết tại constructor bằng annotation `@Inject`:
```
class LoginViewModel @Inject constructor(private val userRepository: UserRepository) { }
```
Nhưng mà Dagger lấy đâu ra UserRepository để truyền vào? Chúng ta nhờ Dagger tự tạo luôn, cũng bằng đánh dấu `@Inject` tại constructor: 
```
class UserRepository @Inject constructor(
    private val localDataSource: UserLocalDataSource,
    private val remoteDataSource: UserRemoteDataSource
) { ... }
```
Tiếp tục nhé, nhờ Dagger tự tạo luôn UserLocalDataSource và UserRemoteDataSource, hai thằng này được tạo bằng constructor nên chúng ta tiếp tục chỉ cho Dagger cách tạo chúng thôi: 
```
class UserLocalDataSource @Inject constructor() { ... }

class UserRemoteDataSource @Inject constructor(
    private val loginService: LoginRetrofitService
) { ... }
```
 Đến đây thì sao nhỉ? Constructor của UserLocalDataSource không còn instance phụ thuộc nữa, còn UserRemoteDataSource thì lại cần có một instance LoginRetrofitService. Thế nhưng mà một đối tượng LoginRetrofitService được tạo bởi cú pháp Retrofit Builder() thì làm can thiệp được vào contructor của nó để đánh dấu `@Inject` như mấy thằng kia? Chúng ta có nhờ Dagger tạo giùm instance này được không?
 
Câu trả lời là có, nhưng chúng ta phải khai báo 1 class, trong đó cung cấp (trả về) đối tượng LoginRetrofitService (class này được gọi là Dagger module). Giữa muôn vàn classes trong project thì Dagger biết class nào mà tìm tới? Chúng ta đánh dấu class đó với annotation `@Module`, trong đó đánh dấu cho Dagger biết chỗ cung cấp cái instance retrofit service kia bằng annotation `@Provides`

```
@Module
class NetworkModule {

    @Provides
    fun provideLoginRetrofitService(): LoginRetrofitService {
        return Retrofit.Builder()
                .baseUrl("https://example.com")
                .build()
                .create(LoginService::class.java)
    }
}
```


## 2. Chỉ cho Dagger biết chỗ nào bạn cần dùng instances đó

Các bạn có thể thấy là ở mục 1 trên, chúng ta mới chỉ cho Dagger biết cách tạo những dependencies đó thôi, biết cách tạo thôi chứ cũng chưa làm gì cả, như kiểu mới học lí thuyết thôi chứ chưa ai gọi đi thực hành ở đâu cả. Giờ thằng LoginActivity muốn dùng instance của LoginViewModel thì Dagger sẽ cung cấp như thế nào đây? 

Chúng ta phải giúp Dagger xây dựng 1 cái graph (biểu đồ) tập hợp về tất cả các dependencies mà nó đã học được, từ cái graph đó Dagger mới có chỗ để tới lấy ra instance khi được yêu cầu. Graph đó cũng chỉ là 1 interface thôi, để activity nào yêu cầu Dagger cung cấp dependencies thì mới sử dụng interface đó.

Hiện tại Dagger đã được chỉ chỗ cho tạo các dependencies bằng constructor (nhờ annotation `@Inject`) và bằng những module class vì sử dụng 3rd-party  (là Retrofit service, nhờ annotation `@Module` và `@Provide`). Tuy nhiên thì "By default, Dagger satisfies each dependency by constructing an instance of the requested type" (xem thêm [tại đây](https://dagger.dev/dev-guide/)) Mặc định thì Dagger sẽ cung cấp các dependencies nhờ vào hàm khởi tạo mà chúng ta báo với nó thôi . Cho nên khi chúng ta muốn sử dụng cả module, thì cũng cần khai báo với Dagger module này trong graph.

Để xây dựng graph về các dependencies, chúng ta dử dụng anotation @Component. Trong interface đó thì chúng ta sẽ khai báo 1 hàm, tên gì cũng được nhưng thường sẽ được đặt tên inject đó cho đúng ngữ nghĩa
```
@Component(modules = [NetworkModule::class])
interface AppComponent {

    // Nói cho Dagger biết LoginActivity sẽ yêu cầu dùng những dependencies do nó tạo ra
    fun inject(activity: LoginActivity)
}
```

Sau khi chúng ta khai báo interface này, hãy compile source code của chúng ta thử xem nào. Lúc này Dagger mới sinh ra 1 class implement interface trên, có tên là "DaggerAppComponent ", nằm trong thư mục java(generated), nó làm tất tần tật để LoginActivity của chúng ta có thể yều một dependencies bất kì đã được khai báo, như một cái xưởng sản xuất các instances vậy. Tiếp tục chỉ cho nó biết nơi mà chúng ta cần dùng instance đó (gọi là inject - nhúng). Trong ví dụ này, chúng ta cần báo Dagger biết, rằng thằng LoginActivity này sẽ sử dụng instance của LoginViewModel do Dagger tạo nè. Dagger đồng ý thôi, nó bảo "tao có thể tạo cho mày cả tá instances loại khác nữa, nhưng mày phải báo tao biết mày sẽ sử dụng chúng khi bắt đầu bước chân vào hành trình của mày".

Vậy thì giờ chúng ta sẽ bắt đầu sử dụng dependencies trong Activity, chúng ta sẽ khai báo 1 cái xưởng sản xuất trước cái đã, xưởng sản xuất này sẽ phục vụ cho toàn app

```
class MyApplication: Application() {

    // Tạo một object của class DaggerAppComponent này để dùng trong toàn app, MyApplication này vẫn cần khai báo trong Manifest đấy nhé
    val appComponent = DaggerAppComponent.create()
}
```

```
class LoginActivity: Activity() {
    // Nhờ Dagger tạo instance LoginViewModel thông qua graph
    @Inject lateinit var loginViewModel: LoginViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
      
        (applicationContext as MyApplication).appComponent.inject(this)
        // sau khi gọi inject() để nhúng LoginActivity thì loginViewModel đã sẵn sàng để dùng rồi đấy
        // Lưu ý là phải nhúng trước super.onCreate() 
        super.onCreate(savedInstanceState)
    }
}
```

Đến đây thì bạn rõ rồi đúng không nào: Chúng ta đã xây dựng 1 cái Graph, bày cho Dagger biết cách tạo những instances của LoginViewModel, của UserRepository, của LoginRetrofitService, v.v... Tiếp theo là dựng lên 1 cái xưởng sản xuất và Activities nào muốn sử dụng những instances được tạo bởi Dagger này thì cứ nhúng activity đó trong xưởng sản xuất của Dagger dùng chung cho toàn app.
Trong phần tiếp theo, mình sẽ nói tới Scopes và Subcomponents với Dagger2 nhé.

 Cám ơn các bạn đã đọc.