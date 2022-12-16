Ở bài viết trước, chúng ta đã có những trải nghiệm ban đầu với cách sử dụng thành phần kiến trúc mới là Navigation. Trong bài viết này, chúng ta tiếp tục tìm hiểu để trả lời cho những câu hỏi khó hơn như: Làm thế nào để chuyển dữ liệu về nơi gọi nó? Điều hướng có điều kiện hoạt động thực sự như thế nào trong thực tế?

### Vấn đề chuyển dữ liệu về nơi gọi nó
Khi làm việc với các Activity, cách đơn giản đề nhận phản hồi về từ nơi đã start Activity đó là sử dụng `startActivityForResult` và `onActivityResult`. Đối với các `fragment` thì không tồn tại cách trên và thành phần Navigation lại chủ yếu thực hiện với các fragment, vì vậy chúng ta phải tìm một giải pháp thay thế. Khi điều hướng từ một fragment này sang một fragment khác, tất cả những gì chúng ta cần là một `action` mà không cần biết `fragment` được start như thế nào, vì vậy cố gắng sử dụng callback cho fragment đó là một cách tiếp cận sai. Ở đây, chúng ta có thể sử dụng một thành phần khác, đó chính là `ViewModel`. Các `ViewModel` có thể có phạm vi là `Fragment` hoặc là `Activity`. Điều này có nghĩa là chúng ta có thể sử dụng nó để giao tiếp giữa các fragment. Vậy cách thức thực hiện sẽ như thế nào?

Để lấy một đối tượng `ViewModel`, chúng ta phải sử dụng `ViewModelProvider`:
```
ViewModelProviders.of(this).get(HomeViewModel::class.java)
```

Làm thế nào để có được phạm vi `Activity`? Bí quyết nằm ở con trỏ `this`. Có được `ViewModel` ở phạm vi `Activity`, làm thế nào có thể truyền dữ liệu giữa các fragment? Câu trả lời là sử dụng `LiveData`.
Giả sử bạn muốn tìm ra item nào được chọn ở `Fragment` tiếp theo, bạn có thể định nghĩa một event `LiveData` trong `ViewModel` như sau:
```
val itemSelectedEvent = MutableLiveData<Event<Item>>()
```
Khi select một item, hãy set `value` với dữ liệu như sau:
```
itemSelectedEvent.value = Event(item)
```
Ở phía fragment gốc, bạn phải `observer` event này:
```
viewModel.itemSelectedEvent.observe(this, EventObserver { ... })
```

Như vậy là hoàn thành. Bây giờ bạn nhận được một event khi điều hướng quay trở lại `fragment` gốc.
Với cách đơn giản này, chúng ta có thể truyền dữ liệu trở lại nơi gọi nó mà không cần kết nối chặt chẽ chúng, điều này thật tuyệt vời. 

### Điều hướng có điều kiện
Đôi khi để truy cập một màn hình, bạn cần phải ở trong một trạng thái nhất định để có thể truy cập nó.
Một trường hợp phổ biến cho điều này là bạn đã đăng nhập hoặc trải qua một số bước thiết lập. Thành phần Navigation đã hỗ trợ điều đó. Hãy bắt đầu với việc kiểm tra xem bạn có đăng nhập hay không khi mở màn hình và chuyển sang màn hình đăng nhập nếu không.
```
if (!isLoggedIn()) {
    findNavController().navigate(R.id.login)
} else {
    ...
}
```

Điều này có vẻ khá đơn giản. Nhưng điều gì sẽ xảy ra nếu bạn đăng nhập xong và quay trở lại? Bạn sẽ tiếp tục được chuyển tới trên cùng màn hình mà bạn vừa qua bước đăng nhập xong khi nãy. Vậy làm thế nào để biết được rằng bạn thực sự đã trở lại từ màn hình đăng nhập? Câu trả lời một lần nữa là: `LiveData` và `ViewModel`. Khi bắt đầu luồng login, chúng ta có thể set giá trị cho `LiveData` là `LOGIN_STARTED` và khi hoàn tất thì thay đổi giá trị thành `LOGIN_FINISHED`. Ở phía nơi gọi, chúng ta quan sát trạng thái và biết rằng bạn phải trở lại màn hình trước đó hoặc nếu đã đăng nhập thì hiển thị nội dung. Flow này là tương tự như `startActivityForResult` có trạng thái `RESULT_OK` và `RESULT_CANCELLED` để xác định xem luồng xử lý có hoàn thành hay không.

Start một luồng login có thể là trường hợp sử dụng phổ biến trong các ứng dụng. Một action điều hướng được xác đinh trên mỗi màn hình, vậy chúng ta có phải lặp lại action này ở mọi nơi không? Câu trả lời là không, nhờ vào global action.

### Global action
Một global action được định nghĩa giống như bất kỳ tuỳ chọn khác, nó chỉ nằm trong phần từ `navigation` thay vì `fragment`:
```
<navigation
    android:id="@+id/main">
    <action
        android:id="@+id/start_login"
        app:destination="@id/login"/>
</navigation>
```

Bạn có thể thấy rằng phần tử `navigation` có `id`. Điều này không được thêm vào theo mặc định, nhưng để global action có thể hoạt động, chúng ta cần phải định nghĩa nó. Điều này đặc biệt cần thiết cho safe agrs như một class `NavDirections` sẽ phải được tạo ra để giữ `id` cho tên class.

Để điều hướng trở lại, tất cả những gì cần làm là gọi `popBackStack()` và chúng ta sẽ quay trở lại nơi gọi. Nhưng nếu luồng login bao gồm nhiều màn hình thì sao? Có thể user sẽ đăng ký thay vì đăng nhập, vậy làm thế nào để quay lại màn hình gốc khi hoàn thành?

Đầu tiên, chúng ta nên duy trì luồng login dưới dạng lồng nhau. Biểu đồ điều hướng hỗ trợ lồng nhiều luồng trong xml. Chỉ cần thêm một phần tử `navigation` bên trong như thế này:
```
<navigation
    android:id="@+id/main">

    <action
        android:id="@+id/start_login"
        app:destination="@id/login"/>

    <navigation
        android:id="@+id/login"
        app:startDestination="@id/login_fragment">
        <fragment
            android:id="@+id/login_fragment">
            <action 
                android:id="@+id/signup"
                app:destination="@id/signup_fragment"
        </fragment>
        <fragment
            android:id="@+id/signup_fragment">
    </navigation>

</navigation>
```
Bằng cách này, luồng đăng nhập được xác định riêng biệt - màn hình đầu tiên của nó sẽ luôn giống nhau, bất kể bạn bắt đầu từ đâu. Nếu bạn muốn thay đổi, tất cả những gì bạn phải làm là thay đổi `startDestination`.

Nhưng làm thế nào để bạn quay lại màn hình gốc khi hoàn thành đăng ký? Chỉ cần gọi `popBackStack` sẽ đưa chúng ta trở lại để `login`. Có 2 lựa chọn:
* Lựa chọn thứ nhất: chúng ta có thể gọi `popBackStack` bằng `id`:
```
findNavController().popBackStack(R.id.login, true)
```
* Lựa chọn thứ hai: xác định action riêng trong luồng điều hướng của bạn:
```
<action
    android:id="@+id/finish_login"
    app:popUpTo="@id/login"
    app:popUpToInclusive="true"/>
```


### Kết luận
Trên đây là 3 vấn đề sâu hơn mà chúng ta sẽ thường gặp phải khi phát triển ứng dụng khi sử dụng thành phần Navigation. Cho đến bây giờ, vẫn còn nhiều điều để khám phá. Khi tiếp tục áp dụng cho các dự án của mình, chắc chắn các bạn sẽ khám phá thêm nhiều điều thú vị hơn nữa.

Vậy tính năng yêu thích của bạn trong Navigation Architecture Component là gì? Bạn đã tìm thấy điều gì mà chúng ta chưa đề cập đến?