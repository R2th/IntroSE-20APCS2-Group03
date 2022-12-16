# 1. Grand Central Dispatch (GCD) là gì ?
Càng ngày các thiết bị công nghệ càng có nhiều nhân và nhiều luồng, vì vậy việc lập trình chạy đa luộng nhằm khai thác hết sức mạnh phần cứng của thiết bị đã trở thành xu thế tất yếu. Nhằm hỗ việc lập trình viên, Apple đã phát triển Grand Central Dispatch - là một thư viện giúp chạy các tác vụ song song trên các thiết bị mutil-core: Iphone, Ipad, Macbook, Apple TV, Apple Watch, ...
![](https://images.viblo.asia/8e18ed10-5c82-4e92-9199-b040962f8d14.png)


# 2. Sơ lược về Queue & Thread
## 2.1 Queue
![](https://images.viblo.asia/28346f66-f728-4249-8f51-9eba9e4b13c6.png)
* Queue là một tập hợp các Task cần thực thi trên main thread hoặc global thread.
* Task là một khối code được tái sử dụng và tuân theo nguyên tắc LIFO( last in first out).
* Một Queue gồm nhiều Task, Task có thể thực thi theo kiểu tuần tự ( Serial ) hoặc đồng thời ( Concurrent ).
### 2.1.1 Serial Queue
![](https://images.viblo.asia/f20c81b2-982f-44a4-8767-d184b21ba3bb.png)
Trong. Serial Queue các task sẽ được thực thi một cách tuần tự theo nguyên tắc LIFO, tức là task nào được vào trước sẽ được thực thi trước. Main Queue ( chúng ta sẽ tìm hiểu ở phần 3 ) chính là một Serial. Queue
### 2.1.2 Concurrent Queue
![](https://images.viblo.asia/f0d78c97-d119-49c2-8f09-04fb7d51f684.png)
Các Task được nhập vào trong Concurrent Queue sẽ có thời gian bắt đầu thực thi gần như tương đương, nhưng tuỳ thuộc vào công việc của từng Task mà thời gian kết thúc của chúng khác nhau.
## 2.2 Thread
![](https://images.viblo.asia/4695a4f2-54eb-44e5-84bf-70da6d952614.png)
* Các Thread thực thi các task trong hàng đợi.
* Serial Queue chỉ có một thread duy nhất.
* Concurrent Queue sẽ có nhiều thread.
# 3. DispatchQueue
Trong Grand Central Dispatch có 3 kiểu hàng đợi gồm: Main Queue, Global Queue và Custom Queue.
1. **Main Queue** là một Serial Queue, thực thi các task trên Main Thread, được sử dụng để cập nhập User Interface. Dưới đây là một ví dụ
```Swift
DispatchQueue.main.Async() {
        //Code Run On Main Thread
    }
```
Các hàm bên trong khối { } được thực thi trên main thread

3. **Global Queue** (as **Concurrent Queue**) được dùng để thực thi các tác vụ Non-UI (không liên quan đến UI) và các task nặng (load data, handle function, ... ) chạy mà người dùng không thấy.
```Swift
DispatchQueue.Global.Async() {
    //Fetch Data From API
    //Code Run On Global Thread
}
```
Các hàm bên trong khối { } được thực thi trên Global Thread

4. **Custom Queue** có thể là Serial Queue hoặc Concurrent Queue
```Swift
let queue = DispatchQueue.global(qos: .background)
        queue.sync {
               //Execute A Block Code
        }
```
Trong ví dụ trên chúng ta đã tạo ra một queue do người dùng tự định nghĩa, đây là một concurrent queue vì có qos: là .background .
+ **Note :** 
Khi tạo ra custom queue một trong những tham số quan trọng đó chính là qos: (quality of service). Với mỗi qos nó có một nhiệm vụ mà mức độ ưu tiên khác nhau :
![](https://images.viblo.asia/d57fd709-641a-40a6-8cb9-95d03ac31dd4.png)

5. Một vài cách triển khai
```Swift
DispatchQueue.Global.Async() {
    //Fetch Data From API
    //Code Run On Global Thread
    DispatchQueue.main.Async() {
        //Update UI
        //Code Run On Main Thread
    }
}
```
Trong ví dụ trên, chúng ta có thể thấy các tác vụ nặng như lấy data từ API về sẽ được thực thi ở dưới Global Thread, sau khi thành công chúng ta sẽ gọi đến main thread để update giao diện.
```Swift
    private func loadData() {
        let shared = APIServices()
        shared.fetchCoursesJSON { [unowned self] (result) in
            switch result {
            case .success(let courses):
                self.courses = courses
                DispatchQueue.main.async {
                    tableView.reloadData()
                }
            case .failure(let error):
                print("Failed to fetch Courses \(error)")
            }
        }
    }
```
Ở đây là một ví dụ khác, sau khi lấy dữ liệu từ API về thành, ngay lập tức chúng ta async vào main thread để cập nhập lại UITableView.

# 4. Sync & Async
Khi mới làm quen với ngôn ngữ Swift hẳn rất nhiều bạn còn bỡ ngỡ về cơ cấu Sync và Async, không biết khi nào nên sử dụng phương thức nào cho hơn lí. Đôi khi sử dụng còn bị crash app. Sau đây mình sẽ trình bày cho các bạn hiểu rõ hơn về cách thức hoạt động của phương thức Sync và Async trong DispatchQueue. 

## 4.1 Sync
![](https://images.viblo.asia/64bb51eb-2d88-4a2d-858b-f5e80a2953d5.png)
Nếu như 2 queueA và queueB, các bạn có một khối code đang chạy trên queueB và gọi **Sync** vào queueA. Ngay lập tức toàn bộ queueA sẽ bị block và khối code bạn vừa gọi sẽ được thực thi ngay thời điểm đó.
![](https://images.viblo.asia/2738fd4d-16a4-46af-b371-dcb097418306.png)


## 4.2 Async
![](https://images.viblo.asia/bc22503e-25ec-4ee0-aa41-e67a4c5fd32d.png)

**Async**: có nghĩa là nó sẽ không block thread hiện tại mà chạy tác vụ dưới nền.
Dưới đây đây là một ví dụ về Async
![](https://images.viblo.asia/667b4e77-e62f-4028-bf78-84bf3d12027b.png)


# 5. DispatchGroup
Đôi khi chúng ta có nhiều tác vụ trên nhiều luồng cần chờ chúng hoàn thành một lúc trước khi thực thi việc khác, khi đó chúng ta sử dụng DispatchGroup. Một ví dụ dễ thấy nhất là khi chúng ta lấy dữ liệu từ 2 API khác nhau về để update cho cùng một UI, khi đó chúng ta cần phải chờ data load xong từ cả 2 API trước khi update UI, trong trường hợp này sử dụng Dispatch Group là cực kì phù hợp.
```Swift
  private func demoDispatchGroup() {

        let dispatchGroup = DispatchGroup()

        dispatchGroup.enter()
        for item in 1...10 {
            print("Load Data \(item)")
        }
        dispatchGroup.leave()
        
        dispatchGroup.enter()
        print("Execute Task 2")
        dispatchGroup.leave()
        
        dispatchGroup.notify(queue: .main) {
            print("Done")
        }
    }
```

Đây là kết quả:
```
Load Data 1
Load Data 2
Load Data 3
Load Data 4
Load Data 5
Load Data 6
Load Data 7
Load Data 8
Load Data 9
Load Data 10
Execute Task 2
Done
```
+ **.enter()** để thông báo khối code bắt đầu.
+ **.leave()** để thông báo khối code kết thúc.
+ **.notify()** để thông báo về queue mà mình muốn rằng toàn bộ group đã hoàn thành.
# 6. DispatchSemaphore
Khác với DispatchGroup, DispatchSemaohore cho phép chúng ta kiểm soát thêm số lượng access được sử dụng tài nguyên bằng cách set giá chị cho tham số **value**

```Swift
    private func demoDispatchSemaphore() {
        print("start")
        let semaphore = DispatchSemaphore(value: 5)
        for item in 0...10 {
            DispatchQueue.global().async {
                semaphore.wait()
                sleep(5)
                print(item)
                semaphore.signal()
                
            }
        }
    }
```

Đây là kết quả
```
start
// Chờ 5 giây
3
4
2
1
0
// Chờ 5 giây
5
7
8
9
6

```

Trong DispatchSemaphore có 2 thành phần quan trọng đó là **Thread Queue** và **Counter**:
### Thread Queue: 
được dùng để quản lý , kiểm tra các khối code được thực thi, nó tuân theo nguyên tắc FIFO.
### Counter:
quản lý số lượng access được truy cập vào Thread queue, Counter thay đổi khi gọi **wait()** và **signal()**.
+ **wait(**) : chúng ta gọi wait() trước khi chúng ta sử dụng shared resource. khi đó counter sẽ giảm 1.
+ **signal()** : chúng ta gọi signal() sau khi sử dụng shared resource. khi đó counter sẽ tăng 1.
![](https://images.viblo.asia/811a690a-9908-465e-b32d-5557af0b291e.png)
Trên đây là một sơ đồ giải thích nguyên lí hoạt động của Counter trong DispatchSemaphore.
# 7. Tổng Kết 
Qua bài viết này chúng ta đã tìm hiểu về GCD là gì, Queue, Thread trong GCD, Cơ chế Sync và Async, DispatchGroup và DispatchSemaphore. Rất mong đã đem lại được những kiến thức bỏ ích cho bạn đọc.

Các bạn có thể tham khảo thêm tài liệu tại trang :
- https://www.raywenderlich.com/5370-grand-central-dispatch-tutorial-for-swift-4-part-1-2
- https://medium.com/swift2go/using-dispatch-group-semaphore-to-group-ios-async-tasks-alfian-losari-81335fa6e92e

Thanks you !!!