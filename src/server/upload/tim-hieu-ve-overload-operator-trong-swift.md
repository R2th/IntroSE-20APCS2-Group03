# I. Giới thiệu

*note: dành cho các bạn chưa biết, operator là toán tử, chính là các phép toàn +, -, *, /, …

Đối với bất kỳ ngôn ngữ lập trình nào, operator cũng là một phần không thể thiếu. Thử tưởng tượng xem nếu chúng ta code mà không có operator như +, - *, \, thì chúng ta sẽ code kiểu gì? Trong nhiều ngôn ngữ lập trình, chúng ta không thể overload operator, mà chỉ có thể sử dụng các operator có sẵn. Swift thì khác, các operator trên Swift đều có thể được overload, chúng ta có thể viết thêm các operator để thực hiện các công việc mà mình mong muốn.

Trong bài viết này, tôi sẽ giới thiệu cách mà operator được overload trong Swift

# II. Nội dung

Đầu tiên, chúng ta mở Xcode và tạo một playground. Trong bài này chúng ta chỉ cần làm việc với code Swift, vậy nên không nhất thiết phải tạo một project cho mất thời gian và phức tạp.

Trong nội dung bài viết này, tôi sẽ tạo các operator cho CGPoint để tạo các toán tử 

## 1. +, -, *, / opeartor

Đầu tiên, các bạn thêm code sau vào playground:
```Swift
let a = CGPoint(x: 3, y: 2)
let b = CGPoint(x: 4, y: 6)

let c = a + b
print(c)
```
Chạy playground, lỗi xuất hiện với nội dung như sau:

**Binary operator '+' cannot be applied to two 'CGPoint' operands**

Ở đây có lỗi là rất bình thường, bởi vì trong Swift làm gì có phép toán cộng cho 2 instance của CGPoint. Rất may, chúng ta có thể tự viết operator này. Để thêm phép toán cộng cho CGPoint, chúng ta thêm code vào bên trên đầu của playground như sau:
```Swift
func +(left: CGPoint, right: CGPoint) -> CGPoint {
    return CGPoint(x: left.x + right.x, y: left.x + right.y)
}
```

Trong đoạn code trên, chúng ta định nghĩa phép toán cộng cho 2 instance của CGPoint, giá trị trả về của phép toán này được trả về bên trong func

Sau khi thêm operator, dễ thấy playground đã không còn lỗi, trên console log hiển thị kết quả của instance c với giá trị (7.0, 9.0)

Tương tự, với các phép toán -, *, / chúng ta cũng có thể thêm như sau:

```Swift
func -(left: CGPoint, right: CGPoint) -> CGPoint {
    return CGPoint(x: left.x - right.x, y: left.x - right.y)
}

func *(left: CGPoint, right: CGPoint) -> CGPoint {
    return CGPoint(x: left.x * right.x, y: left.x * right.y)
}

func /(left: CGPoint, right: CGPoint) -> CGPoint {
    return CGPoint(x: left.x / right.x, y: left.x / right.y)
}
```

Sau khi định nghĩa các operator, chúng ta đã có thể sử dụng các phép toán +, -, *, / cho CGPoint
```Swift
let d = a * b
print(d)  // (12.0, 18.0)
```

## 2. Các loại Operator
Trong Swift, Operator được chia thành các type như sau:
* infix operator: đây là operator viết giữa 2 value. các phép toán cộng, trừ, nhân, chia bên trên thuộc vào loại operator này
* prefix operator: đây là operator viết đằng trước value. (ví dụ -3 thì “-“ là prefix operator)
* postfix operator: đây là operator viết đằng sau value. (ví dụ, a! thì “!” - force-unwrap operator là postfix operator)
* ternary operator: đây là operator viết giữa 3 value. Swift chỉ có 1 operator và chúng ta không thể overload ternary operator.

Để viết prefix operator, chúng ta viết như sau:
```Swift
prefix func -(point: CGPoint) -> CGPoint {
    return CGPoint(x: -point.x, y: -point.y)
}


let e = -a
print(e) // (-3.0, -2.0) 
```
Đối với postfix, chúng ta viết như sau:
```Swift
postfix func ++(point: CGPoint) -> CGPoint {
    return CGPoint(x: point.x + 1, y: point.y + 1)
}

let f = b++
print(f) // (5.0, 7.0)
 ```
## 3. Operator giữa các kiểu dữ liệu khác nhau

Trong Swift, operator hoàn toàn có thể sử dụng giữa các kiểu dữ liệu khác nhau. Ví dụ, để nhân một instance kiểu CGPoint với một số kiểu CGFloat, nếu không dùng overload operator chúng ta có thể tạo extension cho CGPoint như sau:
```Swift
extension CGPoint {
    func multiply(factor: CGFloat) -> CGPoint {
        return CGPoint(x: self.x * factor, y: self.y * factor)
    }
}

let f = a.multiply(factor: 4) // (12.0, 8.0)
```

Bây giờ sử dụng overload operator chúng ta có thể làm như sau:

```Swift
func *(left: CGPoint, right: CGFloat) -> CGPoint {
    return CGPoint(x: left.x * right, y: left.y * right)
}

func *(left: CGFloat, right: CGPoint) -> CGPoint {
    return CGPoint(x: right.x * left, y: right.y * left)
}

let g = a * 4
print(g) // (12.0, 8.0)
let h = 4 * a
print(h) // (12.0, 8.0)
```

*Chú ý, bên trên chúng ta phải viết 2 hàm cho phép nhân để có thể sử dụng tính chất giao hoán của phép nhân*

# III. Tổng kết

Trên đây tôi đã giới thiệu đến các bạn cách overload operator, việc sử dụng custom operator sẽ giúp ích các bạn rất nhiều trong những trường hợp chúng ta cần rule riêng cho phép toán. Những trường hợp như vậy, sử dụng custom operator sẽ làm code trở nên gọn gàng hơn và dễ đọc, dễ hiểu hơn.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!