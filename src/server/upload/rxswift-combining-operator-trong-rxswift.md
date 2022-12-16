# Lời mở đầu:

-----


RxSwift là một Extension của ReactiveX được viết bằng ngôn ngữ Swift. Nó là sự kết hợp của Observer Pattern, Iterator Pattern và Functional Programing. RxSwift giúp cho công việc trở nên đơn giản hơn. RxSwift giúp tối giản và hạn chế việc sử dụng các Notifications và Delegate Pattern đi kèm với các câu lệnh if/else và các block code lồng nhau phức tạp trong code. Trong bài viết này, mình sẽ giới thiệu với các bạn về những Combining Operator thông dụng trong RxSwift.

# .startWith(: ) 

-----


![](https://images.viblo.asia/6c67069e-8f33-427a-bf1b-7d36e355a57d.png)
.startWith(: ) cho phép chúng ta tạo ra một element khởi tạo cho một Observable. Giá trị này bắt buộc phải có cùng kiểu dữ liệu với các element trong Observable và nó sẽ được gắn vào làm element đầu tiên của chuỗi Observable.
```swift
        let disposeBag = DisposeBag()

        let observable = Observable.of(2, 3, 4, 5, 6 ,7)
        observable.startWith(1)
            .subscribe { event in
                print(event)
            }
            .disposed(by: disposeBag)
```

Kết quả:
```
next(1)
next(2)
next(3)
next(4)
next(5)
next(6)
next(7)
completed
```

# .concat(: )

-----


![](https://images.viblo.asia/09d668d7-e075-470c-8cc6-d4cb91561c15.png)
.concat(: ) nối các chuỗi Observale con lại với nhau một cách tuần tự tạo thành một chuỗi Observable cha chứa tất cả các chuỗi Observable con. Toán tử này sẽ thực thi tuần tự các Observable đã được nối vào với nhau, chuỗi Observable nào đứng trước sẽ được thực thi trước, thực hiện xong một Observable này mới thực hiện tiếp Observable sau nó. Khi toàn bộ các chuỗi Observable con đều complete thì chuỗi Observable cha mới  complete. Trong trường hợp chuỗi Observable con emit ra Error thì chuỗi Observable cha cũng sẽ lập tức emit ra Error và terminate.
```swift
        let disposeBag = DisposeBag()
        
        let one = Observable.of(1, 2, 3)
        let two = Observable.of(4, 5, 6)
        let three = Observable.of(7, 8, 9)
        
        let observable = Observable.concat([one, two, three])
        observable
            .subscribe { event in
                print(event)
            }
            .disposed(by: disposeBag)
        
        one.concat(two).concat(three)
            .subscribe { event in
                print(event)
            }
            .disposed(by: disposeBag)
        
        Observable.just(1).concat(one)
            .subscribe { event in
                print(event)
            }
            .disposed(by: disposeBag)
```

Kết quả:
```
next(1)
next(2)
next(3)
next(4)
next(5)
next(6)
next(7)
next(8)
next(9)
completed
next(1)
next(2)
next(3)
next(4)
next(5)
next(6)
next(7)
next(8)
next(9)
completed
next(1)
next(1)
next(2)
next(3)
completed
```

# .merge( )

-----


![](https://images.viblo.asia/27648a2e-f975-4419-9546-6d1f8482d2d4.png)
- .merge( ) cho phép kết hợp nhiều Obseravble bằng cách gộp các emit của chúng lại với nhau thành một source Observable. Các element được gộp vào source Observable không theo một thứ tự nhất định, element nào tới trước thì sẽ được đưa vào source Observable trước.
- .merge() complete chỉ khi tất cả các Inner Sequence và source Observable đều complete.
- Các Inner Sequence hoạt động đọc lập không liên quan với nhau.
- Nếu bết kỳ Inner Sequence nào emit Error thì Source Observable ngay lập tức emit ra Error và terminate.
```swift
        let disposeBag = DisposeBag()
        
        let firstObservable = PublishSubject<String>()
        let secondObservable = PublishSubject<String>()
        
        Observable.merge(firstObservable, secondObservable)
            .subscribe { element in
                print(element)
            }
            .disposed(by: disposeBag)
        
        firstObservable.onNext("firstObservable 1")
        secondObservable.onNext("secondObservable 1")
        secondObservable.onNext("secondObservable 2")
        secondObservable.onNext("secondObservable 3")
        firstObservable.onNext("firstObservable 2")
        secondObservable.onNext("secondObservable 4")
```

Kết quả:
```
next(firstObservable 1)
next(secondObservable 1)
next(secondObservable 2)
next(secondObservable 3)
next(firstObservable 2)
next(secondObservable 4)
```

# .combineLatest(: : resultSelector: )

-----


![](https://images.viblo.asia/fb0d125a-6c7b-4852-85c8-79f3cd31d34e.png)
.combineLatest(: : resultSelector: ) cho phép ghép 2 Observale lại với nhau. Mỗi khi một trong 2 Observable con phát ra emit, thì nó sẽ ghép 2 element cuỗi cùng của mỗi Observable thành một element mới với kiểu dữ liệu là một tuple và trả về cho subscriber.
```swift
        let disposeBag = DisposeBag()
        
        let one = Observable.of(1, 2, 3)
        let two = Observable.of(4, 5, 6)

        let observable = Observable
            .combineLatest(one, two) { e1, e2 -> (Int, Int) in
                return (e1, e2)
            }
        observable
            .subscribe { event in
                print("event: \(event)")
            }
            .disposed(by: disposeBag)
```

Kết quả:
```
event: next((1, 4))
event: next((2, 4))
event: next((2, 5))
event: next((3, 5))
event: next((3, 6))
event: completed
```

# .zip(: : resultSelector: )

-----


![](https://images.viblo.asia/fb9aa837-8661-474b-bb11-b2bc68fdd0d1.png)
.zip(: : resultSelector: ) ghép các element có cùng index của 2 chuỗi Observable lại với nhau thành một element mới và trả về element đó cho subscriber. Nếu element của Observable thứ nhất không có element tương xứng với index ở Observable thứ 2 thì .zip(: : resultSelector: ) sẽ không emit ra element.
```swift
        let disposeBag = DisposeBag()
        
        let one = Observable.of(1, 2, 3, 7)
        let two = Observable.of(4, 5, 6)

        let observable = Observable
            .zip(one, two) { element1, element2 -> (Int, Int) in
                return (element1, element2)
            }
        observable
            .subscribe { event in
                print("event: \(event)")
            }
            .disposed(by: disposeBag)
```

Kết quả:
```
event: next((1, 4))
event: next((2, 5))
event: next((3, 6))
event: completed
```

# Tài liệu tham khảo:

-----


RxSwift - Reactive Programming with Swift