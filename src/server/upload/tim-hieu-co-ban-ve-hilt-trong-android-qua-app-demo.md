# 1. Giới thiệu:
<br>Depedency Injection (DI) là một kĩ thuật được sử dụng rất rộng rãi trong lập trình android. Với việc tuân theo các nguyên tắc của DI, bạn đã đặt nền tảng cho một kiến trúc tốt, sẽ mở rộng và quản lí dự án của bạn dễ dàng hơn.
<br>Ở bài viết này chúng ta sẽ cùng tìm hiểu cơ bản về Hilt. Hilt cung cấp các cách cơ bản để thực hiện DI trong ứng dụng của bạn
<br>Bạn sẽ học được gì :
* Cách sử dụng Hilt trong ứng dụng Android
* Các khái niệm liên quan Hilt để tạo một ứng dụng vững chắc và bền vững hơn.
* Cách add multiple binding
* Cách truy cập các thành phần trong các container trong các lớp mà Hilt không hỗ trợ với chú thích `@EntryPoint`
# 2. Setup project:
<br> Chúng ta sẽ bắt đầu từ một code có sẵn không sử dụng Hilt và sau đó bắt đầu chỉnh sửa trên code đó để có thể hiểu cách Hilt làm việc.
<br> Chúng ta mở `Android Studio` sau đó click vào `GetFromVersionControl`, điền link sau vào URL: <br>       **https://github.com/googlecodelabs/android-hilt**

# 3. Add thư viện: 
<br> Hilt đã được cấu hình sẵn trong nhánh `master` mà các bạn đã clone xuống. Nhưng cụ thể cần add những gì thì ta cần thêm vào:
*  Bên trong `build.gradle(project)`
```kotlin
buildscript {
..
    ext.hilt_version = '2.35'

    dependencies {
..
        classpath "com.google.dagger:hilt-android-gradle-plugin:$hilt_version"
    }
}
```
* Bên trong `build.gradle(module)`
```kotlin
apply plugin: 'kotlin-kapt'
apply plugin: 'dagger.hilt.android.plugin'
dependencies {
..
    // Hilt dependencies
    implementation "com.google.dagger:hilt-android:$hilt_version"
    kapt "com.google.dagger:hilt-android-compiler:$hilt_version"
}
```
# 4. Đầu tiên là Application class 
<br>Chúng ta vào class `LogApplication`, và thêm chú thích `@HiltAndroidApp` như
 sau:
 ```kotlin
 @HiltAndroidApp
class LogApplication : Application() {
   ..
}
```
`@HiltAndroidApp` kích hoạt việc tạo mã `Hilt` ( là phần đầu tiên Hilt đọc tới) , gồm một lớp cơ sở cho ứng dụng của bạn có thể sử dụng `dependency injection`. Container của ứng dụng là một container cha, nghĩa là các container khác có thể truy cập vào các phụ thuộc( `dependencies`) mà nó cung cấp.
# 5. Field injection với Hilt
<br>Mở class `LogsFragment.kt` xóa bỏ phương thức `onAttach`. Thay vì đưa các đối tượng của `LoggerLocalDataSource` và `DateFormater` bằng cách thủ công sử dụng `ServiceLocator`, chúng ta sẽ sử dụng `Hilt` để tạo và quản lí các đối tượng kiểu này.
<br>Để `LogsFragment` sử đụng Hilt, ta phải thêm chú thích `@AndroidEntryPoint` lên dòng ngay sát tên class, việc này sẽ tạo một `container` chứa các phụ thuộc và tuân theo vòng đời của class đó.
<br> Hiện tại `Hilt` hỗ trợ các kiểu sau đây: `Application`, `Activity`, `Fragment`, `View`, `Service` và `BroadcastReceiver`.
<br>Hilt chỉ hỗ trợ các Activity được extend từ `FragmentActivity` và các Fragment được extend từ `Fragment` của androidx
<br> Vậy làm thế nào để ta nhận được các biến được đưa vào bởi Hilt khi `LogsFragment` được sử dụng? Chúng ta chỉ cần sử dụng chú thích `@Inject` ở trước các biến mà chúng ta muốn đưa vào. Điều này gọi là **field injection**
```kotlin
@AndroidEntryPoint
class LogsFragment : Fragment() {

    @Inject lateinit var logger: LoggerDataSource
    @Inject lateinit var dateFormatter: DateFormatter
}
```
Đến đây ta có thể xóa phương thức `populateFields` và `onAttach` vì Hilt sẽ làm thay nhiệm vụ đó. Trong trường hợp này, Hilt cần biết cách cung cấp các đối tượng `LoggerLocalDataSource` và `DateFormatter`. Hiện tại Hilt chưa biết cách cung cấp các đối tượng này.
**<br>  Cho Hilt biết cách cung cấp các phụ thuộc với @Injection**
<br> Mở class `DateFormatter` và thêm chú thích `@Inject` vào hàm khởi tạo của class.  Tương tự với class `LoggerLocalDataSource`:
```kotlin
class DateFormatter @Inject constructor() {
..
}
```
```kotlin
class LoggerLocalDataSource @Inject constructor(private val logDao: LogDao) : LoggerDataSource {
..
}
```
<br> Thông tin Hilt có về cách cung cấp các đối tượng của các kiểu khác nhau còn được gọi là **bindings**.
<br> Nếu bạn mở class  `ServiceLocator`, bạn có thể thấy trường `LoggerLocalDataSource`. Nghĩa là `SerciceLocator` sẽ luôn trả về cùng một đối tượng giống nhau khi nó được gọi. Điều này được gọi là **xác định phạm vi của một đối tượng trong container**

# 6. Xác định phạm vi đối tượng trong các container
<br> Để container của ứng dụng cung cấp cùng một đối tượng `LoggerLocalDataSource`, ta thêm chú thích `@Singleton` vào lớp đó:
```kotlin
@Singleton
class LoggerLocalDataSource @Inject constructor(private val logDao: LogDao) : LoggerDataSource {
..
}
```
Hilt chưa biết cách cung cấp đối tượng `LogDao`, nhưng `LogDao` là một interface, nên không thể thêm chú thích `@Inject` nên phần tới sẽ là giải pháp cho chúng ta.

# 7. Module trong Hilt
<br> Các module được sử dụng để thêm các bindings vào Hilt, nói cho hilt biết cách cung cấp các đối tượng của các kiểu khác nhau, các kiểu không thể đưa vào trong hàm khởi tạo, chẳng hạn như các interface, các class không chứa trong dự án của bạn. Ví dụ như `OkHttpClient` bạn cần sử dụng `Builder` của nó để tạo đối tượng.
<br>Một Module Hilt là lớp đc chú thích với `@Module` và `@Installin`
<br> Ta sẽ tạo một package mới tên là `di`, tại đây tạo class mới là `DatabaseModule`. Bởi vì `LoggerLocalDataSource` được xác định phạm vi trong container của app, binding `LogDao` cần có sẵn trong container của app. Nên chúng ta chỉ ra yêu cầu đó bằng cách sử dụng chú thích `@ÍnatallIn` và truyền vào `SingletonComponent::class`
```kotlin
@InstallIn(SingletonComponent::class)
@Module
object DatabaseModule {

}
```
<br>Trong việc triển khai lớp `ServiceLocator`, một đối tượng `LogDao` được lấy bằng việc gọi phương thức `logDataBase.logDao()`. Do vậy, để cung cấp đối tượng này, ta phải có phụ thuộc bắc cầu trong Module class này.
<br>Chúng ta sử dụng chú thích `@Provides` để nói cho Hilt biết cách cung cấp các kiểu không thể đưa vào hàm khởi tạo. Phần thân hàm được chú thích bởi `@Provides` sẽ được thực hiện mỗi lần Hilt cần cung cấp một đối tượng kiểu đó.
```kotlin
@Module
object DatabaseModule {

    @Provides
    fun provideLogDao(database: AppDatabase): LogDao {
        return database.logDao()
    }
}
```
chúng ta cần cung cấp nốt `AppDatabase`, lớp này được tạo ra bởi `Room`, nên chúng ta sẽ viết hàm `@Provides` tương tự:
```kotlin
@Module
object DatabaseModule {

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext appContext: Context): AppDatabase {
        return Room.databaseBuilder(
            appContext,
            AppDatabase::class.java,
            "logging.db"
        ).build()
    }

    @Provides
    fun provideLogDao(database: AppDatabase): LogDao {
        return database.logDao()
    }
}
```
Bây giờ, Hilt đã có tất cả các thông tin cần thiết để đưa vào `LogsFragment`. Tuy nhiên, Hilt cần biết `Activity` nào sở hữu `fragment` để hoạt động. Ta mở class `MainActivity` và thêm chú thích `@AndroidEntryPoint`:
```kotlin
@AndroidEntryPoint
class MainActivity : AppCompatActivity() { ... }
```

# 8. Cung cấp các interface với @Binds
<br> `MainActivity` nhận một đối tượng của `AppNavigator` từ `ServiceLocator` bằng việc gọi hàm `provideNavigator()`. Vì `AppNavigator` là một interface, chúng ta không thể đưa vào hàm khởi tạo, bạn có thể sử dụng chú thích @Binds trong hàm bên trong Module Hilt.
<br> `@Binds` phải chú thích một abstract function. Kiểu trả về của function này là một interface mà chúng ta muốn cung cấp (`AppNavigator`). Chúng ta nên tạo một class Module mới vì một vài nguyên nhân sau:<br>
* Tổ chức tốt hơn, tên của Module nên truyền tải thông tin kiểu mà nó cung cấp. Ví dụ nó sẽ không hợp lí nếu đưa vào các binding của navigation trong Module có tên là `DatabaseModule`.
* `DatabaseModule` được cài đặt trong `SingletonComponent`, vì vậy các binding nằm trong container của ứng dụng. Thông tin navigation mới của chúng ta (`AppNavigator`) cần thông tin cụ thể từ Activity, vì thế nó phải được cài đặt trong container của Activity thay vì container của app.
* Module Hilt không thế chứa cả phương thức non-static và abstract func, vì vậy bạn không thể đặt các chú thích `@Binds` và `@Provides` trong cùng một lớp.
<br> Trong pakage `di` tạo class `NavigationModule` và tạo class trừu tượng như giải thích ở trên:
```kotlin
@InstallIn(ActivityComponent::class)
@Module
abstract class NavigationModule {

    @Binds
    abstract fun bindNavigator(impl: AppNavigatorImpl): AppNavigator
}
```
Tiếp theo bạn phải cho Hilt biết cách cung cấp các đối tượng của `AppNavigatorImpl`. Lớp này có thể đưa vào hàm khởi tạo, nên mở class `AppNavigatorImpl` và làm việc đó:
```kotlin
class AppNavigatorImpl @Inject constructor(
    private val activity: FragmentActivity
) : AppNavigator {
    ..
}
```
Bây giờ bạn đã có tất cả các thông tin của `AppNavigator`. Mở class `MainActivity` và làm như sau:<br>
1. Chú thích  trường `navigator` với `@Inject` để nhận mội đối tượng từ `Hilt`
2. Xóa `private`
3. Loại bỏ đoạn mã khởi tạo `navigator` trong `onCreate`
```kotlin 
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    @Inject lateinit var navigator: AppNavigator

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        if (savedInstanceState == null) {
            navigator.navigateTo(Screens.BUTTONS)
        }
    }

    ..
   }
  ```
Chỉ còn lớp vẫn đang sử dụng `ServiceLocator` để đưa vào phụ thuộc là `ButtonsFragment`. Bởi vì Hilt đã biết cách cung cấp tất cat các kiểu mà `ButtonsFragment` cần, chúng ta chỉ cần như sau:
1. Thêm chú thích `@AndroidEntryPoint.
2. Loại bỏ từ khóa `private` ở các trường `logger` và `navigation` và thay bằng `@Inject`.
3. Loại bỏ việc khởi tạo `populateFields` và xóa bỏ `onAttach`
```kotlin
@AndroidEntryPoint
class ButtonsFragment : Fragment() {

    @Inject lateinit var logger: LoggerLocalDataSource
    @Inject lateinit var navigator: AppNavigator

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_buttons, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        ...
    }
}
```
<br> Đến đây ta xóa bỏ lớp `ServiceLocator`. Trong class `LogApplication` vẫn dữ một đối tượng của `ServiceLocator`, ta xóa bỏ nó, vì hilt đã cung cấp tất cả. Hãy xóa cả trong package test nhé. Mã mới cho class `Application` là:
```kotlin
@HiltAndroidApp
class LogApplication : Application()
```
Đến đây mọi người có thể run app và thấy hilt hoạt động tốt. Trong bài viết mình chỉ trình bày đến đây thôi, đủ để ta nắm được cơ bản cách đưa Hilt vào trong dự án của mình.
<br> Cảm ơn mọi người đã dành thời gian quý báu của mình để đọc bài viết này, để tìm hiểu thêm về Hilt mọi người hãy truy cập vào [link này](https://developer.android.com/training/dependency-injection/hilt-android?authuser=2#component-lifetimes)

<br>Nguồn: https://developer.android.com/codelabs/android-hilt