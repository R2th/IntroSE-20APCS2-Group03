# I. Giới thiệu
Kể từ khi MVVM architecture được Google giới thiệu, đã có rất nhiều sự quan tâm của các developer về vấn đề này, bởi sử hữu ích của nó trong quá trình xây dựng và phát triển của mỗi ứng dụng hiện nay.

Sử dụng ViewModel/Presenter giúp code dễ đọc, dễ maintenance, dễ dàng chia sẻ dữ liệu giữa nhiều fragment,... Tuy nhiên, nó là việc giao tiếp dữ liệu với view trở lên phức tạp hơn đôi chút.

Sau đây, chúng ta cùng tìm hiểu về vấn đề này...
# II. Bắt đầu
Cùng lấy ví dụ về một màn hình chỉnh sửa thông tin user. Dữ liệu mà người dùng nhập vào khi gửi lên server thì lúc này  ViewModel/Presenter có thể hiện thị hoặc ẩn progressBar, bên cạnh đó khi  request thành cônng hoặc lỗi thì phải thông báo để View update cho phù hợp với trải nghiệm của người dùng,...


![](https://images.viblo.asia/be635123-7177-4b84-b1dd-e1096c480762.png)

Presenters và ViewModels không nên giữ lại references Views.

1.  Trong trường hợp sử dụng Presenter, chúng ta thường định nghĩa một số Interface trong Contract interface như là View implements Constract.view và Presenter implements Contract.presenter. Và bây giờ thì Presenter có thể dễ dàng gọi các phương thức trên View mà ko cần instance của activity hay là fragment nào.

Ví dụ:

```
interface EditProfileContract {
    
    interface view {
        
        fun setProgress(show: Boolean)
        
        fun showEmptyFirstNameError()
        
        fun showEmptyLastNameError()
    }
    
    interface presenter {
        
        fun saveProfile(firstName: String, lastName: String, bio: String, email: String, city: City, gender: String)
    }
}
```

2.  Đối với ViewModel, việc kết nối với view đơn gian hơn. Chúng ta thường truyền dữ liệu bằng LiveData hoặc RxJava. Khi view được subscribed vào ViewModel, nó sẽ bắt đầu nhận các sự kiện update, các này hoạt động khá tốt khi truyền dữ liệu đến view nhưng vấn đề phát sinh khi ViewModel cần truyền trạng thái view như trạng thái của progress bar, xác thực khi server trả về lỗi,...

# III. Giải pháp

Càng ít LiveData/Observable thì càng tốt. Vì vậy, những gì chúng ta tìm kiếm là một cách để tổng hợp thông tin cần được chuyển đến View. Trong hầu hết các trường hợp, ViewModel cần truyền đạt 3 điều:
*  Data:  Đây là những gì cần hiển thị trên View như thông tin người dùng,...
*  Status: Đây có thể là  lỗi xác thực, không có lỗi mạng, lỗi máy chủ,...

```
enum class Status {
    SUCCESS,
    ERROR,
    NO_NETWORK,
    EMPTY_FIRST_NAME,
    EMPTY_LAST_NAME,
    EMPTY_CITY,
    INVALID_URI
}
```

LiveData có SingleLiveEvent được implementation từ nó hoạt động khá tốt. Tạo một SingleLiveEvent để pass dữ liệu tới View

```
private val status = SingleLiveEvent<Status>()

fun getStatus(): LiveData<Status> {
    return status
}

fun handleImage(intent: Intent?) {
    intent?.data?.let {
        avatar.value = it.toString()
    } ?: run { status.value = Status.INVALID_URI }
}
```

View sẽ observe status LiveData và thực hiện hành động dựa trên các status hay lỗi khác nhau mà ViewModel truyền qua. Trong ví dụ này, chúng ta có thể dễ dàng hiển thị toast/snackbar khác nhau cho mỗi status nhận được.

```
viewModel.getStatus().observe(this, Observer { handleStatus(it) })

private fun handleStatus(status: Status?) {
    when (status) {
        Status.EMPTY_FIRST_NAME -> Toast.makeText(activity, "Please enter your first name!", Toast.LENGTH_SHORT).show()
        Status.EMPTY_LAST_NAME -> Toast.makeText(activity, "Please enter your last name", Toast.LENGTH_SHORT).show()
        Status.EMPTY_CITY -> Toast.makeText(activity, "Please choose your home city", Toast.LENGTH_SHORT).show()
        Status.INVALID_URI -> Toast.makeText(activity, "Unable to load the photo", Toast.LENGTH_SHORT).show()
        Status.SUCCESS -> {
            startActivity(HomeFragment.newIntent(activity))
            activity.finish()
        }
        else -> Toast.makeText(activity, "Something went wrong, please try again!", Toast.LENGTH_SHORT).show()
    }
}
```

*  State: UI state như là progressBar, dialog sẽ được truyền đến View mỗi khi nó bắt đầu obverving ViewModel data. Có thể tạo data class để giữ state

```
data class EditProfileState (
    var isProgressIndicatorShown: Boolean = false,
    var isCityDialogShown: Boolean = false,
    var isGenderDialogShown: Boolean = false
)
```

Tạo state là MutableLiveData trong ViewModel. Và vì chỉ View observe LiveData nên ta cũng nên tạo setters cho View có thể cập nhật state

```
private val state = MutableLiveData<EditProfileState>()

fun getState(): LiveData<EditProfileState> {
    return state
}

fun setProgressIndicator(isProgressIndicatorShown: Boolean) {
    state.value?.isProgressIndicatorShown = isProgressIndicatorShown
}

fun setCityDialogState(isCityDialogShown: Boolean) {
    state.value?.isCityDialogShown = isCityDialogShown
}

fun setGenderDialogState(isGenderDialogShown: Boolean) {
    state.value?.isGenderDialogShown = isGenderDialogShown
}
```

Hiển thị hoặc ẩn City/Gender dialog tuỳ theo state mà View nhận đc.

```
viewModel.getState().observe(this, Observer { handleState(it) })

private fun handleState(state: EditProfileState?) {
    if (state?.isCityDialogShown == true) {
        showCitySelectionDialog()
        return
    }
    if (state?.isGenderDialogShown == true) {
        showGenderSelectionDialog()
        return
    }
}
```

# IV. Tổng kết
Cách trên sẽ giúp cho code của ViewModel gọn gàng và sạch sẽ hơn. Cảm ơn các bạn đã theo dõi bài viết của mình!

Nguồn tham khảo: https://android.jlelse.eu/android-architecture-communication-between-viewmodel-and-view-ce14805d72bf