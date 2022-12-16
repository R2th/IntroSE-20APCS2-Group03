### I. What’s DataStore?
Trong những năm qua, các nhà phát triển Android đã quen với việc lưu trữ những phần nhỏ dữ liệu nhạy cảm (Sensitive data) của người dùng thông qua shared preferences. Cách tiếp cận này có những hạn chế sau: 
- Sensitive data trong shared preferences có thể dễ dàng bị lộ 
- Có vẻ an toàn khi gọi các shared-preference operations trên UI thread, nhưng trên thực tế thì không (do synchronous API có vẻ an toàn khi gọi trên UI thread, không có cơ chế báo hiệu lỗi, thiếu  transactional API, v.v )

DataStore là một thư viện thuộc dòng Jetpack cung cấp giải pháp lưu trữ dữ liệu mới, có thể thay thế shared preferences. Nó hiện đang ở giai đoạn alpha. 
### II. Why DataStore?
Nó được xây dựng bằng cách sử dụng Kotlin coroutines và Flow API, giúp nó an toàn và đáng tin cậy hơn shared preferences. Nó cung cấp hai cách tiếp cận khác nhau để save data:
- **Preferences DataStore**: Nó tương tự như SharedPreferences, ở chỗ nó không có cách nào để xác định một lược đồ hoặc để đảm bảo rằng các key được truy cập với đúng loại 
- **Proto DataStore**: Cho phép bạn tạo một lược đồ bằng cách sử dụng protocol buffers. Using protobufs cho phép duy trì strongly typed data.Chúng nhanh hơn, nhỏ hơn, đơn giản hơn và ít mơ hồ hơn so với XML và các định dạng dữ liệu tương tự khác.

Ngoài ra, khi bạn lưu trữ các cặp key-value, chỉ các key sẽ được hiển thị chứ không hiển thị nội dung.
### III. Database vs. DataStore
DataStore được xây dựng để lưu trữ các tập dữ liệu nhỏ; nếu yêu cầu của bạn liên quan đến cập nhật từng phần, tính toàn vẹn tham chiếu hoặc hỗ trợ cho các tập dữ liệu lớn / phức tạp, bạn nên cân nhắc sử dụng Room thay vì DataStore. 

Tiếp theo chúng ta sẽ đi vào các bước để sử dụng DataStore 
### IV. Integration
 Để sử dụng thư viện Jetpack Datastore hãy thêm dòng sau vào build.gradle file
 
`implementation "androidx.datastore:datastore-preferences:1.0.0-alpha01"
`
### V. Let’s Start Coding 
Để hiểu rõ hơn về cách sử dụng DataStore, chúng ta lấy một ví dụ real-time đơn giản, trong đó ta lưu trữ một số nguyên cho biết trạng thái đăng nhập của người dùng. Ở đây, chúng ta có một lớp enum với tất cả các stages có thể. Hãy xem bên dưới: 
```
enum class UserStatus {
    STARTER, ONBOARDING_LEVEL_1, ONBOARDING_LEVEL_2, VERIFIED
}
```
### VI. Create your DataStore
Bước tiếp theo là tạo DataStore. Để thực hiện, chúng ta cần tạo một lớp Kotlin, trong đó chúng ta sẽ sử dụng extension function context.createDataStore để tạo DataStore. Hãy xem:
```
class PreferenceManager(context: Context){
    private val dataStore = context.createDataStore(name = "prefernce_name")
}
```
### VII. Creating keys
Chúng ta sẽ tạo *preferencesKey*  inline function bằng cách xác định result type. Hãy xem
```
companion object {
    val USER_STATUS = preferencesKey<Int>("user_status")
}
```
### VIII. Save and Retrieve Data
Bây giờ chúng ta đã tạo DataStore và key, đã đến lúc lưu trạng thái của người dùng.
Chúng ta sẽ lưu một số nguyên với các giá trị 1, 2, 3 và 4 đại diện cho STARTER, ONBOARDING_LEVEL_1, ONBOARDING_LEVEL_2 và VERIFIED tương ứng 
### Save
Để save các cặp key-value trong  DataStore file chúng ta phải sử dụngedit function, function này sẽ cập nhật giá trị. Ở đây, chúng ta sử dụng suspend function để lưu các giá trị. Hãy xem:
```
suspend fun setUserStatus(userStatus: UserStatus) {
    dataStore.edit { preferences ->
        preferences[USER_STATUS] = when (userStatus) {
            UserStatus.STARTER -> 1
            UserStatus.ONBOARDING_LEVEL_1 -> 2
            UserStatus.ONBOARDING_LEVEL_2 -> 3
            UserStatus.VERIFIED -> 4
        }
    }
}
```
### Retrieve
Để truy xuất các giá trị từ DataStore, chúng tôi sử dụng Flow API. 

Một trong những lợi thế chính của việc sử dụng Flow là mỗi khi một giá trị mới được cập nhật trong DataStore, chúng ta sẽ nhận được thông báo. Vì vậy, chúng ta không còn cần phải kiểm tra các giá trị cập nhật nữa.
```
val userStatusFlow: Flow<UserStatus> = dataStore.data
        .catch {
            if (it is IOException) {
                it.printStackTrace()
                emit(emptyPreferences())
            } else {
                throw it
            }
        }
        .map { preference ->
            val userStatus = preference[USER_STATUS] ?: 1

            when (userStatus) {
                1 -> UserStatus.STARTER
                2 -> UserStatus.ONBOARDING_LEVEL_1
                3 -> UserStatus.ONBOARDING_LEVEL_2
                4 -> UserStatus.VERIFIED
                else -> UserStatus.STARTER
            }
        }
```
Thay vì giao số nguyên cho user-status case, chúng ta có thể sử dụng các hàm như *map* để chuyển đổi dữ liệu thành một kiểu dữ liệu thích hợp.
Bây giờ, hãy tập hợp các phần lại với nhau để chúng có ý nghĩa hơn. Hãy xem:
```
enum class UserStatus {
    STARTER, ONBOARDING_LEVEL_1, ONBOARDING_LEVEL_2, VERIFIED
}

class PreferenceManager(context: Context) {

    private val dataStore = context.createDataStore(name = "prefernce_name")

    val userStatusFlow: Flow<UserStatus> = dataStore.data
        .catch {
            if (it is IOException) {
                it.printStackTrace()
                emit(emptyPreferences())
            } else {
                throw it
            }
        }
        .map { preference ->
            val userStatus = preference[USER_STATUS] ?: 1

            when (userStatus) {
                1 -> UserStatus.STARTER
                2 -> UserStatus.ONBOARDING_LEVEL_1
                3 -> UserStatus.ONBOARDING_LEVEL_2
                4 -> UserStatus.VERIFIED
                else -> UserStatus.STARTER
            }
        }

    suspend fun setUserStatus(userStatus: UserStatus) {
        dataStore.edit { preferences ->
            preferences[USER_STATUS] = when (userStatus) {
                UserStatus.STARTER -> 1
                UserStatus.ONBOARDING_LEVEL_1 -> 2
                UserStatus.ONBOARDING_LEVEL_2 -> 3
                UserStatus.VERIFIED -> 4
            }
        }
    }

    companion object {
        val USER_STATUS = preferencesKey<Int>("user_status")
    }
}
```
### IX. Access From Android Components
Bây giờ chúng ta đã hoàn tất với preference manager, hãy cùng tìm hiểu cách gọi setUserStatus từ một Android activity. Hãy xem: 
```
fun saveuserStatus(status : Int){
  lifecycleScope.launch {
    when (status) {
        1 -> preferenceManager.setUserStatus(UserStatus.STARTER)
        2 -> preferenceManager.setUserStatus(UserStatus.ONBOARDING_LEVEL_1)
        3 -> preferenceManager.setUserStatus(UserStatus.ONBOARDING_LEVEL_2)
        4 -> preferenceManager.setUserStatus(UserStatus.VERIFIED)
    }
  }
}
```
Vì setUserStatus là một suspend function, chúng ta đã sử dụng một lifecycleScope để launch một coroutine

Việc truy xuất dữ liệu của trung tâm dữ liệu cũng tương tự như vậy; ở đây, chúng ta sử dụng collectLatest từ Flow API bằng cách làm bọc nó với một lifecycleScope. Hãy xem:
```
lifecycleScope.launch(Dispatchers.Main) {
    preferencemanager.userStatusFlow.collectLatest { userStatus-> 
        when (userStatus) {
            UserStatus.STARTER -> {/* TODO */}
            UserStatus.ONBOARDING_LEVEL_1 -> {/* TODO */}
            UserStatus.ONBOARDING_LEVEL_2 -> {/* TODO */}
            UserStatus.VERIFIED -> {/* TODO */}
        }
    }
}
```
### X. Conclusion 
Như vậy, chúng ta đã từng bước tìm hiểu DataStore, cũng như cách để sử dụng library DataStore, hy vọng các bạn có thể áp dụng vào dự án của mình.

Cảm ơn các bạn vì đã đọc, xin chào và hẹn gặp lại trong các bài viết sắp tới.
Bài viết có tham khảo từ [nguồn](https://medium.com/better-programming/jetpack-datastore-improved-data-storage-system-adec129b6e48)