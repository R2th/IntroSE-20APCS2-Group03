# Kiến thức cơ bản về RxSwift
![](https://images.viblo.asia/6352f98f-c24f-4ca2-ad56-a22bf7a4ef70.png)

Bài viết với mong muốn cung cấp thông tin cơ bản về kiến trúc, các thuật ngữ được sử dụng phổ biến về RxSwift, giúp những lập trình viên lần đầu làm quen RxSwift sẽ trở nên dễ dàng hơn.

Trong bài viết có sử dụng một số từ khóa tiếng Anh, mình xin phép sẽ giữ nguyên bản không sử dụng tiếng Việt vì có lẽ sẽ dễ hiểu hơn cho người đọc.

# Observable Sequences
Mọi hoạt động trong RxSwift từ việc đăng ký và xử lý sự kiện đều thông qua một **Observable Sequences**
Trong **RxSwift**, các kiểu dữ liệu như **Arrays**, **Strings** hoặc **Dictionary**  sẽ được convert sang **Observable Sequences**. Ta có thể tạo ra "Observable Sequences" của bất kỳ kiểu đối tượng nào tuân theo **Sequence Protocol** của **Swift Standard Library**.

```
let helloSequence = Observable.just("Hello Rx")
let fibonacciSequence = Observable.from([0,1,1,2,3,5,8])
let dictSequence = Observable.from([1:"Hello",2:"World"])
```

Đăng ký nhận event từ ""Observable Sequences"  thông qua lời gọi hàm
**subscribe(on:(Event<T>)-> ())**
    
```
let helloSequence = Observable.of("Hello Rx")
let subscription = helloSequence.subscribe { event in
  print(event)
}

OUTPUT: 
next("Hello Rx") 
completed
```

**Observable sequences** sẽ gửi các event trong thời gian tồn tại của nó. Trong **RxSwift** thì một Event là một **Enumeration Type** với 3 trạng thái:

- .**next(value: T)** :  xảy ra khi một hay một tập hợp các giá trị được bổ sung thêm vào **Observable sequences**, nó sẽ gửi **next event** cho  các **subscribers** đã đăng ký ở ví dụ trên.
- **.error(error: Error)** : xảy ra khi có lỗi và  kết thúc **Observable sequences**.
- **.completed** : nếu **Observable sequences** hoạt động bình thường và kết thúc không có lỗi thì **completed event** sẽ được gửi cho các **subscribers**

```
let helloSequence = Observable.from(["H","e","l","l","o"])
let subscription = helloSequence.subscribe { event in
  switch event {
      case .next(let value):
          print(value)
      case .error(let error):
          print(error)
      case .completed:
          print("completed")
  }
}

OUTPUT:
H e l l o 
completed
```

Để hủy đăng ký nhận sự kiện ta có thể sử dụng hàm **dispose** hoặc thêm đăng ký vào **Disposebag** để tự động hủy đăng ký khi đối tượng **DisposeBag** gọi hàm hủy **deinit**

Ta có thể đăng ký chỉ nhận một sự kiện nào đó, ví dụ đăng ký chỉ nhận sự kiện khi có phát sinh lỗi thông qua cú pháp sau **subscribe(onError:(Error->())).**

```
// Creating a DisposeBag so subscribtion will be cancelled correctly
let bag = DisposeBag()
// Creating an Observable Sequence that emits a String value
let observable = Observable.just("Hello Rx!")
// Creating a subscription just for next events
let subscription = observable.subscribe (onNext:{ 
    print($0)
})
// Adding the Subscription to a Dispose Bag
subscription.addDisposableTo(bag)
```

# Subjects
**Subject** là một dạng đặc biệt của **Observable Sequence**, ta có thể đăng ký và bổ sung thêm thành phần trong một **Subject**. Trong RxSwift có 4 loại **Subject**:

- **PublishSubject**: ta sẽ nhận được tất cả các sự kiện phát sinh sau khi đăng ký **PublishSubject**.
- **BehaviourSubject**:  sẽ gửi sự kiện phát sinh gần đây nhất và những sự kiện phát sinh sau khi đăng ký .**BehaviourSubject**.
- **ReplaySubject**:  cho phép ta cấu hình sẽ nhận được bao nhiêu sự kiện phát sinh gần đây nhất khi có một đăng ký mới thiết lập.
- **Variable**: là wrapper của **BehaviourSubject** giúp việc sử dụng **BehaviourSubject** dễ dàng hơn.

Sự khác biệt giữa 4 loại **Subject**  trên chính là số lượng event trong quá khứ có thể nhận sau khi đăng ký.

```
Publish: 0
Behaviour & Variable: 1
Replay: N
```

Dưới đây là một ví dụ về PublishSubject.
Trước tiên ta cần phải khởi tạo một PublishSubject:

```
let bag = DisposeBag()
var publishSubject = PublishSubject<String>()
```

Ta có thể thêm giá trị vào chuỗi sự kiện thông qua hàm onNext().
Kết thúc chuỗi sự kiện thông qua hàm **onCompleted**.
Phát sinh lỗi trong chuỗi sự kiện thông qua hàm **onError(error)**

```
publishSubject.onNext("Hello")
publishSubject.onNext("World")
```

Như giải thích ở trên, sự khác biệt giữa **PublishSubject** và **BehaviorSubject** đó là **PublishSubject** sẽ không gửi các event đã phát sinh trước đó cho một đăng ký mới. Đoạn code dưới đây sẽ minh họa chi tiết cho đặc điểm này của **PublishSubject**

```
let subscription1 = publishSubject.subscribe(onNext:{
  print($0)
}).addDisposableTo(bag)
// Subscription1 receives these 2 events, Subscription2 won't
publishSubject.onNext("Hello")
publishSubject.onNext("Again")
// Sub2 will not get "Hello" and "Again" because it susbcribed later
let subscription2 = publishSubject.subscribe(onNext:{
  print(#line,$0)
})
publishSubject.onNext("Both Subscriptions receive this message")
```

# Các phép biến đổi
RxSwift cung cấp các phép biến đổi cho phép người dùng biến đổi các giá trị trước khi phát sinh và gửi sự kiện đến các subscriber.

## Map
Phép biến đổi Map cho phép ta thực hiện biến đổi ứng với từng phần tử trong Observable Sequence trước khi gửi tới Subscriber.

![](https://images.viblo.asia/4e827201-fcf0-4abe-9a92-40cfb2a6f840.png)

```
Observable<Int>.of(1,2,3,4).map { value in 
  return value * 10
}.subscribe(onNext:{
  print($0)
})

OUTPUT: 10 20 30 40
```

## FlatMap
Giả sử ta có một Observable Sequence cấu thành từ các đối tượng Observable, và ta muốn tạo một Observable Sequence từ các đối tượng này, thì phép biến đổi FlatMap sẽ cho phép thực hiện mong muốn trên.

![](https://images.viblo.asia/6c7f1652-ea3f-420c-aabe-b74da52e9fe4.png)

```
let sequence1  = Observable<Int>.of(1,2)
let sequence2  = Observable<Int>.of(1,2)
let sequenceOfSequences = Observable.of(sequence1,sequence2)
sequenceOfSequences.flatMap{ return $0 }.subscribe(onNext:{
    print($0)
})
    
OUTPUT: 1 2 1 2
```

## Scan
Phép biến đổi **Scan** cho phép tổng hợp các kết quả trước đó giống như phép **Reduce** trong **Swift**

![](https://images.viblo.asia/9097db3d-f68b-41ed-ba97-1d69159f6731.png)

```
Observable.of(1,2,3,4,5).scan(0) { seed, value in
    return seed + value
}.subscribe(onNext:{
    print($0)
})

OUTPUT: 1 3 6 10 15
```

## Buffer
Phép biến đổi Buffer cho phép biến đổi các item trong Observable thành các Observerable tập hợp từ các item trong Observable gốc.

![](https://images.viblo.asia/04c167a7-78d7-4a59-9793-32f99962e03e.png)

```
SequenceThatEmitsWithDifferentIntervals
          .buffer(timeSpan: 150, count: 3, scheduler:s)
          .subscribe(onNext:{
    print($0)
})

OUTPUT: [1] [2,3] [4] [5,6] [7] [] 
```

# Các phép xử lý lọc
Phép lọc được sử dụng khi ta chỉ muốn nhận event trong một số điều kiện nhất định. RxSwift cung cấp cho người dùng nhiều cơ chế lọc khác nhau. Sau đây ta sẽ đi vào chi tiết các phép lọc này.

## Filter
Phép xử lý **Filter** trong **RxSwift** cũng giống như filter trong Swift, .next(event) sẽ phát sinh khi thỏa mãn các điều kiện đã đăt ra.

![](https://images.viblo.asia/88d85b8d-0eae-432e-a782-8c8faa027bc6.png)

```
Observable.of(2,30,22,5,60,1).filter{$0 > 10}.subscribe(onNext:{
      print($0)
})

OUTPUT: 30 22 60
```

## DistinctUntilChanged
Khi sử dụng **DistinctUntilChanged** thì sự kiện chỉ phát sinh khi giá trị sau khác với giá trị trước đó
![](https://images.viblo.asia/5304e84d-5c80-4c43-8105-4b4243ac4829.png)

```
Observable.of(1,2,2,1,3).distinctUntilChanged().subscribe(onNext:{
    print($0)
})

OUTPUT: 1 2 1 3
```

Ngoài ra RxSwift còn có các phép filter khác như:
- Debounce
- TakeDuration
- Skip
# Các phép xử lý kết hợp
RxSwift cung cấp nhiều cơ chế xử lý kết hợp khác nhau. Dưới đây ta sẽ đi vào 3 phép xử lý kết hợp phổ biến nhất.

## StartWith
**StartWith** được sử dụng khi ta muốn phát sinh sự kiện với một tập giá trị nào đó, sau đó mới phát sinh các tập giá trị được định nghĩa trong Observable.

![](https://images.viblo.asia/698cfa0a-ba17-440f-b8d6-30ce66d1d3a9.png)https://images.viblo.asia/5304e84d-5c80-4c43-8105-4b4243ac4829.png
```
Observable.of(2,3).startWith(1).subscribe(onNext:{
    print($0)
})

OUTPUT: 1 2 3
```

## Merge
Phép xử lý **Merge** cho phép kết hợp nhiều **Observable** khác nhau thành một **Observerable**.

![](https://images.viblo.asia/9de53c3c-bf9c-40a0-b21d-ae35e9e9932c.png)

```
let publish1 = PublishSubject<Int>()
let publish2 = PublishSubject<Int>()
Observable.of(publish1,publish2).merge().subscribe(onNext:{
    print($0)
})
publish1.onNext(20)
publish1.onNext(40)
publish1.onNext(60)
publish2.onNext(1)
publish1.onNext(80)
publish2.onNext(2)
publish1.onNext(100)
OUTPUT: 20 40 60 1 80 2 100
```

## Zip
Phép xử lý Zip sẽ kết hợp các Observable sequence thành một bằng cách lần lượt kết hợp phần tử có cùng số thứ tự trong các  Observable sequence, ví dụ: kết hợp phần tử thứ nhất trong Observable sequence thứ nhất, với phần tử thứ nhất trong Observable sequence thứ 2, tương tự với các phần tử còn lại trong Observable Sequence. Số lượng event sẽ phát sinh sẽ bằng với Observable sequence có số lượng phần tử ít nhất.

![](https://images.viblo.asia/801037a5-b42e-4464-a5f3-bd118963d2fb.png)

```
let a = Observable.of(1,2,3,4,5)
let b = Observable.of("a","b","c","d")
Observable.zip(a,b){ return ($0,$1) }.subscribe {
    print($0)
}
OUTPUT: (1, "a")(2, "b") (3, "c") (4, "d")
```

Ngoài ra ta có thể sử dụng các phép xử lý kết hợp khác của RxSwift như:
- Concat
- CombineLatest
- SwitchLatests

# Schedulers 
Các operator sẽ chạy trên cùng một thread với thread khi subscriber đăng ký.
RxSwift cho phép người dùng sử dụng các Schedulers để  chỉ định các operator sẽ xử lý trong queue nào thông qua hàm **subscribleOn**.
Và chỉ định sẽ gửi thông báo trên queue nào thông qua hàm **observeOn**.
Và cơ chế hoạt động của Scheduler sẽ tương tự cơ chế hoạt động của GCD và OperationQueue trong Swift.

```
let publish1 = PublishSubject<Int>()
let publish2 = PublishSubject<Int>()
let concurrentScheduler = ConcurrentDispatchQueueScheduler(qos: .background)
Observable.of(publish1,publish2)
          .observeOn(concurrentScheduler)
          .merge()
          .subscribeOn(MainScheduler())
          .subscribe(onNext:{
    print($0)
})
publish1.onNext(20)
publish1.onNext(40)
    
OUTPUT: 20 40
``` 

# Kết luận
Mong rằng qua những ví dụ nhỏ trên, mọi người sẽ dễ dàng hơn trong việc làm quen với RxSwift.

# Nguồn tham khảo
- https://medium.com/ios-os-x-development/learn-and-master-%EF%B8%8F-the-basics-of-rxswift-in-10-minutes-818ea6e0a05b
- http://reactivex.io/