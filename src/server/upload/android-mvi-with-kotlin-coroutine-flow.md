<div align="center"><img src="https://images.viblo.asia/2f295189-4aa2-43a3-8e12-5f156ba02d0f.jpeg" /></div><br />

MVI là một mô hình kiến trúc phổ biến trong việc thiết kế các ứng dụng Android. Có rất nhiều bài viết về MVI nhưng hầu hết sử dụng RxJava. Trong bài viết này chúng ta sẽ thay thế bằng việc sử dụng **Kotlin Coroutines và Kotlin Flow API** nhằm triển khai mô hình kiến trúc MVI. Một phần trong bài viết này, chúng ta sẽ khám phá một API mới là **State Flow**. Nhưng trước hết, hãy tìm hiểu nhanh về mô hình MVI thông thường.

## A Quick introduction to MVI
MVI là viết tắt của "Model, View, Intent". Giai đoạn cuối năm trước đây là mô hình kiến trúc nhận được rất nhiều sự chú ý của các nhà phát triển ứng dụng Android. Nó cũng như các mô hình đã biết thông thường khác như MVP, hay MVVM, nhưng nó giới thiệu hai khái niệm mới đó là **intent** và **state**.
**Intent** là một sự kiện gửi tới ViewModel bởi view để thực hiện một task cụ thể. Nó có thể được gây ra bởi người dùng hoặc một phần khác của ứng dụng. Một kết quả của điều đó, một **state** mới được thiết lập trên ViewModel cái thực hiện cập nhật giao diện người dùng. Trong kiến trúc MVI, View lắng nghe các **state**. Mỗi lần **state** thay đổi, View được thông báo.

<div align="center"><img src="https://images.viblo.asia/c33c47c0-c781-472d-ab94-5b1f30128a71.png" /></div><br />

## Android MVI with Kotlin Coroutines
MVI có thể được triển khai bởi các cách thức khác nhau, RxJava là một con đường để thực hiện điều đó. Trong bài viết này, tất nhiên, chúng ta sẽ sử dụng Coroutines. Rất nhiều nhà phát triển thích chúng bởi vì đây là một cách thức đơn giản hơn nhằm xử lý các hoạt động bất đồng bộ. Cũng như bạn không đạt được sự tin tưởng vào bất cứ thư viện bên ngoài nào. Hãy xem xét làm thế nào để triển khai ViewModel của chúng ta với coroutines và bắt đầu với phương thức đơn giản nhất. Sau đó, chúng ta sẽ cải tiến mã nguồn này từng bước một.

### First Try: Basic Channels
Đầu tiên hãy sử dụng một **Channel&lt;T&gt;** nhằm lắng nghe các **intents** và sự thay đổi của các **states** trong ViewModel. Chúng ta tạo một thuộc tính **intentChannel** có kiểu **Channel&lt;Intent&gt;** cho các **intents** và một **stateChannel** với kiểu **Channel&lt;State&gt;** cho việc xử lý các **states**. Các Intents được nhận bởi ViewModel. **State** thiết lập bởi ViewModel và lắng nghe bởi View(Activity/Fragment).

```
@OptIn(ExperimentalCoroutinesApi::class)
class AwesomeViewModel(private val initialState: State) : ViewModel() {
    val intentChannel = Channel<Intent>(Channel.UNLIMITED)
    val stateChannel = Channel<State>(Channel.UNLIMITED)

    sealed class Intent {
        object CheckUserLogin : Intent()
    }

    sealed class State {
        object Idle : State()
        object UserLoggedIn : State()
        object UserLoggedOut : State()
    }

    init {
        viewModelScope.launch {
            handleIntents()
        }
    }

    private suspend fun handleIntents() {
        var state = initialState
        suspend fun setState(reducer: (State) -> State) {
            state = reducer(state)
            stateChannel.send(state)
        }
        intentChannel.consumeEach { intent ->
            when (intent) {
                Intent.CheckUserLogin -> {
                    setState { checkUserLogin() }
                }
            }
        }
    }

    private fun checkUserLogin(): State = 
        if(userIsLoggedIn()) UserLoggedIn
        else UserLoggedOut 
}
```

Trong ví dụ này, **intents** được xử lý trong một đối tượng coroutine(**viewModelScope.launch**). Đối tượng này là cái đóng vai trò đọc tất cả các intents và điều hành công việc. Sau khi công việc của một intent cụ thể được thực hiện, đối tượng này biến đổi state và gửi nó cho View.

Chúng ta vẫn không đề cập đến việc làm thế nào các intents được gửi tới View từ ViewModel. Đây là cách chúng ta thực hiện điều đó như thế nào.

```
viewModel.intentChannel.offer(AwesomeViewModel.Intent.CheckUserLogin)
```

Phương thức **offer()** là một cách thức đồng bộ nhằm thực hiện phương thức **send()** của channels mà không cần chạy bất cứ một coroutine mới nào. Bởi vì chúng ta phải kiểm soát channel này và biết nó không bị giới hạn sức chứa, đây là cách thức an toàn để thực hiện và làm mọi thứ trở nên dễ dàng hơn. Tuy nhiên, nếu **offer()** xâm phạm tới các hạn chế về sức chứa của channel, hoặc bạn không biết chúng, bạn nên sử dụng **send()** thay thế.

**Note**: Intents không phải lúc nào cũng cần phải gửi tới View. Ví dụ, có các trường hợp nơi quá trình gửi chúng đi trong khối **init{}** của ViewModel có thể có ý nghĩa.

### Second Try: Conflated Broadcast Channel
Hãy tiến thêm một bước nữa, **intentChannle** vẫ được giữ nguyên, nhưng **stateChannel** chúng ta sử dụng **ConflatedBroadcastChannel** thay thế:

```
val intentChannel = Channel<Intent>(Channel.UNLIMITED)
val stateChannel = ConflatedBroadcastChannel<State>()
```

Lợi thế của một **ConflatedBroadcastChannel** đó là nó đặt mọi thứ ở bên trong mỗi khi một state mới được thiết lập. Cách thức này, chúng ta không gặp bất cứ rắc rối nào khi sự thay đổi state xảy ra quá nhanh.

### Third and Final Version: StateFlow
Vấn đề chính với mã nguồn hiện tại của chúng ta đó là việc sử dụng phương thức **consumeEach**, cái đã được định nghĩa là không sử dụng nữa(deprecated). Chúng có có thể sử dụng **consumeAsFlow().collect{   }** thay thế, nhưng có một cách thức tốt hơn đó là sử dụng: **StateFlow**.

<div align="center"><img src="https://images.viblo.asia/8e45caa3-8360-48ab-9594-0cef8e9369d0.jpg" /></div><br />

**StateFlow** API được thiết kế cụ thể cho mục đích: quản lý một state. Do đó hãy sử dụng nó. Chúng ta xóa bỏ hoàn toàn **stateChannel** của mình khởi ViewModel và thay thế bằng cách định nghĩa một thuộc tính **state** với kiểu **StateFlow&lt;State&gt;**. Để giữ cho state là bất biến với bên ngoài, nhưng có thể biến đổi từ bên trong, chúng ta sử dụng một biến thể hiện là **&#818state** với loại **MutableStateFlow&lt;State&gt;** với phạm vi private.

```
@OptIn(ExperimentalCoroutinesApi::class)
class AwesomeViewModel : ViewModel() {

    val intentChannel = Channel<Intent>(Channel.UNLIMITED)
    private val _state = MutableStateFlow<State>(State.Idle)
    val state: StateFlow<State>
        get() = _state

    sealed class Intent {
        object CheckUserLogin : Intent()
    }

    sealed class State {
        object Idle : State()
        object UserLoggedIn : State()
        object UserLoggedOut : State()
    }

    init {
        viewModelScope.launch {
            handleIntents()
        }
    }

    private suspend fun handleIntents() {
        intentChannel.consumeAsFlow().collect { intent ->
            when (intent) {
                Intent.CheckUserLogin -> {
                    val userState = checkUserLogin()
                    _state.value = userState
                }
            }
        }
    }

    private fun checkUserLogin(): State =
        if(userIsLoggedIn()) UserLoggedIn
        else UserLoggedOut
}
```

**Note**: **StateFlow** là sẵn có trong coroutines phiên bản 1.3.3 và chúng vẫn trong trạng thái thử nghiệm.
Cũng có những thảo luận mới về nó mà bạn có thể theo dõi cho API này ở [đây](https://github.com/Kotlin/kotlinx.coroutines/issues/2034).

Giải pháp này có rất nhiều lợi thế:
* Quá trình thay đổi state không còn đòi hỏi một phương thức **suspending**.
* **StateFlow** kế thừa tất cả các lợi thế của **Flow**.
* Không có gì được phát ra nếu không có bất cứ subscriber. Nếu chúng ta sử dụng các channels cơ bản, mặc dù không có bất cứ đối tượng nào lắng nghe, các sự kiện vẫn xuất hiện mỗi khi chúng được phát ra.

## Handling State Updates in the View
Giờ đây, logic đã được đặt trong ViewModel, điều duy nhất còn lại chúng ta cần thực hiện đó là cập nhật view của mình dựa vào state hiện tại. Với quá trình triển khai **StateFlow**, làm thế nào để chúng ta thực hiện điều đó? Chúng ta định nghĩa một phương thức **handleState** cái thực hiện các thay đổi thị giác cần thiết dựa trên state hiện tại. Chúng ta lắng nghe state của ViewModel và gọi phương thức này mỗi khi có sự thay đổi state.

```
class MyAwesomeFragment : Fragment() {
   …
   
   override fun onViewCreated(view: View, savedInstanceState: Bundle?){
       ...
       myawesomeViewModel.state
			.onEach { state ->  handleState(state)}
			.launchIn(lifecycleScope)
   }

    private fun handleState(state: AwesomeViewModel.State) {
        when(state){
            AwesomeViewModel.State.Idle -> Unit
            AwesomeViewModel.State.UserLoggedIn -> routeToMainFragment()
            AwesomeViewModel.State.UserLoggedOut -> routeToLoginFragment()
        }
    }
   ….
}
```

Với cách thức này, chúng ta có một các thức đơn giản và tao nhã nhằm xử lý state của mình mà không phải quá đau đầu. Đến đây, chúng ta có một điểm duy nhất nhận lấy các intents và một điểm thoát duy nhất(state được quản lý bởi **StateFlow**).

## Conclusion
Trong khi có các lựa chọn khác nhằm triển khai kiến trúc MVI sử dụng Kotlin, coroutines là một sự thay thế tuyệt vời cho RxJava khi nó được sử dụng kết hợp với **StateFlow** API. Cũng như với tất cả những bài toán về mặt kiến trúc, không có viên đạn bạc và nó luôn phụ thuộc vào việc quá trình triển khai này có phù hợp với dự án của bạn hay không.

## Source
https://quickbirdstudios.com/blog/android-mvi-kotlin-coroutines-flow/

## Reference
[**Coroutine Flow Discussion**](https://github.com/Kotlin/kotlinx.coroutines/issues/2034).

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))