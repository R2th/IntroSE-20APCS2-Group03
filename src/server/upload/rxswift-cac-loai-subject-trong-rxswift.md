## 1. Khái niệm:
**Subject** trong RxSwift hoạt động như vừa là một **Observable**, vừa là một **Observer**. Khi một **Subject** nhận một **.next** event thì ngay lập tức nó sẽ phát ra các element cho các **subscriber** của nó.
## 2. Khái quát:
Trong RxSwift, chúng ta có 4 loại Subject với các cách thức hoạt động khác nhau, bao gồm:
- **PublishSubject**: Khởi đầu "empty" và chỉ emit các element mới cho subscriber của nó.
- **BehaviorSubject**: Khởi đầu với một giá trí khởi tạo và sẽ relay lại element cuối cùng của chuỗi cho Subscriber mới.
- **ReplaySubject**: Khởi tạo với một kích thước bộ đệm cố định, sau đó sẽ lưu trữ các element gần nhất vào bộ đệm này và relay lại các element chứa trong bộ đệm cho một Subscriber mới.
- **Variable**: Lưu trữ một giá trị như một state và sẽ relay duy nhất giá trị cuối cùng cho Subscriber mới.
## 3. Chi tiết:
### 3.1. PublishSubject:
Publish subjects được sử dụng khi bạn chỉ muốn subscribers được thông báo về các sự kiện mới từ thời điểm bạn subscribe cho đến khi hủy subscribe hoặc Subject đã chấm dứt với sự kiện khi .completed hoặc .error

![](https://images.viblo.asia/5b1e1939-0e67-4653-8675-a1785cada6a5.png)
Để hiểu sâu hơn về cách thức hoạt động của PublishSubject chúng ta hãy cùng theo dõi một ví dụ
``` swift
let bag = DisposeBag()
let publishSubject = PublishSubject<String>() //khởi tạo một PublishSubject kiểu String

publishSubject.onNext("Emit 1") //Phát ra một emit với chuỗi String "Emit 1"
        
let subscriberOne = publishSubject.subscribe { element in //tạo ra một Subscriber để lắng nghe sự kiện từ subject
    print("subscriber 1: \(element)")
}
subscriberOne.disposed(by: bag)
        
publishSubject.onNext("Emit 2") //Phát ra một emit với chuỗi String "Emit 2"
publishSubject.onNext("Emit 3") //Phát ra một emit với chuỗi String "Emit 3"
```

Chúng ta thu được kết quả như sau
```
subscriber 1: next(Emit 2)
subscriber 1: next(Emit 3)
```

***Lưu ý:** Tất cả các subject khi đã terminate thì vẫn re-emit stop event cho các subscriber mới trong tương lai. Chúng ta có thể thấy rõ điều đó thông qua ví dụ sau
```swift
let bag = DisposeBag()
let publishSubject = PublishSubject<String>() //khởi tạo một PublishSubject kiểu String
        
publishSubject.onNext("Emit 1") //Phát ra một emit với chuỗi String "Emit 1"
        
let subscriberOne = publishSubject.subscribe { element in //tạo ra một Subscriber để lắng nghe sự kiện từ subject
    print("subscriber 1: \(element)")
}
subscriberOne.disposed(by: bag)
        
publishSubject.onNext("Emit 2") //Phát ra một emit với chuỗi String "Emit 2"
publishSubject.onNext("Emit 3") //Phát ra một emit với chuỗi String "Emit 3"
publishSubject.onCompleted() //terminate Subject 
        
print("- - - - - - -")
        
let subscriberTwo = publishSubject.subscribe { element in //tạo ra một Subscriber mới
    print("subscriber 2: \(element)")
}
subscriberTwo.disposed(by: bag)
```

Kết quả
```
subscriber 1: next(Emit 2)
subscriber 1: next(Emit 3)
subscriber 1: completed
- - - - - - -
subscriber 2: completed
```

### 3.2 BehaviorSubject:
BehaviorSubject hoạt động tương tự như PublishSubject, nhưng chỉ khác ở chỗ BehaviorSubject khởi đầu với một giá trị và replay lại giá trị đó hoặc .next event cuối cùng của observable cho một Subscriber mới.

![](https://images.viblo.asia/9eee5c32-953a-4fb9-8791-114547159e8e.png)
Chúng ta cũng theo dõi ví dụ sau
```swift
let bag = DisposeBag()
let behaviorSubject = BehaviorSubject<String>(value: "Initial Value") //Khởi tạo một BehaviorSubject kiểu String với giá trị ban đầu là "Initial Value"
        
behaviorSubject.onNext("Emit 1") //Phát ra một emit với giá trị "Emit 1"
        
print("- Subscribe here -")
let subscriber = behaviorSubject.subscribe { element in //Subscribe subject
    print("Subscriber: \(element)")
}
subscriber.disposed(by: bag)
        
behaviorSubject.onNext("Emit 2")
behaviorSubject.onNext("Emit 3")
```
Chúng ta thu được kết quả
```
- Subscribe here -
Subscriber: next(Emit 1)
Subscriber: next(Emit 2)
Subscriber: next(Emit 3)
```
Subscriber vẫn nhận được "Emit 1" bởi tại thời điểm nó subscribe thì "Emit 1" chính là element cuối cùng trong Observable của subject nên subject đã replay lại element này cho subscriber.

### 3.3 ReplaySubject:
Được khởi tạo với một kích thước bộ đệm và sẽ chứa số lượng các element gần nhất bằng với kích thước bộ đệm đã khai báo. ReplaySubject sẽ replay lại tất cả các element trong bộ đệm cho subscriber ngay khi subscriber đăng ký.

![](https://images.viblo.asia/68c3029c-7947-4fa3-a45f-c53a7cb7339d.png)
Để hiểu rõ hơn về cơ hế hoạt động của ReplaySubject, chúng ta cùng theo dõi ví dụ dưới
```swift
let bag = DisposeBag()
let replaySubject = ReplaySubject<String>.create(bufferSize: 2) //khởi tạo một ReplaySubject kiểu String với size của buffer là 2
        
replaySubject.onNext("Emit 1") //Phát ra một emit với String "Emit 1"
replaySubject.onNext("Emit 2") //Phát ra một emit với String "Emit 2"
replaySubject.onNext("Emit 3") //Phát ra một emit với String "Emit 3"
        
print("- Before subscribe -")
let subscriber = replaySubject.subscribe { element in //tạo ra một Subscriber để lắng nghe sự kiện từ replaySubject
    print("Subscriber: \(element)")
}
subscriber.disposed(by: bag)
print("- After subscribe -")
        
replaySubject.onNext("Emit 4")
replaySubject.onNext("Emit 5")
```
Chúng ta được kết quả
```
- Before subscribe -
Subscriber: next(Emit 2)
Subscriber: next(Emit 3)
- After subscribe -
Subscriber: next(Emit 4)
Subscriber: next(Emit 5)
```

Giờ chúng ta thử tăng buffer size lên 3 trong đoạn code trên xem thu được kết quả ra sao nhé
```swift
let replaySubject = ReplaySubject<String>.create(bufferSize: 3)
```
Kết quả
```
- Before subscribe -
Subscriber: next(Emit 1)
Subscriber: next(Emit 2)
Subscriber: next(Emit 3)
- After subscribe -
Subscriber: next(Emit 4)
Subscriber: next(Emit 5)
```

### 3.4 Variable:
Lưu trữ dữ liệu hiện tại của BehaviorSubject như một state và replay duy nhất giá trị khởi tạo hoặc giá trị cuối cùng của dữ liệu cho subscriber mới.
```swift
let bag = DisposeBag()
let variableSubject = Variable("Initial Value") //Khởi tạo một Variable với giá trị khởi tạo là "Initial Value"
        
let subscriber = variableSubject.asObservable()
    .subscribe { value in
        print("Subscriber: \(value)")
    }
subscriber.disposed(by: bag)
        
variableSubject.value = "New value"
```
Kết quả
```
Subscriber: next(Initial Value)
Subscriber: next(New value)
```
Tuy nhiên, Variable trong tương lai sẽ không còn được sử dụng thay vào đó chúng ta sẽ sử dụng **BehaviorRelay**.  **BehaviorRelay** nằm trong RxCocoa, nhưng nó tương tự như **Variable**, chỉ khác về mặt cú pháp khai báo và sử dụng nó.
```swift
let bag = DisposeBag()
let behaviorRelay = BehaviorRelay<Bool>(value: false)
        
let subscriber = behaviorRelay.asObservable()
    .subscribe { element in
        print("Subscriber: \(element)")
    }
subscriber.disposed(by: bag)
        
behaviorRelay.accept(false)
behaviorRelay.accept(true)
```
Kết quả
```
Subscriber: next(false)
Subscriber: next(false)
Subscriber: next(true)
```
## 4. Tài liệu tham khảo:
- RxSwift - Reactive Programming with Swift - Third Edition