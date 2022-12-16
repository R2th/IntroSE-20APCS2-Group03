# Mở đầu : 
Hi all ! Hôm nay mình tiếp tục với chủ đề multithreading, trong bài viết lần này mình sẽ viết về các chức năng còn lại mà GCD hỗ trợ chúng ta.

## 1. Delay

Đây là chức năng mà chúng ta thường sử dụng để lên lịch thực hiện công việc sau một khoảng thời gian nhất định. 

Để sử dụng rất đơn giản chúng ta nhìn vào ví dụ dưới đây.

```
let deadline = DispatchTime.now() + .seconds(5) //1

print("start do task")
let startTime = Date()

DispatchQueue.main.asyncAfter(deadline: deadline) { //2
    let delayTime = Date().timeIntervalSince(startTime) //3
    print("finish task with delay time \(Int(delayTime))")
}

```

(1) Tạo ra một DispatchTime là deadline với giá trị 5s

(2) Gọi hàm asyncAfter từ main queue và cuối cùng sau 5s hàm bên trong block sẽ được gọi. (3)

 Kết quả thu được :

>start do task
>
>finish task with delay time 5
> 

## 2. DispatchWorkItem

Nhìn vào cái tên chúng ta cũng có thể đoán được chức năng của function này. Nó là một task được khởi tạo trong một block code, và sẽ được thực hiện bởi một DispatchQueue nào đó.

Chúng ta sẽ xem ví dụ dưới đây để hiểu rõ hơn.

```
var workItem: DispatchWorkItem!
workItem = DispatchWorkItem {
    // do somethings here
}
```

Để khai báo một DispatchWorkItem chúng ta chỉ cần khởi tạo như trên, các công việc muốn thực hiện chúng ta sẽ đặt bên trong block.

Tiếp theo, sau khi khai báo chúng ta sẽ có 2 cách để run DispatchWorkItem:
- Run trong thread hiện tại, chúng ta chỉ cần gọi hàm :

```
workItem.perform()
```
- Run trong một dispatch queue nào đó, ví dụ chúng ta run trong global queue.
```
DispatchQueue.global().async(execute: workItem)
```

DispatchWorkItem cung cung một số chức năng khá hữu dụng để cho chúng ta sử dụng : 
#### Cancel
DispatchWorkItem có một flag để xác định trạng thái cancel, khi chúng ta gọi hàm cancel flag này sẽ có giá trị là true. Flag này giúp chúng ta có thể dừng công việc trong block code, cụ thể chúng ta xem ví dụ dưới đây :
```
workItem = DispatchWorkItem {
    if !workItem.isCancelled {
        print("start working")
    }
    sleep(3)
    if workItem.isCancelled {
        print("work is cancelled")
    }
    print("finish work")
}

DispatchQueue.main.async(execute: workItem)

DispatchQueue.global().asyncAfter(deadline: DispatchTime.now() + 1) {
    print("cancel work")
    workItem.cancel()
}
```

Trong đoạn code trên, chúng ta có thể thấy một DispatchWorkItem được khởi tạo, trong block code chúng ta sẽ sleep 3s. 
Tiếp đó, run workItem trong main queue, và sử dụng global queue để cancel workItem. Chúng ta sẽ xem kết quả :

> start working
> 
>cancel work
>
>work is cancelled
>
>finish work
>


Như vậy khi hàm cancel được gọi chúng ta thấy flag isCancelled đã được thay đổi và chúng ta có thể dừng mọi công việc ở đây nếu muốn.

Phía trên là một ví dụ hàm Cancel được gọi sau khi đoạn code trong DispatchWorkItem đã được thực thi, còn một trường hợp nữa nếu cancel được gọi trước khi DispatchWorkItem thì mọi dòng lênh trong DispatchWorkItem sẽ không được thực thi nữa. Điều này có nghĩa là nếu DispatchWorkItem đã bị huỷ hoàn toàn.


#### Notify.

Hàm này được sử dụng để nhận biết khi DispatchWorkItem hoàn thành 
```
workItem.notify(queue: DispatchQueue.main) {
    print("workItem is notify")
}
```
## 3. Dispatch Group.

Khi mà chúng ta muôn thực hiện n việc một cách song song, tuy nhiên chúng ta lại muốn biết khi nào tất cả các công việc đó hoàn thành, khi đó Apple cung cấp cho chúng ta một công cụ là Dispatch Group. Dispatch Group giúp đồng bộ hoá các task chạy trên nhiều queue khác nhau.

Khởi tạo :
```
let group = DispatchGroup()
```

Để run một group chúng ta có 2 cách :

```
// (1)
let task1 = DispatchWorkItem {
    sleep(2)
    print("task1 is finish")
}
DispatchQueue(label: "queue1").async(group: group, execute: task1)

// (2)
let task2 = DispatchWorkItem {
    sleep(1)
    print("task2 is finish")
}
DispatchQueue(label: "queue2").async {
    group.enter()
    print("task2 is finish")
    group.leave()
}
```

Cách thứ nhất chúng ta chỉ cần đẩy workItem vào queue, cách thứ 2 chúng ta phải gọi hàm enter và hàm leave để cho group biết thời điểm mà chúng ta thực thi công việc trong group. Trong trường hợp chỉ gọi enter mà không gọi leave thì group sẽ không bao giờ kết thúc.

Dispatch Group cung cấp cho chúng ta hàm notifi để có thể theo dõi khi nào tất cả các task trong goup được hoàn thành .

```
group.notify(queue: DispatchQueue.main) {
    print("group is done")
}
```

Kêt quả chúng ta thu được :
>task2 is finish
>
> task1 is finish
> 
> group is done
> 

# Kết 
Như vậy mình đã cùng các bạn đi hết các chức năng thông dụng mà GCD đã cung cấp để chúng ta có thể làm việc hiệu quả hơn với multithread. 

Hi vọng nó sẽ hữu ích ~