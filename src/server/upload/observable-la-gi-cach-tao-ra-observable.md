RxSwift là một thư viện cho phép chúng ta sử dụng Swift một cách khác nhau. Với thư viện này, lập trình **bất đồng bộ** trở nên dễ thực hiện hơn và dễ đọc hơn. Nó cho phép bạn xây dựng các ứng dụng có kiến trúc liền lạc và chất lượng cao hơn.

![](https://images.viblo.asia/5b8ad7a2-0faa-4522-b59d-321c4c5b75fa.png)
Như các bạn đã biết, một device ( iphone, ipad, macbook, ...)  đều có bộ CPU với rất nhiều nhân và nhiều luồng. Điều đó đòi hỏi, một chương trình tạo ra phải khai thác hết được sức mạnh của thiết bị đó, nhằm nâng cao trải nghiệm sử dụng của người dùng. Từ đó việc lập trình đa luồng ra đời nhằm chạy được các tác vụ ( khối code ) song song. Với ngôn ngữ Swift chúng ta có thể có rất nhiều cách để implement một ứng dụng có các tác vụ bất đồng bộ: NotificationCenter, Closure, Delegate Partern, Grand Central Dispatch và RxSwift.

![](https://images.viblo.asia/1fdc9bc6-3879-49ec-96ab-9369ff37c914.png)
Trong bài viết này chúng ta sẽ cùng nhau tìm hiểu về Observable và các cách tạo ra một Observable trong Swift. **Let's GOOOOO!!!**
# 1. Observable là gì?
- **Observable** là một **sequence**, **Observable** sẽ nhả ( emit ) ra sự kiện ( event )
- **Observable** là **immutable**, nghĩa là mỗi khi dùng method trong bộ toolbox (map, flatmap, combine, merge, filter,…) thì sẽ tạo ra 1 Observable mới chứ không biến đổi Observable cũ.
![image.png](https://images.viblo.asia/e12faafb-27f5-4f4b-8fe0-b4b0c0d3a924.png)

**Observable** phát ra 3 loại event: 
- **.next():** là **event** mang giá trị dữ liệu mới nhất. Đây chính là các **Observers** nhận các giá trị giữ liệu.
- **.error:** **Observable** sẽ kết thúc với lỗi và không phát ra **event**.
- **.completed:** là **event** kết thúc của chỗi sự kiện, có nghĩa là sẽ không phát ra bất cứ **event** nào nữa.
# 2. Cách tạo ra một Observable
Sau đây chúng ta sẽ cùng nhau tìm hiểu cách tạo ra một **Observable**
## 2.1 .just()
Trong RxSwift, với phương thức **.just()** sẽ giúp chúng ta tạo ra một **Observable** phát ra **duy nhất** một **event** và **terminate** ngay lập tức.
``` Swift
        let disposeBag = DisposeBag()
        let observable = Observable.just("this is element")
        observable.subscribe { element in
            print(element)
        }
        .disposed(by: disposeBag)
```
Result:
``` Swift
        next(this is element)
        completed
```
## 2.2 .of()
Với phương thức **.of()** chúng ta sẽ tạo ra một Observable từ một chuỗi các phần tử cho trước. Kiểu dữ liệu của Observable là kiểu dữ liệu của dữ liệu truyển vào. Các phần tử sẽ truyền vào một cách tuần tự, sau khi hoàn thành sẽ tự động **terminate**.
```Swift
        let disposeBag = DisposeBag()
        let observable = Observable.of(1, 9, 19, 5)
        
        observable.subscribe { element in
            print(element)
        }
        .disposed(by: disposeBag)
```
Result:

``` Swift
        next(1)
        next(9)
        next(19)
        next(5)
        completed
```
## 2.3 .from()
Với phương thức **.from( )** cho phép khởi tạo một **Observable** với **một chuỗi các phần tử trong một mảng** cho trước. Kiểu dữ liệu của **Observable** sẽ là kiểu dữ liệu của các phần tử trong mảng. Các phần tử sẽ lần lượt được emit theo thứ tự trong mảng, sau đó **Observable** sẽ **terminate**.

``` Swift
        let array = [1, 5, 8, 9, 10, 4]
        let disposeBag = DisposeBag()
        let observable = Observable.from(array)
        
        observable.subscribe { element in
            print(element)
        }
        .disposed(by: disposeBag)
```
Result:
``` Swift
        next(1)
        next(5)
        next(8)
        next(9)
        next(10)
        next(4)
        completed
```

## 2.4 .range(start: , count: )
**.range(start: , count: )** cho phép tạo ra một Observable với giá trị ban đầu (start) và số lượng các element tuần tự được tạo ra (count), sau đó sẽ **terminate**.
``` Swift
        let disposeBag = DisposeBag()
        let observable = Observable.range(start: 1, count: 5)
        observable.subscribe { element in
            print(element)
        }
        .disposed(by: disposeBag)
```
Result:
``` Swift
        next(1)
        next(2)
        next(3)
        next(4)
        next(5)
        completed
```

## 2.5 .empty()
Phương thức **.empty( )** cho phép tạo ra một **Observable** nhưng không có bất kỳ **element** nào cả. Observable sẽ chỉ **emit ra duy nhất một event .completed** để **terminate**.
``` Swift
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
Result:
``` Swift
        onCompleted
        onDisposed
```
## 2.6 .never()
Giống với phương thức **.empty()**, phương thức **.never()** cho phép tạo ra một **Observable** không có bất kỳ element nào cả nhưng khác với **.empty()** ở chỗ, phương thức **.never()** sẽ không bao giờ **terminate**.
``` Swift
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

Result:
```
// Not emit anything
```

# 3. Tổng Kết
Trong bài viết này chúng ta đã cùng nhau tìm hiểu về **Observable** và các cách tạo ra một **Observable**. Để hiểu rõ hơn các bạn có thể tìm hiểu các tài liệu dưới đây:
- https://github.com/ReactiveX/RxSwift
- https://www.raywenderlich.com/books/rxswift-reactive-programming-with-swift/v4.0
- https://viblo.asia/p/rxswift-cac-cach-khoi-tao-observable-trong-rxswift-aWj53pkPK6m