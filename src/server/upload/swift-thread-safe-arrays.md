Array là một kiểu dữ liệu rất thường sử dụng trong ứng dụng iOS, theo như mình đọc thì các Swift collection có kiểu Array hoặc Dictionary không phải là thread-safe khi được định nghĩa là mutable (khi mình khai báo var đó). Trong bài viết này, chúng ta sẽ thảo luận về một số kỹ thuật để làm cho code array safe trong iOS nhé.

Thread safe là những đoạn code đảm bảo không có race condition xảy ra khi được truy cập bởi nhiều thread một cách đồng thời. Vậy race condition là gì?

### Case study

Giả sử chúng ta có một mảng chứa dữ liệu quan trọng. Trong thực tế, đó có thể là một số tiền trong thẻ tín dụng, trạng thái giao dịch, v.v. Chúng thực sự quan trọng nên nếu không bảo vệ chính xác các giá trị này, chúng ta sẽ gặp phải những sai sót đáng kể khi runtime. Để tạo ví dụ về race condition, mình sẽ sử dụng **DispatchQueue.concurrentPerform** để tạo 10 luồng đồng thời chạy cùng một lúc:

```
class ViewController: UIViewController {

    var array = [Int]()
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        // Do any additional setup after loading the view, typically from a nib.
        DispatchQueue.concurrentPerform(iterations: 10) { index in
            self.array.append(index)
        }
        print(array.count)
    }
    // The rest of code
}
```

Có 2 trường hợp xảy ra khi bạn chạy đoạn code này:
1.  Đa phần sẽ bị crash như này:
![](https://images.viblo.asia/1d8fb3aa-11db-4410-9d80-aba765375913.png)
Lý do là vì các bộ Swift collection có kiểu Array hoặc Dictionary không phải là thread-safe khi nhiều thread cùng truy xuất, thay đổi array cùng một lúc
2. Nếu không crash, thì sẽ print ra những số lượng count khác nhau, không cố định ở mỗi lần print:
```
7
9
10
```
Mà mong muốn của mình là print ra 10, chỗ này là bị race condition:
![](https://images.viblo.asia/2ac1bb11-38f5-41f2-8350-a6a36905d48a.png)

2 thread 1 và 2 chạy đồng thời, thread 1 đọc giá trị lên là 1 để tiến hành tăng  2, thread 1 chưa kịp set giá trị mới vào memory thì thread 2 đọc giá trị cũ là 1 và tăng lên 1. Sau đó cả hai cùng set giá trị 2 xuống memory. Kết quả chúng ta mong muốn sau 2 lần tăng 3 nhưng kết quả ghi xuống lại là 2 -> sẽ không an toàn nếu 1 thread đang thay đổi giá trị và 1 thread khác muốn đọc nó.

### Solutions

Cách để tránh các race condition là synchronize data. Synchronize data được hiểu là "lock" nó để chỉ một luồng có thể truy cập vào phần code đó tại một thời điểm. Swift sẽ sử dụng Grand Central Dispatch để implement thread safe

**Sử dụng serial queue**

Bằng cách sử dụng serial queue, chúng ta có thể ngăn chặn các race condition, bạn có thể xem chi tiết hơn ở [đây](https://uynguyen.github.io/2018/01/04/Grand-Central-Dispatch-in-Swift/), serial queue chỉ cho phép một process chạy tại một thời điểm để array an toàn khỏi các concurrent process:

```
class SafetyArray<T> {
        var array = [T]()
        let serialQueue = DispatchQueue(label: "serialQueue")

        var last: T? {
            var result: T?
            self.serialQueue.sync {
                result = self.array.last
            }
            return result
        }

        func append(_ newElement: T) {
            self.serialQueue.async() {
                self.array.append(newElement)
            }
        }
    }
```

Mặc dù chúng ta đã bản vệ array khỏi bị truy cập bởi nhiều thread, nhưng sử dụng serial queue không phải giải pháp tốt nhất. Việc đọc giá trị last không được tối ưu vì có nhiều request read phải chờ nhau (nó nằm trong 1 hàng đợi nối tiếp).  Việc read có thể xảy ra đồng thời, miễn là không write cùng một lúc.

**Sử dụng concurrent queue với flag barrier**

Ý tưởng chính của giải pháp này là sử dụng concurrent queue (với flag [barrier](https://developer.apple.com/documentation/dispatch/dispatch_barrier)) thay vì serial queue. Flag barrier đảm bảo rằng concurrent queue không thực thi bất kỳ task vụ nào trong khi đang thực thi barrier process, sau khi barrier process done, concurrent queue cho phép thực hiện các task vụ đồng thời khác:

![](https://images.viblo.asia/3e7befb2-f0d3-4768-a54f-3b435ffd31eb.png)

Code:
```
class SafeArray<T> {
        var array = [T]()
        let concurrentQueue = DispatchQueue(label: "concurrentQueue", attributes: .concurrent)

        var last: T? {
            var result: T?
            self.concurrentQueue.sync {
                result = self.array.last
            }
            return result
        }

        func append(_ newElement: T) {
            self.concurrentQueue.async(flags: .barrier) {
                self.array.append(newElement)
            }
        }
    }
```

Cảm ơn các bạn đã theo dõi bài viết.
Nguồn tham khảo:
https://uynguyen.github.io/2018/06/05/Working-In-Thread-Safe-on-iOS/
https://github.com/stevencurtis/SwiftCoding/tree/master/ThreadSafeArray