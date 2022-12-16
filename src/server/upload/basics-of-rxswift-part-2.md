Vậy chúng ta cũng đã biết một ít về RxSwift, nếu bạn chưa đọc part 1 có thể vào [đây để xem](https://viblo.asia/p/basics-of-rxswift-aWj53GP156m). 

Đôi lúc bạn muốn biến đổi, kết hợp hoặc lọc ra những phần tử được phát ra bởi một Observable Sequence trước khi những subscriber nhận chúng. Bây giờ chúng ta sẽ nói về những ```Operator``` hay dùng trong RxSwift.
## 4.  Transformations
### 4.1 Map
Biến đổi những Elements được phát ra từ một ```Observable``` trước khu chúng đến nhưng Subcribers, bạn sử dụng ```Map``` operator, ví dụ như hình vẽ
![](https://images.viblo.asia/cd5aab5c-35f7-4cab-8a5c-879e28e1b7d2.png)
```Swift 
Observable<Int>.of(1,2,3)
            .map {$0 * 2}
            .subscribe(onNext: { print($0) })
            .disposed(by: disposeBag)
```

### 4.2 FlatMap
Hãy tưởng tượng một ```Observable Sequence```  chứa những objects mà bản thân những objects đó là ```Observable``` và bạn muốn tạo một ```Sequence``` từ những cái đó. Đây là lúc sử dụng ```FlatMap```. ```FlatMap``` sẽ gộp những phần tử được phát từ những Observable và biến thành một ```Sequence```
![](https://images.viblo.asia/8fec84f4-dd3a-46f6-b0c4-843431652170.png)


```Swift
let sequence1 = Observable<Int>.of(1,2)
let sequence2 = Observable<Int>.of(1,2)

Observable.of(sequence1,sequence2)
            .flatMap{ return $0 }
            .subscribe(onNext:{ print($0)})
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
### 4.3 Scan
Scan bắt đầu với một giá trị khởi tạo và được kết hợp lại những giá trị giống với reduce trong Swift
![](https://images.viblo.asia/e0d9709b-33e4-468f-9d0d-76153fef79e8.png)
```Swift
Observable.of(1,2,3,4,5)
    .scan(0) { $0 + $1 }
    .subscribe(onNext:{ print($0)})
```

## 5.Filter
Nếu bạn muốn tác động tới sự kiện on Next dựa trên những tiêu chuẩn bạn đặt ra, bạn nên sử dụng filter

### 5.1 Filter
Hoạt động gần giống với Filter trong Swift, bạn định nghĩa một điều kiện, nếu thoả mãn điều kiện thì .next event sẽ đươc phát tới những subsriber
![](https://images.viblo.asia/866aafd2-962f-4984-90ae-6e86d5978ca3.png)
```Swift
Observable.of(1, 2, 3)
    .filter { $0 < 3 }
    .subscribe(onNext: { print($0) })
    .disposed(by: disposeBag)
```

### 5.2 DistinctUntilChanged
Nếu bạn chỉ muốn emit những element mà thay đổi so với element trước đó, bạn cần sử dụng ```distinctUntilChanged```
![](https://images.viblo.asia/45e5163c-ab0e-4e25-86a6-9dd80c74db84.png)

```Swift
Observable.of(1,2,2,1,3)
    .distinctUntilChanged()
    .subscribe(onNext:{ print($0)})
```

## 6.Combine
### 6.1 StartWith
Nếu bạn muốn một Observable phát ra một giá trị đặc biệt trước khi bắt đầu phát ra những giá trị bình thường, sử dụng ```startWith```
![](https://images.viblo.asia/23827292-2fee-4359-96c3-ca2134ca633a.png)


```Swift
Observable.of(2,3)
    .startWith(1)
    .subscribe(onNext:{ print($0) })
```

### 6.2 Merge
Kết hợp nhiều Observable thành một Observable
![](https://images.viblo.asia/1ac80967-7a3f-4029-b190-1fb023b3ebfa.png)

```Swift
let publish1 = PublishSubject<Int>()
let publish2 = PublishSubject<Int>()
Observable.of(publish1,publish2)
    .merge()
    .subscribe(onNext:{ print($0)})
    
publish1.onNext(20)
publish1.onNext(40)
publish1.onNext(60)
publish2.onNext(1)
publish1.onNext(80)
publish2.onNext(2)
publish1.onNext(100)
```

## 7. Side Effects
Nếu bạn muốn đăng ký callbacks khi một event cụ thể nào đó được thực hiện, bạn có thể dụng ```doOn``` trên Observable Sequence đó

* **do(onNext:)** - Thực hiện khi một next event xảy ra
* **do(onError:)** - Nếu errors được phát ra
* **do(onCompleted:)** - Nếu sequence hoàn thành thành công

```Swift
Observable.of(1,2,3,4,5)
    // Không có effect trên subscripion thực sự
    .do(onNext: { $0 * 10 }) 
    .subscribe(onNext:{ print($0) })
```

-----
Chúc mừng. Nếu bạn đã đọc đến đây bạn có thể biết một chút cơ bản của RxSwift rồi. Có khá nhiều thứ phải học, nhưng mọi thứ xung quanh Rx chỉ dựa trên những điều này thôi. 

Source: RxSwift. Reactive Programming with Swift (3rd Edition) - 2019