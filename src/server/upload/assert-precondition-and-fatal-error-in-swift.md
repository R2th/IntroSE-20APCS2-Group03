Đôi khi sẽ tốt hơn nếu gặp sự cố crash sau đó để ứng dụng của bạn chạy ở trạng thái inconsistent. Trong bài viết này,  sẽ đề cập đến các tùy chọn bạn có dành cho các trường hợp gặp sự cố và sự khác biệt chính giữa chúng.

<br>

### Five Ways to Fail

<br>

Có năm chức năng có sẵn nếu bạn muốn ngừng thực hiện ứng dụng của mình (ngoài exit() and abort()). Có 5 optioin là:

* [assert()](https://developer.apple.com/documentation/swift/1541112-assert)
* [assertionFailure()](https://developer.apple.com/documentation/swift/1539616-assertionfailure)
* [precondition()](https://developer.apple.com/documentation/swift/1540960-precondition)
* [preconditionFailure()](https://developer.apple.com/documentation/swift/1539374-preconditionfailure)
* [fatalError()](https://developer.apple.com/documentation/swift/1538698-fatalerror)

<br>

### Swift Optimisation Levels

Để hiểu các xác nhận bên trên, bạn cần hiểu các mức tối ưu hóa. Khi bạn xây dựng ứng dụng của mình, trình biên dịch sẽ thực hiện tối ưu hóa trên mã của bạn để làm cho nó chạy nhanh hơn. Bạn có thể có các mức tối ưu hóa khác nhau cho các cấu hình xây dựng khác nhau. Đây là các cấp tối ưu hóa mà chúng tôi quan tâm:
* -Onone (default for debug builds)
* -O (default for release builds)
* -Ounchecked

Bạn có thể đặt mức tối ưu hóa từ build settings của project. Bài viết này sẽ không đi vào chi tiết về chúng ở đây,  -Ounchecked Nếu bạn phải sử dụng nó, sau đó bạn thực sự biết những gì bạn đang làm.
<br>

### assert()

assert() là hàm nhận bốn tham số. Điều kiện và message là thông điệp bạn sẽ sử dụng. Có thể bạn sẽ không cần file and line number (hai tham số cuối cùng). Với hàm assert(), bạn đánh giá một điều kiện và nếu nó đánh giá sai, ứng dụng của bạn sẽ ngừng thực thi. Các điều kiện sẽ chỉ được đánh giá cho -Onone builds. Nói cách khác, nó sẽ chỉ hoạt động để debug builds. Hãy xem ví dụ nhanh về cách sử dụng assert:

```
func printAge(_ age: Int) {
    assert(age >= 0, "Age can't be a negative value")
    
    print("Age is: ", age)
}

printAge(-1) // prints: assertion failed: Age can't be a negative value: file Assertions.playground, line 6
```


### assertionFailure()

Nếu bạn không có điều kiện để đánh giá hoặc không cần đánh giá, bạn có thể sử dụng hàm assertionFailure (). Nó sẽ lấy một chuỗi làm đối số để in dưới dạng thông báo lỗi. Giống như assert, hàm này chỉ được gọi cho các bản dựng -Onone. Hãy xem ví dụ nhanh về cách sử dụng assertionFailure


```
func printAge(_ age: Int) {
    guard age >= 0 else {
        assertionFailure("Age can't be a negative value")
        return
    }
    print("Age is: ", age)
}

printAge(-1) // prints: fatal error: Age can't be a negative value: file Assertions.playground, line 9
```

### precondition()

precondition() có cùng các tham số như assert() và thực hiện khá nhiều điều tương tự. Sự khác biệt duy nhất là điều kiện tiên quyết làm việc cho các bản builds -Onone và -O. Nói cách khác, cho cấu hình debug và release mặc định. Bạn sẽ sử dụng nó theo cách tương tự như bạn sẽ sử dụng assert:
 
```
func printAge(_ age: Int) {
    precondition(age >= 0, "Age can't be a negative value")
    
    print("Age is: ", age)
}

printAge(-1) // prints: precondition failed: Age can't be a negative value: file Assertions.playground, line 6
```


### preconditionFailure()

preconditionFailure() hoạt động giống như assertionFailure(). Với sự khác biệt như trên, nó hoạt động cho các bản builds -Onone và -O. Một lần nữa, bạn sẽ sử dụng nó giống như cách bạn sử dụng assertionFailure:

```
func printAge(_ age: Int) {
    guard age >= 0 else {
        preconditionFailure("Age can't be a negative value")
    }
    print("Age is: ", age)
}
 
printAge(-1) // prints: fatal error: Age can't be a negative value: file Assertions.playground, line 9
```

Nó có kiểu trả về 

```
public func preconditionFailure(_ message: @autoclosure () -> String = default, file: StaticString = #file, line: UInt = #line) -> Never
```

Return type ‘Never’ cho biết chức năng này sẽ không bao giờ trở lại. Nó sẽ dừng việc thực hiện ứng dụng. Đó là lý do tại sao Xcode sẽ không complain về guard statement falling through vì statement trả lại bị thiếu.

### fatalError()

fatalError(), assertionFailure() và preconditionFailure(), lấy một chuỗi làm đối số sẽ được in trong console trước khi ứng dụng chấm dứt. Nó hoạt động cho tất cả các mức tối ưu hóa trong tất cả các cấu hình xây dựng. Bạn sử dụng nó giống như hai cái kia: 

```
func printAge(_ age: Int) {
    guard age >= 0 else {
        fatalError("Age can't be a negative value")
    }
    print("Age is: ", age)
}
 
printAge(-1) // prints: fatal error: Age can't be a negative value: file Assertions.playground, line 9
```

Và cũng giống như preconditionFailure() nó có kiểu trả về là ‘Never’.
Điều đó đưa chúng ta đến cuối danh sách.

### Conclusion
Mọi dự án đều khác nhau, năm phương pháp này là các tùy chọn có sẵn để trong trường hợp fail và tùy thuộc vào bạn để quyết định sử dụng phương pháp nào. [Bài viết được dịch theo bài viết cùng tên của tác giả Dejan Agostini](https://agostini.tech/2017/10/01/assert-precondition-and-fatal-error-in-swift/)

Cám ơn các bạn đã theo dõi bài viết này !