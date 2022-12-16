### Thuật ngữ:
**Closure**: Một khối chức năng khép kín có thể được truyền qua.<br>
**Generics**: Các hàm và loại có thể tái sử dụng có thể hoạt động với bất kỳ loại nào (hoặc tập hợp con của một loại nhất định).<br>
**Optional**: Swift giới thiệu các tùy chọn xử lý việc không có giá trị, chỉ đơn giản bằng cách khai báo nếu có giá trị hay không.<br>
**Optional Binding**: Sử dụng if let để mở khóa optional một cách an toàn.<br>
**String**: Tập hợp các ký tự, thường được coi là một từ hoặc câu.<br>

### Optional Binding: If let in Swift
`Optional Binding` nghĩa là nếu một biến `optional` có thể được lấy được giá trị khi sử dụng `if let` để biến đổi một biến optional thành một biến `non-optional` cùng giá trị.
ví dụ:
```
let optionalString: String? = "A String"

if let str = optionalString {
    print (str)
}
```

### Cài đặt If let
Chúng ta có thể cài đặt một phiên bản `if let` code (Optional Binding) như một hàm chức năng.<br>
**Chuẩn cài đặt của optionals:**<br>
Trước tiên chúng ta cần hiểu về cách `optional` hoạt động trong cấu hình mặc định của chúng.<br>
Một `optional String` có thể phân giải thành **.some** hoặc **.none**, như được minh họa bằng đoạn đoạn code sau:
```
let nilString: String? = nil

switch nilString {
case .some(let val):
    print (val)
case .none:
    print ("this is nil")
}
```

**Cài đặt if let cho kiểu String:**
Chúng ta có thể thực hiện if let sử dụng `closures` vì thế nếu String không phải là kiểu `optional`, ta có thể chạy **elseFunc**, nếu là nil thì chạy **thenFunc**:

```
func iflet(_ value: String?, thenFunc: (String) -> (), elseFunc: () -> ()) {
    switch value {
    case .some(let val):
        thenFunc(val)
    default:
        elseFunc()
    }
}

let nilString: String? = nil
iflet(nilString, thenFunc: {val in print(val)}, elseFunc: { print("Do else") } )
iflet("valueString", thenFunc: {val in print(val)}, elseFunc: { print("Do else") } )
```

**Cài đặt Generics if let**
Ta có thể sử dụng chuẩn `if let` `optional binding` cho bất kì kiểu `optional` nào.
Hiển nhiên là chúng ta muốn cài đặt `generic if let` để có thể hoạt động cho bất kì kiểu cụ thể nào.

```
func genIfLet<T>(_ value: T?, thenFunc: (T) -> (), elseFunc: ()-> ()) {
    switch value {
    case .some(let val):
        thenFunc(val)
    default:
        elseFunc()
    }
}

let nilString: String? = nil
genIfLet(nilString, thenFunc: {val in print(val)}, elseFunc: { print("Do else") } )

let nilInteger: Int? = 4
genIfLet(nilInteger, thenFunc: {val in print(val)}, elseFunc: { print("Do else") } )
```

### Kết luận:
Viết phiên bản Optional Binding trong Swift không quá phức tạp và cho chúng ta hiểu thêm về những gì đang diễn ra trong Swift.

Reference: https://medium.com/swlh/re-implement-if-let-in-swift-d88a4b79de83