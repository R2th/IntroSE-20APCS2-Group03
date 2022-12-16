Bài này và những bài tiếp theo mình sẽ viết về RxSwift, nó chỉ là những kiến thức mình tự tìm hiểu và tự note lại dưới góc nhìn của một newbie. Mình chủ yếu dựa trên cuốn sách RxSwift Reactive Programming with Swift của Team raywenderlich.com. Bài đầu tiên này mình sẽ viết về những khái niệm cơ bản nhất trong Swift, chắc hẳn các bạn mới đầu tìm hiểu về Rx sẽ rất mơ hồ về các khái niệm này.
## Observable

Observable là một **sequence**. Observable ***emit*** (nhả ra) các **event**. Event có thể chứa bất kỳ kiểu dữ liệu nào.

Điều cần nhớ đầu tiên là, Observables là **immutable**, có nghĩa là với mỗi method trong bộ toolbox (map, flatMap, combine, merge, scan, filter....) (bộ này mình sẽ viết ở bài số 3 về các operator thường dùng) dùng xong sẽ tạo ra một Observables mới, chứ không biến đổi Observables cũ.

Observable phát ra 3 loại event:

```
enum Event<Element>  {
    case next(Element)      // next element of a sequence
    case error(Swift.Error) // sequence failed with error
    case completed          // sequence terminated successfully
}
```
* **.next**: là event mang giá trị dữ liệu mới nhất (hoặc tiếp theo). Đây là cách observers nhận các giá trị của dữ liệu.
* **.error**: Observable kết thúc với một lỗi và sẽ không phát ra các sự kiện khác.
* **.completed**: là event kết thúc chuỗi sự kiện khi chuỗi sự kiện đó thực hiện thành công. Điều đó có nghĩa Observable đã hoàn thành vòng đời của nó và sẽ không gửi đi bất kỳ sự kiến nào khác.

Khi observable bị terminated, nó không thể emit các event nữa.

Time line của Observable:
```
--a---b-c---d---X---|->

a, b, c, d are events
X is an error event
| is the 'completed' signal
---> is the timeline

```

Tạo Observable:

* **just()**

Tạo ra một observable chỉ có duy nhất một phần tử. Ví dụ:

```
let one = 1
let two = 2
let three = 3

let observable:Observable<Int> = Observable<Int>.just(one)
```

* **of()**

Tạo ra một observable chứa một dãy các phần tử. Observable sẽ có type là type của các phần tử được truyền vào. Ví dụ:
```
let observable1: Observable<Int> = Observable<Int>.of(one, two, three)
let observable2: Observable<[Int]> = Observable<Int>.of([one, two, three])
```

* **from()**

Tạo ra một observable của các phần tử trong một mảng. Khi option-click, bạn sẽ thấy nó hiển thị kiểu Int, chứ không phải [Int]. Ví dụ:
```
let observable3: Observable<Int> = Observable<Int>.from([one, two, three])
```

From chỉ nhận array, các kiểu khác đều không hợp lệ.

## Subscribe

Subscribe (đăng ký): đăng ký lắng nghe sự kiện từ một observable
Subscribe đến một RxSwift observable khá giống như NotificationCenter, thay vì addObserver(), ta dùng subscribe(). Không giống như NotificationCenter, ta hay dùng .default là 1 singleton instance, mỗi observable trong Rx là khác nhau.

**Điều quan trọng nhất, một observable sẽ không phát ra events cho đến khi có ai đó subscribe nó.**

Ta xem ví dụ sau đây:

```
let observable = Observable.of("Element 1", "Element 2", "Element 3")
observable.subscribe { event in
    print(event)
}

print("- - - - - - -")

observable.subscribe(onNext: { element in
    print(element)
}, onError: {error in
    print(error.localizedDescription)
}, onCompleted: {
    print("On Completed")
}, onDisposed: {
    print("On Disposed")
})
```

Kết quả:

```
Kết quả:
next(Element 1)
next(Element 2)
next(Element 3)
completed
- - - - - - -
Element 1
Element 2
Element 3
On Completed
On Disposed
```

Event có một element property, đây là một giá trị optional, bởi vì chỉ có mỗi .next mới có element, cho nên bạn cần binding unwrap cái này nếu nó không nil. Dùng operator onNext thì không cần phải unwrap.

Empty operator sẽ tạo ra một empty observable sequence mà không có bất kì elements nào hết, do đó nó chỉ phát ra .completed event.

## Dispose

Dispose: ngừng subscribe một observable

Terminate: kết thúc một observable

Ta xét một ví dụ đơn giản sau đây:

```
// 1
let observable = Observable.of("a", "b", "c")
// 2
let subscription = observable.subscribe { event in 
    print(event)
}
// 3
subscription.dispose()
```

Trình tự diễn ra như sau: 
1. Tạo ra observable của một vài String .  
2. Subscribe thằng observable này, lần này ta sẽ lưu biến trả về (type là Disposable) cho 1 local constant (đặt tên là subscription).
3. Print ra các emit.
4. Để cancel "đàng hoàng" một subscription, gọi dispose() nó là được. Sau khi cancel cái subscription này (hay nói cách khác là dispose nó), cái observable này hiện tại sẽ ngưng emit ra các events.
        
Quản lý từng subscription riêng biệt nhìn khá "nghiệp dư" nên RxSwift đã có thêm cho ta 1 cái gọi là DisposeBag. Cái này dễ giữ các disposables, mà được add trong dispose(to: DisposeBag), và nó sẽ gọi dispose() mỗi khi subscribe này chuẩn bị deallocated.

Ví dụ:

```
// 1
let disposeBag = DisposeBag()
// 2
let observable = Observable.of("a", "b", "c")
// 3
let subscription = observable.subscribe { event in 
    print(event)
}
// 4
subscription.dispose(by: disposeBag)
```

Trình tự diễn ra như sau:
1. Tạo ra một disposeBag       
2. Tạo ra một observable
3. Subscribe đến observable và print out ra cái giá trị được emit
4. Add cái giá trị disposable đc trả về vào cái disposeBag

Đây là pattern bạn sẽ dùng rất nhiều: Tạo ra observable rồi subscribe nó và add cái subscription vào 1 disposeBag.

**Chú ý: Nếu không dispose một Observable hoặc không add disposable của nó vào DisposeBag thì có thể gây ra memory leak.**