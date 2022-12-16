### Mở đầu
SharedPreference là một thành phần rất quan trọng trong Android, mặc dù không phải ứng dụng nào cũng sử dụng tới nó. Bài viết này mình sẽ giới thiệu cách sử dụng RxJava để lắng nghe những thay đổi trên SharedPreferences, có thể sẽ hữu ích cho bạn :D.

VÍ dụ nó sẽ hoạt động như thế này:
![](https://images.viblo.asia/2eb3a0d3-c9d3-4e90-a405-050c7f3f90f4.gif)

### Cách thực hiện
**Đầu tiên**, mở file build.gradle (module app) và thêm những dòng sau vào Dependency:
```java
  implementation 'androidx.core:core-ktx:1.0.2'
  implementation 'io.reactivex.rxjava2:rxjava:2.2.8'
  implementation 'io.reactivex.rxjava2:rxandroid:2.1.1'
```
Tạo lớp NameRepository định nghĩa những phương thức :
```kotlin
interface NameRepository {

    fun saveName(name: String): Completable

    fun name(): Observable<String>

    fun clear(): Completable
```

Đây mới chỉ là contract interface, chúng ta sẽ implement các phương thức trong interface này trong lớp SharedPreferencesNameRepository.
```kotlin
class SharedPreferencesNameRepository(preferences: SharedPreferences) : NameRepository {
    private val prefSubject = BehaviorSubject.createDefault(preferences)

    private val prefChangeListener = SharedPreferences.OnSharedPreferenceChangeListener { sharedPreferences, _ ->
        prefSubject.onNext(sharedPreferences)
    }

    companion object {

        @JvmStatic
        fun create(context: Context): SharedPreferencesNameRepository {
            val preferences = context.getSharedPreferences("RxPrefs", Context.MODE_PRIVATE)
            return SharedPreferencesNameRepository(preferences)
        }

        private const val KEY_NAME = "key_name"

    }

    init {
        preferences.registerOnSharedPreferenceChangeListener(prefChangeListener)
    }

    override fun saveName(name: String): Completable = prefSubject
            .firstOrError()
            .editSharedPreferences {
                putString(KEY_NAME, name)
            }

    override fun name(): Observable<String> = prefSubject
            .map { it.getString(KEY_NAME, "") }


    override fun clear(): Completable {
        return prefSubject.firstOrError()
                .clearSharedPreferences {
                    remove(KEY_NAME)
                }
    }

    fun Single<SharedPreferences>.editSharedPreferences(batch: SharedPreferences.Editor.() -> Unit): Completable =
            flatMapCompletable {
                Completable.fromAction {
                    it.edit().also(batch).apply()
                }
            }

    fun Single<SharedPreferences>.clearSharedPreferences(batch: SharedPreferences.Editor.() -> Unit): Completable =
            flatMapCompletable {
                Completable.fromAction {
                    it.edit().also(batch).apply()
                }
            }
    
}
```

Chũng ta sẽ giải thích từng phần trong class kia nhé.

```kotlin
companion object {
        @JvmStatic
        fun create(context: Context): SharedPreferencesNameRepository {
            val preferences = context.getSharedPreferences("RxPrefs", Context.MODE_PRIVATE)
            return SharedPreferencesNameRepository(preferences)
        }

        private const val KEY_NAME = "key_name"
    }
```
Đầu tiên , tạo một phương thức static create(context: Context), để khởi tạo SharedPreferencesNameRepository, trong đó tạo ra một instance của SharedPreferences và truyền vào constructor của SharedPreferencesNameRepository.

```kotlin 
private val prefSubject = BehaviorSubject.createDefault(preferences)

    private val prefChangeListener = SharedPreferences.OnSharedPreferenceChangeListener { sharedPreferences, _ ->
        prefSubject.onNext(sharedPreferences)
    }

    init {
        preferences.registerOnSharedPreferenceChangeListener(prefChangeListener)
    }
```

Sau đó, tạo một [BehaviorSubject](http://reactivex.io/rxjs/manual/overview.html#behaviorsubject) với SharedPreferences được lấy từ constructor. 
Và tạo SharedPreferences.[OnSharedPreferenceChangeListener](https://developer.android.com/reference/android/content/SharedPreferences.OnSharedPreferenceChangeListener) cung cấp cho chúng ta SharedPreferences đã được cập nhật bất cứ khi nào giá trị trong SharedPreferences thay đổi.

Sau đó, dùng preferences để đăng ký lắng nghe preferenceChangeListener trong init block.
Bây giờ ta đã biết khi nào SharedPreferences thay đổi và sẽ được BehaviorSubject bắn ra SharedPreferences mới nhất.

Tiếp đó, ta sẽ implement các phương thức trong NameRepository:
```kotlin
override fun saveName(name: String): Completable = prefSubject
                    .firstOrError()
                    .editSharedPreferences {
                        putString(KEY_NAME, name)
                    }

    fun Single<SharedPreferences>.editSharedPreferences(batch: SharedPreferences.Editor.() -> Unit): Completable =
            flatMapCompletable {
                Completable.fromAction {
                    it.edit().also(batch).apply()
                }
            }
```
* **saveName()** truyền vào một String và trả về một [Completable](http://reactivex.io/RxJava/javadoc/io/reactivex/Completable.html) . Sau đó, chúng ta chuyển đổi BehaviorSubject (prefSubject) thành  [Single](http://reactivex.io/RxJava/javadoc/io/reactivex/Single.html) bằng cách sử dụng [firstOrError ()](http://reactivex.io/RxJava/javadoc/io/reactivex/Observable.html#firstOrError--). Và sau đó  tọ một Kotlin extension function để chỉnh sửa giá trị SharedPreferences và lưu lại.

```kotlin
override fun name(): Observable<String> = prefSubject
            .map { it.getString(KEY_NAME, "") }
```
Sau đó, chúng ta có  name() trả về một Observable và bất cứ khi nào giá trị SharedPreference thay đổi thì prefSubject sẽ phát ra SharedPreferences được cập nhật và chúng ta nhận được tên đã lưu mới nhất từ  phương thức này.

```kotlin
override fun clear(): Completable {
        return prefSubject.firstOrError()
                .clearSharedPreferences {
                    remove(KEY_NAME)
                }
    }

    fun Single<SharedPreferences>.clearSharedPreferences(batch: SharedPreferences.Editor.() -> Unit): Completable =
            flatMapCompletable {
                Completable.fromAction {
                    it.edit().also(batch).apply()
                }

```

Cuối dùng, chúng ta có phương thức clear(). Phương thức này ngược với saveName() gọi extension function trên prefSubject và xóa tên khỏi SharedPreferences.

Đó là tất cả cho Repository. Bây giờ công việc chính là  khởi tạo nó và sử dụng các phương thức(giao diện thì chắc ko cần nhỉ :D).
Trong Activity, thêm đoạn sau:
```kotlin
private lateinit var repository: NameRepository
private val disposables = CompositeDisposable()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        repository = SharedPreferencesNameRepository.create(this)
        handleData()
    }
    
    private fun handleData() {
        bSubmit.setOnClickListener {
            val name = etName.text.toString()
            disposables.add(repository.saveName(name).subscribe())
        }

        disposables.add(repository.name().subscribe({
            tvName.text = it
        }, {
            Log.e("Error : ", "", it)
        }))

        bClear.setOnClickListener {
            disposables.add(repository.clear().subscribe())
        }
    }
```
phần xử lý nằm trong handleData()
* Khi nhấp vào nút Submit. Đầu tiên, chúng ta sẽ nhận được tên được nhập vào từ từ EditText và sau đó gọi repository.saveName().
* Chúng ta đang lắng nghe thay đổi bằng cách đăng ký repository.name() sẽ phát ra giá trị bất cứ khi nào giá trị trong SharedPreferences thay đổi.
* Cuối cùng, khi nhấp vào nút Clear, chúng tôi sẽ xóa tên đã lưu khỏi SharedPreferences.

Thử build và xem kết quả nhé :D.

Bài viết được dịch có tâm từ https://proandroiddev.com/observe-sharedpreferences-changes-using-rxjava-f0f3b43c6329. 

thank you :D