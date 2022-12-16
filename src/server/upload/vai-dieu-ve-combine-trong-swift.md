![](https://images.viblo.asia/6fe5f90f-36e8-44ed-a322-296f844412d7.jpeg)

## 1. Combine là gì?
Combine là một framework được cung cấp bởi Apple viết bằng  Swift API để xử lý các giá trị theo thời gian. Nó có thể đại diện cho nhiều sự kiện bất đồng bộ.

Vì vậy trong imperative programming, khi gán a = b + c tức là a sẽ được gắn bằng kết quả của b và c, trong khi đó b và c có thể thay đổi giá trị mà không ảnh hưởng đến a.
Giá trị của a sẽ thay đổi khi b hoặc c thay đổi mà không cần gọi lại câu lệnh ban đầu nữa. 

Để hiểu được Combine bạn cần nắm được 3 điều sau:
* Publisher và subscriber
* Operator
* Subject

## 2. Publisher.
Nó là một protocol khái báo một kiểu có thể chứa 1 chuỗi các sự kiện theo thời gian. Một Publisher nếu không có Subscription sẽ không phát ra bất kì sự kiện nào.


Input và Failure của Subscriber phải matching với Input và Failure của Publisher. Publisher thự hiện hàm `receive(subscriber:)` để accept vào một subscriber.
Publisher có thể gọi 3 hàm tương ứng trên subsciber:
* `receive(subscription:)`: xác nhận yêu cầu của subscriber và trả về một subscription, và từ đó subscriber sẽ quyết định số lượng sự kiện publisher sẽ phát ra.
* `receive(_:)`: Cung cấp một phần tử từ Publisher tời Subscriber.
* `receive(completion:)`:  thông báo kết thúc của publisher kèm theo thông báo thành công hoặc lỗi.

### Custom Publisher:
Bạn có thể tạo một Publisher cho riêng mình thông quá một số type được cung cấp bởi Combine framework:
* Sử dụng Subject như `PassthroughtSubject` và sử dụng method `send(_:)` để truyền value
* Sử dung `CurrentValueSubject`
* Thêm `@Published` trước property để thông báo khi có thay đổi giá trị 

## 3. Subscriber là gì?
Nó có trách nhiệm yêu cầu giá trị và nhận giá trị cũng như lỗi từ Publisher. Có nhiều cách để tạo subscriber trong Combine:
* `Assign` áp dụng giá trị mới vào dự theo keypath
* `Sink` giá trị được accept vào một closure.
* `onReceive(publisher)`: hàm sử dụng view như một subscriber có thể vận dụng @State và @Binding của SwiftUI

``` swift
struct CustomView : View {
@State private var currentStatus = "enabled"
    var body: some View {
        Text("Current status: \(currentStatus)")
        .onReceive(MyPublisher.currentStatusPublisher) { 
                self.currentStatusValue = $0
            }
    }
}
```

## 4. Operators.
Đây là các hàm được tạo sẵn được đưa vào Publisher, có thể tham chiếu theo tài liệu của Apple. Như `map`,  `scan`,..
Mỗi loại sẽ thực hiện một chức năng cụ thể khác nhau.

## 5. Subject.
Nó được coi như một Publisher đặc biệt, bạn có thể inject giá trị vào stream thông qua hàm `send(:)` .

Có hai loại Subject chính là `PassthroughtSubject` và `CurrentValueSubject`. Điểm khác nhau của 2 loại là với `CurrentValueSubject` khi khởi tạo sẽ được truyền vào một giá trị khởi tạo và sẽ được emit khi có subscriber nó.


## 6. Một vài ví dụ .
### Future: custom 1 publisher
``` swift
let futureAsyncPublisher = Future<Bool, Error> { promise in 
    CNContactStore().requestAccess(for: .contacts) { grantedAccess, err in 
        // err is an optional
        if let err = err { 
            promise(.failure(err))
        }
        return promise(.success(grantedAccess)) 
    }
}
```

Chúng ta có thể emit ra 1 giá trị hoặc 1 lỗi

### Map: transform giá trị
``` swift
struct MyStruct {
    isValid: bool = true
}
//
Just(MyStruct())
.map { inValue -> Bool in 
  inValue.isValid 
}
```

### Filter: lọc giá trị
``` swift
let isLogin = true
Just(isLogin)
    .filter($0)
    .sink()
```

### CombineLatest:
Kết hợp nhiều publisher lại với nhau và trả về 1 tuple giá trị, và sẽ được cập nhật khi upsteam có giá trị mới.

```swift
let pub1 = PassthroughSubject<Int, Never>()
let pub2 = PassthroughSubject<Int, Never>()

cancellable = pub1
    .combineLatest(pub2)
    .sink { print("Result: \($0).") }

pub1.send(2)
pub2.send(2)
pub1.send(3)
pub1.send(45)
pub2.send(22)
```

Ở trên là các điều cơ bản nhất của Combine để giúp bạn hình dung được về Combine là gì. Để có thể hiểu rõ hơn bạn có thể tham khảo tại đây
https://heckj.github.io/swiftui-notes/