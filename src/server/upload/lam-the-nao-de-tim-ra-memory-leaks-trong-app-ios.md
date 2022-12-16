Bộ nhớ bị rò rỉ trong app iOS khi hệ thống không thể xác định liệu một đối tượng được phân bổ trong bộ nhớ có được sử dụng hay không. Nguyên nhân thường gặp nhất của rò rỉ bộ nhớ trong app iOS là do retain cycles. Ở bài viết này mình tập trung vào việc sử dụng các công cụ Xcode để tìm và xác định nguyên nhân rò rỉ bộ nhớ trong ứng dụng iOS .

Để bắt đầu, bạn sẽ cần bật một vài cài đặt trong Xcode. Trước khi bật các cài đặt này, một lưu ý quan trọng là bạn sẽ muốn đảm bảo rằng bạn đã tắt các cài đặt sau khi bạn hoàn tất việc tìm kiếm rò rỉ bộ nhớ. Việc cài đặt này sẽ có tác động hiệu quả tiêu cực nếu nó luôn được bật.

Đầu tiên, chỉnh sửa scheme cho app của bạn trong Xcode 

![](https://images.viblo.asia/933bf09a-a4a7-4cde-aa04-45b19d1c52c5.png)

Click vào scheme Run và sau đó chọn phần Diagnostics. Có hai cài đặt trong phần này cần được kích hoạt. Đầu tiên là Malloc Scribble trong nhóm Memory Management .

![](https://images.viblo.asia/52897fc9-d418-4429-ac16-6057894e15f3.png)

Kích hoạt MallocScripble sẽ lấp đầy bộ nhớ đã giải phóng với giá trị được xác định trước làm cho nó rõ ràng hơn khi bộ nhớ bị rò rỉ. Điều này làm tăng độ chính xác của Xcode trong việc xác định rò rỉ.

Cài đặt thứ hai là bật là Malloc Stack trong nhóm Logging .

![](https://images.viblo.asia/410b6f58-11f9-45c2-9af1-20636e0b5314.png)

Kích hoạt MallocStackLogging sẽ cho phép Xcode xây dựng một nền tảng phân bổ để giúp bạn hiểu các đối tượng đang được tham chiếu từ đâu.

Đó là tất cả những gì cần thiết cho việc cấu hình Xcode. Chúng ta hãy xem một ứng dụng ví dụ là task manager. Nếu bạn thấy thú vị khi theo dõi tương tác, mã nguồn có sẵn miễn phí trên [Github](https://github.com/timothymiko/ios-memory-leaks). Bây giờ chúng ta hãy săn tìm rò rỉ bộ nhớ. Ứng dụng ví dụ bao gồm ba đối tượng chính.

Đầu tiên là TaskListViewControll chịu trách nhiệm xem các task:

```
class TaskListViewController: UIViewController {
    
    @IBAction func showCreateTaskViewController() {
        let createTaskViewController = CreateTaskViewController()
        present(createTaskViewController, animated: true, completion: nil)
    }
}
```

Thứ hai là CreateTaskWorker chịu trách nhiệm tạo một task mới (nghĩa là lưu nó vào cơ sở dữ liệu) :

```
protocol CreateTaskWorkerDelegate {
    func didCreateTask()
}

class CreateTaskWorker {
    
    var delegate: CreateTaskWorkerDelegate?
    
    func createTask(named name: String) {
        delegate?.didCreateTask()
    }
}
```

Cái cuối cùng là CreateTaskViewControll chịu trách nhiệm chấp nhận đầu vào của người dùng cho một task mới và truyền đạt nó tới worker :

```
class CreateTaskViewController: UIViewController, CreateTaskWorkerDelegate {
    
    private let createTaskWorker = CreateTaskWorker()

    init() {
        super.init(nibName: "CreateTaskViewController", bundle: nil)
        createTaskWorker.delegate = self
    }
    
    @IBAction func createTask() {
        createTaskWorker.createTask(named: "Pay bills")
    }
    
    @IBAction func dismiss() {
        dismiss(animated: true, completion: nil)
    }
    
    func didCreateTask() {
        print("Task created")
    }
}
```

TaskListViewControll sẽ present CreatTaskViewControll. Nhấn qua flow một vài lần :
* Nhấn vào button New Task  (CreateTaskViewController được presented)
* Nhấn vào button Dismiss (CreatTaskViewControll bị dismissed) 

Bây giờ, nhấp vào button Debug Memory Graph trong Variables View của Xcode ở phía dưới bên trái.

![](https://images.viblo.asia/19f773c2-e5ba-4979-a2ea-2b9dbdf8e61f.jpg)

Điều này sẽ load biểu đồ bộ nhớ của ứng dụng. Bây giờ, chọn tab Debug trong ngăn Navigator của Xcode ở bên trái. Điều này sẽ đưa ra một danh sách tất cả các objects trong bộ nhớ.

![](https://images.viblo.asia/7b34a14f-2548-4953-9147-b40ffb32c4b6.jpg)

Tại thời điểm này, do chúng ta đã loại bỏ tất cả các instances của CreatTaskViewControll, chúng ta chỉ nên thấy một instance duy nhất của TaskListViewControll ở đây.

Lưu ý rằng có các instances của CreatTaskViewCont kiểm soát với biểu tượng dấu chấm than màu tím bên cạnh nó. Đây là Xcode chỉ ra rằng một đối tượng đã bị rò rỉ.

Nếu bạn bấm vào một trong các trường hợp trong debug navigator, nó sẽ hiển thị cho bạn một biểu đồ mối quan hệ. Chế độ xem này cực kỳ hữu ích để hiểu các references nào vẫn đang được giữ cũng như theo dõi nơi các references được tạo.
![](https://images.viblo.asia/a923f1a7-58d2-4ade-a5c8-54c1fa0a5c5e.jpg)

Bây giờ chúng ta đã tìm thấy bộ nhớ bị rò rỉ, chúng ta có thể sửa chữa nó. Đối với ví dụ cụ thể này, tất cả những gì cần làm là cho delegate trong CreatTaskWorker là weak:

```
protocol CreateTaskWorkerDelegate: class {
    func didCreateTask()
}

class CreateTaskWorker {
    
    weak var delegate: CreateTaskWorkerDelegate?
    
    func createTask(named name: String) {
        delegate?.didCreateTask()
    }
}
```

Nếu bạn thực hiện những thay đổi này và chạy lại ứng dụng Tasks, bạn sẽ nhận thấy rằng rò rỉ bộ nhớ không còn xảy ra nữa.

Chúc mừng! Bây giờ bạn đã sẵn sàng tìm rò rỉ bộ nhớ trong các ứng dụng iOS khác. Các công cụ gỡ lỗi này cực kỳ mạnh mẽ và có thể cung cấp cái nhìn sâu sắc về hoạt động bên trong của ứng dụng của bạn.

Xcode không phải lúc nào cũng chính xác 100% với việc xác định rò rỉ bộ nhớ như trong ảnh chụp màn hình ở trên, nơi chỉ có 3 trong số 4 trường hợp bị rò rỉ, mỗi CreatTaskWorker và CreatTaskViewCont kiểm soát được đánh dấu bởi Xcode là bị rò rỉ.

Hơn nữa, một số retain cycles, một trong những nguyên nhân phổ biến nhất gây rò rỉ bộ nhớ trong ứng dụng iOS, không tồn tại mãi mãi, nhưng vẫn tồn tại đủ lâu để gây ra sự cố. Phương pháp được nêu trong bài viết này sẽ hoạt động để xác định các trường hợp này, nhưng chỉ khi bạn kích hoạt biểu đồ bộ nhớ trong khi retain cycle đang diễn ra. Nếu không, các đối tượng sẽ bị deallocated nếu bạn chờ đợi quá lâu. 

Cuối cùng, đừng quên tắt cài đặt MallocScripble và MallocStackLogging trong run scheme cho ứng dụng của bạn và bạn đã hoàn tất việc tìm kiếm rò rỉ bộ nhớ  .

Cảm ơn bạn đã giành chút thời gian đọc bài viết , hẹn gặp lại các bạn trong bài viết tới <3

Bài viết được tham khảo từ : https://tim.engineering/how-to-find-memory-leaks-in-ios-app/