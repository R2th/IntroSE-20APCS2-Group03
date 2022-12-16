Generics là một tính năng mạnh mẽ mà chúng ta sử dụng hàng ngày khi sử dụng thư viện chuẩn của Swift. Mọi thứ có vẻ khó khăn khi bạn lần đầu tiên sử dụng với Generics, thường có sự nhầm lẫn về việc nên sử dụng cái gì / tại sao / khi nào / như nào. Bài viết này mình sẽ  ví dụ hoạt động của việc viết một generic và giải thích các lợi ích của nó, hi vọng mọi người sẽ hiểu hơn về Generic.

**Vấn đề**

Hãy tưởng tượng rằng chúng ta muốn một hàm sẽ lấy một mảng các hình dạng và loại bỏ bất kỳ phần tử nào có diện tích nhỏ hơn 100. Hàm này có thể xử lý nhiều loại hình dạng khác nhau - dưới đây là ví dụ về hai loại hình vuông và chữ nhật:

```
struct Rectangle: Equatable {
    let width: Double
    let height: Double

    func area() -> Double {
        return width * height
    }
}

struct Square: Equatable {
    let length: Double

    func area() -> Double {
        return length * length
    }
}
```

**Lần thử đầu tiên**

Có rất nhiều cách để giải quyết vấn đề này.  Cách đầu tiên nếu không sử dụng generic, chúng ta có thể thử viết một hàm bỏ qua kiểu cụ thể bằng cách sử dụng Any.

```
func filterSmallShapes(_ shapes: [Any]) -> [Any]
```

Để thực hiện, chúng ta cần truyền loại hình dạng, gọi hàm tính diện tích và so sánh nó với 100.

```
func filterSmallShapes(_ shapes: [Any]) -> [Any] {
    return shapes.filter {
        if let square = $0 as? Square {
            return square.area() > 100
        } else if let rectangle = $0 as? Rectangle {
            return rectangle.area() > 100
        } else {
            fatalError("Unhandled shape")
        }
    }
}
```

Việc này có một số điểm không hay như sau:
1: Có thể bị run time crash nếu chúng ta truyền vào kiểu khác Rectangle và Square.
2: Logic so sánh bị lặp lại (so sánh > 100)
3: Hàm có thể bị phình ra nếu ta thêm các loại hình dáng khác chẳng hạn như hình tròn hay tam giác...
4: Hàm trả về mảng Any, nghĩa là chúng ta cần cast nó sang kiểu khác sau này.

**Lần thử thứ hai**

Lần này mình sử dụng protocol để chúng ta không cần phải cast cho từng loại hình dạng. Điều này sẽ giải quyết các vấn đề 1, 2 và 3.

```
protocol Sizeable {
    func area() -> Double
}

extension Rectangle: Sizeable {}
extension Square: Sizeable {}

func filterSmallShapes(_ shapes: [Sizeable]) -> [Sizeable] {
    return shapes.filter { $0.area() > 100 }
}
```

Việc triển khai này là một bước tiến lớn nhưng hiện tại chúng ta vẫn chỉ nhận được mảng *Sizable* , điều này cũng giống như cách thứ nhất khi nhận được mảng *Any*.

**Lần thử thứ 3:**

Để giải quyết tất cả các vấn đề mà chúng ta đã gặp phải từ 2 cách trên, chúng ta có thể chia tách ra làm hai hàm riêng biệt như dưới:

```
func filterSmallShapes(_ shapes: [Rectangle]) -> [Rectangle] {
    return shapes.filter { $0.area() > 100 }
}

func filterSmallShapes(_ shapes: [Square]) -> [Square] {
    return shapes.filter { $0.area() > 100 }
}
```

Cách này chạy được nhưng chúng ta đã lại gặp phải một số vấn đề từ lần thử đầu tiên:

1) Logic bị lặp lại.
2) Hàm sẽ bị lặp lại nếu chúng ta có nhiều kiểu hình dáng hơn.

**Sử dụng Generic**

Cách tiếp cận này là sự kết hợp của những cách ở trên. Ý tưởng là chúng ta sẽ yêu cầu Swift tạo ra các phiên bản khác nhau của hàm (giống như trong lần thử 3) bằng cách cung cấp một chức năng chung mà nó có thể sử dụng.

```
func filterSmallShapes<Shape: Sizeable>(_ shapes: [Shape]) -> [Shape] {
    return shapes.filter { $0.area() > 100 }
}
```

Phần thân hàm giống hệt với lần thứ hai, sự thay đổi thực sự nằm trong định nghĩa của hàm. Chúng ta đã giới thiệu một kiểu *placeholder* giữa <> mà chúng ta đã gọi là *Shape*. Loại *placeholder* này có một số ràng buộc được đặt theo nó trong đó chúng tôi đang nói rằng nó phải là một loại phù hợp với Sizable, điều này được biểu thị bằng cách viết **Sizable** sau dấu **:**

Kết luận:
Viết các chức năng đầu tiên của bạn sử dụng Generic có thể hơi khó khăn nhưng nó đáng để học. Trong ví dụ trên, chúng ta đã giải quyết được bài toán khi mà  không còn sự trùng lặp logic và chúng ta không còn bị crash trong lúc chạy.

Tham khảo: https://paul-samuels.com/blog/2019/02/05/hands-on-generics-in-swift/?utm_campaign=Swift%20Weekly&utm_medium=email&utm_source=Revue%20newsletter