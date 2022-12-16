![](https://images.viblo.asia/322367fc-ad44-4a81-a4f5-cfa0415b6db6.jpg)

Nếu bạn là một Android developer, chắc hẳn bạn đã nghe đến khái niệm dependency. Ban đầu mình còn tưởng là dependencies trong gradle cơ :joy:. Thật ra trong lập trình, khái niệm dependency chỉ đơn giản là một class sử dụng/phụ thuộc 1 hoặc nhiều class khác mà thôi.


Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu sẽ gồm 3 phần chính:
* Khái niệm về **Dependency injection (DI)**
* Các cách để sử dụng DI trong Android
* Ví dụ minh họa

 
### 1. Khái niệm về Dependency injection (DI) 
Trước khi đi vào tìm hiểu **Dependency injection (DI)**, chúng ta sẽ cùng lướt qua 1 chút về **Inversion of control (IoC)** và  **Dependency inversion**  do DI được xây dựng dựa trên **IoC** và DI là 1 trong những pattern để hiện thực **Dependency Inversion.**

> **Inversion of Control (IoC)** là một nguyên lý thiết kế trong công nghệ phần mềm với các đoạn code khi đưa vào một framework sẽ nhận được luồng điều khiển từ framework hay nói một cách khác là được framework điều khiển. Kiến trúc phần mềm với thiết kế này sẽ đảo ngược quyền điều khiển so với lập trình hướng thủ tục truyền thống. Trong lập trình truyền thống các đoạn code thêm vào sẽ gọi các thư viện nhưng với IoC, framework sẽ gọi các mã thêm vào.

> **Dependency Inversion** là 1 trong 5 nguyên lý của SOLI**D**
> 1. Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. 
   Cả 2 nên phụ thuộc vào abstraction.
>2. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại.
( Các class giao tiếp với nhau thông qua interface, 
không phải thông qua implementation.)


Các khái niệm trên mình cũng chỉ cắt nhặt từ nguồn khác thôi. Đọc có vẻ khá trừu tượng. Mình cũng không thể thẩm thấu được ngay.
Nhưng chúng ta có thể hiểu đơn giản **DI** là cách viết code nhằm giảm sự phụ thuộc lẫn nhau giữa các đối tượng. Lợi ích của việc giảm thiểu sự phụ thuộc giữa các đối tượng giúp code dễ dàng maintain và testing,... 

### 2. Các cách để sử dụng DI trong Android
Trong Android thì có 2 cách chính để thực hiện DI: 
* **Constructor Injection:** Các dependency sẽ được truyền vào (inject vào) 1 class thông qua constructor của class đó. Đây là cách thông dụng nhất. VD:
```java
class BananaMilkshake(private val milk: Milk) {
    fun prepare() {
        milk.mixitup()
    }
}

fun main(args: Array) {
    val milk = Milk()
    val bananaMilkshake = BananaMilkshake(milk)
    bananaMilkshake.prepare()
}
```
* **Field Injection (or Setter Injection):** Các dependency sẽ được truyền vào 1 class thông qua các hàm **Setter/Getter**. VD: 
```java
class BananaMilkshake {
    lateinit var milk: Milk

    fun prepare() {
        milk.mixitup()
    }
}

fun main(args: Array) {
    val bananaMilkshake = BananaMilkshake()
    bananaMilkshake.milk = Milk()
    bananaMilkshake.prepare()
}
```

Có rất nhiều kỹ thuật để triển khai DI:
* **[Manual dependency injection](https://developer.android.com/training/dependency-injection/manual)** phù hợp với các app size nhỏ. Khi app quá lớn, việc sử dụng manual DI sẽ sinh ra nhiều boilderplate code.

* **Service locators** bắt đầu với mã code tương đối ít, nhưng khả năng mở rộng cũng kém. Hơn nữa việc testing sẽ trở nên khó khăn bở vì chúng dự trên một đối tưọng Singleton.

* **[Dagger](https://developer.android.com/training/dependency-injection/dagger-android)** được xây dựng để mở rộng,  phù hợp để xây dựng các ứng dụng phức tạp. 

* **[Koin](https://insert-koin.io/)**  cũng là một dependency injection framework dành riêng cho Kolin

### 3. Ví dụ minh họa
Với người mới bắt đầu, việc triển khai DI sẽ cảm thấy khá phức tạp. Hiện tại mình thấy phần lớn chúng ta đều đã sử dụng Kotlin. Để cho đơn giản, mình sẽ lấy ví dụ về Koin để minh họa cho ý tưởng của DI nhé.
Mình sẽ demo 1 ví dụ bé tí tí lưu và lấy data với SharePreference sử dụng koin.
##### Step 1: Chúng ta cần add Koin vào project
```java
    def koin_version = '2.0.1'
    // Koin for Android
    implementation "org.koin:koin-android:$koin_version"
    // or Koin for Lifecycle scoping
    implementation "org.koin:koin-android-scope:$koin_version"
    // or Koin for Android Architecture ViewModel
    implementation "org.koin:koin-android-viewmodel:$koin_version"
```

##### Step 2: Tiếp theo là viết hàm chức năng sử dụng SharedPreferences nhỉ
```java
Áp dụng luôn Dependency Inversion, chúng ta sẽ viết 1 interface để các class giao tiếp với nhau thông qua nó.
interface PrefsHelper {
    fun putString(value: String)
    fun getString(): String?
}

và implement interface đó

class AppPrefs(context: Context) : PrefsHelper {
    private val sharedPreferences = context.getSharedPreferences(
        context.packageName,
        Context.MODE_PRIVATE
    )

    override fun putString(value: String) {
        sharedPreferences.edit { putString("KEY_VALUE", value) }
    }

    override fun getString(): String? =
        sharedPreferences.getString("KEY_VALUE", null)

}
```

##### Step 3: Việc tiếp theo là tạo một module sử dụng `module{}` DSL.
```java
- Sử dụng single{} để tạo instance duy nhất của class trong ứng dụng.
val appModule = module {
    single<PrefsHelper> { AppPrefs(get()) }
    
- viewMode{} DSL giúp khai báo ViewModel component
    viewModel { MainViewModel(get()) }
}
```
Các component sẽ được khởi tạo ở module và dùng cho cả ứng dụng. Chính vì vậy chúng ta không cần phải quan tâm khi nào đối tượng đó được khởi tạo, và nơi khởi tạo.
Tuy nhiên, sự thuận tiện đó của DI cũng là mặt hạn chế của nó:
- Khó debug vì không biết implements nào của interface được gọi đến
- Các object được khởi tạo từ đầu làm giảm performance
- Làm tăng độ phức tạp của code nếu project có small size, ví dụ như sample này =]]
```java
class MainViewModel(private val prefsHelper: PrefsHelper) : ViewModel() { truyền vào interface PrefsHelper.
    val value = MutableLiveData<String>()

    fun putString(value: String) {
        prefsHelper.putString(value)
    }

    fun getString() {
        value.value = prefsHelper.getString()
    }
}
```

##### Step 4: Starting Koin
Trong Android apps, hầu hết koin modules sẽ được khai báo trong Application class.
```java
class MainApplication : Application() { //nhớ khai báo MainApplication trong AndroidManifest.xml
    override fun onCreate() {
        super.onCreate()
        startKoin { 
            androidLogger()
            androidContext(this@MainApplication)
            modules(appModule)
        }
    }
}
Để start Koin thì chỉ cần gọi startKoin func và khai báo các thuộc tính bên trong nó
- androidLogger(): để xem log của Koin
- androidContext(this@MainApplication): inject android application context vào koin context
- modules(appModule): khai báo các module.
```

và cuối cùng  là :
```JAVA
class MainActivity : AppCompatActivity() {

    val viewModel : MainViewModel by viewModel()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        viewModel.putString("Hello my fen")
        viewModel.getString()
        viewModel.value.observe(this, Observer {
            it?.let {
                Log.d("????", it)
            }
        })
    }
}

Log Result: com.abc.di_koin_sample D/????: Hello my fen
dài dòng như vậy để mọi người có thể nhìn ra nhiều case sử dụng của Koin thôi. Chứ thực tế cũng k cần dùng đến viewmodel, mà thay vào đó có thể inject trực tiếp AppPrefs tại activity:

// lazy inject AppPrefs into property
val appPrefs : AppPrefs by inject()

// or directly get any instance
        val appPrefs : AppPrefs = get()

```
Hi vọng với mấy dòng code ngắn ngủi có thể giúp các bạn hiểu rõ hơn về tư tưởng **hạn chế sự phụ thuộc** của DI.