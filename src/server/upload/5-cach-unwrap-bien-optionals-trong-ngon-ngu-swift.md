Chào các bạn, trong bài viết trước mình đã cùng nhau tìm hiểu về kiểu biến Optionals trong Swift: https://viblo.asia/p/kieu-optinals-trong-ngon-ngu-swift-a-z-phan-1-WAyK8d76KxX
Trong bài này, chúng ta tiếp tục tìm hiểu về các cách để unwrap một biến Optionals trong ngôn ngữ Swift
# 1. Forced unwrap 
Đối với những biến kiểu optionals mà khi sử dụng chúng ta biết chắc chắn rằng chúng có giá trị, chúng ta sử dụng force unwrap, cú pháp như sau:
>     if convertedNumber != nil {
>             print("convertedNumber has an integer value of \(convertedNumber!).")
>         }
    
Bằng cách thêm dấu ! ngay sau biến, chúng ta đã unwrap được biến optionals, tuy nhiên với cách này, nếu biến không có giá trị thì sẽ gây ra lỗi, có thể dẫn đến Crash, vì vậy cách này thường không được khuyến khích sử dụng
# 2. Optional Binding
Chúng ta dùng optional binding chủ yếu trong các trường hợp check điều kiện nil, sử dụng với các control flow, đơn cử như:
    
>     if let actualNumber = Int(possibleNumber) {
>         print("The string \"\(possibleNumber)\" has an integer value of \(actualNumber)")
>     } else {
>     print("The string \"\(possibleNumber)\" could not be converted to an integer")
>    }
> // Prints "The string "123" has an integer value of 123"

Nhìn vào ví dụ trên, ta có thể đọc nếu biến possibleNumber có giá trị, gán nó thành actualNumber và sử dụng ở trong block, nếu không sẽ bỏ qua. 
Nếu bạn đã từng code Objective C, có thể thấy với Swift chúng ta đã có thể rút gọn đi 1 phần code ở nhưng trường hợp check nil như trên.

# 3. Implicitly Unwrapped Optionals 
Như ở trên, chúng ta có thể dùng các control flow để unwrap và sử dụng biến optionals, tuy nhiên trong trường hợp biến sẽ luôn có giá trị, chúng ta phải gọi hàm if nhiều lần, và để rút gọn code, chúng ta có thể sử dụng Implicitly Unwrapped Optionals, có thể hiểu như unwrap biến optionals ngay khi khai báo:
>     let possibleString: String? = "An optional string."
>     let forcedString: String = possibleString! // requires an exclamation mark
> 
>     let assumedString: String! = "An implicitly unwrapped optional string."
>     let implicitString: String = assumedString // no need for an exclamation mark

# 4. Optionals Chaining
Optinals chaining dùng để truy cập các thuộc tính, hàm, mảng trong một Optionals. Nếu Optionals đó chứa thuộc tính, giá trị, hay hàm tồn tại, Chúng ta có thể lấy ra và sử dụng thông qua Optionals chaining, nếu không có giá trị, chúng sẽ trả về nil. Để hiểu rõ hơn, chúng ta cùng theo dõi ví dụ sau:
Đầu tiên hãy tạo hai class Person and Residence:
>     class Person {
>         var residence: Residence?
>     }
> 
>     class Residence {
>         var numberOfRooms = 1
>     }
    
Bây giờ nếu chúng ta tạo một constance của class Person, biến residence trong class Person sẽ mặc định là nil
>     let john = Person()
    
Lúc này, nếu chúng ta cố truy cập thuộc tính numberOfRooms trong residence của john bằng cách force Unwap, sẽ xảy ra exception
    
>     let roomCount = john.residence!.numberOfRooms
> // this triggers a runtime error

Vì vậy, Optionals Chaining là cơ chế giúp chúng ta xử lý trong trường hợp  này:
> if let roomCount = john.residence?.numberOfRooms {
>     print("John's residence has \(roomCount) room(s).")
> } else {
>     print("Unable to retrieve the number of rooms.")
> }
> // Prints "Unable to retrieve the number of rooms."

Bằng cách thêm dấu ? sau thuộc tính residence, chúng ta truy xuất thuộc tính numberOfRooms, khi đó sẽ có 2 trường hợp nil hoặc có giá trị, tương ứng với hai trường hợp như trên. 
# 5.  Coalescing operator
Đầu tiên, hãy đọc ví dụ sau:
>  let name: String? = nil
> let unwrappedName = name ?? "Anonymous"

Bạn có thể hiểu như sau: khai báo một biến optionals name không có giá trị
Khai báo biến unwrappedName, gán bằng biến name, khi đó nếu name có giá trị, gán giá trị đó cho unwrappedName, nếu name là nill, gán giá trị cho unwrappedName bằng "Anonymous"

Trên đây là 5 cách để unwrap một biến optionals trong ngôn ngữ Swift, hi vọng các bạn đã hiểu và có thể áp dụng một cách hợp lí trong project của mình. Cảm ơn các bạn đã theo dõi bài viết!
Tài liệu tham khảo: https://docs.swift.org/swift-book/LanguageGuide/BasicOperators.html 
Hoặc : https://docs.swift.org/swift-book/LanguageGuide/OptionalChaining.html