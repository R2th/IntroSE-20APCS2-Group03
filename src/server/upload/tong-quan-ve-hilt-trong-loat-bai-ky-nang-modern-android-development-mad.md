Trong bài viết này, chúng ta sẽ xem xét lý do tại sao sử dụng dependency injection (DI) lại quan trọng đối với ứng dụng của bạn và Hilt, giải pháp được đề xuất của Jetpack cho DI trên Android.

Bằng cách tuân theo nguyên tắc cuối trong nguyên lý [SOLID](https://en.wikipedia.org/wiki/SOLID) vào ứng dụng Android, bạn đang tạo nên một kiến trúc ứng dụng tốt. Nó giúp tái sử dụng mã, dễ sửa đổi và dễ testing.

![image.png](https://images.viblo.asia/5e271de3-3736-4090-b57e-50be2d868fe3.png)

## Problem
Khi tạo các instances của các class trong project của bạn, bạn có thể thực hiện theo cách thủ công bằng cách thỏa mãn các phụ thuộc:
```kotlin
class FeedViewModel(
    private val loadCurrentMomentUseCase: LoadCurrentMomentUseCase
) : ViewModel()

//Ví dụ việc khởi tạo instance của class FeedViewModel: FeedViewModel(LoadCurrentMomentUseCase())
```
và phụ thuộc bắc cầu mà class yêu cầu:
```kotlin
class LoadCurrentMomentUseCase(
    private val getTimeZoneUseCase: GetTimeZoneUseCase
) {...} 

class FeedViewModel(
    private val loadCurrentMomentUseCase: LoadCurrentMomentUseCase
) : ViewModel()

//Ví dụ việc khởi tạo instance của class FeedViewModel: FeedViewModel(LoadCurrentMomentUseCase(GetTimeZoneUseCase())
```

Việc khởi tạo instance một cách thủ công như trên các bạn có thể thấy nhược điểm rằng nếu constructor của class `FeedViewModel` tiếp tục cần truyền vào nhiều tham số hơn, các tham số có nhiều sự phụ thuộc hơn thì một điều kinh khủng sẽ xảy ra, các bạn cũng mường tượng được rồi đúng không :D Không những thế việc làm này còn lặp đi lặp lại từ các class khác. Ôi! một khối lượng duplicate code khủng khiếp. Tất nhiên các bạn vẫn có cách để tránh việc duplicate code trong trường hợp này nhưng tội gì phải làm vậy khi các bạn đã có Hilt.

## Hilt
- [Hilt](https://developer.android.com/training/dependency-injection/hilt-android) là một dependency injection library được phát triển bởi Google giúp bạn tận dụng tối đa các phương pháp DI tốt nhất trong ứng dụng của mình bằng cách thực hiện các công việc khó khăn và tạo tất cả các sự phụ thuộc cần thiết. **Bên cạnh đó, Hilt cũng là giải pháp được đề xuất của Jetpack cho các ứng dụng Android và nó đi kèm với công cụ, hỗ trợ của các Jetpack library khác**.
- Bằng cách sử dụng annotations, Hilt sẽ generates đoạn code đó cho bạn tại thời điểm biên dịch (complie time), làm cho nó thực sự nhanh trong thời gian chạy. Điều này được thực hiện bằng cách sử dụng sức mạnh của [Dagger](https://developer.android.com/training/dependency-injection/dagger-basics), thư viện JVM DI mà Hilt được xây dựng trên đó.

## Quick start
- Tất cả các ứng dụng sử dụng Hilt phải chứa một Application class có **`@HiltAndroidApp`** annotation vì nó kích hoạt generate code của Hilt tại thời điểm biên dịch:
    ```kotlin
    @HiltAndroidApp
    class MusicApp : Application()
    ```
     và để Hilt có thể đưa các phụ thuộc vào một Activity thì Activity đó cần phải có **`@AndroidEntryPoint`** annotaion:
     ```kotlin
    @AndroidEntryPoint
    class PlayActivity : AppCompatActivity() { /* ... */ }
    ```
- Để thêm một phụ thuộc, hãy sử dụng **`@Inject`** annotation vào các biến mà bạn muốn Hilt đưa vào. Tất cả các biến được đưa vào Hilt sẽ khả dụng khi `super.onCreate` được gọi:
    ```kotlin
    @AndroidEntryPoint
    class PlayActivity : AppCompatActivity() {

      @Inject lateinit var player: MusicPlayer

      override fun onCreate(savedInstanceState: Bundle) {
        super.onCreate(bundle)
        player.play("YHLQMDLG")
      }
    }
    ```

    Trong ví dụ này, đoạn code `@Inject lateinit var player: MusicPlayer` đang "tiêm" (inject) một instance có kiểu là `MusicPlayer` vào `PlayActivity` class. Nhưng làm thế nào Hilt biết cách cung cấp instance có kiểu là `MusicPlayer`? Hiện tại thì chưa, bạn cần cho Hilt biết cách làm điều đó bằng cách sử dụng **`@Inject`** annotation với constructor của `MusicPlayer` class:
    ```kotlin
    class MusicPlayer @Inject constructor() {
      fun play(id: String) { ... }
    }
    ```

- Đây là tất cả những gì cần thiết để làm DI hoạt động trong project của bạn. Thực sự quá dễ dàng nhỉ :D. Vừa rồi là một ví dụ đơn giản là `MusicPlayer` class không phụ thuộc vào bất kỳ class nào khác. Nhưng nếu bạn có các phụ thuộc khác được truyền dưới dạng các tham số, Hilt sẽ xử lý điều đó và đáp ứng các phụ thuộc đó khi cung cấp một instance của `MusicPlayer`:
    ```kotlin
    //trong activity vẫn chỉ cần sử dụng
    @Inject lateinit var player: MusicPlayer

    class MusicPlayer @Inject constructor(
        private val musicRepository: MusicRepository
    ) {
      fun play(id: String) { ... }
    }

    class MusicRepository @Inject constructor() { ... }
    ```

## Annotations recap
- Cho đến nay, chúng ta đã thấy rằng khi **`@Inject`** được sử dụng để chú thích cho constructor của một class, nó sẽ cho Hilt biết cách cung cấp các instance của class đó. Và khi nó chú thích một biến trong một **`@AndroidEntryPoint`** class, Hilt sẽ đưa một instance của kiểu đó vào class.
- **`@AndroidEntryPoint`**: có thể chú thích hầu hết các class của Android framework, không chỉ mỗi Activity. Nó sẽ tự tạo một class như một vùng chứa các phụ thuộc cho class có **`@AndroidEntryPoint`** annotation và tạo tất cả các biến có **`@Inject`** annotation với kiểu tướng ứng.
- **`@HiltAndroidApp`**: được sử dụng ở class kế thừa Application class. Ngoài việc kích hoạt việc generate code của Hilt nó còn tạo một vùng chứa các phụ thuộc được liến kết với Application class của bạn.

## Hilt Modules
- Bây giờ các bạn đã có những kiến thức cơ bản về Hilt, hãy làm phức tạp thêm ví dụ ở phía trên hơn nữa nhé :D.
- Trong ví dụ gần nhất, `MusicPlayer` class có thêm sự phụ thuộc là `MusicRepository` class, thông thường việc giao tiếp giữa các lớp với nhau sẽ thông qua interface, nếu bạn truyền tham số cho constructor của `MusicPlayer` class là một interface hoặc một class nhưng bạn lại không sở hữu class đó vì nó được lấy từ thư viện,... thì bạn không thể có **`@Inject`** annotation trong constructor được.
- Mình sẽ đổi tham số truyền vào constructor của `MusicPlayer` class là `MusicDatabase` (đây là một abstract class)
    ```kotlin
    abstract class MusicDatabase : RoomDatabase() { ... }

    class MusicPlayer @Inject constructor(
      private val db: MusicDatabase
    ) {
      fun play(id: String) { ... }
    }
    ```
- Trong Hilt thì bạn không cần phải lo lắng về các phụ thuộc có tính chất bắc cầu, vì nó sẽ tự động kết nối tất cả các phụ thuộc đó lại với nhau. Tuy nhiên, các bạn cần cho Hilt biết cách cung cấp để tạo các instance đó. Ở ví dụ trên để cung cấp instance của `MusicDatabase` các bạn hãy sử dụng Hilt modules.
- Hilt modules là một class có **`@Module`** annotation , trong class này sẽ có các function cho Hilt biết cách cung cấp để tạo các instance của một số kiểu nhất định. Trong thuật ngữ Hilt, vấn đề này được gọi là ***bindings*** .
    ```kotlin
    @Module
    @InstallIn(SingletonComponent::class)
    object DataModule {

      @Provides
      fun provideMusicDB(@ApplicationContext context: Context): MusicDatabase {
        return Room.databaseBuilder(
          context, MusicDatabase::class.java, "music.db"
        ).build()
      }
    }
    ```
    Function `provideMusicDB` có **`@Provides`** annotation cho Hilt biết cách cung cấp instance có kiểu là `MusicDatabase`. Phần nội dung bên trong khối block sẽ chứa code mà Hilt cần phải thực thi. Tham số truyền vào cho Hilt biết các phụ thuộc với các kiểu tương ứng, trong trường hợp này là `Context`, trong Hilt đã có sẵn **`@ApplicationContext`** annotation để các bạn có thể lấy được context của ứng dụng rồi. Tóm lại, function này sẽ cung cấp instance của `MusicDatabase`, và việc khởi tạo instance của `MusicPlayer` vẫn không có gì thay đổi:
     ```kotlin
     @Inject lateinit var player: MusicPlayer
     ```
     vì Hilt đã tự tạo các phụ thuộc cho bạn rồi, thật là tuyệt vời :D.
- Hilt modules cũng có **`@InstallIn`** annotation cho biết thông tin này đã có sẵn trong các vùng chứa hoặc các components phụ thuộc gì (như `SingletonComponent` ở ví dụ trên), chúng ta sẽ cùng nhau tìm hiểu các components là gì nhé.

## Hilt Components
- Hilt Components là một class mà Hilt tạo ra có trách nhiệm cung cấp các instance của từng loại. Tại thời điểm biên dịch, Hilt duyệt qua "đồ thị" phụ thuộc của ứng dụng của bạn và tạo mã để cũng cấp tất cả các kiểu với các phụ thuộc bắc cầu của chúng.
- Hệ thống phân cấp các components của Hilt

    ![image.png](https://images.viblo.asia/fc0210a0-3524-473d-94b5-2dbb2f66a5aa.png)
    
    Ở ví dụ gần nhất `MusicDatabase` được binding trong component là `SingletonComponent` thì nó cũng sẽ có sẵn trong các component còn lại trong hệ thống phân cấp.
- Các component này được tạo tự động tại thời điểm biên dịch, chúng được tạo, quản lý và liên kết với các framework Android tương ứng khi bạn chú thích các class đó bằng **`@AndroidEntryPoint`** annotation.
- Các **`@InstallIn`** annotation cho module rất hữu ích để kiểm soát những nơi có sự ràng buộc (binding) lại với nhau.

## Scoping
- Ở phần đầu mình có nhắc việc tạo các instance một cách thủ công, nếu bạn để ý thì mỗi lần tạo instance các bạn đang tạo một phiên bản khác của nó. Điều đó hoàn toàn không lý tưởng một chút nào, hãy nên sử dụng chỉ cùng một phiên bản của instance trong toàn bộ ứng dụng. Có rất nhiều cách để có thể thực hiện việc tạo một instance duy nhất, đặc biệt là với ngôn ngữ kotlin, chúng ta sẽ phải viết logic, code thêm rất nhiều đặc biệt với các trường hợp có sự phụ thuộc bắc cầu nhưng với Hilt chỉ cần thêm **`@Singleton`** annotation sẽ giải quyết mọi vấn đề :D
- Bằng cách sử dụng **`@Singleton`** annotation trong các **`@Provides`** method, các bạn đang nói với Hilt rằng sẽ luôn chia sẻ cùng một phiên bản của kiểu này trong component đó.
    ```kotlin
    @Module
    @InstallIn(SingletonComponent::class)
    object DataModule {

      @Singleton	
      @Provides
      fun provideMusicDB(@ApplicationContext context: Context): MusicDatabase {
        return Room.databaseBuilder(
          context, MusicDatabase::class.java, "music.db"
        ).build()
      }
    }
    ```
    Ở đoạn code trên Hilt sẽ giúp bạn tạo một instance, một phiên bản duy nhất của `MusicDatabase` trong toàn bộ ứng dụng.
- **`@Singleton`** là một scope annotation. Mỗi Hilt component sẽ có một scope annotation tương ứng

    ![image.png](https://images.viblo.asia/12c78dee-6bc7-44ed-9b41-5194b0565476.png)

- Nếu bạn muốn xác định một scope trong `ActivityComponent` hãy sử dụng **`@ActivityScoped`** annotation. Các annotation này có thể được sử dụng trong module nhưng chúng cũng có thể sử dụng trong các class mà constructor có **`@Inject`** annotation.

## Bindings

Có hai loại bindings:
- **Unscoped bindings**: là các liên kết mà không được chú thích bằng các scope annotaion. Các liên kết này có sẵn cho tất cả các component nếu chúng không được installed trong một module, giống `MusicPlayer` trong các ví dụ trên.
- **Scoped bindings**: là các liên kết được chú thích bằng các scope annotaion hoặc các unscoped bindings được installed trong một module của coponent tương ứng, giống `MusicDatabase` trong các ví dụ trên.

## Jetpack Extensions

- Hilt cung cấp tích hợp với các Jetpack library phổ biến nhất như: ViewModel, Navigation, Compose và WorkManager.
- Ngoài ViewModel ra thì khi tích hợp với các Jetpack library khác các bạn sẽ phải thêm một số yêu cầu nhỏ nữa để sử dụng Hilt, [chi tiết](https://developer.android.com/training/dependency-injection/hilt-jetpack).
    ```kotlin
    @HiltViewModel
    class ExampleViewModel @Inject constructor(
      private val savedStateHandle: SavedStateHandle,
      private val repository: ExampleRepository
    ) : ViewModel() {
      ...
    }
    ```
    Ngoài việc constructor vẫn có **`@Inject`** annotation, để cho Hilt biết cách cung cấp các phiên bản của ViewModel này, bạn chỉ cần chú thích lớp với annotaion là **`@HiltViewModel`**. Vậy là xong, hilt sẽ xử lý việc tạo instance của ViewModel này cho bạn, nhưng hãy đảm bảo rằng bạn đã có các liên kết để tạo các instance như `SavedStateHandle`, `ExampleRepository`. Bạn muốn lấy instance của ViewModel trên Activity, Fragment,... đơn giản với một dòng code :D
    ```kotlin
    private val viewModel: ExampleViewModel by viewModels()
    ```

## Learn more!

- Hilt được xây dựng trên [Dagger](https://developer.android.com/training/dependency-injection/dagger-basics) , nếu bạn đang sử dụng Dagger rồi thì có thể sử dụng kèm theo cả Hilt nữa, chúng có thể hoạt động cùng với nhau, [chi tiết](https://dagger.dev/hilt/migration-guide).
- Đến đây các bạn cũng sẽ thắc mắc rằng vậy có bao nhiêu annotaion trong Hilt, trong trường hợp nào thì mình cần sử dụng annotaion đó? Trong Hilt thì các annotations là bất tận, tại sao mình nói như vậy vì bạn có thể tự tạo thêm những [custom annotations](https://dagger.dev/hilt/custom-components) theo ý bạn mong muốn. Trên documents đã liệt kê tất cả những annotations phổ biến nhất, hay dùng nhất, họ có đề cập đến cách sử dụng và có cả code sample nữa, [chi tiết](https://developer.android.com/training/dependency-injection/hilt-cheatsheet).
- Trên document cũng có các bài [codelab](https://developer.android.com/codelabs/android-hilt#0), nó sẽ giúp bạn học hỏi được nhiều hơn và có trải nghiệm thực tế hơn. Các bạn còn chần chừ gì nữa mà không áp dụng ngay Hilt vào project của mình đi nào :D.

## References
- https://medium.com/androiddevelopers/introduction-to-hilt-in-the-mad-skills-series-40f0908f2fc0


  Bài viết đến đây là kết thúc rồi, hi vọng qua bài viết này đem lại cho các bạn cái nhìn tổng quan nhất về Hilt, thấy được những giá trị mà Hilt đem lại. Hẹn gặp các bạn trong những bài viết mới nhất về kỹ năng MAD (Modern Android Development) trong Android <3