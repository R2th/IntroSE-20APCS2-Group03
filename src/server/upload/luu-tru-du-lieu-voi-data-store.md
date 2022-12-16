![](https://images.viblo.asia/49a88496-eaae-463c-81d2-0a49dcd2d1f6.png)

**Data Store** là một trong những componet của bộ thư viện Android JetPack, nó là một sự lựa chọn hoàn hảo để thay thế cho SharedPreferences để lưu trữ dữ liệu đơn giản dưới dạng key-value. Chúng ta cùng làm một so sánh nhỏ để thấy sự tối ưu của **Data Store** với **SharedPreferences** nhé 
![](https://images.viblo.asia/033a0820-bfc7-4a57-86e8-6a92a5cb95a0.png)
-Nếu các bạn chưa biết thì SharedPreferences hỗ trợ việc xử lý các công việc đọc ghi dữ liệu ngay trên UI thread . Phương thức apply() của nó sẽ block UI thread trên fsync(). Việc block UI là nguyên nhân chính dẫn đến lỗi ANR (Application not responding ). Và nó tiềm ẩn nguy cơ dẫn đến những trải nghiệm không tốt cho người dùng cuối

Việc đọc ghi dữ liệu với SharedPreferences chỉ có thể phát hiện sinh lỗi trong quá trình run time => lại một nguy cơ tiềm ẩn phát sinh incident :))
Tuy nhiên, với Data Store các nguy cơ trên đã được loại bỏ. Với việc sử dụng Kotlin coroutines and Flow, toàn bộ quá trình đọc ghi dữ liệu sẽ được xử lý bất đồng bộ. Ngoài ra, Data Store cũng hỗ trợ việc control các exception trong quá trinh đọc ghi dữ liệu

**Lưu ý :** Data Store thích hợp để lưu trữ các dữ liệu có cấu trúc đơn giản. Nếu bạn có nhu cầu cập nhật từng phần, tính toàn vẹn tham chiếu hoặc hỗ trợ cho các tập dữ liệu lớn, phức tạp thì hãy xem sét đến việc sử dụng **Room Database**

# 1. Implement
DataStore cung cấp 2 cách implement là : Preferences DataStore và Proto DataStore.
- **Preferences DataStore** : Tương tự như SharedPreference, data sẽ được lưu dưới dạng key - value thành các bộ giá trị riêng biệt và không có cấu trúc, nó cũng không cung cấp type safety
- **Proto DataStore** : Lưu trữ dữ liệu có cấu trúc, hiểu đơn giản là cho phép bạn lưu trữ một object . Bạn cần định nghĩa một schema bằng cách sử dụng **[protocol buffers](https://developers.google.com/protocol-buffers)** . Và nó cung cấp type safety
## Cài đặt DataStore
Như các thư viện khác, chúng ta cần thêm dependence của DataStore vào Gradle module app
```
// Typed DataStore (Typed API surface, such as Proto)
dependencies {
  implementation "androidx.datastore:datastore:1.0.0-alpha04"
}
// Alternatively - use the following artifact without an Android dependency.
dependencies {
    implementation "androidx.datastore:datastore-core:1.0.0-alpha04"
}
// Preferences DataStore
dependencies {
  implementation "androidx.datastore:datastore-core:1.0.0-alpha04"
}
```

Ngoài ra chúng ta cần thêm một số phụ thuôc khác để có thể sủ dụng Proto language cũng như genarate các đối tượng
```
plugins {
    ...
    id "com.google.protobuf" version "0.8.12"
}

dependencies {
    implementation  "com.google.protobuf:protobuf-javalite:3.10.0"
    ...
}

protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:3.10.0"
    }

    // Generates the java Protobuf-lite code for the Protobufs in this project. See
    // https://github.com/google/protobuf-gradle-plugin#customizing-protobuf-compilation
    // for more information.
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

# 2. Preferences DataStore
Như cái tên thì Preferences DataStore sử dụng DataStore và Preferences để lưu trữ các cặp key-value vào đĩa. Như đã nói ở trên thì với mỗi cặp key-value sẽ là một bản ghi riêng biệt, thích hợp cho việc lưu trữ các thông tin đơn lẻ như lần đầu đăng nhập, lần đầu vào app,...
Để tạo Preferences DataStore chúng ta làm như sau:
```
val dataStore: DataStore<Preferences> = context.createDataStore("settings")
```
Với câu lệnh trên chúng ta đã tạo ra một data store có tên là settings (tên này các bạn có thể đặt túy ý nhé)

## 2.1 Ghi dữ liệu

Preferences DataStore cung cấp một phương thức là **edit()** cho phép chúng ta tạo mới cũng như update dữ liệu
```
val currentCounterValue = 0
suspend fun incrementCounter() {
  dataStore.edit { settings ->
    currentCounterValue +=1
    settings[EXAMPLE_COUNTER] = currentCounterValue
  }
}
```
Tương tự như SharedPreference, chúng ta sẽ truy cập các giá trị thông qua các key đã được định nghĩa từ trước

## 2.2 Đọc dữ liệu
DataStore trả về giá trị là các Flow
```
val EXAMPLE_COUNTER = preferencesKey<Int>("example_counter")
val exampleCounterFlow: Flow<Int> = dataStore.data
  .map { preferences ->
    // No type safety.
  val data = preferences[EXAMPLE_COUNTER] ?: 0
}
```

# 3 Proto DataStore
Đôi khi chúng ta muốn lưu trữ thông tin của một đối tượng có cấu trúc đơn giản như một số thông tin của một user. Tuy nhiên, để implement một database để lưu trữ duy nhất một user có vẻ rất mất thời gian, còn việc lưu từng thông tin của user cũng sẽ mất công trong việc đọc ghi dữ liệu. Proto Data Store sẽ giúp chúng ta giải quyết việc này. Proto DataStore sử dụng DataStore và Proto buffers để lưu trữ dữ liệu vào đĩa
## 3.1 Định nghĩa một schema
Proto Data Store sử dụng [Proto language](https://developers.google.com/protocol-buffers/docs/overview) để định nghĩa Schema. Để tạo một Schema, các bạn file **"tên_database".proto** vào thư mục **/main/proto.**
Thư mục **proto** không có sẵn nên các bạn cần tạo thư mục này
Tiếp theo, mở file .proto và định nghĩa các đối tượng mà bạn cần lưu trữ
```
syntax = "proto3";

option java_package = "your package";
option java_multiple_files = true;

message UserPreferences {
  // filter for showing / hiding completed tasks
  bool show_completed = 1;
}
```
Để định nghĩa một đối tượng, các bạn sử dụng dụng tư khóa **message**. Data Store sẽ genarate ra các đối tượng tương ứng. Như trong ví dụ, một đối tượng UserPreferences sẽ được tạo ra
Tiếp theo, chúng ta cần cung cấp cho Data Store cách đọc và ghi dữ liệu đã được định nghĩa trong proto file

```
object UserPreferencesSerializer : Serializer<UserPreferences> {
// đọc dữ liệu
    override fun readFrom(input: InputStream): UserPreferences {
        try {
            Log.d("TAG1", "input : $input")
            return UserPreferences.parseFrom(input)
        } catch (exception: InvalidProtocolBufferException) {
            throw CorruptionException("Cannot read proto.", exception)
        }
    }
    //ghi dữ liệu
    override fun writeTo(t: UserPreferences, output: OutputStream) {
        Log.d("TAG1", "output : $output")
        t.writeTo(output)
    }

// lấy ra dữ liệu default
    override val defaultValue: UserPreferences
        get() = UserPreferences.getDefaultInstance()
}
```

**Note :** Các đối tượng của proto được genarate tại complie time  nên cần build lại project nếu không sẽ không thể tìm được các đối tượng trong database
## 3.2 Đọc ghi dữ liệu với DataStore Proto
### 3.2.1 Tạo file lưu trữ dữ liệu
Đầu tiên, chúng ta cần tạo ra một Data Store để lưu trữ database. Sử dụng phương thức **createDataSource** để tạo một DataStore
```
private val dataStore: DataStore<UserPreferences> =
    context.createDataStore(
        fileName = "user_prefs.pb",
        serializer = UserPreferencesSerializer)
```

- **fileName** : Tên file để lưu trữ database, tên file này không cần giống tên file .proto (một file dùng để lưu trữ database , một file dùng để định nghĩa schema). Các bạn có thể tìm thấy file này theo đường dẫn data/data/your_package/datastore/files
![](https://images.viblo.asia/629ff110-5aa2-44e9-b0c9-ee4f34587f27.png)

- **serializer** : Cách mà DataStore sẽ đọc ghi dữ liệu . Ở ví dụ trên chình là object **UserPreferencesSerializer** 

### Đọc dữ liệu
Như đã nói ở trên, DataStore sẽ trả về coroutine Flow, vì vậy chúng ta có thể dễ dàng controll dữ liệu trả về hoặc là các lỗi trong quá trình tương tác với database
```
dataStore.data.catch { exception ->
            // xử lý exception
            if (exception is IOException) {
                Log.e("TAG1", "Error reading sort order preferences.", exception)
                emit(UserPreferences.getDefaultInstance())
            } else {
                throw exception
            }
        }.map {
        // lấy dữ liệu
            Log.e("TAG1", "showComplete : ${it.showCompleted}")
        }
```
Với việc xử lý exception sẽ giúp ngăn ngừa các lỗi có thể gây crash app, cũng như  xử lý về mặt UI khi gặp các case lỗi một các dễ dàng hơn 
### Ghi dữ liệu
Để udpate dữ liệu chúng ta sử dụng phương thưc updateData. Phương thức này sẽ trả về đối tượng sau khi được update
```
 suspend fun updateShowCompleted(completed: Boolean) {
         val userPreferences = dataStore.updateData { preferences ->
            preferences.toBuilder().setShowCompleted(completed).build()
        }
        Log.d("TAG1", "showComplete: ${userPreferences.showCompleted}")
    }
```
Một đối tượng UserPreferences sẽ được trả về, chúng ta có thể truy cập vào các thuộc tính của nó với giá trị đã được thay đổi
# Tổng kết
Data Store thực sự là một sự lựa chọn tốt để thay thế cho SharedPreferences. Hiện tại, việc Migrate từ SharedPreferences sang StoreData cũng rất đơn giản . Vậy còn chần chừ gì mà không sử dụng Data Store thôi nào !!!