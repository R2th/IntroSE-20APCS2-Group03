Loạt bài đăng trên blog này đi sâu vào vấn đề Cancellation và Exceptions trong Coroutines. Cancellation là rất quan trọng để tránh làm nhiều việc hơn mức cần thiết có thể gây lãng phí bộ nhớ và tuổi thọ pin; xử lý Exception thích hợp là chìa khóa cho trải nghiệm người dùng tuyệt vời. Là nền tảng cho 2 phần khác của loạt bài (phần 2: Cancellation, phần 3: Exceptions), điều quan trọng là phải xác định một số khái niệm về Couroutine chính như CoroutineScope, Job và CoroutineContext để tất cả chúng ta đều ở trên cùng một trang.

## CoroutineScope
Một CoroutineScope theo dõi bất kỳ couroutine nào bạn tạo bằng cách sử dụng launch hoặc async (đây là các chức năng mở rộng trên CoroutineScope). Công việc đang diễn ra (đang chạy coroutines) có thể bị hủy bỏ bằng cách gọi scope.cancel () vào bất kỳ lúc nào.

Bạn nên tạo CoroutineScope bất cứ khi nào bạn muốn bắt đầu và kiểm soát vòng đời của các coroutines trong một lớp cụ thể của ứng dụng của bạn. Trong một số nền tảng như Android, có các thư viện KTX đã cung cấp CoroutineScope trong các lớp vòng đời nhất định như viewModelScope và lifecycleScope.

Khi tạo một CoroutineScope, nó sẽ lấy một CoroutineContext làm tham số cho phương thức khởi tạo của nó. Bạn có thể tạo scope & coroutine đăng ký mới bằng mã sau:

```
// Job and Dispatcher được kết hợp thành một CoroutineContext mà sẽ được thảo luận ngay sau đây
val scope = CoroutineScope(Job() + Dispatchers.Main)
val job = scope.launch {
    // new coroutine
}
```

## Job
Một Job là một xử lý đối với một coroutine. Đối với mọi coroutine mà bạn tạo (bằng cách launch hoặc asunc), nó trả về một Job instance xác định duy nhất quy trình đăng ký và quản lý vòng đời của nó. Như chúng ta đã thấy ở trên, bạn cũng có thể chuyển một Job cho CoroutineScope để xử lý vòng đời của nó.

## CoroutineContext

CoroutineContext là một tập hợp các phần tử xác định hành vi của một coroutine. Nó được làm bằng:

* Job - kiểm soát vòng đời của quy trình đăng ký.
* CoroutineDispatcher - các dispactcher hoạt động tới thread hợp.
* CoroutineName - tên của coroutine, hữu ích cho việc gỡ lỗi.
* CoroutineExceptionHandler - xử lý các trường hợp ngoại lệ chưa được giải quyết, sẽ được đề cập trong Phần 3 của loạt bài này.

CoroutineContext của một coroutine mới là gì? Chúng ta đã biết rằng một phiên bản Job mới sẽ được tạo ra, cho phép chúng ta kiểm soát vòng đời của nó. Phần còn lại của các phần tử sẽ được kế thừa từ CoroutineContext của phần tử gốc của nó (hoặc một coroutine khác hoặc CoroutineScope nơi nó được tạo).

Vì một CoroutineScope có thể tạo các coroutines và bạn có thể tạo thêm các coroutines bên trong một coroutine, một hệ thống phân cấp nhiệm vụ ngầm định được tạo. Trong đoạn mã sau, ngoài việc tạo một coroutine mới bằng CoroutineScope, hãy xem cách bạn có thể tạo thêm các coroutine bên trong một coroutine:

```
val scope = CoroutineScope(Job() + Dispatchers.Main)
val job = scope.launch {
    // Một coroutine mới có CoroutineScope là cha
    val result = async {
        // một couroutine mới có coroutine bắt đầu bằng cách khởi chạy với tư cách là cha
        // 
    }.await()
}
```

Root của hệ thống phân cấp đó thường là CoroutineScope. Chúng ta có thể hình dung hệ thống phân cấp đó như sau:

![](https://images.viblo.asia/f88c9d84-997b-444b-9f46-d229ecd5df38.png)

## Vòng đời của Job

Một Job có thể trải qua một loạt các trạng thái: New (mới), Active (Đang hoạt động), Completing (Đang hoàn thành), Completed (Đã hoàn thành), Cancelling (Đang hủy) và Cancelled (Đã hủy). Mặc dù chúng tôi không có quyền truy cập vào chính các trạng thái, nhưng chúng tôi có thể truy cập các thuộc tính của Job: isActive, isCancelling và isCompleted.
![](https://images.viblo.asia/349ad88c-417a-4a44-ad21-a09ee7177586.png)

## Parent CoroutineContext đã giải thích

Trong hệ thống phân cấp nhiệm vụ, mỗi coroutine có một cha có thể là một CoroutineScope hoặc một coroutine khác. Tuy nhiên, CoroutineContext cha kết quả của coroutine có thể khác với CoroutineContext của cha vì nó được tính toán dựa trên công thức này:

> Parent context = Default + CoroutineContext kế thừa + argruments

Ở đâu:
* Một số phần tử có giá trị mặc định: Dispatchers.Default là mặc định của CoroutineDispatcher và "coroutine" là giá trị mặc định của CoroutineName.
* CoroutineContext kế thừa là CoroutineContext của CoroutineScope hoặc coroutine đã tạo ra nó.
* Các argruments được passed trong coroutine builder sẽ được ưu tiên hơn các phần tử đó trong ngữ cảnh kế thừa.

**Lưu ý**: CoroutineContexts có thể được kết hợp bằng cách sử dụng toán tử +. Vì CoroutineContext là một tập hợp các phần tử, một CoroutineContext mới sẽ được tạo với các phần tử ở bên phải của dấu cộng ghi đè các phần tử ở bên trái.
Ví dụ. (Dispatchers.Main, “name”) + (Dispatchers.IO) = (Dispatchers.IO, “name”)

![](https://images.viblo.asia/f2a5989d-c461-4551-a97d-28aee317057e.png)
Mỗi coroutine được bắt đầu bởi CoroutineScope này sẽ có ít nhất các phần tử đó trong CoroutineContext. CoroutineName có màu xám vì nó xuất phát từ các giá trị mặc định.

Bây giờ chúng ta đã biết CoroutineContext cha của một coroutine mới là gì, CoroutineContext thực tế của nó sẽ là:
> New coroutine context = parent CoroutineContext + Job()
Nếu với CoroutineScope được hiển thị trong hình trên, chúng tôi tạo một quy trình đăng quang mới như sau:

```
val job = scope.launch(Dispatchers.IO) {
    // new coroutine
}
```

CoroutineContext cha của coroutineđó và CoroutineContext thực tế của nó là gì? Xem giải pháp trong hình ảnh dưới đây!

![](https://images.viblo.asia/7c680dba-faf2-4fcd-b60d-fccf44aaa41f.png)
Job trong CoroutineContext và trong parent context sẽ không bao giờ giống với một thể hiện giống như một couroutine mới luôn nhận được một thể hiện mới của một Job

Kết quả CoroutineContext cha có Dispatchers.IO thay vì CoroutineDispatcher của scope vì nó đã bị đối số của coroutine ghi đè. Ngoài ra, hãy kiểm tra xem Job trong CoroutineContext cha có phải là bản sao của Job của scope (màu đỏ) hay không và một bản sao mới của Job (màu xanh lục) đã được gán cho CoroutineContext thực tế của coroutine mới.

Như chúng ta sẽ thấy trong Phần 3 của loạt bài này, CoroutineScope có thể có một implementation khác của Job được gọi là SupervisorJob trong CoroutineContext của nó để thay đổi cách CoroutineScope xử lý các trường hợp ngoại lệ. Do đó, một coroutine mới được tạo với scope đó có thể có SupervisorJob làm Job chính. Tuy nhiên, khi parent của một coroutine là một coroutine khác, thì Job cha sẽ luôn thuộc loại Job.