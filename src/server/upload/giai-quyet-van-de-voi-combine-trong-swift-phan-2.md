Ở phần trước mình đã giới thiệu về Combine trong swift cũng như nói về Publisher và Subscriber. Ở phần này mình sẽ tiếp tục giới thiệu các khái niệm trong Combine.

### Subjects
Subject về cơ bản là 1 publisher để bạn có thể subscribe nhưng bạn có thể gửi events bằng cách sử dụng hàm send().

Có 2 loại subjects:
- PassthroughSubject: Nếu bạn subscribe thì bạn nhận được giá trị sau khi subscribe.
- CurrentValueSubject: Bạn nhận được cả giá trị gần nhất trước khi subscribe.

```
let subject = PassthroughSubject<String, Never>()
let publisher = subject.eraseToAnyPublisher()

let subscriber = publisher.sink(receiveValue: { value in
    print(value)
})

subject.send("Combine") //The Subscriber will print "Combine"
subject.send("Swift")   //The Subscriber will print "Swift"
```

Một Subject cũng có thể có nhiều subscriber. Giờ mình sẽ ví dụ để xem cách nó sẽ hoạt động như thế nào khi có hai subscriber khác nhau, đăng ký vào thời điểm khác nhau.

```
let subject = PassthroughSubject<String, Never>()
let publisher = subject.eraseToAnyPublisher()


let subscriber1 = publisher.sink(receiveValue: { value in
    print(value)
})

//subscriber1 will recive the events but not the subscriber2
subject.send("Event1")
subject.send("Event2")


let subscriber2 = publisher.sink(receiveValue: { value in
    print(value)
})
//Subscriber1 and Subscriber2 will recive this event
subject.send("Event3")
```

Chúng ta có thể thấy rằng subscribers chỉ nhận những giá trị được gửi sau khi đăng kí.

### Operators

Điều làm cho Combine thực sự mạnh mẽ là , kết hợp hoặc lọc các giá trị do publishers gửi đi.
Có ba operators trong Combine - Transforming, Filtering, and Combining Operators.

**Transforming**
Operator đơn giản nhất là Map Operator, nó hoạt động tương tự như Swift Map. Nó biến đổi các giá trị được phát ra từ một publisher với một chức năng nhất định.

![](https://images.viblo.asia/31535e03-089d-4db5-b80f-7cb05b82cf2b.png)

```
_ = Publishers.Sequence(sequence: [1,2,4])
    .map { $0 * 10 }
    .flatMap { Publishers.Just($0) }
    .sink(receiveValue: {
        print($0)
    })
```

```
OUTPUT:
10
20
30
```

Flat Map được sử dụng để biến đổi elements của publisher thành một chuỗi cho một publisher mới hoặc đã tồn tại

**Filtering**
Nếu bạn muốn xóa các thành phần khỏi chuỗi của publisher dựa trên một điều kiện cụ thể nào đó, bạn nên sử dụng các chức năng filter. Trong ví dụ dưới đây, chúng ta sẽ cung cấp các filter khác nhau có thể cho luồng dữ liệu của chúng ta.

![](https://images.viblo.asia/4ce6a932-be08-4c9b-8b25-4e91065fc8cd.png)

```
_ = Publishers.Sequence(sequence: [1,2,2,3,3,4,7])
    .map { $0 * 2 }
    .flatMap { Publishers.Just($0) }
    .filter { $0.isMultiple(of: 2) }
    .dropFirst(3)
    .removeDuplicates()
    .sink(receiveValue: { value in
        print(value)
    })
```

Filter xóa phần tử không phù hợp với điều kiện trong closure.
Remove Duplicates giúp loại bỏ phần tử trùng lặp.
Drop First bỏ qua n phần từ tùy vào tham số đầu vào trước khi xử lý tiếp.

Vậy là phần 2 này mình đã giới thiệu với các bạn về Subject, Operator Transforming và Filtering . Hẹn gặp các bạn ở các phần sau. Tham khảo: https://medium.com/flawless-app-stories/problem-solving-with-combine-swift-4751885fda77