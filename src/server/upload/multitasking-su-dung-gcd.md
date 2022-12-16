Multitasking là một khái niệm vô cùng quen thuộc đối với việc lập trình, mọi người ắt hẳn đều biết rằng nó cho phép ta có thể chạy nhiều tác vụ song song. Và nếu bạn đang làm việc với iOS, thì GDC (Grand Central Dispatch) là một trợ thủ đắc lực giúp cho việc quản lý multitasking trở nên thuận lợi hơn bao giờ hết. Chỉ cần đưa task vào dispatch queues và voala, nó sẽ giúp ta thực thi các task này ở những thread song song. Giờ đây, những task ngốn nhiều thời gian như download hay search sẽ không còn ảnh hưởng đến UI của người dùng vì chúng được chạy ngầm ở dưới background.

### GCD
iOS cung cấp global dispatch queue để thực thi các task ở background thread, và main dispatch queue để thực thi task ở main/UI thread. Ngoài ra ta cũng có thể tự tạo queue riêng cho mình bằng cách sau:

`let queue = DispatchQueue(label: “com.gcd.myQueue”)`

Việc cần làm là cung cấp cho nó một unique label. Đó có thể là một string bất kỳ, tuy nhiên ta nên sử dụng domain để đặt tên theo convention. Để thực thi task, ta gọi phương thức .async hoặc .sync. Task này là một block code.

```
queue.async {
  for _ in 1 … 3 {
    print(“Hurra”)
  }
}
```

Output:
```
Hurra
Hurra
Hurra
```

### Synchronous & Asynchronous Execution
Việc gọi phương thức .async và .sync trên dispatch queue sẽ thông báo cho hệ thống cách thức thực thi tác vụ. Hãy cùng xem qua ví dụ sau:

```
func executeSync() {
    let queue = DispatchQueue(label: "com.gcd.myQueue")
    print("Start Race:")
    
    // Run on queue in sync mode
    queue.sync {
        for i in 0 ..< 5 {
          print("🐢 @ \(i+1) Km.")
        }
    }
    
    // Run on UI thread
    for i in 0 ..< 5 {
        print("🐇 @ \(i+1) Km.")
     }
}
```

Output: Vòng lặp for được viết sau block .sync sẽ đợi sau khi vòng lặp for bên trong block .sync được hoàn thành. Vì vậy con thỏ sẽ không thể tham gia cuộc đua cho đến khi con rùa hoàn thành nó (thật không công bằng nhỉ).

```
Start Race:
🐢 @ 1 Km.
🐢 @ 2 Km.
🐢 @ 3 Km.
🐢 @ 4 Km.
🐢 @ 5 Km.
🐇 @ 1 Km.
🐇 @ 2 Km.
🐇 @ 3 Km.
🐇 @ 4 Km.
🐇 @ 5 Km.
```

Phương thức .sync trong queue xử lý tác vụ để thực thi và không trả về cho đến khi block được hoàn thành. Vì vậy đoạn code viết sau block sẽ không được thực thi cho đến khi block trước đó hoàn thành.

Mặt khác, phương thức .async trả về từ block ngay lập tức sau khi xử lý. Đoạn code viết sau dispatch block được thực thi, và nó không phải đợi cho đến khi block trước đó được hoàn thành.

```
func executeAsync() {
  
  let queue = DispatchQueue(label: "com.gcd.myQueue")     
  print("Start Race:")
  
  // Run on queue in async mode
  queue.async {
    for i in 0 ..< 5 {
      print("🐢 @ \(i+1) Km.")
    }
  }

   // Run on UI thread 
  for i in 0 ..< 5 {
     print("🐇 @ \(i+1) Km.")
  }
}
```

Output: Ở chế độ async, phương thức .async trong queue được gọi và compiler sẽ chuyển tiếp đến dòng code tiếp theo để thực thi mà không phải chờ đợi cho async block hoàn thành. Trong ví dụ này, con thỏ đã có thể bắt đầu cuộc đua ngay lập tức mà không phải đợi con rùa hoàn thành (lần này thì công bằng rồi nhé).

```
Start Race:
🐇 @ 1 Km.
🐢 @ 1 Km.
🐇 @ 2 Km.
🐢 @ 2 Km.
🐇 @ 3 Km.
🐇 @ 4 Km.
🐢 @ 3 Km.
🐇 @ 5 Km.
🐢 @ 4 Km.
🐢 @ 5 Km.
```

### Serial & Concurrent Execution
Ta có thể thực thi task được đưa vào queue một cách serially hay concurrently. Mặc định các task đưa vào queue sẽ được thực thi serially. Ở serial mode, task trong queue sẽ không được thực thi cho đến khi dispatch task trước nó trong queue được hoàn thành.

```
func serialExecution() {
  let queue = DispatchQueue(label: "com.gcd.myQueue") 
  print("Start Race:")

  // Task1
  queue.async {
   for i in 0 ..< 5 {
    print("🐢 @ \(i+1) Km.")
   }
  }
  
  // Task2
 queue.async {
   for i in 0 ..< 5 {
    print("🐇 @ \(i+1) Km.")
   }
 }
}
```

Output: Có hai task được đưa vào queue, task1 có một vòng lặp for với con rùa và task2 có vòng lặp for với con thỏ. Queue sẽ xử lý task 1 trước và vì nó là serial queue, task2 sẽ phải đợi cho đến khi task1 hoàn thành. Một khi task1 được xử lý xong, task2 sẽ được thực thi.

```
Start Race:
🐢 @ 1 Km.
🐢 @ 2 Km.
🐢 @ 3 Km.
🐢 @ 4 Km.
🐢 @ 5 Km.
🐇 @ 1 Km.
🐇 @ 2 Km.
🐇 @ 3 Km.
🐇 @ 4 Km.
🐇 @ 5 Km.
```

Ta có thể tạo ra concurrent queue để xử lý task. Việc cần làm là set thuộc tính .attributes của queue thành concurrent. Ở mode concurrent, task trong queue được xử lý lần lượt, và được bắt đầu ngay lập tức, các task này hoàn thành công việc ở thứ tự bất kỳ. Tuy nhiên thứ tự được thực thi sẽ không theo trật tự nào.

```
func concurrentExecution() {
let queue = DispatchQueue(label: "com.gcd.myQueue", qos: .userInitiated, attributes: .concurrent)
  
  print("Start Race:")

  // Task1
  queue.async {
    for i in 0 ..< 5 {
     print("🐢 @ \(i+1) Km.")
    }
  }

  // Task2 
 queue.async {
   for i in 0 ..< 5 {
    print("🐇 @ \(i+1) Km.")
   }
  }
}
```

Output: Queue ở trạng thái concurrent xử lý task ngay lập tức. Không như trạng thái serial, task2 sẽ không phải đợi task1 hoàn thành.

```
Start Race:
🐇 @ 1 Km.
🐢 @ 1 Km.
🐇 @ 2 Km.
🐢 @ 2 Km.
🐇 @ 3 Km.
🐢 @ 3 Km.
🐇 @ 4 Km.
🐢 @ 4 Km.
🐇 @ 5 Km.
🐢 @ 5 Km.
```

### Chất lượng của service
Luôn có một số task quan trọng hơn những task còn lại, vì vậy ta cần đảm bảo phải thực thi chúng trước. Ta có thể làm việc này bằng cách gán cho nó thứ tự ưu tiên. Task chạy trên main/UI thread luôn ở mức ưu tiên cao vì chúng giữ cho app khả năng tương tác, trong khi các task chạy ở background thread sẽ có ưu tiên thấp hơn. Tất cả các task sẽ hoàn thành tác vụ của chúng nhưng thứ tự ưu tiên sẽ quyết định task nào được hoàn thành trước.

Dưới đây liệt kê danh sách các thứ tự ưu tiên, giảm dần từ trên xuống dưới:
```
.userInteractive
.userInitiated
.default
.utility
.background
.unspecified
```

Nếu không được chỉ định, độ ưu tiên mặc định sẽ được sử dụng:

```
func checkQos() {
  let queue1 = DispatchQueue(label: "com.gcd.myQueue1", qos: .userInitiated)
  let queue2 = DispatchQueue(label: "com.gcd.myQueue2", qos: .background)
  print("Start Race:")
  
  queue1.async {
   for i in 0 ..< 5 {
    print("🐢 @ \(i+1) Km.")
   }
  }
  
  queue2.async {
   for i in 0 ..< 5 {
    print("🐇 @ \(i+1) Km.")
   }
  }
}
```

Output: Độ ưu tiên của queue1 và queue2 là .userInitiated và .background. User-initiated tasks luôn có độ ưu tiên cao hơn background task. Vì vậy, task trong queue1 sẽ được thực thi sớm hơn task trong queue2.

```
🐢 @ 1 Km.
🐇 @ 1 Km.
🐢 @ 2 Km.
🐢 @ 3 Km.
🐇 @ 2 Km.
🐢 @ 4 Km.
🐇 @ 3 Km.
🐢 @ 5 Km.
🐇 @ 4 Km.
🐇 @ 5 Km.
```

### Main and Global Queue
Ta không cần tạo ra queue riêng cho task để thực thi. iOS đã cung cấp sẵn cho chúng ta một số queue mặc định giúp chúng có thể làm được việc này. Ta có thể sử dụng global queue nếu ta muốn thực thi task ở background như download file, load data hoặc search.

Main queue cho phép chúng ta để thực thi task ở main/UI thread. Những task liên quan đến việc cập nhật UI có thể được chạy trên main queue.

```
func globalQueue() {
  let globalQueue = DispatchQueue.global()
  
  globalQueue.async {
   for i in 0 ..< 5 {
    print("\(i)")
   }
  }
}
```

Ta có thể truy cập vào global queue bằng cách gán giá trị cho độ ưu tiên bởi QoS.
```
let globalQueue = DispatchQueue.global(qos: .userInitiated)
```

Những tác vụ liên quan đến UI cần được thực hiện trên main queue chứ không nên gọi ở background queue, và complier sẽ bắn ra warning nếu nó được gọi ở background. Main queue được gọi bằng  DispatchQueue.main. Hãy cùng xem qua một ví dụ sau:
```
func mainQueue() {
  DispatchQueue.main.async {
   self.view.backgroundColor = UIColor.red
  }
}
```

### Delayed Execution
Để delay việc thực thi một đoạn code, GCD cung cấp một phương thức đặc biệt, đó là .asyncAfter. Ta cần thiết lập một khoảng thời gian để delay.

```
func delayedExecution() {
  let queue = DispatchQueue(label: "com.gcd.myQueue")
  let delayedInteraval = DispatchTimeInterval.seconds(5)
  print(Date())

  // Execute after the delay of 5 seconds
  queue.asyncAfter(deadline: .now() + delayedInteraval) {  
   print(Date())
  }
}
```

Output:
```
2019-03-18 19:39:02 +0000
2019-03-18 19:39:07 +0000
```

Ta có thể chỉ định việc delay bằng giây, mili giây, micro giây hoặc nano giây bằng phương thức seconds(Int), .milliseconds(Int), .microseconds(Int), .nanoseconds(Int) respectively.

### DispatchWorkItem
DispatchWorkItem là một block code, mà trong đó ta có thể thực thi bất cứ queue nào. Thay vì viết một block code, ta cần tạo một work item để thực thi.

```
let dispatchWorkItem = DispatchWorkItem {
  print("WorkItem Executed")
}
```

Gọi .perform() để thực thi dispatchWorkItem. Phương thức này sẽ thực thi work item trên thread hiện tại.

```
dispatchWorkItem.perform()
```

Hoặc ta có thể thêm nó vào queue để thực thi:

```
DispatchQueue.global().async(execute: dispatchWorkItem)
```

Output:
```
WorkItem Executed
```

### ConcurrentPerform

DispatchQueue cung cấp cho ta một phương thức thuận tiện để thực thi một task trong nhiều lần.
```
func concurrentPerform() {
  DispatchQueue.concurrentPerform(iterations: 5) { (i) in  
   print("Iteration: \(i)")
  }
}
```

Output:
```
Iteration: 1
Iteration: 3
Iteration: 0
Iteration: 4
Iteration: 2
```

Sử dụng GCD để làm việc với multitasking là cách đơn giản nhất trong iOS. Ta có thể đưa những tác vụ hao tốn nhiều thời gian và tài nguyên vào background thread và giảm gánh nặng trên main thread.