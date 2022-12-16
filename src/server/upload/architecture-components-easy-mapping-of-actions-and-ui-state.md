## Introduction
Khi xây dựng một ứng dụng Android, hầu hết thời gian cái mà chúng ta đang thực hiện đó là ánh xạ trực tiếp, hoặc gián tiếp các actions với một vài trạng thái của UI.

Trong quá trình sử dụng Architecture Components, đạt được điều này là khá dễ dàng với sự trợ giúp của LiveData + Coroutine + ViewModels, nhưng nó cũng đòi hỏi hàng một chút mã nguồn nhằm thiết lập cho nó.

Lý do đó là để lắng nghe các "state" của một LiveDât, chúng ta phải viết một wrapper(lớp bao bọc) các giá trị của nó, cũng như tích hợp các actions xung quanh các trạng thái này.

Hãy lấy một ví dụ, có một danh sách dựa trên UI nơi:
* dữ liệu được tải về từ một API.
* Người dùng có thể swipe-refresh và thử call lại API nếu có lỗi, vv....

Để đáp ứng được các đòi hỏi này, các actions có thể sẽ là:

* ***Load***
* ***Swipe Refresh***
* ***Retry***

Và dựa trên các actions này, UI state có thể là một trong những cái này tại bất cứ thời điểm nhận được:
* ***Success***
* ***Loading***
* ***Swipe-Refreshing***
* ***Failure***
* ***SwipeRefresh-Failure***
* ***Retrying***

## The State Machine
Nếu chúng ta đã ánh xạ các states với các actions được đề cập ở bên trên bằng cách sử dụng một biểu đò - Nó sẽ giống như thế này:

<div align="center"><img src="https://images.viblo.asia/bf59cbd5-8ee7-403c-8f32-6265ce3e2efa.jpeg" /></div><br />
Các actions có thể là rõ ràng hoặc được hiểu ngầm. Sự khác biệt đó là các actions rõ ràng(được thể hiện bằng các đường mũi tên màu xanh dương) là các actions đó được gây ra bởi user và các actions ngầm thì không.

## Let's code it out!
### State
Hãy bắt đầu với State, hãy tạo một wrapper nhằm thể hiện các states bằng cách sử dụng *sealed classes*.
```
sealed class UIState<out R> {
    object Loading : UIState<Nothing>()
    object Retrying : UIState<Nothing>()
    object SwipeRefreshing : UIState<Nothing>()
    data class Success<T>(val data: T) : UIState<T>()
    data class Failure(val exception: Exception) : UIState<Nothing>()
    data class SwipeRefreshFailure(val exception: Exception) : UIState<Nothing>()
}
```

### Actions
Tương tự như các states, chúng ta sẽ tạo một wrapper để thể hiện các actions
```
sealed class Action {
    object Load : Action()
    object SwipeRefresh : Action()
    object Retry : Action()
}
```

### LiveData
Chúng ta sẽ cần tùy biến lại LiveData nhằm xử lý tất cả các actions và phun ra các state thích hợp dựa vào chúng(tương tự như những gì mà các [reducers](https://redux.js.org/basics/reducers) thực hiện trong Redux).

Cũng nên thực hiện việc call API sử dụng **Coroutines** và truyền ra các ngoại lệ(exceptions).

Quá trình triển khai như sau:

```
class ActionStateLiveData<T>(
    private val coroutineContext: CoroutineContext,
    fetchData: (suspend () -> Response<T>)
) {
    private val action = MutableLiveData<Action>()
    private var data: T? = null // backing data

    val state = action.switchMap {
        liveData(context = coroutineContext) {
            when (action.value) {
                Action.Load -> {
                    emit(UIState.Loading)
                }

                Action.SwipeRefresh -> {
                    emit(UIState.SwipeRefreshing)
                }

                Action.Retry -> {
                    emit(UIState.Retrying)
                }
            }

            try {
                val response = fetchData()
                val body = response.body()
                when {
                    response.isSuccessful && body != null -> {
                        data = body
                        emit(UIState.Success(body))
                    }
                    action.value == Action.SwipeRefresh -> {
                        emit(UIState.SwipeRefreshFailure(Exception()))
                    }
                    else -> {
                        emit(UIState.Failure(Exception()))
                    }
                }
            } catch (exception: Exception) {
                when {
                    action.value == Action.SwipeRefresh -> {
                        emit(UIState.SwipeRefreshFailure(Exception()))
                        data?.let {
                            // emit success with existing data
                            emit(UIState.Success(it))
                        }
                    }
                    else -> {
                        emit(UIState.Failure(Exception()))
                    }
                }
            }
        }
    }

    // Helpers for triggering different actions

    fun retry() {
        action.value = Action.Retry
    }

    fun swipeRefresh() {
        action.value = Action.SwipeRefresh
    }

    fun load() {
        action.value = Action.Load
    }
}
```

Quá trình sử dụng khối **liveData** mới(đó thực sự là suspend block) và **emit** method - Chúng ta có thể thực thi mã nguồn bất đồng bộ và phát ra các giá trị.

Khối **switchMap** cũng là một cú pháp mới nhằm thực hiện ***Transformations.switchMap()*** trên một mutable LiveData.

Phần cuối cùng là các phương thức để gửi đi những actions.

### ViewModel
Như chúng ta đã thảo luận về Coroutines, chúng ta sẽ chỉ rõ phạm vi là **viewModelScope** và sử dụng **Dispatchers.IO** như là coroutine context.

```
val users = ActionStateLiveData(viewModelScope.coroutineContext + Dispatchers.IO) {
    userService.fetchUsers()
}
```

**viewModelScope** ---> Gắn vòng đời của Coroutine của chúng ta với vòng đời của ViewModel.

**Dispatchers.IO** ---> Thực thi khối coroutine một cách bất đồng bộ.

### UI(Fragment/Activity)
Một khi tất cả đã hoàn thành - Giao diện người dùng là khá dễ dàng, chúng ta khởi tạo viewModel phát ra action tải dữ liệu lúc khởi tạo(initial load action) và lắng nghe kết quả.

```
val viewModel: ProfileViewModel by viewModels()// In onCreate
viewModel.users.load()swipeRefreshLayout.setOnRefreshListener {
    viewModel.users.swipeRefresh()
}retryButton.setOnClickListener {
    viewModel.users.retry()
}viewModel.users.state.observe(this) { state ->
    when (state) {
        Loading -> // show progress bar 
        Success -> // load up data 
        Failure -> // show error 
        Retrying -> // a different loader
        SwipeRefreshing -> // show swipe refresh loader
        SwipeRefreshingFailure -> // show error
   }
}
```

Hiện tại thì nó là như vậy đó - Cái này là ví dụ cơ bản về làm thế nào chúng ta có thể sử dụng LiveData + Coroutine + ViewModel nhằm ánh xạ các actions với UI States. 
Những cái này sẽ gây ra một ít khó khăn khi xử lý với quá trình phân trang và các quy tắc UI không chính thống. Chúng ta cũng sẽ khái quát chúng trong tương lai.

## Source
https://android.jlelse.eu/architecture-components-easy-mapping-of-actions-and-ui-state-207663e3fdd
## Reference
[**Reducers**](https://redux.js.org/basics/reducers)

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))