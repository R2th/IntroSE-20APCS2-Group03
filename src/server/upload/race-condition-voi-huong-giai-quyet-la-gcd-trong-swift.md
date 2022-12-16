## Race condition
Đây là một thuật ngữ khá quen thuộc trong lập trình iOS. Race condition xãy ra khi một hoặc nhiều thread truy cập tới cùng 1 shared data và cố gắng thay đổi nó cùng một lúc.

Đây là một ví dụ đơn giản về race condition:


```
class ViewController: UIViewController {
    let myConcurrentQueue = DispatchQueue(label: "MyConcurrentQueue", attributes: .concurrent)
    var earths: [String] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        myConcurrentQueue.async {
            for i in 0...1000 {
                self.earths.append("🌎: \(i)")
            }
        }
        
        myConcurrentQueue.async {
            for i in 0...1000 {
                self.earths[i] = "⚽: \(i)"
            }
        }
    }
    
    @IBAction func printArray(_ sender: Any) {
        earths.forEach { (item) in
            print(item)
        }
    }
    
}
```

Nếu như bạn build những dòng code này, bạn sẽ nhận ngay con ERROR :v.
![](https://images.viblo.asia/7cafef80-438c-42c5-aa08-b9f74d03de14.png)

Nhìn vào ảnh trên chắc các bạn cũng đã thấy: 
1. Việc append 🌎 đã được assigned cho Thread số 2 
2. Việc modify ⚽ đã được assigned cho Thead số 5
3. Bạn có thể thấy rắng việc modify ⚽ sẽ xãy ra`Error: Index out of range `. (Trong bài viết gốc, tác giả còn thêm 1 dòng usleep(3) trước khi append các phần tử 🌎 vào mảng để chắc chắn xãy ra lỗi.)

![](https://images.viblo.asia/319137ea-b43d-4075-82e2-5c06f695520a.png)
Cã 2 thread cùng dùng chung 1 data chính là mãng earths nên gây ra hiện tượng Race Condition.

Chúng ta hãy cùng đi tìm hiểu các cách để giải quyết vấn đề này nào :D 
## Solutions with GCD:
### 1. Serial Queue:
Khi mà bạn lười vãi lol ra chẳng muốn nghĩ mệ gì nhiều thì cứ việc dùng **serial queue**. Tất cã các task trong serial queue đều được thực thi one-by-one từng bước
![](https://images.viblo.asia/efa4ef20-e47f-4c28-b1ff-e12ddb42179a.png)

```
let serialQueue = DispatchQueue(label: "serial")

serialQueue.async {
    for i in 0...1000 {
        usleep(3)
         self.earths.append("🌎: \(i)")
    }
}

serialQueue.async {
    for i in 0...1000 {
         self.earths[i] = "⚽: \(i)"
    }
}
```
Việc sử dụng 2 cách ở dưới cho Serial queue là khá dư thừa nhé vì nó đã sẵn xử lý serial sẵn rồi.

Serial queue có thể giúp bạn ngăn chặn **Race condition** một cách thiểu năng nhất (:v nó chạy 1 luồng mẹ rồi, cứ task nào xong chạy tiếp task kia thôi thì ngại gì vết bẩn :D) nhưng đổi lại là performance của nó đương nhiên sẽ không tốt bằng việc chạy nhiều luồng (concurrent queue) nếu bạn biết cách sử dụng concurrent queue 1 cách hợp lý :D.
### 2. Synschronous
Việc xử lý đồng bộ (sync) giúp chúng ta chắc chắn rằng task được chỉ định phải thực hiện xong, đồng thời nghĩa là task kế tiếp phải đợi cho tới khi task hiện tại đã hoàn thành xong hết mới được chạy.
![](https://images.viblo.asia/2e158406-8ab8-4f1c-b40b-206c57540124.png)

Việc đơn giản cần làm là bạn thay async của myConcurrentQueue khi thực thi append array thành sync.

Đây là kết quả khi mình nhấn nút Prin tArray
![](https://images.viblo.asia/ca8de61a-ce42-4514-bcb6-68ce8765965b.png)

### 3. Barrier
Khi bạn thực thi Barrier, nó sẽ hoạt động như 1 serial queue. Chỉ có những task xác định được thực thi. Sau khi barrier kết thúc, queue sẽ quay trở lại thành 1 concurrent queue như bình thường.
![](https://images.viblo.asia/cac31e69-38d8-4624-affe-f3c50effe957.png)
```
let concurrentQueue = DispatchQueue(label: "concurrent", attributes: .concurrent)
        
concurrentQueue.async(flags: .barrier) {
    for i in 0...1000 {
        usleep(3)
        self.earthArray.append("🌎: \(i)")
    }
}

concurrentQueue.async {
    self.printEarthArray()
    // Chỗ này chính là print🌎Array()
}

concurrentQueue.async {
    for i in 0...1000 {
        print(self.earthArray[i] + self.earthArray[i])
        // Chỗ này chính là print🌎🌎()
    }
}

concurrentQueue.async(flags: .barrier) {
    for i in 0...1000 {
        self.earthArray[i] = "⚽: \(i)"
    }
}

concurrentQueue.async {
    self.printEarthArray()
}
```
Và bạn có thể xem kết quả của 2 dòng print🌎 được chạy async. Như hình dưới đây:
![](https://images.viblo.asia/15bda270-433e-478b-a24e-bb97874f5b0e.png)



-----

Đây là bài dịch mình thấy khá dễ hiểu để biết race condition là gì và cách khắc phục. Trong bài mình có dùng một vài từ ngữ khác với ý của tác giả để cho sinh động hơn. Mong các bạn và tác giả thông cảm ^^.

Link: [Race Condition with GCD Solution](https://medium.com/@ji3g4kami/race-condition-with-gcd-e282d62a19c2)