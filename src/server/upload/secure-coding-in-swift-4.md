Tạm gác lại seri về Python, bài viết lần này tôi muốn chia sẻ với bạn về viết code như thế nào thực sự đảm bảo an toàn trong Swift 4.
Từ việc giảm thiểu sử dụng con trỏ để đẩy mạnh kiểm tra trong thời gian thực thi, Swift là ngôn ngữ tuyệt vời để phát triển an toàn. Nhưng điều đó có nghĩa là không quên về khía cạnh đảm bảo an toàn thông tin. Hiện vẫn còn các lỗ hổng và Swift cũng hấp dẫn các nhà phát triển mới, những người chưa biết về bảo mật.
Bài chia sẻ này là một hướng dẫn về viết code an toàn, giải quyết các thay đổi trong Swift 4 cũng như các công cụ tuỳ chọn mới có sẵn trong Xcode 9 sẽ giúp bạn giảm thiểu các lỗi hổng bảo mật
## Pointers and Overflows
Có nhiều lỗ hổng bảo mật xung quanh C và việc sử dụng các con trỏ. Điều này là do các con trỏ cho phép bạn truy cập vào địa chỉ ô nhớ, dễ dàng đọc và ghi vào vùng nhớ không an toàn. Đây là một cách để kẻ tấn công có thể thay đổi chương trình theo hướng tiêu cực.
Swift không làm việc với con trỏ, nhưng nó cho phép bạn giao tiếp với C. Nhiều API bao gồm toàn bộ Core Foundation API của Apple đều dựa trên C, do đó nó rất dễ để đưa con trỏ trở lại Swift
Thật may mắn, Apple đã đặt tên con trỏ có kiểu thích hợp: `UnsafePointer<T>`, `UnsafeRawPointer<T>`, `UnsafeBufferPointer<T>`, và `UnsafeRawBufferPointer<T>`. Sẽ có thời gian khi API mà bạn đang giao tiếp sẽ trả về các loại này và quy tắc chính khi sử dụng chúng là không lưu trữ hoặc trả về cho lần sử dụng tiếp theo. Ví dụ
```Swift
let myString = "Hello World!"
var unsafPointer: UnsafePointer<CChar>? = nil
myString.withCString { myStringPointer in
    unsafePointer = myStringPointer
}
//sometime later...
print(unsafePinter?.pointee)
```
Bời vì chúng ta được truy cập vào con trỏ ở ngoài closure, chún ta không biết chắc rằng con trỏ vẫn trỏ tới nội dung ô nhớ đã mong muốn. Cách an toàn sử dụng con trong trong ví dụ trên là giữ nó cùng với lệnh print bên trong closure
Con trỏ trỏ tới chuỗi và mảng cũng không được kiểm tra. Điều này có nghĩa nó dễ dàng sử dụng một con trỏ không an toàn trên một mảng nhưng vô tình vượt qua giới hạn của mảng đó- đó là tràn bộ nhớ **buffer overflow**
```Swift
var numbers = [1, 2, 3, 4, 5]
numbers.withUnsafeMutableBufferPointer { buffer in
    //ok
    buffer[0] = 5
    print(buffer[0])
    
    //bad
    buffer[5] = 0
    print(buffer[5])
}
```
Tin tốt là Swift cố gắng gây crash ứng dụng để thay thế việc tiếp tục việc gọi *hành vi không xác định*. Chúng ta không biết rằng `buffer[5]` trỏ tới cái gì!. Tuy nhiên Swift sẽ không bắt tất cả các trường hợp. Đặt một breakpoint sau đoạn code dưới và xem  biến a và c. Chúng sẽ được đặt thành `999`
```Swift
func getAddress(pointer: UnsafeMutablePointer<Int>) -> UnsafeMutablePointer<Int> {
    return pointer
}
var a = 111
var b = 222
var c = 333
let pointer: UnsafeMutablePointer<Int> = getAddress(pointer: &b)
pointer.successor().initialize(to: 999)
pointer.predesessor().initialize(to: 999)
```
Điều này chứng tỏ là tràn bộ đệm vì không được phân phối rõ ràng, các biến thường được lưu trữ trên stack
Ví dụ tiếp theo, chúng ta cấp phát vùng nhớ với sức chửa chỉ là `Int8`. Vùng nhớ được lưu trữ trên heap, dòng tiếp thieo sẽ gây `over the heap`. Ví dụ, Xcode chỉ cảnh báo bạn với một lưu ý ở console đó là `gets` không an toàn
```Swift
let buffer = UnsafeMutablePointer<Int8>.allocate(capacity: 1)
gets(buffer)
```
Vậy cách tốt nhất để tránh tràn là gì?. Điều rất quan trọng khi giao tiếp với C là giới hạn kiểm tra đầu vào để đảm bảo nó nằm trong phạm vi
Có thể bạn sẽ nghĩ rằng nó khó nhớ và tìm thấy tất cả các trường hợp khác nữa. Vì thế để giúp bạn, Xcode đi kèm với một công cụ rất hữu ích được gọi là Address Sanitizer
Address Sanitizer được cải tiến ở Xcode 9. Nó là một công cụ giúp bắt các sự truy cập bộ nhớ không hợp lệ như ví trụ trên. Nếu bạn không làm việc với kiểu `Unsafe*`, nó là một ý tưởng tốt khi sử dụng Address Sanitizer. Nó không bật mặc định, nên phải kích hoạt nó. Vào **Product > Scheme > Edit Scheme > Diagnostics** và kiểm tra **Address Santinizer**. Trong Xcode9 đây là một tuỳ chọn nhỏ, **Phát hiện việc sử dụng ngăn xếp sau khi return**. Tuỳ chọn mới này phát hiện các lỗ hổng sử dụng sau khi phạm vi và sử dụng sau khi trả về từ ví dụ đầu tiên.
Đôi khi bị bỏ qua là *integer overflow*. Điều này là do các lỗi tràn số nguyên là lỗ hổng khi sử dụng như một index hoặc kích thuước của bộ nhớ, hoặc nếu giá trị không mong muốn của overflow thay đổi đoạn quan trọng trong code. Swift 4 bắt lỗi tràn số nguyên rõ ràng nhất khi biên dịch, như khi số nguyên đó lớn hơn giá trị lớn nhất của số nguyên
Ví dụ, đoạn code sau sẽ không được biên dịch
```Swift
var someInteger: CInt = 2147483647
someInteger += 1
```
Nhưng nhiều lần số đó sẽ chạy tự động trọng thời gian chạy, như khi người dùng nhập thông tin vào một `UITextField`. Undefined Behavior Sanitizer là một công cụ mới trong Xcode9 nó phát hiện tràn số nguyên và các lỗi không phù hợp. Để kích hoạt nó, vào **Product > Scheme > Edit Scheme > Diagnostics** và bật **Undefined Behavior Sanitizer**. Sau đó vào **Build Settings > Undefined Behavior Sanitizer**, đặt **Enable Extra Integer Checks** to **Yes**
Chỉ có điều đáng nói về hành vi không xác định, Swift thuần tuý ẩn các con trỏ, các ánh xạ và copy của bộ nhớ vẫn được sử dụng đằng sau, vì thế nó có khả năng chạy các hành vi mà bạn không mong muốn. Ví dụ khi bạn bắt đầu lặp các chỉ số, các chỉ số có thể thay đổi trong quá trình lặp
```Swift
var numbers = [1, 2, 3]
for number in numbers {
    print(number)
    numbers = [4, 5, 6] // <- accident ???
}

for number in numbers {
    print(number)
}
```
Ở đây chúng ta chỉ đưa ra `numbers` mảng số để trỏ tới một mảng mới trong vòng lặp. Sau đó `number` trỏ tới đâu?. Điều này thường gọi là một ánh xạ treo, nhưng trong trường hợp Swift ngầm tạo ra một ánh xạ tới bản sau của bộ nhớ của mảng cho suốt thời gian lặp. Điều đó có nghĩa rằng print sẽ in ra 1,2,3 thay vì 1,4,5... 
Vì vậy Swift đã thực thi bảo mật tuyệt vời tại thời gian biên dịch để bắt những lỗ hổng bảo mật này. Có rất nhiều tình huống mà lỗ hổng không tồn tại cho đến khi chạy- khi mà có tương tác người dùng. Swift cũng có kiểm tra động, có thể bắt nhiều vấn đề trong thời gian chạy, nhưng nó không được thực hiện cho code đa luồng. 
Với những điều trên chúng ta cùng chuyền sang lỗ hổng phổ biến là tấn công chèn mã
## Injection and Format String Attacks
Các cuộc tấn công chuỗi xảy ra khi một chuỗi đầu vào được phân tích cú pháp trong ứng dụng của bạn như một câu lệnh mà bạn không chỉ định. Trong chuỗi Swift thuần tuý không dễ bị tấn công bởi các chuỗi định dạng, Objective- C `NSString` và Core Foundation `CFString` thì có thể bị tấn công, và chúng có hiệu lực trong Swift. Cặp class này có phương thức là `stringWithFormat`
Giả sử người dùng có thể nhập các text vào một `UITextField`.
```Swift
let inputString = "String from a textfield %@ %d @p %ld %@ %@" as NSString
```
NÓ có thể là lỗ hổng bảo mật nếu chuỗi định dạng được xử lý trực tiếp
```Swift
let textFieldString = NSString.init(format: inputString) //bad
let textFieldString = NSString.init(format: "%@", inputString) //good
```
Swift 4 đã cố xử lý thiếu đối số bằng cách trả về 0 or NULL, nhưng nó là một mối lo ngại khi quay trở lại với Objective-C
```Swift
NSLog(textFieldString); //bad
NSLog("%@", textFieldString);  //good
```
Trong khi hầu hết thời gian với cách không đúng có thể gây ra crash, một kẻ tấn công cỏ thể tạo một chuỗi định dạng để viết dữ liệu vào vùng nhớ đặc biệt trên stack dẫn tới thay đổi hướng ứng dụng (như việc thay đổi một biến `isAuthenticated`)
Một thủ phạm lớn khác đó là `NSPredicate`, chúng có thể chấp nhận chuỗi định dạng đó được sửa dụng để xách định dữ liệu nào được khôi phục từ Core Data. Mệnh đề như `LIKE` và `CONTAINS` cho phép ký tự đặc biệt và cần tránh hoặc chỉ sử dụng cho các ô tìm kiếm. Ý tưởng này để tránh kiệt kê các tài khoản, ví dụ, kẻ tấn công nhập vào "a*" như là một tên tài khoản. Nếu bạn thay đổi mệnh `LIKE` thành `==`, nó có nhĩa là một chuỗi phải đúng bằng "a*". Cách cách tấn công phổ biến khác xảy ra bằng cách chấm dứt chuỗi nhập vào sớm nhất với một ký tự đơn vì thế câu lệnh được thực thi. Ví dụ, khi login có thể vượt quan bằng cách `') OR 1 = 1 OR (password LIKE '*`  vào `UITextField`. Dòng trên được dịch thành "với password là gì cũng được", nó được vượt qua được mọi xác thực. Cách giải quyết triệt để là tránh tất cả các injection bằng cách sử dụng double quotes trong code. Theo cách đó, bất kì quotes từ người dùng được xem như là một phần của chuỗi đầu vào thay vì là một ký tự kết thúc đặc biệt:
```Swift
let query = NSPredicate.init(format: "password == \"%@\""", name)
```
Một cách khác để phòng chống các cách tấn công trên là chỉ cần tìm kiếu và bỏ qua các ký tự đặc biệt mà bạn thấy nó không có lợi cho chuỗi tìm kiếm. Ví dụ sẽ được bao gồm quotes, hoặc dấu chấm hay dấu sẹc. Ví dụ, nó có thể khả thi với tấn công trực diện khi đầu vào được truyền trực tiếp đến lớp `FileManager`. Ví dụ sau người dùng nhập `../` để xem đường dẫn thư mục cho thay vì thư mục con dự kiến
```Swift
let userControllerString = "../" as NSString
let sourcePath = NSString.init(format: "%@/%@", Bundle.main.resourcePath! , userControllerString)
NSLog("%@", sourcePath)
         
//Instead of Build/Products/Debug/Swift4.app/Contents/Resources, it will be Build/Products/Debug/Swift4.app/Contents
let filemanager:FileManager = FileManager()
let files = filemanager.enumerator(atPath: sourcePath as String)
while let file = files?.nextObject()
{
    print(file)
}
```
Các ký tự đặc biệt khác bao có thể bao gồm một ký tự kết thúc NULL nếu chuỗi được sử dụng như là chuỗi của C. Các con trỏ trỏ tới chuỗi C yêu cầu một byte kết thúc NULL. Vì thế, nó có thể thao tác chuỗi đơn giản bằng cách cung cấp một byte NULL. Kẻ tấn công có thể muốn kết thúc chuỗi sớm nếu ở đó không có một cờ giống như `needs_auth=1`, hoặc khi truy cập mặc định và tắt nó một cách rõ ràng với `is_subcriber = 0`
```Swift
let userInputString = "username=Ralph\0" as NSString
let commandString = NSString.init(format: "subscribe_user:%@&needs_authorization=1", userInputString)
NSLog("%s", commandString.utf8String!)
// prints subscribe_user:username=Ralph instead of subscribe_user:username=Ralph&needs_authorization=1
```
Việc phân tích cú pháp HTML, XML, và chuỗi JSON yêu cầu sự chính xác cao nhất. Cách an toàn để làm việc với chúng là sử dụng thư viện native Foundation cung cấp cho mỗi cú pháp, như là `NSXMLParser`. Swift 4 giới thiệu kiểu tuần tự cho các định dạng giống như JSON. Nhưng nếu bạn không đọc XML hoặc HTML sử dụng một hệ thống tuỳ chọn, hãy chắc chắn rằng các ký tự đặc biệt từ đầu vào người dùng không thể được sử dụng để vượt qua bảo mật

- `<` phải trở thành `&lt`
- `>` nên thay thế bởi `&gt`
- `&` nên trở thành `&amp`
- Các giá trị thuộc tính bên trong, như `"` hoặc `'` cần trở thành `&quot` và `&apos` tương ứng
Dưới đây là ví dụ cho cách nhanh nhất để thay thế và loại bỏ các ký tự đặc biệt
```Swift
var myString = "string to sanitize;"
myString = myString.replacingOccurrences(of: ";", with: "")
```
Vùng cuối cùng cho các cuộc tấn công chèn mã là xử lý bên trong URL. Kiểm tra để đảm bảo chắc chắn rằng đầu vào người dùng không sử dụng trực tiếp xử lý bên trong URL `openURL` và `didReceiveRemoteNotification`. Xác minh URL là những gì bạn mong đợi  và điều đó không cho phép người dùng tự ý nhập thông tin để thay đổi logic của bạn. Ví dụ, thay vì để cho user chọn màn hình nào điều hướng, thì chỉ cho phép các màn hình đặc biệt sử dụng các id không xác định như là `t=es84jg5urw`
Nếu bạn sử dụng `WKWebView` trong app của bạn, nó có thể kiểm tra URL sẽ được load ở đó. Bạn có thể ghi đè `decidePolicyFor navigationAction` cho phép bạn chọn nếu bạn muốn tiếp tục request
Một số thủ thật cần biết về webview bao gồm load các URL custom mà các dev không có ý định, như là một `app-id` để chạy một ứng dụng hoàn toàn khác hoặc `sms:` để gửi message. Lưu ý rằng các trang web nhúng không hiển thị thanh địa chỉ URL hoặc trạng thái SSL, do đó người dùng không thể xác định xem kết nối có đáng tin cậy hay không.
Nếu weview full màn hình, ví dụ URL có thể bị đánh cắp với một trang web nó nhìn chỉ giống  như trang đăng nhập của bạn ngoại trừ điều hướng các thông tin xác thực vào một tên miền đọc hại. Các cuộc tấn công khác trong quá khứ có bao gồm tấn công crossite-scripting mà có thể đã bị rò rỉ tập tin cookie thậm chí là toàn hệ thống tệp tin
Cách phòng ngừa tốt nhất là cho tất cả các cuộc tấn công được đề cập là dành thời gian để thiết kế giao diện của bạn bằng cách sử dụng các nút điều khiển giao diện người dùng thay vì chỉ hiển thị phiên bản dựa trên web trong ứng dụng của bạn.