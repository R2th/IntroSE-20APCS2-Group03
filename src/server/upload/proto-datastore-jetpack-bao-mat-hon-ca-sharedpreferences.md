# DataStore
Trước khi đi vào Proto DataStore thì mình sẽ thì nói về DataStore.
DataStore là một giải pháp lưu trữ dữ liệu mới và cải tiến nhằm thay thế SharedPreferences. Được xây dựng trên Kotlin coroutines và Flow, DataStore cung cấp hai cách triển khai khác nhau: Proto DataStore, cho phép bạn lưu trữ các đối tượng đã nhập (được hỗ trợ bởi Proto-protocal) và Preferences DataStore lưu trữ theo cặp key - value. Dữ liệu được lưu trữ không đồng bộ, nhất quán và mang tính giao dịch, khắc phục một số nhược điểm của SharedPreferences.

Trong phạm vi bài viết này mình sẽ chỉ nói về Proto Data Store. Mọi người có thể tham khảo codelab của Google về Preferences DataStore ở đây:
https://codelabs.developers.google.com/codelabs/android-preferences-datastore/#0

Bảng so sánh của 3 loại SharedPreferences, Preference DataStore và Proto DataStore. 
![](https://images.viblo.asia/cc92d250-b572-4137-9c7d-bacf679f3410.png)

# Proto DataStore
Một trong những nhược điểm của SharedPreferences và Preferences DataStore là không có cách nào để xác định một lược đồ hoặc để đảm bảo rằng các khóa được truy cập với đúng loại. Proto DataStore giải quyết vấn đề này bằng cách sử dụng [Protocol buffers ](https://developers.google.com/protocol-buffers)để xác định lược đồ. Sử dụng Proto DataStore biết những loại nào được lưu trữ và sẽ chỉ cung cấp chúng, loại bỏ nhu cầu sử dụng khóa.

* Nó lưu trữ các phiên bản dưới dạng dữ liệu tùy chỉnh.
* Xác định lược đồ bằng cách sử dụng bộ đệm Giao thức.
* Chúng nhanh hơn, nhỏ hơn, đơn giản hơn và ít mơ hồ hơn XML và các định dạng dữ liệu tương tự khác.

## Thêm Proto DataStore vào trong Project:

Project demo này là về việc sắp xếp các task theo mức độ ưu tiên của User chọn.

Vào **build.gradle ** vào thêm vào đoạn code bên dưới.
```
plugins {
    ...
    id "com.google.protobuf" version "0.8.12"
}

dependencies {
    implementation  "androidx.datastore:datastore-core:1.0.0-alpha01"
    implementation  "com.google.protobuf:protobuf-javalite:3.10.0"
    ...
}

protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:3.10.0"
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

Protocol buffers là một cơ chế để tuần tự hóa dữ liệu có cấu trúc. Bạn xác định cách bạn muốn dữ liệu của mình được cấu trúc một lần và sau đó trình biên dịch tạo mã nguồn để dễ dàng viết và đọc dữ liệu có cấu trúc.
Tạo một Proto file:
Bạn xác định lược đồ của mình trong một tệp proto.
Trong project của mình sẽ tạo một file **user_prefs.proto** trong đường dẫn sau ** app/src/main/proto**  trong file này có nội dung như sau:
Mỗi cấu trúc được định nghĩa bởi từ khóa **message**  và mỗi thành viên của cấu trúc được xác định bên trong thông báo, dựa trên kiểu và tên và nó được gán một thứ tự. 
```
syntax = "proto3";

option java_package = "com.codelab.android.datastore";
option java_multiple_files = true;

message UserPreferences {
  // hiển thị hoặc ẩn task.
  bool show_completed = 1;

  // Xác định task sắp xếp theo ưu tiên nào.
  enum SortOrder {
    UNSPECIFIED = 0;
    NONE = 1;
    BY_DEADLINE = 2;
    BY_PRIORITY = 3;
    BY_DEADLINE_AND_PRIORITY = 4;
  }

  // thứ tự sắp xếp công việc do người dùng chọn.
  SortOrder sort_order = 2;
}
```

Lớp `UserPreferences` được tạo tại thời điểm biên dịch từ` message `được xác định trong tệp proto. Nên phải rebuild lại khi đã tạo ra file proto.

## Tạo serializer
Để cho DataStore biết cách đọc và ghi kiểu dữ liệu mà chúng ta đã xác định trong tệp proto, chúng ta cần triển khai Serializer. Tạo một tệp mới có tên là UserPreferencesSerializer.
```
package com.codelab.android.datastore.data

import androidx.datastore.CorruptionException
import androidx.datastore.Serializer
import com.codelab.android.datastore.UserPreferences
import com.google.protobuf.InvalidProtocolBufferException
import java.io.InputStream
import java.io.OutputStream

object UserPreferencesSerializer : Serializer<UserPreferences> {
    override fun readFrom(input: InputStream): UserPreferences {
        try {
            return UserPreferences.parseFrom(input)
        } catch (exception: InvalidProtocolBufferException) {
            throw CorruptionException("Cannot read proto.", exception)
        }
    }

    override fun writeTo(t: UserPreferences, output: OutputStream) = t.writeTo(output)
}
```
Nếu không tìm thấy `UserPreferences` hoặc các phương thức liên quan, hãy Clean và Rebuild để đảm bảo rằng Protobuf tạo ra đối tượng.

## Tạo DataStore
Hãy tạo  `DataStore <UserPreferences>` trong `UserPreferencesRepository` dựa trên phương thức mở rộng `Context.createDataStore ().` Phương thức có hai tham số bắt buộc:
* Tên của tệp mà DataStore sẽ hoạt động.
* Bộ tuần tự cho loại được sử dụng với DataStore. Ở project này là `UserPreferencesSerializer`.
```
private val dataStore: DataStore<UserPreferences> =
    context.createDataStore(
        fileName = "user_prefs.pb",
        serializer = UserPreferencesSerializer)
```

## Đọc và ghi dữ liệu từ Proto DataStore
Trong UserPreferencesRepository sẽ quản lí việc đọc và ghi dữ liệu.
* Đọc dữ liệu:
```
    val userPreferencesFlow: Flow<UserPreferences> = dataStore.data
        .catch { exception ->
            // dataStore.data throws an IOException when an error is encountered when reading data
            if (exception is IOException) {
                Log.e(TAG, "Error reading sort order preferences.", exception)
                emit(UserPreferences.getDefaultInstance())
            } else {
                throw exception
            }
        }
```
* Ghi dữ liệu:
Để ghi dữ liệu, DataStore cung cấp một hàm suspend DataStore.updateData ().
```
   suspend fun updateShowCompleted(completed: Boolean) {
        dataStore.updateData { preferences ->
            preferences.toBuilder().setShowCompleted(completed).build()
        }
    }
```

## Di chuyển từ SharedPreferences
Để giúp di chuyển, `DataStore `xác định lớp `SharedPreferencesMigration`. Tạo nó trong `UserPreferencesRepository`. Khối di chuyển cung cấp cho chúng ta hai tham số:
* `SharedPreferencesView` cho phép chúng tôi truy xuất dữ liệu từ `SharedPreferences.`
* Dữ liệu hiện tại của `UserPreferences`.
```
private val sharedPrefsMigration = SharedPreferencesMigration(
    context,
    USER_PREFERENCES_NAME
) { sharedPrefs: SharedPreferencesView, currentData: UserPreferences ->
        // Define the mapping from SharedPreferences to UserPreferences
        if (currentData.sortOrder == SortOrder.UNSPECIFIED) {
            currentData.toBuilder().setSortOrder(
                SortOrder.valueOf(
                    sharedPrefs.getString(
                        SORT_ORDER_KEY,SortOrder.NONE.name)!!
                )
            ).build()
        } else {
            currentData
        }
    }
```
## Lưu trữ sắp xếp đến DataStore
Để cập nhật thứ tự sắp xếp khi `enableSortByDeadlin() `và `enableSortByPooter() `được gọi, chúng ta phải làm như sau:
Gọi các chức năng tương ứng của chúng trong lambda của `dataStore.updateData ()`.
Vì updateData () là một hàm `suspend`, nên `enableSortByDeadline()` và `enableSortByPooter()` cũng phải được tạo thành một `suspend`.
Sử dụng `UserPreferences` hiện tại nhận được từ `updateData()` để xây dựng thứ tự sắp xếp mới
Cập nhật `UserPreferences` bằng cách chuyển đổi nó thành trình tạo, đặt thứ tự sắp xếp mới và sau đó xây dựng lại tùy chọn.
Đây là cách triển khai` enableSortByDeadline()` trông như thế nào.
```
suspend fun enableSortByDeadline(enable: Boolean) {
    dataStore.updateData { preferences ->
        val currentOrder = preferences.sortOrder
        val newSortOrder =
            if (enable) {
                if (currentOrder == SortOrder.BY_PRIORITY) {
                    SortOrder.BY_DEADLINE_AND_PRIORITY
                } else {
                    SortOrder.BY_DEADLINE
                }
            } else {
                if (currentOrder == SortOrder.BY_DEADLINE_AND_PRIORITY) {
                    SortOrder.BY_PRIORITY
                } else {
                    SortOrder.NONE
                }
            }
        preferences.toBuilder().setSortOrder(newSortOrder).build()
    }
}
```
Các hàm `enableSortByDeadline()` và `enableSortByPooter()` hiện đang là `suspend function` nên chúng cũng sẽ được gọi trong một chương trình điều tra mới, được khởi chạy trong viewModelScope:
```
fun enableSortByDeadline(enable: Boolean) {
    viewModelScope.launch {
       userPreferencesRepository.enableSortByDeadline(enable)
    }
}

fun enableSortByPriority(enable: Boolean) {
    viewModelScope.launch {
        userPreferencesRepository.enableSortByPriority(enable)
    }
}
```

# Tóm lại:
SharedPreferences đi kèm với một loạt nhược điểm - từ API đồng bộ có thể tỏ ra an toàn khi gọi trên chuỗi giao diện người dùng, không có cơ chế báo hiệu lỗi, thiếu API giao dịch và hơn thế nữa.
DataStore là sự thay thế cho SharedPreferences giải quyết hầu hết các thiếu sót của API.
DataStore có một API hoàn toàn không đồng bộ sử dụng Kotlin coroutines và Flow, xử lý việc di chuyển dữ liệu, đảm bảo tính nhất quán của dữ liệu và xử lý lỗi dữ liệu.

Cảm ơn các bạn đã đọc bài viết này.

 Link tham khảo bài viết
>  https://codelabs.developers.google.com/codelabs/android-proto-datastore
>  
 Source code:
> https://github.com/nghiaptx-2124/Proto-DataStore/tree/master/android-datastore