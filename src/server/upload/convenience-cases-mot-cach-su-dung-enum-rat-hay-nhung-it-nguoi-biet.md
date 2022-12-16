Giả sử chúng ta đang xây dựng một ứng dụng cần nhiều animation. Chúng ta define một enum RepeatMode để điều khiển số lần animation lặp lại trước khi bị remove.

Cách implement đơn giản nhất có lẽ là sử dụng một biến Int để thể hiện số lần animation lặp lại, nhưng chúng ta lại không thích thế, mà sẽ làm như sau để nhấn mạnh vào những kiểu lặp lại hay được sử dụng, chẳng hạn 1 lần (once) hay không bao giờ (never):

```swift
extension Animation {
    enum RepeatMode: Equatable {
        case once
        case times(Int)
        case never
        case forever
    }
}
```

Tuy nhìn qua thì API này trông có vẻ rất gọn gàng (vì từ ngoài chúng ta chỉ cần sử dụng cú pháp của enum để điều khiển số lần repeat, chẳng hạn **.times(5)** và **.forever**), nhưng đoạn code bên trong để xử lý các trường hợp này thì lại rất cồng kềnh, vì chúng ta cần xử lý từng case của RepeatMode riêng, mặc dù logic khá là giống nhau:

```swift
func animationDidFinish(_ animation: Animation) {
    switch animation.repeatMode {
    case .once:
        if animation.playCount == 1 {
            startAnimation(animation)
        }
    case .times(let times):
        if animation.playCount <= times {
            startAnimation(animation)
        }
    case .never:
        break
    case .forever:
        startAnimation(animation)
    }
}
```

Cần phải code lại đoạn này ngay, chứ để thế này ai mà đọc được thì ngại chết. Và để xử đẹp vụ này, chúng ta có thể sử dụng **convenience cases** - một cách dùng enum khá ít người biết. 

**Cách dùng như sau:**


Đầu tiên, chúng ta giảm lượng case của enum RepeatMode xuống còn 2 case, một case cho phép truyền vào một biến thể hiện số lần repeat, và một case để repeat forever.

```swift
extension Animation {
    enum RepeatMode: Equatable {
        case times(Int)
        case forever
    }
}
```

Sau đó, chúng ta extense Animation.RepeatMode:

```swift
extension Animation.RepeatMode {
    static var once: Self { .times(1) }
    static var never: Self { .times(0) }
}
```

Khi làm thế này, thì từ ngoài nhìn vào API Animation của chúng ta vẫn giống hệt như cũ, và cả đoạn code xử lý bên trong của chúng ta cũng chẳng phải thay đổi gì (nếu chúng ta để nguyên nó vẫn chạy tốt). 

Tất nhiên nếu bạn giữ nguyên đoạn switch như cũ, và truyền vào hàm animationDidFinish một Animation có **repeatMode == .once**, thì hàm switch sẽ nhảy vào case **.once**.

Đây là lúc câu chuyện trở nên thú vị, bạn hãy thử sửa lại đoạn switch thành như sau:

```swift
func animationDidFinish(_ animation: Animation) {
    switch animation.repeatMode {
    case .times(let times):
        if animation.playCount <= times {
            startAnimation(animation)
        }
    case .forever:
        startAnimation(animation)
    }
}
```

Và run thử, để thấy code vẫn compile và chạy ầm ầm, dù đã bỏ đi 2 case trong đoạn switch kia. 

Lúc này nếu bạn truyền một Animation với **repeatMode == .once** vào hàm animationDidFinish, thì đoạn switch kia sẽ nhảy vào case **.times(1)**.


Có thể thấy convenience cases có thể giúp code của chúng ta vừa ngắn gọn, vừa dễ hiểu hơn mà lại không làm thay đổi mục đích và cách sử dụng ban đầu.

Hi vọng bài viết của mình sẽ giúp các bạn có thêm một công cụ hữu ích khi code Swift.