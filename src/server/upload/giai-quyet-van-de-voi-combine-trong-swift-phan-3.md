Ở phần 2 mình đã giới thiệu với các bạn về Subject và một vài toán tử. Trong phần này chúng ta tiếp tục tìm hiểu về các toán tử trong **combine**. 

## Combining
Toán tử **combining** giúp kết hợp các phần tử từ các chuỗi không đồng bộ. Một số toán tử rất giống với toán tử Swift khi làm việc với mảng. Hãy để xem một số ví dụ.

### 1. Merge
Kết hợp các yếu tố từ hai **publishers** khác nhau cùng kiểu dữ liệu, tạo ra mội chuỗi các giá trị khác theo thời gian.

![](https://images.viblo.asia/253627ed-a46a-48af-9658-a372797befaf.png)

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

### 2. Combine Latest

**Combine Latest** tạo ra một **publisher** nhận và kết hợp các yếu tố mới nhất từ hai **publisher**.

![](https://images.viblo.asia/b9d3cadd-ebfb-49d5-85f3-89cfdbfe71b0.png)

Giả sử rằng chúng ta muốn kết hợp giá trị của một **textfield** và lọc để sử dụng chúng trong một **network request**. Chúng ta có thể làm như sau:

```
let selectedFilter = PassthroughSubject<String, Never>()
let searchText = PassthroughSubject<String, Never>()

let publisher = Publishers.CombineLatest(selectedFilter,searchText, transform: { selectedFilter, searchText in
    "\(selectedFilter) \(searchText)"
})

_ = publisher.sink { value in
    print(value)
}
```

### 3. Scan
**Scan** hoạt động tương tự **reduce** trong Swift. Nó kết hợp phần tử hiện tại với giá trị cuối cùng được trả về bằng cách áp dụng hàm closure.

![](https://images.viblo.asia/1f417488-01ae-4b82-8d84-24e5cd7b6f74.png)

```
_ = Publishers.Sequence(sequence: [1,2,3,4,5])
    .flatMap { Publishers.Just($0) }
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

## Schedulers

Một scheduler về cơ bản xác định thời điểm và cách thực hiện closure. Nó có thể thực sự hữu ích khi chúng ta, ví dụ, muốn trì hoãn việc thực hiện một chức năng cụ thể.
Hãy để sử dụng lại ví dụ trước đây của chúng ta về việc kết hợp filter đã chọn với search text. Lần này chúng ta muốn tránh khi người dùng gõ nhanh và chỉ nhận các sự kiện khi có thời gian cách 0.5 giây. Chúng ta có thể sử dụng toán tử debounce để làm điều đó.

```
let selectedFilter = PassthroughSubject<String, Never>()
let searchText =  NotificationCenter.default
    .publisher(for: UITextField.textDidChangeNotification, object: searchTextField)
    .map( { ($0.object as! UITextField).text } )
    .debounce(for: .milliseconds(500), scheduler: RunLoop.main)
    .eraseToAnyPublisher()


let publisher = Publishers.CombineLatest(selectedFilter,searchText, transform: { selectedFilter, searchText in
    "\(selectedFilter) \(searchText)"
})

_ = publisher.sink { value in
    print(value)
}
```

## Kết luận 
Combine framework là framework mới nhất của iOS giúp xử lý các luồng dữ liệu.
Trong bài viết này, mình đã giải thích các yếu tố cơ bản nhất trong Combine Swift và đã giải thích bằng cách sử dụng các ví dụ cơ bản về CombineSwift.

Reference: https://medium.com/flawless-app-stories/problem-solving-with-combine-swift-4751885fda77