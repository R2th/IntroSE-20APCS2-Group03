# Giới thiệu
Trong bài viết này chúng ta sẽ cùng tìm hiểu về **DataStore** một trong những giải pháp lưu trữ dữ liệu mới trong gói **Android Jetpack** và sẽ dần thay thế kiểu dữ liệu **SharePreferences** đang có.

DataStore hiện tại trong bài viết này chỉ mới được giới thiệu và ở giai đoạn alpha nên cũng còn khá nhiều thay đổi về sau.

DataStore cho phép lưu trữ dữ liệu theo 2 dạng: sử dụng cặp key-value hoặc loại đối tượng tự định nghĩa với cách khai báo thông qua [protocol buffer.](https://developers.google.com/protocol-buffers) 

DataStore sử dụng kết hợp **Kotlin Coroutines** và **Flow** để lưu trữ và đọc dữ liệu dưới dạng bất đồng bộ.

Tuỳ vào mục đích lưu trữ dữ liệu, DataStore sẽ cũng cấp các phương thức cài đặt khác nhau: **Preferences DataStore** và **Proto DataStore**
* **Preferences DataStore**: lưu trữ và truy xuất dữ liệu theo qua keys. Phương thức cài đặt này không đỏi hỏi phải định nghĩa trước các schema và nó không đảm bảo về tính đúng đắn của kiểu dữ liệu được truyền vào, việc này phải do người lập trình tự xác định.
* **Proto DataStore**: lưu trữ dữ liệu kiểu Primitive hoặc dữ liệu tự định nghĩa. Phương thức cài đặt này đòi hỏi phải định nghĩa trước một schema sử dụng [protocal buffers](https://developers.google.com/protocol-buffers), nhưng nó lại đảm bảo được tính đúng đắn của dữ liệu.

# So sánh giữa SharedPreferences và DataStore
Dưới đây là bảng thống kê chi tiết giữa cách lưu trữ truyền thống **SharedPreferences** và hai cách lưu trữ dữ liệu mới **Preferences DataStore** và **Proto DataStore**

![](https://images.viblo.asia/dcd1c795-6ca0-4b30-9c9f-93ee848fee97.PNG)

Ta có thể thấy điểm khác biệt lớn nhất là **SharedPreferences** sử dụng cơ chế lưu trữ đồng bộ, trong khi **DataStore** thì hoạt động dựa trên cơ chế bất đồng bộ và không chiếm UI thread, vì vậy nó an toàn cho việc gọi mà không gây ảnh hưởng đến tiến trình chính của ứng dụng.
# Sử dụng Preferences DataStore để lưu trữ dữ liệu
Ở bài viết này chúng ta sẽ thử dùng Preferences DataStore để đọc và ghi một chuỗi **UUID**, hiển thị một **Toast** mỗi khi chạy vào app cho biết giá trị của chuỗi **UUID** ta đọc từ Preferences DataStore.
## Cài đặt thư viện

Để sử dụng Preferences DataStore chúng ta thêm thư viện sau vào file **Gradle** của dự án

```kotlin
dependencies {
    // Preferences DataStore
    implementation "androidx.datastore:datastore-preferences:1.0.0-alpha01"
}
```

Ngoài ra vì dựa trên cơ chế làm việc của **Coroutines** và **Flow** nên ta cũng cần thêm thư viện sau

```kotlin
    // coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.7'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.7'
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-rx2:1.3.7"
```

## Cài đặt mã nguồn
### Tạo đối tượng Preferences DataStore
Sử dụng phương thức **Context.createDataStore()** để tạo một instances của Preferences DataStore. Phương thức này nhận một tham số là **name** đại diện cho tên của Preferences DataStore.
Trong mã nguồn ta sẽ khai báo một biến toàn cục **dataStore** và hàm khởi tạo sẽ được gọi trong phương thức **onCreate()** như sau:

```kotlin
    // declare value for working with datastore
    lateinit var dataStore: DataStore<Preferences>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //create preference data store
        dataStore = this.createDataStore(name = "MyPreferenceDataStore")

```

### Ghi dữ liệu vào Preferences DataStore

Vì đây là cơ chế lưu trữ dữ liệu theo dạng **key-value** nên ta cần phải tạo key cùng với loại dữ liệu mà ta muốn lưu trữ trước. Trong ví dụ này ta muốn lưu trữ một chuỗi **UUID** với kiểu dữ liệu là **String** nên ta sẽ khai báo một biến có cấu trúc như sau:

```kotlin
    //create key for save data type
    val PREF_UUID = preferencesKey<String>(name = "uuid")
```

Tiếp theo ta sử dụng phương thức **edit()** mà Preferences DataStore cung cấp để tiến hành ghi dữ liệu. Cũng lưu ý DataStore sử dụng cơ chế lưu trữ bất đồng bộ kết hợp với Coroutines nên khi khai báo một hàm để lưu trữ dữ liệu sẽ có thêm **suspend** ở đầu hàm, ta có thể thấy như bên dưới:

```kotlin
    suspend fun saveUUID(uuid: String) {
        dataStore.edit {
            it[PREF_UUID] = uuid
        }
    }
```

### Đọc dữ liệu đã ghi từ Preferences DataStore
Preferences DataStore cung cấp phương thức **DataStore.data** để lấy dữ liệu ra và dữ liệu được lưu trữ dưới dạng một **Flow**. Ví dụ ở đây là chuỗi UUID thì dữ liệu phát ra sẽ có dạng **Flow<String>**. Hàm đọc dữ liệu sẽ có dạng như sau:
    
```kotlin
    // declare value for receive data
    lateinit var uuid: Flow<String>
    
    fun readUUID() {
        uuid = dataStore.data.map {
            it[PREF_UUID] ?: ""
        }
    }
```

Đến đây chúng ta chỉ mới đọc dữ liệu cần lấy từ DataStore và lưu trữ vào một biến uuid kiểu **Flow<String>**, để có thể sử dụng dữ liệu này ta cần phải sử dụng phương thức **collect** để lắng nghe các dữ liệu phát ra từ **Flow<String>** này. Có thể hiểu kiểu dữ liệu này là sự thay thế cho **RxJava** với cơ chế tương tự **Observable** và **Observer**, cách nhận dữ liệu có thể thấy như bên dưới:
  
```kotlin
        CoroutineScope(Dispatchers.Main).launch {
            uuid.collect { value ->
                if (value.isEmpty()) {
                    val newUUID = UUID.randomUUID().toString()
                    showToast("Not have UUID saved. Create new UUID ${newUUID} and save to data store")
                    //delay(5000)
                    saveUUID(newUUID)

                } else {
                    showToast("Read UUID from preference data store ${value}")
                }
            }
        }
    
        private fun showToast(s: String) {
            this.runOnUiThread {
                val toast = Toast.makeText(this, s, Toast.LENGTH_LONG)
                toast.setGravity(Gravity.CENTER, 0, 0)
                toast.show()
            }
        }
```
Phương thức **uuid.collect** là một hàm **suspend** nên cần được chạy từ một **Coroutine Scope** và lắng nghe dữ liệu thay đổi, mỗi khi dữ liệu có sự thay đổi nó sẽ tự động lắng nghe và cập nhật giá trị như kiểu **LiveData** ta thường biết. Ở đây nếu **uuid** chưa được tạo nó sẽ tạo ra một giá trị ngẫu nhiên và lưu vào Preferences DataStore đã khai báo trước đó qua hàm **saveUUID**, nếu đã có thì nó sẽ in ra **Toast** giữa màn hình giá tri của **uuid**. Kết quả có thể thấy qua 2 hình bên dưới
    
![](https://images.viblo.asia/adb0f637-12bd-41a2-931a-290674598036.png)

Đến đây ta đã hoàn thành việc đọc và ghi một giá trị sử dụng phương thức lưu trữ Preferences DataStore. Phần tiếp theo ta sẽ cùng tìm hiểu việc đọc và ghi dữ liệu sử dụng Proto DataStore.
    
Mã nguồn của dự án có thể tham khảo tại đây: https://github.com/hungan1409/ExampleDataStore.git
    
# Tham khảo
https://developer.android.com/topic/libraries/architecture/datastore