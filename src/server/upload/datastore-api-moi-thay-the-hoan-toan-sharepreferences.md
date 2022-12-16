Trong một số trường hợp, bạn muốn lưu trữ các dữ liệu nhỏ hoặc đơn giản. Để làm điều này, thứ bạn nghĩ đến chắc chắn là [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences). Nhưng nó có khá nhiều nhược điểm.
Để giải quyết những nhược điểm đã và đang tồn tại ở [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences), Android Jetpack cung cấp cho bạn 1 API hoàn toàn mới, vừa mới được ra mắt ở Google IO 2021 này, đó là [DataStore](https://developer.android.com/topic/libraries/architecture/datastore). 

# [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) là gì?

[DataStore](https://developer.android.com/topic/libraries/architecture/datastore) là một phương thức lưu trữ dữ liệu cho phép bạn lưu trữ theo key-value hoặc kiểu đối tượng với [protocol buffers](https://developers.google.com/protocol-buffers?authuser=2).

[DataStore](https://developer.android.com/topic/libraries/architecture/datastore) sử dụng [Kotlin coroutine](https://kotlinlang.org/docs/coroutines-overview.html) và [Flow](https://kotlinlang.org/docs/flow.html) để lưu trữ dữ liệu bất đồng bộ.

# [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) ≠ [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences)

![](https://images.viblo.asia/ad34294c-17e0-429b-9b50-e2c4957fe55c.png)


# [PreferencesDataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2#preferences-datastore) ≠ [ProtoDataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2#proto-datastore)

- [PreferencesDataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2#preferences-datastore)
    - Giúp bạn lưu trữ data theo dạng **key-value pairs**. Nhưng các bạn chỉ có thể lưu trữ data với các kiểu dữ liệu nguyên thủy (string, integer, float, double, boolean, long, ...).
    - Giống như [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences), bạn không có cách nào để xác định 1 schema hoặc đảm bảo rằng các key của bạn được truy cập với đúng kiểu.
- [ProtoDataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2#proto-datastore)
    - Giúp bạn lưu trữ data theo typed objects, tức là bạn có thể lưu trữ các object tùy ý do được hỗ trợ bởi protocol buffers.
    - Muốn sử dụng [ProtoDataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2#proto-datastore) thì bạn phải tự xác định schema bằng việc sử dụng Protocol Buffers. Chúng nhanh hơn, nhỏ hơn, đơn giản hơn và ít gây hoang mang hơn so với XML và các định dạng tương tự khác. Nhưng bù lại, bạn sẽ phải học một cơ chế serialization mới 😵.

# Cách sử dụng [DataStore](https://developer.android.com/topic/libraries/architecture/datastore)

Trong bài viết này, mình sẽ hướng dẫn các bạn cách để áp dụng [PreferencesDataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2#preferences-datastore). 
Nếu các bạn có nhã hứng với [ProtoDataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2#proto-datastore), có thể ghé thăm bài viết tiếp theo của mình, hoặc các bạn có thể vào đường link này để tham khảo.
[https://developer.android.com/codelabs/android-proto-datastore#0](https://developer.android.com/codelabs/android-proto-datastore#0)

### Giới thiệu đôi chút về example

Link demo: https://github.com/hide-your-code/data_store_example. Nhớ thả star và rất mong các bạn contribute để giúp mình hoàn thiện hơn <3

App hiển thị số được lưu vào trong disk và khi bấm vào nút "Count ++" thì sẽ tăng số đó lên 1 và lưu số đó vào trong disk.

![Giới thiệu về example](https://images.viblo.asia/458895a3-f5ae-4c67-9e98-49fb4b1a4a48.png)

App tuân theo architecture của Android khuyên dùng [ở đây](https://developer.android.com/topic/libraries/architecture/guide.html?authuser=2). Và sau đây mình sẽ giới thiệu một chút về các package trong project:

- `data`
    - Class `DataStoreHelper` - Nơi cung cấp [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) và các action liên quan đến [DataStore](https://developer.android.com/topic/libraries/architecture/datastore).
    - Class `DataStoreRepository` có trách nhiệm cung cấp count từ [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) để hiển thị. Ngoài ra, count hiện tại cũng sẽ được lưu ở trong [DataStore](https://developer.android.com/topic/libraries/architecture/datastore).
- `ui`
    - `MainActivity` dùng làm nơi để chứa các fragment.
    - `PreferencesDataStoreFragment` là UI để hiển thị ra count và các action cho count.
    - `PreferencesDataStoreViewModel` thực hiện các business logic cũng như là nơi chứa các data để hiển thị lên UI.

Vậy là mình đã giới thiệu xong, giờ cùng bắt tay vào việc thêm [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) vào project của bạn.

### Thêm các dependency vào project

Thêm dependency này vào `build.gradle` để có thể sử dụng [PreferencesDataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2#preferences-datastore):

```groovy
implementation "androidx.datastore:datastore-preferences:1.0.0-beta01"
```

Hoặc nếu các bạn dùng kts, thì dùng phía dưới nhé:

```kotlin
implementation("androidx.datastore:datastore-preferences:1.0.0-beta01")
```

Thời điểm bài viết này được viết thì mới có bản beta đầu tiên, bạn nên update phiên bản mới nhất nhé 😆.

### Tạo [PreferencesDataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2#preferences-datastore)

Để tạo instance của DataStore, mình sử dụng toán tử delegate `preferencesDataStore`. Toán tử này yêu cầu bạn phải được gọi từ `Context`.

```kotlin
private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = PREFERENCE_NAME)

companion object {
	private const val PREFERENCE_NAME = "todo"
}
```

Toán tử `preferencesDataStore` đảm bảo rằng bạn chỉ có instance duy nhất của DataStore. Vậy nên, mình khuyên bạn cũng nên khởi tạo duy nhất class `DataStoreHelper`. Ở đây mình sử dụng 1 thư viện dependency inject để khởi tạo, đó là [Hilt](https://developer.android.com/training/dependency-injection/hilt-android). Vậy nên các bạn nào chưa biết về [Hilt](https://developer.android.com/training/dependency-injection/hilt-android), hay [Dagger](https://developer.android.com/training/dependency-injection/dagger-basics), hãy tìm hiểu qua về chúng, đảm bảo với bạn rằng nó thú vị lắm đó 😍.

```kotlin
@Singleton
class DataStoreHelper @Inject constructor(@ApplicationContext private val context: Context) {
	
	private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = PREFERENCE_NAME)

	...

	companion object {
		private const val PREFERENCE_NAME = "todo"
	}
}
```

Ở đây, mình sử dụng `ApplicationContext` để khởi tạo [DataStore](https://developer.android.com/topic/libraries/architecture/datastore).

### Đọc dữ liệu từ [DataStore](https://developer.android.com/topic/libraries/architecture/datastore)

[PreferencesDataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2#preferences-datastore) cho phép bạn lấy dữ liệu thông qua `Flow<Preferences>`. Nó giúp bạn emit preferences mọi lúc miễn là có dữ liệu thay đổi.

Điều đầu tiên trước khi bạn muốn đọc dữ liệu, là phải xác định được key của Preferences. Với Preferences, bạn sẽ phải khai báo key theo những kiểu dưới đây do [PreferencesDataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2#preferences-datastore) hỗ trợ:

- `intPreferencesKey`: lấy key với value theo kiểu int.
- `doublePreferencesKey`: lấy key với value theo kiểu double.
- `stringPreferencesKey`: lấy key với value theo kiểu string.
- `booleanPreferencesKey`: lấy key với value theo kiểu boolean.
- `floatPreferencesKey`: lấy key với value theo kiểu float.
- `longPreferencesKey`: lấy key với value theo kiểu long.
- `stringSetPreferencesKey`: lấy key với value theo kiểu String Set.

Ở đây mình sẽ khởi tạo 1 key có tên là `KEY_COUNTER`. Key này mình để lưu trữ giá trị của Count.

```kotlin
private val KEY_COUNTER = intPreferencesKey("EXAMPLE_COUNTER")
```

Sau khi bạn đã khai báo key xong, bạn có thể lấy dữ liệu của [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) bằng cách tạo 1 `counter: Flow<Int>` dựa trên `dataStore.data: Flow<Preferences>`.

```kotlin
val counter: Flow<Int> = context.dataStore.data.map {
	it[KEY_COUNTER] ?: 0
}
```

Nhưng khoan, lúc nãy mình có so sánh là [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) có thể handle được exception. Vậy làm thế nào để handle exception khi lấy dữ liệu từ [DataStore](https://developer.android.com/topic/libraries/architecture/datastore)?

Vì [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) đọc dữ liệu từ file, nên `IOException` có thể bắn ra khi có lỗi trong việc đọc dữ liệu. Bạn có thể handle chúng bằng việc sử dụng `catch()` của [Flow](https://kotlinlang.org/docs/flow.html) trước khi bạn dùng toán tử `map` và emit `emptyPreferences()` trong trường hợp lỗi ở đây là `IOException`. Nếu các lỗi khác, thì bạn có thể làm gì tùy ý bạn 🥺

```kotlin
val counter = context.dataStore.data
	.catch { exception ->
		if (exception is IOException) {
			emit(emptyPreferences())
		} else {
			throw exception
		}
	}.map {
		it[KEY_COUNTER] ?: 0
	}
```

hoặc bạn có thể dùng function này để viết cho gọn 😅

```kotlin
private fun <T> getValue(transform: (preferences: Preferences) -> T): Flow<T> = context.dataStore.data
	.catch { exception ->
		if (exception is IOException) {
			emit(emptyPreferences())
		} else {
			throw exception
		}
	}.map {
		transform.invoke(it)
	}

val counter = getValue {
	it[KEY_COUNTER] ?: 0
}
```

### Ghi dữ liệu vào [DataStore](https://developer.android.com/topic/libraries/architecture/datastore)

Để ghi dữ liệu vào [DataStore](https://developer.android.com/topic/libraries/architecture/datastore), bạn cần sử dụng suspend function `DataStore.edit(transform: suspend (MutablePreferences) -> Unit)`.
`MutablePreferences` được truyền từ transform sẽ liên tục cập nhật với bất kì lần edit nào trước đó. Tất cả những thay đổi nào tới `MutablePreferences` trong transform đều được ghi vào ổ cứng sau khi `transform` hoàn thành và trước khi `edit` hoàn thành.

Đây là cách bạn có thể ghi dữ liệu vào [DataStore](https://developer.android.com/topic/libraries/architecture/datastore):

```kotlin
suspend fun setCounter(counter: Int) = context.dataStore.edit {
	it[KEY_COUNTER] = counter
}
```

`edit()` bắn ra `IOException` nếu xảy ra lỗi khi đọc hoặc ghi vào đĩa. Nếu có bất kì error xảy ra ở khối transform, nó sẽ bắn exception bởi `edit()`.

Vậy nên, bạn có thể bắt exception như sau:

```kotlin
private suspend fun setValue(transform: (preference: MutablePreferences) -> Unit) = try {
	context.dataStore.edit{
		transform.invoke(it)
	}
} catch (exception: Exception) {
	Timber.d("DataStore: Fail to set value - $exception")
}

suspend fun setCounter(counter: Int) = setValue {
	it[KEY_COUNTER] = counter
}
```

Và các bạn nên nhớ rằng, `Preferences` là chỉ có thể lấy dữ liệu thông qua hàm `DataStore.data`, không có chức năng ghi dữ liệu. Nếu bạn muốn ghi dữ liệu, hãy sử dụng `MutablePreferences` thông qua hàm `DataStore.edit()`. 

### Chuyển từ [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences) sang [PreferencesDataStore](https://developer.android.com/topic/libraries/architecture/datastore#preferences-datastore)

Để có thể thực hiện việc chuyển sang [DataStore](https://developer.android.com/topic/libraries/architecture/datastore), bạn cần cập nhật [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) builder để truyền vào `SharePreferencesMigration` tới migrate list. DataStore sẽ tự động chuyển từ [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences) sang [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) một cách tự động. Việc di chuyển này chạy khi có bất kì dữ liệu nào truy cập vào [DataStore](https://developer.android.com/topic/libraries/architecture/datastore). Điều đó có nghĩa là việc di chuyển đó cần thực hiện trước khi `DataStore.data` emit bất kì giá trị nào và trước khi `DataStore.edit()` cập nhật giá trị nào.

Điều quan trọng khi bạn chuyển sang [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) từ [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences) là việc chuyển sang [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) chỉ thực hiện một lần, nên bạn cần phải ngừng việc sử dụng SharePreferences sau khi việc chuyển đổi sang DataStore.

Và đây là cách để bạn có thể chuyển từ [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences) sang [PreferencesDataStore](https://developer.android.com/topic/libraries/architecture/datastore#preferences-datastore):

```kotlin
private val Context.dataStoreMigrate: DataStore<Preferences> by preferencesDataStore(
	name = PREFERENCE_NAME,
	produceMigrations = {
		listOf(SharedPreferencesMigration(it, PREFERENCE_NAME))
	})
```

Ở đây, `PREFERENCES_NAME` chính là tên [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences) mà bạn đặt.

Việc còn lại của bạn là triển khai xuống Repository để ViewModel có thể lấy hoặc ghi dữ liệu :D Các bạn có thể tham khảo project ở link trên nếu không biết cách nhé. 🤤

# Tổng kết
Vậy tổng hợp lại, đây là những lý do bạn mà bạn nên chuyển từ [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences)  sang [DataStore](https://developer.android.com/topic/libraries/architecture/datastore):
- [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences) là 1 API đồng bộ tưởng chừng có thể an toàn khi gọi trên UI Thread, không có bắn error, ....
- [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) sinh ra để giải quyết gần như tất cả những yếu điểm của [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences).
- [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) là API không đồng bộ bằng cách sử dụng Kotlin coroutine và Flow, đảm bảo tính nhất quán và xử lý error.

# Nguồn tài liệu và tham khảo
1. [Android Developer - DataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2)
2. [Android Codelab - Preferences DataStore](https://developer.android.com/codelabs/android-preferences-datastore?authuser=2#0)
3. [Android Blog - Prefer Storing Data with Jetpack DataStore](https://android-developers.googleblog.com/2020/09/prefer-storing-data-with-jetpack.html)