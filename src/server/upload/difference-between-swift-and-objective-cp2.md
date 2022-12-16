### Nội dung

- Giới thiệu
- Classes and Structures
- Structures
- Computed Properties
- Tổng kết

### Giới thiệu

Qua phần 1 chúng ta đã tìm hiểu về lịch sử phát triển của hệ điều hành iOS cùng các khái niệm cơ bản của Swift - ngôn ngữ mới Apple sử dụng để phát triển hệ điều hành iOS. Ở phần 2 này chúng ta sẽ tiếp tục tìm hiểu các khái niệm nâng cao về Swift và biết thêm về những cải tiến mà Apple đã apply vào ngôn ngữ tuyệt vời này.

**Nào chúng ta cùng bắt đầu!**

### Classes and Structures

Không giống như Objective-C, Swift không yêu cầu tạo file cho interface và implementation riêng cho class và structure mà tạo trong cùng một file **.swift**. Chúng ta cùng theo dõi ví dụ dưới đây:

```Swift
class Bottle
{
   var volume: Int = 1000
   var label:String

   func description() -> String
   {
       return "This bottle of \(label) has \(volume) ml"
   }
}
```

Compiler sẽ báo lỗi vì label là kiểu biến **non-optional** và không có giá trị khi **Bottle** được cài đặt. Chúng ta cần setup giá trị cho nó trong hàm **initializer** như sau:

```Swift
class Bottle
{
   var volume: Int = 1000
   var label:String

   init(label:String)
   {
       self.label = label
   }

   func description() -> String
   {
       return "This bottle of \(label) has \(volume) ml"
   }
}
```

Hoặc chúng ta có thể sử dụng kiểu **Optional** cho property mà không cần phải cài đặt giá trị cho nó.

```Swift
class Bottle
{
   var volume: Int?
   var label:String

   init(label:String)
   {
       self.label = label
   }

   func description() -> String
   {
        if self.volume != nil
        {
               return "This bottle of \(label) has \(volume!) ml"
           }
           else
           {
               return "A bootle of \(label)"
           }
   }
}

```

### Structures

Struct trong Swift linh hoạt hơn trong Objective-C. Chúng ta cùng theo dõi ví dụ dưới đây:

```Swift
struct Seat
{
    var row: Int
    var letter:String

    init (row: Int, letter:String)
    {
        self.row = row
        self.letter = letter
    }

    func description() -> String
    {
        return "\(row)-\(letter)"
    }
}
```

Giống Class trong Swift, Structure cũng có Method, Property. Điểm khác chính là Class là kiểu **tham chiếu** còn Struct là kiểu **value**. Chúng ta cùng theo dõi ví dụ dưới đây để thấy rõ điều này:

```Swift
let b = Bottle()
print(b.description())    // "b" bottle has 1000 ml

var b2 = b
b.volume = 750
print(b2.description())    // "b" and "b2" bottles have 750 ml
```

Chúng ta cùng thử với Struct, bạn sẽ thấy biến được gán theo value:

```Swift
var s1 = Seat(row: 14, letter:"A")
var s2 = s1
s1.letter = "B"
print(s1.description())    // 14-B
print(s2.description())    // 14-A
```

Vậy khi nào chúng ta nên sử dụng Struct và khi nào sử dụng Class?

Trong Objective-C và C, chúng ta sử dụng Struct khi cần nhóm vài value và mong muốn copy hơn là reference. Ví dụ như: số thức tạp, 2D, 3D hoặc màu RGB.

### Properties

Như chúng ta đã biết Property trong Swift được khai báo với từ khóa var trong định nghĩa class hoặc struct. Chúng ta cũng có thể khai báo constant với từ khóa let

```Swift
struct FixedPointNumber
{
    var digits: Int
    let decimals: Int
}

var n = FixedPointNumber(digits: 12345, decimals: 2)
n.digits = 4567    // ok
n.decimals = 3     // error, decimals is a constant
```

Chúng ta cũng biết rằng Class properties mặc định là **strong reference**. Chúng ta có thể chuyển thành weak reference nếu thêm từ khóa weak.

### Computed Properties

Computed properties thực tế không lưu value. Thay vì thế, chúng cung cấp getter và optional setter để nhận giá trị và set properties khác và giá trị gián tiếp.

Ví dụ dưới đây về computed value **sign**:

```Swift
enum Sign
{
    case Positive
    case Negative
}

struct SomeNumber
{
    var number:Int
    var sign:Sign
    {
        get
        {
            if number < 0
            {
                return Sign.Negative
            }
            else
            {
                return Sign.Positive
            }
        }

        set (newSign)
        {
            if (newSign == Sign.Negative)
            {
                self.number = -abs(self.number)
            }
            else
            {
                self.number = abs(self.number)
            }
        }
    }
}
```

Chúng ta cũng có thể định nghĩa read-only properties bằng việc chỉ implement getter:

```Swift
struct SomeNumber
{
    var number:Int
    var isEven:Bool
    {
        get
        {
            return number % 2 == 0
        }
    }
}

```

Trong Objective-C, properties thường được hỗ trợ bởi instance variable, khai báo rõ ràng hoặc tự động tạo bởi compiler. Trong Swift, theo cách khác, property không có instance variable tương ứng. Do đó các bản sao của property không thể truy cập trực tiếp như trong Objective-C.

```Swift
// .h
@interface OnlyInitialString : NSObject

@property(strong) NSString *string;

@end

// .m

@implementation OnlyInitialString

- (void)setString:(NSString *newString)
{
    if (newString.length > 0)
    {
        _string = [newString substringToIndex:1];
    }
    else
    {
        _string = @"";
    }
}

@end
```

Trong swift, computed properties không có bản sao và cần thực hiện như sau:

```Swift
class OnlyInitialString
{
    var initial:String = ""
    var string:String
    {
        set (newString)
        {
            if countElements(newString) > 0
            {
                self.initial = newString.substringToIndex(advance(newString.startIndex, 1))
            }
            else
            {
                self.initial = ""
            }
        }
        get
        {
            return self.initial
        }
    }
}

```

### Tổng kết

Thông qua phần 2 của bài viết này, chúng ta đã hiểu thêm về sự khác nhau về những khái niệm nâng cao giữa Swift và Objective-C:

- Classes and Structures
- Structures
- Computed Properties

Trong bài viết ngắn này tôi không thể mô tả toàn bộ về Swift cũng như sự khách nhau giữa Swift và Objective-C. Rất hi vọng rằng bài viết này sẽ giúp các bạn iOS developer nắm được những sự thay đổi cơ bản và cách mạng trong ngôn ngữ mới tuyệt vời này.

**Hẹn gặp các bạn trong các bài viết sau nhé!**

##### _Nguồn:_

[https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html)

[https://www.toptal.com/swift/from-objective-c-to-swift](https://www.toptal.com/swift/from-objective-c-to-swift)