![](https://images.viblo.asia/a32ca01c-b6bf-4ae1-843f-3f2f781a9796.png)

Các ứng dụng hiện nay xử lý rất nhiều sự kiện thời gian thực nhằm nâng cao trải nghiệm cho người dùng. Chúng ta cần các công cụ để xử lý  các sự kiện này. Framework mới nhất của Apple liệu có phải là câu trả lời cho điều đó?

## Giới thiệu
Combine framework là declarative framework mới nhất giúp xử lý các giá trị theo thời gian thực.
Hiểu biết về Combine Swift và SwiftUI là điều bắt buộc nếu bạn bắt kịp với xu hướng chung của iOS.
Combine làm tăng mức độ trừu tượng trong code của bạn để bạn có thể tập trung vào các sự kiện xác định business logic, thay vì phải liên tục sử dụng một số lượng lớn vào chi tiết implementation thì code của bạn sẽ ngắn gọn hơn.
Combine framework được thiết kế để cung cấp cho chúng ta những lợi ích sau:
- Đơn giản hóa xử lý code bất đồng bộ.
- Đơn giản hóa xử lý đa luồng.
- Kết hợp các thành phần với nhau.
- Đa nền tảng

**Tư duy Reactive**
Combine Swift là một Reactive Programming Framework. Reactive programming về cơ bản là lập trình với các luồng dữ liệu không đồng bộ.
Một luồng có thể đại diện cho các sự kiện giao diện người dùng, phản hồi mạng, sự kiện được lên lịch sẵn và nhiều loại dữ liệu không đồng bộ khác.
Ví dụ với các lần bấm vào nút, luồng sẽ giống như sau.

![](https://images.viblo.asia/a80cb43c-5825-4883-9139-1b9e6b9e2eab.png)

Chúng ta đã sử dụng các luồng dữ liệu không đồng bộ trong lập trình iOS, Notification Centre hoặc các sự kiện nhấp chuột từ các thành phần UI đã là các luồng sự kiện không đồng bộ. Theo một cách nào đó, bạn quan sát các sự kiện đó và quyết định cách xử lý tương ứng.
Với Combine Swift, chúng ta có cùng một ý tưởng, nhưng chúng ta có thể tạo ra các luồng dữ liệu từ bất cứ thứ gì. Mọi thứ nên được coi là một chuỗi dữ liệu theo thời gian.
Điều làm cho Combine Swift trở nên mạnh mẽ hơn nữa là bạn có các chức năng tuyệt vời được cung cấp sẵn từ framework. Bạn có thể combine, merge, filter streams, sử dụng một stream làm tham số đầu vào của một stream khác và còn rất nhiều thứ thú vị khác.

### Những điều thiếu yếu nhất của Combine Swift
Combine Swift là một trong những framework mới nhất được Apple giới thiệu. Vì vậy, trước tiên chúng ta sẽ khám phá một số điều thiết yếu của nó và sau đó sẽ làm quen với việc sử dụng nó.

**1. Publishers và Subscribers**
Điều quan trọng nhất cần nắm rõ trong Combine là publishers và subscribers.
Một Publisher là loại có thể phân phối một chuỗi các giá trị theo thời gian và một Subscriber sẽ đăng ký với Publisher để nhận các giá trị đó.
Hãy thử tạo ra một số Publishers đơn giản bằng cách sử dụng Combine:

```
let publisher = Publishers.Just("Combine Swift")
let sequencePublisher = let publisher = Publishers.Sequence(sequence: [1,2,3,5,6])
```

Bạn có thể đăng ký với một publisher bằng cách sử dụng hàm sink

```
let publisher = Publishers.Just("Combine Swift")
let subscribtion = publisher.sink { value in
  print(value)
}
```

> OUTPUT:
Combine Swift

Bạn cũng có thể sử dụng phương thức sink để nhận sự kiện từ publisher khi nó kết thúc

```
let subscriber = publisher.sink(receiveCompletion: { _ in
    print("finished")
}) { value in
    print(value)
}
```

> OUTPUT:
Combine Swift
finished

Subscribers cũng có thể được hủy bất kì lúc nào để tránh nhận sự kiện từ publisher đơn giản bằng cách gọi cancel.

```
subscriber.cancel()
```

Vậy là phần 1 mình đã giới thiệu với các bạn về Combine framework cũng như publisher và subscriber. Hẹn gặp các bạn ở các phần sau.
Tham khảo: https://medium.com/flawless-app-stories/problem-solving-with-combine-swift-4751885fda77