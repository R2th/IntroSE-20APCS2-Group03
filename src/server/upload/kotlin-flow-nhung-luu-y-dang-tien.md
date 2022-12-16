> Trong quá trình phát triển ứng dụng Android, những tính năng yêu cầu data được update realtime với hiệu suất cao thì Flow là ứng cử viên sáng giá nhất để áp dụng. Việc ứng dụng reactive source mang lại trải nghiệm tốt cho người dùng, khả năng tuỳ biến cao khi specs thay đổi. 

![](https://images.viblo.asia/ee4f5fdf-f4fd-4a08-afef-67b616645e18.png)

Ở đây chúng ta sẽ không nói chi tiết và cặn kẽ đối về Flow hay các toán tử của nó vì trên mạng đã có quá nhiều rồi, chúng ta sẽ cùng điểm qua những lưu ý để sử dụng hiệu quả  và tránh những lỗi không đáng có.

## Cold Flow / Hot Flow
### 1. Cold Flow
Là một lạnh lùng boy, Cold Flow không chủ động bắt chuyện các em gái mà sẽ chỉ tiếp chuyện với em gái nào đến làm quen nó 😎 Nói một cách sách vở hơn thì Cold Flow là flow sẽ không làm gì cả cho đến khi nó được gọi thông qua hàm `collect()`, không tính `launchIn(scope)` nhé vì bản chất bên trong nó cũng call qua hàm collect thôi.

### 1.1 Cold flow sẽ complete khi chạy xong hết các toán tử của nó.
```kotlin
val flow = flowOf(1,2,3)
flow
     .onEach { Timber.d("===> Collect: $it") }
     .onCompletion { Timber.d("===> Collect completed") }
     .collect()

 //===> Collect: 1
 //===> Collect: 2
 //===> Collect: 3
 //===> Collect completed
```
Ta có thể đặt các hàm xử lí khi flow được hoàn thành tại `onCompletion()`. Ví dụ như hide loading , update data... 

### 1.2 Cold flow giúp độc lập các luồng data.
```kotlin
val flow = flowOf { 
        doSomeThing()
        delay(1000)
        doSomeOtherThing()
        emit(resuult)
}

flow.collect { update(data) }
flow.collect { update(data) }
```

Khi `flow` được `collect` bao nhiêu lần thì sẽ có bấy nhiêu lần block trong flow builder được gọi. Ví dụ khi làm tính năng cho phép nhiều người dùng đăng nhập đồng thời, mỗi người dùng cần phải collect một socket message riêng thì sử dụng cold stream là perfect choice :D

### 1.3 Cold flow có thể bị bẻ cong thành Hot flow

Tưởng tượng, bạn làm ứng dụng chat *** có top danh sách video trending được update realtime và xuất hiện ở nhiều màn hình để user vào giải trí. Nếu dùng cold flow thì tại mỗi màn hình bạn cần phải collect data, và cứ mỗi lần collect thì flow sẽ tạo ra một stream mới để tạo một realtime connection mới đến server. Điều này sẽ dẫn đến 2 vấn đề:
- Thứ nhất: Bạn cần stop việc collect tại màn hình khi nó không còn foreground để tránh lãng phí resource
- Thứ hai: Khi user back lại màn hình trước đó thì sẽ có một độ trễ nhất định để collect lại data từ socket vì cold flow sẽ mở một connection mới.

Thay vào đó ta có thể biến Cold Flow thành một Hot Flow (Đọc phần 2 để xem thêm về Hot Flow) 
```kotlin
class TopTrendingSource {
     private val _topTrendingFlow: Flow<Movie> = socketConnector.connect()

     val topTrendingSharedFlow = _topTrendingFlow.shareIn(
                replay = 1,
                scope = GlobalScope,
                started = SharingStarted.WhileSubscribed(),
     )
```

Khi có 3 collector cùng collect data từ topTrendingSharedFlow thì sẽ chỉ có 1 socket connection được mở tới server, data mới từ server gửi về sẽ được gửi tới tất cả các collector. Kết nối tới server sẽ chỉ bắt đầu khi có nhiều hơn 1 collector, và sẽ bị huỷ khi không có collector nào. Thật là tuyệt zời <3 

### 2. Hot Flow
Khác với boy cool ngầu Cold Flow thì Hot Flow là một anh chàng cởi mở sống hướng ngoại, chưa thấy mặt mà đã thấy tiếng như một anh Tú giấu tên nào đó ở công ty tôi. HotFlow chủ động đi hóng hớt, bắt chuyện mà không cần phải đợi collect.

Đại diện cho HotFlow là ShareFlow và StateFlow, được dùng rất nhiều trong thực tế.

### 2.1 HotFlow không bao giờ complete.

Vì vậy hãy chú ý nếu bạn đặt code tại hàm onCompletion, kiểm tra xem có đúng nó là ColdFlow hay là HotFlow được abstract dưới Flow. Hàm onCompletion() chỉ nên được đặt tại nơi tạo ra ColdFlow để chắc chắn rằng chúng ta đang theo tác trên ColdFlow. Còn đối với các thư viện return object Flow thì chúng ta nên tránh đặt callback cho onCompletion() vì chúng ta không chắc tương lai thư viện có thay đổi source và biến ColdFlow thành HotFlow tại implementation không.

```kotlin
val hotFlow = MutableSharedFlow<Int>()
hotFlow.onCompletion { /* This is never called */ }
```

### 2.2 Chúng ta bị lừa

**StateFlow/SharedFlow/MutableStateFlow/MutableSharedFlow** là interface.
**MutableSharedFlow/MutableStateFlow** mà chúng ta sử dụng khi tạo HotFlow là function 💩

```kotlin
public fun <T> MutableSharedFlow(
    replay: Int = 0,
    extraBufferCapacity: Int = 0,
    onBufferOverflow: BufferOverflow = BufferOverflow.SUSPEND
): MutableSharedFlow<T> {
    require(replay >= 0) { "replay cannot be negative, but was $replay" }
    require(extraBufferCapacity >= 0) { "extraBufferCapacity cannot be negative, but was $extraBufferCapacity" }
    require(replay > 0 || extraBufferCapacity > 0 || onBufferOverflow == BufferOverflow.SUSPEND) {
        "replay or extraBufferCapacity must be positive with non-default onBufferOverflow strategy $onBufferOverflow"
    }
    val bufferCapacity0 = replay + extraBufferCapacity
    val bufferCapacity = if (bufferCapacity0 < 0) Int.MAX_VALUE else bufferCapacity0 // coerce to MAX_VALUE on overflow
    return SharedFlowImpl(replay, bufferCapacity, onBufferOverflow)
}
```

```kotlin
public fun <T> MutableStateFlow(value: T): MutableStateFlow<T> = StateFlowImpl(value ?: NULL)
```

### 2.3 Emit/TryEmit/Update

Khi sử dụng mutable flow thì chắc chắn bạn sẽ cần update value, tuy nhiên có nhiều hàm update như `emit()/tryEmit()/update()` . Vậy sử dụng thằng nào khi nào ?
* **suspend fun emit()**: Dùng khi muốn emit một value nào đó, hàm sẽ bị suspend nếu flow được cài đặt `onBufferOverflow: BufferOverflow = BufferOverflow.SUSPEND` và số lượng phần tử buffer vượt quá `extraBufferCapacity`. Chỉ đến khi các value được collect thì các emit function mới tiếp tục được thực thi.
* **fun tryEmit()**: Hàm emit value cho flow mà không làm suspend, nếu việc emit thành công thì kết quả return true. Tuy nhiên, nếu flow được cài đặt `onBufferOverflow: BufferOverflow = BufferOverflow.SUSPEND` và số lượng phần tử buffer vượt quá `extraBufferCapacity` thì kết quả sẽ return false.
* **fun update()**: Dùng khi update value của `MutableStateFlow`, các collector sẽ chỉ nhận được event change khi **currentValue != newValue**. Hàm này sẽ tạo một vòng lặp vô hạn để so sánh current value với new value, vòng lặp sẽ được ngắt chỉ newValue == oldValue. Nói kĩ hơn một chút về hàm này, nếu class của value là **data class** thì mặc định sẽ so sánh tất cả các field xem có equals với nhau hay không, nếu không thì so sánh địa chỉ của 2 object (hàm equals của class). Vậy nên ở đây có một số lưu ý cần phải nhớ:
    * Tuyệt đối không return false khi override hàm equals(): Điều này sẽ làm thread bị blocking forever.
    * Nếu có nhiều thread cùng truy cập và update StateFlow đồng thời thì hàm update sẽ lock thread hiện tại cho đến khi newValue được update thành công.
    * Sử dụng data class và các immutable field (Dùng val thay cho var, dùng List thay vì ArrayList,...): Để tránh việc các collector can thiệp vào object gốc, chỉnh sửa value của các field. Ví dụ:

        ```kotlin
                //Bad code cần tránh
                data class Movie(
                    val viewers: ArrayList<String>
                )

                val movieStateFlow = MutableStateFlow(Movie(arrayListOf()))
                
                val newViewer = movieStateFlow.value.viewers
                newViewer.add("Titanic")
                newViewer.add("Avatar")
                
                val newValue = movieStateFlow.value.copy(viewers = newViewer)
                movieStateFlow.update { newValue }
                //Mặc dù đã clone value ra thành object mới qua hàm copy. Nhưng data class sẽ mặc định so sánh các field chứ không so sánh địa chỉ => Object mới có địa chỉ khác nhưng content giống => currentValue == oldValue => update() nhưng collector không nhận thay đổi.
        ```
        
### 2.4 Đừng sử dụng SharedFlow như một SingleLiveEvent

StateFlow là child class của SharedFlow, là state holder vì vậy nó luôn hold trong mình một `value` tương tự như LiveData. Khi dùng LiveData thì hẳn các bạn đã khắc phục vấn đề data bị replay bằng cách sử dụng SingleLiveEvent (Value sẽ chỉ được collect 1 lần và không replay lại cho new subscriber).

SharedFlow cho phép tuỳ biến `replay` và `extraBufferCapacity`, có khi nào bạn sử dụng **MutableSharedFlow(replay = 0, extraBufferCapacity = 0)** để sử dụng SharedFlow như một SingleLiveEvent chưa ? Test qua thì cũng ổn áp đấy, event sẽ không bị replay cho collector mới. 

**NHƯNG**..., nếu các collector stop việc collect và SharedFlow vẫn tiếp tục được emit thì sẽ dẫn đến lỗi bị miss event (Do cả replay và extraBufferCapacity đều được set bằng 0).

Ví dụ: Sử dụng **MutableSharedFlow(replay = 0, extraBufferCapacity = 0)** để share error khi call API gặp lỗi. Ở phía UI collect errorFlow khi app foreground, khi background UI ngừng collect data nhưng background vẫn call API thì gặp lỗi và emit lỗi vào errorFlow. Khi UI trở lại foreground thì sẽ không được hiển thị lỗi kết nối => Miss event.

Vậy giải pháp ở đây là gì ? Chúng ta cần một flow đáp ứng được yêu cầu sau:
- Event **phải được consume** và **consume duy nhất 1 lần**.
- Event phải persist và không bị miss kể cả không có collector nào.

Câu trả lời chính là **Channel(capacity = Channel.BUFFERED)** với config này ta sẽ được một HotFlow cho phép emit event và collect event duy nhất một lần như một SingleLiveEvent.

### 2.5 Cẩn trọng khi refer tới value của StateFlow
Đã bao giờ bạn khai báo một biến để lấy value của StateFlow như thế này chưa ?

```kotlin
private val movieFilterStateFlow = MutableStateFlow(MovieFilter())
val movieFilterValue = movieFilterStateFlow.value
```

Nhìn thì cũng thấy ổn đấy, kiểm tra value bên trong StateFlow xem sao:

```kotlin
public interface MutableStateFlow<T> : StateFlow<T>, MutableSharedFlow<T> {
    public override var value: T
}
```

Thấy rằng `value` là một generic variable, khi StateFlow được update giá trị mới thì giá trị của nó sẽ được thay đổi theo. Như vậy thì thì việc gán `movieFilterValue = movieFilterStateFlow.value` thì đâu có vấn đề gì , hoàn toàn bình thường mà ?

Tiếp tục đi sâu vào implementation nào...

```kotlin
private class StateFlowImpl<T>(
    initialState: Any // T | NULL
) : AbstractSharedFlow<StateFlowSlot>(), MutableStateFlow<T>, CancellableFlow<T>, FusibleFlow<T> {
    private val _state = atomic(initialState) // T | NULL
    private var sequence = 0 // serializes updates, value update is in process when sequence is odd

    @Suppress("UNCHECKED_CAST")
    public override var value: T
        get() = NULL.unbox(_state.value)
        set(value) { updateState(null, value ?: NULL) }
}
```

Nhiều người sẽ thốt lên "ôi cái đệch"... và trong đó có mình. Nếu chỉ nhìn qua interface thì ta sẽ nghĩ rằng `value` là một variable nên ta có thể tạo một biến để refer vào lấy giá trị khi cần. Tuy nhiên ở implementation thì thực chất nó là một **[backing field](https://kotlinlang.org/docs/properties.html#backing-fields)**, value thực sự được hold bởi `_state`. 
Đặc điểm của backing field là một function được ẩn dưới getter/setter của một variable. Khi khai báo 
```kotlin 
val movieFilterValue = movieFilterStateFlow.value
```
thì movieFilterValue sẽ chỉ được set 1 lần thông qua backing field của `value`. Vậy nên khi StateFlow update giá trị cho biến `_state` thì `movieFilterValue` vẫn sẽ hold giá trị cũ.

Vậy nên hãy sử dụng 1 trong 2 cách:

   1. Tạo một variable StateFlow từ MutableStateFlow thông qua hàm asStateFlow() để lấy `value` khi cần.
   2. Nếu sử dụng biến để hold current value của StateFlow thì cần khai báo nó ở dạng backing field.
```kotlin
    private val movieFilterStateFlow = MutableStateFlow(MovieFilter())
    
    val movieFilterValue
        get() = movieFilterStateFlow.value
```

-------
Trên đây là một số lưu ý để việc sử dụng Flow tốt và tránh được những lỗi không đáng có. Nếu cảm thấy hay thì đừng quên +1 upvote để ủng hộ mình nhé.