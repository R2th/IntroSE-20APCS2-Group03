# Lời mở đầu:

-----


RxSwift là một Extension của ReactiveX được viết bằng ngôn ngữ Swift. Nó là sự kết hợp của Observer Pattern, Iterator Pattern và Functional Programing. RxSwift giúp cho công việc trở nên đơn giản hơn. RxSwift giúp tối giản và hạn chế việc sử dụng các Notifications và Delegate Pattern đi kèm với các câu lệnh if/else và các block code lồng nhau phức tạp trong code. Trong bài viết này, mình sẽ giới thiệu với các bạn về những cách để tạo ra một Observable trong RxSwift.

# .just( ):

-----


.just( ) là một phương thức trong RxSwift, nó giúp tạo ra một Observable chỉ với duy nhất một element. Ngay khi được gọi, Observable.just( ) sẽ emit ra một element duy nhất và sau đó sẽ terminate.
```swift
        let disposeBag = DisposeBag()
        let observable = Observable.just("this is element")
        observable.subscribe { element in
            print(element)
        }
        .disposed(by: disposeBag)
```

Kết quả:
```
        next(this is element)
        completed
```

# .of( ):

-----


.of( ) cho phép khởi tạo một Observable với một chuỗi các phần tử cho trước. Kiểu dữ liệu của Observable sẽ là kiểu dữ liệu của các phần tử được truyền vào. Các phần tử sẽ lần lượt được emit theo thứ tự truyền vào, sau đó Observable sẽ terminate.
```swift
        let disposeBag = DisposeBag()
        let observable = Observable.of(2, 5, 1, 3, 6, 4)
        observable.subscribe { element in
            print(element)
        }
        .disposed(by: disposeBag)
```

Kết quả:
```
        next(2)
        next(5)
        next(1)
        next(3)
        next(6)
        next(4)
        completed
```

# .from( ):

-----


.from( ) cho phép khởi tạo một Observable với một chuỗi các phần tử trong một mảng cho trước. Kiểu dữ liệu của Observable sẽ là kiểu dữ liệu của các phần tử trong mảng. Các phần tử sẽ lần lượt được emit theo thứ tự trong mảng, sau đó Observable sẽ terminate.
```
        let disposeBag = DisposeBag()
        let observable = Observable.from([2, 5, 1, 3, 6, 4])
        observable.subscribe { element in
            print(element)
        }
        .disposed(by: disposeBag)
```

Kết quả:
```
        next(2)
        next(5)
        next(1)
        next(3)
        next(6)
        next(4)
        completed
```

# .empty( ):

-----


.empty( ) cho phép tạo ra một Observable nhưng không có bất kỳ element nào cả. Observable sẽ chỉ emit ra duy nhất một sự kiện .completed để terminate.
```swift
        let disposeBag = DisposeBag()
        let observable = Observable<Void>.empty()
        observable.subscribe(
            onNext: { element in
                print(element)
            },
            onError: {error in
                print(error)
            },
            onCompleted: {
                print("onCompleted")
            },
            onDisposed: {
                print("onDisposed")
            })
            .disposed(by: disposeBag)
```

Kết quả:
```
        onCompleted
        onDisposed
```

# .never( ):

-----


.never( ) cho phép tạo ra một Observable không có bất kỳ element nào cả và cũng không bao giờ terminate.
```swift
        let disposeBag = DisposeBag()
        let observable = Observable<Void>.never()
        observable.subscribe(
            onNext: { element in
                print(element)
            },
            onError: {error in
                print(error)
            },
            onCompleted: {
                print("onCompleted")
            })
            .disposed(by: disposeBag)
```

Kết quả:
```
        //không emit bất cứ event nào.
```

# .range(start: , count:  ):

-----


.range(start: , count:  ) cho phép tạo ra một Observable với giá trị ban đầu (start) và số lượng các element tuần tự được tạo ra (count), sau đó sẽ terminate.
```swift
        let disposeBag = DisposeBag()
        let observable = Observable.range(start: 1, count: 10)
        observable.subscribe { element in
            print(element)
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
        next(10)
        completed
```

# Tài liệu tham khảo:

-----


RxSwift - Reactive Programming with Swift