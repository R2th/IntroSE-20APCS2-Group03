Ở bài trước chúng ta đã tìm hiểu về BehaviorSubject, BehaviorSubject bắt đầu với một giá trị khởi tạo và phát tín hiệu khởi tạo (nếu không nhận được giá trị nào khác) hoặc nếu có giá trị gần nhất thì nó sẽ phát giá trị này đến các subscribers của nó. BehaviorSubject chỉ phát ra 1 giá trị gần nhất, nếu bạn muốn nhận được nhiều giá trị hơn thì cần dùng ReplaySubject

**ReplaySubject khởi tạo một số lượng bộ đệm, lưu trữ các emit gần nhất bằng với số lượng bộ đệm. Sau đó sẽ replay các emit này cho các subscribers mới.**

Xem sơ đồ marble sau:

![](https://images.viblo.asia/0c87641b-1fcc-4314-8e2a-471bd59d0c67.JPG)

Sơ đồ trên miêu tả replay subject với số lượng bộ đệm là 2. Dòng thứ nhất là replay subject, hai dòng tiếp theo là hai subscribers của nó. Mũi tên hướng lên của subscriptions, mũi tên hướng xuống là emit ra events.

Subscriber thứ nhất subscribe ngay từ đầu nên nó sẽ nhận toàn bộ event mà replay subject phát ra.

Subscriber thứ hai subscribe sau 2)  trước 3), kích thước bộ đệm là 2 nên nó sẽ nhận 2 giá trị gần nhất trước đó.

Hãy lưu ý khi sử dụng replay subject là bộ đệm sẽ được lưu trữ trong bộ nhớ. Vì vậy hãy cẩn thận về bộ nhớ khi bạn dùng bộ đệm quá lớn, hay lưu trữ các dữ liệu chiếm nhiều bộ nhớ như hình ảnh nặng.

Bây giờ chúng ta sẽ làm ví dụ cụ thể:

```
// 1
let subject = ReplaySubject<String>.create(bufferSize: 2)
let disposebag = DisposeBag()

// 2
subject.onNext("1")
subject.onNext("2")
subject.onNext("3")

// 3
subject.subscribe {
        print(labe: "1)", event: $0)
}
.disposed(by: disposeBag)

subject.subscribe {
        print(labe: "2)", event: $0)
}
.disposed(by: disposeBag)
```

Ở đoạn code trên:
1.  Khởi tạo một replay subject với kích thước bộ đệm là 2. 
2.  Add thêm 3 giá trị vào replay subject.
3.  Tạo 2 subscription của replay subject.

Hai phần tử gần nhất là 2, 3 sẽ được phát đến cả 2 subscribers, 1 sẽ không được phát vì giới hạn bộ đệm là 2 - ta đã setup cho nó trước khi có bất kì ai subscribe (nếu ta tăng lên 3 thì được). Kết quả thu được như sau:

```
1) 2
1) 3
2) 2
2) 3
```

Bây giờ ta add thêm đoạn code sau:

```
subject.onNext("4")

subject.subscribe {
        print(label: "3)", event $0)
}
.disposed(by: disposeBag)
```

Ở đoạn code này bạn đã add một giá trị mới vào trong replay subject, và sau đó tạo một subscription.  Hai subscriptions trước sẽ nhận được giá trị mới này vì chúng subscribe ngay từ đầu, còn subscription thứ ba sẽ nhận 2 giá trị gần nhất là 3 và 4. Kết quả in ra như sau:

```
1) 4
2) 4
3) 3
3) 4
```

 Bây giờ đặt một vấn đề là nhỡ may bị error thì làm sao? Hãy add thêm error như sau: 

```
subject.onNext("4")
subject.onError(MyError.anError)
subject.subscribe {
        print(label: "3)", event $0)
}
.disposed(by: disposeBag)
```

Kết quả như sau:
```
1) 4
2) 4
1) anError
2) anError
3) 3
3) 4
3) anError
```

Mình giải thích như sau: replay subject kết thúc với một error, hai subscriber đầu tiên sẽ biết chuyện này và nhận event error. Nhưng vẫn phát 2 giá trị mới nhất trước khi phát ra event error cho những subscriber mới.

Bây giờ thêm 1 dòng code như sau: 

```
subject.onNext("4")
subject.onError(MyError.anError)
subject.dispose()
```

Bằng cách gọi hàm dispose() của replay subject, những subscriber mới sẽ chỉ nhận được một event error cho biết rằng đối tượng đã được xử lý.
Kết quả in ra như sau:

```
1) anError
2) anError
3) Object `RxSwift.ReplayMany<Swift.String>` was already disposed.
```

Đến đây, mình hi vọng các bạn đã hiểu rõ về loại subject này.