# I. Giới thiệu
Trong quá trình đi phỏng vấn, các bạn có thể gặp nhiều câu hỏi khác nhau, từ những câu hỏi dễ đến những câu hỏi có độ khó cao. Nhưng dù là câu hỏi dễ hay khó, điểm chung của các câu hỏi này là không cần bạn phải trả lời toàn bộ kiến thức về chủ đề trong câu hỏi, mà cần bạn trả lời những điều người hỏi đã hỏi. Dưới đây mình xin nêu vài câu hỏi có thể các bạn sẽ gặp phải khi đi phỏng vấn xin việc, hoặc các bạn cũng có thể đọc để củng cố lại kiến thức. Những câu hỏi này không phải do mình nghĩ ra, mà do mình tình cờ đọc được trên Medium.com, các bạn có thể [vào đây](https://medium.com/@duruldalkanat/ios-interview-questions-13840247a57a) để đọc bài viết gốc bằng tiếng Anh. Bài viết này chỉ mang tính chất tham khảo, củng cố kiến thức cho vui, các bạn đi phỏng vấn mà bên tuyển dụng không hỏi câu nào trong đây thì cũng không được trách mình đâu nhé :D

# II. Nội dung câu hỏi
**1. Hỏi: Thông thường, khi custom các phần liên quan đến giao diện như layer border, layer corner radius, chúng ta thường phải build ra device/simulator để xem kết quả. Làm thế nào để có thể render trực tiếp các thuộc tính của UIView trên storyboard/xib để có thể nhìn trực tiếp mà không cần build app?**

Trả lời: Sử dụng @IBDesignable. Thuộc tính này giúp chúng ta render UIView trên Interface builder một cách trực tiếp, không cần phải build App để kiểm tra kết quả.

**2. Hỏi: sự khác nhau giữa Synchronous task và Asynchronous task là gì?**

Trả lời: Synchronous task sẽ block thread đang chạy, chờ đến khi task thực thi xong mới chạy tiếp thread
Asynchronous task sẽ không block thread, thực thi xong task thì sẽ có notify báo lại cho biết là task đã thực thi xong

**3. Hỏi: Giải thích về điều kiện biên dịch (Compilation conditions)**

Trả lời: Compilation conditions là các câu lệnh if else như sau:
```Swift
#if DEBUG
    let accessToken = "DebugAccessToken"
#else
    let accessToken = "ProductionAccessToken"
#endif
```
Trong đó, các gía trị trong condition là các Preprocessor Macros, các Preprocessor Macros có thể được định nghĩa trong Build Settings của project trong Xcode.

**4. Hỏi: NSError gồm các thành phần nào?**

Trả lời: NSError bao gồm 3 phần chính:  domain, code và userInfo
* domain: chuỗi string xác định loại lỗi, và xuất xứ của lỗi
* code: mã Int xác định mã lỗi. 
* userInfo: Thông tin thêm diễn tả về lỗi

**5. Hỏi: Enum (Enumerations) là gì?**

Trả lời: theo định nghĩa của Apple trong Swift documentation, Enum định nghĩa một kiểu chung cho một nhóm các giá trị liên quan đến nhau, giúp chúng ta làm việc với các giá trị đó theo một cách an toàn hơn. Đại khái thì thay vì làm việc với các giá trị đơn lẻ liên quan đến nhau, thì chúng ta nhóm các giá trị đó vào thành các nhóm trong cùng 1 enum, như vậy thì khi làm việc với enum, chúng ta dễ ràng chia ra thành các case hơn, quản lý giá trị tốt hơn.

**6. Hỏi: Bounding box là gì?**

Trả lời: bounding box là một thuật ngữ dùng trong hình học. Nó được dùng để chỉ số đo nhỏ nhất của diện tích hoặc thể tích của 1 tập hợp điểm đã cho

Ngoài lề: đi phỏng vấn mà hỏi thế này thì senior cũng cứng họng luôn :|

**7. Hỏi: Tại sao chúng ta không sử dụng strong cho enum property trong Objective-C?**

Trả lời: Bởi vì enum không phải là Object, không phải object thì không sử dụng được strong hay weak reference.

**8. Hỏi: @synthesize trong Objective-C là gì?**

Trả lời: @synthesize sẽ tự động tạo các hàm setter và getter cho các property trong class.

**9. Hỏi: @dynamic trong Objective-C là gì?**

Trả lời: Chúng ta sử dụng Dynamic cho các subclass của NSManagedObject. Key @dynamic thông báo cho compiler rằng getter và setter của property sẽ được thực hiện ở một chỗ nào nó, để compiler không báo lỗi

**10. Hỏi: tại sao chúng ta sử dụng synchronized?**

Trả lời: synchronized đảm bảo là chỉ có 1 thread có thể thực thi đoạn code trong block tại bất kỳ thời điểm nào

**11. Hỏi: Sự khác biệt giữa strong, weak, read only, copy là gì?**

Trả lời: strong, weak attribute định nghĩa cách mà property sẽ được quản lý trong memory
* Strong: tạo một strong reference từ object khai báo đến object property, tăng số reference count của object property lên thêm 1. Reference count là số đếm quản lý của memory, khi reference count về 0, thì object sẽ được coi là không dùng nữa, xoá khỏi memory
* Weak: tạo một weak reference từ object khai báo đến object property. Weak reference sẽ không tăng reference count của object property lên.
Việc sử dụng hài hoà strong và weak reference trong lập trình iOS là rất quan trọng, để tránh xảy ra hiện tượng strong reference circle, dẫn đến không giải phóng được memory.
* Read-only: chúng ta chỉ có thể set giá trị của property một lần, và không thể thay đổi
* Copy: copy giá trị của object khi tạo, và property cũng không thể thay đổi

**12. Hỏi: Dynamic dispatch là gì?**

Trả lời: Dynamic dispatch là một quá trình lựa chọn method hoặc function nào sẽ được gọi trong quá trình runtime. Lấy ví dụ đơn giản, khi bạn có các function đa hình, thì khi bạn thực hiện gọi function, dynamic dispatch sẽ giúp chúng ta quyết định xem function nào trong các function đa hình sẽ được gọi. 

Ngoài lề: Dynamic dispatch là một kiến thức tương đối sâu về ngôn ngữ lập trình, các bạn có thể tìm hiểu thêm [ở đây](https://medium.com/flawless-app-stories/static-vs-dynamic-dispatch-in-swift-a-decisive-choice-cece1e872d). Có thể trong bài viết tới tôi sẽ viết về cái này để giúp anh em lười đọc tiếng anh có thêm kiến thức sâu hơn về Dynamic dispatch nói riêng và Method Dispatch nói chung.

**13. Hỏi: code coverage là gì?**

Trả lời: Code coverage là con số để đo số lượng code mà chúng ta đã test được. Thường code coverage được tính bằng %

**14. Hỏi: completion handler là gì?**

Trả lời: Completion handler là một closure được gọi sau khi một task asynchronous hoàn thành, thường được sử dụng trong các task liên quan đến API. Completion handler phải được đánh dấu @escaping vì chúng sẽ được thực thi sau khi hàm asynchronous thực thi 1 thời gian.

**15. Hỏi: Nguyên tắc để ưu tiên khả năng sử dụng trong thiết kế là gì?**

Trả lời: 4 bước:
* Suy nghĩ như user, sau đó mới design UX
* Luôn nhớ rằng user chỉ là con người bình thường, không phải những người cao siêu đặc biệt gì
* Khi làm quảng cáo một App, hãy để ý đến những tình huống sử dụng có thể có ích
* Tiếp tục làm việc, suy nghĩ cải tiến UX cho App kể cả sau khi App đã lên store

**16. Hỏi: frame và bounds khác nhau ở chỗ nào?**

Trả lời: Frame và bounds đề dùng để chỉ kích thước (size) và vị trí (origin) của UIView trong hệ trục toạ độ. Size của UIView trong frame và bounds là như nhau, tuy nhiên:
* Frame: origin của UIView liên quan đến hệ toạ độ của UIView cha, xác định vị trí của UIView với UIView cha
* Bounds: origin của UIView chỉ liên quan đến hệ toạ độ của chính nó. Vì vậy origin của bounds có giá trị (0, 0)

**17. Hỏi: Responder chain là gì?**

Trả lời: Responder chain là một hệ thống phân cấp các object có cơ hội phản hồi lại các event nhận được. 

**18. Hỏi: Regular expression là gì?**

Trả lời: Regular expression là những chuỗi string đặc biệt, chuỗi này mô tả cách tìm kiếm trong 1 chuỗi khác.

**19. Hỏi: Operator Overloading là gì?**

Trả lời: Operator overloading là tính năng mạnh mẽ giúp chúng ta định nghĩa lại/thêm các phép toán cho các operator (toán tử) đã có. 
Ví dụ dễ hiểu, chúng ta có thể overloading operator “*” cho String và Int để có thể thực hiện phép nhân cho String như sau:
```Swift
func *(lhs: String, rhs: Int) -> String {
	var result = lhs
	for _ in 2...rhs {
 		result += lhs
	}
	return result
}
let u = "abc"
let v = u * 3 // kết quả là “abcabcabc”
```

**20. Hỏi: TVMLKit là gì**

Trả lời: TVMLKit là framework giúp chúng ta làm việc với TVML, Javascript trong ứng dụng tvOS. Cụ thể, chúng ta cần hiểu các khái niệm:
* TVML: một dạng của file XML, nó là viết tắt của “Television Markup Language”
* TVJS: một tập hợp các API JavaScript cung cấp cho chúng ta các method để hiển thị ứng dụng được tạo bởi TVML
* TVMLKit: Framework để TVML, JavaScript và ứng dụng native tvOS tương tác với nhau

**21. Hỏi: Giới hạn của nền tảng tvOS là gì?**

Trả lời:
* Thứ 1, tvOS không hỗ trợ trình duyệt dưới bất kỳ hình thức nào, không có WebKit và bất kỳ web-based engine nào khác. Điều này có nghĩa là ứng dụng của chúng ta không thể liên kết với trình duyệt, bao gồm cả web link, OAuth hay các phương tiện xã hội.
* Thứ 2, tvOS không thể sử dụng bộ nhớ trong. Device có thể có 32, hoặc 64GB bộ nhớ, nhưng ứng dụng lại không được phép ghi vào bộ nhớ của máy.
* Thứ 3, Dung lượng của ứng dụng trên tvOS không thể vượt quá 4GB.

**22. Hỏi: Function là gì?**

Trả lời: Function giúp chúng ta nhóm một loạt các dòng lệnh lại với nhau để thực hiện một số nhiệm vụ. Khi 1 function được tạo, nó có thể được reuse nhiều lần. Nếu các bạn thấy mình đang lặp lại các dòng lệnh nhiều lần, thì có thể các bạn nên để nó vào 1 function để đỡ phải viết lại nhiều lần các dòng code đó.
Function tốt nhất nên có đầu vào và đầu ra, và không phụ thuộc vào các function khác để hoạt động.

# III. Tạm kết
Trên đây là một số câu hỏi có thể gặp khi đi phỏng vấn xin việc, phần 2 của bài viết này sẽ được ra trong thời gian sắp tới. Mình cũng không mong gì các bạn có thể áp dụng được một vài câu trong đây vào trong bài phỏng vấn của các bạn, chỉ hi vọng là thông qua bài viết này, có thể giúp các bạn củng cố một ít kiến thức có sẵn, và học thêm được một số kiến thức mới. 
Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day :)