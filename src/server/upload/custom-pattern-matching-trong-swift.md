Gần đây mình tình có tìm hiểu về các components trong lập trình iOS thì có đọc được một bài viết khá hay về Custom Pattern Matching, nay mạn phép dịch lại và chia sẻ đến mọi người :sweat_smile:
<br><h3> **Custom Pattern Matching**</h3><br>
Pattern matching có mặt mọi nơi trong Swift, có lẽ bạn cũng đã sử dụng nó cả ngàn lần để deconstruct và bind các giá trị như trong các trường hợp của `switch`.  Swift có nhiều dạng khuôn mẫu có thể kết hợp và sử dụng thậm chí ở ngoài `switches` để cho ra những dòng code ngắn gọn và ngầu :joy:.<br>
Đầu tiên, chúng ta hãy xem pattern matching trong một ví dụ kiểm tra so sánh bằng đơn giản:
<br>
```
switch 80 {
case 100:
    //
case 80:
    // Matches, bởi vì 80 == 80
default:
    break
}
```
Và có vài loại có những tương tác với nhau như là Ranges và các kiểu kết hợp như là:
<br>
```
switch 80 {
case 0...20:
	break
case 21...50:
    break
case 51...100:
    //Matches, bởi vì 80 nằm trong khoảng 51...100
default:
    break
}
```
Để có thể matching được trong khoảng giá trị như vậy là vì `~=` pattern matching operator. Toán tử này không được thấy nhiều trong các dự án thường gặp, nhưng nó được sử dụng rất nhiều nội bộ bên trong Swift và nó chính là toán tử được sử dụng trong xác nhận các câu lệnh case.<br>
Trong hầu hết trường hợp, toán tử là một đóng gói đơn giản cho việc kiểm tra bằng nhau (như ví dụ Int ở trên) nhưng `Range` có một cài đặt đặt biệt cho `~=` cho phép chúng có thể có chế độ custom:<br>
```
extension RangeExpression {
    @inlinable
    public static func ~= (pattern: Self, value: Bound) -> Bool {
      return pattern.contains(value)
    }
}
```
Và chúng ta có thể overload nó `~=` để viết riêng một pattern matching logic.
<br>
Ví dụ để có thể match "eighty" với 80, điều chúng ta cần làm là thêm một phiên bản của toán tử match giá trị `String` với  `Int`:<br>
```
func ~= (pattern: String, value: Int) -> Bool {
    if pattern == "eighty" {
        return value == 80
    } else if pattern == "not eighty" {
        return value != 80
    } else {
        return false
    }
}

switch 80 {
case "eighty":
    //Compiles and matches!
case "not eighty":
    //
default:
   break
}
```
Trong trường hợp cụ thể, bên backend team muốn trả về cho bạn ngày trong tuần là một `Int` hoặc `String`. Và với custom pattern matching, bạn có thể sử dụng kiểu bao quát hơn trong khi vẫn xử lý nó giống như nó được ánh xạ tới loại enum cụ thể hơn. Điều này có thể hữu dụng khi bạn muốn thử những khái niệm mà không cần phải sử dụng những kiểu nhất định:<br>
```
enum WeekDay: Int {
    case sunday
    case monday
    case tuesday
    case wednesday
    case thursday
    case friday
    case saturday
}

func ~= (pattern: WeekDay, value: Int) -> Bool {
    return pattern.rawValue == value
}

// Server trả về:
// { nextHoliday: { weekDay: 5 } }

if case .friday? = nextHoliday?.weekDay {
    print("Woohoo!")
}
```
Việc tạo lập những khuôn mẫu tuỳ chọn là cách đơn giản để viết code clean hơn mà không cần quá nhiều nỗ lực. Bởi vì bạn có thể tận dụng `cases` để vào thẳng điểm nào đó mà không nhất thiết phải bỏ thêm các thuộc tính khác vào các kiểu của bạn - Và để chắc chắn là những dòng code của bạn không trở nên khó hơn để hiểu.<br>
Hi vọng sau bài viết này mọi người sẽ thử overload và sử dụng toán tử `~=` trong các trường hợp như thế này nhé :heart_eyes:.<br>

Bài viết này mình tham khảo từ một blog khá nổi tiếng https://swiftrocks.com/writing-custom-pattern-matching-rules-in-swift.html, trong này có nhiều bài viết khá hay, nếu có cơ hội mình sẽ tranh thủ dịch hết những bài này. :hugs:.