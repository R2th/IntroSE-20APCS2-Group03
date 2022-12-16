Tiếp tục chủ để [Android Dev Summit 2019 có gì?](https://viblo.asia/p/android-dev-summit-2019-co-gi-YWOZrBGyZQ0). Ở bài viết này sẽ nói về **kế hoạch** phát triển **Dagger 2** của Google trong năm 2020.

Nội dung bài viết được lấy từ: [Gitconnected](https://levelup.gitconnected.com/googles-plan-for-dagger-2-beyond-2019-37e2f7d994e3)

Trước đây, để tích hợp Dagger vào ứng dụng rất phức tạp. Để giảm thiểu cũng như khắc phục vấn đề này, tại Android Dev Summit 2019, **Manuel Vivo** và **Daniel Santiago** đã có 1 cuộc nói chuyện về DI và kế hoạch cho `Dagger 2` **trong thời gian tới**. Chi tiết có thể xem ở [video](https://www.youtube.com/watch?v=o-ins1nvbDg&feature=emb_logo). Hoặc bạn có thể theo dõi bài viết này. Lưu ý đây chỉ là **kế hoạch sắp tới** thôi nhé.


Google đã nói rõ: 
>**Use Dagger 2 for your Medium / Large Android Project**

![](https://images.viblo.asia/2ba6a720-5f2b-47f5-9a88-1e7bda92fdd7.png)

### I. Dagger 2 sẽ hoạt động tốt hơn với Kotlin
#### 1. Hỗ trợ `@Module` annotation Object class
- Hiện tại chúng ta cần có `JvmStatic`:

```KOTLIN
@Module
object DatabaseModule {
  @Provides
  @JvmStatic
  fun provideDB(ctx: Context): AppDatabase {
    // ...
  }
}
```

- Kế hoạch là sẽ loại bỏ `JvmStatic`:
```KOTLIN
@Module
object DatabaseModule {
  @Provides
  fun provideDB(ctx: Context): AppDatabase {
    // ...
  }
}
```
#### 2. Nhận biết `@Qualifier` annotation
- Hiện tại chúng ta cần có 1 trường `field` cho Qualifier name:
```KOTLIN
class ProfileActivity: AppCompatActivity() {
  @Inject
  @field:Username
  lateinit var username: String
}
```
- Kế hoạch là loại bỏ `field`:
```KOTLIN
class ProfileActivity: AppCompatActivity() {
  @Inject
  @Username
  lateinit var username: String
}
```
#### 3. Nhận biết Kotlin Wildcards
- Hiện tại cần có `@JvmSupressWildcards` khi sử dụng `Kotlin wildcard`:
```KOTLIN
@Module
class ConfigurationModule {
  @Provides
  fun provideOptions(): List<@JvmSupressWildcards String> {
    // ...
  }
}
```
- Kế hoạch là loại bỏ nó:
```KOTLIN
@Module
class ConfigurationModule {
  @Provides
  fun provideOptions(): List<String> {
    // ...
  }
}
```
### II. Đơn giản sử dụng Dagger 2
#### 1. Jnjection
- Hiện tại, cách duy nhất đển inject `Dagger 2` vào Activity là get component và self injection 1 cách tường minh như bên dưới:
```KOTLIN
class PlayingActivity: AppCompactActivity() {
  @Inject
  lateinit var player: Player
  override fun onCreate() {
    val appComponent = (applicationContext as MyApp).appComponent
    appComponent.inject(this)
  }
}
```
hoặc chúng ta cần kế thừa Dagger 2 Activity class: 
```KOTLIN
class PlayingActivity: DaggerAppCompactActivity() {
  @Inject
  lateinit var player: Player
}
```
- Với kế hoạch tiếp theo của Google là sử dụng `@EntryPoint` để đơn giản hóa việc inject:
```KOTLIN
@EntryPoint
class PlayingActivity: AppCompactActivity() {
  @Inject
  lateinit var player: Player
}
```
Ngoài ra, còn support cho việc  inject `ViewModel`
```KOTLIN
@EntryPoint
class PlayingActivity: AppCompactActivity() {
  @Inject
  lateinit var playbackViewModel: PlaybackViewModel
}
```

#### 2. Predefined Components
Để sử dụng `Dagger 2` chúng ta cần define 1 `AppComponent` và là kiểu `Singleton`:
```KOTLIN
@Singleton
@Component(modules = [DatabaseModule::class]
interface AppComponent {
  fun injectActivity(activity: PlayingActivity)
}
@Module
object DatabaseModule {
  @Provides
  @Singleton
  fun provideDatabase (...): Music Database {
    // ... 
  }
}
```
- Google sẽ thay thế việc define `AppComponent` bằng việc sử dụng `@InstallIn` annotation ở bên ngoài với `SingletonComponent`:
```KOTLIN
@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {
  @Provides
  @Singleton
  fun provideDatabase (...): Music Database {
    // ... 
  }
}
```
Không chỉ cung cấp `SingletonComponent`  mà còn có `ActivityComponent`, `FragmentComponent`, `ServiceComponent`

![](https://images.viblo.asia/416c233b-c710-4fc6-9fe0-7b97257573d6.png)

Việc này giúp chúng ta tránh được việc tạo nhiều boilerplate code.

Việc thay đổi này của `Dagger 2` không ảnh hưởng đến cách sử dụng trước đó, nên chúng ta không cần phải quan tâm rằng nó có ảnh hưởng tới những phát triển trước đó.

### III. Dagger 2 Testing với EntryPoint
Cùng với `@EntryPoint` là `TestEntryPointRule` sẽ cung cấp component cho mỗi test. Ngoài ra có thể tùy chỉnh test cases với @TestModule để custom dependencies
```KOTLIN
@RunWtih(AndroidJUnit4::class)
class PlaybackTest {
  @Rule
  val testEntryPointRule = TestEntryPointRule()
  @TestModule
  object class PlaybackTestModule {
    @Provides
    fun provideFakeDB() = FakeMusicDatabase()
  }
  @Inject
  lateinit var player: Player
  val activity: PlaybackActivity
}
```

### IV Tương thích tốt với Jetpack Library
`Dagger 2` sẽ được xuất hiện trong Jetpack Library như ViewModel, WorkManager,..
Ở trên, Google đã recommends là sử dụng `Dagger 2` cho những project trung bình và lớn..

Cuối cùng, hi vọng là Google sẽ sớm thực hiện plan này.