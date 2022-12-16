Ở phần một chúng ta đã tìm hiểu về PublistSubject, PublishSubject được dùng khi bạn chỉ muốn subscribe nhận những sự kiện ngay tại thời điểm bắt đầu đăng ký, cho đến khi subject bị terminated bằng event .completed hoặc .error. Vậy giả sử bạn muốn thông báo cho ai đó về dữ liệu gần nhất thì BehaviorSubject sẽ được sử dụng

**BehaviorSubject tương tự như PublishSubject ngoại trừ chúng sẽ nhận giá trị gần nhất của .onNext event đến những new subscribers.**

Xem sơ đồ marble sau: 

![](https://images.viblo.asia/4c5c6a10-be4c-4122-9e69-be5543379c3a.JPG)

Dòng thứ nhất là BehaviorSubject, hai dòng tiếp theo là hai subscribers của nó.  Mũi tên hướng lên của subscriptions, mũi tên hướng xuống là emit ra events.

Subscriber 1 đăng kí trước 1) và sau 2). Nó nhận được 2), 3) là đương nhiên, ngoài ra nó còn nhận được 1) vì đó là giá trị gần nhất được phát trước khi ta subscribe.

Subscriber 2 đăng kí trước 2) và sau 3). Nó nhận được 3) là rõ ràng, ngoài ra nó nhận được thêm 2) vì đây là giá trị gần nhất được phát trước khi nó subscribe

Được rồi, đến đây ta bắt tay vào đoạn code như sau:

```
// 1
enum MyEror: Error {
        case anError
}

// 2
func print<T: CustomStringConvertible>(label: String, event: Event<T>) {
        print(label, event.element ?? event.error ?? event)
}

// 3
example(of: "BehaviorSubject") {
        // 4
        let subject = BehaviorSubject(value: "Initial value")
        
        let disposeBag = DisposeBag()
}
```

Mình giải thích một chút:
1. Định nghĩa một enum là myError kế thừa Error, bên trong có một case là anError.
2. Tạo một func print để cho tiện, mình giải thích toán tử ?? một chút:

     - event.element ?? (event.error ?? event) -> nếu element không nil thì trả về event.element, nếu nil thì trả về cái thằng bên trong dấu ngoặc này.
     
     - bên trong dấu ngoặc, nếu error không nil (tức là nó bị error) thì trả về event.error không thì trả về event. Event này thì bạn đã biết event gì rồi đấy, là completed.
3. Start một ví dụ.
4. Khởi tạo một BehaviorSubject với giá trị khởi tạo ban đầu. Lưu ý: vì **BehaviorSubject luôn luôn phát ra phần tử gần nhất nên bạn không thể tạo ra nó mà không cung cấp giá trị ban đầu. Nếu bạn không thể cung cấp giá trị ban đầu tại thời điểm khởi tạo, có nghĩa là bạn cần dùng PublishSubject thay vì BehaviorSubject.**

Bây giờ thêm đoạn code này vào hàm example:

```
subject
    .subcribe {
            print(label: "1)", event: $0)
    }
    .disposed(by: disposeBag)
```

Đoạn này tạo một subscription tới subject,  và không có bất kì elements nào được add vào subject, cho nên nó sẽ phát lại giá trị ban đầu đến thằng subscriber. Kết quả thu được sẽ là:

```
--- Example of: BehaviorSubject ---
1) Initial value
```

Bây giờ thêm dòng code sau trước dòng subscription nhưng sau dòng khởi tạo:

```
subject.onNext("X")
```

Đến đây X sẽ được in ra, vì X là giá trị gần nhất:

```
--- Example of: BehaviorSubject ---
1) X
```

Thêm đoạn code này vào cuối hàm example, nhưng bạn hãy đọc đoạn code này và đoán xem cái gì sẽ được in ra:

```
// 1
subject.onError(MyError.anError)

// 2
subject
    .subcribe {
            print(label: "2)", event: $0
    }
    .disposed(by: disposeBag)
```

Ở đây:
1. Add một event error vào subject
2. Tạo một subscription mới

Và đây là kết quả:

```
1) anError
2) anError
```

Tóm lại: 
BehaviorSubject được dùng khi bạn muốn thông báo cho một ai đó về dữ liệu gần nhất. Ví dụ như login một app, đôi khi bạn muốn show lại latest value để hiển thị trong form login chẳng hạn.

Còn nếu trong search screen, bạn muốn show 5 giá trị gần nhất thì dùng cái gì bây giờ, vì BehaviorSubject chỉ hiển thị một cái. Đó chính là ReplaySubject, mình sẽ viết trong bài tiếp theo.