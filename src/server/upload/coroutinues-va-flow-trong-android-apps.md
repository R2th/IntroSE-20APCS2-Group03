- Với mỗi người phát triển ứng dụng Android chúng ta đều muốn có một project có cấu trúc gọn gàng, dễ maintain nhất có thể. Clean architecture sẽ giúp ta một phần điều đó. Logic business sẽ nằm ở trung tâm của project, không liên quan gì đến công nghệ chúng ta sử dụng. 
![](https://miro.medium.com/max/1400/1*TIcek7RZ5iTWX4Oa-P8k3A.png)

- Vì Clean Architecture có rất nhiều tầng, nó rất quan trọng để dữ liệu dễ dàng di chuyển thông qua các tầng. Với điều này, chúng ta có thể sử dụng Rx- một công cụ thật sự mạnh mẽ cho reactive programing. Đáng tiếc là nó thường để sử dụng với background thread. Các hoạt động trươc đây được bắt đầu với Single và Completable (one-time action nơi mà Rx chỉ được sử dụng để chuyển đổi luồng dễ dàng) thực sự nó có thể thay thế rất tốt bằng **Coroutines** 

- Có nhất nhiều bài so sánh về Rx và Couroutines điều này thực sự là chưa đúng vì chúng được tạo ra cho các cách sử dụng khác nhau. Bài viết này sẽ phân biết giữa các hành động một lần (one-time action) khi ta sử dụng coroutines và observing data khi chúng ta sử dụng Flow

### One-time actions
- Kotlin cung cấp hỗ trợ couroutines ở language level. Điều này thực sự dễ dàng để sử lí đa nhiệm, suspend(tạm dừng) và tiếp tục các task
- Scope giúp ta dễ dàng tránh gặp các lỗi cơ bản. Khi bắt đầu một coroutine, hãy bắt đầu nó với scope và tất cả các task sẽ bị cancel khi chúng ta cancel scope. Android Architecture Component định nghĩa ViewModelScope và LifecycleScope, nhưng bạn cũng có thể tự tạo scope cho riêng mình. ViewModelScope sữ bị huỷ khi ViewModel bị cleared và LifecycleScope được gắn với vòng đời của chủ sử hữu nó như Fragment 

```kotlin
viewModelScope.launch {
    val user = getUserUseCase.execute(userId)
}
```
- Theo mặc định, ViewModelScope.lauch sẽ được chạy trên main thread, vì vậy đừng quên chuyển các task quá nặng sang một trình điều phối khác trong repository hoặc usecase. Các function này nên được đánh dấu bằng một suspend. 
 Mọi suspend functioncos thể thay đổi dispatcher với *withContext*
 
 
```kotlin
override suspend fun execute(userId: String): User? =
    withContext(Dispatchers.Default) {
        // calculation
    }
```

Suspend function thực sự rất hiệu quả. Function excute sẽ được chạy trên dispatcher Defaullt. Việc gắn kết qủa cho user sẽ được thực hiện sau khi được tính toán, nhưng trên main thread sẽ không bị chặn mà bị supended. Main thread sẽ có sẵn cho các công cụ khác cho đến khi người dùng trả lại

Với *withContext()* cũng có thể được sử dụng ngay bên trong viewModelScope.launch, nhưng viewModel không nên biết việc thực thi của người dùng. Tốt hơn là suspend function ở trọng domain và data layer quyết định cách thức và giá trị của dispatcher khi được fetch về hay tính toán. Bằng cách này mà mọi suspend function đều quan tâm về dispatcher của riêng nó

- Dispatchers.IO thường được sử dụng để tìm nạp dữ liệu từ mạng, cơ sở dữ liệu, v.v. - các hoạt động không cần nhiều CPU
- Dispatchers.Default nên được sử dụng để tính toán hoặc các tác vụ chuyên sâu của CPU. 
Bạn cũng có thể trả về Dispatchers.Main (Android main thread ) hoặc sử dụng Dispatchers.Uninedined mà không thay đổi thread. Nó bắt đầu trên luồng hiện tại, nhưng nếu chức năng này bắt đầu một chức năng tạm dừng khác làm thay đổi dispatcher, nó sẽ tiếp tục trên dispatcher đó
- Nếu bạn cần nhiều kết quả từ các nguồn khác nhau, ta có thể dử dụng nhiều coroutines với async:

```kotlin
value1Deferred = viewModelScope.async {
    // …
}
value2Deferred = viewModelScope.async {
    // …
}
val user = User(value1Deferred.await(), value2Deferred.await())
```

- Nó sẽ bắt đầu với 2 corountine cho mỗi giá trị fetch. Nếu coroutines được chuyển từng thread với nhau (và không để lại trên Dispatcher.Main), việc tạo user object sẽ mất nhiều thời gian có thể cho hoạt động tìm nạp là lâu nhất. Ví dụ việc xử lí value1 mất 3s, xử lí vaule 2 mất 5s. Vậy user sẽ được tạo trong 5s, nếu sử dụng 1 coroutune sẽ là 8s

- Mọi couroutine đều có thể chia tách chính mình theo cách này mà không cần quá nhiều kiến thức về coroutine
-  Cả khởi chạy và async đều return Job mà bạn có thể kiểm tra nó xem trạng thái nó. ta có thể sử dụng điều này nếu không muốn bắt đầu couroutine với một số coroutine khác đang hoạt động

## Observing
- Coroutines rất tốt cho các one-time action, khi bạn cần fetch hay tính toán một cái gì đó một lần
- Mặc dù Kotlin flow thiếu một số toán tử mạnh mẽ như Rx, nhưng khó để lại cái gì không được quản lí

```kotlin 
getUserUseCase.execute()
    .debounce(DEBOUNCE_TIME)
    .collectLatest { user->
        doSomethingWithUser(user)
    }
```

- Nó sẽ return về một Flow<User>. Ta có thể áp dụng nhiểu toán tử trong đó, như debounce, sẽ lọc ra các gía trị theo sau bởi các giá trị mới hơn trong thời gian trên. Hầu hết các toán tử có thể dễ dàng được viết dưới dạng Flow extention và ta có thể tìm thấy source của nó trên blog hay github 
- Sau khi sử dụng tất cả các operator mà  bạn muốn, ta có thể đăng kí event với *collect()* hay *colectLast()* . Sau đó sẽ huỷ giá trị trước đó khi giá trị mới xuất hiện. Nếu bạn cho đoạn code này trong model hay presenter, nó sẽ không hoạt động. Lý do là hàm *collect()* là một suspend function và nó sẽ buộc ta phải bắt đầu với Flow được gắn với CoroutineScope. Bằng cách này ta sẽ duy trì đăng kí mện trong scope nó.

```kotlin 
viewModelScope.launch {
    getUserUseCase.execute()
        .debounce(DEBOUNCE_TIME)
        .collectLatest { user ->
            doSomethingWithUser(user)
        }
    }
```

 - *viewModelScope.lauch()* sẽ khởi chạy Flow trên dispatcher và giống với coroutine hãy chuyển nó sang dispacher tròn domain hay data 
 
```kotlin
buildFlow()
    .map { mapToSomething(it) }
    .flowOn(Dispatchers.Default)
```
 *Flowon* sẽ ảnh hưởng đến tất cả các toán tử. Do đó hàm này có thể định nghĩa lại dispatcher cho các toán tử của nó và *buildFlow()* có thể có. *flowOn* cho tập hợp toán tử của nó. Nếu bạn đặt nó trong một method, nó sẽ hoạt động như này.
    
```kotlin
.filter { … }               // Will be executed in IO
.flowOn(Dispatchers.IO)
.map { mapToSomething(it) } // Will be executed in Default
.flowOn(Dispatchers.Default)
```
    
Vậy Flow bắt nguồn từ đâu? Làm thế nào để tạo ra chúng? Có vài cách. Bạn có thể dùng 
    
```kotlin
flowOf(1, 2, 3)
```
 
- Hoặc có thể sử dụng channel tương tự với Dubject hay Processor trong Rx

```kotlin
private val usernameChannel = ConflatedBroadcastChannel<String>()
usernameChannel
    .asFlow()
    .collect{}
```

Một số thư viện cũng cho phép ta observer qua Flow như Room 

```kotlin
@Query("SELECT * FROM user")
fun getUsers(): Flow<List<User>>
```
    
> References : https://blog.trikoder.net/coroutines-and-flow-in-android-apps-deedd59a5f40