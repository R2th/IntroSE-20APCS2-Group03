Chào mừng Jetpack DataStore, một giải pháp lưu trữ dữ liệu mới và cải tiến nhằm thay thế SharedPreferences.

Được xây dựng dựa trên Kotlin coroutines và Flow, DataStore cung cấp hai cách triển khai khác nhau: **Proto DataStore**, cho phép bạn lưu trữ các đối tượng đã nhập (được hỗ trợ bởi bộ đệm giao thức) và **Preferences DataStore**, lưu trữ các cặp khóa-giá trị.

Dữ liệu được lưu trữ không đồng bộ, nhất quán và theo giao dịch, khắc phục hầu hết các nhược điểm của SharedPreferences.

## SharedPreferences và DataStore

![](https://images.viblo.asia/fc58319c-8ad9-4d7c-9eb0-16d8d99c2548.png)

* SharedPreferences có một API đồng bộ có thể có vẻ an toàn khi gọi trên UI thread, nhưng thực sự thực hiện các hoạt động I/O của đĩa. 
Hơn nữa, apply() sẽ block UI thread trên fsync().

Các cuộc gọi fsync() đang chờ xử lý được kích hoạt mỗi khi bất kỳ Service nào bắt đầu hoặc dừng, và mỗi khi một Activity bắt đầu hoặc dừng ở bất kỳ đâu trong ứng dụng của bạn.

UI thread bị block đối với các cuộc gọi fsync() đang chờ xử lý được lên schedule bởi apply(), thường trở thành nguồn ANR.

** SharedPreferences gây ra các lỗi parsing như runtime exceptions.

Trong cả hai cách triển khai, **DataStore** lưu các tùy chọn trong một file và thực hiện tất cả các thao tác dữ liệu trên Dispatchers.IO trừ khi được chỉ định khác.

Trong khi cả **Preferences DataStore** và **Proto DataStore** đều cho phép lưu dữ liệu, chúng thực hiện việc này theo những cách khác nhau:

- Preference DataStore, giống như SharedPreferences, không có cách nào để xác định một schema hoặc để đảm bảo rằng các khóa được truy cập với đúng loại.

- Proto DataStore cho phép bạn xác định một schema bằng cách sử dụng bộ đệm Protocol. 
Chúng nhanh hơn, nhỏ hơn, đơn giản hơn và ít mơ hồ hơn XML và các định dạng dữ liệu tương tự khác. 

## Room và DataStore

Nếu bạn có nhu cầu cập nhật từng phần, toàn vẹn tham chiếu hoặc hỗ trợ cho các bộ dữ liệu lớn / phức tạp, bạn nên cân nhắc sử dụng Room thay vì DataStore. 
DataStore lý tưởng cho các bộ dữ liệu nhỏ, đơn giản và không hỗ trợ cập nhật từng phần hoặc tính toàn vẹn tham chiếu.

## Sử dụng DataStore

Bắt đầu bằng việc thêm DataStore dependency.
Nếu bạn đang sử dụng Proto DataStore, hãy đảm bảo rằng bạn cũng thêm dependency của proto:
 
```
 // Preferences DataStore
implementation "androidx.datastore:datastore-preferences:1.0.0-alpha01"


// Proto DataStore
implementation  "androidx.datastore:datastore-core:1.0.0-alpha01"
```

Khi làm việc với Proto DataStore, bạn định nghĩa lược đồ của mình trong một file proto trong thư mục **app/src/main/proto/**. 
Xem [hướng dẫn ngôn ngữ protobuf](https://developers.google.com/protocol-buffers/docs/proto3) để biết thêm thông tin về cách xác định schema proto.

```
syntax = "proto3";

option java_package = "<your package name here>";
option java_multiple_files = true;

message Settings {
  int my_counter = 1;
}
```

## Tạo DataStore

Bạn tạo DataStore với extension :  Context.createDataStore()

```
// with Preferences DataStore
val dataStore: DataStore<Preferences> = context.createDataStore(
    name = "settings"
)
```

Nếu bạn đang sử dụng Proto DataStore, bạn phải implement Serializer interface để cho DataStore biết cách đọc và ghi loại dữ liệu của bạn.

```
object SettingsSerializer : Serializer<Settings> {
    override fun readFrom(input: InputStream): Settings {
        try {
            return Settings.parseFrom(input)
        } catch (exception: InvalidProtocolBufferException) {
            throw CorruptionException("Cannot read proto.", exception)
        }
    }

    override fun writeTo(t: Settings, output: OutputStream) = t.writeTo(output)
}


// with Proto DataStore
val settingsDataStore: DataStore<Settings> = context.createDataStore(
    fileName = "settings.pb",
    serializer = SettingsSerializer
)
```

## Đọc dữ liệu từ DataStore

DataStore hiển thị dữ liệu được lưu trữ trong một Luồng, trong đối tượng Preferences hoặc là đối tượng được định nghĩa trong schema proto của bạn. 
DataStore đảm bảo rằng dữ liệu được truy xuất trên Dispatchers.IO để UI thread của bạn không bị block.

- Với Preferences DataStore :

```
val MY_COUNTER = preferencesKey<Int>("my_counter")
val myCounterFlow: Flow<Int> = dataStore.data
     .map { currentPreferences ->
        // Unlike Proto DataStore, there's no type safety here.
        currentPreferences[MY_COUNTER] ?: 0   
   }
```

- Với Proto DataStore :

```
val myCounterFlow: Flow<Int> = settingsDataStore.data
    .map { settings ->
        // The myCounter property is generated for you from your proto schema!
        settings.myCounter 
    }
```

## Ghi dữ liệu vào DataStore

Để ghi dữ liệu, DataStore cung cấp hàm DataStore.updateData() cung cấp cho bạn trạng thái hiện tại của dữ liệu được lưu trữ dưới dạng tham số — dưới dạng đối tượng Preferences hoặc một phiên bản của đối tượng được định nghĩa trong schema proto. 
Hàm updateData() cập nhật dữ liệu theo giao dịch trong một thao tác đọc-ghi-sửa đổi. 
Quy trình đăng ký hoàn tất khi dữ liệu vẫn còn trên đĩa.

Preferences DataStore cũng cung cấp chức năng DataStore.edit () để cập nhật dữ liệu dễ dàng hơn. 
Thay vì nhận một đối tượng Preferences, bạn sẽ nhận một đối tượng MutablePreferences mà bạn chỉnh sửa. 
Như với updateData(), các thay đổi được áp dụng cho đĩa sau khi thay biến đổi hoàn tất, và quy trình hoàn tất khi dữ liệu được lưu vào đĩa.

- Với Preferences DataStore: 

```
suspend fun incrementCounter() {
    dataStore.edit { settings ->
        // We can safely increment our counter without losing data due to races!
        val currentCounterValue = settings[MY_COUNTER] ?: 0
        settings[MY_COUNTER] = currentCounterValue + 1
    }
}
```

- Với Proto DataStore :

```
suspend fun incrementCounter() {
    settingsDataStore.updateData { currentSettings ->
        // We can safely increment our counter without losing data due to races!
        currentSettings.toBuilder()
            .setMyCounter(currentSettings.myCounter + 1)
            .build()
    }
}
```

## Kết luận

SharedPreferences đi kèm với một số nhược điểm: một API đồng bộ có thể xuất hiện trên UI thread, không có cơ chế báo hiệu lỗi, thiếu API giao dịch, v.v. 
DataStore là sự thay thế cho SharedPreferences giải quyết hầu hết những thiếu sót này. 

DataStore bao gồm một API hoàn toàn không đồng bộ sử dụng Kotlin coroutines và Flow, xử lý việc di chuyển dữ liệu, đảm bảo tính nhất quán của dữ liệu và xử lý lỗi dữ liệu.

Vì DataStore vẫn đang trong giai đoạn alpha, chúng ta hãy cùng đóng góp để cải thiện nó : https://developer.android.com/topic/libraries/architecture/datastore