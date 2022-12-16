Các ứng dụng hiện nay xử lý rất nhiều sự kiện thời gian nhằm nâng cao trải nghiệm cho người dùng. Chúng ta cần cô cụ để xử lý các sự kiện này. Framework mới nhất của Apple liệu có phải câu trả lời cho điều đó?

## **Giới Thiệu**

Combine framework là declarative framework mới nhấ giúp xử lý các giá trị theo thời gian thực. Hiểu biết về Combine Swift và SwiftUI là điều bắt buộc nếu bạn muốn bắt kịp xu hướng của IOS. Combine là tăng mức độ trừu tượng trong code của bạn để có thể tập trung vào các sự kiện xác định business logic, thay vì phải liên tục sử dụng một số lượng lợn vào chi tiết implementaion thì code của bạn sẽ ngắn ngọn hơn. Combine framework được thiết kế để cung cấp cho chúng ta những lợi ích sau:
 -  Đơn giản hoá xử lý code bất đồng bộ.
 -  Đơn giản hoá xử lý đa luồng.
 -  kết hợp các thành phần với nhau.
 -  Đa nền tảng

**Tư duy Reactive** Combine Swift là một Reactive Programeming Frameword. Reactive programming về cơ bản là lập trình với các luồng dữ liệu không đồng bộ. Một luồng có thể đại diện cho các sự kiện giao diện người dùng, phản hồi mạng, sự kiện được lên lịch sẵn và nhiều loại dữ liệu không đồng bộ khác. . Ví dụ với các lần bấm vào nút, luồng sẽ giống như sau.

![image.png](https://images.viblo.asia/1184bd4b-541b-4667-8b13-04fc2856c4ca.png)

Chúng ta đã sử dụng các luồng dữ liệu không đồng bộ trong lập trình iOS, Notification Centre hoặc các sự kiện nhấp chuột từ các thành phần UI đã là các luồng sự kiện không đồng bộ. Theo một cách nào đó, bạn quan sát các sự kiện đó và quyết định cách xử lý tương ứng. Với Combine Swift, chúng ta có cùng một ý tưởng, nhưng chúng ta có thể tạo ra các luồng dữ liệu từ bất cứ thứ gì. Mọi thứ nên được coi là một chuỗi dữ liệu theo thời gian. Điều làm cho Combine Swift trở nên mạnh mẽ hơn nữa là bạn có các chức năng tuyệt vời được cung cấp sẵn từ framework. Bạn có thể combine, merge, filter streams, sử dụng một stream làm tham số đầu vào của một stream khác và còn rất nhiều thứ thú vị khác.

## **Những điều thiếu yếu nhất của Combine Swift**

Combine Swift là một trong những framework mới nhất được Apple giới thiệu. Vì vậy, trước tiên chúng ta sẽ khám phá một số điều thiết yếu của nó và sau đó sẽ làm quen với việc sử dụng nó.

**1. Publishers và Subscribers** Điều quan trọng nhất cần nắm rõ trong Combine là publishers và subscribers. Một Publisher là loại có thể phân phối một chuỗi các giá trị theo thời gian và một Subscriber sẽ đăng ký với Publisher để nhận các giá trị đó. Hãy thử tạo ra một số Publishers đơn giản bằng cách sử dụng Combine:

```
let publisher = Just("Combine Swift")
let sequencePublisher = let publisher = Publishers.Sequence(sequence: [1,2,3,5,6])
```
Bạn có thể đăng ký với một publisher bằng cách sử dụng hàm sink

```
let publisher = Just("Combine Swift")
let subscribtion = publisher.sink { value in
  print(value)
}
```

> OUTPUT: Combine Swift


Subscribers cũng có thể được hủy bất kì lúc nào để tránh nhận sự kiện từ publisher đơn giản bằng cách gọi cancel.

```
subscriber.cancel()
```

## **Subjects**

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

## **Operators**
Điều làm cho Combine thực sự mạnh mẽ là , kết hợp hoặc lọc các giá trị do publishers gửi đi. Có ba operators trong Combine - Transforming, Filtering, and Combining Operators.

**Transforming** Operator đơn giản nhất là Map Operator, nó hoạt động tương tự như Swift Map. Nó biến đổi các giá trị được phát ra từ một publisher với một chức năng nhất định.

![image.png](https://images.viblo.asia/f2eab88a-ab81-476e-81b1-3be62c7094c3.png)

```
_ = Publishers.Sequence(sequence: [1,2,4])
    .map { $0 * 10 }
    .flatMap {Just($0) }
    .sink(receiveValue: {
        print($0)
    })
```

```
OUTPUT:
10
20
40
```

Flat Map được sử dụng để biến đổi elements của publisher thành một chuỗi cho một publisher mới hoặc đã tồn tại

**Filtering** Nếu bạn muốn xóa các thành phần khỏi chuỗi của publisher dựa trên một điều kiện cụ thể nào đó, bạn nên sử dụng các chức năng filter. Trong ví dụ dưới đây, chúng ta sẽ cung cấp các filter khác nhau có thể cho luồng dữ liệu của chúng ta.

![image.png](https://images.viblo.asia/649c8333-815c-41b4-b326-eeed77a47640.png)


```
_ = Publishers.Sequence(sequence: [1,2,2,3,3,4,7])
    .map { $0 * 2 }
    .flatMap {Just($0) }
    .filter { $0.isMultiple(of: 2) }
    .dropFirst(3)
    .removeDuplicates()
    .sink(receiveValue: { value in
        print(value)
    })
```

Filter xóa phần tử không phù hợp với điều kiện trong closure. Remove Duplicates giúp loại bỏ phần tử trùng lặp. Drop First bỏ qua n phần từ tùy vào tham số đầu vào trước khi xử lý tiếp.

## **Combining**
Toán tử **combining** giúp kết hợp các phần tử từ các chuỗi không đồng bộ. Một số toán tử rất giống với toán tử Swift khi làm việc với mảng. Hãy để xem một số ví dụ.

### **1. Merge**
Kết hợp các yếu tố từ hai **publishers** khác nhau cùng kiểu dữ liệu, tạo ra mội chuỗi các giá trị khác theo thời gian.

![image.png](https://images.viblo.asia/e0553f88-b07f-4835-85cc-9b5dbcee2c55.png)
```
let germanCities = PassthroughSubject<String, Never>()
let italianCities = PassthroughSubject<String, Never>()
let europianCities = Publishers.Merge(germanCities, italianCities)

_ = europianCities.sink(receiveValue: { city in
    print("\(city) is a city in europe")
})
germanCities.send("Munich")
germanCities.send("Berlin")
italianCities.send("Milano")
italianCities.send("Rome")
```

```
OUTPUT: 
Munich is a city in europe
Berlin is a city in europe
Milano is a city in europe
Rome is a city in europe
```

### **2. Combine Latest**

**Combine Latest** tạo ra một **publisher** nhận và kết hợp các yếu tố mới nhất từ hai **publisher**.

![image.png](https://images.viblo.asia/ef1374cb-cdef-4ac5-8194-11670aa3c158.png)

Giả sử rằng chúng ta muốn kết hợp giá trị của một **textfield** và lọc để sử dụng chúng trong một **network request**. Chúng ta có thể làm như sau:

```
let selectedFilter = PassthroughSubject<String, Never>()
let searchText = PassthroughSubject<String, Never>()

let publisher = Publishers.CombineLatest(selectedFilter,searchText).map {
    selectedFilter, searchText in
    "\(selectedFilter) \(searchText)"
}

_ = publisher.sink { value in
    print(value)
}
```
### **3. Scan**
**Scan** hoạt động tương tự **reduce** trong Swift. Nó kết hợp phần tử hiện tại với giá trị cuối cùng được trả về bằng cách áp dụng hàm closure.

![image.png](https://images.viblo.asia/96ffb1f8-371a-4864-a455-2aa8b870f331.png)

```
_ = Publishers.Sequence(sequence: [1,2,3,4,5])
    .flatMap {Just($0) }
    .scan(0, +)
    .sink(receiveValue: { value in
        print(value)
    })
```

```
Output:
1
3
6
10
15
```
### **Schedulers**
Một scheduler về cơ bản xác định thời điểm và cách thực hiện closure. Nó có thể thực sự hữu ích khi chúng ta, ví dụ, muốn trì hoãn việc thực hiện một chức năng cụ thể. Hãy để sử dụng lại ví dụ trước đây của chúng ta về việc kết hợp filter đã chọn với search text. Lần này chúng ta muốn tránh khi người dùng gõ nhanh và chỉ nhận các sự kiện khi có thời gian cách 0.5 giây. Chúng ta có thể sử dụng toán tử debounce để làm điều đó.

```
let selectedFilter = PassthroughSubject<String, Never>()
let searchText =  NotificationCenter.default
    .publisher(for: UITextField.textDidChangeNotification, object: selectedFilter)
    .map( { ($0.object as! UITextField).text } )
    .debounce(for: .milliseconds(500), scheduler: RunLoop.main)
    .eraseToAnyPublisher()


let publisher = Publishers.CombineLatest(selectedFilter,searchText).map { selectedFilter, searchText in
    "\(selectedFilter) \(searchText)"
}

_ = publisher.sink { value in
    print(value)
}

```
## **Kết luận**

Combine framework là framework mới nhất của iOS giúp xử lý các luồng dữ liệu. Trong bài viết này, mình đã giải thích các yếu tố cơ bản nhất trong Combine Swift và đã giải thích bằng cách sử dụng các ví dụ cơ bản về CombineSwift.

Reference: https://medium.com/flawless-app-stories/problem-solving-with-combine-swift-4751885fda77