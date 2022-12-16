# Mở đầu :
 Trong phần 1 mình có nói sơ qua về Multithreading trong lập trình, tầm quan trọng và cách sử dụng chúng như nào cho đúng. Tiếp theo đây mình nói về việc implement trong lập trình IOS bằng ngôn ngữ swift.

Như mình đã nói ở phần 1, Multithreading giúp chúng ta có thể xử lý nhiều công việc một lúc và đối với việc phát triển ứng dụng cho mobile thì multithreading là thứ mà 1 developer bắt buộc phải sử dụng thường xuyên.
Chúng ta đều biết IOS cung cấp cho chúng ta một thread khi khởi chạy ứng dụng đó là main-thread. Nhiệm vụ của main-thread cũng giống như các thread khác đó là xử lý các task developer viết ra, tuy nhiên có một điểm khác biệt đó là chỉ có main-thread có quyền cập nhật UI.

Giả sử khi main-thread đang tải dữ liệu từ server và tính toán thì chúng ta lại muốn tap vào các button hay viết một thứ gì đó và textView, rõ ràng main-thread chỉ xử lý được 1 việc và việc này dẫn tới ứng dụng như bị "đơ" và chúng ta không cảm nhận được một phản hồi nào.
Thực tế rằng ngày nay nhiều bạn sử dụng các thư viện networking để xử lý load dữ liệu ( thứ mà đã giúp bạn lấy dữ liệu bằng  một thread khác) không hề hay biết rằng nó đang hoạt động theo cơ chế multithread. :disappointed:

Sau đây mình sẽ nói về 2 cách mà apple cung cấp cho chúng ta để xử lý multithread.

Có 2 công cụ đó là GCD (Grand Central Dispatch) và NSOperationQueue. Cả 2 công cụ này giúp chúng ta có thể xử lý multithread, tất nhiên để tồn tại song song thì chúng có những đặc điểm riêng mà chúng ta sẽ phân tích sau đây.

# GCD (Grand Central Dispatch)

GCD là một API ở mức thấp để quản lý hàng đợi theo cơ chế FIFO(first in - first-out) hiểu đơn giản thì task nào được nhận trước thì sẽ được làm trước.

### Các loại queue.

Chúng ta có 2 loại queue là serial queue và concurrent queue :

- **serial queue** : là queue mà các công việc được thực hiện một cách tuần tự, ví dụ chúng ta  có queue Q, đầu tiên chúng ta thêm task A, sau đó chúng ta thêm task B. Khi đó việc A sẽ đươc xử lý trước và khi task A kết thúc thì task B mới được bắt đầu.
- **concurrent queue** : trái ngược với serial queue, chúng ta có thể thêm task theo thứ tự A, B, C tuy nhiên nó sẽ không thực hiện theo một thứ tự nào hết, cả 3 task đều có thể đươc thực hiện đồng thời hoặc theo một thứ tự ngẫu nhiên nào đó.

Chạy thử đoạn code sau :

```
(1)
let concurrentQueue = DispatchQueue(label: "concurrentQueue", qos: .default, attributes: .concurrent)
concurrentQueue.async {
    for _ in 1...3 {
        print("concurrentQueue 1")
    }
}

concurrentQueue.async {
    for _ in 1...3 {
        print("concurrentQueue 2")
    }
}

(2)
let serialQueue = DispatchQueue(label: "serialQueue", qos: .default, attributes: .concurrent)
serialQueue.async {
    for _ in 1...3 {
        print("serialQueue 1")
    }
}

serialQueue.async {
    for _ in 1...3 {
        print("serialQueue 2")
    }
}

```

Kết quả chúng ta thu được :

> concurrentQueue 1
> 
> concurrentQueue 2
> 
> concurrentQueue 2
> 
> concurrentQueue 2
> 
> concurrentQueue 1
> 
> concurrentQueue 1
>
> serialQueue 1
> 
> serialQueue 1
> 
> serialQueue 1
> 
> serialQueue 2
> 
> serialQueue 2
> 
> serialQueue 2 
>


Rõ ràng với serialQueue mọi việc được thực hiện tuần tự còn với concurrentQueue thì không.

###  Khởi tạo queue 
Để sử dụng một queue thì chúng ta có 2 cách:
- Sử dụng queue có sẵn gồm có main queue và global queue
- Tự tạo ra một queue.

**Main queue.**

Đây là một serial queue, nó chạy trên main thread, chúng ta thường gọi đến Main queue khi muốn cập nhật giao diện khi nhận được kết quả ở một thread khác.

Ví du :

```
let queue = DispatchQueue(label: "queue", qos: .default) //1
queue.async {
    var total = 0
    for index in 1...100 {
        total = total + index
    }
    
    DispatchQueue.main.async { //2
        print("update UI \(total)")
    }
}
```

Đoạn code phía trên mình có khởi tạo một queue, trong queue thưc hiện một phép tính toán (1). 
Sau khi đoạn code tính toán thành công chúng ta sẽ gọi main thread bằng đoạn code (2). 

**Global queue.**

Đây  là một concurrent Queue, nó được khởi tạo sẵn và được chia sẻ trên toàn hệ thống. Đối với Global queue apple cung cấp cho chúng ta một tham số là QoS (Quality of Service), dựa vào thuộc tính này hệ thông sẽ biết được độ ưu tiên của 1 task mà chúng ta thêm vào queue.
Có 5 loại QoS theo thứ tự ưu tiên giảm dần : User-interactive, User-initiated, Default, Utility và Background

Ví dụ mình tạo một global queue với Qos là User-interactive

```
DispatchQueue.global(qos: .userInteractive).async {
    // do somethings here!
}
```

**Custom queue.**

Vì là queue do bạn tự định nghĩa nên bạn có thể cài đặt nó là serial hay concurrent tuỳ vào nhu cầu sử dụng của bạn 
Để tạo một queue chúng ta sẽ có một số tham số được truyền vào, ví du : 

```
let queue = DispatchQueue(label: "test", qos: .userInitiated, attributes: .concurrent)
```

Trong ví dụ trên chúng ta sẽ tự định nghĩa ra một  DispatchQueue với định danh là "test" và nó cũng có thuộc tính Qos tương tự global queue, thêm 1 thuộc tính nữa quyết định nó là serial hay concurrent

###  Syn - Ansyn

GCD cung cấp cơ chế đồng bộ và bất đồng bộ
- Cơ chế đồng bộ : hiểu đơn giản là nó sẽ khoá thread đó lại và lúc này mọi task phải chờ nó xử lý xong mới được quyền xử lý tiếp, điều này đảm bảo cho nếu task A và task B cùng sử dụng một dữ liệu thì trong quá trình task A xử lý dữ liệu thì task B không thể cập nhật dữ liệu đó

- Bất đồng bộ : nó trái ngược với đồng bộ, đó là mọi thứ có thể diễn ra một cách đồng thời, nếu task A và task B cùng dùng chung 1 dữ liệu thì rất dễ xảy ra xung đột ghi, vì thế nó thường dùng khi chúng ta chỉ đọc dữ liệu.

Chúng ta có thể thấy việc sử dụng cơ chế đồng bộ hay bất đồng bộ chỉ có ý nghĩa khi queue của chúng ta là concurrent. Bởi vì với serial queue mọi task trong queue luôn được thực hiện theo 1 thứ tự FIFO, task này xong thì task kia mới được thực hiện

Ví du : khi 2 người cùng rút tiền trong 1 tài khoản thì lệnh rút tiền của người A là taskA, người B là taskB , vì queue của chúng ta là concurrent nên sẽ không thể xác định được ai là người được thực hiện rút tiền trước. 
Giả sử A và B đều rút 90.000.000 vnd, hệ thông chúng ta sẽ hoạt động như sau nếu không dùng cơ chế đồng bộ :
- Gỉa sử trong thời tiểm t1, task A đọc được số tiền là 100.000.000 như vậy có thể rút được tiền
- Tại thời điểm t2 (t2>t1), task B cũng đọc số tiền là 100.000.000, vì taskA vẫn chưa thực hiện lệnh trừ tiền
- Tại thời điểm t3 (t3>t2) task A trừ tiền
- Tại thời điểm t4(t4>t2) task B trừ tiền

Như vậy chúng ta thấy A và B đều rút được tiền, điều đó gây nên thiệt hại cho hệ thống vì tính toán sai. Vậy trong trường hợp này ở bước rút tiền chúng ta buộc phải thêm cơ chế đồng bộ để khoá số tiền lại để 1 task hoàn thành công việc thì task kia mới được thực hiện

Tất nhiên trên đây chỉ là ví dụ vui để các bạn có thể hiểu hơn về cơ chế đồng bộ, bất đồng bộ, còn về code thì các bạn có thể xem đoạn lệnh dứoi đây 

```
let queue = DispatchQueue(label: "queue", attributes: .concurrent)
queue.async {
    for _ in 1...100 {
        print("thread 1")
    }
}

queue.async {
    for _ in 1...100 {
        print("thread 2")
    }
}

```

```
let queue = DispatchQueue(label: "queue", attributes: .concurrent)
queue.sync {
    for _ in 1...100 {
        print("thread 1")
    }
}

queue.async {
    for _ in 1...100 {
        print("thread 2")
    }
}

```

Thứ chạy và xem kết quả nhé !
# Kết.

Bài này mình giới thiệu  các khái niệm và cách dùng cơ bản của GCD, bài tiếp theo mình sẽ tiếp tục nói về một số chức năng khác mà GCD cung cấp.

Cảm ơn các bạn đã theo dõi.