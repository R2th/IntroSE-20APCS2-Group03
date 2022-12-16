Đã đến lúc rồi ! Koin 2.0 phiên bản *Ổn định* đã chính thức ra mắt. 6 tháng phát triển, viết lại, phân tích API và phản hồi từ người dùng. Và tất cả những điều này với một thách thức thực sự: **giữ sự đơn giản của Koin!**
![](https://miro.medium.com/max/3600/1*hhj2kIEoH_brxFTI0Vv_6A.jpeg)

### 1.Startup DSL
Hàm ```startKoin()```  cũ  được thay thế bằng một **startup DSL**.  Cung cấp chức năng khởi tạo cho mỗi platform và ẩn đi tất cả các options với các tham số mặc định là một sự lựa chọn *quickstart* tốt, nhưng nó sẽ locked nhiều khả năng phát triển. Bây giờ chúng ta cần mở rộng và thêm các khái niệm mới dễ dàng, và cũng làm cho các định nghĩa tải hiệu quả hơn.

Làm thế nào để chúng ta bắt đầu Koin 2.0? Vẫn với func ```startKoin```, nhưng bây giờ bạn cần khai báo những gì bạn sẽ sử dụng:

```kotlin
fun main(vararg args: String) {

    startKoin {
        // use Koin logger
        printLogger()
        // declare used modules
        modules(appModule)
    }

}
```
Đối với Android, đừng quên khai báo AndroidContext của bạn với chức năng androidContext:

```kotlin 
class MainApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        startKoin {
            // Use Koin Android Logger
            androidLogger()
            // declare Android context
            androidContext(this@MainApplication)
            // declare modules to use
            modules(module1, module2 ...)
        }
    }
}
```

### 2.Better Performances 🚀
Một trong những đối số chính để nâng cấp lên Koin 2.0, là hiệu suất động cơ mới. 

Năm ngoái, Rafa Vázquez đã viết một dự án điểm chuẩn để giúp đo lường một số màn trình diễn cho framework DI. Điều này giúp tôi rất rõ ràng xem xét nội bộ. Điểm chuẩn này chạy một dự án gồm 400 định nghĩa.

Dưới đây là điểm chuẩn cho Koin 1.0:

![](https://miro.medium.com/max/698/1*Er9hKYBvxgnjul8RA1tbLg.png)

Bây giờ với Koin 2.0:

![](https://miro.medium.com/max/1234/1*6xr83KmNyeitWC9vkSbMsA.png)

Koin đã đạt được sự cải thiện hiệu suất lớn. Bạn không nên lo lắng về hiệu suất ngay bây giờ 😉 Trái với code generate, chúng tôi cần phân tích các thành phần khi bắt đầu. Nhưng điều này rất nhanh để tiến hành ngay bây giờ.


### 3.Definitions & Modules 🛠

Koin DSL vẫn giữ nguyên! Nó đã được đơn giản hóa bằng cách loại bỏ các tính năng không được sử dụng và ngụ ý sự phức tạp vô dụng. Sau đó, không còn khai báo mô-đun bên trong, quy tắc hiển thị kỳ lạ và khai báo API phạm vi đã được sửa đổi hoàn toàn.

Thay đổi chính đầu tiên mà bạn sẽ nhận thấy là chúng tôi không sử dụng chuỗi trực tiếp nữa để đặt tên cho các thành phần của mình. Chúng tôi sử dụng **qualifiers** thay vì hàm  ```named()```. Hàm này có thể lấy một chuỗi hoặc một loại để giúp đủ điều kiện định nghĩa hoặc phạm vi. Điều này cho chúng ta một tên hợp lý cho một thành phần.

```kotlin
// naming with named("mock") instead of "mock"
single<MyRepository>(named(“mock")) { MyMockRepository() }
```

Bây giờ nên hiểu đơn giản hơn về toán tử ràng buộc DSL (bind). Hãy xem xét rằng toán tử này thêm một loại ràng buộc thứ cấp vào định nghĩa của bạn. Để làm cho nó rõ ràng hơn, hãy để khác xem nó như là một khía cạnh bổ sung về định nghĩa của bạn. API Koin có một hàm ```bind ()``` mới để giúp bạn truy xuất các thành phần được khai báo với toán tử ```bind``` trong mô-đun của bạn.

Một ví dụ tốt có thể giúp hiểu:

```kotlin
module {
  single<ComponentInterface1> { Default() }
  single { Component1() } bind Simple.ComponentInterface1::class
  single { Component2() } bind Simple.ComponentInterface1::class
}

// resolve Default instance
get<ComponentInterface1>

// resolve Component1, casted as ComponentInterface1
koin.bind<ComponentInterface1,Component1>()

// resolve all instances matching ComponentInterface1: Default, Component1 & Component2
koin.getAll<ComponentInterface1>()
```

### 4.Loading & unloading modules ♻️

Vì nó dễ dàng tải các mô-đun trong Koin (thông qua startKoinor loadKoinModules), nên cũng dễ dàng dỡ tải một mô-đun. Hàm unloadKoinModules () giúp bạn loại bỏ các định nghĩa và thể hiện:
```kotlin
val coffeeAppModule = module {
    single { CoffeeMaker(get(), get()) }
    single<Pump> { Thermosiphon(get()) }
    single<Heater> { ElectricHeater() }
}

// starting your module either by startKoin
startKoin { modules(coffeeAppModule) }
// or after start
loadKoinModules(coffeeAppModule)

// resolve CoffeeMaker
get()<CoffeeMaker>

// drop module's definitions & instances when you don't need it anymore
unloadKoinModules(coffeeAppModule)

// Won't resolve CoffeeMaker instance, no more definition 
get()<CoffeeMaker>
```

Cùng với đó, chúng tôi có thể xử lý các mô-đun Koin một cách linh hoạt: tải và dỡ tải theo ý muốn, dựa trên bối cảnh ứng dụng của bạn. Các trường hợp tụt lại phía sau hoạt động như vậy, liên quan đến các định nghĩa **single** & **scrope**.

### 5.Some other new incomings in the Koin APIs ✨

Một số thứ nhỏ có thể giúp bạn trong những trường hợp đặc biệt, được yêu cầu từ cộng đồng.
Bạn có thể thử yêu cầu một thành phần không được xác định hoặc trường hợp có thể giải quyết được trường hợp:

```kotlin
getOrNull() & injectOrNull()
```

Tính năng thú vị khác, là khả năng thêm một thể hiện nhanh chóng. Sử dụng hàm khai báo () để cung cấp một đối tượng cho Koin. Nó sẽ khai báo nó như một định nghĩa đơn mới cho bạn:
```kotlin
// Given a Koin application
val koin = koinApplication {
    printLogger()
    modules() // no definition
}.koin

// given an instance
val a = ComponentA()

// declare the instance as Single
koin.declare(a)

// can retrieve our ComponentA instance
koin.get<ComponentA>()
```

### 6.Koin Isolation ⚙️

API Koin đã được thiết kế lại để cho phép bạn tạo một phiên bản cục bộ của Koin. Thay vì sử dụng hàm khai báo **startKoin** khai báo thể hiện Koin của bạn vào **GlobalContext**, hãy sử dụng hàm **koinApplication** để khai báo một thể hiện Koin cục bộ.

```kotlin
// Local Koin application instance
val mylocalKoinInstance = koinApplication {
    // declare used modules
    modules(
        module {
            single { ComponentA() }
        }
    )
}

// Custom KoinComponent using mylocalKoinInstance & not the Global context
interface CustomKoinComponent : KoinComponent {
    // override the used Koin instance to use mylocalKoinInstance
    override fun getKoin(): Koin = mylocalKoinInstance.koin

}

// An example of component that use mylocalKoinInstance
class MyCustomApp : CustomKoinComponent {
    val a: ComponentA by inject()
}
```

Một cá thể Koin cục bộ / bị cô lập không được đăng ký trong Bối cảnh toàn cầu. Rõ ràng, bạn có thể sử dụng trực tiếp các phần mở rộng KoinComponents tiêu chuẩn. Thay vào đó, bạn phải chỉ định sử dụng thể hiện cục bộ của mình (ghi đè hàm getKoin () từ giao diện KoinComponent).

### 7.New Scope API ⚠️

Phạm vi là một bối cảnh với một khoảng thời gian cố định, trong đó một đối tượng tồn tại. Khi phạm vi kết thúc, mọi đối tượng bị ràng buộc trong phạm vi đó không thể được tiêm lại. Để có một hình ảnh về điều đó tốt hơn, hãy nghĩ rằng một phạm vi giống như một cái hộp: một không gian nơi bạn đặt đồ đạc và ném nó khi bạn don sắt cần nó nữa. Làm cách nào để sử dụng API phạm vi mới?
Bây giờ chúng tôi tuyên bố và sử dụng phạm vi như thế:

```kotlin
module {
    // main scope MyComponent definition
    single<MyComponent> { DefaultImpl() } 
   
    scope(named(¨MY_SCOPE¨)) {
        // MY_SCOPE definition
        scoped<MyComponent> { ScopeImpl() }
    }
}

val myScopeInstance = koin.createScope("myScopeId",named(¨MY_SCOPE¨))

// will give the ScopeImpl instance 
myScopeInstance.get<MyComponent>()
```

Cuối cùng, trên bất kỳ trường hợp phạm vi nào, bạn có thể khai báo một thành phần đang hoạt động:
```kotlin
module {
    // empty Scope definition
    scope(named(¨MY_SCOPE¨)) {
    }
}

// given an instance
val a = ComponentA()

// given a scope instance
val myScopeInstance = koin.createScope("myScopeId",named(¨MY_SCOPE¨))

// will register your instance as a Scoped definition
myScopeInstance.declare(a)

// will give back the instance
myScopeInstance.get<ComponentA>()

// drop instances & will loose your ComponentA definition
myScopeInstance.close()
```

### 8. Load/Unload modules vs Scope API?
Với những tính năng mới này, chúng tôi có một số khả năng để xử lý các thành phần trong một khoảng thời gian giới hạn. Vậy thì có sử dụng API phạm vi hay không? Nó phụ thuộc nhiều hơn vào trường hợp sử dụng của bạn và cách bạn phải quản lý việc tạo các thể hiện đó. Nếu bạn cần mức độ chi tiết tốt hơn (thời gian hoặc định nghĩa), API Phạm vi dành riêng cho điều đó

### 9.Stronger Android support ✅

Với API Phạm vi mới như vậy, chúng tôi có thể cung cấp cho bạn các công cụ thú vị cho Hoạt động & Mảnh vỡ Android của bạn. Bạn có thể dễ dàng khai báo một phạm vi được gắn với chế độ xem của bạn và dễ dàng truy xuất mọi thứ từ nó bằng thuộc tính currentScope (tiện ích mở rộng Koin Lần cho các thành phần LifecyclOwner):
 
```kotlin
module {
    // declare a scope for MyActivity
    scope(named<MyActivity>()) {
        scoped { MyPresenter() }
    }
}


class MyActivity : AppCompatActivity {
    
    // get presenter from current scope
    val presenter : MyPresenter by currentScope.inject()
}

class MyFragment : Fragment() {

    override fun onViewCreated(...) {

        // get Presenter instance from Activity's scope
        val presenter : MyPresenter  by lazy { activity?.currentScope.get() }
    }
}
```

Thuộc tính currentScope được tạo khi bạn truy cập và theo vòng đời của thành phần Android. Nó bị hủy khi nhận tín hiệu ON_DESTROY.

API phạm vi Android này có mặt trong các gói koin-android-scope và koin-android-viewmodel (cũng dành cho AndroidX).

Rất nhiều bản sửa lỗi đã được thực hiện cho phần ViewModel. API trên toàn cầu vẫn giữ nguyên, nhưng đã được đơn giản hóa:

- Thuộc tính name của định nghĩa được sử dụng làm id ViewModel
- Lấy một cá thể ViewModel cho một lớp nhất định có thể được thực hiện trực tiếp với getViewModel và bởi viewModel
- ViewModels có thể được khai báo trong một phạm vi, để giúp giải quyết các phụ thuộc từ phạm vi này

```kotlin
module {
    viewModel { (id: String) -> SimpleViewModel(id) }
    viewModel(named("vm1")) { (id: String) -> SimpleViewModel(id) }
    viewModel(named("vm2")) { (id: String) -> SimpleViewModel(id) }
}


class MyActivity : AppCompatActivity() {
    // Get ViewModel by given KCLass
    val simpleViewModel: SimpleViewModel by viewModel(clazz = SimpleViewModel::class) { parametersOf(DEFAULT_ID) }
    
    // Get ViewModels by name
    val vm1: SimpleViewModel by viewModel(named("vm1")) { parametersOf("vm1") }
    val vm2: SimpleViewModel by viewModel(named("vm2")) { parametersOf("vm2") }
}
```

Làm việc với ViewModel và phạm vi giờ đây dễ dàng hơn:

```kotlin
module {
    scope(named("MY_SCOPE")){
        scoped { Session() }
        // retrieve Session dependency from current scope
        viewModel { ViewModeWithScope(get()) }
    }
    
}


class MyActivity : AppCompatActivity() {

    // create scope instance
    val myScope = getKoin().create("myScope",named("MY_SCOPE"))
    // give scopeId to your ViewModel instance
    val myScopeViewModel by myScope.viewModel()
}
```

### 10.Android Experimental Features ✨
 Các tính năng thử nghiệm cho Android đã được trích xuất sang các gói bên ngoài. Bạn phải thiết lập nó với các gói sau:
 
 ```xml
koin-android-ext & koin-androidx-ext
```

Các tính năng thử nghiệm này đề xuất một phiên bản DSL mà không yêu cầu bạn phải viết hàm tiêm hàm xây dựng của mình:

```kotlin
class CoffeeMaker(val pump : Pump, val heater : Heater)
class Thermosiphon(val heater : Heater) : Pump
class ElectricHeater : Heater
class CoffeeMakerViewModel(val coffeeMaker : CoffeeMaker)

val coffeeAppModule = module {
    single<CoffeeMaker>()
    singleBy<Pump,Thermosiphon>()
    singleBy<Heater,ElectricHeater>()
    viewModel<CoffeeMakerViewModel>()
}

class CoffeeActivity : AppCompatActivity(){
    // get your coffee here :)
    val coffeeMakerViewModel : CoffeeMakerViewModel by viewModel()
}
```


##### [Reference](https://medium.com/koin-developers/ready-for-koin-2-0-2722ab59cac3)