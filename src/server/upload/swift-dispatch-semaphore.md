Chắc chúng ta đã quen thuộc với GCD trong Swift, quen thuộc với các khái niệm về DispatchQueue, DispatchGroup, ... nhưng DispatchSemaphore dường như lại ít phổ biến hơn. Nhưng không vì thế mà DispatchSemaphore là không quan trọng, nó vẫn có tác dụng trong những trường hợp cụ thể. Hãy thử nghĩ đến bài toán thực tế này xem, chúng ta có một bàn tròn và các nhà văn ngồi quanh cái bàn đó và chỉ có một cái bút, trong một thời điểm chỉ có một người có thể viết được và sau khi viết xong sẽ chuyển cho người khác. Trong lập trình cũng vậy, nếu các nhà văn sẽ là các `thread` của chúng ta, bút sẽ là một `shared resource` (một file, một biến, ...) và không phải lúc nào tất cả các thread cũng chọc hết vào một shared resource được. 
Bài viết này chúng ta sẽ giải quyết bài toán rằng có rất nhiều task được tạo ra nhưng tại một thời điểm sẽ chỉ có tối đa n tasks được xử lý.

![](https://images.viblo.asia/f90160c0-7562-47b4-9bd4-3e9e8a548545.jpeg)

## Vậy Semaphore là gì? Nó hoạt động như thế nào?
### Semaphore là:
Một công cụ hiệu quả thông qua cơ chế counting của riêng nó giúp kiểm soát truy cập tài nguyên từ nhiều nguồn khác nhau.

### Cách semaphores hoạt động
Các bước như sau:
1. Đầu tiên, là khởi tạo với một giá trị nào đó - chính là số task có thể xử lý cùng lúc tại một thời điểm
2. Bất cứ khi nào chúng ta muốn sử dụng một shared resource, chúng ta sẽ gửi một **request** tới semaphore
3. Semaphore sẽ quyết định task đó sẽ được thực thi khi nào, giống như việc đèn giao thông bật đèn xanh cho xe cộ đi qua vậy
4. Và một khi task vụ được bật đèn xanh đó chạy xong, thì chúng ta cần thông báo cho semaphore biết rằng task vụ đã xử lý xong để có thể cho task vụ khác được sử dụng tài nguyên bằng cách gửi một tín hiệu **signal**
Khi mà shared resource chỉ giới hạn một hoặc một vài luồng có thể cùng truy cập tại một thời điểm, thì nhưng lệnh **request/signal** sẽ **lock/unlock** resource.

![](https://images.viblo.asia/e32706ad-4a44-4dc9-aa69-2d1c4aa506d3.jpeg)

Thực tế thì cấu trúc của một **Semaphore** gồm có:
* một `counter` để cho semaphore biết là đang có bao nhiêu thread sử dụng tài nguyên
* một FIFO queue  để tracking việc các luông đợi tại nguyên.

**Resource Request: wait()**
Khi Semaphore nhận được một request, no sẽ kiểm tra xem `counter` có lớn hơn `0` hay không:
* Nếu lơn hơn, semaphore sẽ giảm sẽ giảm counter và đưa đèn xanh cho thread đó 
* Ngược lại, thì nó sẽ đẩy yêu cầu sử dụng tài nguyên của thread vào hàng đợi.
    
**Resource Release: signal()**
Khi Semaphore nhận được một `signal()`, nó sẽ kiểm tra xem trong FIFO queue đó có tiến trình hay luồng nào đang ở trong không:
* Nếu có, thì semaphore sẽ kéo tiến trình hoặc luồng đầu tiên từ queue vào và cho phép nó thực thi 
* Ngược lại, nó sẽ tăng `counter` lên 1
    
**Warning: Busy Waiting**
Hãy lưu ý rằng khi bạn gọi `wait()`, semaphore sẽ đóng băng thread hiện tại lại cho tới khi nào nó được nhận đèn hiệu thực thi từ semaphore. Điều này có nghĩa là không được gọi `wait()` ở trên main thread và cũng thật cẩn thật khi gọi nó. Một điều nữa là số lần `wait()` phải bằng số lần `signal()` nếu không bạn sẽ thấy chương trình ra những bug rất oái oăm.

Bây giờ hãy giải quyết bài toán đưa ra lúc đầu nào. Mỗi tác vụ download mình sẽ tượng trưng bằng một vòng for cho đơn giản. Giả sử giờ mình sẽ download 3 file lớn, và được thể hiện mỗi download task là một vòng for từ 0 -> 10. Nếu chạy bình thường cả 3 task thì sẽ cho ra kết quả như này.
```
let firstExecution = DispatchQueue.global(qos: .userInteractive)
let secondExecution = DispatchQueue.global(qos: .userInteractive)
let thirdExecution = DispatchQueue.global(qos: .userInteractive)

func asyncPrint(queue: DispatchQueue, symbol: String) {
    queue.async {
        for i in 0...10 {
            print(symbol, i)
        }
    }
}

asyncPrint(queue: firstExecution, symbol: "🔴")
asyncPrint(queue: secondExecution, symbol: "🔵")
asyncPrint(queue: thirdExecution, symbol: "🐨")
```
Và Kết quả:

![](https://images.viblo.asia/c2ac19cf-8f99-4e18-910e-a2a005fb96b4.png)

Như thấy ở đây thì cả 3 download task đều chạy song song, với các trường hợp thực tế nếu con số này càng nhiều thì sẽ càng tốn tài nguyên mạng, mà các task lại download lâu, dẫn đến không có task vụ nào xong được cả. 

Bây giờ hãy dùng semaphore để giải quyết nó. Chúng ta sẽ giới hạn chỉ có 2 download task được chạy cùng một lúc. Mỗi khi bắt đầu thực hiện task thì chúng ta sẽ `wait()` và giải phóng sau khi chạy xong bằng `signal()`
```
let firstExecution = DispatchQueue.global(qos: .userInteractive)
let secondExecution = DispatchQueue.global(qos: .userInteractive)
let thirdExecution = DispatchQueue.global(qos: .userInteractive)

let semaphore = DispatchSemaphore(value: 2)

func asyncPrint(queue: DispatchQueue, symbol: String) {
    queue.async {
        semaphore.wait()
        for i in 0...10 {
            print(symbol, i)
        }
        semaphore.signal()
    }
}

asyncPrint(queue: firstExecution, symbol: "🔴")
asyncPrint(queue: secondExecution, symbol: "🔵")
asyncPrint(queue: thirdExecution, symbol: "🐨")
```

Và Kết quả là đã giới hạn được tại một thời điểm chỉ có nhiều nhất 2 task thực thi.

![](https://images.viblo.asia/3b4a8470-bbea-4fde-b931-8490c1a3b92e.png)

Trên đây là những kiến thức cơ bản về DispatchSemaphore, mong chúng sẽ hữu ích cho các bạn.

**Reference:**
https://medium.com/swiftly-swift/a-quick-look-at-semaphores-6b7b85233ddb