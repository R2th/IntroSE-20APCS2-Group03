### Mở đầu
Thời gian gần đây, đã có rất nhiều các bài viết liên quan đến Koin, các bài giới thiệu, hướng dẫn sử dụng..... Đây được coi là một Dependency Injection tool với nhiều các tính chất hỗ trợ rất tốt cho lập trình viên Android như đơn giản, dễ sử dụng, không có gen code....

Nhưng cũng có nhiều bài nói rằng Koin không phải là một Dependency Injection tool thực sự. Tranh luận này đã xảy ra một thời gian và đến hiện tại vẫn chưa ngã ngũ. Nhưng điều đó có thực sự quan trọng không? Theo mình, quan trọng những tool đó sẽ hỗ trợ được cho lập trình viên như thế nào, hỗ trợ sâu đến đâu, ưu nhược điểm của mỗi một tool ra sao mới là điều đáng lưu tâm.

Hiện tại có lẽ Dagger 2 và Koin đang được coi là 2 thế lực mạnh mẽ nhất về DI cho các anh em Android lưu tâm sử dụng. Trong đó Dagger 2 có được sự hậu thuẫn chính thức từ Google, còn Koin thì đang nổi lên như là một sự lựa chọn tốt và mới mẻ trong giới lập trình viên Android.

Trong bài này mình sẽ không nói về việc hướng dẫn sử dụng, mà mình sẽ làm một vài sự so sánh giữa Dagger 2 và Koin, có lẽ sẽ cung cấp thêm được cho các bạn một vài thông tin hữu ích.

## Dagger 2

### Dagger 2 là gì?

- Là một Dependency Injection tool
- Có cấu trúc Annotation đơn giản
- Có khả năng đọc được generated code
- Không reflection (ưu điểm của việc này là giúp xử lý nhanh)
- Không có Runtime error
- Thân hiện với Proguard
- Thuần Java
- [https://github.com/google/dagger](https://github.com/google/dagger)
- [https://android.jlelse.eu/dagger-2-c00f31decda5](https://android.jlelse.eu/dagger-2-c00f31decda5)

### Xử lý Annotation

- Annotate trong source code
- Compile khi build project
- Đọc Annotation và dữ liệu phù hợp
- Generate code trong thư mục build
- Kết thúc biên dịch
- [https://medium.com/@jintin/annotation-processing-in-java-3621cb05343a](https://medium.com/@jintin/annotation-processing-in-java-3621cb05343a)

### Một số Annotations trong Dagger 2

- @Provides
- @Module
- @Component
- @Inject (in Java)
- @Qualifier (@Named)
- @Scope (@Singleton)
 
 ![](https://images.viblo.asia/5f86696c-bbf4-461f-9e81-af878f555a0c.png)

 ```Java
// Object class
class Lemon

class Bee

class Honey(var bee: Bee)

class HoneyLemonade

@Inject
constructor(var honey: Honey, var lemon: Lemon)
```

```Java
@Provides
Lemon provideLemon() {
  return new Lemon();
}

@Provides
Honey provideHoney(Bee bee) {
  return new Honey(bee);
}

@Provides
Bee provideBee() {
  return new Bee();
}
```

```Java
@Module
public class DrinkModule {
  @Provides
  Lemon provideLemon() {...}

  @Provides
  Honey provideHoney(Bee bee) {...}

  @Provides
  Bee provideBee() {...}
}
```

```Java
@Component(modules = {DrinkModule.class})
public interface DrinkComponent {
  HoneyLemonade drink();
  void inject(MainActivity activity);
}
```
Cách implement không cần Inject
```Java
public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    DrinkComponent co = DaggerDrinkComponent.create();
    HoneyLemonade drink = co.drink();
  }
}
```

Cách implement với Inject

```Java
 public class MainActivity extends AppCompatActivity {
  @Inject
  HoneyLemonade drink;
  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    DrinkComponent co = DaggerDrinkComponent.create();
    co.inject(this);
  }
}
```

Tóm lại một chút:
- Provides: cung cấp các phụ thuộc
- Modules: nhóm lại các Provides
- Component: Tạo mối liên hệ giữa các thành phần với nhau
- Inject: Định danh cho các inject


## Koin

### Koin là gì?

- Là một Service locator của Kotlin DSL
- Không có generation code
- Không reflection
- Không mất thời gian lúc đầu để compile
- Thuần Kotlin
- [https://github.com/InsertKoinIO/koin](https://github.com/InsertKoinIO/koin)

### Service locator

Service locator pattern là một design pattern được sử dụng trong phát triển phần mềm để gói gọn các tiến trình phức tạp thành một service với một tầng abstract mạnh.

![](https://images.viblo.asia/06e5c7a9-fc71-4c0e-bc2c-8ec45ef3d33b.png)

### Kotlin DSL

- Hàm thông thường với receiver
- Mô tả cấu trúc dữ liệu
- Tương tự như [Anko](https://github.com/Kotlin/anko/wiki/Anko-Layouts), [ktor](https://ktor.io/servers/features/routing.html)

```kotlin
// HTML DSL
val result =
  html {
    head {
      title {+"XML encoding with Kotlin"}
    } 
    
    body {
      h1 {+"XML encoding with Kotlin"}
      p  {+"this format can be used"}
      a(href = "http://kotlinlang.org") {+"Kotlin"}
    } 
  }
```

```kotlin
fun html(init: HTML.() -> Unit): HTML {
  val html = HTML()
  html.init()
  return html
}

fun body(init: Body.() -> Unit) : Body {
  val body = Body()
  body.init()
  return body
}
```

### kotlin DSL

- Module - tạo một Kotlin Module
- Factory - cung cấp một định nghĩa cho factory bean
- Single - cung cấp một định nghĩa cho singleton bean
  (also aliased as bean)
- Get - resolve a component dependency

```gradle
// gradle install
dependencies {
  // Koin for Android
  compile 'org.koin:koin-android:1.0.2'
  // or Koin for Lifecycle scoping
  compile 'org.koin:koin-android-scope:1.0.2'
  // or Koin for Android Architecture ViewModel
  compile 'org.koin:koin-android-viewmodel:1.0.2'
}
```

```kotlin
// Object class
class Bee

class Honey(var bee: Bee)

class Lemon

class HoneyLemonade(var honey: Honey,
                    var lemon: Lemon)
```

```kotlin
class MyApplication : Application() {
  override fun onCreate(){
    super.onCreate()
    // start Koin!
    startKoin(this, listOf(myModule))
  } 
}

val myModule = module {
  single { Bee() }
  single { Honey(get()) }
  single { Lemon() }
  single { HoneyLemonade(get(), get()) }
}
```

```kotlin
// How get() work? reified 

inline fun <reified T : Any> get(
  name: String = "",
  scopeId: String? = null,
  noinline parameters: ParameterDefinition = ...
): T {
  val scope: Scope? = scopeId?.let {
    koinContext.getScope(scopeId)
  }
  return koinContext.get(name, scope, parameters)
}
```
### reified function

- Làm việc với inline
- Có thể cho phép định nghĩa với kiểu T
- Sau khi compile, T sẽ được thay thế với một kiểu dữ liệu thực tế

```kotlin
class MyActivity() : AppCompatActivity() {
  val drink : HoneyLemonade by inject()

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val drink : HoneyLemonade = get()
  }
}
```

```kotlin
// How inject(), get() work?
inline fun <reified T : Any> ComponentCallbacks.inject(
    name: String = "",
    scope: Scope? = null,
    noinline parameters: ParameterDefinition = ...
) = lazy { get<T>(name, scope, parameters) }

inline fun <reified T : Any> ComponentCallbacks.get(
  name: String = "",
  scope: Scope? = null,
  noinline parameters: ParameterDefinition = ...
): T = getKoin().get(name, scope, parameters)
// What is ComponentCallbacks btw?
```

## Dagger vs Koin

### Dagger

Ưu điểm
- Thuần Java
- Ổn định, linh hoạt, mạnh mẽ
- Không Runtime error
- Nhanh trong Runtime

Nhược điểm
- Compile overhead
- Khó để học

### Koin

Ưu điểm
- Không xử lý Annotation
- Dễ để học, cài đặt

Nhược điểm
- Khó để thay thế hoặc xóa bỏ
- Bị giới hạn môi trường test
- có thể có lỗi Runtime error

## Tổng kết lại

“you and only you are responsible for your life choices and decisions”
- Robert T. Kiyosaki

Nguồn dịch: [Dagger2 vs Koin](https://www.slideshare.net/Jintin1018/dagger-2-vs-koin)