Để hiểu rõ hơn về bài viết này, trước hết bạn cần hiểu được 1 chút kiến thức về [Kotlin Coroutines](https://kotlin.github.io/kotlinx.coroutines/index.html). Trong bài viết này mình sẽ giới thiệu về StateFlow, cách sử dụng nó như thế nào, và thay thế LiveData bằng StateFlow như thế nào nhé.

## 1. Introduce
### State Follow
Trong qá trình phát tiển ứng dụng, chúng ta có thể sẽ cần sử dụng *Flow* để biểu thị trạng thái có thể cập nhật trong các ứng dụng. Sự thay đổi này giới thiệu *StateFlow* - một giá trị có thể cập nhật đại diện cho một *state* và là một *flow*. Nó được thiết kế linh hoạt để phù hợp với nhiều nhu cầu ví dụ như sau:
- StateFlow <T> interface là một dạng *read-only view* cung cấp quyền truy cập vào giá trị hiện tại và triển khai một Flow <T> để thu thập các cập nhật cho các giá trị.
- MutabaleStateFlow <T> interface cho phép thêm xử lý đó là có thể sửa đổi giá trị.

**MutableStateFlow** có thể thay đổi được tạo bằng cách sử dụng hàm khởi tạo MutableStateFlow (param) với giá trị ban đầu. Giá trị của *mutable state flow* có thể thay đổi, có thể được cập nhật bằng cách đặt thuộc tính giá trị của nó. Cập nhật giá trị luôn được tích hợp. Vì vậy, một *slow collector* sẽ bỏ qua các bản cập nhật nhanh, nhưng luôn thu thập giá trị được *emitted* gần đây nhất.
    
**StateFlow** hữu ích như một lớp mô hình dữ liệu (data-model class) để đại diện cho bất kỳ loại trạng thái nào. Các giá trị có thể được xác định bằng cách sử dụng các toán tử khác nhau trên các follow, với toán tử kết hợp đặc biệt hữu ích để kết hợp các giá trị từ nhiều *state flows* bằng cách sử dụng các hàm tùy ý.
Ví dụ: lớp sau đóng gói một state số nguyên và tăng giá trị của nó trên mỗi lần gọi đến phương thức inc:    
```kotlin
class CounterModel {
    private val _counter = MutableStateFlow(0) // private mutable state flow
    val counter = _counter.asStateFlow() // publicly exposed as read-only state flow

    fun inc() {
        _counter.update { count -> count + 1 } // atomic, safe for concurrent use
    }
}
```
Có hai instance của lớp CounterModel ở trên, người ta có thể xác định tổng các bộ đếm của chúng như sau:

```kotlin
val aModel = CounterModel ()
val bModel = CounterModel ()
val sumFlow: Flow <Int> = aModel.counter.combine (bModel.counter) {a, b -> a + b}
```
Và để thay thế cho cách sử dụng ở trên với hàm khởi tạo MutableStateFlow (...), bất kỳ coldFlow nào cũng có thể được chuyển đổi thành *state follow* bằng toán tử stateIn.
    
Và chốt lại, API state follow core có thể được tóm tắt như sau:
```kotlin
package kotlinx.coroutines.flow

interface StateFlow<T> : Flow<T> {
    val value: T // always availabe, reading it never fails
}

interface MutableStateFlow<T> : StateFlow<T> {
    override var value: T // can read & write value
}

fun <T> MutableStateFlow(value: T): MutableStateFlow<T> // constructor fun
```

### StateFlow vs ConflatedBroadcastChannel

Về mặt khái niệm, *state follow* tương tự như ConflatedBroadcastChannel và được thiết kế để thay thế hoàn toàn nó. Nó có những điểm khác biệt quan trọng sau:
- StateFlow đơn giản hơn, vì nó không phải triển khai tất cả các API Channel, cho phép triển khai nhanh hơn, không có rác (garbage-free), không giống như triển khai ConflatedBroadcastChannel phân bổ các đối tượng trên mỗi giá trị được phát ra.
- StateFlow luôn có một giá trị có thể được đọc một cách an toàn bất cứ lúc nào thông qua thuộc tính giá trị. Không giống như ConflatedBroadcastChannel, không có cách nào để tạo *state follow* mà không có giá trị.
- StateFlow có sự tách biệt rõ ràng thành interface StateFlow chỉ đọc và MutableStateFlow. (đã giới thiệu ở trên)
- Sự kết hợp StateFlow dựa trên sự bình đẳng như toán tử DifferentUntilChanged, không giống như sự kết hợp trong ConflatedBroadcastChannel dựa trên tham chiếu tới id (reference identity).
- StateFlow không thể closed như ConflatedBroadcastChannel và không bao giờ có thể đại diện cho một thất bại. Tất cả các lỗi và tín hiệu hoàn thành phải được cụ thể hóa rõ ràng nếu cần.

StateFlow được thiết kế để bao quát tốt hơn các trường hợp sử dụng điển hình để theo dõi các thay đổi trạng thái theo thời gian, đưa ra các lựa chọn thiết kế thực dụng hơn vì lợi ích của sự thuận tiện.
### Chuyển Flow sang StateFlow
Một *Flow* thông thường là cold. Nó không có khái niệm về giá trị cuối cùng và nó chỉ hoạt động khi được thu thập. Tuy nhiên đã có toán tử **stateIn** để biến bất kỳ Follow nào thành hot StateFlow. Nó được thiết kế để thay thế cho *broadcastIn*. Nó sẽ giảm bớt nhu cầu phải có một "state flow builder" riêng vì bạn có thể chỉ cần viết luồng {....} .stateIn (scope) để khởi chạy một chương trình emits các giá trị theo code trong dấu ngoặc nhọn.
    
## 2. Replacing LiveData with StateFlow
Với sự gia tăng của KMM (Kotlin multiplatform mobile), làm thế nào để chúng ta dọn dẹp càng nhiều phụ thuộc Android (Android dependencies) càng tốt để tăng **platform-independent** code?
**LiveData** được cộng đồng Android sử dụng rộng rãi để quản lý và thể hiện trạng thái màn hình. Để thay thế nó một cách an toàn, chúng ta cần xem xét một số implementation chi tiết.
    
### LiveData
Việc phát triển cho Android rất phức tạp vì một số lý do và một trong số chúng đang làm việc với vòng đời của các thành phần chính của nó: Activity và Fragment. Không xử lý vòng đời đúng cách có thể dẫn đến rò rỉ bộ nhớ, treo máy và các trạng thái không mong muốn. [LiveData](https://developer.android.com/topic/libraries/architecture/livedata) là một triển khai  **lifecycle-aware** nhận biết vòng đời giúp giảm nỗ lực cần thiết để đối phó với những phức tạp này.
### StateFlow
Kotlin là một ngôn ngữ mạnh mẽ và có thể trở nên mạnh mẽ hơn khi làm việc với Coroutines. Cả hai đều không ngừng phát triển và trên phiên bản Coroutines 1.3.6, **StateFlow** đã được giới thiệu. Nó được thiết kế để xử lý các tình huống **state publication scenarios**, cộng với các thế mạnh đã được giới thiệu ở trên, khiến nó trở thành một ứng cử viên sáng giá để thay thế LiveData.
    
Và bây giờ hãy cùng so sánh cách dùng nhé:
    
### Using LiveData
Mình sẽ giải quyết trường hợp sử dụng chính của LiveData: xử lý view states bằng ViewModel và Fragment. Dưới đây, một cách triển khai đơn giản:
```kotlin
// ViewModel managing LiveData

class MainViewModel : ViewModel() {
    private val _count = MutableLiveData<Int>()
    val count : LiveData<Int> = _count
    
    private fun incrementCounter() {
        _count.value = (_count.value as Int) + 1
    }
}
```

```kotlin
// Observing LiveData at MainFragment

private fun observeState(binding: MainFragmentBinding) {
    viewModel.count.observe(viewLifecycleOwner) {
        binding.counter.text = "${it}s"
    }
}
```
    
### Using StateFlow
Đầu tiên, chúng ta cần thêm các phụ thuộc (dependencies) sau:
```
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.0'
implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0'
```
    
Và code triển khai StateFlow như sau:
```kotlin
// ViewModel managing StateFlow

class MainViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count : StateFlow<Int> = _count
    
    private fun incrementCounter() {
        _count.value++
    }
}
```
    
```kotlin
// Observing StateFlow at MainFragment
    
private fun observeState(binding: MainFragmentBinding) {
    viewLifecycleOwner.lifecycleScope.launchWhenStarted {
        viewModel.count.collect {
            binding.counter.text = "${it}s"
        }
    }
}
```
    
Vậy là xong rồi, không hề phức tạp chút nào.
    
TUY NHIÊN, Một số điểm khác biệt cần lưu ý:

**Always has a value:**
StateFlow luôn có một giá trị có thể được đọc một cách an toàn bất cứ lúc nào thông qua thuộc tính value. Khi khởi tạo StateFlow, chúng ta phải cung cấp một giá trị ban đầu để đảm bảo rằng nó sẽ bắt đầu với một trạng thái. Thiết kế tốt theo ý kiến của mìh!

**lifecycleScope**
Bằng cách sử dụng extention **viewLifecyleOwner.lifecycleScope**, chúng ta làm cho follow consumption **lifecycle-aware**, giống nhưLiveData. Khi destroy, coroutine context bị hủy.
    
**launchWhenStarted**
LiveData chỉ phát ra khi LifecycleOwner ở trạng thái hoạt động. Nó tạm dừng consumption  nếu trạng thái vòng đời “thấp hơn” so với [Started](https://developer.android.com/reference/androidx/fragment/app/Fragment#onStart()). Để tái tạo hành vi này, chúng ta cần sử dụng launcherWhenStarted.
    
CHÚ Ý: Nếu các bạn bị lỗi ko tìm thấy extention collect thì hãy thêm dependencies này nhé:
```
import kotlinx.coroutines.flow.collect
```
    
Cám ơn các bạn đã dành thời gian theo dõi!
    
TÀI LIỆU THAM KHAO:
- https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/
- https://cesarmorigaki.medium.com/replace-livedata-with-stateflow-4f3c89214b04