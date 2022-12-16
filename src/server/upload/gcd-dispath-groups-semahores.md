Trong một số trường hợp, thay vì chỉ xử lý một tác vụ trong queue thì chúng ta cần xử lý một nhóm tác vụ. Tất cả các tác vụ đều chạy bất đồng bộ và ta cần phải biết được bao giờ thì tất cả các tác vụ đều hoàn thành. Trong trường hợp này, chúng ta có thể sử dụng DispatchGroup do Apple cung cấp.

# I. DispatchGroup:

-----


- **DispatchGroup** được sử dụng để theo dõi một nhóm các tác vụ bao giờ sẽ hoàn thành.
- **DispatchGroup** cung cấp phương thức `notify(queue:)` được sử dụng để nhận biết thời điểm tất cả các tác vụ đều đã được hoàn thành.
- `notify(queue:)` là một phương thức hoạt động **bất đồng bộ**. Do đó ta có thể add thêm tác vụ vào **DispatchGroup** trong trường hợp các tác vụ được thêm vào vào trước đó có ít nhất một tác vụ chưa hoàn thành mỗi khi `notify(queue:)` được gọi.
```swift
let group = DispatchGroup()

someQueue.async(group: group) { ... your work ... }
someQueue.async(group: group) { ... more work .... }
someOtherQueue.async(group: group) { ... other work ... }

group.notify(queue: DispatchQueue.main) { [weak self] in
   self?.textLabel.text = "All jobs have completed"
}
```

# II. Synchronous waiting:

-----


- Trong trường hợp chúng ta không muốn completion của **DispatchGroup** hoạt động bất đồng bộ, chúng ta có thể sử dụng phương thức `.wait`. 
- `.wait` là một phương thức **synchronous** hoạt động bằng cách block **queue** hiện tại cho tới khi tất cả các tác vụ được thêm vào vào **DispatchGroup** được hoàn thành. Phương thức này có một **parameter** được sử dụng để truyền thời gian tối đa **queue** bị block để chờ các tác vụ trong **DispatchGroup** được hoàn thành, nếu quá thời gian này mà các tác vụ vẫn chưa được thực hiện xong thì queue vẫn sẽ được **un-lock**. Nếu **parameter** bị bỏ trống thì `.wait` sẽ block **queue** cho tới khi nào tất cả các tác vụ thực hiện xong mới thôi.
- Các tác vụ sẽ vẫn tiếp tục được thực thi ngay cả khi đã quá thời gian chờ.
```swift
let group = DispatchGroup()

someQueue.async(group: group) { ... }
someQueue.async(group: group) { ... }
someOtherQueue.async(group: group) { ... }

if group.wait(timeout: .now() + 60) == .timedOut {
  print("The jobs didn’t finish in 60 seconds")
}
```

- Vì `.wait` **block queue** nên **không bao giờ** được sử dụng nó trên **MainQueue**.

Ví dụ:
```swift
let group = DispatchGroup()
let queue = DispatchQueue.global(qos: .userInitiated)

queue.async(group: group) {
    print("Start job 1")
    Thread.sleep(until: Date().addingTimeInterval(10))
    print("End job 1")
}
queue.async(group: group) {
    print("Start job 2")
    Thread.sleep(until: Date().addingTimeInterval(2))
    print("End job 2")
}

if group.wait(timeout: .now() + 5) == .timedOut {
    print("I got tired of waiting")
} else {
    print("All the jobs have completed")
}
```

Kết quả:
```swift
Start job 1
Start job 2
End job 2
I got tired of waiting
End job 1
```

- Trong ví dụ trên, kết quả print ra là `I got tired of waiting` vì khi đã quá thời gian chờ (**5 giây**) thì tác vụ 1 vẫn chưa được hoàn thành. Trong trường hợp giả sử rằng tác vụ 1 chỉ mất **1 giây** để hoàn thành, như vậy thì kết quả được print ra sẽ là `All the jobs have completed` vì thời gian chờ **5 giây** là đủ để cho cả 2 tác vụ trong **DispatchGroup** được hoàn thành toàn bộ.

# III. Wrapping asynchronous methods:

-----


- **DispatchGroup** cũng được sử dụng trong trường hợp chúng ta thực thi một tác vụ bất đồng bộ bên trong một **clousure** và **closure** đó **complate** trước khi tác vụ bất đồng bộ bên trong nó được hoàn thành.
- Trong trường hợp trên, **DispatchGroup** giúp chúng ta thông báo với **closure** rằng cần phải chờ tác vụ bất đồng bộ đang được thực thi bên trong nó phải được hoàn thành thì mới tiếp tục hoạt động như sau:
```swift
queue.dispatch(group: group) {
  // count is 1
  group.enter()
  // count is 2
  someAsyncMethod {
    defer { group.leave() }
       // Perform your work here,
       // count goes back to 1 once complete
    } 
}
```

- **DispatchGroup** cung cấp 2 phương thức `.endter()` và `.leave()`:
    - `.enter()` thông báo rằng một tác vụ **bắt đầu được thực thi**
    - `.leave()` thông báo rằng một tác vụ **đã được hoàn thành**, số lượng `.leave()` luôn phải bằng số lượng `.enter()`.

Ví dụ về việc sử dụng **DispatchGroup** trong việc load các ảnh:
```swift
PlaygroundPage.current.needsIndefiniteExecution = true

let group = DispatchGroup()
let queue = DispatchQueue.global(qos: .userInitiated)

let base = "https://www.nasa.gov/sites/default/files/thumbnails/image"
let names = [
    "potw1008a.jpg",
    "iss056e006994_lrg.jpg",
    "pia22686-16.jpg",
    "atmosphere_geo5_2018235_eq.jpg",
    "worldfires-08232018.jpg",
    "8.22-396o5017lane.jpg",
    "jsc2017e110803_0.jpg",
    "43367342334_1159c4f1f6_k.jpg"
]

var images: [UIImage] = []

for name in names {
  guard let url = URL(string: "\(base)/\(name)") else { continue }

  group.enter()

  let task = URLSession.shared.dataTask(with: url) { data, _, error in
    defer { group.leave() }

    if error == nil,
      let data = data,
      let image = UIImage(data: data) {
      images.append(image)
    }
  }

  task.resume()
}

group.notify(queue: queue) {
    images[0]

    //: Make sure to tell the playground you're done so it stops.
    PlaygroundPage.current.finishExecution()
}
```

# IV. DispatchSemaphore:

-----


- **DispatchSemaphore** được sinh ra để giải quyết vấn đề về **giới hạn** số lượng Thread truy cập vào một resource **trong cùng một thời điểm**. Khi khởi tạo một semaphore, chúng ta sẽ cần chỉ định có bao nhiêu luồng được phép truy cập vào tài nguyên trong cùng một thời điểm.
- Để bắt đầu việc giới hạn số luồng truy cập, **DispatchSemaphore** cung cấp một phương thức là `.wait()`. Đây là một phương thức **đồng bộ** (synchronous), nó sẽ block luồng hiện tại cho tới khi có tài nguyên sẵn sàng để thực thi tác vụ.
- Khởi tạo một semaphore:
```swift
let semaphore = DispatchSemaphore(value: 4)
```
- Để báo hiệu rặng một luồng đã thực thi xong, DispatchSemaphore cung cấp phương thức `.signal()`. Phương thức này sẽ báo hiệu rằng luồng hiện tại đã thực hiện xong tác vụ với tài nguyên.

Ví dụ về việc giới hạn số luồng load ảnh tại một thời điểm:
```swift
PlaygroundPage.current.needsIndefiniteExecution = true

let group = DispatchGroup()
let queue = DispatchQueue.global(qos: .userInteractive)
let semaphore = DispatchSemaphore(value: 2)


let base = "https://www.nasa.gov/sites/default/files/thumbnails/image"
let names = [
    "potw1008a.jpg",
    "iss056e006994_lrg.jpg",
    "pia22686-16.jpg",
    "atmosphere_geo5_2018235_eq.jpg",
    "worldfires-08232018.jpg",
    "8.22-396o5017lane.jpg",
    "jsc2017e110803_0.jpg",
    "43367342334_1159c4f1f6_k.jpg"
]

var images: [UIImage] = []

names.forEach { name in
    guard let url = URL(string: "\(base)/\(name)") else { return }

    semaphore.wait()
    group.enter()

    let task = URLSession.shared.dataTask(with: url) { data, _, error in
        defer {
            group.leave()
            semaphore.signal()
        }

        if error == nil,
           let data = data,
           let image = UIImage(data: data) {
            images.append(image)
        }
    }

    task.resume()
}

group.notify(queue: queue) {
    images[0]

    //: Make sure to tell the playground you're done so it stops.
    PlaygroundPage.current.finishExecution()
}
```

# V. Tài liệu tham khảo:

-----


- Concurrentcy by tutorials - 1st Edition