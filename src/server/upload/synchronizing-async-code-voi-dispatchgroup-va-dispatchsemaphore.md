Giả sử bạn cần thực hiện nhiều cuộc gọi API và cần đợi chúng hoàn thành để sử dụng

Tôi nghĩ rằng giải pháp đơn giản nhất sẽ là sử dụng DispatchGroup (nếu thứ tự thực thi không quan trọng) hoặc DispatchSemaphore.

Tôi sẽ chứng minh cả vấn đề và giải pháp của nó bằng cách sử dụng một function sẽ kết hợp hai cuộc gọi async và sau đó sử dụng một vòng lặp có chứa các cuộc gọi async.

Hãy tạo một command-line project

Tạo một function chuyển `Int` thành `String` sau 1 khoảng thời gian delay:
```Swift
func fetchData(_ data: Int, delay: Double, completionHandler: @escaping (String)->()) {
    DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
        completionHandler("\(data)")
    }
}
```
# Không sử dụng Loop

Tạo một hàm sẽ kết hợp hai cuộc gọi async:
```Swift
func combineAsyncCalls(completionHandler: @escaping (String)->()) {
    var text = ""
    fetchData(0, delay: 0.4) { text += $0 }
    fetchData(1, delay: 0.2) { text += $0 }

    completionHandler(text)
}

combineAsyncCalls() {
    print($0)
    exit(0)
}

RunLoop.current.run()
```

Khi chúng ta run, output sẽ là empty bởi vì `completionHandler` được gọi trước khi `fetchData` completion handle được thực thi

Giải pháp đầu tiên (không quan tâm thứ tự thực hiện) là sử dụng Dispatch Group:

```Swift
func combineAsyncCallsWithDispatchGroup(completionHandler: @escaping (String)->()) {
    let group = DispatchGroup()
    var text = ""
    group.enter()
    fetchData(0, delay: 0.4) {
        text += $0
        group.leave()
    }
    group.enter()
    fetchData(1, delay: 0.2) {
        text += $0
        group.leave()
    }
    group.notify(queue: .main) {
        completionHandler(text)
    }
}

combineAsyncCallsWithDispatchGroup() {
    print($0)
    exit(0)
}

RunLoop.current.run()
```

Nếu chúng ta run function này ngay bây giờ, output sẽ là "10" vì `fetchData` thứ hai mất ít thời gian hơn so với `fetchData` đầu tiên. Đây có thể là những gì chúng ta muốn (khi chúng ta không quan tâm đến thứ tự thực hiện), nhưng chúng ta có thể muốn `fetchData` thứ hai được gọi sau lần đầu tiên hoàn thành.

Giải pháp cho kịch bản này là sử dụng DispatchSemaphore:

```Swift
func combineAsyncCallsWithSemaphore(completionHandler: @escaping (String)->()) {
    let semaphore = DispatchSemaphore(value: 0)
    var text = ""
    
    DispatchQueue.global().async {
        fetchData(0, delay: 0.4) {
            text += $0
            semaphore.signal()
        }
        semaphore.wait() // wait for the first fetchData complete
        
        fetchData(1, delay: 0.2) {
            text += $0
            semaphore.signal()
        }
        semaphore.wait() // wait for the second fetchData complete
        
        completionHandler(text)
    }
}

combineAsyncCallsWithSemaphore() {
    print($0)
    exit(0)
}

RunLoop.current.run()
```

Bây giờ khi chúng ta gọi function này, output sẽ luôn là "01" bất kể bất kỳ hàm `fetchData` nào mất để hoàn tất.
Điều quan trọng cần nhớ là chúng ta không thể sử dụng semaphore trên main thread vì nó bị block mãi mãi.
Ngoài ra, nếu chúng ta không quan tâm đến thứ tự, chúng ta có thể đặt cả `Semaphore.wait()` trước khi hoàn thành. Điều này sẽ hoạt động giống như khi sử dụng DispatchGroup.

```Swift
func combineAsyncCalls(completionHandler: @escaping (String)->()) {
    var text = ""
    let semaphore = DispatchSemaphore(value: 0)
    DispatchQueue.global().async {
        fetchData(0, delay: 0.4) {
            text += $0
            semaphore.signal()
        }
        fetchData(1, delay: 0.2) {
            text += $0
            semaphore.signal()
        }
        semaphore.wait()
        semaphore.wait()

        completionHandler(text)
    }
}
```

# Sử dụng Loop
Gọi hàm `fetchData` trong vòng lặp qua thời gian trễ ngẫu nhiên:
```Swift
func fetchData(_ data: Int, delay: Double, completionHandler: @escaping (String)->()) {
    DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
        completionHandler("\(data)")
    }
}

var text = ""
for i in 0..<20 {
    fetchData(i, delay: Double.random(in: 0...0.2)) {
        text += "\($0) - "
    }
}
print("text:", text)

RunLoop.current.run()
```

Nếu chúng ta thực thi mã này, đầu ra sẽ là: 
```
text:
```

Điều này là do `print(“text:”, text)` được gọi trước khi bất kỳ `fetchData` nào call return callback.
Hãy thêm synchronization:
```Swift
let group = DispatchGroup()
var text = ""
for i in 0..<20 {
    group.enter()
    fetchData(i, delay: Double.random(in: 0...0.2)) {
        text += "\($0) - "
        group.leave()
    }
}
group.notify(queue: DispatchQueue.main) {
    print(text)
    exit(0)
}

RunLoop.current.run()
```
Đầu ra bây giờ sẽ là ngẫu nhiên, ví dụ:
```
1 - 6 - 16 - 15 - 13 - 0 - 10 - 14 - 9 - 7 - 17 - 19 - 3 - 8 - 18 - 4 - 11 - 2 - 12 - 5 -
```
Lý do là tất cả các hàm `fetchData` bên trong vòng lặp sẽ được gọi đồng thời và sau khi tất cả các cuộc gọi lại hoàn tất và gửi `group.leave()`, `group.notify()` sẽ được thực thi.
Cuối cùng, thêm `DispatchSemaphore` để tuần tự hóa việc thực thi bên trong vòng lặp:
```Swift
import Foundation

func fetchData(_ data: Int, delay: Double, completionHandler: @escaping (String)->()) {
    DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
        completionHandler("\(data)")
    }
}

DispatchQueue.global().async {
    let semaphore = DispatchSemaphore(value: 0)
    var text = ""
    for i in 0..<20 {
        fetchData(i, delay: Double.random(in: 0...0.2)) {
            text += "\($0) - "
            semaphore.signal()
        }
        semaphore.wait()
    }
    print(text)
    exit(0)
}
RunLoop.current.run()
```

Bây giờ mỗi hàm `fetchData` sẽ đợi trước đó kết thúc trước khi thực thi và kết quả là:
```
0 - 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - 10 - 11 - 12 - 13 - 14 - 15 - 16 - 17 - 18 - 19 -
```
Tóm tắt, chúng ta có hai công cụ để đồng bộ hóa các hàm async, nếu chúng ta chỉ muốn đợi tất cả chúng kết thúc, chúng tôi sẽ sử dụng Dispatch Group, nếu chúng ta muốn chúng kết thúc và thực thi theo thứ tự chúng ta sử dụng DispatchSemahpore.

Nguồn: https://betterprogramming.pub/synchronizing-async-code-with-dispatchgroup-dispatchsemaphore-de814e485e82