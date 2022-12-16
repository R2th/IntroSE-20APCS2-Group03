## Đặt vấn đề

Ở Bài 1, bạn đã biết observable là gì, làm sao để tạo ra nó, làm sao để subscribe nó, làm sao để dispose khi đã subscribe xong.

Observable là một phần cơ bản của RxSwift, nhưng thực tế khi bạn develop app, bạn muốn thêm nhiều value vào observable lúc runtime và sau đó sẽ emit đến các subscriber. Cái bạn cần là cái gì đó hoạt động vừa như một observable vừa như một observer, đó gọi là Subject.

Trước khi vào từng subject cụ thể, mình sẽ ví dụ một loại subject cho các bạn dễ hình dung:
Tạo một PublishSubject (mình sẽ giải thích bên dưới), nó sẽ nhận thông tin dữ liệu rồi quay ngược ra phát cho những subscribers của nó. 

```
let subject = PublishSubject<String>()
```

Giờ ta truyền dữ liệu cho nó, ta sẽ truyền một dữ liệu cho nó trước:

```
subject.onNext("Is anyone listening?")
```

Ta đã put một string mới vào subject, và đây là kết quả:

```


```

Không có gì được in ra hết, bởi vì chưa có ai subscribe nó, giờ ta tạo 1 subscribe cho nó:

```
let subscriptionOne = subject
.subscribe(onNext: { string in
print(string)
})
```

Ở đây không có gì được in ra cả, tại sao mình sẽ giải thích bên dưới, giờ thêm dòng code này:

```
subject.on(.next("1"))
```

Bạn đã khai báo publish subject có kiểu là String, nên chỉ có strings mới có thể put vào subject. Vì subject là một subscriber nên nó có thể emit text này:

```
--- Example of: PublishSubject ---
1
```

## Các loại Subject

Subject là gì? Mình chỉ nhắc lại, subjects hoạt động như cả observable lẫn observer, như ví dụ trên, bạn có thể thấy nó nhận tín hiệu ở .next events và truyền tín hiệu này đến subscribe của nó. Có 4 loại subjects:

```
1. PublishSubject: Bắt đầu là rỗng và chỉ phát tín hiệu mới (onNext) đến subscribe
2. BehaviorSubject: Bắt đầu với một giá trị khởi tạo và phát tín hiệu khởi tạo này. (nếu không nhận đc tín hiệu nào) và nếu có giá trị gần nhất thì nó sẽ phát giá trị này đến các subscribers của nó.
3. ReplaySubject: Tương tự với BehaviorSubject nhưng mà nó có thêm bộ đệm với số lượng nhất định. ReplaySubject sẽ phát ra nhiều giá trị gần nhất dựa trên số lượng bộ đệm này.
4. Variable: Lớp này wrap 1 BehaviorSubject, lưu giữ giá trị hiện tại như là trạng thái của nó và phát ra giá trị gần nhất/ khởi tạo đến những subscribers của nó
```

Bây giờ chúng ta đi lần lượt từng subject

## PublishSubject

**PublishSubject được dùng khi bạn chỉ muốn subscribe nhận những sự kiện ngay tại thời điểm bắt đầu đăng ký, cho đến khi subject bị terminated bằng event .completed hoặc .error**

Trở lại ví dụ ở đầu bài, PublishSubject chỉ phát ra đến những subscribers hiện tại. Do đó nếu bạn chưa subscribe khi có gì đó đã được add trước đó, bạn sẽ không nhận được nó.

Theo dõi sơ đồ marble: 

![](https://images.viblo.asia/bfd8d514-190a-4a1b-8276-e34486c3fe97.JPG)

Dòng số 1 là PublishSubject, dòng số 2, số 3 là những subscribers. Mũi tên hướng lên của subscriptions, mũi tên hướng xuống là emit ra events.

Subscriber đầu tiên đăng kí sau 1) nên nó không nhận đc event này mà chỉ nhận được event 2) và 3). Subscriber thứ hai join sau 2) nên nó chỉ nhận được 3).

Bây giờ, quay lại code, ta sửa code một chút để dễ nhìn và thêm vào 1 subscription thứ 2, như sau:

```
subject.onNext("First thing") //event đầu tiên

let subscriptionOne = subject
.subscribe(onNext: { string in
print("Sub 01: \(string)")
})

subject.onNext("Second thing") //event thứ 2

let subscriptionTwo = subject
.subscribe(onNext: { string in
print("Sub 02: \(string)")
})
```

Kết quả thu được:

```
Sub 01: Second thing
```

Chỉ có subscriptionOne nhận được event thứ 2, bay giờ ta thêm một dòng code để có event mới:

```
subject.onNext("Third thing")
```

Và đây là kết quả:

```
Sub 01: Second thing
Sub 01: Third thing
Sub 02: Third thing
```

Nếu bây giờ bạn lấy subscription đầu tiên và dispose nó đi rồi add thêm new event, chỉ có subscriptionTwo có giá trị. 

Khi một PublishSubject nhận event **.completed** hay  **.error** , nó sẽ ngưng phát event đế những new subscriber mới cũng như không phát event nữa. Tuy nhiên, nó vẫn sẽ phát event stop đến các subscribers trong tương lai. Xem code dưới đây:

```
let subject = PublishSubject<String>()

subject.onNext("First thing")

let subscriptionOne = subject
.subscribe(onNext: { string in
print("Sub 01: \(string)")
})

subject.onNext("Second thing")

let subscriptionTwo = subject
.subscribe(onNext: { string in
print("Sub 02: \(string)")
})

// 1.
subscriptionOne.dispose()

// 2. 
subject.onNext("Third thing")

// 3.
subject.onCompleted()

// 4.
subject.onNext("Fourth thing")

// 5. 
let subscriptionThree = subject.subscribe { event in
      print("Sub 03: ", (event.element ?? event))
}
let subscriptionFour = subject.subscribe {
      print("Sub 04: ", $0.element ?? $0)
}
subject.onNext("check if it could emit")
```
Có rất nhiều thứ rất hay ở đây:

1. Thứ nhất, mình dispose() sub01 trước khi để subject nhận event thứ 3
2. Mình cho subject nhận event thứ 3 ("Third thing")   
3. Sau đó mình .complete()
4. Tiếp theo mình phát tiếp tín hiệu thứ 4
5. Mình tạo ra hai subscription, ở đây mình xin giải thích kĩ một chút:

    a. Trong cái sub03, mình chỉ để { event mà không có onNext tức là nó sẽ phát tất cả các event, mà event thì chỉ có riêng onNext mới có element. Cho nên đoạn  này mình dùng nil-coalescing để unwrap cái optional này. Nếu mà là event  onNext thì lấy element, ko thì lấy các event kia.
    
    b. Trong cái sub04 thì cũng tương tự sub03, có điều mình dùng $0 sẽ tiện hơn, thay cho việc phải gọi tên cụ thể ra.
        
Kết quả sẽ là:

```
Sub 01: Second thing
Sub 02: Third thing
Sub 03:  completed
Sub 04:  completed
```

Thực ra thì tất cả các loại subject một khi đã chấm dứt cũng sẽ phát ra event stop cho các subscribers tương lai. Mình thấy cũng hay khi mà không chỉ biết được nó đã kết thúc mà còn thông báo cho những đứa tiếp là mình không còn emit nữa.

Đôi khi, ta cũng muốn biết những giá trị trước khi mình subscription. Đó là lý do mình có những phần khác.