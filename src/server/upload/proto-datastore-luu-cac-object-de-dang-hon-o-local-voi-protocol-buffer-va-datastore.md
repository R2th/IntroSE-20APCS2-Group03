Như [bài viết](https://viblo.asia/p/datastore-api-moi-thay-the-hoan-toan-sharepreferences-gAm5yVeOKdb) trước, mình có đề cập là [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore) lưu trữ data theo typed object, tức là bạn có thể lưu trữ các object tùy ý do được hỗ trợ bởi [Protocol Buffers](https://developers.google.com/protocol-buffers).
Vậy nay hãy cùng xem cách cài đặt [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore) bằng 1 sample nhỏ sau đây xem có điểm gì khác biệt so với [Preference DataStore](https://developer.android.com/topic/libraries/architecture/datastore#preferences-datastore) và [Shared Preferences](https://developer.android.com/training/data-storage/shared-preferences) nhé.

# Tổng quan sample
Link sample cho các bạn tham khảo: https://github.com/hide-your-code/data_store_example/tree/example_proto_datastore. Rất mong các bạn góp ý để mình có thể hoàn thiện sample hơn!

Ở sample này dùng để lưu thông tin danh bạ gồm họ tên và số điện thoại. Cụ thể tính năng: 

- Khi người dùng nhập tên, số điện thoại và bấm nút lưu ⇒ thông tin sẽ được lưu vào Proto DataStore.
- Hiển thị danh sách những người mà user đã lưu trong danh bạ. Tự động được lấy ra từ Proto DataStore.
- Clear Data để xóa hết danh bạ đã lưu trong Proto DataStore.

![](https://images.viblo.asia/aa72ec0e-83da-4ec7-81f3-5968b392dc28.png)


### Cấu trúc project

App tuân theo architecture của Android khuyên dùng ở đây. Và sau đây mình sẽ giới thiệu một chút về các package trong project:

- `data`: Bao gồm các công việc liên quan đến việc truy cập vào data từ local, remote, ....
    - `datastore/serializer`: Nơi chứa các Serializer của Proto Buffer.
    - `datastore/ProDataStoreHelper`: Nơi khởi tạo Proto DataStore, cung cấp các phương thức để ghi và đọc dữ liệu từ Proto DataStore.
    - `ProtoDataStoreRepository`: chịu trách nhiệm cung cấp danh bạ.
- `model`: Bao gồm các model.
- `ext`: Bao gồm các extension để sử dụng thuận tiện hơn.
- `ui`: Chứa các UI được hiển thị cho người dùng.
    - `MainActivity` dùng là nơi chứa fragment, drawer, ....
    - `ProtoDataStoreFragment` là nơi hiển thị UI danh sách những người mình đã lưu danh bạ, và xóa dữ liệu trong Proto DataStore.
    - `ProtoDataStoreViewModel` là nơi các logic hiển thị view.
- `util`
    - `AutoClearValue`: Class này giúp mình clear các giá trị khi fragment vào `onDestroyView()`. Mình thường dùng để clear các instance không cần dùng đến khi fragment bị destroy view như các adapter của recycler view, view binding, ....
    - `Event`: Class này dùng cho việc LiveData bắn observe 1 lần, tránh tình trạng khi fragment khởi tạo lại view khiến LiveData bắn observe.

# Thêm các dependency vào project

### 1. Thêm Protocol Buffers plugin

Việc đầu tiên hãy thêm plugin Protocol Buffers vào `build.gradle` của app nhé.

```groovy
plugins {
    id "com.google.protobuf" version "0.8.16"
}
```

Hoặc `build.gradle.kts`:

```kotlin
plugins {
    id("com.google.protobuf").version("0.8.16")
}
```

### 2. Thêm Protocol Buffers và Proto DataStore dependency

Sau khi thêm plugin Proto Buffers, việc tiếp theo là bạn thêm dependency vào `build.gradle` của bạn.

```groovy
dependencies {
    implementation  "androidx.datastore:datastore:1.0.0-rc01"
    implementation  "com.google.protobuf:protobuf-javalite:3.14.0"
}
```

Hoặc `build.gradle.kts`:

```kotlin
dependencies {
	implementation("androidx.datastore:datastore:1.0.0-rc01")
    implementation("com.google.protobuf:protobuf-javalite:3.14.0")
}
```

### 3. Config Proto Buffer

Bước cuối cùng nếu bạn muốn sử dụng được [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore) chính là config [Protocol Buffers](https://developers.google.com/protocol-buffers). Config dưới đây giúp tạo ra các đoạn code java protobuf-lite cho [Protocol Buffers](https://developers.google.com/protocol-buffers). Bạn muốn tìm hiểu thêm, hãy đọc phần hướng dẫn config của [Protocol Buffers](https://developers.google.com/protocol-buffers) ở [link](https://github.com/google/protobuf-gradle-plugin#customizing-source-directories) này nhé. Ở đây mình chỉ lấy 1 config đơn giản như dưới, các bạn tham khảo nhé:

```groovy
protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:3.17.3"
    }

    generateProtoTasks {
        all().each { task ->
            task.builtins {
                java {
                    option 'lite'
                }
            }
        }
    }
}
```

Hoặc `build.gradle.kts`:

```kotlin
protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:3.17.3"
    }

    generateProtoTasks {
        all().forEach {
            it.builtins {
                create("java") {
                    option("lite")
                }
            }
        }
    }
}
```

# Xác định và sử dụng proto buffer object

[Protocol Buffers](https://developers.google.com/protocol-buffers) là 1 cơ chế để tuần tự hóa structured data. Bạn chỉ cần xác định cách bạn muốn dữ liệu của mình được cấu trúc thế nào và trình biên dịch sẽ tạo các source code để dễ dàng đọc và ghi structured data.

### 1. Tạo file Protocol Buffers

Việc đầu tiên bạn sẽ phải tạo 1 file `.proto`. Tạo file `.proto` giúp bạn xác định được các object để giúp DataStore có thể lưu trữ các object mà bạn muốn thay vì xác định chúng qua file kotlin.

Ở đây mình sẽ define đối tượng `PersonDataStore` gồm các thông tin như họ tên và số điện thoại, và `PeopleDataStore` là đối tượng để lưu trữ các `PersonDataStore`.

```csharp
syntax = "proto3";

option java_package = "minhdtm.example.exampledatastore";
option java_multiple_files = true;

message PersonDataStore {
  string name = 1;

  string phone = 2;
}

message PeopleDataStore {
  repeated PersonDataStore people = 1;
}
```

Mình sẽ hướng dẫn thứ cơ bản để bạn có thể tự tạo 1 file `.proto` cho riêng mình.

Trước tiên là từ khóa `syntax`. Ở đây bạn có thể hiểu đơn giản là bạn sẽ xác định xem bạn muốn sử dụng version protocol buffer nào. Mình sử dụng version mới nhất là `proto3`.

Tiếp theo bạn có thể thấy có những tùy chọn dành riêng cho Java. Cụ thể như sau:

- `option java_package`: Chỉ định tên package mà các class được generate của bạn sẽ hoạt động. Nếu bạn không chỉ định rõ ràng tên package, nó sẽ khớp với tên gói được đưa ra bởi `package`, nhưng thường là các tên Java package không phù hợp (vì chúng thường không bắt đầu bằng tên miền).
- `option java_multi_files`: Nếu được set bằng `true` ⇒ bạn cho phép tạo các file `.java` riêng biệt cho mỗi lớp được tạo. Tức là nó sẽ tạo file Java khi ở compile time cho bạn.

 Sau khi bạn làm các bước trên, bạn sẽ bắt đầu define các message mà bạn muốn. `message` chỉ là một tập hợp chứa các trường của bạn. Hiểu nôm na là `message` giống với `Class` trong Java vậy.

Đối với việc khai báo các trường, [Protocol Buffers](https://developers.google.com/protocol-buffers) hỗ trợ bạn với các kiểu như sau:

- `string`: Tương đương với `String` trong Java.
- `int32`: Tương đương với `int` trong Java.
- `int64`: Tương đương với `long` trong Java.
- `bool`: Tương đương với `boolean` trong Java.
- `double`: Tương đương với `double` trong Java.
- `float`: Tương đương với `float` trong Java.

Ngoài ra bạn có thể tìm hiểu thêm về chúng theo [link](https://developers.google.com/protocol-buffers/docs/proto3#scalar) này.

Các bạn có thể thấy tiếp sau khi khai báo các trường, mình có khai báo như `string name = 1`. `= 1`, `= 2` trên mỗi phần tử để xác định thẻ `tag` duy nhất mà trường đó sử dụng trong mã hóa nhị phân. Số thẻ từ 1 đến 15 yêu cầu mã hóa ít hơn 1 byte so với số cao hơn. Vậy nên, để tối ưu hóa, bạn nên sử dụng các thẻ tag dưới 16. Lưu ý nhé.

Và nếu bạn tự hỏi vậy làm thế nào để tạo 1 list trong [Protocol Buffers](https://developers.google.com/protocol-buffers), thì bạn sử dụng `repeated` để tạo nhé. Nó như là một mảng động trong Java thôi.
Ngoài ra, các bạn muốn tìm hiểu thêm về [Protocol Buffers](https://developers.google.com/protocol-buffers) cho Java thì vào [link này](https://developers.google.com/protocol-buffers/docs/javatutorial) để tham khảo nhé.

Sau khi bạn đã hiểu cơ bản cấu trúc của 1 file `.proto` trông sẽ thế nào, tiếp theo bạn tạo mới 1 file gọi là `person_ds.proto` vào thư mục `app/src/main/proto`. Nếu bạn không thấy folder này, hãy chuyển sang Project view như hình dưới.

![](https://images.viblo.asia/52d51ea8-3ed0-4e37-913f-c9c8b3f63971.png)


Tiếp theo đó bạn xác định những schema ở trong đó, như đoạn code example phía trên. Sau đó bạn `Build` → `Rebuild Project` để [Protocol Buffers](https://developers.google.com/protocol-buffers) generate ra file Java cho bạn.

### 2. Tạo serializer

Để [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore) có thể đọc, ghi kiểu dữ liệu mà bạn đã xác định ở file `.proto`, bạn cần phải implement một Serializer. Serializer cũng xác định giá trị mặc định được trả về nếu không có dữ liệu từ disk. Tạo mới 1 file là `PeopleSerializer` ở trong thư mục `data/datastore/serializer`:

```kotlin
object PeopleSerializer : Serializer<PeopleDataStore> {

    override val defaultValue: PeopleDataStore = PeopleDataStore.getDefaultInstance()

    @Suppress("BlockingMethodInNonBlockingContext")
    override suspend fun readFrom(input: InputStream): PeopleDataStore = try {
        PeopleDataStore.parseFrom(input)
    } catch (ex: InvalidProtocolBufferException) {
        Timber.d("Wrong read proto!")
        defaultValue
    }

    @Suppress("BlockingMethodInNonBlockingContext")
    override suspend fun writeTo(t: PeopleDataStore, output: OutputStream) {
        try {
            t.writeTo(output)
        } catch (ex: Exception) {
            Timber.d("Cannot write proto!")
        }
    }
}
```

# Làm việc với data trong Proto DataStore

### 1. Tạo Proto DataStore

Để tạo instance của [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore), bạn sử dụng delegate `dataStore`, toán tử này yêu cầu bạn cần được gọi từ `Context`. Ngoài ra toán tử này còn yêu cầu thêm 2 tham số bắt buộc:

- `fileName`: Tên của tệp mà [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore) sẽ hoạt động.
- `serializer`: Serializer cho kiểu được dùng với [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore). Trong ví dụ này là `PeopleSerializer`.

Ở đây mình sẽ khởi tạo `ProtoDataStoreHelper` với [Hilt](https://developer.android.com/training/dependency-injection/hilt-android). Nếu bạn chưa biết tạo sao mình khởi tạo `ProtoDataStoreHelper` như vậy, bạn hãy tham khảo [link bài viết về khởi tạo Preferences DataStore](https://viblo.asia/p/datastore-api-moi-thay-the-hoan-toan-sharepreferences-gAm5yVeOKdb#_tao-preferencesdatastore-6) này nhé.

```kotlin
@Singleton
class ProtoDataStoreHelper @Inject constructor(@ApplicationContext private val context: Context) {

		// Create instance of DataStore
    private val Context.people: DataStore<PeopleDataStore> by dataStore(
        fileName = DATA_STORE_FILE_NAME,
        serializer = PeopleSerializer
    )

    ...

    companion object {
        private const val DATA_STORE_FILE_NAME = "people_prefs.pb"
    }
}
```

### 2. Đọc dữ liệu từ Proto DataStore

[Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore) hiển thị các data được lưu trữ bằng `Flow<PeopleDataStore>`. Bạn sử dụng hàm `dataStore.data` để lấy dữ liệu từ [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore).

```kotlin
// Mapper function from Proto message to Kotlin object
private fun PersonDataStore.toPerson() = Person(
    name = name,
    phone = phone
)

// Get data from DataStore
fun getPeople(): Flow<List<Person>> = context.people.data
    .catch { exception ->
        if (exception is IOException) {
            emit(PeopleDataStore.getDefaultInstance())
        } else {
            throw exception
        }
    }
    .map { people ->
        people.peopleList.map {
             it.toPerson()
        }
    }
```

Ở đây mình lưu ý chút:

- Vì [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore) đọc dữ liệu từ file, nên `IOException` có thể bắn ra trong quá trình đọc dữ liệu. Vậy nên bạn nên handle chúng bằng cách sử dụng toán tử trung gian  `catch`  của [Flow coroutine](https://kotlinlang.org/docs/flow.html).
- Ngoài ra vì khi đọc data, [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore) trả về  `Flow<PersonDataStore>` nên mình sẽ map sang 1 data class khác là `Person` thông qua toán tử trung gian `map` của [Flow coroutine](https://kotlinlang.org/docs/flow.html).

### 3. Ghi dữ liệu vào Proto DataStore

Để ghi dữ liệu vào [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore), bạn sử dụng hàm `DataStore.updateData()`. Để update dữ liệu, bạn cần phải biến đổi preferences của bạn sang builder, set giá trị mới và sau đó build preferences mới đó.

```kotlin
// Mapper function from Kotlin object to Proto message
private fun Person.toPersonDataStore() = PersonDataStore.newBuilder()
        .setName(name)
        .setPhone(phone)
        .build()

// Set data to DataStore
fun setPerson(person: Person): Flow<Boolean> = flow {
        context.people.updateData { people ->
            val mapper = person.toPersonDataStore()
            people.toBuilder()
                .addPeople(mapper)
                .build()
        }
        emit(true)
    }.catch { exception ->
        Timber.e(exception)
        emit(false)
    }
```

Ở đây mình cũng chỉ là tạo 1 [flow](https://kotlinlang.org/docs/flow.html). Khi nào ghi thành công thì mình emit ra `true`, trong trường hợp fail thì mình emit `false`.

Vì mình muốn thêm phần tử vào list nên trong builder của `people.toBuilder()`, mình sử dụng toán tử `addPeople()`. Ở đây builder cung cấp cho bạn các toán tử để làm việc với list như `add`, `addAll`, `remove`, .... Bạn tự mình tham khảo nhé.

# Chuyển đổi từ Shared Preferences sang Proto DataStore

Để có thể giúp bạn chuyển đổi từ [Shared Preferences](https://developer.android.com/training/data-storage/shared-preferences) sang [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore), [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore) cung cấp cho bạn lớp `SharedPreferencesMigration`. Phương thức `by dataStore` tạo [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore), cùng với đó là tham số `produceMigrations`. Trong khối này, bạn tạo ra các `DataMigrations` sẽ được chạy với instance của [Proto DataStore](https://developer.android.com/topic/libraries/architecture/datastore#proto-datastore) này. Trong ví dụ dưới đây, mình chỉ có 1 mirgration duy nhất.

Khi implement `SharedPreferencesMigration`, khối `migration` đưa cho chúng ta 2 tham số:

- `SharedPreferencesView` cho phép bạn truy xuất dữ liệu từ Shared Preferences.
- `PeopleDataStore` là dữ liệu hiện tại.

Ở đây, hàm sẽ trả về cho bạn đối tượng `PeopleDataStore`.

```kotlin
private fun Context.sharedPreferencesMigration(): DataMigration<PeopleDataStore> = 
SharedPreferencesMigration(
		this,
    PEOPLE_PREFERENCES_NAME
) { sharedPrefs: SharedPreferencesView, currentData: PeopleDataStore ->
		// Migrate your Shared Preferences to Proto DataStore in here.
		currentData
}

private val Context.peoplePreferences: DataStore<PeopleDataStore> by dataStore(
		fileName = DATA_STORE_FILE_NAME,
		serializer = PeopleSerializer,
		produceMigrations = { context ->
				listOf(context.sharedPreferencesMigration())
		}
)

companion object {
		private const val PEOPLE_PREFERENCES_NAME = "people_preferences_name"
}
```
# Tổng kết
Vậy tổng hợp lại, đây là những lý do bạn mà bạn nên chuyển từ [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences)  sang [DataStore](https://developer.android.com/topic/libraries/architecture/datastore):
- [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences) là 1 API đồng bộ tưởng chừng có thể an toàn khi gọi trên UI Thread, không có bắn error, ....
- [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) sinh ra để giải quyết gần như tất cả những yếu điểm của [SharePreferences](https://developer.android.com/reference/android/content/SharedPreferences).
- [DataStore](https://developer.android.com/topic/libraries/architecture/datastore) là API không đồng bộ bằng cách sử dụng Kotlin coroutine và Flow, đảm bảo tính nhất quán và xử lý error.

# Nguồn tài liệu và tham khảo
1. [Android Developer - DataStore](https://developer.android.com/topic/libraries/architecture/datastore?authuser=2)
2. [Android Codelab - Proto DataStore](https://developer.android.com/codelabs/android-proto-datastore?authuser=3#0)
3. [Android Blog - Prefer Storing Data with Jetpack DataStore](https://android-developers.googleblog.com/2020/09/prefer-storing-data-with-jetpack.html)