# 1. Giới Thiệu
Trong Swift, Optional là một tính năng vô cùng mạnh mẽ giúp chương trình không bị crash. Chúng ta thường sử dụng Optional cho trường hợp một biến hoặc một hằng có thể có hoặc không có giá trị. Một cách dễ hiểu Optional giống như một chiếc cốc, có hai khả năng có thể xảy ra là cốc có thể có nước hoặc không có gì cả.

![](https://images.viblo.asia/3cb5db0c-e13b-47b3-ad25-61a933d1b830.jpg)



Kí hiệu của Optional là Optional <**T**> với **T** là kiểu dữ liệu.
``` Swift
let shortForm: Int? = Int("42")
let longForm: Optional<Int> = Int("42")
```
# 2. Force Unwrapping(!)
Trước khi sử dụng một biến optional, chúng ta phải unwrap cho biến đấy, nếu không conpiler ngay lập tức sẽ báo lỗi.
``` Swift
var stringOne: String? = "Say"
var stringTwo: StringOne + " Hello" 
        
//Error: Value of optional type 'String?' must be unwrapped to a value of type 'String'
```

Như bạn thấy ở trên, trình biên dịch báo rằng stringOne bây giờ là kiểu String? chứ không phải String. để sử dụng biến *stringOne* chúng ta  phải wraped cho biến Optinal. 

**Force Unwrapping**  là việc mà  chúng ta cam đoan với trình biên dịch rằng biến Optional **CHẮC CHẮN CÓ GIÁ TRỊ**
Để force unwrap chúng ta sử dụng dấu **!** phía sau biến đó.
``` Swift
var stringOne:String? = "Say"
var stringTwo = stringOne! + " Hello"        // "Say Hello"
```
# 3. Optional Binding
Cũng tương tự **Force Unwrapping** , **Optional Binding** là một cách để chúng ta Unwrap. Khác với **Force Unwrapping** là chúng ta phải cam kết với trình biên dịch rằng biến Optional chắc chắn có giá trị thì ở **Optional Binding** chúng ta sẽ kiểm tra xem biến Optional có chứa giá trị hay không? Nêu biến có chứa giá trị thì Unwrap ( thường sử dụng từ khoá **guard** hoặc **if** ).

#### Sử dụng if
``` Swift
let stringOne: String? = "Say"
if let subString = StringOne {
    let stringTwo = subString + " Hello"     // "Say Hello"
}
```


#### Sử dụng guard
``` Swift
func great(_ name: String?) {
    guard let unwrapped = name else {
        print("You did'n provide a name")
        return
    }
    print("Hello, \(unwrapped)")
}
```

# 4. Optional Chaining
Để truy cập một cách an toàn các thuộc tính và phương thức của một cá thể được wrapped , hãy sử dụng toán tử chuỗi tùy chọn postfix (postfix?). Ví dụ sau sử dụng chuỗi tùy chọn để truy cập phương thức hasSuffix ( _ : ) trên một String? instance

``` Swift
if imagePaths["star"]?.hasSuffix(".png") == true {
    print("The star image is in PNG format")
}
// Prints "The star image is in PNG format"
```

# 5. Sử Dụng Toán Tử  ??
Sử dụng toán tử liên kết nil (??) để cung cấp giá trị mặc định trong trường hợp biến đó đang nil. Dưới đây là một ví dụ . Ta có thể thấy imagePaths đang có giá trị là nil nên heartPath nhận giá trị mặc định là defaultImagePath.

``` Swift
let imagePaths: String?                                      //nil
let defaultImagePath = "/images/default.png"
let heartPath = imagePaths ?? defaultImagePath
print(heartPath)

// Prints "/images/default.png"
```

Chúng ta cũng có thể sử dụng nhiều toán tử **??** cùng một thời điểm. Dưới đây là một ví dụ:
``` Swift
let shapePath = imagePaths["cir"] ?? imagePaths["squ"] ?? defaultImagePath
print(shapePath)

// Prints "/images/default.png"
```

# 6. So Sánh Tổng Quan Các Cách Unwrap một Optional


|  |  Pros | Cons |
| -------- | -------- | -------- |
| Unwrapping Optionals using if-else conditions     | Familiar way to unwrap value     | ’s too long and messy and not recommended     |
| Nil coalescing operator | Better and shorter than if-else conditions | Must provide a default value |
| Force unwrapping | The easiest way to unwrap values | It leads to a fatal error in case the Optional is holding a nil value |
| Optional binding (if let) | A safe alternative to force unwrapping | Binding value can only be used inside if block |
| guard let | Binding value can be used in the same block of guard let statement | Require else block and return statement |
| Optional chaining | Easily deal with multiple optionals at once | Return values are Optional |



# 7. Kết Luận

Trong bài viết này tôi đã giới thiệu đến các bạn khái niệm optional, một khái niệm mới của Swift giúp cho lập trình viên đảm bảo code của mình an toàn hơn khi phải check nil với các biến trước khi thực hiện thao tác nào đó trên biến đó, điều này sẽ giúp giảm thiểu tình trạng crash app. Để hiểu thêm các bạn có thể tham khảo thêm ở các tài liệu sau:

https://developer.apple.com/documentation/swift/optional

https://medium.com/@lminhtm/optional-trong-swift-37406f3ca9a