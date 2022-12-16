Hello, xin chào các bạn :sunglasses:<br>
Đợt này dịch căng thẳng quá :mask:, không biết các bạn thế nào, chứ tôi vẫn phải ngồi mò mấy con bug cực chuối trên ChromeOs :nauseated_face::nauseated_face: . Đặc biệt khi không hiểu rõ vấn đề thì fix chỗ này, nó lại hổng chỗ kia. Chẳng còn cách nào khác là ngồi đọc cho kĩ tài liệu rồi mới bắt tay vào làm. Vì vậy nhân tiện dự án có sử dụng Kotlin Coroutine, tôi muốn chia sẻ tới các bạn nội dung về Coroutine Scopes ! <br>Hi vọng phần nào đó giúp đỡ những người mới vào nghề như tôi.
Bắt đầu nhé :+1:

![](https://images.viblo.asia/2e745ad7-2af0-4abb-b55b-6a9a589184c8.png)

Như tiêu đề của bài viết, tôi xin chia sẻ các phạm vi ( Scope ) thường được sử dụng trong một dự án Android, cụ thể là với kiến trúc MVVM. Đó là:
* GlobalScope
* CoroutineScope(Dispatchers. IO)
* LifecycleScope
* ViewModelScope + LiveData


##### 1. GlobalScope


Lần đầu tiên tìm hiểu về coroutines, tôi cho rằng GlobalScope cũng giống như việc chạy một hoạt động tốn thời gian trên main thread. Hầu hết các bài viết tôi đã đọc đều nói điều gì đó rằng GlobalScope tồi tệ. Và khi tôi nghĩ về các thread hoặc điều tồi tệ nhất trong thế giới Android thì tâm trí của tôi nghĩ ngay đó là việc chặn main thread !<br>
Ví dụ:

```
fun longDiskOperation(): Boolean {
    for (i in 1..1000) readHugeTextFile()
       return true
}
fun readHugeTextFile() = 
    appContext.resources.openRawResource(R.raw.file).bufferedReader().use{it.readText()}
```

Vấn đề lớn nhất với GlobalScope là coroutine có thể rất dễ bị rò rỉ. Vì vậy, khi bạn sử dụng GlobalScope, đừng nghĩ rằng việc chặn main thread là tệ, hãy nghĩ rằng rò rỉ bộ nhớ mới nguy hiểm.<br> Thử chạy coroutine này từ MainActivity:

```
GlobalScope.launch {
    // Bộ nhớ tiềm ẩn bị rò rỉ vì coroutine sẽ không bị hủy
    mockDiskService.longDiskOperation()
    // Crashes bởi vì toast được gọi trên luồng không phải chính!
    showToast("End of file read")
}
```

Và như bạn có thể thấy, không có cách tốt để hiển thị nội dung nào đó trên main thread sau khi hoạt động hoàn tất. Hiển thị Toast sẽ làm ứng dụng crash.



##### 2. CoroutineScope (Dispatchers. IO)


Vì tôi nghĩ GlobalScope đang chặn main thread nên tôi quyết định tạo CoroutineScope của riêng mình và buộc nó gửi đến một luồng IO. Tôi  đang giải quyết một vấn đề không tồn tại: thực tế là tôi nghĩ GlobalScope đang chặn main thread. Điều tôi không nhận ra là scope này có cùng vấn đề với GlobalScope. Vì Scope này tôi đã tạo không chứa 1 Job, nhưng một Job() mặc định được tạo và tôi vẫn không theo dõi / hủy coroutine này nếu cần. Một lần nữa, điều này có thể dẫn đến rò rỉ bộ nhớ khi tôi cố gắng chạy thao tác này trong MainActivity:

```
// Không chặn luồng chính, được gửi đi trên luồng nền
CoroutineScope(Dispatchers.IO).launch {
    // Bộ nhớ tiềm ẩn bị rò rỉ vì coroutine đăng ký sẽ không bị hủy
    mockDiskService.longDiskOperation()
    // Crashes bởi vì toast được gọi trên luồng không phải chính!
    showToast("End of file read")
}
```

Với cách làm trên, tôi đã giải quyết một vấn đề không tồn tại và tôi vẫn có khả năng bị rò rỉ bộ nhớ!


##### 3. LifecycleScope


Android Jetpack đã giới thiệu một Scope mà nó tự động bị hủy được. Và nó gửi đến luồng chính để chúng ta có thể hiển thị kết quả. Giải quyết vấn đề rò rỉ bộ nhớ ( cảnh báo: điều này chặn main thread ! )

```
// Chặn luồng chính vì lifecycleScope gửi đến luồng chính 
lifecycleScope.launch {
    // Không rò rỉ bộ nhớ, lifeecycleScope sẽ tự hủy bỏ
    mockDiskService.longDiskOperation()
    // Không crash app từ khi lên main thread
    showToast("End of file read")
}
```

OK, tôi đã giải quyết được sự cố rò rỉ bộ nhớ tiềm ẩn! Google đã giải cứu ta với lifeecycleScope của họ. Tôi thậm chí không phải gọi một hàm hủy, tất cả đều được xử lý tự động cho chúng tôi nếu hoạt động bị hủy. 

Nhưng vì chúng ta đang gọi một function bằng cách sử dụng một scope gửi đến luồng chính theo mặc định, nên luồng chính bị chặn. Trên thực tế, tất cả các Jetpack CoroutineScope đều là chặn luồng chính. Đó là lý do tại sao tất cả các chức năng của coroutines được khởi chạy trực tiếp từ một Activity hoặc Fragment nên là suspend . 

Tôi sẽ sử dụng trình xây dựng quy trình withContext và gửi quy trình đăng ký vào một chuỗi IO. Trình tạo withContext về cơ bản là sự kết hợp của async / await và do đó, suspending function này sẽ không return cho đến khi activity hoàn tất.

```
suspend fun suspendingLongDiskOperation() {
    withContext(CoroutineScope(Dispatchers.IO).coroutineContext) {
        longDiskOperation()
    }
}
```

Và bây giờ chúng ta hãy gọi suspending function từ activity:

```
lifecycleScope.launch {
    // Không rò rỉ bộ nhớ, lifeecycleScope sẽ tự hủy bỏ.
    mockDiskService.longDiskOperation()
    // Không crash app từ khi lên main thread
    showToast("End of file read")
}
```

Bây giờ chúng ta có một phương pháp để chạy task rất lâu này từ MainActivity mà không chặn luồng chính và bị hủy trong trường hợp MainActivity bị phá hủy. Không còn bộ nhớ bị rò rỉ! Và vì lifeecycleScope gửi đi trên luồng chính, tôi có thể hiển thị toast cho người dùng biết task đã hoàn tất. KL:
1. GlobalScope không chặn luồng chính, nhưng gây rò rỉ bộ nhớ tiềm ẩn và không thể hiển thị kết quả trên luồng chính
2. Các scope Jetpack như **lifecycleScope** chặn luồng chính , vì vậy chúng ta phải sử dụng các hàm suspend

Việc hủy coroutines cũng quan trọng như việc chặn luồng chính. Đây là lý do tại sao scope của chương trình Jetpack rất tuyệt vời. Chỉ cần đảm bảo rằng bạn sử dụng chúng với suspend function.



##### 4. viewModelScope + LiveData


Giờ ta đã biết cách thực hiện các thao tác chạy lâu dài mà không làm nghẽn luồng chính và không gây rò rỉ bộ nhớ. Nhưng như chúng ta biết, tốt nhất nên tách lớp View khỏi các lớp Service như MVVM. Tôi đã nhận ra rằng ta cần một cách để thêm một lớp ViewModel và vẫn chạy MockDiskService ở các ví dụ trên.
Jetpack viewModelScope là giải pháp cho tôi. Từ MainActivity, tôi chỉ thực hiện một lệnh gọi đến một hàm ViewModel:

```
// Đã chuyển Coroutine sang ViewModel
viewModel.readFile(this, this) // this is the lifecycleOwner
viewModel.readCompleteLiveData.observe(this, {
    // Nhận biết vòng đời, phương pháp hiển thị dữ liệu an toàn
    showToast("End of file read")
})
```

Tôi chỉ đang gọi một hàm ViewModel và chỉ cần quan sát khi nào hoạt động hoàn tất trong MainActivity. Tất cả xảy ra trong ViewModel:

```
private val _readComplete = MutableLiveData<Boolean>()
var readCompleteLiveData: LiveData<Boolean> = _readComplete
fun readFile(lifecycleOwner: LifecycleOwner) { 
    // Đã hủy trong onCleared
    viewModelScope.launch {
        diskService.suspendingLongDiskOperation()
    } 
    // Lifecycle observation of Service
    diskService.readComplete.observe(lifecycleOwner, Observer {
        _readComplete.postValue(it)
    })
```

Để thông báo cho ViewModel rằng hoạt động đĩa đã hoàn tất từ  Service , tôi cũng đã thêm một LiveData vào đó:

```
private val _readComplete = MutableLiveData<Boolean>()
var readComplete: LiveData<Boolean> = _readComplete
suspend fun suspendingLongDiskOperation() {
   withContext(CoroutineScope(Dispatchers.IO).coroutineContext) {
        val read = longDiskOperation()
        _readComplete.postValue(read)
    }
}
```

Tôi sử dụng Jetpack viewModelScope để khởi chạy coroutine tự động, sử dụng một Job gắn liền với vòng đời của ViewModel. Bây giờ khi hàm ViewModel onCleared() được gọi, Jetpack sẽ tự động hủy coroutine và tôi tránh được bất kỳ sự cố rò rỉ bộ nhớ nào! Với sự trợ giúp của LiveData, tôi có thể thông báo cho MainActivity rằng task đã hoàn tất để nó có thể hiển thị thông tin này cho người dùng.

Cách tiếp cận này đã giải quyết tất cả các vấn đề của tôi:

1. Không chặn luồng chính
2. Không bị rò rỉ bộ nhớ
3. Hiển thị dữ liệu theo cách nhận biết vòng đời
4. Sử dụng MVVM tách View và Service

Tạm hết, happy coding !!

Source: https://github.com/lmorda/android-coroutine-scopes
<br>Reference: 
https://elizarov.medium.com/the-reason-to-avoid-globalscope-835337445abc
https://loumorda.medium.com/android-coroutine-scopes-ebf4c88bf4d1
https://medium.com/androiddevelopers/cancellation-in-coroutines-aa6b90163629