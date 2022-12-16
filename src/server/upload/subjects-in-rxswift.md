Subject trong RxSwift hoạt động như vừa là một Observable, vừa là một Observer. Khi một Subject nhận một .next event thì ngay lập tức nó sẽ phát ra các emit cho các subscriber của nó. Không chỉ vậy Subject còn được chia ra làm 4 loại: PublishSubject, BehaviorSubject, ReplaySubject, Variable với từng mục đích sử dụng. Chính vì những lý do như vậy nên Subject được sử dụng khá là phổ biến khi chúng ta làm việc với RxSwift.

## Publish Subject
Publish subjects được sử dụng khi bạn chỉ muốn subscribers được thông báo về các sự kiện mới từ thời điểm bạn subscribe cho đến khi hủy subscribe hoặc Subject đã chấm dứt với sự kiện khi .completed hoặc .error.
Hãy thử một ví dụ để hiểu rõ hơn về Publish Subject:
```
let bag = DisposeBag()
//khởi tạo một PublishSubject kiểu String
let publishSubject = PublishSubject<String>()

//Phát ra một emit với chuỗi String "Emit 1"
publishSubject.onNext("Emit 1")

//tạo ra một Subscriber để lắng nghe sự kiện từ subject
let subscriberOne = publishSubject.subscribe { element in 
    print("subscriber 1: \(element)")
}
subscriberOne.disposed(by: bag)
        
publishSubject.onNext("Emit 2") //Phát ra một emit với chuỗi String "Emit 2"
publishSubject.onNext("Emit 3") //Phát ra một emit với chuỗi String "Emit 3"
```

**Lưu ý:** Tất cả các subject khi đã terminate thì vẫn re-emit stop event cho các subscriber mới trong tương lai. Chúng ta có thể thấy rõ điều đó thông qua ví dụ sau
```
let bag = DisposeBag()

//khởi tạo một PublishSubject kiểu String
let publishSubject = PublishSubject<String>()
        
//Phát ra một emit với chuỗi String "Emit 1"
publishSubject.onNext("Emit 1")
        
//tạo ra một Subscriber để lắng nghe sự kiện từ subject
let subscriberOne = publishSubject.subscribe { element in
    print("subscriber 1: \(element)")
}
subscriberOne.disposed(by: bag)
        
publishSubject.onNext("Emit 2") //Phát ra một emit với chuỗi String "Emit 2"
publishSubject.onNext("Emit 3") //Phát ra một emit với chuỗi String "Emit 3"
publishSubject.onCompleted() //terminate Subject 
        
//tạo ra một Subscriber mới
let subscriberTwo = publishSubject.subscribe { element in
    print("subscriber 2: \(element)")
}
subscriberTwo.disposed(by: bag)
```
Kết quả in ra sẽ là:
```
subscriber 1: next(Emit 2)
subscriber 1: next(Emit 3)
subscriber 1: completed
subscriber 2: completed
```
Chúng ta có thể thấy là subscriber 2 đã lắng nghe sau khi publish subject emit sự kiện complete nhưng vẫn có thể lắng nghe được.

## BehaviorSubject
BehaviorSubject hoạt động tương tự như PublishSubject, nhưng chỉ khác ở chỗ BehaviorSubject khởi đầu với một giá trị và replay lại giá trị đó hoặc .next event cuối cùng của observable cho một Subscriber mới. Hãy cũng tìm hiểu ví dụ sau:
```
let bag = DisposeBag()
//Khởi tạo một BehaviorSubject kiểu String với giá trị ban đầu là "Initial Value"
let behaviorSubject = BehaviorSubject<String>(value: "Initial Value")
        
//Phát ra một emit với giá trị "Emit 1"
behaviorSubject.onNext("Emit 1")
        
print("- Subscribe here -")
let subscriber = behaviorSubject.subscribe { element in
    print("Subscriber: \(element)")
}
subscriber.disposed(by: bag)
        
behaviorSubject.onNext("Emit 2")
behaviorSubject.onNext("Emit 3")
```
Chúng ta thu được kết quả
```
Subscriber: next(Emit 1)
Subscriber: next(Emit 2)
Subscriber: next(Emit 3)
```
Subscriber vẫn nhận được "Emit 1" bởi tại thời điểm nó subscribe thì "Emit 1" chính là element cuối cùng trong Observable của subject nên subject đã replay lại element này cho subscriber.

## ReplaySubject
Được khởi tạo với một kích thước bộ đệm và sẽ chứa số lượng các emit gần nhất bằng với kích thước bộ đệm đã khai báo. ReplaySubject sẽ replay lại tất cả các emit trong bộ đệm cho subscriber ngay khi subscriber đăng ký. Nó giống với Behavior Subject nhưng thay vì chỉ có thể lưu trữ event cuối cùng để bắn cho subscriber mới thì ReplaySubject có buffer size - số lượng event lưu trữ để bắn lại chó subscriber mới.
```
let bag = DisposeBag()
//khởi tạo một ReplaySubject kiểu String với size của buffer là 2
let replaySubject = ReplaySubject<String>.create(bufferSize: 2)
        
replaySubject.onNext("Emit 1") //Phát ra một emit với String "Emit 1"
replaySubject.onNext("Emit 2") //Phát ra một emit với String "Emit 2"
replaySubject.onNext("Emit 3") //Phát ra một emit với String "Emit 3"
        
print("- Before subscribe -")
//tạo ra một Subscriber để lắng nghe sự kiện từ replaySubject
let subscriber = replaySubject.subscribe { element in
    print("Subscriber: \(element)")
}
subscriber.disposed(by: bag)
print("- After subscribe -")
        
replaySubject.onNext("Emit 4")
replaySubject.onNext("Emit 5")
```
Kết quả sẽ là: 
```
- Before subscribe -
Subscriber: next(Emit 2)
Subscriber: next(Emit 3)
- After subscribe -
Subscriber: next(Emit 4)
Subscriber: next(Emit 5)
```

## Variable
Lưu trữ dữ liệu hiện tại của BehaviorSubject như một state và replay duy nhất giá trị khởi tạo hoặc giá trị cuối cùng của dữ liệu cho subscriber mới.
```
let bag = DisposeBag()
//Khởi tạo một Variable với giá trị khởi tạo là "Initial Value"
let variableSubject = Variable("Initial Value")
        
let subscriber = variableSubject.asObservable()
    .subscribe { value in
        print("Subscriber: \(value)")
    }
subscriber.disposed(by: bag)
        
variableSubject.value = "New value"
```
Kết quả:
```
Subscriber: next(Initial Value)
Subscriber: next(New value)
```

## Kết luận & Tài liệu tham khảo
Như vậy mình đã giới thiệu về các loại subject cơ bản, mục đích và cách sử dụng chúng. Mong sẽ giúp đỡ các bạn trong viẹc tìm hiểu về RxSwift.

**Refs:** RxSwift: Reactive Programming with Swift by the raywendrich.com Tutorial Team