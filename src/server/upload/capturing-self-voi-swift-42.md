Block ngày nay là một cách ngày rất phổ biến để cung cấp callback cho các chức năng không đồng bộ.

Với bản Swift 4.2 gần đây, Apple đã giới thiệu một thay đổi thú vị, nhưng trước tiên hãy xem lại "capture" nghĩa là gì nhé.

Các block trong Swift trông như dưới đây:

```
doSomething(then: {
  // do something else
})
```

Do các cơ chế quản lý bộ nhớ, nếu chúng ta cần truy cập vào biến cục bộ trong block đó, thì nó phải được ghi lại.

```
var dog = Dog()
doSomething(then: {
  dog.bark() // dog must be captured so it will live long enough
})
```

Trình biên dịch Swift tự động quản lý việc này cho bạn. Con chó sẽ được lưu lại (do đó làm tăng *reference* đến nó) và bạn có thể đảm bảo rằng mặc dù cá thể chó ra khỏi phạm vi hiện tại, block vẫn giữ nó.

Đôi khi bạn không muốn hành vi này. Lý do phổ biến nhất là trường hợp bạn cần gọi một phương thức self bên trong block. Block sẽ giữ *self* và do đó tạo một biểu đồ phụ thuộc hai chiều, còn được gọi là retain cycle.

![](https://images.viblo.asia/80cc9c14-456d-4f10-a124-47114d0277ce.png)

Việc này là rất nên tránh bởi vì nó có nghĩa là *self* không bao giờ có thể được giải phóng nếu block còn tồn tại. Thông thường, các block được lưu trữ dưới dạng các thuộc tính ví dụ hoặc dưới dạng *observers* cho *KVO* hoặc *notifications* và thời gian tồn tại của chúng bị ràng buộc với *self*.

Nếu bạn đã làm điều này, xin chúc mừng ... bạn đã bị rò rỉ bộ nhớ.

## Tránh hiện tượng Retain Cycles

Để tránh điều này, bạn có thể làm như dưới đây:

```
let dog = Dog()
doSomething(then: { [weak dog] in
    // dog is now Optional<Dog>
    dog?.bark()
)
```

Điều này cũng có tác dụng với *self*:

```
doSomething(then: { [weak self] in
    self?.doSomethingElse()
)
```

Bằng cách định nghĩa *weak* cho *self*, bạn đang nói với block là không thực hiện tham chiếu tới *self*.

## Strong-Weak
Nếu bạn cần đảm bảo rằng các mục trong block thực thi, bạn có thể tạo một tham chiếu mạnh mới bên trong khối. 

```
doSomething(then: { [weak self] in
    guard let strongSelf = self { else return }
    strongSelf.doSomethingElse()
)
```

Trong ví dụ trên, chúng ta đảm bảo rằng tham chiếu strongSelf của chúng ta tồn tại trong phạm vi của khối.

Phương pháp này khá phổ biến trong các dự án Swift, nhưng luôn cảm thấy hơi kỳ quặc.

Bạn cũng có thể viết thế này:

```
guard let `self` = self else { return }
```

## Trở lại với Swift 4.2
Ok, trở lại tiêu đề của bài viết này.

Swift 4.2 gần đây đã thông qua một đề xuất để thêm điều này vào ngôn ngữ và nó giúp tránh một số từ kì lạ như `self`:

```
guard let self = self else { return }
```

Bài viết được dịch từ https://benscheirman.com/2018/09/capturing-self-with-swift-4-2/?utm_campaign=Swift%20Weekly&utm_medium=Swift%20Weekly%20Newsletter%20Issue%20131&utm_source=Swift%20Weekly