![](https://images.viblo.asia/dbc4ba7b-de7a-41e5-9964-e5b1c36992b6.jpg)
Dependence Injection (DI) chắc là một khái niệm không còn xa lạ với các lập trình viên. Các DI mạnh mẽ hiện nay như Dagger, Koin của Kotlin đang được sử dụng rất rộng rãi và sự tiện lợi của chúng thì không còn gì phải bàn cãi. Ở bài viết này mình xin giới thiệu một DI khác, một trong số các component của Android Jetpack,  đó chính là Hilt

# 1. Giới thiệu về Hilt
- Hilt là một DI được xây dựng dựa trên Dagger. Tuy nhiên, Hilt giúp chúng ta giảm tải lượng code cần để inject sự phụ thuộc giữa các lớp. Nếu đã làm việc với Dagger các bạn sẽ thấy, chúng ta sẽ phải tạo mọi lớp và tạo sự phụ giữa chúng một cách thủ công và sử dụng các vùng chứa để có thể tái sử dụng cũng như quản lý vòng đời của chúng. Chúng ta cùng xem 1 ví dụ nhỏ để xem sự khác biệt như nào nhé
```
Inject một fragment vào activity với Dagger

class Fragment1 : Fragment(){
} 

@Module
abstract class MainActivityModule {
    @Scope
    @Retention
    abstract fun contributeFragment1(): Fragment1
}

class MainAcitviy: AppcombatActivity(){
     @Inject
    lateinit var documentPreviewFragment : DocumentPreviewFragment
}
```

```
Inject một fragment vào activity với Hilt

@AndroidEntryPoint
class Fragment1 @Inject constructor() : Fragment(){
}

class MainAcitviy(): AppcombatActivity(){
     @Inject
    lateinit var documentPreviewFragment : DocumentPreviewFragment
}
```
Ở ví dụ trên, chúng ta dễ dàng nhận thấy, Hilt đã giảm tải lượng code để chúng ta có thể inject một fragment, giảm thiểu các boilerplate
- Hilt cung cấp vùng chứa cho tất cả các lớp trong ứng dụng và quản lý vòng đời của chúng một cách tự động
- Xây dựng dựa trên Dagger nên Hilt cũng kế thừa những lợi ích của nó như build compile-time, tăng performance tại runtime,  khả năng mở rộng cũng như nhận được hỗ trợ mạnh mẽ từ IDE Android Studio (nếu bạn đang sử dụng Dagger, bạn có thể migrate sang Hilt một cách dễ dàng)
# 2. Implement Hilt
## 2.1 Thêm dependencies
Đầu tiên, chúng ta cần thêm **hilt-android-gradle-plugin** vào file **build.gradle** module project
```
buildscript {
    ...
    dependencies {
        ...
        classpath 'com.google.dagger:hilt-android-gradle-plugin:2.28-alpha'
    }
}
```
Tiếp theo thêm dependencies và apply plugin của **Hilt** vào **build.gradle** file module app. Đừng quên bật java 8 nên nhé :
```
apply plugin: 'kotlin-kapt'
apply plugin: 'dagger.hilt.android.plugin'

android {
  compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
}

dependencies {
    implementation "com.google.dagger:hilt-android:2.28-alpha"
    kapt "com.google.dagger:hilt-android-compiler:2.28-alpha"
}
```

## 2.2 Hilt application class
Tất cả các ứng dụng sử dụng Hilt đều cần phải có một Application được gán anotation **[@HiltAndroidApp](https://dagger.dev/api/latest/index.html?dagger/hilt/android/HiltAndroidApp.html)**
 Với Anotation **@HiltAndroidApp**, Hilt sẽ bắt đầu tạo các lớp cơ sở, đóng vai trò là vùng chứa cho ứng dụng của bạn
 ```
@HiltAndroidApp
class ExampleApplication : Application() { ... }
```
Thành phần Hilt được tạo ra sẽ được gắn với vòng đời của ứng dụng và cung cấp các phụ thuộc cho ứng dụng. Nói cách khác, nó chính là  thành phần cha của ứng dụng, các thành phần khác có thể truy  cập vào các phụ thuộc mà nó cung cấp.
## 2.3 Thêm phụ thuộc vào các class
Để thêm phụ thuộc cho các khác, chúng ta cần thêm anotation **@AndroidEntryPoint** cho chúng
```
@AndroidEntryPoint
class ExampleActivity : AppCompatActivity() { ... }
```
Hilt hỗ trợ các thành phần phổ biển của android như :
- Application với anotation @HiltAndroidApp
- Activity : Hilt chỉ  support các Activity kế thừa từ lớp ActivityCompnent ví dụ như AppCombatActivity
- Fragment : Hilt chỉ support các  fragment kết thừa từ lớp androidx.Fragment
- Hilt hỗ trợ cho các retained activity nhưng không hỗ trợ cho các retained fragment
Với anotation @AndroidEntryPoint, Hilt sẽ tạo một thành phần riêng lẻ cho mỗi lớp. Các phu thuộc này có thể sử dụng các phụ thuộc từ các lớp cha. Sử dụng anotation **@Inject** để thêm các phụ thuộc vào một lớp
```
//add testAdapter into MainActivity by Hilt
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
  @Inject lateinit var testAdapter: TestAdapter
}
```
### Chú ý
- Các trường được inject không được để private
- Nếu class của bạn làn một abstract class thì bạn không cần phải thêm anotation **@AndroidEntryPoint**
## 2.4 Define Hilt Binding
Với một lượng class lớn, sẽ có những class sẽ có các tham số đầu vào, vì vậy để inject được các class này chúng ta cần thêm anotation **@Inject** cho constructor của chúng. Khi thêm **@Inject** cho constructor, Hilt sẽ tạo ra một ràng buộc chứa các thông tin cần thiết để có thể cung cấp một thể hiện của một lớp như một loại phụ thuộc.
```
class AnalyticsAdapter @Inject constructor(
  private val service: AnalyticsService
) {  }
```
Tuy nhiên, có khi đầu vào của một lớp lại là một interface. Như các bạn đã biết, interface chỉ chứa các abstract method (chỉ có tên mà không có thân hàm) và nó cần một class để implement lại các class đó. Vậy làm thế nào để Hilt có thể biết được nó cần inject lớp nào cho đúng ? Chúng ta cùng tìm hiể tiếp nhé

## 2.5 Hilt modules
Như chúng ta đã biết, một interface có thể được implement từ nhiều class khác nhau và mỗi class lại có một cách implement riêng. Vậy trong trường hợp, class của chúng ta cần đầu vào là một interface thì Hilt sẽ  Inject như thế nào ? Để giải quyết việc này Hilt cung cấp một tiện ích gọi là **Hilt Module** . 
**Hilt Module** là một class được đánh dấu với anotation **@Module**.  Giống như Dagger Module, Hilt cung cấp các instance cho mỗi type khác nhau của một đối tượng. Ví dụ ta có interface A, class B và class C đều implement class A thì Hilt Module sẽ tạo ra các đổi tượng khác nhau của A theo B và C. Chú ý một điều là bạn phải chú thích Hilt Module bằng anotation **@InstallIn** để cho Hilt biết mỗi mô-đun sẽ được sử dụng hoặc cài đặt trong lớp nào.
## 2.6 Sử dụng @Binds để inject interface instances
Như đã nói ở trên, Hilt không khởi tạo một interface để có thể inject vào một class nào đó. Mà nó thực hiện bằng cách khởi tạo đối tượng implement interface đó. Để Hilt có thể inject được thì chúng ta cần cung cấp cho Hilt biết cách implement interface. Để làm được đó, chúng ta 
cùng xem ví dụ dưới đây nhes:

```
// interface cần được inject
interface AnalyticsService {
  fun analyticsMethods()
}

// Lớp kế thừa interface
class AnalyticsServiceImpl @Inject constructor(
  ...
) : AnalyticsService { ... }

@Module
@InstallIn(ActivityComponent::class)
abstract class AnalyticsModule {
    // Với anotation @Binds , Hilt genarate một đối tượng của interface AnalyticsService thông qua lớp AnalyticsServiceImpl
  @Binds
  abstract fun bindAnalyticsService(
    analyticsServiceImpl: AnalyticsServiceImpl
  ): AnalyticsService
}
```

## 2.7 Sử dụng @Provides để inject instance
Interfaces không phải là trường hợp duy nhất mà bạn không thể tạo inject thông qua việc constructor. Việc inject đối tượng thông qua các hàm tạo cũng không thể thực hiện được nếu bạn không sở hữu lớp đó vì nó được cung cấp từ thư viện bên thứ ba như Retrofit, OkHttpClient hoặc Room Databse hoặc các đối tượng được tạo ra thông qua Builder pattern.
Hãy xem xét ví dụ trước. Nếu không trực tiếp sở hữu lớp AnalyticsService, bạn có thể cho Hilt biết cách cung cấp các phiên bản thuộc loại này bằng cách tạo một hàm bên trong **HiltModule** và chú thích hàm đó bằng **@Provides**.
Anotation sẽ cung cấp thông tin sau cho Hilt:
- Kiểu trả về của hàm cho Hilt biết cách mà hàm cung cấp các thể hiện.
- Các tham số của hàm cho Hilt biết các phụ thuộc cần được cung cấp.
- Phần thân hàm cho Hilt biết cách cung cấp một instance

```
Inject instance của  AnalyticsService
@Module
@InstallIn(ActivityComponent::class)
object AnalyticsModule {

  @Provides
  fun provideAnalyticsService(
    // Potential dependencies of this type
  ): AnalyticsService {
      return Retrofit.Builder()
               .baseUrl("https://example.com")
               .build()
               .create(AnalyticsService::class.java)
  }
}
```
## 2.7 Cung cấp nhiều ràng buộc cho cùng một đối tượng
Có khi nào bạn gặp trường hợp, cùng một cong việc nhưng chúng ta sẽ phải cung cấp cùng một loại đối tượng nhưng mà chúng lại chứa các thuộc tính khác nhau. Lúc này, chúng ta sẽ cần Hilt cung cấp các triển  khai khác nhau của cùng một đối tượng. Bạn có thể định nghĩa nhiều ràng buộc cho một kiểu đối tượng với anotation **@Qualifiers**. 
Hãy xem xét ví dụ, nếu bạn cần chặn việc truy cập đến AnalyticsService, bạn có thể sử dụng đối tượng OkHttpClient với một trình chặn. Đối với các dịch vụ khác, bạn có thể cần chặn truy cập theo một cách khác. Trong trường hợp đó, bạn cần cho Hilt biết cách cung cấp hai cách triển khai khác nhau của OkHttpClient.

```
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class AuthInterceptorOkHttpClient

@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class OtherInterceptorOkHttpClient
```

Sau đó, Hilt cần biết cách cung cấp một phiên bản của loại tương ứng với mỗi Qualifier. Trong trường hợp này, bạn có thể sử dụng mô-đun Hilt với @Provides. Cả hai phương thức đều có cùng kiểu trả về, nhưng các Qualifier gắn với chúng là hai liên kết khác nhau:
```
@Module
@InstallIn(ApplicationComponent::class)
object NetworkModule {

  @AuthInterceptorOkHttpClient
  @Provides
  fun provideAuthInterceptorOkHttpClient(
    authInterceptor: AuthInterceptor
  ): OkHttpClient {
      return OkHttpClient.Builder()
               .addInterceptor(authInterceptor)
               .build()
  }

  @OtherInterceptorOkHttpClient
  @Provides
  fun provideOtherInterceptorOkHttpClient(
    otherInterceptor: OtherInterceptor
  ): OkHttpClient {
      return OkHttpClient.Builder()
               .addInterceptor(otherInterceptor)
               .build()
  }
}
```

Và cuối cùng là Inject chúng vào các class mà bạn cần

```
// As a dependency of another class.
@Module
@InstallIn(ActivityComponent::class)
object AnalyticsModule {

  @Provides
  fun provideAnalyticsService(
    @AuthInterceptorOkHttpClient okHttpClient: OkHttpClient
  ): AnalyticsService {
      return Retrofit.Builder()
               .baseUrl("https://example.com")
               .client(okHttpClient)
               .build()
               .create(AnalyticsService::class.java)
  }
}

// As a dependency of a constructor-injected class.
class ExampleServiceImpl @Inject constructor(
  @AuthInterceptorOkHttpClient private val okHttpClient: OkHttpClient
) : ...

// At field injection.
@AndroidEntryPoint
class ExampleActivity: AppCompatActivity() {

  @AuthInterceptorOkHttpClient
  @Inject lateinit var okHttpClient: OkHttpClient
}
```

# Tổng kết
**Hilt** là một thư viện khá bổ ích, giúp chúng ta tiết kiệm thời gian trong việc triển khai DI. Hi vọng bài viết này sẽ giúp các bạn tiếp cận Hilt một cách dễ dàng hơn