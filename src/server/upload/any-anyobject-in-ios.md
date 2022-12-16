### What is the difference between Any and AnyObject?
**Any** : Nó có thể đại diện cho bất kỳ loại lớp, struct, enum bao gồm hàm và các loại tùy chọn.

**AnyObject** : Nó đề cập đến bất kỳ trường hợp nào của một lớp. Nó rất hữu ích khi bạn chỉ làm việc với loại tham chiếu. Nó tương đương với  **id** , trong Objective-C.

Nếu dictionary của bạn  chỉ được sử dụng trong code Swift, thì bạn nên sử dụng **Any** vì các type của bạn (Int, Double, Float, String, Array và Dictionary) không phải là đối tượng.

Nếu bạn passing dictionary  đến  Objective-C và mong muốn một NSDipedia, thì bạn nên sử dụng AnyObject.

#### Let’s understand the Any:


 ```swift 
 let anyValues: [Any] = [1,"Two",3, "four",["name": "Alex"]]
 anyValues.forEach { (anyValue) in
         switch anyValue {
         case is Int: 
                  print("\(anyValue) is an Int")
         case is String:
                  print("\(anyValue) is a String!")
          case is [String: Any]:
                  print("\(anyValue) is a Dict!")
          defaulf"
                  print("\(anyValue) is some other type!)
         }
 }
   ```
   
   Print: 
 ![](https://images.viblo.asia/03ad1c44-7a8e-4cf7-8a83-facaa64bb467.png)

Dưới đây là một ví dụ về Any trong Swift. Trong ví dụ này, chúng ta đang kiểm tra loại của tất cả các giá trị bằng cách sử dụng từ khóa **is** là từ khóa.

#### with AnyObject

![](https://images.viblo.asia/763fe694-f75d-4bdf-9465-c46f3a850107.png)
Nếu bạn  xem xét ví dụ trên, hãy chú ý đến dòng gợi ý, Giao thức mà tất cả các lớp đều xác nhận ngầm. Mỗi lớp hoàn toàn tuân thủ giao thức AnyObject.

Bạn sử dụng AnyObject khi bạn cần sự linh hoạt của một đối tượng chưa được định kiểu hoặc khi bạn sử dụng các phương thức và thuộc tính Objective-C được bắc cầu để trả về kết quả chưa được đánh dấu. AnyObject có thể được sử dụng làm loại cụ thể cho một thể hiện của bất kỳ lớp, loại lớp hoặc giao thức chỉ lớp nào.


![](https://images.viblo.asia/a57f50eb-bff8-4731-8e6c-36c0ea7d56db.png)

Trong ví dụ trên, bạn có thể thấy chúng ta có thể sử dụng Int hoặc String hoặc bất kỳ loại nào khác như AnyObject.

 Sự linh hoạt của giao thức AnyObject tương tự như loại id của Objective-C. Vì lý do này, các loại Objective-C thường sử dụng AnyObject làm kiểu cho các thuộc tính, tham số phương thức và giá trị trả về.
Giao thức AnyObject cũng hữu ích để thu hẹp khoảng cách giữa Swift và Objective-C.


### Khi nào chọn Any hay AnyObject? 

Đó là một cách thực hành tốt để sử dụng AnyObject trong khi bạn đang làm việc với các tham chiếu và sử dụng Any khi làm việc với các loại giá trị.
Lưu ý: Nếu có thể, chúng ta nên tránh cả Any và AnyObject.