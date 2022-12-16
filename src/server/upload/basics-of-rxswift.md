Mỗi lập trình viên nên biết về Rx. Nhưng chính xác Reactive Programming là gì? Hãy tìm kiếm trên Internet một chút sẽ thấy:
> *In computing, **reactive programming** is a programming paradigm oriented around data flows and the propagation of change. This means that it should be possible to express static or dynamic data flows with ease in the programming languages used, and that the underlying execution model will automatically propagate changes through the data flow. — Wikipedia*

Không giấu gì, bản thân mình cũng như nhiều người khác đọc cũng không hiểu chính xác reactive programming là gì. Do đó mình đã viết bài này để có một cái nhìn tổng quan, dễ hiểu để giới thiệu Rx, để đơn giản hơn thì mình sẽ sử dụng ngôn ngữ Swift và bộ thư viện mình sử dụng là RxSwift
## 1. Observable Sequences
```observable```, ```observable sequence``` và ```sequence```  hay thậm chí ```stream``` từ ngôn ngữ reactive programming khác đều cùng một nghĩa. Nhưng trong RxSwift, hầu như sẽ gọi là sequence, không phải stream.

Và điều đầu tiên bạn cần hiểu là mọi thứ trong ```RxSwift``` là một ```observable squence```, một cái gì đó mà có thể phát ra thông báo (```emit```) khi có sự thay đổi bởi ```event```

Arrays, Strings hoặc Dictionaries sẽ được chuyển thành observable sequence trong RxSwift. Bạn có thể tạo một observable sequence của bất cứ Object nào mà conforms Sequence Protocol từ Swift Standard Library.

Một vài ví dụ đơn giản
```Swift
let justStringSequence = Observable.just("Hello Rx")
let fromArraySequence = Observable.from([1,2,3,4,5])
let fromDictSequence = Observable.from([6:"Viet",9:"Anh"])
```

Bạn lắng nghe (subscribe) tới observable sequence bằng cách gọi hàm
```Swift
subscribe(on:(Event<T>)-> ())
```
```Swift
let Sequence = Observable.of("Hello Rx")
let subscription = Sequence.subscribe { event in
  print(event)
}
//next("Hello Rx") 
//completed
```

Observable sequence có thể phát ra không hoặc nhiều events trong lifecycle của nó.

Trong RxSwift một Event chỉ là một kiểu Enum với 3 states:

* **.next**(value: T) — Khi một value hoặc collection của nhiều value được thêm vào một observable sequence, bản thân sequence sẽ gửi một next event tới subscribers .
* **.error**(error: Error) — Nếu xuất hiện một Error , sequence sẽ phát ra một error event. Đồng thời kết thúc sequence
* **.completed** — Nếu một sequence kết thúc thì nó sẽ gửi một completed event tới subscribers của chính nó

```Swift
let sequence = Observable.from(["V","i","e","t","-","a","n","h"])
let subscription = sequence.subscribe { event in
  switch event {
      case .next(let value):
          print(value)
      case .error(let error):
          print(error)
      case .completed:
          print("completed")
  }
}
//V i e t - a n h 
//completed
```

Nếu bạn muốn hủy một subscription, đơn giản là gọi ```dispose```. Hoặc thêm vào subscription một ```DisposeBag```, cơ chế hoạt động giống với ARC, tự động hủy một subscription khi **deinit** *DisposeBag* Instance.
```Swift
// Khởi tạo một DisposeBag để subscribtion tự động hủy
let bag = DisposeBag()
// Tạo một Observable Sequence để phát ra một value kiểu String
let sequence = Observable.just("Hello Rx!")
// Tạo a subscription chỉ cho next events
let subscription = sequence.subscribe (onNext:{ 
    print($0)
})
// Thêm bag vào Subscription
subscription.disposed(by: bag)
```
## 2. Subjects
```Subject``` là một form đặc biệt của Observable Sequence, bạn có thể subscribe và thêm element cho nó. Có 4 loại ```Subject``` trong ```RxSwift```

* **PublishSubject**: khi muốn subscribers được thông báo new events từ thời điểm chúng subscribed, cho đến khi hoặc unsubscribe hoặc subject bị terminated với một .completed or .error event
* **BehaviourSubject**: Hoạt động gần giống publish subject, ngoại trừ chúng sẽ lặp lại element cuối của **.next** event tới **subscriber** mới. Bởi vì ```BehaviorSubject``` luôn luôn emit the latest element, do đó phải tạo đối tượng với một giá trị khởi tạo. Nếu như không có giá trị khởi tạo, thì có nghĩa là cần sử dụng PublishSubject
* **ReplaySubject**: Nếu bạn muốn lặp lại nhiều hơn element cuối cùng cho subscriber mới có lẽ bạn cần ```ReplaySubject```. Với cái này bạn có thể định nghĩa bao nhiêu item gần nhất bạn muốn emit tới subscirber mới
* **PublishRelay và BehaviorRelay**:  Cách sử dụng giống với tên Subject, chỉ khác là nó chỉ chấp nhận **.next** event, phù hợp cho sequence không terminate

Mình chỉ demo mỗi ```PublishSubject``` thôi nha, các bạn có thể tự thử thêm

Việc đầu tiên là tạo một ```PublishSubject``` instance.
```Swift
let bag = DisposeBag()
var publishSubject = PublishSubject<String>()
```

Bạn có thể thêm value tới sequence này bằng cách dùng **onNext()**, tương tự với **onCompleted()** sẽ kết thức sequence và **onError(error)** sẽ phát ra một error event
```Swift
publishSubject.onNext("Hello")
publishSubject.onNext("World")
```
Điều cần chú ý ở đây là nếu bạn **subscirbe** subject này SAU KHI sử dụng onNext() thì bạn sẽ không nhận những value trước đó, với ví dụ trên sẽ không nhận "Hello" và "World". Ngược lại một ```BehaviourSubject``` sẽ nhận "World" vì nó là element cuối trong **.next** event

Bây giờ chúng ta sẽ tạo một subscription và add thêm vài value tới Subject, chúng ta cũng sẽ tạo một subscription thứ hai và add thêm nhiều value
```Swift
let subscription1 = publishSubject.subscribe(onNext:{
  print($0)
}).disposed(by: bag)
// Subscription1 sẽ nhận 2 events này, còn Subscription2 sẽ không
publishSubject.onNext("Hello")
publishSubject.onNext("Again")

// Subscription2 sẽ không nhận "Hello" and "Again" bởi vì nó subscribe sau
let subscription2 = publishSubject.subscribe(onNext:{
  print(#line,$0)
})
publishSubject.onNext("Both Subscriptions receive this message")
```
## 3. Marble Diagrams
Nếu làm việc với RxSwift nói riêng hay Rx nói chung thì chúng ta cũng nên biết về ```Marble Diagrams```. Một ```Marble Diagrams``` cho ta một cái nhìn về sự thay đổi của một observable sequence. Nó chứa một luồng input ở dòng đầu tiên, luồng output sau đó và một function sử dụng để hiện ra output như vậy.

![](https://images.viblo.asia/cd5aab5c-35f7-4cab-8a5c-879e28e1b7d2.png)

Dễ hiểu mà phải không?

-----
Chúc mừng. Nếu bạn đã đọc đến đây bạn có thể biết một chút cơ bản của RxSwift rồi. Có khá nhiều thứ phải học, nhưng mọi thứ xung quanh Rx chỉ dựa trên những điều này thôi. Hẹn các bạn ở bài viết tiếp theo của mình về RxSwift nha.

Source: RxSwift. Reactive Programming with Swift (3rd Edition) - 2019