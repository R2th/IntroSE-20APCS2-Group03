## Scheduler là gì ?
Trước khi bạn bắt đầu sử dụng với schedulers bạn phải hiểu chúng là gì hoặc chúng dùng để làm gì ? Nhìn chung 1 scheduler là một bối cảnh nơi process thực hiện, có thể là một luồng, một dispath queue hoặc 1 operation sử dụng bên trong OperationQueueScheduler.
Nếu bạn chưa vẫn chưa hiểu rõ các sử dụng mô hình dưới đây sẽ là một ví dụ hoàn hảo để hiểu rõ hơn

![](https://images.viblo.asia/68cfba98-6f4c-4e0c-9cb1-680f6262354a.png)
<div align="center">
    <b> Hình 1: Ví dụ schedule</b>
</div>

Một observable tạo 1 request đến server và nhận một số dữ liệu dữ liệu này sẽ được xử lý bởi một toán tử lưu trữ cached tại một vùng data nào đó. Dữ liệu này được truyền đến tất cả subscribers trên các scheduler khác nhau phần lớn có thể là trên MainScheduler để cập nhật lại giao diện người dùng

Một quan niệm sai lầm phổ biến về schedulers là chúng có liên quan đến threads . Điều đó thoạt qua lúc đầu có vẻ hợp lý nhưng khi đi sâu tìm hiểu thì các schedulers hoạt động tương tự như GCD's dispatch queues

Nếu bạn đang viết một custom scheduler bạn có thể tạo nhiều schedulers sử dụng trên cùng một threads hoặc một schedulers ưu tiên trên đầu tiên của trên nhiều threads. Nghe có vẻ vô lý nhưng lại rất thuyết phục vì nó sẽ hoạt động!

![](https://images.viblo.asia/99e12a96-4847-4f56-8fe4-e9bc34a7836b.png)
<div align="center">
    <b> Hình 2: </b>
</div>
Điều quan trọng cần nhớ là schedulers không phải là threads và nó cũng khong có mối quan hệ 1-1 với threads

## Thay đổi Schedulers

Một trong những điều đặc biệt nhất trong Rx mà rất ít người quan tâm đến đó là khả năng chuyển đổi schedulers bất cứ lúc nào, không có bất kỳ hạn chế nào ngoại trừ những điều bị áp đặt bởi các sự kiện tạo quy trình bên trong hệ thống.

Để hiểu cách schedulers thực hiện, bạn sẽ tạo ra observable đơn giản với việc emit một số loại trái cây: 
```swift
let fruit = Observable<String>.create { observer in
    observer.onNext("[apple]")
    sleep(2)
    observer.onNext("[pineapple]")
    sleep(2)
    observer.onNext("[strawberry]")
    return Disposables.create()
}
```

Hầm sleep trong observable có thể không cần thiết trong các ứng dụng thực tế nhưng trong trường hợp này nó sẽ giúp bạn hiểu cách subscriptions và observations hoạt động như nào ?

Trước tiên thêm đoạn code sau Utils.swift hỗ trợ subscription và log thread
```swift
    private func getThreadName() -> String {
      if Thread.current.isMainThread {
        return "Main Thread"
      } else if let name = Thread.current.name {
        if name == "" {
          return "Anonymous Thread"
        }
        return name
      } else {
        return "Unknown Thread"
      }
    }

    private func secondsElapsed() -> String {
      return String(format: "%02i", Int(Date().timeIntervalSince(start).rounded()))
    }

    extension ObservableType {
      func dump() -> RxSwift.Observable<Self.E> {
        return self.do(onNext: { element in
          let threadName = getThreadName()
          print("\(secondsElapsed())s | [D] \(element) received on \(threadName)")
        })
      }

      func dumpingSubscription() -> Disposable {
        return self.subscribe(onNext: { element in
          let threadName = getThreadName()
          print("\(secondsElapsed())s | [S] \(element) received on \(threadName)")
        })
      }
    }
```
Thêm đoạn code sau để subscribe observable đã tạo 
```swift
    fruit
        .dump()
        .dumpingSubscription()
        .disposed(by: bag)
```
Run và kiểm tra tới bảng log console

```
00s | [D] [apple] received on Main Thread
00s | [S] [apple] received on Main Thread
02s | [D] [pineapple] received on Main Thread
02s | [S] [pineapple] received on Main Thread
04s | [D] [strawberry] received on Main Thread
04s | [S] [strawberry] received on Main Thread
```

Trái cây được tạo ra trên Main Thread, nhưng sẽ rất tuyệt nếu di chuyển nó sang background thread. Để tạo trái cây trong một background thread bạn sẽ phải sử dụng subscribeOn.

### Sử dụng subscribeOn

Trong một số trường hợp, bạn có thể muốn thay đổi scheduler của observable để tính toán mà không ảnh hưởng đến bất kỳ toán tử subscription nào  ( Không phải là code của subscription mà là code sẽ thực hiện khi nhận được sự kiện emit từ observable )
Cách để chỉ định scheduler cho code tính toán đó là sử dụng subscribeOn.  Khi bạn muốn lắng nghe sự kiện một observable bạn đăng ký nó. Điều này xác định nơi xử lý ban đầu sẽ xảy ra. Nếu subscribeOn không được gọi, RxSwift sẽ tự động sử dụng thread hiện tại : 

![](https://images.viblo.asia/be69045c-3a00-4e8e-ac4b-820078d6472a.png)

<div align="center">
    <b> Hình 3: </b>
</div>

Tiến trình này đang tạo các sự kiện trên luồng chính bằng cách sử dụng main scheduler. MainScheduler mà bạn đã sử dụng nằm trên top của main thread. Tất cả các tác vụ bạn muốn thực hiện trên main thread phải sử dụng scheduler này, đó là lý do tại sao bạn sử dụng khi update lại UI. Để thay đổi schedulers, chúng ta sẽ sử dụng subscribeOn.
Chúng ta sẽ khởi tạo một schedule có tên globalScheduler sử dụng background queue. scheduler này được tạo bằng cách sử dụng global dispatch queue, là hàng đợi concurrent:

```swift
let globalScheduler = ConcurrentDispatchQueueScheduler(queue: DispatchQueue.global())
```
Vì vậy tất cả các tác nhiệm xử dụng scheduler này sẽ được xử lý trên global dispatch queue.
Để sử dụng scheduler này, thay thế subscription trước observable fruit thành :
```swift
fruit
    .subscribeOn(globalScheduler)
    .dump()
    .dumpingSubscription()
    .disposed(by: bag)
```
Bây giới với scheduler vừa mới tạo hãy run lại và kiểm tra kết quả

```
00s | [D] [apple] received on Anonymous Thread
00s | [S] [apple] received on Anonymous Thread
02s | [D] [pineapple] received on Anonymous Thread
02s | [S] [pineapple] received on Anonymous Thread
04s | [D] [strawberry] received on Anonymous Thread
04s | [S] [strawberry] received on Anonymous Thread
```
Bây giờ cả observable và subscribed đều đang xử lý dữ liệu trong cùng một luồng.
![](https://images.viblo.asia/3665cffd-8a2f-47d8-85d5-6d6d45f2d78e.png)
<div align="center">
    <b> Hình 4: </b>
</div>

Thật tuyệt vời nhưng bây giờ bạn lại muốn thay đổi scheduler cho các dòng lệnh của observer thực hiện? Cùng đi tìm hiểu observeOn ở dưới nhé.

### Sử dụng ObserveOn

Observing là một trong ba khái niệm cơ bản của Rx. Nó liên quan đến một thực thể với các sự kiện và một observer lắng nghe cho các sự kiện đó. Trong trường hợp này subscribeOn vàobserveOn đối lập nhau về thay đổi scheduler nơi observation thực hiện.
Một sự kiện được kích hoạt bởi một Observable cho tất cả các observer đã đăng ký và chúng sẽ đảm bảo rằng sự kiện được xử lý trong chính xác scheduler của nó. Để chuyển từ current global scheduler sang main thread, bạn cần gọi observeOn trước khi subscribing: 
```swift
fruit
    .subscribeOn(globalScheduler)
    .dump()
    .observeOn(MainScheduler.instance)
    .dumpingSubscription()
    .disposed(by: bag)
```
Chạy lại cho chúng ta kết quả :
```
00s | [D] [apple] received on Anonymous Thread
00s | [S] [apple] received on Main Thread
02s | [D] [pineapple] received on Anonymous Thread
02s | [S] [pineapple] received on Main Thread
04s | [D] [strawberry] received on Anonymous Thread
04s | [S] [strawberry] received on Main Thread
```
Kết quả đã đạt được đúng như mong muốn tất cả các sự kiện được xử lý trên schedule bạn đã tạo và chuyển về Main Thread trong subscribing cho phép nhận sự kiện cuối.
![](https://images.viblo.asia/be69045c-3a00-4e8e-ac4b-820078d6472a.png)
<div align="center">
    <b> Hình 5: </b>
</div>

## Một số kinh nghiệm và sheduler có sẵn

Schedulers là một chủ đề khó. Mình sẽ đưa ra một số trường hợp hay gặp và các xử lý phù hợp. Để tìm hiểu tiếp bạn phải biết schedulers đồng thời và tuần tự là gì ?  Và hiểu cách nó xử lý, loại nào hoạt động tốt hơn cho từng trường hợp cụ thể.
### Serial vs concurrent schedulers
Bạn chỉ cần hiểu rằng scheduler chỉ đơn giản là một bối cảnh, có thể là bất cứ thứ gì (dispatch queue, thread, custom context) và tất cả các toán tử chuyển đổi sequences cần phải bảo đảm chắc chắn rằng bạn đang sử dụng đúng lịch trình.
* Nếu bạn sử dụng serial scheduler, Rx sẽ thực hiện tính toán một cách lần lượt. Đối với hàng đợi serial, người tạo ra cũng sẽ có thể thực hiện tối ưu hóa của riêng họ.
* Trong một concurrent scheduleri, Rx sẽ cố chạy các đoạn mã đồng thời, nhưng observeOn và subscribeOn sẽ đảm bảm tác vụ vẫn thực hiện đúng scheduler.

### MainScheduler

MainScheduler sử dụng top của main thread. Scheduler này được sử dụng để xử lý các thay đổi trên giao diện người dùng và thực hiện các tác vụ ưu tiên cao. Như một thông lệ chung khi phát triển các ứng dụng trên iOS, tvOS hoặc macOS, các tác vụ chạy dài không nên được thực hiện trên scheduler này, vì vậy hãy tránh những thứ như server requests  hay các tác vụ nặng khác.
Ngoài ra, nếu bạn thực hiện các tác side effects cập nhật giao diện người dùng, bạn phải chuyển sang MainScheduler để đảm bảo các cập nhật đó xuất hiện trên màn hình.

MainScheduler cũng được sử dụng cho tất cả các observations khi sử dụng  RxCocoa Traits, và cụ thể hơn là Driver and Signal. Chúng đảm bảo observation luôn được thực hiện trong MainScheduler để cung cấp cho bạn khả năng liên kết dữ liệu trực tiếp với giao diện người dùng của ứng dụng của bạn

### SerialDispatchQueueScheduler

SerialDispatchQueueScheduler quản lý trừu tượng hóa công việc trên một serial DispatchQueue. Scheduler này có lợi thế lớn của một số tối ưu khi sử dụng kèm với observeOn.
Bạn có thể sử dụng scheduler này để xử lý các công việc trên background một cách nối tiếp. 
Ví dụ: nếu bạn có một ứng dụng giao tiếp với một điểm cuối duy nhất trên máy chủ (như trong ứng dụng Firebase hoặc GraphQL), bạn có thể muốn tránh gửi nhiều yêu cầu đồng thời, điều này sẽ gây 
quá tải tới ứng dụng cuối. Scheduler này đảm bảo công việc bạn muốn cho bất kỳ công việc nào sẽ tiến triển giống như hàng đợi tác vụ nối tiếp.

### ConcurrentDispatchQueueScheduler
ConcurrentDispatchQueueScheduler tương tự như SerialDispatchQueueScheduler quản lý các việc phải làm một cách trừu tượng trên một DispatchQueue. Sự khác biệt chính ở đây là thay vì hàng đợi nối tiếp, bộ lập lịch sử dụng đồng thời.
Loại trình scheduler này không được tối ưu hóa khi sử dụng observeOn, vì vậy hãy nhớ tính đến điều đó khi quyết định sử dụng loại lịch trình nào.
Một concurrent scheduler có thể là một lựa chọn tốt cho nhiều tác vụ lâu dài cần kết thúc đồng thời. Kết hợp nhiều observables với một toán tử chặn, vì vậy tất cả các kết quả được kết hợp với nhau khi sẵn sàng. Thay vào đó, một bộ lập lịch đồng thời có thể thực hiện nhiều nhiệm vụ đồng thời và tối ưu hóa việc thu thập kết quả

### OperationQueueScheduler
OperationQueueScheduler tương tự như ConcurrencyDispatchQueueScheduler, nhưng thay vì trừu tượng hóa công việc trên một DispatchQueue, nó thực hiện công việc trên một OperationQueue. Đôi khi bạn cần kiểm soát nhiều hơn đối với các công việc đồng thời bạn đang chạy, mà bạn không thể thực hiện với một concurrent DispatchQueue.Bạn có thể  chỉnh maxConcurrentOperationCount để đặt tối đa là số lượng concurrent operation ứng dụng cần sử dụng.

### TestScheduler
TestScheduler là một loại đặc biệt. Nó có nghĩa là chỉ được sử dụng trong Testing, vì vậy bạn không nên sử dụng nó trong product code. Scheduler đặc biệt này đơn giản hóa việc kiểm tra các operator. Nó là một phần của thư viện RxTest. 

## Tổng kết
Schedulers là một chủ đề khó trong Rx. Nó có trách nhiệm tính toán và thực hiện tất cả các nhiệm vụ trong RxSwift. Nguyên tắc vàng của Scheduler là nó có thể là bất cứ thứ gì. Hãy ghi nhớ điều này và sẽ rất hữu ích khi bạn sử dụng observables kết hợp việc thay đổi schedulers.
Đôi khi, sử dụng scheduler sai có thể có tác động tiêu cực đến hiệu suất ứng dụng, trong khi scheduler được chọn tốt có thể mang lại hiệu suất tuyệt vời